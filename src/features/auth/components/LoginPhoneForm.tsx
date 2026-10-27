"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import useLogin from "../hook/useLogin";
import useOtpTimer from "../hook/useOtpTimer";
import {
  getOtpRemainingCooldown,
  setOtpCooldown,
} from "@/utils/otpCooldown";

interface LoginPhoneFormProps {
  onSuccess: (phone: string) => void;
}

const LoginPhoneForm = ({
  onSuccess,
}: LoginPhoneFormProps) => {
  const [phone, setPhone] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("auth_phone") || "";
    }
    return "";
  });
  const [phoneError, setPhoneError] = useState("");

  const { login, isLoading } = useLogin();
  const { seconds } = useOtpTimer(phone, 45);

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("Mobile number is required");
      return false;
    }

    if (phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError("Enter a valid mobile number");
      return false;
    }

    setPhoneError("");

    return true;
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) return;

    setPhone(value);

    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validatePhone()) return;

    // If cooldown is still active and active Firebase session exists, route directly to OTP verification
    const remaining = getOtpRemainingCooldown(phone);
    if (remaining > 0 && typeof window !== 'undefined' && window.firebaseConfirmationResult) {
      onSuccess(phone);
      return;
    }

    const response = await login(phone);

    if (!response) return;

    // Start 45s cooldown for this number
    setOtpCooldown(phone, 45);
    onSuccess(phone);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 relative"
    >
      {/* Glassmorphism Sending OTP Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
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
                <svg className="h-5 w-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Status Title */}
            <h4 className="text-sm sm:text-base font-bold text-[#0F3D2E] tracking-wide">
              Sending Verification Code
            </h4>

            {/* Subtitle with Phone Number */}
            <p className="mt-1 text-xs text-[#1E2A22]/75 max-w-[250px]">
              Dispatching secure SMS OTP to{" "}
              <span className="font-bold text-[#0F3D2E]">
                {phone.length === 10
                  ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
                  : phone}
              </span>
            </p>

            {/* Pulsing micro-badge */}
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[#0F3D2E]/10 px-3 py-1 text-[11px] font-semibold text-[#0F3D2E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441] animate-ping" />
              <span>Securing connection...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Number */}
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
        <label
          htmlFor="phoneInput"
          className="
            mb-1.5
            hidden
            lg:block
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-[#1E2A22]
            sm:text-xs
          "
        >
          Mobile Number
          <span className="text-[#D9A441]"> *</span>
        </label>

        <motion.div
          animate={
            phoneError
              ? { x: [0, -6, 6, -4, 4, 0] }
              : { x: 0 }
          }
          transition={{
            duration: 0.4,
          }}
          className={`
            relative
            flex
            items-center
            rounded-2xl
            border
            bg-white/95
            shadow-[0_2px_12px_rgba(217,164,65,0.06)]
            transition-all
            duration-300
            focus-within:border-[#D9A441]
            focus-within:ring-4
            focus-within:ring-[#D9A441]/15
            ${
              phoneError
                ? "border-red-500"
                : "border-[#D9A441]/35 hover:border-[#D9A441]/60"
            }
          `}
        >
          {/* Country Code */}
          <div
            className="
              flex
              select-none
              items-center
              gap-1
              border-r
              border-[#D9A441]/20
              py-3
              pl-3.5
              pr-2.5
              text-xs
              font-bold
              text-[#1E2A22]
              sm:text-sm
              sm:pl-4
              sm:pr-3
            "
          >
            <span>+91</span>
            <span className="text-[10px] text-[#1E2A22]/50">▾</span>
          </div>

          {/* Input */}
          <input
            id="phoneInput"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={handlePhoneChange}
            onBlur={validatePhone}
            placeholder="Enter 10 digit number"
            autoComplete="tel"
            className="
              w-full
              appearance-none
              bg-transparent
              px-3
              py-3
              text-sm
              font-medium
              tracking-wide
              text-[#1E2A22]
              placeholder-[#1E2A22]/48
              focus:outline-none
              sm:text-base
            "
          />

          {/* Phone Icon */}
          <div className="pr-3.5 text-[#1E2A22]/60">
            <svg
              className="h-4.5 w-4.5 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x="6"
                y="3"
                width="12"
                height="18"
                rx="2"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="17"
                r="1"
                fill="currentColor"
              />
            </svg>
          </div>
        </motion.div>

        {/* Validation Error */}
        {phoneError && (
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
            {phoneError}
          </motion.p>
        )}
      </motion.div>

      {/* Terms */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.35,
          delay: 0.14,
        }}
        className="
          text-[10px]
          leading-relaxed
          text-[#1E2A22]/70
          text-center
          lg:text-left
          sm:text-[11px]
        "
      >
        By creating an account, you agree to Empire Plaza&apos;s
        <span className="block mt-0.5">
          <a
            href="#"
            className="
              font-semibold
              text-[#0F3D2E]
              underline
              underline-offset-2
              hover:text-[#D9A441]
            "
          >
            Terms
          </a>{" "}
          &{" "}
          <a
            href="#"
            className="
              font-bold
              text-[#0F3D2E]
              underline
              underline-offset-2
              hover:text-[#D9A441]
            "
          >
            Privacy Policy
          </a>
          .
        </span>
      </motion.p>

      {/* Active Cooldown Banner */}
      {seconds > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-2xl border border-[#0F3D2E]/15 bg-[#0F3D2E]/5 px-4 py-3 text-xs text-[#0F3D2E]"
        >
          <span className="font-medium text-[#1E2A22]/70">
            OTP already sent to this number
          </span>
          <span className="font-semibold text-[#0F3D2E]">
            Resend in {seconds}s
          </span>
        </motion.div>
      )}

      {/* Send OTP */}
      <motion.button
        type="submit"
        disabled={isLoading}
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
          delay: 0.2,
          ease: "easeOut",
        }}
        whileHover={{
          y: -1,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className="
          relative
          flex
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-full
          bg-gradient-to-r
          from-[#072F22]
          via-[#0F3D2E]
          to-[#0A2E22]
          px-6
          py-3.5
          text-xs
          font-bold
          tracking-[0.18em]
          text-white
          shadow-[0_8px_20px_rgba(15,61,46,0.28)]
          border
          border-[#D9A441]/25
          transition-all
          duration-300
          hover:shadow-xl
          disabled:pointer-events-none
          disabled:opacity-70
          sm:text-sm
        "
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading && (
            <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span>
            {isLoading
              ? "SENDING..."
              : seconds > 0
                ? `CONTINUE TO OTP (${seconds}s)`
                : "SEND OTP"}
          </span>
        </span>

        {!isLoading && (
          <span className="relative z-10">
            →
          </span>
        )}

        {/* Decorative Button Leaf */}
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
      </motion.button>
    </form>
  );
};

export default LoginPhoneForm;