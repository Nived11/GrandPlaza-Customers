"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, ShieldCheck, Bike } from "lucide-react";
import axiosInstance from "@/lib/axios";
import type { RootState } from "@/redux/store";
import type { AddressData } from "@/features/address/hook/useAddressHook";
import type { PaymentMethod } from "../hook/usePaymentHook";

interface PaymentSummaryProps {
  selectedAddress: AddressData | null;
  selectedMethod: PaymentMethod;
  isProcessing: boolean;
  specialInstructions: string;
  setSpecialInstructions: (val: string) => void;
  onPayNow: () => void;
}

export default function PaymentSummary({
  selectedAddress,
  selectedMethod,
  isProcessing,
  specialInstructions,
  setSpecialInstructions,
  onPayNow,
}: PaymentSummaryProps) {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const itemsTotal = cartItems.reduce((total, item) => total + item.total_price, 0);
  const packingTotal = cartItems.reduce(
    (total, item) => total + Number(item.packing_charge || 0) * (item.quantity || 1),
    0
  );

  const [deliveryInfo, setDeliveryInfo] = useState<{
    distance_km: number;
    delivery_fee: number;
    delivery_radius: number;
    is_within_radius: boolean;
    radius_message: string;
    is_store_open: boolean;
    is_cod_enabled?: boolean;
    per_km_charge: number;
    base_delivery_charge: number;
    is_free: boolean;
  } | null>(null);
  const [isCalculatingFee, setIsCalculatingFee] = useState(false);

  useEffect(() => {
    if (!selectedAddress) return;
    let isMounted = true;

    const fetchEstimate = async () => {
      try {
        setIsCalculatingFee(true);
        const params = new URLSearchParams();
        if (selectedAddress.id) params.append("address_id", String(selectedAddress.id));
        if (selectedAddress.latitude) params.append("latitude", String(selectedAddress.latitude));
        if (selectedAddress.longitude) params.append("longitude", String(selectedAddress.longitude));
        params.append("subtotal", String(itemsTotal));

        const res = await axiosInstance.get(`/orders/delivery-estimate?${params.toString()}`);
        if (isMounted && res.data?.status && res.data?.data) {
          setDeliveryInfo(res.data.data);
        }
      } catch (err) {
        console.warn("Delivery fee estimate error:", err);
      } finally {
        if (isMounted) setIsCalculatingFee(false);
      }
    };

    fetchEstimate();
    return () => {
      isMounted = false;
    };
  }, [selectedAddress, itemsTotal]);

  const deliveryFee =
    deliveryInfo !== null
      ? deliveryInfo.delivery_fee
      : cartItems.length > 0
      ? 30
      : 0;

  const totalPayable = itemsTotal + packingTotal + deliveryFee;

  const isOutOfRadius = Boolean(deliveryInfo && deliveryInfo.is_within_radius === false);
  const isStoreClosed = Boolean(deliveryInfo && deliveryInfo.is_store_open === false);

  const getButtonText = () => {
    if (isStoreClosed) return "Store Currently Closed";
    if (isOutOfRadius) return `Outside Delivery Radius (${deliveryInfo?.distance_km} KM)`;
    if (isProcessing) return "Processing Payment...";
    if (selectedMethod === "gpay") return `Pay ₹${totalPayable.toFixed(2)} with GPay`;
    if (selectedMethod === "phonepe") return `Pay ₹${totalPayable.toFixed(2)} with PhonePe`;
    if (selectedMethod === "cod" && deliveryInfo?.is_cod_enabled !== false) return `Place Order (Cash on Delivery)`;
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

      {/* Store Closed Warning */}
      {isStoreClosed && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs">
            <span>🔴</span>
            <span>Restaurant Currently Closed</span>
          </div>
          <p className="text-[11px] text-rose-700 leading-relaxed">
            Empire Plaza is closed for online orders right now. Ordering is paused until opening hours.
          </p>
        </div>
      )}

      {/* Radius Exceeded Warning */}
      {isOutOfRadius && (
        <div className="bg-red-50 border border-red-300 rounded-2xl p-4 text-red-800 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-xs text-red-700">
            <span className="text-sm">⛔</span>
            <span>Delivery Unavailable to this Address</span>
          </div>
          <p className="text-[11px] text-red-700 leading-snug">
            This address is <strong>{deliveryInfo?.distance_km} KM</strong> away, which exceeds our maximum delivery radius of <strong>{deliveryInfo?.delivery_radius} KM</strong>.
          </p>
          <p className="text-[10px] text-stone-500 font-medium">
            Please choose an address closer to Empire Plaza.
          </p>
        </div>
      )}

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

      {/* Special Cooking / Packing Instructions Note */}
      <div className="bg-white rounded-2xl p-4 border border-[#EADBCA] shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] flex items-center gap-1.5">
            <span>👨‍🍳</span> Cooking / Packing Note
          </span>
          <span className="text-[10px] text-stone-400 font-medium">Optional</span>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-1.5">
          {["Extra Mayo", "Skip Onion", "Less Spicy", "Extra Cutlery"].map((suggestion) => {
            const isSelected = specialInstructions.includes(suggestion);
            return (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    const updated = specialInstructions
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s && s !== suggestion)
                      .join(", ");
                    setSpecialInstructions(updated);
                  } else {
                    const updated = specialInstructions.trim()
                      ? `${specialInstructions.trim()}, ${suggestion}`
                      : suggestion;
                    setSpecialInstructions(updated.slice(0, 120));
                  }
                }}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0F3D2E] text-white border-[#0F3D2E] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {suggestion}
              </button>
            );
          })}
        </div>

        {/* Compact Text Input */}
        <div className="relative">
          <input
            type="text"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value.slice(0, 120))}
            placeholder="e.g. Extra mayo, skip onion..."
            className="w-full text-xs px-3 py-2 pr-14 rounded-xl border border-stone-200 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] text-slate-800 placeholder:text-stone-400 bg-stone-50/50"
            maxLength={120}
          />
          <span className="absolute right-2.5 top-2.5 text-[9px] text-stone-400 font-mono">
            {specialInstructions.length}/120
          </span>
        </div>
      </div>

      {/* Bill Details */}
      <div className="space-y-2.5 text-xs text-stone-600">
        <div className="flex justify-between">
          <span>Items Total</span>
          <span className="font-semibold text-slate-800">₹{itemsTotal.toFixed(2)}</span>
        </div>
        {packingTotal > 0 && (
          <div className="flex justify-between">
            <span>Packing Charges</span>
            <span className="font-semibold text-slate-800">₹{packingTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 font-medium">
              <span>Delivery Fee</span>
              {deliveryInfo && deliveryInfo.distance_km > 0 && (
                <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold flex items-center gap-0.5">
                  <Bike size={11} className="text-amber-600" />
                  <span>{deliveryInfo.distance_km} KM</span>
                </span>
              )}
            </span>
            {deliveryInfo && deliveryInfo.per_km_charge > 0 && (
              <span className="text-[10px] text-stone-400">
                Rate: ₹{deliveryInfo.per_km_charge}/KM
              </span>
            )}
          </div>
          <span className="font-semibold text-slate-800">
            {isCalculatingFee ? (
              <span className="text-gray-400 text-[11px] animate-pulse">Calculating...</span>
            ) : deliveryFee === 0 ? (
              <span className="text-emerald-700 font-bold">Free</span>
            ) : (
              `₹${deliveryFee.toFixed(2)}`
            )}
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
        disabled={
          isProcessing ||
          !selectedAddress ||
          cartItems.length === 0 ||
          isCalculatingFee ||
          isOutOfRadius ||
          isStoreClosed
        }
        onClick={onPayNow}
        className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
          !isProcessing && selectedAddress && cartItems.length > 0 && !isOutOfRadius && !isStoreClosed && !isCalculatingFee
            ? "bg-[#0F3D2E] hover:bg-[#185843] text-white shadow-[0_8px_24px_-4px_rgba(15,61,46,0.09)] cursor-pointer active:scale-98"
            : isOutOfRadius || isStoreClosed
            ? "bg-rose-100 text-rose-700 border border-rose-300 cursor-not-allowed"
            : "bg-[#CBD5E1] text-stone-500 cursor-not-allowed"
        }`}
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