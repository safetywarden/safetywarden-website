/*
  # Add Industry-Specific Checklist Items

  1. New Checklist Items
    - Hospital/Healthcare specific items (Patient Safety, Medical Gas, Infection Control)
    - IT Parks specific items (High Density, Data Centers, Cafeterias)
    - Retail Malls specific items (Public Assembly, Multi-Tenant, Food Courts)
    - Warehousing specific items (High-Pile Storage, Hazmat, Loading Docks, Material Handling)

  2. Enhanced Categories
    - Patient Safety & Evacuation
    - Medical Gas Systems
    - Infection Control
    - High Density Occupancy
    - Data Centers
    - Cafeteria & Common Areas
    - Public Assembly
    - Multi-Tenant Coordination
    - Food Courts
    - High-Pile Storage
    - Hazardous Materials Storage
    - Loading Docks
    - Material Handling Equipment
*/

-- Insert Hospital/Healthcare specific checklist items
INSERT INTO checklist_items (category, subcategory, item_code, control_statement, code_ref, requirement_type, check_type, default_severity, default_likelihood, active) VALUES
-- Patient Safety & Evacuation
('Patient Safety & Evacuation', 'Patient Evacuation Plans', 'PSE-001', 'Written evacuation procedures shall address the movement of patients who cannot walk.', 'NFPA 101: 18.7.2', 'Must-have', 'YesNo', 5, 3, true),
('Patient Safety & Evacuation', 'Evacuation Equipment', 'PSE-002', 'Evacuation chairs and stretchers shall be available on each patient floor.', 'NFPA 101: 18.7.2.3', 'Must-have', 'YesNo', 4, 3, true),
('Patient Safety & Evacuation', 'Staff Training', 'PSE-003', 'All staff shall be trained in patient evacuation procedures and practice quarterly.', 'NFPA 101: 18.7.1', 'Must-have', 'YesNo', 4, 4, true),

-- Medical Gas Systems
('Medical Gas Systems', 'Oxygen Storage', 'MGS-001', 'Medical gas storage areas shall be properly ventilated and separated from ignition sources.', 'NFPA 99: 5.1.3.6', 'Must-have', 'YesNo', 5, 2, true),
('Medical Gas Systems', 'Gas Shut-off Valves', 'MGS-002', 'Emergency shut-off valves for medical gases shall be clearly marked and accessible.', 'NFPA 99: 5.1.12.1', 'Must-have', 'YesNo', 4, 3, true),

-- Infection Control
('Infection Control', 'HVAC Systems', 'IC-001', 'HVAC systems shall maintain proper air pressure relationships between areas.', 'NFPA 99: 6.2.2.1', 'Must-have', 'Numeric', 4, 3, true),
('Infection Control', 'Isolation Rooms', 'IC-002', 'Airborne infection isolation rooms shall maintain negative pressure.', 'NFPA 99: 6.2.2.2', 'Must-have', 'Numeric', 5, 2, true),

-- IT Parks specific items
-- High Density Occupancy
('High Density Occupancy', 'Occupant Load', 'HDO-001', 'Occupant load calculations shall account for maximum density in open office areas.', 'NFPA 101: 38.1.7', 'Must-have', 'Numeric', 4, 4, true),
('High Density Occupancy', 'Exit Capacity', 'HDO-002', 'Exit capacity shall be sufficient for the maximum occupant load during peak hours.', 'NFPA 101: 7.3.3', 'Must-have', 'Numeric', 5, 3, true),

-- Data Centers
('Data Centers', 'Clean Agent Systems', 'DC-001', 'Clean agent fire suppression systems shall be installed in server rooms.', 'NFPA 2001: 4.1.1', 'Must-have', 'YesNo', 5, 2, true),
('Data Centers', 'Environmental Monitoring', 'DC-002', 'Temperature and humidity monitoring systems shall be installed in data centers.', 'NFPA 75: 5.2.1', 'Should-have', 'YesNo', 3, 3, true),

