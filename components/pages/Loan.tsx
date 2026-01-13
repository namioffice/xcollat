"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPercent,
  FaBalanceScale,
} from "react-icons/fa";
import { Iceland } from "next/font/google";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

const LTV = 0.5; // 45%

const tiers = [
  {
    name: "Level I",
    min: 500,
    max: 10000,
    interest: 3,
    duration: "3 Months",
  },
  {
    name: "Level II",
    min: 10000,
    max: 30000,
    interest: 4,
    duration: "6 Months",
  },
  {
    name: "Level III",
    min: 30000,
    max: 50000,
    interest: 6,
    duration: "12 Months",
  },
];

export default function Loans() {
  const [loanAmount, setLoanAmount] = useState<number | "">("");
  const [tier, setTier] = useState(tiers[0]);

  const isValidLoan =
    typeof loanAmount === "number" &&
    loanAmount >= tier.min &&
    loanAmount <= tier.max;

  const collateralRequired = isValidLoan
    ? loanAmount / LTV
    : 0;

  const interestAmount = isValidLoan
    ? (loanAmount * tier.interest) / 100
    : 0;

  const totalRepayment = isValidLoan
    ? loanAmount + interestAmount
    : 0;

  return (
    <section className="bg-[#0b0e0d] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold">
  Calculate the{" "}
  <span className="bg-linear-to-r from-(--color1) via-[#38bdf8] to-[#202523] bg-clip-text text-transparent">
    crypto collateral
  </span>{" "}
  required for your loan
</h1>


          <p className="text-gray-400 mt-4">
            Lock your crypto as collateral, borrow stablecoins instantly, and
            unlock your assets after repayment. No selling. No hidden fees.
          </p>

          <p className="underline pt-3 text-sm text-gray-400">
            Please select a plan and scroll down to see full calculations.
          </p>
        </div>

        {/* LOAN TIERS */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`border rounded-2xl p-6 transition ${
                tier.name === t.name
                  ? "border-[#90e4b0] bg-white/5"
                  : "border-white/10"
              }`}
            >
              <h3 className={`${iceland.className} text-xl font-semibold mb-4`}>
                {t.name}
              </h3>

              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-[#90e4b0]" />
                  Loan Range: ${t.min.toLocaleString()} – ${t.max.toLocaleString()}
                </li>

                <li className="flex items-center gap-3">
                  <FaCalendarAlt className="text-[#90e4b0]" />
                  Duration: {t.duration}
                </li>

                <li className="flex items-center gap-3">
                  <FaPercent className="text-[#90e4b0]" />
                  Fixed Interest: {t.interest}%
                </li>

                <li className="flex items-center gap-3">
                  <FaBalanceScale className="text-[#90e4b0]" />
                  LTV: 50%
                </li>
              </ul>

              <button
                onClick={() => {
                  setTier(t);
                  setLoanAmount("");
                }}
                className="mt-6 w-full py-2 rounded-lg bg-[#90e4b0] text-black font-semibold hover:scale-105 transition"
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

        {/* LTV EXPLANATION */}
        <div className="max-w-4xl mx-auto bg-[#111413] border border-white/10 rounded-2xl p-6 md:p-10">
          <h3 className="text-2xl font-semibold mb-4">What is LTV?</h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            LTV (Loan-to-Value) determines how much you can borrow relative to
            your collateral. At Xcollat, we use a conservative{" "}
            <span className="text-[#90e4b0] font-semibold">50% LTV</span> to
            protect users from liquidation risk while ensuring platform
            stability.
          </p>
        </div>

        {/* LOAN CALCULATOR */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* INPUT */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Loan Calculator</h3>
            <p className="text-gray-400 mb-6">
              Enter how much you want to borrow to see required collateral and
              repayment.
            </p>

            <label className="block text-sm text-gray-400 mb-2">
              Loan Amount (USD)
            </label>

            <input
              type="number"
              min={tier.min}
              placeholder={`Minimum $${tier.min.toLocaleString()}`}
              value={loanAmount === "" ? "" : loanAmount}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                  setLoanAmount("");
                  return;
                }

                const numeric = Number(value);
                if (numeric < 0) return;

                setLoanAmount(numeric);
              }}
              className="w-full bg-[#0b0e0d] border border-white/10 rounded-lg p-3 text-white placeholder-gray-500"
            />

            {loanAmount !== "" && loanAmount < tier.min && (
              <p className="text-red-400 text-xs mt-2">
                Minimum loan amount is ${tier.min.toLocaleString()}
              </p>
            )}
          </div>

          {/* RESULTS */}
          <div className="bg-[#111413] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Loan Amount</span>
              <span className="font-semibold">
                {isValidLoan ? `$${loanAmount.toLocaleString()}` : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Required Collateral</span>
              <span className="font-semibold">
                {isValidLoan
                  ? `$${collateralRequired.toLocaleString()}`
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Interest ({tier.interest}%)
              </span>
              <span className="font-semibold">
                {isValidLoan
                  ? `$${interestAmount.toLocaleString()}`
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Duration</span>
              <span className="font-semibold">{tier.duration}</span>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between text-lg">
              <span>Total Repayment</span>
              <span className="text-[#90e4b0] font-bold">
                {isValidLoan
                  ? `$${totalRepayment.toLocaleString()}`
                  : "-"}
              </span>
            </div>

            <Link
              href="/sign-up"
              className={`block text-center py-3 rounded-lg font-semibold transition ${
                isValidLoan
                  ? "bg-[#90e4b0] text-black hover:scale-105"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              Get Loan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
