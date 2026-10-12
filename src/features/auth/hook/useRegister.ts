"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { registerApi } from "../api/authApi";
import { sendFirebaseOtp } from "@/lib/firebaseAuth";

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

      // Send 100% Free Real SMS OTP via Google Firebase
      try {
        await sendFirebaseOtp(data.phone_number);
        toast.success("SMS OTP sent to your phone via Google Firebase!", {
          duration: 4000,
        });
      } catch (fbError: any) {
        console.warn("Firebase Phone Auth registration error:", fbError);
      }

      if (result?.otp_development_only) {
        toast.info(
          `Backup OTP: ${result.otp_development_only}`,
          { duration: 6000 }
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