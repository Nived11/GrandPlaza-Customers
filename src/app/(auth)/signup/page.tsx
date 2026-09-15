"use client";

import RegisterMain from "@/features/auth/RegisterMain";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function SignupPage() {
  useAuthGuard({
    redirectIfAuthenticated: true,
  });

  return <RegisterMain />;
}