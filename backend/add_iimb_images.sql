-- =============================================================================
-- ADD IMAGES TO IIM BANGALORE NODE
-- =============================================================================
-- This script adds images from the 'iim-bangalore' folder in Supabase Storage
-- to the IIM Bangalore education node.
--
-- STATUS: ✅ COMPLETED - Images have been added successfully
-- =============================================================================

-- Add images to IIM Bangalore node
INSERT INTO node_media (node_id, file_path, alt_text, media_type, sort_order)
SELECT 
    id,
    'iim-bangalore/_3280572.jpg',
    'IIM Bangalore campus',
    'image',
    0
FROM nodes WHERE uuid = 'iimb-path';

INSERT INTO node_media (node_id, file_path, alt_text, media_type, sort_order)
SELECT 
    id,
    'iim-bangalore/P1150813 (1).jpg',
    'IIM Bangalore building',
    'image',
    1
FROM nodes WHERE uuid = 'iimb-path';

INSERT INTO node_media (node_id, file_path, alt_text, media_type, sort_order)
SELECT 
    id,
    'iim-bangalore/P1190461-RW2_DxO_DeepPRIME (1).jpg',
    'IIM Bangalore architecture',
    'image',
    2
FROM nodes WHERE uuid = 'iimb-path';

INSERT INTO node_media (node_id, file_path, alt_text, media_type, sort_order)
SELECT 
    id,
    'iim-bangalore/P1250576.jpg',
    'IIM Bangalore campus view',
    'image',
    3
FROM nodes WHERE uuid = 'iimb-path';

-- =============================================================================
-- VERIFICATION QUERY
-- =============================================================================
-- Run this to verify the images were added correctly:
-- 
-- SELECT nm.file_path, nm.alt_text, nm.sort_order, n.title 
-- FROM node_media nm 
-- JOIN nodes n ON nm.node_id = n.id 
-- WHERE n.uuid = 'iimb-path' 
-- ORDER BY nm.sort_order;
--
-- Expected result: 4 images with sort_order 0-3
-- =============================================================================
