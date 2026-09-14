"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { createOrderApi } from "../api/orderApi";

export const useOrderHook = () => {
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const createOrder = async (addressId: number) => {
    try {
      setIsCreatingOrder(true);

      const response = await createOrderApi({
        address_id: addressId,
      });

      toast.success(
        response?.message || "Order created successfully"
      );

      return response;
    } catch (error) {
      toast.error(extractErrorMessages(error));
      return null;
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return {
    createOrder,
    isCreatingOrder,
  };
};