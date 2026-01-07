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

Your portfolio uses a **nested tree structure**. Here's the complete graph:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              RUDRAM PIPLAD (Root)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ├── Information (path)                                                      │
│  │   └── Contact & Links                                                     │
│  │                                                                           │
│  ├── AI Systems (path)                                                       │
│  │   ├── RAG Pipelines                                                       │
│  │   │   ├── GraphRAG                                                        │
│  │   │   ├── Document Parsing                                                │
│  │   │   └── Chunking Strategies                                             │
│  │   ├── AI Agents                                                           │
│  │   │   ├── Butler Expense Agent                                            │
│  │   │   └── AI Ethics Framework -----------------> [links to Eval Framework]│
│  │   └── Safety & Evals                                                      │
│  │       ├── Eval Framework ----------------------> [links to Boundaryless]  │
│  │       └── PII/DLP Guardrails                                              │
│  │                                                                           │
│  ├── Spatial & Perception (path)                                             │
│  │   ├── Foveated Rendering & Gaze Tracking ------> [links to XR Prototypes] │
│  │   ├── Haptics Research ------------------------> [links to XR Prototypes] │
│  │   └── XR Prototypes                                                       │
│  │       ├── AED in VR                                                       │
│  │       ├── 3D Printing VR                                                  │
│  │       └── AR Mobile Games                                                 │
│  │                                                                           │
│  ├── Product Work (path)                                                     │
│  │   ├── ThoughtSpot                                                         │
│  │   │   ├── Boundaryless / Enterprise Search                                │
│  │   │   ├── Navigation & Discovery                                          │
│  │   │   ├── Object Search                                                   │
│  │   │   └── Homepage                                                        │
│  │   └── Policybazaar                                                        │
│  │       ├── Your Orders                                                     │
│  │       ├── Web Analytics                                                   │
│  │       └── Growth & Mobile App                                             │
│  │                                                                           │
│  ├── Consulting (path)                                                       │
│  │   ├── Tata Group                                                          │
│  │   │   ├── MLOps & LLM Intelligence                                        │
│  │   │   └── AI Maturity Model                                               │
│  │   └── Chisel Labs                                                         │
│  │       └── Global SaaS GTM                                                 │
│  │                                                                           │
│  ├── Bets (path)                                                             │
│  │   ├── Caval                                                               │
│  │   └── EventHive                                                           │
│  │                                                                           │
│  ├── Visual Practice (path)                                                  │
│  │   ├── Photography                                                         │
│  │   └── Graphic Design & Illustrations                                      │
│  │       ├── NFT Collection                                                  │
│  │       ├── E-Cell Magazine                                                 │
│  │       └── Behance Work                                                    │
│  │                                                                           │
│  ├── Trajectory (path)                                                       │
│  │   ├── IIT Madras                                                          │
│  │   │   ├── Engineering Design                                              │
│  │   │   └── Thesis: Photoacoustic Spectroscopy                              │
│  │   └── IIM Bangalore                                                       │
│  │       ├── MBA                                                             │
│  │       └── NCCU Exchange Taipei                                            │
│  │                                                                           │
│  └── Footnotes (path) [dashed/secondary - achievements & recognition]        │
│      ├── HCL-CA TechJam                                                      │
│      ├── ITC Interrobang                                                     │
│      └── GATE & JEE Ranks                                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Cross-Links (Connected Nodes)

These nodes reference each other to show relationships:

| Source Node | Links To | Relationship |
|-------------|----------|--------------|
| AI Ethics Framework | Eval Framework | Philosophical foundation for evaluation approach |
| Eval Framework | Boundaryless / Enterprise Search | Evals as release gate for AI search |
| Foveated Rendering & Gaze Tracking | XR Prototypes | Research informing applied work |
| Haptics Research | XR Prototypes | Research informing applied work |
| Thesis: Photoacoustic Spectroscopy | Spatial & Perception | Academic foundation for perception interest |
| Growth & Mobile App (NLP work) | RAG Pipelines | Early exploration of text understanding |

### Database Tables

```
┌─────────────────────────────────────────────────────────────────┐
│                         nodes (main table)                       │
│  Stores all portfolio items with parent_id for hierarchy         │
│  Total: ~50 nodes across 4 depth levels                          │
├─────────────────────────────────────────────────────────────────┤
│  Node Types:                                                     │
│  - '' (root)      - information    - path                        │
│  - artifact       - research       - initiative                  │
│  - recognition                                                   │
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
    type TEXT CHECK (type IN ('', 'information', 'path', 'artifact', 'research', 'initiative', 'recognition')),
    
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
$$ LANGUAGE plpgsql;

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

If you want to update data via the Supabase dashboard's **Table Editor** or authenticated API calls (not SQL Editor—SQL Editor uses the service role which bypasses RLS):

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

Run these SQL scripts in **SQL Editor** in order. Each section can be run as a single batch.

> ⚠️ **IMPORTANT**: Execute these steps **in order** (7.1 → 7.2 → 7.3 → etc.). Parent nodes must exist before their children because of foreign key constraints. If you get a "violates foreign key constraint" error, you likely ran steps out of order.

---

### Step 7.1: Insert Root Node

```sql
-- ============================================
-- ROOT NODE: Rudram Piplad
-- ============================================
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, role, email,
    description, extended_description, origin_date, last_updated, is_featured, type, sort_order
) VALUES (
    NULL,
    'Rudram Piplad',
    '/',
    'root-0',
    'Product & AI Builder',
    'Product Manager & AI Engineer',
    'rudram@alumni.iitm.ac.in',
    '<p>I build products that involve AI, and I think a lot about why most AI products feel broken.</p><p>The short answer: they violate trust. They hallucinate confidently. They retrieve irrelevant context. They optimize for metrics that don''t align with user value. The systems work, technically. They just don''t feel trustworthy.</p><p>This problem isn''t new to me. Before AI, I worked on VR systems — specifically, how to render graphics in a way that respects human perception. Your eyes don''t see uniformly; why should rendering be uniform? Before that, I worked on haptics — how touch feedback needs to be fast, not strong, to feel real.</p>',
    '<p>The thread: systems that respect how humans actually experience them.</p><p>Right now, I''m a PM at ThoughtSpot, building AI-powered enterprise search. Before that, I led product at Policybazaar for 15M monthly users. I''ve also started two companies (one made money, one taught me more), done some consulting, and maintained a visual practice in photography and digital art.</p><p>I studied engineering design at IIT Madras and got an MBA at IIM Bangalore. The combination matters: I can go deep on technical problems and still connect them to business outcomes.</p><p>This portfolio is a graph. It''s meant to be explored, not read linearly. Start anywhere. Everything connects eventually.</p>',
    '2018-01-01',
    '2026-01-01',
    true,
    '',
    0
);
```

---

### Step 7.2: Insert Level 1 Path Nodes (Main Categories)

```sql
-- ============================================
-- LEVEL 1: Main Category Paths
-- ============================================

