import { Client, JobOrder, Candidate, Placement, Timesheet, Invoice, RateCard } from '../../types/manpower';

export const sampleClients: Client[] = [
  {
    id: 'client-1',
    org_name: 'TechCorp Manufacturing',
    industry: 'Manufacturing',
    gstin: '29ABCDE1234F1Z5',
    esi_code: 'ESI001',
    pf_code: 'PF001',
    billing_email: 'accounts@techcorp.com',
    payment_terms_days: 30,
    address: '123 Industrial Area, Phase 1',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'client-2',
    org_name: 'Metro Hospital Group',
    industry: 'Healthcare',
    gstin: '27FGHIJ5678K2L9',
    esi_code: 'ESI002',
    pf_code: 'PF002',
    billing_email: 'finance@metrohospital.com',
    payment_terms_days: 15,
    address: '456 Medical District',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'client-3',
    org_name: 'Global Logistics LLC',
    industry: 'Logistics',
    billing_email: 'hr@globallogistics.ae',
    payment_terms_days: 45,
    address: '789 Business Bay',
    city: 'Dubai',
    state: 'Dubai',
    pincode: '00000',
    country: 'UAE',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z'
  }
];

export const sampleJobOrders: JobOrder[] = [
  {
    id: 'job-1',
    client_id: 'client-1',
    role_title: 'Safety Officer',
    job_type: 'Temp',
    start_date: '2024-03-01',
    end_date: '2024-08-31',
    shift_type: 'Day Shift (8 AM - 5 PM)',
    vacancies: 3,
    location: 'Bengaluru, Karnataka',
    min_experience_years: 2,
    skills: ['Fire Safety', 'NEBOSH', 'Incident Investigation', 'Risk Assessment'],
    education: 'Diploma in Safety Engineering',
    languages: ['English', 'Hindi', 'Kannada'],
    pay_type: 'Monthly',
    pay_min: 25000,
    pay_max: 35000,
    bill_rate_min: 40000,
    bill_rate_max: 50000,
    ot_rate_per_hour: 200,
    pf_applicable: true,
    esi_applicable: true,
    compliance_docs_required: ['Police Verification', 'Medical Certificate', 'Safety Training Certificate'],
    background_check_required: true,
    status: 'Active',
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z'
  },
  {
    id: 'job-2',
    client_id: 'client-2',
    role_title: 'Fire Warden',
    job_type: 'Contract-to-Hire',
    start_date: '2024-03-15',
    shift_type: 'Rotating Shifts',
    vacancies: 5,
    location: 'Mumbai, Maharashtra',
    min_experience_years: 1,
    skills: ['Emergency Response', 'First Aid', 'Evacuation Procedures'],
    education: 'HSC or equivalent',
    languages: ['English', 'Hindi', 'Marathi'],
    pay_type: 'Monthly',
    pay_min: 18000,
    pay_max: 25000,
    bill_rate_min: 28000,
    bill_rate_max: 35000,
    ot_rate_per_hour: 150,
    pf_applicable: true,
    esi_applicable: true,
    compliance_docs_required: ['Medical Certificate', 'Fire Safety Training'],
    background_check_required: false,
    status: 'Active',
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z'
  },
  {
    id: 'job-3',
    client_id: 'client-3',
    role_title: 'HSE Supervisor',
    job_type: 'Permanent',
    start_date: '2024-04-01',
    shift_type: 'Day Shift (7 AM - 4 PM)',
    vacancies: 2,
    location: 'Dubai, UAE',
    min_experience_years: 5,
    skills: ['NEBOSH IGC', 'IOSH', 'Audit Management', 'Training Delivery'],
    education: 'Bachelor in Engineering',
    languages: ['English', 'Arabic'],
    pay_type: 'Monthly',
    pay_min: 8000,
    pay_max: 12000,
    bill_rate_min: 12000,
    bill_rate_max: 16000,
    pf_applicable: false,
    esi_applicable: false,
    compliance_docs_required: ['Emirates ID', 'Medical Certificate', 'NEBOSH Certificate'],
    background_check_required: true,
    status: 'Active',
    created_at: '2024-02-25T10:00:00Z',
    updated_at: '2024-02-25T10:00:00Z'
  }
];

