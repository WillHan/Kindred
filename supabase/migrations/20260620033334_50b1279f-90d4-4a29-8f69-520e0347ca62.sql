CREATE TABLE public.kindred_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'still-water',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.kindred_signups TO anon, authenticated;
GRANT ALL ON public.kindred_signups TO service_role;

ALTER TABLE public.kindred_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up"
  ON public.kindred_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND char_length(email) <= 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

CREATE INDEX kindred_signups_created_at_idx ON public.kindred_signups (created_at DESC);