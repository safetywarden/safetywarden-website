import * as XLSX from 'xlsx';
import { ChecklistItem } from '../types/audit';

export interface ExcelChecklistItem {
  category: string;
  subcategory: string;
  item_code: string;
  control_statement: string;
  code_ref: string;
  requirement_type: 'Must-have' | 'Should-have';
  check_type: 'YesNo' | 'Numeric' | 'Text';
  default_severity: number;
  default_likelihood: number;
}

export class ExcelParser {
  static async parseChecklistFile(file: File): Promise<ExcelChecklistItem[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first worksheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          // Parse the data
          const items = this.parseChecklistData(jsonData as any[][]);
          resolve(items);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  private static parseChecklistData(data: any[][]): ExcelChecklistItem[] {
    const items: ExcelChecklistItem[] = [];
    
    // Find header row (usually contains "Category", "Control Statement", etc.)
    let headerRowIndex = -1;
    for (let i = 0; i < Math.min(10, data.length); i++) {
      const row = data[i];
      if (row && row.some(cell => 
        typeof cell === 'string' && 
        (cell.toLowerCase().includes('category') || 
         cell.toLowerCase().includes('control') ||
         cell.toLowerCase().includes('statement'))
      )) {
        headerRowIndex = i;
        break;
      }
    }
    
    if (headerRowIndex === -1) {
      throw new Error('Could not find header row in Excel file');
    }
    
    const headers = data[headerRowIndex].map(h => 
      typeof h === 'string' ? h.toLowerCase().trim() : ''
    );
    
    // Map column indices
    const columnMap = {
      category: this.findColumnIndex(headers, ['category', 'cat']),
      subcategory: this.findColumnIndex(headers, ['subcategory', 'sub category', 'subcat']),
      item_code: this.findColumnIndex(headers, ['item code', 'code', 'item_code', 'id']),
      control_statement: this.findColumnIndex(headers, ['control statement', 'statement', 'control', 'description']),
      code_ref: this.findColumnIndex(headers, ['code ref', 'reference', 'code_ref', 'ref']),
      requirement_type: this.findColumnIndex(headers, ['requirement type', 'type', 'requirement', 'priority']),
      check_type: this.findColumnIndex(headers, ['check type', 'input type', 'check_type', 'input']),
      severity: this.findColumnIndex(headers, ['severity', 'sev', 'default severity']),
      likelihood: this.findColumnIndex(headers, ['likelihood', 'prob', 'probability', 'default likelihood'])
    };
    
    // Process data rows
    for (let i = headerRowIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;
      
      try {
        const item = this.parseRow(row, columnMap);
        if (item) {
          items.push(item);
        }
      } catch (error) {
        console.warn(`Error parsing row ${i + 1}:`, error);
      }
    }
    
    return items;
  }
  
  private static findColumnIndex(headers: string[], searchTerms: string[]): number {
    for (const term of searchTerms) {
      const index = headers.findIndex(h => h.includes(term));
      if (index !== -1) return index;
    }
    return -1;
  }
  
  private static parseRow(row: any[], columnMap: any): ExcelChecklistItem | null {
    const getValue = (colIndex: number, defaultValue: any = '') => {
      return colIndex !== -1 && row[colIndex] !== undefined ? row[colIndex] : defaultValue;
    };
    
    const category = getValue(columnMap.category);
    const control_statement = getValue(columnMap.control_statement);
    
    // Skip rows without essential data
    if (!category || !control_statement) {
      return null;
    }
    
    // Generate item code if not provided
    let item_code = getValue(columnMap.item_code);
    if (!item_code) {
      const categoryCode = category.substring(0, 3).toUpperCase();
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      item_code = `${categoryCode}-${randomNum}`;
    }
    
    // Parse requirement type
    let requirement_type: 'Must-have' | 'Should-have' = 'Must-have';
    const reqType = getValue(columnMap.requirement_type, '').toString().toLowerCase();
    if (reqType.includes('should') || reqType.includes('optional')) {
      requirement_type = 'Should-have';
    }
    
    // Parse check type
    let check_type: 'YesNo' | 'Numeric' | 'Text' = 'YesNo';
    const checkType = getValue(columnMap.check_type, '').toString().toLowerCase();
    if (checkType.includes('numeric') || checkType.includes('number')) {
      check_type = 'Numeric';
    } else if (checkType.includes('text') || checkType.includes('string')) {
      check_type = 'Text';
    }
    
    // Parse severity and likelihood
    const severity = Math.max(1, Math.min(5, parseInt(getValue(columnMap.severity, 3)) || 3));
    const likelihood = Math.max(1, Math.min(5, parseInt(getValue(columnMap.likelihood, 3)) || 3));
    
    return {
      category: category.toString().trim(),
      subcategory: getValue(columnMap.subcategory, 'General').toString().trim(),
      item_code: item_code.toString().trim(),
      control_statement: control_statement.toString().trim(),
      code_ref: getValue(columnMap.code_ref, 'N/A').toString().trim(),
      requirement_type,
      check_type,
      default_severity: severity,
      default_likelihood: likelihood
    };
  }
}

export const getIndustryChecklistFile = (industry: string): string => {
  const industryMap: Record<string, string> = {
    'hospitals': '/src/data/audit/SW_Checklist_Hospitals.xlsx',
    'healthcare': '/src/data/audit/SW_Checklist_Hospitals.xlsx',
    'it-parks': '/src/data/audit/SW_Checklist_ITParks.xlsx',
    'office': '/src/data/audit/SW_Checklist_ITParks.xlsx',
    'retail': '/src/data/audit/SW_Checklist_RetailMalls.xlsx',
    'malls': '/src/data/audit/SW_Checklist_RetailMalls.xlsx',
    'warehousing': '/src/data/audit/SW_Checklist_Warehousing.xlsx',
    'logistics': '/src/data/audit/SW_Checklist_Warehousing.xlsx'
  };
  
  return industryMap[industry.toLowerCase()] || '';
};