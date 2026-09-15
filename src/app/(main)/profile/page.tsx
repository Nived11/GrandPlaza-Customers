"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import ProfileMain from "@/features/profile/ProfileMain";

export default function ProfilePage() {
  useAuthGuard({
    requireAuth: true,
  });

  return <ProfileMain />;
}