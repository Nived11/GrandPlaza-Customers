"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./components/LoginForm";

const LoginMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const showOtp = searchParams.get("step") === "otp";

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#FAF5EB] font-sans selection:bg-[#0F3D2E] selection:text-white">
      {/* Firebase Invisible reCAPTCHA Anchor */}
      <div id="recaptcha-container"></div>

      {/* ========================================================
          1. MOBILE LAYOUT (Exactly as in User's Mobile UI Screenshot)
      ======================================================== */}
      <div className="flex flex-col min-h-[100dvh] w-full lg:hidden relative overflow-x-hidden overflow-y-auto">
        {/* Top Hero Image Banner */}
        <div className="relative w-full h-[44vh] min-h-[290px] max-h-[380px] overflow-hidden flex-shrink-0">
          <Image
            src="/login-mobile-bg.png"
            alt="Empire Plaza Ambiance"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />

          {/* Back to Home Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute left-4 top-4 z-30 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] shadow-sm border border-white/50 active:scale-95 transition-all"
          >
            <span className="text-xs">←</span>
            <span>Back to Home</span>
          </button>

          {/* Gold Logo on the Green Architectural Wall */}
          <div className="absolute right-5 top-[24%] sm:top-[26%] z-20 pointer-events-none">
            <img
              src="/empiregoldlogo.png"
              alt="Empire Plaza"
              className="w-[125px] sm:w-[145px] h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>

        {/* Bottom Wavy Cream Card */}
        <div className="relative z-20 -mt-10 w-full flex-1 flex flex-col justify-between bg-[#FAF5EB] rounded-t-[36px] shadow-[0_-12px_35px_rgba(0,0,0,0.16)] px-5 sm:px-8 pt-5 pb-7 overflow-hidden">
          {/* Top Decorative Organic Wave with Dual Gold Outline */}
          <div className="absolute -top-[23px] left-0 right-0 w-full h-[24px] pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 500 30"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M 0,20 C 110,6 230,28 370,12 C 430,4 475,16 500,18 L 500,30 L 0,30 Z"
                fill="#FAF5EB"
              />
              <path
                d="M 0,20 C 110,6 230,28 370,12 C 430,4 475,16 500,18"
                fill="none"
                stroke="#E2B755"
                strokeWidth="2.5"
              />
              <path
                d="M 0,23 C 110,9 230,31 370,15 C 430,7 475,19 500,21"
                fill="none"
                stroke="#D9A441"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
            </svg>
          </div>

          {/* Golden Leaves Botanical Watermarks */}
          <img
            src="/leaf2.png"
            alt=""
            aria-hidden="true"
            className="absolute -top-6 -left-6 w-32 sm:w-40 h-auto opacity-35 pointer-events-none -rotate-12 select-none"
          />
          <img
            src="/leaf3.png"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 w-36 sm:w-44 h-auto opacity-30 pointer-events-none select-none"
          />

          {/* Mobile Card Content */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] mx-auto flex flex-col">
            {/* Brand Logo & Leaves */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center mb-3"
            >
              <img
                src="/images/auth/leaficon.png"
                alt=""
                className="h-8 w-8 object-contain -mb-2.5"
              />
              <img
                src="/empireplaza.png"
                alt="Empire Plaza"
                className="w-[145px] sm:w-[160px] h-auto object-contain drop-shadow-sm"
              />
            </motion.div>

            {/* Tab Switcher: Sign In / Create Account */}
            {!showOtp && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="w-full mb-4 rounded-full bg-[#EFE8D8] p-1 border border-[#D9A441]/25 flex items-center shadow-inner"
              >
                {/* Sign In (Active) */}
                <div className="flex-1 text-center py-2 rounded-full bg-[#0F3D2E] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm relative">
                  <span>Sign In</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#D9A441] rounded-full" />
                </div>

                {/* Create Account (Navigates to /signup) */}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="flex-1 text-center py-2 rounded-full text-[#1E2A22]/75 hover:text-[#0F3D2E] text-xs sm:text-sm font-semibold tracking-wide transition-colors"
                >
                  <span>Create Account</span>
                </button>
              </motion.div>
            )}

            {/* Mobile Form */}
            <div className="w-full">
              <LoginForm />
            </div>

            {/* Bottom Subtle Golden Accent Ribbon */}
            <div className="mt-4 flex justify-center opacity-40">
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D9A441] to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. LAPTOP / DESKTOP LAYOUT (Exactly as in User's Laptop Screenshot + Requested Left Text)
      ======================================================== */}
      <div className="hidden lg:flex min-h-screen w-full relative overflow-hidden bg-[#FBF6EC]">
        {/* Full-width Background Image (Food on left, curved line, cream on right) */}
        <Image
          src="/images/auth/authbg.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />

        {/* Back to Home Button (Top Left) */}
        <motion.button
          type="button"
          onClick={() => router.push("/")}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute left-8 top-8 z-30 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D2E] shadow-sm hover:bg-white hover:text-[#D9A441] active:scale-95 transition-all"
        >
          <span>←</span>
          <span>Back to Home</span>
        </motion.button>

        {/* LEFT SIDE: Elegant Branding, Quote & Stats (Upper Area) */}
        <div className="w-[52%] h-screen flex flex-col justify-start pt-24 xl:pt-28 px-12 xl:px-16 2xl:px-20 relative z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="pointer-events-auto max-w-[460px]"
          >
            {/* Empire Gold Logo */}
            <div className="mb-4">
              <img
                src="/empiregoldlogo.png"
                alt="Empire Plaza"
                className="w-[170px] xl:w-[200px] h-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
              />
            </div>

            {/* Tagline */}
            <p className="text-[#E7AA31] text-[10px] xl:text-[11px] font-bold tracking-[0.25em] uppercase mb-2 drop-shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7AA31]" />
              <span>Royal Heritage • Authentic Taste</span>
            </p>

            {/* Heading */}
            <h2 className="font-serif text-2xl xl:text-3xl 2xl:text-4xl text-white font-medium leading-[1.2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              The Finest Flavours,<br />
              <span className="italic text-[#E7AA31] font-serif">Curated for Connoisseurs.</span>
            </h2>

            {/* Quote with Gold Left Border */}
            <div className="mt-5 border-l-2 border-[#E7AA31] pl-4 py-1.5 bg-black/25 backdrop-blur-sm rounded-r-xl max-w-[420px]">
              <p className="text-white/85 text-xs xl:text-[13px] italic leading-relaxed drop-shadow-sm font-light">
                &ldquo;Every dish is an invitation to celebrate centuries of authentic hospitality and culinary perfection.&rdquo;
              </p>
            </div>

            {/* Stats Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/15 shadow-sm">
                <span className="text-xs font-bold text-[#E7AA31]">★ 4.9</span>
                <span className="text-[10px] text-white/75 font-semibold tracking-wide uppercase">Top Rated</span>
              </div>

              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/15 shadow-sm">
                <span className="text-xs font-bold text-[#E7AA31]">30 MIN</span>
                <span className="text-[10px] text-white/75 font-semibold tracking-wide uppercase">Fast Delivery</span>
              </div>

              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/15 shadow-sm">
                <span className="text-xs font-bold text-[#E7AA31]">100%</span>
                <span className="text-[10px] text-white/75 font-semibold tracking-wide uppercase">Fresh & Hot</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Auth Card on Cream Area */}
        <div className="w-[48%] h-screen flex items-center justify-center p-8 xl:p-12 relative z-20 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-[420px] xl:max-w-[450px]"
          >
            {/* Leaf Icon */}
            <div className="mb-2 flex justify-center">
              <img
                src="/images/auth/leaficon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain -mb-4"
              />
            </div>

            {/* Brand Logo */}
            <div className="mb-3.5 flex justify-center">
              <img
                src="/empireplaza.png"
                alt="Empire Plaza"
                className="w-[165px] lg:w-[175px] h-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Welcome Heading (Hidden when OTP is active) */}
            {!showOtp && (
              <div className="mb-5 text-center">
                <h1 className="font-serif text-3xl xl:text-4xl font-medium tracking-tight text-[#0F3D2E]">
                  Welcome Back
                </h1>
                <p className="mt-2 text-xs xl:text-sm text-[#1E2A22]/60">
                  Your food journey starts here.
                </p>
                <div className="mx-auto mt-3.5 h-[2px] w-12 bg-[#D9A441]" />
              </div>
            )}

            {/* Tab Switcher (Hidden when OTP is active) */}
            {!showOtp && (
              <div className="mb-6 flex h-[48px] w-full rounded-full border border-[#0F3D2E]/10 bg-white/50 p-1">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center rounded-full bg-[#0F3D2E] text-xs font-semibold uppercase tracking-wider text-white shadow-sm"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="flex flex-1 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wider text-[#1E2A22]/70 hover:text-[#0F3D2E] transition-colors"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Form */}
            <div className="w-full">
              <LoginForm />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default LoginMain;