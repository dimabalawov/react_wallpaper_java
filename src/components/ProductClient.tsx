"use client";
import React, { useState } from "react";
import Image from "next/image";
import DimensionInput from "@/components/DimensionInput";
import ArrowHorizontalIcon from "@/components/Media/ArrowHorizontalIcon";
import ArrowVerticalIcon from "@/components/Media/ArrowVerticalIcon";
import Extra from "@/components/Extra";
import Material from "@/components/Material";
import { WallpaperProduct } from "@/interfaces/wallpaper";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const materials = [
  {
    label: "Флізелінові шпалери",
    desc: "Легко клеяться на стіну, стійкі до деформацій. Ідеально для сухих приміщень.",
  },
  {
    label: "Самоклеючі шпалери",
    desc: "Монтаж без клею — просто зніміть плівку та приклейте. Підходять для швидкого оновлення інтер'єру.",
  },
  {
    label: "Текстильні шпалери",
    desc: "Мають приємну на дотик тканинну фактуру, виглядають дорого та елегантно. Поглинають шум.",
  },
];

interface ProductClientProps {
  product: WallpaperProduct;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(250);
  const [material, setMaterial] = useState(0);
  const [premium, setPremium] = useState(false);
  const [glue, setGlue] = useState(false);
  const [laminate, setLaminate] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock images for demonstration since backend only provides one
  const productImages = product.image
    ? [product.image, product.image, product.image, product.image]
    : [];

  const { addToCart } = useCart();

  const calculatePrice = () => {
    const area = (width * height) / 10000; // m2
    const basePrice = product.salePrice || product.basePrice;
    let total = basePrice * area;

    if (premium) total += 10 * area; // Assuming premium is per m2 or fixed? Let's assume fixed for now based on previous code, but usually it's per m2. Previous code was +10. Let's keep it simple.
    if (glue) total += 129;
    if (laminate) total += 10 * area;

    return Math.round(total);
  };

  const handleAddToCart = () => {
    const options = [];
    if (premium) options.push({ label: "Друк преміум", price: 10 });
    if (glue) options.push({ label: "Клей", price: 129 });
    if (laminate) options.push({ label: "Ламінування", price: 10 });

    addToCart({
      productId: product.id,
      title: product.name,
      code: product.article,
      size: `${width}см x ${height}см`,
      width,
      height,
      material: materials[material].label,
      pricePerM2: product.salePrice || product.basePrice,
      imageUrl: product.image?.startsWith("/")
        ? `http://localhost:8080${product.image}`
        : product.image,
      options,
      total: calculatePrice(),
    });
    toast.success("Товар додано до кошика!");
  };

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
        {/* Left Column: Images & Description */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}

              {/* Main Image */}
              <div className="flex-1 relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={
                    productImages[activeImageIndex]?.startsWith("/")
                      ? `http://localhost:8080${productImages[activeImageIndex]}`
                      : productImages[activeImageIndex] || ""
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Desktop Description */}
          <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-navy mb-4">Опис</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <h3 className="font-bold text-xl text-navy mb-4">Характеристики</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Тип</span>
                <span className="font-medium text-navy text-right">
                  {materials.map((m) => m.label).join(" / ")}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Щільність</span>
                <span className="font-medium text-navy">
                  {product.density} г/м²
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Вологостійкість</span>
                <span className="font-medium text-navy">
                  {product.waterproof ? "Так" : "Ні"}
                </span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Клей</span>
                <span className="font-medium text-navy">За бажанням</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Приміщення</span>
                <span className="font-medium text-navy">
                  {product.rooms.join(", ")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Configuration & Purchase */}
        <div className="lg:w-[500px] xl:w-[550px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Header Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-navy mb-2">
                {product.name}
              </h1>
              <div className="text-gray-400 text-sm font-medium mb-6">
                Артикул: {product.article}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-extrabold text-teal">
                      {product.salePrice} грн/м²
                    </span>
                    <span className="text-xl text-gray-400 line-through font-medium">
                      {product.basePrice} грн/м²
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-navy">
                    {product.basePrice} грн/м²
                  </span>
                )}
              </div>

              {/* Dimensions */}
              <div className="mb-8">
                <h3 className="font-bold text-lg text-navy mb-4">
                  Розміри стіни
                </h3>
                <div className="flex gap-4">
                  <DimensionInput
                    label="Ширина"
                    value={width}
                    onChange={setWidth}
                    min={1}
                    max={999}
                    unit="см"
                    icon={<ArrowHorizontalIcon />}
                  />
                  <DimensionInput
                    label="Висота"
                    value={height}
                    onChange={setHeight}
                    min={1}
                    max={999}
                    unit="см"
                    icon={<ArrowVerticalIcon />}
                  />
                </div>
              </div>

              {/* Material Selection */}
              <div className="mb-8">
                <h3 className="font-bold text-lg text-navy mb-4">Матеріал</h3>
                <div className="space-y-3">
                  {materials.map((m, i) => (
                    <Material
                      key={i}
                      label={m.label}
                      desc={m.desc}
                      checked={material === i}
                      onChange={() => setMaterial(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Extra Options */}
              <div className="mb-8">
                <h3 className="font-bold text-lg text-navy mb-4">
                  Додаткові опції
                </h3>
                <div className="space-y-3">
                  <Extra
                    checked={premium}
                    onChange={setPremium}
                    heading="Друк преміум"
                    price="+10 грн/м²"
                    desc="Покращена якість картинки з насиченими кольорами та захист від вигоряння."
                  />
                  <Extra
                    checked={glue}
                    onChange={setGlue}
                    heading="Додати клей"
                    price="+129 грн"
                    desc="Спеціальний клей для фотошпалер, що відповідає обраному матеріалу."
                  />
                  <Extra
                    checked={laminate}
                    onChange={setLaminate}
                    heading="Ламінування"
                    price="+10 грн/м²"
                    desc="Лакування фотошпалер повністю захищає їх від вологи та пошкоджень."
                  />
                </div>
              </div>

              {/* Total & Action */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-500 font-medium">
                    Загальна вартість:
                  </span>
                  <div className="text-right">
                    {product.salePrice && (
                      <div className="text-gray-400 line-through text-sm font-medium mb-1">
                        {Math.round(
                          product.basePrice * ((width * height) / 10000)
                        )}{" "}
                        грн
                      </div>
                    )}
                    <div className="text-3xl font-extrabold text-navy">
                      {calculatePrice()} грн
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 hover:shadow-navy/20"
                >
                  ДОДАТИ В КОШИК
                </button>
              </div>
            </div>

            {/* Mobile Description (visible only on small screens) */}
            <div className="lg:hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl text-navy mb-4">Опис</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <h3 className="font-bold text-xl text-navy mb-4">
                Характеристики
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>– Тип: {materials.map((m) => m.label).join(" / ")}</li>
                <li>– Щільність: {product.density} г/м²</li>
                <li>
                  – Стійкість до вологи: {product.waterproof ? "так" : "ні"}
                </li>
                <li>– Клей у комплекті: за бажанням</li>
                <li>– Рекомендована кімната: {product.rooms.join(", ")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