-- Information
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Information',
    'nodes/information',
    'info-path',
    'About & Contact',
    '<p>Personal information, contact details, and professional links.</p>',
    true, 'path', 0
);

-- AI Systems
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'AI Systems',
    'nodes/ai-systems',
    'ai-path',
    'Building Intelligent Systems',
    '<p>I''ve spent the last two years building AI systems that need to work in production — not demos, not prototypes, actual products where wrong answers cost money or trust. The thing I keep returning to: most AI failures aren''t capability failures, they''re trust failures.</p>',
    '<p>The model could answer correctly, but it didn''t know when to abstain. Or it hallucinated with confidence. Or it retrieved the right document but extracted the wrong fact. This section is about that problem — RAG systems that actually retrieve relevant context, agents that know their boundaries, and evaluation frameworks that catch regressions before users do.</p>',
    true, 'path', 1
);

-- Spatial & Perception
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Spatial & Perception',
    'nodes/spatial-perception',
    'spatial-path',
    'XR & Human Perception Research',
    '<p>Before I cared about AI trust, I cared about perceptual honesty. VR systems that make you sick are lying to your vestibular system. Haptic feedback that''s delayed breaks the illusion of touch. Interfaces that ignore where your eyes are looking waste compute on pixels you''ll never see.</p>',
    '<p>This was my research focus at IIT Madras. It shapes how I think about all interfaces — digital or physical.</p>',
    true, 'path', 2
);

-- Product Work
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Product Work',
    'nodes/product-work',
    'product-path',
    'Industry Product Experience',
    '<p>Product management at scale is about tradeoffs. Every feature has opportunity cost. Every metric has a dark pattern lurking. The job isn''t building what stakeholders ask for — it''s figuring out what users actually need and finding a way to make the business case.</p>',
    '<p>I''ve done this at two companies: Policybazaar (15M monthly users, insurance) and ThoughtSpot (enterprise BI, AI-native search).</p>',
    true, 'path', 3
);

-- Consulting
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Consulting',
    'nodes/consulting',
    'consulting-path',
    'Strategic Advisory',
    '<p>Consulting is about impact without authority. You don''t control the roadmap. You don''t own the team. You give recommendations and hope they stick.</p>',
    '<p>I''ve done two kinds: management consulting (Tata Group) and product consulting (Chisel Labs). Different contexts, same skill: pattern matching across companies and translating insights into actionable recommendations.</p>',
    true, 'path', 4
);

-- Bets
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Bets',
    'nodes/bets',
    'bets-path',
    'Entrepreneurial Ventures',
    '<p>Bets are different from jobs. You don''t have product-market fit handed to you. You don''t have a team waiting for direction. You have an idea and the willingness to be wrong publicly.</p>',
    '<p>I''ve made two bets. One worked (sort of). One didn''t (but taught me more).</p>',
    true, 'path', 5
);

-- Visual Practice
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Visual Practice',
    'nodes/visual-practice',
    'visual-path',
    'Photography & Design',
    '<p>I don''t separate "creative" from "technical." Photography taught me about attention — where eyes go, what they ignore. Illustration taught me about abstraction — what to keep, what to remove. Design taught me about systems — how parts relate to wholes.</p>',
    '<p>This isn''t a hobby section. It''s a different lens on the same questions.</p>',
    true, 'path', 6
);

-- Trajectory
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Trajectory',
    'nodes/trajectory',
    'trajectory-path',
    'Education & Journey',
    '<p>A timeline isn''t a story. This section is about choices — why I picked biomedical design at IIT, why I left a PM job for an MBA, why I came back to product after business school.</p>',
    true, 'path', 7
);

-- Footnotes (special - achievements/recognition)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, is_secondary, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Footnotes',
    'nodes/footnotes',
    'footnotes-path',
    'Achievements & Recognition',
    '<p>These aren''t bragging rights. They''re markers — moments where external validation confirmed (or surprised) me. Listed here for completeness, not prominence.</p>',
    true, true, 'path', 8
);
```

---

### Step 7.3: Insert Information Section

```sql
-- ============================================
-- INFORMATION > Contact & Links
-- Just the facts. No bio here — the graph IS the bio.
-- ============================================
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, role, email, telephone, overview,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'info-path'),
    'Contact & Links',
    'nodes/information/contact',
    'contact-1',
    'Get in Touch',
    'Product Manager & AI Engineer',
    'rudram@alumni.iitm.ac.in',
    '+91 9940334981',
    'Based in Bangalore, India',
    true, 'information', 0
);

-- Add external links for Contact
INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'LinkedIn', 'https://linkedin.com/in/rudrampiplad', 0
FROM nodes WHERE uuid = 'contact-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub', 'https://github.com/rudramroseate8', 1
FROM nodes WHERE uuid = 'contact-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Behance', 'https://behance.net/rudrampiplad', 2
FROM nodes WHERE uuid = 'contact-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Email', 'mailto:rudram@alumni.iitm.ac.in', 3
FROM nodes WHERE uuid = 'contact-1';
```

---

### Step 7.4: Insert AI Systems Hierarchy

```sql
-- ============================================
-- AI SYSTEMS > Sub-paths
-- ============================================

