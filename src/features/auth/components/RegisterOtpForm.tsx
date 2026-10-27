"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useVerifyOtp from "../hook/useVerifyOtp";
import useLogin from "../hook/useLogin";
import useOtpTimer from "../hook/useOtpTimer";
import useSmsOtp from "../hook/useSmsOtp";
import { stopSmsOtp } from "@/lib/smsOtp";
import OtpCodeInput from "./OtpCodeInput";

interface RegisterOtpFormProps {
  phone: string;
  onEditNumber: () => void;
}

const RegisterOtpForm = ({
  phone,
  onEditNumber,
}: RegisterOtpFormProps) => {
  const router = useRouter();

  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [justVerified, setJustVerified] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inFlightRef = useRef(false);
  const lastSubmittedCodeRef = useRef<string>("");

  const {
    verifyOtp,
    isLoading: isVerifying,
  } = useVerifyOtp();

  const {
    login,
    isLoading: isResending,
  } = useLogin();

  const [storedPhone, setStoredPhone] = useState(() => {
    return (
      phone ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("register_phone") || ""
        : "")
    );
  });

  const { seconds, resetTimer } = useOtpTimer(storedPhone, 45);

  useEffect(() => {
    const savedPhone = sessionStorage.getItem("register_phone");

    if (savedPhone) {
      setStoredPhone(savedPhone);
    } else if (phone) {
      setStoredPhone(phone);
    }
  }, [phone]);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

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
    if (inFlightRef.current || isVerifying || justVerified || !storedPhone) return;
    if (lastSubmittedCodeRef.current === codeToVerify) return;

    inFlightRef.current = true;
    lastSubmittedCodeRef.current = codeToVerify;
    stopSmsOtp(storedPhone);

    const response = await verifyOtp(
      storedPhone,
      codeToVerify
    );

    if (!response) {
      inFlightRef.current = false;
      return;
    }

    sessionStorage.removeItem("register_phone");
    setJustVerified(true);

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const handleVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (inFlightRef.current || isVerifying || justVerified) return;

    if (otpValue.length !== 6) {
      setOtpError("Enter the complete 6-digit verification code");
      inputRef.current?.focus();
      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      setOtpError("Verification code must contain only numbers");
      inputRef.current?.focus();
      return;
    }

    if (!storedPhone) {
      setOtpError("Mobile number is missing. Please try again.");
      return;
    }

    setOtpError("");
    lastSubmittedCodeRef.current = "";
    inFlightRef.current = false;
    await processVerify(otpValue);
  };

  const receiveSmsCode = useCallback((code: string) => {
    lastSubmittedCodeRef.current = "";
    setOtpError("");
    setOtpValue(code);
  }, []);
  useSmsOtp(storedPhone, receiveSmsCode);

  /* Auto-submit when all 6 digits are filled */
  useEffect(() => {
    const fullCode = otpValue;
    if (
      fullCode.length === 6 &&
      /^\d{6}$/.test(fullCode) &&
      fullCode !== lastSubmittedCodeRef.current &&
      !inFlightRef.current &&
      !justVerified
    ) {
      processVerify(fullCode);
    }
  }, [otpValue, justVerified]);

  /* Resend OTP */
  const handleResend = async () => {
    if (isResending || !storedPhone || seconds > 0) {
      return;
    }

    stopSmsOtp(storedPhone);
    lastSubmittedCodeRef.current = "";
    setOtpValue("");
    setOtpError("");
    const response = await login(storedPhone);
    if (!response) return;
    resetTimer();

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  /* Edit Number */
  const handleEditNumber = () => {
    stopSmsOtp(storedPhone);
    setOtpError("");
    setOtpValue("");
    lastSubmittedCodeRef.current = "";
    inFlightRef.current = false;
    onEditNumber();
  };

  const cleanDigits = storedPhone.replace(/\D/g, "").slice(-10);
  const formattedPhone =
    cleanDigits.length === 10
      ? `+91 ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`
      : storedPhone;

  return (
    <form
      onSubmit={handleVerifyOtp}
      className="w-full relative"
    >
      {/* Glassmorphism Verification / Resend Loading Overlay */}
      <AnimatePresence>
        {(isVerifying || isResending) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute -inset-3 sm:-inset-4 z-50 flex flex-col items-center justify-center rounded-3xl bg-[#FAF5EB]/90 backdrop-blur-md px-6 py-8 text-center shadow-xl border border-[#D9A441]/25"
          >
            {/* Spinning Dual Gold & Emerald Rings */}
            <div className="relative mb-4 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-[3px] border-[#0F3D2E]/20 border-t-[#0F3D2E] animate-spin" />
              <div className="absolute h-10 w-10 rounded-full border-2 border-[#D9A441]/30 border-b-[#D9A441] animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
              <div className="absolute flex items-center justify-center text-[#0F3D2E]">
                {isVerifying ? (
                  <svg className="h-5 w-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
              </div>
            </div>

            {/* Status Title */}
            <h4 className="text-sm sm:text-base font-bold text-[#0F3D2E] tracking-wide">
              {isVerifying ? "Verifying Security Code" : "Resending New Code"}
            </h4>

            {/* Subtitle */}
            <p className="mt-1 text-xs text-[#1E2A22]/75 max-w-[250px]">
              {isVerifying
                ? "Creating account and authenticating session..."
                : `Dispatching new SMS OTP to ${formattedPhone}...`}
            </p>

            {/* Pulsing micro-badge */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[#0F3D2E]/10 px-3 py-1 text-[11px] font-semibold text-[#0F3D2E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441] animate-ping" />
              <span>{isVerifying ? "Almost done..." : "Please wait a moment..."}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="mb-4 sm:mb-5"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#1E2A22]">
          Verify Your Number
        </h2>

        <p className="text-[#1E2A22]/60 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Enter the 6-digit verification code sent to your number.
        </p>
      </motion.div>

      {/* Phone Number Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          delay: 0.05,
          ease: "easeOut",
        }}
        className="mb-4 sm:mb-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs sm:text-sm font-semibold text-[#1E2A22]">
              {formattedPhone}
            </p>

            {seconds > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0F3D2E]/10 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#0F3D2E]">
                <span>⏱️</span>
                <span>{seconds}s</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleEditNumber}
            className="text-xs font-semibold text-[#0F3D2E] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Edit
          </button>
        </div>
      </motion.div>

      <OtpCodeInput
        ref={inputRef}
        id="register-otp-native-input"
        value={otpValue}
        onChange={handleInputChange}
        onPaste={handlePaste}
        disabled={isVerifying || justVerified}
        error={otpError}
      />

      {/* Verify Button */}
      <motion.button
        type="submit"
        disabled={
          isVerifying ||
          justVerified
        }
        whileTap={{
          scale:
            isVerifying || justVerified
              ? 1
              : 0.98,
        }}
        className="relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#072F22] via-[#0F3D2E] to-[#0A2E22] py-3.5 text-xs sm:text-sm font-bold tracking-[0.18em] text-white shadow-[0_8px_20px_rgba(15,61,46,0.28)] border border-[#D9A441]/25 transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        <img
          src="/images/auth/btnbg.png"
          alt=""
          className="pointer-events-none absolute right-0 -top-4 h-18 w-auto object-contain opacity-70"
        />

        <span className="relative z-10 flex items-center justify-center gap-2">
          {isVerifying && (
            <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span>
            {isVerifying
              ? "VERIFYING..."
              : justVerified
                ? "VERIFIED ✓"
                : "VERIFY & CONTINUE →"}
          </span>
        </span>
      </motion.button>

      {/* Resend OTP */}
      <div className="mt-4 sm:mt-5 text-center pb-1">
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
            disabled={isResending}
            className="text-xs font-semibold text-[#0F3D2E] underline underline-offset-4 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isResending
              ? "Sending..."
              : "Resend OTP"}
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterOtpForm;
