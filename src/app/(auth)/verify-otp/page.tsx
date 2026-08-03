"use client";

import React, { useState, useRef } from 'react';
import { ShieldCheck, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleOtpChange = (elementValue: string, index: number) => {
    const cleanedValue = elementValue.replace(/\D/g, "");
    if (!cleanedValue) return;

    const newOtp = [...otp];
    newOtp[index] = cleanedValue.substring(cleanedValue.length - 1);
    setOtp(newOtp);

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      const compositeOtp = otp.join("");
      if (compositeOtp.length < 6) {
        setError("Please enter a valid 6-digit verification code.");
        return;
      }
      // Successfully authenticated profile triggers router workspace ingress
      router.push('/');
    }, 1200);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-6 font-sans text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/[0.02] border border-white/5 p-8 rounded-3xl"
      >
        <header className="text-center mb-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white italic">
            Verify <span className="text-[#f9a602]">OTP.</span>
          </h2>
          <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mt-2">
            Verification code dispatched to mobile console
          </p>
        </header>

        <form onSubmit={handleVerifySubmit} className="space-y-8 w-full">
          <div>
            <div className="flex justify-between gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="tel"
                  maxLength={1}
                  value={data}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-full h-12 lg:h-14 bg-white/5 border border-white/10 rounded-xl text-center font-black text-lg text-[#f9a602] focus:border-[#f9a602] outline-none"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f9a602] text-black py-3.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <><Loader2 className="animate-spin text-black" size={16} /> <span className="text-black">Verifying...</span></>
              ) : (
                <><span className="text-black">Verify Token</span> <ShieldCheck size={16} className="text-black" /></>
              )}
            </button>

            <div className="flex flex-col items-center gap-5 pt-2">
              {canResend ? (
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-[#f9a602] hover:text-white transition-colors">
                  Resend OTP
                </button>
              ) : (
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  Resend token in <span className="text-[#f9a602]">{formatTime(timer)}</span>
                </p>
              )}

              <button
                type="button"
                onClick={() => router.push('/auth/signup')}
                className="flex items-center justify-center gap-2 cursor-pointer text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white underline underline-offset-4 decoration-[#f9a602]"
              >
                <ChevronLeft size={14} /> Back to Sign Up
              </button>
            </div>
          </div>
        </form>

        <div className="w-full min-h-[44px] mt-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="w-full p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest leading-tight">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}