-- RAG Pipelines
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ai-path'),
    'RAG Pipelines',
    'nodes/ai-systems/rag-pipelines',
    'rag-path',
    'Retrieval-Augmented Generation',
    '<p>RAG is deceptively simple in theory: retrieve relevant chunks, feed them to an LLM, get better answers. In practice, every decision compounds. How you chunk determines what gets retrieved. How you retrieve determines what the model sees. How the model sees context determines whether the answer is grounded or fabricated.</p>',
    '<p>I''ve built RAG systems at ThoughtSpot (enterprise scale, real SLAs) and in side projects (where I could break things freely). The lesson: naive RAG is easy to build and hard to trust. Good RAG requires obsessing over the retrieval layer.</p>',
    true, 'path', 0
);

-- AI Agents
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ai-path'),
    'AI Agents',
    'nodes/ai-systems/agents',
    'agents-path',
    'Autonomous AI Systems',
    '<p>Agents are having a moment. Most of what I see is demos — impressive loops that work on happy paths and fail silently on edge cases. The hard part isn''t making an agent that works; it''s making an agent that knows when it''s stuck.</p>',
    '<p>I''ve built two agent systems: one for a practical problem (expense tracking), one for a philosophical one (AI ethics evaluation). Both taught me the same lesson: agents need escape hatches and introspection.</p>',
    true, 'path', 1
);

-- Safety & Evals
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ai-path'),
    'Safety & Evals',
    'nodes/ai-systems/safety-evals',
    'safety-path',
    'AI Safety & Evaluation',
    '<p>Shipping AI without evals is shipping blind. You might get lucky. You probably won''t. The question isn''t whether your model makes mistakes — it will. The question is whether you catch them before users do.</p>',
    '<p>This section is about building evaluation into the release process, not as an afterthought but as a gate.</p>',
    true, 'path', 2
);

-- ============================================
-- RAG PIPELINES > Leaf Nodes
-- ============================================

-- GraphRAG
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'rag-path'),
    'GraphRAG',
    'nodes/ai-systems/rag-pipelines/graphrag',
    'graphrag-1',
    'Knowledge Graph + RAG',
    '<p>Standard RAG felt like searching with a blindfold — you get results, but you don''t know why they''re connected. Graph structures preserve relationships that chunking destroys.</p>',
    '<p>I started from scratch twice. The first attempt (chunking-experiments repo) was a graveyard of half-working ideas. The second attempt (graph-rag-trials) actually deployed. Key insight: the graph isn''t just for retrieval — it''s for explaining why an answer exists.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Technologies', 'Neo4j, LangChain, OpenAI', 0
FROM nodes WHERE uuid = 'graphrag-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub', 'https://github.com/rudramroseate8/graph-rag-trials', 0
FROM nodes WHERE uuid = 'graphrag-1';

-- Document Parsing
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'rag-path'),
    'Document Parsing',
    'nodes/ai-systems/rag-pipelines/doc-parsing',
    'docparse-1',
    'Intelligent Document Processing',
    '<p>Before you can chunk, you need to parse. PDFs lie about their structure. PPTs hide information in speaker notes. Excel files have merged cells that break everything.</p>',
    '<p>Built a parser pipeline using Docling that handles PDF, PPT, XLSX. The goal wasn''t perfect parsing — it was predictable failure modes. When parsing fails, fail loudly and early.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Technologies', 'Docling, PyMuPDF, Unstructured, OCR', 0
FROM nodes WHERE uuid = 'docparse-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: document-parser-for-rag', 'https://github.com/rudramroseate8/document-parser-for-rag', 0
FROM nodes WHERE uuid = 'docparse-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: doc-parsers', 'https://github.com/rudramroseate8/doc-parsers', 1
FROM nodes WHERE uuid = 'docparse-1';

-- Chunking Strategies
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'rag-path'),
    'Chunking Strategies',
    'nodes/ai-systems/rag-pipelines/chunking',
    'chunking-1',
    'Semantic Text Chunking',
    '<p>The dirty secret of RAG: your chunking strategy matters more than your embedding model. Chunk too small and you lose context. Chunk too large and you dilute relevance. Chunk by page and you split sentences. Chunk by semantic boundaries and you need a model to find them.</p>',
    '<p>I tried recursive splitting, semantic chunking, parent-child hierarchies. What worked: hybrid approaches that preserve document structure while respecting semantic coherence. What didn''t: anything that treated documents as flat text.</p>',
    true, 'artifact', 2
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: chunking-strategy-experiments', 'https://github.com/rudramroseate8/chunking-strategy-experiments', 0
FROM nodes WHERE uuid = 'chunking-1';

-- ============================================
-- AI AGENTS > Leaf Nodes
-- ============================================

-- Butler Expense Agent
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'agents-path'),
    'Butler Expense Agent',
    'nodes/ai-systems/agents/butler',
    'butler-1',
    'Autonomous Expense Management',
    '<p>Travel expense tracking is annoying because it''s contextual. A $50 meal might be business or personal depending on who you were with. A cab ride might be reimbursable or not depending on company policy you don''t remember.</p>',
    '<p>Built a multi-agent system that handles categorization, policy checking, and anomaly detection. The interesting part wasn''t the agents — it was designing the handoff protocols. When does the categorization agent admit uncertainty and escalate? How does the policy agent handle ambiguous rules?</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Stack', 'LangGraph, GPT-4, Tool Calling', 0
FROM nodes WHERE uuid = 'butler-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: butler-travel-expense-agent', 'https://github.com/rudramroseate8/butler-travel-expense-agent', 0
FROM nodes WHERE uuid = 'butler-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: expense-agents-ui-lovable', 'https://github.com/rudramroseate8/expense-agents-ui-lovable', 1
FROM nodes WHERE uuid = 'butler-1';

-- AI Ethics Framework
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'agents-path'),
    'AI Ethics Framework',
    'nodes/ai-systems/agents/ethics',
    'ethics-1',
    'Responsible AI Guidelines',
    '<p>Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That''s not ethics — that''s compliance theater.</p>',
    '<p>Built a multi-agent evaluation system that asks the hard questions about AI products before users do. The agents are adversarial by design — they look for failure modes, edge cases, fairness violations, manipulation vectors. Philosophy-grounded, practically useful. The uncomfortable part: running this on my own projects and finding problems I didn''t want to see.</p>',
    true, 'research', 1
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: applied-ai-ethics', 'https://github.com/rudramroseate8/applied-ai-ethics', 0
FROM nodes WHERE uuid = 'ethics-1';

