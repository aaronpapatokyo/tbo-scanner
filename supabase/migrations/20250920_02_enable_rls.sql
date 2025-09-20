do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'tbo_bars'
  ) then
    execute 'alter table public.tbo_bars enable row level security';
  end if;
end $$;
