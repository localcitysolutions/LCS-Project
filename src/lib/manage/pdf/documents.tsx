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
  quotation: ["QUOTATION", "عرض سعر"],
  quoteNo: ["Quotation no.", "رقم العرض"],
  validUntil: ["Valid until", "صالح حتى"],
  quoteFor: ["QUOTATION FOR", "عرض سعر إلى"],
  item: ["#", "#"],
  billing: ["Billing", "نوع الفوترة"],
  qty: ["Qty", "الكمية"],
  unitPrice: ["Unit price", "سعر الوحدة"],
  lineTotal: ["Line total", "الإجمالي"],
  oneOffSubtotal: ["One-off subtotal", "المجموع لمرة واحدة"],
  discount: ["Discount", "الخصم"],
  dueOnAcceptance: ["TOTAL DUE ON ACCEPTANCE", "المستحق عند القبول"],
  recurring: ["Recurring monthly", "الاشتراك الشهري"],
  recurringNote: [
    "Billed every month after acceptance. Not included in the total above.",
    "يُحتسب شهرياً بعد القبول، وهو غير مشمول في الإجمالي أعلاه.",
  ],
  notes: ["Notes", "ملاحظات"],
  terms: ["Terms & conditions", "الشروط والأحكام"],
  acceptance: ["ACCEPTANCE", "الموافقة"],
  acceptanceNote: [
    "Sign and return this quotation to confirm the scope and pricing above.",
    "يُرجى التوقيع وإعادة هذا العرض لتأكيد النطاق والأسعار أعلاه.",
  ],
  signature: ["Client signature", "توقيع العميل"],
  nameLabel: ["Name", "الاسم"],
  dateLabel: ["Date", "التاريخ"],
  creditNote: ["CREDIT NOTE", "إشعار دائن"],
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
        {/* Label and value as a two-column row inside a narrow box: one line
            each instead of four, and the number never gets bidi-reordered to
            the wrong side of the Arabic caption because they are separate
            text nodes rather than one mixed-direction string. */}
        <View style={{ marginTop: 5, width: 215 }}>
          {!!company.vat_number && <Field pair={L.vatNo} value={company.vat_number} />}
          {!!company.cr_number && <Field pair={L.crNo} value={company.cr_number} />}
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

