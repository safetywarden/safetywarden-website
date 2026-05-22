import { Affiliate, AffiliateLink, Coupon } from '../types/training';

export interface AffiliateImportResult {
  success: boolean;
  imported: number;
  errors: string[];
}

export class AffiliateParser {
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

  static parseExcelAffiliateData(excelData: any[][]): {
    affiliates: Partial<Affiliate>[];
    links: Partial<AffiliateLink>[];
    coupons: Partial<Coupon>[];
  } {
    const affiliates: Partial<Affiliate>[] = [];
    const links: Partial<AffiliateLink>[] = [];
    const coupons: Partial<Coupon>[] = [];

    // Find sheet data by looking for specific headers
    let currentSheet = '';
    let headerRow = -1;
    let headers: string[] = [];

    for (let i = 0; i < excelData.length; i++) {
      const row = excelData[i];
      if (!row || row.length === 0) continue;

      const firstCell = row[0]?.toString().toLowerCase() || '';
      
      // Detect sheet sections
      if (firstCell.includes('affiliate') && firstCell.includes('partner')) {
        currentSheet = 'affiliates';
        headerRow = -1;
        continue;
      } else if (firstCell.includes('tracking') && firstCell.includes('link')) {
        currentSheet = 'links';
        headerRow = -1;
        continue;
      } else if (firstCell.includes('coupon') || firstCell.includes('promo')) {
        currentSheet = 'coupons';
        headerRow = -1;
        continue;
      }

      // Find header row for current sheet
      if (headerRow === -1 && row.some(cell => 
        typeof cell === 'string' && 
        (cell.toLowerCase().includes('name') || 
         cell.toLowerCase().includes('email') ||
         cell.toLowerCase().includes('code'))
      )) {
        headerRow = i;
        headers = row.map(h => typeof h === 'string' ? h.toLowerCase().trim() : '');
        continue;
      }

      // Parse data rows
      if (headerRow !== -1 && i > headerRow && currentSheet) {
        try {
          if (currentSheet === 'affiliates') {
            const affiliate = this.parseAffiliateRow(row, headers);
            if (affiliate) affiliates.push(affiliate);
          } else if (currentSheet === 'links') {
            const link = this.parseLinkRow(row, headers);
            if (link) links.push(link);
          } else if (currentSheet === 'coupons') {
            const coupon = this.parseCouponRow(row, headers);
            if (coupon) coupons.push(coupon);
          }
        } catch (error) {
          console.warn(`Error parsing row ${i + 1}:`, error);
        }
      }
    }

    return { affiliates, links, coupons };
  }

  private static parseAffiliateRow(row: any[], headers: string[]): Partial<Affiliate> | null {
    const getValue = (searchTerms: string[], defaultValue: any = '') => {
      for (const term of searchTerms) {
        const index = headers.findIndex(h => h.includes(term));
        if (index !== -1 && row[index] !== undefined) {
          return row[index];
        }
      }
      return defaultValue;
    };

    const name = getValue(['name', 'partner name', 'affiliate name']);
    const email = getValue(['email', 'contact email']);
    
    if (!name || !email) return null;

    return {
      name: name.toString().trim(),
      email: email.toString().trim(),
      phone: getValue(['phone', 'mobile', 'contact']).toString().trim() || '+91-9876543210',
      company: getValue(['company', 'organization']).toString().trim(),
      address: getValue(['address', 'location']).toString().trim() || 'Not provided',
      city: getValue(['city']).toString().trim() || 'Bengaluru',
      state: getValue(['state']).toString().trim() || 'Karnataka',
      country: getValue(['country']).toString().trim() || 'India',
      commission_saas_percent: parseFloat(getValue(['saas commission', 'saas %'], 10)) || 10,
      commission_training_percent: parseFloat(getValue(['training commission', 'training %'], 15)) || 15,
      lead_bounty_amount: parseFloat(getValue(['lead bounty', 'bounty'], 500)) || 500,
      payout_method: getValue(['payout method'], 'Bank Transfer').toString(),
      bank_details: getValue(['bank details', 'account']).toString().trim(),
      upi_id: getValue(['upi', 'upi id']).toString().trim(),
      status: 'Active'
    };
  }

  private static parseLinkRow(row: any[], headers: string[]): Partial<AffiliateLink> | null {
    const getValue = (searchTerms: string[], defaultValue: any = '') => {
      for (const term of searchTerms) {
        const index = headers.findIndex(h => h.includes(term));
        if (index !== -1 && row[index] !== undefined) {
          return row[index];
        }
      }
      return defaultValue;
    };

    const linkCode = getValue(['link code', 'code', 'tracking code']);
    const utmSource = getValue(['utm source', 'source']);
    
    if (!linkCode || !utmSource) return null;

    return {
      link_code: linkCode.toString().trim(),
      target_type: getValue(['target type'], 'General').toString(),
      utm_source: utmSource.toString().trim(),
      utm_medium: getValue(['utm medium', 'medium'], 'referral').toString(),
      utm_campaign: getValue(['utm campaign', 'campaign'], 'affiliate_2024').toString(),
      clicks: 0,
      conversions: 0,
      active: true
    };
  }

