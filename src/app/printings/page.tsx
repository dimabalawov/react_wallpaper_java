"use client";
import CategorySidebar from "@/components/CategorySidebar";
import { Pagination } from "@mui/material";
import ProductPreview from "@/components/ProductPreview";
import React, { useCallback, useEffect, useState } from "react";
import { Category, WallpaperProduct } from "@/interfaces/product";
import CatalogSearch from "@/components/CatalogSearch";
import CatalogFilters, { FilterState } from "@/components/CatalogFilters";

export default function PrintingsPage() {
  const [products, setProducts] = useState<WallpaperProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const isSearching = searchTerm.length > 0;
  const [extraFilters, setExtraFilters] = useState<FilterState>({});

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: (page - 1).toString(),
      size: "6",
    });

    if (selectedCategory) params.append("categoryId", selectedCategory);
    if (searchTerm) params.append("name", searchTerm);

    if (extraFilters.basePrice) {
      params.append("maxPrice", extraFilters.basePrice.toString());
    }

    const endpoint = searchTerm
      ? `http://localhost:8080/printings/search?${params.toString()}`
      : `http://localhost:8080/printings?${params.toString()}`;

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження");
        return res.json();
      })
      .then((data) => {
        if (data.availableCategories && categories.length === 0) {
          setCategories(data.availableCategories);
        }
        if (data.products?.content) {
          setProducts(data.products.content);
          setTotalPages(data.products.totalPages);
        } else {
          setProducts(data.content || []);
          setTotalPages(data.totalPages || 1);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, selectedCategory, searchTerm, extraFilters, categories.length]);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    setPage(1); // Reset to first page on category change
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm((prev) => {
      if (prev !== value) {
        setPage(1);
        return value;
      }
      return prev;
    });
  }, []);

  const handleFilterUpdate = useCallback(
    (newFilters: FilterState) => {
      setExtraFilters((prev) => {
         const isSame = JSON.stringify(prev) === JSON.stringify(newFilters);
         if (isSame) return prev;
         
         setPage(1);
         return newFilters;
      });
    },
    []
  );

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
    <div className="flex flex-col lg:flex-row px-[clamp(1rem,6vw,7.5rem)] gap-8 py-4 lg:py-8">
      {/* 1. STABLE SIDEBAR: Always rendered, never unmounts during loading */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
        <CategorySidebar
          categories={categories}
          activeCategory={selectedCategory || undefined}
          onCategoryClick={handleCategoryClick}
        />

        {/* Price filter component */}
        <CatalogFilters type="PRINTING" onFilterChange={handleFilterUpdate} />
      </aside>

      {/* 2. CONTENT AREA */}
      <div className="flex flex-col w-full lg:ml-2">
        <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">
          Поліграфія
        </h2>

        <CatalogSearch
          onSearchChange={handleSearchChange}
          placeholder="Пошук поліграфії за назвою..."
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

        {/* 3. DYNAMIC RESULTS AREA */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-20 text-gray-400">
              {/* Use a spinner or simple pulse text */}
              <div className="animate-pulse">Оновлення каталогу...</div>
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

                    // Logic for effective price display
                    const finalPrice = product.salePrice ?? product.basePrice;
                    const isSale =
                      product.salePrice != null &&
                      product.salePrice < product.basePrice;

                    return (
                      <ProductPreview
                        key={product.id || idx}
                        title={product.name}
                        imageUrl={imageUrl}
                        code={product.article}
                        price={`${finalPrice} грн/шт`}
                        oldPrice={
                          isSale ? `${product.basePrice} грн/шт` : undefined
                        }
                        slug={product.slug}
                        basePath="/printings"
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
    </div>
  );
}
