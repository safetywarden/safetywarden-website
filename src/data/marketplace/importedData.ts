import { Category, Attribute, Product, PriceTier } from '../../types/marketplace';
import { Vendor, RFQ } from '../../types/marketplace';

// Categories from CSV
export const importedCategories: Category[] = [
  {
    id: 'CAT-100',
    name: 'Fire Extinguishers',
    slug: 'fire-extinguishers',
    active: true,
    children: [
      {
        id: 'CAT-110',
        parent_id: 'CAT-100',
        name: 'ABC Dry Powder',
        slug: 'abc-dry-powder',
        active: true
      },
      {
        id: 'CAT-111',
        parent_id: 'CAT-100',
        name: 'CO2',
        slug: 'co2-extinguishers',
        active: true
      },
      {
        id: 'CAT-112',
        parent_id: 'CAT-100',
        name: 'Clean Agent (FK-5-1-12)',
        slug: 'clean-agent',
        active: true
      }
    ]
  },
  {
    id: 'CAT-200',
    name: 'Fire Detection & Alarm',
    slug: 'fire-detection-alarm',
    active: true,
    children: [
      {
        id: 'CAT-210',
        parent_id: 'CAT-200',
        name: 'Panels & Repeaters',
        slug: 'panels-repeaters',
        active: true
      },
      {
        id: 'CAT-211',
        parent_id: 'CAT-200',
        name: 'Detectors & Bases',
        slug: 'detectors-bases',
        active: true
      },
      {
        id: 'CAT-212',
        parent_id: 'CAT-200',
        name: 'Manual Call Points',
        slug: 'manual-call-points',
        active: true
      },
      {
        id: 'CAT-213',
        parent_id: 'CAT-200',
        name: 'Sounders & Strobes',
        slug: 'sounders-strobes',
        active: true
      }
    ]
  },
  {
    id: 'CAT-300',
    name: 'Sprinkler & Hydrant',
    slug: 'sprinkler-hydrant',
    active: true,
    children: [
      {
        id: 'CAT-310',
        parent_id: 'CAT-300',
        name: 'Sprinkler Heads & Spares',
        slug: 'sprinkler-heads',
        active: true
      },
      {
        id: 'CAT-311',
        parent_id: 'CAT-300',
        name: 'Valves (Alarm/PRV/NRV)',
        slug: 'sprinkler-valves',
        active: true
      },
      {
        id: 'CAT-312',
        parent_id: 'CAT-300',
        name: 'Hydrant Valves & Hoses',
        slug: 'hydrant-valves-hoses',
        active: true
      }
    ]
  },
  {
    id: 'CAT-400',
    name: 'Emergency Lighting & Signage',
    slug: 'emergency-lighting-signage',
    active: true
  },
  {
    id: 'CAT-500',
    name: 'PPE & Rescue',
    slug: 'ppe-rescue',
    active: true
  },
  {
    id: 'CAT-600',
    name: 'Services',
    slug: 'services',
    active: true,
    children: [
      {
        id: 'CAT-610',
        parent_id: 'CAT-600',
        name: 'Training & Certification',
        slug: 'training-certification',
        active: true
      },
      {
        id: 'CAT-611',
        parent_id: 'CAT-600',
        name: 'Audits & Risk Assessment',
        slug: 'audits-risk-assessment',
        active: true
      },
      {
        id: 'CAT-612',
        parent_id: 'CAT-600',
        name: 'Installation & AMC',
        slug: 'installation-amc',
        active: true
      }
    ]
  }
];

// Attributes from CSV
export const importedAttributes: Attribute[] = [
  {
    attribute_code: 'approval',
    name: 'Approvals',
    datatype: 'multiselect',
    facet: true,
    applies_to: ['CAT-100', 'CAT-200', 'CAT-300', 'CAT-400', 'CAT-500']
  },
  {
    attribute_code: 'capacity',
    name: 'Capacity',
    datatype: 'number',
    unit: 'kg/L',
    facet: true,
    applies_to: ['CAT-100']
  },
  {
    attribute_code: 'rating_class',
    name: 'Rating Class',
    datatype: 'text',
    facet: true,
    applies_to: ['CAT-100']
  },
  {
    attribute_code: 'thread_size',
    name: 'Thread/Size',
    datatype: 'text',
    facet: true,
    applies_to: ['CAT-300']
  },
  {
    attribute_code: 'material',
    name: 'Material',
    datatype: 'text',
    facet: true,
    applies_to: ['CAT-300', 'CAT-400']
  },
  {
    attribute_code: 'voltage',
    name: 'Voltage',
    datatype: 'number',
    unit: 'V',
    facet: true,
    applies_to: ['CAT-400']
  },
  {
    attribute_code: 'brand',
    name: 'Brand',
    datatype: 'text',
    facet: true,
    applies_to: ['ALL']
  },
  {
    attribute_code: 'lead_time',
    name: 'Lead Time',
    datatype: 'number',
    unit: 'days',
    facet: true,
    applies_to: ['ALL']
  },
  {
    attribute_code: 'origin',
    name: 'Country of Origin',
    datatype: 'text',
    facet: true,
    applies_to: ['ALL']
  },
  {
    attribute_code: 'warranty',
    name: 'Warranty',
    datatype: 'number',
    unit: 'months',
    facet: false,
    applies_to: ['ALL']
  }
];

