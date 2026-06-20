
-- Drop overly permissive public INSERT policy; submissions will be proxied via edge function with service role
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

-- Add server-side length constraints (defense in depth against direct API abuse)
ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_name_length,
  DROP CONSTRAINT IF EXISTS contact_messages_email_length,
  DROP CONSTRAINT IF EXISTS contact_messages_message_length;

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT contact_messages_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_messages_message_length CHECK (char_length(message) BETWEEN 1 AND 2000);

-- Allow admins to view contact submissions
CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to manage (mark read / delete) submissions
CREATE POLICY "Admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
