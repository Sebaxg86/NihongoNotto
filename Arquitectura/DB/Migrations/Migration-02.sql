-- Migration-02: conjuntos de estudio privados.
begin;
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
commit;
