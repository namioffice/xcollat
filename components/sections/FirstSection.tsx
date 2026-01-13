"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltDown } from "react-icons/fa";
import { Iceland } from "next/font/google";
export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function FirstSection() {
  return (
    <section className="relative  md:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/xrp1.jpg"
        alt="Xcollat background"
        fill
        priority
        className="object-cover scale-105 animate-slowZoom"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 md:px-8 space-y-6 md:pt-44 pt-24">
        {/* Xcollat Label */}
        <div className="flex items-center justify-center animate-pulse">
          <p className="text-[#90e4b0] text-xs sm:text-sm tracking-widest uppercase border rounded px-2 py-1">
            Xcollat
          </p>
        </div>

        {/* H1 */}
        <h1
          className={`${iceland.className} text-white text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-tight  `}
        >
          Lock{" "}
          <span
            className="bg-linear-to-r from-(--color1) via-(-color2) to-[#0cd282] bg-clip-text text-transparent animate-gradient
"
          >
            cryptocurrency
          </span>{" "}
          as collateral and receive stablecoin,
          <span className="text-[rgb(144,228,176)] underline">USDT/USDC</span> in minutes.
        </h1>

        {/* Description */}
        <p className="text-gray-300 sm:text-base md:text-lg max-w-2xl mx-auto">
          Turn idle cryptocurrency into instant spending power. Built for fast access to
          stablecoin with disciplined risk controls.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
          <Link
            href="/sign-up"
            className={`w-36 sm:w-32 p-2 rounded-lg bg-(--color1) text-black font-semibold hover:scale-105 transition ${iceland.className}`}
          >
            Loan
          </Link>

          <Link
            href="/about"
            className={`w-36 sm:w-32 p-2 rounded-lg border border-white text-white hover:bg-white hover:text-black transition ${iceland.className}`}
          >
            Learn More
          </Link>
        </div>

        {/* Down Arrow */}
        <div className="flex items-center justify-center pt-10 sm:pt-16">
          <div className="flex justify-center p-2 border rounded-2xl animate-bounce py-5 md:py-10">
            <FaLongArrowAltDown className="text-[#90e4b0]" size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}
