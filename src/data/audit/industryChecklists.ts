import { ChecklistItem } from '../../types/audit';

// Hospital-specific checklist items
export const hospitalChecklistItems: Omit<ChecklistItem, 'id' | 'organization_id'>[] = [
  // Patient Safety & Evacuation
  {
    category: 'Patient Safety & Evacuation',
    subcategory: 'Patient Evacuation Plans',
    item_code: 'PSE-001',
    control_statement: 'Written evacuation procedures shall address the movement of patients who cannot walk.',
    code_ref: 'NFPA 101: 18.7.2',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Patient Safety & Evacuation',
    subcategory: 'Evacuation Equipment',
    item_code: 'PSE-002',
    control_statement: 'Evacuation chairs and stretchers shall be available on each patient floor.',
    code_ref: 'NFPA 101: 18.7.2.3',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Patient Safety & Evacuation',
    subcategory: 'Staff Training',
    item_code: 'PSE-003',
    control_statement: 'All staff shall be trained in patient evacuation procedures and practice quarterly.',
    code_ref: 'NFPA 101: 18.7.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },

  // Medical Gas Systems
  {
    category: 'Medical Gas Systems',
    subcategory: 'Oxygen Storage',
    item_code: 'MGS-001',
    control_statement: 'Medical gas storage areas shall be properly ventilated and separated from ignition sources.',
    code_ref: 'NFPA 99: 5.1.3.6',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  },
  {
    category: 'Medical Gas Systems',
    subcategory: 'Gas Shut-off Valves',
    item_code: 'MGS-002',
    control_statement: 'Emergency shut-off valves for medical gases shall be clearly marked and accessible.',
    code_ref: 'NFPA 99: 5.1.12.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },

  // Infection Control
  {
    category: 'Infection Control',
    subcategory: 'HVAC Systems',
    item_code: 'IC-001',
    control_statement: 'HVAC systems shall maintain proper air pressure relationships between areas.',
    code_ref: 'NFPA 99: 6.2.2.1',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Infection Control',
    subcategory: 'Isolation Rooms',
    item_code: 'IC-002',
    control_statement: 'Airborne infection isolation rooms shall maintain negative pressure.',
    code_ref: 'NFPA 99: 6.2.2.2',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  }
];

// IT Parks specific checklist items
export const itParksChecklistItems: Omit<ChecklistItem, 'id' | 'organization_id'>[] = [
  // High Density Occupancy
  {
    category: 'High Density Occupancy',
    subcategory: 'Occupant Load',
    item_code: 'HDO-001',
    control_statement: 'Occupant load calculations shall account for maximum density in open office areas.',
    code_ref: 'NFPA 101: 38.1.7',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'High Density Occupancy',
    subcategory: 'Exit Capacity',
    item_code: 'HDO-002',
    control_statement: 'Exit capacity shall be sufficient for the maximum occupant load during peak hours.',
    code_ref: 'NFPA 101: 7.3.3',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },

  // Data Centers
  {
    category: 'Data Centers',
    subcategory: 'Clean Agent Systems',
    item_code: 'DC-001',
    control_statement: 'Clean agent fire suppression systems shall be installed in server rooms.',
    code_ref: 'NFPA 2001: 4.1.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  },
  {
    category: 'Data Centers',
    subcategory: 'Environmental Monitoring',
    item_code: 'DC-002',
    control_statement: 'Temperature and humidity monitoring systems shall be installed in data centers.',
    code_ref: 'NFPA 75: 5.2.1',
    requirement_type: 'Should-have',
    check_type: 'YesNo',
    default_severity: 3,
    default_likelihood: 3,
    active: true
  },

  // Cafeteria & Common Areas
  {
    category: 'Cafeteria & Common Areas',
    subcategory: 'Kitchen Equipment',
    item_code: 'CCA-001',
    control_statement: 'Commercial cooking equipment shall have automatic fire suppression systems.',
    code_ref: 'NFPA 96: 10.1.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Cafeteria & Common Areas',
    subcategory: 'Seating Areas',
    item_code: 'CCA-002',
    control_statement: 'Seating arrangements shall not obstruct egress paths in common areas.',
    code_ref: 'NFPA 101: 7.1.10',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  }
];

// Retail Malls specific checklist items
export const retailMallsChecklistItems: Omit<ChecklistItem, 'id' | 'organization_id'>[] = [
  // Public Assembly
  {
    category: 'Public Assembly',
    subcategory: 'Crowd Management',
    item_code: 'PA-001',
    control_statement: 'Crowd management procedures shall be established for peak shopping periods.',
    code_ref: 'NFPA 101: 12.7.6',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Public Assembly',
    subcategory: 'Public Address System',
    item_code: 'PA-002',
    control_statement: 'Public address system shall be capable of emergency announcements throughout the mall.',
    code_ref: 'NFPA 72: 24.4.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },

  // Multi-Tenant Coordination
  {
    category: 'Multi-Tenant Coordination',
    subcategory: 'Tenant Responsibilities',
    item_code: 'MTC-001',
    control_statement: 'Each tenant shall have designated fire wardens and evacuation procedures.',
    code_ref: 'NFPA 101: 4.8.2',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Multi-Tenant Coordination',
    subcategory: 'Common Area Maintenance',
    item_code: 'MTC-002',
    control_statement: 'Common area fire safety systems shall be maintained by mall management.',
    code_ref: 'NFPA 25: 4.1.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },

  // Food Courts
  {
    category: 'Food Courts',
    subcategory: 'Cooking Equipment',
    item_code: 'FC-001',
    control_statement: 'All commercial cooking equipment shall have approved fire suppression systems.',
    code_ref: 'NFPA 96: 10.1.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Food Courts',
    subcategory: 'Grease Management',
    item_code: 'FC-002',
    control_statement: 'Grease removal devices shall be installed and maintained for all cooking equipment.',
    code_ref: 'NFPA 96: 11.6.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  }
];

// Warehousing specific checklist items
export const warehousingChecklistItems: Omit<ChecklistItem, 'id' | 'organization_id'>[] = [
  // High-Pile Storage
  {
    category: 'High-Pile Storage',
    subcategory: 'Storage Height',
    item_code: 'HPS-001',
    control_statement: 'Storage height shall not exceed the design limits of the sprinkler system.',
    code_ref: 'NFPA 13: 12.1.1',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 5,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'High-Pile Storage',
    subcategory: 'Aisle Width',
    item_code: 'HPS-002',
    control_statement: 'Aisles shall be maintained at minimum required widths for fire department access.',
    code_ref: 'NFPA 230: 3.3.2',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'High-Pile Storage',
    subcategory: 'Sprinkler Clearance',
    item_code: 'HPS-003',
    control_statement: 'Minimum 18-inch clearance shall be maintained below sprinkler deflectors.',
    code_ref: 'NFPA 13: 12.1.5',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 5,
    active: true
  },

  // Hazardous Materials
  {
    category: 'Hazardous Materials Storage',
    subcategory: 'Chemical Segregation',
    item_code: 'HMS-001',
    control_statement: 'Incompatible chemicals shall be stored in separate areas with proper separation.',
    code_ref: 'NFPA 400: 6.3.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Hazardous Materials Storage',
    subcategory: 'Spill Containment',
    item_code: 'HMS-002',
    control_statement: 'Secondary containment shall be provided for liquid hazardous materials.',
    code_ref: 'NFPA 30: 22.11.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },

  // Loading Docks
  {
    category: 'Loading Docks',
    subcategory: 'Vehicle Separation',
    item_code: 'LD-001',
    control_statement: 'Loading dock areas shall be separated from storage areas by fire-rated construction.',
    code_ref: 'NFPA 230: 4.2.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Loading Docks',
    subcategory: 'Emergency Access',
    item_code: 'LD-002',
    control_statement: 'Fire department access roads shall be maintained clear around loading areas.',
    code_ref: 'NFPA 1: 18.2.3',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },

  // Material Handling Equipment
  {
    category: 'Material Handling Equipment',
    subcategory: 'Forklift Safety',
    item_code: 'MHE-001',
    control_statement: 'Forklifts and material handling equipment shall be properly maintained and inspected.',
    code_ref: 'NFPA 505: 4.3.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Material Handling Equipment',
    subcategory: 'Battery Charging',
    item_code: 'MHE-002',
    control_statement: 'Battery charging areas shall be properly ventilated and equipped with eyewash stations.',
    code_ref: 'NFPA 505: 5.2.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  }
];

export const getIndustryChecklist = (buildingType: string): Omit<ChecklistItem, 'id' | 'organization_id'>[] => {
  switch (buildingType.toLowerCase()) {
    case 'healthcare':
    case 'hospital':
      return hospitalChecklistItems;
    case 'office':
    case 'it park':
      return itParksChecklistItems;
    case 'retail':
    case 'mall':
      return retailMallsChecklistItems;
    case 'warehouse':
    case 'logistics':
      return warehousingChecklistItems;
    default:
      return [];
  }
};