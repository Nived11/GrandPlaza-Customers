"use client";

import React, { useEffect, useState } from "react";
import { X, MapPin, Phone, Receipt } from "lucide-react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { getOrderDetailApi } from "../api/profileApi";
import type { Order } from "../hooks/useProfileHook";
import { getStatusBadgeClass, formatStatusLabel } from "../utils/orderStatus";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-serif font-black text-[var(--brand-green-dark)]">
            Order #{orderId}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {loading || !order ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 rounded-lg bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Status badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusBadgeClass(
                    order.status
                  )}`}
                >
                  {formatStatusLabel(order.status)}
                </span>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusBadgeClass(
                    order.payment_status
                  )}`}
                >
                  Payment: {formatStatusLabel(order.payment_status)}
                </span>
              </div>
            </div>

            {/* 🌟 Live Order Progress Stepper */}
            {order.status !== "cancelled" && (
              <div className="bg-[#FAF5EB] rounded-2xl p-4 border border-[#EADBCA] flex flex-col gap-2 shadow-xs">
                <div className="flex items-center justify-between text-center relative px-2">
                  <div className="absolute top-3 left-6 right-6 h-0.5 bg-stone-200 z-0" />
                  {[
                    { key: "pending", label: "Placed" },
                    { key: "preparing", label: "Cooking" },
                    { key: "ready_for_pickup", label: "Ready" },
                    { key: "out_for_delivery", label: "On Way" },
                    { key: "delivered", label: "Delivered" },
                  ].map((s, idx) => {
                    const stepOrder = ["pending", "preparing", "ready_for_pickup", "out_for_delivery", "delivered"];
                    const curIdx = stepOrder.indexOf(order.status);
                    const isDone = idx < curIdx;
                    const isCurrent = idx === curIdx;

                    return (
                      <div key={s.key} className="flex flex-col items-center gap-1.5 relative z-10">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                            isDone
                              ? "bg-[#0F3D2E] text-white"
                              : isCurrent
                              ? "bg-[#D9A441] text-white ring-4 ring-[#D9A441]/25 animate-pulse"
                              : "bg-white border-2 border-stone-300 text-stone-400"
                          }`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <span
                          className={`text-[9px] font-extrabold uppercase tracking-wider ${
                            isCurrent
                              ? "text-[#0F3D2E]"
                              : isDone
                              ? "text-stone-700"
                              : "text-stone-400"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live Tracking Map (Active for all non-delivered & non-cancelled orders) */}
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <LiveOrderTrackingMap
                orderId={order.id}
                deliveryAddress={order.delivery_address}
                deliveryBoy={order.delivery_boy}
                orderStatus={order.status}
                onStatusUpdate={(newStatus) =>
                  setOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
                }
              />
            )}

            {/* Customer / delivery info */}
            <div className="flex flex-col gap-2 bg-[var(--brand-cream-soft)]/60 rounded-xl p-4">
              <p className="text-[13px] font-bold text-slate-800">
                {order.customer_name}
              </p>
              <div className="flex items-center gap-1.5 text-[12px] text-gray-600 font-medium">
                <Phone size={12} className="shrink-0" />
                {order.customer_phone}
              </div>
              <div className="flex items-start gap-1.5 text-[12px] text-gray-600 font-medium">
                <MapPin size={12} className="mt-0.5 shrink-0" />
                {order.delivery_address}
              </div>
              {order.special_instructions && (
                <p className="text-[11px] text-gray-500 font-medium italic mt-1">
                  “{order.special_instructions}”
                </p>
              )}
            </div>

            {/* Items */}
            <div>
              <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                <Receipt size={12} />
                Items
              </h4>
              <div className="flex flex-col">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[12px] sm:text-[13px] font-bold text-slate-800 truncate">
                        {item.quantity}× {item.item_name}
                        {item.variant_name ? ` (${item.variant_name})` : ""}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        ₹{item.unit_price} each
                      </p>
                    </div>
                    <span className="text-[12px] sm:text-[13px] font-black text-slate-800 shrink-0">
                      ₹{item.line_total}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-[12px] font-black text-gray-500 uppercase tracking-wider">
                Total
              </span>
              <span className="text-[18px] font-black text-[var(--brand-green-dark)]">
                ₹{order.total_price}
              </span>
            </div>

            <div className="text-[11px] text-gray-500 font-medium space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Order Placed:</span>
                <span className="font-semibold text-slate-700">
                  {new Date(order.created_at).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {order.packed_at ? (
                <div className="flex items-center justify-between border-t border-slate-200/50 pt-1">
                  <span className="text-gray-500">Food Packed:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-emerald-700">
                      {new Date(order.packed_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                    {order.packing_duration_mins != null && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        {order.packing_duration_mins}m prep
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-amber-600 font-semibold italic border-t border-slate-200/50 pt-1">
                  Kitchen is preparing your order...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
