"use client";
import CategorySidebar from "@/components/CategorySidebar";
import { Pagination } from "@mui/material";
import ProductPreview from "@/components/ProductPreview";
import React, { useEffect, useState } from "react";
import { WallpaperProduct } from "@/interfaces/product";
import CatalogSearch from "@/components/CatalogSearch";
import CatalogFilters, { FilterState } from "@/components/CatalogFilters"; // Import the filter component

export default function WallpapersPage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState<WallpaperProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // New state for additional filters (Price, etc.)
    const [extraFilters, setExtraFilters] = useState<FilterState>({});

    const isSearching = searchTerm.length > 0;

    useEffect(() => {
        setLoading(true);
        setError(null);

        // 1. Construct URL using URLSearchParams for cleaner code
        const params = new URLSearchParams({
            page: (page - 1).toString(),
            size: "6",
        });

        if (selectedCategoryId) params.append("categoryId", selectedCategoryId);
        if (searchTerm) params.append("name", searchTerm);

        if (extraFilters.basePrice) {
            params.append("basePrice", extraFilters.basePrice.toString());
        }

        fetch(`http://localhost:8080/wallpapers?${params.toString()}`)
            .then((res) => {
                if (!res.ok) throw new Error("Помилка завантаження");
                return res.json();
            })
            .then((data) => {
                if (data.products && Array.isArray(data.products.content)) {
                    if (categories.length === 0) setCategories(data.availableCategories);
                    setProducts(data.products.content);
                    setTotalPages(data.products.totalPages);
                } else if (Array.isArray(data.content)) {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    setProducts([]);
                }
            })
            .catch((err) => {
                setError(err.message || "Failed to fetch products");
                setProducts([]);
            })
            .finally(() => setLoading(false));

    }, [page, selectedCategoryId, searchTerm, extraFilters, categories.length]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handleFilterUpdate = React.useCallback((newFilters: FilterState) => {
        setExtraFilters(prev => {
            if (JSON.stringify(prev) === JSON.stringify(newFilters)) return prev;
            return newFilters;
        });
        setPage(1);
    }, []);

    const paginationSx = {
        "& .MuiPaginationItem-root": { color: "#2F4157", fontSize: "1rem" },
        "& .Mui-selected": { backgroundColor: "#F5F3F0", color: "#2F4157" },
        "& .MuiPaginationItem-previousNext": {
            backgroundColor: "#577C8E",
            color: "#fff",
            "&:hover": { backgroundColor: "#fff", color: "#577C8E", border: "2px solid #577C8E" },
        },
    };

    return (
        <div className="flex flex-col lg:flex-row px-[clamp(1rem,6vw,7.5rem)] gap-8 py-4 lg:py-8">
            {/* SIDEBAR AREA */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                <CategorySidebar
                    categories={categories}
                    onCategoryClick={handleCategoryClick}
                    activeCategory={selectedCategoryId!}
                />

                {/* FILTER COMPONENT */}
                <CatalogFilters
                    type="WALLPAPER"
                    onFilterChange={handleFilterUpdate}
                />
            </aside>

            <div className="flex flex-col w-full lg:ml-2">
                <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">
                    Фотошпалери
                </h2>

                <CatalogSearch
                    onSearchChange={handleSearchChange}
                    placeholder="Пошук шпалер за назвою..."
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
                    {isSearching && (
                        <span className="text-gray-400 text-sm">
                            Знайдено: {products.length} товарів
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-pulse text-gray-400">Завантаження товарів...</div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 py-10">{error}</div>
                ) : (
                    <>
                        <div className="grid w-full grid-cols-2 xl:grid-cols-3 gap-[clamp(1rem,2vw,2.5rem)]">
                            {products.length > 0 ? (
                                products.map((product, idx) => {
                                    const imageUrl = product.image?.startsWith("/")
                                        ? `http://localhost:8080${product.image}`
                                        : product.image;

                                    return (
                                        <ProductPreview
                                            key={product.id || idx}
                                            title={product.name}
                                            imageUrl={imageUrl}
                                            code={product.article}
                                            price={`${product.salePrice ?? product.basePrice} грн/м²`}
                                            oldPrice={product.salePrice ? `${product.basePrice} грн/м²` : undefined}
                                            slug={product.slug}
                                            basePath="/wallpapers"
                                        />
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-20 text-center text-gray-500 italic">
                                    Товарів не знайдено за вашим запитом.
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