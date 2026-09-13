import type { Metadata } from "next";
// 🌟 Inter മാറ്റി പക്കാ മോഡേൺ ആപ്പ് ഫീൽ തരുന്ന Plus Jakarta Sans ആക്കി
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta", // 🌟 CSS വേരിയബിൾ സെറ്റ് ചെയ്തു
});

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
      <body
        // 🌟 പുതിയ ഫോണ്ട് ബോഡിയിൽ കൊടുത്തിട്ടുണ്ട്
        className={`${jakarta.variable} ${jakarta.className} font-sans min-h-screen bg-gray-50 text-gray-900 m-0 p-0`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}