"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Login to get the session token (UUID)
      // The backend expects 'usernameOrEmail' and 'password'
      const loginResponse = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          usernameOrEmail: loginInput, 
          password 
        }),
      });

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        let errorMessage = "Login failed";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
          errorMessage = errorText;
        }
        throw new Error(errorMessage || `Server error: ${loginResponse.status}`);
      }

      // Robust token extraction
      const responseText = await loginResponse.text();
      console.log("Raw login response:", responseText);

      let token = "";
      try {
        // Try to parse as JSON first (e.g. "uuid-string" or {"token": "..."})
        const data = JSON.parse(responseText);

        if (typeof data === "string") {
          token = data;
        } else if (typeof data === "object" && data !== null) {
          token =
            (data as any).token ||
            (data as any).accessToken ||
            (data as any).jwt;
        }
      } catch (e) {
        // If parsing fails, assume the response body is the token itself (raw string)
        token = responseText;
      }

      if (!token) {
        throw new Error("Could not extract token from login response");
      }

      // 2. Fetch user profile using the token
      // We try with 'Bearer' prefix first (Standard JWT)
      let profileResponse = await fetch("http://localhost:8080/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fallback: If Bearer fails (401/403), try sending just the token
      // (in case the backend expects raw UUID/Token without 'Bearer' prefix)
      if (profileResponse.status === 401 || profileResponse.status === 403) {
        console.warn("Bearer auth failed, retrying with raw token...");
        profileResponse = await fetch("http://localhost:8080/users/profile", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
      }

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error(
          "Profile fetch failed:",
          profileResponse.status,
          errorText
        );
        throw new Error("Failed to fetch profile");
      }

      const userData = await profileResponse.json();

      login(token, {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      });

      toast.success("Успішний вхід!");
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      // Show the actual error message from the server
      toast.error(error.message || "Невірний email або пароль");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:px-8 min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl px-6 py-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-navy mb-8 text-center">Вхід</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-navy font-medium mb-2">
              Email або Ім&apos;я користувача
            </label>
            <input
              type="text"
              id="email"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="example@mail.com або username"
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
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal text-white font-bold rounded-xl py-4 text-lg hover:bg-navy transition-all shadow-lg shadow-teal/20 hover:shadow-navy/20 mt-4"
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
