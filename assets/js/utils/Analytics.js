/**
 * =============================================================================
 * ANALYTICS MODULE - PostHog Integration
 * =============================================================================
 *
 * A comprehensive analytics tracking module for the portfolio website.
 * Implements the Singleton pattern to ensure consistent state across the app.
 *
 * @module Analytics
 * @version 2.0.0
 *
 * EVENTS TRACKED:
 * ┌─────────────────────┬────────────────────────────────────────────────────┐
 * │ Event               │ Description                                        │
 * ├─────────────────────┼────────────────────────────────────────────────────┤
 * │ node_viewed         │ User views a node (graph, index, direct URL)       │
 * │ content_expanded    │ User expands content (read more, tabs, toggles)    │
 * │ outbound_clicked    │ User clicks external links (contact, social)       │
 * │ media_viewed        │ User opens media in gallery                        │
 * │ scroll_milestone    │ User scrolls to 25/50/75/100% depth                │
 * │ timeline_changed    │ User interacts with date slider                    │
 * │ session_summary     │ Fired on page unload with session stats            │
 * └─────────────────────┴────────────────────────────────────────────────────┘
 *
 * AUTO-CAPTURED BY POSTHOG:
 * - $pageview, $pageleave, $autocapture, $rageclick, session recordings
 *
 * =============================================================================
 */

import posthog from 'posthog-js';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Event names - centralized to prevent typos and enable easy renaming
 * @readonly
 * @enum {string}
 */
const EVENTS = Object.freeze({
    NODE_VIEWED: 'node_viewed',
    CONTENT_EXPANDED: 'content_expanded',
    OUTBOUND_CLICKED: 'outbound_clicked',
    MEDIA_VIEWED: 'media_viewed',
    SCROLL_MILESTONE: 'scroll_milestone',
    TIMELINE_CHANGED: 'timeline_changed',
    SESSION_SUMMARY: 'session_summary',
});

/**
 * View source types - how users navigate to nodes
 * @readonly
 * @enum {string}
 */
const VIEW_SOURCES = Object.freeze({
    GRAPH_CLICK: 'graph_click',
    INDEX_LINK: 'index_link',
    CONNECTION_LINK: 'connection_link',
    DIRECT_URL: 'direct_url',
    BREADCRUMB: 'breadcrumb',
});

/**
 * Expansion types for content_expanded event
 * @readonly
 * @enum {string}
 */
const EXPANSION_TYPES = Object.freeze({
    READ_MORE: 'read_more',
    TAB: 'tab',
    CONTACT_LINKS: 'contact_links',
});

/**
 * Click types for outbound_clicked event
 * @readonly
 * @enum {string}
 */
const CLICK_TYPES = Object.freeze({
    CONTACT: 'contact',
    SOCIAL: 'social',
    RESUME: 'resume',
});

/**
 * Device breakpoints (in pixels)
 * @readonly
 */
const BREAKPOINTS = Object.freeze({
    MOBILE: 768,
    TABLET: 1024,
});

/**
 * Configuration defaults
 * @readonly
 */
const DEFAULT_CONFIG = Object.freeze({
    debug: true,
    scrollMilestones: [25, 50, 75, 100],
    engagedSessionThreshold: 3,
    apiHost: 'https://us.i.posthog.com',
    maxNodesInPath: 20,
    timelineDebounceMs: 300,
});

// =============================================================================
// LOGGER UTILITY
// =============================================================================

/**
 * Creates a namespaced logger with emoji support
 * @param {boolean} enabled - Whether logging is enabled
 * @returns {Function} Logger function
 */
const createLogger = (enabled) => {
    return (emoji, message, data = null) => {
        if (!enabled) return;

        const prefix = `[Analytics] ${emoji}`;
        const args = data !== null ? [prefix, message, data] : [prefix, message];
        console.log(...args);
    };
};

// =============================================================================
// TYPE DEFINITIONS (JSDoc)
// =============================================================================

/**
 * @typedef {Object} NodeData
 * @property {string} uuid - Unique identifier
 * @property {string} title - Display title
 * @property {string} [type] - Node type (e.g., 'artifact', 'path')
 * @property {string} [uri] - Node URI path
 * @property {boolean} [isFeatured] - Whether node is featured
 * @property {boolean} [isHighlighted] - Whether node is highlighted
 */

