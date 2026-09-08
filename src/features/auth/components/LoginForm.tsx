"use client";

import React, { useState } from "react";
import LoginPhoneForm from "./LoginPhoneForm";
import OtpForm from "./OtpForm";

const LoginForm = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");

  const handleOtpStep = (mobileNumber: string) => {
    setPhone(mobileNumber);
    setShowOtp(true);
  };

  const handleEditNumber = () => {
    setShowOtp(false);
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