-- Cross-link: AI Ethics -> Eval Framework
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'evalframework-1'
FROM nodes WHERE uuid = 'ethics-1';

-- ============================================
-- SAFETY & EVALS > Leaf Nodes
-- ============================================

-- Eval Framework
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'safety-path'),
    'Eval Framework',
    'nodes/ai-systems/safety-evals/eval-framework',
    'evalframework-1',
    'LLM Evaluation System',
    '<p>At ThoughtSpot, I introduced groundedness and safety evals as release gates. The rule: if evals regress, the release doesn''t ship. No exceptions, no "we''ll fix it next sprint."</p>',
    '<p>This was politically harder than technically hard. Engineers don''t like gates. PMs don''t like delays. But the alternative — shipping regressions and fixing them in production — is worse for everyone. Metrics that mattered: nDCG@5 for retrieval quality, recall@10 for coverage, latency p95 under 5s. Metrics that didn''t matter: anything that couldn''t be tied to user trust.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Metrics', 'nDCG@5, Recall@10, Latency p95', 0
FROM nodes WHERE uuid = 'evalframework-1';

-- Cross-link: Eval Framework -> Boundaryless
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'tsboundary-1'
FROM nodes WHERE uuid = 'evalframework-1';

-- PII/DLP Guardrails
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'safety-path'),
    'PII/DLP Guardrails',
    'nodes/ai-systems/safety-evals/pii-dlp',
    'piidlp-1',
    'Data Protection in AI',
    '<p>Enterprise AI has a specific failure mode: leaking data that shouldn''t be leaked. User asks a question, RAG retrieves a document they shouldn''t see, answer includes confidential information.</p>',
    '<p>Built PII redaction and DLP (data loss prevention) guardrails at ThoughtSpot. Shipped moderation layers. Cleared SOC 2 Type II with zero major findings. The lesson: guardrails need to be invisible when working and loud when triggered. Users shouldn''t feel surveilled, but violations need to be caught and logged.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Compliance', 'SOC 2 Type II Certified', 0
FROM nodes WHERE uuid = 'piidlp-1';
```

---

### Step 7.5: Insert Spatial & Perception Hierarchy

```sql
-- ============================================
-- SPATIAL & PERCEPTION > Nodes
-- ============================================

-- Foveated Rendering & Gaze Tracking
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    'Foveated Rendering & Gaze Tracking',
    'nodes/spatial-perception/foveated-rendering',
    'foveat-1',
    'Eye-Tracking for VR Optimization',
    '<p>Human eyes have high resolution only at the fovea — the tiny central region of your vision. Peripheral vision is blurry by design. Traditional rendering ignores this, computing every pixel at full resolution. Wasteful.</p>',
    '<p>Built a saccadic foveated rendering pipeline for VR using the HTC Vive Pro Eye''s eye tracker. The idea: track where the user is looking, render that region at full resolution, degrade the periphery. Results: 57-70% compute reduction with no perceptible quality loss. The hard part wasn''t the rendering — it was predicting where eyes would move next. Saccades are fast. If you render based on where eyes *were*, you''re already late.</p>',
    true, true, 'research', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Lab', 'IIT Madras VR Lab', 0
FROM nodes WHERE uuid = 'foveat-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Result', '57-70% compute reduction', 1
FROM nodes WHERE uuid = 'foveat-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: foveated-rendering-virtual-reality', 'https://github.com/rudramroseate8/foveated-rendering-virtual-reality', 0
FROM nodes WHERE uuid = 'foveat-1';

-- Cross-link: Foveated Rendering -> XR Prototypes
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'xrproto-path'
FROM nodes WHERE uuid = 'foveat-1';

-- Haptics Research
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    'Haptics Research',
    'nodes/spatial-perception/haptics',
    'haptics-1',
    'Tactile Feedback Systems',
    '<p>Touch is the forgotten sense in computing. We''ve optimized visual fidelity for decades. Audio is good enough. But haptics? Still feels like vibration motors from 2010.</p>',
    '<p>Worked in the Haptics Lab at IIT Madras. Built an evaluation matrix for XR haptic feedback — latency, comfort, thermal characteristics. The finding: +23% perceived responsiveness from optimizing feedback timing, not feedback intensity. Users don''t need stronger haptics; they need faster ones.</p>',
    true, 'research', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Result', '+23% perceived responsiveness', 0
FROM nodes WHERE uuid = 'haptics-1';

-- Cross-link: Haptics -> XR Prototypes
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'xrproto-path'
FROM nodes WHERE uuid = 'haptics-1';

-- XR Prototypes (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    'XR Prototypes',
    'nodes/spatial-perception/xr-prototypes',
    'xrproto-path',
    'Extended Reality Projects',
    '<p>The best way to understand perception is to build things that break it. XR prototypes are my lab — quick builds to test ideas about how humans experience virtual and augmented environments.</p>',
    true, 'path', 2
);

-- AED in VR
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'xrproto-path'),
    'AED in VR',
    'nodes/spatial-perception/xr-prototypes/aed-vr',
    'aedvr-1',
    'Emergency Training Simulator',
    '<p>Built a VR training simulation for automated external defibrillator (AED) use. The goal: train people to respond to cardiac emergencies without needing physical equipment.</p>',
    '<p>Learned more from failures than successes. Reverted all code at one point. What remained: understanding of how procedural memory works differently in VR vs. physical training.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Platform', 'Unity, Oculus Quest', 0
FROM nodes WHERE uuid = 'aedvr-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: automated-external-defibrillator-in-vr', 'https://github.com/rudramroseate8/automated-external-defibrillator-in-vr', 0
FROM nodes WHERE uuid = 'aedvr-1';

