"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is Xcollat?",
    answer:
      "Xcollat is a crypto lending platform that allows you to lock crypto as collateral and borrow stable coins like USDT or USDC instantly.",
  },
  {
    question: "How does the (LTV) work?",
    answer:
      "LTV represents the percentage of your collateral you can borrow. At Xcollat, we offer up to 50% LTV",
  },
  {
    question: "Is my coin safe?",
    answer:
      "Yes. Your coins stays securely locked as collateral. We never sell or rehypothecate your assets.",
  },
  {
    question: "What are the interest rates?",
    answer:
      "We use fixed interest rates based on tiers. For example, Starter level1 = 3%, level2 = 4%, level3 = 6%.",
  },
  {
    question: "How do I repay my loan?",
    answer:
      "You repay the borrowed stable coins plus the fixed interest. Once repayment is complete, your coin collateral is unlocked instantly.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fade = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-[#0b0e0d] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#111413] rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex  justify-between items-center p-4 text-left text-gray-300 hover:bg-white/5 transition"
              >
                <span className="font-semibold ">{faq.question}</span>
                {openIndex === i ? (
                  <FaChevronUp className="text-[#90e4b0]" />
                ) : (
                  <FaChevronDown className="text-[#90e4b0]" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fade}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-400 text-sm md:text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
