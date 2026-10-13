/**
 * Utility to manage per-phone OTP cooldown timer (45 seconds).
 * Prevents re-sending OTP to the same number when user navigates back and forth.
 */

const COOLDOWN_KEY_PREFIX = "otp_cooldown_end_";
export const DEFAULT_OTP_COOLDOWN_SECONDS = 45;

export const getCleanPhone = (phone?: string): string => {
  let raw = phone;
  if (!raw && typeof window !== "undefined") {
    raw =
      sessionStorage.getItem("auth_phone") ||
      sessionStorage.getItem("register_phone") ||
      "";
  }
  if (!raw) return "";
  return raw.replace(/\D/g, "").slice(-10);
};

export const getOtpRemainingCooldown = (phone?: string): number => {
  if (typeof window === "undefined" || !phone) return 0;
  const clean = getCleanPhone(phone);
  if (!clean) return 0;

  const storedEnd = sessionStorage.getItem(`${COOLDOWN_KEY_PREFIX}${clean}`);
  if (!storedEnd) return 0;

  const endTime = parseInt(storedEnd, 10);
  if (isNaN(endTime)) return 0;

  const remaining = Math.ceil((endTime - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
};

export const setOtpCooldown = (
  phone?: string,
  durationSeconds: number = DEFAULT_OTP_COOLDOWN_SECONDS
): void => {
  if (typeof window === "undefined" || !phone) return;
  const clean = getCleanPhone(phone);
  if (!clean) return;

  const endTime = Date.now() + durationSeconds * 1000;
  sessionStorage.setItem(`${COOLDOWN_KEY_PREFIX}${clean}`, endTime.toString());
};

export const clearOtpCooldown = (phone?: string): void => {
  if (typeof window === "undefined" || !phone) return;
  const clean = getCleanPhone(phone);
  if (!clean) return;

  sessionStorage.removeItem(`${COOLDOWN_KEY_PREFIX}${clean}`);
};
