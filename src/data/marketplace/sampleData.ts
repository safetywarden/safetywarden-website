import { Product, Quote } from '../../types/marketplace';

export const sampleProducts: Product[] = [
  {
    id: 'product-1',
    vendor_id: 'vendor-1',
    sku: 'FT-ABC-6KG',
    name: 'ABC Dry Powder Fire Extinguisher 6kg',
    brand: 'FireTech',
    category_id: 'fire-extinguishers',
    description: 'High-quality ABC dry powder fire extinguisher suitable for Class A, B, and C fires. ISI marked with 5-year warranty.',
    uom: 'piece',
    mrp: 2500,
    tax_rate: 18,
    min_order_qty: 10,
    warranty_months: 60,
    country_of_origin: 'India',
    hs_code: '84241000',
    approval_codes: ['ISI', 'BIS'],
    images: [
      'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/6195126/pexels-photo-6195126.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    datasheet_url: '/datasheets/ft-abc-6kg.pdf',
    is_service: false,
    active: true,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'product-2',
    vendor_id: 'vendor-2',
    sku: 'SG-LED-EXIT-001',
    name: 'LED Emergency Exit Sign with Battery Backup',
    brand: 'SafeGuard',
    category_id: 'exit-signs',
    description: 'Energy-efficient LED exit sign with 3-hour battery backup. Suitable for commercial and industrial applications.',
    uom: 'piece',
    mrp: 1200,
    tax_rate: 5,
    min_order_qty: 5,
    warranty_months: 24,
    country_of_origin: 'UAE',
    approval_codes: ['UL', 'CE'],
    images: [
      'https://images.pexels.com/photos/6195130/pexels-photo-6195130.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    is_service: false,
    active: true,
    created_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'product-3',
    vendor_id: 'vendor-3',
    sku: 'ES-HELMET-WHITE',
    name: 'Industrial Safety Helmet - White',
    brand: 'Emergency Systems',
    category_id: 'safety-helmets',
    description: 'High-impact ABS safety helmet with adjustable suspension. Meets IS 2925 standards.',
    uom: 'piece',
    mrp: 350,
    tax_rate: 12,
    min_order_qty: 50,
    warranty_months: 12,
    country_of_origin: 'India',
    approval_codes: ['ISI'],
    images: [
      'https://images.pexels.com/photos/6195135/pexels-photo-6195135.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    is_service: false,
    active: true,
    created_at: '2024-02-01T10:00:00Z'
  },
  {
    id: 'service-1',
    vendor_id: 'vendor-1',
    sku: 'FT-AUDIT-COMPREHENSIVE',
    name: 'Comprehensive Fire Safety Audit',
    brand: 'FireTech',
    category_id: 'fire-audit',
    description: 'Complete fire safety audit including NBC compliance check, risk assessment, and detailed report with recommendations.',
    uom: 'audit',
    mrp: 25000,
    tax_rate: 18,
    min_order_qty: 1,
    country_of_origin: 'India',
    approval_codes: [],
    images: [
      'https://images.pexels.com/photos/6195140/pexels-photo-6195140.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    is_service: true,
    active: true,
    created_at: '2024-01-15T10:00:00Z'
  }
];

export const sampleQuotes: Quote[] = [
  {
    id: 'quote-1',
    rfq_id: 'rfq-1',
    vendor_id: 'vendor-1',
    validity_date: '2024-03-01',
    lead_time_days: 7,
    shipping_terms: 'FOB Bengaluru',
    payment_terms: '30 days NET',
    quote_total: 125000,
    status: 'Sent',
    created_at: '2024-02-16T10:00:00Z'
  }
];