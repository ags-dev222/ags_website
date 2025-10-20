// Google Analytics Integration
export const initializeAnalytics = () => {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    });
  }
};

// Track events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'general',
      event_label: parameters.label,
      value: parameters.value,
      ...parameters
    });
  }
};

// Track user interactions
export const trackUserAction = (action, details = {}) => {
  trackEvent('user_action', {
    category: 'user_interaction',
    action: action,
    ...details
  });
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    category: 'forms',
    label: formName,
    success: success
  });
};

// Track download events
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    category: 'downloads',
    label: fileName,
    file_type: fileType
  });
};

// Track outbound links
export const trackOutboundLink = (url, linkText) => {
  trackEvent('click', {
    category: 'outbound_links',
    label: url,
    text: linkText
  });
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      // Wait for all resources to load
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domContentLoadTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        const firstPaintTime = window.performance.getEntriesByType('paint')
          .find(entry => entry.name === 'first-contentful-paint')?.startTime;

        // Track performance metrics
        trackEvent('page_performance', {
          category: 'performance',
          page_load_time: Math.round(pageLoadTime),
          dom_content_load_time: Math.round(domContentLoadTime),
          first_contentful_paint: Math.round(firstPaintTime || 0)
        });

        // Track Core Web Vitals
        trackWebVitals();
      }, 0);
    });
  }
};

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackEvent('web_vital_lcp', {
        category: 'web_vitals',
        value: Math.round(lastEntry.startTime)
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      if (firstInput) {
        trackEvent('web_vital_fid', {
          category: 'web_vitals',
          value: Math.round(firstInput.processingStart - firstInput.startTime)
        });
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      // Send CLS when page is about to be unloaded
      window.addEventListener('beforeunload', () => {
        trackEvent('web_vital_cls', {
          category: 'web_vitals',
          value: Math.round(clsValue * 1000) / 1000
        });
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Track scroll depth
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const achieved = [];

    const trackScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !achieved.includes(milestone)) {
            achieved.push(milestone);
            trackEvent('scroll_depth', {
              category: 'engagement',
              label: `${milestone}%`,
              value: milestone
            });
          }
        });
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }
};

// Error tracking
export const trackError = (error, context = {}) => {
  trackEvent('javascript_error', {
    category: 'errors',
    label: error.message,
    stack: error.stack,
    ...context
  });
};

// Custom user timing
export const startTiming = (name) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.performance.mark(`${name}-start`);
  }
};

export const endTiming = (name) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.performance.mark(`${name}-end`);
    window.performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = window.performance.getEntriesByName(name)[0];
    if (measure) {
      trackEvent('custom_timing', {
        category: 'performance',
        label: name,
        value: Math.round(measure.duration)
      });
    }
  }
};

// Session tracking
export const trackSession = () => {
  const sessionStart = Date.now();
  let isActive = true;
  
  // Track session start
  trackEvent('session_start', {
    category: 'session',
    timestamp: sessionStart
  });
  
  // Track session end on page unload
  window.addEventListener('beforeunload', () => {
    if (isActive) {
      const sessionDuration = Date.now() - sessionStart;
      trackEvent('session_end', {
        category: 'session',
        duration: Math.round(sessionDuration / 1000) // in seconds
      });
    }
  });
  
  // Track user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
      isActive = true;
    }, { passive: true });
  });
  
  // Track inactivity
  let inactivityTimer;
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      isActive = false;
    }, 30000); // 30 seconds of inactivity
  };
  
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, { passive: true });
  });
  
  resetInactivityTimer();
};

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackUserAction,
  trackFormSubmission,
  trackDownload,
  trackOutboundLink,
  trackPerformance,
  trackWebVitals,
  trackScrollDepth,
  trackError,
  startTiming,
  endTiming,
  trackSession
};
