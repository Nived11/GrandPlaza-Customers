"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { VerifyOTPApi } from "../api/authApi";

const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const verifyOtp = async (
    phoneNumber: string,
    otp: string
  ) => {
    try {
      setIsLoading(true);

      const data = await VerifyOTPApi({
        phone_number: phoneNumber,
        otp,
      });

      console.log("VERIFY OTP RESPONSE:", data);

      // API returns response.data directly
      if (data?.status === true) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success(
          data.message || "OTP verified successfully",
          {
            duration: 5000,
          }
        );

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
            "Something went wrong. Please try again.",
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