/*
  # Add Admin Policies for Intelligence Hub
  
  1. Security Updates
    - Add policies for authenticated users to manage intelligence entries
    - Allow insert, update, and delete operations for authenticated users
    - Maintain existing public read access for published entries
  
  2. New Policies
    - "Admins can create intelligence entries"
    - "Admins can update intelligence entries"
    - "Admins can delete intelligence entries"
    - "Admins can view all intelligence entries"
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public can view published intelligence entries" ON intelligence_entries;
  DROP POLICY IF EXISTS "Admins can create intelligence entries" ON intelligence_entries;
  DROP POLICY IF EXISTS "Admins can update intelligence entries" ON intelligence_entries;
  DROP POLICY IF EXISTS "Admins can delete intelligence entries" ON intelligence_entries;
  DROP POLICY IF EXISTS "Admins can view all intelligence entries" ON intelligence_entries;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Public read access for published entries (unauthenticated users can see published content)
CREATE POLICY "Public can view published intelligence entries"
  ON intelligence_entries
  FOR SELECT
  USING (is_published = true);

-- Admin policies for authenticated users (full CRUD access)
CREATE POLICY "Admins can view all intelligence entries"
  ON intelligence_entries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create intelligence entries"
  ON intelligence_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update intelligence entries"
  ON intelligence_entries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete intelligence entries"
  ON intelligence_entries
  FOR DELETE
  TO authenticated
  USING (true);
