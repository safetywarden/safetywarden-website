// Robots-as-a-Service Types

export interface RobotPlan {
  name: string;
  description: string;
  features: string[];
  addOns?: string[];
}

export interface TechSpec {
  category: string;
  specification: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'privacy';
}

export interface QuoteFormData {
  company: string;
  city: string;
  siteType: string;
  areaToCover: string;
  patrolHours: string;
  primaryGoal: string;
  existingSystems: string;
  timeline: string;
  contactName: string;
  email: string;
  whatsappNumber: string;
  consent: boolean;
}

export interface OnboardingStep {
  step: number;
  title: string;
  duration: string;
  description: string;
}