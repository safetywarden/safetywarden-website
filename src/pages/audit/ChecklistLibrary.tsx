import React, { useState, useEffect } from 'react';
import { Plus, Upload, Download, Edit, Trash2, Filter, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ChecklistItem } from '../../types/audit';
import { ExcelParser, ExcelChecklistItem } from '../../utils/excelParser';

const ChecklistLibrary: React.FC = () => {
  const { currentOrganization, userRole } = useAuth();
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importProgress, setImportProgress] = useState<string>('');

  const canEdit = userRole === 'OrgAdmin';

  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    item_code: '',
    control_statement: '',
    code_ref: '',
    requirement_type: 'Must-have' as 'Must-have' | 'Should-have',
    check_type: 'YesNo' as 'YesNo' | 'Numeric' | 'Text',
    default_severity: 3,
    default_likelihood: 3,
    active: true
  });

  useEffect(() => {
    if (currentOrganization) {
      loadChecklistItems();
    }
  }, [currentOrganization]);

  const loadChecklistItems = async () => {
    if (!currentOrganization) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('checklist_items')
      .select('*')
      .or(`organization_id.is.null,organization_id.eq.${currentOrganization.id}`)
      .eq('active', true)
      .order('category', { ascending: true })
      .order('subcategory', { ascending: true })
      .order('item_code', { ascending: true });

    if (error) {
      console.error('Error loading checklist items:', error);
    } else {
      setChecklistItems(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) return;

    const itemData = {
      ...formData,
      organization_id: currentOrganization.id,
    };

    let error;
    if (editingItem) {
      const { error: updateError } = await supabase
        .from('checklist_items')
        .update(itemData)
        .eq('id', editingItem.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('checklist_items')
        .insert([itemData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving checklist item:', error);
      alert('Error saving checklist item. Please try again.');
    } else {
      setShowForm(false);
      setEditingItem(null);
      resetForm();
      loadChecklistItems();
    }
  };

  const handleEdit = (item: ChecklistItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      subcategory: item.subcategory,
      item_code: item.item_code,
      control_statement: item.control_statement,
      code_ref: item.code_ref,
      requirement_type: item.requirement_type,
      check_type: item.check_type,
      default_severity: item.default_severity,
      default_likelihood: item.default_likelihood,
      active: item.active
    });
    setShowForm(true);
  };

  const handleDelete = async (item: ChecklistItem) => {
    if (!confirm('Are you sure you want to delete this checklist item?')) return;

    const { error } = await supabase
      .from('checklist_items')
      .update({ active: false })
      .eq('id', item.id);

    if (error) {
      console.error('Error deleting checklist item:', error);
      alert('Error deleting checklist item. Please try again.');
    } else {
      loadChecklistItems();
    }
  };

  const handleImportExcel = async (file: File) => {
    setImportProgress('Parsing Excel file...');
    
    try {
      const items = await ExcelParser.parseChecklistFile(file);
      setImportProgress(`Parsed ${items.length} items. Importing to database...`);
      
      // Convert to database format
      const dbItems = items.map(item => ({
        ...item,
        organization_id: currentOrganization!.id,
        active: true
      }));
      
      // Insert in batches
      const batchSize = 50;
      let imported = 0;
      
      for (let i = 0; i < dbItems.length; i += batchSize) {
        const batch = dbItems.slice(i, i + batchSize);
        const { error } = await supabase
          .from('checklist_items')
          .insert(batch);
        
        if (error) {
          console.error('Error importing batch:', error);
          throw error;
        }
        
        imported += batch.length;
        setImportProgress(`Imported ${imported}/${dbItems.length} items...`);
      }
      
      setImportProgress('Import completed successfully!');
      setTimeout(() => {
        setShowImportModal(false);
        setImportProgress('');
        loadChecklistItems();
      }, 2000);
      
    } catch (error) {
      console.error('Error importing Excel file:', error);
      setImportProgress(`Error: ${error}`);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Category', 'Subcategory', 'Item Code', 'Control Statement', 'Code Reference', 'Requirement Type', 'Check Type', 'Default Severity', 'Default Likelihood'],
      ...filteredItems.map(item => [
        item.category,
        item.subcategory,
        item.item_code,
        item.control_statement,
        item.code_ref,
        item.requirement_type,
        item.check_type,
        item.default_severity,
        item.default_likelihood
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist_${currentOrganization?.name}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      subcategory: '',
      item_code: '',
      control_statement: '',
      code_ref: '',
      requirement_type: 'Must-have',
      check_type: 'YesNo',
      default_severity: 3,
      default_likelihood: 3,
      active: true
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    resetForm();
  };

  // Filter items
  const filteredItems = checklistItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.control_statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item_code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {};
    }
    if (!acc[item.category][item.subcategory]) {
      acc[item.category][item.subcategory] = [];
    }
    acc[item.category][item.subcategory].push(item);
    return acc;
  }, {} as Record<string, Record<string, ChecklistItem[]>>);

  const categories = [...new Set(checklistItems.map(item => item.category))];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Checklist Library</h1>
          <p className="text-slate-600">Manage audit checklist items and templates</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportToCSV}
            className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          {canEdit && (
            <>
              <button
                onClick={() => setShowImportModal(true)}
                className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Import Excel</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search checklist items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-slate-600">
          Showing {filteredItems.length} of {checklistItems.length} checklist items
          {selectedCategory && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Checklist Items */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, subcategories]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-900">{category}</h2>
              <p className="text-sm text-slate-600">
                {Object.values(subcategories).flat().length} items
              </p>
            </div>
            
            <div className="p-4">
              {Object.entries(subcategories).map(([subcategory, items]) => (
                <div key={subcategory} className="mb-6 last:mb-0">
                  <h3 className="text-md font-medium text-slate-800 mb-3 border-l-4 border-orange-500 pl-3">
                    {subcategory}
                  </h3>
                  
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm font-mono">
                                {item.item_code}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                item.requirement_type === 'Must-have' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {item.requirement_type}
                              </span>
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                                {item.check_type}
                              </span>
                            </div>
                            
                            <p className="text-slate-900 mb-2">{item.control_statement}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <span>Code: {item.code_ref}</span>
                              <span>Severity: {item.default_severity}/5</span>
                              <span>Likelihood: {item.default_likelihood}/5</span>
                              <span className="font-medium text-orange-600">
                                Risk: {item.default_severity * item.default_likelihood}
                              </span>
                            </div>
                          </div>
                          
                          {canEdit && item.organization_id && (
                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item)}
                                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No checklist items found</h3>
            <p className="text-slate-600 mb-4">
              {searchQuery || selectedCategory 
                ? 'Try adjusting your search criteria' 
                : 'Add your first checklist item to get started'
              }
            </p>
            {canEdit && !searchQuery && !selectedCategory && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Checklist Item
              </button>
            )}
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Import Checklist from Excel</h2>
            
            {importProgress ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-slate-600">{importProgress}</p>
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mb-4">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-2">
                    Upload Excel file with checklist items
                  </p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImportExcel(file);
                    }}
                    className="hidden"
                    id="excel-upload"
                  />
                  <label
                    htmlFor="excel-upload"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-blue-900 mb-1">Expected Format</h4>
                  <p className="text-sm text-blue-800">
                    Excel file should contain columns: Category, Subcategory, Item Code, 
                    Control Statement, Code Reference, Requirement Type, Check Type, 
                    Default Severity, Default Likelihood
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingItem ? 'Edit Checklist Item' : 'Add New Checklist Item'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Fire Detection & Alarm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Subcategory *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Smoke Detectors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Item Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.item_code}
                    onChange={(e) => setFormData({ ...formData, item_code: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., FDA-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Code Reference *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code_ref}
                    onChange={(e) => setFormData({ ...formData, code_ref: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., NFPA 72: 17.7.3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Control Statement *
                </label>
                <textarea
                  required
                  value={formData.control_statement}
                  onChange={(e) => setFormData({ ...formData, control_statement: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe what needs to be checked..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Requirement Type *
                  </label>
                  <select
                    required
                    value={formData.requirement_type}
                    onChange={(e) => setFormData({ ...formData, requirement_type: e.target.value as 'Must-have' | 'Should-have' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Must-have">Must-have</option>
                    <option value="Should-have">Should-have</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Check Type *
                  </label>
                  <select
                    required
                    value={formData.check_type}
                    onChange={(e) => setFormData({ ...formData, check_type: e.target.value as 'YesNo' | 'Numeric' | 'Text' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="YesNo">Yes/No</option>
                    <option value="Numeric">Numeric</option>
                    <option value="Text">Text</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">Active</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Default Severity (1-5) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="5"
                    value={formData.default_severity}
                    onChange={(e) => setFormData({ ...formData, default_severity: parseInt(e.target.value) || 3 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">1=Minor, 5=Critical</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Default Likelihood (1-5) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="5"
                    value={formData.default_likelihood}
                    onChange={(e) => setFormData({ ...formData, default_likelihood: parseInt(e.target.value) || 3 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">1=Rare, 5=Very Likely</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-slate-600">
                  <strong>Calculated Risk Score:</strong> {formData.default_severity * formData.default_likelihood}/25
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    formData.default_severity * formData.default_likelihood >= 15 ? 'bg-red-100 text-red-800' :
                    formData.default_severity * formData.default_likelihood >= 9 ? 'bg-orange-100 text-orange-800' :
                    formData.default_severity * formData.default_likelihood >= 6 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {formData.default_severity * formData.default_likelihood >= 15 ? 'High Risk' :
                     formData.default_severity * formData.default_likelihood >= 9 ? 'Medium Risk' :
                     formData.default_severity * formData.default_likelihood >= 6 ? 'Low Risk' :
                     'Very Low Risk'}
                  </span>
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistLibrary;