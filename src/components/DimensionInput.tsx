import React from "react";

interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  icon?: React.ReactNode;
}

export default function DimensionInput({
  label,
  value,
  onChange,
  min = 1,
  max = 9999,
  unit = "см",
  icon,
}: DimensionInputProps) {
  return (
    <div className="flex-1">
      <div className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wider">
        {label}
      </div>
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal/20 focus-within:border-teal transition-all">
        {icon && <div className="text-gray-400 mr-3">{icon}</div>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-navy font-bold text-lg outline-none"
        />
        <div className="text-gray-400 font-medium ml-2">{unit}</div>
      </div>
      <div className="text-xs text-gray-400 mt-2 text-right">
        = {(value / 100).toFixed(2)} м
      </div>
    </div>
  );
}
