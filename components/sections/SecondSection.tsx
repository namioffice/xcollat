"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Iceland } from "next/font/google";
import CryptoPrices from "../wayhouse/CryptoPrices";

export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function SecondSection() {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 bg-black">
      <div className={` ${iceland.className} w-full max-w-6xl`}>
        {/* Header */}
        <div className="flex  items-center  md:gap-52 pb-6 pt-5 justify-between w-full">
          <h1 className="md:text-4xl text-white text-2xl text-center md:text-left underline">Lock In</h1>
          <div className="border p-1 md:p-2 rounded animate-pulse text-(--color1) text-center">
            <Link href={"/about"} className="md:text-2xl">
              Learn more
            </Link>
          </div>
        </div>

        {/* Box container */}
        <div className="flex flex-col md:flex-row md:items-start gap-7 w-full">
          {/* Column 1 */}
          <div className="flex flex-col space-y-7 items-center md:items-start">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b0e0d] to-[#202523] bg-[#0d0d0d] p-6 w-full sm:w-[350px] md:w-[400px] md:h-[300px]">
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/cry1.jpg"
                  alt="XRP background"
                  fill
                  className="object-cover opacity-10"
                  priority={false}
                />
              </div>
              <div className="relative z-10">
                <h1 className="text-lg font-semibold">Deposit Crypto</h1>
                <p className="mt-2 text-base text-[#b1b1b1]">
                  Deposit your cryptocurrency securely as collateral. Your coin is never sold, it stays yours until you fully repay your loan.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b0e0d] to-[#202523] bg-[#0d0d0d] p-6 w-full sm:w-[350px] md:w-[400px] md:h-[300px] h-[250px]">
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/xrp6.jpg"
                  alt="XRP background"
                  fill
                  className="object-cover opacity-10"
                  priority={false}
                />
              </div>
              <div className="relative z-10">
                <h1 className="text-lg font-semibold">Lock Your cryptocurrency</h1>
                <p className="mt-2 text-base text-[#b1b1b1]">
                  Lock your cryptocurrency securely as collateral. Your coin is never sold, it remains yours until you repay within your chosen timeframe. You can also adjust your repayment due date.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex justify-center md:block w-full md:w-auto">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b0e0d] to-[#202523] bg-[#0d0d0d] p-6 w-full sm:w-[350px] md:w-[400px] md:h-[630px] h-[250px] mx-auto md:mx-0">
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/xrp3.webp"
                  alt="XRP background"
                  fill
                  className="object-cover opacity-10"
                  priority={false}
                />
              </div>
              <div className="relative z-10">
                <h1 className="text-lg font-semibold">Security</h1>
                <p className="mt-2 text-base text-[#b1b1b1]">
                  Your assets are protected with industry-grade security and smart risk controls. coin used as collateral is never sold or rehypothecated without clear conditions. Transparent loan terms and automated safeguards help prevent unexpected losses. You stay in control of your assets at every stage.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-7 items-center md:items-start">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b0e0d] to-[#202523] bg-[#0d0d0d] p-6 w-full sm:w-[350px] md:w-[400px] md:h-[300px] h-[250px]">
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/xrp5.webp"
                  alt="XRP background"
                  fill
                  className="object-cover opacity-10"
                  priority={false}
                />
              </div>
              <div className="relative z-10">
                <h1 className="text-lg font-semibold">Get Stablecoin</h1>
                <p className="mt-2 text-base text-[#b1b1b1]">
                  Borrow USDT or USDC instantly based on the value of your locked coin and your selected loan amount. Funds are sent directly to your wallet, giving you fast access to stable liquidity without selling your coins.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b0e0d] to-[#202523] bg-[#0d0d0d] p-6 w-full sm:w-[350px] md:w-[400px] h-[250px] md:h-[300px]">
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/xrp4.png"
                  alt="XRP background"
                  fill
                  className="object-cover opacity-10"
                  priority={false}
                />
              </div>
              <div className="relative z-10">
                <h1 className="text-lg font-semibold">Repay & Unlock</h1>
                <p className="mt-2 text-base text-[#b1b1b1]">
                  Pay back your loan when you're ready and unlock your coin immediately. No hidden steps repay and regain full access to your assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
      <CryptoPrices/>
      </div>
    </div>
  );
}
   