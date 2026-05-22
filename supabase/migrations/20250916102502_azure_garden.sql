/*
  # Training & Certification Schema

  1. New Tables
    - `training_providers` - Training service providers
    - `courses` - Course catalog with pricing and requirements
    - `training_sessions` - Scheduled training sessions
    - `enrollments` - Student enrollments and progress
    - `questions` - Question bank for assessments
    - `assessments` - Theory and practical assessments
    - `certificates` - Digital certificates with QR verification
    - `affiliates` - Affiliate partners for referrals
    - `affiliate_links` - Tracking links for affiliates
    - `attribution_events` - Attribution tracking events
    - `payouts` - Commission payouts to affiliates/providers
    - `coupons` - Discount coupons and promotions

  2. Enums
    - Training modes, assessment types, certificate status
    - Payment methods, enrollment types, payout status

  3. Functions
    - Certificate verification
    - Commission calculation
    - Recertification reminders
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create training-specific enums
DO $$ BEGIN
  CREATE TYPE training_mode AS ENUM ('Online', 'Classroom', 'Hybrid');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE course_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE enrollment_type AS ENUM ('Individual', 'Corporate');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('Pending', 'Paid', 'Refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('Card', 'UPI', 'Bank Transfer', 'Invoice');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE attendance_status AS ENUM ('Registered', 'Present', 'Absent', 'Partial');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE enrollment_status AS ENUM ('Enrolled', 'In Progress', 'Passed', 'Failed', 'Withdrawn');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE session_status AS ENUM ('Draft', 'Published', 'Full', 'Completed', 'Cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE certificate_status AS ENUM ('Draft', 'Issued', 'Revoked', 'Expired');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE question_type AS ENUM ('MCQ', 'True/False', 'Fill in Blank');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE assessment_type AS ENUM ('Theory', 'Practical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE assessment_status AS ENUM ('In Progress', 'Completed', 'Expired');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payout_status AS ENUM ('Pending', 'Processed', 'Paid');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE discount_type AS ENUM ('Percentage', 'Fixed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE provider_status AS ENUM ('Pending', 'Approved', 'Suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE affiliate_status AS ENUM ('Active', 'Suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Training Providers table
CREATE TABLE IF NOT EXISTS training_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name text NOT NULL,
  brand_name text NOT NULL,
  gstin text,
  pan text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  phone text NOT NULL,
  website text,
  certifications text[] DEFAULT '{}',
  payout_terms_days integer DEFAULT 30 CHECK (payout_terms_days > 0),
  payout_method text DEFAULT 'Bank Transfer' CHECK (payout_method IN ('Bank Transfer', 'UPI', 'Cheque')),
  bank_details text,
  upi_id text,
  status provider_status DEFAULT 'Pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid NOT NULL REFERENCES training_providers(id) ON DELETE CASCADE,
  course_code text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  level course_level DEFAULT 'Beginner',
  duration_hours integer NOT NULL CHECK (duration_hours > 0),
  theory_hours integer DEFAULT 0 CHECK (theory_hours >= 0),
  practical_hours integer DEFAULT 0 CHECK (practical_hours >= 0),
  max_participants integer DEFAULT 25 CHECK (max_participants > 0),
  prerequisites text[] DEFAULT '{}',
  learning_outcomes text[] DEFAULT '{}',
  certification_validity_months integer DEFAULT 36 CHECK (certification_validity_months > 0),
  price_per_seat decimal NOT NULL CHECK (price_per_seat >= 0),
  bulk_discount_tiers jsonb DEFAULT '[]',
  pass_mark_theory integer DEFAULT 70 CHECK (pass_mark_theory BETWEEN 0 AND 100),
  pass_mark_practical integer DEFAULT 70 CHECK (pass_mark_practical BETWEEN 0 AND 100),
  active boolean DEFAULT true,
  seo_keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Training Sessions table
CREATE TABLE IF NOT EXISTS training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES training_providers(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE, -- For private corporate sessions
  session_code text NOT NULL UNIQUE,
  mode training_mode DEFAULT 'Classroom',
  venue text,
  address text,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  timezone text DEFAULT 'Asia/Kolkata',
  max_seats integer NOT NULL CHECK (max_seats > 0),
  available_seats integer NOT NULL CHECK (available_seats >= 0),
  price_per_seat decimal NOT NULL CHECK (price_per_seat >= 0),
  early_bird_discount decimal DEFAULT 0 CHECK (early_bird_discount >= 0),
  early_bird_deadline date,
  status session_status DEFAULT 'Draft',
  meeting_link text,
  materials_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date),
  CONSTRAINT valid_times CHECK (end_time > start_time),
  CONSTRAINT valid_early_bird CHECK (early_bird_deadline IS NULL OR early_bird_deadline <= start_date)
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES training_sessions(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  trainee_name text NOT NULL,
  trainee_email text NOT NULL,
  trainee_phone text NOT NULL,
  employee_id text,
  department text,
  designation text,
  enrollment_type enrollment_type DEFAULT 'Individual',
  payment_status payment_status DEFAULT 'Pending',
  payment_method payment_method DEFAULT 'Card',
  amount_paid decimal DEFAULT 0 CHECK (amount_paid >= 0),
  discount_applied decimal DEFAULT 0 CHECK (discount_applied >= 0),
  coupon_code text,
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE SET NULL,
  attendance_status attendance_status DEFAULT 'Registered',
  theory_score decimal,
  practical_score decimal,
  overall_status enrollment_status DEFAULT 'Enrolled',
  enrolled_by uuid REFERENCES users(id) ON DELETE SET NULL,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT valid_scores CHECK (
    (theory_score IS NULL OR theory_score BETWEEN 0 AND 100) AND
    (practical_score IS NULL OR practical_score BETWEEN 0 AND 100)
  )
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type question_type DEFAULT 'MCQ',
  options jsonb, -- Array of options for MCQ
  correct_answer text NOT NULL,
  explanation text,
  difficulty text DEFAULT 'Medium' CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  topic text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  assessment_type assessment_type NOT NULL,
  questions_data jsonb, -- Selected questions and answers for theory
  rubric_data jsonb, -- Rubric scores for practical
  score decimal DEFAULT 0 CHECK (score >= 0),
  max_score decimal DEFAULT 100 CHECK (max_score > 0),
  pass_mark decimal DEFAULT 70 CHECK (pass_mark BETWEEN 0 AND 100),
  status assessment_status DEFAULT 'In Progress',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  graded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  graded_at timestamptz,
  notes text,
  CONSTRAINT valid_score_range CHECK (score <= max_score)
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  certificate_number text NOT NULL UNIQUE,
  trainee_name text NOT NULL,
  course_title text NOT NULL,
  provider_name text NOT NULL,
  issue_date date NOT NULL,
  expiry_date date NOT NULL,
  qr_code text NOT NULL,
  signature_hash text NOT NULL, -- SHA-256 of certificate payload
  status certificate_status DEFAULT 'Draft',
  pdf_url text,
  revoked_reason text,
  revoked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_certificate_dates CHECK (expiry_date > issue_date)
);

-- Affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  company text,
  pan text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  commission_saas_percent decimal DEFAULT 10 CHECK (commission_saas_percent BETWEEN 0 AND 100),
  commission_training_percent decimal DEFAULT 15 CHECK (commission_training_percent BETWEEN 0 AND 100),
  lead_bounty_amount decimal DEFAULT 500 CHECK (lead_bounty_amount >= 0),
  payout_method text DEFAULT 'Bank Transfer' CHECK (payout_method IN ('Bank Transfer', 'UPI', 'Cheque')),
  bank_details text,
  upi_id text,
  status affiliate_status DEFAULT 'Active',
  created_at timestamptz DEFAULT now()
);

-- Affiliate Links table
CREATE TABLE IF NOT EXISTS affiliate_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  link_code text NOT NULL UNIQUE,
  target_type text NOT NULL CHECK (target_type IN ('Course', 'Session', 'General')),
  target_id uuid, -- References courses.id or training_sessions.id
  utm_source text NOT NULL,
  utm_medium text NOT NULL,
  utm_campaign text NOT NULL,
  clicks integer DEFAULT 0,
  conversions integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Attribution Events table
CREATE TABLE IF NOT EXISTS attribution_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE SET NULL,
  session_id uuid REFERENCES training_sessions(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('view_course', 'rfq_submit', 'seat_purchased', 'exam_passed', 'cert_issued', 'verify_hit')),
  user_identifier text NOT NULL, -- Email or session ID
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  saas_commission decimal DEFAULT 0 CHECK (saas_commission >= 0),
  training_commission decimal DEFAULT 0 CHECK (training_commission >= 0),
  lead_bounties decimal DEFAULT 0 CHECK (lead_bounties >= 0),
  total_amount decimal GENERATED ALWAYS AS (saas_commission + training_commission + lead_bounties) STORED,
  status payout_status DEFAULT 'Pending',
  processed_at timestamptz,
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_payout_period CHECK (period_end > period_start)
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text NOT NULL,
  discount_type discount_type DEFAULT 'Percentage',
  discount_value decimal NOT NULL CHECK (discount_value > 0),
  min_order_value decimal DEFAULT 0 CHECK (min_order_value >= 0),
  max_discount decimal,
  usage_limit integer,
  used_count integer DEFAULT 0 CHECK (used_count >= 0),
  valid_from date NOT NULL,
  valid_until date NOT NULL,
  applicable_courses text[] DEFAULT '{}', -- Course codes
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_coupon_dates CHECK (valid_until >= valid_from),
  CONSTRAINT valid_usage CHECK (usage_limit IS NULL OR used_count <= usage_limit)
);

-- Functions

-- Function to update available seats when enrollment changes
CREATE OR REPLACE FUNCTION update_session_seats()
RETURNS trigger AS $$
BEGIN
  -- Update available seats count
  UPDATE training_sessions 
  SET available_seats = max_seats - (
    SELECT COUNT(*) 
    FROM enrollments 
    WHERE session_id = COALESCE(NEW.session_id, OLD.session_id)
    AND overall_status NOT IN ('Withdrawn', 'Failed')
  )
  WHERE id = COALESCE(NEW.session_id, OLD.session_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate certificate number
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS text AS $$
DECLARE
  cert_number text;
  year_suffix text;
BEGIN
  year_suffix := EXTRACT(YEAR FROM now())::text;
  
  SELECT 'SW-' || year_suffix || '-' || LPAD((COUNT(*) + 1)::text, 6, '0')
  INTO cert_number
  FROM certificates 
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM now());
  
  RETURN cert_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check certificate validity
CREATE OR REPLACE FUNCTION is_certificate_valid(cert_id uuid)
RETURNS boolean AS $$
DECLARE
  cert_record certificates%ROWTYPE;
BEGIN
  SELECT * INTO cert_record FROM certificates WHERE id = cert_id;
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  RETURN cert_record.status = 'Issued' 
    AND cert_record.expiry_date >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate affiliate commission
CREATE OR REPLACE FUNCTION calculate_affiliate_commission(
  affiliate_uuid uuid,
  period_start_date date,
  period_end_date date
)
RETURNS TABLE(
  saas_commission decimal,
  training_commission decimal,
  lead_bounties decimal
) AS $$
DECLARE
  affiliate_record affiliates%ROWTYPE;
  training_total decimal := 0;
  lead_total decimal := 0;
BEGIN
  SELECT * INTO affiliate_record FROM affiliates WHERE id = affiliate_uuid;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT 0::decimal, 0::decimal, 0::decimal;
    RETURN;
  END IF;
  
  -- Calculate training commission
  SELECT COALESCE(SUM(e.amount_paid * affiliate_record.commission_training_percent / 100), 0)
  INTO training_total
  FROM enrollments e
  JOIN training_sessions ts ON e.session_id = ts.id
  WHERE e.affiliate_id = affiliate_uuid
    AND e.payment_status = 'Paid'
    AND e.enrolled_at::date BETWEEN period_start_date AND period_end_date;
  
  -- Calculate lead bounties
  SELECT COALESCE(COUNT(*) * affiliate_record.lead_bounty_amount, 0)
  INTO lead_total
  FROM attribution_events ae
  WHERE ae.affiliate_id = affiliate_uuid
    AND ae.event_type = 'rfq_submit'
    AND ae.created_at::date BETWEEN period_start_date AND period_end_date;
  
  RETURN QUERY SELECT 0::decimal, training_total, lead_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers

-- Trigger to update session seats on enrollment changes
DROP TRIGGER IF EXISTS on_enrollment_change ON enrollments;
CREATE TRIGGER on_enrollment_change
  AFTER INSERT OR UPDATE OR DELETE ON enrollments
  FOR EACH ROW EXECUTE FUNCTION update_session_seats();

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_training_providers_updated_at ON training_providers;
CREATE TRIGGER update_training_providers_updated_at
  BEFORE UPDATE ON training_providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_training_sessions_updated_at ON training_sessions;
CREATE TRIGGER update_training_sessions_updated_at
  BEFORE UPDATE ON training_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_provider ON courses(provider_id);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(active);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_training_sessions_course ON training_sessions(course_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_provider ON training_sessions(provider_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_organization ON training_sessions(organization_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_status ON training_sessions(status);
CREATE INDEX IF NOT EXISTS idx_training_sessions_dates ON training_sessions(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_enrollments_session ON enrollments(session_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_organization ON enrollments(organization_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(overall_status);
CREATE INDEX IF NOT EXISTS idx_enrollments_affiliate ON enrollments(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_questions_course ON questions(course_id);
CREATE INDEX IF NOT EXISTS idx_questions_active ON questions(active);
CREATE INDEX IF NOT EXISTS idx_assessments_enrollment ON assessments(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_enrollment ON certificates(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);
CREATE INDEX IF NOT EXISTS idx_certificates_expiry ON certificates(expiry_date);
CREATE INDEX IF NOT EXISTS idx_affiliate_links_affiliate ON affiliate_links(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_links_code ON affiliate_links(link_code);
CREATE INDEX IF NOT EXISTS idx_attribution_events_affiliate ON attribution_events(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_attribution_events_session ON attribution_events(session_id);
CREATE INDEX IF NOT EXISTS idx_payouts_affiliate ON payouts(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(active);