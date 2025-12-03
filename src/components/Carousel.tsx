"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  children: React.ReactNode[];
  visibleCount?: number;
}

function ArrowBtn({
  onClick,
  dir,
  disabled,
}: {
  onClick?: () => void;
  dir: "left" | "right";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-10 rounded bg-teal text-white flex items-center justify-center disabled:opacity-40 hover:bg-transparent hover:border-teal hover:border-2 hover:text-teal transition-all"
      aria-label={dir === "left" ? "Назад" : "Вперед"}
    >
      {dir === "left" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
}

export default function Carousel({
  children,
  visibleCount = 4,
}: CarouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: visibleCount,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1280px)": { slides: { perView: 4 } },
      "(max-width: 1024px)": { slides: { perView: 3 } },
      "(max-width: 640px)": { slides: { perView: 2 } },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 relative">
        <h2 className="text-2xl sm:text-3xl font-semibold text-navy max-sm:text-center w-full max-sm:mb-14">
          Також рекомендуємо
        </h2>
        <div className="flex gap-3 absolute right-3 top-0 max-sm:top-14 z-20">
          <ArrowBtn dir="left" onClick={() => instanceRef.current?.prev()} />
          <ArrowBtn dir="right" onClick={() => instanceRef.current?.next()} />
        </div>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {children.map((child, idx) => (
          <div key={idx} className="keen-slider__slide px-2">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
