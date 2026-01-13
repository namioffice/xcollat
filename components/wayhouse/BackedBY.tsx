"use client";

import Image from "next/image";
import { Iceland } from "next/font/google";
import { motion } from "framer-motion";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

const leaders = [
  {
    name: "Ripple Ecosystem",
    logo: "/v2.jpg",
  },
  {
    name: "Stellar Network",
    logo: "/v1.webp",
  },
  {
    name: "Blockchain Infrastructure",
    logo: "/v5.png",
  },
  {
    name: "Global Payments",
    logo: "/v4.png",
  },
];

export default function BackedByLeaders() {
  return (
    <section className="w-full py-20 px-4 md:px-10 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — LOGOS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center"
        >
          {leaders.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="flex items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl hover:scale-105 transition"
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={120}
                height={60}
                className="object-contain opacity-80 hover:opacity-100 transition"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2
            className={`${iceland.className} text-white text-2xl sm:text-3xl md:text-4xl font-bold`}
          >
            Backed by leaders reshaping{" "}
            <span className="bg-linear-to-r from-(--color1) via-[#38bdf8] to-[#202523] bg-clip-text text-transparent animate-gradient">
              finance
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Built on battle-tested blockchain infrastructure and inspired by
            global leaders in payments and decentralized finance. Xcollat is
            designed to meet the standards of modern, borderless finance.
          </p>

          <ul className="space-y-3 text-gray-400 text-sm">
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              • Enterprise-grade blockchain networks
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              • Proven settlement and payment rails
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              • Designed for scale, security, and transparency
            </motion.li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
