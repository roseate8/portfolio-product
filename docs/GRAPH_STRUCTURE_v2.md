# Portfolio Graph Structure Reference

> **Data Source:** Supabase Database (`eeuvtdgwdjerdsumowmx.supabase.co`)  
> **Generated:** January 23, 2026  
> **Verified:** Live MCP queries to production database

---

## Quick Stats

| Metric | Count |
|--------|-------|
| **Total Nodes** | 61 |
| **Featured (visible in graph)** | 55 |
| **Hidden (not in graph)** | 6 |
| **Highlighted (★)** | 15 |
| **Main Branches** | 6 (5 featured + 1 hidden) |
| **Cross-Connections** | 8 |
| **Subsections** | 67 (across 27 nodes) |
| **External Links** | 25 |
| **Metadata Entries** | 50 |
| **Media Files** | 8 |
| **Node Footnotes** | 4 |
| **Subsection Footnotes** | 2 |

---

## Database Schema

### Tables Overview

| Table | Rows | Purpose |
|-------|------|---------|
| `nodes` | 61 | Main content nodes (pages/sections) |
| `node_subsections` | 67 | Structured content sections (Context, What I Built, Outcome, etc.) |
| `node_metadata` | 50 | Key-value pairs (Technologies, Impact, etc.) |
| `node_links` | 25 | External URLs (GitHub, LinkedIn, etc.) |
| `node_media` | 8 | Photography images |
| `node_connections` | 8 | Cross-links between non-parent-child nodes |
| `node_footnotes` | 4 | Citation footnotes for ranking claims |
| `node_education` | 3 | Academic credentials |
| `subsection_footnotes` | 2 | Footnotes within subsections |
| `node_recognition` | 0 | Awards (currently empty) |

### Node Types

| Type | Count | Description |
|------|-------|-------------|
| `artifact` | 27 | Concrete projects and deliverables |
| `path` | 20 | Navigation branches and categories |
| `information` | 7 | Contact and meta information |
| `research` | 4 | Academic and research work |
| `initiative` | 2 | Entrepreneurial ventures |
| *(empty)* | 1 | Root node only |

### Subsection Types

Content is structured using standardized subsection titles:

| Subsection | Count | Description |
|------------|-------|-------------|
| Context | 26 | Problem statement or background |
| Outcome | 13 | Results and impact |
| What I Built | 12 | Implementation details |
| Findings | 3 | Research discoveries |
| What I Learned | 3 | Lessons and takeaways |
| Architecture | 1 | Technical system design |
| Abstract | 1 | Academic summary |
| Approach | 1 | Methodology |
| Competitive Landscape | 1 | Market analysis |
| Constraints & Results | 1 | Performance metrics |
| Design Challenge | 1 | Core problem |
| Design Philosophy | 1 | Design principles |
| What I Owned | 1 | Ownership scope |
| What I'm Building | 1 | Work in progress |
| Who It's For | 1 | Target audience |

**Collapsed by Default:** 19 subsections (typically "Outcome" sections)

---

## Complete Hierarchy

