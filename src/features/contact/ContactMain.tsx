"use client";

import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import axios from "axios";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ChevronDown, Leaf, Loader2, Mail, MapPin,
  MessageCircle, MessageCircleMore, Phone, Send, User, type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const CONTROL_CLASS_NAME = `
  block h-[46px] w-full rounded-[10px] border border-[#dce4e5]
  bg-[linear-gradient(110deg,#f6f8f7,#f8f9f9)] py-0 pr-[14px] pl-[45px]
  text-[16px] text-[#173d3d] outline-none min-[600px]:text-[13px]
  transition-[border-color,box-shadow,background] duration-200 ease-[ease]
  placeholder:text-[#8292ae] placeholder:opacity-100 hover:border-[#bfcec6]
  focus:border-[#176957] focus:bg-white focus:bg-none focus:shadow-[0_0_0_3px_rgba(1,90,65,0.09)]
`;
const CONTACT_LINK_CLASS_NAME = `
  mb-[6px] block text-[14px] leading-[20px] font-[550] text-[#102f32] no-underline
  hover:text-[#00654c] hover:underline focus-visible:outline-[3px]
  focus-visible:outline-[#e9a630] focus-visible:outline-offset-4
`;

const LEAVES = [
  { src: "leaf-01.png", className: "top-[4px] -left-[41px] w-[70px] -rotate-45 opacity-85 blur-[1.4px] min-[600px]:-top-[5px] min-[600px]:-left-[4px] min-[600px]:w-[100px]" },
  { src: "leaf-01.png", className: "top-[85px] left-[34%] hidden w-[135px] rotate-12 opacity-80 blur-[1.5px] min-[1100px]:block" },
  { src: "leaf-04.png", className: "-bottom-[6px] -left-[70px] w-[190px] -rotate-12 blur-[4px]" },
  { src: "leaf-01.png", className: "top-[16px] -right-[45px] w-[92px] -rotate-[26deg] blur-[2px] min-[600px]:-top-[19px] min-[600px]:-right-[63px] min-[600px]:w-[150px]" },
  { src: "leaf-02.png", className: "-right-[48px] -bottom-[19px] w-[177px] -rotate-[35deg] blur-[4px]" },
];

