/**
 * =============================================================================
 * DATA MODULE
 * =============================================================================
 * 
 * This module is the "middleman" between your frontend and your data sources.
 * It decides WHERE to get data from and handles fallbacks.
 * 
 * DATA SOURCES (in order of priority):
 * 1. Supabase (online database) - DEFAULT
 * 2. portfolio.json (static file) - FALLBACK
 * 
 * HOW IT WORKS:
 * - If Supabase works → Use that data
 * - If Supabase fails → Fall back to portfolio.json
 * 
 * IMPORTANT:
 * - portfolio.json is NOT automatically synced with Supabase
 * - If you edit Supabase, portfolio.json stays the same (and vice versa)
 * - portfolio.json is only used as a backup if Supabase is down
 * 
 * LOGS:
 * All operations are logged to the browser console (F12 → Console tab)
 * 
 * =============================================================================
 */

// Import the Supabase fetch function from the backend folder
import { fetchPortfolioData } from '../../../backend/supabase.js';
import Analytics from './Analytics.js';

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
    // Which data source to use?
    // true  = Try Supabase first, fall back to JSON
    // false = Skip Supabase, use JSON directly
    useSupabase: true,
    
    // Path to the static JSON file (fallback)
    staticDataPath: '/assets/data/portfolio.json',
    
    // Show detailed logs in console?
    debug: true
};

/**
 * Logs a message to the console
 */
function log(emoji, message, data = null) {
    if (!CONFIG.debug) return;
    
    const prefix = `[Data.js] ${emoji}`;
    if (data) {
        console.log(prefix, message, data);
    } else {
        console.log(prefix, message);
    }
}

// =============================================================================
// DATA MODULE
// =============================================================================

