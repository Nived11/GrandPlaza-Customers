"use client";

import {
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import axios from "axios";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";

const CONTACT_DETAILS = {
  locationName: "Empire Plaza Kochi",
  address: "NH 66, Near Sunrise Hospital, Edappally, Kochi, Kerala 682024",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Edappally%20Kochi%20Kerala",
};

const inputClass =
  "h-12 w-full rounded-xl border border-[#E7A43B]/30 bg-[#F7F9F8] px-4 text-sm text-[#102A2A] outline-none transition placeholder:text-[#94A3B8] hover:border-[#E7A43B]/60 focus:border-[#006B52] focus:bg-white focus:ring-4 focus:ring-[#006B52]/10";

export default function ContactMain() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 95,
    damping: 20,
    mass: 0.6,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 95,
    damping: 20,
    mass: 0.6,
  });

  const fishX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const fishY = useTransform(smoothY, [-1, 1], [-3, 3]);
  const nearX = useTransform(smoothX, [-1, 1], [-24, 24]);
  const nearY = useTransform(smoothY, [-1, 1], [-18, 18]);
  const midX = useTransform(smoothX, [-1, 1], [15, -15]);
  const midY = useTransform(smoothY, [-1, 1], [12, -12]);
  const farX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const farY = useTransform(smoothY, [-1, 1], [8, -8]);

  const handleFoodMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const resetFoodPosition = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

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
        description:
          "Thank you for contacting Empire Plaza. We'll get back to you soon.",
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
    <div className="min-h-screen overflow-hidden bg-[#FFFDF9]">
      <section className="relative mx-auto w-full max-w-[1440px] px-5 py-9 sm:px-8 sm:py-12 lg:px-14 lg:py-10 xl:px-20">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#E7A43B]/8 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-20 hidden h-96 w-96 rounded-full bg-[#006B52]/6 blur-3xl lg:block" />

        <div className="relative grid items-center gap-12 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.88fr)_minmax(430px,1.12fr)] lg:gap-10 xl:gap-16">
          <div className="w-full max-w-[560px] lg:justify-self-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F1F5F3] px-3 py-1.5 text-[#29483D]">
              <Sparkles size={13} className="text-[#E7A43B]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.14em]">
                Contact Us
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-black leading-none tracking-tight text-[#0D2238] sm:text-5xl">
              Let&apos;s <span className="text-[#E7A43B]">Talk.</span>
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#66716D]">
              Have a question, feedback, or a special request? Send us a
              message and our team will get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <FormField label="Full Name" icon={User}>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Enter your name"
                  aria-label="Your name"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Email Address" icon={Mail}>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  aria-label="Your email"
                  className={inputClass}
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Phone Number" icon={Phone}>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    autoComplete="tel"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Subject" icon={MessageSquare}>
                  <select
                    name="subject"
                    required
                    defaultValue=""
                    aria-label="Select a subject"
                    className={`${inputClass} cursor-pointer appearance-none text-[#66716D]`}
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="order">Order Assistance</option>
                    <option value="reservation">Table Reservation</option>
                    <option value="menu">Menu Enquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other Enquiry</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Message" icon={MessageSquare} multiline>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  aria-label="Your message"
                  className="h-24 w-full resize-none rounded-xl border border-[#E7A43B]/30 bg-[#F7F9F8] px-4 py-3 text-sm leading-5 text-[#102A2A] outline-none transition placeholder:text-[#94A3B8] hover:border-[#E7A43B]/60 focus:border-[#006B52] focus:bg-white focus:ring-4 focus:ring-[#006B52]/10"
                />
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#006B52] px-7 text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-[0_10px_24px_rgba(0,107,82,0.18)] transition hover:-translate-y-0.5 hover:bg-[#005A45] hover:shadow-[0_14px_28px_rgba(0,107,82,0.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={15}
                      className="text-[#F6C35B] transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="relative hidden min-h-[640px] items-center justify-center lg:flex">
            <div className="pointer-events-none absolute h-[470px] w-[470px] rounded-full border border-[#E7A43B]/15 bg-gradient-to-br from-[#FFF7E8] to-[#F0F7F3]" />
            <div className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-dashed border-[#006B52]/15" />

            <div
              className="relative z-10 aspect-[1402/1122] w-full max-w-[650px] cursor-crosshair select-none"
              onMouseMove={handleFoodMouseMove}
              onMouseLeave={resetFoodPosition}
            >
              <motion.div
                className="absolute inset-[8%_4%_4%_4%] z-10"
                style={{ x: fishX, y: fishY }}
              >
                <Image
                  src="/contact-fish-base-v3.png"
                  alt="Kerala-style grilled fish served on a banana leaf"
                  fill
                  draggable={false}
                  sizes="(max-width: 1023px) 1px, 46vw"
                  className="object-contain"
                />
              </motion.div>

              <FloatingIngredient
                label="floating red chilli"
                crop={{ x: 17, y: 7, width: 21, height: 24 }}
                place={{ left: 12, top: 4, width: 22, height: 25 }}
                x={nearX}
                y={nearY}
                delay={0}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
              <FloatingIngredient
                label="floating onion ring"
                crop={{ x: 30, y: 4, width: 14, height: 17 }}
                place={{ left: 31, top: 1, width: 14, height: 17 }}
                x={midX}
                y={midY}
                delay={0.45}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
              <FloatingIngredient
                label="floating onion ring"
                crop={{ x: 53, y: 6, width: 18, height: 17 }}
                place={{ left: 57, top: 5, width: 18, height: 17 }}
                x={nearX}
                y={nearY}
                delay={0.8}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
              <FloatingIngredient
                label="floating lime"
                crop={{ x: 72, y: 2, width: 15, height: 18 }}
                place={{ left: 78, top: 1, width: 15, height: 18 }}
                x={farX}
                y={farY}
                delay={0.25}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
              <FloatingIngredient
                label="floating lime"
                crop={{ x: 2, y: 26, width: 16, height: 17 }}
                place={{ left: 1, top: 31, width: 16, height: 17 }}
                x={midX}
                y={midY}
                delay={1.05}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
              <FloatingIngredient
                label="floating onion ring"
                crop={{ x: 1, y: 74, width: 18, height: 20 }}
                place={{ left: 1, top: 76, width: 18, height: 20 }}
                x={nearX}
                y={nearY}
                delay={0.65}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
              <FloatingIngredient
                label="floating red chilli"
                crop={{ x: 70, y: 71, width: 24, height: 25 }}
                place={{ left: 77, top: 73, width: 21, height: 24 }}
                x={farX}
                y={farY}
                delay={1.2}
                reducedMotion={Boolean(shouldReduceMotion)}
              />
            </div>

            <a
              href={CONTACT_DETAILS.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 left-1/2 z-20 flex w-[88%] max-w-[460px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#DDE7E1] bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(16,42,42,0.09)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#E7A43B]/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3EF] text-[#006B52]">
                <MapPin size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold text-[#102A2A]">
                  {CONTACT_DETAILS.locationName}
                </span>
                <span className="mt-0.5 block text-[10px] leading-4 text-[#66716D]">
                  {CONTACT_DETAILS.address}
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

type IngredientRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type IngredientPlace = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type FloatingIngredientProps = {
  label: string;
  crop: IngredientRect;
  place: IngredientPlace;
  x: MotionValue<number>;
  y: MotionValue<number>;
  delay: number;
  reducedMotion: boolean;
};

function FloatingIngredient({
  label,
  crop,
  place,
  x,
  y,
  delay,
  reducedMotion,
}: FloatingIngredientProps) {
  const backgroundSizeX = (100 / crop.width) * 100;
  const backgroundSizeY = (100 / crop.height) * 100;
  const backgroundPositionX =
    crop.x === 0 ? 0 : (crop.x / (100 - crop.width)) * 100;
  const backgroundPositionY =
    crop.y === 0 ? 0 : (crop.y / (100 - crop.height)) * 100;

  return (
    <motion.div
      role="img"
      aria-label={label}
      className="pointer-events-none absolute z-20"
      style={{
        left: `${place.left}%`,
        top: `${place.top}%`,
        width: `${place.width}%`,
        height: `${place.height}%`,
        x,
        y,
      }}
    >
      <motion.div
        className="h-full w-full"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -8, 0],
                rotate: [-2, 2, -2],
              }
        }
        transition={{
          duration: 4.6,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          backgroundImage: "url('/contact-fish-float-transparent-v4.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${backgroundSizeX}% ${backgroundSizeY}%`,
          backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
        }}
      />
    </motion.div>
  );
}

type FormFieldProps = {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
  multiline?: boolean;
};

function FormField({
  label,
  icon: Icon,
  children,
  multiline = false,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-extrabold text-[#243D34]">
        {label}
      </span>
      <span className="relative block">
        <Icon
          size={16}
          className={`pointer-events-none absolute left-3.5 z-10 text-[#E7A43B] ${
            multiline ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        />
        <span className="block [&>input]:pl-10 [&>select]:pl-10 [&>textarea]:pl-10">
          {children}
        </span>
      </span>
    </label>
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
