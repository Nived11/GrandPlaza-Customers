"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    <>
      {!showOtp ? (
        <LoginPhoneForm onSuccess={handleOtpStep} />
      ) : (
        <OtpForm
          phone={phone}
          onEditNumber={handleEditNumber}
        />
      )}
    </>
  );
};

export default LoginForm;