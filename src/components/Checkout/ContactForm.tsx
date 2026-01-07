import React from "react";

interface ContactFormProps {
  formData: {
    lastName: string;
    firstName: string;
    phone: string;
    email: string;
    comment: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: Record<string, boolean>;
}

export default function ContactForm({
  formData,
  handleInputChange,
  errors,
}: ContactFormProps) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-navy mb-6">Контактні дані</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-black">
        <input
          type="text"
          name="lastName"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={handleInputChange}
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Ім'я"
          value={formData.firstName}
          onChange={handleInputChange}
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-black">
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all ${
            errors.phone ? "border-red-500" : "border-gray-200"
          }`}
        />
        <input
          type="email"
          name="email"
          placeholder="Електронна пошта"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        />
      </div>
      <textarea
        name="comment"
        placeholder="Коментар до замовлення"
        rows={4}
        value={formData.comment}
        onChange={handleInputChange}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all resize-none text-black"
      ></textarea>
    </div>
  );
}
