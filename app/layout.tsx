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
  title: "XCollat",
  description: "XCollat is a crypto-backed lending platform that allows users to deposit their cryptocurrency as collateral and receive loans in USDT stablecoin.",
  icons: {
    icon: '/favicon.jpg', // you can also use .png or .ico
  },
  openGraph: {
    title: "XCollat",
    description: "XCollat is a crypto-backed lending platform that allows users to deposit their cryptocurrency as collateral and receive loans in USDT stablecoin.",
    url: "https://xcollat.vercel.app/", // replace with your live URL
    siteName: "XCollat",
    images: [
      {
        url: "/favicon.jpg", // the same icon or a social preview image
        width: 800,
        height: 600,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  themeColor: "#0d6efd", // blue theme for tab highlight on mobile
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

<head>
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="shortcut icon" href="/favicon.ico" />
</head>

      
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
