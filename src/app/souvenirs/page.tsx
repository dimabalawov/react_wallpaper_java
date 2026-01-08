"use client";
import CategorySidebar from "@/components/CategorySidebar";
import { Pagination } from "@mui/material";
import ProductPreview from "@/components/ProductPreview";
import React, { useEffect, useState } from "react";
import {Category, WallpaperProduct} from "@/interfaces/wallpaper";
import CatalogSearch from "@/components/CatalogSearch"; // Reusable search component

export default function SouvenirsPage() {
    const [products, setProducts] = useState<WallpaperProduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState("");

    // Derived state to determine if user is currently filtering by text
    const isSearching = searchTerm.length > 0;

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Build the query parameters
        let url = `http://localhost:8080/souvenirs?page=${page - 1}&size=6`;

        if (selectedCategory) {
            url += `&categoryId=${selectedCategory}`;
        }

        if (searchTerm) {
            url += `&name=${encodeURIComponent(searchTerm)}`;
        }

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                // Handle response from SouvenirCatalogResponse
                if (data.availableCategories && Array.isArray(data.availableCategories)) {
                    // Only set categories if they haven't been loaded yet to prevent flickering
                    if (categories.length === 0) setCategories(data.availableCategories);
                }

                if (data.products && Array.isArray(data.products.content)) {
                    setProducts(data.products.content);
                    setTotalPages(data.products.totalPages);
                } else if (Array.isArray(data.content)) {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    setProducts([]);
                    if (!searchTerm) setError("Unexpected response format");
                }
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch products");
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [page, selectedCategory, searchTerm, categories.length]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(prev => prev === categoryId ? null : categoryId);
        setPage(1); // Reset to first page on category change
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1); // Reset to first page on new search
    };

    const paginationSx = {
        "& .MuiPaginationItem-root": {
            color: "#2F4157",
            fontSize: "1rem",
            "@media (max-width: 400px)": {
                fontSize: "0.85rem",
                minWidth: "1.7rem",
                height: "1.7rem",
            },
        },
        "& .Mui-selected": {
            backgroundColor: "#F5F3F0",
            color: "#2F4157",
        },
        "& .MuiPaginationItem-previousNext": {
            backgroundColor: "#577C8E",
            color: "#fff",
            transition: "background 0.2s, color 0.2s, border 0.2s",
            border: "2px solid transparent",
            "&:hover": {
                backgroundColor: "#fff",
                color: "#577C8E",
                border: "2px solid #577C8E",
            },
        },
    };

    return (
        <div className="flex flex-row px-[clamp(1rem,6vw,7.5rem)] gap-y-20 xl:gap-y-30 py-4 lg:py-8">
            <CategorySidebar
                categories={categories}
                activeCategory={selectedCategory || undefined}
                onCategoryClick={handleCategoryClick}
            />

            <div className="flex flex-col w-full lg:ml-8">
                <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">
                    Сувеніри
                </h2>

                {/* Reusable Search Component */}
                <CatalogSearch
                    onSearchChange={handleSearchChange}
                    placeholder="Пошук сувенірів за назвою..."
                />

                <div className="flex justify-between items-center mb-8 lg:mb-12">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        shape="rounded"
                        size="large"
                        sx={paginationSx}
                    />
                    {isSearching && products.length > 0 && (
                        <span className="text-gray-400 text-sm italic">
                            Знайдено: {products.length} товарів
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20 text-gray-400 animate-pulse">
                        Завантаження...
                    </div>
                ) : error ? (
                    <div className="text-red-500 py-10 text-center">{error}</div>
                ) : (
                    <>
                        <div className="grid w-full grid-cols-2 xl:grid-cols-3 gap-[clamp(1rem,2vw,2.5rem)]">
                            {products.length > 0 ? (
                                products.map((product, idx) => {
                                    const imageUrl = product.image?.startsWith("/")
                                        ? `http://localhost:8080${product.image}`
                                        : product.image;
                                    const finalPrice = product.salePrice ?? product.basePrice;
                                    const isSale = product.salePrice != null && product.salePrice < product.basePrice;

                                    return (
                                        <ProductPreview
                                            key={product.id || idx}
                                            title={product.name}
                                            imageUrl={imageUrl}
                                            code={product.article}
                                            price={`${finalPrice} грн/шт`}
                                            oldPrice={isSale ? `${product.basePrice} грн/шт` : undefined}
                                            slug={product.slug}
                                            basePath="/souvenirs"
                                        />
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-20 text-center text-gray-500 italic">
                                    Нічого не знайдено
                                </div>
                            )}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                shape="rounded"
                                size="large"
                                sx={paginationSx}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}