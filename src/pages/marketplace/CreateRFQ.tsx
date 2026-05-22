import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Upload, X } from 'lucide-react';
import { getImportedCategories } from '../../data/marketplace/importedData';

interface RFQItem {
  id: string;
  category_id: string;
  item_desc: string;
  qty: number;
  unit: string;
  preferred_brands: string[];
}

const CreateRFQ: React.FC = () => {
  const [formData, setFormData] = useState({
    city: '',
    required_by_date: '',
    notes: '',
    preferred_brands: [] as string[],
    attachments: [] as string[]
  });

  const [items, setItems] = useState<RFQItem[]>([
    {
      id: '1',
      category_id: '',
      item_desc: '',
      qty: 1,
      unit: 'piece',
      preferred_brands: []
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const categories = getImportedCategories();
  const allCategories = categories.flatMap(cat => [cat, ...(cat.children || [])]);

  const addItem = () => {
    const newItem: RFQItem = {
      id: Date.now().toString(),
      category_id: '',
      item_desc: '',
      qty: 1,
      unit: 'piece',
      preferred_brands: []
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof RFQItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle RFQ submission
    alert('RFQ submitted successfully! You will receive quotes within 48 hours.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <span>← Back to Marketplace</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Create Request for Quote</h1>
          <p className="text-slate-600">
            Tell us what you need and get competitive quotes from verified vendors
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-orange-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-orange-600 text-white' : 'bg-slate-200'}`}>
                1
              </div>
              <span className="font-medium">Requirements</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-orange-600' : 'bg-slate-200'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-orange-600 text-white' : 'bg-slate-200'}`}>
                2
              </div>
              <span className="font-medium">Details</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-orange-600' : 'bg-slate-200'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-orange-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-orange-600 text-white' : 'bg-slate-200'}`}>
                3
              </div>
              <span className="font-medium">Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">What do you need?</h2>
              
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={item.id} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Item {index + 1}
                      </h3>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Category *
                        </label>
                        <select
                          value={item.category_id}
                          onChange={(e) => updateItem(item.id, 'category_id', e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="">Select category</option>
                          {allCategories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description *
                        </label>
                        <input
                          type="text"
                          value={item.item_desc}
                          onChange={(e) => updateItem(item.id, 'item_desc', e.target.value)}
                          placeholder="e.g., ABC Fire Extinguisher 6kg"
                          required
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                          min="1"
                          required
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Unit
                        </label>
                        <select
                          value={item.unit}
                          onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="piece">Piece</option>
                          <option value="set">Set</option>
                          <option value="meter">Meter</option>
                          <option value="kg">Kilogram</option>
                          <option value="liter">Liter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Another Item</span>
                </button>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Next: Add Details
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Additional Details</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Delivery City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="e.g., Bengaluru"
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Required By Date *
                    </label>
                    <input
                      type="date"
                      value={formData.required_by_date}
                      onChange={(e) => setFormData({...formData, required_by_date: e.target.value})}
                      required
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                    placeholder="Installation requirements, warranty terms, delivery instructions, etc."
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 mb-2">
                      Upload specifications, drawings, or reference images
                    </p>
                    <button
                      type="button"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Review RFQ
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Review Your RFQ</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Items Requested</h3>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={item.id} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-slate-900">
                              {index + 1}. {item.item_desc}
                            </p>
                            <p className="text-sm text-slate-600">
                              Category: {allCategories.find(c => c.id === item.category_id)?.name}
                            </p>
                            <p className="text-sm text-slate-600">
                              Quantity: {item.qty} {item.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Delivery City</h4>
                    <p className="text-slate-600">{formData.city}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Required By</h4>
                    <p className="text-slate-600">{formData.required_by_date}</p>
                  </div>
                </div>
                
                {formData.notes && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Additional Requirements</h4>
                    <p className="text-slate-600">{formData.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your RFQ will be sent to relevant verified vendors</li>
                  <li>• You'll receive quotes within 48 hours</li>
                  <li>• Compare quotes and choose the best offer</li>
                  <li>• Place your order directly with the vendor</li>
                </ul>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit RFQ
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateRFQ;