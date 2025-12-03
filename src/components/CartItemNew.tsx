import React from "react";

interface CartItemOption {
  label: string;
  price: number;
}

interface CartItemProps {
  title: string;
  code: string;
  size: string;
  material: string;
  pricePerM2: number;
  imageUrl?: string;
  options?: CartItemOption[];
  total: number;
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
  onRemove,
}) => {
  return (
    <div className=" pb-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="min-w-40 max-sm:min-w-50 aspect-square bg-mock rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full aspect-square bg-red" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex h-full items-start">
            <div>
              <div className="font-semibold text-xl text-navy mb-1">
                {title}
              </div>
              <div className=" text-teal mb-1">Артикул: {code}</div>
              <div className=" text-gray-700 mb-1">
                Розмір: <span className="font-semibold">{size}</span>
              </div>
              <div className=" text-navy text-semibold mb-1">
                Матеріал: {material}
              </div>
            </div>
            {onRemove && (
              <button
                onClick={onRemove}
                className="text-2xl text-gray-400 hover:text-red-500 ml-2"
              >
                &times;
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center justify-baseline gap-2 self-baseline">
            <span className="font-semibold text-navy text-xl">Вартість:</span>
            <span className="font-bold text-xl text-navy">
              {pricePerM2} грн/м²
            </span>
          </div>
        </div>
      </div>
      {options.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row border-t border-teal pt-6">
          <div className="font-semibold text-xl text-navy mb-2">Додатково:</div>
          <div className="space-y-1 w-full sm:ml-16">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 w-full justify-between text-navy text-lg text-bold"
              >
                <div>{opt.label}</div>
                <div>{opt.price} грн</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-row w-full justify-between mt-4 border-t border-teal pt-4 font-bold text-xl text-navy">
        <div className="">Цiна:</div>
        <div>{total} грн</div>
      </div>
    </div>
  );
};

export default CartItem;
