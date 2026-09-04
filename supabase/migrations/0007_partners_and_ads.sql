-- Partners (profit shares + who holds the cash), ad-budget billing, business
-- expenses and partner-to-partner transfers ("lain dain").
-- Run after 0006_client_management.sql in the Supabase SQL editor.
--
-- Model
--   partners           — the owners, each with a profit share (default 50/50)
--                        and a flag for whose bank account receives by default.
--   payment_receipts   — gains `received_by`: which partner's account the money
--                        actually landed in.
--   payments           — gains `is_ad_budget`: money the client pays us to spend
--                        on their ads. It flows through us; it is not revenue.
--   expenses           — money a partner paid out for the business (ad spend on
--                        a client's behalf, tools, etc.).
--   partner_transfers  — money moved between partners: settling a share, a
--                        personal loan, anything. One table, so the running
--                        balance between them is a single number.
--
-- Reconciliation (computed in the app from partner_positions):
--   business net cash N = Σ receipts − Σ expenses
--   partner holding   H = receipts into their account − expenses they paid
--                         − transfers out + transfers in
--   partner balance     = H − N × share
--   A positive balance means that partner is holding more than their share and
--   owes the other partner(s) the difference.

-- ── Partners ────────────────────────────────────────────────────────────────

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  share_percent numeric(5, 2) not null default 50
    check (share_percent >= 0 and share_percent <= 100),
  is_default_account boolean not null default false,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Exactly one partner can be the default receiving account.
create unique index if not exists partners_one_default
  on public.partners (is_default_account) where is_default_account;

create trigger set_updated_at before update on public.partners
  for each row execute function public.set_updated_at();

-- Seed the two founders. Names and shares are editable from the Partners page.
insert into public.partners (name, share_percent, is_default_account, sort_order)
select * from (values
  ('Farhan', 50::numeric, true, 0),
  ('Kashif', 50::numeric, false, 1)
) as seed(name, share_percent, is_default_account, sort_order)
where not exists (select 1 from public.partners);

alter table public.partners enable row level security;

create policy "partners_select" on public.partners for select to authenticated
  using (public.is_active_user());
create policy "partners_insert_admin" on public.partners for insert to authenticated
  with check (public.is_admin());
create policy "partners_update_admin" on public.partners for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "partners_delete_admin" on public.partners for delete to authenticated
  using (public.is_admin());

grant select, insert, update, delete on public.partners to authenticated;

-- ── Receipts: which account the money landed in ─────────────────────────────

alter table public.payment_receipts
  add column if not exists received_by uuid references public.partners (id) on delete set null;

create index if not exists payment_receipts_received_by_idx
  on public.payment_receipts (received_by);

-- Anything recorded without an account goes to the default one, so the
-- "mark fully paid" shortcut and older code paths still book correctly.
create or replace function public.default_receipt_account()
returns trigger
language plpgsql
as $$
begin
  if new.received_by is null then
    select id into new.received_by
    from public.partners where is_default_account limit 1;
  end if;
  return new;
end;
$$;

create trigger default_receipt_account before insert on public.payment_receipts
  for each row execute function public.default_receipt_account();

-- Historic receipts all went to the default account.
update public.payment_receipts
set received_by = (select id from public.partners where is_default_account limit 1)
where received_by is null;

-- ── Ad budget charges ───────────────────────────────────────────────────────

alter table public.payments
  add column if not exists is_ad_budget boolean not null default false;

alter table public.billing_plans
  add column if not exists ad_budget_amount numeric(10, 2) not null default 0
    check (ad_budget_amount >= 0);

-- A client running ads gets TWO monthly charges per month — the fee and the ad
-- budget — so the one-per-month rule has to distinguish them. Same index name
-- on purpose: the app maps it to a friendly error message.
drop index if exists public.payments_one_monthly_per_period;
create unique index payments_one_monthly_per_period
  on public.payments (client_id, period_month, is_ad_budget)
  where kind = 'monthly' and period_month is not null;

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
    if plan.monthly_amount > 0 or plan.ad_budget_amount > 0 then
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
          if plan.monthly_amount > 0 then
            begin
              insert into public.payments (
                client_id, plan_id, kind, period_month, description,
                amount, currency, vat_rate, due_date, status, is_ad_budget
              ) values (
                plan.client_id, plan.id, 'monthly', m,
                'Monthly service — ' || to_char(m, 'Mon YYYY'),
                plan.monthly_amount, plan.currency,
                case when plan.vat_enabled then 15 else 0 end, due, 'unpaid', false
              );
              created := created + 1;
            exception when unique_violation then
              null; -- already generated on an earlier run
            end;
          end if;

          -- Ad budget is the client's own money passing through us to the ad
          -- platform, so it is never marked up with VAT here.
          if plan.ad_budget_amount > 0 then
            begin
              insert into public.payments (
                client_id, plan_id, kind, period_month, description,
                amount, currency, vat_rate, due_date, status, is_ad_budget
              ) values (
                plan.client_id, plan.id, 'monthly', m,
                'Ad budget — ' || to_char(m, 'Mon YYYY'),
                plan.ad_budget_amount, plan.currency, 0, due, 'unpaid', true
              );
              created := created + 1;
            exception when unique_violation then
              null;
            end;
          end if;
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

-- ── Expenses ────────────────────────────────────────────────────────────────

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients (id) on delete set null,
  paid_by uuid not null references public.partners (id) on delete restrict,
  category text not null default 'other'
    check (category in ('ad_spend', 'tools', 'subscriptions', 'salary', 'office', 'other')),
  amount numeric(10, 2) not null check (amount > 0),
  currency text not null default 'SAR',
  spent_at date not null default (now() at time zone 'Asia/Riyadh')::date,
  description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists expenses_paid_by_idx on public.expenses (paid_by);
create index if not exists expenses_client_idx on public.expenses (client_id);
create index if not exists expenses_spent_at_idx on public.expenses (spent_at desc);

create trigger set_updated_at before update on public.expenses
  for each row execute function public.set_updated_at();
create trigger set_created_by before insert on public.expenses
  for each row execute function public.set_created_by();

-- Partner money is the owners' business: admin-only end to end.
alter table public.expenses enable row level security;

create policy "expenses_admin_select" on public.expenses for select to authenticated
  using (public.is_admin());
create policy "expenses_admin_insert" on public.expenses for insert to authenticated
  with check (public.is_admin());
create policy "expenses_admin_update" on public.expenses for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "expenses_admin_delete" on public.expenses for delete to authenticated
  using (public.is_admin());

grant select, insert, update, delete on public.expenses to authenticated;

-- Client-linked expenses (ad spend) show up on that client's timeline.
create or replace function public.log_expense_changes()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    perform public.log_client_activity(
      new.client_id, 'expense_added',
      jsonb_build_object('category', new.category, 'amount', new.amount, 'currency', new.currency)
    );
  elsif tg_op = 'DELETE' then
    perform public.log_client_activity(
      old.client_id, 'expense_deleted',
      jsonb_build_object('category', old.category, 'amount', old.amount, 'currency', old.currency)
    );
  end if;
  return null;
end;
$$;

create trigger log_activity
  after insert or delete on public.expenses
  for each row execute function public.log_expense_changes();

-- ── Partner transfers ───────────────────────────────────────────────────────

create table if not exists public.partner_transfers (
  id uuid primary key default gen_random_uuid(),
  from_partner uuid not null references public.partners (id) on delete restrict,
  to_partner uuid not null references public.partners (id) on delete restrict,
  amount numeric(10, 2) not null check (amount > 0),
  currency text not null default 'SAR',
  transferred_at date not null default (now() at time zone 'Asia/Riyadh')::date,
  kind text not null default 'settlement'
    check (kind in ('settlement', 'personal', 'other')),
  note text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint partner_transfers_distinct check (from_partner <> to_partner)
);

create index if not exists partner_transfers_date_idx
  on public.partner_transfers (transferred_at desc);

create trigger set_updated_at before update on public.partner_transfers
  for each row execute function public.set_updated_at();
create trigger set_created_by before insert on public.partner_transfers
  for each row execute function public.set_created_by();

alter table public.partner_transfers enable row level security;

create policy "partner_transfers_admin_select" on public.partner_transfers for select to authenticated
  using (public.is_admin());
create policy "partner_transfers_admin_insert" on public.partner_transfers for insert to authenticated
  with check (public.is_admin());
create policy "partner_transfers_admin_update" on public.partner_transfers for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "partner_transfers_admin_delete" on public.partner_transfers for delete to authenticated
  using (public.is_admin());

grant select, insert, update, delete on public.partner_transfers to authenticated;

-- ── Per-partner cash position ───────────────────────────────────────────────
-- Everything the reconciliation needs, one row per partner. security_invoker
-- so the underlying RLS applies (staff see zeros for the admin-only tables,
-- which is fine — the page itself is admin-gated).

create or replace view public.partner_positions
with (security_invoker = true) as
select
  p.id as partner_id,
  p.name,
  p.share_percent,
  p.is_default_account,
  p.sort_order,
  p.active,
  coalesce(r.received, 0) as received,
  coalesce(ab.ad_budget_received, 0) as ad_budget_received,
  coalesce(e.expenses_paid, 0) as expenses_paid,
  coalesce(e.ad_spend_paid, 0) as ad_spend_paid,
  coalesce(tout.transfers_out, 0) as transfers_out,
  coalesce(tin.transfers_in, 0) as transfers_in
from public.partners p
left join (
  select received_by, sum(amount) as received
  from public.payment_receipts group by received_by
) r on r.received_by = p.id
left join (
  -- The slice of each receipt that settled an ad-budget charge: client money,
  -- not fee revenue.
  select pr.received_by, sum(a.amount) as ad_budget_received
  from public.payment_allocations a
  join public.payment_receipts pr on pr.id = a.receipt_id
  join public.payments pm on pm.id = a.payment_id
  where pm.is_ad_budget
  group by pr.received_by
) ab on ab.received_by = p.id
left join (
  select paid_by,
         sum(amount) as expenses_paid,
         coalesce(sum(amount) filter (where category = 'ad_spend'), 0) as ad_spend_paid
  from public.expenses group by paid_by
) e on e.paid_by = p.id
left join (
  select from_partner, sum(amount) as transfers_out
  from public.partner_transfers group by from_partner
) tout on tout.from_partner = p.id
left join (
  select to_partner, sum(amount) as transfers_in
  from public.partner_transfers group by to_partner
) tin on tin.to_partner = p.id;

grant select on public.partner_positions to authenticated;