  private static parseCouponRow(row: any[], headers: string[]): Partial<Coupon> | null {
    const getValue = (searchTerms: string[], defaultValue: any = '') => {
      for (const term of searchTerms) {
        const index = headers.findIndex(h => h.includes(term));
        if (index !== -1 && row[index] !== undefined) {
          return row[index];
        }
      }
      return defaultValue;
    };

    const code = getValue(['code', 'coupon code', 'promo code']);
    const description = getValue(['description', 'desc']);
    
    if (!code || !description) return null;

    const discountValue = parseFloat(getValue(['discount', 'value'], 10)) || 10;
    const discountType = getValue(['type'], 'Percentage').toString().includes('%') ? 'Percentage' : 'Fixed';

    return {
      code: code.toString().trim().toUpperCase(),
      description: description.toString().trim(),
      discount_type: discountType as 'Percentage' | 'Fixed',
      discount_value: discountValue,
      min_order_value: parseFloat(getValue(['min order', 'minimum'], 0)) || 0,
      max_discount: parseFloat(getValue(['max discount', 'cap'])) || undefined,
      usage_limit: parseInt(getValue(['usage limit', 'limit'])) || undefined,
      used_count: 0,
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days
      applicable_courses: [],
      active: true
    };
  }

  static async parseExcelFile(file: File): Promise<{
    affiliates: Partial<Affiliate>[];
    links: Partial<AffiliateLink>[];
    coupons: Partial<Coupon>[];
  }> {
    // For demo purposes, return sample data
    // In a real implementation, you would use a library like xlsx to parse the Excel file
    
    return {
      affiliates: [
        {
          name: 'Ravi Kumar',
          email: 'ravi.kumar@safetypartner.com',
          phone: '+91-9876543210',
          company: 'Safety Partners India',
          address: '123 Business Avenue',
          city: 'Bengaluru',
          state: 'Karnataka',
          country: 'India',
          commission_saas_percent: 12,
          commission_training_percent: 18,
          lead_bounty_amount: 750,
          payout_method: 'Bank Transfer',
          status: 'Active'
        },
        {
          name: 'Sarah Ahmed',
          email: 'sarah@gcctraining.ae',
          phone: '+971-50-9876543',
          company: 'GCC Training Solutions',
          address: '789 Trade Center',
          city: 'Dubai',
          state: 'Dubai',
          country: 'UAE',
          commission_saas_percent: 15,
          commission_training_percent: 20,
          lead_bounty_amount: 1000,
          payout_method: 'Bank Transfer',
          status: 'Active'
        }
      ],
      links: [
        {
          link_code: 'RAVI-FW-2024',
          target_type: 'Course',
          utm_source: 'affiliate_ravi',
          utm_medium: 'referral',
          utm_campaign: 'fire_warden_2024',
          clicks: 0,
          conversions: 0,
          active: true
        },
        {
          link_code: 'SARAH-NEBOSH-2024',
          target_type: 'Course',
          utm_source: 'affiliate_sarah',
          utm_medium: 'referral',
          utm_campaign: 'nebosh_gcc_2024',
          clicks: 0,
          conversions: 0,
          active: true
        }
      ],
      coupons: [
        {
          code: 'WELCOME10',
          description: 'Welcome discount for new customers',
          discount_type: 'Percentage',
          discount_value: 10,
          min_order_value: 2000,
          usage_limit: 100,
          used_count: 0,
          valid_from: new Date().toISOString().split('T')[0],
          valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          applicable_courses: [],
          active: true
        },
        {
          code: 'AFFILIATE25',
          description: 'Affiliate partner special discount',
          discount_type: 'Percentage',
          discount_value: 25,
          min_order_value: 10000,
          usage_limit: 50,
          used_count: 0,
          valid_from: new Date().toISOString().split('T')[0],
          valid_until: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          applicable_courses: [],
          active: true
        }
      ]
    };
  }
}

export const getAffiliateOnboardingData = () => {
  return {
    overview: {
      title: 'SafetyWarden Training Affiliate Program',
      description: 'Partner with us to earn commissions on safety training referrals',
      benefits: [
        'Up to 20% commission on training sales',
        '₹500-₹1000 lead bounties for qualified RFQs',
        'Real-time tracking and analytics',
        'Monthly payouts with detailed reporting',
        'Marketing materials and support'
      ]
    },
    commissionStructure: {
      saas: {
        rate: '10-15%',
        description: 'Recurring commission on SaaS subscriptions for first 12 months',
        example: '₹2,990/month subscription = ₹299-₹449/month commission'
      },
      training: {
        rate: '15-20%',
        description: 'Commission on training seat sales',
        example: '₹45,000 NEBOSH course = ₹6,750-₹9,000 commission'
      },
      leads: {
        rate: '₹500-₹1,000',
        description: 'Bounty for qualified RFQ submissions',
        example: 'Enterprise RFQ for 100+ employees = ₹1,000 bounty'
      }
    },
    trackingLinks: {
      format: 'https://safetywarden.com/training?ref=YOUR_CODE',
      attribution: '30-day cookie tracking',
      reporting: 'Real-time dashboard with clicks, conversions, and earnings'
    },
    payoutTerms: {
      frequency: 'Monthly',
      minimumPayout: '₹5,000',
      paymentMethods: ['Bank Transfer', 'UPI', 'Cheque'],
      timeline: 'NET-30 after month end'
    }
  };
};