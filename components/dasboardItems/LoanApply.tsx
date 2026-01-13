"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const LTV = 0.5;

export default function CollateralLock() {
  const [plans, setPlans] = useState<any[]>([]);
  const [lockAmount, setLockAmount] = useState<number | "">("");
  const [plan, setPlan] = useState<any>(null);
  const [network, setNetwork] = useState("BEP20");
  const [wallet, setWallet] = useState("");
  const [showModal, setShowModal] = useState(false);
  

  // Fetch loan plans from backend
  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loan/plans`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch loan plans");
        const data = await res.json();
        setPlans(data);
        if (data.length > 0) setPlan(data[0]); // default plan
      } catch (err) {
        console.error(err);
      }
    }
    fetchPlans();
  }, []);

  const hasAmount = typeof lockAmount === "number" && lockAmount > 0;

  // Loan calculations
  const loanAmount = hasAmount ? lockAmount * LTV : 0;
  const interestAmount = plan ? (loanAmount * plan.percentage) / 100 : 0;
  const totalRepayment = loanAmount + interestAmount;

  const minLockAmount = plan ? plan.minAmount / LTV : 0;
  const maxLockAmount = plan ? plan.maxAmount / LTV : Infinity;
  const isValidForPlan =
    hasAmount && plan && lockAmount >= minLockAmount && lockAmount <= maxLockAmount;
  const canProceed = hasAmount && wallet.trim().length > 10 && isValidForPlan;


  // Handle loan request
  const handleLockBorrow = async () => {
    if (!canProceed || !plan) {
      toast.error("Please complete all required fields");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loan/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          planId: plan.id,
          amount: lockAmount.toString(),
        }),
      });
  
      const data = await res.json();
  
      // ❌ Backend error → Toast (DO NOT throw)
      if (!res.ok) {
        toast.error(data.message || "Loan request failed");
        return;
      }
  
      // ✅ Success
      toast.success("Loan request submitted successfully");
      console.log("Loan requested:", data);
      setShowModal(true);
  
    } catch (err) {
      console.error(err);
      toast.error("Network error, please try again");
    }
  };
  
  

  return (
    <>
      <div className=" mx-2 md:mx-auto md:max-w-5xl mr-7 ">
        {/* HEADER */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center md:text-left text-white">
          Lock Your Collateral
        </h2>
       <div className="flex items-center">
       <p className="text-xs md:text-sm text-gray-400 mb-6 text-center md:text-left">
          Lock funds from your account and instantly receive USDT at 50% LTV.
          Repay anytime to unlock your assets.
        </p>
       </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* AMOUNT */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Amount to Lock</p>
              <p className="text-[10px] text-gray-500 mb-1">
                Enter the amount you want to lock as collateral. You will
                receive 50% of this amount in USDT.
              </p>
              <input
                type="number"
                value={lockAmount}
                onChange={(e) =>
                  setLockAmount(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full bg-transparent border text-white border-white/10 rounded-lg px-3 py-3 outline-none placeholder-gray-500"
                placeholder="Enter amount to lock"
              />
            </div>

            {/* PLAN */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Select Plan</p>
              <p className="text-[10px] text-gray-500 mb-1">
                Choose a plan that suits your repayment period and interest
                rate.
              </p>
              <div className="flex gap-2 flex-wrap">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlan(p)}
                    className={`px-4 py-2 rounded-lg text-sm border ${
                      plan?.id === p.id
                        ? "bg-[#90e4b0] text-black"
                        : "border-white/10 text-gray-300"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* NETWORK */}
            <div>
              <p className="text-xs text-gray-400 mb-1">USDT Network</p>
              <p className="text-[10px] text-gray-500 mb-1">
                Select the network to receive your USDT. Make sure your wallet
                supports it.
              </p>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-[#0b0f0e] text-sm text-white border border-white/10 rounded-lg px-3 py-2"
              >
                <option value="BEP20">BEP20 (BSC)</option>
                <option value="ERC20">ERC20 (Ethereum)</option>
                <option value="TRC20">TRC20 (Tron)</option>
                <option value="POLYGON">Polygon (MATIC)</option>
                <option value="ARBITRUM">Arbitrum One</option>
                <option value="OPTIMISM">Optimism</option>
                <option value="AVALANCHE">Avalanche C-Chain</option>
                <option value="SOLANA">Solana</option>
              </select>
            </div>

            {/* WALLET */}
            <div>
              <p className="text-xs text-gray-400 mb-1">USDT Wallet Address</p>
              <p className="text-[10px] text-gray-500 mb-1">
                Enter your wallet address where you want to receive USDT. Make
                sure it is correct.
              </p>
              <input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full bg-transparent border text-[16px] text-white border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
                placeholder="e.g., 0x1234...abcd"
              />
            </div>

            {/* ACTION */}
            <button
              disabled={!canProceed}
              onClick={handleLockBorrow}
              className="w-full py-3 rounded-lg bg-[#90e4b0] text-black font-semibold disabled:opacity-40"
            >
              Lock & Borrow
            </button>

            {hasAmount && plan && !isValidForPlan && (
              <p className="text-xs text-red-400 text-center">
                Minimum amount to lock for this plan is $
                {minLockAmount.toLocaleString()}.
              </p>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-black/40 rounded-xl p-5 space-y-4 md:space-y-6 border border-(--color2)">
            <h3 className="font-semibold text-lg md:text-xl text-white">
              Loan Summary
            </h3>

            <Row
              label="Locked Amount"
              value={`$${hasAmount ? lockAmount : 0}`}
            />
            <Row label="LTV" value="50%" />
            <Row label="You Receive" value={`$${loanAmount.toFixed(2)} USDT`} />
            <Row
              label={`Interest (${plan?.percentage ?? 0}%)`}
              value={`$${interestAmount.toFixed(2)}`}
            />
            <Row label="Duration" value={plan?.duration ? `${plan.duration} days` : "-"} />

            <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
              <span className="text-white">Total Repayment</span>
              <span className="text-[#90e4b0]">
                ${totalRepayment.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 ">
          <div className="bg-[#111413] rounded-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-2">Collateral Locked</h3>
            <p className="text-sm text-gray-400 mb-4">
              You've locked <b>${lockAmount}</b> as collateral.
              <br />
              <b>${loanAmount.toFixed(2)} USDT</b> will be sent via{" "}
              <b>{network}</b>.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 rounded-lg bg-[#90e4b0] text-black font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-white justify-between text-sm md:text-base">
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}