function PaymentDetails({ company, flush = false }: { company: PdfCompany; flush?: boolean }) {
  if (!company.bank_name && !company.iban && !company.payment_terms_en) return null;
  // wrap={false} keeps the whole block on one page — a page break through the
  // middle of it leaves an empty grey band at the foot of the previous page.
  return (
    <View
      style={{ marginTop: flush ? 0 : 14, backgroundColor: BRAND.softBg, padding: 10, flex: flush ? 1 : undefined }}
      wrap={false}
    >
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
  const isTax = Number(charge.vat_amount) !== 0;
  // A negative charge is a credit (a quotation discount, a write-off). It is
  // the same document with the opposite sign, and calling it an invoice would
  // be wrong on its face.
  const isCredit = Number(charge.total) < 0;
  return (
    <Page size="A4" style={styles.page}>
      <Header company={company} title={isCredit ? L.creditNote : isTax ? L.taxInvoice : L.invoice} />
      <View style={styles.rule} />

      <View style={styles.twoCol}>
        <PartyBox pair={L.billTo} client={client} />
        <View style={styles.col}>
          <Field pair={L.invoiceNo} value={charge.invoice_number || "—"} />
          <Field pair={L.issueDate} value={charge.created_at.slice(0, 10)} />
          <Field pair={L.dueDate} value={charge.due_date || "—"} />
          <View style={{ marginTop: 6 }}>
            {isCredit ? (
              <View style={[styles.badge, { backgroundColor: BRAND.accent }]}>
                <Text style={{ color: "#FFFFFF", fontSize: 8, fontWeight: 700 }}>
                  {L.creditNote[0]} · {L.creditNote[1]}
                </Text>
              </View>
            ) : (
              <StatusBadge status={charge.status} overdue={charge.is_overdue} />
            )}
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

// ── Quotation ───────────────────────────────────────────────────────────────

export type PdfQuotationItem = {
  id: string;
  position: number;
  description: string;
  kind: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type PdfQuotation = {
  quote_number: string | null;
  title: string | null;
  issue_date: string;
  valid_until: string | null;
  currency: string;
  discount: number;
  subtotal: number;
  vat_amount: number;
  total: number;
  monthly_total: number;
  notes: string | null;
  terms: string | null;
};

const KIND_LABELS: Record<string, Pair> = {
  monthly: ["Monthly", "شهري"],
  setup: ["Setup", "تأسيس"],
  one_off: ["One-off", "مرة واحدة"],
};

export function QuotationDocument({
  company,
  client,
  quotation,
  items,
}: {
  company: PdfCompany;
  client: PdfClient;
  quotation: PdfQuotation;
  items: PdfQuotationItem[];
}) {
  const cur = quotation.currency;
  // `subtotal` is stored net of the discount; the PDF shows the list price
  // first and the discount as its own line, which is what a client expects.
  const grossOneOff = quotation.subtotal + quotation.discount;

  return (
    <Document
      title={`Quotation ${quotation.quote_number || ""}`.trim()}
      author={company.name_en}
    >
      <Page size="A4" style={styles.page}>
        <Header company={company} title={L.quotation} />
        <View style={styles.rule} />

        <View style={styles.twoCol}>
          <PartyBox pair={L.quoteFor} client={client} />
          <View style={styles.col}>
            <Field pair={L.quoteNo} value={quotation.quote_number || "—"} />
            <Field pair={L.issueDate} value={quotation.issue_date} />
            <Field pair={L.validUntil} value={quotation.valid_until || "—"} />
          </View>
        </View>

        {!!quotation.title && (
          <Text style={{ marginTop: 14, fontSize: 12, fontWeight: 700 }}>{quotation.title}</Text>
        )}

        {/* `fixed` repeats this header row at the top of every page the table
            spills onto, so a long quote never continues with unlabelled
            columns. Rows carry wrap={false} so none is split across a break. */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.tableHead} fixed>
            <Text style={[styles.qCellIndex, { fontWeight: 700, fontSize: 8 }]}>{L.item[0]}</Text>
            <Th pair={L.description} style={styles.qCellDesc} />
            <Th pair={L.billing} style={styles.qCellKind} />
            <Th pair={L.qty} style={[styles.qCellQty, { alignItems: "flex-end" }]} />
            <Th pair={L.unitPrice} style={[styles.qCellUnit, { alignItems: "flex-end" }]} />
            <Th pair={L.lineTotal} style={[styles.qCellTotal, { alignItems: "flex-end" }]} />
          </View>

          {items.map((item, index) => {
            const kind = KIND_LABELS[item.kind] || KIND_LABELS.one_off;
            return (
              <View key={item.id} style={styles.tableRow} wrap={false}>
                <Text style={[styles.qCellIndex, styles.muted]}>{index + 1}</Text>
                <Text style={styles.qCellDesc}>{item.description}</Text>
                <Text style={[styles.qCellKind, styles.muted, { fontSize: 8 }]}>{kind[0]}</Text>
                <Text style={styles.qCellQty}>{item.quantity}</Text>
                <Text style={styles.qCellUnit}>{pdfMoney(item.unit_price, cur)}</Text>
                <Text style={[styles.qCellTotal, { fontWeight: 700 }]}>
                  {pdfMoney(item.line_total, cur)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Notes and terms sit to the left of the totals rather than beneath
            them. Stacked, they leave a tall empty column next to the totals
            box and push the signature block onto a second, near-empty page. */}
        <View style={{ flexDirection: "row", gap: 18, marginTop: 12 }}>
          <View style={{ flex: 1 }}>
            {!!quotation.notes && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.boxLabel}>
                  {L.notes[0]} · {L.notes[1]}
                </Text>
                <Text>{quotation.notes}</Text>
              </View>
            )}
            {!!quotation.terms && (
              <View>
                <Text style={styles.boxLabel}>
                  {L.terms[0]} · {L.terms[1]}
                </Text>
                <Text>{quotation.terms}</Text>
              </View>
            )}
          </View>

          <View style={{ width: 252 }} wrap={false}>
          <View style={styles.totalRow}>
            <Text style={styles.muted}>
              {L.oneOffSubtotal[0]} · {L.oneOffSubtotal[1]}
            </Text>
            <Text>{pdfMoney(grossOneOff, cur)}</Text>
          </View>
          {quotation.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.muted}>
                {L.discount[0]} · {L.discount[1]}
              </Text>
              <Text>− {pdfMoney(quotation.discount, cur)}</Text>
            </View>
          )}
          {quotation.vat_amount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.muted}>
                {L.vat[0]} · {L.vat[1]}
              </Text>
              <Text>{pdfMoney(quotation.vat_amount, cur)}</Text>
            </View>
          )}
          <View style={styles.grandRow}>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 8.5 }}>
              {L.dueOnAcceptance[0]}
            </Text>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 11 }}>
              {pdfMoney(quotation.total, cur)}
            </Text>
          </View>
          <Text style={{ textAlign: "right", fontSize: 8, color: BRAND.muted, marginTop: 3 }}>
            {rlm(L.dueOnAcceptance[1])}
          </Text>

          {quotation.monthly_total > 0 && (
            <View
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: BRAND.accent,
                padding: 8,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: 700, fontSize: 8.5 }}>{L.recurring[0]}</Text>
                <Text style={{ fontWeight: 700, fontSize: 11 }}>
                  {pdfMoney(quotation.monthly_total, cur)}
                </Text>
              </View>
              <Text style={{ fontSize: 7.5, color: BRAND.muted }}>{L.recurringNote[0]}</Text>
              <Text style={{ fontSize: 7.5, color: BRAND.muted, textAlign: "right" }}>
                {rlm(L.recurringNote[1])}
              </Text>
            </View>
          )}
          </View>
        </View>

        {/* Side by side rather than stacked: together they are about 150pt
            tall, which is exactly what tips a short quote onto a second,
            nearly-empty page. */}
        <View style={{ flexDirection: "row", gap: 14, marginTop: 14 }} wrap={false}>
          <PaymentDetails company={company} flush />
          <View style={{ flex: 1 }}>
            <Text style={styles.boxLabel}>
              {L.acceptance[0]} · {L.acceptance[1]}
            </Text>
            <Text style={[styles.muted, { fontSize: 8 }]}>{L.acceptanceNote[0]}</Text>
            <Text style={[styles.muted, { fontSize: 8, textAlign: "right" }]}>
              {rlm(L.acceptanceNote[1])}
            </Text>
            {[L.signature, L.nameLabel, L.dateLabel].map((pair, i) => (
              <View key={i} style={{ marginTop: i === 0 ? 14 : 12 }}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: BRAND.line }} />
                <Text style={{ fontSize: 7.5, color: BRAND.muted, marginTop: 2 }}>
                  {pair[0]} · {pair[1]}
                </Text>
              </View>
            ))}
          </View>
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

