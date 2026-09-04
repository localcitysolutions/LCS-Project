-- Client Management upgrade: search indexes, tags, a notes thread, and an
-- automatic per-client activity timeline.
-- Run after 0005_quotations.sql in the Supabase SQL editor.

-- ── Search & filter indexes ─────────────────────────────────────────────────
-- The client list searches with ilike across several columns; trigram GIN
-- indexes keep that fast once the table grows past a few hundred rows.

create extension if not exists pg_trgm;

create index if not exists clients_name_trgm_idx
  on public.clients using gin (name gin_trgm_ops);
create index if not exists clients_company_trgm_idx
  on public.clients using gin (company gin_trgm_ops);
create index if not exists clients_status_idx on public.clients (status);
create index if not exists clients_assigned_to_idx on public.clients (assigned_to);
create index if not exists clients_created_at_idx on public.clients (created_at desc);

-- Child tables are always fetched by client_id on the detail page.
create index if not exists payments_client_id_idx on public.payments (client_id);
create index if not exists payment_receipts_client_id_idx on public.payment_receipts (client_id);
create index if not exists quotations_client_id_idx on public.quotations (client_id);
create index if not exists reminders_client_id_idx on public.reminders (client_id);

-- ── Tags ────────────────────────────────────────────────────────────────────
-- Free-form labels ("VIP", "Riyadh", "referral"). An array column rather than
-- a join table: tags are display/filter sugar, not entities anything else
-- references.

alter table public.clients
  add column if not exists tags text[] not null default '{}'::text[];

create index if not exists clients_tags_idx on public.clients using gin (tags);

-- ── Notes thread ────────────────────────────────────────────────────────────
-- Timestamped, attributed notes per client — a running log that the single
-- free-text clients.notes field (kept, as the pinned "about" blurb) can't be.

create table if not exists public.client_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  body text not null,
  pinned boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_notes_client_idx
  on public.client_notes (client_id, pinned desc, created_at desc);

create trigger set_updated_at before update on public.client_notes
  for each row execute function public.set_updated_at();
create trigger set_created_by before insert on public.client_notes
  for each row execute function public.set_created_by();

alter table public.client_notes enable row level security;

create policy "client_notes_select" on public.client_notes for select to authenticated
  using (public.is_active_user());
create policy "client_notes_insert" on public.client_notes for insert to authenticated
  with check (public.is_active_user());
create policy "client_notes_update" on public.client_notes for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
-- Unlike the admin-only rule everywhere else, staff may delete their own notes
-- — a note is personal commentary, not a financial record.
create policy "client_notes_delete_own_or_admin" on public.client_notes for delete to authenticated
  using (public.is_admin() or created_by = auth.uid());

grant select, insert, update, delete on public.client_notes to authenticated;

-- ── Activity timeline ───────────────────────────────────────────────────────
-- Written exclusively by triggers below, so it can never be forgotten by app
-- code and never spoofed from the client (no insert grant for authenticated).

