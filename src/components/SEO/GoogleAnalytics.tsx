import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (!gaTrackingId) {
      return;
    }

    const scheduleIdle = (callback: () => void) => {
      let idleId: number | null = null;
      const timer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(callback, { timeout: 10000 });
          return;
        }

        callback();
      }, 5000);

      return () => {
        window.clearTimeout(timer);
        if (idleId !== null) {
          window.cancelIdleCallback(idleId);
        }
      };
    };

    return scheduleIdle(() => {
      import('../../utils/analytics').then(({ GA_TRACKING_ID, initGA }) => {
        if (document.querySelector(`script[src*="${GA_TRACKING_ID}"]`)) {
          initGA();
          return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
        script.onload = initGA;
        document.head.appendChild(script);
      });
    });
  }, []);

  useEffect(() => {
    if (!import.meta.env.VITE_GA_TRACKING_ID) {
      return;
    }

    let idleId: number | null = null;
    const timer = window.setTimeout(() => {
      const track = () => {
        import('../../utils/analytics').then(({ trackPageView }) => {
          const url = `https://safetywarden.com${location.pathname}${location.search}`;
          trackPageView(url, document.title);
        });
      };

      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(track, { timeout: 10000 });
        return;
      }

      track();
    }, 5000);

    return () => {
      window.clearTimeout(timer);
      if (idleId !== null) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [location]);

  return null;
};

export default GoogleAnalytics;
