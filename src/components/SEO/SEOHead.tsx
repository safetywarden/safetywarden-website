import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'SafetyWarden.com - Fire Safety Training & Compliance Platform',
  description = 'Complete fire & life safety compliance platform for enterprises. Digital audits, warden training, drill management, and outsourcing services across India & GCC.',
  keywords = 'fire safety training India, safety warden outsourcing, fire drill management app, safety audit checklist, incident reporting software, NFPA NBC compliance, evacuation drill tracking',
  canonicalUrl,
  ogImage = 'https://safetywarden.com/og-image.png',
  ogType = 'website',
  noIndex = false,
  structuredData
}) => {
  const fullTitle = title.includes('SafetyWarden') ? title : `${title} | SafetyWarden.com`;
  const currentUrl = canonicalUrl || `https://safetywarden.com${window.location.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="SafetyWarden.com" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="SafetyWarden.com" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bangalore" />
      <meta name="geo.position" content="12.9716;77.5946" />
      <meta name="ICBM" content="12.9716, 77.5946" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;