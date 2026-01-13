"use client";

import React from "react";
import { Iceland } from "next/font/google";

export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function ContactSection() {
  return (
    <section className="w-full flex items-center justify-center px-4 py-20">
      <div className={`w-full max-w-5xl ${iceland.className}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Contact <span className="text-(--color1)">Us</span>
          </h1>
          <p className="mt-4 text-[#b1b1b1] max-w-xl mx-auto text-sm md:text-base">
            Have questions about XRP-backed loans or need support?
            Reach out and our team will respond shortly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-linear-to-br from-[#0b0e0d] to-[#202523] rounded-2xl p-6 md:p-10">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm mb-2 text-[#b1b1b1]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg text-[16px] bg-black/40 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-(--color1)"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 text-[#b1b1b1]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg text-[16px] bg-black/40 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-(--color1)"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-2 text-[#b1b1b1]">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full rounded-lg bg-black/40 border text-[16px] border-white/10 px-4 py-3 text-sm text-white outline-none resize-none focus:border-(--color1)"
              />
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-(--color1) text-black font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
