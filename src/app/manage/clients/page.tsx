import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { clientListQuery, parseClientListFilters } from "@/lib/manage/client-list";
import { serviceTypeValues } from "@/lib/manage/schemas";
import { money } from "@/lib/manage/money";
import type { ClientStatus } from "@/types/manage";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

const statusClasses: Record<ClientStatus, string> = {
  lead: "bg-sky-500/15 text-sky-700",
  active: "bg-green-500/15 text-green-700",
  paused: "bg-amber-500/15 text-amber-700",
  churned: "bg-ink/8 text-ink/50",
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    service?: string;
    assigned?: string;
    tag?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const sp = await searchParams;
  const filters = parseClientListFilters(sp);
  const page = Math.max(1, Number.parseInt(sp.page || "1", 10) || 1);

  const supabase = await createClient();
  const [
    { data: clients, count },
    { data: allClients },
    { data: balances },
    { data: staff },
  ] = await Promise.all([
    clientListQuery(supabase, filters, { count: true }).range(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE - 1
    ),
    // Status + tags of every client: feeds the stat cards and the tag filter.
    // Two narrow columns, so this stays cheap even at a few thousand rows.
    supabase.from("clients").select("status, tags"),
    supabase.from("client_balances").select("client_id, outstanding, overdue_count"),
    supabase.from("profiles").select("id, full_name, email").eq("active", true),
  ]);

  const t = dict.clients;
  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const statusCounts: Record<string, number> = {};
  const allTags = new Set<string>();
  for (const c of allClients || []) {
    statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    for (const tag of c.tags || []) allTags.add(tag);
  }
  const outstandingById = new Map<string, number>();
  let totalOutstanding = 0;
  let overdueClients = 0;
  for (const b of balances || []) {
    outstandingById.set(b.client_id, Number(b.outstanding));
    totalOutstanding += Number(b.outstanding);
    if (Number(b.overdue_count) > 0) overdueClients += 1;
  }
  const staffById = new Map((staff || []).map((s) => [s.id, s.full_name || s.email || "—"]));

  const serviceLabel = (key: string | null) =>
    (key && (t.serviceLabels as Record<string, string>)[key]) || null;

  // Rebuilds the current URL with overrides — used by pagination and export
  // so every link keeps the active filters.
  const qs = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const merged: Record<string, string | number | undefined> = {
      q: filters.q,
      status: filters.status,
      service: filters.service,
      assigned: filters.assigned,
      tag: filters.tag,
      sort: filters.sort === "newest" ? "" : filters.sort,
      ...overrides,
    };
    for (const [key, value] of Object.entries(merged)) {
      if (value) params.set(key, String(value));
    }
    const s = params.toString();
    return s ? `?${s}` : "";
  };

  const hasFilters = Boolean(
    filters.q || filters.status || filters.service || filters.assigned || filters.tag
  );
  const selectClass = "bg-panel border border-line rounded-lg px-3 py-2 text-sm";

  const stats: { label: string; value: string; accent?: string }[] = [
    { label: t.statsTotal, value: String((allClients || []).length) },
    { label: t.statusLabels.active, value: String(statusCounts.active || 0) },
    { label: t.statusLabels.lead, value: String(statusCounts.lead || 0) },
    {
      label: t.statsOutstanding,
      value: money(totalOutstanding, "SAR"),
      accent: totalOutstanding > 0 ? "text-red-600" : undefined,
    },
    {
      label: t.statsOverdue,
      value: String(overdueClients),
      accent: overdueClients > 0 ? "text-amber-700" : undefined,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex items-center gap-2">
          {/* Route handler, not a page — plain <a> so the browser downloads it. */}
          <a
            href={`/manage/clients/export${qs({})}`}
            className="px-4 py-2 rounded-full bg-ink/8 text-sm hover:bg-ink/12"
          >
            {t.exportCsv}
          </a>
          <Link
            href="/manage/clients/new"
            className="px-4 py-2 rounded-full bg-[#F5C518] text-ink font-bold text-sm"
          >
            {t.new}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-panel border border-line rounded-xl p-4">
            <div className="text-ink/40 text-[11px] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-lg font-bold ${s.accent || ""}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <form className="flex flex-wrap gap-3 mb-6" method="get">
        <input
          type="text"
          name="q"
          defaultValue={filters.q}
          placeholder={t.search}
          className="flex-1 min-w-[200px] bg-panel border border-line rounded-lg px-4 py-2 text-sm"
        />
        <select name="status" defaultValue={filters.status} className={selectClass}>
          <option value="">{t.allStatuses}</option>
          {Object.entries(t.statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select name="service" defaultValue={filters.service} className={selectClass}>
          <option value="">{t.allServices}</option>
          {serviceTypeValues.map((s) => (
            <option key={s} value={s}>
              {t.serviceLabels[s]}
            </option>
          ))}
        </select>
        <select name="assigned" defaultValue={filters.assigned} className={selectClass}>
          <option value="">{t.anyStaff}</option>
          <option value="none">{t.noStaff}</option>
          {(staff || []).map((s) => (
            <option key={s.id} value={s.id}>
              {s.full_name || s.email}
            </option>
          ))}
        </select>
        {allTags.size > 0 && (
          <select name="tag" defaultValue={filters.tag} className={selectClass}>
            <option value="">{t.allTags}</option>
            {[...allTags].sort().map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}
        <select name="sort" defaultValue={filters.sort} className={selectClass}>
          <option value="newest">{t.sortNewest}</option>
          <option value="oldest">{t.sortOldest}</option>
          <option value="name">{t.sortName}</option>
        </select>
        <button type="submit" className="px-4 py-2 rounded-lg bg-ink/8 text-sm">
          {t.searchButton}
        </button>
        {hasFilters && (
          <Link
            href="/manage/clients"
            className="px-4 py-2 rounded-lg text-sm text-ink/50 hover:text-ink"
          >
            {t.reset}
          </Link>
        )}
      </form>

      <div className="bg-panel border border-line rounded-xl overflow-hidden">
        {!clients || clients.length === 0 ? (
          <p className="p-6 text-ink/40 text-sm">{hasFilters ? t.emptyFiltered : t.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-ink/40 text-xs text-start">
                  <th className="p-4 text-start font-medium">{t.name}</th>
                  <th className="p-4 text-start font-medium">{t.contact}</th>
                  <th className="p-4 text-start font-medium">{t.primaryService}</th>
                  <th className="p-4 text-start font-medium">{t.tags}</th>
                  <th className="p-4 text-start font-medium">{t.assignedTo}</th>
                  <th className="p-4 text-start font-medium">{t.outstanding}</th>
                  <th className="p-4 text-start font-medium">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => {
                  const outstanding = outstandingById.get(c.id) || 0;
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-line/60 last:border-0 hover:bg-ink/[0.03]"
                    >
                      <td className="p-4">
                        <Link
                          href={`/manage/clients/${c.id}`}
                          className="font-medium hover:text-gold-ink"
                        >
                          {c.name}
                        </Link>
                        {c.company && <div className="text-ink/40 text-xs">{c.company}</div>}
                      </td>
                      <td className="p-4 text-ink/60">{c.email || c.phone || "—"}</td>
                      <td className="p-4">
                        {serviceLabel(c.primary_service) && (
                          <span className="text-xs px-2 py-1 rounded-full bg-[#F5C518]/10 text-gold-ink whitespace-nowrap">
                            {serviceLabel(c.primary_service)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="flex flex-wrap gap-1">
                          {(c.tags || []).map((tag) => (
                            <Link
                              key={tag}
                              href={`/manage/clients${qs({ tag, page: undefined })}`}
                              className="text-[11px] px-2 py-0.5 rounded-full bg-ink/5 text-ink/60 hover:bg-ink/8"
                            >
                              {tag}
                            </Link>
                          ))}
                        </span>
                      </td>
                      <td className="p-4 text-ink/60 text-xs">
                        {(c.assigned_to && staffById.get(c.assigned_to)) || "—"}
                      </td>
                      <td className="p-4">
                        {outstanding > 0.005 ? (
                          <span className="text-red-600 font-medium whitespace-nowrap">
                            {money(outstanding, "SAR")}
                          </span>
                        ) : (
                          <span className="text-ink/30">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                            statusClasses[c.status as ClientStatus]
                          }`}
                        >
                          {t.statusLabels[c.status as ClientStatus]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-ink/50">
          <span>
            {t.pageLabel} {page} {t.of} {pageCount} · {total}
          </span>
          <span className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/manage/clients${qs({ page: page - 1 > 1 ? page - 1 : undefined })}`}
                className="px-3 py-1.5 rounded-lg bg-ink/5 hover:bg-ink/8"
              >
                {t.prev}
              </Link>
            )}
            {page < pageCount && (
              <Link
                href={`/manage/clients${qs({ page: page + 1 })}`}
                className="px-3 py-1.5 rounded-lg bg-ink/5 hover:bg-ink/8"
              >
                {t.next}
              </Link>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
