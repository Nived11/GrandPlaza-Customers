"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { registerApi } from "../api/authApi";

interface RegisterData {
  phone_number: string;
  full_name: string;
  email: string;
}

interface RegisterResponse {
  message: string;
  [key: string]: any;
}

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (
    data: RegisterData
  ): Promise<RegisterResponse | null> => {
    try {
      setIsLoading(true);

      const response = await registerApi(data);

      const result = response;

    if (result?.otp_development_only) {
      toast.success(
        `Development OTP: ${result.otp_development_only}`,
        { duration: 5000 }
      );
    } else if (result?.message) {
      toast.success(result.message);
    }
      return result;
    } catch (error) {
      const message = extractErrorMessages(error);

      toast.error(message);

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};

export default useRegister;