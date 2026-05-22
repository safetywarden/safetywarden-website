import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const RobotHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/robots' },
    { name: 'Warden-S', path: '/robots/warden-s' },
    { name: 'Warden-F', path: '/robots/warden-f' },
    { name: 'Plans', path: '/plans' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' }
  ];

  const isActive = (path: string) => {
    if (path === '/robots') {
      return location.pathname === path;
    }
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/safety-warden-header small.png" 
              alt="SafetyWarden - Robot Surveillance Solutions" 
              className="h-14 w-auto hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold transition-colors py-3 px-3 rounded-lg hover:bg-blue-50 ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/book-demo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-6 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4">
                <Link
                  to="/book-demo"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Get a Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default RobotHeader;