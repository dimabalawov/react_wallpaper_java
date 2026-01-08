import Link from "next/link";
import React from "react";

export default function OrderSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div
                className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 max-w-lg w-full text-center">
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-teal"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-navy mb-4">
                    Дякуємо за замовлення!
                </h1>
                <p className="text-gray-600 mb-8">
                    Ваше замовлення успішно прийнято. Ми зв&apos;яжемося з вами найближчим
                    часом для уточнення деталей.
                </p>

                <Link
                    href="/"
                    className="inline-block w-full bg-teal text-white font-medium py-3 px-6 rounded-xl hover:bg-teal-dark active:scale-[0.98] transition-all"
                >
                    На головну
                </Link>
            </div>
        </div>
    );
}
