"use client";

import React, { useEffect, useRef, useState } from "react";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);
  const [seconds, setSeconds] = useState(24);
  const [isVerifying, setIsVerifying] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  /*
   * OTP countdown
   */
  useEffect(() => {
    if (!showOtp || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [showOtp, seconds]);

  /*
   * Send OTP
   * API will be connected later.
   */
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length !== 10) return;

    setShowOtp(true);
    setSeconds(24);
    setOtp(["", "", "", "", "", ""]);

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 500);
  };

  /*
   * OTP input
   */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /*
   * OTP backspace navigation
   */
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /*
   * Verify OTP
   * API will be connected later.
   */
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) return;

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
    }, 1200);
  };

  /*
   * Resend OTP
   * API will be connected later.
   */
  const handleResend = () => {
    setSeconds(24);
    setOtp(["", "", "", "", "", ""]);

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  /*
   * Return to phone number
   */
  const editNumber = () => {
    setShowOtp(false);

    setTimeout(() => {
      document.getElementById("phoneInput")?.focus();
    }, 500);
  };

  const formattedPhone = phone.replace(
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
          Sign In to{" "}
          <span className="italic font-serif font-normal lowercase tracking-normal text-[#0F3D2E]">
            Continue
          </span>
        </h2>

        <p className="text-[#1E2A22]/60 text-xs sm:text-sm mt-2.5 leading-relaxed">
          Enter your mobile number to continue.
        </p>
      </div>

      {/* Filmstrip */}
      <div className="overflow-hidden w-full relative">
        <div
          className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
            showOtp
              ? "-translate-x-1/2"
              : "translate-x-0"
          }`}
        >
          {/* ================= PHONE ================= */}
          <div className="w-1/2 flex-shrink-0 pr-2.5 sm:pr-3.5">
            <form
              onSubmit={handleSendOtp}
              className="space-y-4"
            >
              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="phoneInput"
                  className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1E2A22] mb-2"
                >
                  Mobile Number
                  <span className="text-[#D9A441]"> *</span>
                </label>

                <div className="relative flex items-center bg-white rounded-2xl border border-[#0F3D2E]/15 shadow-sm transition-all duration-300 focus-within:border-[#D9A441] focus-within:ring-4 focus-within:ring-[#D9A441]/10">
                  {/* Country Code */}
                  <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 sm:pl-4 sm:pr-3 py-3 border-r border-[#0F3D2E]/10 text-[#1E2A22] font-semibold text-sm select-none">
                    <span className="text-base">🇮🇳</span>
                    <span>+91</span>
                  </div>

                  {/* Input */}
                  <input
                    id="phoneInput"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="Enter 10 digit number"
                    required
                    className="w-full py-3 px-3 bg-transparent text-[#1E2A22] text-sm sm:text-base font-medium placeholder-[#1E2A22]/35 focus:outline-none tracking-wider"
                  />

                  {/* Phone Icon */}
                  <div className="pr-3.5 text-[#1E2A22]/25">
                    <svg
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-[10px] sm:text-[11px] text-[#1E2A22]/55 leading-relaxed">
                By continuing, you agree to Empire Plaza&apos;s{" "}
                <a
                  href="#"
                  className="underline text-[#0F3D2E] hover:text-[#D9A441] font-medium"
                >
                  Terms
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="underline text-[#0F3D2E] hover:text-[#D9A441] font-medium"
                >
                  Privacy Policy
                </a>
                .
              </p>

              {/* Send OTP */}
              <button
                type="submit"
                className="w-full bg-[#0F3D2E] hover:bg-[#0A291E] text-white py-3.5 px-6 rounded-2xl font-medium text-xs sm:text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#0F3D2E]/20 hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
              >
                <span>SEND OTP</span>
                <span>→</span>
              </button>
            </form>
          </div>

          {/* ================= OTP ================= */}
          <div className="w-1/2 flex-shrink-0 pl-2.5 sm:pl-3.5">
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-4"
            >
              {/* OTP Heading */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1E2A22]">
                    Verification Code
                  </label>

                  <button
                    type="button"
                    onClick={editNumber}
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
                        otpRefs.current[index] = element;
                      }}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
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
                      className="w-9 h-11 sm:w-11 sm:h-12 text-center text-lg font-bold text-[#1E2A22] bg-white rounded-xl border border-[#0F3D2E]/15 shadow-sm transition-all focus:outline-none focus:border-[#D9A441] focus:ring-4 focus:ring-[#D9A441]/10"
                    />
                  ))}
                </div>
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

              {/* Verify */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;