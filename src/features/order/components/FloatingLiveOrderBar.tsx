"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Bike,
  PackageCheck,
  Clock,
  CheckCircle2,
  ChevronRight,
  Compass,
  X,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { getPusherClient } from "@/lib/pusherClient";
import OrderDetailModal from "@/features/profile/components/OrderDetailModal";

interface ActiveOrder {
  id: number;
  status: "pending" | "preparing" | "ready_for_pickup" | "out_for_delivery" | "delivered" | "cancelled";
  total_price: number | string;
  items_count?: number;
  created_at?: string;
  delivery_boy?: {
    name?: string;
    phone_number?: string;
  } | null;
}

const ACTIVE_STATUSES = ["pending", "preparing", "ready_for_pickup", "out_for_delivery"];

export default function FloatingLiveOrderBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch latest active order
  const fetchActiveOrder = useCallback(async () => {
    try {
      // Skip if unauthenticated
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) {
        setActiveOrder(null);
        return;
      }

      const res = await axiosInstance.get("/orders/my-orders?page_size=5");
      const list: ActiveOrder[] = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.results)
        ? res.data.results
        : [];

      // Find most recent active order
      const found = list.find((o) => ACTIVE_STATUSES.includes(o.status));
      if (found) {
        setActiveOrder(found);
      } else {
        // If an order just transitioned to delivered, show for a brief moment then clear
        setActiveOrder((prev) => {
          if (prev && ACTIVE_STATUSES.includes(prev.status)) {
            const delivered = list.find((o) => o.id === prev.id && o.status === "delivered");
            if (delivered) return delivered;
          }
          return null;
        });
      }
    } catch (err) {
      // Silently handle error (e.g. 401 unauthenticated)
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchActiveOrder();

    // Check periodically every 12 seconds
    pollIntervalRef.current = setInterval(fetchActiveOrder, 12000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [fetchActiveOrder]);

  // 2. Pusher real-time updates for active order
  useEffect(() => {
    if (!mounted) return;

    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe("orders-channel");

    const handleStatusUpdate = (data: { order_id?: number; id?: number; status: string }) => {
      const updatedId = Number(data.order_id || data.id);
      if (activeOrder && activeOrder.id === updatedId) {
        setActiveOrder((prev) => (prev ? { ...prev, status: data.status as any } : null));
        fetchActiveOrder();
      } else if (!activeOrder) {
        fetchActiveOrder();
      }
    };

    const handleNewOrder = () => {
      fetchActiveOrder();
    };

    channel.bind("order-status-updated", handleStatusUpdate);
    channel.bind("new-order", handleNewOrder);

    return () => {
      channel.unbind("order-status-updated", handleStatusUpdate);
      channel.unbind("new-order", handleNewOrder);
    };
  }, [mounted, activeOrder, fetchActiveOrder]);

  // 3. Notify sibling components (like FloatingCartBar) of active order presence
  useEffect(() => {
    const isVisible = Boolean(activeOrder && !isDismissed && ACTIVE_STATUSES.includes(activeOrder.status));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("has-active-order", { detail: isVisible }));
    }
  }, [activeOrder, isDismissed]);

  if (!mounted || !activeOrder || isDismissed) return null;

  // Don't show if on the orders tab of profile page (since user is already looking at it!)
  if (pathname === "/profile" && typeof window !== "undefined" && window.location.search.includes("tab=orders")) {
    return null;
  }

  // Auto-hide delivered order after 8 seconds
  if (activeOrder.status === "delivered") {
    setTimeout(() => {
      setActiveOrder(null);
    }, 8000);
  }

  // Status configuration details
  const getStatusConfig = () => {
    switch (activeOrder.status) {
      case "preparing":
        return {
          title: `Order #${activeOrder.id} • Preparing`,
          desc: "Chef is cooking your fresh meal in Kitchen",
          icon: <Utensils size={18} className="text-amber-300 animate-pulse" />,
          dotColor: "bg-amber-400",
          badgeColor: "bg-amber-500/20 border-amber-400/40 text-amber-300",
          actionText: "Track Live",
        };
      case "ready_for_pickup":
        return {
          title: `Order #${activeOrder.id} • Packed & Ready`,
          desc: "Food packed • Waiting for delivery partner pickup",
          icon: <PackageCheck size={18} className="text-emerald-300 animate-bounce" />,
          dotColor: "bg-emerald-400",
          badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
          actionText: "Track Live",
        };
      case "out_for_delivery":
        return {
          title: `Order #${activeOrder.id} • On the Way`,
          desc: "Delivery partner is riding to your address",
          icon: <Bike size={18} className="text-emerald-300 animate-pulse" />,
          dotColor: "bg-emerald-400",
          badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
          actionText: "Live Map",
        };
      case "delivered":
        return {
          title: `Order #${activeOrder.id} • Delivered! 🎉`,
          desc: "Order completed. Enjoy your delicious food!",
          icon: <CheckCircle2 size={18} className="text-emerald-400" />,
          dotColor: "bg-emerald-400",
          badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
          actionText: "View Receipt",
        };
      default:
        return {
          title: `Order #${activeOrder.id} • Received`,
          desc: "Order confirmed • Sending details to kitchen",
          icon: <Clock size={18} className="text-amber-300" />,
          dotColor: "bg-amber-400",
          badgeColor: "bg-amber-500/20 border-amber-400/40 text-amber-300",
          actionText: "Track Live",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="fixed bottom-[74px] left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 select-none"
        >
          {/* Main Floating Card */}
          <div
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[var(--brand-green-dark,#0F3D2E)] text-white border-2 border-[var(--brand-gold,#D4AF37)] shadow-[0_12px_36px_rgba(15,61,46,0.55)] cursor-pointer hover:shadow-[0_16px_40px_rgba(15,61,46,0.65)] hover:border-amber-300 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle Royal Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-[#0F3D2E] to-emerald-900/40 opacity-90 pointer-events-none" />

            {/* Left Column: Icon Badge + Text */}
            <div className="relative z-10 flex items-center gap-3 min-w-0 pr-2">
              {/* Status Animated Icon Circle */}
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner ${statusConfig.badgeColor}`}
              >
                {statusConfig.icon}
              </div>

              {/* Status Text & Subtitle */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs sm:text-sm tracking-wide text-white truncate">
                    {statusConfig.title}
                  </span>
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.dotColor}`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.dotColor}`}
                    />
                  </span>
                </div>
                <p className="text-[11px] text-[#FAF5EB]/80 font-medium truncate mt-0.5">
                  {statusConfig.desc}
                </p>
              </div>
            </div>

            {/* Right Column: Track Button + Dismiss */}
            <div className="relative z-10 flex items-center gap-1.5 shrink-0">
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--brand-gold,#D4AF37)] group-hover:bg-[#E5BE4A] text-[#0F3D2E] text-xs font-black shadow-md tracking-wider transition-all transform group-hover:translate-x-0.5">
                <Compass size={13} className="text-[#0F3D2E]" />
                <span className="hidden xs:inline">{statusConfig.actionText}</span>
                <ChevronRight size={14} className="stroke-[3]" />
              </span>

              {/* Small dismiss button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDismissed(true);
                }}
                title="Minimize banner"
                className="w-6 h-6 rounded-full hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Full-screen / Bottom-sheet Live Tracking Modal */}
      {isModalOpen && (
        <OrderDetailModal
          orderId={activeOrder.id}
          onClose={() => {
            setIsModalOpen(false);
            fetchActiveOrder();
          }}
        />
      )}
    </>
  );
}
