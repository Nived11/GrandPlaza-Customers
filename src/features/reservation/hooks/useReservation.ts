import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import { submitTableReservation } from "../api/reservationApi";
import { getLocalDate, getCurrentTime } from "@/utils/dateUtils";
import { extractErrorMessages } from "@/utils/extractErrorMessages"; 

export function useReservation(isOpen: boolean, onClose: () => void) {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    
    // HTML5 Validation Check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const bookingDate = String(formData.get("booking_date") ?? "");
    const bookingTime = String(formData.get("booking_time") ?? "");
    const phoneNumber = String(formData.get("phone_number") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const specialRequest = String(formData.get("special_request") ?? "").trim();

    // Extra Validation: Phone Number 10 Digits
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // Extra Validation: Future Date/Time Check
    if (bookingDate === getLocalDate() && bookingTime <= getCurrentTime()) {
      toast.error("Please select a future booking time.");
      return;
    }

    const payload = {
      customer_name: String(formData.get("customer_name") ?? "").trim(),
      phone_number: phoneNumber,
      email: email || null,
      number_of_guests: Number(formData.get("number_of_guests")),
      booking_date: bookingDate,
      booking_time: bookingTime,
      special_request: specialRequest || null,
    };

    setIsSubmitting(true);

    try {
      await submitTableReservation(payload);
      form.reset();
      toast.success("Table reservation submitted!");
      onClose();
    } catch (error) {
      toast.error(extractErrorMessages(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
    minimumDate: getLocalDate(),
  };
}