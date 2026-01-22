/**
 * @fileoverview GradientBackground Component
 * 
 * Renders a ShaderGradient as a fixed full-viewport background layer.
 * This component is isolated from the main vanilla JS application and
 * renders in its own React tree.
 * 
 * @module components/GradientBackground
 * @see {@link ../config/gradient.config.js} Configuration file
 */

import { Suspense, memo } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { gradientConfig, canvasConfig } from '../config/gradient.config.js';

// =============================================================================
// STYLES - Inline styles for the gradient container
// =============================================================================

/**
 * Container styles for fixed full-viewport positioning.
 * Uses pointer-events: none to allow clicks to pass through to content.
 * 
 * @constant {React.CSSProperties}
 */
const CONTAINER_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1,
  pointerEvents: 'none',
};

// =============================================================================
// LOADING FALLBACK
// =============================================================================

/**
 * Loading fallback component displayed while Three.js initializes.
 * Uses a subtle gradient that matches the eventual gradient colors.
 * 
 * @returns {JSX.Element} Loading placeholder
 */
function LoadingFallback() {
  return (
    <div
      style={{
        ...CONTAINER_STYLES,
        background: `linear-gradient(135deg, ${gradientConfig.color1}, ${gradientConfig.color3})`,
        opacity: 0.5,
      }}
      aria-hidden="true"
    />
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * GradientBackground Component
 * 
 * Renders a full-viewport ShaderGradient background with:
 * - Fixed positioning behind all content
 * - Suspense boundary for async loading
 * - Memoization to prevent unnecessary re-renders
 * 
 * @component
 * @returns {JSX.Element} The gradient background
 * 
 * @example
 * // Rendered automatically by gradient-mount.jsx
 * // Configuration is controlled via gradient.config.js
 */
function GradientBackground() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShaderGradientCanvas
        style={CONTAINER_STYLES}
        pixelDensity={canvasConfig.pixelDensity}
        fov={canvasConfig.fov}
      >
        <ShaderGradient {...gradientConfig} />
      </ShaderGradientCanvas>
    </Suspense>
  );
}

// Memoize to prevent re-renders (config is static)
export const MemoizedGradientBackground = memo(GradientBackground);

// Default export for simpler imports
export { MemoizedGradientBackground as GradientBackground };
export default MemoizedGradientBackground;
