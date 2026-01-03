"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:px-8">
      <div className="w-full max-w-md border-2 border-teal rounded-xl p-8">
        <h1 className="text-3xl font-bold text-navy mb-8 text-center">
          Вхід
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-navy font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-teal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="example@mail.com"
              required
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
              className="w-full border border-teal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-teal text-white font-bold w-full rounded-lg px-8 py-3 text-lg hover:bg-transparent hover:text-teal border-2 border-teal transition-colors mt-4"
          >
            УВІЙТИ
          </button>
        </form>
        <div className="mt-6 text-center text-navy">
          Ще не маєте акаунту?{" "}
          <Link
            href="/register"
            className="text-teal font-semibold hover:underline"
          >
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}
