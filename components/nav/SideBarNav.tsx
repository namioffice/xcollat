"use client";
import React, { useState } from "react";
import { Wallet, LinkIcon, Menu, X, Calculator, } from "lucide-react";
import { PiHandDepositFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { GrMoney } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../wayhouse/LogoutUser";

export default function SideNavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: "/dashboard",
      icon: <Wallet className="text-(--color3)" size={20} />,
      label: "Dashboard",
    },

    {
      href: "/deposit",
      icon: <PiHandDepositFill className="text-(--color3)" size={20} />,
      label: "Deposit",
    },
    {
      href: "/withdrawal",
      icon: <GiReceiveMoney className="text-(--color3)" size={20} />,
      label: "Withdraw",
    },
    {
        href: "/lender",
        icon: <GrMoney className="text-(--color3)" size={20} />,
        label: "Loans",
      },
    {
      href: "/calculator",
      icon: <Calculator className="text-(--color3)" size={20} />,
      label: "Calculator",
    },
    {
      href: "/transactions",
      icon: <FaMoneyBillTransfer className="text-(--color3)" size={20} />,
      label: "Transactions",
    },
    {
      href: "/connect",
      icon: <LinkIcon className="text-(--color3)" size={20} />,
      label: "Link Wallet",
    },
    {
      href: "/profile",
      icon: <ImProfile className="text-(--color3)" size={20} />,
      label: "Profile",
    },
    {
      href: "/notification",
      icon: (
        <IoMdNotificationsOutline className="text-(--color3)" size={20} />
      ),
      label: "Notification",
    },

  ];

  return (
    <>
      {/* Toggle button visible only on mobile */}
      <button
        className="md:hidden fixed top-5 left-4 z-30 text-(--color1) "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} className=""/> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={` fixed top-0  rounded-r-2xl  left-0 z-20 bg-(--color2) min-h-screen md:h-full md:w-64 pt-12 px-6  border-r border-r-(--color2) transform transition-transform duration-300 ease-in-out 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-(--color1) md:text-xl font-semibold mb-6 hidden md:block">
          Menu
        </h2>
        {links.map(({ href, icon, label }) => (
          <div
            key={href}
            className="border-b border-b-(--color3) md:pb-4 pb-2 mt-5  mb-4 text-black"
          >
            <Link
              href={href}
              onClick={() => setIsOpen(false)} // close on click
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-(--color1)  hover:text-black ${
                pathname === href ? "bg-amber-50 text-black" : "text-white "
              }`}
            >
              {icon}
              <p className="md:font-bold text-sm ">{label}</p>
            </Link>
          </div>
        ))}
         
        <LogoutButton/>
      </div>
    </>
  );
}
