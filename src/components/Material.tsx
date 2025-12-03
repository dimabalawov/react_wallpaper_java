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
  <label className="flex items-center border border-teal text-navy  rounded-xl px-4 py-3 cursor-pointer transition-colors">
    <input
      type="radio"
      name="material"
      checked={checked}
      onChange={onChange}
      className="accent-teal self-start mt-5 mr-3"
    />
    <div className="flex-1 p-2">
      <div className="font-semibold sm:text-lg mb-1">{label}</div>
      <div className="text-navy font-normal text-sm sm:text-base">{desc}</div>
    </div>
    <div className="aspect-square w-20 bg-mock rounded-lg ml-4" />
  </label>
);

export default Material;
