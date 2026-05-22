/*
  # Create Audit & Compliance Schema

  1. New Tables
    - `organizations` - Multi-tenant organizations
    - `users` - Extended user profiles
    - `memberships` - User-organization relationships with roles
    - `sites` - Organization sites/locations
    - `audits` - Audit records
    - `checklist_items` - Audit checklist library
    - `audit_responses` - Audit responses/findings
    - `actions` - Corrective actions
    - `media` - Photo/file attachments
    - `settings` - Organization settings

  2. Security
    - Enable RLS on all tables
    - Add policies for multi-tenant access control
    - Users can only access data for organizations they belong to

  3. Functions & Triggers
    - Auto-calculate risk scores
    - Update audit pass/fail status
    - Handle user profile creation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  billing_email text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Memberships table (user-organization relationships)
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('OrgAdmin', 'Auditor', 'Warden', 'Viewer')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  building_type text NOT NULL,
  floors integer NOT NULL DEFAULT 1,
  latitude decimal,
  longitude decimal,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Checklist Items table
CREATE TABLE IF NOT EXISTS checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  category text NOT NULL,
  subcategory text NOT NULL,
  item_code text NOT NULL,
  control_statement text NOT NULL,
  code_ref text NOT NULL,
  requirement_type text NOT NULL CHECK (requirement_type IN ('Must-have', 'Should-have')),
  check_type text NOT NULL CHECK (check_type IN ('YesNo', 'Numeric', 'Text')),
  default_severity integer NOT NULL CHECK (default_severity BETWEEN 1 AND 5),
  default_likelihood integer NOT NULL CHECK (default_likelihood BETWEEN 1 AND 5),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- Audits table
CREATE TABLE IF NOT EXISTS audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  started_at timestamptz,
  completed_at timestamptz,
  status text NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In-Progress', 'Completed')),
  auditor_id uuid NOT NULL REFERENCES users(id),
  overall_risk decimal DEFAULT 0,
  pass_fail text CHECK (pass_fail IN ('Pass', 'Conditional Pass', 'Fail')),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- Audit Responses table
CREATE TABLE IF NOT EXISTS audit_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  checklist_item_id uuid NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  response_value text,
  severity integer NOT NULL CHECK (severity BETWEEN 1 AND 5),
  likelihood integer NOT NULL CHECK (likelihood BETWEEN 1 AND 5),
  risk_score decimal GENERATED ALWAYS AS (severity * likelihood) STORED,
  finding_notes text,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(audit_id, checklist_item_id)
);

ALTER TABLE audit_responses ENABLE ROW LEVEL SECURITY;

-- Actions table
CREATE TABLE IF NOT EXISTS actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  checklist_item_id uuid NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  title text NOT NULL,
  owner_name text NOT NULL,
  owner_email text NOT NULL,
  due_date date NOT NULL,
  status text NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Closed', 'NA')),
  closed_at timestamptz,
  closure_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE actions ENABLE ROW LEVEL SECURITY;

-- Media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  checklist_item_id uuid NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  url text NOT NULL,
  thumbnail_url text,
  caption text,
  exif_time timestamptz,
  uploaded_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  organization_id uuid PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
  whatsapp_webhook_url text,
  email_from text NOT NULL DEFAULT 'noreply@safetywarden.com',
  data_residency text NOT NULL DEFAULT 'India' CHECK (data_residency IN ('India', 'GCC')),
  nightly_backup boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Organizations: Users can only see orgs they belong to
CREATE POLICY "Users can view their organizations" ON organizations
  FOR SELECT TO authenticated
  USING (id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "OrgAdmins can update their organizations" ON organizations
  FOR UPDATE TO authenticated
  USING (id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid() AND role = 'OrgAdmin'
  ));

-- Users: Users can view all users in their organizations
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

-- Memberships: Users can view memberships in their organizations
CREATE POLICY "Users can view memberships in their organizations" ON memberships
  FOR SELECT TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "OrgAdmins can manage memberships" ON memberships
  FOR ALL TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid() AND role = 'OrgAdmin'
  ));

-- Sites: Organization-scoped access
CREATE POLICY "Users can view sites in their organizations" ON sites
  FOR SELECT TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "OrgAdmins and Auditors can manage sites" ON sites
  FOR ALL TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid() AND role IN ('OrgAdmin', 'Auditor')
  ));

-- Checklist Items: Global items (organization_id IS NULL) or organization-scoped
CREATE POLICY "Users can view checklist items" ON checklist_items
  FOR SELECT TO authenticated
  USING (
    organization_id IS NULL OR 
    organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "OrgAdmins can manage organization checklist items" ON checklist_items
  FOR ALL TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid() AND role = 'OrgAdmin'
  ));

-- Audits: Organization-scoped access with role-based permissions
CREATE POLICY "Users can view audits in their organizations" ON audits
  FOR SELECT TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "OrgAdmins and Auditors can manage audits" ON audits
  FOR ALL TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid() AND role IN ('OrgAdmin', 'Auditor')
  ));

-- Audit Responses: Access through audit organization
CREATE POLICY "Users can view audit responses in their organizations" ON audit_responses
  FOR SELECT TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Auditors can manage audit responses" ON audit_responses
  FOR ALL TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid() AND role IN ('OrgAdmin', 'Auditor')
    )
  ));

-- Actions: Access through audit organization
CREATE POLICY "Users can view actions in their organizations" ON actions
  FOR SELECT TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can manage actions" ON actions
  FOR ALL TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid() AND role IN ('OrgAdmin', 'Auditor', 'Warden')
    )
  ));

-- Media: Access through audit organization
CREATE POLICY "Users can view media in their organizations" ON media
  FOR SELECT TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY "Users can manage media" ON media
  FOR ALL TO authenticated
  USING (audit_id IN (
    SELECT id FROM audits WHERE organization_id IN (
      SELECT organization_id FROM memberships 
      WHERE user_id = auth.uid() AND role IN ('OrgAdmin', 'Auditor', 'Warden')
    )
  ));

-- Settings: Organization-scoped
CREATE POLICY "Users can view settings in their organizations" ON settings
  FOR SELECT TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "OrgAdmins can manage settings" ON settings
  FOR ALL TO authenticated
  USING (organization_id IN (
    SELECT organization_id FROM memberships 
    WHERE user_id = auth.uid() AND role = 'OrgAdmin'
  ));

-- Functions

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update audit pass/fail status
CREATE OR REPLACE FUNCTION update_audit_status()
RETURNS trigger AS $$
DECLARE
  audit_record audits%ROWTYPE;
  critical_count integer;
  high_risk_count integer;
  avg_risk decimal;
BEGIN
  -- Get the audit record
  SELECT * INTO audit_record FROM audits WHERE id = NEW.audit_id;
  
  -- Calculate average risk score
  SELECT AVG(risk_score) INTO avg_risk
  FROM audit_responses 
  WHERE audit_id = NEW.audit_id;
  
  -- Count critical findings (Must-have items with risk >= 12)
  SELECT COUNT(*) INTO critical_count
  FROM audit_responses ar
  JOIN checklist_items ci ON ar.checklist_item_id = ci.id
  LEFT JOIN actions a ON a.audit_id = ar.audit_id AND a.checklist_item_id = ar.checklist_item_id
  WHERE ar.audit_id = NEW.audit_id 
    AND ci.requirement_type = 'Must-have'
    AND ar.risk_score >= 12
    AND (a.status IS NULL OR a.status != 'Closed');
  
  -- Count high risk findings (risk >= 9)
  SELECT COUNT(*) INTO high_risk_count
  FROM audit_responses ar
  LEFT JOIN actions a ON a.audit_id = ar.audit_id AND a.checklist_item_id = ar.checklist_item_id
  WHERE ar.audit_id = NEW.audit_id 
    AND ar.risk_score >= 9
    AND (a.status IS NULL OR a.status != 'Closed');
  
  -- Update audit with calculated values
  UPDATE audits SET
    overall_risk = COALESCE(avg_risk, 0),
    pass_fail = CASE
      WHEN critical_count > 0 THEN 'Fail'
      WHEN high_risk_count > 0 THEN 'Conditional Pass'
      ELSE 'Pass'
    END
  WHERE id = NEW.audit_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update audit status when responses change
DROP TRIGGER IF EXISTS on_audit_response_change ON audit_responses;
CREATE TRIGGER on_audit_response_change
  AFTER INSERT OR UPDATE OR DELETE ON audit_responses
  FOR EACH ROW EXECUTE FUNCTION update_audit_status();

-- Trigger to update audit status when actions change
DROP TRIGGER IF EXISTS on_action_change ON actions;
CREATE TRIGGER on_action_change
  AFTER INSERT OR UPDATE OR DELETE ON actions
  FOR EACH ROW EXECUTE FUNCTION update_audit_status();

-- Insert default checklist items
INSERT INTO checklist_items (category, subcategory, item_code, control_statement, code_ref, requirement_type, check_type, default_severity, default_likelihood, active) VALUES
('Means of Egress', 'Exit Doors', 'MOE-001', 'Exit doors shall swing in the direction of egress travel and be readily openable from the egress side without the use of a key or special knowledge.', 'NFPA 101: 7.2.1.4', 'Must-have', 'YesNo', 5, 4, true),
('Means of Egress', 'Exit Width', 'MOE-002', 'Exit access corridors shall have a minimum clear width of 44 inches (1120 mm).', 'NFPA 101: 7.3.4.1', 'Must-have', 'Numeric', 4, 3, true),
('Means of Egress', 'Exit Signs', 'MOE-003', 'Exit signs shall be illuminated and visible from all directions of approach.', 'NFPA 101: 7.10.1.2', 'Must-have', 'YesNo', 4, 3, true),
('Means of Egress', 'Stairways', 'MOE-004', 'Stairways shall have uniform riser heights and tread depths with handrails on both sides.', 'NFPA 101: 7.2.2.3', 'Must-have', 'YesNo', 5, 2, true),
('Means of Egress', 'Occupant Load', 'MOE-005', 'The occupant load shall not exceed the capacity of the means of egress.', 'NFPA 101: 7.3.1.2', 'Must-have', 'Numeric', 5, 3, true),
('Fire Detection & Alarm', 'Smoke Detectors', 'FDA-001', 'Smoke detectors shall be installed in all required locations and tested monthly.', 'NFPA 72: 17.7.3', 'Must-have', 'YesNo', 5, 3, true),
('Fire Detection & Alarm', 'Fire Alarm Panel', 'FDA-002', 'Fire alarm control panel shall be monitored 24/7 and have backup power supply.', 'NFPA 72: 10.6.7', 'Must-have', 'YesNo', 5, 2, true),
('Fire Detection & Alarm', 'Manual Pull Stations', 'FDA-003', 'Manual fire alarm boxes shall be located within 5 feet of exit doors.', 'NFPA 72: 17.14.4', 'Must-have', 'YesNo', 4, 3, true),
('Fire Detection & Alarm', 'Audible Alarms', 'FDA-004', 'Audible alarm signals shall be at least 15 dB above ambient sound level.', 'NFPA 72: 18.4.3', 'Must-have', 'Numeric', 4, 3, true),
('Fire Detection & Alarm', 'Visual Alarms', 'FDA-005', 'Visual alarm appliances shall be provided in areas where required by accessibility codes.', 'NFPA 72: 18.5.3', 'Should-have', 'YesNo', 3, 2, true),
('Fire Suppression', 'Sprinkler System', 'FS-001', 'Automatic sprinkler system shall be installed and maintained per NFPA 13.', 'NFPA 13: 8.15.1', 'Must-have', 'YesNo', 5, 2, true),
('Fire Suppression', 'Fire Extinguishers', 'FS-002', 'Portable fire extinguishers shall be inspected monthly and serviced annually.', 'NFPA 10: 7.2.1', 'Must-have', 'YesNo', 4, 4, true),
('Fire Suppression', 'Standpipe System', 'FS-003', 'Standpipe systems shall be tested and maintained per NFPA 25.', 'NFPA 25: 6.3.1', 'Must-have', 'YesNo', 4, 3, true),
('Fire Suppression', 'Water Supply', 'FS-004', 'Water supply for fire protection systems shall meet minimum pressure and flow requirements.', 'NFPA 13: 11.1.1', 'Must-have', 'Numeric', 5, 2, true),
('Emergency Lighting & Signage', 'Emergency Lighting', 'ELS-001', 'Emergency lighting shall provide minimum 1 foot-candle illumination for 90 minutes.', 'NFPA 101: 7.9.2.1', 'Must-have', 'Numeric', 4, 3, true),
('Emergency Lighting & Signage', 'Exit Signs', 'ELS-002', 'Exit signs shall be continuously illuminated and visible from 100 feet.', 'NFPA 101: 7.10.1.2', 'Must-have', 'YesNo', 4, 3, true),
('Emergency Lighting & Signage', 'Directional Signs', 'ELS-003', 'Directional exit signs shall be provided where the exit is not readily apparent.', 'NFPA 101: 7.10.1.6', 'Should-have', 'YesNo', 3, 3, true),
('Electrical Safety', 'Electrical Panels', 'ES-001', 'Electrical panels shall have proper clearances and be properly labeled.', 'NFPA 70: 110.26', 'Must-have', 'YesNo', 4, 4, true),
('Electrical Safety', 'Extension Cords', 'ES-002', 'Extension cords shall not be used as permanent wiring and shall be in good condition.', 'NFPA 70: 400.8', 'Must-have', 'YesNo', 4, 5, true),
('Electrical Safety', 'GFCI Protection', 'ES-003', 'GFCI protection shall be provided in wet locations and as required by code.', 'NFPA 70: 210.8', 'Must-have', 'YesNo', 5, 3, true),
('Housekeeping & Storage', 'Exit Routes', 'HS-001', 'Exit routes shall be kept clear of obstructions and combustible materials.', 'NFPA 101: 7.1.10', 'Must-have', 'YesNo', 5, 4, true),
('Housekeeping & Storage', 'Storage Areas', 'HS-002', 'Storage shall maintain required clearances from sprinkler heads and ceiling.', 'NFPA 13: 12.1.5', 'Must-have', 'Numeric', 4, 4, true),
('Housekeeping & Storage', 'Waste Management', 'HS-003', 'Waste and recyclable materials shall be stored in approved containers.', 'NFPA 1: 10.13.1', 'Should-have', 'YesNo', 3, 3, true),
('Hazardous Materials', 'Chemical Storage', 'HM-001', 'Hazardous materials shall be stored in approved containers and locations.', 'NFPA 400: 6.2.1', 'Must-have', 'YesNo', 5, 3, true),
('Hazardous Materials', 'Safety Data Sheets', 'HM-002', 'Safety Data Sheets shall be readily available for all hazardous materials.', 'OSHA 1910.1200', 'Must-have', 'YesNo', 3, 4, true),
('Vertical Openings & Fire Doors', 'Fire Doors', 'VFD-001', 'Fire doors shall be self-closing and self-latching with proper clearances.', 'NFPA 80: 5.2.4', 'Must-have', 'YesNo', 5, 3, true),
('Vertical Openings & Fire Doors', 'Stairwell Doors', 'VFD-002', 'Stairwell doors shall remain closed or be equipped with automatic closing devices.', 'NFPA 101: 7.2.1.8', 'Must-have', 'YesNo', 4, 4, true),
('Vertical Openings & Fire Doors', 'Fire Dampers', 'VFD-003', 'Fire dampers shall be installed in ductwork penetrating fire-rated assemblies.', 'NFPA 90A: 5.3.1', 'Must-have', 'YesNo', 4, 2, true);

-- Create demo organization and data
DO $$
DECLARE
  demo_org_id uuid;
  demo_site_id uuid;
  demo_user_id uuid;
  demo_audit_id uuid;
BEGIN
  -- Create demo organization
  INSERT INTO organizations (id, name, billing_email, city, country)
  VALUES (gen_random_uuid(), 'SafetyWarden Demo', 'demo@safetywarden.com', 'Bengaluru', 'India')
  RETURNING id INTO demo_org_id;
  
  -- Create demo site
  INSERT INTO sites (id, organization_id, name, address, city, state, country, building_type, floors)
  VALUES (gen_random_uuid(), demo_org_id, 'Demo Office Building', '123 Tech Park Drive', 'Bengaluru', 'Karnataka', 'India', 'Office', 5)
  RETURNING id INTO demo_site_id;
  
  -- Create settings for demo org
  INSERT INTO settings (organization_id, email_from, data_residency, nightly_backup)
  VALUES (demo_org_id, 'demo@safetywarden.com', 'India', true);
  
  -- Note: Demo users and audits will be created when users sign up and use the system
END $$;