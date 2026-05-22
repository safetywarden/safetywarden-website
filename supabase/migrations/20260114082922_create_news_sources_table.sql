/*
  # Create News Sources Table

  1. New Tables
    - `news_sources`
      - `id` (uuid, primary key, auto-generated)
      - `source_name` (text, not null) - Name of the news source
      - `rss_url` (text, not null) - RSS feed URL
      - `is_active` (boolean, default true) - Whether this source should be fetched
      - `created_at` (timestamptz, auto-generated) - When source was added
      - `updated_at` (timestamptz, auto-generated) - Last update timestamp
      - `last_fetched_at` (timestamptz, nullable) - Last successful fetch time
      - `fetch_count` (integer, default 0) - Number of successful fetches
      - `notes` (text, nullable) - Optional notes about the source

  2. Security
    - Enable RLS on `news_sources` table
    - Add policies for authenticated users to manage sources (admin-only table)

  3. Indexes
    - Index on `is_active` for filtering active sources
    - Index on `last_fetched_at` for scheduling
*/

-- Create news_sources table
CREATE TABLE IF NOT EXISTS news_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name text NOT NULL,
  rss_url text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  last_fetched_at timestamptz,
  fetch_count integer DEFAULT 0 NOT NULL,
  notes text
);

-- Enable RLS
ALTER TABLE news_sources ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read news sources
CREATE POLICY "Authenticated users can read news sources"
  ON news_sources
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert news sources
CREATE POLICY "Authenticated users can insert news sources"
  ON news_sources
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update news sources
CREATE POLICY "Authenticated users can update news sources"
  ON news_sources
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete news sources
CREATE POLICY "Authenticated users can delete news sources"
  ON news_sources
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_sources_is_active ON news_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_news_sources_last_fetched ON news_sources(last_fetched_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_news_sources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_update_news_sources_updated_at ON news_sources;
CREATE TRIGGER trigger_update_news_sources_updated_at
  BEFORE UPDATE ON news_sources
  FOR EACH ROW
  EXECUTE FUNCTION update_news_sources_updated_at();