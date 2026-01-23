# Portfolio Graph Reference

## Quick Stats

| Metric | Value |
|--------|-------|
| **Total Nodes** | 66 |
| **Featured (visible)** | 60 |
| **Hidden** | 6 |
| **Highlighted (★)** | 17 |
| **Main Branches** | 6 (5 featured + 1 hidden) |
| **Cross-Connections** | 8 |
| **Subsections** | 69 (across 27 nodes) |
| **External Links** | 25 |
| **Metadata Entries** | 53 |
| **Media Files** | 8 |

---

## Database Schema

### Tables Overview

| Table | Rows | Purpose |
|-------|------|---------|
| `nodes` | 66 | Main content nodes (pages/sections) |
| `node_subsections` | 69 | Structured content sections (Context, What I Built, Outcome, etc.) |
| `node_metadata` | 53 | Key-value pairs (Technologies, Impact, etc.) |
| `node_links` | 25 | External URLs (GitHub, LinkedIn, etc.) |
| `node_media` | 8 | Photography images |
| `node_connections` | 8 | Cross-links between non-parent-child nodes |
| `node_education` | 4 | Academic credentials |
| `node_recognition` | 4 | Awards and achievements |
| `subsection_footnotes` | 2 | Footnotes within subsections |
| `node_footnotes` | 0 | Node-level footnotes (unused) |

### Node Types

| Type | Count | Description |
|------|-------|-------------|
| `artifact` | 28 | Concrete projects and deliverables |
| `path` | 21 | Navigation branches and categories |
| `information` | 7 | Contact and meta information |
| `research` | 4 | Academic and research work |
| `recognition` | 3 | Awards and achievements |
| `initiative` | 2 | Entrepreneurial ventures |
| *(empty)* | 1 | Root node only |

### Subsection Types

Content is structured using standardized subsection titles:

| Subsection | Count | Description |
|------------|-------|-------------|
| Context | 27 | Problem statement or background |
| Outcome | 13 | Results and impact (often collapsed by default) |
| What I Built | 12 | Implementation details |
| Findings | 3 | Research discoveries |
| What I Learned | 3 | Lessons and takeaways |
| Architecture | 1 | Technical system design |
| Approach | 1 | Methodology |
| Design Philosophy | 1 | Design principles |
| Courses | 1 | Academic coursework |
| *(others)* | 5 | Specialized sections |

---

## Complete Hierarchy

