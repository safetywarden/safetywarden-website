import { supabase } from './supabase';
import { Course, TrainingSession, Enrollment, Certificate } from '../types/training';

// Course management
export const getCourses = async (filters?: {
  category?: string;
  level?: string;
  active?: boolean;
}) => {
  let query = supabase
    .from('courses')
    .select(`
      *,
      provider:training_providers(*)
    `)
    .order('title');

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.level) {
    query = query.eq('level', filters.level);
  }
  if (filters?.active !== undefined) {
    query = query.eq('active', filters.active);
  }

  return query;
};

export const getCourseByCode = async (courseCode: string) => {
  return supabase
    .from('courses')
    .select(`
      *,
      provider:training_providers(*)
    `)
    .eq('course_code', courseCode)
    .eq('active', true)
    .single();
};

// Session management
export const getUpcomingSessions = async (filters?: {
  courseId?: string;
  city?: string;
  mode?: string;
  organizationId?: string;
}) => {
  let query = supabase
    .from('training_sessions')
    .select(`
      *,
      course:courses(*),
      provider:training_providers(*)
    `)
    .eq('status', 'Published')
    .gte('start_date', new Date().toISOString().split('T')[0])
    .order('start_date');

  if (filters?.courseId) {
    query = query.eq('course_id', filters.courseId);
  }
  if (filters?.city) {
    query = query.eq('city', filters.city);
  }
  if (filters?.mode) {
    query = query.eq('mode', filters.mode);
  }
  if (filters?.organizationId) {
    query = query.eq('organization_id', filters.organizationId);
  }

  return query;
};

export const getSessionByCode = async (sessionCode: string) => {
  return supabase
    .from('training_sessions')
    .select(`
      *,
      course:courses(*),
      provider:training_providers(*)
    `)
    .eq('session_code', sessionCode)
    .single();
};

// Enrollment management
export const createEnrollment = async (enrollmentData: Partial<Enrollment>) => {
  return supabase
    .from('enrollments')
    .insert([enrollmentData])
    .select()
    .single();
};

export const getEnrollmentsBySession = async (sessionId: string) => {
  return supabase
    .from('enrollments')
    .select(`
      *,
      session:training_sessions(
        *,
        course:courses(*)
      )
    `)
    .eq('session_id', sessionId)
    .order('enrolled_at');
};

export const getEnrollmentsByOrganization = async (organizationId: string) => {
  return supabase
    .from('enrollments')
    .select(`
      *,
      session:training_sessions(
        *,
        course:courses(*)
      )
    `)
    .eq('organization_id', organizationId)
    .order('enrolled_at', { ascending: false });
};

// Certificate management
export const verifyCertificate = async (certificateNumber: string) => {
  return supabase
    .from('v_certificate_public')
    .select('*')
    .eq('certificate_number', certificateNumber)
    .single();
};

export const getCertificatesByEnrollment = async (enrollmentId: string) => {
  return supabase
    .from('certificates')
    .select('*')
    .eq('enrollment_id', enrollmentId)
    .order('created_at', { ascending: false });
};

// Assessment management
export const getQuestionsByCourse = async (courseId: string, limit?: number) => {
  let query = supabase
    .from('questions')
    .select('*')
    .eq('course_id', courseId)
    .eq('active', true);

  if (limit) {
    query = query.limit(limit);
  }

  return query;
};

export const createAssessment = async (assessmentData: {
  enrollment_id: string;
  assessment_type: 'Theory' | 'Practical';
  questions_data?: any;
  rubric_data?: any;
  max_score: number;
  pass_mark: number;
}) => {
  return supabase
    .from('assessments')
    .insert([assessmentData])
    .select()
    .single();
};

// Affiliate tracking
export const trackAffiliate = async (eventData: {
  affiliate_id?: string;
  session_id: string;
  event_type: string;
  user_identifier: string;
  metadata?: any;
}) => {
  return supabase
    .from('attribution_events')
    .insert([eventData]);
};

// Coupon management
export const validateCoupon = async (couponCode: string, courseCode?: string) => {
  let query = supabase
    .from('coupons')
    .select('*')
    .eq('code', couponCode)
    .eq('active', true)
    .lte('valid_from', new Date().toISOString().split('T')[0])
    .gte('valid_until', new Date().toISOString().split('T')[0]);

  const { data: coupon } = await query.single();

  if (!coupon) {
    return { valid: false, error: 'Invalid or expired coupon' };
  }

  // Check usage limit
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, error: 'Coupon usage limit exceeded' };
  }

  // Check course applicability
  if (courseCode && coupon.applicable_courses.length > 0 && !coupon.applicable_courses.includes(courseCode)) {
    return { valid: false, error: 'Coupon not applicable to this course' };
  }

  return { valid: true, coupon };
};

// Bulk operations
export const bulkCreateEnrollments = async (enrollments: Partial<Enrollment>[]) => {
  return supabase
    .from('enrollments')
    .insert(enrollments)
    .select();
};

// Statistics
export const getTrainingStats = async (organizationId?: string) => {
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .eq(organizationId ? 'organization_id' : 'id', organizationId || 'dummy');

  const { data: sessions } = await supabase
    .from('training_sessions')
    .select('*')
    .eq('status', 'Published')
    .gte('start_date', new Date().toISOString().split('T')[0]);

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('status', 'Issued');

  return {
    total_enrollments: enrollments?.length || 0,
    active_sessions: sessions?.length || 0,
    certificates_issued: certificates?.length || 0,
    revenue_this_month: enrollments?.reduce((sum, e) => sum + (e.amount_paid || 0), 0) || 0
  };
};