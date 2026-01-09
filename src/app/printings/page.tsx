"use client";
import CategorySidebar from "@/components/CategorySidebar";
import { Pagination } from "@mui/material";
import ProductPreview from "@/components/ProductPreview";
import React, { useCallback, useEffect, useState } from "react";
// Змінено інтерфейс на PrintingProduct або загальний Product для точності
import { Category, PrintingProduct } from "@/interfaces/product";
import CatalogSearch from "@/components/CatalogSearch";
import CatalogFilters, { FilterState } from "@/components/CatalogFilters";

export const dynamicParams = true;

export default function PrintingsPage() {
  const [products, setProducts] = useState<PrintingProduct[]>([]);
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
      params.append("basePrice", extraFilters.basePrice.toString());
    }

    fetch(`http://localhost:8080/printings?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження");
        return res.json();
      })
      .then((data) => {
        if (data.availableCategories && categories.length === 0) {
          setCategories(data.availableCategories);
        }

        const content = data.products?.content || data.content || [];
        const pages = data.products?.totalPages || data.totalPages || 1;

        setProducts(content);
        setTotalPages(pages);
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
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const handleFilterUpdate = useCallback((newFilters: FilterState) => {
    setExtraFilters(newFilters);
    setPage(1);
  }, []);

  const paginationSx = {
    "& .MuiPaginationItem-root": {
      color: "#2F4157",
      fontSize: "1rem",
    },
    "& .Mui-selected": {
      backgroundColor: "#F5F3F0 !important",
      color: "#2F4157",
      fontWeight: "bold",
    },
    "& .MuiPaginationItem-previousNext": {
      backgroundColor: "#577C8E",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#2F4157",
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row px-[clamp(1rem,6vw,7.5rem)] gap-8 py-4 lg:py-8">
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
        <CategorySidebar
          categories={categories}
          activeCategory={selectedCategory || undefined}
          onCategoryClick={handleCategoryClick}
        />
        <CatalogFilters type="PRINTING" onFilterChange={handleFilterUpdate} />
      </aside>

      <div className="flex flex-col w-full lg:ml-2">
        <h2 className="text-navy font-semibold text-2xl md:text-3xl mb-6">
          Поліграфія
        </h2>

        <CatalogSearch
          onSearchChange={handleSearchChange}
          placeholder="Пошук поліграфії за назвою..."
        />

        <div className="flex justify-between items-center mb-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            sx={paginationSx}
          />
          {isSearching && (
            <span className="text-gray-400 text-sm">
              Знайдено результатів: {products.length}
            </span>
          )}
        </div>

        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse text-gray-400">Завантаження...</div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-10 text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductPreview
                    key={product.id}
                    title={product.name}
                    imageUrl={
                      product.image?.startsWith("/")
                        ? `http://localhost:8080${product.image}`
                        : product.image
                    }
                    code={product.article}
                    price={`${product.salePrice ?? product.basePrice} грн`}
                    oldPrice={
                      product.salePrice ? `${product.basePrice} грн` : undefined
                    }
                    slug={product.slug}
                    basePath="/printings"
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-500">
                  За вашим запитом нічого не знайдено
                </div>
              )}
            </div>
          )}
        </div>

        {totalPages > 1 && !loading && (
          <div className="mt-12 flex justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={paginationSx}
            />
          </div>
        )}
      </div>
    </div>
  );
}
