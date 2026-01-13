"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

export default function DeductFunds() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddFunds = async () => {
    if (!userId || !amount) {
      toast.error("Please fill in both fields.");
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      // const userId = localStorage.getItem("userId");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/withdrawals/deduct-funds/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assumes admin is logged in and token is stored
          },
          body: JSON.stringify({ amount: Number(amount) }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Funds deducted successfully");
      setUserId("");
      setAmount("");
    } catch (err: any) {
      toast.error(`Failed to deduct funds: ${err}`);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-red-600">
        Deduct Funds 
      </h2>

      <div className="mb-3">
        <label className="block font-medium mb-1 text-blue-500">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring"
          placeholder="Enter user ID"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1 text-blue-500">
          Amount to Deduct
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border text-black rounded focus:outline-none focus:ring"
          placeholder="Enter amount"
        />
      </div>

      <button
        onClick={handleAddFunds}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
      >
        Deduct Funds
      </button>
    </div>
  );
}
