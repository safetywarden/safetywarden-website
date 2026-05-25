import { useEffect } from 'react';

type SEOHeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  structuredData?: object;
};

export default function SEOHead({
  title = 'SafetyWarden | Compliance Ready by Design',
  description = 'SafetyWarden helps industries and infrastructure establishments become inspection-ready with audits, evidence, CAPA and compliance intelligence.',
  keywords,
  canonical,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  noIndex = false,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    const currentCanonical = canonical ?? canonicalUrl ?? `https://safetywarden.com${window.location.pathname}`;
    document.title = title;

    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:url"]', 'property', 'og:url', currentCanonical);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (ogImage) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', currentCanonical);

    const robotsSelector = 'meta[name="robots"]';
    const robots = document.querySelector(robotsSelector) as HTMLMetaElement | null;
    if (noIndex) {
      setMeta(robotsSelector, 'name', 'robots', 'noindex, nofollow');
    } else if (robots) {
      robots.remove();
    }

    const scriptId = 'seohead-structured-data';
    const existingScript = document.getElementById(scriptId);
    if (structuredData) {
      const script = existingScript ?? document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      if (!existingScript) {
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [title, description, keywords, canonical, canonicalUrl, ogImage, ogType, noIndex, structuredData]);

  return null;
}