```
Rudram Piplad (root-0) [root]
│
├── Information (info-path) [path]
│   ├── Education (education-path) [path]
│   │   ├── IIT Madras (iitm-path) [path]
│   │   │   ├── Engineering Design (engdes-1) [artifact]
│   │   │   └── Thesis: Photoacoustic Spectroscopy (thesis-1) [research] ★
│   │   ├── IIM Bangalore (iimb-path) [path]
│   │   │   ├── MBA (mba-1) [artifact]
│   │   │   └── NCCU Exchange Taipei (nccu-1) [artifact] ★
│   │   └── NCCU Taipei (nccu-path) [path]
│   ├── Contact Me (contact-1) [information]
│   ├── Footnotes (footnotes-path) [information] (secondary)
│   │   ├── HCL-CA TechJam (techjam-1) [recognition] ★
│   │   ├── ITC Interrobang (interrobang-1) [recognition] ★
│   │   └── GATE & JEE Ranks (gatejee-1) [recognition]
│   ├── LinkedIn (linkedin-1) [information] ⊘
│   ├── Email (email-1) [information] ⊘
│   ├── Phone (phone-1) [information] ⊘
│   ├── Behance (behance-info-1) [information] ⊘
│   └── Resume (resume-1) [information] ⊘
│
├── AI Systems (ai-path) [path]
│   ├── RAG Pipelines (rag-path) [path]
│   │   ├── GraphRAG (graphrag-1) [artifact] ★
│   │   ├── Document Parsing (docparse-1) [artifact]
│   │   └── Chunking Strategies (chunking-1) [artifact]
│   ├── AI Agents (agents-path) [path]
│   │   ├── Butler Expense Agent (butler-1) [artifact] ★
│   │   └── AI Ethics Framework (ethics-1) [research]
│   └── Safety & Evals (safety-path) [path]
│       ├── Eval Framework (evalframework-1) [artifact] ★
│       └── PII/DLP Guardrails (piidlp-1) [artifact]
│
├── Spatial & Perception (spatial-path) [path]
│   ├── Foveated Rendering & Gaze Tracking (foveat-1) [research] ★
│   ├── Haptics Research (haptics-1) [research]
│   ├── XR Prototypes (xrproto-path) [path]
│   │   ├── AED in VR (aedvr-1) [artifact] ★
│   │   ├── 3D Printing VR (print3d-1) [artifact]
│   │   └── AR Mobile Games (argames-1) [artifact]
│   └── Visual Practice (visual-path) [path]
│       ├── Photography (photo-1) [artifact] ★
│       │   ├── Taipei (taipei-photo-1) [artifact]
│       │   └── Bangalore (bangalore-photo-1) [artifact]
│       └── Graphic Design & Illustrations (graphicdesign-path) [path]
│           ├── NFT Collection (nft-1) [artifact] ★
│           ├── E-Cell Magazine (ecell-1) [artifact]
│           └── Behance Work (behance-1) [artifact]
│
├── Product Work (product-path) [path]
│   ├── ThoughtSpot (ts-path) [path]
│   │   ├── Boundaryless / Enterprise Search (tsboundary-1) [artifact] ★
│   │   ├── Navigation & Discovery (tsnav-1) [artifact]
│   │   ├── Object Search (tsobjsearch-1) [artifact]
│   │   └── Homepage (tshome-1) [artifact]
│   ├── Policybazaar (pb-path) [path]
│   │   ├── Your Orders (orders-1) [artifact] ★
│   │   ├── Web Analytics (webanalytics-1) [artifact]
│   │   └── Growth & Mobile App (growthmobile-1) [artifact]
│   └── Consulting (consulting-path) [path]
│       ├── Tata Group (tata-path) [path]
│       │   ├── MLOps & LLM Intelligence (mlops-1) [artifact] ★
│       │   └── AI Maturity Model (aimaturity-1) [artifact]
│       └── Chisel Labs (chisel-path) [path]
│           └── Global SaaS GTM (gtm-1) [artifact] ★
│
├── Bets (bets-path) [path]
│   ├── Caval (caval-1) [initiative] ★
│   └── EventHive (eventhive-1) [initiative] ★
│
└── Trajectory (trajectory-path) [path] ⊘ — empty placeholder, not featured
```

**Legend:**
- ★ = Highlighted (larger, emphasized in graph)
- ⊘ = Not featured (hidden from graph visualization)
- (secondary) = Dimmed styling

---

## Branch Statistics

| Branch | Nodes | Featured | Highlighted | Max Depth |
|--------|-------|----------|-------------|-----------|
| Information | 19 | Yes | 4 | 4 levels |
| Product Work | 16 | Yes | 5 | 4 levels |
| Spatial & Perception | 15 | Yes | 4 | 5 levels |
| AI Systems | 11 | Yes | 4 | 3 levels |
| Bets | 3 | Yes | 2 | 2 levels |
| Trajectory | 1 | **No** | 0 | 1 level |

**Total:** 65 branch nodes + 1 root = 66

---

## Cross-Node Connections (8)

These create dotted lines between non-parent-child nodes:

| Source | Target | Relationship |
|--------|--------|--------------|
| AI Ethics Framework → | Eval Framework | Ethics connects to practical evals |
| Eval Framework → | Boundaryless | Evals used in enterprise search |
| Foveated Rendering → | XR Prototypes | Research informs prototypes |
| Haptics Research → | XR Prototypes | Research informs prototypes |
| **Haptics Research →** | **AED in VR** | **Haptics used in AED training** (NEW) |
| Growth & Mobile App → | RAG Pipelines | NLP work connects to RAG |
| Thesis → | Spatial & Perception | Academic research connects to perception |
| XR Prototypes → | Foveated Rendering | Prototypes connect back to research |

---

## Highlighted Nodes (17)

