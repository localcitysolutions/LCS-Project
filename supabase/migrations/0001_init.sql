-- Client Management module — initial schema.
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- After running: create your first staff login in Dashboard → Authentication → Users
-- ("Add user"), which fires the trigger below and creates a matching `profiles` row
-- with role='staff'. To make that first account an admin, run once:
--   update public.profiles set role = 'admin' where email = 'you@example.com';

create extension if not exists pgcrypto;

-- ── Tables ──────────────────────────────────────────────────────────────────

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  whatsapp text,
  industry text,
  status text not null default 'lead' check (status in ('lead', 'active', 'paused', 'churned')),
  notes text,
  assigned_to uuid references public.profiles (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  description text,
  amount numeric(10, 2) not null check (amount >= 0),
  currency text not null default 'SAR',
  due_date date,
  status text not null default 'unpaid' check (status in ('unpaid', 'paid')),
  paid_at timestamptz,
  invoice_number text,
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients (id) on delete set null,
  title text not null,
  description text,
  due_at timestamptz not null,
  channels text[] not null default '{dashboard}',
  status text not null default 'pending' check (status in ('pending', 'sent', 'done', 'dismissed')),
  assigned_to uuid references public.profiles (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reminders_channels_valid check (channels <@ array['dashboard', 'email', 'whatsapp']::text[])
);

-- Overdue is derived, never stored — avoids staleness if a cron run is missed
-- and avoids UTC-vs-Riyadh off-by-a-few-hours edge cases. `security_invoker`
-- is required (Postgres defaults views to the *owner's* privileges, which
-- would silently bypass RLS otherwise).
create view public.payments_with_status
with (security_invoker = true) as
select
  p.*,
  (
    p.status = 'unpaid'
    and p.due_date is not null
    and p.due_date < (now() at time zone 'Asia/Riyadh')::date
  ) as is_overdue
from public.payments p;

-- ── Triggers ────────────────────────────────────────────────────────────────

-- Auto-create a `profiles` row (role='staff', active=true) whenever a new
-- Supabase Auth user is created (i.e. whenever you add a staff login via the
-- dashboard). SECURITY DEFINER is required to write into public.profiles from
-- an auth.users trigger.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at bookkeeping — never trust app code to set this.
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.clients
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.payments
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.reminders
  for each row execute function public.set_updated_at();

-- created_by is always forced to the real requester, regardless of what a
-- client submits in the insert payload — closes off audit-trail spoofing.
create function public.set_created_by()
returns trigger
language plpgsql
as $$
begin
  new.created_by = auth.uid();
  return new;
end;
$$;

create trigger set_created_by before insert on public.clients
  for each row execute function public.set_created_by();

create trigger set_created_by before insert on public.payments
  for each row execute function public.set_created_by();

create trigger set_created_by before insert on public.reminders
  for each row execute function public.set_created_by();

-- ── RLS helper functions ────────────────────────────────────────────────────
-- SECURITY DEFINER so these resolve independently of the RLS policies on
-- `profiles` itself (avoids the classic "policy subquery breaks if profiles
-- SELECT is ever tightened" recursion trap).

create function public.is_active_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and active = true
  );
$$;

create function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and active = true
  );
$$;

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.payments enable row level security;
alter table public.reminders enable row level security;

-- profiles: read-only from the client for everyone. There is deliberately NO
-- insert/update/delete policy here — role/active changes and full_name edits
-- go through Server Actions using the service-role key (src/lib/supabase/admin.ts),
-- which bypasses RLS by design. This closes off self-service role escalation.
create policy "profiles_select_active_authenticated"
  on public.profiles for select
  to authenticated
  using (public.is_active_user());

-- clients / payments / reminders: any active staff member can read/write;
-- only admins can delete. Deactivating a profile (active=false) revokes
-- access immediately across every policy below.
create policy "clients_select" on public.clients for select to authenticated
  using (public.is_active_user());
create policy "clients_insert" on public.clients for insert to authenticated
  with check (public.is_active_user());
create policy "clients_update" on public.clients for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
create policy "clients_delete_admin_only" on public.clients for delete to authenticated
  using (public.is_admin());

create policy "payments_select" on public.payments for select to authenticated
  using (public.is_active_user());
create policy "payments_insert" on public.payments for insert to authenticated
  with check (public.is_active_user());
create policy "payments_update" on public.payments for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
create policy "payments_delete_admin_only" on public.payments for delete to authenticated
  using (public.is_admin());

create policy "reminders_select" on public.reminders for select to authenticated
  using (public.is_active_user());
create policy "reminders_insert" on public.reminders for insert to authenticated
  with check (public.is_active_user());
create policy "reminders_update" on public.reminders for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
create policy "reminders_delete_admin_only" on public.reminders for delete to authenticated
  using (public.is_admin());

-- ── Grants ──────────────────────────────────────────────────────────────────
-- RLS restricts *rows*; Postgres also requires the role to have statement-
-- level DML privileges on the table itself. `anon` gets nothing — this app
-- has no public-facing Supabase access, everything goes through an
-- authenticated staff session.

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.clients to authenticated;
grant select, insert, update, delete on public.payments to authenticated;
grant select, insert, update, delete on public.reminders to authenticated;
grant select on public.payments_with_status to authenticated;
