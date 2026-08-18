-- Billing module: recurring monthly plans, setup fees, partial payments,
-- advance payments (client credit) and VAT.
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query),
-- after 0001_init.sql and 0002_client_details.sql.
--
-- Model
--   billing_plans      — what a client owes per month (+ a one-time setup fee).
--   payments           — CHARGES (invoices). What was billed. amount is the
--                        pre-VAT subtotal; vat_amount/total are derived.
--   payment_receipts   — MONEY ACTUALLY RECEIVED. One row per real payment.
--   payment_allocations— links a receipt to a charge. Many-to-many so one
--                        receipt can settle several months, and one charge can
--                        be settled by several receipts (= partial payments).
--
--   Client credit (advance) = received − allocated. It is applied automatically
--   to the oldest open charge whenever new charges are generated.

-- ── Clients: VAT number ─────────────────────────────────────────────────────

alter table public.clients
  add column if not exists vat_number text;

-- ── Billing plans ───────────────────────────────────────────────────────────

create table if not exists public.billing_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  monthly_amount numeric(10, 2) not null default 0 check (monthly_amount >= 0),
  setup_fee numeric(10, 2) not null default 0 check (setup_fee >= 0),
  setup_fee_charged boolean not null default false,
  currency text not null default 'SAR',
  billing_day int not null default 1 check (billing_day between 1 and 28),
  start_date date not null,
  end_date date,
  vat_enabled boolean not null default false,
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint billing_plans_dates_valid check (end_date is null or end_date >= start_date)
);

-- Only one active plan per client — prevents accidentally double-billing a
-- client from two overlapping plans. Paused/ended plans are kept as history.
create unique index if not exists billing_plans_one_active
  on public.billing_plans (client_id) where status = 'active';

create index if not exists billing_plans_client_idx on public.billing_plans (client_id);

-- ── Charges (payments) — extra columns ──────────────────────────────────────

alter table public.payments
  add column if not exists plan_id uuid references public.billing_plans (id) on delete set null,
  add column if not exists kind text not null default 'one_off',
  add column if not exists period_month date,
  add column if not exists vat_rate numeric(5, 2) not null default 0,
  add column if not exists vat_amount numeric(10, 2) not null default 0,
  add column if not exists total numeric(10, 2) not null default 0,
  add column if not exists amount_paid numeric(10, 2) not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'payments_kind_valid'
  ) then
    alter table public.payments
      add constraint payments_kind_valid check (kind in ('monthly', 'setup', 'one_off'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'payments_vat_rate_valid'
  ) then
    alter table public.payments
      add constraint payments_vat_rate_valid check (vat_rate >= 0 and vat_rate <= 100);
  end if;
end $$;

-- status gains 'partial'. It is maintained by trigger from amount_paid — the
-- app never sets it directly, so it can never drift from the money on record.
alter table public.payments drop constraint if exists payments_status_check;
alter table public.payments
  add constraint payments_status_check check (status in ('unpaid', 'partial', 'paid'));

-- A monthly charge exists at most once per client per billed month. This is
-- what makes generation safely re-runnable (cron + manual button + retries).
create unique index if not exists payments_one_monthly_per_period
  on public.payments (client_id, period_month)
  where kind = 'monthly' and period_month is not null;

create index if not exists payments_client_idx on public.payments (client_id);

-- Backfill totals for rows created before this migration.
update public.payments
set vat_amount = 0,
    total = amount,
    amount_paid = case when status = 'paid' then amount else 0 end
where total = 0;

-- ── Receipts (money actually received) ──────────────────────────────────────

create table if not exists public.payment_receipts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  amount numeric(10, 2) not null check (amount > 0),
  currency text not null default 'SAR',
  received_at date not null default (now() at time zone 'Asia/Riyadh')::date,
  method text not null default 'bank'
    check (method in ('bank', 'cash', 'stc_pay', 'card', 'cheque', 'other')),
  reference text,
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payment_receipts_client_idx on public.payment_receipts (client_id);

create table if not exists public.payment_allocations (
  id uuid primary key default gen_random_uuid(),
  receipt_id uuid not null references public.payment_receipts (id) on delete cascade,
  payment_id uuid not null references public.payments (id) on delete cascade,
  amount numeric(10, 2) not null check (amount > 0),
  created_at timestamptz not null default now(),
  unique (receipt_id, payment_id)
);

create index if not exists payment_allocations_payment_idx on public.payment_allocations (payment_id);

-- ── Derived money columns + status on a charge ──────────────────────────────
-- Runs BEFORE insert/update so vat_amount, total and status are always
-- consistent no matter which code path wrote the row.

create or replace function public.sync_payment_totals()
returns trigger
language plpgsql
as $$
begin
  new.vat_amount := round(coalesce(new.amount, 0) * coalesce(new.vat_rate, 0) / 100, 2);
  new.total := coalesce(new.amount, 0) + new.vat_amount;

  if coalesce(new.amount_paid, 0) > new.total + 0.005 then
    raise exception
      'Amount cannot be lower than what has already been received for this charge (received: %).',
      new.amount_paid
      using errcode = 'check_violation';
  end if;

  new.status := case
    when coalesce(new.amount_paid, 0) <= 0 then 'unpaid'
    when new.amount_paid >= new.total - 0.005 then 'paid'
    else 'partial'
  end;

  if new.status = 'paid' then
    new.paid_at := coalesce(new.paid_at, now());
  else
    new.paid_at := null;
  end if;

  return new;
end;
$$;

drop trigger if exists sync_payment_totals on public.payments;
create trigger sync_payment_totals before insert or update on public.payments
  for each row execute function public.sync_payment_totals();

-- ── Allocation validation ───────────────────────────────────────────────────
-- Every rule that protects the books lives here, not in the UI: the UI can be
-- bypassed, a database trigger cannot.

create or replace function public.validate_allocation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r_amount numeric;
  r_client uuid;
  r_currency text;
  r_allocated numeric;
  p_total numeric;
  p_client uuid;
  p_currency text;
  p_allocated numeric;
  skip_id uuid := coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid);
