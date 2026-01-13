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
  

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof paymentPageInfo)[0] | null
  >(null);
  const [showModal, setShowModal] = useState(false);
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

  const cryptoAmount =
    selectedMethod && amount
      ? (() => {
          const price = cryptoPrices[selectedMethod.name];
          if (price) return (parseFloat(amount) / price).toFixed(6);
          return "0";
        })()
      : "0";
      

  async function handleTransaction() {
    if (!amount.trim()) {
      setError("Please input amount");
      return;
    }
    if (!selectedMethod) {
      setError("Please select a method");
      return;
    }

    setError("");
    setShowModal(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },              
          body: JSON.stringify({
            amount: parseFloat(amount),
            method: selectedMethod.name,
            walletAddress,
            memo,
          }),
        }
      );

      if (res.ok) {
        // setAmount("");
        // setWalletAddress("");
        // setMemo("");
        toast.success("Withdrawal request submitted successfully!");
      } else {
        const data = await res.json();
        console.log(data);
        setError(data.message || "Failed to submit request");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  }

  return (
    <div className="">
      <h1 className="text-sm md:text-lg font-bold text-white ">Make A Withdraw</h1>

      <form action="" className="pt-10">
        <div className="mt-6">
          <h1 className="text-xs md:text-lg font-bold text-(--color1)">
            Select Withdrawal Method
          </h1>
          <div className="grid grid-cols-2 gap-3 mt-2 text-(--textColor)">
            {paymentPageInfo.map((method) => (
              <button
                key={method.name}
                type="button"
                onClick={() => setSelectedMethod(method)}
                className={`flex items-center justify-center gap-2 text-white  px-3 py-2 rounded text-xs bg-(--color2) border  ${
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

        <div className="pl-3">
          <div className="pt-10">
            <div className="flex items-center justify-between pb-2 pr-6 ">
              <p className="text-sm text-white ">Amount</p>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-emerald-500 "
              >
                <circle cx="12" cy="12" r="10" />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#fff"
                >
                  $
                </text>
              </svg>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border text-white border-(--color2) placeholder:text-xs rounded focus:border-(--color2) focus:ring-1 focus:ring-(--color2) px-2 py-1 text-[16px]   bg-transparent transition duration-200 md:w-[600px] h-12 w-[20rem]"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="pt-5">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm text-white">wallet Address</p>
            </div>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="wallet address"
              className="border border-(--color2) text-white placeholder:text-xs rounded focus:border-(--color2) focus:ring-1 focus:ring-(--color2) px-2 py-1 text-[16px]  bg-transparent transition duration-200 md:w-[600px] h-12 w-[20rem]"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="pt-5">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm text-white ">
                Memo: <span className="text-gray-400">optional</span>
              </p>
            </div>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Memo"
              className="border border-(--color2) text-white  placeholder:text-xs rounded focus:border-(--color2) focus:ring-1 focus:ring-(--color2) px-2 py-1 text-[16px]  bg-transparent transition duration-200 md:w-[600px] h-12 w-[20rem]"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>

        <div className="pt-8 mb-10 ml-4">
          {selectedMethod && (
            <button
              type="button"
              onClick={handleTransaction}
              className="bg-(--color3) text-black text-sm font-semibold px-6 py-2 rounded hover:bg-opacity-80 transition duration-200 md:w-[600px] w-[20rem]"
            >
              {`Withdraw ${
                amount || "0"
              } with ${selectedMethod.name.toUpperCase()}`}
            </button>
          )}
        </div>
      </form>

      {showModal && selectedMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-(--color4) rounded-lg p-6 w-[90%] max-w-[400px] relative text-center">
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-(--color2) text-xl p-2 z-10"
              >
                ✖
              </button>
            </div>

            <h2 className="text-lg text-white font-semibold mb-2">
              Withdraw with{" "}
              <span className="text-(--color1)">
                {selectedMethod.name.toUpperCase()}
              </span>
            </h2>

            <p className="text-sm text-white mb-2">
              Amount:{" "}
              <span className="text-(--color3) font-bold">${amount}</span>{" "}
              ≈{" "}
              <span className="text-(--color3) font-bold">
                {cryptoAmount}
              </span>{" "}
              {selectedMethod.name.toUpperCase()}
            </p>

            <div className="">
              <p className="text-xs md:text-lg text-gray-400">
                withdrawal Address :
              </p>
              <div className="text-white break-all ">{walletAddress}</div>
            </div>

            <div className="">
              <p className="text-xs pb-2 text-gray-400">
                Your request will be processed shortly.
              </p>
              <p className="text-xs pb-2 text-gray-400">
                You will receive a notification once your withdrawal is
                complete. Please note that processing times may vary depending
                on network conditions.
              </p>
            </div>

            <div className="flex items-center justify-center mb-5 mt-5">
              <p className="flex items-center gap-2 text-xs mb-1 text-yellow-400">
                <span className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </p>
            </div>

            <p className="text-xs font-bold mt-1 text-red-700">⚠</p>
            <div className="space-y-4">
              <p className="md:text-lg text-xs mt-1 text-gray-400 border-b">
                This payment address/ID is only meant for withdraw through{" "}
                <span className="text-(--color1) font-bold">
                  {selectedMethod.name.toUpperCase()}
                </span>
              </p>
              <p className="text-xs mt-1 text-gray-400 border-b">
                You will receive your withdrawal amount in your wallet once the
                transaction has been processed.
              </p>
              <p className="text-xs mt-1 text-gray-400 border-b">
                Withdrawals are usually processed promptly, but network delays
                may occasionally occur.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
