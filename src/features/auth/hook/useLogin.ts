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
        console.error("Firebase Phone Auth error:", fbError);
        const fbCode = fbError?.code || "";
        const fbMsg = fbError?.message || "";

        if (fbCode === "auth/unauthorized-domain") {
          toast.error("Firebase error: Server IP (187.127.167.18) must be added to Authorised Domains in Firebase Console!");
          return null;
        } else if (fbCode === "auth/too-many-requests") {
          toast.error("Google: Too many attempts for this number. Please wait a few minutes or add as test number.");
          return null;
        } else if (fbCode === "auth/invalid-phone-number") {
          toast.error("Invalid phone number format.");
          return null;
        } else {
          toast.error(`Firebase error: ${fbCode ? fbCode.replace("auth/", "") : fbMsg || "Failed to send SMS"}`);
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