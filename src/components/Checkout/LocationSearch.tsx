import React from "react";

interface LocationSearchProps {
  placeholder: string;
  selectedLocation: string;
  warehouseSearch: string;
  setWarehouseSearch: (value: string) => void;
  setSelectedLocation: (value: string) => void;
  isWarehouseListOpen: boolean;
  setIsWarehouseListOpen: (value: boolean) => void;
  filteredList: string[];
  errors: Record<string, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export default function LocationSearch({
  placeholder,
  selectedLocation,
  warehouseSearch,
  setWarehouseSearch,
  setSelectedLocation,
  isWarehouseListOpen,
  setIsWarehouseListOpen,
  filteredList,
  errors,
  setErrors,
}: LocationSearchProps) {
  return (
    <div className="ml-8 mt-4">
      <div className="relative z-20">
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all ${
            errors.location ? "border-red-500" : "border-gray-200"
          }`}
          value={selectedLocation || warehouseSearch}
          onChange={(e) => {
            setWarehouseSearch(e.target.value);
            setSelectedLocation("");
            setIsWarehouseListOpen(true);
            if (errors.location)
              setErrors((prev) => ({
                ...prev,
                location: false,
              }));
          }}
          onFocus={() => setIsWarehouseListOpen(true)}
          onBlur={() => setTimeout(() => setIsWarehouseListOpen(false), 200)}
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {isWarehouseListOpen && (
          <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl max-h-60 overflow-y-auto shadow-lg z-30">
            {filteredList && filteredList.length > 0 ? (
              filteredList.map((wh, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                  onClick={() => {
                    setSelectedLocation(wh);
                    setWarehouseSearch("");
                    setIsWarehouseListOpen(false);
                  }}
                >
                  {wh}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                Нічого не знайдено
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
