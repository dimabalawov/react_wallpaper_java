import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface OrderSummaryProps {
  items: ReturnType<typeof useCart>["items"];
  totalSum: number;
  deliveryCost: number;
  finalTotal: number;
  handleOrderSubmit: () => void;
}

export default function OrderSummary({
  items,
  totalSum,
  deliveryCost,
  finalTotal,
  handleOrderSubmit,
}: OrderSummaryProps) {
  return (
    <div className="lg:w-[400px] xl:w-[450px] flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-24">
        <h2 className="text-xl font-bold text-navy mb-6">Ваше замовлення</h2>

        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.imageUrl || ""}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-navy text-sm line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Розмір: {item.width}см x {item.height}см
                </p>
                <div className="font-bold text-navy text-sm">
                  {item.total} грн
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-gray-500 text-center py-4">Кошик порожній</p>
          )}
        </div>

        <div className="space-y-3 mb-8 pb-8 border-b border-gray-100">
          <div className="flex justify-between text-gray-600">
            <span>Сума:</span>
            <span className="font-medium">{totalSum} грн</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Доставка:</span>
            <span className="font-medium">{deliveryCost} грн</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold text-navy">Разом до сплати:</span>
          <span className="text-2xl font-extrabold text-teal">
            {finalTotal} грн
          </span>
        </div>

        <button
          onClick={handleOrderSubmit}
          className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 hover:shadow-navy/20"
        >
          ПЕРЕЙТИ ДО ОПЛАТИ
        </button>
      </div>
    </div>
  );
}
