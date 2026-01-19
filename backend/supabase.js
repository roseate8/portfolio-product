/**
 * =============================================================================
 * SUPABASE BACKEND MODULE
 * =============================================================================
 * 
 * This file handles all communication with your Supabase database.
 * It fetches portfolio data and transforms it into the format your frontend expects.
 * 
 * HOW IT WORKS:
 * 1. Connects to your Supabase project using credentials from .env file
 * 2. Fetches all nodes (portfolio items) and their related data
 * 3. Builds a tree structure (parent-child relationships)
 * 4. Returns data in the same format as portfolio.json
 * 
 * LOGS:
 * All operations are logged to the browser console with emojis for easy reading:
 * - 📡 = Making a request
 * - ✅ = Success
 * - ⚠️ = Warning
 * - ❌ = Error
 * 
 * =============================================================================
 */

import { createClient } from '@supabase/supabase-js';

// =============================================================================
// CONFIGURATION
// =============================================================================

// Set to true to see detailed logs in the browser console
const DEBUG_MODE = true;

/**
 * Logs a message to the console (only if DEBUG_MODE is true)
 * @param {string} emoji - Emoji prefix for visual identification
 * @param {string} message - The message to log
 * @param {*} data - Optional data to log
 */
function log(emoji, message, data = null) {
    if (!DEBUG_MODE) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}] ${emoji}`;
    
    if (data) {
        console.log(prefix, message, data);
    } else {
        console.log(prefix, message);
    }
}

// =============================================================================
// STEP 1: CONNECT TO SUPABASE
// =============================================================================

// Get credentials from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials exist
if (!supabaseUrl || !supabaseKey) {
    console.error(
        '❌ SUPABASE ERROR: Missing credentials!\n\n' +
        'You need to create a .env file in your project root with:\n\n' +
        'VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
        'VITE_SUPABASE_ANON_KEY=your-anon-key-here\n\n' +
        'See README_SUPABASE.md for details.'
    );
}

// Create the Supabase client
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

log('🔌', 'Supabase client initialized', { 
    url: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'MISSING',
    hasKey: !!supabaseKey 
});

// =============================================================================
// HELPER FUNCTION - GENERATE SUPABASE STORAGE URL
// =============================================================================

/**
 * Generates a public Supabase Storage URL for a file path.
 * If the path is already a full URL (starts with http), returns it as-is.
 * 
 * @param {string} filePath - The file path in storage (e.g., 'photography/taipei/image.jpg')
 * @param {string} bucket - The storage bucket name (default: 'portfolio-media')
 * @returns {string} The full public URL to access the file
 */
function getStorageUrl(filePath, bucket = 'portfolio-media') {
    // If it's already a full URL, return as-is
    if (filePath && (filePath.startsWith('http://') || filePath.startsWith('https://'))) {
        return filePath;
    }
    
    // Generate Supabase Storage public URL
    // Format: https://PROJECT_REF.supabase.co/storage/v1/object/public/BUCKET/PATH
    if (supabaseUrl && filePath) {
        return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
    }
    
    // Fallback to original path if something is missing
    return filePath || '';
}


// =============================================================================
// STEP 2: MAIN FUNCTION - FETCH ALL PORTFOLIO DATA
// =============================================================================

/**
 * Fetches all portfolio data from Supabase and returns it as a tree structure.
 * 
 * This is the main function that Data.js calls. It:
 * 1. Fetches all nodes (the main portfolio items)
 * 2. Fetches all related data (links, metadata, education, etc.)
 * 3. Combines everything into a nested tree structure
 * 
 * @returns {Promise<Object|null>} The root node with all children, or null if error
 */
export async function fetchPortfolioData() {
    log('📡', 'Starting Supabase data fetch...');
    
    // Check credentials before making requests
    if (!supabaseUrl || !supabaseKey) {
        log('❌', 'Cannot fetch: Missing Supabase credentials');
        return null;
    }

    try {
        // =====================================================================
        // FETCH ALL TABLES IN PARALLEL (faster than one at a time)
        // =====================================================================
        log('📡', 'Fetching all tables from Supabase...');
        
        const startTime = performance.now();
        
        const [
            nodesResult,
            linksResult,
            metadataResult,
            mediaResult,
            educationResult,
            recognitionResult,
            footnotesResult,
            connectionsResult
        ] = await Promise.all([
            supabase.from('nodes').select('*').order('sort_order'),
            supabase.from('node_links').select('*').order('sort_order'),
            supabase.from('node_metadata').select('*').order('sort_order'),
            supabase.from('node_media').select('*').order('sort_order'),
            supabase.from('node_education').select('*').order('sort_order'),
            supabase.from('node_recognition').select('*').order('sort_order'),
            supabase.from('node_footnotes').select('*').order('sort_order'),
            supabase.from('node_connections').select('*')
        ]);

        const fetchTime = Math.round(performance.now() - startTime);
        log('⏱️', `All tables fetched in ${fetchTime}ms`);

        // =====================================================================
        // CHECK FOR ERRORS
        // =====================================================================
        if (nodesResult.error) {
            log('❌', 'Error fetching nodes:', nodesResult.error.message);
            throw nodesResult.error;
        }

        // =====================================================================
        // EXTRACT DATA (or empty arrays if no data)
        // =====================================================================
        const nodes = nodesResult.data || [];
        const links = linksResult.data || [];
        const metadata = metadataResult.data || [];
        const media = mediaResult.data || [];
        const education = educationResult.data || [];
        const recognition = recognitionResult.data || [];
        const footnotes = footnotesResult.data || [];
        const connections = connectionsResult.data || [];

        // Log what we got
        log('📊', 'Data received from Supabase:', {
            nodes: nodes.length,
            links: links.length,
            metadata: metadata.length,
            media: media.length,
            education: education.length,
            recognition: recognition.length,
            footnotes: footnotes.length,
            connections: connections.length
        });

        // =====================================================================
        // PROCESS THE DATA
        // =====================================================================
        
        // Group related data by node_id for easy lookup
        const linksMap = groupByNodeId(links);
        const metadataMap = groupByNodeId(metadata);
        const mediaMap = groupByNodeId(media);
        const educationMap = groupByNodeId(education);
        const recognitionMap = groupByNodeId(recognition);
        const footnotesMap = groupByNodeId(footnotes);
        const connectionsMap = groupByNodeId(connections, 'source_node_id');

        // Transform each node into the format the frontend expects
        log('🔄', 'Transforming nodes to frontend format...');
        const transformedNodes = nodes.map(node => transformNode(
            node,
            linksMap,
            metadataMap,
            mediaMap,
            educationMap,
            recognitionMap,
            footnotesMap,
            connectionsMap
        ));

        // Build the tree structure
        log('🌳', 'Building tree structure...');
        const rootNode = buildTree(transformedNodes);

        if (!rootNode) {
            log('⚠️', 'No root node found in database');
            return null;
        }

        // Log the final tree structure
        log('✅', 'SUCCESS! Portfolio data loaded from Supabase');
        log('🌳', 'Tree structure:', summarizeTree(rootNode));

        return rootNode;

    } catch (error) {
        log('❌', 'FAILED to fetch from Supabase:', error.message);
        return null;
    }
}


// =============================================================================
// STEP 3: HELPER FUNCTIONS
// =============================================================================

/**
 * Groups an array of items by their node_id (or custom key).
 */
function groupByNodeId(items, key = 'node_id') {
    const grouped = {};
    
    for (const item of items) {
        const nodeId = item[key];
        if (!nodeId) continue;
        
        if (!grouped[nodeId]) {
            grouped[nodeId] = [];
        }
        grouped[nodeId].push(item);
    }
    
    return grouped;
}


/**
 * Transforms a database node into the format the frontend expects.
 */
function transformNode(
    node,
    linksMap,
    metadataMap,
    mediaMap,
    educationMap,
    recognitionMap,
    footnotesMap,
    connectionsMap
) {
    const nodeId = node.id;
    
    return {
        // Basic info
        title: node.title || '',
        uri: node.uri || '',
        uuid: node.uuid || '',
        summary: node.summary || '',
        type: node.type || '',
        
        // Contact info
        role: node.role || '',
        email: node.email || '',
        telephone: node.telephone || '',
        overview: node.overview || '',
        
        // Content
        description: node.description || '',
        extendedDescription: node.extended_description || '',
        
        // Dates
        originDate: node.origin_date || '',
        endDate: node.end_date || '',
        expirationDate: node.expiration_date || '',
        lastUpdated: node.last_updated || '',
        
        // Display flags
        isFeatured: node.is_featured || false,
        isHighlighted: node.is_highlighted || false,
        isSecondary: node.is_secondary || false,
        
        // Related data
        externalLinks: (linksMap[nodeId] || []).map(link => ({
            title: link.title,
            link: link.url
        })),
        
        metadata: (metadataMap[nodeId] || []).map(meta => ({
            title: meta.title,
            subtitle: meta.subtitle
        })),
        
        media: (mediaMap[nodeId] || []).map(m => ({
            url: getStorageUrl(m.original_url || m.file_path),
            alt: m.alt_text || '',
            type: m.media_type || 'image',
            smallImage: getStorageUrl(m.small_url || m.file_path),
            largeImage: getStorageUrl(m.large_url || m.file_path),
            externalLink: m.external_link || '',
            externalLinkText: m.external_link_text || ''
        })),
        
        education: (educationMap[nodeId] || []).map(edu => ({
            institute: edu.title,
            major: edu.subtitle || '',
            degree: edu.degree || '',
            dates: edu.year || '',
            linkUri: edu.link_uri || ''
        })),
        
        recognition: (recognitionMap[nodeId] || []).map(rec => ({
            title: rec.title,
            subtitle: rec.subtitle || '',
            year: rec.year || ''
        })),
        
        footnotes: (footnotesMap[nodeId] || []).map(fn => ({
            footnote: fn.footnote
        })),
        
        connectedNodes: (connectionsMap[nodeId] || []).map(conn => conn.target_node_uuid),
        
        // Internal fields for tree building
        _id: node.id,
        _parentId: node.parent_id,
        children: []
    };
}


/**
 * Builds a tree structure from a flat array of nodes.
 */
function buildTree(nodes) {
    const nodeMap = {};
    nodes.forEach(node => {
        nodeMap[node._id] = node;
    });

    let rootNode = null;
    
    nodes.forEach(node => {
        if (node._parentId === null) {
            rootNode = node;
        } else {
            const parent = nodeMap[node._parentId];
            if (parent) {
                // Only add children that are featured (visible in graph)
                if (node.isFeatured === true) {
                    parent.children.push(node);
                }
            }
        }
    });

    if (rootNode) {
        cleanupNode(rootNode);
    }

    return rootNode;
}


/**
 * Removes internal fields from a node and its children.
 */
function cleanupNode(node) {
    delete node._id;
    delete node._parentId;
    node.children.forEach(child => cleanupNode(child));
}


/**
 * Creates a summary of the tree for logging.
 */
function summarizeTree(node, depth = 0) {
    const indent = '  '.repeat(depth);
    const prefix = depth === 0 ? '' : '├── ';
    let result = `${indent}${prefix}${node.title} (${node.type || 'root'})\n`;
    
    for (const child of node.children) {
        result += summarizeTree(child, depth + 1);
    }
    
    return result;
}


// =============================================================================
// EXPORTS
// =============================================================================

export { supabase };