export const sampleCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    full_name: 'Rajesh Kumar',
    phone: '+91-9876543210',
    email: 'rajesh.kumar@email.com',
    city: 'Bengaluru',
    dob: '1990-05-15',
    aadhaar_last4: '1234',
    pan_last4: '5678',
    uan: 'UAN123456789',
    esic_no: 'ESI987654321',
    skills: ['Fire Safety', 'NEBOSH', 'Risk Assessment', 'Emergency Response'],
    experience_years: 3,
    expected_pay_monthly: 30000,
    willing_shifts: ['Day Shift', 'Evening Shift'],
    preferred_locations: ['Bengaluru', 'Chennai'],
    documents_submitted: ['Resume', 'NEBOSH Certificate', 'Experience Letters'],
    bg_check_status: 'Cleared',
    training_completed: true,
    availability_date: '2024-03-01',
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z'
  },
  {
    id: 'candidate-2',
    full_name: 'Priya Sharma',
    phone: '+91-9123456789',
    email: 'priya.sharma@email.com',
    city: 'Mumbai',
    dob: '1992-08-22',
    aadhaar_last4: '9876',
    pan_last4: '4321',
    skills: ['First Aid', 'Emergency Response', 'Fire Warden Training'],
    experience_years: 2,
    expected_pay_monthly: 22000,
    willing_shifts: ['Day Shift', 'Night Shift', 'Rotating Shifts'],
    preferred_locations: ['Mumbai', 'Pune'],
    documents_submitted: ['Resume', 'First Aid Certificate', 'ID Proof'],
    bg_check_status: 'In Progress',
    training_completed: true,
    availability_date: '2024-03-10',
    created_at: '2024-02-12T10:00:00Z',
    updated_at: '2024-02-12T10:00:00Z'
  },
  {
    id: 'candidate-3',
    full_name: 'Ahmed Al-Rashid',
    phone: '+971-50-1234567',
    email: 'ahmed.alrashid@email.com',
    city: 'Dubai',
    dob: '1985-12-10',
    skills: ['NEBOSH IGC', 'IOSH', 'Audit Management', 'Training Delivery', 'ISO 45001'],
    experience_years: 8,
    expected_pay_monthly: 10000,
    willing_shifts: ['Day Shift'],
    preferred_locations: ['Dubai', 'Abu Dhabi'],
    documents_submitted: ['Resume', 'NEBOSH Certificate', 'IOSH Certificate', 'Emirates ID'],
    bg_check_status: 'Cleared',
    training_completed: true,
    availability_date: '2024-04-01',
    created_at: '2024-02-18T10:00:00Z',
    updated_at: '2024-02-18T10:00:00Z'
  }
];

export const samplePlacements: Placement[] = [
  {
    id: 'placement-1',
    job_order_id: 'job-1',
    candidate_id: 'candidate-1',
    client_site_id: 'site-1',
    start_date: '2024-03-01',
    assignment_type: 'Temp',
    worker_code: 'SW001',
    status: 'Active',
    created_at: '2024-02-28T10:00:00Z'
  },
  {
    id: 'placement-2',
    job_order_id: 'job-2',
    candidate_id: 'candidate-2',
    client_site_id: 'site-2',
    start_date: '2024-03-15',
    assignment_type: 'C2H',
    worker_code: 'SW002',
    status: 'Active',
    created_at: '2024-03-14T10:00:00Z'
  }
];

