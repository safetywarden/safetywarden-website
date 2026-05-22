import { RobotPlan, TechSpec, FAQItem, OnboardingStep } from '../types/robots';

export const robotPlans: RobotPlan[] = [
  {
    name: 'Starter',
    description: 'Essential robot surveillance for single-site deployment',
    features: [
      '1 robot (Warden-S or Warden-F)',
      'Dock installation & mapping',
      '1 integration (ONVIF or webhook)',
      'Weekly KPI email reports',
      '14-day data retention',
      '8×5 support coverage'
    ]
  },
  {
    name: 'Pro',
    description: 'Advanced deployment with priority support and extended features',
    features: [
      'Everything in Starter',
      'Priority replacement SLA',
      'Additional integrations',
      'Extended retention (30–60 days)',
      '24×7 support coverage',
      'Custom workflow configuration'
    ],
    addOns: [
      'LPR (License Plate Recognition) for Warden-S',
      'Gas bay monitoring for Warden-F',
      'Extra docks & helmet sensors',
      'On-premises storage bridge'
    ]
  }
];

export const wardenSTechSpecs: TechSpec[] = [
  { category: 'Chassis', specification: '4-wheel rover, auto-dock (2–3 h), runtime 6–8 h' },
  { category: 'Compute', specification: 'Jetson-class edge GPU, encrypted storage, signed OTA' },
  { category: 'Sensors', specification: 'PTZ 20–25×, depth camera, 2D LiDAR; optional overhead helmet puck' },
  { category: 'Autonomy', specification: 'V-SLAM, obstacle avoidance, geo-fences, return-to-dock' },
  { category: 'Connectivity', specification: 'Wi-Fi + 4G/5G, TLS 1.3, SSO, audit logs' },
  { category: 'Privacy', specification: 'Face-blur at rest, configurable retention, role-based access' }
];

export const wardenFTechSpecs: TechSpec[] = [
  { category: 'Chassis', specification: '4-wheel rover, auto-dock (2–3 h), runtime 4–6 h (with thermal)' },
  { category: 'Compute', specification: 'Jetson-class edge GPU, encrypted storage, signed OTA' },
  { category: 'Sensors', specification: 'Radiometric thermal (320–640 px) + PTZ, high-temp beacons' },
  { category: 'Autonomy', specification: 'V-SLAM, obstacle avoidance, geo-fences, return-to-dock' },
  { category: 'Connectivity', specification: 'Wi-Fi + 4G/5G, TLS 1.3, SSO, audit logs' },
  { category: 'Integration', specification: 'Read-only FACP/BMS gateway (for context), ONVIF/RTSP' }
];

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    title: 'Site Survey',
    duration: 'Week 0–1',
    description: 'Our team visits your site to assess layout, coverage areas, and integration requirements'
  },
  {
    step: 2,
    title: 'BOM Freeze & Order',
    duration: 'Week 1–2',
    description: 'Finalize bill of materials and place hardware orders based on site requirements'
  },
  {
    step: 3,
    title: 'Build & Bench',
    duration: 'Week 3–5',
    description: 'Robot assembly, software configuration, and comprehensive testing in our facility'
  },
  {
    step: 4,
    title: 'Install & Mapping',
    duration: 'Week 6–7',
    description: 'On-site installation, dock setup, and initial mapping of patrol routes'
  },
  {
    step: 5,
    title: 'Soft Launch',
    duration: 'Week 8–9',
    description: 'Limited deployment with operator training and workflow refinement'
  },
  {
    step: 6,
    title: 'Go-Live',
    duration: 'Week 10–12',
    description: 'Full deployment with monitoring, reporting, and ongoing support activation'
  }
];

export const robotFAQs: FAQItem[] = [
  {
    question: 'Will it replace my guards?',
    answer: 'No. It amplifies coverage and provides verifiable evidence; humans still decide.',
    category: 'general'
  },
  {
    question: 'How does night performance work?',
    answer: 'Yes; PTZ with IR/spotlight (Warden-S) and radiometric thermal (Warden-F).',
    category: 'general'
  },
  {
    question: 'What if someone blocks or lifts it?',
    answer: 'Tamper/lift detection → alert + siren + evidence pack.',
    category: 'general'
  },
  {
    question: 'How do you integrate with existing systems?',
    answer: 'ONVIF/RTSP to VMS, webhooks to Teams/Slack/WhatsApp; read-only FACP/BMS (Warden-F).',
    category: 'general'
  },
  {
    question: 'What are the power and network requirements?',
    answer: '230V for dock; Wi-Fi preferred + 4G/5G fallback.',
    category: 'general'
  },
  {
    question: 'Why no prices online?',
    answer: 'Sites vary; we send accurate quotes in 1 business day.',
    category: 'pricing'
  },
  {
    question: 'Can I get a ballpark estimate?',
    answer: 'Share the quote form; we\'ll reply with options.',
    category: 'pricing'
  },
  {
    question: 'How do you handle data privacy?',
    answer: 'Face/plate blur at rest, configurable retention, role-based access, audit logs; India region by default; on-prem bridge optional.',
    category: 'privacy'
  }
];

export const wardenSFeatures = [
  'PPE rule engine (helmet, vest, goggles, mask, gloves, shoes, ear-pro) by zone',
  'Gate allow/deny via webhook (turnstiles/badge) with visitor overrides',
  'Spot-checks while roaming; log repeats only (low friction)',
  'Evidence packs: video snapshots + route + operator notes'
];

export const wardenSRoles = [
  'Gate screening with grace window & prompts',
  'Floor safety surveillance; talk-down on breaches',
  'Guard-tour checkpoints (QR/NFC) for compliance proof',
  'Weekly KPI reports to HSE (compliance %, time-to-correct)'
];

export const wardenFFeatures = [
  'Thermal rounds in MCC/DB/UPS/battery rooms with baseline trends',
  'Hot-work watch with threshold curves; audible cues & auto-bookmark',
  'Alarm verification: verify with thermal/visual and push clips',
  'Evidence packs: thermal + visible frames + route map'
];

export const wardenFRoles = [
  'Thermal electrical rounds & trend deviations',
  'Hot-work supervision & logging',
  'Evac prompts and route marking during drills/incidents',
  'Weekly HSE reports (hot-spot counts, repair lead time)'
];

export const rentalIncludes = [
  'Robot, dock, mapping, setup',
  'Updates & threshold tuning',
  'Weekly KPI email reports',
  'Break/fix with field replacement (per SLA)',
  'Operator training and support'
];