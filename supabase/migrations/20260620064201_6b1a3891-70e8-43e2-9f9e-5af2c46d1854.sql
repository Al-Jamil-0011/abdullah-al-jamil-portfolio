
-- Lock down has_role: only the database (policy evaluator) should execute it directly
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated;

-- Prevent anonymous listing of certificates bucket while keeping individual object URLs accessible.
-- Replace broad public SELECT with a no-op policy (object access via signed/public URLs still works at the bucket level for public buckets).
DROP POLICY IF EXISTS "Anyone can view certificate images" ON storage.objects;
