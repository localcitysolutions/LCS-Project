/** Formats an amount for display. Kept in one place so every screen renders
 * money identically — two decimals, thousands separators, currency after the
 * number (which reads correctly in both the English and Arabic layouts). */
export function money(amount: number | string | null | undefined, currency = "SAR") {
  const value = Number(amount ?? 0);
  const formatted = (Number.isFinite(value) ? value : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${currency}`;
}

/** Today in Riyadh, as YYYY-MM-DD — the same day the database uses when it
 * decides what is due, so the UI and the books never disagree by a timezone. */
export function riyadhToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** "2026-08-01" → "Aug 2026". Used for the month a monthly charge covers. */
export function monthLabel(value: string | null | undefined, lang: "en" | "ar" = "en") {
  if (!value) return "—";
  const date = new Date(`${value.slice(0, 7)}-01T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
