import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing! You\'ll receive our latest safety updates.');
    setEmail('');
  };

  return (
    <footer className="bg-navy-900 text-white">
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
              Complete safety compliance and training platform for enterprises across India and GCC.
            </p>
            <p className="text-slate-400 text-xs mb-4">
              SafetyWarden is a business vertical of Bconz International Pvt Ltd
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/safetywarden" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@safetywarden" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="mailto:hello@safetywarden.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Solutions</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/training" className="hover:text-white transition-colors">Training & Certification</Link></li>
              <li><Link to="/solutions/digital-audit" className="hover:text-white transition-colors">Digital Audit Platform</Link></li>
              <li><Link to="/solutions/warden-training" className="hover:text-white transition-colors">Warden Training</Link></li>
              <li><Link to="/solutions/drill-management" className="hover:text-white transition-colors">Drill Management</Link></li>
              <li><Link to="/solutions/marketplace" className="hover:text-white transition-colors">Safety Marketplace</Link></li>
              <li><Link to="/solutions/incident-reporting" className="hover:text-white transition-colors">Incident Reporting</Link></li>
              <li><Link to="/manpower" className="hover:text-white transition-colors">Manpower Services</Link></li>
              <li><Link to="/training/affiliate" className="hover:text-white transition-colors">Affiliate Program</Link></li>
              <li><Link to="/training/provider" className="hover:text-white transition-colors">Provider Portal</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">
              Get the latest safety compliance updates and resources.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-600"
              />
              <button 
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-r-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4 md:mb-0">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/dpa" className="hover:text-white transition-colors">Data Processing Agreement</a>
            </div>
            <p className="text-sm text-slate-400">
              © 2024 SafetyWarden.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;