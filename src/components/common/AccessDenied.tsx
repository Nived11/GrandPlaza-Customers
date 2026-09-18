"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

const AccessDenied = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF6EC] px-5">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D2E]">
          <LockKeyhole
            size={28}
            strokeWidth={1.8}
            className="text-white"
          />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-[#1E2A22]">
          Access Denied
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#1E2A22]/60">
          You need to be logged in to access this page.
        </p>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-7 rounded-xl bg-[#0F3D2E] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Go to Login
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-3 block w-full text-sm font-medium text-[#0F3D2E] underline underline-offset-4"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default AccessDenied;