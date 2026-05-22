import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, Star, MapPin } from 'lucide-react';
import { getImportedCategories, getCategoryById, getProductsByCategory } from '../../data/marketplace/importedData';
import { SearchFilters } from '../../types/marketplace';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState('relevance');

  const categories = getImportedCategories();
  const category = categories.find(cat => cat.slug === slug) || 
                  categories.flatMap(cat => cat.children || []).find(cat => cat.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Category Not Found</h1>
          <Link to="/marketplace" className="text-orange-600 hover:text-orange-700">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Filter products by category
  const filteredProducts = getProductsByCategory(category.id).filter(product => 
    product.category_id === category.id || 
    (category.children && category.children.some(child => child.id === product.category_id))
  );

  const brands = [...new Set(filteredProducts.map(p => p.brand))];
  const approvals = [...new Set(filteredProducts.flatMap(p => p.approval_codes))];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <nav className="text-sm text-slate-500 mb-2">
                <Link to="/marketplace" className="hover:text-slate-700">Marketplace</Link>
                <span className="mx-2">›</span>
                <span className="text-slate-900">{category.name}</span>
              </nav>
              <h1 className="text-3xl font-bold text-navy-900 mb-2">{category.name}</h1>
              <p className="text-slate-600">
                {filteredProducts.length} products from verified vendors
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Get 3 Quotes
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Filters</h3>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-slate-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Approvals Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Approvals</h4>
                <div className="space-y-2">
                  {approvals.map(approval => (
                    <label key={approval} className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-slate-700">{approval}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>₹0</span>
                    <span>₹1,00,000+</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 text-slate-600 hover:text-slate-900"
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-600">
                    {filteredProducts.length} products
                  </span>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`w-full object-cover ${viewMode === 'list' ? 'h-32' : 'h-48'}`}
                    />
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-navy-900 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.approval_codes.length > 0 && (
                        <div className="flex items-center space-x-1 ml-2">
                          {product.approval_codes.slice(0, 2).map(approval => (
                            <span key={approval} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                              {approval}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-navy-900">
                          ₹{product.mrp.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500 ml-1">/{product.uom}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">MOQ: {product.min_order_qty}</p>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{product.country_of_origin}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-900">{product.brand}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-600">4.5</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Add to RFQ
                        </button>
                        <Link
                          to={`/marketplace/product/${product.id}`}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky RFQ Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-600 text-white p-4 shadow-lg lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Need multiple quotes?</p>
            <p className="text-sm text-orange-100">Get competitive prices from verified vendors</p>
          </div>
          <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium">
            Get 3 Quotes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;