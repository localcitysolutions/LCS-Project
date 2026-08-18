import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { BRAND, pdfMoney, registerPdfFonts, styles } from "./theme";

registerPdfFonts();

// Every visible string is bilingual. Keeping the pairs here (rather than in the
// UI dictionary) means a PDF reads the same whether the staff member had the
// interface set to English or Arabic when they pressed download.
/**
 * Wraps a string in RIGHT-TO-LEFT MARKs.
 *
 * A PDF line is laid out left-to-right by default, so a standalone Arabic
 * sentence ending in "." has its full stop resolved as neutral and flipped to
 * the visual left — "‎.شكراً لتعاملكم معنا". The RLM pair pins the paragraph
 * direction to RTL for that run and the punctuation lands where a reader
 * expects it.
 */
const rlm = (text: string) => `‏${text}‏`;

const L = {
  taxInvoice: ["TAX INVOICE", "فاتورة ضريبية"],
  invoice: ["INVOICE", "فاتورة"],
  receipt: ["PAYMENT RECEIPT", "سند قبض"],
  statement: ["ACCOUNT STATEMENT", "كشف حساب"],
  billTo: ["BILL TO", "فاتورة إلى"],
  receivedFrom: ["RECEIVED FROM", "استلمنا من"],
  from: ["FROM", "من"],
  invoiceNo: ["Invoice no.", "رقم الفاتورة"],
  receiptNo: ["Receipt no.", "رقم السند"],
  issueDate: ["Issue date", "تاريخ الإصدار"],
  dueDate: ["Due date", "تاريخ الاستحقاق"],
  paidOn: ["Paid on", "تاريخ الدفع"],
  method: ["Method", "طريقة الدفع"],
  reference: ["Reference", "المرجع"],
  vatNo: ["VAT no.", "الرقم الضريبي"],
  crNo: ["CR no.", "السجل التجاري"],
  description: ["Description", "الوصف"],
  period: ["Period", "الفترة"],
  amount: ["Amount", "المبلغ"],
  subtotal: ["Subtotal", "المجموع الفرعي"],
  // No digits in the Arabic half: a trailing "15%" gets bidi-reordered to the
  // wrong side of the label when it sits at the end of an RTL run.
  vat: ["VAT 15%", "ضريبة القيمة المضافة"],
  total: ["Total", "الإجمالي"],
  received: ["Received", "المدفوع"],
  balanceDue: ["BALANCE DUE", "المبلغ المستحق"],
  amountPaid: ["AMOUNT PAID", "المبلغ المدفوع"],
  totalOutstanding: ["TOTAL OUTSTANDING", "إجمالي المستحق"],
  advanceCredit: ["Advance / credit held", "الرصيد المدفوع مقدماً"],
  appliedTo: ["Applied to", "مُطبَّق على"],
  unapplied: ["Held as advance credit", "محتفظ به كرصيد مقدم"],
  payTo: ["PAYMENT DETAILS", "بيانات السداد"],
  bank: ["Bank", "البنك"],
  iban: ["IBAN", "الآيبان"],
  overdue: ["OVERDUE", "متأخر"],
  paidStamp: ["PAID", "مدفوعة"],
  partial: ["PARTLY PAID", "مدفوعة جزئياً"],
  unpaid: ["UNPAID", "غير مدفوعة"],
  thanks: [
    "Thank you for your business.",
    "شكراً لتعاملكم معنا.",
  ],
  computerGenerated: [
    "This is a computer-generated document and is valid without a signature.",
    "هذا مستند صادر إلكترونياً وصالح بدون توقيع.",
  ],
  noOutstanding: ["No outstanding charges.", "لا توجد مبالغ مستحقة."],
} as const;

type Pair = readonly [string, string];

export type PdfCompany = {
  name_en: string;
  name_ar: string;
  vat_number: string | null;
  cr_number: string | null;
  address_en: string | null;
  address_ar: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  bank_name: string | null;
  iban: string | null;
  payment_terms_en: string | null;
  payment_terms_ar: string | null;
};

export type PdfClient = {
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  vat_number: string | null;
};

export type PdfCharge = {
  id: string;
  invoice_number: string | null;
  kind: string;
  description: string | null;
  period_label: string | null;
  amount: number;
  vat_amount: number;
  total: number;
  amount_paid: number;
  balance: number;
  currency: string;
  due_date: string | null;
  created_at: string;
  status: string;
  is_overdue: boolean;
};

