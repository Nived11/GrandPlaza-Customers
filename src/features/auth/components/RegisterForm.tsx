"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useRegister from "../hook/useRegister";

interface RegisterFormProps {
  phone: string;
  onSuccess: (phone: string) => void;
}

const RegisterForm = ({
  phone,
  onSuccess,
}: RegisterFormProps) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [email, setEmail] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { register, isLoading } = useRegister();

  useEffect(() => {
    if (phone) {
      setPhoneNumber(phone);
    }
  }, [phone]);

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

    if (value.length > 10) return;

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      full_name: fullName.trim(),
      phone_number: phoneNumber,
      email: email.trim(),
    };

    const response = await register(data);

    if (response?.status === true) {
      onSuccess(phoneNumber);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Full Name */}
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
          delay: 0.06,
          ease: "easeOut",
        }}
      >
        <label
          htmlFor="fullNameInput"
          className="
            mb-2
            block
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-[#1E2A22]
            sm:text-xs
          "
        >
          Full Name
          <span className="text-[#D9A441]"> *</span>
        </label>

        <motion.div
          animate={
            fullNameError
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
            bg-white
            shadow-sm
            transition-all
            duration-300
            focus-within:border-[#D9A441]
            focus-within:ring-4
            focus-within:ring-[#D9A441]/10
            ${
              fullNameError
                ? "border-red-500"
                : "border-[#0F3D2E]/15"
            }
          `}
        >
          <input
            id="fullNameInput"
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Enter your full name"
            autoComplete="name"
            className="
              w-full
              appearance-none
              bg-transparent
              px-4
              py-3
              text-sm
              font-medium
              text-[#1E2A22]
              placeholder-[#1E2A22]/35
              focus:outline-none
              sm:text-base
            "
          />

          <div className="pr-3.5 text-[#1E2A22]/25">
            <svg
              className="h-4.5 w-4.5 sm:h-5 sm:w-5"
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
        </motion.div>

        {fullNameError && (
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
            {fullNameError}
          </motion.p>
        )}
      </motion.div>

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
          delay: 0.12,
          ease: "easeOut",
        }}
      >
        <label
          htmlFor="phoneInput"
          className="
            mb-2
            block
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
            bg-white
            shadow-sm
            transition-all
            duration-300
            focus-within:border-[#D9A441]
            focus-within:ring-4
            focus-within:ring-[#D9A441]/10
            ${
              phoneError
                ? "border-red-500"
                : "border-[#0F3D2E]/15"
            }
          `}
        >
          {/* Country Code */}
          <div
            className="
              flex
              select-none
              items-center
              gap-1.5
              border-r
              border-[#0F3D2E]/10
              py-3
              pl-3.5
              pr-2.5
              text-sm
              font-semibold
              text-[#1E2A22]
              sm:pl-4
              sm:pr-3
            "
          >
            <span className="text-base">
              🇮🇳
            </span>

            <span>
              +91
            </span>
          </div>

          <input
            id="phoneInput"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phoneNumber}
            onChange={handlePhoneChange}
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
              tracking-wider
              text-[#1E2A22]
              placeholder-[#1E2A22]/35
              focus:outline-none
              sm:text-base
            "
          />

          {/* Phone Icon */}
          <div className="pr-3.5 text-[#1E2A22]/25">
            <svg
              className="h-4.5 w-4.5 sm:h-5 sm:w-5"
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
        </motion.div>

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

      {/* Email */}
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
          delay: 0.18,
          ease: "easeOut",
        }}
      >
        <label
          htmlFor="emailInput"
          className="
            mb-2
            block
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-[#1E2A22]
            sm:text-xs
          "
        >
          Email
          <span className="text-[#D9A441]"> *</span>
        </label>

        <motion.div
          animate={
            emailError
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
            bg-white
            shadow-sm
            transition-all
            duration-300
            focus-within:border-[#D9A441]
            focus-within:ring-4
            focus-within:ring-[#D9A441]/10
            ${
              emailError
                ? "border-red-500"
                : "border-[#0F3D2E]/15"
            }
          `}
        >
          <input
            id="emailInput"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
            autoComplete="email"
            className="
              w-full
              appearance-none
              bg-transparent
              px-4
              py-3
              text-sm
              font-medium
              text-[#1E2A22]
              placeholder-[#1E2A22]/35
              focus:outline-none
              sm:text-base
            "
          />

          {/* Email Icon */}
          <div className="pr-3.5 text-[#1E2A22]/25">
            <svg
              className="h-4.5 w-4.5 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        </motion.div>

        {emailError && (
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
            {emailError}
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
          delay: 0.24,
        }}
        className="
          text-[10px]
          leading-relaxed
          text-[#1E2A22]/55
          sm:text-[11px]
        "
      >
        By creating an account, you agree to Empire Plaza&apos;s{" "}
        <a
          href="#"
          className="
            font-medium
            text-[#0F3D2E]
            underline
            hover:text-[#D9A441]
          "
        >
          Terms
        </a>{" "}
        &{" "}
        <a
          href="#"
          className="
            font-medium
            text-[#0F3D2E]
            underline
            hover:text-[#D9A441]
          "
        >
          Privacy Policy
        </a>
        .
      </motion.p>

      {/* Register Button */}
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
          delay: 0.3,
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
          rounded-2xl
          bg-[#0F3D2E]
          px-6
          py-3.5
          text-xs
          font-medium
          tracking-[0.15em]
          text-white
          shadow-lg
          shadow-[#0F3D2E]/20
          transition-all
          duration-300
          hover:bg-[#0A291E]
          hover:shadow-xl
          disabled:pointer-events-none
          disabled:opacity-70
          sm:text-sm
        "
      >
        <span className="relative z-10">
          {isLoading ? "REGISTERING..." : "REGISTER"}
        </span>

        {!isLoading && (
          <span className="relative z-10">
            →
          </span>
        )}

        {/* Decorative Leaf */}
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

export default RegisterForm;