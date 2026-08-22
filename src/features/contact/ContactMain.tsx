"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Clock,
  Leaf,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";

const CONTACT_DETAILS = {
  phone: "+91 123 456 7890",
  phoneLink: "tel:+911234567890",
  email: "hello@empireplaza.com",
  workingHours: "10:00 AM - 11:00 PM",
  locationName: "Empire Plaza Kochi",
  address: "NH 66, Near Sunrise Hospital, Edappally, Kochi, Kerala 682024",
  mapUrl:
    "https://www.google.com/maps?q=Edappally%20Kochi%20Kerala&output=embed",
};

const contactCards = [
  {
    label: "Call Us",
    value: CONTACT_DETAILS.phone,
    href: CONTACT_DETAILS.phoneLink,
    icon: Phone,
  },
  {
    label: "Email Us",
    value: CONTACT_DETAILS.email,
    href: `mailto:${CONTACT_DETAILS.email}`,
    icon: Mail,
  },
  {
    label: "Working Hours",
    value: CONTACT_DETAILS.workingHours,
    icon: Clock,
  },
];

const inputClass =
  "h-11 w-full rounded-lg border border-[#DDDCD7] bg-white pl-10 pr-3 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-[#BFC8C1] focus:border-brand-green-dark focus:ring-4 focus:ring-brand-green-dark/10";