-- 3D Printing VR
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'xrproto-path'),
    '3D Printing VR',
    'nodes/spatial-perception/xr-prototypes/3d-print-vr',
    'print3d-1',
    'Spatial 3D Modeling',
    '<p>Can you design 3D-printable objects in VR more intuitively than in CAD software? Built a prototype to find out.</p>',
    '<p>Answer: for some tasks, yes. For precision work, no. Interesting middle ground: ideation in VR, refinement in CAD.</p>',
    true, 'artifact', 1
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: 3d-printing-in-vr', 'https://github.com/rudramroseate8/3d-printing-in-vr', 0
FROM nodes WHERE uuid = 'print3d-1';

-- AR Mobile Games
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'xrproto-path'),
    'AR Mobile Games',
    'nodes/spatial-perception/xr-prototypes/ar-games',
    'argames-1',
    'Location-Based AR',
    '<p>First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub. Used Git only locally.</p>',
    '<p>The games shipped. The codebase didn''t survive.</p>',
    true, 'artifact', 2
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Platform', 'ARCore, Unity', 0
FROM nodes WHERE uuid = 'argames-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Status', 'Code missing, lessons learned', 1
FROM nodes WHERE uuid = 'argames-1';
```

---

### Step 7.6: Insert Product Work Hierarchy

```sql
-- ============================================
-- PRODUCT WORK > Companies
-- ============================================

-- ThoughtSpot (company sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'product-path'),
    'ThoughtSpot',
    'nodes/product-work/thoughtspot',
    'ts-path',
    'AI-Powered Analytics',
    '<p>ThoughtSpot is an AI-native BI platform. Users ask questions in natural language, the system generates SQL, returns answers. My scope: Boundaryless (enterprise search across data sources), Navigation & Discovery (how users find things), and the Homepage experience.</p>',
    '<p>The interesting problem: AI in enterprise has different failure modes than consumer AI. Wrong answers don''t just frustrate — they lead to bad business decisions. The bar for trust is higher.</p>',
    '2023-01-01',
    true, 'path', 0
);

-- Policybazaar (company sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'product-path'),
    'Policybazaar',
    'nodes/product-work/policybazaar',
    'pb-path',
    'InsurTech Platform',
    '<p>Policybazaar is India''s largest insurance aggregator. 15M monthly users comparing and buying insurance. I was part of the CEO''s office, leading 7 agile teams on a 3-year product strategy.</p>',
    '<p>The challenge: insurance is confusing. Users don''t know what they need. The job was making complexity manageable without dumbing it down.</p>',
    '2021-01-01',
    true, 'path', 1
);

-- ============================================
-- THOUGHTSPOT > Projects
-- ============================================

-- Boundaryless / Enterprise Search
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Boundaryless / Enterprise Search',
    'nodes/product-work/thoughtspot/boundaryless',
    'tsboundary-1',
    'AI-Powered Enterprise Search',
    '<p>Enterprise data is scattered. Data warehouses, lakehouses, spreadsheets, third-party tools. Boundaryless is ThoughtSpot''s answer: search across everything, get answers regardless of where data lives.</p>',
    '<p>I owned the agentic RAG implementation for this. Key constraints: &lt;$0.004/query cost (enterprise scale adds up), &gt;0.7 nDCG@5 (answers must be relevant), 0.9 Recall@10 (don''t miss important results). Shipped via rethink policy and caching. Also evaluated vector DB vendors vs. building in-house. Negotiated SLAs and pricing. Estimated 25% cost savings from the right vendor choice.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Product Manager', 0
FROM nodes WHERE uuid = 'tsboundary-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Constraints', '<$0.004/query, >0.7 nDCG@5', 1
FROM nodes WHERE uuid = 'tsboundary-1';

-- Navigation & Discovery
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Navigation & Discovery',
    'nodes/product-work/thoughtspot/navigation',
    'tsnav-1',
    'UX Redesign',
    '<p>How do users find what they''re looking for in an enterprise tool? The answer isn''t just search — it''s structure. Navigation, information architecture, SERP UX.</p>',
    '<p>Overhauled the frontend and backend of navigation systems. Standardized product list pages. Revamped search results UX. Result: 20% faster time to discovery.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', '20% faster time to discovery', 0
FROM nodes WHERE uuid = 'tsnav-1';

-- Object Search [Content to be written based on specific work]
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Object Search',
    'nodes/product-work/thoughtspot/object-search',
    'tsobjsearch-1',
    'Semantic Object Discovery',
    '<p>Beyond answering questions, users need to find things — dashboards, reports, data sources. Object search is that problem.</p>',
    true, 'artifact', 2
);

-- Homepage
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Homepage',
    'nodes/product-work/thoughtspot/homepage',
    'tshome-1',
    'Personalized Landing Experience',
    '<p>The homepage is the first thing users see. It sets expectations. At ThoughtSpot, the old homepage was a list of recent items. Functional, not useful.</p>',
    '<p>Overhauled the FE+BE to surface relevant content based on user behavior and role. Not personalization theater — actual signal-based recommendations.</p>',
    true, 'artifact', 3
);

-- ============================================
-- POLICYBAZAAR > Projects
-- ============================================

-- Your Orders
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'pb-path'),
    'Your Orders',
    'nodes/product-work/policybazaar/orders',
    'orders-1',
    'Policy Management Dashboard',
    '<p>Insurance customers have a problem: they buy a policy and then forget about it. When they need to make a claim or check details, they call customer support. Every call costs money.</p>',
    '<p>Built "Your Orders" — a self-service portal for managing insurance policies. Users could view policies, track claims, download documents. Results: saved ₹10M+ in customer support costs. 170% increase in engagement with policy management. Users actually *wanted* to self-serve; they just didn''t have the tools.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', 'Saved ₹10M+ in support costs', 0
FROM nodes WHERE uuid = 'orders-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Engagement', '+170% policy management', 1
FROM nodes WHERE uuid = 'orders-1';

