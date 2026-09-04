import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type FormFieldProps = {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
};

export default function FormField({
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
        <Icon className="pointer-events-none absolute left-2.5 top-1/2 z-10 size-3.5 -translate-y-1/2 text-[#E7A43B] sm:left-3.5 sm:size-4" />
        {children}
      </span>
    </label>
  );
}