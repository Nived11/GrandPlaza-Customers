"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FileText, Info, Lock, ArrowRight, Bike, ShieldCheck, Leaf, Loader2 } from "lucide-react";
import type { RootState } from "@/redux/store";

const OrderSummary = () => {
  const router = useRouter();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.total_price,
    0
  );

  // Delivery fee: flat ₹30 if cart has items, ₹0 if empty
  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const totalPayable = itemsTotal + deliveryFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.push("/login?redirect=/cart");
      return;
    }

    try {
      setIsCheckoutLoading(true);
      router.push("/address");
    } catch (error) {
      console.error("CHECKOUT NAVIGATION ERROR:", error);
      setIsCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100/90 space-y-5">
      {/* Summary Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F3D2E] flex items-center justify-center shrink-0">
          <FileText size={18} strokeWidth={2.2} />
        </div>
        <h2 className="font-bold text-base sm:text-lg text-slate-800">
          Order Summary
        </h2>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 text-sm">
        {/* Items Subtotal */}
        <div className="flex justify-between items-center text-slate-600">
          <span>Items ({totalQuantity})</span>
          <span className="font-semibold text-slate-800">
            ₹{itemsTotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee with info tooltip */}
        <div className="flex justify-between items-center text-slate-600">
          <span className="inline-flex items-center gap-1">
            Delivery Fee
            <span title="Standard delivery charge">
              <Info size={14} className="text-gray-400 cursor-help" />
            </span>
          </span>
          <span className="font-semibold text-slate-800">
            {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
          <span className="font-bold text-slate-800 text-base">
            Total Amount
          </span>
          <span className="font-bold text-xl sm:text-2xl text-[#0F3D2E]">
            ₹{totalPayable.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Primary Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isCheckoutLoading || cartItems.length === 0}
          className="w-full py-3.5 px-6 rounded-full bg-[#0F3D2E] hover:bg-[#165742] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isCheckoutLoading ? (
            <Loader2 size={18} className="animate-spin text-white" />
          ) : (
            <Lock size={16} className="text-emerald-200" />
          )}

          <span>
            {isCheckoutLoading ? "Processing..." : "Proceed to Checkout"}
          </span>

          {!isCheckoutLoading && (
            <ArrowRight
              size={16}
              className="text-emerald-200 group-hover:translate-x-1 transition-transform"
            />
          )}
        </button>
      </div>

      {/* Trust & Quality Badges */}
      <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-gray-500">
        <div className="flex flex-col items-center gap-1.5 p-1.5">
          <div className="text-[#0F3D2E]">
            <Bike size={18} strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium leading-tight text-slate-600">
            Fast Delivery
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 p-1.5">
          <div className="text-[#0F3D2E]">
            <ShieldCheck size={18} strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium leading-tight text-slate-600">
            Hygienic Food
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 p-1.5">
          <div className="text-[#0F3D2E]">
            <Leaf size={18} strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium leading-tight text-slate-600">
            Fresh Ingredients
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;