-- Web Analytics
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'pb-path'),
    'Web Analytics',
    'nodes/product-work/policybazaar/analytics',
    'webanalytics-1',
    'Data-Driven Optimization',
    '<p>You can''t improve what you can''t measure. When I joined, Policybazaar''s web analytics had 60% discrepancy between reported and actual numbers. Decisions were being made on bad data.</p>',
    '<p>Formed a team of 15+, overhauled the entire analytics infrastructure. Cut discrepancies by 60%. Saved ₹6.5M+ in wasted spend that was being attributed incorrectly. The lesson: analytics isn''t a technical problem. It''s an organizational problem. Everyone has to agree on definitions, tracking, and truth.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', 'Saved ₹6.5M+ in wasted spend', 0
FROM nodes WHERE uuid = 'webanalytics-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Team', '15+ members', 1
FROM nodes WHERE uuid = 'webanalytics-1';

-- Growth & Mobile App
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'pb-path'),
    'Growth & Mobile App',
    'nodes/product-work/policybazaar/growth-mobile',
    'growthmobile-1',
    'Mobile-First Growth',
    '<p>Mobile app deployment was slow and unreliable. Streamlined the iOS and Android release process. Result: 50% increase in adoption within 2 weeks, attributed ₹25M+ revenue.</p>',
    '<p>Also ran A/B tests for upselling flows. Optimized through iteration, not intuition. 21% higher upselling, ₹75M+ generated. Prototyped NLP-driven analysis of customer support tickets. Found root causes of common issues. Cut turnaround time by 40%, saved ₹300K+.</p>',
    true, 'artifact', 2
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Revenue', '₹25M+ from mobile, ₹75M+ from upselling', 0
FROM nodes WHERE uuid = 'growthmobile-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Adoption', '+50% in 2 weeks', 1
FROM nodes WHERE uuid = 'growthmobile-1';

-- Cross-link: Growth & Mobile App (NLP work) -> RAG Pipelines
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'rag-path'
FROM nodes WHERE uuid = 'growthmobile-1';
```

---

### Step 7.7: Insert Consulting Hierarchy

```sql
-- ============================================
-- CONSULTING > Clients
-- ============================================

-- Tata Group
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'consulting-path'),
    'Tata Group',
    'nodes/consulting/tata',
    'tata-path',
    'Enterprise AI Strategy',
    '<p>Summer associate at TCS, CPG & Retail practice. Management consulting, not product management. The job: research, synthesize, recommend.</p>',
    true, 'path', 0
);

-- Chisel Labs
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'consulting-path'),
    'Chisel Labs',
    'nodes/consulting/chisel',
    'chisel-path',
    'Product Strategy',
    '<p>Product consulting for a pre-Series A SaaS startup. Paid engagement, not full-time.</p>',
    true, 'path', 1
);

-- ============================================
-- TATA GROUP > Projects
-- ============================================

-- MLOps & LLM Intelligence
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'tata-path'),
    'MLOps & LLM Intelligence',
    'nodes/consulting/tata/mlops',
    'mlops-1',
    'Enterprise ML Infrastructure',
    '<p>Authored competitive intelligence reports on MLOps platforms and LLM capabilities. The output wasn''t a product — it was a recommendation for how Tata should position in RFPs.</p>',
    '<p>Proposed revisions to RFP templates based on competitive analysis. Targeted 12% cost savings by avoiding over-specifying requirements that only certain vendors could meet.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Target', '12% cost savings in RFPs', 0
FROM nodes WHERE uuid = 'mlops-1';

-- AI Maturity Model
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'tata-path'),
    'AI Maturity Model',
    'nodes/consulting/tata/ai-maturity',
    'aimaturity-1',
    'Organizational Assessment',
    '<p>Built a three-part digital maturity model to assess enterprise AI readiness. Used in CIO proposals.</p>',
    '<p>Result: 15% increase in AI adoption recommendations in proposals. The model gave sales teams a framework for having AI conversations with clients who weren''t sure where to start.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', '+15% AI adoption in proposals', 0
FROM nodes WHERE uuid = 'aimaturity-1';

-- ============================================
-- CHISEL LABS > Projects
-- ============================================

-- Global SaaS GTM
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'chisel-path'),
    'Global SaaS GTM',
    'nodes/consulting/chisel/gtm',
    'gtm-1',
    'Go-to-Market Strategy',
    '<p>Designed go-to-market strategy for international expansion. Built post-trial conversion playbook.</p>',
    '<p>Forecasted 20% ARR uplift from proposed changes. Whether it materialized depends on execution — I advised, they decided.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Forecast', '20% ARR uplift', 0
FROM nodes WHERE uuid = 'gtm-1';
```

---

### Step 7.8: Insert Bets (Ventures) Hierarchy

```sql
-- ============================================
-- BETS > Ventures
-- ============================================

-- Caval
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    origin_date, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'bets-path'),
    'Caval',
    'nodes/bets/caval',
    'caval-1',
    'Vehicle Services Startup',
    '<p>Vehicle servicing is broken. You don''t know if you''re being overcharged. You don''t know if the work was actually done. You trust mechanics because you have no choice.</p>',
    '<p>Co-founded Caval to fix this. Built a platform connecting vehicle owners with verified service providers. Transparent pricing, tracked service history, user ratings. Results: ₹5L revenue, 4K+ users, 4.6 rating on Play Store. I led design — the app, the UX, the visual identity. What worked: the user need was real. What didn''t: unit economics at scale. Customer acquisition cost was too high for the transaction value. We couldn''t make the math work without raising more than we wanted to. Lesson: Good products can be bad businesses. And that''s okay to learn.</p>',
    '2019-01-01',
    true, true, 'initiative', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Revenue', '₹5 Lakhs', 0
FROM nodes WHERE uuid = 'caval-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Users', '4K+, 4.6 Play Store rating', 1
FROM nodes WHERE uuid = 'caval-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Co-founder, Design Lead', 2
FROM nodes WHERE uuid = 'caval-1';

-- EventHive
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    origin_date, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'bets-path'),
    'EventHive',
    'nodes/bets/eventhive',
    'eventhive-1',
    'Event Tech Platform',
    '<p>Event hosting platforms are either too simple (Google Forms) or too complex (enterprise event software). EventHive was the middle ground — powerful enough for real events, simple enough for student organizers.</p>',
    '<p>Co-founded at IIT Madras, raised ₹30L through the pre-incubation program. What worked: product-founder fit. We were the users we were building for. What didn''t: timing. Built this before the event market recovered post-COVID. Demand wasn''t there when we needed it. Lesson: Timing isn''t everything, but it''s a lot.</p>',
    '2018-01-01',
    true, true, 'initiative', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Funding', '₹30 Lakhs Pre-Incubation', 0
