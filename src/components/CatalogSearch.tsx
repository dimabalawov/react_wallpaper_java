"use client";
import React, { useState, useEffect } from "react";

interface CatalogSearchProps {
    /** Callback to update the search field in your filter state */
    onSearchChange: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
}

export default function CatalogSearch({
                                          onSearchChange,
                                          placeholder = "Пошук за назвою...",
                                          initialValue = ""
                                      }: CatalogSearchProps) {
    const [inputValue, setInputValue] = useState(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(inputValue);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [inputValue, onSearchChange]);

    return (
        <div className="relative w-full mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
}