| Node | UUID | Type | Branch |
|------|------|------|--------|
| AED in VR | aedvr-1 | artifact | Spatial/XR |
| Boundaryless / Enterprise Search | tsboundary-1 | artifact | Product/ThoughtSpot |
| Butler Expense Agent | butler-1 | artifact | AI/Agents |
| Caval | caval-1 | initiative | Bets |
| Eval Framework | evalframework-1 | artifact | AI/Safety |
| EventHive | eventhive-1 | initiative | Bets |
| Foveated Rendering & Gaze Tracking | foveat-1 | research | Spatial |
| Global SaaS GTM | gtm-1 | artifact | Product/Consulting |
| GraphRAG | graphrag-1 | artifact | AI/RAG |
| HCL-CA TechJam | techjam-1 | recognition | Info/Footnotes |
| ITC Interrobang | interrobang-1 | recognition | Info/Footnotes |
| MLOps & LLM Intelligence | mlops-1 | artifact | Product/Consulting |
| NCCU Exchange Taipei | nccu-1 | artifact | Info/Education |
| NFT Collection | nft-1 | artifact | Spatial/Visual |
| Photography | photo-1 | artifact | Spatial/Visual |
| Thesis: Photoacoustic Spectroscopy | thesis-1 | research | Info/Education |
| Your Orders | orders-1 | artifact | Product/Policybazaar |

---

## Hidden Nodes (6)

| Node | UUID | Parent | Reason |
|------|------|--------|--------|
| Trajectory | trajectory-path | Root | Empty placeholder branch |
| LinkedIn | linkedin-1 | Information | Accessible via Contact links |
| Email | email-1 | Information | Accessible via Contact links |
| Phone | phone-1 | Information | Accessible via Contact links |
| Behance | behance-info-1 | Information | Accessible via Contact links |
| Resume | resume-1 | Information | Direct download link |

---

## Subsections by Node

27 nodes have structured subsections (69 total):

### Full Subsection Inventory

| Node | Count | Subsections |
|------|-------|-------------|
| AI Ethics Framework | 4 | Context, Who It's For, Architecture, Design Philosophy† |
| Butler Expense Agent | 4 | Context, What I Built, Design Challenge†, Competitive Landscape† |
| AED in VR | 3 | Context, What I Built, Outcome† |
| Boundaryless | 3 | Context, What I Owned, Constraints & Results† |
| Foveated Rendering | 3 | Context, Approach, Findings |
| Global SaaS GTM | 3 | Context, What I Built, Outcome† |
| GraphRAG | 3 | Context, What I Built, Outcome† |
| Growth & Mobile App | 3 | Context, What I Built, Outcome† |
| Haptics Research | 3 | Context, What I Built, Findings |
| Navigation & Discovery | 3 | Context, What I Built, Outcome† |
| NCCU Exchange Taipei | 3 | Context, What I Learned, Courses† |
| PII/DLP Guardrails | 3 | Context, What I'm Building, Outcome† |
| Thesis | 3 | Context, Abstract, What I Learned† |
| Web Analytics | 3 | Context, What I Built, Outcome† |
| Your Orders | 3 | Context, What I Built, Outcome† |
| 3D Printing VR | 2 | Context, Findings |
| AI Maturity Model | 2 | Context, Outcome† |
| AR Mobile Games | 2 | Context, Outcome† |
| Chunking Strategies | 2 | Context, What I Built |
| Document Parsing | 2 | Context, What I Built |
| E-Cell Magazine | 2 | Context, Outcome† |
| Eval Framework | 2 | Context, Outcome† |
| Homepage | 2 | Context, What I Built |
| MLOps & LLM Intelligence | 2 | Context, Outcome† |
| NFT Collection | 2 | Context, What I Learned† |
| Behance Work | 1 | Context |
| Object Search | 1 | Context |

**† = Collapsed by default** (20 subsections across 18 nodes)

---

## External Links (25)

### GitHub Repositories

| Project | URL |
|---------|-----|
| GraphRAG | github.com/roseate8/graph-rag-trials |
| Butler Expense Agent | github.com/roseate8/butler-travel-expense-agent |
| Expense Agent UI | github.com/roseate8/expense-agents-ui-lovable |
| AI Ethics | github.com/roseate8/applied-ai-ethics |
| Document Parser | github.com/roseate8/document-parser-for-rag |
| Doc Parsers | github.com/roseate8/doc-parsers |
| Chunking Experiments | github.com/roseate8/chunking-strategy-experiments |
| Foveated Rendering | github.com/roseate8/foveated-rendering-virtual-reality |
| AED VR | github.com/roseate8/automated-external-defibrillator-in-vr |
| 3D Printing VR | github.com/roseate8/3d-printing-in-vr |

