-- Quotations: itemised quotes that convert into the billing system.
--
-- Run after 0004_invoices.sql.
--
-- Lifecycle:  draft → sent → accepted → converted
--                      ↘ declined / expired
--
-- On conversion, one-off and setup items become charges (public.payments) and
-- monthly items are folded into the client's billing_plan, so the recurring
-- generator picks them up from the next cycle onwards. Everything a quote can
-- get wrong — negative quantities, a discount larger than the subtotal, editing
-- a quote a client already accepted, converting twice — is blocked in the
-- database, not just the form.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  quote_number text,
  title text,
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'accepted', 'declined', 'expired', 'converted')),
  issue_date date not null default (now() at time zone 'Asia/Riyadh')::date,
  valid_until date,
  currency text not null default 'SAR',
  vat_enabled boolean not null default false,
  discount numeric(10, 2) not null default 0 check (discount >= 0),
  notes text,
  terms text,
  -- Derived from the line items by trigger; never written by the app.
  subtotal numeric(12, 2) not null default 0,
  vat_amount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  monthly_total numeric(12, 2) not null default 0,
  accepted_at timestamptz,
  converted_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quotations_valid_dates check (valid_until is null or valid_until >= issue_date)
);

create index if not exists quotations_client_idx on public.quotations (client_id);
create index if not exists quotations_status_idx on public.quotations (status);

create unique index if not exists quotations_quote_number_key
  on public.quotations (quote_number) where quote_number is not null;

create table if not exists public.quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations (id) on delete cascade,
  position int not null default 0,
  service text,
  description text not null,
  -- 'monthly' items become recurring billing; the other two become one-off charges.
  kind text not null default 'one_off' check (kind in ('monthly', 'setup', 'one_off')),
  quantity numeric(10, 2) not null default 1 check (quantity > 0),
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  line_total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists quotation_items_quotation_idx
  on public.quotation_items (quotation_id, position);

-- ── Numbering ───────────────────────────────────────────────────────────────

create sequence if not exists public.quotation_number_seq;

alter table public.company_settings
  add column if not exists quote_prefix text not null default 'QTN',
  add column if not exists quote_validity_days int not null default 14
    check (quote_validity_days between 1 and 365);

