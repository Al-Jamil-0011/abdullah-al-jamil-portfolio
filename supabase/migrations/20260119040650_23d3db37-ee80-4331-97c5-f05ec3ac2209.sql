-- Add new columns to projects table for Excel import compatibility
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS progress_status text DEFAULT 'Processing',
ADD COLUMN IF NOT EXISTS completion_date text,
ADD COLUMN IF NOT EXISTS live_link text;

-- Update existing RLS policies to include new columns (they already cover all columns by default)