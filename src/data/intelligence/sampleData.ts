import { IntelligenceEntry } from '../../types/intelligence';

export const sampleIntelligenceEntries: Partial<IntelligenceEntry>[] = [
  {
    title: 'Major Fire at Mumbai Chemical Plant Highlights Storage Compliance Gaps',
    slug: 'mumbai-chemical-plant-fire-storage-compliance',
    category: 'Safety & Fire',
    source_type: 'Incident',
    source_link: 'https://example.com/incident-report',
    publish_date: '2025-01-10',
    short_summary: 'A significant fire broke out at a chemical manufacturing facility in Mumbai, causing extensive damage and temporary evacuation of nearby areas. Preliminary investigations point to inadequate fire suppression systems and non-compliant chemical storage practices.',
    safetywarden_insight: `This incident underscores the critical importance of proper chemical storage and fire suppression system maintenance. Key learnings:

1. Chemical Segregation: Incompatible chemicals were stored in proximity, accelerating the fire spread
2. Suppression System Failure: Foam-based fire suppression system was non-functional due to expired foam concentrate
3. Emergency Response Gaps: Delayed notification to fire department resulted in escalation
4. Documentation Issues: Fire NOC was expired, and inspection records were incomplete

What You Should Do:
- Conduct immediate audit of chemical storage areas against NFPA 30 and NBC requirements
- Verify all fire suppression systems are operational with current testing records
- Review and update emergency response procedures with realistic drill scenarios
- Ensure all statutory NOCs and clearances are current`,
    risk_tags: ['Fire Safety', 'Chemical Storage', 'NBC Compliance', 'Emergency Response', 'Fire Suppression'],
    geography: 'Mumbai, Maharashtra, India',
    severity_level: 'High',
    is_published: true,
    is_featured: true
  },
  {
    title: 'CPCB Issues Show Cause Notice to 15 Delhi Industries for Air Quality Violations',
    slug: 'cpcb-delhi-air-quality-violations-notice',
    category: 'Pollution Control',
    source_type: 'Enforcement',
    source_link: 'https://example.com/cpcb-notice',
    publish_date: '2025-01-08',
    short_summary: 'The Central Pollution Control Board (CPCB) has issued show cause notices to 15 industrial units in Delhi for exceeding permissible emission limits during winter months. Violations include inadequate pollution control equipment and failure to maintain continuous emission monitoring systems.',
    safetywarden_insight: `This enforcement action signals intensified monitoring during high-pollution months. Industries must prepare for stricter scrutiny:

Compliance Checkpoints:
- Continuous Emission Monitoring Systems (CEMS) must be operational 24/7
- Stack emission testing records must be current (quarterly testing mandatory)
- Pollution control equipment maintenance logs must demonstrate preventive upkeep
- Environmental clearances and consent to operate must be valid

Immediate Actions:
1. Verify CEMS connectivity to CPCB server
2. Schedule stack emission testing if due within 30 days
3. Review baghouse/scrubber maintenance records
4. Prepare response documentation for potential inspections

Winter months see heightened enforcement—non-compliance can result in closure orders.`,
    risk_tags: ['Air Quality', 'CPCB', 'Emissions', 'CEMS', 'Pollution Control Equipment'],
    geography: 'Delhi, India',
    severity_level: 'High',
    is_published: true,
    is_featured: true
  },
  {
    title: 'New Draft ISO 45003 Guidelines on Psychological Health & Safety at Work',
    slug: 'iso-45003-psychological-health-safety-guidelines',
    category: 'EHS & Occupational Safety',
    source_type: 'Regulation',
    source_link: 'https://example.com/iso-45003',
    publish_date: '2025-01-05',
    short_summary: 'ISO has released updated guidelines for managing psychological health and safety in the workplace as part of ISO 45003. The standard addresses work-related stress, burnout, and mental health support systems, complementing existing ISO 45001 requirements.',
    safetywarden_insight: `ISO 45003 represents a paradigm shift in occupational safety—recognizing mental health as equally critical as physical safety.

Key Requirements:
- Risk Assessment: Identify psychosocial hazards (workload, harassment, isolation)
- Control Measures: Implement organizational controls to mitigate stress factors
- Support Systems: Provide access to counseling and mental health resources
- Training: Educate managers on recognizing signs of psychological distress
- Monitoring: Track indicators like absenteeism, turnover, and incident rates

Implementation Strategy:
1. Conduct psychosocial risk assessment using validated tools
2. Integrate mental health into existing OHSMS (ISO 45001)
3. Establish confidential reporting channels
4. Partner with occupational health professionals

Forward-thinking organizations are already adopting these practices ahead of formal certification requirements.`,
    risk_tags: ['Mental Health', 'ISO 45003', 'Psychosocial Hazards', 'Workplace Stress', 'OHSMS'],
    geography: 'India',
    severity_level: 'Medium',
    is_published: true,
    is_featured: false
  },
  {
    title: 'ESG Disclosure Mandate: SEBI Extends BRSR Reporting to Top 1000 Listed Companies',
    slug: 'sebi-brsr-esg-disclosure-mandate-top-1000',
    category: 'ESG & Sustainability',
    source_type: 'Regulation',
    source_link: 'https://example.com/sebi-brsr',
    publish_date: '2025-01-03',
    short_summary: 'The Securities and Exchange Board of India (SEBI) has extended the Business Responsibility and Sustainability Reporting (BRSR) mandate to the top 1,000 listed companies by market capitalization, requiring comprehensive ESG disclosures starting FY 2025-26.',
    safetywarden_insight: `BRSR reporting is no longer optional for mid-sized listed companies. This mandate forces transparency on ESG performance across nine principles.

BRSR Coverage Areas:
- Section A: General Disclosures (governance, compliance)
- Section B: Management & Process (policies, systems)
- Section C: Principle-wise Performance (quantitative metrics)

Critical ESG Metrics to Track:
1. Energy consumption and GHG emissions (Scope 1, 2, 3)
2. Water usage and wastewater management
3. Waste generation and circularity metrics
4. Employee safety statistics (LTIFR, severity rate)
5. Diversity and inclusion indicators

Preparation Steps:
- Establish ESG data collection systems across operations
- Assign responsibility to cross-functional ESG committee
- Engage third-party for limited/reasonable assurance
- Benchmark against industry peers

Companies without robust ESG data infrastructure will struggle with accurate reporting.`,
    risk_tags: ['ESG', 'BRSR', 'SEBI', 'Sustainability Reporting', 'GHG Emissions'],
    geography: 'India',
    severity_level: 'Medium',
    is_published: true,
    is_featured: false
  },
  {
    title: 'Heat Stress Alert: IMD Issues Red Warning for Industrial Belts in Gujarat',
    slug: 'heat-stress-warning-gujarat-industrial-workers',
    category: 'Climate & Environmental Risk',
    source_type: 'Climate',
    source_link: 'https://example.com/imd-heat-warning',
    publish_date: '2025-01-01',
    short_summary: 'The India Meteorological Department has issued a red heat wave warning for industrial regions in Gujarat, with temperatures expected to exceed 45°C. Authorities recommend work schedule modifications and enhanced hydration protocols for outdoor and high-heat workers.',
    safetywarden_insight: `Heat stress is an underestimated occupational hazard that can lead to heat exhaustion, heatstroke, and fatalities. Proactive measures are legally and morally imperative.

Heat Illness Risk Factors:
- Direct sun exposure during peak hours (11 AM - 4 PM)
- Heavy physical exertion in foundries, construction, loading operations
- Inadequate acclimatization for new or returning workers
- Personal protective equipment that restricts heat dissipation

Control Measures (Hierarchy of Controls):
1. Engineering Controls: Shaded rest areas, cooling stations, ventilation
2. Administrative Controls: Adjusted work-rest schedules, buddy system, acclimatization protocols
3. PPE: Cooling vests, moisture-wicking clothing (if feasible)

Mandatory Actions:
- Implement work-rest cycles per NIOSH/ACGIH guidelines
- Ensure 24/7 access to potable water (1 liter/hour minimum)
- Train supervisors to recognize heat illness symptoms
- Establish medical emergency response protocols

Document all heat safety measures—heat-related incidents often result in legal scrutiny.`,
    risk_tags: ['Heat Stress', 'Climate Risk', 'Occupational Health', 'Emergency Preparedness', 'Worker Safety'],
    geography: 'Gujarat, India',
    severity_level: 'High',
    is_published: true,
    is_featured: true
  }
];
