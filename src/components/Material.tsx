import React from "react";

interface MaterialProps {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}

const Material: React.FC<MaterialProps> = ({
  label,
  desc,
  checked,
  onChange,
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
        type="radio"
        name="material"
        checked={checked}
        onChange={onChange}
        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-teal checked:bg-teal transition-colors"
      />
      <div className="absolute w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
    </div>
    <div className="flex-1">
      <div
        className={`font-bold text-lg mb-1 ${
          checked ? "text-teal" : "text-navy"
        }`}
      >
        {label}
      </div>
      <div className="text-gray-500 text-sm leading-relaxed">{desc}</div>
    </div>
  </label>
);

export default Material;
