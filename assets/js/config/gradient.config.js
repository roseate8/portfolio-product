/**
 * @fileoverview Gradient Background Configuration
 * 
 * Central configuration file for the ShaderGradient background.
 * All visual parameters can be adjusted here without modifying component code.
 * 
 * @author Portfolio Project
 * @see {@link https://github.com/ruucm/shadergradient} ShaderGradient Documentation
 * 
 * @example
 * // To change the gradient colors:
 * // 1. Modify the `colors` object below
 * // 2. Save the file - changes apply on next page refresh (or HMR if enabled)
 */

// =============================================================================
// MASTER SWITCH
// =============================================================================

/**
 * Enable/disable the gradient background.
 * When false, shows the default grey background instead.
 */
export const enabled = true;

// =============================================================================
// TYPE DEFINITIONS (for IDE IntelliSense)
// =============================================================================

/**
 * @typedef {Object} ColorConfig
 * @property {string} primary - Main gradient color (hex)
 * @property {string} secondary - Secondary gradient color (hex)
 * @property {string} tertiary - Accent/third gradient color (hex)
 * @property {Object} background - Background fallback colors
 * @property {string} background.color1 - First background color
 * @property {string} background.color2 - Second background color
 */

/**
 * @typedef {Object} AnimationConfig
 * @property {boolean} enabled - Whether animation is active
 * @property {number} speed - Animation speed (0.1 = slow, 1.0 = fast)
 * @property {number} initialTime - Starting point of the animation cycle
 */

/**
 * @typedef {'plane' | 'sphere' | 'waterPlane'} ShapeType
 */

/**
 * @typedef {'3d' | 'env'} LightType
 */

/**
 * @typedef {'city' | 'dawn' | 'lobby'} EnvironmentPreset
 */

// =============================================================================
// COLORS - Primary visual appearance
// =============================================================================

/** @type {ColorConfig} */
export const colors = {
  // Main gradient colors - these blend together to create the effect
  primary: '#ebedff',     // Soft lavender - dominant color
  secondary: '#f3f2f8',   // Light grey-lavender - transition color
  tertiary: '#dbf8ff',    // Soft cyan - accent highlights
  
  // Fallback background (visible if gradient doesn't cover the viewport)
  background: {
    color1: '#000000',
    color2: '#000000',
  },
};

// =============================================================================
// ANIMATION - Motion and timing controls
// =============================================================================

/** @type {AnimationConfig} */
export const animation = {
  enabled: true,          // Toggle animation (false = static gradient)
  speed: 0.3,             // Recommended range: 0.1 (slow) to 1.0 (fast)
  initialTime: 0.2,       // Starting point in animation cycle
};

// =============================================================================
// GRAIN - Texture overlay settings
// =============================================================================

/**
 * Grain adds a subtle noise texture for a more organic, film-like feel.
 * Enable for a more tactile appearance; disable for a cleaner look.
 */
export const grain = {
  enabled: false,         // Toggle grain overlay
  blending: 0.5,          // Grain intensity (0 = invisible, 1 = heavy)
};

// =============================================================================
// CAMERA - Viewing angle and distance
// =============================================================================

/**
 * Camera settings control how the 3D gradient is viewed.
 * Think of it like positioning a camera to look at a 3D scene.
 */
export const camera = {
  distance: 2.91,         // How far the camera is from the gradient (1-5)
  polarAngle: 120,        // Vertical angle in degrees (0 = top, 180 = bottom)
  azimuthAngle: 180,      // Horizontal angle in degrees (0-360)
  zoom: 1,                // Additional zoom multiplier
  fov: 45,                // Field of view in degrees (affects perspective)
};

// =============================================================================
// SHAPE - Gradient geometry and wave properties
// =============================================================================

/**
 * Shape settings control the gradient's geometry and wave animations.
 * The 'waterPlane' type creates fluid, organic wave movements.
 */
