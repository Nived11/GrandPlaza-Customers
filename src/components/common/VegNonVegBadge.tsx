import React from "react";

export interface VegNonVegIconProps {
  dietaryPreference?: "VEG" | "NON-VEG" | string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const VegNonVegIcon: React.FC<VegNonVegIconProps> = ({
  dietaryPreference,
  size = "sm",
  className = "",
}) => {
  if (!dietaryPreference) return null;

  const pref = dietaryPreference.trim().toUpperCase();
  const isVeg = pref === "VEG";
  const isNonVeg = pref === "NON-VEG" || pref === "NON_VEG";

  if (!isVeg && !isNonVeg) return null;

  // Box and inner dot sizes (FSSAI standard square with filled circle)
  const boxSize =
    size === "lg"
      ? "w-[18px] h-[18px]"
      : size === "md"
      ? "w-4 h-4"
      : "w-3.5 h-3.5";
  const dotSize =
    size === "lg" ? "w-2.5 h-2.5" : size === "md" ? "w-2 h-2" : "w-1.5 h-1.5";

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-[3px] border ${boxSize} ${
        isVeg
          ? "border-emerald-600 bg-emerald-50/50"
          : "border-red-600 bg-red-50/50"
      } ${className}`}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      <span
        className={`rounded-full ${dotSize} ${
          isVeg ? "bg-emerald-600" : "bg-red-600"
        }`}
      />
    </span>
  );
};

export interface VegNonVegBadgeProps extends VegNonVegIconProps {
  showText?: boolean;
  textClassName?: string;
}

export const VegNonVegBadge: React.FC<VegNonVegBadgeProps> = ({
  dietaryPreference,
  size = "sm",
  showText = true,
  className = "",
  textClassName = "",
}) => {
  if (!dietaryPreference) return null;

  const pref = dietaryPreference.trim().toUpperCase();
  const isVeg = pref === "VEG";
  const isNonVeg = pref === "NON-VEG" || pref === "NON_VEG";

  if (!isVeg && !isNonVeg) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <VegNonVegIcon dietaryPreference={dietaryPreference} size={size} />
      {showText && (
        <span
          className={`text-[7.5px] sm:text-[8.5px] font-black tracking-widest ${
            isVeg ? "text-emerald-700" : "text-red-600"
          } ${textClassName}`}
        >
          {pref}
        </span>
      )}
    </div>
  );
};

export default VegNonVegBadge;
