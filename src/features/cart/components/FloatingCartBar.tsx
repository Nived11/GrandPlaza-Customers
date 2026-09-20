"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState } from "@/redux/store";

export default function FloatingCartBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const shouldShow = totalItems > 0 && pathname !== "/cart";

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="fixed bottom-[76px] right-4 z-40 md:hidden"
        >
          <Link
            href="/cart"
            aria-label="View Cart"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0F3D2E] text-white border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(15,61,46,0.45)] active:scale-90 transition-transform"
          >
            {/* 🛍️ Centered Gold Shopping Bag Icon */}
            <ShoppingBag size={24} className="text-[#D4AF37]" strokeWidth={2.2} />

            {/* 🏷️ Item Count Badge (Top-Right) */}
            <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#D4AF37] text-[#0F3D2E] text-[11px] font-black rounded-full flex items-center justify-center shadow-md border-2 border-[#0F3D2E]">
              {totalItems}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}