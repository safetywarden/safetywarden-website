// Performance optimization utilities

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload hero images
  const heroImages = [
    '/hori logo wh.png',
    '/icon.png'
  ];

  heroImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize Core Web Vitals
export const optimizeWebVitals = () => {
  // Reduce layout shift by setting image dimensions
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const imgElement = img as HTMLImageElement;
    if (imgElement.naturalWidth && imgElement.naturalHeight) {
      imgElement.width = imgElement.naturalWidth;
      imgElement.height = imgElement.naturalHeight;
    }
  });
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Critical CSS inlining helper
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .hero-section { display: block; }
    .nav-header { position: sticky; top: 0; z-index: 50; }
    .loading-spinner { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};