export default function ContactMain() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setShouldReduceMotion(preference.matches);
    updateMotionPreference();
    preference.addEventListener("change", updateMotionPreference);
    return () => preference.removeEventListener("change", updateMotionPreference);
  }, []);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 20 });
  const nearX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const nearY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const farX = useTransform(smoothX, [-1, 1], [6, -6]);
  const farY = useTransform(smoothY, [-1, 1], [5, -5]);

  const handleHeroMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };
  const handleHeroMouseLeave = () => { pointerX.set(0); pointerY.set(0); };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
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
      toast.error("Message could not be sent", { description: getContactErrorMessage(error) });
    } finally { setIsSubmitting(false); }
  };

  return (
    <section className="relative isolate min-h-0 overflow-hidden bg-[#faf8f4] text-[#083a35] min-[1100px]:min-h-[calc(100svh-112px)]" aria-labelledby="contact-heading"
      onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
      <div className="pointer-events-none absolute -top-[20px] -right-[32px] bottom-[58px] left-[32px] -z-2 hidden after:absolute
        after:inset-0 after:bg-[linear-gradient(90deg,rgba(250,248,244,0.45),transparent_50%)] after:content-['']
        min-[1100px]:block" aria-hidden="true">
        <Image src="/images/contact/contact-scene-no-sign-v3.png" alt="" fill priority
          sizes="100vw" quality={90} className="object-fill object-top" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-1" aria-hidden="true">
        {LEAVES.map(({ src, className }, index) => (
          <motion.div key={className} className={`absolute aspect-[3/2] ${className}`}
            style={{ x: shouldReduceMotion ? 0 : index % 2 ? farX : nearX,
              y: shouldReduceMotion ? 0 : index % 2 ? farY : nearY }}>
            <motion.div className="relative h-full w-full"
              animate={shouldReduceMotion ? { y: 0, rotate: 0 } : { y: [0, -8], rotate: [-2, 2] }}
              transition={shouldReduceMotion ? { duration: 0 } : {
                duration: 7, ease: [0.42, 0, 0.58, 1], repeat: Infinity,
                repeatType: "reverse", delay: index * -1.3,
              }}>
              <Image src={`/images/contact/${src}`} alt="" fill sizes="180px" draggable={false} className="object-contain" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-2 mx-auto grid max-w-[800px] grid-cols-1 gap-[30px] px-[20px] pt-[27px] pb-[36px]
        min-[600px]:gap-[38px] min-[600px]:px-[36px] min-[600px]:pt-[32px] min-[600px]:pb-[48px]
        min-[1100px]:max-w-[1560px] min-[1100px]:grid-cols-[minmax(0,.408fr)_minmax(0,.592fr)] min-[1100px]:gap-[24px]
        min-[1100px]:p-[40px] min-[1400px]:gap-[30px] min-[1400px]:pr-[24px] min-[1400px]:pl-[72px]">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-[9px] rounded-[30px] bg-[#eff3f0] px-[12px] py-[6px] text-[10px] leading-[16px]
            font-[750] tracking-[1px] uppercase min-[600px]:px-[14px] min-[600px]:py-[7px] min-[600px]:text-[12px]
            [&_svg]:text-[#e9a630]">
            <MessageCircleMore size={16} aria-hidden="true" /><span>Contact Us</span>
          </div>
          <h1 id="contact-heading" className="mt-[14px] mb-[3px] font-['Times_New_Roman',Georgia,serif] text-[56px] leading-[.97] font-bold tracking-[-2px]
            text-[#092d30] min-[600px]:mt-[13px] min-[600px]:text-[64px] min-[600px]:tracking-[-2.7px]
            min-[1100px]:text-[clamp(58px,4.2vw,70px)]">We&rsquo;re Here<br />For <span className="text-[#e9a630]">You.</span></h1>
          <p className="m-0 text-[14px] leading-[23px] text-[#667888] min-[600px]:text-[18px] min-[600px]:leading-[26px]
            min-[1100px]:text-[14px] min-[1100px]:leading-[23px] min-[1400px]:text-[18px] min-[1400px]:leading-[26px]
            min-[600px]:[&>span]:block">
            <span>Have a question, feedback, or a special request?</span>{" "}
            <span>Send us a message and our team will get back to you soon.</span>
          </p>

          <form onSubmit={handleSubmit} className="mt-[18px] grid gap-[17px] rounded-[16px] border border-[#e1e6e4] bg-white/94 px-[17px] py-[20px]
            shadow-[0_12px_32px_rgba(36,48,38,0.065)] min-[600px]:gap-[14px] min-[600px]:rounded-[18px] min-[600px]:px-[26px]
            min-[600px]:py-[22px] min-[1100px]:px-[20px] min-[1100px]:pt-[14px] min-[1100px]:pb-[26px] min-[1400px]:px-[26px]" aria-busy={isSubmitting}>
            <FormField label="Full Name" icon={User}>
              <input className={CONTROL_CLASS_NAME} name="name" type="text" required autoComplete="name" placeholder="Enter your name" />
            </FormField>
            <FormField label="Email Address" icon={Mail}>
              <input className={CONTROL_CLASS_NAME} name="email" type="email" required autoComplete="email" placeholder="Enter your email" />
            </FormField>
            <div className="grid grid-cols-1 gap-[17px] min-[600px]:grid-cols-2 min-[600px]:gap-[22px] min-[1100px]:gap-[14px] min-[1400px]:gap-[22px]">
              <FormField label="Phone Number" icon={Phone}>
                <input className={CONTROL_CLASS_NAME} name="phone_number" type="tel" required autoComplete="tel" placeholder="Enter your number" />
              </FormField>
              <FormField label="Subject" icon={MessageCircle}>
                <select className={`${CONTROL_CLASS_NAME} cursor-pointer appearance-none pr-[32px] invalid:text-[#8292ae] [&_option]:text-[#173d3d]`} name="subject" aria-label="Subject" required defaultValue="">
                  <option value="" disabled>Select a subject</option>
                  <option value="order">Order Assistance</option>
                  <option value="reservation">Table Booking</option>
                  <option value="menu">Menu Special Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other Enquiry</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-[13px] -translate-y-1/2" size={15} aria-hidden="true" />
              </FormField>
            </div>
            <FormField label="Message" icon={MessageCircle} multiline>
              <textarea className={`${CONTROL_CLASS_NAME} h-[88px] min-h-[68px] resize-y pt-[11px] leading-[21px] min-[600px]:h-[68px]`} name="message" required rows={3} placeholder="Type your message here..." />
            </FormField>
            <button className="flex h-[50px] cursor-pointer items-center justify-center gap-[14px] rounded-[10px] border-0
              bg-[linear-gradient(110deg,#006650,#00553f)] text-[13px] font-[650] tracking-[.8px] text-white uppercase
              shadow-[0_8px_18px_rgba(0,88,65,0.1)] transition-[background,transform,translate] duration-200 ease-[ease]
              hover:-translate-y-px hover:bg-[#004a38] hover:bg-none focus-visible:outline-[3px]
              focus-visible:outline-[#e9a630] focus-visible:outline-offset-4 disabled:translate-y-0 disabled:cursor-wait
              disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 [&_svg]:text-[#ecb536]" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <>Sending Message... <Loader2 size={20} className="animate-spin" aria-hidden="true" /></>
                : <>Send Message <Send size={21} aria-hidden="true" /></>}
            </button>
          </form>
          <div className="mt-[22px] flex items-center justify-between gap-[10px] text-[10px] min-[600px]:mt-[28px]
            min-[600px]:justify-normal min-[600px]:gap-[24px] min-[600px]:text-[13px] min-[1100px]:gap-[13px]
            min-[1100px]:text-[11px] min-[1400px]:gap-[24px] min-[1400px]:text-[13px] [&>span]:flex [&>span]:items-center
            [&>span]:gap-[5px] min-[600px]:[&>span]:gap-[12px] min-[600px]:[&>span]:whitespace-nowrap
            min-[1100px]:[&>span]:gap-[7px] min-[1400px]:[&>span]:gap-[12px] [&>span+span]:border-l
            [&>span+span]:border-[#8aa69d] [&>span+span]:pl-[10px] min-[600px]:[&>span+span]:pl-[24px]
            min-[1100px]:[&>span+span]:pl-[13px] min-[1400px]:[&>span+span]:pl-[24px] [&_svg]:size-[21px] [&_svg]:shrink-0
            [&_svg]:stroke-[1.5] min-[600px]:[&_svg]:size-[27px] min-[600px]:[&_svg]:shrink min-[1100px]:[&_svg]:size-[22px]
            min-[1400px]:[&_svg]:size-[27px] [&>span:nth-child(-n+2)_svg]:fill-[#065544]
            [&>span:nth-child(-n+2)_svg]:text-[#faf8f4]">
            <span><Leaf aria-hidden="true" />Good Food</span>
            <span><Leaf aria-hidden="true" />Great People</span>
            <span><Leaf aria-hidden="true" />Always Closer to You</span>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 items-center gap-[26px]
          min-[600px]:gap-[24px] min-[1100px]:flex min-[1100px]:flex-col min-[1100px]:items-stretch min-[1100px]:gap-0
          min-[1100px]:pt-[25px]">
          <div className="mx-auto block w-full overflow-hidden rounded-[18px] min-[600px]:max-w-[360px]
            min-[600px]:rounded-[120px_120px_18px_18px] min-[1100px]:hidden">
            <Image src="/images/contact/contact-scene-no-sign-v3.png"
              alt="Chicken biryani served in a copper handi with mint, raita and spices"
              width={1774} height={887}
              className="block aspect-[1.15] h-auto w-full object-cover object-right min-[600px]:aspect-auto min-[600px]:h-[410px]"
              loading="eager"
              quality={90}
              sizes="(max-width: 767px) 100vw, (max-width: 1099px) 55vw, 1px" />
          </div>
          <div className="col-span-full m-0 grid grid-cols-1 gap-[12px] p-0 min-[600px]:grid-cols-3 min-[600px]:gap-[14px]
            min-[1100px]:mt-auto min-[1100px]:mb-[21px] min-[1100px]:gap-[10px] min-[1100px]:pt-[58px]
            min-[1400px]:gap-[18px]">
            <ContactCard icon={MapPin} title="Empire Plaza Kochi">
              <p>NH 66, Near Sunrise Hospital,<br />Edappally, Kochi,<br />Kerala 682024</p>
            </ContactCard>
            <ContactCard icon={Phone} title="Call Us">
              <a className={`${CONTACT_LINK_CLASS_NAME} min-[1100px]:text-[12px] min-[1400px]:text-[14px]`} href="tel:+914844012020">+91 484 401 2020</a>
              <p>Mon - Sun<br />10:00 AM - 11:00 PM</p>
            </ContactCard>
            <ContactCard icon={Mail} title="Email Us">
              <a className={`${CONTACT_LINK_CLASS_NAME} [overflow-wrap:anywhere] min-[600px]:text-[12px] min-[1100px]:text-[10px] min-[1400px]:text-[12px]`} href="mailto:support@empireplaza.in">support@empireplaza.in</a>
              <p>We usually reply<br />within 24 hours</p>
            </ContactCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, icon: Icon, children, multiline = false }: {
  label: string; icon: LucideIcon; children: ReactNode; multiline?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-[5px] block text-[12px] leading-[16px] font-[650] text-[#102d32]">{label}</span>
      <span className="relative block">
        <Icon className={`pointer-events-none absolute left-[14px] ${multiline ? "top-[12px]" : "top-1/2 -translate-y-1/2"}`} size={19} strokeWidth={1.7} aria-hidden="true" />{children}
      </span>
    </label>
  );
}

function ContactCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode; }) {
  return (
    <div className="flex min-h-[110px] min-w-0 items-start gap-[16px] rounded-[16px] border border-[#e5e8e5] bg-white/97 p-[20px]
      shadow-[0_10px_30px_rgba(40,48,33,0.065)] min-[600px]:min-h-[130px] min-[600px]:flex-col min-[600px]:gap-[10px]
      min-[600px]:p-[18px] min-[1100px]:flex-row min-[1100px]:gap-[8px] min-[1100px]:px-[11px] min-[1100px]:py-[15px]
      min-[1400px]:gap-[13px] min-[1400px]:px-[18px] min-[1400px]:py-[17px]">
      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-[#def4ec] text-[#00604b]
        min-[1100px]:size-[34px] min-[1400px]:size-[42px]"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
      <div className="min-w-0 pt-[3px] min-[600px]:pt-0 min-[1100px]:pt-[6px] min-[1400px]:pt-[10px] [&>p]:m-0 [&>p]:text-[12px]
        [&>p]:leading-[19px] [&>p]:text-[#78869d] min-[1100px]:[&>p]:text-[11px] min-[1100px]:[&>p]:leading-[17px]
        min-[1400px]:[&>p]:text-[12px] min-[1400px]:[&>p]:leading-[19px]">
        <h3 className="mt-0 mb-[7px] text-[13px] leading-[17px] font-[650] text-[#102f32] min-[1100px]:text-[11px] min-[1400px]:text-[13px]">{title}</h3>{children}
      </div>
    </div>
  );
}

function getContactErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) return "An unexpected error occurred. Please try again.";
  if (!error.response) return "Unable to reach the server. Please check your connection and try again.";
  if (error.response.status === 429) return "Too many messages were sent from this connection. Please try again later.";
  const responseData = error.response.data;
  if (responseData && typeof responseData === "object") {
    const messages = Object.values(responseData)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .filter((value): value is string => typeof value === "string");
    if (messages.length > 0) return messages.join(" ");
  }
  return "Please check your information and try again.";
}
