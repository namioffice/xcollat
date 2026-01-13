"use client";
import React, { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";
import { toast } from "react-toastify";
import LoadingSpinner from "../wayhouse/Loading";


type Stake = {
  id: string;
  name: string;
  amount: number;
  planId: string;
  startDate: string;
  endDate: string;
  status: string;
  rewardAmount: number;
};

export default function ActiveStake() {
  const [activeStakes, setActiveStakes] = useState<Stake[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveStake = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/loan/my-loan/${userId}`
      );

      if (!res.ok) {
        toast.error("No active stake found");
        setActiveStakes([]);
        return;
      }

      const data = await res.json();
      setActiveStakes(data);
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch active stakes:", err);
      toast.error("Failed to load active stakes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveStake();
  }, []);

  if (loading) {
    return <LoadingSpinner/>
  }

  if (activeStakes.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm md:text-lg">You don&apos;t have any active Loan yet.</p>
    );
  }

  return (
    <div className="space-y-4 mt-4 pr-5">
      <h1 className="md:text-lg text-white font-bold pt-5">Active Loan</h1>
      {activeStakes.map((stake) => (
        <div
          key={stake.id}
          className="bg-(--color2) rounded-xl p-4 md:p-6 shadow flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-(--color1) p-2 rounded-full">
              <GrMoney className="text-black" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold">{stake.planId} plan</p>
              <p className="text-sm md:text-2xl font-bold text-gray-200">
                ${stake.amount.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 font-bold "> <span className="text-(--color3)">Status:</span> {stake.status}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-green-500 text-sm">
              {stake.rewardAmount} counting...
            </p>
            <p className="text-gray-400 text-xs">
              Ends: {new Date(stake.endDate).toLocaleDateString()}
            </p>
          </div>
          
        </div>
      ))}
    </div>
  );
}
