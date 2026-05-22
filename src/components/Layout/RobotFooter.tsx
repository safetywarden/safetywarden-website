import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Shield } from 'lucide-react';

const RobotFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <img 
              src="/hori logo bl.png" 
              alt="SafetyWarden - Safety Compliance & Training Platform" 
              className="h-20 w-auto mb-4"
            />
            <p className="text-slate-400 text-sm mb-4">
              Safety & fire surveillance robots as a service. Monthly rental with full support included.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/robots/warden-s" className="hover:text-white transition-colors">Warden-S (Safety & PPE)</Link></li>
              <li><Link to="/robots/warden-f" className="hover:text-white transition-colors">Warden-F (Fire/Thermal)</Link></li>
              <li><Link to="/plans" className="hover:text-white transition-colors">Plans & Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/book-demo" className="hover:text-white transition-colors">Get a Quote</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 83413 39444</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>robots@safetywarden.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Data privacy-first (face/plate blur at rest)</span>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-400 mb-2">
                © 2024 SafetyWarden.com. All rights reserved.
              </p>
              <p className="text-xs text-slate-500">
                Rental equipment subject to terms and conditions. Service availability varies by region.
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 justify-center">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/rental-terms" className="hover:text-white transition-colors">Rental Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RobotFooter;