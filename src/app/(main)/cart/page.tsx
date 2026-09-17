"use client";

import  CartMain  from "@/features/cart/CartMain";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function CartPage() {
 const { isAuthorized } = useAuthGuard({
    requireAuth: true,
  });
  
  if (!isAuthorized) {
    return null;
  }

  return <CartMain />;
}