export const sampleTimesheets: Timesheet[] = [
  {
    id: 'timesheet-1',
    placement_id: 'placement-1',
    week_start_date: '2024-03-04',
    mon_hrs: 8,
    tue_hrs: 8,
    wed_hrs: 8,
    thu_hrs: 8,
    fri_hrs: 8,
    sat_hrs: 0,
    sun_hrs: 0,
    ot_hrs: 2,
    total_regular_hrs: 40,
    total_payable_hrs: 42,
    approver_name: 'Manager Name',
    approver_email: 'manager@techcorp.com',
    status: 'Approved',
    created_at: '2024-03-08T10:00:00Z',
    updated_at: '2024-03-09T10:00:00Z'
  },
  {
    id: 'timesheet-2',
    placement_id: 'placement-2',
    week_start_date: '2024-03-18',
    mon_hrs: 8,
    tue_hrs: 8,
    wed_hrs: 8,
    thu_hrs: 8,
    fri_hrs: 8,
    sat_hrs: 4,
    sun_hrs: 0,
    ot_hrs: 4,
    total_regular_hrs: 44,
    total_payable_hrs: 48,
    status: 'Submitted',
    created_at: '2024-03-22T10:00:00Z',
    updated_at: '2024-03-22T10:00:00Z'
  }
];

export const sampleInvoices: Invoice[] = [
  {
    id: 'invoice-1',
    client_id: 'client-1',
    period_start: '2024-03-01',
    period_end: '2024-03-31',
    amount: 45000,
    tax: 8100,
    status: 'Sent',
    due_on: '2024-04-30',
    created_at: '2024-04-01T10:00:00Z'
  },
  {
    id: 'invoice-2',
    client_id: 'client-2',
    period_start: '2024-03-15',
    period_end: '2024-04-14',
    amount: 32000,
    tax: 5760,
    status: 'Draft',
    due_on: '2024-04-29',
    created_at: '2024-04-15T10:00:00Z'
  }
];

export const sampleRateCards: RateCard[] = [
  {
    id: 'rate-1',
    client_id: 'client-1',
    role_title: 'Safety Officer',
    pay_unit: 'Month',
    pay_rate: 30000,
    employer_cost_pct: 0.15,
    overhead_pct: 0.10,
    margin_pct: 0.20,
    bill_rate_out: 43500
  },
  {
    id: 'rate-2',
    client_id: 'client-2',
    role_title: 'Fire Warden',
    pay_unit: 'Month',
    pay_rate: 22000,
    employer_cost_pct: 0.15,
    overhead_pct: 0.10,
    margin_pct: 0.18,
    bill_rate_out: 31460
  },
  {
    id: 'rate-3',
    client_id: 'client-3',
    role_title: 'HSE Supervisor',
    pay_unit: 'Month',
    pay_rate: 10000,
    employer_cost_pct: 0.08,
    overhead_pct: 0.12,
    margin_pct: 0.25,
    bill_rate_out: 14500
  }
];

// Helper functions
export const getClientById = (id: string): Client | undefined => {
  return sampleClients.find(client => client.id === id);
};

export const getJobOrdersByClient = (clientId: string): JobOrder[] => {
  return sampleJobOrders.filter(job => job.client_id === clientId);
};

export const getCandidateById = (id: string): Candidate | undefined => {
  return sampleCandidates.find(candidate => candidate.id === id);
};

export const getPlacementsByClient = (clientId: string): Placement[] => {
  return samplePlacements.filter(placement => {
    const jobOrder = sampleJobOrders.find(job => job.id === placement.job_order_id);
    return jobOrder?.client_id === clientId;
  });
};

export const getTimesheetsByPlacement = (placementId: string): Timesheet[] => {
  return sampleTimesheets.filter(timesheet => timesheet.placement_id === placementId);
};

export const getInvoicesByClient = (clientId: string): Invoice[] => {
  return sampleInvoices.filter(invoice => invoice.client_id === clientId);
};

export const getRateCardsByClient = (clientId: string): RateCard[] => {
  return sampleRateCards.filter(rate => rate.client_id === clientId);
};