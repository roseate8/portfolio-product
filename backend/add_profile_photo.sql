-- =============================================================================
-- ADD PROFILE PHOTO COLUMN
-- =============================================================================
--
-- Migration order: 3 (run after restructure_hierarchy.sql)
-- Status: COMPLETED — column has been added to production.
--
-- Rollback: ALTER TABLE nodes DROP COLUMN profile_photo.
--
-- This migration adds a profile_photo column to the nodes table
-- to store the URI/path of a profile photo for any node (especially root)
--

-- Add the column if it doesn't exist
ALTER TABLE nodes
ADD COLUMN IF NOT EXISTS profile_photo TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN nodes.profile_photo IS 'URI to profile photo/headshot image in Supabase storage';

-- Update the root node with the profile photo
UPDATE nodes
SET profile_photo = 'https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/profile photo/PB030576 portrait.jpg'
WHERE uuid = 'root-0';
