"use client";

import React, { useState } from "react";
import useLogin from "../hoock/useLogin";

interface LoginPhoneFormProps {
  onSuccess: (phone: string) => void;
}

const LoginPhoneForm = ({
  onSuccess,
}: LoginPhoneFormProps) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { login, isLoading } = useLogin();

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("Mobile number is required");
      return false;
    }

    if (phone.length !== 10) {
      setPhoneError(
        "Enter a valid 10-digit mobile number"
      );
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

    const response = await login(phone);
    
    if (!response) return;
        
    onSuccess(phone);
  };

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

      <form
        onSubmit={handleSubmit}
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

          <div
            className={`relative flex items-center bg-white rounded-2xl border shadow-sm transition-all duration-300 focus-within:border-[#D9A441] focus-within:ring-4 focus-within:ring-[#D9A441]/10 ${
              phoneError
                ? "border-red-500"
                : "border-[#0F3D2E]/15"
            }`}
          >
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
              onChange={handlePhoneChange}
              onBlur={validatePhone}
              placeholder="Enter 10 digit number"
              className="w-full appearance-none py-3 px-3 bg-transparent text-[#1E2A22] text-sm sm:text-base font-medium placeholder-[#1E2A22]/35 focus:outline-none tracking-wider"
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
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2 0 2 0 002-2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {phoneError && (
            <p className="mt-2 text-[10px] sm:text-[11px] text-red-600">
              {phoneError}
            </p>
          )}
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
          disabled={isLoading}
          className="w-full bg-[#0F3D2E] hover:bg-[#0A291E] disabled:opacity-70 disabled:pointer-events-none text-white py-3.5 px-6 rounded-2xl font-medium text-xs sm:text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#0F3D2E]/20 hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
        >
          <span>
            {isLoading ? "SENDING..." : "SEND OTP"}
          </span>

          {!isLoading && <span>→</span>}
        </button>
      </form>
    </>
  );
};

export default LoginPhoneForm;