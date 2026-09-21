"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./components/LoginForm";

const LoginMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const showOtp = searchParams.get("step") === "otp";

  /*
   * Preload BOTH mobile backgrounds immediately.
   * This prevents the OTP image from waiting for the
   * Send OTP button to be clicked before downloading.
   */
  useEffect(() => {
    const defaultMobileImage = new Image();
    const otpMobileImage = new Image();

    defaultMobileImage.src = "/images/auth/authbg_mobile.png";
    otpMobileImage.src = "/images/auth/authbg_mobile_otp.png";
  }, []);

  return (
    <main className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden bg-[#FBF6EC]">
      {/* Full Screen Background */}
      <div className="fixed inset-0 z-0 h-full w-full">

        {/* Desktop Background */}
        <img
          src="/images/auth/authbg.png"
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            hidden
            h-full
            w-full
            object-cover
            object-center
            lg:block
          "
        />

        {/* Mobile Background */}
        <div
          className="
            absolute
            inset-0
            overflow-hidden
            lg:hidden
          "
        >
          <AnimatePresence
            mode="sync"
            initial={false}
          >
            {showOtp ? (
              <motion.img
                key="otp-mobile-background"
                src="/images/auth/authbg_mobile_otp.png"
                alt=""
                aria-hidden="true"
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "0%",
                }}
                exit={{
                  x: "100%",
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            ) : (
              <motion.img
                key="login-mobile-background"
                src="/images/auth/authbg_mobile.png"
                alt=""
                aria-hidden="true"
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "0%",
                }}
                exit={{
                  x: "100%",
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            )}
          </AnimatePresence>

          {/* Preload both images */}
          <img
            src="/images/auth/authbg_mobile.png"
            alt=""
            aria-hidden="true"
            className="hidden"
          />

          <img
            src="/images/auth/authbg_mobile_otp.png"
            alt=""
            aria-hidden="true"
            className="hidden"
          />
        </div>
      </div>

      {/* Back to Home */}
      <motion.button
        type="button"
        onClick={() => router.push("/")}
        initial={{
          opacity: 0,
          y: -8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          absolute
          right-5
          top-5
          z-30
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[#1E2A22]
          transition-colors
          hover:text-[#0F3D2E]
          sm:right-8
          sm:top-7
          lg:right-12
          lg:top-8
          xl:right-16
          2xl:right-20
        "
      >
        <ArrowLeft
          size={18}
          strokeWidth={1.7}
        />

        <span>Back to Home</span>
      </motion.button>

      {/* Auth Content */}
      <section
        className="
          relative
          z-20
          flex
          h-full
          max-h-full
          w-full
          items-center
          justify-center
          overflow-hidden
          px-4
          py-2
          pt-40
          sm:px-8
          sm:py-4
          lg:items-center
          lg:justify-end
          lg:px-14
          lg:py-0
          xl:px-20
          2xl:px-28
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="
            relative
            w-full
            max-w-[430px]
            lg:max-w-[450px]
            xl:max-w-[470px]
          "
        >

          {/* =====================================================
              1. LEAF ICON
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.05,
            }}
            className="
              mb-2
              flex
              justify-center
            "
          >
            <img
              src="/images/auth/leaficon.png"
              alt=""
              aria-hidden="true"
              className="
                h-8
                w-8
                object-contain
                sm:h-9
                sm:w-9
                -mb-4
              "
            />
          </motion.div>

          {/* =====================================================
              2. COMPANY LOGO
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              mb-4
              flex
              justify-center
              lg:mb-5
            "
          >
            <img
              src="/empireplaza.png"
              alt="Empire Plaza"
              className="
                h-auto
                w-[145px]
                object-contain
                drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]
                sm:w-[165px]
                sm:drop-shadow-none
                lg:w-[175px]
                xl:w-[185px]
              "
            />
          </motion.div>

          {/* =====================================================
              3. WELCOME HEADING
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
            }}
            className="
              mb-6
              text-center
            "
          >
            <h1
              className="
                font-serif
                text-4xl
                font-medium
                leading-none
                tracking-tight
                text-[#0F3D2E]
                sm:text-5xl
                lg:text-[52px]
              "
            >
              Welcome Back
            </h1>

            <p
              className="
                mt-3
                text-sm
                text-[#1E2A22]/60
                sm:text-base
              "
            >
              Your food journey starts here.
            </p>

            {/* Gold Divider */}
            <div
              className="
                mx-auto
                mt-5
                h-[2px]
                w-12
                bg-[#D9A441]
              "
            />
          </motion.div>

          {/* =====================================================
              4. SIGN IN / CREATE ACCOUNT
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.15,
            }}
            className="
              mb-6
              flex
              h-[52px]
              w-full
              rounded-full
              border
              border-[#0F3D2E]/10
              bg-white/45
              p-0.5
              sm:mb-7
            "
          >
            {/* Sign In */}
            <button
              type="button"
              className="
                flex
                flex-1
                items-center
                justify-center
                rounded-full
                bg-[#0F3D2E]
                text-sm
                font-medium
                text-white
                shadow-sm
              "
            >
              Sign In
            </button>

            {/* Create Account */}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="
                flex
                flex-1
                items-center
                justify-center
                rounded-full
                text-sm
                font-medium
                text-[#1E2A22]
                transition-colors
                hover:text-[#0F3D2E]
              "
            >
              Create Account
            </button>
          </motion.div>

          {/* =====================================================
              5. LOGIN FORM
          ===================================================== */}
          <div className="w-full">
            <LoginForm />
          </div>

        </motion.div>
      </section>
    </main>
  );
};

export default LoginMain; 