begin
  select amount, client_id, currency
    into r_amount, r_client, r_currency
  from public.payment_receipts where id = new.receipt_id;

  if not found then
    raise exception 'Receipt not found.' using errcode = 'foreign_key_violation';
  end if;

  select total, client_id, currency
    into p_total, p_client, p_currency
  from public.payments where id = new.payment_id;

  if not found then
    raise exception 'Charge not found.' using errcode = 'foreign_key_violation';
  end if;

  if r_client is distinct from p_client then
    raise exception 'A payment can only be applied to a charge for the same client.'
      using errcode = 'check_violation';
  end if;

  if r_currency is distinct from p_currency then
    raise exception 'Currency mismatch: payment is in % but the charge is in %.', r_currency, p_currency
      using errcode = 'check_violation';
  end if;

  select coalesce(sum(amount), 0) into r_allocated
  from public.payment_allocations
  where receipt_id = new.receipt_id and id <> skip_id;

  if r_allocated + new.amount > r_amount + 0.005 then
    raise exception 'Cannot apply more than the amount received. Unapplied on this payment: %.',
      round(r_amount - r_allocated, 2)
      using errcode = 'check_violation';
  end if;

  select coalesce(sum(amount), 0) into p_allocated
  from public.payment_allocations
  where payment_id = new.payment_id and id <> skip_id;

  if p_allocated + new.amount > p_total + 0.005 then
    raise exception 'Cannot apply more than the charge balance. Remaining on this charge: %.',
      round(p_total - p_allocated, 2)
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_allocation on public.payment_allocations;
create trigger validate_allocation before insert or update on public.payment_allocations
  for each row execute function public.validate_allocation();

-- Recompute the charge's amount_paid whenever allocations move. The BEFORE
-- trigger above then derives status/paid_at from it.
create or replace function public.sync_payment_amount_paid()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target uuid := coalesce(new.payment_id, old.payment_id);
  paid numeric;
begin
  select coalesce(sum(amount), 0) into paid
  from public.payment_allocations where payment_id = target;

  update public.payments set amount_paid = paid where id = target;

  -- An UPDATE that moved the allocation to a different charge has to refresh
  -- the old charge too.
  if tg_op = 'UPDATE' and old.payment_id is distinct from new.payment_id then
    select coalesce(sum(amount), 0) into paid
    from public.payment_allocations where payment_id = old.payment_id;
    update public.payments set amount_paid = paid where id = old.payment_id;
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists sync_payment_amount_paid on public.payment_allocations;
create trigger sync_payment_amount_paid after insert or update or delete on public.payment_allocations
  for each row execute function public.sync_payment_amount_paid();

-- ── Bookkeeping triggers on the new tables ──────────────────────────────────

