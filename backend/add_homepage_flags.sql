-- =============================================================================
-- ADD GRAPH VISIBILITY FLAGS
-- =============================================================================
--
-- Until now the graph decided which deep nodes stay visible using two hardcoded
-- UUID lists inside assets/js/components/Map.js. Renaming or replacing a node in
-- Supabase silently dropped it from the homepage, with nothing in the database
-- hinting that the front-end cared about it.
--
-- These two columns move that decision into the data:
--
--   show_on_homepage - node stays visible on the homepage graph even though it
--                      sits below the first level (e.g. ThoughtSpot under
--                      Industry Work)
--   show_with_parent - node stays visible when its grandparent is opened, rather
--                      than being collapsed away (e.g. IIT Madras and IIM
--                      Bangalore when the Information node is open)
--
-- Map.js only uses the columns once at least one node has show_on_homepage set;
-- before that it keeps using the legacy lists, so running this migration is
-- safe in either order relative to a deploy.
--

-- =============================================================================
-- COLUMNS
-- =============================================================================

ALTER TABLE nodes
ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE nodes
ADD COLUMN IF NOT EXISTS show_with_parent BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN nodes.show_on_homepage IS
    'Keep this node visible on the homepage graph even though it is deeper than the first level';

COMMENT ON COLUMN nodes.show_with_parent IS
    'Keep this node visible when an ancestor is opened, instead of collapsing it away';

-- =============================================================================
-- BACKFILL - mirrors the lists that used to live in Map.js
-- =============================================================================

UPDATE nodes
SET show_on_homepage = TRUE
WHERE uuid IN (
    'ts-path',          -- ThoughtSpot (under Industry Work)
    'photo-1',          -- Photography (under Visual Practice -> Spatial)
    'xrproto-path',     -- XR Prototypes (under Spatial & Perception)
    'agents-path',      -- AI Agents (under AI Systems)
    'trajectory-path',  -- Trajectory/Education (under Information)
    'iitm-path'         -- IIT Madras (under Trajectory -> Information)
);

UPDATE nodes
SET show_with_parent = TRUE
WHERE uuid IN (
    'iitm-path',        -- IIT Madras, kept visible when Information is open
    'iimb-path'         -- IIM Bangalore, kept visible when Information is open
);

-- =============================================================================
-- VERIFY
-- =============================================================================

SELECT uuid, title, show_on_homepage, show_with_parent
FROM nodes
WHERE show_on_homepage OR show_with_parent
ORDER BY uuid;
