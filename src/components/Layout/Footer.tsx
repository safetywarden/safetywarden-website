import React from 'react';
import { Link } from 'react-router-dom';
import { trackCtaClick, trackEvent } from '../../utils/analytics';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-4">SafetyWarden</p>
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              India-first enterprise compliance operations platform for inspections, audits, CAPA, ESG and governance across industrial operations.
            </p>
            <div className="mt-5 inline-flex border border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              DPIIT Startup India Recognized
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/features" className="hover:text-white transition-colors">Platform</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">ESG / BRSR</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href="https://app.safetywarden.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('login_click', 'engagement', 'footer');
                    trackCtaClick('app_login', 'footer');
                  }}
                  className="hover:text-white transition-colors"
                >
                  App Login
                </a>
              </li>
              <li><a href="mailto:hello@safetywarden.com" className="hover:text-white transition-colors">hello@safetywarden.com</a></li>
              <li><span className="text-slate-400">Bangalore, India</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal & Trust</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/company" className="hover:text-white transition-colors">Company Information</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 text-sm text-slate-400">
          <span>
            © {new Date().getFullYear()} SafetyWarden. A product initiative of BCONZ International OPC Private Limited, Bengaluru, India.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
