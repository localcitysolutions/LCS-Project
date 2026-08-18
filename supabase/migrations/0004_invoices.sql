-- Invoicing: company details for the letterhead, and stable invoice / receipt
-- numbers so every PDF can be re-issued identically.
--
-- Run after 0003_billing.sql.

-- ── Company (seller) details ────────────────────────────────────────────────
-- Single-row table. The `id boolean primary key check (id)` trick makes a
-- second row impossible at the database level, so the app can always read it
-- with a plain `.maybeSingle()` and never worry about which row is "the" one.

create table if not exists public.company_settings (
  id boolean primary key default true check (id),
  name_en text not null default 'Local City Solutions',
  name_ar text not null default '',
  vat_number text,
  cr_number text,
  address_en text,
  address_ar text,
  phone text,
  email text,
  website text,
  bank_name text,
  iban text,
  invoice_prefix text not null default 'INV',
  receipt_prefix text not null default 'RCT',
  payment_terms_en text,
  payment_terms_ar text,
  updated_at timestamptz not null default now()
);

insert into public.company_settings (id) values (true) on conflict (id) do nothing;

drop trigger if exists set_updated_at on public.company_settings;
create trigger set_updated_at before update on public.company_settings
  for each row execute function public.set_updated_at();

-- ── Document numbering ──────────────────────────────────────────────────────
-- Sequences (not count(*)+1) so two people creating charges at the same moment
-- can never be handed the same number.

create sequence if not exists public.invoice_number_seq;
create sequence if not exists public.receipt_number_seq;

alter table public.payment_receipts
  add column if not exists receipt_number text;

create unique index if not exists payments_invoice_number_key
  on public.payments (invoice_number) where invoice_number is not null;

create unique index if not exists payment_receipts_receipt_number_key
  on public.payment_receipts (receipt_number) where receipt_number is not null;

create or replace function public.assign_invoice_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  prefix text;
begin
  if new.invoice_number is null or btrim(new.invoice_number) = '' then
    select coalesce(invoice_prefix, 'INV') into prefix from public.company_settings limit 1;
    new.invoice_number :=
      coalesce(prefix, 'INV') || '-' ||
      to_char(now() at time zone 'Asia/Riyadh', 'YYYY') || '-' ||
      lpad(nextval('public.invoice_number_seq')::text, 5, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists assign_invoice_number on public.payments;
create trigger assign_invoice_number before insert on public.payments
  for each row execute function public.assign_invoice_number();

create or replace function public.assign_receipt_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  prefix text;
begin
  if new.receipt_number is null or btrim(new.receipt_number) = '' then
    select coalesce(receipt_prefix, 'RCT') into prefix from public.company_settings limit 1;
    new.receipt_number :=
      coalesce(prefix, 'RCT') || '-' ||
      to_char(now() at time zone 'Asia/Riyadh', 'YYYY') || '-' ||
      lpad(nextval('public.receipt_number_seq')::text, 5, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists assign_receipt_number on public.payment_receipts;
create trigger assign_receipt_number before insert on public.payment_receipts
  for each row execute function public.assign_receipt_number();

-- Back-fill anything created before this migration, oldest first so the
-- numbers read in the order the work actually happened.
do $$
declare
  r record;
  prefix text;
begin
  select coalesce(invoice_prefix, 'INV') into prefix from public.company_settings limit 1;
  for r in
    select id, created_at from public.payments
    where invoice_number is null or btrim(invoice_number) = ''
    order by created_at
  loop
    update public.payments
    set invoice_number = prefix || '-' ||
      to_char(r.created_at at time zone 'Asia/Riyadh', 'YYYY') || '-' ||
      lpad(nextval('public.invoice_number_seq')::text, 5, '0')
    where id = r.id;
  end loop;

  select coalesce(receipt_prefix, 'RCT') into prefix from public.company_settings limit 1;
  for r in
    select id, created_at from public.payment_receipts
    where receipt_number is null or btrim(receipt_number) = ''
    order by created_at
  loop
    update public.payment_receipts
    set receipt_number = prefix || '-' ||
      to_char(r.created_at at time zone 'Asia/Riyadh', 'YYYY') || '-' ||
      lpad(nextval('public.receipt_number_seq')::text, 5, '0')
    where id = r.id;
  end loop;
end $$;

-- ── Row Level Security ──────────────────────────────────────────────────────
-- Everyone active can read the letterhead (every PDF needs it); only admins
-- can change the company's legal identity, VAT number or bank details.

alter table public.company_settings enable row level security;

drop policy if exists "company_settings_select" on public.company_settings;
create policy "company_settings_select" on public.company_settings for select to authenticated
  using (public.is_active_user());

drop policy if exists "company_settings_update_admin_only" on public.company_settings;
create policy "company_settings_update_admin_only" on public.company_settings for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

grant select, update on public.company_settings to authenticated;
grant usage, select on sequence public.invoice_number_seq to authenticated;
grant usage, select on sequence public.receipt_number_seq to authenticated;
