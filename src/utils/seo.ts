// SEO utility functions and structured data generators

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SafetyWarden",
  "alternateName": "Safety Warden",
  "description": "Enterprise compliance, audit governance and ESG/BRSR readiness platform for industrial and infrastructure operations.",
  "url": "https://www.safetywarden.com",
  "logo": "https://www.safetywarden.com/icon.png",
  "image": "https://www.safetywarden.com/images/optimized/hero-dashboard-1200.webp",
  "foundingDate": "2023",
  "founders": [
    {
      "@type": "Person",
      "name": "Shaw Alem",
      "jobTitle": "Founder & CEO",
      "image": "https://safetywarden.com/Profile%20pic.jpg"
    }
  ],
  "sameAs": [
    "https://linkedin.com/company/safetywarden",
    "https://youtube.com/@safetywarden"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-83413-39444",
    "contactType": "business inquiries",
    "email": "hello@safetywarden.com",
    "availableLanguage": ["English", "Hindi"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
      "timeZone": "Asia/Kolkata"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Manipal County Road",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560068",
    "addressCountry": "IN"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "India"
    },
    {
      "@type": "Place", 
      "name": "GCC Countries"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Safety Compliance Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Safety Audit Platform",
          "description": "Self-assessment against NFPA/NBC/UAE codes with automated reporting",
          "provider": {
            "@type": "Organization",
            "name": "SafetyWarden.com"
          }
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Safety Warden Training",
          "description": "Professional warden training with certification",
          "provider": {
            "@type": "Organization",
            "name": "SafetyWarden.com"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Emergency Drill Management",
          "description": "Real-time drill coordination and documentation",
          "provider": {
            "@type": "Organization",
            "name": "SafetyWarden.com"
          }
        }
      }
    ]
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "BCONZ International OPC Private Limited"
  }
});

export const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SafetyWarden",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://www.safetywarden.com",
  "description": "Enterprise compliance management software for audit digitization, inspection readiness, CAPA governance and ESG/BRSR workflows.",
  "publisher": {
    "@type": "Organization",
    "name": "BCONZ International OPC Private Limited",
    "url": "https://www.safetywarden.com"
  },
  "offers": {
    "@type": "Offer",
    "description": "Enterprise demo and pilot discussions available on request."
  }
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SafetyWarden",
  "url": "https://www.safetywarden.com",
  "description": "Enterprise compliance, audit governance and ESG/BRSR readiness platform for industrial and infrastructure operations.",
  "publisher": {
    "@type": "Organization",
    "name": "SafetyWarden"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.safetywarden.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const generateReviewSchema = (testimonials: any[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SafetyWarden.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: testimonials.length,
    bestRating: '5',
    worstRating: '1'
  },
  review: testimonials.map(testimonial => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: '5',
      worstRating: '1'
    },
    reviewBody: testimonial.text,
    publisher: {
      '@type': 'Organization',
      name: testimonial.company
    }
  }))
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  price?: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "url": service.url,
  "provider": {
    "@type": "Organization",
    "name": "SafetyWarden.com",
    "url": "https://safetywarden.com"
  },
  "serviceType": service.category,
  "areaServed": [
    {
      "@type": "Country",
      "name": "India"
    },
    {
      "@type": "Place",
      "name": "GCC Countries"
    }
  ],
  ...(service.price && {
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  })
});

export const generateCourseSchema = (course: {
  name: string;
  description: string;
  provider: string;
  duration: string;
  price: number;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": course.provider,
    "url": "https://safetywarden.com"
  },
  "timeRequired": course.duration,
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "url": course.url,
  "educationalLevel": "Professional",
  "teaches": "Fire Safety and Emergency Response",
  "courseMode": ["Online", "Classroom", "Hybrid"]
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SafetyWarden.com",
  "image": "https://www.safetywarden.com/icon.png",
  "telephone": "+91-83413-39444",
  "email": "hello@safetywarden.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Manipal County Road",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560068",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "url": "https://www.safetywarden.com",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "₹₹₹",
  "servedCuisine": "Safety Training and Compliance Services"
});

