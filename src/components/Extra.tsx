import React from "react";

interface ExtraProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  heading: React.ReactNode;
  desc: React.ReactNode;
  price: React.ReactNode;
  inputClassName?: string;
  labelClassName?: string;
}

const Extra: React.FC<ExtraProps> = ({
  checked,
  onChange,
  heading,
  desc,
  price,
}) => (
  <label
    className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
      checked
        ? "border-teal bg-teal/5 shadow-sm"
        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
    }`}
  >
    <div className="relative flex items-center justify-center w-5 h-5 mt-1 mr-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:border-teal checked:bg-teal transition-colors"
      />
      <svg
        className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <div
          className={`font-bold text-lg ${checked ? "text-teal" : "text-navy"}`}
        >
          {heading}
        </div>
        <div className="font-bold text-teal ml-4">{price}</div>
      </div>
      <div className="text-gray-500 text-sm leading-relaxed">{desc}</div>
    </div>
  </label>
);

export default Extra;
