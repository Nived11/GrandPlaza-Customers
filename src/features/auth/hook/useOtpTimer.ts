"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_OTP_COOLDOWN_SECONDS,
  getOtpRemainingCooldown,
  setOtpCooldown,
} from "@/utils/otpCooldown";

const useOtpTimer = (
  phone?: string,
  initialSeconds = DEFAULT_OTP_COOLDOWN_SECONDS
) => {
  const [seconds, setSeconds] = useState(() => {
    return phone ? getOtpRemainingCooldown(phone) : 0;
  });

  useEffect(() => {
    if (!phone) return;
    const rem = getOtpRemainingCooldown(phone);
    setSeconds(rem);
  }, [phone]);

  useEffect(() => {
    if (seconds <= 0 || !phone) return;

    const timer = setInterval(() => {
      const rem = getOtpRemainingCooldown(phone);
      setSeconds(rem);
      if (rem <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds > 0, phone]);

  const resetTimer = () => {
    if (phone) {
      setOtpCooldown(phone, initialSeconds);
    }
    setSeconds(initialSeconds);
  };

  return {
    seconds,
    resetTimer,
  };
};

export default useOtpTimer;