### Social & Professional

| Platform | URL |
|----------|-----|
| LinkedIn | linkedin.com/in/rudram-piplad |
| GitHub | github.com/roseate8 |
| Behance | behance.net/rudrampiplad |
| Medium | roseate134.medium.com |
| OpenSea | opensea.io/rudrampiplad |
| Email | rudram@alumni.iitm.ac.in |

---

## Media Assets

All stored in Supabase Storage bucket: `portfolio-media`

### Photography

**Taipei (5 images):**
- PB020359.jpg — Taipei cityscape
- PB050292.jpg — Taipei street photography
- PB050294.jpg — Taipei urban landscape
- PB271469.jpg — Taipei architecture
- PB271470-2.jpg — Taipei night scene

**Bangalore (3 images):**
- _C050177.jpg — Bangalore landscape
- _C050179-2.jpg — Bangalore cityscape
- _C050200.jpg — Bangalore urban scene

### Documents
- Resume: `resume/rudram-piplad-resume.pdf`

---

## Metadata Distribution

53 metadata entries across nodes. Top categories:

| Metadata Type | Examples |
|---------------|----------|
| **Platform/Stack** | Unity, LangGraph, GPT-4, Neo4j, HTC Vive |
| **Impact/Results** | ₹10M saved, 57% GPU reduction, +170% engagement |
| **Role** | Product Manager, Chief Designer, Co-founder |
| **Constraints** | <$0.004/query, >0.7 nDCG@5 |
| **Recognition** | USD 3,000 prize, AIR 113 |

### Linked Metadata

The `linked_node_uuid` field in `node_metadata` is available for internal navigation but:
- **Database:** 2 entries have links (IIM Bangalore → iimb-path, IIT Madras → iitm-path)
- **Frontend:** Currently only passes `title` and `subtitle`; `linked_node_uuid` is **not implemented** in the transform

| From Node | Metadata | DB Links To | Frontend Status |
|-----------|----------|-------------|-----------------|
| Education | IIM Bangalore | iimb-path | ⚠️ Not rendered |
| Education | IIT Madras | iitm-path | ⚠️ Not rendered |

> **Note:** To enable clickable metadata links, update `backend/supabase.js` line 337 to include `linkedNodeUuid: meta.linked_node_uuid`

---

## Education & Recognition

### Education Entries (4)

