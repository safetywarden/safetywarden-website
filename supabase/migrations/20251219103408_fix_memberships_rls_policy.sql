/*
  # Fix Memberships RLS Policy Circular Dependency
  
  The existing policy creates a circular reference where querying memberships
  requires checking memberships, causing "Database error querying schema".
  
  Changes:
  - Drop the problematic circular policy
  - Add a simple policy: users can view their own memberships directly
  - Keep the OrgAdmin policy for managing other memberships
*/

-- Drop the circular policy
DROP POLICY IF EXISTS "Users can view memberships in their organizations" ON memberships;

-- Create a simple, direct policy: users can view memberships where they are the user
CREATE POLICY "Users can view their own memberships"
  ON memberships
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
