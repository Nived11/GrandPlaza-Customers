"use client";

import { useEffect, useState } from "react";
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

  const [isAuthorized, setIsAuthorized] = useState(false);

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

      setIsAuthorized(false);
      return;
    }

    if (redirectIfAuthenticated && isLoggedIn) {
      router.replace("/");
      return;
    }

    setIsAuthorized(true);
  }, [
    requireAuth,
    redirectIfAuthenticated,
    pathname,
    router,
  ]);

  return {
    isAuthorized,
  };
};

export default useAuthGuard;