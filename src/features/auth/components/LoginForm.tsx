"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LoginPhoneForm from "./LoginPhoneForm";
import OtpForm from "./OtpForm";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phone, setPhone] = useState("");

  const showOtp = searchParams.get("step") === "otp";

  useEffect(() => {
    const savedPhone = sessionStorage.getItem("auth_phone");

    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  const handleOtpStep = (mobileNumber: string) => {
    sessionStorage.setItem("auth_phone", mobileNumber);
  
    setPhone(mobileNumber);
  
    const redirect = searchParams.get("redirect");
  
    if (
      redirect &&
      redirect.startsWith("/") &&
      !redirect.startsWith("//")
    ) {
      router.push(
        `/login?step=otp&redirect=${encodeURIComponent(
          redirect
        )}`
      );
    } else {
      router.push("/login?step=otp");
    }
  };

  const handleEditNumber = () => {
    sessionStorage.removeItem("auth_phone");

    setPhone("");

    router.push("/login");
  };

  return (
    <AnimatePresence mode="wait">
      {!showOtp ? (
        <motion.div
          key="phone"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <LoginPhoneForm onSuccess={handleOtpStep} />
        </motion.div>
      ) : (
        <motion.div
          key="otp"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <OtpForm
            phone={phone}
            onEditNumber={handleEditNumber}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;