export type PdfReceipt = {
  receipt_number: string | null;
  amount: number;
  currency: string;
  received_at: string;
  method: string;
  reference: string | null;
  allocations: { label: string; amount: number }[];
  unapplied: number;
};

const METHOD_LABELS: Record<string, Pair> = {
  bank: ["Bank transfer", "تحويل بنكي"],
  cash: ["Cash", "نقداً"],
  stc_pay: ["STC Pay", "STC Pay"],
  card: ["Card", "بطاقة"],
  cheque: ["Cheque", "شيك"],
  other: ["Other", "أخرى"],
};

// ── Small building blocks ───────────────────────────────────────────────────

/** Table header cell: English on top, Arabic beneath. Stacking rather than
 * joining with "·" keeps adjacent columns from visually running together once
 * the Arabic caption is longer than the English one. */
function Th({ pair, style }: { pair: Pair; style?: Style | Style[] }) {
  return (
    <View style={style}>
      <Text style={{ fontWeight: 700, fontSize: 8 }}>{pair[0]}</Text>
      <Text style={{ fontSize: 7.5, color: BRAND.muted }}>{rlm(pair[1])}</Text>
    </View>
  );
}

function Field({ pair, value }: { pair: Pair; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 1.5 }}>
      <Text style={{ color: BRAND.muted, fontSize: 8 }}>
        {pair[0]} · {pair[1]}
      </Text>
      <Text style={{ fontWeight: 700 }}>{value}</Text>
    </View>
  );
}

function StatusBadge({ status, overdue }: { status: string; overdue: boolean }) {
  const pair = overdue
    ? L.overdue
    : status === "paid"
      ? L.paidStamp
      : status === "partial"
        ? L.partial
        : L.unpaid;
  const bg =
    status === "paid" ? BRAND.good : overdue ? BRAND.danger : status === "partial" ? BRAND.accent : BRAND.muted;
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={{ color: "#FFFFFF", fontSize: 8, fontWeight: 700 }}>
        {pair[0]} · {pair[1]}
      </Text>
    </View>
  );
}

function Header({ company, title }: { company: PdfCompany; title: Pair }) {
  return (
    <View style={styles.headerRow}>
      {/* Fixed-width title column so a long Arabic company name can never run
          into "ACCOUNT STATEMENT", the widest of the three titles. */}
      <View style={{ flex: 1, paddingRight: 14 }}>
        <Text style={styles.sellerName}>{company.name_en}</Text>
        {!!company.name_ar && <Text style={styles.sellerNameAr}>{rlm(company.name_ar)}</Text>}
        <View style={{ marginTop: 5 }}>
          {!!company.address_en && <Text style={styles.muted}>{company.address_en}</Text>}
          {!!company.address_ar && (
            <Text style={[styles.muted, { textAlign: "right" }]}>{rlm(company.address_ar)}</Text>
          )}
          {!!company.phone && <Text style={styles.muted}>{company.phone}</Text>}
          {!!company.email && <Text style={styles.muted}>{company.email}</Text>}
          {!!company.website && <Text style={styles.muted}>{company.website}</Text>}
        </View>
        {/* Caption line then value line. Putting a number after the Arabic
            caption on one line lets bidi reorder it to the wrong side of the
            label, and a colon between them migrates to the wrong end. */}
        <View style={{ marginTop: 5 }}>
          {!!company.vat_number && (
            <>
              <Text style={[styles.muted, { fontSize: 8 }]}>
                {L.vatNo[0]} · {rlm(L.vatNo[1])}
              </Text>
              <Text style={{ fontWeight: 700 }}>{company.vat_number}</Text>
            </>
          )}
          {!!company.cr_number && (
            <>
              <Text style={[styles.muted, { fontSize: 8, marginTop: 2 }]}>
                {L.crNo[0]} · {rlm(L.crNo[1])}
              </Text>
              <Text style={{ fontWeight: 700 }}>{company.cr_number}</Text>
            </>
          )}
        </View>
      </View>
      <View style={{ width: 168, flexShrink: 0, alignItems: "flex-end" }}>
        <Text style={styles.docTitle}>{title[0]}</Text>
        <Text style={styles.docTitleAr}>{rlm(title[1])}</Text>
      </View>
    </View>
  );
}

