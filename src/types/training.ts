// Training & Certification Types

export interface TrainingProvider {
  id: string;
  legal_name: string;
  brand_name: string;
  gstin?: string;
  pan?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact_name: string;
  contact_email: string;
  phone: string;
  website?: string;
  certifications: string[];
  payout_terms_days: number;
  payout_method: 'Bank Transfer' | 'UPI' | 'Cheque';
  bank_details?: string;
  upi_id?: string;
  status: 'Pending' | 'Approved' | 'Suspended';
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  provider_id: string;
  course_code: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration_hours: number;
  theory_hours: number;
  practical_hours: number;
  max_participants: number;
  prerequisites: string[];
  learning_outcomes: string[];
  certification_validity_months: number;
  price_per_seat: number;
  bulk_discount_tiers: BulkDiscountTier[];
  pass_mark_theory: number;
  pass_mark_practical: number;
  active: boolean;
  seo_keywords: string[];
  created_at: string;
  updated_at: string;
  provider?: TrainingProvider;
}

export interface BulkDiscountTier {
  min_seats: number;
  discount_percent: number;
}

export interface TrainingSession {
  id: string;
  course_id: string;
  provider_id: string;
  organization_id?: string; // For private corporate sessions
  session_code: string;
  mode: 'Online' | 'Classroom' | 'Hybrid';
  venue?: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  timezone: string;
  max_seats: number;
  available_seats: number;
  price_per_seat: number;
  early_bird_discount?: number;
  early_bird_deadline?: string;
  status: 'Draft' | 'Published' | 'Full' | 'Completed' | 'Cancelled';
  meeting_link?: string;
  materials_link?: string;
  created_at: string;
  updated_at: string;
  course?: Course;
  provider?: TrainingProvider;
}

export interface Enrollment {
  id: string;
  session_id: string;
  organization_id?: string;
  trainee_name: string;
  trainee_email: string;
  trainee_phone: string;
  employee_id?: string;
  department?: string;
  designation?: string;
  enrollment_type: 'Individual' | 'Corporate';
  payment_status: 'Pending' | 'Paid' | 'Refunded';
  payment_method: 'Card' | 'UPI' | 'Bank Transfer' | 'Invoice';
  amount_paid: number;
  discount_applied: number;
  coupon_code?: string;
  affiliate_id?: string;
  attendance_status: 'Registered' | 'Present' | 'Absent' | 'Partial';
  theory_score?: number;
  practical_score?: number;
  overall_status: 'Enrolled' | 'In Progress' | 'Passed' | 'Failed' | 'Withdrawn';
  enrolled_by: string;
  enrolled_at: string;
  completed_at?: string;
  session?: TrainingSession;
}

export interface Question {
  id: string;
  course_id: string;
  question_text: string;
  question_type: 'MCQ' | 'True/False' | 'Fill in Blank';
  options?: string[];
  correct_answer: string;
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  active: boolean;
  created_at: string;
}

export interface Assessment {
  id: string;
  enrollment_id: string;
  assessment_type: 'Theory' | 'Practical';
  questions_data?: any; // JSON of selected questions
  rubric_data?: any; // JSON rubric for practical
  score: number;
  max_score: number;
  pass_mark: number;
  status: 'In Progress' | 'Completed' | 'Expired';
  started_at: string;
  completed_at?: string;
  graded_by?: string;
  graded_at?: string;
  notes?: string;
}

export interface Certificate {
  id: string;
  enrollment_id: string;
  certificate_number: string;
  trainee_name: string;
  course_title: string;
  provider_name: string;
  issue_date: string;
  expiry_date: string;
  qr_code: string;
  signature_hash: string;
  status: 'Draft' | 'Issued' | 'Revoked' | 'Expired';
  pdf_url?: string;
  revoked_reason?: string;
  revoked_at?: string;
  created_at: string;
  enrollment?: Enrollment;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  pan?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  commission_saas_percent: number;
  commission_training_percent: number;
  lead_bounty_amount: number;
  payout_method: 'Bank Transfer' | 'UPI' | 'Cheque';
  bank_details?: string;
  upi_id?: string;
  status: 'Active' | 'Suspended';
  created_at: string;
}

export interface AffiliateLink {
  id: string;
  affiliate_id: string;
  link_code: string;
  target_type: 'Course' | 'Session' | 'General';
  target_id?: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  clicks: number;
  conversions: number;
  active: boolean;
  created_at: string;
}

export interface AttributionEvent {
  id: string;
  affiliate_id?: string;
  session_id: string;
  event_type: 'view_course' | 'rfq_submit' | 'seat_purchased' | 'exam_passed' | 'cert_issued' | 'verify_hit';
  user_identifier: string;
  metadata?: any;
  created_at: string;
}

export interface Payout {
  id: string;
  affiliate_id: string;
  period_start: string;
  period_end: string;
  saas_commission: number;
  training_commission: number;
  lead_bounties: number;
  total_amount: number;
  status: 'Pending' | 'Processed' | 'Paid';
  processed_at?: string;
  payment_reference?: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'Percentage' | 'Fixed';
  discount_value: number;
  min_order_value?: number;
  max_discount?: number;
  usage_limit?: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  applicable_courses: string[];
  active: boolean;
  created_at: string;
}

// Form Types
export interface EnrollmentForm {
  session_id: string;
  enrollment_type: 'Individual' | 'Corporate';
  trainees: TraineeInfo[];
  payment_method: 'Card' | 'UPI' | 'Bank Transfer' | 'Invoice';
  coupon_code?: string;
  organization_details?: {
    name: string;
    gstin?: string;
    billing_address: string;
    contact_person: string;
    contact_email: string;
    contact_phone: string;
  };
}

export interface TraineeInfo {
  name: string;
  email: string;
  phone: string;
  employee_id?: string;
  department?: string;
  designation?: string;
}

export interface CourseForm {
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration_hours: number;
  theory_hours: number;
  practical_hours: number;
  max_participants: number;
  prerequisites: string[];
  learning_outcomes: string[];
  certification_validity_months: number;
  price_per_seat: number;
  bulk_discount_tiers: BulkDiscountTier[];
  pass_mark_theory: number;
  pass_mark_practical: number;
  seo_keywords: string[];
}

export interface SessionForm {
  course_id: string;
  mode: 'Online' | 'Classroom' | 'Hybrid';
  venue?: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  max_seats: number;
  price_per_seat: number;
  early_bird_discount?: number;
  early_bird_deadline?: string;
  meeting_link?: string;
  materials_link?: string;
}

// Dashboard Stats
export interface TrainingStats {
  total_enrollments: number;
  active_sessions: number;
  certificates_issued: number;
  revenue_this_month: number;
  pass_rate: number;
  avg_rating: number;
  pending_assessments: number;
  expiring_certificates: number;
}

export interface ProviderStats {
  sessions_conducted: number;
  total_trainees: number;
  avg_rating: number;
  revenue_earned: number;
  pending_payouts: number;
  completion_rate: number;
}

export interface AffiliateStats {
  total_clicks: number;
  conversions: number;
  conversion_rate: number;
  commissions_earned: number;
  pending_payouts: number;
  top_performing_links: AffiliateLink[];
}

// Public API Types
export interface PublicCourse {
  course_code: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  price_per_seat: number;
  provider_name: string;
  upcoming_sessions: PublicSession[];
}

export interface PublicSession {
  session_code: string;
  mode: string;
  city: string;
  start_date: string;
  end_date: string;
  available_seats: number;
  price_per_seat: number;
}

export interface CertificateVerification {
  certificate_number: string;
  trainee_name: string;
  course_title: string;
  provider_name: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  is_valid: boolean;
}