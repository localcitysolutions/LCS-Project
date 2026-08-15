-- Client details expansion + services history.
-- Run after 0001_init.sql. Adds richer client fields and a per-client
-- services log (what we've provided / are providing, with status + dates).

alter table public.clients
  add column if not exists website text,
  add column if not exists start_date date,
  add column if not exists gmb_name text,
  add column if not exists gmb_location text,
  add column if not exists gmb_link text,
  add column if not exists primary_service text;

create table if not exists public.client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  service text not null,
  status text not null default 'active' check (status in ('active','completed','paused')),
  started_at date,
  ended_at date,
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_services_client_id_idx on public.client_services (client_id);

create trigger set_updated_at before update on public.client_services
  for each row execute function public.set_updated_at();
create trigger set_created_by before insert on public.client_services
  for each row execute function public.set_created_by();

alter table public.client_services enable row level security;

create policy "client_services_select" on public.client_services for select to authenticated using (public.is_active_user());
create policy "client_services_insert" on public.client_services for insert to authenticated with check (public.is_active_user());
create policy "client_services_update" on public.client_services for update to authenticated using (public.is_active_user()) with check (public.is_active_user());
create policy "client_services_delete_admin_only" on public.client_services for delete to authenticated using (public.is_admin());

grant select, insert, update, delete on public.client_services to authenticated;