function PartyBox({ pair, client }: { pair: Pair; client: PdfClient }) {
  return (
    <View style={styles.col}>
      <Text style={styles.boxLabel}>
        {pair[0]} · {pair[1]}
      </Text>
      <Text style={{ fontWeight: 700, fontSize: 10 }}>{client.company || client.name}</Text>
      {!!client.company && <Text style={styles.muted}>{client.name}</Text>}
      {!!client.email && <Text style={styles.muted}>{client.email}</Text>}
      {!!client.phone && <Text style={styles.muted}>{client.phone}</Text>}
      {!!client.vat_number && (
        <Text style={styles.muted}>
          {L.vatNo[0]} {client.vat_number}
        </Text>
      )}
    </View>
  );
}

function PaymentDetails({ company }: { company: PdfCompany }) {
  if (!company.bank_name && !company.iban && !company.payment_terms_en) return null;
  return (
    <View style={{ marginTop: 18, backgroundColor: BRAND.softBg, padding: 10 }}>
      <Text style={styles.boxLabel}>
        {L.payTo[0]} · {L.payTo[1]}
      </Text>
      {!!company.bank_name && <Field pair={L.bank} value={company.bank_name} />}
      {!!company.iban && <Field pair={L.iban} value={company.iban} />}
      {!!company.payment_terms_en && (
        <Text style={[styles.muted, { marginTop: 4 }]}>{company.payment_terms_en}</Text>
      )}
      {!!company.payment_terms_ar && (
        <Text style={[styles.muted, { textAlign: "right" }]}>{rlm(company.payment_terms_ar)}</Text>
      )}
    </View>
  );
}

function Footer({ company }: { company: PdfCompany }) {
  return (
    <View style={styles.footer} fixed>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{L.computerGenerated[0]}</Text>
        <Text
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{company.name_en}</Text>
        <Text>{rlm(L.computerGenerated[1])}</Text>
      </View>
    </View>
  );
}

function TotalsBlock({
  charge,
  showBalance = true,
}: {
  charge: PdfCharge;
  showBalance?: boolean;
}) {
  const hasVat = Number(charge.vat_amount) > 0;
  return (
    <View style={styles.totalsBox}>
      <View style={styles.totalRow}>
        <Text style={styles.muted}>
          {L.subtotal[0]} · {L.subtotal[1]}
        </Text>
        <Text>{pdfMoney(charge.amount, charge.currency)}</Text>
      </View>
      {hasVat && (
        <View style={styles.totalRow}>
          <Text style={styles.muted}>
            {L.vat[0]} · {L.vat[1]}
          </Text>
          <Text>{pdfMoney(charge.vat_amount, charge.currency)}</Text>
        </View>
      )}
      <View style={styles.totalRow}>
        <Text style={styles.muted}>
          {L.total[0]} · {L.total[1]}
        </Text>
        <Text style={{ fontWeight: 700 }}>{pdfMoney(charge.total, charge.currency)}</Text>
      </View>
      {Number(charge.amount_paid) > 0 && (
        <View style={styles.totalRow}>
          <Text style={styles.muted}>
            {L.received[0]} · {L.received[1]}
          </Text>
          <Text>− {pdfMoney(charge.amount_paid, charge.currency)}</Text>
        </View>
      )}
      {showBalance && (
        <View style={styles.grandRow}>
          <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 9 }}>
            {charge.balance > 0 ? L.balanceDue[0] : L.amountPaid[0]}
          </Text>
          <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 11 }}>
            {pdfMoney(charge.balance > 0 ? charge.balance : charge.total, charge.currency)}
          </Text>
        </View>
      )}
    </View>
  );
}

