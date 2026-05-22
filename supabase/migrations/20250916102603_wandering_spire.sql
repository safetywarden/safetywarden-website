/*
  # Training Module RLS Policies

  1. Helper Functions
  2. Provider & Course Policies
  3. Session & Enrollment Policies
  4. Assessment & Certificate Policies
  5. Affiliate & Payout Policies
*/

-- Enable RLS on all training tables
ALTER TABLE training_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE attribution_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is a provider
CREATE OR REPLACE FUNCTION is_provider(provider_uuid uuid, user_uuid uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM training_providers 
    WHERE id = provider_uuid 
    AND contact_email = (SELECT email FROM users WHERE id = user_uuid)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is an affiliate
CREATE OR REPLACE FUNCTION is_affiliate(affiliate_uuid uuid, user_uuid uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM affiliates 
    WHERE id = affiliate_uuid 
    AND email = (SELECT email FROM users WHERE id = user_uuid)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Training Providers policies
CREATE POLICY "Anyone can view approved providers" ON training_providers
  FOR SELECT TO authenticated, anon
  USING (status = 'Approved');

CREATE POLICY "Providers can update their own profile" ON training_providers
  FOR UPDATE TO authenticated
  USING (is_provider(id));

CREATE POLICY "Service role can manage all providers" ON training_providers
  FOR ALL TO service_role
  USING (true);

-- Courses policies
CREATE POLICY "Anyone can view active courses" ON courses
  FOR SELECT TO authenticated, anon
  USING (active = true);

CREATE POLICY "Providers can manage their courses" ON courses
  FOR ALL TO authenticated
  USING (is_provider(provider_id));

CREATE POLICY "Service role can manage all courses" ON courses
  FOR ALL TO service_role
  USING (true);

-- Training Sessions policies
CREATE POLICY "Anyone can view published sessions" ON training_sessions
  FOR SELECT TO authenticated, anon
  USING (status = 'Published' AND organization_id IS NULL);

CREATE POLICY "Organization members can view their private sessions" ON training_sessions
  FOR SELECT TO authenticated
  USING (
    organization_id IS NOT NULL AND 
    is_member(organization_id)
  );

CREATE POLICY "Providers can manage their sessions" ON training_sessions
  FOR ALL TO authenticated
  USING (is_provider(provider_id));

CREATE POLICY "OrgAdmins can create private sessions" ON training_sessions
  FOR INSERT TO authenticated
  WITH CHECK (
    organization_id IS NOT NULL AND 
    get_user_role(organization_id) = 'OrgAdmin'
  );

CREATE POLICY "Service role can manage all sessions" ON training_sessions
  FOR ALL TO service_role
  USING (true);

-- Enrollments policies
CREATE POLICY "Users can view enrollments in their organizations" ON enrollments
  FOR SELECT TO authenticated
  USING (
    organization_id IS NULL OR 
    is_member(organization_id) OR
    enrolled_by = auth.uid()
  );

CREATE POLICY "Users can create enrollments" ON enrollments
  FOR INSERT TO authenticated
  WITH CHECK (
    organization_id IS NULL OR 
    is_member(organization_id) OR
    enrolled_by = auth.uid()
  );

CREATE POLICY "Providers can view enrollments for their sessions" ON enrollments
  FOR SELECT TO authenticated
  USING (session_id IN (
    SELECT id FROM training_sessions 
    WHERE is_provider(provider_id)
  ));

CREATE POLICY "Providers can update enrollment status" ON enrollments
  FOR UPDATE TO authenticated
  USING (session_id IN (
    SELECT id FROM training_sessions 
    WHERE is_provider(provider_id)
  ));

CREATE POLICY "Service role can manage all enrollments" ON enrollments
  FOR ALL TO service_role
  USING (true);

-- Questions policies
CREATE POLICY "Providers can view questions for their courses" ON questions
  FOR SELECT TO authenticated
  USING (course_id IN (
    SELECT id FROM courses 
    WHERE is_provider(provider_id)
  ));

CREATE POLICY "Providers can manage questions for their courses" ON questions
  FOR ALL TO authenticated
  USING (course_id IN (
    SELECT id FROM courses 
    WHERE is_provider(provider_id)
  ));

CREATE POLICY "Service role can manage all questions" ON questions
  FOR ALL TO service_role
  USING (true);

-- Assessments policies
CREATE POLICY "Users can view their own assessments" ON assessments
  FOR SELECT TO authenticated
  USING (enrollment_id IN (
    SELECT id FROM enrollments 
    WHERE enrolled_by = auth.uid()
  ));

CREATE POLICY "Providers can view assessments for their sessions" ON assessments
  FOR SELECT TO authenticated
  USING (enrollment_id IN (
    SELECT e.id FROM enrollments e
    JOIN training_sessions ts ON e.session_id = ts.id
    WHERE is_provider(ts.provider_id)
  ));

CREATE POLICY "Providers can grade assessments" ON assessments
  FOR UPDATE TO authenticated
  USING (enrollment_id IN (
    SELECT e.id FROM enrollments e
    JOIN training_sessions ts ON e.session_id = ts.id
    WHERE is_provider(ts.provider_id)
  ));

CREATE POLICY "Service role can manage all assessments" ON assessments
  FOR ALL TO service_role
  USING (true);

-- Certificates policies (public verification view)
CREATE POLICY "Anyone can verify certificates" ON certificates
  FOR SELECT TO authenticated, anon
  USING (status = 'Issued');

CREATE POLICY "Users can view their own certificates" ON certificates
  FOR SELECT TO authenticated
  USING (enrollment_id IN (
    SELECT id FROM enrollments 
    WHERE enrolled_by = auth.uid()
  ));

CREATE POLICY "Providers can view certificates for their courses" ON certificates
  FOR SELECT TO authenticated
  USING (enrollment_id IN (
    SELECT e.id FROM enrollments e
    JOIN training_sessions ts ON e.session_id = ts.id
    WHERE is_provider(ts.provider_id)
  ));

CREATE POLICY "Service role can manage all certificates" ON certificates
  FOR ALL TO service_role
  USING (true);

-- Affiliates policies
CREATE POLICY "Affiliates can view their own profile" ON affiliates
  FOR SELECT TO authenticated
  USING (is_affiliate(id));

CREATE POLICY "Affiliates can update their own profile" ON affiliates
  FOR UPDATE TO authenticated
  USING (is_affiliate(id));

CREATE POLICY "Service role can manage all affiliates" ON affiliates
  FOR ALL TO service_role
  USING (true);

-- Affiliate Links policies
CREATE POLICY "Affiliates can manage their links" ON affiliate_links
  FOR ALL TO authenticated
  USING (is_affiliate(affiliate_id));

CREATE POLICY "Service role can manage all affiliate links" ON affiliate_links
  FOR ALL TO service_role
  USING (true);

-- Attribution Events policies
CREATE POLICY "Anyone can create attribution events" ON attribution_events
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Affiliates can view their attribution events" ON attribution_events
  FOR SELECT TO authenticated
  USING (is_affiliate(affiliate_id));

CREATE POLICY "Service role can manage all attribution events" ON attribution_events
  FOR ALL TO service_role
  USING (true);

-- Payouts policies
CREATE POLICY "Affiliates can view their payouts" ON payouts
  FOR SELECT TO authenticated
  USING (is_affiliate(affiliate_id));

CREATE POLICY "Service role can manage all payouts" ON payouts
  FOR ALL TO service_role
  USING (true);

-- Coupons policies
CREATE POLICY "Anyone can view active coupons" ON coupons
  FOR SELECT TO authenticated, anon
  USING (active = true AND valid_until >= CURRENT_DATE);

CREATE POLICY "Service role can manage all coupons" ON coupons
  FOR ALL TO service_role
  USING (true);

-- Create public view for certificate verification
CREATE OR REPLACE VIEW v_certificate_public AS
SELECT 
  c.certificate_number,
  c.trainee_name,
  c.course_title,
  c.provider_name,
  c.issue_date,
  c.expiry_date,
  c.status,
  c.qr_code,
  CASE 
    WHEN c.status = 'Issued' AND c.expiry_date >= CURRENT_DATE THEN true
    ELSE false
  END as is_valid
FROM certificates c
WHERE c.status = 'Issued';

-- Grant access to public view
GRANT SELECT ON v_certificate_public TO authenticated, anon;