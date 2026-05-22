/*
  # Seed Global Checklist Items

  1. Core Safety Categories
  2. Industry-Standard Items
  3. Demo Organization Setup
*/

-- Insert global checklist items (organization_id = NULL for global items)
INSERT INTO checklist_items (category, subcategory, item_code, control_statement, code_ref, requirement_type, check_type, default_severity, default_likelihood, active) VALUES

-- Means of Egress
('Means of Egress', 'Exit Doors', 'MOE-001', 'Exit doors shall swing in the direction of egress travel and be readily openable from the egress side without the use of a key or special knowledge.', 'NFPA 101: 7.2.1.4', 'Must-have', 'YesNo', 5, 4, true),
('Means of Egress', 'Exit Width', 'MOE-002', 'Exit access corridors shall have a minimum clear width of 44 inches (1120 mm).', 'NFPA 101: 7.3.4.1', 'Must-have', 'Numeric', 4, 3, true),
('Means of Egress', 'Exit Signs', 'MOE-003', 'Exit signs shall be illuminated and visible from all directions of approach.', 'NFPA 101: 7.10.1.2', 'Must-have', 'YesNo', 4, 3, true),
('Means of Egress', 'Stairways', 'MOE-004', 'Stairways shall have uniform riser heights and tread depths with handrails on both sides.', 'NFPA 101: 7.2.2.3', 'Must-have', 'YesNo', 5, 2, true),
('Means of Egress', 'Occupant Load', 'MOE-005', 'The occupant load shall not exceed the capacity of the means of egress.', 'NFPA 101: 7.3.1.2', 'Must-have', 'Numeric', 5, 3, true),

-- Fire Detection & Alarm
('Fire Detection & Alarm', 'Smoke Detectors', 'FDA-001', 'Smoke detectors shall be installed in all required locations and tested monthly.', 'NFPA 72: 17.7.3', 'Must-have', 'YesNo', 5, 3, true),
('Fire Detection & Alarm', 'Fire Alarm Panel', 'FDA-002', 'Fire alarm control panel shall be monitored 24/7 and have backup power supply.', 'NFPA 72: 10.6.7', 'Must-have', 'YesNo', 5, 2, true),
('Fire Detection & Alarm', 'Manual Pull Stations', 'FDA-003', 'Manual fire alarm boxes shall be located within 5 feet of exit doors.', 'NFPA 72: 17.14.4', 'Must-have', 'YesNo', 4, 3, true),
('Fire Detection & Alarm', 'Audible Alarms', 'FDA-004', 'Audible alarm signals shall be at least 15 dB above ambient sound level.', 'NFPA 72: 18.4.3', 'Must-have', 'Numeric', 4, 3, true),
('Fire Detection & Alarm', 'Visual Alarms', 'FDA-005', 'Visual alarm appliances shall be provided in areas where required by accessibility codes.', 'NFPA 72: 18.5.3', 'Should-have', 'YesNo', 3, 2, true),

-- Fire Suppression
('Fire Suppression', 'Sprinkler System', 'FS-001', 'Automatic sprinkler system shall be installed and maintained per NFPA 13.', 'NFPA 13: 8.15.1', 'Must-have', 'YesNo', 5, 2, true),
('Fire Suppression', 'Fire Extinguishers', 'FS-002', 'Portable fire extinguishers shall be inspected monthly and serviced annually.', 'NFPA 10: 7.2.1', 'Must-have', 'YesNo', 4, 4, true),
('Fire Suppression', 'Standpipe System', 'FS-003', 'Standpipe systems shall be tested and maintained per NFPA 25.', 'NFPA 25: 6.3.1', 'Must-have', 'YesNo', 4, 3, true),
('Fire Suppression', 'Water Supply', 'FS-004', 'Water supply for fire protection systems shall meet minimum pressure and flow requirements.', 'NFPA 13: 11.1.1', 'Must-have', 'Numeric', 5, 2, true),

-- Emergency Lighting & Signage
('Emergency Lighting & Signage', 'Emergency Lighting', 'ELS-001', 'Emergency lighting shall provide minimum 1 foot-candle illumination for 90 minutes.', 'NFPA 101: 7.9.2.1', 'Must-have', 'Numeric', 4, 3, true),
('Emergency Lighting & Signage', 'Exit Signs', 'ELS-002', 'Exit signs shall be continuously illuminated and visible from 100 feet.', 'NFPA 101: 7.10.1.2', 'Must-have', 'YesNo', 4, 3, true),
('Emergency Lighting & Signage', 'Directional Signs', 'ELS-003', 'Directional exit signs shall be provided where the exit is not readily apparent.', 'NFPA 101: 7.10.1.6', 'Should-have', 'YesNo', 3, 3, true),

-- Electrical Safety
('Electrical Safety', 'Electrical Panels', 'ES-001', 'Electrical panels shall have proper clearances and be properly labeled.', 'NFPA 70: 110.26', 'Must-have', 'YesNo', 4, 4, true),
('Electrical Safety', 'Extension Cords', 'ES-002', 'Extension cords shall not be used as permanent wiring and shall be in good condition.', 'NFPA 70: 400.8', 'Must-have', 'YesNo', 4, 5, true),
('Electrical Safety', 'GFCI Protection', 'ES-003', 'GFCI protection shall be provided in wet locations and as required by code.', 'NFPA 70: 210.8', 'Must-have', 'YesNo', 5, 3, true),

-- Housekeeping & Storage
('Housekeeping & Storage', 'Exit Routes', 'HS-001', 'Exit routes shall be kept clear of obstructions and combustible materials.', 'NFPA 101: 7.1.10', 'Must-have', 'YesNo', 5, 4, true),
('Housekeeping & Storage', 'Storage Areas', 'HS-002', 'Storage shall maintain required clearances from sprinkler heads and ceiling.', 'NFPA 13: 12.1.5', 'Must-have', 'Numeric', 4, 4, true),
('Housekeeping & Storage', 'Waste Management', 'HS-003', 'Waste and recyclable materials shall be stored in approved containers.', 'NFPA 1: 10.13.1', 'Should-have', 'YesNo', 3, 3, true);

-- Create demo organization and initial data
DO $$
DECLARE
  demo_org_id uuid;
  demo_site_id uuid;
  demo_user_id uuid;
BEGIN
  -- Create demo organization
  INSERT INTO organizations (id, name, billing_email, city, country)
  VALUES (gen_random_uuid(), 'SafetyWarden Demo', 'demo@safetywarden.com', 'Bengaluru', 'India')
  RETURNING id INTO demo_org_id;
  
  -- Create demo site
  INSERT INTO sites (id, organization_id, name, address, city, state, country, building_type, floors)
  VALUES (gen_random_uuid(), demo_org_id, 'Demo Office Building', '123 Tech Park Drive', 'Bengaluru', 'Karnataka', 'India', 'Office', 5)
  RETURNING id INTO demo_site_id;
  
  -- Create settings for demo org
  INSERT INTO settings (organization_id, email_from, data_residency, nightly_backup)
  VALUES (demo_org_id, 'demo@safetywarden.com', 'India', true);
  
  -- Log successful seeding
  INSERT INTO admin_migration_logs (script, success, logs, ran_at)
  VALUES ('03_seed_checklist', true, ARRAY['Demo organization created', 'Demo site created', 'Settings configured'], now());
  
END $$;