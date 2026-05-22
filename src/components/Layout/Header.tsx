import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { trackDemoRequest, trackEvent } from '../../utils/analytics';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();

  const productItems = [
    { name: 'Audit & Compliance', path: '/app/audit', description: 'Digital audits & compliance tracking', icon: '🔍' },
    { name: 'Training Hub', path: '/training', description: 'Professional safety certification', icon: '🎓' },
    { name: 'Safety Marketplace', path: '/marketplace', description: 'Equipment & vendor network', icon: '🛒' },
    { name: 'Manpower Services', path: '/manpower', description: 'Staffing & outsourcing', icon: '👥' }
  ];

  const solutionItems = [
    { name: 'Digital Audit Platform', path: '/solutions/digital-audit', description: 'Self-assessment against NFPA/NBC codes' },
    { name: 'Education Audit Services', path: '/education-audit', description: 'Health & safety audits for schools & colleges' },
    { name: 'Warden Training', path: '/solutions/warden-training', description: 'Interactive training with certificates' },
    { name: 'Drill Management', path: '/solutions/drill-management', description: 'Real-time drill coordination' },
    { name: 'Incident Reporting', path: '/solutions/incident-reporting', description: 'Near-miss & incident tracking' },
    { name: 'Warden Outsourcing', path: '/solutions/outsourcing', description: 'Professional warden services' }
  ];

  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'Intelligence', path: '/intelligence' },
    { name: 'Blog', path: '/blog' },
    { name: 'Industries', path: '/industries' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const [productsTimeout, setProductsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [solutionsTimeout, setSolutionsTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleProductsMouseEnter = () => {
    if (productsTimeout) clearTimeout(productsTimeout);
    if (solutionsTimeout) clearTimeout(solutionsTimeout);
    setIsSolutionsOpen(false);
    setIsProductsOpen(true);
  };

  const handleProductsMouseLeave = () => {
    const timeout = setTimeout(() => setIsProductsOpen(false), 200);
    setProductsTimeout(timeout);
  };

  const handleSolutionsMouseEnter = () => {
    if (productsTimeout) clearTimeout(productsTimeout);
    if (solutionsTimeout) clearTimeout(solutionsTimeout);
    setIsProductsOpen(false);
    setIsSolutionsOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    const timeout = setTimeout(() => setIsSolutionsOpen(false), 200);
    setSolutionsTimeout(timeout);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/safety-warden-header small.png" 
              alt="SafetyWarden - Safety Compliance & Training Platform" 
              className="h-14 w-auto hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={handleProductsMouseEnter}
                onMouseLeave={handleProductsMouseLeave}
                className="flex items-center space-x-1 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors py-3 px-2 rounded-lg hover:bg-orange-50"
              >
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isProductsOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-4 z-50"
                  onMouseEnter={handleProductsMouseEnter}
                  onMouseLeave={handleProductsMouseLeave}
                >
                  {productItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsProductsOpen(false)}
                      className="flex items-start space-x-3 px-6 py-4 hover:bg-orange-50 transition-colors group"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{item.name}</div>
                        <div className="text-sm text-slate-600">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={handleSolutionsMouseEnter}
                onMouseLeave={handleSolutionsMouseLeave}
                className="flex items-center space-x-1 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors py-3 px-2 rounded-lg hover:bg-orange-50"
              >
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isSolutionsOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-4 z-50"
                  onMouseEnter={handleSolutionsMouseEnter}
                  onMouseLeave={handleSolutionsMouseLeave}
                >
                  {solutionItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsSolutionsOpen(false)}
                      className="block px-6 py-3 hover:bg-orange-50 transition-colors group"
                    >
                      <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{item.name}</div>
                      <div className="text-sm text-slate-600">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Nav Items */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold transition-colors py-3 px-3 rounded-lg hover:bg-orange-50 ${
                  isActive(item.path)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/app/audit"
              className="text-slate-700 hover:text-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-slate-50"
              onClick={() => trackEvent('login_click', 'engagement', 'header')}
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              onClick={() => trackDemoRequest('header')}
            >
              Get Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-lg text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-6 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-1">
              {/* Mobile Products Section */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-4 py-2">
                  Products
                </div>
                {productItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-slate-500">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Solutions Section */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-4 py-2">
                  Solutions
                </div>
                {solutionItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                    }`}
                  >
                    <div>{item.name}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Mobile Regular Nav */}
              <div className="border-t border-slate-200 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <Link
                  to="/app/audit"
                  onClick={() => setIsMenuOpen(false)}
                  className="block border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center shadow-lg"
                >
                  Get Demo
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;