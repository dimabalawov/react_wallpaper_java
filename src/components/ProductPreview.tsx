"use client";
import React from "react";
import AddToCartIcon from "@/components/Media/AddToCartIcon";
import Link from "next/link";
import Image from "next/image";

interface ProductPreviewProps {
  imageUrl?: string;
  title: string;
  price: string;
  oldPrice?: string;
  code?: string;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
  imageUrl,
  title,
  price,
  oldPrice,
  code = "FOB-2045",
}) => {
  return (
    <Link
      href="/wallpapers/product"
      className="flex flex-col bg-white rounded-xl w-full lg:max-w-[370px] h-full relative group no-underline"
    >
      {/* Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full aspect-square object-cover rounded-2xl mb-4"
        />
      ) : (
        <div className="w-full aspect-square bg-mock rounded-2xl mb-4" />
      )}
      {/* Title */}
      <div className="font-bold text-lg text-black leading-tight mb-1 break-words">
        {title}
      </div>
      {/* Product code */}
      <div className="text-sm md:text-lg text-[#7A8B99] font-medium mb-2">
        {code}
      </div>
      {/* Price row */}
      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-col">
          {oldPrice && (
            <span className="text-sm sm:text-lg text-[#42576A] font-bold line-through mb-1">
              {oldPrice}
            </span>
          )}
          <span className="text-medium sm:text-xl text-[#2F4157] font-extrabold">
            {price}
          </span>
        </div>
        <button
          type="button"
          className="ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Додати в кошик"
          onClick={(e) => e.preventDefault()}
        >
          <AddToCartIcon />
        </button>
      </div>
    </Link>
  );
};

export default ProductPreview;
