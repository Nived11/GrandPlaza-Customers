"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FileText, Info, Lock, ArrowRight, Bike, ShieldCheck, Leaf, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useStoreStatus } from "@/hooks/useStoreStatus";
import type { RootState } from "@/redux/store";

const OrderSummary = () => {
  const router = useRouter();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [baseFee, setBaseFee] = useState<number>(20);
  const storeStatus = useStoreStatus();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("/settings/site-settings")
      .then((res) => {
        if (isMounted && res.data) {
          const b = Number(res.data.base_delivery_charge ?? res.data.baseDeliveryCharge ?? 20);
          setBaseFee(b);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.total_price,
    0
  );

  const packingTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.packing_charge || 0) * (item.quantity || 1),
    0
  );

  // Delivery fee: based on configured base fee if items in cart, 0 if empty
  const deliveryFee = cartItems.length > 0 ? baseFee : 0;
  const totalPayable = itemsTotal + packingTotal + deliveryFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return;
    }

    if (!storeStatus.isOpen) {
      toast.error(
        "Empire Plaza is currently closed for online orders. Browsing is enabled, but new orders are paused until opening hours."
      );
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

        {/* Packaging Fee */}
        {packingTotal > 0 && (
          <div className="flex justify-between items-center text-slate-600">
            <span className="inline-flex items-center gap-1">
              Packing Charges
              <span title="Restaurant packaging and container fee">
                <Info size={14} className="text-gray-400 cursor-help" />
              </span>
            </span>
            <span className="font-semibold text-slate-800">
              ₹{packingTotal.toFixed(2)}
            </span>
          </div>
        )}

        {/* Delivery Fee with info tooltip */}
        <div className="flex justify-between items-center text-slate-600">
          <span className="inline-flex items-center gap-1">
            <span>Delivery Fee</span>
            <span
              title="Base rate. Exact fee is calculated dynamically based on your address distance at checkout."
              className="inline-flex items-center"
            >
              <Info size={14} className="text-gray-400 cursor-help" />
            </span>
          </span>
          <div className="text-right">
            <span className="font-semibold text-slate-800">
              {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
            </span>
            <span className="text-[10px] text-stone-400 block -mt-0.5">
              by distance
            </span>
          </div>
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

      {/* Closed Warning Banner */}
      {!storeStatus.isOpen && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-2.5 text-rose-800">
          <span className="text-base leading-none shrink-0 mt-0.5">🔴</span>
          <div className="text-xs space-y-0.5">
            <p className="font-bold">Store Currently Closed</p>
            <p className="text-rose-700">
              Empire Plaza is not accepting online orders right now. Browsing the menu is enabled, but checkout is paused until opening hours{storeStatus.formattedHoursText ? ` (${storeStatus.formattedHoursText})` : ""}.
            </p>
          </div>
        </div>
      )}

      {/* Checkout Primary Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isCheckoutLoading || cartItems.length === 0 || !storeStatus.isOpen}
          className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed group ${
            !storeStatus.isOpen
              ? "bg-rose-700 text-white opacity-90 cursor-not-allowed"
              : "bg-[#0F3D2E] hover:bg-[#165742] text-white disabled:opacity-50"
          }`}
        >
          {isCheckoutLoading ? (
            <Loader2 size={18} className="animate-spin text-white" />
          ) : (
            <Lock size={16} className={!storeStatus.isOpen ? "text-rose-200" : "text-emerald-200"} />
          )}

          <span>
            {!storeStatus.isOpen
              ? "Store Currently Closed"
              : isCheckoutLoading
              ? "Processing..."
              : "Proceed to Checkout"}
          </span>

          {storeStatus.isOpen && !isCheckoutLoading && (
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