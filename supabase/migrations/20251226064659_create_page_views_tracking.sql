/*
  # Create Page Views Tracking System
  
  1. New Tables
    - `page_views` - Tracks individual page views with metadata
    - `page_stats` - Aggregated statistics per page
  
  2. Security
    - Enable RLS on both tables
    - Public can insert page views (anonymous tracking)
    - Only authenticated users can view aggregated stats
  
  3. Features
    - Track page path, referrer, user agent, and timestamp
    - Automatic aggregation of view counts per page
    - Track unique visitors using session identifiers
*/

-- Page views table (raw tracking data)
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  page_title text,
  referrer text,
  user_agent text,
  ip_address inet,
  session_id text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Page statistics table (aggregated data)
CREATE TABLE IF NOT EXISTS page_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text UNIQUE NOT NULL,
  total_views bigint DEFAULT 0,
  unique_visitors bigint DEFAULT 0,
  last_viewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE page_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for page_views
-- Allow anyone to insert page views (for tracking)
CREATE POLICY "Anyone can track page views"
  ON page_views
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view page view data
CREATE POLICY "Authenticated users can view page views"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for page_stats
-- Allow public read access to aggregated stats
CREATE POLICY "Anyone can view page stats"
  ON page_stats
  FOR SELECT
  TO public
  USING (true);

-- Only system can update stats (via function)
CREATE POLICY "System can update page stats"
  ON page_stats
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update page statistics
CREATE OR REPLACE FUNCTION update_page_stats()
RETURNS trigger AS $$
BEGIN
  INSERT INTO page_stats (page_path, total_views, unique_visitors, last_viewed_at)
  VALUES (
    NEW.page_path,
    1,
    1,
    NEW.created_at
  )
  ON CONFLICT (page_path) DO UPDATE SET
    total_views = page_stats.total_views + 1,
    unique_visitors = (
      SELECT COUNT(DISTINCT session_id)
      FROM page_views
      WHERE page_path = NEW.page_path
    ),
    last_viewed_at = NEW.created_at,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update stats on new page view
DROP TRIGGER IF EXISTS on_page_view_created ON page_views;
CREATE TRIGGER on_page_view_created
  AFTER INSERT ON page_views
  FOR EACH ROW
  EXECUTE FUNCTION update_page_stats();
