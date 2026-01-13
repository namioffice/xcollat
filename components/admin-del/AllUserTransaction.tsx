"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllUserTransaction() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [showAllDeposits, setShowAllDeposits] = useState(false);
  const [showAllWithdrawals, setShowAllWithdrawals] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }

    Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit/all-approved-deposits`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch deposits");
        }
        return res.json();
      }),

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/withdrawals/all-approved-withdrawals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch withdrawals");
        }
        return res.json();
      }),
    ])
      .then(([deposits, withdrawals]) => {
        setDeposits(deposits);
        setWithdrawals(withdrawals);
      })
      .catch((err) => {
        toast.error(err.message || "Error fetching transactions");
      });
  }, []);

  const renderCard = (tx: any, type: string) => (
    <div
      key={tx.id}
      className="bg-gray-800 text-white p-4 rounded-2xl shadow mb-3"
    >
      <p className="font-semibold">
        {tx.user?.firstname} {tx.user?.lastname}
      </p>
      <p className="text-sm">{tx.user?.email}</p>
      <p className="mt-1">
        Amount: <span className="font-bold">${tx.amount}</span>
      </p>
      <p>
        Status: <span className="capitalize">{tx.status}</span>
      </p>
      <p>Type: {type}</p>
      <p className="text-xs text-gray-400">
        {new Date(tx.createdAt).toLocaleString()}
      </p>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Deposits */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Approved Deposits
        </h2>
        {deposits.length > 0 ? (
          deposits
            .slice(0, showAllDeposits ? deposits.length : 2)
            .map((d) => renderCard(d, "deposit"))
        ) : (
          <p className="text-gray-400">No approved deposits found.</p>
        )}
        {deposits.length > 2 && (
          <button
            onClick={() => setShowAllDeposits(!showAllDeposits)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {showAllDeposits ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Withdrawals */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Approved Withdrawals
        </h2>
        {withdrawals.length > 0 ? (
          withdrawals
            .slice(0, showAllWithdrawals ? withdrawals.length : 2)
            .map((w) => renderCard(w, "withdrawal"))
        ) : (
          <p className="text-gray-400">No approved withdrawals found.</p>
        )}
        {withdrawals.length > 2 && (
          <button
            onClick={() => setShowAllWithdrawals(!showAllWithdrawals)}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            {showAllWithdrawals ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}
