import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserHeader from "@/components/common/UserHeader";
import UserFooter from "@/components/common/UserFooter";
import "@/app/globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Empire Plaza Kochi | Premium Food Delivery",
  description: "Find the best premium meals and luxury items at Empire Plaza Kochi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 m-0 p-0`}>
        
        {/* Responsive Header (Desktop Top Nav & Mobile Top Header) */}
        <UserHeader />

        {/* Main Content Area with Bottom Padding on mobile for bottom navigation bar */}
        <main className="flex-1 w-full mt-24 md:mt-28 pb-20 md:pb-0">
          {children}
        </main>

        <UserFooter />

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}