```
Rudram Piplad (root-0) [root]
│
├── Information (info-path) [path]
│   ├── Education (education-path) [path] — has 2 footnotes
│   │   ├── IIT Madras (iitm-path) [path]
│   │   │   ├── Engineering Design (engdes-1) [artifact]
│   │   │   └── Thesis: Photoacoustic Spectroscopy (thesis-1) [research] ★
│   │   └── IIM Bangalore (iimb-path) [path] — has 1 footnote
│   │       └── NCCU Exchange Taipei (nccu-1) [artifact] ★ — has 1 footnote
│   ├── Contact Me (contact-1) [information]
│   ├── Footnotes (footnotes-path) [information] (secondary) — empty
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
│   │   ├── Butler Expense Agent (butler-1) [artifact] ★ — has 2 subsection footnotes
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
| Product Work | 16 | Yes | 5 | 4 levels |
| Spatial & Perception | 15 | Yes | 4 | 5 levels |
| Information | 14 | Yes | 2 | 4 levels |
| AI Systems | 11 | Yes | 4 | 3 levels |
| Bets | 3 | Yes | 2 | 2 levels |
| Trajectory | 1 | **No** | 0 | 1 level |

**Total:** 60 branch nodes + 1 root = 61

---

## Footnotes

### Node-Level Footnotes (4)

These are citation footnotes attached directly to nodes for ranking claims:

| Node | Footnote |
|------|----------|
| **Education** | IIT Madras has secured the #1 position in the NIRF 2025 overall category for the seventh consecutive year, topping the Engineering category for the 10th year, and ranking #1 in Innovation and SDG categories. Internationally, it jumped to #180 in QS World University Rankings 2026. |
| **Education** | IIM Bangalore ranks #2 in NIRF 2025 Management, #1 in India for PGP, PGPBA, and EPGP in QS World University Rankings 2026, #47 globally in FT Global MBA 2024, and #2 in Outlook 2025 government MBA colleges. |
| **IIM Bangalore** | QS World University Rankings 2024. IIM Bangalore ranked #31 globally for MBA programs. |
| **NCCU Exchange Taipei** | Financial Times Masters in Management (MiM) Global Ranking 2023. NCCU College of Commerce ranked #96 worldwide for its Master in Management programs. |

### Subsection Footnotes (2)

These are inline explanatory footnotes within specific subsections:

| Node | Subsection | Footnote |
|------|------------|----------|
| **Butler Expense Agent** | What I Built | MCP (Model Context Protocol) connectors enable agents to access external data sources like calendars, emails, and corporate systems in real-time. |
| **Butler Expense Agent** | What I Built | Agentic RAG combines retrieval-augmented generation with autonomous agent decision-making, allowing the system to validate expenses against policy documents dynamically. |

---

## Cross-Node Connections (8)

These create dotted lines between non-parent-child nodes in the graph:

| Source | Target | Relationship |
|--------|--------|--------------|
| AI Ethics Framework → | Eval Framework | Ethics connects to practical evals |
| Eval Framework → | Boundaryless | Evals used in enterprise search |
| Foveated Rendering → | XR Prototypes | Research informs prototypes |
| Haptics Research → | XR Prototypes | Research informs prototypes |
| Haptics Research → | AED in VR | Haptics used in AED training |
| Growth & Mobile App → | RAG Pipelines | NLP work connects to RAG |
| Thesis → | Spatial & Perception | Academic research connects to perception |
| XR Prototypes → | Foveated Rendering | Prototypes connect back to research |

---

## Highlighted Nodes (15)

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

27 nodes have structured subsections (67 total):

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
| NCCU Exchange Taipei | 1 | What I Learned |
| Object Search | 1 | Context |

**† = Collapsed by default** (19 subsections total)

---

## External Links (25)

### GitHub Repositories (10)

| Project | URL |
|---------|-----|
| 3D Printing VR | github.com/roseate8/3d-printing-in-vr |
| AED VR | github.com/roseate8/automated-external-defibrillator-in-vr |
| AI Ethics | github.com/roseate8/applied-ai-ethics |
| Butler Expense Agent | github.com/roseate8/butler-travel-expense-agent |
| Expense Agent UI | github.com/roseate8/expense-agents-ui-lovable |
| Chunking Experiments | github.com/roseate8/chunking-strategy-experiments |
| Document Parser | github.com/roseate8/document-parser-for-rag |
| Doc Parsers | github.com/roseate8/doc-parsers |
| Foveated Rendering | github.com/roseate8/foveated-rendering-virtual-reality |
| GraphRAG | github.com/roseate8/graph-rag-trials |

### Social & Professional (6)

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

### Photography (8 images)

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

## Metadata Distribution (50 entries)

| Metadata Type | Examples |
|---------------|----------|
| **Platform/Stack** | Unity, LangGraph, GPT-4, Neo4j, HTC Vive, ARCore |
| **Impact/Results** | ₹10M saved, 57% GPU reduction, +170% engagement |
| **Role** | Product Manager, Chief Designer, Co-founder |
| **Constraints** | <$0.004/query, >0.7 nDCG@5 |
| **Metrics** | nDCG@5, Recall@10, Latency p95 |

### Linked Metadata (Navigation)

2 metadata entries link to other nodes:

| From Node | Metadata | Links To |
|-----------|----------|----------|
| Education | IIM Bangalore | iimb-path |
| Education | IIT Madras | iitm-path |

> **Implementation Note:** `linked_node_uuid` is stored in database but NOT passed to frontend. Only `title` and `subtitle` are rendered.

---

## Education Entries (3)

| Degree | Institution | Year | Node |
|--------|-------------|------|------|
| BTech + MTech | IIT Madras (Biomedical) | 2016-2021 | Information |
| MBA | IIM Bangalore | 2023-2025 | Information |
| B.Tech Engineering Design | IIT Madras | 2019 | Engineering Design |

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

1. Fetch all nodes and related data in parallel (10 tables)
2. Group related data by `node_id` using maps
3. Transform each node with all related data attached
4. Build tree: **only nodes with `is_featured = true` are added as children**
5. Remove internal `_id` and `_parentId` fields

### Footnote Rendering

**Node Footnotes** (Page.js lines 956-963):
- Rendered as numbered list (`<ul class="footnotes">`) below description
- Each footnote: `<li class="footnote">` with `footnote-id` and `footnote-content` spans
- Condition: Only shown if `pageData.footnotes.length > 0`

**Subsection Footnotes** (Page.js lines 1002-1010):
- Rendered as numbered list (`<ul class="footnotes subsection-footnotes">`) inside tab content
- Below the `<div class="subsection-content">` 
- Each footnote: Same structure as node footnotes
- Condition: Only shown if `sub.footnotes.length > 0`

**Data Transform** (supabase.js lines 365-381):
- Node footnotes: `footnotesMap[nodeId]` → `{footnote: fn.footnote}`
- Subsection footnotes: `subsectionFootnotesMap[sub.id]` → array of strings

### Subsection Collapse Logic

```javascript
// Page.js line ~994
${openAllTabs && !sub.isCollapsedByDefault ? 'tab-open' : ''}
```

Tab is open only if BOTH:
1. `openAllTabs` is enabled (user preference)
2. `isCollapsedByDefault` is false

---

## Verification Queries

```sql
-- Check node counts by type
SELECT type, COUNT(*) FROM nodes GROUP BY type;

-- Verify all featured nodes have parents (except root)
SELECT n.uuid, n.title FROM nodes n 
WHERE n.is_featured = true AND n.parent_id IS NULL AND n.uuid != 'root-0';

-- Find orphan subsections
SELECT ns.* FROM node_subsections ns 
LEFT JOIN nodes n ON ns.node_id = n.id WHERE n.id IS NULL;

-- Check all footnotes
SELECT * FROM node_footnotes ORDER BY node_id;
SELECT * FROM subsection_footnotes ORDER BY subsection_id;

-- Verify connections point to valid UUIDs
SELECT nc.target_node_uuid FROM node_connections nc
LEFT JOIN nodes n ON nc.target_node_uuid = n.uuid WHERE n.id IS NULL;
```

---

## Changes Since Previous Version

| Item | Previous | Current | Change |
|------|----------|---------|--------|
| Total Nodes | 66 | 61 | -5 |
| Featured | 60 | 55 | -5 |
| Highlighted | 17 | 15 | -2 |
| Metadata | 53 | 50 | -3 |
| Education | 4 | 3 | -1 |
| Recognition | 4 | 0 | -4 (deleted) |
| Subsections | 69 | 67 | -2 |
| **Node Footnotes** | 0 | **4** | **+4 (NEW!)** |

### Deleted Nodes
- `mba-1` (MBA) — removed from IIM Bangalore
- `nccu-path` (NCCU Taipei path) — removed
- `techjam-1` (HCL-CA TechJam) — recognition deleted
- `interrobang-1` (ITC Interrobang) — recognition deleted
- `gatejee-1` (GATE & JEE Ranks) — recognition deleted

### Added Features
- **Node footnotes:** 4 citation footnotes for academic ranking claims
- Education node: 2 footnotes (IIT Madras NIRF, IIM Bangalore ranking)
- IIM Bangalore node: 1 footnote (QS World ranking)
- NCCU Exchange Taipei: 1 footnote (FT MiM ranking)

---

## Database Verified Counts

| Table | Count |
|-------|-------|
| nodes | 61 |
| node_subsections | 67 |
| node_metadata | 50 |
| node_links | 25 |
| node_connections | 8 |
| node_media | 8 |
| node_footnotes | 4 |
| node_education | 3 |
| subsection_footnotes | 2 |
| node_recognition | 0 |

---

*This document was generated from live Supabase queries via MCP on January 23, 2026. For real-time accuracy, query the database directly using the Supabase MCP tools.*
