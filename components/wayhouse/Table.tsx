'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-toastify';
import LoadingSpinner from './Loading';

type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  date: string;
};

interface TransactionFromBackend {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  createdAt: string; // or Date depending on your API
}


export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('User not logged in');
          setLoading(false);
          return;
        }
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!res.ok) {
          toast.error('Failed to load transactions');
          setLoading(false);
          return;
        }
  
        const data = await res.json();
  
        // ✅ Map backend data to your frontend type
        const mapped = data.map((tx: TransactionFromBackend) => ({
          id: tx.id,
          type: tx.type === 'deposit' ? 'Deposit' : 'Withdrawal',
          amount: tx.amount,
          date: tx.createdAt,
        }));
  
        setTransactions(mapped);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        toast.error('Unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  

  return (
    <div className="overflow-x-auto rounded-lg mt-6 ">

      {loading ? (
    //    <LoadingSpinner/>
    //   ) : transactions.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions found.</p>
      ) : (
        <div className="">
          <table className="min-w-full divide-y divide-gray-700  ">
          <thead className="border-t">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800  ">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-(--color4) transition-colors bg-(--color2) text-white  ">
                <td className="px-4 py-2 flex items-center gap-2 text-(--textColor2) ">
                  {tx.type === 'Deposit' ? (
                    <FaArrowDown className="text-green-500" />
                  ) : (
                    <FaArrowUp className="text-red-500" />
                  )}
                  <Link href={`/transactions`} className="text-sm md:text-lg hover:underline">
                    {tx.type}
                  </Link>
                </td>
                <td className="px-4 py-2 text-(--textColor2) text-sm md:text-lg">
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-(--textColor2) text-sm md:text-lg">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
