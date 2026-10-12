"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { VerifyOTPApi, firebaseVerifyApi } from "../api/authApi";
import { confirmFirebaseOtp } from "@/lib/firebaseAuth";

const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveAuthSession = (data: any) => {
    localStorage.setItem("isLoggedIn", "true");

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth-state-changed")
      );
    }

    if (data.access_token) {
      localStorage.setItem(
        "access_token",
        data.access_token
      );
    }

    if (data.refresh_token) {
      localStorage.setItem(
        "refresh_token",
        data.refresh_token
      );
    }

    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
    }
  };

  const verifyOtp = async (
    phoneNumber: string,
    otp: string
  ) => {
    try {
      setIsLoading(true);

      let data = null;

      // 1. Try Firebase confirmation first if active
      if (typeof window !== "undefined" && window.firebaseConfirmationResult) {
        try {
          const fbResult = await confirmFirebaseOtp(otp);
          data = await firebaseVerifyApi({
            id_token: fbResult.idToken,
            phone_number: phoneNumber,
          });
        } catch (fbErr: any) {
          console.warn("Firebase confirmation notice, falling back to standard verify:", fbErr);
        }
      }

      // 2. If Firebase wasn't active or verification didn't complete, check standard database OTP
      if (!data || data?.status !== true) {
        data = await VerifyOTPApi({
          phone_number: phoneNumber,
          otp,
        });
      }

      console.log("VERIFY OTP RESPONSE:", data);

      if (data?.status === true) {
        saveAuthSession(data);

        toast.success(
          data.message || "OTP verified successfully",
          {
            duration: 5000,
          }
        );

        return data;
      }

      toast.error(
        data?.message || "OTP verification failed",
        {
          duration: 5000,
        }
      );

      return null;
    } catch (error: any) {
      console.error(
        "VERIFY OTP API ERROR:",
        error
      );

      const errorData = error?.response?.data;

      if (
        errorData &&
        typeof errorData === "object"
      ) {
        Object.values(errorData).forEach(
          (messages: any) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) => {
                toast.error(String(message), {
                  duration: 5000,
                });
              });
            } else if (
              typeof messages === "string"
            ) {
              toast.error(messages, {
                duration: 5000,
              });
            }
          }
        );
      } else {
        const message = extractErrorMessages(error);

        if (message) {
          toast.error(message, {
            duration: 5000,
          });
        } else {
          toast.error(
            "Invalid or expired OTP. Please try again.",
            {
              duration: 5000,
            }
          );
        }
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verifyOtp,
    isLoading,
  };
};

export default useVerifyOtp;