"use client";
import { useStore } from "@/store/useStore";

type PortfolioOverviewProps = {
  portfolioValue?: number;
  ltv?: number; // percentage (e.g. 50)
};

export default function PortfolioOverview({
  portfolioValue,
  ltv = 50,
}: PortfolioOverviewProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (ltv / 100) * circumference;
  const {balance} = useStore()

  const totalPortfolioValue = portfolioValue ?? balance;

  return (
    <div className="grid lg:grid-cols-3 gap-6 pt-10" >
      {/* PORTFOLIO OVERVIEW */}
      <div className="lg:col-span-2 bg-[#111413] border border-white/10 rounded-2xl p-6 flex flex-col items-start justify-center">
        <div className="flex items-center justify-between mb-4 w-full">
          <h3 className="md:text-lg text-white font-semibold">Portfolio Overview</h3>
          <span className="text-sm text-gray-400">Last 30 days</span>
        </div>

        <p className="text-sm text-gray-400 mb-2">Total Asset Value</p>

        <h2 className=" text-2xl md:text-3xl font-bold text-[#90e4b0] mb-6">
          ${totalPortfolioValue.toLocaleString()}
        </h2>

        <p className="text-sm text-gray-400">
          This represents the total value of all your crypto assets locked in Xcollat.
        </p>
      </div>

      {/* LTV RATIO */}
      <div className="bg-[#111413] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-white mb-4">LTV Ratio</h3>

        <div className="relative w-40 h-40 text-white">
          <svg width="160" height="160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#1f2937"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#90e4b0"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{ltv}%</span>
            <span className="text-xs text-gray-400">Loan-to-Value</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Safe zone below liquidation threshold
        </p>
      </div>
    </div>
  );
}
