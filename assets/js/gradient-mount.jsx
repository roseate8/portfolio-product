/**
 * @fileoverview Gradient Mount
 * 
 * Bridges the vanilla JavaScript application with the React-based gradient.
 * Handles React mounting, error handling, and cleanup.
 * 
 * The gradient renders in an isolated DOM tree (#gradient-root) to keep
 * React completely separate from the existing vanilla JS application.
 * 
 * @module gradient-mount
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GradientBackground } from './components/GradientBackground.jsx';
import { enabled as gradientEnabled } from './config/gradient.config.js';

// =============================================================================
// CONSTANTS
// =============================================================================

/** @constant {string} DOM element ID for the gradient mount point */
const MOUNT_ELEMENT_ID = 'gradient-root';

/** @constant {string} Logging prefix for console messages */
const LOG_PREFIX = '[Gradient]';

// =============================================================================
// STATE
// =============================================================================

/**
 * React root instance reference.
 * Used for cleanup and preventing double-mounting.
 * 
 * @type {import('react-dom/client').Root | null}
 * @private
 */
let gradientRoot = null;

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Mounts the ShaderGradient background to the DOM.
 * 
 * This function should be called once during application initialization,
 * typically in the DOMContentLoaded event handler.
 * 
 * @returns {boolean} True if mount was successful, false otherwise
 * 
 * @example
 * document.addEventListener('DOMContentLoaded', () => {
 *   mountGradient();
 *   // ... rest of app initialization
 * });
 */
export function mountGradient() {
  // Check if gradient is enabled
  if (!gradientEnabled) {
    console.log(`${LOG_PREFIX} Disabled in config. Using default background.`);
    document.body.style.backgroundColor = '#e5e5e5'; // Default grey
    return false;
  }
  
  // Find the mount container
  const container = document.getElementById(MOUNT_ELEMENT_ID);
  
  if (!container) {
    console.warn(
      `${LOG_PREFIX} Mount point #${MOUNT_ELEMENT_ID} not found in DOM. ` +
      'Ensure the element exists in index.html.'
    );
    return false;
  }
  
  // Prevent double-mounting
  if (gradientRoot !== null) {
    console.warn(`${LOG_PREFIX} Already mounted, skipping duplicate mount.`);
    return false;
  }
  
  // Attempt to mount
  try {
    gradientRoot = createRoot(container);
    
    gradientRoot.render(
      <StrictMode>
        <GradientBackground />
      </StrictMode>
    );
    
    console.log(`${LOG_PREFIX} Mounted successfully.`);
    return true;
  } catch (error) {
    console.error(`${LOG_PREFIX} Failed to mount:`, error);
    gradientRoot = null;
    return false;
  }
}

/**
 * Unmounts the gradient background from the DOM.
 * 
 * Useful for:
 * - Cleanup during page transitions
 * - Toggling the gradient on/off
 * - Testing and development
 * 
 * @returns {boolean} True if unmount was successful, false if not mounted
 * 
 * @example
 * // Toggle gradient off
 * unmountGradient();
 * 
 * // Toggle gradient back on
 * mountGradient();
 */
export function unmountGradient() {
  if (gradientRoot === null) {
    console.warn(`${LOG_PREFIX} Not currently mounted, nothing to unmount.`);
    return false;
  }
  
  try {
    gradientRoot.unmount();
    gradientRoot = null;
    return true;
  } catch (error) {
    console.error(`${LOG_PREFIX} Failed to unmount:`, error);
    return false;
  }
}

/**
 * Checks if the gradient is currently mounted.
 * 
 * @returns {boolean} True if mounted, false otherwise
 */
export function isGradientMounted() {
  return gradientRoot !== null;
}

// =============================================================================
// FUTURE ENHANCEMENTS
// =============================================================================

/**
 * @todo Implement dynamic config updates without full remount
 * @todo Add visibility toggle that preserves the React tree
 * @todo Add performance monitoring hooks
 * @todo Consider lazy loading for better initial page performance
 */
