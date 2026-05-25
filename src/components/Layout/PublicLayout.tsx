import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
