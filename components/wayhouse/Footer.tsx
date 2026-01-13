"use client";

import Link from "next/link";
import Logo from "../nav/Logo";

import {
  FaGithub,
  FaDiscord,
 
} from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-[#0b0e0d] text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div className="space-y-4">
           <Logo/>
            <p className="text-sm leading-relaxed pt-5">
              Unlock liquidity from your cryptocurrency without selling. Secure,
              transparent, and built for the future of decentralized finance.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: FaDiscord, href: "#" },
                { icon: FaGithub, href: "#" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition"
                  >
                    <Icon className="text-sm text-white" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/analytics" className="hover:text-white">Crypto Loans</Link></li>
              <li><Link href="/" className="hover:text-white">Security</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/about" className="hover:text-white">Press</Link></li>
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white">Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2020 Xcollat. All rights reserved.</p>

          <p className="text-gray-500 text-center md:text-right max-w-xl">
            Digital assets are volatile. Loans are subject to collateral value
            and platform terms.
          </p>
        </div>
      </div>
    </footer>
  );
}
