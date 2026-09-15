// Small helpers for rendering order/payment status badges.
// The API has only been observed sending "pending" so far, so this map
// covers the other common status values a food-ordering backend tends to
// use — anything not listed falls back to a neutral grey badge instead of
// breaking, and the label is always derived from the raw value.

const STATUS_BADGE_CLASSES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  confirmed: "bg-blue-50 text-blue-600 border-blue-200",
  preparing: "bg-blue-50 text-blue-600 border-blue-200",
  out_for_delivery: "bg-purple-50 text-purple-600 border-purple-200",
  delivered: "bg-green-50 text-green-600 border-green-200",
  completed: "bg-green-50 text-green-600 border-green-200",
  paid: "bg-green-50 text-green-600 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  failed: "bg-red-50 text-red-600 border-red-200",
  refunded: "bg-slate-50 text-slate-500 border-slate-200",
};

const DEFAULT_BADGE_CLASS = "bg-gray-50 text-gray-500 border-gray-200";

export function getStatusBadgeClass(status: string): string {
  return STATUS_BADGE_CLASSES[status?.toLowerCase?.() ?? ""] ?? DEFAULT_BADGE_CLASS;
}

export function formatStatusLabel(status: string): string {
  if (!status) return "—";
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
