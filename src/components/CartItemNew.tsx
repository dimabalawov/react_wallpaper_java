import React from "react";
import Image from "next/image";

interface CartItemOption {
  label: string;
  price: number;
}

interface CartItemProps {
  title: string;
  code: string;
  size: string;
  material?: { name: string; id?: string } | string; // Updated type to match Context
  pricePerM2?: number;
  imageUrl?: string;
  options?: CartItemOption[];
  total: number;
  quantity?: number; // Added quantity prop
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  code,
  size,
  material,
  pricePerM2,
  imageUrl,
  options = [],
  total,
  quantity,
  onRemove,
}) => {
  const materialName =
    typeof material === "string" ? material : material?.name;

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative w-full sm:w-40 aspect-square bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-xl text-navy mb-1">{title}</h3>
              <div className="text-base text-gray-500 mb-4">
                Артикул: {code}
              </div>
            </div>
            {onRemove && (
              <button
                onClick={onRemove}
                className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Видалити
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between sm:justify-start gap-2">
              <span className="text-gray-400">Розмір:</span>
              <span className="font-medium text-navy">{size}</span>
            </div>
            {materialName && (
              <div className="flex justify-between sm:justify-start gap-2">
                <span className="text-gray-400">Матеріал:</span>
                <span className="font-medium text-navy">{materialName}</span>
              </div>
            )}
            {pricePerM2 && (
              <div className="flex justify-between sm:justify-start gap-2">
                <span className="text-gray-400">Ціна за м²:</span>
                <span className="font-medium text-navy">{pricePerM2} грн</span>
              </div>
            )}
            {quantity && quantity > 1 && (
              <div className="flex justify-between sm:justify-start gap-2">
                <span className="text-gray-400">Кількість:</span>
                <span className="font-medium text-navy">{quantity} шт.</span>
              </div>
            )}
          </div>

          {options.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Додатково
              </div>
              <ul className="space-y-1">
                {options.map((opt, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm text-gray-600 border-b border-gray-50 pb-1 last:border-0"
                  >
                    <span>{opt.label}</span>
                    <span className="font-medium text-navy">
                      +{opt.price} грн
                      {opt.label.includes("Друк") ||
                      opt.label.includes("Ламінування")
                        ? "/м²"
                        : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <div className="text-xl font-extrabold text-navy">{total} грн</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