export const shape = {
  /** @type {ShapeType} */
  type: 'waterPlane',     // Options: 'plane', 'sphere', 'waterPlane'
  
  // Wave properties (affect the organic movement)
  frequency: 5.5,         // Number of waves (higher = more detailed)
  strength: 3,            // Wave height/intensity
  density: 1,             // Wave density/spacing
  amplitude: 0,           // Additional wave amplitude modifier
};

// =============================================================================
// POSITION & ROTATION - 3D placement
// =============================================================================

/** Gradient mesh position in 3D space (X, Y, Z coordinates) */
export const position = {
  x: 0,                   // Horizontal position
  y: 1.8,                 // Vertical position (raised slightly)
  z: 0,                   // Depth position
};

/** Gradient mesh rotation in degrees */
export const rotation = {
  x: 0,                   // Tilt forward/backward
  y: 0,                   // Spin left/right
  z: -90,                 // Roll (rotated 90° counter-clockwise)
};

// =============================================================================
// RENDERING - Lighting and visual quality
// =============================================================================

/**
 * Rendering settings affect the visual quality and lighting of the gradient.
 * Higher pixelDensity improves quality but impacts performance.
 */
export const rendering = {
  brightness: 1.35,       // Overall brightness (0.5 = dim, 2.0 = bright)
  reflection: 0.1,        // Surface reflectivity (0 = matte, 1 = mirror)
  
  /** @type {LightType} */
  lightType: '3d',        // Lighting mode: '3d' (directional) or 'env' (ambient)
  
  /** @type {EnvironmentPreset} */
  envPreset: 'city',      // Environment map: 'city', 'dawn', 'lobby'
  
  wireframe: false,       // Debug mode: show mesh wireframe
  pixelDensity: 1,        // Render resolution (1 = normal, 2 = retina quality)
};

// =============================================================================
// COMPILED CONFIGURATIONS - Used by components (do not modify manually)
// =============================================================================

/**
 * Compiled gradient configuration object.
 * Maps user-friendly settings to ShaderGradient component props.
 * 
 * @readonly
 * @type {Object}
 */
export const gradientConfig = Object.freeze({
  // Animation settings
  animate: animation.enabled ? 'on' : 'off',
  uSpeed: animation.speed,
  uTime: animation.initialTime,
  
  // Color settings
  color1: colors.primary,
  color2: colors.secondary,
  color3: colors.tertiary,
  bgColor1: colors.background.color1,
  bgColor2: colors.background.color2,
  
  // Grain settings
  grain: grain.enabled ? 'on' : 'off',
  grainBlending: grain.blending,
  
  // Camera settings
  cDistance: camera.distance,
  cPolarAngle: camera.polarAngle,
  cAzimuthAngle: camera.azimuthAngle,
  cameraZoom: camera.zoom,
  
  // Shape settings
  type: shape.type,
  uFrequency: shape.frequency,
  uStrength: shape.strength,
  uDensity: shape.density,
  uAmplitude: shape.amplitude,
  
  // Position settings
  positionX: position.x,
  positionY: position.y,
  positionZ: position.z,
  
  // Rotation settings
  rotationX: rotation.x,
  rotationY: rotation.y,
  rotationZ: rotation.z,
  
  // Rendering settings
  brightness: rendering.brightness,
  reflection: rendering.reflection,
  lightType: rendering.lightType,
  envPreset: rendering.envPreset,
  wireframe: rendering.wireframe,
});

/**
 * Canvas configuration for ShaderGradientCanvas wrapper.
 * 
 * @readonly
 * @type {Object}
 */
export const canvasConfig = Object.freeze({
  pixelDensity: rendering.pixelDensity,
  fov: camera.fov,
});

// =============================================================================
// QUICK PRESETS - Predefined configurations (future enhancement)
// =============================================================================

/**
 * @todo Implement preset system for quick theme switching
 * 
 * Potential presets:
 * - 'default': Current configuration
 * - 'sunset': Warm orange/pink tones
 * - 'ocean': Blue/teal tones
 * - 'forest': Green/earth tones
 * - 'minimal': Subtle, muted colors
 */
