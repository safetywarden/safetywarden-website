import { Course, TrainingSession, Enrollment, Certificate } from '../../types/training';

export const sampleCourses: Course[] = [
  {
    id: 'course-1',
    provider_id: 'provider-1',
    course_code: 'FW-BASIC-001',
    title: 'Fire Warden Training - Basic Level',
    description: 'Comprehensive fire warden training covering emergency procedures, evacuation protocols, and fire safety equipment usage.',
    category: 'Fire Safety',
    level: 'Beginner',
    duration_hours: 8,
    theory_hours: 6,
    practical_hours: 2,
    max_participants: 25,
    prerequisites: ['Basic safety awareness'],
    learning_outcomes: [
      'Understand fire triangle and classes',
      'Operate fire extinguishers safely',
      'Lead evacuation procedures',
      'Conduct fire drills',
      'Maintain fire safety equipment'
    ],
    certification_validity_months: 36,
    price_per_seat: 2500,
    bulk_discount_tiers: [
      { min_seats: 10, discount_percent: 10 },
      { min_seats: 25, discount_percent: 15 },
      { min_seats: 50, discount_percent: 20 }
    ],
    pass_mark_theory: 70,
    pass_mark_practical: 80,
    active: true,
    seo_keywords: ['fire warden training', 'fire safety', 'evacuation procedures'],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'course-2',
    provider_id: 'provider-1',
    course_code: 'NEBOSH-IGC-001',
    title: 'NEBOSH International General Certificate',
    description: 'Internationally recognized health and safety qualification covering risk assessment and safety management.',
    category: 'Health & Safety',
    level: 'Intermediate',
    duration_hours: 120,
    theory_hours: 100,
    practical_hours: 20,
    max_participants: 20,
    prerequisites: ['Basic education (12th pass)', 'Work experience preferred'],
    learning_outcomes: [
      'Conduct risk assessments',
      'Implement safety management systems',
      'Investigate incidents',
      'Develop safety policies',
      'Lead safety teams'
    ],
    certification_validity_months: 60,
    price_per_seat: 45000,
    bulk_discount_tiers: [
      { min_seats: 5, discount_percent: 8 },
      { min_seats: 10, discount_percent: 12 },
      { min_seats: 20, discount_percent: 18 }
    ],
    pass_mark_theory: 75,
    pass_mark_practical: 75,
    active: true,
    seo_keywords: ['NEBOSH', 'health safety certificate', 'risk assessment'],
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  }
];

export const sampleSessions: TrainingSession[] = [
  {
    id: 'session-1',
    course_id: 'course-1',
    provider_id: 'provider-1',
    session_code: 'FW-BLR-2024-001',
    mode: 'Classroom',
    venue: 'SafetyFirst Training Center',
    address: '123 Training Complex, Sector 5',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    start_date: '2024-03-15',
    end_date: '2024-03-15',
    start_time: '09:00',
    end_time: '17:00',
    timezone: 'Asia/Kolkata',
    max_seats: 25,
    available_seats: 18,
    price_per_seat: 2500,
    status: 'Published',
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z'
  },
  {
    id: 'session-2',
    course_id: 'course-2',
    provider_id: 'provider-1',
    session_code: 'NEB-BLR-2024-001',
    mode: 'Hybrid',
    venue: 'SafetyFirst Training Center',
    address: '123 Training Complex, Sector 5',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    start_date: '2024-04-01',
    end_date: '2024-04-15',
    start_time: '09:00',
    end_time: '17:00',
    timezone: 'Asia/Kolkata',
    max_seats: 20,
    available_seats: 12,
    price_per_seat: 45000,
    early_bird_discount: 5000,
    early_bird_deadline: '2024-03-20',
    status: 'Published',
    meeting_link: 'https://meet.safetywarden.com/nebosh-blr-001',
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z'
  }
];

export const sampleEnrollments: Enrollment[] = [
  {
    id: 'enrollment-1',
    session_id: 'session-1',
    trainee_name: 'Rajesh Kumar',
    trainee_email: 'rajesh.kumar@techcorp.com',
    trainee_phone: '+91-9876543210',
    employee_id: 'EMP001',
    department: 'Operations',
    designation: 'Safety Coordinator',
    enrollment_type: 'Corporate',
    payment_status: 'Paid',
    payment_method: 'Invoice',
    amount_paid: 2500,
    discount_applied: 0,
    attendance_status: 'Present',
    theory_score: 85,
    practical_score: 90,
    overall_status: 'Passed',
    enrolled_by: 'user-1',
    enrolled_at: '2024-02-20T10:00:00Z',
    completed_at: '2024-03-15T17:00:00Z'
  }
];

export const sampleCertificates: Certificate[] = [
  {
    id: 'cert-1',
    enrollment_id: 'enrollment-1',
    certificate_number: 'SW-2024-000001',
    trainee_name: 'Rajesh Kumar',
    course_title: 'Fire Warden Training - Basic Level',
    provider_name: 'SafetyFirst Academy',
    issue_date: '2024-03-16',
    expiry_date: '2027-03-16',
    qr_code: 'https://safetywarden.com/training/verify/SW-2024-000001',
    signature_hash: 'a1b2c3d4e5f6789012345678901234567890abcdef',
    status: 'Issued',
    pdf_url: 'https://certificates.safetywarden.com/SW-2024-000001.pdf',
    created_at: '2024-03-16T10:00:00Z'
  }
];