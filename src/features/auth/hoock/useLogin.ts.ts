"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { loginApi } from "../api/authApi";

interface LoginResponse {
  message: string;
  otp_development_only?: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (
    phoneNumber: string
  ): Promise<LoginResponse | null> => {
    try {
      setIsLoading(true);

      const response = await loginApi(phoneNumber);

      const data = response;

      /*
       * Development OTP
       * Remove this when backend no longer returns
       * otp_development_only.
       */
      if (data?.otp_development_only) {
        toast.success(
          `Development OTP: ${data.otp_development_only}`,
          {
            duration: 5000,
          }
        );
      }

      return data;
    } catch (error) {
      const messages = extractErrorMessages(error);

      messages.forEach((message) => {
        toast.error(message);
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};

export default useLogin;