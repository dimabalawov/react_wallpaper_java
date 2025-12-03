"use client";
import React, { useState } from "react";
import DimensionInput from "@/components/DimensionInput";
import Carousel from "@/components/Carousel";
import ProductPreview from "@/components/ProductPreview";
import ArrowHorizontalIcon from "@/components/Media/ArrowHorizontalIcon";
import ArrowVerticalIcon from "@/components/Media/ArrowVerticalIcon";
import Extra from "@/components/Extra";
import Material from "@/components/Material";

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

export default function ProductPage() {
  const [width, setWidth] = useState(90);
  const [height, setHeight] = useState(100);
  const [material, setMaterial] = useState(0);
  const [premium, setPremium] = useState(false);
  const [glue, setGlue] = useState(false);
  const [laminate, setLaminate] = useState(false);

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-8">
      {/* Left: Images & Description */}
      <div className="flex flex-col md:flex-row justify-between gap-x-8 lg:gap-x-16 mb-12">
        <div className="flex flex-col w-full lg:w-[600px]">
          <div className="w-full aspect-square bg-[#D9D9D9] rounded-2xl mb-6" />
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
              Фотошпалери «Казковий ліс» — ідеальний вибір для дитячої кімнати,
              spальні або зони відпочинку. Малюнок надрукований на
              -високоякісному обладнанні з використанням екологічних чорнил.
              Шпалери не вигорають на сонці, стійкі до вологи та легко миються.
            </div>
            <div className="font-semibold text-2xl text-navy mb-2 mt-6">
              Характеристики:
            </div>
            <ul className="list-none pl-1 text-[#2F4157] text-base">
              <li>– Тип: флізелін / самоклейка / текстиль</li>
              <li>– Щільність: 200 г/м²</li>
              <li>– Стійкість до вологи: так</li>
              <li>– Клей у комплекті: за бажанням</li>
              <li>– Рекомендована кімната: дитяча, спальня</li>
            </ul>
          </div>
        </div>
        {/* Right: Info & Form */}
        <div className="flex-1 flex flex-col max-w">
          <h1 className="text-2xl md:text-3xl text-black font-bold leading-tight mb-2">
            Фотошпалери багато золотистих пірїнок
          </h1>
          <div className="text-teal text-lg font-medium mb-4">
            Артикул: FOB-2045
          </div>
          <div className="text-2xl md:text-3xl font-black text-navy mb-6">
            450 грн/м²
          </div>
          <div className="mb-4 md:hidden">
            <div className="font-semibold text-2xl text-navy mb-2">Опис:</div>
            <div className="mb-4 text-[#2F4157] text-base">
              Фотошпалери «Казковий ліс» — ідеальний вибір для дитячої кімнати,
              spальні або зони відпочинку. Малюнок надрукований на
              -високоякісному обладнанні з використанням екологічних чорнил.
              Шпалери не вигорають на сонці, стійкі до вологи та легко миються.
            </div>
            <div className="font-semibold text-2xl text-navy mb-2 mt-6">
              Характеристики:
            </div>
            <ul className="list-none pl-1 text-[#2F4157] text-base">
              <li>– Тип: флізелін / самоклейка / текстиль</li>
              <li>– Щільність: 200 г/м²</li>
              <li>– Стійкість до вологи: так</li>
              <li>– Клей у комплекті: за бажанням</li>
              <li>– Рекомендована кімната: дитяча, спальня</li>
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
                <div className="text-teal line-through mb-[-0.2rem] text-xl font-black">
                  450 грн
                </div>
                <div className="text-2xl font-extrabold text-navy whitespace-nowrap">
                  550 грн
                </div>
              </div>
            </div>
            <button className="bg-teal text-white font-bold w-full rounded-lg px-8 py-3 text-lg hover:bg-transparent hover:text-teal border-2 border-teal transition-colors">
              ЗАМОВИТИ
            </button>
          </div>
        </div>
      </div>
      <Carousel visibleCount={5}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductPreview
            key={i}
            title="Фотошпалери багато золотистих пір'їнок"
            price="450 грн/м²"
            oldPrice="550 грн/м²"
            code="FOB-2045"
          />
        ))}
      </Carousel>
    </div>
  );
}
