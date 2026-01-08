"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Паролі не співпадають");
      return;
    }

    try {
      // The backend expects 'username', 'email', 'phoneNumber', and 'password'
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          phoneNumber: phoneNumber || undefined, // Send undefined if empty to avoid validation error if optional, but record validation implies it might be checked if present. The regex suggests it's validated if present.
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      toast.success("Реєстрація успішна! Тепер ви можете увійти.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Помилка реєстрації. Спробуйте ще раз.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:px-8 min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl px-6 py-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-navy mb-8 text-center">
          Реєстрація
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block text-navy font-medium mb-2">
              Ім&apos;я
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="Ваше ім'я"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-navy font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-navy font-medium mb-2">
              Номер телефону (необов&apos;язково)
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="+380..."
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-navy font-medium mb-2"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="********"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-navy font-medium mb-2"
            >
              Підтвердіть пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-black bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 hover:shadow-navy/20 mt-4"
          >
            ЗАРЕЄСТРУВАТИСЯ
          </button>
        </form>
        <div className="mt-6 text-center text-navy">
          Вже маєте акаунт?{" "}
          <Link
            href="/login"
            className="text-teal font-semibold hover:underline"
          >
            Увійти
          </Link>
        </div>
      </div>
    </div>
  );
}
