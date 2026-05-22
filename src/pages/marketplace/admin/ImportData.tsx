import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { CSVImporter, ImportResult } from '../../../utils/csvImporter';

const ImportData: React.FC = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [importResults, setImportResults] = useState<Record<string, ImportResult>>({});
  const [isImporting, setIsImporting] = useState(false);

  const handleFileUpload = async (file: File, type: string) => {
    setIsImporting(true);
    
    try {
      const content = await file.text();
      let result: ImportResult;
      
      switch (type) {
        case 'categories':
          result = CSVImporter.importCategories(content);
          break;
        case 'attributes':
          result = CSVImporter.importAttributes(content);
          break;
        case 'products':
          result = CSVImporter.importProducts(content);
          break;
        case 'priceTiers':
          result = CSVImporter.importPriceTiers(content);
          break;
        case 'vendors':
          result = CSVImporter.importVendors(content);
          break;
        case 'rfqs':
          result = CSVImporter.importRFQs(content);
          break;
        default:
          throw new Error('Unknown import type');
      }
      
      setImportResults(prev => ({ ...prev, [type]: result }));
    } catch (error) {
      setImportResults(prev => ({
        ...prev,
        [type]: {
          success: false,
          imported: 0,
          errors: [`Failed to process file: ${error}`]
        }
      }));
    } finally {
      setIsImporting(false);
    }
  };

  const downloadTemplate = (type: string) => {
    const templates = {
      categories: `category_id,parent_id,name,slug
CAT-100,,Fire Extinguishers,fire-extinguishers
CAT-110,CAT-100,ABC Dry Powder,abc-dry-powder
CAT-111,CAT-100,CO2,co2-extinguishers`,
      
      attributes: `attribute_code,name,datatype,unit,facet,applies_to
capacity,Capacity,number,kg/L,TRUE,CAT-100|CAT-200
approval,Approvals,multiselect,,TRUE,CAT-100|CAT-200
material,Material,text,,TRUE,CAT-300|CAT-400`,
      
      products: `sku,product_name,brand,category_id,description,uom,mrp,tax_rate,min_order_qty,lead_time_days,warranty_months,approval_codes,hs_code,country_of_origin,images,datasheet_url
ABC-6KG-UL,ABC Dry Powder Extinguisher 6kg,BrandX,CAT-110,6kg ABC powder fire extinguisher,unit,2450,18,2,7,24,UL|ISI,84241000,IN,https://example.com/abc6kg.jpg,https://example.com/abc6kg.pdf`,
      
      priceTiers: `sku,tier_min_qty,tier_price
ABC-6KG-UL,1,2450
ABC-6KG-UL,10,2325
ABC-6KG-UL,25,2250`,
      
      vendors: `vendor_id,legal_name,gstin,pan,address,city,state,pin,country,contact_name,contact_email,phone,website,approvals_supported,payout_method,upi_id,status
vendor-1,FireTech Solutions Pvt Ltd,29ABCDE1234F1Z5,ABCDE1234F,123 Industrial Area Phase 1,Bengaluru,Karnataka,560001,India,Rajesh Kumar,rajesh@firetech.com,+91-9876543210,https://firetech.com,UL|FM|ISI,Bank Transfer,,Approved
vendor-2,SafeGuard Equipment LLC,,,456 Safety Street Business Bay,Dubai,Dubai,00000,UAE,Ahmed Al-Rashid,ahmed@safeguard.ae,+971-50-1234567,https://safeguard.ae,UL|FM|SASO,Bank Transfer,,Approved`,
      
      rfqs: `rfq_id,buyer_id,ref_code,city,required_by_date,notes,status,preferred_brands,attachments
rfq-1,buyer-1,RFQ-2024-001,Bengaluru,2024-03-15,Required for new office building. Please include installation charges.,Open,FireTech|SafeGuard,
rfq-2,buyer-2,RFQ-2024-002,Mumbai,2024-03-20,Bulk requirement for manufacturing facility.,Open,,`
    };

    const content = templates[type as keyof typeof templates];
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const FileUploadSection = ({ type, title, description }: { type: string; title: string; description: string }) => {
    const result = importResults[type];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
          <button
            onClick={() => downloadTemplate(type)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            <span>Download Template</span>
          </button>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600 mb-2">
            Drop your CSV file here or click to browse
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, type);
            }}
            className="hidden"
            id={`file-${type}`}
          />
          <label
            htmlFor={`file-${type}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors"
          >
            Choose File
          </label>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center space-x-2 mb-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-medium ${result.success ? 'text-emerald-800' : 'text-red-800'}`}>
                {result.success ? 'Import Successful' : 'Import Failed'}
              </span>
            </div>
            
            {result.success && (
              <p className="text-emerald-700 text-sm">
                Successfully imported {result.imported} records
              </p>
            )}
            
            {result.errors.length > 0 && (
              <div className="mt-2">
                <p className="text-red-700 text-sm font-medium mb-1">Errors:</p>
                <ul className="text-red-600 text-sm space-y-1">
                  {result.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'categories', name: 'Categories', title: 'Import Categories', description: 'Upload category hierarchy and structure' },
    { id: 'attributes', name: 'Attributes', title: 'Import Attributes', description: 'Upload product attributes and filters' },
    { id: 'products', name: 'Products', title: 'Import Products', description: 'Upload product catalog with details' },
    { id: 'priceTiers', name: 'Price Tiers', title: 'Import Price Tiers', description: 'Upload volume-based pricing' },
    { id: 'vendors', name: 'Vendors', title: 'Import Vendors', description: 'Upload vendor directory and KYC data' },
    { id: 'rfqs', name: 'RFQs', title: 'Import RFQs', description: 'Upload sample RFQ data for testing' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Import Marketplace Data</h1>
          <p className="text-slate-600">
            Import categories, attributes, products, and pricing data using CSV files
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Import Section */}
        <div className="max-w-4xl">
          {tabs.map((tab) => (
            activeTab === tab.id && (
              <FileUploadSection
                key={tab.id}
                type={tab.id}
                title={tab.title}
                description={tab.description}
              />
            )
          ))}
        </div>

        {/* Import Summary */}
        {Object.keys(importResults).length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Import Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(importResults).map(([type, result]) => (
                <div key={type} className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-1 ${result.success ? 'text-emerald-600' : 'text-red-600'}`}>
                    {result.imported}
                  </div>
                  <div className="text-sm text-slate-600 capitalize">{type}</div>
                  {result.errors.length > 0 && (
                    <div className="text-xs text-red-600 mt-1">
                      {result.errors.length} errors
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Import Instructions</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <p><strong>1. Categories:</strong> Import category hierarchy first. Parent categories must be imported before child categories.</p>
            <p><strong>2. Attributes:</strong> Import product attributes and filters that will be used for faceted search.</p>
            <p><strong>3. Products:</strong> Import product catalog. Ensure category_id matches imported categories.</p>
            <p><strong>4. Price Tiers:</strong> Import volume-based pricing. SKU must match imported products.</p>
            <p><strong>5. Vendors:</strong> Import vendor directory with KYC information and certifications.</p>
            <p><strong>6. RFQs:</strong> Import sample RFQ data for testing the quote workflow.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportData;