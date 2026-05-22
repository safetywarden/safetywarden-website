import React from 'react';
import { Filter, X } from 'lucide-react';
import { INTELLIGENCE_CATEGORIES } from '../../types/intelligence';

interface IntelligenceFiltersProps {
  selectedCategory?: string;
  selectedSeverity?: string;
  selectedGeography?: string;
  onCategoryChange: (category: string) => void;
  onSeverityChange: (severity: string) => void;
  onGeographyChange: (geography: string) => void;
  onClearFilters: () => void;
}

const IntelligenceFilters: React.FC<IntelligenceFiltersProps> = ({
  selectedCategory,
  selectedSeverity,
  selectedGeography,
  onCategoryChange,
  onSeverityChange,
  onGeographyChange,
  onClearFilters
}) => {
  const hasActiveFilters = selectedCategory || selectedSeverity || selectedGeography;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
          >
            <option value="">All Categories</option>
            {INTELLIGENCE_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Severity
          </label>
          <select
            value={selectedSeverity || ''}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
          >
            <option value="">All Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Geography
          </label>
          <input
            type="text"
            placeholder="e.g., Mumbai, Maharashtra, India"
            value={selectedGeography || ''}
            onChange={(e) => onGeographyChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 placeholder-slate-400"
          />
        </div>
      </div>
    </div>
  );
};

export default IntelligenceFilters;
