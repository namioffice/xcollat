"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddFunds() {
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
      console.log('this is the user id from frontend',userId)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit/add-funds/${userId}`,
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

      toast.success("Funds added successfully");
      setUserId("");
      setAmount("");
    } catch (err: any ) {
      toast.error(`Failed to add funds: ${err}`);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-green-500">
        Add Funds 
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
          Amount to Add
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
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
      >
        Add Funds
      </button>
    </div>
  );
}
