import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Empire Plaza Kochi | Premium Food Delivery",
  description:
    "Find the best premium meals and luxury items at Empire Plaza Kochi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="antialiased"
    >
      <body
        className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 m-0 p-0`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>

        <Toaster
          position="top-center"
          richColors
        />
      </body>
    </html>
  );
}