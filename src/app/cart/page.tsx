"use client";
import React from "react";
import CartItem from "@/components/CartItemNew";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { items, removeFromCart } = useCart();

  const totalSum = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8 text-center sm:text-left">
        Кошик
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        {/* Left Column: Cart Items */}
        <div className="flex-1 space-y-6">
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="text-gray-400 text-xl mb-6">
                Ваш кошик порожній
              </div>
              <Link
                href="/wallpapers"
                className="inline-block bg-teal text-white font-bold rounded-xl px-8 py-3 hover:bg-navy transition-colors"
              >
                Перейти до каталогу
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
              >
                <CartItem
                  size={item.specifications?.size}
                  {...item}
                  onRemove={() => removeFromCart(item.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Right Column: Summary */}
        {items.length > 0 && (
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-navy mb-6">
                Підсумок замовлення
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-2 text-black">
                  <input
                    type="text"
                    placeholder="Промокод"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                  />
                  <button className="bg-navy text-white font-bold rounded-xl px-6 py-3 hover:bg-teal transition-colors">
                    OK
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-8 pb-8 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Товари ({items.length})</span>
                  <span>{totalSum} грн</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Знижка</span>
                  <span>0 грн</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-navy">
                  Всього до сплати
                </span>
                <span className="text-2xl font-extrabold text-teal">
                  {totalSum} грн
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 hover:shadow-navy/20 mb-4 block text-center"
              >
                ОФОРМИТИ ЗАМОВЛЕННЯ
              </Link>

              <Link
                href="/wallpapers"
                className="block text-center text-gray-500 font-medium hover:text-navy transition-colors"
              >
                Продовжити покупки
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
