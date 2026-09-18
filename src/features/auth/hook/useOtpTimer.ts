"use client";

import { useEffect, useState } from "react";

const useOtpTimer = (initialSeconds = 30) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(initialSeconds);
  };

  return {
    seconds,
    resetTimer,
  };
};

export default useOtpTimer;