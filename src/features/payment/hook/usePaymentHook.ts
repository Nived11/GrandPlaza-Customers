"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios";
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
  const [isCodEnabled, setIsCodEnabled] = useState<boolean>(false);

  // Fetch site setting for Cash on Delivery (COD)
  useEffect(() => {
    let isMounted = true;
    const fetchCodStatus = async () => {
      try {
        const res = await axiosInstance.get("/settings/site-settings");
        if (isMounted && res.data) {
          const codActive = Boolean(
            res.data.is_cod_enabled ?? res.data.isCodEnabled ?? res.data.data?.is_cod_enabled
          );
          setIsCodEnabled(codActive);
          if (!codActive && selectedMethod === "cod") {
            setSelectedMethod("gpay");
          }
        }
      } catch (err) {
        console.warn("Failed to check COD status:", err);
      }
    };

    fetchCodStatus();
    return () => {
      isMounted = false;
    };
  }, [selectedMethod]);

  const processPayment = async (addressId: number, specialInstructions: string = "") => {
    try {
      setIsProcessing(true);

      // 💳 FRONTEND SIMULATION (Razorpay API / UPI Simulation):
      // GPay / PhonePe / Cards simulate payment processing
      if (selectedMethod !== "cod") {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      // Backend Order Checkout API with selected payment method
      const response = await createOrder(addressId, specialInstructions, selectedMethod);

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
    isCodEnabled,
    setIsCodEnabled,
    isProcessing: isProcessing || isCreatingOrder,
    createdOrder,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    processPayment,
  };
};