// ── Partner account statement ───────────────────────────────────────────────
// The running ledger between the two owners: every payment received, expense
// paid and transfer made, each with its effect on what partner A owes partner
// B, and the balance after it — read like a bank statement.

const PL = {
  title: ["PARTNER ACCOUNT STATEMENT", "كشف حساب الشركاء"],
  partners: ["PARTNERS", "الشركاء"],
  asOf: ["As of", "حتى تاريخ"],
  date: ["Date", "التاريخ"],
  entry: ["Entry", "البند"],
  amount: ["Amount", "المبلغ"],
  effect: ["Effect", "الأثر"],
  balance: ["Balance", "الرصيد"],
  owes: ["owes", "مدين لـ"],
  allSquare: ["All square — nothing owed.", "الحساب متساوٍ — لا مستحقات."],
  noEntries: ["No entries yet.", "لا توجد سجلات."],
} as const;

export type PdfLedgerEntry = {
  id: string;
  date: string;
  title: string;
  detail: string;
  amount: number;
  currency: string;
  effect: number;
  balanceAfter: number;
};

export function PartnerStatementDocument({
  company,
  partnerA,
  partnerB,
  entries,
  finalBalance,
  currency,
  asOf,
}: {
  company: PdfCompany;
  partnerA: string;
  partnerB: string;
  /** Oldest first. */
  entries: PdfLedgerEntry[];
  /** What partnerA owes partnerB; negative means the reverse. */
  finalBalance: number;
  currency: string;
  asOf: string;
}) {
  const owing =
    finalBalance > 0.005
      ? `${partnerA} ${PL.owes[0]} ${partnerB}`
      : finalBalance < -0.005
        ? `${partnerB} ${PL.owes[0]} ${partnerA}`
        : null;
  const owingAr =
    finalBalance > 0.005
      ? `${partnerA} ${PL.owes[1]} ${partnerB}`
      : finalBalance < -0.005
        ? `${partnerB} ${PL.owes[1]} ${partnerA}`
        : null;
  const signed = (v: number) => `${v > 0.005 ? "+" : v < -0.005 ? "−" : ""}${pdfMoney(Math.abs(v), currency)}`;

  return (
    <Document title="Partner account statement" author={company.name_en}>
      <Page size="A4" style={styles.page}>
        <Header company={company} title={PL.title} />
        <View style={styles.rule} />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.boxLabel}>
              {PL.partners[0]} · {PL.partners[1]}
            </Text>
            <Text style={{ fontWeight: 700, fontSize: 10 }}>
              {partnerA} · {partnerB}
            </Text>
            <Text style={[styles.muted, { fontSize: 7.5, marginTop: 2 }]}>
              {PL.effect[0]} / {PL.balance[0]}: {partnerA} {PL.owes[0]} {partnerB}
            </Text>
          </View>
          <View style={styles.col}>
            <Field pair={PL.asOf} value={asOf} />
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <View style={styles.tableHead} fixed>
            <Th pair={PL.date} style={{ width: 60 }} />
            <Th pair={PL.entry} style={{ flex: 1, paddingRight: 8 }} />
            <Th pair={PL.amount} style={{ width: 78, alignItems: "flex-end" }} />
            <Th pair={PL.effect} style={{ width: 78, alignItems: "flex-end" }} />
            <Th pair={PL.balance} style={{ width: 86, alignItems: "flex-end" }} />
          </View>

          {entries.length === 0 && (
            <View style={styles.tableRow}>
              <Text>
                {PL.noEntries[0]} · {PL.noEntries[1]}
              </Text>
            </View>
          )}

          {entries.map((e) => (
            <View key={e.id} style={styles.tableRow} wrap={false}>
              <Text style={{ width: 60 }}>{e.date}</Text>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text>{e.title}</Text>
                <Text style={[styles.muted, { fontSize: 7.5 }]}>{e.detail}</Text>
              </View>
              <Text style={{ width: 78, textAlign: "right" }}>{pdfMoney(e.amount, e.currency)}</Text>
              <Text
                style={{
                  width: 78,
                  textAlign: "right",
                  color: e.effect > 0.005 ? BRAND.danger : e.effect < -0.005 ? BRAND.good : BRAND.muted,
                }}
              >
                {signed(e.effect)}
              </Text>
              <Text style={{ width: 86, textAlign: "right", fontWeight: 700 }}>
                {signed(e.balanceAfter)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.grandRow}>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 9 }}>
              {owing || PL.allSquare[0]}
            </Text>
            <Text style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 11 }}>
              {pdfMoney(Math.abs(finalBalance), currency)}
            </Text>
          </View>
          <Text style={{ textAlign: "right", fontSize: 8, color: BRAND.muted, marginTop: 3 }}>
            {rlm(owingAr || PL.allSquare[1])}
          </Text>
        </View>

        <Footer company={company} />
      </Page>
    </Document>
  );
}
