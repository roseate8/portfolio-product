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

/**
 * Application initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mount gradient background (or grey if disabled in config)
  mountGradient();
  
  // 2. Initialize router
  Router.initialize();
});
