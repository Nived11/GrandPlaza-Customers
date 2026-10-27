"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useVerifyOtp from "../hook/useVerifyOtp";
import useLogin from "../hook/useLogin";
import useOtpTimer from "../hook/useOtpTimer";

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
  const [isFocused, setIsFocused] = useState(false);
  const [justVerified, setJustVerified] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inFlightRef = useRef(false);
  const lastSubmittedCodeRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

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

  /* Mobile WebOTP Auto-fetch SMS listener (Android Chrome / WebOTP supported browsers) */
  const startWebOtp = () => {
    if (typeof window === "undefined" || !("OTPCredential" in window)) {
      return;
    }

    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (e) {}
    }

    const ac = new AbortController();
    abortControllerRef.current = ac;

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
  };

  useEffect(() => {
    startWebOtp();
    return () => {
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

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

    const response = await login(storedPhone);

    if (!response) return;

    resetTimer();
    lastSubmittedCodeRef.current = "";
    inFlightRef.current = false;
    setOtpValue("");
    setOtpError("");
    startWebOtp();

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  /* Edit Number */
  const handleEditNumber = () => {
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

      {/* OTP Single Input Container with 6 Visual Slots */}
      <div className="relative mb-4 sm:mb-5 w-full">
        {/* Real Native Input styled with opacity: 0.001 so it's 100% visible to Chromium Autofill & WebOTP, but invisible to human eyes */}
        <input
          ref={inputRef}
          id="register-otp-native-input"
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
          disabled={isVerifying || justVerified}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.001,
            pointerEvents: "auto",
            cursor: "pointer",
            background: "transparent",
            color: "transparent",
            border: "none",
            outline: "none",
            caretColor: "transparent",
            fontSize: "24px",
            zIndex: 10,
          }}
          autoFocus
          aria-label="6-digit verification code"
        />

        {/* 6 Visual Display Slots */}
        <div className="flex w-full justify-between gap-1.5 sm:gap-2.5 pointer-events-none select-none">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const digit = otpValue[index] || "";
            const isCurrent =
              isFocused &&
              (index === otpValue.length ||
                (index === 5 && otpValue.length === 6));

            return (
              <div
                key={index}
                className={`relative h-11 w-11 sm:h-13 sm:w-13 rounded-xl border bg-white/90 flex items-center justify-center text-center text-lg font-bold text-[#1E2A22] transition-all
                  ${
                    digit
                      ? "border-[#D9A441] shadow-xs"
                      : "border-[#1E2A22]/15"
                  }
                  ${
                    otpError
                      ? "border-red-400 bg-red-50/20"
                      : isCurrent
                        ? "border-[#D9A441] ring-2 ring-[#D9A441]/20 scale-105"
                        : ""
                  }
                  ${
                    justVerified
                      ? "border-green-500 bg-green-50"
                      : ""
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
          <p className="mt-2 text-center text-xs text-red-500">
            {otpError}
          </p>
        )}
      </div>

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
