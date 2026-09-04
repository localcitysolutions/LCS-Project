// One place that turns the client-list URL params into a Supabase query, so
// the list page and the CSV export can never drift apart on what a filter
// means.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, ClientStatus } from "@/types/manage";
import {
  clientStatusValues,
  serviceTypeValues,
  clientSortValues,
  type ClientSort,
  type ServiceType,
} from "./schemas";

export const CLIENT_LIST_COLUMNS =
  "id, name, company, email, phone, whatsapp, industry, status, website, start_date, primary_service, gmb_name, gmb_location, gmb_link, vat_number, tags, assigned_to, created_at";

export type ClientListFilters = {
  q: string;
  status: ClientStatus | "";
  service: ServiceType | "";
  /** A profile id, "none" for unassigned, or "" for everyone. */
  assigned: string;
  tag: string;
  sort: ClientSort;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Coerce raw searchParams into a trusted filter set — anything unknown is
 * dropped rather than passed through to PostgREST. */
export function parseClientListFilters(sp: {
  q?: string;
  status?: string;
  service?: string;
  assigned?: string;
  tag?: string;
  sort?: string;
}): ClientListFilters {
  return {
    q: (sp.q || "").trim().slice(0, 100),
    status: (clientStatusValues as readonly string[]).includes(sp.status || "")
      ? (sp.status as ClientStatus)
      : "",
    service: (serviceTypeValues as readonly string[]).includes(sp.service || "")
      ? (sp.service as ServiceType)
      : "",
    assigned:
      sp.assigned === "none" || UUID_RE.test(sp.assigned || "") ? (sp.assigned as string) : "",
    tag: (sp.tag || "").trim().slice(0, 40),
    sort: (clientSortValues as readonly string[]).includes(sp.sort || "")
      ? (sp.sort as ClientSort)
      : "newest",
  };
}

export function clientListQuery(
  supabase: SupabaseClient<Database>,
  filters: ClientListFilters,
  { count = false }: { count?: boolean } = {}
) {
  let query = count
    ? supabase.from("clients").select(CLIENT_LIST_COLUMNS, { count: "exact" })
    : supabase.from("clients").select(CLIENT_LIST_COLUMNS);

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.service) query = query.eq("primary_service", filters.service);
  if (filters.tag) query = query.contains("tags", [filters.tag]);
  if (filters.assigned === "none") query = query.is("assigned_to", null);
  else if (filters.assigned) query = query.eq("assigned_to", filters.assigned);

  if (filters.q) {
    // Commas and parentheses are structural in PostgREST's or() syntax, so
    // they can't appear inside the pattern — swap them for spaces.
    const term = filters.q.replace(/[,()]/g, " ").trim();
    if (term) {
      const pattern = `%${term}%`;
      query = query.or(
        ["name", "company", "email", "phone", "gmb_name"]
          .map((col) => `${col}.ilike.${pattern}`)
          .join(",")
      );
    }
  }

  if (filters.sort === "name") query = query.order("name", { ascending: true });
  else query = query.order("created_at", { ascending: filters.sort === "oldest" });

  return query;
}
