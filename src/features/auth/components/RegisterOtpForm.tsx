"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [otpError, setOtpError] = useState("");
  const [justVerified, setJustVerified] = useState(false);

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

  const otpRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);

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

  // Auto-focus first input box on mount so mobile keyboard pops and autofill triggers
  useEffect(() => {
    const timer = setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  /* OTP Input change */
  const handleOtpChange = (
    value: string,
    index: number
  ) => {
    lastSubmittedCodeRef.current = "";
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

    /* Pasted / Autofilled OTP */
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

      const lastIndex = Math.min(
        startIdx + digits.length - 1,
        otp.length - 1
      );

      setTimeout(() => {
        otpRefs.current[lastIndex]?.focus();
      }, 10);

      return;
    }

    /* Single digit */
    const newOtp = [...otp];
    newOtp[index] = numbersOnly;
    setOtp(newOtp);

    if (otpError) {
      setOtpError("");
    }

    if (numbersOnly && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* Keyboard Navigation */
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
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

    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* OTP Paste */
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

  /* Validate OTP */
  const validateOtp = () => {
    const enteredOtp = otp.join("");

    if (!enteredOtp) {
      setOtpError("Verification code is required");
      otpRefs.current[0]?.focus();
      return false;
    }

    if (enteredOtp.length !== 6) {
      setOtpError("Enter the complete 6-digit verification code");
      return false;
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      setOtpError("Verification code must contain only numbers");
      return false;
    }

    if (!storedPhone) {
      setOtpError("Mobile number is missing. Please try again.");
      return false;
    }

    setOtpError("");
    return true;
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

  /* Verify OTP submit */
  const handleVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

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
            lastSubmittedCodeRef.current = "";
            setOtp(digits);
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

  /* Auto-submit when all 6 digits are filled */
  useEffect(() => {
    const fullCode = otp.join("");
    if (
      fullCode.length === 6 &&
      /^\d{6}$/.test(fullCode) &&
      fullCode !== lastSubmittedCodeRef.current &&
      !inFlightRef.current &&
      !justVerified
    ) {
      processVerify(fullCode);
    }
  }, [otp]);

  /* Resend OTP */
  const handleResend = async () => {
    if (isResending || !storedPhone || seconds > 0) {
      return;
    }

    const response = await login(storedPhone);

    if (!response) return;

    resetTimer();

    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setOtpError("");

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  /* Edit Number */
  const handleEditNumber = () => {
    setOtpError("");
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

      {/* OTP Inputs */}
      <div className="mb-4 sm:mb-5">
        <div className="flex w-full justify-between gap-1.5 sm:gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                otpRefs.current[index] = element;
              }}
              id={`register-otp-${index}`}
              name={`register-otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
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
                isVerifying || justVerified
              }
              aria-label={`OTP digit ${index + 1}`}
              className={`h-11 w-11 sm:h-13 sm:w-13 rounded-xl border bg-white/90 text-center text-lg font-bold text-[#1E2A22] outline-none transition-all
                ${
                  digit
                    ? "border-[#D9A441] shadow-sm"
                    : "border-[#1E2A22]/15"
                }
                ${
                  otpError
                    ? "border-red-400 focus:border-red-500"
                    : "focus:border-[#D9A441] focus:ring-4 focus:ring-[#D9A441]/10"
                }
                ${
                  justVerified
                    ? "border-green-500 bg-green-50"
                    : ""
                }
              `}
            />
          ))}
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

        <span className="relative z-10">
          {isVerifying
            ? "VERIFYING..."
            : justVerified
              ? "VERIFIED ✓"
              : "VERIFY & CONTINUE →"}
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
