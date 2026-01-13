"use client"
import React from "react";
import { FaKeycdn } from "react-icons/fa";
import Link from "next/link";
import { Iceland } from "next/font/google";



export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function Logo() {
  return (
    <div className=" ">
      <Link href={"/"} className="flex items-center">
      <FaKeycdn size={28} className="text-(--color1)" />
      <p className={`${iceland.className} font-bold text-2xl text-white`}>
        Xcollat
      </p>
      </Link>
    </div>
  );
}
