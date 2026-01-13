"use client";

import React from "react";
import Link from "next/link";
import { Iceland } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function LoginSection() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );
  
      const data = await res.json();
  
      // ❌ Login failed
      if (!res.ok) {
        toast.error(data.message || "Invalid email or password");
        return;
      }
  
      // 🔒 Extra safety checks
      if (!data?.accessToken || !data?.userExist) {
        toast.error("Invalid login response from server");
        return;
      }
  
      // 🚫 Account inactive / blocked
      if (data.userExist.isActive === false) {
        toast.error("Your account is inactive or restricted");
        return;
      }
  
      // ✅ Save auth data
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.userExist.id);
      localStorage.setItem("role", data.userExist.role);
  
      toast.success("Login successful!");
  
      // 🎯 SINGLE redirect (VERY IMPORTANT)
      if (data.userExist.role === "admin") {
        router.push("/admin-login");
      } else {
        router.push("/dashboard");
      }
  
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className={`w-full max-w-md ${iceland.className}`}>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Login to <span className="text-(--color1)">Xcollat</span>
          </h1>
          <p className="mt-3 text-[#b1b1b1] text-sm">
            Access your dashboard and manage your cryptocurrency loans.
          </p>
        </div>

        {/* Form */}
        <div className="bg-linear-to-br from-[#0b0e0d] to-[#202523] rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-[#b1b1b1]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg text-[16px] bg-black/40 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-(--color1)"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 text-[#b1b1b1]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg bg-black/40 border text-[16px] border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-(--color1)"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-(--color1) text-black font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 flex justify-between text-sm text-[#b1b1b1]">
            <Link href="/" className="hover:text-white underline">
              Forgot password?
            </Link>
            <Link href="/sign-up" className="hover:text-white underline ">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
