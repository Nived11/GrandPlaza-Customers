"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

type Props = Pick<InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange" | "onPaste" | "disabled"
> & { error?: string };

// A real, visible input lets iOS offer its keyboard OTP suggestion. Decorative
// slots over an almost transparent input are unreliable for native autofill.
const OtpCodeInput = forwardRef<HTMLInputElement, Props>(function OtpCodeInput(
  { id, error, ...props }, ref
) {
  return (
    <div className="mb-5 w-full">
      <label htmlFor={id} className="sr-only">6-digit verification code</label>
      <input
        {...props}
        ref={ref}
        id={id}
        name="one-time-code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        autoCapitalize="off"
        spellCheck={false}
        pattern="[0-9]{6}"
        maxLength={6}
        required
        autoFocus
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
        placeholder="6-digit code"
        className={`block h-14 w-full rounded-xl border bg-white/90 px-4 text-center text-2xl font-semibold tracking-[0.45em] text-[#1E2A22] outline-none transition-shadow placeholder:text-sm placeholder:font-normal placeholder:tracking-normal focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20 disabled:opacity-60 ${error ? "border-red-400" : "border-[#1E2A22]/20"}`}
      />
      <p id={`${id}-hint`} className="mt-2 text-center text-xs text-[#1E2A22]/60">
        Tap the code above your keyboard, or paste it from your SMS.
      </p>
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-center text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default OtpCodeInput;
