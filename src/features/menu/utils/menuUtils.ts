import type { HomeMenuItem, HomeVariant } from "@/features/home/hooks/useHomeHook";

const toNumber = (value: string | null | undefined): number | null => {
  if (value === null || value === undefined) return null;
  const n = parseFloat(value);
  return Number.isNaN(n) ? null : n;
};

// Reflects whatever the API returns. dietary_preference is mislabeled
// "VEG" on some meat/fish items in the live data (e.g. beef, fish,
// chicken dishes) — that's a data-quality issue to fix at the source,
// not something to silently work around here.
export const isVeg = (item: HomeMenuItem) =>
  item.dietary_preference?.toUpperCase() === "VEG";

const firstAvailableVariant = (variants: HomeVariant[]): HomeVariant | null =>
  variants.find((v) => v.is_available) ?? variants[0] ?? null;

export interface DisplayPrice {
  price: number | null;
  original: number | null;
}

export const getDisplayPrice = (item: HomeMenuItem): DisplayPrice => {
  if (item.has_variants) {
    const variant = firstAvailableVariant(item.variants);
    if (!variant) return { price: null, original: null }; // "Coming Soon" case

    const offer = toNumber(variant.offer_price);
    const actual = toNumber(variant.actual_price);
    return { price: offer ?? actual, original: offer ? actual : null };
  }

  const offer = toNumber(item.offer_price);
  const actual = toNumber(item.actual_price);
  return { price: offer ?? actual, original: offer ? actual : null };
};

export const getDiscountPercent = (item: HomeMenuItem): number | null => {
  const { price, original } = getDisplayPrice(item);
  if (!price || !original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
};

// item.section is clearly meant to power badges/curated rows
// (BEST SELLER, TODAY'S SPECIAL, BANNER, COMBO MENU).
export const getBadgeLabel = (item: HomeMenuItem): string | null => {
  if (item.section === "BEST SELLER") return "Bestseller";
  if (item.section === "TODAY'S SPECIAL") return "Today's Special";
  return null;
};

export const isOrderable = (item: HomeMenuItem): boolean => {
  if (!item.is_available) return false;
  if (item.has_variants) return item.variants.some((v) => v.is_available);
  return true;
};
