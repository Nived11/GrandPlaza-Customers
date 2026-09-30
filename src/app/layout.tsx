import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider";
import QueryProvider from "@/providers/QueryProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Empire Plaza Kochi | Premium Food Delivery",
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
        className={`${jakarta.variable} ${jakarta.className} font-sans min-h-screen bg-gray-50 text-gray-900 m-0 p-0`}
      >
        <ReduxProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ReduxProvider>

        <Toaster
          position="top-center"
          richColors
        />
      </body>
    </html>
  );
}