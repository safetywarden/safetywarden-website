import { ChecklistItem } from '../../types/audit';

export const defaultChecklistItems: Omit<ChecklistItem, 'id' | 'organization_id'>[] = [
  // Means of Egress
  {
    category: 'Means of Egress',
    subcategory: 'Exit Doors',
    item_code: 'MOE-001',
    control_statement: 'Exit doors shall swing in the direction of egress travel and be readily openable from the egress side without the use of a key or special knowledge.',
    code_ref: 'NFPA 101: 7.2.1.4',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Means of Egress',
    subcategory: 'Exit Width',
    item_code: 'MOE-002',
    control_statement: 'Exit access corridors shall have a minimum clear width of 44 inches (1120 mm).',
    code_ref: 'NFPA 101: 7.3.4.1',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Means of Egress',
    subcategory: 'Exit Signs',
    item_code: 'MOE-003',
    control_statement: 'Exit signs shall be illuminated and visible from all directions of approach.',
    code_ref: 'NFPA 101: 7.10.1.2',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Means of Egress',
    subcategory: 'Stairways',
    item_code: 'MOE-004',
    control_statement: 'Stairways shall have uniform riser heights and tread depths with handrails on both sides.',
    code_ref: 'NFPA 101: 7.2.2.3',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  },
  {
    category: 'Means of Egress',
    subcategory: 'Occupant Load',
    item_code: 'MOE-005',
    control_statement: 'The occupant load shall not exceed the capacity of the means of egress.',
    code_ref: 'NFPA 101: 7.3.1.2',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },

  // Fire Detection & Alarm
  {
    category: 'Fire Detection & Alarm',
    subcategory: 'Smoke Detectors',
    item_code: 'FDA-001',
    control_statement: 'Smoke detectors shall be installed in all required locations and tested monthly.',
    code_ref: 'NFPA 72: 17.7.3',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Fire Detection & Alarm',
    subcategory: 'Fire Alarm Panel',
    item_code: 'FDA-002',
    control_statement: 'Fire alarm control panel shall be monitored 24/7 and have backup power supply.',
    code_ref: 'NFPA 72: 10.6.7',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  },
  {
    category: 'Fire Detection & Alarm',
    subcategory: 'Manual Pull Stations',
    item_code: 'FDA-003',
    control_statement: 'Manual fire alarm boxes shall be located within 5 feet of exit doors.',
    code_ref: 'NFPA 72: 17.14.4',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Fire Detection & Alarm',
    subcategory: 'Audible Alarms',
    item_code: 'FDA-004',
    control_statement: 'Audible alarm signals shall be at least 15 dB above ambient sound level.',
    code_ref: 'NFPA 72: 18.4.3',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Fire Detection & Alarm',
    subcategory: 'Visual Alarms',
    item_code: 'FDA-005',
    control_statement: 'Visual alarm appliances shall be provided in areas where required by accessibility codes.',
    code_ref: 'NFPA 72: 18.5.3',
    requirement_type: 'Should-have',
    check_type: 'YesNo',
    default_severity: 3,
    default_likelihood: 2,
    active: true
  },

  // Fire Suppression
  {
    category: 'Fire Suppression',
    subcategory: 'Sprinkler System',
    item_code: 'FS-001',
    control_statement: 'Automatic sprinkler system shall be installed and maintained per NFPA 13.',
    code_ref: 'NFPA 13: 8.15.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  },
  {
    category: 'Fire Suppression',
    subcategory: 'Fire Extinguishers',
    item_code: 'FS-002',
    control_statement: 'Portable fire extinguishers shall be inspected monthly and serviced annually.',
    code_ref: 'NFPA 10: 7.2.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Fire Suppression',
    subcategory: 'Standpipe System',
    item_code: 'FS-003',
    control_statement: 'Standpipe systems shall be tested and maintained per NFPA 25.',
    code_ref: 'NFPA 25: 6.3.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Fire Suppression',
    subcategory: 'Water Supply',
    item_code: 'FS-004',
    control_statement: 'Water supply for fire protection systems shall meet minimum pressure and flow requirements.',
    code_ref: 'NFPA 13: 11.1.1',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 5,
    default_likelihood: 2,
    active: true
  },

  // Emergency Lighting & Signage
  {
    category: 'Emergency Lighting & Signage',
    subcategory: 'Emergency Lighting',
    item_code: 'ELS-001',
    control_statement: 'Emergency lighting shall provide minimum 1 foot-candle illumination for 90 minutes.',
    code_ref: 'NFPA 101: 7.9.2.1',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Emergency Lighting & Signage',
    subcategory: 'Exit Signs',
    item_code: 'ELS-002',
    control_statement: 'Exit signs shall be continuously illuminated and visible from 100 feet.',
    code_ref: 'NFPA 101: 7.10.1.2',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Emergency Lighting & Signage',
    subcategory: 'Directional Signs',
    item_code: 'ELS-003',
    control_statement: 'Directional exit signs shall be provided where the exit is not readily apparent.',
    code_ref: 'NFPA 101: 7.10.1.6',
    requirement_type: 'Should-have',
    check_type: 'YesNo',
    default_severity: 3,
    default_likelihood: 3,
    active: true
  },

  // Electrical Safety
  {
    category: 'Electrical Safety',
    subcategory: 'Electrical Panels',
    item_code: 'ES-001',
    control_statement: 'Electrical panels shall have proper clearances and be properly labeled.',
    code_ref: 'NFPA 70: 110.26',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Electrical Safety',
    subcategory: 'Extension Cords',
    item_code: 'ES-002',
    control_statement: 'Extension cords shall not be used as permanent wiring and shall be in good condition.',
    code_ref: 'NFPA 70: 400.8',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 5,
    active: true
  },
  {
    category: 'Electrical Safety',
    subcategory: 'GFCI Protection',
    item_code: 'ES-003',
    control_statement: 'GFCI protection shall be provided in wet locations and as required by code.',
    code_ref: 'NFPA 70: 210.8',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },

  // Housekeeping & Storage
  {
    category: 'Housekeeping & Storage',
    subcategory: 'Exit Routes',
    item_code: 'HS-001',
    control_statement: 'Exit routes shall be kept clear of obstructions and combustible materials.',
    code_ref: 'NFPA 101: 7.1.10',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Housekeeping & Storage',
    subcategory: 'Storage Areas',
    item_code: 'HS-002',
    control_statement: 'Storage shall maintain required clearances from sprinkler heads and ceiling.',
    code_ref: 'NFPA 13: 12.1.5',
    requirement_type: 'Must-have',
    check_type: 'Numeric',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Housekeeping & Storage',
    subcategory: 'Waste Management',
    item_code: 'HS-003',
    control_statement: 'Waste and recyclable materials shall be stored in approved containers.',
    code_ref: 'NFPA 1: 10.13.1',
    requirement_type: 'Should-have',
    check_type: 'YesNo',
    default_severity: 3,
    default_likelihood: 3,
    active: true
  },

  // Hazardous Materials
  {
    category: 'Hazardous Materials',
    subcategory: 'Chemical Storage',
    item_code: 'HM-001',
    control_statement: 'Hazardous materials shall be stored in approved containers and locations.',
    code_ref: 'NFPA 400: 6.2.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Hazardous Materials',
    subcategory: 'Safety Data Sheets',
    item_code: 'HM-002',
    control_statement: 'Safety Data Sheets shall be readily available for all hazardous materials.',
    code_ref: 'OSHA 1910.1200',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 3,
    default_likelihood: 4,
    active: true
  },

  // Vertical Openings & Fire Doors
  {
    category: 'Vertical Openings & Fire Doors',
    subcategory: 'Fire Doors',
    item_code: 'VFD-001',
    control_statement: 'Fire doors shall be self-closing and self-latching with proper clearances.',
    code_ref: 'NFPA 80: 5.2.4',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 5,
    default_likelihood: 3,
    active: true
  },
  {
    category: 'Vertical Openings & Fire Doors',
    subcategory: 'Stairwell Doors',
    item_code: 'VFD-002',
    control_statement: 'Stairwell doors shall remain closed or be equipped with automatic closing devices.',
    code_ref: 'NFPA 101: 7.2.1.8',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 4,
    active: true
  },
  {
    category: 'Vertical Openings & Fire Doors',
    subcategory: 'Fire Dampers',
    item_code: 'VFD-003',
    control_statement: 'Fire dampers shall be installed in ductwork penetrating fire-rated assemblies.',
    code_ref: 'NFPA 90A: 5.3.1',
    requirement_type: 'Must-have',
    check_type: 'YesNo',
    default_severity: 4,
    default_likelihood: 2,
    active: true
  }
];