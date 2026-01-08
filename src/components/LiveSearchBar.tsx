"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {BaseProductAutocomplete} from "@/interfaces/wallpaper";

export default function LiveSearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<BaseProductAutocomplete[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetch(`http://localhost:8080/catalog/search?query=${encodeURIComponent(query)}`)
                .then((res) => res.json())
                .then((data) => {
                    const searchResults = data.items || [];
                    setResults(searchResults);
                    setIsOpen(searchResults.length > 0);
                })
                .catch((err) => {
                    console.error("Search error:", err);
                    setResults([]);
                });
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    placeholder="Пошук товарів за назвою..."
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all shadow-sm"
                />
                <div className="absolute right-4 top-3.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Dropdown Results */}
            {/* Dropdown Results */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-[400px] overflow-y-auto">
                    {results.length > 0 ? (
                        <div className="flex flex-col">
                            {results.map((product) => {
                                const getBasePath = (type: string) => {
                                    switch (type) {
                                        case "SOUVENIR": return "/souvenirs";
                                        case "WALLPAPER": return "/wallpapers";
                                        case "PRINTING": return "/printings";
                                        default: return "/wallpapers";
                                    }
                                };

                                const basePath = getBasePath(product.productType);
                                const dynamicUrl = `${basePath}/${product.slug}`;

                                return (
                                    <Link
                                        key={product.id}
                                        href={dynamicUrl}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none"
                                    >
                                        {product.image && (
                                            <div className="relative w-10 h-10 flex-shrink-0">
                                                <Image
                                                    src={product.image.startsWith('/') ? `http://localhost:8080${product.image}` : product.image}
                                                    alt=""
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                        )}

                                        <div className="flex flex-col">
                                            <span className="font-semibold text-navy text-sm">{product.name}</span>
                                            <span className="text-xs text-gray-400">Артикул: {product.article}</span>
                                        </div>
                                        <div className="ml-auto text-teal font-bold text-sm whitespace-nowrap">
                                            {product.salePrice || product.basePrice} грн
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="px-5 py-4 text-gray-500 text-sm italic">
                            Нічого не знайдено
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}