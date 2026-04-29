-- Idea titles for marketplace (required in app). Backfill from first line of concept.
alter table public.marketplace_submissions
  add column if not exists title text;

update public.marketplace_submissions
set title = coalesce(
  nullif(trim(title), ''),
  case
    when concept is not null and btrim(concept) <> '' then
      left(btrim(split_part(concept, E'\n', 1)), 200)
    else 'Untitled'
  end
)
where title is null or btrim(title) = '';

alter table public.marketplace_submissions
  alter column title set not null;
