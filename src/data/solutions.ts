import { Solution } from '../types';

export const solutions: Solution[] = [
  {
    id: 'digital-audit',
    title: 'Digital Safety Audit & Compliance Platform',
    description: 'Comprehensive health & safety audit platform for schools, colleges, and educational institutions. Self-assessment against NFPA/IBC/NBC codes with specialized education sector compliance modules.',
    features: [
      'Education-specific safety compliance checks (NFPA/NBC/State Fire Service)',
      'School & college campus safety assessments',
      'Student accommodation and hostel safety audits',
      'Laboratory and workshop safety compliance',
      'Sports facility and playground safety checks',
      'Photo evidence capture and geo-tagging',
      'Automated risk scoring and gap analysis',
      'Education board compliant safety reports (PDF/Excel)',
      'Parent and authority notification systems',
      'Renewal reminders and deadline tracking',
      'Multi-campus management dashboard',
      'Age-appropriate safety protocols and templates',
      'Real-time compliance scoring'
    ],
    cta: {
      primary: 'Start Campus Safety Audit',
      secondary: 'Talk to an Expert'
    },
    icon: 'ClipboardCheck'
  },
  {
    id: 'warden-training',
    title: 'Safety Warden Training & Certification Hub',
    description: 'Micro-modules (video + quiz), printable e-certificates, bulk onboarding for enterprises, LMS/HRIS CSV import.',
    features: [
      'Interactive video modules with quizzes',
      'Printable e-certificates upon completion',
      'Bulk enterprise onboarding capabilities',
      'LMS/HRIS CSV import integration',
      'Progress tracking and analytics dashboard',
      'Mobile-friendly training platform',
      'Multi-language support (English/Hindi/Arabic)',
      'Custom branding options'
    ],
    pricing: '₹500–₹2,000 per trainee (volume discounts available)',
    cta: {
      primary: 'Enroll Team',
      secondary: 'Download Syllabus'
    },
    icon: 'GraduationCap'
  },
  {
    id: 'drill-management',
    title: 'Real-Time Emergency Drill Management App',
    description: 'Plan/schedule drills, mobile roll-call, live headcount, post-drill analytics, statutory documentation.',
    features: [
      'Drill planning and scheduling tools',
      'Mobile roll-call and headcount tracking',
      'Real-time drill monitoring dashboard',
      'Post-drill analytics and reporting',
      'Statutory documentation generation',
      'Emergency contact integration',
      'Evacuation route mapping',
      'Performance benchmarking'
    ],
    cta: {
      primary: 'See a 3-min Demo',
      secondary: 'Book a Pilot'
    },
    icon: 'Siren'
  },
  {
    id: 'marketplace',
    title: 'Marketplace for Safety Services & Equipment',
    description: 'Vetted vendors for extinguishers, alarms, signage, training. RFP templates, lead routing, vendor ratings.',
    features: [
      'Vetted vendor network across India & GCC',
      'Equipment sourcing (extinguishers, alarms, signage)',
      'RFP templates and management system',
      'Automated lead routing to vendors',
      'Vendor ratings and reviews system',
      'Price comparison tools',
      'Service booking and scheduling',
      'Quality assurance tracking'
    ],
    cta: {
      primary: 'Get 3 Quotes',
      secondary: 'Become a Vendor'
    },
    icon: 'Store'
  },
  {
    id: 'incident-reporting',
    title: 'Incident Reporting & Analytics Dashboard',
    description: 'Near-miss & incident capture (web/mobile), root-cause tags, trend charts, compliance exports.',
    features: [
      'Web and mobile incident capture',
      'Near-miss reporting system',
      'Root-cause analysis tagging',
      'Trend analysis and charts',
      'Compliance export functionality',
      'Real-time notifications and alerts',
      'Photo and video evidence capture',
      'Corrective action tracking'
    ],
    cta: {
      primary: 'Try Incident Log',
      secondary: 'View Sample Report'
    },
    icon: 'AlertTriangle'
  },
  {
    id: 'outsourcing',
    title: 'Safety Warden Outsourcing (Managed Service)',
    description: 'We recruit, train, schedule, and manage on-site Floor/Fire Wardens for your facilities. Coverage for drills, audits, evacuations, and visitor briefings.',
    features: [
      'Professional warden recruitment and training',
      'Full-time onsite coverage',
      'Part-time peak hours support', 
      'On-call for drills and events',
      'Drill coordination and execution',
      'Visitor safety briefings',
      'Emergency response coordination',
      'Compliance documentation management'
    ],
    cta: {
      primary: 'Request Proposal',
      secondary: 'Speak to Delivery Manager'
    },
    icon: 'Users'
  }
];