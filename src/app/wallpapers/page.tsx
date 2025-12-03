"use client";
import CategorySidebar from "@/components/CategorySidebar";
import { Pagination } from "@mui/material";
import ProductPreview from "@/components/ProductPreview";
import { useEffect, useState } from "react";

export default function WallpapersPage() {
  const categories = [
    "ФОТОШПАЛЕРИ В ДИТЯЧУ",
    "ФОТОШПАЛЕРИ ДО ВІТАЛЬНІ",
    "ФОТОШПАЛЕРИ НА КУХНЮ",
    "3Д ФОТОШПАЛЕРИ",
    "ПРИРОДА",
    "КВІТИ",
  ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/wallpapers")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);
  console.log(products);
  return (
    <div className="flex flex-row px-[clamp(1rem,6vw,7.5rem)] gap-y-20 xl:gap-y-30 py-4 lg:py-8">
      <CategorySidebar categories={categories} />
      <div className="flex flex-col w-full lg:ml-8">
        <h2 className="text-black font-semibold text-2xl md:text-3xl mb-8 lg:mb-10">
          Фотошпалери
        </h2>
        <Pagination
          count={10}
          shape="rounded"
          size="large"
          color="standard"
          siblingCount={1}
          boundaryCount={0}
          sx={{
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
          }}
          className="mb-8 lg:mb-12"
        />
        <div className="grid w-full grid-cols-2 xl:grid-cols-3 gap-[clamp(1rem,2vw,2.5rem)]">
          {products.map((product: any, idx: number) => {
            const imageUrl = product.image?.startsWith("/")
              ? `http://localhost:8080${product.image}`
              : product.image;
            return (
              <ProductPreview
                key={product.id || idx}
                title={product.name}
                imageUrl={imageUrl}
                price={`${product.basePrice} грн/м²`}
                oldPrice={
                  product.oldPrice ? `${product.oldPrice} грн` : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
