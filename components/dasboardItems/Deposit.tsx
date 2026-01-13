"use client";
import React, { useState, useEffect } from "react";
import {
  SiBitcoin,
  SiEthereum,
  SiTether,
  SiSolana,
  SiChainlink,
  SiStellar,
} from "react-icons/si";
import Image from "next/image";
import { toast } from "react-toastify";
import btcImage from "@/public/coinsImage/xbtc.jpg";
import ethImage from "@/public/coinsImage/xeth.jpg";
import xrpImage from "@/public/coinsImage/xxrp.jpg";
import solImage from "@/public/coinsImage/xsol.jpg";
import xlmImage from "@/public/coinsImage/xxlm.jpg";
import chainImage from "@/public/coinsImage/xlink.jpg";
import bchImage from "@/public/coinsImage/xbch.jpg";
import ltcImage from "@/public/coinsImage/xltc.jpg";
import avaxImage from "@/public/coinsImage/xavax.jpg";
import bnbImage from "@/public/coinsImage/xbnb.jpg";

const paymentPageInfo = [
  {
    name: "bitcoin",
    icon: <SiBitcoin color="#f7931a" size={17} />,
    image: btcImage,
    address: "bc1qr8e55rce9dd9jrwf6d0jld7ya958swlz24qldp",
  },
  {
    name: "ethereum",
    icon: <SiEthereum color="#9370DB" size={17} />,
    image: ethImage,
    address: "0x0B42B6c1c7eF2b111e79B4Be0ae07F095ef779C2",
  },

  {
    name: "ripple",
    icon: (
      <Image
        width={15}
        height={15}
        src="/xrplogo.png"
        alt="xrp"
        className="w-4 h-4"
      />
    ),
    image: xrpImage,
    address: "rJbmqKmVURCiWLpWVFje3nW4bbYxozUDPL",
  },
  {
    name: "litecoin",
    icon: (
      <Image
        width={5}
        height={15}
        src="/ltclogo.png"
        alt="xrp"
        className="w-4 h-4"
      />
    ),
    image: ltcImage,
    address: "ltc1qdnc6sten0jr8cj00tj0fc7asw6jgnyewlgcv3s",
  },
  {
    name: "avalanche-2",
    icon: (
      <Image
        width={5}
        height={15}
        src="/avaxlogo.png"
        alt="xrp"
        className="w-4 h-4"
      />
    ),
    image: avaxImage,
    address: "0x0B42B6c1c7eF2b111e79B4Be0ae07F095ef779C2",
  },
  {
    name: "bitcoin-cash",
    icon: (
      <Image
        width={5}
        height={15}
        src="/bchlogo.png"
        alt="xrp"
        className="w-4 h-4"
      />
    ),
    image: bchImage,
    address: "qrgapjazl8axtg5a08lhz0zwaamgwxp4zqdqumg67l",
  },
  {
    name: "binancecoin",
    icon: (
      <Image
        width={5}
        height={15}
        src="/bnblogo.png"
        alt="xrp"
        className="w-4 h-4"
      />
    ),
    image: bnbImage,
    network: "(BSC)",
    address: "0x0B42B6c1c7eF2b111e79B4Be0ae07F095ef779C2",
  },
  {
    name: "solana",
    icon: (
      <div className=" p-0.5 rounded bg-linear-to-r from-[#00FFA3] via-[#DC1FFF] to-[#00FFD3] flex items-center justify-center">
        <SiSolana color="#fff" />
      </div>
    ),
    image: solImage,
    address: "6Mm2uSBjtk9c9MfauYYZsH35EnopTPWPTtB4hvYA1WcQ",
  },
  {
    name: "chainlink",
    icon: <SiChainlink color="#2A5ADA" size={17} />,
    image: chainImage,
    network: "(BSC)",
    address: "0x0B42B6c1c7eF2b111e79B4Be0ae07F095ef779C2",
  },
  {
    name: "stellar",
    icon: <SiStellar color="#A6A9AA" size={17} />,
    image: xlmImage,
    address: "GBL3BCSEQYLOJDGHC3VMVIWNT2Q52G7KJX2HF56CZOP54B4KNRS3GT7Q",
  },
];

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof paymentPageInfo)[0] | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 mins
  const [copyText, setCopyText] = useState("Copy");
  const [error, setError] = useState("");
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, number>>({});

  // Fetch live crypto prices
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/prices`)
      .then((res) => res.json())
      .then((data) => {
        const prices: Record<string, number> = {};
        data.forEach((coin: any) => {
          prices[coin.id] = coin.current_price;
        });
        setCryptoPrices(prices);
      })
      .catch((err) => console.error("Failed to fetch crypto prices:", err));
  }, []);

  // Countdown timer
  useEffect(() => {
    if (showModal && countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [showModal, countdown]);

  // Copy handler
  const handleCopy = () => {
    if (!selectedMethod) return;
    const textToCopy = selectedMethod.address;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopyText("Copied!");
          setTimeout(() => setCopyText("Copy"), 1500);
        })
        .catch(() => {
          setCopyText("Failed");
          setTimeout(() => setCopyText("Copy"), 1500);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopyText("Copied!");
      } catch (err) {
        setCopyText("Failed");
      }
      document.body.removeChild(textArea);
      setTimeout(() => setCopyText("Copy"), 1500);
    }
  };

  // Calculate crypto amount
  const cryptoAmount =
    selectedMethod && amount
      ? (() => {
          const price = cryptoPrices[selectedMethod.name];
          if (price) {
            return (parseFloat(amount) / price).toFixed(6);
          }
          return "0";
        })()
      : "0";

  // Format countdown
  const minutes = Math.floor(countdown / 60);
  const seconds = String(countdown % 60).padStart(2, "0");

  // 🧩 Handle deposit request
  const handleDepositRequest = async () => {
    if (!amount.trim()) {
      toast.error("Please input amount");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId,
            amount: Number(amount),
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to create deposit request");
        return;
      }

      // success
      toast.success("Generated Address successfully");
      setError("");
      setShowModal(true);
      setCountdown(900);
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className="pb-10 pl-1">
      <h1 className="text-sm md:text-lg font-bold text-white  ">
        Make A Deposit
      </h1>

      <form className="pt-10">
        {/* Payment methods */}
        <div className="mt-6 pr-2">
          <h1 className="text-xs md:text-lg font-bold text-(--color1)">
            Select Payment Method
          </h1>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {paymentPageInfo.map((method) => (
              <button
                key={method.name}
                type="button"
                onClick={() => setSelectedMethod(method)}
                className={`flex items-center justify-center gap-2 text-white  px-3 py-2 rounded text-xs bg-(--color2) border
                  ${
                    selectedMethod?.name === method.name
                      ? "border-b-(--color1) "
                      : "border-gray-600"
                  }`}
              >
                {method.icon}
                <span>{method.name.toUpperCase()}</span>
                <span
                  className={` ${
                    method.network === "(Erc20)"
                      ? "text-blue-600"
                      : "text-emerald-300"
                  } text-xs`}
                >
                  {method.network}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount input */}
        <div className="pt-10 pl-5">
          <div className="flex items-center justify-between pb-2 pr-5">
            <p className="text-sm text-white">Amount</p>
            <svg
              width="32"
              height="32"
              fill="currentColor"
              className="text-emerald-500"
            >
              <circle cx="12" cy="12" r="10" />
              <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">
                $
              </text>
            </svg>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="border border-(--color2) text-white  placeholder:text-xs rounded focus:border-(--color2) focus:ring-1 focus:ring-(--color2) px-2 py-1 text-[16px]  bg-transparent transition duration-200 md:w-[600px] h-12 w-[20rem]"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Pay button */}
        <div className="pt-8 pl-5">
          {selectedMethod && (
            <button
              type="button"
              onClick={ handleDepositRequest}
              className="bg-(--color3) text-black text-sm font-semibold px-6 py-2 rounded hover:bg-opacity-80 transition duration-200 md:w-[600px] w-[20rem]"
            >
              {`Pay ${amount || "0"} with ${selectedMethod.name.toUpperCase()}`}
            </button>
          )}
        </div>
      </form>

      {/* Modal */}
      {showModal && selectedMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-(--color4) rounded-lg p-6 w-[90%] max-w-[400px] text-center">
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-(--color3) text-xl p-2"
              >
                ✖
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-2 text-white">
              Deposit with{" "}
              <span className="text-(--color1)">
                {selectedMethod.name.toUpperCase()}
              </span>
            </h2>
            <p className="text-sm mb-2 text-white">
              Amount:{" "}
              <span className="text-emerald-500 font-bold">${amount}</span>{" "}
              ≈{" "}
              <span className="text-emerald-500 font-bold">
                {cryptoAmount}
              </span>{" "}
              {selectedMethod.name.toUpperCase()}
            </p>

            <p className="text-xs pb-2 text-gray-400 ">
              Please scan the QR code below or copy the address.
            </p>
            <div className=" mx-auto mb-2 flex items-center justify-center text-xs text-black">
              <Image
                src={selectedMethod.image}
                alt={selectedMethod.name}
                width={150}
                height={50}
                className="object-contain rounded"
              />
            </div>

            <div className="gap-2 mb-2">
              <div className="break-all text-xs font-bold border-b-(--color2) mb-3 text-white">
                {selectedMethod.address}
              </div>
              <div
                onClick={handleCopy}
                className="text-(--color3) text-xs border p-2 rounded cursor-pointer"
              >
                {copyText}
              </div>
            </div>

            <p className="text-xs mb-1 text-yellow-400">
              Please complete payment within:
            </p>
            <div className="font-mono text-lg text-white">
              {minutes}:{seconds}
            </div>

            <div className="space-y-4 text-xs mt-2 text-gray-400 border-t pt-2">
              {/* <p className="border-b">The minimum deposit amount is $500</p> */}
              <p className="border-b">Check the payment address carefully.</p>
              <p className="border-b">
                After payment, your balance updates automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
