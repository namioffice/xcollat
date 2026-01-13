'use client'
import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import AccountOverview from "../reuseable/AccountOverview";
import PortfolioOverview from "../wayhouse/PortfolioOverView";
import CryptoPrices from "../wayhouse/CryptoPrices";
import Transactions from "../wayhouse/Transactions";
import { useState, useEffect } from "react";
import ActiveLoan from "./ActiveLoan";
import { useStore } from "@/store/useStore";

export default function TheDashboard() {
  const { name, fetchUserAccount } = useStore();

  useEffect(() => {
    fetchUserAccount();
  }, [fetchUserAccount]);

  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user"); // assuming you store user as JSON
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     setUserName(user.firstName ); // or user.name depending on your backend
  //   }
  // }, []);

  return (
    <div className="">
      <div className="  pb-5 pt-5 flex items-center gap-20  border-b border-b-(--color2) justify-between  md:gap-96 w-[350px] md:w-[750px] pr-5 bg-black">
        <h1 className="font-bold text-2xl text-white ">
        Welcome <span>{name}</span>
        </h1>
        <Link href={"/notification"}>
          <div className="bg-(--color2) p-1 rounded">
            <div className="relative">
              <Bell className="text-(--color1)" size={20} />
              <div className="absolute top-0 right-0 bottom-10 w-[8px] h-[8px] rounded-full bg-emerald-200"></div>
            </div>
          </div>
        </Link>
      </div>
      {/* accountoverview */}
      <div className="mt-5 pr-5">
      <AccountOverview/>
      <PortfolioOverview/>
      <div className="">
      <p className="pt-5 mt-5 font-bold md:text-lg text-sm  border-t border-t-(--color2) text-white "><span className="">Crypto</span>Currency </p>
      <CryptoPrices/>
      </div>
      {/* transactions */}
      <Transactions/>

      {/* active loan */}
      <ActiveLoan/>
      </div>
    </div>
  );
}