FROM nodes WHERE uuid = 'eventhive-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Incubator', 'IIT Madras Incubation Cell', 1
FROM nodes WHERE uuid = 'eventhive-1';
```

---

### Step 7.9: Insert Visual Practice Hierarchy

```sql
-- ============================================
-- VISUAL PRACTICE > Categories
-- ============================================

-- Photography [Content to be populated based on categories — places, styles, or themes]
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'visual-path'),
    'Photography',
    'nodes/visual-practice/photography',
    'photo-1',
    'Visual Storytelling',
    '<p>Street photography, portraits, and travel documentation capturing moments and stories. What draws me to certain subjects connects to my work on perception — where eyes go, what they ignore, what makes a moment worth preserving.</p>',
    true, true, 'artifact', 0
);

-- Graphic Design & Illustrations (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'visual-path'),
    'Graphic Design & Illustrations',
    'nodes/visual-practice/graphic-design',
    'graphicdesign-path',
    'Visual Design Work',
    '<p>Design isn''t decoration. It''s communication with constraints. Every project here was about solving a problem visually — whether for money, for community, or for the challenge.</p>',
    true, 'path', 1
);

-- ============================================
-- GRAPHIC DESIGN > Projects
-- ============================================

-- NFT Collection
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'graphicdesign-path'),
    'NFT Collection',
    'nodes/visual-practice/graphic-design/nft',
    'nft-1',
    'Digital Art Collection',
    '<p>Minted 9+ digital art pieces on OpenSea during the Web3 wave. The art was real; the market was speculative.</p>',
    '<p>What I learned: creating for a market is different from creating for yourself. The NFT work that sold wasn''t my best work — it was my most marketable work. That''s a useful distinction.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Pieces', '9+ minted', 0
FROM nodes WHERE uuid = 'nft-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'OpenSea', 'https://opensea.io/rudrampiplad', 0
FROM nodes WHERE uuid = 'nft-1';

-- E-Cell Magazine
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'graphicdesign-path'),
    'E-Cell Magazine',
    'nodes/visual-practice/graphic-design/ecell-magazine',
    'ecell-1',
    'Editorial Design',
    '<p>Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+, published the first entrepreneurship magazine at the institute.</p>',
    '<p>30K+ copies printed and distributed. Learned more about print production, deadlines, and team management than any class taught.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Chief Designer', 0
FROM nodes WHERE uuid = 'ecell-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Circulation', '30K+ copies', 1
FROM nodes WHERE uuid = 'ecell-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Team', '5+ designers', 2
FROM nodes WHERE uuid = 'ecell-1';

-- Behance Work [Content to be populated with specific project details]
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'graphicdesign-path'),
    'Behance Work',
    'nodes/visual-practice/graphic-design/behance',
    'behance-1',
    'Design Portfolio',
    '<p>Curated collection of graphic design, branding, and illustration work. 3 featured projects showcasing different aspects of visual design practice.</p>',
    true, 'artifact', 2
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Behance Profile', 'https://behance.net/rudrampiplad', 0
FROM nodes WHERE uuid = 'behance-1';
```

---

### Step 7.10: Insert Trajectory (Education) Hierarchy

```sql
-- ============================================
-- TRAJECTORY > Institutions
-- ============================================

-- IIT Madras
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, end_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'trajectory-path'),
    'IIT Madras',
    'nodes/trajectory/iitm',
    'iitm-path',
    'B.Tech & Research',
    '<p>5 years. BTech + MTech in Engineering Design with a specialization in Biomedical Design. This is where I learned to build things — physical and digital.</p>',
    '<p>Why engineering design instead of CS? Because I wanted to understand *how* things are made, not just *that* they work. Design is about intent. Engineering is about constraints. Engineering design is about navigating both.</p>',
    '2015-07-01',
    '2019-05-01',
    true, 'path', 0
);

-- IIM Bangalore
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, end_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'trajectory-path'),
    'IIM Bangalore',
    'nodes/trajectory/iimb',
    'iimb-path',
    'MBA',
    '<p>MBA, QS World Rank #31. Why an MBA after working as a PM? Because I hit a ceiling. I could ship products, but I couldn''t shape strategy. I understood users, but I didn''t understand businesses.</p>',
    '<p>The MBA filled gaps — finance, operations, organizational behavior. But more importantly, it gave me time to think about what kind of PM I wanted to be.</p>',
    '2023-06-01',
    '2025-04-01',
    true, 'path', 1
);

-- ============================================
-- IIT MADRAS > Details
-- ============================================

-- Engineering Design
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iitm-path'),
    'Engineering Design',
    'nodes/trajectory/iitm/engineering-design',
    'engdes-1',
    'B.Tech Program',
    '<p>The department taught systems thinking. Products aren''t features — they''re systems of interactions. Users aren''t users — they''re people with contexts and constraints.</p>',
    '<p>This framing shapes how I approach product management. I don''t think in features. I think in systems.</p>',
    true, 'artifact', 0
);

INSERT INTO node_education (node_id, title, subtitle, year, sort_order)
SELECT id, 'B.Tech Engineering Design', 'IIT Madras', '2019', 0
FROM nodes WHERE uuid = 'engdes-1';

-- Thesis: Photoacoustic Spectroscopy
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iitm-path'),
    'Thesis: Photoacoustic Spectroscopy',
    'nodes/trajectory/iitm/thesis',
    'thesis-1',
    'Masters Research',
    '<p>Masters thesis under Dr. N.J. Vasa (Dean, IIT Madras). Laser photoacoustic spectroscopy for biomedical sensing.</p>',
    '<p>The technical details matter less than what I learned: how to work on a problem for 18 months without clear answers. How to design experiments. How to be wrong repeatedly and keep going.</p>',
    true, true, 'research', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Advisor', 'Dr. N.J. Vasa (Dean, IIT Madras)', 0
