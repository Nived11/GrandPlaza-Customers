"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Phone,
  Receipt,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Utensils,
  Bike,
  PackageCheck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { getOrderDetailApi } from "../api/profileApi";
import type { Order } from "../hooks/useProfileHook";
import LiveOrderTrackingMap from "../../order/components/LiveOrderTrackingMap";

interface OrderDetailModalProps {
  orderId: number | null;
  onClose: () => void;
}

export default function OrderDetailModal({
  orderId,
  onClose,
}: OrderDetailModalProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId == null) {
      setOrder(null);
      return;
    }

    let isCurrent = true;
    setLoading(true);
    setOrder(null);

    getOrderDetailApi(orderId)
      .then((data: Order) => {
        if (isCurrent) setOrder(data);
      })
      .catch((err) => {
        if (isCurrent) toast.error(extractErrorMessages(err));
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [orderId]);

  if (orderId == null) return null;

  // Timeline Step Helper
  const getStepIndex = (status: string) => {
    switch (status) {
      case "pending":
        return 0;
      case "preparing":
        return 1;
      case "ready_for_pickup":
        return 2;
      case "out_for_delivery":
        return 3;
      case "delivered":
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  const TIMELINE_STEPS = [
    {
      title: "Order Placed",
      desc: "Order received by Empire Plaza kitchen",
      time: order?.created_at
        ? new Date(order.created_at).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
          })
        : null,
      icon: Clock,
    },
    {
      title: "Cooking in Kitchen",
      desc: "Chef is preparing your fresh royal delicacies",
      time: null,
      icon: Utensils,
    },
    {
      title: "Food Packed & Ready",
      desc: order?.packing_duration_mins
        ? `Sealed in tamper-proof bags (${order.packing_duration_mins}m prep)`
        : "Packed and sealed for pickup",
      time: order?.packed_at
        ? new Date(order.packed_at).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
          })
        : null,
      icon: PackageCheck,
    },
    {
      title: "Out for Delivery",
      desc: order?.delivery_boy?.name
        ? `${order.delivery_boy.name} is on the way to your doorstep`
        : "Delivery partner heading with your hot meal",
      time: null,
      icon: Bike,
    },
    {
      title: "Delivered",
      desc: "Food delivered. Enjoy your royal meal!",
      time: null,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col justify-end sm:justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background Dim Dismissal */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container: Native app full-height sheet on mobile, rounded card on desktop */}
      <div className="relative w-full h-[96dvh] sm:h-auto sm:max-h-[92vh] sm:max-w-2xl bg-[#FBF6EC] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 z-10 border border-[#EADBCA]">
        {/* ==========================================================
            1. TOP APP BAR
            ========================================================== */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EADBCA] flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FAF5EB] hover:bg-[#EADBCA]/60 text-[#0F3D2E] flex items-center justify-center transition-transform active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Playfair_Display'] text-lg sm:text-xl font-bold text-[#0F3D2E]">
                  Order #{orderId}
                </h3>
              </div>
              <p className="text-[11px] font-bold text-[#D9A441] tracking-wider uppercase">
                Empire Plaza Dining
              </p>
            </div>
          </div>

          {order && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#0F3D2E] text-[#D9A441] border border-[#D9A441]/30 shadow-xs">
                {order.status.replace(/_/g, " ")}
              </span>
            </div>
          )}
        </div>

        {/* ==========================================================
            2. SCROLLABLE CONTENT BODY
            ========================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {loading || !order ? (
            <div className="space-y-4">
              <div className="h-64 rounded-3xl bg-stone-200/60 animate-pulse" />
              <div className="h-40 rounded-2xl bg-stone-200/60 animate-pulse" />
              <div className="h-40 rounded-2xl bg-stone-200/60 animate-pulse" />
            </div>
          ) : (
            <>
              {/* ==========================================================
                  HERO LIVE TRACKING MAP (Active for all non-completed orders)
                  ========================================================== */}
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <section>
                  <LiveOrderTrackingMap
                    orderId={order.id}
                    deliveryAddress={order.delivery_address}
                    deliveryLat={order.delivery_latitude}
                    deliveryLng={order.delivery_longitude}
                    deliveryBoy={order.delivery_boy}
                    orderStatus={order.status}
                    onStatusUpdate={(newStatus) =>
                      setOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
                    }
                  />
                </section>
              )}

              {/* ==========================================================
                  VERTICAL LIVE ORDER TIMELINE (Top Food Delivery App Standard!)
                  ========================================================== */}
              {order.status !== "cancelled" && (
                <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCA] shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#FAF5EB]">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D9A441] block">
                        Live Tracking
                      </span>
                      <h4 className="font-['Playfair_Display'] text-base font-bold text-[#0F3D2E]">
                        Order Journey
                      </h4>
                    </div>

                    <span className="text-xs font-bold text-stone-500 bg-[#FAF5EB] px-3 py-1 rounded-full border border-[#EADBCA]">
                      {order.status === "delivered" ? "Delivered" : "In Progress"}
                    </span>
                  </div>

                  {/* Vertical Timeline Stepper */}
                  <div className="relative pl-2 sm:pl-4 space-y-6">
                    {/* Connecting Vertical Track Line */}
                    <div className="absolute left-[19px] sm:left-[27px] top-3 bottom-3 w-0.5 bg-stone-200" />

                    {TIMELINE_STEPS.map((step, idx) => {
                      const isPast = idx < currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      const IconComponent = step.icon;

                      return (
                        <div key={step.title} className="relative flex items-start gap-4">
                          {/* Step Icon Node */}
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                              isPast
                                ? "bg-[#0F3D2E] text-[#D9A441] shadow-sm"
                                : isCurrent
                                ? "bg-[#D9A441] text-white ring-4 ring-[#D9A441]/30 shadow-md animate-pulse"
                                : "bg-white border-2 border-stone-200 text-stone-300"
                            }`}
                          >
                            <IconComponent size={18} />
                          </div>

                          {/* Step Description */}
                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="flex items-center justify-between gap-2">
                              <h5
                                className={`text-sm font-extrabold ${
                                  isCurrent
                                    ? "text-[#0F3D2E]"
                                    : isPast
                                    ? "text-stone-800"
                                    : "text-stone-400"
                                }`}
                              >
                                {step.title}
                              </h5>
                              {step.time && (
                                <span className="text-[11px] font-bold text-stone-500">
                                  {step.time}
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-xs mt-0.5 leading-relaxed ${
                                isCurrent
                                  ? "text-stone-700 font-semibold"
                                  : isPast
                                  ? "text-stone-500"
                                  : "text-stone-400"
                              }`}
                            >
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ==========================================================
                  ITEMS ORDERED LIST (Modern Food App Layout)
                  ========================================================== */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCA] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Receipt size={16} className="text-[#0F3D2E]" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0F3D2E]">
                      Items Ordered ({order.items.length})
                    </h4>
                  </div>
                </div>

                <div className="divide-y divide-stone-100">
                  {order.items.map((item) => {
                    const isVeg =
                      item.item_name.toLowerCase().includes("veg") &&
                      !item.item_name.toLowerCase().includes("non");

                    return (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Veg / Non-Veg Indicator */}
                          <div
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 ${
                              isVeg
                                ? "border-emerald-600 bg-emerald-50"
                                : "border-red-600 bg-red-50"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isVeg ? "bg-emerald-600" : "bg-red-600"
                              }`}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-stone-800 break-words">
                              {item.item_name}
                            </p>
                            {item.variant_name && (
                              <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                                {item.variant_name}
                              </span>
                            )}
                            <p className="text-[11px] text-stone-400 font-medium pt-0.5">
                              ₹{item.unit_price} each
                            </p>
                          </div>
                        </div>

                        {/* Quantity Pill & Price */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-extrabold text-[#0F3D2E] bg-[#FAF5EB] border border-[#EADBCA] px-2 py-0.5 rounded-md">
                            {item.quantity}×
                          </span>
                          <span className="text-xs sm:text-sm font-black text-stone-900 min-w-[65px] text-right">
                            ₹{item.line_total}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Special Instructions */}
                {order.special_instructions && (
                  <div className="p-3 bg-[#FAF5EB] rounded-2xl border border-[#EADBCA] text-xs text-stone-600 italic">
                    <span className="font-bold text-[#0F3D2E] not-italic block mb-0.5">
                      Cooking Request:
                    </span>
                    “{order.special_instructions}”
                  </div>
                )}
              </section>

              {/* ==========================================================
                  BILL & PAYMENT SUMMARY
                  ========================================================== */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCA] shadow-sm space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0F3D2E] pb-2 border-b border-stone-100">
                  Bill Summary
                </h4>

                <div className="space-y-2 text-xs sm:text-sm font-medium text-stone-600">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="font-bold text-stone-800">
                      ₹
                      {order.items
                        .reduce((acc, curr) => acc + Number(curr.line_total), 0)
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-stone-800">
                      {order.delivery_fee && Number(order.delivery_fee) > 0 ? (
                        `₹${order.delivery_fee}`
                      ) : (
                        <span className="text-emerald-600 font-bold uppercase tracking-wider">
                          Free
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-100 text-sm sm:text-base font-black text-[#0F3D2E]">
                    <span>Grand Total</span>
                    <span>₹{order.total_price}</span>
                  </div>
                </div>

                {/* Payment Status Pill */}
                <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100">
                  <span className="text-stone-500 font-bold">Payment Method</span>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    {order.payment_status.toUpperCase()}
                  </span>
                </div>
              </section>

              {/* ==========================================================
                  DELIVERY ADDRESS CARD
                  ========================================================== */}
              <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCA] shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0F3D2E] text-[#D9A441] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MapPin size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#D9A441] block">
                    Delivering To
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">
                    {order.customer_name} • +91 {order.customer_phone}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1 break-words">
                    {order.delivery_address}
                  </p>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
