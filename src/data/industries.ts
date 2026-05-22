import { Industry } from '../types';

export const industries: Industry[] = [
  {
    id: 'it-parks',
    name: 'IT Parks & Tech Companies',
    description: 'High-density occupancy with complex evacuation requirements across multiple floors and buildings.',
    painPoints: [
      'Managing large employee populations (1000+ people)',
      'Coordinating across multiple floors/buildings',
      'Ensuring visitor safety protocols',
      'Shift-based workforce complications',
      'Cafeteria and common area risks'
    ],
    features: [
      'Bulk employee onboarding (CSV import)',
      'Multi-building drill coordination',
      'Visitor management integration',
      'Digital warden certificates',
      'Real-time headcount tracking',
      'Floor-wise evacuation planning'
    ],
    caseStudy: {
      title: 'Tech Park Bengaluru - 5,000+ employees',
      metrics: '70% faster evacuations, 100% audit compliance, ₹2L saved annually'
    }
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Factories',
    description: 'Industrial hazards requiring specialized safety protocols with equipment-specific procedures.',
    painPoints: [
      'Chemical and fire hazards management',
      'Shift-based workforce training challenges',
      'Equipment-specific evacuation routes',
      'Regulatory compliance (Factory Act)',
      'Language barriers (multilingual workforce)'
    ],
    features: [
      'Hazard-specific training modules',
      'Shift-based drill scheduling',
      'Equipment shutdown protocols',
      'Multi-language support',
      'Chemical spill response procedures',
      'Maintenance area safety protocols'
    ],
    caseStudy: {
      title: 'Auto Manufacturing Plant - 3 facilities',
      metrics: 'Zero incidents in 18 months, 95% reduction in audit prep time'
    }
  },
  {
    id: 'warehousing',
    name: 'Warehousing & Logistics',
    description: 'Large storage facilities with heavy machinery, chemical storage, and high-risk operations.',
    painPoints: [
      'Chemical storage compliance',
      'Heavy machinery evacuation procedures',
      'Large facility coverage',
      '24/7 operations management',
      'Truck loading/unloading safety'
    ],
    features: [
      'Chemical storage compliance checklists',
      'Machinery-specific evacuation plans',
      'Round-the-clock warden coverage',
      'Loading dock safety protocols',
      'Inventory-based risk assessment',
      'Emergency vehicle access planning'
    ],
    caseStudy: {
      title: 'Logistics Hub Mumbai - 50,000 sq ft',
      metrics: '60% faster emergency response, complete NBC compliance'
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare Facilities',
    description: 'Patient safety with specialized evacuation procedures for hospitals, clinics, and medical centers.',
    painPoints: [
      'Patient evacuation protocols',
      '24/7 safety coverage needed',
      'Medical equipment considerations',
      'ICU and OT special procedures',
      'Visitor and patient family safety'
    ],
    features: [
      'Patient-safe evacuation training',
      'Round-the-clock warden coverage',
      'Medical equipment protocols',
      'ICU/OT emergency procedures',
      'Patient family communication',
      'Medical gas safety compliance'
    ],
    caseStudy: {
      title: 'Multi-Specialty Hospital - 500 beds',
      metrics: '100% audit compliance, 24/7 warden coverage, zero patient incidents'
    }
  },
  {
    id: 'education',
    name: 'Education Institutions',
    description: 'Comprehensive health & safety audit services for schools, colleges, and universities with specialized campus safety protocols.',
    painPoints: [
      'Campus-wide safety compliance management',
      'Student age-appropriate safety training and drills',
      'Large campus coordination',
      'Student hostel and residential facility safety',
      'Laboratory safety protocols',
      'Parent and authority communication requirements',
      'Sports facility and playground safety compliance'
    ],
    features: [
      'Digital health & safety audit platform for educational institutions',
      'Age-appropriate safety training',
      'Campus-wide emergency drill coordination and documentation',
      'Student hostel and accommodation safety protocols',
      'Laboratory and workshop safety compliance modules',
      'Parent notification systems',
      'Sports facility and playground safety assessments',
      'Education board compliance reporting'
    ],
    caseStudy: {
      title: 'Engineering College Campus - 3000 students',
      metrics: '100% campus safety compliance, 95% student drill participation, lab safety protocols implemented'
    }
  },
  {
    id: 'retail-malls',
    name: 'Retail & Malls',
    description: 'High customer footfall with complex evacuation challenges and public safety responsibilities.',
    painPoints: [
      'Customer evacuation management',
      'Multi-tenant coordination',
      'Peak hour safety challenges',
      'Food court and restaurant safety',
      'Parking area evacuation'
    ],
    features: [
      'Customer-focused evacuation plans',
      'Multi-tenant drill coordination',
      'Peak hour management protocols',
      'Food court safety compliance',
      'Parking evacuation procedures',
      'Public announcement integration'
    ],
    caseStudy: {
      title: 'Shopping Mall - 200 stores',
      metrics: '3-minute evacuation time, 100% tenant compliance'
    }
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Hotels',
    description: 'Guest safety with 24/7 operations and specialized evacuation procedures for accommodation.',
    painPoints: [
      'Guest evacuation procedures',
      '24/7 operations management',
      'Kitchen and restaurant safety',
      'Multi-language guest communication',
      'Wedding and event safety'
    ],
    features: [
      'Guest evacuation training',
      '24/7 warden coverage',
      'Kitchen fire safety protocols',
      'Multi-language evacuation guides',
      'Event safety management',
      'Guest room safety compliance'
    ],
    caseStudy: {
      title: '5-Star Hotel - 300 rooms',
      metrics: '100% guest safety compliance, 24/7 coverage achieved'
    }
  },
  {
    id: 'high-rises',
    name: 'High-rise Buildings',
    description: 'Multi-story buildings with complex vertical evacuation challenges and fire safety requirements.',
    painPoints: [
      'Vertical evacuation complexity',
      'Stairwell management',
      'Elevator safety protocols',
      'Multi-tenant coordination',
      'Roof access emergency procedures'
    ],
    features: [
      'Floor-by-floor evacuation plans',
      'Stairwell management protocols',
      'Elevator emergency procedures',
      'Multi-tenant coordination',
      'Roof access safety training',
      'High-rise specific compliance'
    ],
    caseStudy: {
      title: 'Commercial Tower - 40 floors',
      metrics: '5-minute complete evacuation, NBC high-rise compliance'
    }
  }
];