export default function ContactMain() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone_number: String(formData.get("phone_number") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setIsSubmitting(true);

    try {
      await axiosInstance.post("/accounts/contact", payload);
      form.reset();
      toast.success("Message sent successfully!", {
        description: "Thank you for contacting Empire Plaza. We'll get back to you soon.",
      });
    } catch (error) {
      toast.error("Message could not be sent", {
        description: getContactErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F3EA]">
      {/* Contact hero */}
      <section className="relative overflow-hidden bg-[#FFF8EE]">
        <div className="grid lg:grid-cols-2">
          <div className="relative z-10 ml-auto flex w-full max-w-[720px] items-center px-5 py-10 sm:px-8 lg:min-h-[330px] lg:px-12 lg:py-9">
            <div className="w-full max-w-[610px]">
              <div className="mb-2 flex items-center gap-2 text-[#E38B1B]">
                <span className="h-px w-10 bg-[#E8A13E]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.12em]">
                  Let&apos;s stay connected
                </p>
                <Leaf size={15} fill="currentColor" strokeWidth={1.5} />
                <span className="h-px w-10 bg-[#E8A13E]" />
              </div>

              <h1 className="font-serif text-5xl font-black leading-[0.95] text-brand-green-dark sm:text-6xl lg:text-[64px]">
                Contact Us
              </h1>

              <p className="mt-4 max-w-[500px] text-sm leading-6 text-[#48534E]">
                We&apos;d love to hear from you! Whether it&apos;s feedback, a
                suggestion, or a special request — we&apos;re here to help.
              </p>

              <div className="mt-7 hidden gap-3 md:grid md:grid-cols-3">
                {contactCards.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green-dark text-white shadow-sm">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold text-brand-green-dark">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] text-gray-600">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex min-h-[62px] items-center gap-2.5 rounded-xl border border-[#EDE7DC] bg-white px-3 shadow-[0_6px_20px_rgba(75,60,35,0.06)] transition hover:-translate-y-0.5 hover:border-brand-gold/50"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.label}
                      className="flex min-h-[62px] items-center gap-2.5 rounded-xl border border-[#EDE7DC] bg-white px-3 shadow-[0_6px_20px_rgba(75,60,35,0.06)]"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[330px] overflow-hidden lg:block">
            <Image
              src="/contact-fish-hero.png"
              alt="Kerala-style whole grilled fish served on a banana leaf"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFF8EE] via-[#FFF8EE]/10 to-transparent lg:block" />
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="relative z-10 mx-auto -mt-3 w-full max-w-[1480px] rounded-t-[24px] border border-b-0 border-[#EEE9E0] bg-white px-5 py-7 shadow-[0_-8px_35px_rgba(29,53,42,0.07)] sm:px-8 lg:px-10">
        <div className="grid gap-9 md:grid-cols-[1.15fr_0.85fr] md:gap-0">
          {/* Send us a message */}
          <div className="md:border-r md:border-[#E5E7E3] md:pr-8">
            <SectionTitle
              icon={MessageSquare}
              title="Send us a Message"
              subtitle="Fill in the form below and we'll get back to you soon!"
            />

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField icon={User}>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your Name"
                    aria-label="Your name"
                    className={inputClass}
                  />
                </FormField>

                <FormField icon={Mail}>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Your Email"
                    aria-label="Your email"
                    className={inputClass}
                  />
                </FormField>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FormField icon={Phone}>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    autoComplete="tel"
                    placeholder="Phone Number"
                    aria-label="Phone number"
                    className={inputClass}
                  />
                </FormField>

                <FormField icon={User}>
                  <select
                    name="subject"
                    required
                    defaultValue=""
                    aria-label="Select a subject"
                    className={`${inputClass} appearance-none text-gray-500`}
                  >
                    <option value="" disabled>
                      Select a Subject
                    </option>
                    <option value="order">Order Assistance</option>
                    <option value="reservation">Table Reservation</option>
                    <option value="menu">Menu Enquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other Enquiry</option>
                  </select>
                </FormField>
              </div>

              <div className="relative">
                <MessageSquare
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400"
                />
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  aria-label="Your message"
                  className="w-full resize-none rounded-lg border border-[#DDDCD7] bg-white py-3 pl-10 pr-3 text-xs leading-5 text-gray-700 outline-none transition placeholder:text-gray-400 hover:border-[#BFC8C1] focus:border-brand-green-dark focus:ring-4 focus:ring-brand-green-dark/10"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-w-[142px] items-center justify-center gap-2 rounded-full bg-brand-green-dark px-7 py-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(1,90,65,0.18)] transition hover:-translate-y-0.5 hover:bg-[#014936] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Visit us */}
          <div className="md:pl-8">
            <SectionTitle
              icon={MapPin}
              title="Visit Us"
              subtitle="We'd love to serve you in person!"
            />

            <div className="mt-5 flex gap-3 rounded-xl border border-[#D8E0D9] bg-gradient-to-r from-[#EEF3ED] to-[#F8F8F4] p-4">
              <MapPin
                size={23}
                fill="currentColor"
                className="mt-0.5 shrink-0 text-brand-green-dark"
              />
              <div>
                <h3 className="text-xs font-bold text-brand-green-dark">
                  {CONTACT_DETAILS.locationName}
                </h3>
                <p className="mt-1 text-[10px] leading-4 text-gray-600">
                  {CONTACT_DETAILS.address}
                </p>
              </div>
            </div>

            <div className="mt-3 h-[170px] overflow-hidden rounded-xl border border-[#D3DDD6] bg-[#EDF3EE]">
              <iframe
                title="Empire Plaza location"
                src={CONTACT_DETAILS.mapUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type SectionTitleProps = {
  icon: typeof MessageSquare;
  title: string;
  subtitle?: string;
};

function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-green-dark/20 text-brand-green-dark">
          <Icon size={15} />
        </span>
        <h2 className="font-serif text-base font-bold text-brand-green-dark">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="ml-9 mt-1 text-[9px] text-gray-500">{subtitle}</p>
      ) : null}
      <span className="ml-9 mt-2 block h-0.5 w-6 bg-brand-gold" />
    </div>
  );
}

type FormFieldProps = {
  icon: typeof User;
  children: React.ReactNode;
};

function FormField({ icon: Icon, children }: FormFieldProps) {
  return (
    <div className="relative">
      <Icon
        size={15}
        className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400"
      />
      {children}
    </div>
  );
}

type SocialLinkProps = {
  label: string;
  className: string;
  children: React.ReactNode;
};

function SocialLink({ label, className, children }: SocialLinkProps) {
  return (
    <a
      href="#"
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      {children}
    </a>
  );
}

function getContactErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return "An unexpected error occurred. Please try again.";
  }

  if (!error.response) {
    return "Unable to reach the server. Please check your connection and try again.";
  }

  if (error.response.status === 429) {
    return "Too many messages were sent from this connection. Please try again later.";
  }

  const responseData = error.response.data;

  if (responseData && typeof responseData === "object") {
    const messages = Object.values(responseData)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .filter((value): value is string => typeof value === "string");

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return "Please check your information and try again.";
}
