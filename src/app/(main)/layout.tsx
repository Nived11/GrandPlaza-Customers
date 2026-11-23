import UserHeader from "@/components/common/UserHeader";
import UserFooter from "@/components/common/UserFooter";
import FloatingCartBar from "@/features/cart/components/FloatingCartBar";
import FloatingLiveOrderBar from "@/features/order/components/FloatingLiveOrderBar";
import { CelebrationThemeProvider } from "@/context/CelebrationThemeContext";
import CelebrationThemeLayer from "@/components/festive/CelebrationThemeLayer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CelebrationThemeProvider>
      <div className="min-h-screen flex flex-col relative">
        {/* 🎄 Celebration / Festival Layer (Header Garland, Snowfall, Holiday Accents) */}
        <CelebrationThemeLayer />

        <UserHeader />

        <main className="flex-1 w-full mt-[108px] md:mt-28 pb-20 md:pb-0">
          {children}
        </main>

        {/* 🛵 Floating Active Order Status Bar (Live GPS & Progress Tracker) */}
        <FloatingLiveOrderBar />

        {/* 📱 Mobile Floating Cart Bar */}
        <FloatingCartBar />

        <UserFooter />
      </div>
    </CelebrationThemeProvider>
  );
}
