import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Award, Filter } from 'lucide-react';
import { getImportedVendors } from '../../data/marketplace/importedData';

const VendorDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedApproval, setSelectedApproval] = useState('');

  const allVendors = getImportedVendors();
  const cities = [...new Set(allVendors.map(v => v.city))];
  const approvals = [...new Set(allVendors.flatMap(v => v.approvals_supported))];

  const filteredVendors = allVendors.filter(vendor => {
    const matchesSearch = vendor.legal_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || vendor.city === selectedCity;
    const matchesApproval = !selectedApproval || vendor.approvals_supported.includes(selectedApproval);
    
    return matchesSearch && matchesCity && matchesApproval && vendor.status === 'Approved';
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Verified Safety Equipment Vendors
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Connect with trusted suppliers across India and GCC region. 
              All vendors are KYC verified with proper certifications.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vendors by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedApproval}
                onChange={(e) => setSelectedApproval(e.target.value)}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Approvals</option>
                {approvals.map(approval => (
                  <option key={approval} value={approval}>{approval}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredVendors.length} verified vendors
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2 line-clamp-2">
                      {vendor.legal_name}
                    </h3>
                    <div className="flex items-center space-x-1 text-slate-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{vendor.city}, {vendor.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-600">4.5 (12 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Award className="h-5 w-5 text-emerald-600" />
                    <span className="text-xs text-emerald-600 font-medium">Verified</span>
                  </div>
                </div>

                {/* Approvals */}
                {vendor.approvals_supported.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-1">
                      {vendor.approvals_supported.slice(0, 4).map(approval => (
                        <span key={approval} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {approval}
                        </span>
                      ))}
                      {vendor.approvals_supported.length > 4 && (
                        <span className="text-xs text-slate-500">
                          +{vendor.approvals_supported.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="mb-6">
                  <p className="text-sm text-slate-600 mb-1">
                    <strong>Contact:</strong> {vendor.contact_name}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Phone:</strong> {vendor.phone}
                  </p>
                  {vendor.website && (
                    <p className="text-sm">
                      <a 
                        href={vendor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/marketplace/vendor/${vendor.id}`}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    View Profile
                  </Link>
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Contact Vendor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No vendors found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search criteria or browse all vendors
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('');
                setSelectedApproval('');
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Become a Vendor?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our marketplace and reach thousands of buyers across India and GCC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace/vendor/register"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Register as Vendor
            </Link>
            <Link
              to="/marketplace/vendor/login"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Vendor Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorDirectory;