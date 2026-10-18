import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Empire Plaza",
  description: "Learn how Empire Plaza collects, protects, and uses your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FCF8F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[var(--brand-gold)]/20 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-green-dark)] hover:text-[var(--brand-gold)] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-2xl bg-[var(--brand-green-dark)]/5 border border-[var(--brand-gold)]/30 flex items-center justify-center text-[var(--brand-gold)]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight">
                Privacy <span className="text-[var(--brand-gold)]">Policy</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Last updated: October 2026
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              1. Information We Collect
            </h2>
            <p>
              When you use Empire Plaza to browse our menu, place orders, or reserve tables, we collect information you provide directly to us such as your name, mobile number, delivery address, and order details.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information strictly to process and deliver your orders, communicate updates regarding your delivery status, provide customer support, and improve your culinary experience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              3. Payment Information & Security
            </h2>
            <p>
              We do not store your debit card, credit card, or UPI banking credentials on our servers. All digital payments are securely processed through industry-standard RBI-authorized payment gateways like Razorpay with 256-bit SSL encryption.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              4. Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact our support team at{" "}
              <a href="mailto:hello@empireplaza.com" className="text-[var(--brand-gold)] font-semibold underline">
                hello@empireplaza.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
