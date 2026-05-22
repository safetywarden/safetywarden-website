import { Category, Attribute, Product, PriceTier, Vendor } from '../types/marketplace';

export interface ImportResult {
  success: boolean;
  imported: number;
  errors: string[];
}

export class CSVImporter {
  static parseCSV(csvContent: string): string[][] {
    const lines = csvContent.trim().split('\n');
    const result: string[][] = [];
    
    for (const line of lines) {
      // Simple CSV parsing - handles basic cases
      const fields = line.split(',').map(field => field.trim().replace(/^"|"$/g, ''));
      result.push(fields);
    }
    
    return result;
  }

  static importCategories(csvContent: string): ImportResult {
    try {
      const rows = this.parseCSV(csvContent);
      const headers = rows[0];
      const dataRows = rows.slice(1);
      
      const categories: Category[] = [];
      const errors: string[] = [];
      
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        try {
          const category: Category = {
            id: row[0],
            parent_id: row[1] || undefined,
            name: row[2],
            slug: row[3],
            active: true
          };
          
          if (!category.id || !category.name || !category.slug) {
            errors.push(`Row ${i + 2}: Missing required fields`);
            continue;
          }
          
          categories.push(category);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error}`);
        }
      }
      
      // Store in localStorage for demo purposes
      localStorage.setItem('marketplace_categories', JSON.stringify(categories));
      
      return {
        success: true,
        imported: categories.length,
        errors
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${error}`]
      };
    }
  }

  static importAttributes(csvContent: string): ImportResult {
    try {
      const rows = this.parseCSV(csvContent);
      const headers = rows[0];
      const dataRows = rows.slice(1);
      
      const attributes: Attribute[] = [];
      const errors: string[] = [];
      
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        try {
          const attribute: Attribute = {
            attribute_code: row[0],
            name: row[1],
            datatype: row[2] as 'text' | 'number' | 'multiselect',
            unit: row[3] || undefined,
            facet: row[4]?.toLowerCase() === 'true',
            applies_to: row[5] ? row[5].split('|') : []
          };
          
          if (!attribute.attribute_code || !attribute.name || !attribute.datatype) {
            errors.push(`Row ${i + 2}: Missing required fields`);
            continue;
          }
          
          attributes.push(attribute);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error}`);
        }
      }
      
      localStorage.setItem('marketplace_attributes', JSON.stringify(attributes));
      
      return {
        success: true,
        imported: attributes.length,
        errors
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${error}`]
      };
    }
  }

  static importProducts(csvContent: string): ImportResult {
    try {
      const rows = this.parseCSV(csvContent);
      const headers = rows[0];
      const dataRows = rows.slice(1);
      
      const products: Product[] = [];
      const errors: string[] = [];
      
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        try {
          const product: Product = {
            id: `product-${Date.now()}-${i}`,
            vendor_id: 'vendor-1', // Default vendor for demo
            sku: row[0],
            name: row[1],
            brand: row[2],
            category_id: row[3],
            description: row[4],
            uom: row[5],
            mrp: parseFloat(row[6]) || 0,
            tax_rate: parseFloat(row[7]) || 18,
            min_order_qty: parseInt(row[8]) || 1,
            warranty_months: parseInt(row[10]) || 12,
            country_of_origin: row[13],
            hs_code: row[12] || undefined,
            approval_codes: row[11] ? row[11].split('|') : [],
            images: row[14] ? row[14].split('|') : [],
            datasheet_url: row[15] || undefined,
            is_service: row[3]?.includes('services') || false,
            active: true,
            created_at: new Date().toISOString()
          };
          
          if (!product.sku || !product.name || !product.brand) {
            errors.push(`Row ${i + 2}: Missing required fields`);
            continue;
          }
          
          products.push(product);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error}`);
        }
      }
      
      localStorage.setItem('marketplace_products', JSON.stringify(products));
      
      return {
        success: true,
        imported: products.length,
        errors
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${error}`]
      };
    }
  }

  static importPriceTiers(csvContent: string): ImportResult {
    try {
      const rows = this.parseCSV(csvContent);
      const headers = rows[0];
      const dataRows = rows.slice(1);
      
      const priceTiers: PriceTier[] = [];
      const errors: string[] = [];
      
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        try {
          const priceTier: PriceTier = {
            id: `tier-${Date.now()}-${i}`,
            product_id: row[0], // This should match product SKU
            tier_min_qty: parseInt(row[1]) || 1,
            tier_price: parseFloat(row[2]) || 0
          };
          
          if (!priceTier.product_id || !priceTier.tier_price) {
            errors.push(`Row ${i + 2}: Missing required fields`);
            continue;
          }
          
          priceTiers.push(priceTier);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error}`);
        }
      }
      
      localStorage.setItem('marketplace_price_tiers', JSON.stringify(priceTiers));
      
      return {
        success: true,
        imported: priceTiers.length,
        errors
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${error}`]
      };
    }
  }

  static importVendors(csvContent: string): ImportResult {
    try {
      const rows = this.parseCSV(csvContent);
      const headers = rows[0];
      const dataRows = rows.slice(1);
      
      const vendors: Vendor[] = [];
      const errors: string[] = [];
      
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        try {
          const vendor: Vendor = {
            id: row[0] || `vendor-${Date.now()}-${i}`,
            legal_name: row[1],
            gstin: row[2] || undefined,
            pan: row[3] || undefined,
            address: row[4],
            city: row[5],
            state: row[6],
            pin: row[7],
            country: row[8],
            contact_name: row[9],
            contact_email: row[10],
            phone: row[11],
            website: row[12] || undefined,
            approvals_supported: row[13] ? row[13].split('|') : [],
            payout_method: row[14] || 'Bank Transfer',
            upi_id: row[15] || undefined,
            status: (row[16] as 'Pending' | 'Approved' | 'Suspended') || 'Pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          if (!vendor.legal_name || !vendor.contact_email || !vendor.phone) {
            errors.push(`Row ${i + 2}: Missing required fields (legal_name, contact_email, phone)`);
            continue;
          }
          
          vendors.push(vendor);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error}`);
        }
      }
      
      localStorage.setItem('marketplace_vendors', JSON.stringify(vendors));
      
      return {
        success: true,
        imported: vendors.length,
        errors
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${error}`]
      };
    }
  }

  static importRFQs(csvContent: string): ImportResult {
    try {
      const rows = this.parseCSV(csvContent);
      const headers = rows[0];
      const dataRows = rows.slice(1);
      
      const rfqs: RFQ[] = [];
      const errors: string[] = [];
      
      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        try {
          const rfq: RFQ = {
            id: row[0] || `rfq-${Date.now()}-${i}`,
            buyer_id: row[1] || 'buyer-1', // Default buyer for demo
            ref_code: row[2] || `RFQ-${Date.now()}-${i}`,
            city: row[3],
            required_by_date: row[4],
            notes: row[5] || '',
            status: (row[6] as 'Open' | 'Closed' | 'Converted') || 'Open',
            preferred_brands: row[7] ? row[7].split('|') : [],
            attachments: row[8] ? row[8].split('|') : [],
            created_at: new Date().toISOString()
          };
          
          if (!rfq.city || !rfq.required_by_date) {
            errors.push(`Row ${i + 2}: Missing required fields (city, required_by_date)`);
            continue;
          }
          
          rfqs.push(rfq);
        } catch (error) {
          errors.push(`Row ${i + 2}: ${error}`);
        }
      }
      
      localStorage.setItem('marketplace_rfqs', JSON.stringify(rfqs));
      
      return {
        success: true,
        imported: rfqs.length,
        errors
      };
    } catch (error) {
      return {
        success: false,
        imported: 0,
        errors: [`Import failed: ${error}`]
      };
    }
  }

  static getImportedData() {
    return {
      categories: JSON.parse(localStorage.getItem('marketplace_categories') || '[]'),
      attributes: JSON.parse(localStorage.getItem('marketplace_attributes') || '[]'),
      products: JSON.parse(localStorage.getItem('marketplace_products') || '[]'),
      priceTiers: JSON.parse(localStorage.getItem('marketplace_price_tiers') || '[]'),
      vendors: JSON.parse(localStorage.getItem('marketplace_vendors') || '[]'),
      rfqs: JSON.parse(localStorage.getItem('marketplace_rfqs') || '[]')
    };
  }
}