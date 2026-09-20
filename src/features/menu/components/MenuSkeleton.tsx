import React from "react";

export default function MenuSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#F8F5ED] animate-pulse overflow-x-hidden">

      {/* =====================================================
          MENU HERO
          Matches the actual Menu hero:
          - Full width
          - Cream background
          - Center content
          - Large right image area
          - Decorative curved image shape
         ===================================================== */}

      <section className="relative w-full h-[340px] sm:h-[360px] lg:h-[400px] overflow-hidden bg-[#F8F5ED]">

        {/* Left decorative leaf placeholders */}
        <div className="absolute left-0 top-0 w-[120px] sm:w-[170px] lg:w-[220px] h-full opacity-40">
          <div className="absolute left-[-30px] top-[-20px] w-[110px] h-[190px] bg-gray-200/70 rounded-[80%] rotate-[25deg]" />
          <div className="absolute left-[-45px] top-[80px] w-[100px] h-[180px] bg-gray-200/60 rounded-[80%] rotate-[-15deg]" />
          <div className="absolute left-[30px] top-[170px] w-[80px] h-[140px] bg-gray-200/50 rounded-[80%] rotate-[25deg]" />
        </div>

        {/* Left handwritten-text skeleton */}
        <div className="absolute left-[5%] lg:left-[7%] top-[100px] sm:top-[115px] lg:top-[125px] hidden sm:block">
          <div className="h-4 w-24 bg-gray-200/80 rounded-full rotate-[-8deg]" />
          <div className="h-4 w-28 bg-gray-200/70 rounded-full mt-3 rotate-[-8deg]" />
          <div className="h-4 w-24 bg-gray-200/70 rounded-full mt-3 rotate-[-8deg]" />
          <div className="h-4 w-28 bg-gray-200/60 rounded-full mt-3 rotate-[-8deg]" />
          <div className="w-7 h-7 rounded-full bg-gray-200/70 mt-3 ml-20" />
        </div>

        {/* Center hero content */}
        <div className="absolute z-10 left-1/2 -translate-x-1/2 top-[70px] sm:top-[75px] lg:top-[82px] w-[90%] sm:w-[65%] lg:w-[48%] flex flex-col items-center text-center">

          {/* Small heading */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 sm:w-10 bg-gray-300 rounded-full" />
            <div className="h-2.5 w-20 sm:w-24 bg-gray-200 rounded-full" />
            <div className="h-[2px] w-8 sm:w-10 bg-gray-300 rounded-full" />
          </div>

          {/* Main heading */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 sm:h-11 lg:h-12 w-[260px] sm:w-[330px] lg:w-[390px] max-w-full bg-gray-200 rounded-lg" />
            <div className="h-10 sm:h-11 lg:h-12 w-[230px] sm:w-[290px] lg:w-[350px] max-w-full bg-gray-200 rounded-lg" />
          </div>

          {/* Description */}
          <div className="mt-5 flex flex-col items-center gap-2 w-full">
            <div className="h-3 w-[280px] max-w-[80%] bg-gray-100 rounded-full" />
            <div className="h-3 w-[220px] max-w-[65%] bg-gray-100 rounded-full" />
          </div>

        </div>

        {/* Right food image skeleton */}
        <div className="absolute right-0 top-0 w-[43%] sm:w-[42%] lg:w-[38%] h-full overflow-hidden">

          <div
            className="absolute inset-0 bg-gray-200"
            style={{
              clipPath:
                "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 8% 80%, 12% 55%, 16% 30%)",
            }}
          />

          {/* Food image highlight */}
          <div
            className="absolute right-[5%] top-[12%] w-[80%] h-[72%] bg-gray-300/50 rounded-full blur-2xl"
          />

          {/* Decorative bowl/image placeholder */}
          <div
            className="absolute right-[8%] bottom-[-20px] w-[75%] h-[55%] bg-gray-300 rounded-[50%]"
          />

        </div>

        {/* Right handwritten text skeleton */}
        <div className="absolute right-[25%] sm:right-[27%] lg:right-[28%] top-[15px] hidden md:block z-20">
          <div className="h-4 w-24 bg-gray-200/70 rounded-full rotate-[-10deg]" />
          <div className="h-4 w-28 bg-gray-200/60 rounded-full mt-3 rotate-[-10deg]" />
          <div className="h-4 w-24 bg-gray-200/60 rounded-full mt-3 rotate-[-10deg]" />
          <div className="w-7 h-7 rounded-full bg-gray-200/70 mt-2 ml-14" />
        </div>

      </section>


      {/* =====================================================
          CATEGORY FLOATING PANEL
         ===================================================== */}

      <section className="relative z-20 -mt-[38px] sm:-mt-[42px] lg:-mt-[40px] px-4 sm:px-8 lg:px-0">

        <div className="w-full max-w-[1135px] mx-auto">

          <div className="bg-white rounded-[22px] sm:rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] px-5 sm:px-8 lg:px-10 py-6 sm:py-7 lg:py-8">

            <div className="flex items-center justify-between gap-5 overflow-hidden">

              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center shrink-0 w-[60px] sm:w-[68px] lg:w-[72px]"
                >

                  {/* Category circle */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gray-200" />

                  {/* Category name */}
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <div className="h-2 w-12 sm:w-14 bg-gray-200 rounded-full" />
                    <div className="h-2 w-9 bg-gray-100 rounded-full" />
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT SECTION
         ===================================================== */}

      <section className="w-full bg-[#F8F5ED] pt-14 sm:pt-16 lg:pt-16 pb-16">

        <div className="w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="flex flex-col items-center mb-9 sm:mb-10 lg:mb-12">

            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-7 sm:w-9 bg-gray-300 rounded-full" />
              <div className="h-2.5 w-20 sm:w-24 bg-gray-200 rounded-full" />
              <div className="h-[2px] w-7 sm:w-9 bg-gray-300 rounded-full" />
            </div>

            <div className="h-7 sm:h-8 w-48 sm:w-56 bg-gray-200 rounded-lg" />

            <div className="h-3 w-52 sm:w-64 bg-gray-100 rounded-full mt-3" />

          </div>


          {/* =================================================
              PRODUCT GRID

              Mobile   : 2 columns
              Tablet   : 3 columns
              Desktop  : 4 columns
              Large    : 5 columns

              Matches the visible product layout.
             ================================================= */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">

            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] overflow-hidden border border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.04)]"
              >

                {/* Product image */}
                <div className="relative w-full aspect-[1.08/1] bg-gray-200">

                  {/* Favourite icon */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-200" />
                  </div>

                </div>


                {/* Product information */}
                <div className="p-3 sm:p-3.5 lg:p-4">

                  {/* Product name */}
                  <div className="h-3.5 w-[78%] bg-gray-200 rounded-md" />

                  {/* Description */}
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    <div className="h-2.5 w-full bg-gray-100 rounded-full" />
                    <div className="h-2.5 w-[70%] bg-gray-100 rounded-full" />
                  </div>

                  {/* Price + action */}
                  <div className="flex items-center justify-between mt-4">

                    <div className="h-4 w-12 bg-gray-200 rounded-md" />

                    <div className="w-8 h-8 rounded-full bg-gray-200" />

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          RESERVATION BANNER SKELETON

          Matches the lower section in the screenshot.
         ===================================================== */}

      <section className="w-full bg-[#F8F5ED] py-10 sm:py-12 lg:py-14">

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative w-full h-[150px] sm:h-[165px] lg:h-[175px] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-gray-200">

            {/* Left content */}
            <div className="absolute left-[6%] top-1/2 -translate-y-1/2 flex flex-col gap-3">

              <div className="h-7 sm:h-8 w-[220px] sm:w-[280px] bg-gray-300 rounded-md" />

              <div className="h-3 w-[190px] sm:w-[250px] bg-gray-300/70 rounded-full" />

            </div>

            {/* Center button */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

              <div className="h-10 sm:h-11 w-32 sm:w-36 rounded-lg bg-gray-300" />

            </div>

            {/* Right image */}
            <div className="absolute right-0 top-0 h-full w-[45%] sm:w-[48%] bg-gray-300">

              <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-2xl" />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER SKELETON

          Matches the green footer structure shown in
          the supplied screenshot.
         ===================================================== */}

      <footer className="w-full bg-[var(--brand-green-dark)] px-6 sm:px-10 lg:px-16 xl:px-24 py-12 sm:py-14 lg:py-16">

        <div className="max-w-[1200px] mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

            {/* Brand */}
            <div className="flex flex-col">

              <div className="h-9 w-36 bg-white/20 rounded-md" />

              <div className="mt-6 flex flex-col gap-2">
                <div className="h-3 w-full max-w-[240px] bg-white/10 rounded-full" />
                <div className="h-3 w-[90%] max-w-[220px] bg-white/10 rounded-full" />
                <div className="h-3 w-[70%] max-w-[180px] bg-white/10 rounded-full" />
              </div>

              <div className="flex gap-3 mt-7">
                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="w-7 h-7 rounded-full bg-white/10"
                    />
                  )
                )}
              </div>

            </div>


            {/* Navigation */}
            <div>

              <div className="h-4 w-28 bg-white/15 rounded-md mb-7" />

              <div className="flex flex-col gap-4">

                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <div className="w-4 h-4 rounded-full bg-white/10" />
                      <div className="h-3 w-20 bg-white/10 rounded-full" />
                    </div>
                  )
                )}

              </div>

            </div>


            {/* Working hours */}
            <div>

              <div className="h-4 w-32 bg-white/15 rounded-md mb-7" />

              <div className="flex flex-col gap-6">

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-white/10 mt-1" />

                  <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-20 bg-white/10 rounded-full" />
                    <div className="h-3 w-32 bg-white/10 rounded-full" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-white/10 mt-1" />

                  <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-20 bg-white/10 rounded-full" />
                    <div className="h-3 w-32 bg-white/10 rounded-full" />
                  </div>
                </div>

              </div>

              <div className="h-10 w-40 border border-white/10 rounded-lg mt-7" />

            </div>


            {/* Contact */}
            <div>

              <div className="h-4 w-28 bg-white/15 rounded-md mb-7" />

              <div className="flex flex-col gap-6">

                {Array.from({ length: 3 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <div className="w-7 h-7 rounded-md bg-white/10 shrink-0" />

                      <div className="flex flex-col gap-2">
                        <div className="h-2.5 w-16 bg-white/10 rounded-full" />
                        <div className="h-3 w-32 bg-white/10 rounded-full" />
                        <div className="h-3 w-24 bg-white/10 rounded-full" />
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}