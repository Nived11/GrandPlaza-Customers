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

      // Send Real SMS OTP to mobile number
      try {
        await sendFirebaseOtp(data.phone_number);
        toast.success("OTP sent successfully to your mobile number!", {
          duration: 4000,
        });
      } catch (fbError: any) {
        console.error("Firebase Phone Auth registration error:", fbError);
        const fbCode = fbError?.code || "";
        const fbMsg = fbError?.message || "";
        if (fbCode === "auth/unauthorized-domain") {
          toast.error("Firebase error: Server IP (187.127.167.18) must be added to Authorised Domains!");
        } else {
          toast.error(`Firebase error: ${fbCode ? fbCode.replace("auth/", "") : fbMsg}`);
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