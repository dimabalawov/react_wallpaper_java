"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useCart} from "@/context/CartContext";
import {useRouter} from "next/navigation";
import {
    MOCK_NOVA_POSHTAMATS,
    MOCK_NOVA_WAREHOUSES,
    MOCK_PICKUP_LOCATIONS,
    MOCK_UKR_WAREHOUSES,
} from "@/data/mockDelivery";
import ContactForm from "@/components/Checkout/ContactForm";
import DeliveryForm from "@/components/Checkout/DeliveryForm";
import PaymentForm from "@/components/Checkout/PaymentForm";
import OrderSummary from "@/components/Checkout/OrderSummary";

export default function CheckoutPage() {
    const {items, isLoaded, clearCart} = useCart();
    const router = useRouter();
    const [deliveryMethod, setDeliveryMethod] = useState<
        "nova" | "ukr" | "pickup"
    >("nova");
    // For Nova Poshta: "warehouse" | "poshtamat" | "courier"
    const [novaType, setNovaType] = useState<
        "warehouse" | "poshtamat" | "courier"
    >("warehouse");

    const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

    // Form State
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        comment: "",
        city: "",
        street: "",
        house: "",
        apartment: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // Delivery mock search state
    const [warehouseSearch, setWarehouseSearch] = useState("");
    const [isWarehouseListOpen, setIsWarehouseListOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");

    // Redirect to cart if empty
    useEffect(() => {
        if (!isSubmitting && isLoaded && items.length === 0) {
            router.push("/cart");
        }
    }, [items, isLoaded, router, isSubmitting]);


    // Determine which list to use based on delivery method and type
    const getActiveList = () => {
        if (deliveryMethod === "nova") {
            if (novaType === "warehouse") return MOCK_NOVA_WAREHOUSES;
            if (novaType === "poshtamat") return MOCK_NOVA_POSHTAMATS;
        }
        if (deliveryMethod === "ukr") return MOCK_UKR_WAREHOUSES;
        if (deliveryMethod === "pickup") return MOCK_PICKUP_LOCATIONS;
        return [];
    };

    const activeList = getActiveList();
    const filteredList = warehouseSearch
        ? activeList.filter((w) =>
            w.toLowerCase().includes(warehouseSearch.toLowerCase())
        )
        : activeList;

    // Reset search when method changes
    useEffect(() => {
        setWarehouseSearch("");
        setIsWarehouseListOpen(false);
        setSelectedLocation("");
    }, [deliveryMethod, novaType]);

    const totalSum = items.reduce((sum, item) => sum + item.total, 0);
    const deliveryCost = 60; // Example fixed cost
    const finalTotal = totalSum + deliveryCost;

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        if (errors[name]) {
            setErrors((prev) => ({...prev, [name]: false}));
        }
    };

    const handleOrderSubmit = async () => {
        const newErrors: Record<string, boolean> = {};

        // 1. Basic fields validation
        if (!formData.lastName.trim()) newErrors.lastName = true;
        if (!formData.firstName.trim()) newErrors.firstName = true;
        if (!formData.phone.trim()) newErrors.phone = true;
        if (!formData.email.trim()) newErrors.email = true;

        // 2. Delivery Validation
        let isDeliveryValid = true;
        if (deliveryMethod === "nova") {
            if (novaType === "courier") {
                if (!formData.city.trim()) newErrors.city = true;
                if (!formData.street.trim()) newErrors.street = true;
                if (!formData.house.trim()) newErrors.house = true;
            } else {
                if (!selectedLocation && !warehouseSearch) {
                    newErrors.location = true;
                    isDeliveryValid = false;
                }
            }
        } else if (deliveryMethod === "ukr" || deliveryMethod === "pickup") {
            if (!selectedLocation && !warehouseSearch) {
                newErrors.location = true;
                isDeliveryValid = false;
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0 || !isDeliveryValid) {
            alert(
                "Будь ласка, заповніть всі обов'язкові поля та оберіть відділення/адресу."
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Для оформлення замовлення потрібно авторизуватися.");
                setIsSubmitting(false);
                return;
            }

            // 3. Construct Order Items
            const orderItems = items.map((item) => ({
                productTypeId: item.productType?.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                specifications: item.specifications,
                orderItemExtraFeatures: item.options.map(opt => ({
                    extraFeature: { id: opt.id },
                    value: opt.label
                }))
            }));

            console.log(orderItems)

            // 4. Construct Payload
            const payload = {
                items: orderItems,


                // You can uncomment these if your backend starts accepting delivery info:
                // lastName: formData.lastName,
                // firstName: formData.firstName,
                // phone: formData.phone,
                // email: formData.email,
                // deliveryMethod: deliveryMethod,
                // warehouseId: selectedLocation
            };

            const response = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            // 5. Handle Response
            // We read as text first so we can use it for both logging and JSON parsing
            const responseText = await response.text();

            console.log("Status Code:", response.status);

            if (!response.ok) {
                console.error("Server Error Raw Output:", responseText);

                let errorMessage = "Failed to submit order";
                try {
                    // Try to extract a clean message from JSON
                    const errorJson = JSON.parse(responseText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch {
                    // If not JSON, use the raw text if it's short
                    if (responseText && responseText.length < 100) errorMessage = responseText;
                }

                // Special handling for potential stale data (IDs that don't exist anymore in DB)
                if (response.status === 500 || errorMessage.includes("Internal Error")) {
                    throw new Error(
                        `Server Error: ${errorMessage}. Hint: If the backend restarted, your Cart Items or User Token might be stale. Try clearing your cart and logging in again.`
                    );
                }
                throw new Error(errorMessage);
            }

            // 6. Success
            clearCart();
            router.push("/checkout/success");

        } catch (error: unknown) {
            console.error("Error submitting order:", error);
            const err = error as Error;
            const message = err.message || "Сталася помилка при оформленні замовлення.";

            // Logic to help the user if the DB was wiped/restarted
            if (message.includes("stale") || message.includes("backend restarted")) {
                if (confirm("Помилка сервера: можливо застаріли дані кошика через перезапуск серверу. Очистити кошик?")) {
                    clearCart();
                    router.push("/");
                }
            } else {
                alert(message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8 text-center sm:text-left">
                Оформлення замовлення
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                {/* Left Column: Forms */}
                <div className="flex-1 space-y-8">
                    <ContactForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                    />

                    <DeliveryForm
                        deliveryMethod={deliveryMethod}
                        setDeliveryMethod={setDeliveryMethod}
                        novaType={novaType}
                        setNovaType={setNovaType}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        setErrors={setErrors}
                        selectedLocation={selectedLocation}
                        warehouseSearch={warehouseSearch}
                        setWarehouseSearch={setWarehouseSearch}
                        setSelectedLocation={setSelectedLocation}
                        isWarehouseListOpen={isWarehouseListOpen}
                        setIsWarehouseListOpen={setIsWarehouseListOpen}
                        filteredList={filteredList}
                    />

                    <PaymentForm
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />

                    <Link
                        href="/cart"
                        className="inline-flex items-center text-teal font-semibold hover:text-navy transition-colors"
                    >
                        <svg
                            className="w-5 h-5 mr-2 rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                        Повернутися до корзини
                    </Link>
                </div>

                {/* Right Column: Order Summary */}
                <OrderSummary
                    items={items}
                    totalSum={totalSum}
                    deliveryCost={deliveryCost}
                    finalTotal={finalTotal}
                    handleOrderSubmit={handleOrderSubmit}
                />
            </div>
        </div>
    );
}
