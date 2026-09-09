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
  
  // 2. Initialize the mobile view state before routing so the first paint is content-first.
  const isMobile = window.innerWidth <= 768;
  const mobileToggle = document.createElement('button');
  mobileToggle.type = 'button';
  mobileToggle.className = 'mobile-view-toggle';
  mobileToggle.setAttribute('aria-label', 'Show graph view');
  mobileToggle.innerHTML = '<span class="mobile-view-toggle__graph" aria-hidden="true">◌</span><span class="mobile-view-toggle__list" aria-hidden="true">≡</span>';
  document.body.appendChild(mobileToggle);

  const setMobileView = (view) => {
    const graphView = view === 'graph';
    document.body.classList.toggle('mobile-graph-view', graphView);
    document.body.classList.toggle('mobile-content-view', !graphView);
    mobileToggle.setAttribute('aria-label', graphView ? 'Show content view' : 'Show graph view');
    mobileToggle.setAttribute('aria-pressed', String(graphView));
    if (graphView && Map.resizeMap) {
      Map.resizeMap();
      if (Map.simulation) Map.simulation.alpha(0.3).restart();
    }
  };

  if (isMobile) {
    document.body.classList.add('mobile-content-view');
    mobileToggle.addEventListener('click', () => {
      setMobileView(document.body.classList.contains('mobile-graph-view') ? 'content' : 'graph');
    });
  }

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
