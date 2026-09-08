"use client";

import React from "react";
import LoginForm from "./components/LoginForm";

const LoginMain = () => {
  return (
    <div className="min-h-screen h-screen bg-[#FBF6EC] text-[#1E2A22] flex flex-col antialiased overflow-hidden">
      {/* Header */}
      <header className="relative z-30 shrink-0 w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 flex items-center justify-between border-b border-[#0F3D2E]/10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center shadow-md">
            <span className="text-xs sm:text-sm">✦</span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#1E2A22] tracking-[0.2em] text-base sm:text-lg font-bold uppercase">
                EMPIRE
              </span>

              <span className="text-[#D9A441] text-[10px] sm:text-xs tracking-[0.25em] font-semibold uppercase">
                PLAZA
              </span>
            </div>

            <p className="hidden sm:block text-[8px] text-[#1E2A22]/50 tracking-[0.2em] uppercase font-medium -mt-0.5">
              AUTHENTIC FLAVORS • MALAPPURAM
            </p>
          </div>
        </div>

        {/* Back */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#1E2A22]/75 hover:text-[#0F3D2E] transition-colors tracking-wide bg-white/70 backdrop-blur-md border border-[#0F3D2E]/10 px-3.5 py-2 rounded-full shadow-sm"
        >
          <span className="w-4 h-4 rounded-full bg-[#0F3D2E]/10 flex items-center justify-center text-[11px] text-[#0F3D2E] font-bold">
            ←
          </span>

          <span className="hidden sm:inline">Back to Menu</span>
        </a>
      </header>

      {/* Main */}
      <main className="relative z-20 w-full flex-1 min-h-0 flex flex-col lg:flex-row max-w-[1720px] mx-auto">
        {/* LEFT SIDE */}
        <section className="w-full lg:w-[58%] xl:w-[60%] min-h-0 px-5 sm:px-8 lg:px-10 xl:px-14 py-5 sm:py-7 lg:py-8 flex flex-col justify-between relative">
          {/* Heading */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9A441]/25 text-[#0F3D2E] text-[10px] font-semibold tracking-[0.18em] uppercase mb-3 sm:mb-4 shadow-sm">
              <span className="text-[9px] text-[#D9A441]">✦</span>
              <span>EMPIRE PLAZA</span>
              <span className="text-[9px] text-[#D9A441]">✦</span>
            </div>

            <h1 className="text-[#1E2A22] uppercase tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-[70px] leading-[0.95] font-bold">
              Your Table.
              <br />

              <span className="italic font-serif font-normal lowercase tracking-normal text-[#0F3D2E] block mt-1">
                Your Feast.
              </span>
            </h1>

            <p className="text-[#1E2A22]/65 text-xs sm:text-sm lg:text-base mt-3 sm:mt-4 max-w-lg leading-relaxed">
              Authentic Arab-Kerala flavours, freshly prepared in Malappuram.
            </p>

            <div className="flex items-center gap-2.5 mt-4 opacity-60">
              <div className="w-10 sm:w-14 h-[2px] bg-[#D9A441]" />
              <span className="text-[#D9A441] text-[10px]">✦</span>
              <div className="w-20 sm:w-28 h-[1px] bg-[#0F3D2E]/30" />
            </div>
          </div>

          {/* Food Image */}
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] rounded-tr-[80px] sm:rounded-tr-[100px] rounded-bl-[12px] shadow-xl border-4 border-white/80 mt-5 lg:mt-6 flex-1 min-h-[180px] max-h-[350px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3izQc3URBcJbaVgXCejNt2T4NcBuSiqT16d8zzVYXXcNpOcQeYe3RLw_TmrH_csA2c1HSK5-uNd69Wk_UVQeujlggNUgzFo2zZ6xD2zZyK8Vr9xc-2OG5Brv-QMywIn9YjW6KdD56pFCpVudeyGImvAhmE_YYg3ehUwNkYFXIRO5VRuIZ6laJnaWl57wFEDQYg-MG-9MSqaNXrlhev9APE30O9B829QoxS1AL98uiR3h2qX7fxOzx"
              alt="Empire Plaza signature gourmet delicacy"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A291E]/70 via-transparent to-black/5" />

          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="w-full lg:w-[42%] xl:w-[40%] bg-[#F4ECE0]/70 border-t lg:border-t-0 lg:border-l border-[#0F3D2E]/10 px-5 sm:px-8 lg:px-10 xl:px-14 py-7 lg:py-8 flex items-center justify-center relative min-h-0 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 opacity-[0.04] pointer-events-none text-[#0F3D2E]">
            <svg fill="none" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="30"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="w-full max-w-md relative z-10">
            <LoginForm />
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 shrink-0 w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-2.5 border-t border-[#0F3D2E]/10 flex items-center justify-between text-[10px] text-[#1E2A22]/45">
        <span>© 2026 Empire Plaza</span>

        <div className="flex gap-4 sm:gap-5">
          <a
            href="#"
            className="hover:text-[#0F3D2E] transition-colors"
          >
            Privacy
          </a>

          <a
            href="#"
            className="hover:text-[#0F3D2E] transition-colors"
          >
            Terms
          </a>

          <a
            href="#"
            className="hover:text-[#0F3D2E] transition-colors"
          >
            Help
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LoginMain;