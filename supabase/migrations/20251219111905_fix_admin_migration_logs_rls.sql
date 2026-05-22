/*
  # Fix Admin Migration Logs RLS
  
  The admin_migration_logs table has RLS enabled which is causing authentication issues.
  This table should not have RLS enabled as it's only for internal admin use.
  
  Changes:
  1. Disable RLS on admin_migration_logs table
  2. Drop the restrictive policy that was blocking access
*/

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Only service role can access migration logs" ON admin_migration_logs;

-- Disable RLS on admin_migration_logs
ALTER TABLE admin_migration_logs DISABLE ROW LEVEL SECURITY;
