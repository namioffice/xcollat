"use client";

import React from "react";
import { Iceland } from "next/font/google";

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen px-4 py-12 flex justify-center bg-linear-to-br from-[#0b0e0d] to-[#202523]">
      <div
        className={`w-full max-w-4xl space-y-8 text-gray-300 ${iceland.className}`}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Privacy Policy
        </h1>

        <p className="text-sm text-center text-gray-400">
          Last updated: September 2025
        </p>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information you provide directly, including
            first name, last name, email address, country of residence, and
            government-issued identification where required for compliance.
          </p>
          <p>
            We may also collect technical data such as IP address, device type,
            browser information, and usage activity when you interact with
            Xcollat.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used to create and manage accounts, process
            transactions, verify identity, prevent fraud, comply with legal
            obligations, and improve platform functionality.
          </p>
          <p>
            We may also use aggregated or anonymized data for analytics,
            performance monitoring, and platform development.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            3. Legal Basis for Processing
          </h2>
          <p>
            We process personal data based on your consent, contractual
            necessity, compliance with legal obligations, and our legitimate
            interests in maintaining a secure and reliable platform.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            4. Identity Verification & Compliance
          </h2>
          <p>
            To meet Anti-Money Laundering (AML) and Know Your Customer (KYC)
            requirements, we may request additional verification documents.
            Failure to complete verification may limit access to services.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            5. Data Protection & Security
          </h2>
          <p>
            We implement industry-standard technical and organizational security
            measures to protect personal data against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
          <p>
            Despite our efforts, no system is completely secure. You acknowledge
            that data transmission over the internet carries inherent risks.
          </p>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            6. Sharing of Information
          </h2>
          <p>
            We do not sell or rent your personal data. Information may be shared
            with trusted third parties such as identity verification providers,
            cloud infrastructure services, and legal authorities where required
            by law.
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            7. International Data Transfers
          </h2>
          <p>
            Your information may be transferred to and processed in countries
            outside your residence. We ensure appropriate safeguards are in
            place to protect your data in accordance with applicable laws.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            8. Data Retention
          </h2>
          <p>
            We retain personal information only as long as necessary to fulfill
            legal, regulatory, and operational requirements. Certain records may
            be retained after account closure where required by law.
          </p>
        </section>

        {/* 9 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            9. Cookies & Tracking Technologies
          </h2>
          <p>
            Xcollat uses cookies and similar technologies to improve user
            experience, remember preferences, and analyze platform usage. You
            can manage cookie preferences through your browser settings.
          </p>
        </section>

        {/* 10 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            10. Your Rights
          </h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, restrict, or request deletion of your personal data. You
            may also object to certain processing activities.
          </p>
        </section>

        {/* 11 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            11. Children’s Privacy
          </h2>
          <p>
            Xcollat does not knowingly collect personal information from
            individuals under the age of 18. If such data is discovered, it will
            be promptly deleted.
          </p>
        </section>

        {/* 12 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            12. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be
            posted on this page, and continued use of the platform constitutes
            acceptance of the revised policy.
          </p>
        </section>

        <p className="text-sm text-gray-400 pt-8">
          If you have questions about this Privacy Policy or how your data is
          handled, please contact our support team.
        </p>
      </div>
    </div>
  );
}
