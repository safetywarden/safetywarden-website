/*
  # Row Level Security Policies

  1. Helper Functions
  2. Organization Policies
  3. User & Membership Policies
  4. Site Policies
  5. Audit & Response Policies
  6. Action & Media Policies
  7. Settings Policies
*/

-- Helper function to check if user is member of organization
CREATE OR REPLACE FUNCTION is_member(org_id uuid, user_id uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM memberships 
    WHERE organization_id = org_id 
    AND user_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user role in organization
CREATE OR REPLACE FUNCTION get_user_role(org_id uuid, user_id uuid DEFAULT auth.uid())
RETURNS text AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role
  FROM memberships 
  WHERE organization_id = org_id 
  AND user_id = user_id;
  
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_migration_logs ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Users can view their organizations" ON organizations
  FOR SELECT TO authenticated
  USING (is_member(id));

CREATE POLICY "OrgAdmins can update their organizations" ON organizations
  FOR UPDATE TO authenticated
  USING (get_user_role(id) = 'OrgAdmin');

-- Users policies
CREATE POLICY "Users can view users in their organizations" ON users
  FOR SELECT TO authenticated
  USING (id IN (
    SELECT DISTINCT m1.user_id FROM memberships m1
    JOIN memberships m2 ON m1.organization_id = m2.organization_id
    WHERE m2.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- Memberships policies
CREATE POLICY "Users can view memberships in their organizations" ON memberships
  FOR SELECT TO authenticated
  USING (is_member(organization_id));

CREATE POLICY "OrgAdmins can manage memberships" ON memberships
  FOR ALL TO authenticated
  USING (get_user_role(organization_id) = 'OrgAdmin');

-- Sites policies
CREATE POLICY "Users can view sites in their organizations" ON sites
  FOR SELECT TO authenticated
  USING (is_member(organization_id));

CREATE POLICY "OrgAdmins and Auditors can manage sites" ON sites
  FOR ALL TO authenticated
  USING (get_user_role(organization_id) IN ('OrgAdmin', 'Auditor'));

-- Checklist Items policies
CREATE POLICY "Users can view checklist items" ON checklist_items
  FOR SELECT TO authenticated
  USING (
    organization_id IS NULL OR 
    is_member(organization_id)
  );

CREATE POLICY "OrgAdmins can manage organization checklist items" ON checklist_items
  FOR ALL TO authenticated
  USING (
    organization_id IS NOT NULL AND
    get_user_role(organization_id) = 'OrgAdmin'
  );

-- Audits policies
CREATE POLICY "Users can view audits in their organizations" ON audits
  FOR SELECT TO authenticated
  USING (is_member(organization_id));

CREATE POLICY "OrgAdmins and Auditors can manage audits" ON audits
  FOR ALL TO authenticated
  USING (get_user_role(organization_id) IN ('OrgAdmin', 'Auditor'));

-- Audit Responses policies
CREATE POLICY "Users can view audit responses in their organizations" ON audit_responses
  FOR SELECT TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE is_member(organization_id)
  ));

CREATE POLICY "Auditors can manage audit responses" ON audit_responses
  FOR ALL TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits 
    WHERE get_user_role(organization_id) IN ('OrgAdmin', 'Auditor')
  ));

-- Actions policies
CREATE POLICY "Users can view actions in their organizations" ON actions
  FOR SELECT TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE is_member(organization_id)
  ));

CREATE POLICY "Users can manage actions" ON actions
  FOR ALL TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits 
    WHERE get_user_role(organization_id) IN ('OrgAdmin', 'Auditor', 'Warden')
  ));

-- Media policies
CREATE POLICY "Users can view media in their organizations" ON media
  FOR SELECT TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE is_member(organization_id)
  ));

CREATE POLICY "Users can manage media" ON media
  FOR ALL TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits 
    WHERE get_user_role(organization_id) IN ('OrgAdmin', 'Auditor', 'Warden')
  ));

-- Settings policies
CREATE POLICY "Users can view settings in their organizations" ON settings
  FOR SELECT TO authenticated
  USING (is_member(organization_id));

CREATE POLICY "OrgAdmins can manage settings" ON settings
  FOR ALL TO authenticated
  USING (get_user_role(organization_id) = 'OrgAdmin');

-- Admin Migration Logs policies (SuperAdmin only)
CREATE POLICY "Only service role can access migration logs" ON admin_migration_logs
  FOR ALL TO service_role
  USING (true);