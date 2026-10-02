"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { useOrderHook } from "@/features/order/hook/useOrderHook";
import type { OrderData } from "@/features/order/components/OrderSuccessModal";
import type { AppDispatch } from "@/redux/store";

export type PaymentMethod = "gpay" | "phonepe" | "paytm" | "upi_qr" | "card" | "netbanking" | "cod";

export const usePaymentHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { createOrder, isCreatingOrder } = useOrderHook();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("gpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<OrderData | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const processPayment = async (addressId: number) => {
    try {
      setIsProcessing(true);

      // 💳 FRONTEND SIMULATION (Razorpay API / Key വരുന്നതുവരെ):
      // GPay / PhonePe / Cards ആണെങ്കിൽ 1.2 സെക്കന്റ് പ്രോസസ്സിംഗ് കാണിച്ച് ഓർഡർ ഇടുന്നു.
      if (selectedMethod !== "cod") {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      // നിലവിലുള്ള Backend Order Checkout API കാൾ ചെയ്യുന്നു
      const response = await createOrder(addressId);

      if (response?.status && response?.data) {
        dispatch(clearCart());
        setCreatedOrder(response.data);
        setIsSuccessModalOpen(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Payment processing error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    selectedMethod,
    setSelectedMethod,
    isProcessing: isProcessing || isCreatingOrder,
    createdOrder,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    processPayment,
  };
};