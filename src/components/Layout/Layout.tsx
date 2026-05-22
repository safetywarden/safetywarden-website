import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from '../WhatsAppFloat';
import SpecialOfferBanner from '../SpecialOfferBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SpecialOfferBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;