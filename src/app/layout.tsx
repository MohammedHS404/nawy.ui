import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppNavbar from "./components/appNavbar";
import { NextUIProvider } from "@nextui-org/system";
import AppPropertyFilters from "./components/appPropertyFilters";
import BreadCrumbs from "./components/breadCrumbs";
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
          <Suspense fallback={<div>Loading...</div>}>
            <AppNavbar />
            <AppPropertyFilters />
            <BreadCrumbs />
            {children}
          </Suspense>
        </NextUIProvider>
        <footer className="mt-8 text-center py-4 border-t-1 border-gray-200">
          &copy; 2021 Nawy Estate
        </footer>
      </body>
    </html>
  );
}
