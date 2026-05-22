// Audit & Compliance Types

export interface Organization {
  id: string;
  name: string;
  billing_email: string;
  city: string;
  country: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'OrgAdmin' | 'Auditor' | 'Warden' | 'Viewer';
  created_at: string;
  user?: User;
}

export interface Site {
  id: string;
  organization_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  building_type: string;
  floors: number;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface Audit {
  id: string;
  organization_id: string;
  site_id: string;
  scheduled_at: string;
  started_at?: string;
  completed_at?: string;
  status: 'Scheduled' | 'In-Progress' | 'Completed';
  auditor_id: string;
  overall_risk: number;
  pass_fail: 'Pass' | 'Conditional Pass' | 'Fail';
  notes?: string;
  site?: Site;
  auditor?: User;
}

export interface ChecklistItem {
  id: string;
  organization_id?: string;
  category: string;
  subcategory: string;
  item_code: string;
  control_statement: string;
  code_ref: string;
  requirement_type: 'Must-have' | 'Should-have';
  check_type: 'YesNo' | 'Numeric' | 'Text';
  default_severity: number;
  default_likelihood: number;
  active: boolean;
}

export interface AuditResponse {
  id: string;
  audit_id: string;
  checklist_item_id: string;
  response_value?: string | number;
  severity: number;
  likelihood: number;
  risk_score: number;
  finding_notes?: string;
  created_by: string;
  created_at: string;
  checklist_item?: ChecklistItem;
}

export interface Action {
  id: string;
  audit_id: string;
  checklist_item_id: string;
  title: string;
  owner_name: string;
  owner_email: string;
  due_date: string;
  status: 'Open' | 'Closed' | 'NA';
  closed_at?: string;
  closure_notes?: string;
  checklist_item?: ChecklistItem;
  audit?: Audit;
}

export interface Media {
  id: string;
  audit_id: string;
  checklist_item_id: string;
  url: string;
  thumbnail_url?: string;
  caption?: string;
  exif_time?: string;
  uploaded_by: string;
  created_at: string;
}

export interface Settings {
  organization_id: string;
  whatsapp_webhook_url?: string;
  email_from: string;
  data_residency: 'India' | 'GCC';
  nightly_backup: boolean;
}

export interface DashboardStats {
  upcoming_audits: number;
  open_actions: number;
  sites_at_risk: number;
  avg_risk_score: number;
}

export interface RiskTrend {
  audit_date: string;
  risk_score: number;
  site_name: string;
}

export interface AuditFormData {
  site_id: string;
  scheduled_at: string;
  auditor_id: string;
  notes?: string;
}

export interface ActionFormData {
  title: string;
  owner_name: string;
  owner_email: string;
  due_date: string;
  status: 'Open' | 'Closed' | 'NA';
  closure_notes?: string;
}