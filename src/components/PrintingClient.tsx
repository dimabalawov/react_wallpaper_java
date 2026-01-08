"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ExtraFeature, PrintingProduct, PrintMethod } from "@/interfaces/product";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Extra from "@/components/Extra";
import { mapProductToCartItem } from "@/utils/cartMapper";
import { ProductType } from "@/interfaces/productType";

interface PrintingClientProps {
  product: PrintingProduct;
  extraFeatures: ExtraFeature[];
  productType?: ProductType;
}

const PrintingClient: React.FC<PrintingClientProps> = ({
  product,
  extraFeatures,
  productType,
}) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, boolean>
  >({});
  
  // Default to the first available method if any
  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    product.methods && product.methods.length > 0
      ? product.methods[0].id
      : ""
  );

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateTotalPrice = () => {
    const base = product.salePrice ?? product.basePrice;
    let extraCost = 0;

    extraFeatures?.forEach((feature) => {
      if (selectedFeatures[feature.id]) {
        extraCost += feature.price;
      }
    });

    return (base + extraCost) * quantity;
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const method = product.methods?.find((m) => m.id === selectedMethodId);
    
    // Check if a method is required but not selected (if methods exist)
    if (product.methods && product.methods.length > 0 && !selectedMethodId) {
      toast.error("Будь ласка, оберіть спосіб друку");
      return;
    }

    const cartItem = mapProductToCartItem({
        product,
        productType,
        selectedFeatures,
        extraFeatures,
        quantity,
        totalPrice: calculateTotalPrice(),
        specifications: {
            method_id: selectedMethodId,
            method_name: method?.name || ""
        }
    });

    addToCart(cartItem);
    toast.success(`"${product.name}" додано до кошика!`);
  };

  const selectedMethod = product.methods?.find(
    (m) => m.id === selectedMethodId
  );

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
        {/* Left Column: Visuals & Description */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={
                  product.image?.startsWith("/")
                    ? `http://localhost:8080${product.image}`
                    : product.image || ""
                }
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-navy mb-4">Опис послуги</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>
            
            {/* Show details about selected method if available */}
             {selectedMethod && (
                <div className="mt-6 bg-teal/5 p-4 rounded-xl border border-teal/20">
                    <h4 className="font-bold text-teal mb-2">Обраний метод: {selectedMethod.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedMethod.description}</p>
                    <div className="text-xs text-gray-500 font-medium">
                        Термін виготовлення: {selectedMethod.deadline} дн.
                    </div>
                </div>
            )}
          </div>
        </div>

        {/* Right Column: Configuration */}
        <div className="lg:w-[500px] xl:w-[550px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-navy mb-2">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-extrabold text-navy">
                  {product.salePrice ?? product.basePrice} грн
                </span>
                {product.salePrice != null && (
                  <span className="text-xl text-gray-400 line-through font-medium">
                    {product.basePrice} грн
                  </span>
                )}
              </div>
              <div className="text-gray-400 text-sm font-medium mb-8">
                Артикул: {product.article}
              </div>

              {/* --- Print Methods Section --- */}
              {product.methods && product.methods.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-navy mb-4">
                    Спосіб друку
                  </h3>
                  <div className="flex flex-col gap-3">
                    {product.methods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethodId(method.id)}
                        className={`text-left px-5 py-3 rounded-xl border-2 transition-all ${
                          selectedMethodId === method.id
                            ? "border-teal bg-teal/5 text-navy"
                            : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">
                          {method.name}
                        </div>
                        <div className="text-xs opacity-80">
                            {method.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- Extra Features Section --- */}
              {extraFeatures.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-navy mb-4">
                    Додаткові опції
                  </h3>
                  <div className="space-y-3">
                    {extraFeatures.map((feature) => (
                      <Extra
                        key={feature.id}
                        checked={selectedFeatures[feature.id] ?? false}
                        onChange={() => toggleFeature(feature.id)}
                        heading={feature.name}
                        price={`+${feature.price} грн`}
                        desc={feature.description}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* --- Quantity Selector --- */}
              <div className="mb-8">
                <h3 className="font-bold text-lg text-navy mb-4">Кількість</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={decrementQuantity}
                      className="w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-500 hover:bg-gray-100 rounded-l-xl transition-colors"
                    >
                      -
                    </button>
                    <div className="w-12 h-12 flex items-center justify-center text-xl font-bold text-navy bg-white border-x border-gray-200">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-500 hover:bg-gray-100 rounded-r-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* --- Total & Action --- */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-500 font-medium">
                    Разом до оплати:
                  </span>
                  <div className="text-3xl font-extrabold text-teal">
                    {calculateTotalPrice()} грн
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 active:scale-[0.98]"
                >
                  ДОДАТИ В КОШИК
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintingClient;
