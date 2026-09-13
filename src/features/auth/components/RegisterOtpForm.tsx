"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import useVerifyOtp from "../hoock/useVerifyOtp";

interface OtpFormProps {
  phone: string;
  onEditNumber: () => void;
}

const OtpForm = ({
  phone,
  onEditNumber,
}: OtpFormProps) => {
  const router = useRouter();

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [seconds, setSeconds] = useState(24);
  const [otpError, setOtpError] = useState("");

  const {
    verifyOtp,
    isLoading: isVerifying,
  } = useVerifyOtp();

  const otpRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);

  /*
   * Phone number
   *
   * Login stores the phone number in sessionStorage.
   * The prop is used first, sessionStorage is the fallback.
   */
  const [storedPhone, setStoredPhone] =
    useState(phone);

  useEffect(() => {
    const savedPhone =
      sessionStorage.getItem("register_phone");

    if (savedPhone) {
      setStoredPhone(savedPhone);
    } else if (phone) {
      setStoredPhone(phone);
    }
  }, [phone]);

  /*
   * OTP countdown
   */
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((previous) =>
        Math.max(previous - 1, 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  /*
   * OTP input
   *
   * Supports:
   * - Normal single digit typing
   * - Pasting complete OTP
   * - Pasting OTP into any box
   * - Automatic focus movement
   */
  const handleOtpChange = (
    value: string,
    index: number
  ) => {
    // Keep numbers only
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
     * Multiple digits means the user pasted
     * an OTP.
     */
    if (numbersOnly.length > 1) {
      const newOtp = [...otp];

      numbersOnly
        .slice(0, otp.length - index)
        .split("")
        .forEach((digit, offset) => {
          newOtp[index + offset] = digit;
        });

      setOtp(newOtp);

      if (otpError) {
        setOtpError("");
      }

      const lastIndex = Math.min(
        index + numbersOnly.length - 1,
        otp.length - 1
      );

      setTimeout(() => {
        otpRefs.current[lastIndex]?.focus();
      }, 0);

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
    if (
      numbersOnly &&
      index < otp.length - 1
    ) {
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
     * Backspace:
     * If current box is empty, move to previous box.
     */
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    /*
     * Arrow left
     */
    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    /*
     * Arrow right
     */
    if (
      e.key === "ArrowRight" &&
      index < otp.length - 1
    ) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /*
   * OTP paste
   *
   * Explicitly handles paste so a complete
   * 6-digit code fills all boxes.
   */
  const handleOtpPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();

    const pastedValue =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedValue) return;

    const newOtp = [...otp];

    pastedValue
      .slice(0, otp.length - index)
      .split("")
      .forEach((digit, offset) => {
        newOtp[index + offset] = digit;
      });

    setOtp(newOtp);

    if (otpError) {
      setOtpError("");
    }

    const lastIndex = Math.min(
      index + pastedValue.length - 1,
      otp.length - 1
    );

    setTimeout(() => {
      otpRefs.current[lastIndex]?.focus();
    }, 0);
  };

  /*
   * Validate OTP
   */
  const validateOtp = () => {
    const enteredOtp = otp.join("");

    if (!enteredOtp) {
      setOtpError(
        "Verification code is required"
      );

      otpRefs.current[0]?.focus();

      return false;
    }

    if (enteredOtp.length !== 6) {
      setOtpError(
        "Enter the complete 6-digit verification code"
      );

      return false;
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      setOtpError(
        "Verification code must contain only numbers"
      );

      return false;
    }

    if (!storedPhone) {
      setOtpError(
        "Mobile number is missing. Please try again."
      );

      return false;
    }

    setOtpError("");

    return true;
  };

  /*
   * Verify OTP
   */
  const handleVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateOtp()) return;

    const enteredOtp = otp.join("");

    console.log("VERIFY OTP REQUEST:", {
      phone_number: storedPhone,
      otp: enteredOtp,
    });

    const response = await verifyOtp(
      storedPhone,
      enteredOtp
    );

    /*
     * API failed
     */
    if (!response) return;

    /*
     * Authentication successful
     */
    sessionStorage.removeItem("register_phone");

    /*
     * Return to previous page
     */
    router.back();
  };

  /*
   * Resend OTP
   *
   * Actual resend API can be connected later.
   */
  const handleResend = () => {
    setSeconds(24);

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

  /*
   * Edit phone number
   */
  const handleEditNumber = () => {
    setOtpError("");
    onEditNumber();
  };

  /*
   * Format phone number
   */
  const formattedPhone = storedPhone.replace(
    /(\d{5})(\d{5})/,
    "$1 $2"
  );

  return (
    <>
      {/* Heading */}
      <div className="mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-[#D9A441] mb-2">
          <span>✦</span>

          <span>WELCOME</span>

          <span>✦</span>
        </div>

        <h2 className="uppercase tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E2A22] leading-none">
          Verify{" "}
          <span className="italic font-serif font-normal lowercase tracking-normal text-[#0F3D2E]">
            Number
          </span>
        </h2>

        <p className="text-[#1E2A22]/60 text-xs sm:text-sm mt-2.5 leading-relaxed">
          Enter the verification code sent to
          your mobile number.
        </p>
      </div>

      <form
        onSubmit={handleVerifyOtp}
        className="space-y-4"
      >
        {/* Verification Code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1E2A22]">
              Verification Code
            </label>

            <button
              type="button"
              onClick={handleEditNumber}
              className="text-[10px] sm:text-[11px] text-[#0F3D2E] hover:text-[#D9A441] font-semibold underline"
            >
              Edit Number
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-[#1E2A22]/60 mb-3">
            Code sent to{" "}
            <span className="font-semibold text-[#1E2A22]">
              +91 {formattedPhone}
            </span>
          </p>

          {/* OTP Boxes */}
          <div className="flex items-center justify-between gap-1 sm:gap-1.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  otpRefs.current[index] =
                    element;
                }}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
                maxLength={6}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(
                    e.target.value,
                    index
                  )
                }
                onPaste={(e) =>
                  handleOtpPaste(
                    e,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleOtpKeyDown(
                    e,
                    index
                  )
                }
                disabled={isVerifying}
                className={`w-9 h-11 appearance-none sm:w-11 sm:h-12 text-center text-lg font-bold text-[#1E2A22] bg-white rounded-xl border shadow-sm transition-all focus:outline-none focus:border-[#D9A441] focus:ring-4 focus:ring-[#D9A441]/10 ${
                  otpError
                    ? "border-red-500"
                    : "border-[#0F3D2E]/15"
                }`}
              />
            ))}
          </div>

          {/* Error */}
          {otpError && (
            <p className="mt-2 text-[10px] sm:text-[11px] text-red-600">
              {otpError}
            </p>
          )}
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          {seconds > 0 ? (
            <span className="text-[#1E2A22]/60 font-medium">
              Resend code in{" "}
              <strong className="text-[#D9A441] font-mono font-bold">
                00:
                {seconds
                  .toString()
                  .padStart(2, "0")}
              </strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#0F3D2E] font-semibold hover:text-[#D9A441] underline"
            >
              Resend OTP Now
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-[#0F3D2E] hover:bg-[#0A291E] disabled:opacity-70 disabled:pointer-events-none text-white py-3.5 px-6 rounded-2xl font-medium text-xs sm:text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-3 shadow-lg shadow-[#0F3D2E]/20 hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
        >
          <span>
            {isVerifying
              ? "AUTHENTICATING..."
              : "VERIFY & CONTINUE"}
          </span>

          <span>✓</span>
        </button>
      </form>
    </>
  );
};

export default OtpForm;