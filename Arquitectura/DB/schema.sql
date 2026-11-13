-- NihongoNotto: esquema vigente de la aplicación.
-- Corresponde a Migration-01, Migration-02 y Migration-03, aplicada el 2026-11-12 (America/Monterrey).
-- Referencia para una base nueva; no ejecutar sobre el proyecto existente.
-- Los objetos internos de Supabase Auth son administrados por Supabase.


create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default ''
    check (char_length(display_name) <= 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;

create policy profiles_select_own on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy profiles_update_own on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create function public.set_profile_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.set_profile_updated_at() from public, anon, authenticated;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profile_updated_at();

create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 80));
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Incorporar cuentas existentes sin modificar sus datos de autenticación.
insert into public.profiles (id, display_name)
select id, left(coalesce(raw_user_meta_data ->> 'display_name', ''), 80)
from auth.users
on conflict (id) do nothing;


create table public.notebook_entries (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 source text not null check (source in ('es','ja')),
 original text not null check (char_length(original) between 1 and 2000),
 translated text not null check (char_length(translated) between 1 and 16000),
 japanese text not null check (char_length(japanese) between 1 and 16000),
 kana text not null check (char_length(kana) between 1 and 16000),
 romaji text not null check (char_length(romaji) between 1 and 32000),
 created_at timestamptz not null default now()
);
create index notebook_entries_owner_date on public.notebook_entries(user_id,created_at desc);
alter table public.notebook_entries enable row level security;
revoke all on public.notebook_entries from anon, authenticated;
grant select on public.notebook_entries to authenticated;
grant insert (source,original,translated,japanese,kana,romaji) on public.notebook_entries to authenticated;
create policy notebook_select_own on public.notebook_entries for select to authenticated using ((select auth.uid())=user_id);
create policy notebook_insert_own on public.notebook_entries for insert to authenticated with check ((select auth.uid())=user_id);

-- Orden personal del cuaderno.
alter table public.profiles add column notebook_order uuid[] not null default '{}';
grant update (notebook_order) on public.profiles to authenticated;
