"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

import RegisterForm from "./components/RegisterForm";
import RegisterOtpForm from "./components/RegisterOtpForm";

const RegisterMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const showOtp =
    searchParams.get("step") === "otp";

  const [phone, setPhone] = useState("");

  /*
   * Restore registered phone number
   */
  useEffect(() => {
    const savedPhone =
      sessionStorage.getItem("register_phone");

    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  /*
   * Registration successful
   */
  const handleRegisterSuccess = (
    mobileNumber: string
  ) => {
    sessionStorage.setItem(
      "register_phone",
      mobileNumber
    );

    setPhone(mobileNumber);

    router.push("/signup?step=otp");
  };

  /*
   * Edit phone number from OTP screen
   */
  const handleEditNumber = () => {
    sessionStorage.removeItem(
      "register_phone"
    );

    setPhone("");

    router.push("/signup");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

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
                key="register-mobile-background"
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
        </div>
      </div>

      {/* =====================================================
          BACK TO HOME
      ===================================================== */}

      <motion.button
        type="button"
        onClick={() => router.push("/")}
        initial={{
          opacity: 0,
          x: -10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          absolute
          left-4
          top-4
          z-30
          flex
          items-center
          gap-2
          rounded-full
          bg-white/80
          px-4
          py-2
          text-[10px]
          font-semibold
          uppercase
          tracking-wider
          text-[#0F3D2E]
          shadow-sm
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-white
          hover:text-[#D9A441]
          sm:left-6
          sm:top-6
          sm:text-xs
        "
      >
        <span>←</span>
        <span>Back to Home</span>
      </motion.button>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          px-4
          py-20
          lg:block
          lg:px-0
          lg:py-0
        "
      >
        <div
          className="
            w-full
            max-w-[440px]
            lg:absolute
            lg:right-[8%]
            lg:top-1/2
            lg:-translate-y-1/2
          "
        >

          {/* =================================================
              LOGO + HEADING
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              mb-6
              flex
              flex-col
              items-center
              text-center
              sm:mb-7
            "
          >

            {/* Leaf */}
            <motion.img
              src="/images/auth/leaficon.png"
              alt=""
              aria-hidden="true"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="
                mb-2
                h-7
                w-auto
                object-contain
                sm:h-8
              "
            />

            {/* Logo */}
            <motion.img
              src="/empireplaza.png"
              alt="Empire Plaza"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.18,
                ease: "easeOut",
              }}
              className="
                h-auto
                w-[150px]
                object-contain
                sm:w-[175px]
              "
            />

            {/* Heading */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.25,
                ease: "easeOut",
              }}
              className="
                mt-4
                text-2xl
                font-semibold
                tracking-tight
                text-[#1E2A22]
                sm:text-3xl
              "
            >
              Create Account
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.32,
                ease: "easeOut",
              }}
              className="
                mt-2
                text-xs
                leading-relaxed
                text-[#1E2A22]/60
                sm:text-sm
              "
            >
              Your food journey starts here.
            </motion.p>

            {/* Gold Divider */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 48,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.4,
                ease: "easeOut",
              }}
              className="
                mt-4
                h-[2px]
                bg-[#D9A441]
              "
            />
          </motion.div>

          {/* =================================================
              LOGIN / REGISTER SWITCH
          ================================================= */}

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
              duration: 0.4,
              delay: 0.45,
            }}
            className="
              mb-6
              flex
              items-center
              justify-center
              gap-1
              rounded-full
              border
              border-[#0F3D2E]/10
              bg-white/60
              p-1
              shadow-sm
              backdrop-blur-sm
            "
          >
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="
                flex-1
                rounded-full
                px-4
                py-2.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#1E2A22]/50
                transition-all
                duration-300
                hover:text-[#0F3D2E]
                sm:text-xs
              "
            >
              Sign In
            </button>

            <button
              type="button"
              className="
                flex-1
                rounded-full
                bg-[#0F3D2E]
                px-4
                py-2.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white
                shadow-sm
                sm:text-xs
              "
            >
              Create Account
            </button>
          </motion.div>

          {/* =================================================
              FORM TRANSITION
          ================================================= */}

          <div className="relative">
            <AnimatePresence
              mode="sync"
              initial={false}
            >
              {showOtp ? (
                <motion.div
                  key="register-otp-form"
                  initial={{
                    x: -40,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: 40,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <RegisterOtpForm
                    phone={phone}
                    onEditNumber={
                      handleEditNumber
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register-form"
                  initial={{
                    x: -40,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: 40,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <RegisterForm
                    onSuccess={
                      handleRegisterSuccess
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterMain;