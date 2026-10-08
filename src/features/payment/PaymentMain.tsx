"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useAddressHook, AddressData } from "@/features/address/hook/useAddressHook";
import OrderSuccessModal from "@/features/order/components/OrderSuccessModal";

import PaymentMethods from "./components/PaymentMethods";
import PaymentSummary from "./components/PaymentSummary";
import { usePaymentHook } from "./hook/usePaymentHook";

export default function PaymentMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addressIdParam = searchParams.get("addressId");

  const { addresses } = useAddressHook();
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

  const {
    selectedMethod,
    setSelectedMethod,
    isProcessing,
    createdOrder,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    processPayment,
  } = usePaymentHook();

  // URL-   addressId   
  useEffect(() => {
    if (addresses.length > 0) {
      if (addressIdParam) {
        const found = addresses.find((a) => a.id === Number(addressIdParam));
        setSelectedAddress(found || addresses[0]);
      } else {
        setSelectedAddress(addresses[0]);
      }
    }
  }, [addresses, addressIdParam]);

  const handlePayNow = async () => {
    if (!selectedAddress) return;
    await processPayment(selectedAddress.id);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FBF6EC] pb-20">
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        
        {/* Desktop Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center text-xs font-medium text-gray-500 mb-5 space-x-2">
          <Link href="/" className="hover:text-[#0F3D2E]">Home</Link>
          <span>&gt;</span>
          <Link href="/cart" className="hover:text-[#0F3D2E]">Cart</Link>
          <span>&gt;</span>
          <Link href="/address" className="hover:text-[#0F3D2E]">Address</Link>
          <span>&gt;</span>
          <span className="text-[#0F3D2E] font-semibold">Payment</span>
        </nav>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="md:hidden p-1.5 -ml-1 text-slate-800 hover:text-[#0F3D2E] transition active:scale-95"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#D9A441] uppercase">
              Step 3 of 3
            </p>
            <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F3D2E] sm:text-3xl lg:text-4xl">
              Choose Payment Method
            </h1>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          {/* Left Column: Payment Options */}
          <section className="min-w-0">
            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
            />
          </section>

          {/* Right Column: Summary */}
          <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
            <PaymentSummary
              selectedAddress={selectedAddress}
              selectedMethod={selectedMethod}
              isProcessing={isProcessing}
              onPayNow={handlePayNow}
            />
          </aside>
        </div>
      </main>

      {/* Order Success Modal (  ) */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        order={createdOrder}
        onClose={() => setIsSuccessModalOpen(false)}
        onTrackOrder={() => {
          setIsSuccessModalOpen(false);
          router.push("/profile?tab=orders");
        }}
        onContinueBrowsing={() => {
          setIsSuccessModalOpen(false);
          router.push("/");
        }}
      />
    </div>
  );
}