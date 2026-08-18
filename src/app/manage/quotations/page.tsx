// The PDF links below are plain <a>, not next/link: they point at a route
// handler returning a file attachment, and a client-side navigation would try
// to render a binary response as a page instead of downloading it.
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { money } from "@/lib/manage/money";
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

export default async function QuotationsPage() {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const { data: quotes } = await supabase
    .from("quotations")
    .select("*")
    .order("created_at", { ascending: false });

  const clientIds = [...new Set((quotes || []).map((q) => q.client_id))];
  const { data: clients } = clientIds.length
    ? await supabase.from("clients").select("id, name, company").in("id", clientIds)
    : { data: [] as { id: string; name: string; company: string | null }[] };

  const clientById = new Map((clients || []).map((c) => [c.id, c]));
  const t = dict.quotations;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <Link
          href="/manage/quotations/new"
          className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm"
        >
          {t.new}
        </Link>
      </div>

      <div className="bg-[#0E1A2E] border border-white/10 rounded-xl overflow-hidden">
        {!quotes || quotes.length === 0 ? (
          <p className="p-6 text-white/40 text-sm">{t.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {quotes.map((q) => {
                const client = clientById.get(q.client_id);
                return (
                  <tr
                    key={q.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="p-4">
                      <Link
                        href={`/manage/quotations/${q.id}`}
                        className="font-medium hover:text-[#F5C518]"
                      >
                        {client?.company || client?.name || "—"}
                      </Link>
                      <div className="text-white/40 text-xs">
                        {q.quote_number}
                        {q.title ? ` · ${q.title}` : ""}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {money(q.total, q.currency)}
                      {Number(q.monthly_total) > 0 && (
                        <div className="text-white/40 text-[11px]">
                          + {money(q.monthly_total, q.currency)}/mo
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-white/60 whitespace-nowrap">{q.valid_until || "—"}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusClasses[q.status]}`}>
                        {t.statusLabels[q.status]}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`/manage/quotations/${q.id}/pdf`}
                        className="text-xs text-[#F5C518] hover:underline whitespace-nowrap"
                      >
                        PDF
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
