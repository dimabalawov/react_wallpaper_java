"use client";
import CategorySidebar from "@/components/CategorySidebar";
import { Pagination } from "@mui/material";
import ProductPreview from "@/components/ProductPreview";
import React, { useEffect, useState } from "react";
import { WallpaperProduct } from "@/interfaces/wallpaper";

export default function WallpapersPage() {
  const categories = [
    "ФОТОШПАЛЕРИ В ДИТЯЧУ",
    "ФОТОШПАЛЕРИ ДО ВІТАЛЬНІ",
    "ФОТОШПАЛЕРИ НА КУХНЮ",
    "3Д ФОТОШПАЛЕРИ",
    "ПРИРОДА",
    "КВІТИ",
  ];
  const [products, setProducts] = useState<WallpaperProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/wallpapers?page=${page - 1}&size=6`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // Check for nested structure: data.products.content
        if (data.products && Array.isArray(data.products.content)) {
          setProducts(data.products.content);
          setTotalPages(data.products.totalPages);
        }
        // If your API returns { content: [...] }
        else if (Array.isArray(data.content)) {
          setProducts(data.content);
          setTotalPages(data.totalPages);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected response format:", data);
          setProducts([]);
          setError("Unexpected response format");
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch products");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      "@media (max-width: 640px)": {
        minWidth: "2.2rem",
        height: "2.2rem",
      },
      "@media (max-width: 400px)": {
        minWidth: "1.7rem",
        height: "1.7rem",
      },
      "&:hover": {
        backgroundColor: "#fff",
        color: "#577C8E",
        border: "2px solid #577C8E",
      },
    },
  };

  return (
    <div className="flex flex-row px-[clamp(1rem,6vw,7.5rem)] gap-y-20 xl:gap-y-30 py-4 lg:py-8">
      <CategorySidebar categories={categories} />
      <div className="flex flex-col w-full lg:ml-8">
        <h2 className="text-black font-semibold text-2xl md:text-3xl mb-8 lg:mb-10">
          Фотошпалери
        </h2>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          color="standard"
          siblingCount={1}
          boundaryCount={0}
          sx={paginationSx}
          className="mb-8 lg:mb-12"
        />
        {loading && <div>Завантаження...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid w-full grid-cols-2 xl:grid-cols-3 gap-[clamp(1rem,2vw,2.5rem)]">
          {products.map((product, idx) => {
            const imageUrl = product.image?.startsWith("/")
              ? `http://localhost:8080${product.image}`
              : product.image;

            const finalPrice = product.salePrice ?? product.basePrice;
            const isSale =
              product.salePrice != null &&
              product.salePrice < product.basePrice;

            return (
              <ProductPreview
                key={product.article || idx}
                title={product.name || product.article}
                imageUrl={imageUrl}
                code={product.article}
                price={`${finalPrice} грн/м²`}
                oldPrice={isSale ? `${product.basePrice} грн/м²` : undefined}
                slug={product.slug}
                basePath="/wallpapers"
              />
            );
          })}
        </div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          color="standard"
          siblingCount={1}
          boundaryCount={0}
          sx={paginationSx}
          className="mt-8 lg:mt-12"
        />
      </div>
    </div>
  );
}
