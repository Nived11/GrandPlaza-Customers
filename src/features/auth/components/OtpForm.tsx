"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import useVerifyOtp from "../hook/useVerifyOtp";
import useLogin from "../hook/useLogin";
import useOtpInput from "../hook/useOtpInput";
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

  const [otpError, setOtpError] = useState("");
  const [justVerified, setJustVerified] = useState(false);

  const { verifyOtp, isLoading: isVerifyingOtp } =
    useVerifyOtp();

  const { login, isLoading: isLoggingIn } =
    useLogin();

  const activePhone =
    phone ||
    (typeof window !== "undefined"
      ? sessionStorage.getItem("auth_phone") || ""
      : "");

  const { seconds, resetTimer } = useOtpTimer(activePhone, 45);

  const {
    otp,
    setOtp,
    otpRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
  } = useOtpInput(otpError, setOtpError);

  const {
    resendOtp,
    isResendingOtp,
  } = useResendOtp(activePhone, resetTimer);

  useEffect(() => {
    const savedPhone =
      sessionStorage.getItem("auth_phone");

    if (!phone && !savedPhone) {
      router.replace("/login");
    }
  }, [phone, router]);

  const validateOtp = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return false;
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      setOtpError("Please enter a valid OTP.");
      return false;
    }

    setOtpError("");
    return true;
  };

  const processVerify = async (codeToVerify: string) => {
    if (isVerifyingOtp || justVerified) return;

    const mobileNumber =
      phone ||
      sessionStorage.getItem("auth_phone") ||
      "";

    if (!mobileNumber) {
      setOtpError(
        "Mobile number not found. Please try again."
      );
      return;
    }

    const response = await verifyOtp(
      mobileNumber,
      codeToVerify
    );

    if (response) {
      setJustVerified(true);

      const redirect =
        new URLSearchParams(window.location.search).get(
          "redirect"
        );

      setTimeout(() => {
        if (
          redirect &&
          redirect.startsWith("/") &&
          !redirect.startsWith("//")
        ) {
          router.replace(redirect);
        } else {
          router.replace("/");
        }
      }, 700);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;
    const enteredOtp = otp.join("");
    await processVerify(enteredOtp);
  };

  /* Mobile WebOTP Auto-fetch SMS listener */
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
          const digits = otpCredential.code
            .replace(/\D/g, "")
            .slice(0, 6)
            .split("");

          if (digits.length === 6) {
            setOtp(digits);
            processVerify(digits.join(""));
          }
        }
      })
      .catch(() => {});

    return () => {
      ac.abort();
    };
  }, [phone]);

  /* Auto-submit when all 6 digits are filled */
  useEffect(() => {
    const fullCode = otp.join("");
    if (
      fullCode.length === 6 &&
      /^\d{6}$/.test(fullCode) &&
      !isVerifyingOtp &&
      !justVerified
    ) {
      processVerify(fullCode);
    }
  }, [otp]);


  const handleResend = async () => {
    if (isResendingOtp || seconds > 0) return;

    const mobileNumber =
      phone ||
      sessionStorage.getItem("auth_phone") ||
      "";

    if (!mobileNumber) return;

    await resendOtp();
  };

  const handleEditNumber = () => {
    sessionStorage.removeItem("auth_phone");
    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    setOtpError("");
    onEditNumber();
  };

  const cleanDigits = activePhone.replace(/\D/g, "").slice(-10);
  const formattedPhone =
    cleanDigits.length === 10
      ? `+91 ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`
      : activePhone;

  return (
    <div className="w-full">
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

      {/* OTP Inputs */}
      <div className="mb-5">
        <div className="flex w-full justify-between gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                otpRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={6}
              value={digit}
              onChange={(e) =>
                handleOtpChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleOtpKeyDown(e, index)
              }
              onPaste={(e) =>
                handleOtpPaste(e, index)
              }
              disabled={
                isVerifyingOtp || justVerified
              }
              aria-label={`OTP digit ${index + 1}`}
              className={` h-12 w-12 rounded-xl border bg-white/80 text-center text-lg font-semibold text-[#1E2A22] outline-none transition-all sm:h-14 sm:w-14
                ${
                  otpError
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#1E2A22]/15 focus:border-[#D9A441]"
                }
              `}
            />
          ))}
        </div>

        {otpError && (
          <p className="mt-2 text-xs text-red-500">
            {otpError}
          </p>
        )}
      </div>

      {/* Verify Button */}
      <motion.button
        type="button"
        onClick={handleVerifyOtp}
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
    </div>
  );
};

export default OtpForm;