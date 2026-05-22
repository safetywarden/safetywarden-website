/*
  # Fix Users Table RLS for Authentication
  
  The users table SELECT policy has a complex subquery that causes issues during authentication.
  During login, Supabase Auth needs to query the users table, but the policy requires checking
  memberships, creating a circular dependency.
  
  Changes:
  1. Drop the complex users SELECT policy
  2. Create a simpler policy that allows users to view their own profile
  3. Keep the update policy as is
*/

-- Drop the complex policy
DROP POLICY IF EXISTS "Users can view users in their organizations" ON users;

-- Create a simple policy: users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Also allow users to view other users in their organizations (separate policy)
CREATE POLICY "Users can view org members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT DISTINCT m1.user_id 
      FROM memberships m1
      WHERE m1.organization_id IN (
        SELECT m2.organization_id 
        FROM memberships m2 
        WHERE m2.user_id = auth.uid()
      )
    )
  );
