import React from "react";
import LocationSearch from "./LocationSearch";

interface DeliveryFormProps {
  deliveryMethod: "nova" | "ukr" | "pickup";
  setDeliveryMethod: (method: "nova" | "ukr" | "pickup") => void;
  novaType: "warehouse" | "poshtamat" | "courier";
  setNovaType: (type: "warehouse" | "poshtamat" | "courier") => void;
  formData: {
    city: string;
    street: string;
    house: string;
    apartment: string;
    [key: string]: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  selectedLocation: string;
  warehouseSearch: string;
  setWarehouseSearch: (value: string) => void;
  setSelectedLocation: (value: string) => void;
  isWarehouseListOpen: boolean;
  setIsWarehouseListOpen: (value: boolean) => void;
  filteredList: string[];
}

export default function DeliveryForm({
  deliveryMethod,
  setDeliveryMethod,
  novaType,
  setNovaType,
  formData,
  handleInputChange,
  errors,
  setErrors,
  selectedLocation,
  warehouseSearch,
  setWarehouseSearch,
  setSelectedLocation,
  isWarehouseListOpen,
  setIsWarehouseListOpen,
  filteredList,
}: DeliveryFormProps) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-navy mb-6">Доставка</h2>

      {/* Delivery Method Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setDeliveryMethod("nova")}
          className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 transition-all font-medium ${
            deliveryMethod === "nova"
              ? "border-teal text-navy bg-teal/5"
              : "border-gray-200 text-gray-500 hover:border-teal/50"
          }`}
        >
          <span>Нова Пошта</span>
        </button>
        <button
          onClick={() => setDeliveryMethod("ukr")}
          className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 transition-all font-medium ${
            deliveryMethod === "ukr"
              ? "border-teal text-navy bg-teal/5"
              : "border-gray-200 text-gray-500 hover:border-teal/50"
          }`}
        >
          <span>Укрпошта</span>
        </button>
        <button
          onClick={() => setDeliveryMethod("pickup")}
          className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 transition-all font-medium ${
            deliveryMethod === "pickup"
              ? "border-teal text-navy bg-teal/5"
              : "border-gray-200 text-gray-500 hover:border-teal/50"
          }`}
        >
          <span>Самовивіз</span>
        </button>
      </div>

      {/* Delivery Options (Nova Poshta example) */}
      {deliveryMethod === "nova" && (
        <div className="space-y-4">
          {/* Nova Poshta Warehouse Option */}
          <div className="group text-black">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center mt-1">
                <input
                  type="radio"
                  name="nova_type"
                  className="peer sr-only"
                  checked={novaType === "warehouse"}
                  onChange={() => setNovaType("warehouse")}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <span className="block font-medium text-navy group-hover:text-teal transition-colors">
                  Відділення Нової Пошти
                </span>
                <span className="text-sm text-gray-500 block">
                  Виберіть або знайдіть відділення
                </span>
              </div>
            </label>

            {novaType === "warehouse" && (
              <LocationSearch
                placeholder="Введіть відділення"
                selectedLocation={selectedLocation}
                warehouseSearch={warehouseSearch}
                setWarehouseSearch={setWarehouseSearch}
                setSelectedLocation={setSelectedLocation}
                isWarehouseListOpen={isWarehouseListOpen}
                setIsWarehouseListOpen={setIsWarehouseListOpen}
                filteredList={filteredList}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </div>

          {/* Nova Poshta Poshtamat Option */}
          <div className="group text-black">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="nova_type"
                  className="peer sr-only"
                  checked={novaType === "poshtamat"}
                  onChange={() => setNovaType("poshtamat")}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <span className="block font-medium text-navy group-hover:text-teal transition-colors">
                  Поштомат Нової Пошти
                </span>
              </div>
            </label>

            {novaType === "poshtamat" && (
              <LocationSearch
                placeholder="Введіть адресу поштомату"
                selectedLocation={selectedLocation}
                warehouseSearch={warehouseSearch}
                setWarehouseSearch={setWarehouseSearch}
                setSelectedLocation={setSelectedLocation}
                isWarehouseListOpen={isWarehouseListOpen}
                setIsWarehouseListOpen={setIsWarehouseListOpen}
                filteredList={filteredList}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer group text-black">
            <div className="relative flex items-center">
              <input
                type="radio"
                name="nova_type"
                className="peer sr-only"
                checked={novaType === "courier"}
                onChange={() => setNovaType("courier")}
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="font-medium text-navy group-hover:text-teal transition-colors">
              Кур&apos;єр на вашу адресу
            </span>
          </label>

          {novaType === "courier" && (
            <div className="ml-8 mt-4 space-y-4">
              <input
                type="text"
                name="city"
                placeholder="Місто"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-black ${
                  errors.city ? "border-red-500" : "border-gray-200"
                }`}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Вулиця"
                  value={formData.street}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-black ${
                    errors.street ? "border-red-500" : "border-gray-200"
                  }`}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="house"
                    placeholder="Буд."
                    value={formData.house}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-black ${
                      errors.house ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Кв."
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-black"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ukrposhta Options */}
      {deliveryMethod === "ukr" && (
        <div className="space-y-4 text-black">
          <div className="group">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center mt-1">
                <input
                  type="radio"
                  name="ukr_type"
                  className="peer sr-only"
                  defaultChecked
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <span className="block font-medium text-navy group-hover:text-teal transition-colors">
                  Відділення Укрпошти
                </span>
                <span className="text-sm text-gray-500 block">
                  Виберіть відділення
                </span>
              </div>
            </label>

            <LocationSearch
              placeholder="Введіть відділення або індекс"
              selectedLocation={selectedLocation}
              warehouseSearch={warehouseSearch}
              setWarehouseSearch={setWarehouseSearch}
              setSelectedLocation={setSelectedLocation}
              isWarehouseListOpen={isWarehouseListOpen}
              setIsWarehouseListOpen={setIsWarehouseListOpen}
              filteredList={filteredList}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        </div>
      )}

      {/* Pickup Options */}
      {deliveryMethod === "pickup" && (
        <div className="space-y-4">
          <div className="group text-black">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center mt-1">
                <input
                  type="radio"
                  name="pickup_type"
                  className="peer sr-only"
                  defaultChecked
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-teal peer-checked:bg-teal transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <span className="block font-medium text-navy group-hover:text-teal transition-colors">
                  Самовивіз з магазину
                </span>
                <span className="text-sm text-gray-500 block">
                  Виберіть точку видачі
                </span>
              </div>
            </label>

            <LocationSearch
              placeholder="Оберіть магазин"
              selectedLocation={selectedLocation}
              warehouseSearch={warehouseSearch}
              setWarehouseSearch={setWarehouseSearch}
              setSelectedLocation={setSelectedLocation}
              isWarehouseListOpen={isWarehouseListOpen}
              setIsWarehouseListOpen={setIsWarehouseListOpen}
              filteredList={filteredList}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        </div>
      )}
    </div>
  );
}
