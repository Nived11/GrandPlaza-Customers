"use client";

import useLogin from "./useLogin";

const useResendOtp = (
  phone: string,
  resetTimer: () => void
) => {
  const { login, isLoading } = useLogin();

  const resendOtp = async () => {
    if (!phone || isLoading) return;

    const response = await login(phone);

    if (response) {
      resetTimer();
    }

    return response;
  };

  return {
    resendOtp,
    isResendingOtp: isLoading,
  };
};

export default useResendOtp;