| Degree | Institution | Year | Node |
|--------|-------------|------|------|
| BTech + MTech | IIT Madras | 2016-2021 | Info, Engineering Design |
| MBA | IIM Bangalore (QS #31) | 2023-2025 | Info, MBA |

### Recognition Entries (4)

| Award | Result | Year |
|-------|--------|------|
| HCL-CA TechJam | Winner (1 of 8,300) | 2018 |
| ITC Interrobang | Runner-up (2 of 600+) | 2024 |
| GATE Biomedical | AIR 113 | 2020 |
| JEE Main Paper 2 | AIR 77 (category) | 2016 |

---

## Subsection Footnotes (2)

The Butler Expense Agent has inline footnotes explaining technical terms:

1. **MCP (Model Context Protocol):** Connectors enable agents to access external data sources like calendars, emails, and corporate systems in real-time.

2. **Agentic RAG:** Combines retrieval-augmented generation with autonomous agent decision-making, allowing the system to validate expenses against policy documents dynamically.

---

## Technical Configuration

### Supabase Project

| Setting | Value |
|---------|-------|
| Project ID | eeuvtdgwdjerdsumowmx |
| Region | ap-southeast-1 (Singapore) |
| Database | PostgreSQL 17.6 |
| Status | ACTIVE_HEALTHY |

### Storage

- **Bucket:** portfolio-media
- **Base URL:** https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/

### Row Level Security

All tables have RLS enabled:
- **Read:** Public (anonymous) access allowed
- **Write:** Requires authentication

---

## Implementation Architecture

### Data Flow

```
Supabase DB → backend/supabase.js → Data.js → Map.js / Page.js
                                  ↓
                        portfolio.json (fallback)
```

### Key Files

| File | Purpose |
|------|---------|
| `backend/supabase.js` | Fetches all 10 tables in parallel, transforms to frontend format |
| `assets/js/utils/Data.js` | Data layer abstraction, handles Supabase/JSON fallback |
| `assets/js/components/Map.js` | D3.js graph visualization, renders nodes and connections |
| `assets/js/components/Page.js` | Page content rendering, tabs, subsections |

### Tree Building Logic

Located in `backend/supabase.js`:

1. Fetch all nodes and related data in parallel
2. Group related data by `node_id` using maps
3. Transform each node with all related data attached
4. Build tree: **only nodes with `is_featured = true` are added as children**
5. Remove internal `_id` and `_parentId` fields

### Subsection Rendering

Located in `assets/js/components/Page.js` (line ~990):

- Subsections render as collapsible tabs
- `isCollapsedByDefault` controls initial state
- Footnotes render as numbered list below content
- Uses `tab-open` class for expanded state

### Media URL Generation

`backend/supabase.js` function `getStorageUrl()`:

```javascript
// If path is relative, generates full Supabase Storage URL
// Format: {SUPABASE_URL}/storage/v1/object/public/portfolio-media/{path}
```

---

## URI Structure Notes

URIs don't always match parent hierarchy:

| Node | URI | Actual Parent |
|------|-----|---------------|
| IIT Madras | /nodes/trajectory/iitm | Education |
| IIM Bangalore | /nodes/trajectory/iimb | Education |
| Photography locations | /nodes/photography/... | Photography |

This allows semantic URLs while maintaining graph structure.

---

## Verification Checklist

Use these queries to verify data integrity:

```sql
-- Check node counts by type
SELECT type, COUNT(*) FROM nodes GROUP BY type;

-- Verify all featured nodes have parents (except root)
SELECT n.uuid, n.title FROM nodes n 
WHERE n.is_featured = true AND n.parent_id IS NULL AND n.uuid != 'root-0';

-- Find orphan subsections
SELECT ns.* FROM node_subsections ns 
LEFT JOIN nodes n ON ns.node_id = n.id WHERE n.id IS NULL;

-- Check connections point to valid UUIDs
SELECT nc.target_node_uuid FROM node_connections nc
LEFT JOIN nodes n ON nc.target_node_uuid = n.uuid WHERE n.id IS NULL;
```

---

## Known Implementation Notes

### Metadata linked_node_uuid Not Rendered

The `linked_node_uuid` field exists in `node_metadata` (2 entries for Education → IIM/IIT navigation) but is **not passed to the frontend**. The transform in `supabase.js` only extracts `title` and `subtitle`.

### Education linkUri Works

The `link_uri` field in `node_education` IS properly transformed and rendered in `Page.js` as clickable links.

### Tree Filtering

Only nodes with `is_featured = true` are included in the rendered tree. Hidden nodes still exist in the database for direct URL access.

### Subsection Collapse Logic

```javascript
// Page.js line ~994
${openAllTabs && !sub.isCollapsedByDefault ? 'tab-open' : ''}
```

The tab is open only if BOTH conditions are true:
1. `openAllTabs` is enabled (user preference)
2. `isCollapsedByDefault` is false

---

## Key Changes Log

### As of January 23, 2026

1. **New table: `node_subsections`** — 69 structured content sections across 27 nodes
2. **New table: `subsection_footnotes`** — 2 inline explanatory footnotes (Butler Agent)
3. **Metadata count increased** — 46 → 53 entries (+7)
4. **New cross-connection** — Haptics Research → AED in VR (8 total now)
5. **Footnotes node type** — `information` (was mistyped as `path` in old doc)
6. **Content structure** — Standardized subsection titles: Context, What I Built, Outcome
7. **Collapsed defaults** — 20 subsections marked as collapsed by default

### Database Verified Counts

| Table | Count |
|-------|-------|
| nodes | 66 |
| node_subsections | 69 |
| node_metadata | 53 |
| node_links | 25 |
| node_connections | 8 |
| node_media | 8 |
| node_education | 4 |
| node_recognition | 4 |
| subsection_footnotes | 2 |
| node_footnotes | 0 |

---

*This document was generated from live Supabase queries via MCP on January 23, 2026. For real-time accuracy, query the database directly using the Supabase MCP tools.*
