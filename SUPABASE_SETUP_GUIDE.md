# Supabase Backend Setup Guide for Portfolio

This document provides step-by-step instructions for setting up Supabase as your portfolio backend. Follow each section in order.

---

## Table of Contents

1. [Create Supabase Account & Project](#1-create-supabase-account--project)
2. [Understanding Your Data Structure](#2-understanding-your-data-structure)
3. [Create Database Tables](#3-create-database-tables)
4. [Set Up Storage for Images](#4-set-up-storage-for-images)
5. [Configure Security (RLS Policies)](#5-configure-security-rls-policies)
6. [Get Your API Credentials](#6-get-your-api-credentials)
7. [Migrate Existing Data](#7-migrate-existing-data)
8. [Test Your API](#8-test-your-api)
9. [Update Frontend Code](#9-update-frontend-code)
10. [Common Mistakes to Avoid](#10-common-mistakes-to-avoid)

---

## 1. Create Supabase Account & Project

### Step 1.1: Sign Up
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email

### Step 1.2: Create a New Project
1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `portfolio` (or your preferred name)
   - **Database Password**: Generate a strong password and **SAVE IT SOMEWHERE SAFE**
   - **Region**: Choose the closest to your target audience (e.g., "East US" for New York)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to initialize

### Step 1.3: Note Your Project Details
Once created, go to **Settings > API** and note down:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon/public key**: `eyJhbGciOiJI...` (this is safe to use in frontend code)

---

## 2. Understanding Your Data Structure

Your portfolio uses a **nested tree structure**. Here's how we'll organize it in Supabase:

```
┌─────────────────────────────────────────────────────────────────┐
│                         nodes (main table)                       │
│  Stores all portfolio items with parent_id for hierarchy         │
├─────────────────────────────────────────────────────────────────┤
│  - Root node (your profile)                                      │
│    ├── Information node                                          │
│    ├── Interactive Design (path)                                 │
│    │   ├── Project Alpha (artifact)                              │
│    │   └── Motion Study (artifact)                               │
│    ├── Research (path)                                           │
│    │   └── Human-AI Collaboration (research)                     │
│    └── Initiatives (path)                                        │
│        └── Design Studio (initiative)                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Related Tables (linked by node_id)            │
├─────────────────────────────────────────────────────────────────┤
│  node_media        - Images/photos for each node                 │
│  node_links        - External links (LinkedIn, GitHub, etc.)     │
│  node_metadata     - Key-value pairs (Technologies, Role, etc.)  │
│  node_education    - Education history                           │
│  node_recognition  - Awards and recognition                      │
│  node_footnotes    - Footnotes and citations                     │
│  node_connections  - Connections between nodes                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Create Database Tables

Go to **SQL Editor** in your Supabase dashboard (left sidebar) and run these scripts **one at a time**.

### Step 3.1: Create the Main Nodes Table

```sql
-- Main nodes table for all portfolio items
CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
    
    -- Core fields
    title TEXT NOT NULL,
    uri TEXT UNIQUE NOT NULL,
    uuid TEXT UNIQUE NOT NULL,
    summary TEXT,
    type TEXT CHECK (type IN ('', 'information', 'path', 'artifact', 'research', 'initiative')),
    
    -- Contact info (mainly for root/info nodes)
    role TEXT,
    email TEXT,
    telephone TEXT,
    overview TEXT,
    
    -- Content
    description TEXT,
    extended_description TEXT,
    
    -- Dates
    origin_date DATE,
    end_date DATE,
    expiration_date DATE,
    last_updated DATE DEFAULT CURRENT_DATE,
    
    -- Display flags
    is_featured BOOLEAN DEFAULT false,
    is_highlighted BOOLEAN DEFAULT false,
    is_secondary BOOLEAN DEFAULT false,
    
    -- Ordering
    sort_order INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster parent lookups
CREATE INDEX idx_nodes_parent_id ON nodes(parent_id);
CREATE INDEX idx_nodes_type ON nodes(type);
CREATE INDEX idx_nodes_uri ON nodes(uri);
```

**Click "Run" to execute.**

### Step 3.2: Create Media Table (for Photography & Images)

```sql
-- Media files associated with nodes
CREATE TABLE node_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    
    -- File info
    file_path TEXT NOT NULL,  -- Path in Supabase Storage
    alt_text TEXT,
    media_type TEXT CHECK (media_type IN ('image', 'photo')),
    
    -- Image variants (will be populated with storage URLs)
    thumbnail_url TEXT,
    small_url TEXT,
    large_url TEXT,
    original_url TEXT,
    
    -- Optional external link on the media
    external_link TEXT,
    external_link_text TEXT,
    
    -- Caption for photography
    caption TEXT,
    
    -- Ordering
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_node_media_node_id ON node_media(node_id);
```

### Step 3.3: Create External Links Table

```sql
-- External links for nodes (LinkedIn, GitHub, project links, etc.)
CREATE TABLE node_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_node_links_node_id ON node_links(node_id);
```

### Step 3.4: Create Metadata Table

```sql
-- Key-value metadata for nodes (Technologies, Role, Status, etc.)
CREATE TABLE node_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,      -- e.g., "Technologies"
    subtitle TEXT NOT NULL,   -- e.g., "WebGL, Node.js"
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_node_metadata_node_id ON node_metadata(node_id);
```

### Step 3.5: Create Education Table

```sql
-- Education history
CREATE TABLE node_education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,      -- e.g., "Master of Design"
    subtitle TEXT,            -- e.g., "Design & Technology"
    year TEXT,                -- e.g., "2022"
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_node_education_node_id ON node_education(node_id);
```

### Step 3.6: Create Recognition Table

```sql
-- Awards and recognition
CREATE TABLE node_recognition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,      -- e.g., "Design Award"
    subtitle TEXT,            -- e.g., "Best Interactive Project"
    year TEXT,                -- e.g., "2023"
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_node_recognition_node_id ON node_recognition(node_id);
```

### Step 3.7: Create Footnotes Table

```sql
-- Footnotes and citations
CREATE TABLE node_footnotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    
    footnote TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_node_footnotes_node_id ON node_footnotes(node_id);
```

### Step 3.8: Create Node Connections Table

```sql
-- Connections between nodes (for your connected nodes feature)
CREATE TABLE node_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node_id UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    target_node_uuid TEXT NOT NULL,  -- References the uuid field of another node
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(source_node_id, target_node_uuid)
);

CREATE INDEX idx_node_connections_source ON node_connections(source_node_id);
```

### Step 3.9: Create Auto-Update Trigger

```sql
-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to nodes table
CREATE TRIGGER update_nodes_updated_at
    BEFORE UPDATE ON nodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 4. Set Up Storage for Images

### Step 4.1: Create a Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **"New bucket"**
3. Configure:
   - **Name**: `portfolio-media`
   - **Public bucket**: **YES** (toggle ON) - this allows public access to images
   - **File size limit**: 50 MB (or adjust as needed)
   - **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp`
4. Click **"Create bucket"**

### Step 4.2: Understand the Folder Structure

Organize your uploads like this:

```
portfolio-media/
├── nodes/
│   ├── project-alpha/
│   │   ├── hero.jpg
│   │   ├── gallery-1.jpg
│   │   └── gallery-2.jpg
│   ├── motion-study/
│   │   └── cover.jpg
│   └── ...
└── photography/
    ├── series-name/
    │   ├── photo-1.jpg
    │   └── photo-2.jpg
    └── ...
```

### Step 4.3: Get Public URLs

After uploading an image, its public URL will be:
```
https://[your-project-id].supabase.co/storage/v1/object/public/portfolio-media/[path-to-file]
```

Example:
```
https://xxxxx.supabase.co/storage/v1/object/public/portfolio-media/nodes/project-alpha/hero.jpg
```

---

## 5. Configure Security (RLS Policies)

Row Level Security (RLS) controls who can read/write your data. For a public portfolio, we need **public read access** but **no public write access**.

### Step 5.1: Enable RLS on All Tables

Go to **SQL Editor** and run:

```sql
-- Enable RLS on all tables
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_recognition ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_footnotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_connections ENABLE ROW LEVEL SECURITY;
```

### Step 5.2: Create Public Read Policies

```sql
-- Allow anyone to read nodes
CREATE POLICY "Public read access for nodes"
ON nodes FOR SELECT
TO anon
USING (true);

-- Allow anyone to read media
CREATE POLICY "Public read access for media"
ON node_media FOR SELECT
TO anon
USING (true);

-- Allow anyone to read links
CREATE POLICY "Public read access for links"
ON node_links FOR SELECT
TO anon
USING (true);

-- Allow anyone to read metadata
CREATE POLICY "Public read access for metadata"
ON node_metadata FOR SELECT
TO anon
USING (true);

-- Allow anyone to read education
CREATE POLICY "Public read access for education"
ON node_education FOR SELECT
TO anon
USING (true);

-- Allow anyone to read recognition
CREATE POLICY "Public read access for recognition"
ON node_recognition FOR SELECT
TO anon
USING (true);

-- Allow anyone to read footnotes
CREATE POLICY "Public read access for footnotes"
ON node_footnotes FOR SELECT
TO anon
USING (true);

-- Allow anyone to read connections
CREATE POLICY "Public read access for connections"
ON node_connections FOR SELECT
TO anon
USING (true);
```

### Step 5.3: Create Admin Write Policies (Optional)

If you want to update data via the Supabase dashboard or authenticated API:

```sql
-- Allow authenticated users (you) to do everything
CREATE POLICY "Admin full access for nodes"
ON nodes FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for media"
ON node_media FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for links"
ON node_links FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for metadata"
ON node_metadata FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for education"
ON node_education FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for recognition"
ON node_recognition FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for footnotes"
ON node_footnotes FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin full access for connections"
ON node_connections FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

---

## 6. Get Your API Credentials

### Step 6.1: Find Your Credentials

1. Go to **Settings** (gear icon) > **API**
2. Copy these values:

| Setting | Where to Find | What It's For |
|---------|---------------|---------------|
| **Project URL** | Under "Project URL" | Base URL for API calls |
| **anon key** | Under "Project API keys" | Public API key (safe for frontend) |

### Step 6.2: Store Credentials Safely

Create a `.env` file in your project root (if you don't have one):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANT**: Add `.env` to your `.gitignore` file!

---

## 7. Migrate Existing Data

### Step 7.1: Insert Root Node

Go to **SQL Editor** and run:

```sql
-- Insert root node (your profile)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, role, email, 
    origin_date, last_updated, is_featured, type, sort_order
) VALUES (
    NULL,
    'Your Name',
    '/',
    'root-0',
    'Designer & Researcher',
    '',
    '',
    '2020-01-01',
    '2024-01-01',
    true,
    '',
    0
);
```

### Step 7.2: Insert Information Node

```sql
-- Get root node ID first, then insert Information node
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, role, email, overview,
    description, extended_description, origin_date, last_updated,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Information',
    'nodes/information',
    'info-1',
    'About & Contact',
    'Designer & Researcher',
    'hello@example.com',
    'Based in New York',
    '<p>I am a designer and researcher exploring the intersection of technology, psychology, and creative arts. My work bridges human-computer interaction, positive psychology, and experimental design.</p>',
    '<p>With a background in both technical and creative disciplines, I approach each project as an opportunity to understand and enhance human experience through thoughtful design.</p>',
    '2020-01-01',
    '2024-01-01',
    true,
    'information',
    0
);
```

### Step 7.3: Insert Related Data for Information Node

```sql
-- Add education entries
INSERT INTO node_education (node_id, title, subtitle, year, sort_order)
SELECT id, 'Master of Design', 'Design & Technology', '2022', 0
FROM nodes WHERE uuid = 'info-1';

INSERT INTO node_education (node_id, title, subtitle, year, sort_order)
SELECT id, 'Bachelor of Science', 'Computer Science', '2018', 1
FROM nodes WHERE uuid = 'info-1';

-- Add recognition
INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'Design Award', 'Best Interactive Project', '2023', 0
FROM nodes WHERE uuid = 'info-1';

-- Add external links
INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'LinkedIn', 'https://linkedin.com', 0
FROM nodes WHERE uuid = 'info-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub', 'https://github.com', 1
FROM nodes WHERE uuid = 'info-1';
```

### Step 7.4: Insert Path Nodes (Categories)

```sql
-- Interactive Design path
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    origin_date, last_updated, is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Interactive Design',
    'nodes/interactive-design',
    'path-1',
    'Area of Practice',
    '<p>Exploring the boundaries of human-computer interaction through experimental interfaces and creative technology.</p>',
    '2020-01-01',
    '2024-01-01',
    true,
    'path',
    1
);

-- Research path
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    origin_date, last_updated, is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Research',
    'nodes/research',
    'path-2',
    'Area of Study',
    '<p>Systematic investigations into human behavior, technology, and their intersection.</p>',
    '2020-01-01',
    '2024-01-01',
    true,
    'path',
    2
);

-- Initiatives path
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    origin_date, last_updated, is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Initiatives',
    'nodes/initiatives',
    'path-3',
    'Projects & Actions',
    '<p>Concrete actions and projects aimed at making ideas tangible and impactful.</p>',
    '2020-01-01',
    '2024-01-01',
    true,
    'path',
    3
);
```

### Step 7.5: Insert Artifact/Project Nodes

```sql
-- Project Alpha (under Interactive Design)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    origin_date, end_date, last_updated, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'path-1'),
    'Project Alpha',
    'nodes/interactive-design/project-alpha',
    'artifact-1',
    'Interactive Installation',
    '<p>An interactive installation exploring the relationship between physical movement and digital response. Visitors engage with projected visuals through body tracking and gesture recognition.</p>',
    '<p>Built using custom computer vision algorithms and real-time graphics rendering. The installation was exhibited at three venues in 2023.</p>',
    '2023-06-01',
    '2023-12-01',
    '2024-01-01',
    true,
    true,
    'artifact',
    0
);

-- Add metadata for Project Alpha
INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Technologies', 'Computer Vision, WebGL, Node.js', 0
FROM nodes WHERE uuid = 'artifact-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Lead Designer & Developer', 1
FROM nodes WHERE uuid = 'artifact-1';

-- Add external link for Project Alpha
INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'View Project', 'https://example.com/project-alpha', 0
FROM nodes WHERE uuid = 'artifact-1';

-- Add connection to research
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'research-1'
FROM nodes WHERE uuid = 'artifact-1';

-- Motion Study (under Interactive Design)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    origin_date, end_date, last_updated, is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'path-1'),
    'Motion Study',
    'nodes/interactive-design/motion-study',
    'artifact-2',
    'Generative Art',
    '<p>A series of generative artworks exploring emergent patterns through simulated particle systems and physics-based animations.</p>',
    '2023-03-01',
    '2023-05-01',
    '2024-01-01',
    true,
    'artifact',
    1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Medium', 'JavaScript, Canvas API', 0
FROM nodes WHERE uuid = 'artifact-2';
```

### Step 7.6: Insert Research and Initiative Nodes

```sql
-- Human-AI Collaboration (under Research)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    origin_date, last_updated, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'path-2'),
    'Human-AI Collaboration',
    'nodes/research/human-ai-collaboration',
    'research-1',
    'Ongoing Research',
    '<p>Investigating how humans and AI systems can work together creatively, focusing on maintaining human agency while leveraging machine capabilities.</p>',
    '<p>This research explores the design patterns and interaction models that support productive human-AI partnerships in creative contexts.</p>',
    '2023-01-01',
    '2024-01-01',
    true,
    true,
    'research',
    0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Status', 'In Progress', 0
FROM nodes WHERE uuid = 'research-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Collaborators', 'University Research Lab', 1
FROM nodes WHERE uuid = 'research-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Research Paper', 'https://example.com/paper', 0
FROM nodes WHERE uuid = 'research-1';

INSERT INTO node_footnotes (node_id, footnote, sort_order)
SELECT id, 'Presented at CHI 2024 Workshop on Human-AI Interaction.', 0
FROM nodes WHERE uuid = 'research-1';

INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'artifact-1'
FROM nodes WHERE uuid = 'research-1';

-- Design Studio (under Initiatives)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    origin_date, last_updated, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'path-3'),
    'Design Studio',
    'nodes/initiatives/design-studio',
    'initiative-1',
    'Creative Practice',
    '<p>A collaborative design studio focused on experimental projects at the intersection of technology and human experience.</p>',
    '2022-01-01',
    '2024-01-01',
    true,
    true,
    'initiative',
    0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Founded', '2022', 0
FROM nodes WHERE uuid = 'initiative-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Team', '3 Members', 1
FROM nodes WHERE uuid = 'initiative-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Studio Website', 'https://example.com/studio', 0
FROM nodes WHERE uuid = 'initiative-1';
```

---

## 8. Test Your API

### Step 8.1: Test in Browser

Open your browser and go to:

```
https://[your-project-id].supabase.co/rest/v1/nodes?select=*&apikey=[your-anon-key]
```

You should see JSON data with all your nodes.

### Step 8.2: Test with Nested Data

Try this URL to get nodes with their related data:

```
https://[your-project-id].supabase.co/rest/v1/nodes?select=*,node_links(*),node_metadata(*),node_media(*)&apikey=[your-anon-key]
```

### Step 8.3: Test Hierarchical Query

To get the tree structure:

```
https://[your-project-id].supabase.co/rest/v1/nodes?select=*,children:nodes(*)&parent_id=is.null&apikey=[your-anon-key]
```

---

## 9. Update Frontend Code

### Step 9.1: Install Supabase Client

In your project terminal, run:

```bash
npm install @supabase/supabase-js
```

### Step 9.2: Create Supabase Client

Create a new file `assets/js/utils/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 9.3: Update Data.js

Replace the contents of `assets/js/utils/Data.js` with a Supabase-integrated version. The key changes:

1. Import the supabase client
2. Replace `fetchPageData` with Supabase queries
3. Build the tree structure from flat table data

(Detailed code will be provided when you're ready to implement)

---

## 10. Common Mistakes to Avoid

### Database Setup Mistakes

| Mistake | Prevention |
|---------|------------|
| Forgetting to enable RLS | Always enable RLS, even for public tables |
| Not creating indexes | Run the CREATE INDEX statements for performance |
| Using wrong data types | DATE for dates, TEXT for HTML content, BOOLEAN for flags |
| Forgetting foreign keys | Always reference node_id properly |

### Storage Mistakes

| Mistake | Prevention |
|---------|------------|
| Making bucket private | Toggle "Public bucket" ON for portfolio images |
| Wrong MIME types | Specify allowed types when creating bucket |
| Not organizing files | Use folder structure: `nodes/[project-name]/[image]` |

### Security Mistakes

| Mistake | Prevention |
|---------|------------|
| Exposing service key | Only use `anon` key in frontend code |
| No RLS policies | Always create SELECT policies for public read |
| Allowing public writes | Never create INSERT/UPDATE/DELETE policies for `anon` |

### API Mistakes

| Mistake | Prevention |
|---------|------------|
| Wrong API key in URL | Double-check the anon key from Settings > API |
| Missing `apikey` param | Always include in REST URLs or use JS client |
| Not handling errors | Add try/catch and fallback to static JSON |

---

## Quick Reference

### Supabase Dashboard URLs

- **Table Editor**: Supabase Dashboard > Table Editor
- **SQL Editor**: Supabase Dashboard > SQL Editor
- **Storage**: Supabase Dashboard > Storage
- **API Settings**: Supabase Dashboard > Settings > API

### Useful SQL Queries

```sql
-- View all nodes with their parent titles
SELECT 
    n.title, 
    n.type, 
    n.uri,
    p.title as parent_title
FROM nodes n
LEFT JOIN nodes p ON n.parent_id = p.id
ORDER BY n.sort_order;

-- View node with all related data
SELECT 
    n.*,
    json_agg(DISTINCT nl.*) as links,
    json_agg(DISTINCT nm.*) as metadata
FROM nodes n
LEFT JOIN node_links nl ON nl.node_id = n.id
LEFT JOIN node_metadata nm ON nm.node_id = n.id
WHERE n.uuid = 'artifact-1'
GROUP BY n.id;

-- Count items by type
SELECT type, COUNT(*) 
FROM nodes 
WHERE type != ''
GROUP BY type;
```

### Adding New Content

To add a new project:

1. Go to **Table Editor** > **nodes**
2. Click **Insert row**
3. Fill in the fields (parent_id should reference the parent node's id)
4. Add related data in node_metadata, node_links, etc.

To add images:

1. Go to **Storage** > **portfolio-media**
2. Navigate to or create the folder
3. Upload images
4. Copy the public URL
5. Add a row in **node_media** with the URL

---

## Next Steps

After completing this setup:

1. ✅ Verify all tables are created (Table Editor)
2. ✅ Verify RLS policies are active (Authentication > Policies)
3. ✅ Test the API in browser
4. ✅ Upload a test image to Storage
5. ✅ Update frontend code to use Supabase
6. ✅ Deploy to Vercel

---

*Document created for portfolio-product project*
*Last updated: January 2026*