function QrBlock({ qr }: { qr: string | null }) {
  if (!qr) return null;
  return (
    <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", gap: 8 }}>
      {/* react-pdf's Image primitive, not an HTML <img> — it has no alt prop. */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image src={qr} style={{ width: 82, height: 82 }} />
      <View>
        <Text style={{ fontSize: 7.5, color: BRAND.muted }}>ZATCA simplified tax invoice</Text>
        <Text style={{ fontSize: 7.5, color: BRAND.muted, textAlign: "right" }}>
          {rlm("فاتورة ضريبية مبسطة معتمدة")}
        </Text>
      </View>
    </View>
  );
}

// ── Invoice ─────────────────────────────────────────────────────────────────

export function InvoicePage({
  company,
  client,
  charge,
  qr,
}: {
  company: PdfCompany;
  client: PdfClient;
  charge: PdfCharge;
  qr: string | null;
}) {
  const isTax = Number(charge.vat_amount) > 0;
  return (
    <Page size="A4" style={styles.page}>
      <Header company={company} title={isTax ? L.taxInvoice : L.invoice} />
      <View style={styles.rule} />

      <View style={styles.twoCol}>
        <PartyBox pair={L.billTo} client={client} />
        <View style={styles.col}>
          <Field pair={L.invoiceNo} value={charge.invoice_number || "—"} />
          <Field pair={L.issueDate} value={charge.created_at.slice(0, 10)} />
          <Field pair={L.dueDate} value={charge.due_date || "—"} />
          <View style={{ marginTop: 6 }}>
            <StatusBadge status={charge.status} overdue={charge.is_overdue} />
          </View>
        </View>
      </View>

      <View style={{ marginTop: 18 }}>
        <View style={styles.tableHead}>
          <Th pair={L.description} style={styles.cellDesc} />
          <Th pair={L.amount} style={[styles.cellNum, { alignItems: "flex-end" }]} />
        </View>
        <View style={styles.tableRow}>
          <View style={styles.cellDesc}>
            <Text>{charge.description || "—"}</Text>
            {/* Skip when the description already names the month, which is the
                case for every generated monthly charge. */}
            {!!charge.period_label && !charge.description?.includes(charge.period_label) && (
              <Text style={[styles.muted, { fontSize: 8 }]}>
                {charge.period_label} — {L.period[0]} · {rlm(L.period[1])}
              </Text>
            )}
          </View>
          <Text style={styles.cellNum}>{pdfMoney(charge.amount, charge.currency)}</Text>
        </View>
      </View>

      <TotalsBlock charge={charge} />
      <QrBlock qr={qr} />
      <PaymentDetails company={company} />
      <Footer company={company} />
    </Page>
  );
}

export function InvoiceDocument(props: {
  company: PdfCompany;
  client: PdfClient;
  charge: PdfCharge;
  qr: string | null;
}) {
  return (
    <Document
      title={`Invoice ${props.charge.invoice_number || ""}`.trim()}
      author={props.company.name_en}
    >
      <InvoicePage {...props} />
    </Document>
  );
}

/** One combined PDF, one invoice per page — for chasing every open charge at
 * once instead of downloading them one by one. */
export function BulkInvoicesDocument({
  company,
  items,
}: {
  company: PdfCompany;
  items: { client: PdfClient; charge: PdfCharge; qr: string | null }[];
}) {
  return (
    <Document title="Outstanding invoices" author={company.name_en}>
      {items.map((item) => (
        <InvoicePage
          key={item.charge.id}
          company={company}
          client={item.client}
          charge={item.charge}
          qr={item.qr}
        />
      ))}
    </Document>
  );
}

// ── Receipt ─────────────────────────────────────────────────────────────────

export function ReceiptDocument({
  company,
  client,
  receipt,
  qr,
}: {
  company: PdfCompany;
  client: PdfClient;
  receipt: PdfReceipt;
  qr: string | null;
}) {
  const method = METHOD_LABELS[receipt.method] || METHOD_LABELS.other;
  return (
    <Document title={`Receipt ${receipt.receipt_number || ""}`.trim()} author={company.name_en}>
      <Page size="A4" style={styles.page}>
        <Header company={company} title={L.receipt} />
        <View style={styles.rule} />

        <View style={styles.twoCol}>
          <PartyBox pair={L.receivedFrom} client={client} />
          <View style={styles.col}>
            <Field pair={L.receiptNo} value={receipt.receipt_number || "—"} />
            <Field pair={L.paidOn} value={receipt.received_at} />
            <Field pair={L.method} value={`${method[0]} · ${method[1]}`} />
            {!!receipt.reference && <Field pair={L.reference} value={receipt.reference} />}
            <View style={{ marginTop: 6 }}>
              <View style={[styles.badge, { backgroundColor: BRAND.good }]}>
                <Text style={{ color: "#FFFFFF", fontSize: 8, fontWeight: 700 }}>
                  {L.paidStamp[0]} · {L.paidStamp[1]}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <View style={styles.tableHead}>
            <Th pair={L.appliedTo} style={styles.cellDesc} />
            <Th pair={L.amount} style={[styles.cellNum, { alignItems: "flex-end" }]} />
          </View>
          {receipt.allocations.map((a, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cellDesc}>{a.label}</Text>
              <Text style={styles.cellNum}>{pdfMoney(a.amount, receipt.currency)}</Text>
            </View>
          ))}
          {receipt.unapplied > 0.005 && (
            <View style={styles.tableRow}>
              <Text style={styles.cellDesc}>
                {L.unapplied[0]} · {L.unapplied[1]}
              </Text>
              <Text style={styles.cellNum}>{pdfMoney(receipt.unapplied, receipt.currency)}</Text>
            </View>
          )}
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.grandRow}>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 9 }}>{L.amountPaid[0]}</Text>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 11 }}>
              {pdfMoney(receipt.amount, receipt.currency)}
            </Text>
          </View>
        </View>

        <QrBlock qr={qr} />

        <View style={{ marginTop: 18 }}>
          <Text>{L.thanks[0]}</Text>
          <Text style={{ textAlign: "right" }}>{rlm(L.thanks[1])}</Text>
        </View>

        <Footer company={company} />
      </Page>
    </Document>
  );
}

