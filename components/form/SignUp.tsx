"use client";

import React, { useState, useEffect } from "react";
import { Iceland } from "next/font/google";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const countryNames = res.data
          .map((c: any) => c.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        form
      );
      toast.success("Registration successful! Redirecting to login...");
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Registration failed");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="min-h-screen pb-14 flex items-center justify-center px-4 pt-10 bg-linear-to-br from-[#0b0e0d] to-[#202523]">
        <div
          className={`w-full max-w-md rounded-2xl bg-black/40 backdrop-blur 
          border border-white/10 p-6 space-y-6 ${iceland.className}`}
        >
          <h1 className="text-2xl font-bold text-center text-white">
            Create Account
          </h1>

          {/* Wrap your inputs in a form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First & Last Name */}
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="john"
                  className="w-full rounded-lg bg-black/50 border border-white/10 
                  px-4 py-3 text-base text-white outline-none 
                  focus:border-(--color1)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="joe"
                  className="w-full rounded-lg bg-black/50 border border-white/10 
                  px-4 py-3 text-base text-white outline-none 
                  focus:border-(--color1)"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg bg-black/50 border border-white/10 
                px-4 py-3 text-base text-white outline-none 
                focus:border-(--color1)"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg bg-black/50 border border-white/10 
                px-4 py-3 text-base text-white outline-none 
                focus:border-(--color1)"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg bg-black/50 border border-white/10 
                px-4 py-3 text-base text-white outline-none 
                focus:border-(--color1)"
              />
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full rounded-lg bg-black/50 border border-white/10 
                px-4 py-3 text-base text-white outline-none 
                focus:border-(--color1)"
              >
                <option value="" disabled>
                  Select your country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Government ID */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Government Issued ID</label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="w-full rounded-lg bg-black/50 border border-white/10 
                px-4 py-3 text-base text-gray-300 outline-none 
                file:text-sm file:bg-(--color1) file:border-0 
                file:px-3 file:py-1 file:rounded-md file:text-black"
              />
              <p className="text-xs text-gray-400">
                Passport, National ID, or Driver's License
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-linear-to-r 
              from-(--color2) via-(--color1) to-(--color2)
              py-3 font-semibold text-black 
              transition hover:scale-[1.02]"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center justify-between">
            <p>Already have an account</p>
            <Link
              href="/login"
              className="hover:text-white underline text-(--color1)"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
