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

    // Tokens are safely handled in HttpOnly cookies to prevent XSS exposure

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
      let isFirebaseSession = false;

      // 1. Try Firebase confirmation first if active
      if (typeof window !== "undefined" && window.firebaseConfirmationResult) {
        isFirebaseSession = true;
        try {
          const fbResult = await confirmFirebaseOtp(otp);
          data = await firebaseVerifyApi({
            id_token: fbResult.idToken,
            phone_number: phoneNumber,
          });
        } catch (fbErr: any) {
          console.error("Firebase OTP verification failed:", fbErr);

          // Clean Firebase user-facing errors
          if (fbErr?.code === "auth/invalid-verification-code") {
            throw new Error("Invalid OTP entered. Please check and try again.");
          }
          if (fbErr?.code === "auth/code-expired") {
            throw new Error("OTP has expired. Please click 'Resend OTP'.");
          }

          // If backend API returned an error (e.g. 403 role isolation, 400, 401)
          // Rethrow fbErr directly so the outer catch can parse error.response.data
          throw fbErr;
        }
      }

      // 2. Only fallback to standard database OTP if Firebase session was NOT active
      if (!isFirebaseSession && (!data || data?.status !== true)) {
        data = await VerifyOTPApi({
          phone_number: phoneNumber,
          otp,
        });
      }

      if (data?.status === true) {
        if (typeof window !== "undefined") {
          window.firebaseConfirmationResult = undefined;
        }

        saveAuthSession(data);

        const welcomeMsg =
          !data.message || data.message.includes("Firebase") || data.message.includes("OTP verified")
            ? "Welcome to Empire Plaza!"
            : data.message;

        toast.success(welcomeMsg, {
          duration: 4000,
        });

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