FROM nodes WHERE uuid = 'thesis-1';

-- Cross-link: Thesis -> Spatial & Perception
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'spatial-path'
FROM nodes WHERE uuid = 'thesis-1';

-- ============================================
-- IIM BANGALORE > Details
-- ============================================

-- MBA
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iimb-path'),
    'MBA',
    'nodes/trajectory/iimb/mba',
    'mba-1',
    'Business Administration',
    '<p>Two years of case studies, group projects, and questioning whether this was worth it. Verdict: yes, but not for the reasons I expected.</p>',
    '<p>The value wasn''t the curriculum. It was the cohort — 400 people from different industries, different functions, different countries. Pattern matching across their experiences taught me more than any case study.</p>',
    true, 'artifact', 0
);

INSERT INTO node_education (node_id, title, subtitle, year, sort_order)
SELECT id, 'MBA', 'IIM Bangalore (QS #31)', '2025', 0
FROM nodes WHERE uuid = 'mba-1';

-- NCCU Exchange Taipei
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iimb-path'),
    'NCCU Exchange Taipei',
    'nodes/trajectory/iimb/nccu-exchange',
    'nccu-1',
    'International Exchange',
    '<p>Exchange semester at National Chengchi University, FT MiM Rank #96.</p>',
    '<p>Why Taiwan? Curiosity about East Asian tech ecosystems. How TSMC thinks about manufacturing. How Taiwanese startups approach hardware. A different perspective on building.</p>',
    true, true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Location', 'Taipei, Taiwan', 0
FROM nodes WHERE uuid = 'nccu-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Focus', 'East Asian tech ecosystems, Hardware startups', 1
FROM nodes WHERE uuid = 'nccu-1';
```

---

### Step 7.11: Insert Footnotes (Achievements) Hierarchy

```sql
-- ============================================
-- FOOTNOTES > Achievements
-- ============================================

-- HCL-CA TechJam
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'footnotes-path'),
    'HCL-CA TechJam',
    'nodes/footnotes/techjam',
    'techjam-1',
    'National Tech Competition',
    '<p>Winner, 1 of 8,300 participants. Sydney. USD 3,000 prize. Funded by Cricket Australia and Microsoft.</p>',
    '<p>The lesson: hackathon wins are about scope management as much as technical skill.</p>',
    true, true, 'recognition', 0
);

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'HCL-CA TechJam', 'Winner (1 of 8,300)', '2018', 0
FROM nodes WHERE uuid = 'techjam-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Prize', 'USD 3,000', 0
FROM nodes WHERE uuid = 'techjam-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Location', 'Sydney, Australia', 1
FROM nodes WHERE uuid = 'techjam-1';

-- ITC Interrobang
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'footnotes-path'),
    'ITC Interrobang',
    'nodes/footnotes/interrobang',
    'interrobang-1',
    'Case Competition',
    '<p>Runner-up, 2 of 600+ teams. Season 10. Pre-placement interview offer, ₹74,000 prize.</p>',
    '<p>An ideation challenge that taught me how to pitch. The winning idea wasn''t my best idea — it was my most communicable idea.</p>',
    true, true, 'recognition', 1
);

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'ITC Interrobang', 'Runner-up (2 of 600+)', '2024', 0
FROM nodes WHERE uuid = 'interrobang-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Prize', '₹74,000 + PPI offer', 0
FROM nodes WHERE uuid = 'interrobang-1';

-- GATE & JEE Ranks
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'footnotes-path'),
    'GATE & JEE Ranks',
    'nodes/footnotes/ranks',
    'gatejee-1',
    'Academic Achievements',
    '<p>All India Rank 113, GATE Biomedical Engineering 2020. All India Rank 77 (category), JEE Main Paper 2, 2016.</p>',
    '<p>Test scores. They opened doors. They don''t define capability.</p>',
    true, 'recognition', 2
);

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'GATE Biomedical', 'AIR 113', '2020', 0
FROM nodes WHERE uuid = 'gatejee-1';

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'JEE Main Paper 2', 'AIR 77 (category)', '2016', 1
FROM nodes WHERE uuid = 'gatejee-1';
```

---

### Step 7.12: Verify Data

After running all inserts, verify the data:

```sql
-- Count nodes by type
SELECT type, COUNT(*) as count
FROM nodes 
GROUP BY type
ORDER BY count DESC;

-- View tree structure
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
ORDER BY n.sort_order, n.title;

-- View all cross-links
SELECT 
    s.title as source,
    nc.target_node_uuid as links_to
FROM node_connections nc
JOIN nodes s ON nc.source_node_id = s.id;
```

Expected counts:
- **Total nodes**: ~50
- **Paths**: ~18 (including root as empty type)
- **Artifacts**: ~24
- **Research**: ~5 (Foveated, Haptics, AI Ethics, Thesis)
- **Initiative**: ~2 (Caval, EventHive)
- **Recognition**: ~3 (TechJam, Interrobang, GATE/JEE)
- **Information**: ~1 (Contact & Links)

### Cross-Links Summary (6 total)
| Source | Target |
|--------|--------|
| AI Ethics Framework | Eval Framework |
| Eval Framework | Boundaryless / Enterprise Search |
| Foveated Rendering | XR Prototypes |
| Haptics Research | XR Prototypes |
| Thesis: Photoacoustic Spectroscopy | Spatial & Perception |
| Growth & Mobile App | RAG Pipelines |

### Troubleshooting Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `violates foreign key constraint "nodes_parent_id_fkey"` | Parent node doesn't exist yet | Run steps in order (7.1 → 7.2 → 7.3...) |
| `duplicate key value violates unique constraint "nodes_uuid_key"` | Already inserted this node | Skip this batch or run `DELETE FROM nodes WHERE uuid = 'xxx'` first |
| `new row violates check constraint "nodes_type_check"` | Invalid type value | Use only: `''`, `'information'`, `'path'`, `'artifact'`, `'research'`, `'initiative'`, `'recognition'` |
| `null value in column "title" violates not-null constraint` | Missing required field | Ensure all NOT NULL columns are provided |

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



