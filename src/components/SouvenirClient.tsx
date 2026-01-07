"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SouvenirProduct } from "@/interfaces/wallpaper";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface SouvenirClientProps {
  product: SouvenirProduct;
}

const SouvenirClient: React.FC<SouvenirClientProps> = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock images for now, API returns single image
  const productImages = product.image ? [product.image] : [];

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.name,
      code: product.article,
      size:
        product.width && product.length
          ? `${product.width}см x ${product.length}см`
          : "Standard",
      width: product.width,
      height: product.length, // Mapping length to height for simplicity or creating new field if needed
      imageUrl: product.image?.startsWith("/")
        ? `http://localhost:8080${product.image}`
        : product.image,
      options: [],
      total: (product.salePrice || product.basePrice) * quantity,
      quantity: quantity,
    });
    // Resets quantity after adding? Or just notify? Let's notify.
    toast.success(`Товар додано до кошика! (${quantity} шт.)`);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
        {/* Left Column: Images & Description */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Main Image */}
              <div className="flex-1 relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={
                    productImages[activeImageIndex]?.startsWith("/")
                      ? `http://localhost:8080${productImages[activeImageIndex]}`
                      : productImages[activeImageIndex] || ""
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Desktop Description */}
          <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-navy mb-4">Опис</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <h3 className="font-bold text-xl text-navy mb-4">Характеристики</h3>
            <ul className="space-y-3 text-gray-600">
              {product.width && product.length && (
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Розмір</span>
                  <span className="font-medium text-navy text-right">
                    {product.width} x {product.length} см
                  </span>
                </li>
              )}
              {product.thickness && (
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Товщина</span>
                  <span className="font-medium text-navy text-right">
                    {product.thickness} см
                  </span>
                </li>
              )}
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Категорії</span>
                <span className="font-medium text-navy">
                  {product.categories?.map((c) => c.name).join(", ")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Configuration & Purchase */}
        <div className="lg:w-[500px] xl:w-[550px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Header Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-navy mb-2">
                {product.name}
              </h1>
              <div className="text-gray-400 text-sm font-medium mb-6">
                Артикул: {product.article}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-extrabold text-teal">
                      {product.salePrice} грн
                    </span>
                    <span className="text-xl text-gray-400 line-through font-medium">
                      {product.basePrice} грн
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-navy">
                    {product.basePrice} грн
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-bold text-lg text-navy mb-4">Кількість</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                    <button
                      onClick={decrementQuantity}
                      className="w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-500 hover:text-navy hover:bg-gray-100 rounded-l-xl transition-colors"
                      aria-label="Зменшити кількість"
                    >
                      -
                    </button>
                    <div className="w-12 h-12 flex items-center justify-center text-xl font-bold text-navy bg-white border-x border-gray-200">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-12 h-12 flex items-center justify-center text-xl font-bold text-gray-500 hover:text-navy hover:bg-gray-100 rounded-r-xl transition-colors"
                      aria-label="Збільшити кількість"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-gray-500 text-lg">
                    Всього:{" "}
                    <span className="font-bold text-navy">
                      {(product.salePrice || product.basePrice) * quantity} грн
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Action */}
              <div className="border-t border-gray-100 pt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 hover:shadow-navy/20"
                >
                  ДОДАТИ В КОШИК
                </button>
              </div>
            </div>

            {/* Mobile Description (visible only on small screens) */}
            <div className="lg:hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl text-navy mb-4">Опис</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <h3 className="font-bold text-xl text-navy mb-4">
                Характеристики
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {product.width && product.length && (
                  <li>
                    – Розмір: {product.width} x {product.length} см
                  </li>
                )}
                {product.thickness && (
                  <li>– Товщина: {product.thickness} см</li>
                )}
                <li>
                  – Категорії:{" "}
                  {product.categories?.map((c) => c.name).join(", ")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SouvenirClient;
