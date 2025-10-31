-- Texas Five Fueling Database Schema
-- Run this in your Supabase SQL Editor

-- Create lead_submissions table
CREATE TABLE IF NOT EXISTS public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS lead_submissions_status_idx ON public.lead_submissions(status);
CREATE INDEX IF NOT EXISTS lead_submissions_created_at_idx ON public.lead_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (backend) to have full access
CREATE POLICY "Service role has full access" ON public.lead_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for anon role (frontend) to insert only
CREATE POLICY "Allow anonymous inserts" ON public.lead_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.lead_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON public.lead_submissions TO service_role;
GRANT INSERT ON public.lead_submissions TO anon;
GRANT SELECT ON public.lead_submissions TO authenticated;

