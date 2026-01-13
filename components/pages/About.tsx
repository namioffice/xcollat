"use client";

import Image from "next/image";
import { Iceland } from "next/font/google";
import Footer from "../wayhouse/Footer";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function AboutXcollat() {
  return (
    <section className=" text-white pt-5 px-6">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">
          <h1
            className={`${iceland.className} text-3xl md:text-5xl font-bold`}
          >
            About{" "}
            <span className="bg-linear-to-r from-(--color1) via-[#38bdf8] to-[#202523] bg-clip-text text-transparent animate-gradient">
              Xcollat
            </span>
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Xcollat is a decentralized crypto-backed lending platform that allows
            XRP holders to unlock liquidity without selling their assets. We
            provide fast, transparent, and secure access to stablecoins using
            XRP as collateral.
          </p>
        </div>

        {/* WHAT WE DO */}
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              What Xcollat Does
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Many crypto holders are forced to sell their assets when they need
              cash. Xcollat solves this by enabling users to borrow stablecoins
              while keeping full ownership of their XRP.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Users lock XRP as collateral and instantly receive USDT or USDC.
              Once the loan is repaid, the collateral is fully unlocked. No
              hidden fees, no compounding interest, and no surprise liquidations.
            </p>
          </div>

          <div className="relative h-[260px] md:h-[320px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="/xcollat.png"
              alt="Xcollat platform overview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            How Xcollat Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Lock XRP as Collateral",
                text: "Deposit your XRP into a secure smart contract. Your assets are never sold or reused.",
              },
              {
                step: "02",
                title: "Receive Stablecoins",
                text: "Get USDT or USDC sent directly to your wallet within minutes.",
              },
              {
                step: "03",
                title: "Repay & Unlock",
                text: "Repay the fixed interest amount and unlock your XRP instantly.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#111413] border border-white/10 rounded-2xl p-6"
              >
                <span className="text-sm text-[#38bdf8] font-medium">
                  {item.step}
                </span>
                <h3 className="mt-3 font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY XC0LLAT */}
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Why Xcollat Is Different
            </h2>

            <ul className="space-y-4 text-gray-300 text-sm md:text-base">
              <li>• Fixed interest no APR or compounding</li>
              <li>• Non-custodial collateral structure</li>
              <li>• Transparent liquidation thresholds</li>
              <li>• Designed specifically for XRP holders</li>
              <li>• Built for global, borderless access</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111413] border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">Security First</h3>
              <p className="text-gray-400 text-sm mt-2">
                Xcollat is built using audited smart-contract standards and
                battle-tested blockchain infrastructure. User funds remain
                verifiable and transparent at all times.
              </p>
            </div>

            <div className="bg-[#111413] border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">Built for the Future</h3>
              <p className="text-gray-400 text-sm mt-2">
                Our long-term vision is to become the leading XRP-backed
                liquidity layer for decentralized finance, payments, and
                real-world utility.
              </p>
            </div>
          </div>
        </div>

        {/* MISSION */}
        <div className="text-center space-y-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Our Mission
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe crypto holders should never be forced to sell long-term
            assets to access liquidity. Xcollat exists to empower users with
            financial freedom, transparency, and control without compromise.
          </p>
        </div>

      </div>
      <Footer/>
    </section>
  );
}
