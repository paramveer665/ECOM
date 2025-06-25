import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import "@/styles/tailwind.css";
import "../styles/index.css";
import { WishlistProvider } from "@/context/WishlistContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextEcom",
  description: "Developed by paramveer665",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> <WishlistProvider>{children}</WishlistProvider></body>
    </html>
  );
}
