import React from "react";

interface PaymentFormProps {
  paymentMethod: "card" | "cod";
  setPaymentMethod: (method: "card" | "cod") => void;
}

export default function PaymentForm({
  paymentMethod,
  setPaymentMethod,
}: PaymentFormProps) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-navy mb-6">Оплата</h2>
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center mt-1">
            <input
              type="radio"
              name="payment"
              className="peer sr-only"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <span className="block font-medium text-navy group-hover:text-teal transition-colors">
              Карткою Visa / MasterCard
            </span>
            <span className="text-sm text-gray-500">
              Оплата через LiqPay, ApplePay, GooglePay
            </span>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center mt-1">
            <input
              type="radio"
              name="payment"
              className="peer sr-only"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <span className="block font-medium text-navy group-hover:text-teal transition-colors">
              Післяплата
            </span>
            <span className="text-sm text-gray-500">
              Оплата на пошті (комісія НП 2% + 20 грн)
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
