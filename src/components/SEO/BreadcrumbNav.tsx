import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StructuredData from './StructuredData';
import { generateBreadcrumbSchema } from '../../utils/seo';

interface Breadcrumb {
  name: string;
  url: string;
}

interface BreadcrumbNavProps {
  breadcrumbs: Breadcrumb[];
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ breadcrumbs, className = '' }) => {
  const fullBreadcrumbs = [
    { name: 'Home', url: 'https://safetywarden.com/' },
    ...breadcrumbs
  ];

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema(fullBreadcrumbs)} />
      
      <nav className={`flex items-center space-x-2 text-sm text-slate-600 ${className}`}>
        {fullBreadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400" />}
            {index === fullBreadcrumbs.length - 1 ? (
              <span className="text-slate-900 font-medium">{crumb.name}</span>
            ) : (
              <Link 
                to={crumb.url.replace('https://safetywarden.com', '')} 
                className="hover:text-slate-900 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default BreadcrumbNav;