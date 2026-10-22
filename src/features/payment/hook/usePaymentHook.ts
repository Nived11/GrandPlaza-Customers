"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { clearCart } from "@/redux/slices/cartSlice";
import { useOrderHook } from "@/features/order/hook/useOrderHook";
import type { OrderData } from "@/features/order/components/OrderSuccessModal";
import type { AppDispatch } from "@/redux/store";

export type PaymentMethod = "gpay" | "phonepe" | "paytm" | "upi_qr" | "card" | "netbanking" | "cod";

/**
 * Dynamically loads Razorpay checkout script if not already on window
 */
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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
    // -------------------------------------------------------------
    // 💵 1. CASH ON DELIVERY (COD) FLOW
    // -------------------------------------------------------------
    if (selectedMethod === "cod") {
      try {
        setIsProcessing(true);
        const response = await createOrder(addressId, specialInstructions, "cod");
        if (response?.status && response?.data) {
          dispatch(clearCart());
          setCreatedOrder(response.data);
          setIsSuccessModalOpen(true);
          return true;
        }
        return false;
      } catch (error) {
        console.error("COD checkout error:", error);
        return false;
      } finally {
        setIsProcessing(false);
      }
    }

    // -------------------------------------------------------------
    // 💳 2. RAZORPAY STANDARD WEB CHECKOUT FLOW
    // -------------------------------------------------------------
    try {
      setIsProcessing(true);

      // Ensure Razorpay SDK script is ready
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Unable to load Razorpay checkout SDK. Please check your internet connection.");
        setIsProcessing(false);
        return false;
      }

      // Step 1: Create Order on Backend
      const createOrderRes = await axiosInstance.post("/orders/create-order", {
        address_id: addressId,
        special_instructions: specialInstructions,
        currency: "INR",
      });

      if (!createOrderRes.data?.status || !createOrderRes.data?.order_id) {
        toast.error(createOrderRes.data?.error || "Failed to initialize payment gateway.");
        setIsProcessing(false);
        return false;
      }

      const { order_id, amount, currency, key_id } = createOrderRes.data;
      const razorpayKey = key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      // Extract user details for prefill if available in localStorage
      let prefillUser = { name: "", contact: "", email: "" };
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("user");
          if (raw) {
            const u = JSON.parse(raw);
            prefillUser = {
              name: u.full_name || u.name || "",
              contact: u.phone_number || u.phone || "",
              email: u.email || "",
            };
          }
        } catch (e) {}
      }

      // Step 2: Initialize Razorpay Checkout Modal
      const options: any = {
        key: razorpayKey,
        amount: amount,
        currency: currency || "INR",
        name: "Empire Plaza",
        description: "Food Delivery Order",
        order_id: order_id,
        prefill: {
          name: prefillUser.name,
          contact: prefillUser.contact,
          email: prefillUser.email,
        },
        theme: {
          color: "#0F3D2E",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled. You can retry whenever you are ready.");
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // Step 3: Verify Payment Signature on Backend
          try {
            setIsProcessing(true);
            const verifyToastId = toast.loading("Verifying payment and securing your order...");

            const verifyRes = await axiosInstance.post("/orders/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address_id: addressId,
              special_instructions: specialInstructions,
            });

            toast.dismiss(verifyToastId);

            if (verifyRes.data?.status && verifyRes.data?.data?.order) {
              dispatch(clearCart());
              setCreatedOrder(verifyRes.data.data.order);
              setIsSuccessModalOpen(true);
              toast.success("Payment verified! Your order has been placed.");
            } else {
              toast.error(verifyRes.data?.error || verifyRes.data?.message || "Payment verification failed.");
            }
          } catch (verifyErr: any) {
            console.error("Payment verification failure:", verifyErr);
            const msg =
              verifyErr.response?.data?.error ||
              verifyErr.response?.data?.message ||
              "Payment verification failed. Please contact support.";
            toast.error(msg);
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);

      // Handle payment failure event
      razorpayInstance.on("payment.failed", (failedRes: any) => {
        setIsProcessing(false);
        console.error("Razorpay Payment Failed:", failedRes.error);
        toast.error(
          failedRes.error?.description || "Payment failed. Please choose another payment method or retry."
        );
      });

      razorpayInstance.open();
      return true;
    } catch (error: any) {
      console.error("Razorpay checkout initialization error:", error);
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An unexpected error occurred while launching payment.";
      toast.error(errMsg);
      setIsProcessing(false);
      return false;
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