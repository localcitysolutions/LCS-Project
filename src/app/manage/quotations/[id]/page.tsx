// The PDF link below is a plain <a>: it points at a route handler returning a
// file attachment, which next/link would try to navigate into rather than
// download.
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { money } from "@/lib/manage/money";
import {
  convertQuotationAction,
  deleteQuotationAction,
  duplicateQuotationAction,
  setQuotationStatusAction,
} from "../actions";
import ConvertPanel from "./ConvertPanel";
import type { QuotationStatus } from "@/types/manage";

export const dynamic = "force-dynamic";

const statusClasses: Record<QuotationStatus, string> = {
  draft: "bg-white/10 text-white/60",
  sent: "bg-blue-500/15 text-blue-300",
  accepted: "bg-green-500/15 text-green-400",
  declined: "bg-red-500/15 text-red-400",
  expired: "bg-white/10 text-white/40",
  converted: "bg-[#F5C518]/15 text-[#F5C518]",
};

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const [{ data: quotation }, { data: items }] = await Promise.all([
    supabase.from("quotations").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("quotation_items")
      .select("*")
      .eq("quotation_id", id)
      .order("position", { ascending: true }),
  ]);

  if (!quotation) notFound();

  const [{ data: client }, { data: plan }] = await Promise.all([
    supabase
      .from("clients")
      .select("id, name, company, email, phone")
      .eq("id", quotation.client_id)
      .maybeSingle(),
    supabase
      .from("billing_plans")
      .select("id, monthly_amount, currency")
      .eq("client_id", quotation.client_id)
      .eq("status", "active")
      .maybeSingle(),
  ]);

  const t = dict.quotations;
  const locked = quotation.status === "accepted" || quotation.status === "converted";
  const cur = quotation.currency;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold">{quotation.title || t.title}</h1>
          <p className="text-white/50 text-sm mt-0.5">
            {quotation.quote_number}
            {client && (
              <>
                {" · "}
                <Link href={`/manage/clients/${client.id}`} className="hover:text-[#F5C518]">
                  {client.company || client.name}
                </Link>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs px-3 py-1.5 rounded-full ${statusClasses[quotation.status]}`}>
            {t.statusLabels[quotation.status]}
          </span>
          <a
            href={`/manage/quotations/${id}/pdf`}
            className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm"
          >
            {t.pdf}
          </a>
          {!locked && (
            <Link
              href={`/manage/quotations/${id}/edit`}
              className="px-4 py-2 rounded-full bg-white/10 text-sm"
            >
              {dict.common.edit}
            </Link>
          )}
          <form action={duplicateQuotationAction.bind(null, id)}>
            <button className="px-4 py-2 rounded-full bg-white/10 text-sm">{t.duplicate}</button>
          </form>
          {quotation.status !== "converted" && (
            <form action={deleteQuotationAction.bind(null, id)}>
              <button className="px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm">
                {t.delete}
              </button>
            </form>
          )}
        </div>
      </div>

      {locked && <p className="text-amber-400/80 text-xs mb-4">{t.lockedNotice}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
        <div>
          <div className="text-white/40 text-xs">{t.issueDate}</div>
          {quotation.issue_date}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.validUntil}</div>
          {quotation.valid_until || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.total}</div>
          <span className="text-[#F5C518] font-semibold">{money(quotation.total, cur)}</span>
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.monthlyTotal}</div>
          {Number(quotation.monthly_total) > 0 ? money(quotation.monthly_total, cur) : "—"}
        </div>
      </div>

      <section className="bg-[#0E1A2E] border border-white/10 rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-xs border-b border-white/10">
              <th className="text-start p-3 font-medium">{t.description}</th>
              <th className="text-start p-3 font-medium">{t.kind}</th>
              <th className="text-end p-3 font-medium">{t.quantity}</th>
              <th className="text-end p-3 font-medium">{t.unitPrice}</th>
              <th className="text-end p-3 font-medium">{t.lineTotal}</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((item) => (
              <tr key={item.id} className="border-b border-white/5 last:border-0">
                <td className="p-3">{item.description}</td>
                <td className="p-3 text-white/50">{t.kindLabels[item.kind]}</td>
                <td className="p-3 text-end tabular-nums">{item.quantity}</td>
                <td className="p-3 text-end tabular-nums">{money(item.unit_price, cur)}</td>
                <td className="p-3 text-end tabular-nums font-medium">
                  {money(item.line_total, cur)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end p-4 border-t border-white/10">
          <div className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between text-white/60">
              <span>{t.subtotal}</span>
              <span>{money(quotation.subtotal, cur)}</span>
            </div>
            {Number(quotation.discount) > 0 && (
              <div className="flex justify-between text-white/60">
                <span>{t.discount}</span>
                <span>− {money(quotation.discount, cur)}</span>
              </div>
            )}
            {Number(quotation.vat_amount) > 0 && (
              <div className="flex justify-between text-white/60">
                <span>{t.vatAmount}</span>
                <span>{money(quotation.vat_amount, cur)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-1 border-t border-white/10">
              <span>{t.total}</span>
              <span className="text-[#F5C518]">{money(quotation.total, cur)}</span>
            </div>
            {Number(quotation.monthly_total) > 0 && (
              <div className="flex justify-between pt-2">
                <span className="text-white/60">{t.monthlyTotal}</span>
                <span className="font-semibold">{money(quotation.monthly_total, cur)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold mb-4">{t.status}</h2>
          <div className="flex flex-wrap gap-2">
            {quotation.status !== "sent" && quotation.status !== "converted" && (
              <form action={setQuotationStatusAction.bind(null, id, "sent")}>
                <button className="text-xs px-3 py-2 rounded-full bg-white/5 hover:bg-white/10">
                  {t.markSent}
                </button>
              </form>
            )}
            {quotation.status !== "accepted" && quotation.status !== "converted" && (
              <form action={setQuotationStatusAction.bind(null, id, "accepted")}>
                <button className="text-xs px-3 py-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20">
                  {t.markAccepted}
                </button>
              </form>
            )}
            {quotation.status !== "declined" && quotation.status !== "converted" && (
              <form action={setQuotationStatusAction.bind(null, id, "declined")}>
                <button className="text-xs px-3 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  {t.markDeclined}
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold mb-4">{t.convert}</h2>
          {quotation.status === "converted" ? (
            <p className="text-white/50 text-sm">
              {t.convertedOn}: {quotation.converted_at?.slice(0, 10)}
              {client && (
                <>
                  {" · "}
                  <Link
                    href={`/manage/clients/${client.id}`}
                    className="text-[#F5C518] hover:underline"
                  >
                    {dict.payments.title}
                  </Link>
                </>
              )}
            </p>
          ) : (
            <ConvertPanel
              dict={dict}
              action={convertQuotationAction.bind(null, id)}
              hasActivePlan={Boolean(plan)}
            />
          )}
        </section>
      </div>

      {(quotation.notes || quotation.terms) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 text-sm">
          {quotation.notes && (
            <div>
              <div className="text-white/40 text-xs mb-1">{t.notes}</div>
              <p className="whitespace-pre-wrap text-white/80">{quotation.notes}</p>
            </div>
          )}
          {quotation.terms && (
            <div>
              <div className="text-white/40 text-xs mb-1">{t.terms}</div>
              <p className="whitespace-pre-wrap text-white/80">{quotation.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
