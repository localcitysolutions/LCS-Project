import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { clientListQuery, parseClientListFilters } from "@/lib/manage/client-list";
import { riyadhToday } from "@/lib/manage/money";

export const dynamic = "force-dynamic";

// RFC 4180: quote every field, double any quotes inside it. Prefixing = , + -
// with a quote-forced form is unnecessary here because everything is quoted,
// which also neutralises spreadsheet formula injection for values like "=SUM".
function csvField(value: string | number | null | undefined): string {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = parseClientListFilters(Object.fromEntries(url.searchParams));

  const lang = await getManageLang();
  const dict = getDict(lang);
  const t = dict.clients;

  const supabase = await createClient();
  const [{ data: clients }, { data: balances }, { data: staff }] = await Promise.all([
    clientListQuery(supabase, filters),
    supabase.from("client_balances").select("client_id, outstanding, credit_balance"),
    supabase.from("profiles").select("id, full_name, email"),
  ]);

  const balanceById = new Map((balances || []).map((b) => [b.client_id, b]));
  const staffById = new Map((staff || []).map((s) => [s.id, s.full_name || s.email || ""]));
  const serviceLabel = (key: string | null) =>
    (key && (t.serviceLabels as Record<string, string>)[key]) || "";

  const header = [
    t.name,
    t.company,
    t.status,
    t.email,
    t.phone,
    t.whatsapp,
    t.industry,
    t.primaryService,
    t.tags,
    t.assignedTo,
    t.website,
    t.startDate,
    t.gmbName,
    t.gmbLocation,
    t.vatNumber,
    dict.billing.outstanding,
    dict.billing.credit,
    t.added,
  ];

  const rows = (clients || []).map((c) => {
    const balance = balanceById.get(c.id);
    return [
      c.name,
      c.company,
      t.statusLabels[c.status],
      c.email,
      c.phone,
      c.whatsapp,
      c.industry,
      serviceLabel(c.primary_service),
      (c.tags || []).join(", "),
      (c.assigned_to && staffById.get(c.assigned_to)) || "",
      c.website,
      c.start_date,
      c.gmb_name,
      c.gmb_location,
      c.vat_number,
      Number(balance?.outstanding ?? 0).toFixed(2),
      Number(balance?.credit_balance ?? 0).toFixed(2),
      c.created_at.slice(0, 10),
    ];
  });

  // BOM so Excel opens the Arabic text as UTF-8 instead of mojibake.
  const csv =
    "\uFEFF" +
    [header, ...rows].map((row) => row.map(csvField).join(",")).join("\r\n") +
    "\r\n";

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="clients-${riyadhToday()}.csv"`,
    },
  });
}
