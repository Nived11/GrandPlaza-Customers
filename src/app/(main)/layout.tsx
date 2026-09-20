import UserHeader from "@/components/common/UserHeader";
import UserFooter from "@/components/common/UserFooter";
import FloatingCartBar from "@/features/cart/components/FloatingCartBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />

      <main className="flex-1 w-full mt-31 md:mt-28 pb-20 md:pb-0">
        {children}
      </main>

      {/* 📱 Mobile Floating Cart Bar (Blinkit-style above bottom nav) */}
      <FloatingCartBar />

      <UserFooter />
    </div>
  );
}