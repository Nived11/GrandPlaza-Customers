"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { loginApi } from "../api/authApi";
import { sendFirebaseOtp } from "@/lib/firebaseAuth";

interface LoginResponse {
  message: string;
  otp_development_only?: string;
}

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (
    phoneNumber: string
  ): Promise<LoginResponse | null> => {
    try {
      setIsLoading(true);

      // 1. Verify user exists in backend database
      const response = await loginApi(phoneNumber);
      const data = response;

      // 2. Send Real SMS OTP to mobile number
      try {
        await sendFirebaseOtp(phoneNumber);
        toast.success("OTP sent successfully to your mobile number!", {
          duration: 4000,
        });
      } catch (fbError: any) {
        console.error("SMS dispatch error:", fbError);
        const fbCode = fbError?.code || "";

        if (fbCode === "auth/too-many-requests") {
          toast.error("Too many requests for this number. Please wait a few minutes before trying again.");
          return null;
        } else if (fbCode === "auth/invalid-phone-number") {
          toast.error("Invalid phone number format.");
          return null;
        } else {
          toast.error("Unable to send verification SMS right now. Please try again.");
          return null;
        }
      }


      return data;


    } catch (error: any) {
      if (error?.response?.status === 404) {
        sessionStorage.setItem(
          "register_phone",
          phoneNumber
        );

        toast.error(
          "No account found with this phone number. Please Sign Up first.",
          {
            duration: 3000,
          }
        );

        setTimeout(() => {
          router.push("/signup");
        }, 3000);

        return null;
      }

      const message = extractErrorMessages(error);

      toast.error(message);

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