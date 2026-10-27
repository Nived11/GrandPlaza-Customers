"use client";

import { useEffect } from "react";
import { subscribeSmsOtp } from "@/lib/smsOtp";

export default function useSmsOtp(phone: string, onCode: (code: string) => void) {
  useEffect(() => {
    if (!phone) return;
    // Unsubscribe on unmount. Reception has a bounded lifetime and is also
    // cancelled by verify/edit/resend. Preserve a buffered code across the
    // React StrictMode cleanup/remount cycle and the phone-to-code handover.
    return subscribeSmsOtp(phone, onCode);
  }, [phone, onCode]);
}
