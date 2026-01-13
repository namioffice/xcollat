import type { Metadata } from "next";
import { Geist, Geist_Mono, Iceland } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

export const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-iceland",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "xcollat",
  description: "Xcollat is a crypto-backed lending platform that allows users to deposit their cryptocurrency as collateral and receive loans in USDT stablecoin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${iceland.variable} antialiased overflow-x-hidden`}
      >
         {/* <NavBar/> */}
        {children}

         {/* Add ToastContainer once in your app */}
         <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          theme="colored"
        />
      </body>
    </html>
  );
}
