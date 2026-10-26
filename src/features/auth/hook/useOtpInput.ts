"use client";

import { useRef, useState } from "react";

const useOtpInput = (
  otpError: string,
  setOtpError: React.Dispatch<React.SetStateAction<string>>
) => {
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const otpRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);

  const handleOtpChange = (
    value: string,
    index: number
  ) => {
    const numbersOnly = value.replace(/\D/g, "");

    if (!numbersOnly) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (otpError) {
        setOtpError("");
      }
      return;
    }

    /*
     * Multiple digits means mobile autofill (iOS / Android) or paste
     */
    if (numbersOnly.length > 1) {
      const newOtp = [...otp];
      const digits = numbersOnly.slice(0, 6).split("");

      // If full 6 digits arrived, always fill from index 0 across all boxes
      const startIdx = digits.length === 6 ? 0 : index;
      digits.forEach((digit, offset) => {
        if (startIdx + offset < 6) {
          newOtp[startIdx + offset] = digit;
        }
      });

      setOtp(newOtp);

      if (otpError) {
        setOtpError("");
      }

      const lastIndex = Math.min(startIdx + digits.length - 1, 5);
      setTimeout(() => {
        otpRefs.current[lastIndex]?.focus();
      }, 10);

      return;
    }

    /*
     * Normal single digit entry
     */
    const newOtp = [...otp];
    newOtp[index] = numbersOnly;
    setOtp(newOtp);

    if (otpError) {
      setOtpError("");
    }

    /*
     * Move to next box
     */
    if (numbersOnly && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /*
   * OTP keyboard navigation
   */
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    /*
     * Backspace
     */
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    /*
     * Arrow left
     */
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    /*
     * Arrow right
     */
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /*
   * OTP paste
   */
  const handleOtpPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const newOtp = [...otp];
    const digits = pastedValue.split("");
    const startIdx = digits.length === 6 ? 0 : index;

    digits.forEach((digit, offset) => {
      if (startIdx + offset < 6) {
        newOtp[startIdx + offset] = digit;
      }
    });

    setOtp(newOtp);

    if (otpError) {
      setOtpError("");
    }

    const lastIndex = Math.min(
      startIdx + digits.length - 1,
      otp.length - 1
    );

    setTimeout(() => {
      otpRefs.current[lastIndex]?.focus();
    }, 10);
  };

  return {
    otp,
    setOtp,
    otpRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
  };
};

export default useOtpInput;
