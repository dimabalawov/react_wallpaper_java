"use client";
import React from "react";
import CartItem from "@/components/CartItemNew";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { items, removeFromCart } = useCart();

  const totalSum = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] lg:px-[clamp(3rem,10vw,16rem)] py-8">
      <div className="flex flex-col lg:flex-row justify-between gap-8 mb-6">
        <div className="space-y-8 max-w-250 w-full border-2 border-teal rounded-lg p-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-navy">
            Ваші товари
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Кошик порожній
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onRemove={() => removeFromCart(item.id)}
              />
            ))
          )}
        </div>
        <div className="flex flex-col">
          <div className="sm:min-w-100 w-full border-2 border-teal rounded-lg p-6 mb-4">
            <div className="flex flex-row gap-x-4 border-b-1 border-teal pb-6">
              <input
                type="text"
                placeholder="Введіть промокод"
                className="border border-teal rounded-lg px-4 py-2 w-full"
              />
              <button className="bg-teal text-white font-bold rounded-lg px-4 py-2 hover:bg-transparent hover:text-teal border-2 border-teal transition-colors">
                ЗАСТОСУВАТИ
              </button>
            </div>
            <div className="flex justify-between items-center pt-6">
              <div className="text-xl font-semibold text-navy">Всього:</div>
              <div className="text-2xl font-extrabold text-navy">
                {totalSum} грн
              </div>
            </div>
          </div>
          <button className="bg-teal text-white font-bold w-full rounded-lg px-8 py-3 text-lg hover:bg-transparent hover:text-teal border-2 border-teal transition-colors mb-4">
            ОФОРМИТИ ЗАМОВЛЕННЯ
          </button>
          <Link
            href="/wallpapers"
            className="text-center text-teal font-semibold hover:underline"
          >
            Продовжити покупки
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