// Generate rich snippets for search results
export const generateHowToSchema = (title: string, steps: Array<{ name: string; text: string }>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": title,
  "description": `Step-by-step guide: ${title}`,
  "image": "https://www.safetywarden.com/images/optimized/hero-dashboard-1200.webp",
  "totalTime": "PT30M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "SafetyWarden Platform Access"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Computer or Mobile Device"
    }
  ],
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "url": `https://www.safetywarden.com/resources#step-${index + 1}`
  }))
});

// SEO page metadata configurations
export const seoPages = {
  home: {
    title: 'SafetyWarden.com - Train, Audit & Comply Without the Hassle',
    description: 'Complete fire & life safety compliance platform for enterprises. Digital audits, warden training, drill management, and outsourcing services across India & GCC.',
    keywords: 'fire safety training India, safety compliance platform, fire drill management, safety audit software, NFPA NBC compliance, emergency response training, safety warden outsourcing'
  },
  solutions: {
    title: 'Digital Inspection Software & Safety Audit Solutions | SafetyWarden™',
    description: 'Complete safety audit software with offline inspection app, audit checklist software, and corrective action tracking. Digitize inspections for petrol pumps, factories, construction sites, hospitals. Fire safety audit, HSE software, quality inspection app for India, UAE, Saudi Arabia. Real-time inspection dashboard & paperless solution.',
    keywords: 'safety warden,digital inspection software,safety audit software,inspection app,inspection checklist software,compliance management software,EHS audit software,mobile inspection app,digital audit platform,safety compliance software,workplace safety software,facility inspection software,inspection reporting software,offline inspection app,audit checklist software,asset inspection app,preventive maintenance checklist app,risk assessment digital tool,corrective action tracking software,inspection management system,mobile audit checklist,paperless inspection solution,real-time inspection dashboard,petrol pump safety checklist,fuel station inspection app,oil and gas inspection software,factory safety audit software,industrial safety inspection app,quality inspection app,fire safety audit software,fire inspection checklist app,building safety inspection software,construction site safety app,hospital safety audit software,digitize inspections,field inspection automation,QR code asset inspection system,digital evidence capture for inspections,audit automation platform,multi-site compliance dashboard,safety audit software india,inspection checklist app india,EHS software UAE,compliance audit software Saudi Arabia,facility inspection app Dubai'
  },
  training: {
    title: 'Professional Safety Training & Certification - NEBOSH, Fire Warden',
    description: 'Industry-recognized safety training with digital certificates. Fire warden, NEBOSH, first aid, and specialized safety courses across India and GCC.',
    keywords: 'safety training certification, NEBOSH training India, fire warden training, first aid training, safety officer certification, professional safety courses'
  },
  marketplace: {
    title: 'Safety Equipment Marketplace - Fire Extinguishers, PPE & More',
    description: 'India\'s largest safety equipment marketplace. Connect with verified vendors for fire extinguishers, safety equipment, and compliance services.',
    keywords: 'safety equipment marketplace, fire extinguisher suppliers, safety equipment vendors India, PPE suppliers, fire safety equipment, emergency lighting'
  },
  manpower: {
    title: 'Safety Manpower Services - Trained Safety Officers & Fire Wardens',
    description: 'Professional safety staffing solutions. Temporary, contract-to-hire, and permanent placement of trained safety officers, fire wardens, and HSE professionals.',
    keywords: 'safety manpower services, safety officer staffing, fire warden outsourcing, HSE staffing solutions, safety personnel recruitment, trained safety staff'
  },
  industries: {
    title: 'Industry-Specific Safety Solutions - IT Parks, Healthcare, Manufacturing',
    description: 'Tailored safety compliance solutions for IT parks, healthcare facilities, manufacturing plants, warehouses, retail malls, and other industries.',
    keywords: 'industry safety solutions, IT park fire safety, hospital safety compliance, manufacturing safety, warehouse safety, retail mall safety'
  },
  pricing: {
    title: 'Safety Compliance Pricing - Transparent Plans for Every Organization',
    description: 'Simple, transparent pricing for safety compliance solutions. Plans starting from ₹9,900/month with training packs and outsourcing options.',
    keywords: 'safety compliance pricing, fire safety training cost, safety audit pricing, compliance software pricing, safety training packages'
  },
  about: {
    title: 'About SafetyWarden - Operational Compliance Governance Platform',
    description: 'SafetyWarden helps industrial and infrastructure organizations digitize audits, inspections, evidence, CAPA and ESG/BRSR governance into one operational compliance platform.',
    keywords: 'operational compliance governance, audit workflow software, evidence traceability, CAPA governance, regulatory intelligence platform, ESG BRSR governance, industrial compliance software, SafetyWarden'
  },
  contact: {
    title: 'Contact SafetyWarden.com - Get Expert Safety Compliance Help',
    description: 'Contact our safety experts for compliance solutions. Call +91-83413-39444 or email hello@safetywarden.com. Bangalore office with India & GCC coverage.',
    keywords: 'contact SafetyWarden, safety compliance consultation, fire safety experts contact, safety training inquiry, compliance help India'
  },
  resources: {
    title: 'ESG Governance Software & BRSR Reporting Platform | SafetyWarden',
    description: 'Evidence-backed ESG governance software and BRSR reporting platform for enterprise sustainability compliance, ESG audits, evidence management, CAPA and disclosure readiness.',
    keywords: 'ESG governance software, BRSR reporting platform, sustainability compliance platform, ESG audit software, BRSR readiness, sustainability governance system, ESG evidence management, enterprise ESG reporting'
  }
};

