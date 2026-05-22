import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView, GA_TRACKING_ID } from '../../utils/analytics';

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    const url = `https://safetywarden.com${location.pathname}${location.search}`;
    trackPageView(url, document.title);
  }, [location]);

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
    </>
  );
};

export default GoogleAnalytics;