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

interface OtpFormProps {
  phone: string;
  onEditNumber: () => void;
}

const RegisterOtpForm = ({
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
  const [justVerified, setJustVerified] = useState(false);

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

  /* OTP Countdown */
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((previous) =>
        Math.max(previous - 1, 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  /* OTP Input */
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

    /* Pasted OTP */
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

    /* Single digit */
    const newOtp = [...otp];

    newOtp[index] = numbersOnly;

    setOtp(newOtp);

    if (otpError) {
      setOtpError("");
    }

    if (
      numbersOnly &&
      index < otp.length - 1
    ) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* Keyboard Navigation */
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < otp.length - 1
    ) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /* OTP Paste */
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

  /* Validate OTP */
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

  /* Verify OTP */
  const handleVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateOtp()) return;

    const enteredOtp = otp.join("");

    const response = await verifyOtp(
      storedPhone,
      enteredOtp
    );

    if (!response) return;

    sessionStorage.removeItem(
      "register_phone"
    );

    setJustVerified(true);

    setTimeout(() => {
      router.replace("/");
    }, 650);
  };

  /* Resend OTP */
  const handleResend = async () => {
    if (isResending || !storedPhone) {
      return;
    }

    const response = await login(storedPhone);

    if (!response) return;

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

  /* Edit Number */
  const handleEditNumber = () => {
    setOtpError("");
    onEditNumber();
  };

  const formattedPhone = storedPhone.replace(
    /(\d{5})(\d{5})/,
    "$1 $2"
  );

  return (
    <form
      onSubmit={handleVerifyOtp}
      className="space-y-5"
    >
      {/* OTP Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="text-center"
      >
        <p
          className="
            mb-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#D9A441]
            sm:text-xs
          "
        >
          Verification
        </p>

        <h2
          className="
            text-xl
            font-semibold
            tracking-tight
            text-[#1E2A22]
            sm:text-2xl
          "
        >
          Verify your number
        </h2>

        <p
          className="
            mt-2
            text-[11px]
            leading-relaxed
            text-[#1E2A22]/55
            sm:text-xs
          "
        >
          Enter the 6-digit code sent to
        </p>

        <p
          className="
            mt-1
            text-xs
            font-semibold
            text-[#0F3D2E]
            sm:text-sm
          "
        >
          +91 {formattedPhone}
        </p>
      </motion.div>

      {/* Verification Code */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          delay: 0.08,
          ease: "easeOut",
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <label
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-[#1E2A22]
              sm:text-xs
            "
          >
            Verification Code
          </label>

          <button
            type="button"
            onClick={handleEditNumber}
            disabled={justVerified}
            className="
              text-[10px]
              font-semibold
              text-[#0F3D2E]
              underline
              hover:text-[#D9A441]
              disabled:pointer-events-none
              disabled:opacity-40
              sm:text-[11px]
            "
          >
            Edit Number
          </button>
        </div>

        {/* OTP Boxes */}
        <motion.div
          animate={
            otpError
              ? {
                  x: [0, -8, 8, -6, 6, 0],
                }
              : { x: 0 }
          }
          transition={{
            duration: 0.4,
          }}
          className="
            flex
            items-center
            justify-between
            gap-1.5
            sm:gap-2
          "
        >
          {otp.map((digit, index) => (
            <motion.input
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
                handleOtpPaste(e, index)
              }
              onKeyDown={(e) =>
                handleOtpKeyDown(e, index)
              }
              disabled={
                isVerifying ||
                justVerified
              }
              whileFocus={{
                scale: 1.05,
              }}
              className={`
                h-11
                w-9
                appearance-none
                rounded-xl
                border
                bg-white
                text-center
                text-lg
                font-bold
                text-[#1E2A22]
                shadow-sm
                transition-all
                duration-200
                focus:border-[#D9A441]
                focus:outline-none
                focus:ring-4
                focus:ring-[#D9A441]/10
                sm:h-12
                sm:w-11
                ${
                  digit
                    ? "border-[#D9A441]/70 scale-[1.02]"
                    : ""
                }
                ${
                  otpError
                    ? "border-red-500"
                    : "border-[#0F3D2E]/15"
                }
                ${
                  justVerified
                    ? "border-green-500 bg-green-50"
                    : ""
                }
              `}
            />
          ))}
        </motion.div>

        {/* Error */}
        {otpError && (
          <motion.p
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-2
              text-[10px]
              text-red-600
              sm:text-[11px]
            "
          >
            {otpError}
          </motion.p>
        )}
      </motion.div>

      {/* Resend */}
      <div
        className="
          flex
          items-center
          justify-between
          text-[11px]
          sm:text-xs
        "
      >
        {seconds > 0 ? (
          <span className="font-medium text-[#1E2A22]/60">
            Resend code in{" "}
            <strong className="font-mono font-bold text-[#D9A441]">
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
            disabled={
              isResending ||
              justVerified
            }
            className="
              font-semibold
              text-[#0F3D2E]
              underline
              hover:text-[#D9A441]
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            {isResending
              ? "SENDING..."
              : "Resend OTP Now"}
          </button>
        )}
      </div>

      {/* Verify Button */}
      <motion.button
        type="submit"
        disabled={
          isVerifying ||
          justVerified
        }
        whileHover={
          !justVerified
            ? { y: -1 }
            : {}
        }
        whileTap={
          !justVerified
            ? { scale: 0.98 }
            : {}
        }
        animate={
          justVerified
            ? {
                backgroundColor:
                  "#15803d",
              }
            : {
                backgroundColor:
                  "#0F3D2E",
              }
        }
        transition={{
          duration: 0.3,
        }}
        className="
          relative
          flex
          w-full
          items-center
          justify-center
          gap-3
          overflow-hidden
          rounded-2xl
          px-6
          py-3.5
          text-xs
          font-medium
          tracking-[0.15em]
          text-white
          shadow-lg
          shadow-[#0F3D2E]/20
          transition-shadow
          duration-300
          hover:shadow-xl
          disabled:pointer-events-none
        "
      >
        {justVerified ? (
          <>
            <motion.span
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              ✓
            </motion.span>

            <span>
              VERIFIED
            </span>
          </>
        ) : (
          <>
            <span className="relative z-10">
              {isVerifying
                ? "AUTHENTICATING..."
                : "VERIFY & CONTINUE"}
            </span>

            {!isVerifying && (
              <span className="relative z-10">
                ✓
              </span>
            )}
          </>
        )}

        {/* Decorative Button Leaf */}
        {!justVerified && (
          <img
            src="/images/auth/btnbg.png"
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-0
              -top-4
              h-18
              w-auto
              object-contain
              opacity-70
            "
          />
        )}
      </motion.button>
    </form>
  );
};

export default RegisterOtpForm;