Object.assign(seoPages, {
  home: {
    title: 'SafetyWarden | Enterprise Compliance & Audit Governance Platform',
    description: 'SafetyWarden helps industries and infrastructure establishments become compliance-ready by design through audit digitization, ESG/BRSR governance, inspection workflows and operational compliance systems.',
    keywords: 'compliance management software, audit management platform, inspection readiness, ESG software India, BRSR compliance platform, EHS governance platform'
  },
  solutions: {
    title: 'Audit Digitization & Compliance Management Software | SafetyWarden',
    description: 'Digitize inspections, audits, evidence capture, CAPA workflows and operational compliance governance across industrial and infrastructure sites.',
    keywords: 'audit digitization platform, compliance management software, industrial inspection software, CAPA management platform, audit evidence management, EHS governance platform'
  },
  industries: {
    title: 'Industrial Compliance Software for Multi-Site Operations | SafetyWarden',
    description: 'Compliance governance workflows for manufacturing, infrastructure, utilities, engineering and industrial operations that need inspection readiness and audit traceability.',
    keywords: 'industrial compliance software, manufacturing audit software, infrastructure compliance platform, multi-site audit management, safety governance system'
  },
  about: {
    title: 'About SafetyWarden | Compliance Governance Platform',
    description: 'SafetyWarden is a compliance governance and audit digitization platform developed by BCONZ International OPC Private Limited, Bengaluru, India.',
    keywords: 'operational compliance governance, audit workflow software, evidence traceability, CAPA governance, regulatory intelligence platform, ESG BRSR governance, industrial compliance software, SafetyWarden'
  },
  contact: {
    title: 'Schedule a Compliance Demo | SafetyWarden',
    description: 'Discuss audit digitization, ESG/BRSR governance and inspection readiness workflows with the SafetyWarden team.',
    keywords: 'schedule compliance demo, audit digitization demo, ESG BRSR demo, inspection readiness consultation, compliance software pilot'
  },
  resources: {
    title: 'ESG & BRSR Governance Platform | SafetyWarden',
    description: 'Digitize ESG and BRSR governance workflows with SafetyWarden’s enterprise-ready compliance, audit and sustainability reporting platform.',
    keywords: 'BRSR reporting, ESG governance, sustainability audits, ESG compliance India, ESG governance software, BRSR compliance platform'
  }
});

export const generatePageSEO = (pageKey: keyof typeof seoPages, customData?: Partial<SEOHeadProps>) => {
  const pageData = seoPages[pageKey];
  return {
    ...pageData,
    ...customData
  };
};