create or replace function public.assign_quote_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  prefix text;
begin
  if new.quote_number is null or btrim(new.quote_number) = '' then
    select coalesce(quote_prefix, 'QTN') into prefix from public.company_settings limit 1;
    new.quote_number :=
      coalesce(prefix, 'QTN') || '-' ||
      to_char(now() at time zone 'Asia/Riyadh', 'YYYY') || '-' ||
      lpad(nextval('public.quotation_number_seq')::text, 5, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists assign_quote_number on public.quotations;
create trigger assign_quote_number before insert on public.quotations
  for each row execute function public.assign_quote_number();

-- ── Line totals and quotation totals ────────────────────────────────────────

create or replace function public.sync_quotation_item_total()
returns trigger
language plpgsql
as $$
begin
  new.line_total := round(new.quantity * new.unit_price, 2);
  return new;
end;
$$;

drop trigger if exists sync_quotation_item_total on public.quotation_items;
create trigger sync_quotation_item_total before insert or update on public.quotation_items
  for each row execute function public.sync_quotation_item_total();

/**
 * Recomputes a quotation's money columns from its items.
 *
 * `monthly_total` is tracked separately from `subtotal` because the two answer
 * different questions: subtotal is what the client owes now if they accept,
 * monthly_total is what they will owe every month thereafter. Mixing them into
 * one figure is the classic way an agency quote ends up misread.
 */
create or replace function public.recalc_quotation(p_quotation_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  one_off numeric;
  monthly numeric;
  disc numeric;
  vat_on boolean;
  net numeric;
begin
  select coalesce(sum(line_total) filter (where kind <> 'monthly'), 0),
         coalesce(sum(line_total) filter (where kind = 'monthly'), 0)
    into one_off, monthly
  from public.quotation_items where quotation_id = p_quotation_id;

  select discount, vat_enabled into disc, vat_on
  from public.quotations where id = p_quotation_id;

  if not found then return; end if;

  -- A discount can reduce a quote to zero but never below it.
  net := greatest(one_off - least(coalesce(disc, 0), one_off), 0);

  update public.quotations
  set subtotal = net,
      monthly_total = monthly,
      vat_amount = case when vat_on then round(net * 0.15, 2) else 0 end,
      total = net + case when vat_on then round(net * 0.15, 2) else 0 end
  where id = p_quotation_id;
end;
$$;

create or replace function public.quotation_items_changed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.recalc_quotation(coalesce(new.quotation_id, old.quotation_id));
  return coalesce(new, old);
end;
$$;

drop trigger if exists quotation_items_changed on public.quotation_items;
create trigger quotation_items_changed after insert or update or delete on public.quotation_items
  for each row execute function public.quotation_items_changed();

-- Changing the discount or the VAT flag also moves the totals.
create or replace function public.quotation_terms_changed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.discount is distinct from old.discount
     or new.vat_enabled is distinct from old.vat_enabled then
    perform public.recalc_quotation(new.id);
  end if;
  return null;
end;
$$;

drop trigger if exists quotation_terms_changed on public.quotations;
create trigger quotation_terms_changed after update on public.quotations
  for each row execute function public.quotation_terms_changed();

-- ── Lifecycle guards ────────────────────────────────────────────────────────

/**
 * Once a client has accepted a quote — and certainly once it has been turned
 * into charges — its numbers must stop moving. Otherwise the PDF the client
 * agreed to and the invoice they receive can quietly disagree.
 */
create or replace function public.guard_quotation_edit()
returns trigger
language plpgsql
as $$
begin
  if old.status = 'converted'
     and (new.discount is distinct from old.discount
          or new.vat_enabled is distinct from old.vat_enabled
          or new.currency is distinct from old.currency
          or new.client_id is distinct from old.client_id) then
    raise exception 'This quotation has already been converted into charges and can no longer be edited.'
      using errcode = 'check_violation';
  end if;

  if new.status = 'accepted' and old.status <> 'accepted' then
    new.accepted_at := coalesce(new.accepted_at, now());
  end if;

  return new;
end;
$$;

drop trigger if exists guard_quotation_edit on public.quotations;
create trigger guard_quotation_edit before update on public.quotations
  for each row execute function public.guard_quotation_edit();

create or replace function public.guard_quotation_item_edit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  st text;
begin
  select status into st from public.quotations
  where id = coalesce(new.quotation_id, old.quotation_id);

  if st in ('accepted', 'converted') then
    raise exception 'Line items cannot be changed on a % quotation. Duplicate it into a new quote instead.', st
      using errcode = 'check_violation';
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists guard_quotation_item_edit on public.quotation_items;
create trigger guard_quotation_item_edit before insert or update or delete on public.quotation_items
  for each row execute function public.guard_quotation_item_edit();

drop trigger if exists set_updated_at on public.quotations;
create trigger set_updated_at before update on public.quotations
  for each row execute function public.set_updated_at();

drop trigger if exists set_created_by on public.quotations;
create trigger set_created_by before insert on public.quotations
  for each row execute function public.set_created_by();

-- ── Conversion into the billing system ──────────────────────────────────────

/**
 * Turns an accepted quotation into real money owed.
 *
 *   one-off / setup items → one charge each in public.payments
 *   monthly items         → folded into the client's billing_plan
 *
 * `p_replace_plan` decides what happens when the client already has an active
 * plan: false (the default) aborts with a clear message so the caller can ask
 * the user first; true overwrites the monthly amount. Nothing silently
 * changes what a client is billed every month.
 *
 * Returns the number of charges created.
 */
create or replace function public.convert_quotation(
  p_quotation_id uuid,
  p_replace_plan boolean default false
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  q record;
  it record;
  vat numeric(5, 2);
  created int := 0;
  existing_plan record;
  monthly_items numeric;
  setup_items numeric;
begin
  select * into q from public.quotations where id = p_quotation_id for update;
  if not found then
    raise exception 'Quotation not found.' using errcode = 'no_data_found';
  end if;

  if q.status = 'converted' then
    raise exception 'This quotation has already been converted into charges.'
      using errcode = 'check_violation';
  end if;

  if q.status <> 'accepted' then
    raise exception 'Only an accepted quotation can be converted. Mark it as accepted first.'
      using errcode = 'check_violation';
  end if;

  if not exists (select 1 from public.quotation_items where quotation_id = q.id) then
    raise exception 'This quotation has no line items to convert.'
      using errcode = 'check_violation';
  end if;

  vat := case when q.vat_enabled then 15 else 0 end;

  select coalesce(sum(line_total) filter (where kind = 'monthly'), 0),
         coalesce(sum(line_total) filter (where kind = 'setup'), 0)
    into monthly_items, setup_items
  from public.quotation_items where quotation_id = q.id;

  -- Monthly work: fold into the recurring plan rather than billing it once.
  if monthly_items > 0 then
    select * into existing_plan
    from public.billing_plans
    where client_id = q.client_id and status = 'active'
    limit 1;

    if found then
      if not p_replace_plan then
        raise exception
          'This client already has an active billing plan of % per month. Confirm replacing it with % before converting.',
          existing_plan.monthly_amount, monthly_items
          using errcode = 'check_violation';
      end if;

      update public.billing_plans
      set monthly_amount = monthly_items,
          currency = q.currency,
          vat_enabled = q.vat_enabled
      where id = existing_plan.id;
    else
      -- setup_fee stays 0: setup items are billed below as explicit charges, so
      -- letting the plan also charge them would double-bill the client.
      insert into public.billing_plans (
        client_id, monthly_amount, setup_fee, setup_fee_charged,
        currency, billing_day, start_date, vat_enabled, status, notes
      ) values (
        q.client_id, monthly_items, 0, true,
        q.currency,
        least(greatest(extract(day from (now() at time zone 'Asia/Riyadh'))::int, 1), 28),
        (now() at time zone 'Asia/Riyadh')::date,
        q.vat_enabled, 'active',
        'Created from quotation ' || coalesce(q.quote_number, q.id::text)
      );
    end if;
  end if;

  -- Everything that is not recurring becomes a charge due now.
  for it in
    select * from public.quotation_items
    where quotation_id = q.id and kind <> 'monthly'
    order by position, created_at
  loop
    insert into public.payments (
      client_id, kind, description, amount, currency, vat_rate, due_date, status, notes
    ) values (
      q.client_id,
      it.kind,
      it.description ||
        case when it.quantity <> 1 then ' (×' || trim(to_char(it.quantity, 'FM999999990.99')) || ')' else '' end,
      it.line_total,
      q.currency,
      vat,
      coalesce(q.valid_until, (now() at time zone 'Asia/Riyadh')::date),
      'unpaid',
      'From quotation ' || coalesce(q.quote_number, q.id::text)
    );
    created := created + 1;
  end loop;

  -- A discount is quoted against the one-off total, so it lands as a negative
  -- adjustment charge rather than being silently spread across the line items.
  if q.discount > 0 then
    insert into public.payments (
      client_id, kind, description, amount, currency, vat_rate, due_date, status, notes
    ) values (
      q.client_id, 'one_off', 'Discount', -1 * least(q.discount, setup_items + (
        select coalesce(sum(line_total), 0) from public.quotation_items
        where quotation_id = q.id and kind = 'one_off'
      )), q.currency, vat,
      coalesce(q.valid_until, (now() at time zone 'Asia/Riyadh')::date),
      'unpaid',
      'Discount from quotation ' || coalesce(q.quote_number, q.id::text)
    );
    created := created + 1;
  end if;

  update public.quotations
  set status = 'converted', converted_at = now()
  where id = q.id;

  -- Bring the plan up to date immediately and consume any advance the client
  -- already paid, so the numbers on screen are right the moment this returns.
  perform public.generate_due_charges();

  return created;
end;
$$;

-- ── Credit lines on payments ────────────────────────────────────────────────
-- A quotation discount lands as a negative charge, which the 0003 rules were
-- never written for: the non-negative CHECK rejected it outright, and the
-- totals trigger read "0 received against a total of −230" as someone trying
-- to shrink a charge below what had already been paid.

alter table public.payments drop constraint if exists payments_amount_check;

create or replace function public.sync_payment_totals()
returns trigger
language plpgsql
as $$
begin
  new.vat_amount := round(coalesce(new.amount, 0) * coalesce(new.vat_rate, 0) / 100, 2);
  new.total := coalesce(new.amount, 0) + new.vat_amount;

  -- Credit line (a discount, a write-off). It reduces what the client owes,
  -- can never be "received", and must never be chased — so it is recorded as
  -- settled with nothing applied against it. Outstanding is computed as
  -- total − amount_paid, so a −230 credit with 0 applied correctly takes 230
  -- off the client's balance, while `status = 'paid'` keeps it out of the
  -- overdue view and out of the credit-allocation loop.
  if new.total < 0 then
    new.amount_paid := 0;
    new.status := 'paid';
    new.paid_at := coalesce(new.paid_at, now());
    return new;
  end if;

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

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table public.quotations enable row level security;
alter table public.quotation_items enable row level security;

drop policy if exists "quotations_select" on public.quotations;
create policy "quotations_select" on public.quotations for select to authenticated
  using (public.is_active_user());
drop policy if exists "quotations_insert" on public.quotations;
create policy "quotations_insert" on public.quotations for insert to authenticated
  with check (public.is_active_user());
drop policy if exists "quotations_update" on public.quotations;
create policy "quotations_update" on public.quotations for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
drop policy if exists "quotations_delete_admin_only" on public.quotations;
create policy "quotations_delete_admin_only" on public.quotations for delete to authenticated
  using (public.is_admin());

drop policy if exists "quotation_items_select" on public.quotation_items;
create policy "quotation_items_select" on public.quotation_items for select to authenticated
  using (public.is_active_user());
drop policy if exists "quotation_items_insert" on public.quotation_items;
create policy "quotation_items_insert" on public.quotation_items for insert to authenticated
  with check (public.is_active_user());
drop policy if exists "quotation_items_update" on public.quotation_items;
create policy "quotation_items_update" on public.quotation_items for update to authenticated
  using (public.is_active_user()) with check (public.is_active_user());
drop policy if exists "quotation_items_delete" on public.quotation_items;
create policy "quotation_items_delete" on public.quotation_items for delete to authenticated
  using (public.is_active_user());

-- ── Grants ──────────────────────────────────────────────────────────────────

grant select, insert, update, delete on public.quotations to authenticated;
grant select, insert, update, delete on public.quotation_items to authenticated;
grant usage, select on sequence public.quotation_number_seq to authenticated;
grant execute on function public.convert_quotation(uuid, boolean) to authenticated;
grant execute on function public.recalc_quotation(uuid) to authenticated;