-- Cafeteria & Common Areas
('Cafeteria & Common Areas', 'Kitchen Equipment', 'CCA-001', 'Commercial cooking equipment shall have automatic fire suppression systems.', 'NFPA 96: 10.1.1', 'Must-have', 'YesNo', 4, 3, true),
('Cafeteria & Common Areas', 'Seating Areas', 'CCA-002', 'Seating arrangements shall not obstruct egress paths in common areas.', 'NFPA 101: 7.1.10', 'Must-have', 'YesNo', 4, 4, true),

-- Retail Malls specific items
-- Public Assembly
('Public Assembly', 'Crowd Management', 'PA-001', 'Crowd management procedures shall be established for peak shopping periods.', 'NFPA 101: 12.7.6', 'Must-have', 'YesNo', 4, 4, true),
('Public Assembly', 'Public Address System', 'PA-002', 'Public address system shall be capable of emergency announcements throughout the mall.', 'NFPA 72: 24.4.1', 'Must-have', 'YesNo', 4, 3, true),

-- Multi-Tenant Coordination
('Multi-Tenant Coordination', 'Tenant Responsibilities', 'MTC-001', 'Each tenant shall have designated fire wardens and evacuation procedures.', 'NFPA 101: 4.8.2', 'Must-have', 'YesNo', 4, 4, true),
('Multi-Tenant Coordination', 'Common Area Maintenance', 'MTC-002', 'Common area fire safety systems shall be maintained by mall management.', 'NFPA 25: 4.1.1', 'Must-have', 'YesNo', 4, 3, true),

-- Food Courts
('Food Courts', 'Cooking Equipment', 'FC-001', 'All commercial cooking equipment shall have approved fire suppression systems.', 'NFPA 96: 10.1.1', 'Must-have', 'YesNo', 5, 3, true),
('Food Courts', 'Grease Management', 'FC-002', 'Grease removal devices shall be installed and maintained for all cooking equipment.', 'NFPA 96: 11.6.1', 'Must-have', 'YesNo', 4, 4, true),

-- Warehousing specific items
-- High-Pile Storage
('High-Pile Storage', 'Storage Height', 'HPS-001', 'Storage height shall not exceed the design limits of the sprinkler system.', 'NFPA 13: 12.1.1', 'Must-have', 'Numeric', 5, 4, true),
('High-Pile Storage', 'Aisle Width', 'HPS-002', 'Aisles shall be maintained at minimum required widths for fire department access.', 'NFPA 230: 3.3.2', 'Must-have', 'Numeric', 4, 4, true),
('High-Pile Storage', 'Sprinkler Clearance', 'HPS-003', 'Minimum 18-inch clearance shall be maintained below sprinkler deflectors.', 'NFPA 13: 12.1.5', 'Must-have', 'Numeric', 4, 5, true),

-- Hazardous Materials Storage
('Hazardous Materials Storage', 'Chemical Segregation', 'HMS-001', 'Incompatible chemicals shall be stored in separate areas with proper separation.', 'NFPA 400: 6.3.1', 'Must-have', 'YesNo', 5, 3, true),
('Hazardous Materials Storage', 'Spill Containment', 'HMS-002', 'Secondary containment shall be provided for liquid hazardous materials.', 'NFPA 30: 22.11.1', 'Must-have', 'YesNo', 4, 3, true),

-- Loading Docks
('Loading Docks', 'Vehicle Separation', 'LD-001', 'Loading dock areas shall be separated from storage areas by fire-rated construction.', 'NFPA 230: 4.2.1', 'Must-have', 'YesNo', 4, 3, true),
('Loading Docks', 'Emergency Access', 'LD-002', 'Fire department access roads shall be maintained clear around loading areas.', 'NFPA 1: 18.2.3', 'Must-have', 'YesNo', 4, 4, true),

-- Material Handling Equipment
('Material Handling Equipment', 'Forklift Safety', 'MHE-001', 'Forklifts and material handling equipment shall be properly maintained and inspected.', 'NFPA 505: 4.3.1', 'Must-have', 'YesNo', 4, 4, true),
('Material Handling Equipment', 'Battery Charging', 'MHE-002', 'Battery charging areas shall be properly ventilated and equipped with eyewash stations.', 'NFPA 505: 5.2.1', 'Must-have', 'YesNo', 4, 3, true);