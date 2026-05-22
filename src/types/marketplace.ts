// Marketplace Types
export interface Vendor {
  id: string;
  legal_name: string;
  gstin?: string;
  pan?: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  contact_name: string;
  contact_email: string;
  phone: string;
  website?: string;
  approvals_supported: string[];
  payout_method?: string;
  upi_id?: string;
  status: 'Pending' | 'Approved' | 'Suspended';
  created_at: string;
  updated_at: string;
}

export interface VendorUser {
  user_id: string;
  vendor_id: string;
  role: 'Admin' | 'Sales' | 'Ops';
}

export interface Buyer {
  id: string;
  org_name: string;
  billing_email: string;
  city: string;
  country: string;
  created_at: string;
}

export interface Category {
  id: string;
  parent_id?: string;
  name: string;
  slug: string;
  active: boolean;
  children?: Category[];
}

export interface Attribute {
  attribute_code: string;
  name: string;
  datatype: 'text' | 'number' | 'multiselect';
  unit?: string;
  facet: boolean;
  applies_to: string[];
}

export interface Product {
  id: string;
  vendor_id: string;
  sku: string;
  name: string;
  brand: string;
  category_id: string;
  description: string;
  uom: string;
  mrp: number;
  tax_rate: number;
  min_order_qty: number;
  warranty_months?: number;
  country_of_origin: string;
  hs_code?: string;
  approval_codes: string[];
  images: string[];
  datasheet_url?: string;
  is_service: boolean;
  active: boolean;
  created_at: string;
  vendor?: Vendor;
  category?: Category;
}

export interface ProductAttribute {
  product_id: string;
  attribute_code: string;
  value: string;
}

export interface Inventory {
  product_id: string;
  qty: number;
  lead_time_days: number;
}

export interface PriceTier {
  id: string;
  product_id: string;
  tier_min_qty: number;
  tier_price: number;
}

export interface RFQ {
  id: string;
  buyer_id: string;
  ref_code: string;
  city: string;
  required_by_date: string;
  notes?: string;
  status: 'Open' | 'Closed' | 'Converted';
  preferred_brands: string[];
  attachments: string[];
  created_at: string;
  items?: RFQItem[];
  quotes?: Quote[];
}

export interface RFQItem {
  id: string;
  rfq_id: string;
  product_id?: string;
  category_id: string;
  item_desc: string;
  qty: number;
  unit: string;
  product?: Product;
  category?: Category;
}

export interface Quote {
  id: string;
  rfq_id: string;
  vendor_id: string;
  validity_date: string;
  lead_time_days: number;
  shipping_terms: string;
  payment_terms: string;
  quote_total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
  created_at: string;
  vendor?: Vendor;
  items?: QuoteItem[];
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  rfq_item_id: string;
  product_id?: string;
  unit_price: number;
  qty: number;
  tax_rate: number;
  line_total: number;
  product?: Product;
}

export interface Order {
  id: string;
  buyer_id: string;
  vendor_id: string;
  source: 'BuyNow' | 'Quote';
  po_number?: string;
  status: 'New' | 'Acknowledged' | 'Dispatched' | 'Delivered' | 'Closed';
  shipping_address: string;
  billing_address: string;
  order_total: number;
  created_at: string;
  vendor?: Vendor;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  qty: number;
  price: number;
  tax_rate: number;
  line_total: number;
  product?: Product;
}

export interface Lead {
  id: string;
  category_id: string;
  city: string;
  details: string;
  buyer_contact: string;
  routed_vendors: string[];
  fee_status: 'Pending' | 'Paid';
  created_at: string;
  category?: Category;
}

export interface Review {
  id: string;
  vendor_id?: string;
  product_id?: string;
  buyer_id: string;
  rating: number;
  comment: string;
  status: 'Pending' | 'Published';
  created_at: string;
}

export interface Dispute {
  id: string;
  order_id: string;
  raised_by: string;
  reason: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_at: string;
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  approvals?: string[];
  price_min?: number;
  price_max?: number;
  lead_time_max?: number;
  country_of_origin?: string;
  query?: string;
}

export interface MarketplaceStats {
  total_vendors: number;
  total_products: number;
  active_rfqs: number;
  pending_quotes: number;
  monthly_orders: number;
  revenue: number;
}