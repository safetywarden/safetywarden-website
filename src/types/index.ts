export interface Solution {
  id: string;
  title: string;
  description: string;
  features: string[];
  cta: {
    primary: string;
    secondary: string;
  };
  pricing?: string;
  icon: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  painPoints: string[];
  features: string[];
  caseStudy: {
    title: string;
    metrics: string;
  };
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  employees?: string;
  message?: string;
  bookDemo?: boolean;
  consent: boolean;
}