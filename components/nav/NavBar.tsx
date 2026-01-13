"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { navLinks } from "./NavList";
import Link from "next/link";
import { Iceland } from "next/font/google";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";


export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function NavBar() {
  const pathName = usePathname()
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0d0f0e] sticky top-0 z-50 shadow-md ">
      <div className="container mx-auto px-6 pt-3">
        <div className="relative flex items-center h-16 justify-between">
          {/* Left */}
          <Logo />

          {/* Center nav links (Desktop only) */}
          <div
            className={`mx-auto hidden md:flex gap-10 p-2 rounded-lg bg-(--color2) text-(--text1) ${iceland.className}`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`hover:text-white transition ${pathName === item.href ? 'border-b border-(--color1) animate-pulse ': ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right (Loan button) */}
          <div className={`hidden md:block font-bold bg-linear-to-r from-(--color2) via-(--color1) to-(--color2)
            border border-[#1e293b] rounded-lg text-(--text1)
            transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-[#38bdf8]/30 ${iceland.className}`}>
            <Link
              href="/sign-up"
              className="px-12 py-2 block transition-colors duration-300 hover:text-white"
            >
              Loan
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="hover:text-white transition text-white"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/sign-up"
            className={`px-12 py-2 block font-bold bg-linear-to-r from-(--color2) via-(--color1) to-(--color2)
              text-(--text1) rounded-lg text-center transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-[#38bdf8]/30 ${iceland.className}`}
            onClick={() => setMenuOpen(false)}
          >
            Loan
          </Link>
        </div>
      </div>
    </div>
  );
}
``