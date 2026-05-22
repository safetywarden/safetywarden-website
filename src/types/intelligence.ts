export type IntelligenceCategory =
  | 'Safety & Fire'
  | 'EHS & Occupational Safety'
  | 'ESG & Sustainability'
  | 'Pollution Control'
  | 'Climate & Environmental Risk';

export type SourceType =
  | 'Incident'
  | 'Regulation'
  | 'Enforcement'
  | 'Climate'
  | 'Insight';

export type SeverityLevel = 'Low' | 'Medium' | 'High';

export interface IntelligenceEntry {
  id: string;
  title: string;
  slug: string;
  category: IntelligenceCategory;
  source_type: SourceType;
  source_link?: string;
  publish_date: string;
  short_summary: string;
  safetywarden_insight: string;
  risk_tags: string[];
  geography?: string;
  severity_level?: SeverityLevel;
  featured_image?: string;
  seo_meta_title?: string;
  seo_meta_description?: string;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryInfo {
  name: IntelligenceCategory;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export const INTELLIGENCE_CATEGORIES: CategoryInfo[] = [
  {
    name: 'Safety & Fire',
    slug: 'safety-fire',
    description: 'Fire safety incidents, regulations, and enforcement actions',
    icon: 'Flame',
    color: 'orange'
  },
  {
    name: 'EHS & Occupational Safety',
    slug: 'ehs',
    description: 'Workplace health, safety incidents, and occupational hazards',
    icon: 'Shield',
    color: 'blue'
  },
  {
    name: 'ESG & Sustainability',
    slug: 'esg',
    description: 'Environmental, social, and governance compliance',
    icon: 'Leaf',
    color: 'green'
  },
  {
    name: 'Pollution Control',
    slug: 'pollution-control',
    description: 'CPCB/SPCB enforcement, air/water quality violations',
    icon: 'Droplet',
    color: 'teal'
  },
  {
    name: 'Climate & Environmental Risk',
    slug: 'climate',
    description: 'Climate change impacts, environmental risks, adaptation',
    icon: 'Cloud',
    color: 'slate'
  }
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return INTELLIGENCE_CATEGORIES.find(cat => cat.slug === slug);
}

export function getCategorySlug(category: IntelligenceCategory): string {
  const info = INTELLIGENCE_CATEGORIES.find(cat => cat.name === category);
  return info?.slug || '';
}
