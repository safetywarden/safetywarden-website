/*
  # Fix Users Table INSERT Policy
  
  The users table is missing an INSERT policy, which prevents the handle_new_user() 
  trigger function from creating user records during authentication signup.
  
  Changes:
  1. Add INSERT policy to allow new user creation during signup
  2. The policy allows inserting a record where the id matches the authenticated user's id
     (this works because the auth.users record is created first, then the trigger runs)
*/

-- Allow users to be created during signup
CREATE POLICY "Allow user creation during signup"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());
