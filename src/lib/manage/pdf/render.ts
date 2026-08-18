import QRCode from "qrcode";
import { monthLabel } from "@/lib/manage/money";
import { shouldEmitZatcaQr, zatcaQrPayload } from "./zatca";
import type { PdfCharge, PdfClient, PdfCompany } from "./documents";

/** Falls back to sensible defaults so a PDF still renders correctly on day one,
 * before anyone has filled in the company settings page. */
export function toPdfCompany(row: Partial<PdfCompany> | null | undefined): PdfCompany {
  return {
    name_en: row?.name_en || "Local City Solutions",
    name_ar: row?.name_ar || "",
    vat_number: row?.vat_number ?? null,
    cr_number: row?.cr_number ?? null,
    address_en: row?.address_en ?? null,
    address_ar: row?.address_ar ?? null,
    phone: row?.phone ?? null,
    email: row?.email ?? null,
    website: row?.website ?? null,
    bank_name: row?.bank_name ?? null,
    iban: row?.iban ?? null,
    payment_terms_en: row?.payment_terms_en ?? null,
    payment_terms_ar: row?.payment_terms_ar ?? null,
  };
}

export function toPdfClient(row: {
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  vat_number?: string | null;
}): PdfClient {
  return {
    name: row.name,
    company: row.company ?? null,
    email: row.email ?? null,
    phone: row.phone ?? null,
    vat_number: row.vat_number ?? null,
  };
}

type ChargeRow = {
  id: string;
  invoice_number: string | null;
  kind: string;
  description: string | null;
  period_month: string | null;
  amount: number;
  vat_amount: number;
  total: number;
  amount_paid: number;
  balance?: number;
  currency: string;
  due_date: string | null;
  created_at: string;
  status: string;
  is_overdue?: boolean;
};

export function toPdfCharge(row: ChargeRow): PdfCharge {
  const total = Number(row.total);
  const paid = Number(row.amount_paid);
  return {
    id: row.id,
    invoice_number: row.invoice_number,
    kind: row.kind,
    description: row.description || defaultDescription(row),
    period_label: row.period_month ? monthLabel(row.period_month) : null,
    amount: Number(row.amount),
    vat_amount: Number(row.vat_amount),
    total,
    amount_paid: paid,
    balance: row.balance !== undefined ? Number(row.balance) : total - paid,
    currency: row.currency,
    due_date: row.due_date,
    created_at: row.created_at,
    status: row.status,
    is_overdue: Boolean(row.is_overdue),
  };
}

function defaultDescription(row: ChargeRow) {
  if (row.kind === "setup") return "Setup fee";
  if (row.kind === "monthly" && row.period_month) {
    return `Monthly service — ${monthLabel(row.period_month)}`;
  }
  return "Service charge";
}

/** Returns a PNG data URL for the ZATCA QR, or null when a QR would be
 * meaningless (no VAT charged, or the seller has no VAT number on file). */
export async function buildZatcaQr(
  company: PdfCompany,
  opts: { timestamp: string; totalWithVat: number; vatTotal: number }
): Promise<string | null> {
  if (!shouldEmitZatcaQr(company.vat_number, opts.vatTotal)) return null;

  const payload = zatcaQrPayload({
    sellerName: company.name_ar || company.name_en,
    vatNumber: company.vat_number as string,
    timestamp: opts.timestamp,
    totalWithVat: opts.totalWithVat,
    vatTotal: opts.vatTotal,
  });

  return QRCode.toDataURL(payload, { margin: 0, width: 360, errorCorrectionLevel: "M" });
}

/** Filenames go out to clients, so keep them to characters every operating
 * system and mail client handles without re-encoding. */
export function safeFilename(name: string) {
  return name.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "document";
}

export function pdfResponse(body: Uint8Array, filename: string) {
  return new Response(body as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFilename(filename)}"`,
      // These contain client financial data — never let a shared cache hold them.
      "Cache-Control": "private, no-store",
    },
  });
}
