import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { NextUIProvider } from "@nextui-org/system";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nawy Estate | Premium Real Estate in Egypt",
  description: "Premium real estate in Egypt"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
