/*
  # SafetyWarden Intelligence Hub Schema

  1. New Tables
    - `intelligence_entries`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `category` (text, required) - Safety & Fire, EHS, ESG, Pollution, Climate
      - `source_type` (text, required) - Incident, Regulation, Enforcement, Climate, Insight
      - `source_link` (text, optional)
      - `publish_date` (date, required)
      - `short_summary` (text, required)
      - `safetywarden_insight` (text, required)
      - `risk_tags` (text array)
      - `geography` (text)
      - `severity_level` (text) - Low, Medium, High
      - `featured_image` (text, optional)
      - `seo_meta_title` (text)
      - `seo_meta_description` (text)
      - `is_published` (boolean, default false)
      - `is_featured` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `intelligence_entries` table
    - Add policy for public read access to published entries
    - Add policy for authenticated admin users to manage entries

  3. Indexes
    - Index on category for fast filtering
    - Index on slug for lookups
    - Index on publish_date for sorting
    - Index on is_published for filtering
*/

-- Create intelligence_entries table
CREATE TABLE IF NOT EXISTS intelligence_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL CHECK (category IN ('Safety & Fire', 'EHS & Occupational Safety', 'ESG & Sustainability', 'Pollution Control', 'Climate & Environmental Risk')),
  source_type text NOT NULL CHECK (source_type IN ('Incident', 'Regulation', 'Enforcement', 'Climate', 'Insight')),
  source_link text,
  publish_date date NOT NULL,
  short_summary text NOT NULL,
  safetywarden_insight text NOT NULL,
  risk_tags text[] DEFAULT '{}',
  geography text,
  severity_level text CHECK (severity_level IN ('Low', 'Medium', 'High')),
  featured_image text,
  seo_meta_title text,
  seo_meta_description text,
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_intelligence_category ON intelligence_entries(category);
CREATE INDEX IF NOT EXISTS idx_intelligence_slug ON intelligence_entries(slug);
CREATE INDEX IF NOT EXISTS idx_intelligence_publish_date ON intelligence_entries(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_intelligence_is_published ON intelligence_entries(is_published);
CREATE INDEX IF NOT EXISTS idx_intelligence_severity ON intelligence_entries(severity_level);

-- Enable Row Level Security
ALTER TABLE intelligence_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published entries
CREATE POLICY "Public can view published intelligence entries"
  ON intelligence_entries
  FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users can insert entries
CREATE POLICY "Authenticated users can create intelligence entries"
  ON intelligence_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update their entries
CREATE POLICY "Authenticated users can update intelligence entries"
  ON intelligence_entries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete entries
CREATE POLICY "Authenticated users can delete intelligence entries"
  ON intelligence_entries
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_intelligence_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER intelligence_updated_at
  BEFORE UPDATE ON intelligence_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_intelligence_updated_at();
