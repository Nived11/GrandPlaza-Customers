"use client";

import React, { useState } from 'react';
import { ArrowRight, Zap, ChevronLeft, User, Phone, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setError("You must agree to the Terms and Conditions to proceed.");
      return;
    }
    setError(null);
    setLoading(true);

    // Simulated API execution triggering Next.js routing redirect
    setTimeout(() => {
      setLoading(false);
      // Moving to the next dedicated verification view router path
      router.push('/auth/verify-otp');
    }, 1200);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#0a0a0a] overflow-hidden font-sans text-white">

      {/* Left Branding View Banner */}
      <div className="relative w-full lg:w-[60%] h-[18vh] min-h-30 sm:h-[24vh] lg:h-full bg-black shrink-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 lg:opacity-30" 
          alt="Premium Culinary Layout Background" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden"></div>
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center lg:justify-start p-6 lg:p-24 lg:pt-52">
          <div className="hidden lg:block space-y-10">
            <h1 className="text-7xl lg:text-[100px] font-black uppercase italic leading-[0.9] tracking-tighter text-white">
              Beyond <br /> <span className="text-[#f9a602]">Taste.</span>
            </h1>
            <p className="text-gray-300 text-xl font-medium leading-relaxed tracking-wide italic border-l-4 border-[#f9a602] pl-8">
              The Ultimate Culinary Experience
            </p>
          </div>
          <div className="lg:hidden text-center">
            <span className="text-2xl font-black tracking-widest text-white">EMPIRE PLAZA</span>
          </div>
        </div>
      </div>

      {/* Right Form Console Interface */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-[40%] flex flex-col items-center justify-start px-6 sm:px-8 lg:px-20 bg-[#0a0a0a] flex-grow pt-4 lg:pt-0 lg:justify-center overflow-y-auto pb-6 lg:pb-0 no-scrollbar min-h-0"
      >
        <div className="max-w-sm w-full space-y-3 lg:space-y-6 my-auto">
          
          <header className="text-center lg:text-left space-y-0.5 lg:space-y-3 mb-4">
            <h2 className="text-3xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-tight italic">
              Sign <span className="text-[#f9a602]">Up.</span>
            </h2>
            <p className="text-gray-500 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center lg:justify-start gap-2">
              <Zap size={12} className="text-[#f9a602] fill-[#f9a602]" /> Join the Inner Circle
            </p>
          </header>

          <form onSubmit={handleRegisterSubmit} className="space-y-3 lg:space-y-6 w-full">
            {/* Full Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <User size={16} className="text-[#f9a602] opacity-70" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-5 py-2.5 lg:py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
                required
              />
            </div>

            {/* Mobile Number Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-[#f9a602] font-black text-xs sm:text-sm pr-3 border-r border-white/10">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                className="w-full pl-[4.5rem] pr-5 py-2.5 lg:py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail size={16} className="text-[#f9a602] opacity-70" />
              </div>
              <input
                type="email"
                placeholder="Email Address (Optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-5 py-2.5 lg:py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
              />
            </div>

            {/* Compliance Acceptance Toggles */}
            <div className="flex items-center justify-start gap-3 px-1 pt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-white/5 text-[#f9a602] focus:ring-[#f9a602] focus:ring-offset-[#0a0a0a] cursor-pointer"
                />
              </div>
              <label htmlFor="terms" className="text-[9px] sm:text-[10px] text-gray-400 font-medium leading-snug cursor-pointer select-none">
                I agree to the <span className="text-white hover:text-[#f9a602] transition-colors underline underline-offset-2">Terms & Conditions</span> and <span className="text-white hover:text-[#f9a602] transition-colors underline underline-offset-2">Privacy Policy</span>.
                  </label>
            </div>

            {/* Form Action Controls */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f9a602] text-black py-3.5 lg:py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] lg:text-[11px] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer mt-4"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={16} /> <span>Sending OTP...</span></>
              ) : (
                <><span className="text-black">Create Account</span> <ArrowRight size={16} strokeWidth={3} className="text-black" /></>
              )}
            </button>
          </form>

          {/* Error Feedbacks */}
          <div className="w-full min-h-[44px] mb-1 flex items-end">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="w-full p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-red-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest leading-tight">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-3 lg:pt-8 border-t border-white/5 mb-2">
            <div className="flex flex-col items-center lg:items-start gap-2.5 lg:gap-4">
              <p className="text-[9px] lg:text-[10px] font-medium text-gray-500 tracking-tight">Already have an account?</p>
              <Link href="/login" className="cursor-pointer group flex items-center gap-3 text-white transition-all">
                <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#f9a602] group-hover:text-black transition-all">
                  <ChevronLeft size={14} />
                </div>
                <span className="font-black uppercase tracking-widest text-[10px] lg:text-[11px] group-hover:text-[#f9a602]">Sign In Now</span>
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}