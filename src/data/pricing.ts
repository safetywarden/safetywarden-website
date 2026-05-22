import { PricingTier } from '../types';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 9900,
    period: 'month',
    features: [
      '1 site location',
      '50 users included',
      'Self-Audit Platform access',
      'Digital warden certificates',
      'Basic drill documentation',
      'Email support',
      'Basic compliance reports',
      'Mobile app access'
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Growth',
    price: 29900,
    period: 'month',
    popular: true,
    features: [
      '3 site locations',
      '250 users included', 
      'All Starter features',
      'Real-time Drill Management App',
      'Incident Reporting & Analytics',
      'Priority email support',
      'Advanced analytics dashboard',
      'Custom compliance reports',
      'LMS/HRIS integration',
      'Multi-language support'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Enterprise',
    price: 0,
    period: 'Custom pricing',
    features: [
      'Unlimited sites & users',
      'All Growth features',
      'SSO integration (SAML/OAuth)',
      'Custom integrations & APIs',
      'Dedicated account manager',
      '24/7 priority support',
      'Custom training modules',
      'White-label options',
      'Advanced security features',
      'Custom compliance workflows',
      'Onsite training & setup'
    ],
    cta: 'Contact Sales'
  }
];

export const trainingPacks = [
  {
    name: 'Starter Pack',
    trainees: 50,
    priceINR: 25000,
    priceUSD: 300,
    perTraineeINR: 500,
    perTraineeUSD: 6
  },
  {
    name: 'Growth Pack', 
    trainees: 100,
    priceINR: 40000,
    priceUSD: 480,
    perTraineeINR: 400,
    perTraineeUSD: 4.8,
    popular: true
  },
  {
    name: 'Enterprise Pack',
    trainees: 250,
    priceINR: 75000,
    priceUSD: 900,
    perTraineeINR: 300,
    perTraineeUSD: 3.6
  }
];

export const outsourcingPricing = [
  {
    name: 'Full-time Onsite',
    description: '8-hour daily coverage with dedicated warden',
    priceINR: 45000,
    priceUSD: 540,
    period: 'month per warden',
    features: [
      '8-hour daily coverage',
      'Drill coordination',
      'Visitor briefings', 
      'Incident response',
      'Monthly reporting',
      'Emergency response'
    ]
  },
  {
    name: 'Part-time Coverage',
    description: 'Peak hours coverage and scheduled support',
    priceINR: 25000,
    priceUSD: 300,
    period: 'month per site',
    features: [
      'Peak hours coverage',
      'Scheduled drills',
      'Training support',
      'Emergency response',
      'Compliance documentation',
      'Flexible scheduling'
    ],
    popular: true
  },
  {
    name: 'On-call Service',
    description: 'Event-based coverage and emergency response',
    priceINR: 0,
    priceUSD: 0,
    period: 'per event',
    features: [
      'Event-based coverage',
      'Emergency drills',
      'Audit support',
      'Training events',
      'Flexible scheduling',
      'Custom requirements'
    ]
  }
];