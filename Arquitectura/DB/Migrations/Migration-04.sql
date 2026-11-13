-- Migration-04: borrado recuperable de tarjetas.
begin;
alter table public.notebook_entries add column deleted_at timestamptz;
grant update (deleted_at) on public.notebook_entries to authenticated;
create policy notebook_update_own on public.notebook_entries for update to authenticated
 using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
commit;
