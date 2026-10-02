"use client";

import PaymentMain from "@/features/payment/PaymentMain";
import useAuthGuard from "@/hooks/useAuthGuard";

const PaymentPage = () => {
  const { isAuthorized } = useAuthGuard({
    requireAuth: true,
  });

  if (!isAuthorized) {
    return null;
  }

  return <PaymentMain />;
};

export default PaymentPage;