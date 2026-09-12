/**
 * @fileoverview Main Application Entry Point
 * 
 * Initializes the gradient background and vanilla JS portfolio app.
 * Glass effect is CSS-only via _glass.scss.
 * 
 * @module app
 */

import '../css/main.scss';
import Router from './utils/Router.js';
import { mountGradient } from './gradient-mount.jsx';
import Analytics from './utils/Analytics.js';
import Map from './components/Map.js';
import { initializeMobileView } from './utils/MobileView.js';

/**
 * Application initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize PostHog Analytics
  const posthogApiKey = import.meta.env.VITE_POSTHOG_API_KEY;
  if (posthogApiKey) {
    Analytics.init(posthogApiKey);
    
    // Disable debug mode in production
    if (import.meta.env.PROD) {
      Analytics.setDebug(false);
    }
  } else {
    console.warn('[Analytics] No VITE_POSTHOG_API_KEY found - analytics disabled');
  }
  
  // Initialize responsive navigation before routing so mobile starts content-first.
  const isMobile = window.innerWidth <= 768;
  initializeMobileView({
    onGraphShown: () => {
      Map.resizeMap();
      if (Map.simulation) Map.simulation.alpha(0.3).restart();
    },
  });

  // 3. Mount gradient background (or grey if disabled in config)
  if (!isMobile) mountGradient();
  
  // 4. Initialize router
  Router.initialize();
});

/**
 * Track session summary before page unload
 */
window.addEventListener('beforeunload', () => {
  Analytics.trackSessionSummary();
});