// Products from CSV template
export const importedProducts: Product[] = [
  {
    id: 'product-abc-6kg-ul',
    vendor_id: 'vendor-1',
    sku: 'ABC-6KG-UL',
    name: 'ABC Dry Powder Extinguisher 6kg',
    brand: 'BrandX',
    category_id: 'CAT-110',
    description: '6kg ABC powder fire extinguisher with pressure gauge and wall bracket.',
    uom: 'unit',
    mrp: 2450,
    tax_rate: 18,
    min_order_qty: 2,
    warranty_months: 24,
    country_of_origin: 'IN',
    hs_code: '84241000',
    approval_codes: ['UL', 'ISI'],
    images: [
      'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    datasheet_url: '/datasheets/abc-6kg-ul.pdf',
    is_service: false,
    active: true,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'product-co2-4-5kg-isi',
    vendor_id: 'vendor-2',
    sku: 'CO2-4.5KG-ISI',
    name: 'CO2 Fire Extinguisher 4.5kg',
    brand: 'BrandY',
    category_id: 'CAT-111',
    description: '4.5kg CO2 extinguisher with horn; suitable for electrical fires.',
    uom: 'unit',
    mrp: 3550,
    tax_rate: 18,
    min_order_qty: 1,
    warranty_months: 12,
    country_of_origin: 'IN',
    hs_code: '84241000',
    approval_codes: ['ISI'],
    images: [
      'https://images.pexels.com/photos/6195126/pexels-photo-6195126.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    datasheet_url: '/datasheets/co2-4-5kg-isi.pdf',
    is_service: false,
    active: true,
    created_at: '2024-01-16T10:00:00Z'
  }
];

// Price Tiers from CSV
export const importedPriceTiers: PriceTier[] = [
  {
    id: 'tier-abc-6kg-1',
    product_id: 'ABC-6KG-UL',
    tier_min_qty: 1,
    tier_price: 2450
  },
  {
    id: 'tier-abc-6kg-10',
    product_id: 'ABC-6KG-UL',
    tier_min_qty: 10,
    tier_price: 2325
  },
  {
    id: 'tier-abc-6kg-25',
    product_id: 'ABC-6KG-UL',
    tier_min_qty: 25,
    tier_price: 2250
  },
  {
    id: 'tier-co2-4-5kg-1',
    product_id: 'CO2-4.5KG-ISI',
    tier_min_qty: 1,
    tier_price: 3550
  },
  {
    id: 'tier-co2-4-5kg-10',
    product_id: 'CO2-4.5KG-ISI',
    tier_min_qty: 10,
    tier_price: 3390
  }
];

// Vendors from CSV
export const importedVendors: Vendor[] = [
  {
    id: 'vendor-1',
    legal_name: 'FireTech Solutions Pvt Ltd',
    gstin: '29ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    address: '123 Industrial Area, Phase 1',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin: '560001',
    country: 'India',
    contact_name: 'Rajesh Kumar',
    contact_email: 'rajesh@firetech.com',
    phone: '+91-9876543210',
    website: 'https://firetech.com',
    approvals_supported: ['UL', 'FM', 'ISI'],
    payout_method: 'Bank Transfer',
    status: 'Approved',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'vendor-2',
    legal_name: 'SafeGuard Equipment LLC',
    address: '456 Safety Street, Business Bay',
    city: 'Dubai',
    state: 'Dubai',
    pin: '00000',
    country: 'UAE',
    contact_name: 'Ahmed Al-Rashid',
    contact_email: 'ahmed@safeguard.ae',
    phone: '+971-50-1234567',
    website: 'https://safeguard.ae',
    approvals_supported: ['UL', 'FM', 'SASO'],
    payout_method: 'Bank Transfer',
    status: 'Approved',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'vendor-3',
    legal_name: 'Emergency Systems India',
    gstin: '27FGHIJ5678K2L9',
    pan: 'FGHIJ5678K',
    address: '789 Tech Park, Sector 5',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400001',
    country: 'India',
    contact_name: 'Priya Sharma',
    contact_email: 'priya@emergencysystems.in',
    phone: '+91-9123456789',
    approvals_supported: ['ISI', 'BIS', 'PESO'],
    payout_method: 'UPI',
    upi_id: 'emergencysystems@paytm',
    status: 'Approved',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z'
  }
];

// RFQs from CSV
export const importedRFQs: RFQ[] = [
  {
    id: 'rfq-1',
    buyer_id: 'buyer-1',
    ref_code: 'RFQ-2024-001',
    city: 'Bengaluru',
    required_by_date: '2024-03-15',
    notes: 'Required for new office building. Please include installation charges.',
    status: 'Open',
    preferred_brands: ['FireTech', 'SafeGuard'],
    attachments: [],
    created_at: '2024-02-15T10:00:00Z'
  },
  {
    id: 'rfq-2',
    buyer_id: 'buyer-2',
    ref_code: 'RFQ-2024-002',
    city: 'Mumbai',
    required_by_date: '2024-03-20',
    notes: 'Bulk requirement for manufacturing facility.',
    status: 'Open',
    preferred_brands: [],
    attachments: [],
    created_at: '2024-02-18T10:00:00Z'
  }
];

// Helper functions to get imported data
export const getImportedCategories = (): Category[] => {
  return importedCategories;
};

export const getImportedAttributes = (): Attribute[] => {
  return importedAttributes;
};

export const getImportedProducts = (): Product[] => {
  return importedProducts;
};

export const getImportedPriceTiers = (): PriceTier[] => {
  return importedPriceTiers;
};

export const getImportedVendors = (): Vendor[] => {
  return importedVendors;
};

export const getImportedRFQs = (): RFQ[] => {
  return importedRFQs;
};

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
  return findCategory(importedCategories);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return importedProducts.filter(product => product.category_id === categoryId);
};

export const getPriceTiersForProduct = (productId: string): PriceTier[] => {
  return importedPriceTiers.filter(tier => tier.product_id === productId);
};