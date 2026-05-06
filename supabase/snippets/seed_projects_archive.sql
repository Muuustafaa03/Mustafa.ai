-- Optional: sync Orbit + Altar into `public.projects` so CMS matches the site.
-- Run in Supabase Dashboard → SQL Editor after verifying column names match your table.
--
-- Inspect schema first:
--   select column_name, data_type from information_schema.columns
--   where table_schema = 'public' and table_name = 'projects';

-- Example (adjust column list / conflict target to match your schema):
/*
insert into public.projects (title, type, status, slug, created_at)
values
  ('Orbit', 'Spatial Tasks', 'Completed', 'orbit', timestamptz '2026-05-18 12:00:00+00'),
  ('Altar', 'Focus Ritual', 'Completed', 'altar', timestamptz '2026-04-12 12:00:00+00')
on conflict (slug) do update set
  title = excluded.title,
  type = excluded.type,
  status = excluded.status,
  created_at = excluded.created_at;
*/
