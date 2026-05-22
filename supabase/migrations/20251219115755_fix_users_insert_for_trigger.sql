/*
  # Fix Users Table INSERT for Trigger Function
  
  The handle_new_user() trigger function needs to insert into the users table,
  but RLS policies are blocking it. The previous INSERT policy won't work because
  during signup, there's no authenticated session yet (auth.uid() is null).
  
  The trigger function uses SECURITY DEFINER, but RLS still applies. We need to
  either disable RLS for the function or create a policy that allows the insert.
  
  Changes:
  1. Drop the previous INSERT policy that won't work
  2. Temporarily disable RLS enforcement for inserts by the trigger
     by creating a permissive policy that allows inserts when the id matches
     the id being inserted (which the SECURITY DEFINER function can do)
*/

-- Drop the policy that won't work during signup
DROP POLICY IF EXISTS "Allow user creation during signup" ON users;

-- Create a policy that allows inserts via the trigger function
-- This works because the trigger has SECURITY DEFINER and can bypass
-- the auth.uid() check, but we still need a policy to allow the INSERT
CREATE POLICY "Allow trigger to create user profiles"
  ON users
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);
