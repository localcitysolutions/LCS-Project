import { Font, StyleSheet } from "@react-pdf/renderer";
import { ALMARAI_BOLD_BASE64, ALMARAI_REGULAR_BASE64 } from "./font-data";

/**
 * Almarai is registered from an embedded data URL rather than a file path.
 * That keeps PDF rendering independent of how the serverless bundle lays out
 * files on disk, and means no network fetch on a cold start.
 *
 * Font choice is not cosmetic here: react-pdf's layout engine applies GSUB
 * (letter joining) but not GPOS mark attachment, so any Arabic font that draws
 * its dots as separately-positioned marks — Noto Naskh Arabic, for one —
 * renders with the dots scattered off their letters. Almarai carries the dots
 * inside the glyph outlines, so it comes out correct, and it is the same
 * family the public site uses.
 */
let registered = false;

export function registerPdfFonts() {
  if (registered) return;
  Font.register({
    family: "Almarai",
    fonts: [
      { src: `data:font/ttf;base64,${ALMARAI_REGULAR_BASE64}`, fontWeight: 400 },
      { src: `data:font/ttf;base64,${ALMARAI_BOLD_BASE64}`, fontWeight: 700 },
    ],
  });
  // Arabic must not be hyphenated, and react-pdf's default English hyphenation
  // callback would happily break words mid-token.
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}

export const BRAND = {
  ink: "#0E1A2E",
  muted: "#6B7684",
  line: "#DCE1E8",
  accent: "#C9A227",
  softBg: "#F5F7FA",
  danger: "#B3261E",
  good: "#1E7A48",
} as const;

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Almarai",
    fontSize: 9,
    color: BRAND.ink,
    paddingTop: 36,
    paddingBottom: 64,
    paddingHorizontal: 40,
    lineHeight: 1.5,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  // lineHeight is explicit here: the page-level 1.5 leaves these two stacked
  // title lines overlapping at this font size.
  docTitle: { fontSize: 15, fontWeight: 700, letterSpacing: 0.3, lineHeight: 1.2, textAlign: "right" },
  docTitleAr: { fontSize: 12, fontWeight: 700, textAlign: "right", lineHeight: 1.4 },
  sellerName: { fontSize: 12, fontWeight: 700 },
  sellerNameAr: { fontSize: 11, fontWeight: 700, textAlign: "right" },
  muted: { color: BRAND.muted },
  rule: { borderBottomWidth: 1, borderBottomColor: BRAND.line, marginVertical: 14 },
  twoCol: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  boxLabel: { fontSize: 7.5, color: BRAND.muted, letterSpacing: 0.6, marginBottom: 3 },
  tableHead: {
    flexDirection: "row",
    backgroundColor: BRAND.softBg,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.line,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.line,
  },
  cellDesc: { flex: 4 },
  cellNum: { flex: 1.6, textAlign: "right" },
  totalsBox: { marginTop: 12, alignSelf: "flex-end", width: 250 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: BRAND.ink,
    color: "#FFFFFF",
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 26,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: BRAND.line,
    paddingTop: 8,
    fontSize: 7.5,
    color: BRAND.muted,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontSize: 8,
    fontWeight: 700,
    alignSelf: "flex-start",
  },
});

/** Money on a document is always grouped, two-decimal, currency-suffixed. */
export function pdfMoney(value: number | string | null | undefined, currency = "SAR") {
  const n = Number(value ?? 0);
  const safe = Number.isFinite(n) ? n : 0;
  return `${safe.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}
