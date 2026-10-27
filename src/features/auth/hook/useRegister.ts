"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { registerApi } from "../api/authApi";
import { sendFirebaseOtp } from "@/lib/firebaseAuth";

interface RegisterData {
  phone_number: string;
  full_name: string;
  email?: string;
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

      // Send Real SMS OTP to mobile number
      try {
        await sendFirebaseOtp(data.phone_number);
        toast.success("OTP sent successfully to your mobile number!", {
          duration: 4000,
        });
      } catch (fbError: any) {
        console.error("SMS dispatch error:", fbError);
        const fbCode = fbError?.code || "";
        if (fbCode === "auth/too-many-requests") {
          toast.error("Too many requests for this number. Please wait a few minutes before trying again.");
        } else if (fbCode === "auth/invalid-phone-number") {
          toast.error("Invalid phone number format.");
        } else {
          toast.error("Unable to send verification SMS right now. Please try again.");
        }
      }


      if (result?.message) {
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