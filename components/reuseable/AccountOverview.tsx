"use client";
import { useStore } from "@/store/useStore";
import LoadingSpinner from "../wayhouse/Loading";

import {
  Wallet,
  BookKey,
  HandCoins,
} from "lucide-react";

export default function AccountOverview() {
  const {balance , loading} = useStore();


  return (
    <div className="md:p-6 rounded-2xl md:mt-5">
      <div className="md:flex items-center gap-4 space-y-4 md:space-y-0">

        {/* Account Balance */}
        <div
          className="
            flex items-center gap-4 p-4 rounded-xl shadow transition hover:shadow-md
            md:w-[200px]
            bg-linear-to-br
            from-(--color2)
            via-[#2b312c]
            to-[rgba(153,214,22,0.15)]
          "
        >
          <div className="p-3 rounded-full bg-[rgba(153,214,22,0.15)]">
            <Wallet className="w-6 h-6 text-(--color1)" />
          </div>

          <div>
            <p className="text-(--text1) text-sm">
              Total Balance
            </p>
            <div className="font-bold text-sm bg-[#4e5445] p-1 text-center rounded text-white">
              {loading ? <LoadingSpinner/> :  `$${new Intl.NumberFormat('en-US').format(balance)}`}
            </div>
          </div>
        </div>

        {/* Collateral Value */}
        <div className="
          flex items-center gap-4 p-4 rounded-xl shadow transition hover:shadow-md
          md:w-[200px]
          bg-(--color2)
        ">
          <div className="p-3 rounded-full bg-[rgba(144,228,176,0.15)]">
            <BookKey className="w-6 h-6 text-(--color3)" />
          </div>

          <div>
            <p className="text-(--text1) text-sm">
              Collateral Value
            </p>
            <div className="font-bold text-sm bg-[#4e5445] p-1 text-center rounded text-white">
            {loading ? <LoadingSpinner/> :  `$${new Intl.NumberFormat('en-US').format(balance)}`}
            </div>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="
          flex items-center gap-4 p-4 rounded-xl shadow transition hover:shadow-md
          md:w-[200px]
          bg-(--color2)
        ">
          <div className="p-3 rounded-full bg-[rgba(153,214,22,0.15)]">
            <HandCoins className="w-6 h-6 text-(--color1)" />
          </div>

          <div>
            <p className="text-(--text1) text-sm">
              Loan Amount
            </p>
            <div className="font-bold text-sm bg-[#4e5445] p-1 text-center rounded text-white">
            {loading ? <LoadingSpinner/> :  `$${new Intl.NumberFormat('en-US').format(balance)}`}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
