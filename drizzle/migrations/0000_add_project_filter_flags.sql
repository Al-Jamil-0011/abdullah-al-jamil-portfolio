ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS is_live boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_latest boolean NOT NULL DEFAULT false;

UPDATE public.projects
SET is_live = true
WHERE progress_status ILIKE '%live%';

UPDATE public.projects p
SET is_latest = true
WHERE p.id IN (
  SELECT id FROM public.projects ORDER BY created_at DESC LIMIT 3
);