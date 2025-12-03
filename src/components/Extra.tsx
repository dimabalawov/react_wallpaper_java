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
  inputClassName = "accent-teal self-start mt-2 mr-3",
  labelClassName = "flex flex-row cursor-pointer",
}) => (
  <label className={labelClassName}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={inputClassName}
    />
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full">
        <div className="flex-1 sm:text-lg font-semibold">{heading}</div>
        <div className="font-semibold sm:text-lg ml-4">{price}</div>
      </div>
      <div className="text-sm sm:text-[16px] font-normal mt-2">{desc}</div>
    </div>
  </label>
);

export default Extra;
