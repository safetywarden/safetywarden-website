/*
  # Core Audit & Compliance Schema

  1. Extensions & Enums
  2. Core Tables (Organizations, Users, Sites, etc.)
  3. Audit Tables (Audits, ChecklistItems, Responses, etc.)
  4. Functions & Triggers
  5. Indexes for Performance
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('OrgAdmin', 'Auditor', 'Warden', 'Viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE audit_status AS ENUM ('Scheduled', 'In-Progress', 'Completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE pass_fail_status AS ENUM ('Pass', 'Conditional Pass', 'Fail');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE requirement_type AS ENUM ('Must-have', 'Should-have');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE check_type AS ENUM ('YesNo', 'Numeric', 'Text');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE action_status AS ENUM ('Open', 'Closed', 'NA');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE data_residency AS ENUM ('India', 'GCC');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  billing_email text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Memberships table (user-organization relationships)
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'Viewer',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

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
  floors integer NOT NULL DEFAULT 1 CHECK (floors > 0),
  latitude decimal,
  longitude decimal,
  created_at timestamptz DEFAULT now()
);

-- Checklist Items table
CREATE TABLE IF NOT EXISTS checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  category text NOT NULL,
  subcategory text NOT NULL,
  item_code text NOT NULL,
  control_statement text NOT NULL,
  code_ref text NOT NULL,
  requirement_type requirement_type NOT NULL DEFAULT 'Must-have',
  check_type check_type NOT NULL DEFAULT 'YesNo',
  default_severity integer NOT NULL DEFAULT 3 CHECK (default_severity BETWEEN 1 AND 5),
  default_likelihood integer NOT NULL DEFAULT 3 CHECK (default_likelihood BETWEEN 1 AND 5),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Audits table
CREATE TABLE IF NOT EXISTS audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  scheduled_at timestamptz NOT NULL,
  started_at timestamptz,
  completed_at timestamptz,
  status audit_status NOT NULL DEFAULT 'Scheduled',
  auditor_id uuid NOT NULL REFERENCES users(id),
  overall_risk decimal DEFAULT 0 CHECK (overall_risk >= 0 AND overall_risk <= 25),
  pass_fail pass_fail_status,
  notes text,
  created_at timestamptz DEFAULT now()
);

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

-- Actions table
CREATE TABLE IF NOT EXISTS actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  checklist_item_id uuid NOT NULL REFERENCES checklist_items(id) ON DELETE CASCADE,
  title text NOT NULL,
  owner_name text NOT NULL,
  owner_email text NOT NULL,
  due_date date NOT NULL,
  status action_status NOT NULL DEFAULT 'Open',
  closed_at timestamptz,
  closure_notes text,
  created_at timestamptz DEFAULT now()
);

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

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  organization_id uuid PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
  whatsapp_webhook_url text,
  email_from text NOT NULL DEFAULT 'noreply@safetywarden.com',
  data_residency data_residency NOT NULL DEFAULT 'India',
  nightly_backup boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin Migration Logs table
CREATE TABLE IF NOT EXISTS admin_migration_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script text NOT NULL,
  actor_id uuid REFERENCES users(id),
  success boolean NOT NULL,
  error text,
  logs text[],
  ran_at timestamptz DEFAULT now()
);

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

-- Function to finalize audit (calculate risk and pass/fail)
CREATE OR REPLACE FUNCTION finalize_audit(audit_uuid uuid)
RETURNS void AS $$
DECLARE
  critical_count integer;
  high_risk_count integer;
  avg_risk decimal;
BEGIN
  -- Calculate average risk score
  SELECT AVG(risk_score) INTO avg_risk
  FROM audit_responses 
  WHERE audit_id = audit_uuid;
  
  -- Count critical findings (Must-have items with risk >= 12)
  SELECT COUNT(*) INTO critical_count
  FROM audit_responses ar
  JOIN checklist_items ci ON ar.checklist_item_id = ci.id
  LEFT JOIN actions a ON a.audit_id = ar.audit_id AND a.checklist_item_id = ar.checklist_item_id
  WHERE ar.audit_id = audit_uuid 
    AND ci.requirement_type = 'Must-have'
    AND ar.risk_score >= 12
    AND (a.status IS NULL OR a.status != 'Closed');
  
  -- Count high risk findings (risk >= 9)
  SELECT COUNT(*) INTO high_risk_count
  FROM audit_responses ar
  LEFT JOIN actions a ON a.audit_id = ar.audit_id AND a.checklist_item_id = ar.checklist_item_id
  WHERE ar.audit_id = audit_uuid 
    AND ar.risk_score >= 9
    AND (a.status IS NULL OR a.status != 'Closed');
  
  -- Update audit with calculated values
  UPDATE audits SET
    overall_risk = COALESCE(avg_risk, 0),
    pass_fail = CASE
      WHEN critical_count > 0 THEN 'Fail'
      WHEN high_risk_count > 0 THEN 'Conditional Pass'
      ELSE 'Pass'
    END,
    completed_at = CASE 
      WHEN completed_at IS NULL THEN now() 
      ELSE completed_at 
    END,
    status = 'Completed'
  WHERE id = audit_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_memberships_user_org ON memberships(user_id, organization_id);
CREATE INDEX IF NOT EXISTS idx_sites_organization ON sites(organization_id);
CREATE INDEX IF NOT EXISTS idx_audits_organization ON audits(organization_id);
CREATE INDEX IF NOT EXISTS idx_audits_site ON audits(site_id);
CREATE INDEX IF NOT EXISTS idx_audits_status ON audits(status);
CREATE INDEX IF NOT EXISTS idx_audit_responses_audit ON audit_responses(audit_id);
CREATE INDEX IF NOT EXISTS idx_actions_audit ON actions(audit_id);
CREATE INDEX IF NOT EXISTS idx_actions_status ON actions(status);
CREATE INDEX IF NOT EXISTS idx_actions_due_date ON actions(due_date);
CREATE INDEX IF NOT EXISTS idx_checklist_items_org ON checklist_items(organization_id);
CREATE INDEX IF NOT EXISTS idx_checklist_items_active ON checklist_items(active);