export const Data = {
    // Legacy properties (for backwards compatibility)
    basePath: document.body?.dataset?.basepath || '',
    useSupabase: CONFIG.useSupabase,
    useStaticData: !CONFIG.useSupabase,
    
    // Data source tracking - set after buildData() completes
    // Values: 'supabase', 'json-fallback', 'json-direct', 'unknown'
    dataSource: 'unknown',

    // =========================================================================
    // MAIN FUNCTION: buildData()
    // =========================================================================
    
    /**
     * Fetches portfolio data and returns it ready for the frontend.
     * 
     * This is the main function your app calls. It:
     * 1. Tries to get data from Supabase (if enabled)
     * 2. Falls back to portfolio.json if Supabase fails
     * 3. Extracts unique dates for timeline features
     * 
     * @returns {Promise<{data: Object, uniqueDates: string[]}>}
     */
    async buildData() {
        log('🚀', 'Starting data fetch...');
        log('⚙️', 'Configuration:', {
            useSupabase: CONFIG.useSupabase,
            staticDataPath: CONFIG.staticDataPath
        });
        
        let data = null;
        let dataSource = 'unknown';

        // =====================================================================
        // TRY TO GET DATA
        // =====================================================================
        
        if (CONFIG.useSupabase) {
            // OPTION 1: Try Supabase first
            log('📡', 'Attempting to fetch from Supabase...');
            
            try {
                data = await fetchPortfolioData();
                
                if (data) {
                    dataSource = 'supabase';
                    log('✅', 'SUCCESS: Data loaded from Supabase');
                } else {
                    log('⚠️', 'Supabase returned no data, trying fallback...');
                    data = await this.fetchStaticData();
                    dataSource = 'json-fallback';
                }
            } catch (error) {
                log('❌', 'Supabase failed:', error.message);
                log('⚠️', 'Falling back to portfolio.json...');
                data = await this.fetchStaticData();
                dataSource = 'json-fallback';
            }
        } else {
            // OPTION 2: Use static JSON directly
            log('📄', 'Supabase disabled, loading from portfolio.json...');
            data = await this.fetchStaticData();
            dataSource = 'json-direct';
        }

        // =====================================================================
        // CHECK IF WE GOT DATA
        // =====================================================================
        
        if (!data) {
            log('❌', 'FATAL: No data available from any source!');
            console.error(
                '❌ DATA ERROR: Could not load portfolio data!\n\n' +
                'Tried:\n' +
                (CONFIG.useSupabase ? '1. Supabase → Failed\n' : '') +
                '2. portfolio.json → Failed\n\n' +
                'Check:\n' +
                '- Is your .env file configured correctly?\n' +
                '- Does /assets/data/portfolio.json exist?\n' +
                '- Is your Supabase project active?'
            );
            
            // Return empty structure instead of undefined to prevent crashes
            return {
                data: {
                    title: 'Error: No Data',
                    children: [],
                    uri: '/',
                    uuid: 'error',
                    type: ''
                },
                uniqueDates: []
            };
        }

        // =====================================================================
        // PROCESS THE DATA
        // =====================================================================
        
        // Extract unique dates for timeline features
        const allNodes = this.flattenNodes(data);
        const uniqueDates = [...new Set(
            allNodes.map(node => node.originDate).filter(date => date)
        )].sort((a, b) => new Date(a) - new Date(b));

        // Store the data source for external access
        this.dataSource = dataSource;
        
        // Notify Analytics of the data source
        Analytics.setDataSource(dataSource);

        // Final summary
        log('✅', '=== DATA LOAD COMPLETE ===');
        log('📊', 'Summary:', {
            source: dataSource,
            rootTitle: data.title,
            totalNodes: allNodes.length,
            uniqueDates: uniqueDates.length
        });

        return { data, uniqueDates, dataSource };
    },

    // =========================================================================
    // HELPER: Fetch Static JSON
    // =========================================================================
    
    /**
     * Loads data from the static portfolio.json file.
     * This is used as a fallback when Supabase fails.
     */
    async fetchStaticData() {
        log('📄', `Loading ${CONFIG.staticDataPath}...`);
        
        try {
            const response = await fetch(CONFIG.staticDataPath);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            log('✅', 'Static JSON loaded successfully');
            return data;
            
        } catch (error) {
            log('❌', 'Failed to load static JSON:', error.message);
            return null;
        }
    },

    // =========================================================================
    // HELPER: Flatten Tree
    // =========================================================================
    
    /**
     * Converts a nested tree into a flat array.
     * Useful for counting nodes, searching, or extracting data.
     * 
     * @param {Object} node - Root node
     * @param {Array} result - Accumulator (used internally)
     * @returns {Array} Flat array of all nodes
     */
    flattenNodes(node, result = []) {
        if (!node) return result;
        
        result.push(node);
        
        if (node.children && Array.isArray(node.children)) {
            node.children.forEach(child => this.flattenNodes(child, result));
        }
        
        return result;
    },

    // =========================================================================
    // LEGACY: Kirby CMS Methods (you can ignore these)
    // =========================================================================
    // These are here for backwards compatibility if you ever used Kirby CMS.
    // They're not used when Supabase or static JSON is enabled.

    buildQuery(level) {
        if (level === 0) return {};
        return {
            title: true,
            uri: true,
            uuid: true,
            summary: true,
            role: true,
            email: true,
            telephone: true,
            overview: true,
            description: "page.description.kirbytext",
            extendedDescription: "page.extendedDescription.kirbytext",
            originDate: true,
            endDate: true,
            expirationDate: true,
            lastUpdated: true,
            isFeatured: true,
            isHighlighted: true,
            isSecondary: true,
            media: {
                query: "page.media.toFiles",
                select: {
                    url: true, alt: true, type: true,
                    smallImage: "file.resize(1200, null, 95).url",
                    largeImage: "file.resize(1600, null, 95).url",
                    externalLink: true, externalLinkText: true
                }
            },
            type: true,
            externalLinks: { query: "page.externalLinks.toStructure", select: { title: true, link: true } },
            metadata: { query: "page.metadata.toStructure", select: { title: true, subtitle: true } },
            education: { query: "page.education.toStructure", select: { title: true, subtitle: true, year: true } },
            recognition: { query: "page.recognition.toStructure", select: { title: true, subtitle: true, year: true } },
            footnotes: { query: "page.footnotes.toStructure", select: { footnote: true } },
            connectedNodes: { query: "page.connectedNodes.toStructure", select: { foreignkey: true } },
            children: { query: "page.children", select: this.buildQuery(level - 1) }
        };
    },

    async fetchPageData(uri, levels = 20) {
        // Legacy Kirby CMS support - not used with Supabase
        return null;
    },

    async fetchAllPages(uri) {
        // Legacy Kirby CMS support - not used with Supabase
        return [];
    },

    extractDates(node) {
        const dates = [node.originDate];
        if (node.children) {
            node.children.forEach(child => dates.push(...this.extractDates(child)));
        }
        return dates;
    }
};

export default Data;
