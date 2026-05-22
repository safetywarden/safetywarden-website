// Manpower Types
export interface Client {
  id: string;
  org_name: string;
  industry: string;
  gstin?: string;
  esi_code?: string;
  pf_code?: string;
  billing_email: string;
  payment_terms_days: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface ClientSite {
  id: string;
  client_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  created_at: string;
}

export interface Contact {
  id: string;
  client_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface JobOrder {
  id: string;
  client_id: string;
  role_title: string;
  job_type: 'Temp' | 'Contract-to-Hire' | 'Permanent';
  start_date: string;
  end_date?: string;
  shift_type: string;
  vacancies: number;
  location: string;
  min_experience_years: number;
  skills: string[];
  education: string;
  languages: string[];
  pay_type: 'Hourly' | 'Monthly';
  pay_min: number;
  pay_max: number;
  bill_rate_min: number;
  bill_rate_max: number;
  ot_rate_per_hour?: number;
  pf_applicable: boolean;
  esi_applicable: boolean;
  compliance_docs_required: string[];
  background_check_required: boolean;
  status: 'Lead' | 'Active' | 'On Hold' | 'Filled' | 'Cancelled';
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  dob: string;
  aadhaar_last4?: string;
  pan_last4?: string;
  uan?: string;
  esic_no?: string;
  skills: string[];
  experience_years: number;
  expected_pay_monthly: number;
  willing_shifts: string[];
  preferred_locations: string[];
  documents_submitted: string[];
  bg_check_status: 'Pending' | 'In Progress' | 'Cleared' | 'Failed';
  training_completed: boolean;
  availability_date: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_order_id: string;
  candidate_id: string;
  stage: 'New' | 'Screen' | 'Interview' | 'Offered' | 'Joined' | 'Rejected';
  scores: {
    tech: number;
    comms: number;
  };
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Screening {
  id: string;
  candidate_id: string;
  type: 'KYC' | 'Police' | 'Medical' | 'Reference' | 'DrugTest';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  report_url?: string;
  expires_on?: string;
  created_at: string;
}

export interface Placement {
  id: string;
  job_order_id: string;
  candidate_id: string;
  client_site_id: string;
  start_date: string;
  end_date?: string;
  assignment_type: 'Temp' | 'C2H';
  worker_code: string;
  status: 'Active' | 'Completed' | 'Terminated';
  created_at: string;
}

export interface RateCard {
  id: string;
  client_id: string;
  role_title: string;
  pay_unit: 'Hour' | 'Month';
  pay_rate: number;
  employer_cost_pct: number;
  overhead_pct: number;
  margin_pct: number;
  bill_rate_out: number;
}

export interface Shift {
  id: string;
  client_site_id: string;
  role_title: string;
  start_time: string;
  end_time: string;
  breaks_min: number;
  recurring_rule?: string;
}

export interface Timesheet {
  id: string;
  placement_id: string;
  week_start_date: string;
  mon_hrs: number;
  tue_hrs: number;
  wed_hrs: number;
  thu_hrs: number;
  fri_hrs: number;
  sat_hrs: number;
  sun_hrs: number;
  ot_hrs: number;
  total_regular_hrs: number;
  total_payable_hrs: number;
  approver_name?: string;
  approver_email?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  created_at: string;
  updated_at: string;
}

export interface PayrollRun {
  id: string;
  period_start: string;
  period_end: string;
  status: 'Open' | 'Processing' | 'Completed';
  processed_by?: string;
  notes?: string;
  created_at: string;
}

export interface Payslip {
  id: string;
  placement_id: string;
  payroll_run_id: string;
  gross: number;
  deductions_pf: number;
  deductions_esi: number;
  deductions_tax: number;
  net: number;
  pdf_url?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  period_start: string;
  period_end: string;
  amount: number;
  tax: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  pdf_url?: string;
  due_on: string;
  created_at: string;
}

export interface Document {
  id: string;
  owner_type: 'Candidate' | 'Client' | 'Vendor';
  owner_id: string;
  doc_type: string;
  file_url: string;
  uploaded_at: string;
  expires_on?: string;
}

export interface AuditTrail {
  id: string;
  actor_id: string;
  action: string;
  entity: string;
  entity_id: string;
  at: string;
}

// Form Types
export interface HireNowForm {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  role_title: string;
  job_type: 'Temp' | 'Contract-to-Hire' | 'Permanent';
  vacancies: number;
  location: string;
  start_date: string;
  duration?: string;
  skills: string[];
  experience_required: string;
  budget_range: string;
  additional_requirements?: string;
  consent: boolean;
}

export interface TimesheetEntry {
  date: string;
  hours: number;
  overtime: number;
  break_time: number;
  notes?: string;
}

// Dashboard Stats
export interface ManpowerStats {
  active_placements: number;
  pending_timesheets: number;
  pending_invoices: number;
  monthly_revenue: number;
  fill_rate: number;
  avg_time_to_fill: number;
  worker_retention: number;
  client_satisfaction: number;
}