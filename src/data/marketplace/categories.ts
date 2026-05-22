import { Category } from '../../types/marketplace';

export const categories: Category[] = [
  {
    id: 'fire-safety',
    name: 'Fire Safety Equipment',
    slug: 'fire-safety',
    active: true,
    children: [
      {
        id: 'fire-extinguishers',
        parent_id: 'fire-safety',
        name: 'Fire Extinguishers',
        slug: 'fire-extinguishers',
        active: true
      },
      {
        id: 'fire-alarms',
        parent_id: 'fire-safety',
        name: 'Fire Alarm Systems',
        slug: 'fire-alarms',
        active: true
      },
      {
        id: 'sprinkler-systems',
        parent_id: 'fire-safety',
        name: 'Sprinkler Systems',
        slug: 'sprinkler-systems',
        active: true
      },
      {
        id: 'fire-doors',
        parent_id: 'fire-safety',
        name: 'Fire Doors & Hardware',
        slug: 'fire-doors',
        active: true
      }
    ]
  },
  {
    id: 'emergency-lighting',
    name: 'Emergency Lighting',
    slug: 'emergency-lighting',
    active: true,
    children: [
      {
        id: 'exit-signs',
        parent_id: 'emergency-lighting',
        name: 'Exit Signs',
        slug: 'exit-signs',
        active: true
      },
      {
        id: 'emergency-lights',
        parent_id: 'emergency-lighting',
        name: 'Emergency Lights',
        slug: 'emergency-lights',
        active: true
      }
    ]
  },
  {
    id: 'safety-signage',
    name: 'Safety Signage',
    slug: 'safety-signage',
    active: true,
    children: [
      {
        id: 'evacuation-signs',
        parent_id: 'safety-signage',
        name: 'Evacuation Signs',
        slug: 'evacuation-signs',
        active: true
      },
      {
        id: 'warning-signs',
        parent_id: 'safety-signage',
        name: 'Warning Signs',
        slug: 'warning-signs',
        active: true
      }
    ]
  },
  {
    id: 'ppe',
    name: 'Personal Protective Equipment',
    slug: 'ppe',
    active: true,
    children: [
      {
        id: 'safety-helmets',
        parent_id: 'ppe',
        name: 'Safety Helmets',
        slug: 'safety-helmets',
        active: true
      },
      {
        id: 'safety-shoes',
        parent_id: 'ppe',
        name: 'Safety Shoes',
        slug: 'safety-shoes',
        active: true
      },
      {
        id: 'safety-gloves',
        parent_id: 'ppe',
        name: 'Safety Gloves',
        slug: 'safety-gloves',
        active: true
      }
    ]
  },
  {
    id: 'services',
    name: 'Safety Services',
    slug: 'services',
    active: true,
    children: [
      {
        id: 'fire-audit',
        parent_id: 'services',
        name: 'Fire Safety Audit',
        slug: 'fire-audit',
        active: true
      },
      {
        id: 'training-services',
        parent_id: 'services',
        name: 'Training Services',
        slug: 'training-services',
        active: true
      },
      {
        id: 'maintenance',
        parent_id: 'services',
        name: 'Equipment Maintenance',
        slug: 'maintenance',
        active: true
      }
    ]
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  const findCategory = (cats: Category[]): Category | undefined => {
    for (const cat of cats) {
      if (cat.id === id) return cat;
      if (cat.children) {
        const found = findCategory(cat.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findCategory(categories);
};

export const getAllCategories = (): Category[] => {
  const flatten = (cats: Category[]): Category[] => {
    let result: Category[] = [];
    for (const cat of cats) {
      result.push(cat);
      if (cat.children) {
        result = result.concat(flatten(cat.children));
      }
    }
    return result;
  };
  return flatten(categories);
};