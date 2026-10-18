import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Empire Plaza",
  description: "Terms and conditions governing the use of Empire Plaza food delivery services.",
};

export default function TermsPage() {
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
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight">
                Terms & <span className="text-[var(--brand-gold)]">Conditions</span>
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website or placing an order with Empire Plaza, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              2. Orders & Delivery
            </h2>
            <p>
              Delivery time estimates are subject to traffic conditions and kitchen preparation time. Orders are accepted only within our configured delivery radius.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              3. Pricing & Payments
            </h2>
            <p>
              Prices for menu items and delivery charges are displayed clearly during checkout. In the event of payment failures where money is deducted, refunds are processed according to bank settlement cycles (usually 3-5 business days).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-800">
              4. Contact Us
            </h2>
            <p>
              For any queries regarding our terms of service, reach out to{" "}
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
