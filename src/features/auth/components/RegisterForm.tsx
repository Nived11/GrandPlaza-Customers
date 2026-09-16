"use client";

import React, { useState } from "react";
import useRegister from "../hook/useRegister";
import { useRouter, useSearchParams } from "next/navigation";

interface RegisterFormProps {
  onSuccess: (phone: string) => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const router = useRouter();

  const { register, isLoading } = useRegister();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateForm = () => {
    let isValid = true;

    setFullNameError("");
    setPhoneError("");
    setEmailError("");

    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      isValid = false;
    }

    if (!phoneNumber) {
      setPhoneError("Mobile number is required");
      isValid = false;
    } else if (phoneNumber.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      setPhoneError("Enter a valid mobile number");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    return isValid;
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) {
      return;
    }

    setPhoneNumber(value);

    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleFullNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullName(e.target.value);

    if (fullNameError) {
      setFullNameError("");
    }
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);

    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      full_name: fullName.trim(),
      phone_number: phoneNumber,
      email: email.trim(),
    };

    console.log("REGISTER REQUEST:", data);

    const response = await register(data);

    console.log("REGISTER RESPONSE:", response);

    if (response?.status === true) {
      console.log(
        "OTP SUCCESS - SWITCHING TO OTP SECTION"
      );

      onSuccess(phoneNumber);
    }
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
          Create{" "}
          <span className="italic font-serif font-normal lowercase tracking-normal text-[#0F3D2E]">
            Account
          </span>
        </h2>

        <p className="text-[#1E2A22]/60 text-xs sm:text-sm mt-2.5 leading-relaxed">
          Enter your details to create your Empire Plaza account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-2 md:space-y-4"
      >
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullNameInput"
            className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1E2A22] mb-2"
          >
            Full Name
            <span className="text-[#D9A441]"> *</span>
          </label>

          <div
            className={`relative flex items-center bg-white rounded-2xl border shadow-sm transition-all duration-300 focus-within:border-[#D9A441] focus-within:ring-4 focus-within:ring-[#D9A441]/10 ${
              fullNameError
                ? "border-red-500"
                : "border-[#0F3D2E]/15"
            }`}
          >
            <input
              id="fullNameInput"
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              onBlur={validateForm}
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full appearance-none py-3 px-4 bg-transparent text-[#1E2A22] text-sm sm:text-base font-medium placeholder-[#1E2A22]/35 focus:outline-none"
            />

            <div className="pr-3.5 text-[#1E2A22]/25">
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 21a8 8 0 00-16 0M12 13a4 4 0 100-8 4 4 0 000 8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {fullNameError && (
            <p className="mt-2 text-[10px] sm:text-[11px] text-red-600">
              {fullNameError}
            </p>
          )}
        </div>

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
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={validateForm}
              placeholder="Enter 10 digit number"
              autoComplete="tel"
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
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2 0 002-2z"
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

        {/* Email */}
        <div>
          <label
            htmlFor="emailInput"
            className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1E2A22] mb-2"
          >
            Email
            <span className="text-[#D9A441]"> *</span>
          </label>

          <div
            className={`relative flex items-center bg-white rounded-2xl border shadow-sm transition-all duration-300 focus-within:border-[#D9A441] focus-within:ring-4 focus-within:ring-[#D9A441]/10 ${
              emailError
                ? "border-red-500"
                : "border-[#0F3D2E]/15"
            }`}
          >
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateForm}
              placeholder="Enter your email address"
              autoComplete="email"
              className="w-full appearance-none py-3 px-4 bg-transparent text-[#1E2A22] text-sm sm:text-base font-medium placeholder-[#1E2A22]/35 focus:outline-none"
            />

            <div className="pr-3.5 text-[#1E2A22]/25">
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2 0 002-2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {emailError && (
            <p className="mt-2 text-[10px] sm:text-[11px] text-red-600">
              {emailError}
            </p>
          )}
        </div>

        {/* Terms */}
        <p className="text-[10px] sm:text-[11px] text-[#1E2A22]/55 leading-relaxed">
          By creating an account, you agree to Empire Plaza&apos;s{" "}
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

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0F3D2E] hover:bg-[#0A291E] text-white py-3.5 px-6 rounded-2xl font-medium text-xs sm:text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#0F3D2E]/20 hover:shadow-xl transition-all duration-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>
            {isLoading ? "REGISTERING..." : "REGISTER"}
          </span>

          <span>→</span>
        </button>
      </form>
    </>
  );
};

export default RegisterForm;