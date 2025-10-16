# Supabase Setup Guide

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Admin Configuration (for DELETE operations)
ADMIN_KEY=your_secure_admin_key_here
```

## How to Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > API in your Supabase dashboard
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Database Schema

The following table will be created in your Supabase database:

```sql
CREATE TABLE waitlist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  firm TEXT,
  role TEXT NOT NULL CHECK (role IN ('founder', 'lawyer')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_waitlist_entries_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_entries_role ON waitlist_entries(role);
CREATE INDEX idx_waitlist_entries_created_at ON waitlist_entries(created_at);

-- Enable Row Level Security
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON waitlist_entries FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON waitlist_entries FOR INSERT WITH CHECK (true);
```

## Next Steps

1. Create your Supabase project
2. Set up the environment variables
3. Run the SQL commands above in your Supabase SQL editor
4. Test the integration