drop trigger if exists set_updated_at on public.billing_plans;
create trigger set_updated_at before update on public.billing_plans
  for each row execute function public.set_updated_at();

drop trigger if exists set_created_by on public.billing_plans;
create trigger set_created_by before insert on public.billing_plans
  for each row execute function public.set_created_by();

drop trigger if exists set_updated_at on public.payment_receipts;
create trigger set_updated_at before update on public.payment_receipts
  for each row execute function public.set_updated_at();

drop trigger if exists set_created_by on public.payment_receipts;
create trigger set_created_by before insert on public.payment_receipts
  for each row execute function public.set_created_by();

-- ── Applying client credit (advance payments) ───────────────────────────────
-- Walks every receipt that still has unapplied money and pushes it onto the
-- client's oldest open charges, oldest due date first. Safe to run any number
-- of times — it only ever moves money that is genuinely unapplied.

create or replace function public.apply_client_credit(p_client_id uuid default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  c record;
  available numeric;
  take numeric;
  applied int := 0;
begin
  for r in
    select pr.id,
           pr.client_id,
           pr.amount - coalesce(
             (select sum(a.amount) from public.payment_allocations a where a.receipt_id = pr.id), 0
           ) as unapplied
    from public.payment_receipts pr
    where p_client_id is null or pr.client_id = p_client_id
    order by pr.received_at, pr.created_at
  loop
    available := r.unapplied;
    continue when available <= 0.005;

    for c in
      select p.id, p.total - p.amount_paid as balance
      from public.payments p
      where p.client_id = r.client_id
        and p.status <> 'paid'
        and p.total > p.amount_paid
      order by coalesce(p.due_date, p.created_at::date), p.created_at
    loop
      exit when available <= 0.005;
      continue when c.balance <= 0.005;

      take := round(least(available, c.balance), 2);
      continue when take <= 0;

      insert into public.payment_allocations (receipt_id, payment_id, amount)
      values (r.id, c.id, take)
      on conflict (receipt_id, payment_id)
        do update set amount = public.payment_allocations.amount + excluded.amount;

      available := available - take;
      applied := applied + 1;
    end loop;
  end loop;

  return applied;
end;
$$;

-- ── Generating due charges ──────────────────────────────────────────────────
-- Idempotent: the unique index on (client_id, period_month) means a second run
-- in the same month is a no-op. Called hourly by the cron route and by the
-- "Generate charges" button in the dashboard.

create or replace function public.generate_due_charges()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  plan record;
  today date := (now() at time zone 'Asia/Riyadh')::date;
  m date;
  due date;
  last_month date;
  created int := 0;
begin
  for plan in select * from public.billing_plans where status = 'active' order by created_at loop
    -- One-time setup / onboarding fee (e.g. GMB creation), billed once.
    if plan.setup_fee > 0 and plan.setup_fee_charged = false and plan.start_date <= today then
      insert into public.payments (
        client_id, plan_id, kind, description, amount, currency, vat_rate, due_date, status
      ) values (
        plan.client_id, plan.id, 'setup', 'Setup fee', plan.setup_fee, plan.currency,
        case when plan.vat_enabled then 15 else 0 end, plan.start_date, 'unpaid'
      );
      update public.billing_plans set setup_fee_charged = true where id = plan.id;
      created := created + 1;
    end if;

    -- Recurring monthly charges, back-filled from the plan start date so a
    -- plan added late still produces every month it should have billed.
    if plan.monthly_amount > 0 then
      m := date_trunc('month', plan.start_date)::date;
      last_month := date_trunc('month', today)::date;
      if plan.end_date is not null then
        last_month := least(last_month, date_trunc('month', plan.end_date)::date);
      end if;

      while m <= last_month loop
        due := m + (plan.billing_day - 1);
        -- Never bill before the client actually started.
        if due < plan.start_date then
          due := plan.start_date;
        end if;

        if due <= today then
          begin
            insert into public.payments (
              client_id, plan_id, kind, period_month, description,
              amount, currency, vat_rate, due_date, status
            ) values (
              plan.client_id, plan.id, 'monthly', m,
              'Monthly service — ' || to_char(m, 'Mon YYYY'),
              plan.monthly_amount, plan.currency,
              case when plan.vat_enabled then 15 else 0 end, due, 'unpaid'
            );
            created := created + 1;
          exception when unique_violation then
            null; -- already generated on an earlier run
          end;
        end if;

        m := (m + interval '1 month')::date;
      end loop;
    end if;
  end loop;

  -- Any advance sitting as credit now has somewhere to go.
  perform public.apply_client_credit(null);

  return created;
end;
$$;

-- ── Views ───────────────────────────────────────────────────────────────────

drop view if exists public.payments_with_status;
create view public.payments_with_status
with (security_invoker = true) as
select
  p.*,
  (p.total - p.amount_paid) as balance,
  (
    p.status <> 'paid'
    and p.due_date is not null
    and p.due_date < (now() at time zone 'Asia/Riyadh')::date
  ) as is_overdue
from public.payments p;

-- Per-client money position: what was billed, what came in, what is still due,
-- and how much the client has paid in advance.
create or replace view public.client_balances
with (security_invoker = true) as
select
  c.id as client_id,
  coalesce(ch.total_charged, 0) as total_charged,
  coalesce(ch.total_applied, 0) as total_applied,
  coalesce(ch.total_charged, 0) - coalesce(ch.total_applied, 0) as outstanding,
  coalesce(rc.total_received, 0) as total_received,
  coalesce(rc.total_received, 0) - coalesce(ch.total_applied, 0) as credit_balance,
  coalesce(ch.overdue_count, 0) as overdue_count
from public.clients c
left join (
  select
    client_id,
    sum(total) as total_charged,
    sum(amount_paid) as total_applied,
    count(*) filter (
      where status <> 'paid' and due_date is not null
        and due_date < (now() at time zone 'Asia/Riyadh')::date
    ) as overdue_count
  from public.payments
  group by client_id
) ch on ch.client_id = c.id
left join (
  select client_id, sum(amount) as total_received
  from public.payment_receipts
  group by client_id
) rc on rc.client_id = c.id;

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table public.billing_plans enable row level security;
alter table public.payment_receipts enable row level security;
alter table public.payment_allocations enable row level security;

drop policy if exists "billing_plans_select" on public.billing_plans;
create policy "billing_plans_select" on public.billing_plans for select to authenticated
  using (public.is_active_user());
drop policy if exists "billing_plans_insert" on public.billing_plans;
create policy "billing_plans_insert" on public.billing_plans for insert to authenticated
  with check (public.is_active_user());
drop policy if exists "billing_plans_update" on public.billing_plans;
create policy "billing_plans_update" on public.billing_plans for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
drop policy if exists "billing_plans_delete_admin_only" on public.billing_plans;
create policy "billing_plans_delete_admin_only" on public.billing_plans for delete to authenticated
  using (public.is_admin());

drop policy if exists "payment_receipts_select" on public.payment_receipts;
create policy "payment_receipts_select" on public.payment_receipts for select to authenticated
  using (public.is_active_user());
drop policy if exists "payment_receipts_insert" on public.payment_receipts;
create policy "payment_receipts_insert" on public.payment_receipts for insert to authenticated
  with check (public.is_active_user());
drop policy if exists "payment_receipts_update" on public.payment_receipts;
create policy "payment_receipts_update" on public.payment_receipts for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
drop policy if exists "payment_receipts_delete_admin_only" on public.payment_receipts;
create policy "payment_receipts_delete_admin_only" on public.payment_receipts for delete to authenticated
  using (public.is_admin());

drop policy if exists "payment_allocations_select" on public.payment_allocations;
create policy "payment_allocations_select" on public.payment_allocations for select to authenticated
  using (public.is_active_user());
drop policy if exists "payment_allocations_insert" on public.payment_allocations;
create policy "payment_allocations_insert" on public.payment_allocations for insert to authenticated
  with check (public.is_active_user());
drop policy if exists "payment_allocations_update" on public.payment_allocations;
create policy "payment_allocations_update" on public.payment_allocations for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
drop policy if exists "payment_allocations_delete" on public.payment_allocations;
create policy "payment_allocations_delete" on public.payment_allocations for delete to authenticated
  using (public.is_active_user());

-- ── Grants ──────────────────────────────────────────────────────────────────

grant select, insert, update, delete on public.billing_plans to authenticated;
grant select, insert, update, delete on public.payment_receipts to authenticated;
grant select, insert, update, delete on public.payment_allocations to authenticated;
grant select on public.payments_with_status to authenticated;
grant select on public.client_balances to authenticated;
grant execute on function public.apply_client_credit(uuid) to authenticated;
grant execute on function public.generate_due_charges() to authenticated;