// ── Statement ───────────────────────────────────────────────────────────────

export function StatementDocument({
  company,
  client,
  charges,
  currency,
  outstanding,
  credit,
  asOf,
}: {
  company: PdfCompany;
  client: PdfClient;
  charges: PdfCharge[];
  currency: string;
  outstanding: number;
  credit: number;
  asOf: string;
}) {
  return (
    <Document title={`Statement — ${client.name}`} author={company.name_en}>
      <Page size="A4" style={styles.page}>
        <Header company={company} title={L.statement} />
        <View style={styles.rule} />

        <View style={styles.twoCol}>
          <PartyBox pair={L.billTo} client={client} />
          <View style={styles.col}>
            <Field pair={L.issueDate} value={asOf} />
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <View style={styles.tableHead}>
            <Th pair={L.description} style={styles.cellDesc} />
            <Th pair={L.dueDate} style={[styles.cellNum, { alignItems: "flex-end" }]} />
            <Th pair={L.total} style={[styles.cellNum, { alignItems: "flex-end" }]} />
            <Th pair={L.balanceDue} style={[styles.cellNum, { flex: 2, alignItems: "flex-end" }]} />
          </View>

          {charges.length === 0 && (
            <View style={styles.tableRow}>
              <Text style={styles.cellDesc}>
                {L.noOutstanding[0]} · {L.noOutstanding[1]}
              </Text>
            </View>
          )}

          {charges.map((c) => (
            <View key={c.id} style={styles.tableRow} wrap={false}>
              <View style={styles.cellDesc}>
                <Text>{c.description || "—"}</Text>
                <Text style={[styles.muted, { fontSize: 7.5 }]}>
                  {c.invoice_number || "—"}
                  {c.is_overdue ? ` · ${L.overdue[0]} · ${L.overdue[1]}` : ""}
                </Text>
              </View>
              <Text style={styles.cellNum}>{c.due_date || "—"}</Text>
              <Text style={styles.cellNum}>{pdfMoney(c.total, c.currency)}</Text>
              <Text
                style={[
                  styles.cellNum,
                  { flex: 2, fontWeight: 700, color: c.is_overdue ? BRAND.danger : BRAND.ink },
                ]}
              >
                {pdfMoney(c.balance, c.currency)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBox}>
          {credit > 0.005 && (
            <View style={styles.totalRow}>
              <Text style={styles.muted}>
                {L.advanceCredit[0]} · {L.advanceCredit[1]}
              </Text>
              <Text>{pdfMoney(credit, currency)}</Text>
            </View>
          )}
          <View style={styles.grandRow}>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 9 }}>
              {L.totalOutstanding[0]}
            </Text>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 11 }}>
              {pdfMoney(outstanding, currency)}
            </Text>
          </View>
          <Text style={{ textAlign: "right", fontSize: 8, color: BRAND.muted, marginTop: 3 }}>
            {rlm(L.totalOutstanding[1])}
          </Text>
        </View>

        <PaymentDetails company={company} />
        <Footer company={company} />
      </Page>
    </Document>
  );
}
