"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DEFAULT_OTP_COOLDOWN_SECONDS,
  getOtpRemainingCooldown,
  setOtpCooldown,
} from "@/utils/otpCooldown";

const useOtpTimer = (
  phone?: string,
  initialSeconds = DEFAULT_OTP_COOLDOWN_SECONDS
) => {
  const [timerKey, setTimerKey] = useState(0);

  const getEffectivePhone = useCallback(() => {
    if (phone) return phone;
    if (typeof window !== "undefined") {
      return (
        sessionStorage.getItem("auth_phone") ||
        sessionStorage.getItem("register_phone") ||
        ""
      );
    }
    return "";
  }, [phone]);

  const [seconds, setSeconds] = useState<number>(() => {
    const target = getEffectivePhone();
    return target ? getOtpRemainingCooldown(target) : 0;
  });

  useEffect(() => {
    const target = getEffectivePhone();
    if (!target) {
      setSeconds(0);
      return;
    }

    const currentRem = getOtpRemainingCooldown(target);
    setSeconds(currentRem);

    if (currentRem <= 0) return;

    const timer = setInterval(() => {
      const rem = getOtpRemainingCooldown(target);
      setSeconds(rem);
      if (rem <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [phone, getEffectivePhone, timerKey]);

  const resetTimer = useCallback(() => {
    const target = getEffectivePhone();
    if (target) {
      setOtpCooldown(target, initialSeconds);
    }
    setSeconds(initialSeconds);
    setTimerKey((k) => k + 1);
  }, [getEffectivePhone, initialSeconds]);

  return {
    seconds,
    resetTimer,
  };
};

export default useOtpTimer;