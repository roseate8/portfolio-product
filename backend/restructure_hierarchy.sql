-- =============================================================================
-- RESTRUCTURE HIERARCHY MIGRATION
-- =============================================================================
-- 
-- This script reorganizes the portfolio hierarchy:
-- 1. Move Footnotes under Information branch
-- 2. Rename "Product Work" to "Industry Work" and move Consulting under it
-- 3. Move Visual Practice under Spatial & Perception
--
-- Run this AFTER migrate_real_data.sql
-- =============================================================================


-- =============================================================================
-- STEP 1: Move Footnotes under Information
-- =============================================================================

-- Update Footnotes parent to be Information (info-path)
UPDATE nodes 
SET parent_id = (SELECT id FROM nodes WHERE uuid = 'info-path'),
    sort_order = 10
WHERE uuid = 'footnotes-path';

-- Update the URI to reflect new hierarchy
UPDATE nodes 
SET uri = 'nodes/information/footnotes'
WHERE uuid = 'footnotes-path';

-- Update all children of Footnotes to have updated URIs
UPDATE nodes 
SET uri = REPLACE(uri, 'nodes/footnotes/', 'nodes/information/footnotes/')
WHERE uri LIKE 'nodes/footnotes/%';


-- =============================================================================
-- STEP 2: Rename Product Work to Industry Work and move Consulting under it
-- =============================================================================

-- Rename Product Work to Industry Work
UPDATE nodes 
SET title = 'Industry Work',
    summary = 'Professional Experience'
WHERE uuid = 'product-path';

-- Move Consulting to be under Industry Work
UPDATE nodes 
SET parent_id = (SELECT id FROM nodes WHERE uuid = 'product-path'),
    sort_order = 5
WHERE uuid = 'consulting-path';

-- Update Consulting URI to reflect new hierarchy
UPDATE nodes 
SET uri = 'nodes/industry-work/consulting'
WHERE uuid = 'consulting-path';

-- Update Industry Work URI
UPDATE nodes 
SET uri = 'nodes/industry-work'
WHERE uuid = 'product-path';

-- Update all Industry Work children URIs (ThoughtSpot, Policybazaar)
UPDATE nodes 
SET uri = REPLACE(uri, 'nodes/product-work/', 'nodes/industry-work/')
WHERE uri LIKE 'nodes/product-work/%';

-- Update all Consulting children URIs
UPDATE nodes 
SET uri = REPLACE(uri, 'nodes/consulting/', 'nodes/industry-work/consulting/')
WHERE uri LIKE 'nodes/consulting/%';


-- =============================================================================
-- STEP 3: Move Visual Practice under Spatial & Perception
-- =============================================================================

-- Move Visual Practice to be under Spatial & Perception
UPDATE nodes 
SET parent_id = (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    sort_order = 10
WHERE uuid = 'visual-path';

-- Update Visual Practice URI to reflect new hierarchy
UPDATE nodes 
SET uri = 'nodes/spatial-perception/visual-practice'
WHERE uuid = 'visual-path';

-- Update all Visual Practice children URIs
UPDATE nodes 
SET uri = REPLACE(uri, 'nodes/visual-practice/', 'nodes/spatial-perception/visual-practice/')
WHERE uri LIKE 'nodes/visual-practice/%';


-- =============================================================================
-- STEP 4: Add connection between XR Prototypes and Foveated Rendering
-- =============================================================================

-- XR Prototypes connects to Foveated Rendering (dotted line connection)
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'foveat-1'
FROM nodes WHERE uuid = 'xrproto-path'
ON CONFLICT DO NOTHING;


-- =============================================================================
-- STEP 5: Move Trajectory (Education) under Information
-- =============================================================================

-- Move Trajectory to be under Information
UPDATE nodes 
SET parent_id = (SELECT id FROM nodes WHERE uuid = 'info-path'),
    sort_order = 5,
    is_featured = true
WHERE uuid = 'trajectory-path';

-- Update Trajectory URI to reflect new hierarchy
UPDATE nodes 
SET uri = 'nodes/information/trajectory'
WHERE uuid = 'trajectory-path';

-- Update all Trajectory children URIs
UPDATE nodes 
SET uri = REPLACE(uri, 'nodes/trajectory/', 'nodes/information/trajectory/')
WHERE uri LIKE 'nodes/trajectory/%';


-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Verify Footnotes is now under Information
SELECT 
    n.title as node,
    n.uri,
    p.title as parent
FROM nodes n
LEFT JOIN nodes p ON n.parent_id = p.id
WHERE n.uuid = 'footnotes-path';

-- Verify Consulting is now under Industry Work
SELECT 
    n.title as node,
    n.uri,
    p.title as parent
FROM nodes n
LEFT JOIN nodes p ON n.parent_id = p.id
WHERE n.uuid = 'consulting-path';

-- Verify Visual Practice is now under Spatial & Perception
SELECT 
    n.title as node,
    n.uri,
    p.title as parent
FROM nodes n
LEFT JOIN nodes p ON n.parent_id = p.id
WHERE n.uuid = 'visual-path';

-- View the new tree structure
SELECT 
    REPEAT('  ', CASE 
        WHEN p3.id IS NOT NULL THEN 3
        WHEN p2.id IS NOT NULL THEN 2
        WHEN p1.id IS NOT NULL THEN 1
        ELSE 0
    END) || n.title as hierarchy,
    n.type,
    n.uuid
FROM nodes n
LEFT JOIN nodes p1 ON n.parent_id = p1.id
LEFT JOIN nodes p2 ON p1.parent_id = p2.id
LEFT JOIN nodes p3 ON p2.parent_id = p3.id
WHERE n.is_featured = true
ORDER BY 
    COALESCE(p3.sort_order, p2.sort_order, p1.sort_order, n.sort_order, 0),
    COALESCE(p2.sort_order, p1.sort_order, n.sort_order, 0),
    COALESCE(p1.sort_order, n.sort_order, 0),
    n.sort_order;
