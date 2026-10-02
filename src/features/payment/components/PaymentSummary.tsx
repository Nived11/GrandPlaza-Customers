"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import type { RootState } from "@/redux/store";
import type { AddressData } from "@/features/address/hook/useAddressHook";
import type { PaymentMethod } from "../hook/usePaymentHook";

interface PaymentSummaryProps {
  selectedAddress: AddressData | null;
  selectedMethod: PaymentMethod;
  isProcessing: boolean;
  onPayNow: () => void;
}

export default function PaymentSummary({
  selectedAddress,
  selectedMethod,
  isProcessing,
  onPayNow,
}: PaymentSummaryProps) {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const itemsTotal = cartItems.reduce((total, item) => total + item.total_price, 0);
  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const totalPayable = itemsTotal + deliveryFee;

  const getButtonText = () => {
    if (isProcessing) return "Processing Payment...";
    if (selectedMethod === "gpay") return `Pay ₹${totalPayable.toFixed(2)} with GPay`;
    if (selectedMethod === "phonepe") return `Pay ₹${totalPayable.toFixed(2)} with PhonePe`;
    if (selectedMethod === "cod") return `Place Order (Cash on Delivery)`;
    return `Pay ₹${totalPayable.toFixed(2)}`;
  };

  return (
    <div className="bg-[#F7F2E8] border border-[#EADBCA] rounded-3xl p-6 shadow-[0_2px_10px_rgba(15,61,46,0.05)] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EADBCA]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
          <span className="text-[#D9A441]">✦</span> Payment Summary
        </span>

        <span className="text-[10px] font-bold text-[#0F3D2E] bg-white px-2.5 py-0.5 rounded-full border border-[#EADBCA]">
          Step 3 of 3
        </span>
      </div>

      {/* Selected Address Preview */}
      {selectedAddress && (
        <div className="bg-white rounded-2xl p-4 border border-[#EADBCA] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
              Delivering to
            </span>
            <button
              type="button"
              onClick={() => router.push("/address")}
              className="text-[10px] font-bold text-[#0F3D2E] hover:underline"
            >
              Change
            </button>
          </div>
          <h4 className="text-xs font-bold text-[#0F3D2E] uppercase">
            {selectedAddress.address_type} ({selectedAddress.pincode})
          </h4>
          <p className="text-[11px] text-stone-600 line-clamp-2">
            {selectedAddress.address_line}, {selectedAddress.city}
          </p>
        </div>
      )}

      {/* Bill Details */}
      <div className="space-y-2.5 text-xs text-stone-600">
        <div className="flex justify-between">
          <span>Items Total</span>
          <span className="font-semibold text-slate-800">₹{itemsTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-800">
            {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-[#EADBCA] pt-2.5 flex justify-between items-baseline">
          <span className="font-bold text-sm text-slate-800">Total Payable</span>
          <span className="font-bold text-xl text-[#0F3D2E]">₹{totalPayable.toFixed(2)}</span>
        </div>
      </div>

      {/* Pay Now Button */}
      <button
        type="button"
        disabled={isProcessing || !selectedAddress || cartItems.length === 0}
        onClick={onPayNow}
        className="w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 bg-[#0F3D2E] hover:bg-[#185843] text-white shadow-[0_8px_24px_-4px_rgba(15,61,46,0.09)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98"
      >
        {isProcessing && <Loader2 size={16} className="animate-spin text-white" />}
        <span>{getButtonText()}</span>
      </button>

      {/* Back to Address */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={() => router.push("/address")}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-[#0F3D2E] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Address
        </button>
      </div>
    </div>
  );
}