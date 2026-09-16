"use client";

import React, { useState } from "react";
import { Package, ChevronRight } from "lucide-react";
import type { Order } from "../hooks/useProfileHook";
import { getStatusBadgeClass, formatStatusLabel } from "../utils/orderStatus";
import OrderDetailModal from "./OrderDetailModal";
import OrdersSkeleton from "./OrdersSkeleton";

interface OrdersSectionProps {
  orders: Order[];
  loading: boolean;
}

export default function OrdersSection({ orders, loading }: OrdersSectionProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  if (loading) {
    return <OrdersSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-[0_15px_50px_rgba(0,0,0,0.05)] p-10 sm:p-16 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[var(--brand-cream-soft)] flex items-center justify-center mb-4">
          <Package size={22} className="text-[var(--brand-gold)]" />
        </div>
        <h3 className="text-lg font-serif font-black text-[var(--brand-green-dark)] mb-1.5">
          No orders yet
        </h3>
        <p className="text-[12px] text-gray-500 font-medium">
          Your order history will show up here once you place your first order.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const itemsPreview = order.items.map((item) => item.item_name).join(", ");

          return (
            <button
              key={order.id}
              type="button"
              onClick={() => setSelectedOrderId(order.id)}
              className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:shadow-lg transition-all p-5 sm:p-6 flex items-center justify-between gap-4 w-full text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[var(--brand-cream-soft)] flex items-center justify-center shrink-0">
                  <Package size={18} className="text-[var(--brand-green-dark)]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-[13px] sm:text-[14px] font-black text-slate-900 truncate">
                      Order #{order.id}
                    </h3>
                    <span
                      className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {formatStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    {itemsPreview ? ` · ${itemsPreview}` : ""} ·{" "}
                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[14px] sm:text-[16px] font-black text-[var(--brand-green-dark)]">
                  ₹{order.total_price}
                </span>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </button>
          );
        })}
      </div>

      <OrderDetailModal
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </>
  );
}
