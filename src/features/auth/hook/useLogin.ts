"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { loginApi } from "../api/authApi";

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