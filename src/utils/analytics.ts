// Google Analytics and tracking utilities
import { track as trackVercelEvent } from '@vercel/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  try {
    trackVercelEvent(action, {
      category,
      label: label || '',
      value: value ?? 0,
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Vercel Analytics event failed.', error);
    }
  }

  if (typeof window !== 'undefined' && GA_TRACKING_ID && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', 'engagement', conversionType, value);
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Track demo requests
export const trackDemoRequest = (source: string) => {
  trackEvent('demo_request', 'lead_generation', source);
  trackConversion('demo_request');
};

export const trackCtaClick = (ctaName: string, source: string) => {
  trackEvent('cta_click', 'conversion_cta', `${source}:${ctaName}`);
};

export const trackMarketingPageVisit = (pageName: string, path: string) => {
  trackEvent('marketing_page_visit', 'page_engagement', `${pageName}:${path}`);
};

// Track phone calls
export const trackPhoneCall = () => {
  trackEvent('phone_call', 'engagement', 'header_phone');
  trackConversion('phone_call');
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'engagement', 'floating_button');
  trackConversion('whatsapp_click');
};
