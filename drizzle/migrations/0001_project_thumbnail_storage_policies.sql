CREATE POLICY "Admins can upload project thumbnails"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'certificates' AND (storage.foldername(name))[1] = 'projects' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project thumbnails"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'certificates' AND (storage.foldername(name))[1] = 'projects' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project thumbnails"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'certificates' AND (storage.foldername(name))[1] = 'projects' AND public.has_role(auth.uid(), 'admin'));