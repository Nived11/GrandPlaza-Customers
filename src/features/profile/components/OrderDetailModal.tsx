"use client";

import React, { useEffect, useState } from "react";
import { X, MapPin, Phone, Receipt } from "lucide-react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { getOrderDetailApi } from "../api/profileApi";
import type { Order } from "../hooks/useProfileHook";
import { getStatusBadgeClass, formatStatusLabel } from "../utils/orderStatus";

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
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusBadgeClass(
                  order.status
                )}`}
              >
                {formatStatusLabel(order.status)}
              </span>
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusBadgeClass(
                  order.payment_status
                )}`}
              >
                Payment: {formatStatusLabel(order.payment_status)}
              </span>
            </div>

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

            <p className="text-[10px] text-gray-400 font-medium">
              Placed on{" "}
              {new Date(order.created_at).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
