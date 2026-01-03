"use client";
import React, { useState } from "react";
import DimensionInput from "@/components/DimensionInput";
import ArrowHorizontalIcon from "@/components/Media/ArrowHorizontalIcon";
import ArrowVerticalIcon from "@/components/Media/ArrowVerticalIcon";
import Extra from "@/components/Extra";
import Material from "@/components/Material";
import { WallpaperProduct } from "@/interfaces/wallpaper";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

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
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(100);
  const [material, setMaterial] = useState(0);
  const [premium, setPremium] = useState(false);
  const [glue, setGlue] = useState(false);
  const [laminate, setLaminate] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();

  const calculatePrice = () => {
    const area = (width * height) / 10000; // m2
    const basePrice = product.salePrice || product.basePrice;
    let total = basePrice * area;

    if (premium) total += 10; // Example fixed price addition
    if (glue) total += 129;
    if (laminate) total += 10;

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
    router.push("/cart");
  };

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-8">
      {/* Left: Images & Description */}
      <div className="flex flex-col md:flex-row justify-between gap-x-8 lg:gap-x-16 mb-12">
        <div className="flex flex-col w-full lg:w-[600px]">
          <img
            src={
              product.image?.startsWith("/")
                ? `http://localhost:8080${product.image}`
                : product.image
            }
            alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl mb-6"
          />
          <div className="flex gap-3 w-full justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full bg-[#D9D9D9] aspect-square rounded-xl"
              />
            ))}
          </div>
          <div className="mb-4 max-md:hidden">
            <div className="font-semibold text-2xl text-navy mb-2">Опис:</div>
            <div className="mb-4 text-[#2F4157] text-base">
              {product.description}
            </div>
            <div className="font-semibold text-2xl text-navy mb-2 mt-6">
              Характеристики:
            </div>
            <ul className="list-none pl-1 text-[#2F4157] text-base">
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
        {/* Right: Info & Form */}
        <div className="flex-1 flex flex-col max-w">
          <h1 className="text-2xl md:text-3xl text-black font-bold leading-tight mb-2">
            {product.name}
          </h1>
          <div className="text-teal text-lg font-medium mb-4">
            Артикул: {product.article}
          </div>
          <div className="text-2xl md:text-3xl font-black text-navy mb-6">
            {product.salePrice ? (
              <>
                <span className="line-through text-teal mr-2">
                  {product.basePrice} грн/м²
                </span>
                {product.salePrice} грн/м²
              </>
            ) : (
              <>{product.basePrice} грн/м²</>
            )}
          </div>
          <div className="mb-4 md:hidden">
            <div className="font-semibold text-2xl text-navy mb-2">Опис:</div>
            <div className="mb-4 text-[#2F4157] text-base">
              {product.description}
            </div>
            <div className="font-semibold text-2xl text-navy mb-2 mt-6">
              Характеристики:
            </div>
            <ul className="list-none pl-1 text-[#2F4157] text-base">
              <li>– Тип: {materials.map((m) => m.label).join(" / ")}</li>
              <li>– Щільність: {product.density} г/м²</li>
              <li>
                – Стійкість до вологи: {product.waterproof ? "так" : "ні"}
              </li>
              <li>– Клей у комплекті: за бажанням</li>
              <li>– Рекомендована кімната: {product.rooms.join(", ")}</li>
            </ul>
          </div>
          <div className="border border-teal rounded-xl p-4 sm:p-6 pb-8 mb-6">
            <div className="mb-4">
              <div className="mb-4 text-navy font-medium text-2xl">
                Введіть розміри стіни
              </div>
              <div className="flex gap-4 mb-8">
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
            <div className="mb-4">
              <div className="font-medium text-2xl text-black mb-4">
                Оберіть матеріал
              </div>
              <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-6 border-t  border-teal pt-8 mt-8 mb-4 text-navy">
              <Extra
                checked={premium}
                onChange={setPremium}
                heading={"Друк преміум"}
                price={"+10 грн"}
                desc={
                  <span>
                    Завдяки друку Преміум можна досягти покращеної якості
                    картинки з насиченими кольорами та підвищений захист
                    матеріалу від вигоряння.
                  </span>
                }
              />
              <Extra
                checked={glue}
                onChange={setGlue}
                heading={"Додати клей до замовлення"}
                price={"+129 грн"}
                desc={
                  <span>
                    Спеціальний клей для фотошпалер, що відповідає обраному
                    матеріалу.
                  </span>
                }
              />
              <Extra
                checked={laminate}
                onChange={setLaminate}
                heading={<span>Додати Ламінування</span>}
                price={<span>+10грн</span>}
                desc={
                  <span>
                    Лакування фотошпалер повністю захищає їх від вологи та
                    пошкоджень.
                  </span>
                }
                inputClassName="accent-teal self-start mt-2 mr-3"
                labelClassName="flex flex-row cursor-pointer"
              />
            </div>
            <div className="flex justify-between mt-8 border-t border-teal pt-4 mb-4">
              <div className="text-xl sm:text-2xl self-baseline-last text-navy font-semibold">
                Вартість замовлення:
              </div>
              <div className="flex flex-col">
                {product.salePrice && (
                  <div className="text-teal line-through mb-[-0.2rem] text-xl font-black">
                    {Math.round(product.basePrice * ((width * height) / 10000))}{" "}
                    грн
                  </div>
                )}
                <div className="text-2xl font-extrabold text-navy whitespace-nowrap">
                  {calculatePrice()} грн
                </div>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-teal text-white font-bold w-full rounded-lg px-8 py-3 text-lg hover:bg-transparent hover:text-teal border-2 border-teal transition-colors"
            >
              ЗАМОВИТИ
            </button>
          </div>
        </div>
      </div>
      {/* <Carousel visibleCount={5}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductPreview
            key={i}
            title="Фотошпалери багато золотистих пір'їнок"
            price="450 грн/м²"
            oldPrice="550 грн/м²"
            code="FOB-2045"
          />
        ))}
      </Carousel> */}
    </div>
  );
};

export default ProductClient;
