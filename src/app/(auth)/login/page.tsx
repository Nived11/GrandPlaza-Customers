"use client";

import LoginMain from "@/features/auth/LoginMain";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function LoginPage() {
  useAuthGuard({
    redirectIfAuthenticated: true,
  });

  return <LoginMain />;
}