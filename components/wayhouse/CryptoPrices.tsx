"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
};

export default function CryptoPrices() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/prices`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch prices");
        }

        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch prices", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading prices...</p>;
  }

  return (
    <div className="w-full overflow-x-auto pb-10">
      <div className="grid grid-cols-2 gap-4 py-4 px-2 lg:grid-cols-4 lg:gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="min-w-[160px] bg-[#111] border border-gray-800 rounded-xl p-4
                       flex items-center gap-3
                       hover:scale-105 transition duration-300"
          >
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
            />

            <div>
              <p className="font-bold text-white uppercase">
                {coin.symbol}
              </p>
              <p className="text-green-400 text-sm">
                ${coin.current_price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
