"use client";

import { motion, Variants } from "framer-motion";
import CountUp from "react-countup";

import {
    FiLock,
    FiTrendingUp,
    FiShield,
  } from "react-icons/fi";
  
  const features = [
    {
      title: "Non-Custodial Collateral",
      text: "Your assets remains securely locked and never sold or reused.",
      icon: FiLock,
    },
    {
      title: "Fixed Interest Loans",
      text: "No APR tricks or compounding transparent repayment terms.",
      icon: FiTrendingUp,
    },
    {
      title: "Institution-Grade Security",
      text: "Built with battle-tested infrastructure and audited logic.",
      icon: FiShield,
    },
  ];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TrustedBy() {
  return (
    <section className=" text-white py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Trusted by{" "}
            <span className="bg-linear-to-r from-(--color1) via-[#38bdf8] to-[#202523] bg-clip-text text-transparent">
              <CountUp end={165000} duration={2} separator="," />+
            </span>{" "}
            Users
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Thousands of cryptocurrency holders trust our platform to unlock liquidity
            without selling their assets.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { end: 165000, suffix: "+", label: "Active Holders" },
            { end: 120, suffix: "M+", label: "Loans Issued", prefix: "$" },
            { end: 99.9, suffix: "%", label: "Platform Uptime", decimals: 1 },
            { value: "24/7", label: "Support" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#111413] rounded-2xl p-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-[#90e4b0]">
                {item.value ? (
                  item.value
                ) : (
                  <>
                    {item.prefix}
                    <CountUp
                      end={item.end as number}
                      decimals={item.decimals || 0}
                      duration={2}
                    />
                    {item.suffix}
                  </>
                )}
              </p>

              <p className="text-gray-400 mt-2 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-8">
      {features.map((item, i) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition"
          >
            {/* ICON */}
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Icon className="text-xl text-cyan-400" />
            </div>

            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        );
      })}
    </div>
      </div>
    </section>
  );
}
