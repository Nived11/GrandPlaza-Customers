import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "./firebaseClient";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    firebaseConfirmationResult?: ConfirmationResult;
  }
}

/**
 * Initializes or re-initializes invisible reCAPTCHA for Firebase Phone Auth.
 */
export const getRecaptchaVerifier = (
  containerId: string = "recaptcha-container"
): RecaptchaVerifier | null => {
  if (typeof window === "undefined") return null;

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`reCAPTCHA container '#${containerId}' not found in DOM`);
  }

  // Clear existing verifier if any to prevent duplicate widget errors
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      console.warn("Could not clear recaptchaVerifier:", e);
    }
    window.recaptchaVerifier = undefined;
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      console.log("reCAPTCHA verified automatically");
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired, please try again");
    },
  });

  window.recaptchaVerifier = verifier;
  return verifier;
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

  // Ensure +91 country prefix
  const digits = phoneNumber.replace(/\D/g, "").slice(-10);
  const formattedNumber = `+91${digits}`;

  const verifier = getRecaptchaVerifier(containerId);
  if (!verifier) {
    throw new Error("Unable to initialize reCAPTCHA verifier");
  }

  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      formattedNumber,
      verifier
    );
    window.firebaseConfirmationResult = confirmation;
    return confirmation;
  } catch (error: any) {
    console.error("Firebase send OTP error:", error);
    // If verifier was tainted, reset it
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
