"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UseAuthGuardOptions {
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

const useAuthGuard = ({
  requireAuth = false,
  redirectIfAuthenticated = false,
}: UseAuthGuardOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (requireAuth && !isLoggedIn) {
      const redirectPath =
        pathname && pathname !== "/login"
          ? pathname
          : "/";

      router.replace(
        `/login?redirect=${encodeURIComponent(redirectPath)}`
      );

      return;
    }

    if (redirectIfAuthenticated && isLoggedIn) {
      router.replace("/");
    }
  }, [
    requireAuth,
    redirectIfAuthenticated,
    pathname,
    router,
  ]);
};

export default useAuthGuard;