import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "./firebaseClient";
import { markSmsOtpReady, startSmsOtp, stopSmsOtp } from "./smsOtp";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    firebaseConfirmationResult?: ConfirmationResult;
  }
}

/**
 * Returns a stable singleton invisible reCAPTCHA verifier.
 */
export const getRecaptchaVerifier = (
  containerId: string = "recaptcha-container"
): RecaptchaVerifier => {
  if (typeof window === "undefined") {
    throw new Error("Window is not defined");
  }

  if (!window.recaptchaVerifier) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`reCAPTCHA container '#${containerId}' not found in DOM`);
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA solved");
      },
      "expired-callback": () => {
        console.warn("reCAPTCHA expired, resetting");
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
          } catch (e) {}
          window.recaptchaVerifier = undefined;
        }
      },
    });
  }

  return window.recaptchaVerifier;
};

/**
 * Sends a real SMS OTP via Firebase to the user's phone number.
 */
export const sendFirebaseOtp = async (
  phoneNumber: string,
  containerId: string = "recaptcha-container"
): Promise<ConfirmationResult> => {
  if (typeof window === "undefined") {
    throw new Error("Window is not defined");
  }

  // Ensure 10-digit clean number with +91 country prefix
  const digits = phoneNumber.replace(/\D/g, "").slice(-10);
  const formattedNumber = `+91${digits}`;

  const verifier = getRecaptchaVerifier(containerId);
  const reception = startSmsOtp(phoneNumber);

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      formattedNumber,
      verifier
    );
    window.firebaseConfirmationResult = confirmation;
    // A fast SMS may arrive before Firebase returns its confirmation session.
    // Only release the code once confirmation can safely use this new session.
    markSmsOtpReady(reception);
    return confirmation;
  } catch (error: any) {
    stopSmsOtp(phoneNumber);
    console.error("Firebase send OTP error details:", error);
    // Reset verifier so subsequent attempts don't fail with stale widget
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {}
      window.recaptchaVerifier = undefined;
    }
    throw error;
  }
};

/**
 * Confirms the entered OTP with Firebase and returns the Firebase ID token.
 */
export const confirmFirebaseOtp = async (otpCode: string) => {
  if (typeof window === "undefined") {
    throw new Error("Window is not defined");
  }

  if (!window.firebaseConfirmationResult) {
    throw new Error(
      "OTP session expired or not found. Please click 'Resend OTP'."
    );
  }

  const userCredential = await window.firebaseConfirmationResult.confirm(otpCode);
  const idToken = await userCredential.user.getIdToken(true);

  return {
    user: userCredential.user,
    idToken,
    phoneNumber: userCredential.user.phoneNumber,
  };
};
