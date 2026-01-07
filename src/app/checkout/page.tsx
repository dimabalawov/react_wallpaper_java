"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import {
  MOCK_NOVA_WAREHOUSES,
  MOCK_NOVA_POSHTAMATS,
  MOCK_UKR_WAREHOUSES,
  MOCK_PICKUP_LOCATIONS,
} from "@/data/mockDelivery";
import ContactForm from "@/components/Checkout/ContactForm";
import DeliveryForm from "@/components/Checkout/DeliveryForm";
import PaymentForm from "@/components/Checkout/PaymentForm";
import OrderSummary from "@/components/Checkout/OrderSummary";

export default function CheckoutPage() {
  const { items, isLoaded, clearCart } = useCart();
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleOrderSubmit = async () => {
    const newErrors: Record<string, boolean> = {};

    // Basic fields
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.email.trim()) newErrors.email = true;

    // Delivery Validation
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

      const orderItems = items.map((item) => {
        const specs: Record<string, string | number | boolean> = {};

        // 1. Determine Product Type
        let productTypeId = "efc8d76b-7692-472d-a6f4-5cf02f7c3b01"; // Default Souvenir
        if (item.productTypeId === 1) {
          productTypeId = "b04cf192-d7ee-4eec-8c68-1ebcdf498ba8"; // Wallpaper
        } else if (item.productTypeId === 2) {
          productTypeId = "efc8d76b-7692-472d-a6f4-5cf02f7c3b01"; // Souvenir
        } else {
          // Heuristic fallback
          productTypeId =
            item.width && item.height && !item.specifications?.color
              ? "b04cf192-d7ee-4eec-8c68-1ebcdf498ba8"
              : "efc8d76b-7692-472d-a6f4-5cf02f7c3b01";
        }

        // 2. Base specifications from item
        if (item.specifications) {
          Object.assign(specs, item.specifications);
        }

        // 3. Specific fixes per type
        if (productTypeId === "b04cf192-d7ee-4eec-8c68-1ebcdf498ba8") {
          // Wallpaper specific logic
          if (!specs.width && item.width) specs.width = item.width;
          if (!specs.height && item.height) specs.height = item.height;

          // Priority 1: Use material_id directly from specifications (set by ProductClient)
          // Priority 2: Use material_id from item.material object
          // Priority 3: Fallback data (UPDATED IDs)
          if (!specs.material_id) {
             if (typeof item.material === 'object' && item.material?.id) {
                 specs.material_id = item.material.id;
             } else {
                 // Fallback to "Флізелін" ID found in backend: 2c4a4e13-7a29-4e98-a8d7-19400f4747d8
                 specs.material_id = "2c4a4e13-7a29-4e98-a8d7-19400f4747d8"; 
             }
          }

          // FIX: backend throws 500 if 'material' (string) is in specifications. Only 'material_id' is allowed.
          if ("material" in specs) {
            delete specs.material;
          }
        } else if (productTypeId === "efc8d76b-7692-472d-a6f4-5cf02f7c3b01") {
            // Souvenir specific logic
            // Ensure irrelevant fields are removed if they exist from dirty state
            if ("material" in specs) delete specs.material;
            // Souvenirs might require 'color' or other fields. Relying on cart or safe defaults
            if (!specs.color) specs.color = "Standard";
        }

        // Map options to features (list of strings)
        const features = item.options ? item.options.map((opt) => opt.label) : [];

        return {
          productTypeId, // Added required field
          productId: item.productId,
          quantity: item.quantity || 1,
          specifications: specs,
          features, // Now correctly mapped from options
        };
      });

      // Construct the full payload with form data, just in case backend expects it (even if one use-case ignores it)
      // and to avoid 400/500 errors if strict validation is on.
      const payload = {
          items: orderItems,
          // Include form data at root level, adhering to common patterns
          // If backend ignores these, it's fine (unless strict mapping is on, but missing fields is worse for validators)
          ...formData,
          deliveryMethod,
          paymentMethod,
          novaType: deliveryMethod === 'nova' ? novaType : undefined,
          warehouseId: selectedLocation || undefined
      };

      console.log("Submitting order with payload:", JSON.stringify(payload, null, 2));

      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server 500 Error Details:", errorText); // Log raw error from server
        try {
          const errorJson = JSON.parse(errorText);
          const msg = errorJson.message || errorJson.error || "Failed to submit order";
          
          // Enhanced error handling for development environment
          if (msg.includes("Internal Error") || msg.includes("occurred")) {
            throw new Error(
              `Server Error: ${msg}. Hint: If the backend restarted, your Cart Items or User Token might be stale (invalid IDs). Try clearing your cart and logging in again.`
            );
          }
          throw new Error(msg);
        } catch (e: unknown) { // Use unknown instead of any
          // If the error we just threw is ours, rethrow it
          const err = e as Error;
          if (err.message && err.message.includes("Hint:")) throw err;
          throw new Error(`Failed to submit order: ${errorText}`);
        }
      }

      clearCart();
      router.push("/checkout/success");
    } catch (error: unknown) { // Use unknown instead of any
      console.error("Error submitting order:", error);
      const err = error as Error;
      const message = err.message || "Сталася помилка при оформленні замовлення.";
      
      // Show a more helpful alert for the stale data scenario
      if (message.includes("backend restarted")) {
        if (confirm("Помилка сервера: можливо застаріли дані кошика через перезапуск серверу. Очистити кошик?")) {
            clearCart();
            router.push("/wallpapers");
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
