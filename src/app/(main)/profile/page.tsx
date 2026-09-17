"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import ProfileMain from "@/features/profile/ProfileMain";

export default function ProfilePage() {
  const { isAuthorized } = useAuthGuard({
    requireAuth: true,
  });
  
  if (!isAuthorized) {
    return null;
  }

  return <ProfileMain />;
}