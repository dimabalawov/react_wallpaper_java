"use client";
import React, { useState, useEffect, useRef } from "react";

export interface FilterState {
    basePrice?: number;
}

interface CatalogFiltersProps {
    type: "WALLPAPER" | "SOUVENIR" | "PRINTING";
    onFilterChange: (filters: FilterState) => void;
}

export default function CatalogFilters({ type, onFilterChange }: CatalogFiltersProps) {
    const [priceInput, setPriceInput] = useState<string>("");
    const lastSentValue = useRef<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (priceInput !== lastSentValue.current) {
                lastSentValue.current = priceInput;

                const numericValue = priceInput === "" ? undefined : Number(priceInput);
                onFilterChange({ basePrice: numericValue });
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [priceInput, onFilterChange]);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-navy text-lg mb-4 border-b pb-2">Фільтри</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                        Макс. ціна
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={priceInput}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setPriceInput(val);
                        }}
                        placeholder="грн"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-teal outline-none text-black"
                    />
                </div>
                <button
                    onClick={() => setPriceInput("")}
                    className="text-xs text-gray-400 hover:text-red-500 underline"
                >
                    Скинути ціну
                </button>
            </div>
        </div>
    );
}