"use client";

import Image from "next/image";
import { Iceland } from "next/font/google";
import BackedByLeaders from "../wayhouse/BackedBY";
import TrustedBy from "../wayhouse/TrustedBy";
import FAQ from "../wayhouse/Fqa";
import { FaQrcode } from "react-icons/fa";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

const reasons = [
  {
    number: "01",
    title: "Secure coin Collateral",
    text: "Your coin stays locked safely as collateral. We never sell or rehypothecate your assets.",
  },
  {
    number: "02",
    title: "Instant Stablecoin Access",
    text: "Receive USDT or USDC directly to your wallet within minutes after locking your coin.",
  },
  {
    number: "03",
    title: "Transparent Fixed Interest",
    text: "No APR, no compounding. What you see upfront is exactly what you repay.",
  },

  {
    number: "04",
    title: "Flexible Loan Durations",
    text: "Choose loan plans that match your needs, from short-term access to extended durations for larger amounts.",
  },
];

export default function WhyUs() {
  return (
    <section className="w-full px-4 md:px-10 bg-black md:pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT — IMAGE */}
        <div className="relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden">
          <Image
            src="/xcollat.png" // change image if needed
            alt="Why choose Xcollat"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* RIGHT — TEXT */}
        <div className="space-y-8">
          <h2
            className={`${iceland.className} text-2xl  text-white sm:text-3xl md:text-4xl font-bold`}
          >
            Why Choose{" "}
            <span className="bg-linear-to-r from-(--color1) via-[#38bdf8] to-[#202523] bg-clip-text text-transparent animate-gradient">
              Xcollat
            </span>
          </h2>

          {reasons.map((item) => (
            <div key={item.number} className="flex gap-5 items-start">
              {/* Number */}
              <div
                className={`${iceland.className} text-3xl text-(--color3)`}
              >
                {item.number}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <BackedByLeaders/>
      <TrustedBy/>
      <FAQ/>
    </section>
  );
}
