"use client";

import React from "react";
import { Iceland } from "next/font/google";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function TermsOfService() {
  return (
    <div className="min-h-screen px-4 py-12 flex justify-center bg-linear-to-br from-[#0b0e0d] to-[#202523]">
      <div
        className={`w-full max-w-4xl space-y-8 text-gray-300 ${iceland.className}`}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Terms of Service
        </h1>

        <p className="text-sm text-center text-gray-400">
          Last updated: September 2025
        </p>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Xcollat, you agree to be bound by these Terms of
            Service, our Privacy Policy, and all applicable laws and regulations.
            If you do not agree, you must not use the platform.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Eligibility</h2>
          <p>
            You must be at least 18 years old and legally permitted to use
            cryptocurrency and financial services in your jurisdiction. You
            represent that your use of Xcollat does not violate any applicable
            laws.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            3. Account Registration
          </h2>
          <p>
            You must provide accurate, complete, and current information during
            registration. You are solely responsible for maintaining the
            confidentiality of your login credentials and all activity under
            your account.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            4. KYC & Government-Issued Identification
          </h2>
          <p>
            To comply with regulatory requirements, Xcollat may require identity
            verification, including submission of government-issued
            identification based on your country of residence. Failure to
            complete verification may result in restricted access or account
            suspension.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            5. Crypto Collateral & Loans
          </h2>
          <p>
            Digital assets deposited as collateral remain your property unless
            liquidation conditions are triggered. Loan-to-value ratios, interest
            rates, and repayment terms are determined at the time of borrowing
            and may vary based on market conditions.
          </p>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            6. Liquidation & Risk Controls
          </h2>
          <p>
            If collateral value falls below required thresholds, Xcollat may
            initiate partial or full liquidation without prior notice to protect
            system integrity. You acknowledge and accept this risk.
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            7. Fees & Interest
          </h2>
          <p>
            You agree to pay all applicable interest, service fees, and network
            fees associated with your use of the platform. Fees are disclosed
            prior to transaction confirmation.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            8. User Responsibilities
          </h2>
          <p>
            You agree not to use Xcollat for unlawful activities, including fraud,
            money laundering, terrorism financing, or sanctions evasion.
          </p>
        </section>

        {/* 9 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            9. No Financial Advice
          </h2>
          <p>
            All information provided by Xcollat is for informational purposes
            only and does not constitute financial, legal, or investment advice.
            You are solely responsible for your financial decisions.
          </p>
        </section>

        {/* 10 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            10. Risk Disclosure
          </h2>
          <p>
            Cryptocurrency markets are highly volatile. You acknowledge that you
            may lose some or all of your assets due to market movements,
            liquidation events, or technical failures.
          </p>
        </section>

        {/* 11 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            11. Suspension & Termination
          </h2>
          <p>
            Xcollat reserves the right to suspend or terminate accounts that
            violate these Terms, applicable laws, or pose risk to the platform.
          </p>
        </section>

        {/* 12 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            12. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Xcollat shall not be liable
            for indirect, incidental, or consequential damages arising from use
            of the platform.
          </p>
        </section>

        {/* 13 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            13. Governing Law
          </h2>
          <p>
            These Terms are governed by and construed in accordance with
            applicable laws, without regard to conflict-of-law principles.
          </p>
        </section>

        {/* 14 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            14. Amendments
          </h2>
          <p>
            Xcollat may update these Terms from time to time. Continued use of
            the platform after updates constitutes acceptance of the revised
            Terms.
          </p>
        </section>

        <p className="text-sm text-gray-400 pt-8">
          If you have any questions regarding these Terms, please contact our
          support team.
        </p>
      </div>
    </div>
  );
}