/**
 * @typedef {Object} SessionState
 * @property {Set<string>} uniqueNodes - Unique node IDs viewed
 * @property {string[]} viewedNodesList - Ordered list of viewed node IDs
 * @property {number} expansionCount - Number of content expansions
 * @property {number} outboundClickCount - Number of outbound clicks
 * @property {number} maxDepthReached - Deepest node level reached
 * @property {string|null} startTime - ISO timestamp of session start
 */

/**
 * @typedef {Object} AnalyticsConfig
 * @property {boolean} debug - Enable console logging
 * @property {number[]} scrollMilestones - Scroll depth thresholds to track
 * @property {number} engagedSessionThreshold - Min nodes for engaged session
 */

// =============================================================================
// ANALYTICS CLASS
// =============================================================================

/**
 * Analytics singleton class for tracking user interactions
 * Uses private fields (#) for encapsulation
 */
class AnalyticsTracker {
    // -------------------------------------------------------------------------
    // Private Fields
    // -------------------------------------------------------------------------

    /** @type {boolean} */
    #isInitialized = false;

    /** @type {AnalyticsConfig} */
    #config;

    /** @type {Function} */
    #log;

    /** @type {SessionState} */
    #session = {
        uniqueNodes: new Set(),
        viewedNodesList: [],
        expansionCount: 0,
        outboundClickCount: 0,
        maxDepthReached: 0,
        startTime: null,
    };

    /** @type {Map<string, Set<number>>} - nodeId -> Set of reached milestones */
    #scrollMilestones = new Map();

    /** @type {NodeData|null} */
    #currentNode = null;

    /** @type {NodeData|null} */
    #previousNode = null;

    /** @type {string} */
    #dataSource = 'unknown';

    /** @type {string|null} - Cached device type */
    #cachedDeviceType = null;

    /** @type {number|null} - Timeline debounce timer */
    #timelineDebounceTimer = null;

    /** @type {string|null} - Last tracked timeline date (for debouncing) */
    #lastTimelineDate = null;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    /**
     * Creates Analytics instance with optional config overrides
     * @param {Partial<AnalyticsConfig>} [configOverrides={}]
     */
    constructor(configOverrides = {}) {
        this.#config = { ...DEFAULT_CONFIG, ...configOverrides };
        this.#log = createLogger(this.#config.debug);
    }

    // -------------------------------------------------------------------------
    // Public API - Initialization
    // -------------------------------------------------------------------------

    /**
     * Initialize PostHog SDK with the provided API key
     *
     * @param {string} apiKey - PostHog project API key (starts with phc_)
     * @param {Object} [options={}] - Additional PostHog configuration options
     * @returns {boolean} Whether initialization was successful
     *
     * @example
     * Analytics.init('phc_your_api_key_here');
     */
    init(apiKey, options = {}) {
        // Guard: Already initialized
        if (this.#isInitialized) {
            this.#log('⚠️', 'Analytics already initialized - skipping');
            return false;
        }

        // Guard: Missing API key
        if (!apiKey?.trim()) {
            this.#log('❌', 'No API key provided - analytics disabled');
            return false;
        }

        try {
            this.#initializePostHog(apiKey, options);
            this.#initializeSession();

            this.#isInitialized = true;
            this.#log('🚀', 'Analytics initialized', {
                apiKey: this.#maskApiKey(apiKey),
            });

            return true;
        } catch (error) {
            this.#log('❌', 'Failed to initialize PostHog', { error: error.message });
            return false;
        }
    }

    /**
     * Set the data source identifier (called after data loads)
     * @param {'supabase' | 'json-fallback'} source
     */
    setDataSource(source) {
        this.#dataSource = source;
        this.#updateSuperProperties();
    }

    /**
     * Enable or disable debug logging
     * @param {boolean} enabled
     */
    setDebug(enabled) {
        this.#config.debug = enabled;
        this.#log = createLogger(enabled);
    }

    // -------------------------------------------------------------------------
    // Public API - Event Tracking
    // -------------------------------------------------------------------------

    /**
     * Track when a user views a node
     *
     * @param {NodeData} nodeData - The node being viewed
     * @param {string} [viewSource='graph_click'] - Navigation source
     * @param {NodeData|null} [fromNode=null] - Previous node (for journey tracking)
     *
     * @example
     * Analytics.trackNodeViewed(nodeData, VIEW_SOURCES.GRAPH_CLICK);
     */
    trackNodeViewed(nodeData, viewSource = VIEW_SOURCES.GRAPH_CLICK, fromNode = null) {
        if (!this.#guardInitialized() || !nodeData) return;

        try {
            // Update internal state
            this.#previousNode = this.#currentNode;
            this.#currentNode = nodeData;
            this.#session.uniqueNodes.add(nodeData.uuid);
            this.#session.viewedNodesList.push(nodeData.uuid);

            // Track max depth
            const depth = this.#calculateNodeDepth(nodeData);
            this.#session.maxDepthReached = Math.max(this.#session.maxDepthReached, depth);

            // Build and send event
            const properties = this.#buildNodeViewedProperties(nodeData, viewSource, fromNode, depth);
            this.#captureEvent(EVENTS.NODE_VIEWED, properties);

            // Update context and reset scroll tracking
            this.#updateSuperProperties();
            this.#scrollMilestones.set(nodeData.uuid, new Set());

            this.#log('👁️', `node_viewed: ${nodeData.title}`, properties);
        } catch (error) {
            this.#logError('trackNodeViewed', error);
        }
    }

    /**
     * Track when user expands content (read more, tabs, etc.)
     *
     * @param {NodeData|null} nodeData - Current node context
     * @param {string} expansionType - Type of expansion (see EXPANSION_TYPES)
     * @param {string|null} [tabName=null] - Tab name if type is 'tab'
     */
    trackContentExpanded(nodeData, expansionType, tabName = null) {
        if (!this.#guardInitialized()) return;

        try {
            this.#session.expansionCount++;

            const contextNode = nodeData || this.#currentNode;
            const properties = {
                node_id: contextNode?.uuid ?? null,
                node_title: contextNode?.title ?? null,
                expansion_type: expansionType,
                tab_name: tabName,
                expansion_count: this.#session.expansionCount,
            };

            this.#captureEvent(EVENTS.CONTENT_EXPANDED, properties);
            this.#log('📖', `content_expanded: ${expansionType}`, properties);
        } catch (error) {
            this.#logError('trackContentExpanded', error);
        }
    }

    /**
     * Track when user clicks an external/outbound link
     *
     * @param {string} clickType - Category: 'contact', 'social', 'resume'
     * @param {string} destination - Specific target: 'email', 'linkedin', etc.
     * @param {string|null} [destinationUrl=null] - Full URL
     * @param {NodeData|null} [nodeContext=null] - Node user was viewing
     */
    trackOutboundClicked(clickType, destination, destinationUrl = null, nodeContext = null) {
        if (!this.#guardInitialized()) return;

        try {
            this.#session.outboundClickCount++;

            const contextNode = nodeContext || this.#currentNode;
            const properties = {
                click_type: clickType,
                destination,
                destination_url: destinationUrl,
                node_context: contextNode?.uuid ?? 'homepage',
                node_context_title: contextNode?.title ?? 'Homepage',
                session_node_count: this.#session.uniqueNodes.size,
                outbound_count: this.#session.outboundClickCount,
            };

            this.#captureEvent(EVENTS.OUTBOUND_CLICKED, properties);
            this.#log('🔗', `outbound_clicked: ${destination}`, properties);
        } catch (error) {
            this.#logError('trackOutboundClicked', error);
        }
    }

    /**
     * Track when user opens media in gallery/lightbox
     *
     * @param {NodeData|null} nodeData - Node containing the media
     * @param {'image' | 'video'} mediaType - Type of media
     * @param {number} mediaIndex - Zero-based position in gallery
     * @param {string|null} [mediaAlt=null] - Alt text for accessibility tracking
     */
    trackMediaViewed(nodeData, mediaType, mediaIndex, mediaAlt = null) {
        if (!this.#guardInitialized()) return;

        try {
            const contextNode = nodeData || this.#currentNode;
            const properties = {
                node_id: contextNode?.uuid ?? null,
                node_title: contextNode?.title ?? null,
                media_type: mediaType,
                media_index: mediaIndex,
                media_alt: mediaAlt,
            };

            this.#captureEvent(EVENTS.MEDIA_VIEWED, properties);
            this.#log('🖼️', `media_viewed: ${mediaType} #${mediaIndex}`, properties);
        } catch (error) {
            this.#logError('trackMediaViewed', error);
        }
    }

    /**
     * Track scroll depth milestones (fires once per milestone per node)
     *
     * @param {NodeData|null} nodeData - Current node context
     * @param {number} depthPercent - Scroll depth (25, 50, 75, or 100)
     * @param {number|null} [contentHeight=null] - Total scrollable height
     * @param {number|null} [viewportHeight=null] - Visible viewport height
     */
    trackScrollMilestone(nodeData, depthPercent, contentHeight = null, viewportHeight = null) {
        if (!this.#guardInitialized()) return;

        const contextNode = nodeData || this.#currentNode;
        if (!contextNode?.uuid) return;

        try {
            // Get or create milestone tracker for this node
            const nodeId = contextNode.uuid;
            if (!this.#scrollMilestones.has(nodeId)) {
                this.#scrollMilestones.set(nodeId, new Set());
            }

            const reachedMilestones = this.#scrollMilestones.get(nodeId);

            // Guard: Already tracked this milestone for this node
            if (reachedMilestones.has(depthPercent)) return;

            reachedMilestones.add(depthPercent);

            const properties = {
                node_id: nodeId,
                node_title: contextNode.title,
                depth_percent: depthPercent,
                content_height: contentHeight,
                viewport_height: viewportHeight,
            };

            this.#captureEvent(EVENTS.SCROLL_MILESTONE, properties);
            this.#log('📜', `scroll_milestone: ${depthPercent}%`, properties);
        } catch (error) {
            this.#logError('trackScrollMilestone', error);
        }
    }

    /**
     * Track timeline/slider interaction (debounced to prevent spam)
     *
     * @param {number} sliderValue - Current slider position
     * @param {string} selectedDate - Date corresponding to position (YYYY-MM-DD)
     * @param {'forward' | 'backward' | null} [direction=null] - Movement direction
     */
    trackTimelineChanged(sliderValue, selectedDate, direction = null) {
        if (!this.#guardInitialized()) return;

        // Debounce: Don't fire if same date as last event
        if (selectedDate === this.#lastTimelineDate) return;

        // Clear existing debounce timer
        if (this.#timelineDebounceTimer) {
            clearTimeout(this.#timelineDebounceTimer);
        }

        // Debounce the actual tracking
        this.#timelineDebounceTimer = setTimeout(() => {
            try {
                this.#lastTimelineDate = selectedDate;

                const properties = {
                    slider_value: sliderValue,
                    selected_date: selectedDate,
                    direction,
                };

                this.#captureEvent(EVENTS.TIMELINE_CHANGED, properties);
                this.#log('📅', `timeline_changed: ${selectedDate}`, properties);
            } catch (error) {
                this.#logError('trackTimelineChanged', error);
            }
        }, this.#config.timelineDebounceMs);
    }

    /**
     * Track session summary on page unload
     * Uses sendBeacon for reliable delivery during page close
     *
     * Should be called from window.beforeunload event
     */
    trackSessionSummary() {
        if (!this.#guardInitialized()) return;

        try {
            const sessionDurationSeconds = this.#calculateSessionDuration();
            const isEngaged = this.#session.uniqueNodes.size >= this.#config.engagedSessionThreshold;

            const properties = {
                total_nodes_viewed: this.#session.viewedNodesList.length,
                unique_nodes_viewed: this.#session.uniqueNodes.size,
                max_depth_reached: this.#session.maxDepthReached,
                total_expansions: this.#session.expansionCount,
                total_outbound_clicks: this.#session.outboundClickCount,
                session_duration_seconds: sessionDurationSeconds,
                engaged_session: isEngaged,
                nodes_path: this.#session.viewedNodesList.slice(0, this.#config.maxNodesInPath),
            };

            // Use sendBeacon for reliability during page unload
            this.#captureEvent(EVENTS.SESSION_SUMMARY, properties, { transport: 'sendBeacon' });

            // Update person properties for cross-session analysis
            this.#updatePersonProperties();

            this.#log('📊', 'session_summary', properties);
        } catch (error) {
            this.#logError('trackSessionSummary', error);
        }
    }

    // -------------------------------------------------------------------------
    // Public API - Getters
    // -------------------------------------------------------------------------

    /** @returns {NodeData|null} Currently viewed node */
    getCurrentNode() {
        return this.#currentNode;
    }

    /** @returns {boolean} Whether user has viewed 3+ nodes */
    isEngagedSession() {
        return this.#session.uniqueNodes.size >= this.#config.engagedSessionThreshold;
    }

    /** @returns {boolean} Whether analytics is initialized */
    isReady() {
        return this.#isInitialized;
    }

    /** @returns {number} Number of unique nodes viewed this session */
    getUniqueNodesCount() {
        return this.#session.uniqueNodes.size;
    }

    // -------------------------------------------------------------------------
    // Public API - Constants (for external use)
    // -------------------------------------------------------------------------

    /** Event name constants */
    static get EVENTS() {
        return EVENTS;
    }

    /** View source constants */
    static get VIEW_SOURCES() {
        return VIEW_SOURCES;
    }

    /** Expansion type constants */
    static get EXPANSION_TYPES() {
        return EXPANSION_TYPES;
    }

    /** Click type constants */
    static get CLICK_TYPES() {
        return CLICK_TYPES;
    }

    // -------------------------------------------------------------------------
    // Private Methods - Initialization
    // -------------------------------------------------------------------------

    /**
     * Initialize PostHog SDK with configuration
     * @private
     */
    #initializePostHog(apiKey, customOptions) {
        const defaultOptions = {
            api_host: this.#config.apiHost,

            // Auto-capture configuration
            autocapture: true,
            capture_pageview: true,
            capture_pageleave: true,

            // Session recording configuration
            disable_session_recording: false,
            session_recording: {
                maskAllInputs: false,
                maskInputOptions: { password: true },
            },

            // Persistence
            persistence: 'localStorage',

            // Lifecycle callbacks
            loaded: () => {
                this.#log('✅', 'PostHog SDK loaded');
                this.#onPostHogReady();
            },
        };

        posthog.init(apiKey, { ...defaultOptions, ...customOptions });
    }

    /**
     * Initialize session state
     * @private
     */
    #initializeSession() {
        this.#session.startTime = new Date().toISOString();
        this.#cachedDeviceType = this.#detectDeviceType();
    }

    /**
     * Called when PostHog SDK is fully loaded
     * @private
     */
    #onPostHogReady() {
        this.#setFirstVisitProperties();
        this.#updateSuperProperties();
    }

    // -------------------------------------------------------------------------
    // Private Methods - Properties
    // -------------------------------------------------------------------------

    /**
     * Update super properties (attached to every event)
     * @private
     */
    #updateSuperProperties() {
        if (!this.#isInitialized) return;

        const properties = {
            // Session context
            session_node_count: this.#session.uniqueNodes.size,
            session_start_time: this.#session.startTime,

            // Current node context
            current_node_id: this.#currentNode?.uuid ?? null,
            current_node_title: this.#currentNode?.title ?? null,
            current_node_type: this.#currentNode?.type ?? null,
            current_node_depth: this.#currentNode
                ? this.#calculateNodeDepth(this.#currentNode)
                : 0,

            // Data source
            data_source: this.#dataSource,
        };

        posthog.register(properties);
        this.#log('📝', 'Super properties updated', properties);
    }

    /**
     * Set first-visit properties (only set once per user, never overwritten)
     * @private
     */
    #setFirstVisitProperties() {
        if (!this.#isInitialized) return;

        posthog.capture('$identify', {
            $set_once: {
                first_visit_date: this.#getTodayDate(),
                first_landing_url: window.location.pathname,
                first_referrer: document.referrer || 'direct',
                first_device: this.#cachedDeviceType,
            },
        });

        this.#log('👤', 'First visit properties set');
    }

    /**
     * Update person properties at session end
     * @private
     */
    #updatePersonProperties() {
        if (!this.#isInitialized) return;

        posthog.capture('$identify', {
            $set: {
                last_visit_date: this.#getTodayDate(),
                total_nodes_ever_viewed: this.#session.uniqueNodes.size,
                max_depth_reached: this.#session.maxDepthReached,
                has_contacted: this.#session.outboundClickCount > 0,
            },
        });
    }

    /**
     * Build properties object for node_viewed event
     * @private
     */
    #buildNodeViewedProperties(nodeData, viewSource, fromNode, depth) {
        const previousNode = fromNode || this.#previousNode;

        return {
            // Node identification
            node_id: nodeData.uuid,
            node_title: nodeData.title,
            node_type: nodeData.type ?? 'root',
            node_uri: nodeData.uri,
            node_depth: depth,

            // Node flags
            node_is_featured: Boolean(nodeData.isFeatured),
            node_is_highlighted: Boolean(nodeData.isHighlighted),

            // Navigation context
            view_source: viewSource,
            from_node_id: previousNode?.uuid ?? null,
            from_node_type: previousNode?.type ?? null,

            // Session context
            session_node_count: this.#session.uniqueNodes.size,
            is_first_node: this.#session.viewedNodesList.length === 1,
        };
    }

    // -------------------------------------------------------------------------
    // Private Methods - Utilities
    // -------------------------------------------------------------------------

    /**
     * Wrapper for posthog.capture with error handling
     * @private
     */
    #captureEvent(eventName, properties, options = {}) {
        posthog.capture(eventName, properties, options);
    }

    /**
     * Check if initialized and log warning if not
     * @private
     * @returns {boolean}
     */
    #guardInitialized() {
        if (!this.#isInitialized) {
            this.#log('⚠️', 'Analytics not initialized - event dropped');
            return false;
        }
        return true;
    }

    /**
     * Calculate node depth from URI path
     * @private
     * @param {NodeData} node
     * @returns {number}
     */
    #calculateNodeDepth(node) {
        if (!node?.uri || node.uri === '/') return 0;
        return node.uri.split('/').filter(Boolean).length;
    }

    /**
     * Detect device type based on viewport width
     * @private
     * @returns {'mobile' | 'tablet' | 'desktop'}
     */
    #detectDeviceType() {
        const width = window.innerWidth;
        if (width < BREAKPOINTS.MOBILE) return 'mobile';
        if (width < BREAKPOINTS.TABLET) return 'tablet';
        return 'desktop';
    }

    /**
     * Calculate session duration in seconds
     * @private
     * @returns {number}
     */
    #calculateSessionDuration() {
        if (!this.#session.startTime) return 0;
        const startMs = new Date(this.#session.startTime).getTime();
        return Math.round((Date.now() - startMs) / 1000);
    }

    /**
     * Get today's date in YYYY-MM-DD format
     * @private
     * @returns {string}
     */
    #getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    /**
     * Mask API key for logging (show first 10 chars)
     * @private
     * @param {string} apiKey
     * @returns {string}
     */
    #maskApiKey(apiKey) {
        return `${apiKey.substring(0, 10)}...`;
    }

    /**
     * Log error without throwing
     * @private
     * @param {string} methodName
     * @param {Error} error
     */
    #logError(methodName, error) {
        this.#log('❌', `Error in ${methodName}:`, { message: error.message });
    }
}

// =============================================================================
// SINGLETON EXPORT
// =============================================================================

/**
 * Singleton instance of AnalyticsTracker
 * @type {AnalyticsTracker}
 *
 * @example
 * import Analytics from './utils/Analytics.js';
 *
 * // Initialize once on app start
 * Analytics.init('phc_your_api_key');
 *
 * // Track events throughout the app
 * Analytics.trackNodeViewed(nodeData, Analytics.VIEW_SOURCES.GRAPH_CLICK);
 * Analytics.trackContentExpanded(nodeData, Analytics.EXPANSION_TYPES.TAB, 'Education');
 */
const Analytics = new AnalyticsTracker();

export default Analytics;

// Also export constants for external use
export { EVENTS, VIEW_SOURCES, EXPANSION_TYPES, CLICK_TYPES };
