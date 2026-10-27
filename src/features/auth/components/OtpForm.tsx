"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import useVerifyOtp from "../hook/useVerifyOtp";
import useLogin from "../hook/useLogin";
import useOtpTimer from "../hook/useOtpTimer";
import useResendOtp from "../hook/useResendOtp";

interface OtpFormProps {
  phone: string;
  onEditNumber: () => void;
}

const OtpForm = ({
  phone,
  onEditNumber,
}: OtpFormProps) => {
  const router = useRouter();

  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [justVerified, setJustVerified] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inFlightRef = useRef(false);
  const lastSubmittedCodeRef = useRef<string>("");

  const { verifyOtp, isLoading: isVerifyingOtp } = useVerifyOtp();
  const { login, isLoading: isLoggingIn } = useLogin();

  const activePhone =
    phone ||
    (typeof window !== "undefined"
      ? sessionStorage.getItem("auth_phone") || ""
      : "");

  const { seconds, resetTimer } = useOtpTimer(activePhone, 45);

  const { resendOtp, isResendingOtp } = useResendOtp(activePhone, resetTimer);

  // Auto-focus the single input on mount so mobile keyboard opens and autofill activates
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Ensure active phone exists
  useEffect(() => {
    const savedPhone = sessionStorage.getItem("auth_phone");
    if (!phone && !savedPhone) {
      router.replace("/login");
    }
  }, [phone, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    lastSubmittedCodeRef.current = "";
    setOtpValue(numbersOnly);
    if (otpError) {
      setOtpError("");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      lastSubmittedCodeRef.current = "";
      setOtpValue(pasted);
      if (otpError) {
        setOtpError("");
      }
    }
  };

  const processVerify = async (codeToVerify: string) => {
    if (inFlightRef.current || isVerifyingOtp || justVerified) return;
    if (lastSubmittedCodeRef.current === codeToVerify) return;

    inFlightRef.current = true;
    lastSubmittedCodeRef.current = codeToVerify;

    try {
      const mobileNumber =
        phone ||
        sessionStorage.getItem("auth_phone") ||
        "";

      if (!mobileNumber) {
        setOtpError("Mobile number not found. Please try again.");
        inFlightRef.current = false;
        return;
      }

      const response = await verifyOtp(mobileNumber, codeToVerify);

      if (response) {
        setJustVerified(true);

        const redirect =
          new URLSearchParams(window.location.search).get("redirect");

        setTimeout(() => {
          if (
            redirect &&
            redirect.startsWith("/") &&
            !redirect.startsWith("//") &&
            !redirect.startsWith("/login") &&
            !redirect.startsWith("/signup") &&
            !redirect.startsWith("/verify-otp")
          ) {
            window.location.href = redirect;
          } else {
            window.location.href = "/";
          }
        }, 500);
      } else {
        inFlightRef.current = false;
      }
    } catch (err) {
      inFlightRef.current = false;
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      inputRef.current?.focus();
      return;
    }
    if (!/^\d{6}$/.test(otpValue)) {
      setOtpError("Please enter a valid OTP.");
      inputRef.current?.focus();
      return;
    }
    setOtpError("");
    lastSubmittedCodeRef.current = "";
    inFlightRef.current = false;
    await processVerify(otpValue);
  };

  /* Mobile WebOTP Auto-fetch SMS listener (Android Chrome) */
  useEffect(() => {
    if (typeof window === "undefined" || !("OTPCredential" in window)) {
      return;
    }

    const ac = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      } as any)
      .then((otpCredential: any) => {
        if (otpCredential?.code) {
          const digits = otpCredential.code.replace(/\D/g, "").slice(0, 6);
          if (digits.length === 6) {
            lastSubmittedCodeRef.current = "";
            setOtpValue(digits);
          }
        }
      })
      .catch(() => {});

    return () => {
      try {
        ac.abort();
      } catch (e) {}
    };
  }, []);

  /* Auto-submit when all 6 digits are entered / autofilled */
  useEffect(() => {
    if (
      otpValue.length === 6 &&
      /^\d{6}$/.test(otpValue) &&
      otpValue !== lastSubmittedCodeRef.current &&
      !inFlightRef.current &&
      !justVerified
    ) {
      processVerify(otpValue);
    }
  }, [otpValue]);

  const handleResend = async () => {
    if (isResendingOtp || seconds > 0) return;

    const mobileNumber =
      phone ||
      sessionStorage.getItem("auth_phone") ||
      "";

    if (!mobileNumber) return;

    lastSubmittedCodeRef.current = "";
    inFlightRef.current = false;
    setOtpValue("");
    setOtpError("");
    inputRef.current?.focus();
    await resendOtp();
  };

  const handleEditNumber = () => {
    sessionStorage.removeItem("auth_phone");
    lastSubmittedCodeRef.current = "";
    inFlightRef.current = false;
    setOtpValue("");
    setOtpError("");
    onEditNumber();
  };

  const cleanDigits = activePhone.replace(/\D/g, "").slice(-10);
  const formattedPhone =
    cleanDigits.length === 10
      ? `+91 ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`
      : activePhone;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleVerifyOtp();
      }}
      className="w-full"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="mb-5 sm:mb-6"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1E2A22]">
          Verify Your Number
        </h2>

        <p className="text-[#1E2A22]/60 text-xs sm:text-sm mt-2.5 leading-relaxed">
          Enter the 6-digit code sent to your number.
        </p>
      </motion.div>

      {/* Phone Number */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          delay: 0.05,
          ease: "easeOut",
        }}
        className="mb-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[#1E2A22]">
              {formattedPhone}
            </p>
            {seconds > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0F3D2E]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#0F3D2E]">
                <span>⏱️</span>
                <span>{seconds}s</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleEditNumber}
            className="text-xs font-medium text-[#0F3D2E] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Edit
          </button>
        </div>
      </motion.div>

      {/* OTP Single Input Container with 6 Visual Slots */}
      <div className="relative mb-5 w-full">
        {/* Invisible Native Input covering the 6 slots for 100% native WebOTP / iOS Autofill / Paste compatibility */}
        <input
          ref={inputRef}
          id="otp-native-input"
          name="one-time-code"
          type="tel"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={6}
          value={otpValue}
          onChange={handleInputChange}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isVerifyingOtp || justVerified}
          className="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer"
          autoFocus
          aria-label="6-digit verification code"
        />

        {/* 6 Visual Display Slots */}
        <div className="flex w-full justify-between gap-2 sm:gap-3 pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const digit = otpValue[index] || "";
            const isCurrent =
              isFocused &&
              (index === otpValue.length ||
                (index === 5 && otpValue.length === 6));

            return (
              <div
                key={index}
                className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl border bg-white/80 flex items-center justify-center text-center text-lg sm:text-xl font-bold text-[#1E2A22] transition-all
                  ${
                    otpError
                      ? "border-red-400 bg-red-50/20"
                      : isCurrent
                        ? "border-[#D9A441] ring-2 ring-[#D9A441]/20 scale-105"
                        : digit
                          ? "border-[#0F3D2E]/40 bg-white shadow-xs"
                          : "border-[#1E2A22]/15"
                  }
                `}
              >
                {digit}
                {isCurrent && !digit && (
                  <span className="inline-block w-0.5 h-5 bg-[#D9A441] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {otpError && (
          <p className="mt-2 text-xs text-red-500">
            {otpError}
          </p>
        )}
      </div>

      {/* Verify Button */}
      <motion.button
        type="submit"
        disabled={
          isVerifyingOtp ||
          justVerified
        }
        whileTap={{
          scale:
            isVerifyingOtp || justVerified
              ? 1
              : 0.98,
        }}
        className=" relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#072F22] via-[#0F3D2E] to-[#0A2E22] py-3.5 text-xs sm:text-sm font-bold tracking-[0.18em] text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] border border-[#D9A441]/25 transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        <img
          src="/images/auth/btnbg.png"
          alt=""
          className="pointer-events-none absolute right-0 -top-4 h-18 w-auto object-contain opacity-70"
        />

        <span className="relative z-10">
          {isVerifyingOtp
            ? "VERIFYING..."
            : justVerified
              ? "VERIFIED"
              : "VERIFY OTP →"}
        </span>
      </motion.button>

      {/* Resend OTP */}
      <div className="mt-4 sm:mt-5 text-center pb-2">
        {seconds > 0 ? (
          <p className="text-xs font-medium text-[#1E2A22]/70">
            Resend OTP in{" "}
            <span className="font-bold text-[#0F3D2E]">
              {seconds}s
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResendingOtp}
            className="text-xs font-semibold text-[#0F3D2E] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResendingOtp
              ? "Sending..."
              : "Resend OTP"}
          </button>
        )}
      </div>
    </form>
  );
};

export default OtpForm;
