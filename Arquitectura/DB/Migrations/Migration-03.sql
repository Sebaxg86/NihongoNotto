-- Migration-03: orden personal del cuaderno.
begin;
alter table public.profiles add column notebook_order uuid[] not null default '{}';
grant update (notebook_order) on public.profiles to authenticated;
commit;
