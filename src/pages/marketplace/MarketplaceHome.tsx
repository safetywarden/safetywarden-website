import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Shield } from 'lucide-react';
import { getImportedCategories } from '../../data/marketplace/importedData';
import SEOHead from '../../components/SEO/SEOHead';
import { seoPages } from '../../utils/seo';

const MarketplaceHome: React.FC = () => {
  const categories = getImportedCategories();
  const topCategories = categories.slice(0, 4);
  
  const featuredBrands = [
    'FireTech', 'SafeGuard', 'Emergency Systems', 'ProSafety', 'SecureShield'
  ];

  const procurementControls = [
    'Vendor verification workflows',
    'Structured RFQ collection',
    'Category-based sourcing',
    'Procurement documentation'
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title={seoPages.marketplace.title}
        description={seoPages.marketplace.description}
        keywords={seoPages.marketplace.keywords}
        canonicalUrl="https://safetywarden.com/marketplace"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              India's Largest{' '}
              <span className="text-orange-400">Safety Equipment</span>{' '}
              Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8">
              Connect with verified vendors, get competitive quotes, and procure 
              safety equipment with confidence. GST compliant, India & GCC ready.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for fire extinguishers, safety helmets, emergency lights..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 text-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/marketplace/categories"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center space-x-2"
              >
                <span>Browse Categories</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                Get 3 Quotes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Procurement Controls */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {procurementControls.map((control, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-navy-600" />
                </div>
                <div className="text-slate-900 font-semibold">{control}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600">
              Find the right safety equipment for your industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCategories.map((category) => (
              <Link
                key={category.id}
                to={`/marketplace/category/${category.slug}`}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icon.png" alt={category.name} className="h-8 w-auto" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{category.name}</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {category.children?.length || 0} subcategories
                </p>
                <div className="flex items-center text-orange-600 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Trusted Brands
            </h2>
            <p className="text-xl text-slate-600">
              Premium safety equipment from verified manufacturers
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {featuredBrands.map((brand, index) => (
              <div key={index} className="bg-slate-50 px-8 py-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <span className="text-slate-700 font-medium">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple, transparent procurement process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Submit Requirements</h3>
              <p className="text-slate-600">
                Tell us what you need - products, quantities, delivery location, and timeline
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Get Competitive Quotes</h3>
              <p className="text-slate-600">
                Receive quotes from verified vendors within 48 hours. Compare prices and terms
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Place Order & Track</h3>
              <p className="text-slate-600">
                Choose the best quote, place your order, and track delivery in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Source Safety Equipment?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Source safety equipment through structured RFQ workflows and vendor documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace/rfq/create"
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Create RFQ
            </Link>
            <Link
              to="/marketplace/vendors"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Browse Vendors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplaceHome;
