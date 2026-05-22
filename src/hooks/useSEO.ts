import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const useSEO = (seoData: SEOData) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = seoData.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }

    // Update meta keywords
    if (seoData.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', seoData.keywords);
      }
    }

    // Update canonical URL
    const canonicalUrl = seoData.canonicalUrl || `https://safetywarden.com${location.pathname}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seoData.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seoData.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    // Add structured data
    if (seoData.structuredData) {
      const existingScript = document.querySelector('script[data-seo="dynamic"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'dynamic');
      script.textContent = JSON.stringify(seoData.structuredData);
      document.head.appendChild(script);
    }
  }, [seoData, location.pathname]);
};