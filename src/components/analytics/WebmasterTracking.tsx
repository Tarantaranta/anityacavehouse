'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const DASHBOARD_URL = 'https://webmaster-app-qkpizxniwuglawerqvgi.vercel.app';
const WEBSITE_ID = 'fe137b22-c284-4d25-bb99-4204e7d87bbc'; // anityacavehouse.com

export function WebmasterTracking() {
  useEffect(() => {
    // Track pageview on mount and route changes
    const trackPageview = () => {
      fetch(`${DASHBOARD_URL}/api/analytics/track`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteId: WEBSITE_ID,
          eventType: 'pageview',
          pageUrl: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error);
    };

    trackPageview();

    // Track errors
    const handleError = (event: ErrorEvent) => {
      fetch(`${DASHBOARD_URL}/api/errors/log`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteId: WEBSITE_ID,
          errorType: 'JavaScript',
          errorMessage: event.message,
          stackTrace: event.error?.stack || '',
          pageUrl: window.location.href,
        }),
      }).catch(console.error);
    };

    // Track unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      fetch(`${DASHBOARD_URL}/api/errors/log`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteId: WEBSITE_ID,
          errorType: 'UnhandledPromiseRejection',
          errorMessage: String(event.reason),
          stackTrace: event.reason?.stack || '',
          pageUrl: window.location.href,
        }),
      }).catch(console.error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <>
      {/* Web Vitals Performance Tracking */}
      <Script
        src="https://unpkg.com/web-vitals@5/dist/web-vitals.iife.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && 'webVitals' in window) {
            const { onCLS, onLCP, onINP, onTTFB, onFCP } = (window as any).webVitals;

            const sendMetric = (metric: any) => {
              fetch(`${DASHBOARD_URL}/api/performance/metrics`, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  websiteId: WEBSITE_ID,
                  pageUrl: window.location.href,
                  metricName: metric.name,
                  metricValue: metric.value,
                  rating: metric.rating,
                }),
              }).catch(console.error);
            };

            onCLS(sendMetric);
            onLCP(sendMetric);
            onINP(sendMetric);
            onTTFB(sendMetric);
            onFCP(sendMetric);
          }
        }}
      />
    </>
  );
}
