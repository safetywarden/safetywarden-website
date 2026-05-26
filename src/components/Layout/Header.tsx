import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Platform', path: '/features' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Industries', path: '/industries' },
    { name: 'ESG/BRSR', path: '/resources' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  const handleLoginClick = () => {
    import('../../utils/analytics').then(({ trackEvent }) => {
      trackEvent('login_click', 'engagement', 'header');
    });
  };

  const handleDemoClick = () => {
    import('../../utils/analytics').then(({ trackDemoRequest }) => {
      trackDemoRequest('header');
    });
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm transition-shadow duration-200 sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center gap-6 xl:gap-10">
          <Link to="/" className="flex w-[220px] max-w-[58vw] flex-shrink-0 items-center gap-3 xl:w-[250px]">
            <img
              src="/images/optimized/header-logo-340.webp"
              alt="SafetyWarden logo"
              width={340}
              height={68}
              decoding="async"
              className="h-11 max-h-[52px] w-auto max-w-[150px] object-contain xl:max-w-[170px]"
            />
            <span className="truncate text-lg font-semibold tracking-tight text-slate-900">SafetyWarden</span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 whitespace-nowrap lg:flex xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`rounded-lg px-2.5 py-3 text-sm font-medium transition-colors xl:px-3 xl:text-base ${
                  isActive(item.path)
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 items-center gap-3 lg:flex xl:gap-5">
            <a
              href="https://app.safetywarden.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 xl:px-4 xl:text-base"
              onClick={handleLoginClick}
            >
              App Login
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm sw-elev transition duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 xl:px-8 xl:text-base"
              onClick={handleDemoClick}
            >
              Request Demo
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto flex-shrink-0 rounded-md p-3 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="block h-5 w-6" aria-hidden="true">
              <span className={`block h-0.5 w-6 rounded-full bg-current transition-transform ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`mt-1.5 block h-0.5 w-6 rounded-full bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`mt-1.5 block h-0.5 w-6 rounded-full bg-current transition-transform ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-6 bg-white/95 backdrop-blur-sm transition-transform duration-200">
            <nav className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 px-4 space-y-3">
              <a
                href="https://app.safetywarden.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleLoginClick();
                  setIsMenuOpen(false);
                }}
                className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 text-center hover:bg-slate-50"
              >
                App Login
              </a>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white text-center hover:bg-orange-700"
              >
                Request Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
