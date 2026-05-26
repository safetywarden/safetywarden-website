export type WorkflowKey = 'factories-act' | 'esg-brsr' | 'fire-life-safety' | 'offline-inspections';

export type WorkflowDetail = {
  key: WorkflowKey;
  path: string;
  title: string;
  shortTitle: string;
  summary: string;
  headline: string;
  scenario: string;
  steps: string[];
  visual: {
    src: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  focusAreas: string[];
  governanceNotes: string[];
};

export const workflowDetails: WorkflowDetail[] = [
  {
    key: 'factories-act',
    path: '/workflows/factories-act',
    title: 'Factories Act Compliance',
    shortTitle: 'Factories Act',
    summary: 'Inspection-readiness workflows for manufacturing and industrial operations.',
    headline: 'Factories Act Inspection Readiness Workflow',
    scenario:
      'Manufacturing sites can prepare for operational compliance audits through a governed workflow that keeps clauses, inspection evidence, findings and CAPA closure visible to site and leadership teams.',
    steps: [
      'Template selection',
      'Clause-based inspection execution',
      'Evidence capture',
      'Finding identification',
      'CAPA assignment',
      'Closure tracking',
      'Compliance dashboard visibility'
    ],
    visual: {
      src: '/images/optimized/compliance-dashboard-1200.webp',
      alt: 'SafetyWarden compliance dashboard for audit governance and CAPA visibility'
    },
    seo: {
      title: 'Factories Act Inspection Workflow | SafetyWarden',
      description:
        'Explore SafetyWarden workflows for Factories Act inspection readiness, clause mapping, evidence capture, CAPA governance and compliance dashboards.',
      keywords:
        'Factories Act compliance software, inspection readiness workflow, factory audit software, clause mapping, CAPA tracking, compliance dashboard'
    },
    focusAreas: [
      'Inspection lifecycle planning',
      'Clause and checklist mapping',
      'Evidence capture during site execution',
      'Finding ownership and CAPA governance',
      'Readiness visibility for leadership review'
    ],
    governanceNotes: [
      'Keep audit templates aligned with operational inspection requirements.',
      'Connect every finding to evidence, owner accountability and closure status.',
      'Maintain site-level readiness visibility before internal or regulatory reviews.'
    ]
  },
  {
    key: 'esg-brsr',
    path: '/workflows/esg-brsr',
    title: 'ESG & BRSR Governance',
    shortTitle: 'ESG/BRSR',
    summary: 'Operational governance and sustainability reporting workflows.',
    headline: 'ESG & BRSR Operational Governance Workflow',
    scenario:
      'Enterprise sustainability and compliance teams can structure annual disclosure preparation around operational data, evidence alignment, governance review and executive reporting readiness.',
    steps: [
      'Operational data collection',
      'ESG indicator mapping',
      'Evidence alignment',
      'Scoring and governance review',
      'BRSR readiness reporting',
      'Executive visibility'
    ],
    visual: {
      src: '/images/optimized/hero-dashboard-1200.webp',
      alt: 'SafetyWarden enterprise dashboard showing ESG and compliance governance workflows'
    },
    seo: {
      title: 'ESG & BRSR Governance Workflow | SafetyWarden',
      description:
        'Review SafetyWarden ESG and BRSR workflows for operational data collection, indicator mapping, evidence alignment and disclosure readiness.',
      keywords:
        'ESG governance workflow, BRSR reporting workflow, ESG evidence management, sustainability governance platform, disclosure readiness'
    },
    focusAreas: [
      'Operational data collection across departments',
      'ESG indicator and BRSR principle mapping',
      'Evidence alignment and review status',
      'Governance review before disclosure preparation',
      'Executive visibility into gaps and readiness'
    ],
    governanceNotes: [
      'Treat sustainability reporting as an operating control, not an annual compilation exercise.',
      'Link reported indicators to source evidence, responsible owners and review status.',
      'Give leadership a governed view of disclosure gaps, CAPA and evidence confidence.'
    ]
  },
  {
    key: 'fire-life-safety',
    path: '/workflows/fire-life-safety',
    title: 'Fire & Life Safety',
    shortTitle: 'Fire Safety',
    summary: 'Audit, CAPA and readiness tracking workflows.',
    headline: 'Fire & Life Safety Audit Workflow',
    scenario:
      'Industrial and infrastructure facilities can manage readiness verification through NBC clause mapping, inspection execution, deficiency tracking and corrective action verification.',
    steps: [
      'NBC clause mapping',
      'Inspection execution',
      'Deficiency identification',
      'Corrective action management',
      'Closure verification',
      'Readiness tracking'
    ],
    visual: {
      src: '/images/optimized/Campus-Safety-Audit.webp',
      alt: 'SafetyWarden fire and life safety audit execution visual'
    },
    seo: {
      title: 'Fire & Life Safety Audit Workflow | SafetyWarden',
      description:
        'Explore fire and life safety audit workflows for NBC mapping, inspection execution, deficiency tracking, CAPA and readiness verification.',
      keywords:
        'fire safety audit workflow, life safety inspection software, NBC compliance, deficiency tracking, corrective action workflow'
    },
    focusAreas: [
      'NBC and site checklist mapping',
      'Inspection execution with evidence capture',
      'Deficiency identification and prioritization',
      'Corrective action ownership',
      'Closure verification and readiness tracking'
    ],
    governanceNotes: [
      'Convert inspection observations into accountable corrective action workflows.',
      'Maintain traceability from deficiency evidence to closure verification.',
      'Support readiness review across industrial and infrastructure facilities.'
    ]
  },
  {
    key: 'offline-inspections',
    path: '/workflows/offline-inspections',
    title: 'Offline Field Inspections',
    shortTitle: 'Offline Field',
    summary: 'Mobile inspection execution with offline synchronization.',
    headline: 'Offline Field Inspection Workflow',
    scenario:
      'Remote and industrial sites with intermittent connectivity can continue mobile inspections, capture evidence offline and synchronize records back to the central governance platform for review and traceability.',
    steps: [
      'Mobile inspection execution',
      'Offline evidence capture',
      'Synchronization to central platform',
      'Governance review',
      'Reporting and traceability'
    ],
    visual: {
      src: '/images/optimized/safetywarden_digital_audit.webp',
      alt: 'SafetyWarden mobile inspection execution with evidence capture'
    },
    seo: {
      title: 'Offline Field Inspection Workflow | SafetyWarden',
      description:
        'See how SafetyWarden supports offline field inspections, mobile evidence capture, synchronization, governance review and traceable reporting.',
      keywords:
        'offline inspection app, mobile inspection workflow, field inspection software, evidence synchronization, remote site inspections'
    },
    focusAreas: [
      'Mobile inspection execution in field conditions',
      'Offline evidence capture for remote sites',
      'Synchronization to the central platform',
      'Governance review after upload',
      'Traceable reporting across site operations'
    ],
    governanceNotes: [
      'Continue inspection execution when connectivity is intermittent.',
      'Preserve evidence traceability from mobile capture to central review.',
      'Maintain governance continuity across remote and industrial field operations.'
    ]
  }
];

export const getWorkflowByKey = (key: string | undefined) =>
  workflowDetails.find((workflow) => workflow.key === key);