create table if not exists public.client_activity (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null,
  meta jsonb not null default '{}'::jsonb,
  actor uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists client_activity_client_idx
  on public.client_activity (client_id, created_at desc);

alter table public.client_activity enable row level security;

create policy "client_activity_select" on public.client_activity for select to authenticated
  using (public.is_active_user());
create policy "client_activity_delete_admin_only" on public.client_activity for delete to authenticated
  using (public.is_admin());

grant select, delete on public.client_activity to authenticated;

-- SECURITY DEFINER so the insert works even though authenticated has no
-- insert grant on client_activity. The existence check makes the function a
-- no-op mid-cascade: when a client is deleted, the child-row delete triggers
-- still fire, but the client row is already gone in this transaction, so
-- logging (which would violate the FK) is skipped.
create or replace function public.log_client_activity(
  p_client_id uuid,
  p_kind text,
  p_meta jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if p_client_id is null then
    return;
  end if;
  if not exists (select 1 from public.clients where id = p_client_id) then
    return;
  end if;
  insert into public.client_activity (client_id, kind, meta, actor)
  values (p_client_id, p_kind, coalesce(p_meta, '{}'::jsonb), auth.uid());
end;
$$;

-- ── Per-table trigger functions ─────────────────────────────────────────────

create or replace function public.log_client_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.log_client_activity(new.id, 'client_created', '{}'::jsonb);
  elsif tg_op = 'UPDATE' then
    if new.status is distinct from old.status then
      perform public.log_client_activity(
        new.id, 'status_changed',
        jsonb_build_object('from', old.status, 'to', new.status)
      );
    else
      perform public.log_client_activity(new.id, 'client_updated', '{}'::jsonb);
    end if;
  end if;
  return null;
end;
$$;

create trigger log_activity
  after insert or update on public.clients
  for each row execute function public.log_client_changes();

create or replace function public.log_client_service_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.log_client_activity(
      new.client_id, 'service_added',
      jsonb_build_object('service', new.service, 'status', new.status)
    );
  elsif tg_op = 'UPDATE' then
    -- Only status flips are interesting; note edits would just be noise.
    if new.status is distinct from old.status then
      perform public.log_client_activity(
        new.client_id, 'service_status',
        jsonb_build_object('service', new.service, 'from', old.status, 'to', new.status)
      );
    end if;
  elsif tg_op = 'DELETE' then
    perform public.log_client_activity(
      old.client_id, 'service_removed',
      jsonb_build_object('service', old.service)
    );
  end if;
  return null;
end;
$$;

create trigger log_activity
  after insert or update or delete on public.client_services
  for each row execute function public.log_client_service_changes();

create or replace function public.log_billing_plan_changes()
returns trigger
language plpgsql
as $$
begin
  perform public.log_client_activity(
    new.client_id,
    case when tg_op = 'INSERT' then 'plan_created' else 'plan_updated' end,
    jsonb_build_object(
      'monthly_amount', new.monthly_amount,
      'currency', new.currency,
      'status', new.status
    )
  );
  return null;
end;
$$;

create trigger log_activity
  after insert or update on public.billing_plans
  for each row execute function public.log_billing_plan_changes();

-- Charges: log creation and deletion. Deliberately no UPDATE trigger — the
-- allocation triggers rewrite amount_paid/status on every receipt, which
-- would flood the timeline; 'payment_received' already tells that story.
create or replace function public.log_payment_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.log_client_activity(
      new.client_id, 'charge_created',
      jsonb_build_object(
        'kind', new.kind, 'total', new.total,
        'currency', new.currency, 'invoice_number', new.invoice_number
      )
    );
  elsif tg_op = 'DELETE' then
    perform public.log_client_activity(
      old.client_id, 'charge_deleted',
      jsonb_build_object('kind', old.kind, 'total', old.total, 'currency', old.currency)
    );
  end if;
  return null;
end;
$$;

create trigger log_activity
  after insert or delete on public.payments
  for each row execute function public.log_payment_changes();

create or replace function public.log_receipt_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.log_client_activity(
      new.client_id, 'payment_received',
      jsonb_build_object('amount', new.amount, 'currency', new.currency, 'method', new.method)
    );
  elsif tg_op = 'DELETE' then
    perform public.log_client_activity(
      old.client_id, 'receipt_deleted',
      jsonb_build_object('amount', old.amount, 'currency', old.currency)
    );
  end if;
  return null;
end;
$$;

create trigger log_activity
  after insert or delete on public.payment_receipts
  for each row execute function public.log_receipt_changes();

create or replace function public.log_quotation_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.log_client_activity(
      new.client_id, 'quotation_created',
      jsonb_build_object('quote_number', new.quote_number, 'title', new.title)
    );
  elsif tg_op = 'UPDATE' then
    if new.status is distinct from old.status then
      perform public.log_client_activity(
        new.client_id, 'quotation_status',
        jsonb_build_object('quote_number', new.quote_number, 'from', old.status, 'to', new.status)
      );
    end if;
  end if;
  return null;
end;
$$;

create trigger log_activity
  after insert or update on public.quotations
  for each row execute function public.log_quotation_changes();
