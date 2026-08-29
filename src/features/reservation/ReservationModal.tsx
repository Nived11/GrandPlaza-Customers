"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock3,
  Loader2,
  Mail,
  Phone,
  Send,
  Sparkles,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const inputClass =
  "h-9 sm:h-11 md:h-12 w-full min-w-0 rounded-lg sm:rounded-[10px] border border-[#DDE5E1] bg-[#F7F9F8] px-2.5 pl-8 sm:px-3 sm:pl-10 text-xs sm:text-sm text-[#102A2A] outline-none transition placeholder:text-[#94A3B8] hover:border-[#BCCBC4] focus:border-[#006B52] focus:bg-white focus:ring-4 focus:ring-[#006B52]/10";

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const minimumDate = getLocalDate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookingDate = String(formData.get("booking_date") ?? "");
    const bookingTime = String(formData.get("booking_time") ?? "");
    const email = String(formData.get("email") ?? "").trim();
    const specialRequest = String(
      formData.get("special_request") ?? ""
    ).trim();

    if (
      bookingDate === getLocalDate() &&
      bookingTime <= getCurrentTime()
    ) {
      toast.error("Please select a future booking time.");
      return;
    }

    const payload = {
      customer_name: String(
        formData.get("customer_name") ?? ""
      ).trim(),
      phone_number: String(
        formData.get("phone_number") ?? ""
      ).trim(),
      email: email || null,
      number_of_guests: Number(
        formData.get("number_of_guests")
      ),
      booking_date: bookingDate,
      booking_time: bookingTime,
      special_request: specialRequest || null,
    };

    setIsSubmitting(true);

    try {
      await axiosInstance.post(
        "/accounts/table-bookings",
        payload
      );

      form.reset();

      toast.success("Table reservation received!", {
        description:
          "Our team will contact you shortly to confirm your booking.",
      });

      onClose();
    } catch (error) {
      toast.error("Reservation could not be completed", {
        description: getBookingErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07130F]/70 p-2 backdrop-blur-[5px] sm:p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-modal-title"
        className="relative max-h-[96dvh] w-full max-w-[95vw] overflow-hidden rounded-xl border border-white/50 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:w-[90vw] sm:max-h-[90dvh] sm:rounded-2xl md:max-w-[640px] md:rounded-[22px] lg:w-[860px] lg:max-w-[92vw]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close reservation form"
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F3] text-[#52635D] transition hover:bg-[#006B52] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:right-4 sm:top-4 sm:h-9 sm:w-9 md:right-5 md:top-5"
        >
          <X size={16} className="sm:size-5" />
        </button>

        <div className="p-3.5 sm:p-6 lg:p-8">
          <div className="mx-auto mb-3 max-w-xl text-center sm:mb-5 md:mb-6">
            <div className="mb-1 flex items-center justify-center gap-1.5 pr-7 text-[#E7A43B] sm:mb-2 sm:gap-2 md:pr-0">
              <span className="h-px w-6 bg-brand-gold/60 sm:w-8" />

              <Sparkles size={12} className="sm:size-3.5" />

              <span className="text-[8px] font-bold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em]">
                Reserve your experience
              </span>

              <span className="h-px w-6 bg-brand-gold/60 sm:w-8" />
            </div>

            <h2
              id="reservation-modal-title"
              className="pr-7 font-serif text-lg font-black uppercase leading-tight tracking-tight text-[#102A2A] sm:text-2xl md:pr-0 md:text-3xl"
            >
              Table{" "}
              <span className="text-[#E7A43B]">
                Reservation
              </span>
            </h2>

            <p className="mx-auto mt-1 max-w-lg text-[10px] leading-tight text-gray-500 sm:mt-2 sm:text-xs sm:leading-5">
              Reserve your table at Empire Plaza and enjoy a
              memorable dining experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <FormField label="Full Name" icon={User}>
                <input
                  type="text"
                  name="customer_name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  autoFocus
                  className={inputClass}
                />
              </FormField>

              <FormField label="Phone Number" icon={Phone}>
                <input
                  type="tel"
                  name="phone_number"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  minLength={10}
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="10-digit phone number"
                  title="Enter a valid 10-digit phone number"
                  className={inputClass}
                />
              </FormField>
            </div>

            <FormField label="Email (Optional)" icon={Mail}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="mail@example.com"
                className={inputClass}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
              <FormField label="Date" icon={CalendarDays}>
                <input
                  type="date"
                  name="booking_date"
                  required
                  min={minimumDate}
                  className={inputClass}
                />
              </FormField>

              <FormField label="Time" icon={Clock3}>
                <input
                  type="time"
                  name="booking_time"
                  required
                  className={inputClass}
                />
              </FormField>

              <div className="col-span-2 md:col-span-1">
                <FormField label="Guests" icon={Users}>
                  <select
                    name="number_of_guests"
                    required
                    defaultValue="2"
                    className={`${inputClass} cursor-pointer appearance-none`}
                  >
                    {Array.from(
                      { length: 12 },
                      (_, index) => {
                        const count = index + 1;

                        return (
                          <option key={count} value={count}>
                            {count}{" "}
                            {count === 1
                              ? "Guest"
                              : "Guests"}
                          </option>
                        );
                      }
                    )}
                  </select>
                </FormField>
              </div>
            </div>

            <div>
              <label
                htmlFor="special_request"
                className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#29483D] sm:mb-1.5 sm:text-[10px]"
              >
                Special Requests (Optional)
              </label>

              <textarea
                id="special_request"
                name="special_request"
                rows={2}
                maxLength={500}
                placeholder="Birthday celebration, preferred seating, dietary requirements..."
                className="h-14 w-full min-w-0 resize-none rounded-lg border border-[#DDE5E1] bg-[#F7F9F8] px-2.5 py-2 text-xs leading-4 text-[#102A2A] outline-none transition placeholder:text-[#94A3B8] hover:border-[#BCCBC4] focus:border-[#006B52] focus:bg-white focus:ring-4 focus:ring-[#006B52]/10 sm:h-20 sm:rounded-[10px] sm:px-3 sm:py-3 sm:text-sm sm:leading-5"
              />
            </div>

            <div className="pt-0.5 text-center sm:pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#E7A43B]/30 bg-gradient-to-r from-[#005F49] to-[#00745A] px-6 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_26px_rgba(0,107,82,0.22)] transition hover:-translate-y-0.5 hover:from-[#004F3D] hover:to-[#00664E] hover:shadow-[0_14px_30px_rgba(0,107,82,0.28)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:h-12 sm:px-8 sm:text-xs md:w-auto md:min-w-[280px]"
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  </>
                ) : (
                  <>
                    Submit Reservation
                    <Send
                      size={14}
                      className="text-[#F6C35B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4"
                    />
                  </>
                )}
              </button>

              <p className="mt-1 text-[9px] leading-tight text-gray-500 sm:mt-2 sm:text-[10px] sm:leading-4">
                Reservation is pending until confirmed by our
                team.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
};

function FormField({
  label,
  icon: Icon,
  children,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#29483D] sm:mb-1.5 sm:text-[10px]">
        {label}
      </span>

      <span className="relative block">
        <Icon
          className="pointer-events-none absolute left-2.5 top-1/2 z-10 size-3.5 -translate-y-1/2 text-[#E7A43B] sm:left-3.5 sm:size-4"
        />

        {children}
      </span>
    </label>
  );
}

function getLocalDate() {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset();

  return new Date(
    date.getTime() - timezoneOffset * 60_000
  )
    .toISOString()
    .split("T")[0];
}

function getCurrentTime() {
  const date = new Date();

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function getBookingErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return "An unexpected error occurred. Please try again.";
  }

  if (!error.response) {
    return "Unable to reach the server. Please check your internet connection.";
  }

  if (error.response.status === 429) {
    return "Too many booking attempts. Please try again later.";
  }

  const responseData = error.response.data;

  if (responseData && typeof responseData === "object") {
    const messages = Object.values(responseData)
      .flatMap((value) =>
        Array.isArray(value) ? value : [value]
      )
      .filter(
        (value): value is string =>
          typeof value === "string"
      );

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return "Please check your booking information and try again.";
}