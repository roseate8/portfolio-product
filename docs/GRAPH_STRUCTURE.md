# Portfolio Graph Structure Documentation

> **Data Source:** Supabase Database (fetched directly from `eeuvtdgwdjerdsumowmx.supabase.co`)  
> **Last Updated:** January 23, 2026  
> **Total Nodes:** 66  
> **Total Connections:** 7 cross-links  

---

## Table of Contents

1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Node Types](#node-types)
4. [Complete Graph Structure](#complete-graph-structure)
5. [Detailed Node Content](#detailed-node-content)
6. [Cross-Node Connections](#cross-node-connections)
7. [Media Assets](#media-assets)
8. [External Links](#external-links)
9. [Site Map Visualization](#site-map-visualization)

---

## Overview

This portfolio is built as an **interactive graph** rather than a traditional linear website. Users explore content by navigating nodes in a force-directed graph visualization. The graph is designed to be explored non-linearly—start anywhere, everything connects eventually.

### Key Statistics

| Metric | Count |
|--------|-------|
| Total Nodes | 66 |
| Featured Nodes (visible in graph) | 60 |
| Not Featured (hidden) | 6 |
| Highlighted Nodes (emphasized) | 17 |
| Main Branches (Level 1) | 6 (5 featured + 1 hidden) |
| Cross-node Connections | 7 |
| External Links | 25 |
| Media Items | 8 |
| Education Entries | 4 |
| Recognition/Awards | 4 |
| Metadata Entries | 46 |

### Node Type Distribution

| Type | Count | Description |
|------|-------|-------------|
| artifact | 28 | Concrete deliverables and projects |
| path | 22 | Branch/category nodes for navigation |
| information | 6 | Contact and meta information |
| research | 4 | Academic and research work |
| recognition | 3 | Awards and achievements |
| initiative | 2 | Entrepreneurial ventures |
| (root) | 1 | Root node with empty type |

### Hierarchy Depth Analysis

| Level | Nodes | Description |
|-------|-------|-------------|
| 0 | 1 | Root node (Rudram Piplad) |
| 1 | 6 | Main branches |
| 2 | 20 | Sub-branches and direct children |
| 3 | 27 | Project/artifact level |
| 4 | 12 | Deepest nodes (photography locations, etc.) |

---

## Database Architecture

### Supabase Tables

The portfolio data is stored across 8 tables in Supabase:

| Table | Purpose | Count |
|-------|---------|-------|
| `nodes` | Main content nodes (pages/sections) | 66 |
| `node_links` | External URLs and links | 25 |
| `node_metadata` | Key-value metadata pairs | 46 |
| `node_media` | Images and videos | 8 |
| `node_education` | Academic credentials | 4 |
| `node_recognition` | Awards and achievements | 4 |
| `node_connections` | Cross-links between nodes | 7 |
| `node_footnotes` | Additional notes | 0 |

### Node Schema

Each node contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `parent_id` | UUID | Reference to parent node (null for root) |
| `title` | text | Display title |
| `uri` | text | URL path (unique) |
| `uuid` | text | Human-readable unique identifier (unique) |
| `summary` | text | Short tagline/subtitle |
| `type` | text | Node type: `path`, `artifact`, `research`, `initiative`, `recognition`, `information`, or empty |
| `role` | text | Job title (for profile nodes) |
| `email` | text | Contact email |
| `telephone` | text | Contact phone |
| `overview` | text | Brief overview text |
| `description` | text | Main HTML content |
| `extended_description` | text | Additional expandable content |
| `origin_date` | date | When work/project started |
| `end_date` | date | When work/project ended |
| `expiration_date` | date | Content expiration (for time-sensitive content) |
| `last_updated` | date | Last content update |
| `is_featured` | boolean | Whether visible in graph (default: false) |
| `is_highlighted` | boolean | Special emphasis/larger size (default: false) |
| `is_secondary` | boolean | Dimmed styling (default: false) |
| `sort_order` | integer | Display ordering among siblings |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record update time |

### Related Tables Schema

#### node_metadata
Key-value pairs for structured data display (technologies, metrics, etc.):

| Field | Description |
|-------|-------------|
| `node_id` | Reference to parent node |
| `title` | Label (e.g., "Technologies", "Impact") |
| `subtitle` | Value (e.g., "Neo4j, LangChain", "₹10M saved") |
| `linked_node_uuid` | Optional: creates a clickable link to another node |
| `sort_order` | Display ordering |

> **Linked Metadata Feature:** When `linked_node_uuid` is set, the metadata item becomes a navigation link. Used in the Education node to link to IIT Madras and IIM Bangalore paths.

#### node_links
External URLs attached to nodes:

| Field | Description |
|-------|-------------|
| `node_id` | Reference to parent node |
| `title` | Link text (e.g., "GitHub", "LinkedIn") |
| `url` | Full URL |
| `sort_order` | Display ordering |

#### node_education
Academic credentials with optional navigation:

| Field | Description |
|-------|-------------|
| `node_id` | Reference to parent node |
| `title` | Institution/degree name |
| `subtitle` | Department/program |
| `year` | Year or date range |
| `degree` | Degree type (MBA, BTech, etc.) |
| `link_uri` | Optional: internal navigation path |

#### node_recognition
Awards and achievements:

| Field | Description |
|-------|-------------|
| `node_id` | Reference to parent node |
| `title` | Award name |
| `subtitle` | Result/position |
| `year` | Year achieved |

#### node_media
Images and media files:

| Field | Description |
|-------|-------------|
| `node_id` | Reference to parent node |
| `file_path` | Path in Supabase Storage |
| `alt_text` | Accessibility text |
| `media_type` | `image` or `photo` |
| `caption` | Optional caption |
| `external_link` | Optional clickable URL |
| `sort_order` | Display ordering |

#### node_connections
Cross-links between non-parent-child nodes (dotted lines in graph):

| Field | Description |
|-------|-------------|
| `source_node_id` | UUID of source node |
| `target_node_uuid` | Human-readable UUID of target node |

### Data Flow Architecture

```
                    ┌─────────────────────┐
                    │   Supabase Database │
                    │  (PostgreSQL + RLS) │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Supabase REST API │
                    │ /rest/v1/nodes?...  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌──────────┐     ┌──────────┐     ┌──────────┐
       │  Map.js  │     │  Page.js │     │ Router.js│
       │  (Graph) │     │ (Content)│     │  (Nav)   │
       └──────────┘     └──────────┘     └──────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Data.js (Cache)   │
                    │   Transforms data   │
                    └─────────────────────┘
```

- **RLS (Row Level Security):** Enabled on all tables for public read access
- **Caching:** Data.js caches fetched data to minimize API calls
- **Real-time:** Not currently used, but Supabase Realtime is available

### URL Structure

The `uri` field defines the URL path for each node. The structure follows a hierarchical pattern:

```
/                                          → Root (Rudram Piplad)
nodes/information                          → Information branch
nodes/information/education                → Education section
nodes/trajectory/iitm                      → IIT Madras (note: semantic path)
nodes/ai-systems                           → AI Systems branch
nodes/ai-systems/rag-pipelines/graphrag    → Specific project
nodes/industry-work/thoughtspot            → ThoughtSpot company
nodes/photography/taipei                   → Photography collection
```

> **URI vs Hierarchy Note:** Some URIs don't match the parent hierarchy. For example:
> - IIT Madras has URI `/nodes/trajectory/iitm` but parent is `education-path` (under Information)
> - Photography locations have URI `/nodes/photography/...` but parent is `photo-1` (under Spatial/Visual)
> 
> This allows for cleaner, more semantic URLs while maintaining the graph structure for navigation.

---

## Node Types

The graph uses 6 distinct node types, each with different visual styling:

| Type | Icon | Description | Example |
|------|------|-------------|---------|
| **path** | Numbered circle | Branch/category nodes | AI Systems, Product Work |
| **artifact** | Solid node | Concrete deliverables/projects | GraphRAG, Butler Agent |
| **research** | Research icon | Academic/research work | Foveated Rendering, Thesis |
| **initiative** | Initiative icon | Entrepreneurial ventures | Caval, EventHive |
| **recognition** | Recognition icon | Awards and achievements | HCL-CA TechJam |
| **information** | Info icon | Contact/meta information | Contact Me, Email |

---

## Complete Graph Structure

### Root Node

```
Rudram Piplad (uuid: root-0)
├── Role: Product Manager
├── Email: rudram@alumni.iitm.ac.in
├── Summary: "Product & AI Builder"
└── Description: "I build products that involve AI, and I think a lot 
    about why most AI products feel broken..."
```

### Level 1 Branches (Main Categories)

The root node has **6 direct children** (5 featured, 1 hidden):

```
root-0 (Rudram Piplad)
│
├── 1. Information (info-path) — "About & Contact" [sort: 0]
│
├── 2. AI Systems (ai-path) — "Building Intelligent Systems" [sort: 1]
│
├── 3. Spatial & Perception (spatial-path) — "XR & Human Perception Research" [sort: 2]
│
├── 4. Product Work (product-path) — "Professional Experience" [sort: 3]
│
├── 5. Bets (bets-path) — "Entrepreneurial Ventures" [sort: 5]
│
└── 6. Trajectory (trajectory-path) — "Education & Journey" [sort: 7] ⊘ NOT FEATURED
```

> **Note:** The Trajectory branch exists in the database but is NOT featured (`is_featured: false`) and has **no children**. It appears to be a placeholder or legacy structure. The education-related nodes (IIT Madras, IIM Bangalore, NCCU Taipei) are actually children of the **Education** node under Information—they just use `/trajectory/` in their URIs for semantic URL structure.

### Complete Hierarchy Tree

```
ROOT: Rudram Piplad (root-0)
│
├── INFORMATION (info-path) [path]
│   ├── Education (education-path) [path]
│   │   ├── IIT Madras (iitm-path) [path]
│   │   │   ├── Engineering Design (engdes-1) [artifact]
│   │   │   └── Thesis: Photoacoustic Spectroscopy (thesis-1) [research] ★
│   │   ├── IIM Bangalore (iimb-path) [path]
│   │   │   ├── MBA (mba-1) [artifact]
│   │   │   └── NCCU Exchange Taipei (nccu-1) [artifact] ★
│   │   └── NCCU Taipei (nccu-path) [path]
│   ├── Contact Me (contact-1) [information]
│   ├── Footnotes (footnotes-path) [path] (secondary)
│   │   ├── HCL-CA TechJam (techjam-1) [recognition] ★
│   │   ├── ITC Interrobang (interrobang-1) [recognition] ★
│   │   └── GATE & JEE Ranks (gatejee-1) [recognition]
│   ├── LinkedIn (linkedin-1) [information] (not featured)
│   ├── Email (email-1) [information] (not featured)
│   ├── Phone (phone-1) [information] (not featured)
│   ├── Behance (behance-info-1) [information] (not featured)
│   └── Resume (resume-1) [information] (not featured)
│
├── AI SYSTEMS (ai-path) [path]
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
├── SPATIAL & PERCEPTION (spatial-path) [path]
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
├── PRODUCT WORK (product-path) [path]
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
├── BETS (bets-path) [path]
│   ├── Caval (caval-1) [initiative] ★
│   └── EventHive (eventhive-1) [initiative] ★
│
└── TRAJECTORY (trajectory-path) [path] ⊘ NOT FEATURED — empty branch, no children

Legend:
★ = Highlighted node (emphasized in UI)
⊘ = Not featured (hidden from graph but exists in database)
[type] = Node type
(not featured) = Hidden from graph, accessible via links
(secondary) = Dimmed styling
```

> **URI vs Parent Structure Note:** 
> The education nodes (IIT Madras, IIM Bangalore, NCCU Taipei) use `/nodes/trajectory/...` URI paths, but their actual `parent_id` relationships place them under **Information → Education**. This creates a semantic URL structure (`/trajectory/iitm`) that differs from the graph hierarchy (Education → IIT Madras). The Trajectory branch exists as a placeholder but has no children—all education content is accessible through the Information branch.

---

## Detailed Node Content

### 1. INFORMATION BRANCH

#### Information (info-path)
- **Summary:** About & Contact
- **Role:** Product Manager
- **Email:** rudram@alumni.iitm.ac.in
- **Phone:** +91 9940334981
- **Overview:** Based in Bangalore, India
- **Description:** The basics: where I studied, how to reach me, and a few achievements I'm told I should mention. The interesting stuff is elsewhere in the graph—this is the metadata.

##### Education (education-path)
- **Summary:** IIM Bangalore & IIT Madras
- **Description:** Recently completed another Masters, an MBA from IIM Bangalore, following a dual degree from IIT Madras. Exploring interests in Product and Strategy.
- **Metadata:**
  - IIT Madras: BTech & MTech in Engineering Design (Specialization: Biomedical Design)
  - IIM Bangalore: MBA (Post Graduate Programme) QS Worldwide Rank 31
  - Exchange Programme: NCCU College of Commerce, Taipei FT MiM Worldwide Rank 96

###### IIT Madras (iitm-path)
- **Summary:** B.Tech & Research
- **Dates:** July 2015 – May 2019
- **Description:** 5 years. BTech + MTech in Engineering Design with a specialization in Biomedical Design. This is where I learned to build things—physical and digital.
- **Extended:** Why engineering design instead of CS? Because I wanted to understand *how* things are made, not just *that* they work.
- **Metadata:**
  - IIT Madras: Engineering Design (specialization: Biomedical)
  - BTECH & MTECH: 2016-2021

####### Engineering Design (engdes-1)
- **Type:** artifact
- **Summary:** B.Tech Program
- **Description:** The department taught systems thinking. Products aren't features—they're systems of interactions.
- **Education:** B.Tech Engineering Design, IIT Madras, 2019

####### Thesis: Photoacoustic Spectroscopy (thesis-1)
- **Type:** research ★ (highlighted)
- **Summary:** Masters Research
- **Description:** Masters thesis under Dr. N.J. Vasa (Dean, IIT Madras). The project: using laser-induced photoacoustic signals for biomedical sensing.
- **Extended:** The technical details matter less than what I learned: how to work on a problem for 18 months without clear answers. Research taught me patience that product management often doesn't require.
- **Metadata:** Advisor: Dr. N.J. Vasa (Dean, IIT Madras)
- **Connection:** → spatial-path

###### IIM Bangalore (iimb-path)
- **Summary:** MBA
- **Dates:** June 2023 – April 2025
- **Description:** MBA, QS World Rank #31. Why an MBA after working as a PM? Because I hit a ceiling. I could ship products, but I couldn't shape strategy.
- **Metadata:**
  - IIM Bangalore: MBA (Post Graduate Programme)
  - QS WORLD RANK: #31
  - MBA: 2023-2025

####### MBA (mba-1)
- **Type:** artifact
- **Summary:** Business Administration
- **Description:** Two years of case studies, group projects, and questioning whether this was worth it. Verdict: yes, but not for the reasons I expected.
- **Extended:** The value wasn't the curriculum. It was the cohort—400 people from different industries, different functions, different countries.
- **Education:** MBA, IIM Bangalore (QS #31), 2025

####### NCCU Exchange Taipei (nccu-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** International Exchange
- **Description:** Exchange semester at National Chengchi University, Taiwan. FT MiM Rank #96. Why Taiwan? Curiosity about how tech ecosystems work outside Silicon Valley and Bangalore.
- **Extended:** What I took away: a different relationship between manufacturing and innovation. Taiwan asked "what if the constraint is the opportunity?"
- **Metadata:**
  - Location: Taipei, Taiwan
  - Focus: East Asian tech ecosystems, Hardware startups

##### Contact Me (contact-1)
- **Type:** information
- **Summary:** Get in Touch
- **Role:** Product Manager
- **Email:** rudram@alumni.iitm.ac.in
- **Phone:** +91 9940334981
- **Overview:** Based in Bangalore, India
- **External Links:**
  - LinkedIn: https://linkedin.com/in/rudram-piplad
  - GitHub: https://github.com/roseate8
  - Behance: https://behance.net/rudrampiplad
  - Medium: https://roseate134.medium.com/
  - Email: mailto:rudram@alumni.iitm.ac.in

##### Footnotes (footnotes-path)
- **Type:** path (secondary)
- **Summary:** Achievements & Recognition
- **Description:** These aren't bragging rights. They're markers—moments where external validation confirmed (or surprised) me.

###### HCL-CA TechJam (techjam-1)
- **Type:** recognition ★ (highlighted)
- **Summary:** National Tech Competition
- **Description:** Winner, 1 of 8,300 participants. Sydney. USD 3,000 prize. Funded by Cricket Australia and Microsoft.
- **Recognition:** HCL-CA TechJam, Winner (1 of 8,300), 2018
- **Metadata:**
  - Prize: USD 3,000
  - Location: Sydney, Australia

###### ITC Interrobang (interrobang-1)
- **Type:** recognition ★ (highlighted)
- **Summary:** Case Competition
- **Description:** Runner-up, 2 of 600+ teams. Season 10. Pre-placement interview offer, ₹74,000 prize.
- **Extended:** An ideation challenge that taught me how to pitch. The winning idea wasn't my best idea—it was my most communicable idea.
- **Recognition:** ITC Interrobang, Runner-up (2 of 600+), 2024
- **Metadata:** Prize: ₹74,000 + PPI offer

###### GATE & JEE Ranks (gatejee-1)
- **Type:** recognition
- **Summary:** Academic Achievements
- **Description:** All India Rank 113, GATE Biomedical Engineering 2020. All India Rank 77 (category), JEE Main Paper 2, 2016.
- **Recognition:**
  - GATE Biomedical: AIR 113, 2020
  - JEE Main Paper 2: AIR 77 (category), 2016

---

### 2. AI SYSTEMS BRANCH

#### AI Systems (ai-path)
- **Summary:** Building Intelligent Systems
- **Description:** I've spent the last two years building AI systems that need to work in production—not demos, not prototypes, actual products where wrong answers cost money or trust.
- **Extended:** The model could answer correctly, but it didn't know when to abstain. Or it hallucinated with confidence. This section is about that problem.

##### RAG Pipelines (rag-path)
- **Summary:** Retrieval-Augmented Generation
- **Description:** RAG is deceptively simple in theory: retrieve relevant chunks, feed them to an LLM, get better answers. In practice, every decision compounds.
- **Extended:** I've built RAG systems at ThoughtSpot (enterprise scale, real SLAs) and in side projects. The lesson: naive RAG is easy to build and hard to trust.

###### GraphRAG (graphrag-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Knowledge Graph + RAG
- **Description:** Standard RAG felt like searching with a blindfold—you get results, but you don't know why they're connected.
- **Extended:** I started from scratch twice. The first attempt was a graveyard of half-working ideas. The second attempt (graph-rag-trials) actually deployed.
- **Metadata:** Technologies: Neo4j, LangChain, OpenAI
- **External Link:** GitHub: https://github.com/roseate8/graph-rag-trials

###### Document Parsing (docparse-1)
- **Type:** artifact
- **Summary:** Intelligent Document Processing
- **Description:** Before you can chunk, you need to parse. And parsing is where documents lie to you. PDFs claim to have structure but hide text in random order.
- **Extended:** Built a parser pipeline using Docling that handles PDF, PPT, XLSX. The goal wasn't perfect parsing—it was predictable failure modes.
- **Metadata:** Technologies: Docling, PyMuPDF, Unstructured, OCR
- **External Links:**
  - GitHub: document-parser-for-rag: https://github.com/roseate8/document-parser-for-rag
  - GitHub: doc-parsers: https://github.com/roseate8/doc-parsers

###### Chunking Strategies (chunking-1)
- **Type:** artifact
- **Summary:** Semantic Text Chunking
- **Description:** The dirty secret of RAG: your chunking strategy matters more than your embedding model. Chunk too small and you lose context.
- **Extended:** I tried recursive splitting, semantic chunking, parent-child hierarchies. Hybrid approaches that preserve document structure outperform anything that treats documents as flat text.
- **External Link:** GitHub: https://github.com/roseate8/chunking-strategy-experiments

##### AI Agents (agents-path)
- **Summary:** Autonomous AI Systems
- **Description:** Agents are having a moment. Most of what I see is demos—impressive loops that work on happy paths and fail silently on edge cases.
- **Extended:** I've built two agent systems: one for expense tracking, one for AI ethics evaluation. Both taught me the same lesson: agents need escape hatches.

###### Butler Expense Agent (butler-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Autonomous Expense Management
- **Description:** Travel expense tracking is annoying because it's contextual. A $50 meal might be business or personal depending on who you were with.
- **Extended:** Built a multi-agent system that handles categorization, policy checking, and anomaly detection. The interesting part wasn't the agents—it was designing the handoff protocols.
- **Metadata:** Stack: LangGraph, GPT-4, Tool Calling
- **External Links:**
  - GitHub: butler-travel-expense-agent: https://github.com/roseate8/butler-travel-expense-agent
  - GitHub: expense-agents-ui-lovable: https://github.com/roseate8/expense-agents-ui-lovable

###### AI Ethics Framework (ethics-1)
- **Type:** research
- **Summary:** Responsible AI Guidelines
- **Description:** Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That's not ethics—that's compliance theater.
- **Extended:** Built a multi-agent evaluation system that asks the hard questions about AI products before users do. The agents are adversarial by design.
- **External Link:** GitHub: https://github.com/roseate8/applied-ai-ethics
- **Connection:** → evalframework-1

##### Safety & Evals (safety-path)
- **Summary:** AI Safety & Evaluation
- **Description:** Shipping AI without evals is shipping blind. The question isn't whether your model makes mistakes—it will. The question is whether you catch them before users do.

###### Eval Framework (evalframework-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** LLM Evaluation System
- **Description:** At ThoughtSpot, I introduced groundedness and safety evals as release gates. The rule: if evals regress, the release doesn't ship.
- **Extended:** This was politically harder than technically hard. Engineers don't like gates. PMs don't like delays. Metrics that mattered: nDCG@5 for retrieval quality, recall@10 for coverage.
- **Metadata:** Metrics: nDCG@5, Recall@10, Latency p95
- **Connection:** → tsboundary-1

###### PII/DLP Guardrails (piidlp-1)
- **Type:** artifact
- **Summary:** Data Protection in AI
- **Description:** Enterprise AI has a specific failure mode: leaking data that shouldn't be leaked. User asks a question, RAG retrieves a document they shouldn't see.
- **Extended:** Built PII redaction and DLP guardrails at ThoughtSpot. Shipped moderation layers. Cleared SOC 2 Type II with zero major findings.
- **Metadata:** Compliance: SOC 2 Type II Certified

---

### 3. SPATIAL & PERCEPTION BRANCH

#### Spatial & Perception (spatial-path)
- **Summary:** XR & Human Perception Research
- **Description:** Before I cared about AI trust, I cared about perceptual honesty. VR systems that make you sick are lying to your vestibular system.
- **Extended:** This was my research focus at IIT Madras. It shapes how I think about all interfaces—digital or physical.

##### Foveated Rendering & Gaze Tracking (foveat-1)
- **Type:** research ★ (highlighted)
- **Summary:** Eye-Tracking for VR Optimization
- **Description:** Human eyes have high resolution only at the fovea—the tiny central region of your vision. Peripheral vision is blurry by design.
- **Extended:** Built a saccadic foveated rendering pipeline for VR using the HTC Vive Pro Eye. Results: 57-70% compute reduction with no perceptible quality loss.
- **Metadata:**
  - Lab: IIT Madras VR Lab
  - Result: 57-70% compute reduction
- **External Link:** GitHub: https://github.com/roseate8/foveated-rendering-virtual-reality
- **Connection:** → xrproto-path

##### Haptics Research (haptics-1)
- **Type:** research
- **Summary:** Tactile Feedback Systems
- **Description:** Touch is the forgotten sense in computing. We've optimized visual fidelity for decades. But haptics? Still feels like vibration motors from 2010.
- **Extended:** Worked in the Haptics Lab at IIT Madras. Built an evaluation matrix for XR haptic feedback. The finding: +23% perceived responsiveness from optimizing feedback timing.
- **Metadata:** Result: +23% perceived responsiveness
- **Connection:** → xrproto-path

##### XR Prototypes (xrproto-path)
- **Summary:** Extended Reality Projects
- **Description:** The best way to understand perception is to build things that break it. These prototypes were my lab at IIT Madras—quick builds to test ideas.
- **Connection:** → foveat-1

###### AED in VR (aedvr-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Emergency Training Simulator
- **Description:** Built a VR training simulation for automated external defibrillator (AED) use. The goal: train people to respond to cardiac emergencies.
- **Extended:** Learned more from failures than successes. Reverted all code at one point. What remained: understanding of how procedural memory works differently in VR.
- **Metadata:** Platform: Unity, Oculus Quest
- **External Link:** GitHub: https://github.com/roseate8/automated-external-defibrillator-in-vr

###### 3D Printing VR (print3d-1)
- **Type:** artifact
- **Summary:** Spatial 3D Modeling
- **Description:** Can you design 3D-printable objects in VR more intuitively than in CAD software?
- **Extended:** For ideation and rough shaping—yes, dramatically better. For precision work—no, CAD still wins. The interesting middle ground: start in VR, export to CAD for refinement.
- **External Link:** GitHub: https://github.com/roseate8/3d-printing-in-vr

###### AR Mobile Games (argames-1)
- **Type:** artifact
- **Summary:** Location-Based AR
- **Description:** First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub.
- **Extended:** The games shipped. The codebase didn't survive.
- **Metadata:**
  - Platform: ARCore, Unity
  - Status: Code missing, lessons learned

##### Visual Practice (visual-path)
- **Summary:** Photography & Design
- **Description:** I don't separate "creative" from "technical." Photography taught me about attention—where eyes go, what they ignore.
- **Extended:** This isn't a hobby section. It's a different lens on the same questions.

###### Photography (photo-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Visual Storytelling
- **Description:** Street photography, portraits, and travel documentation capturing moments and stories. What draws me to certain subjects connects to my work on perception.

####### Taipei (taipei-photo-1)
- **Type:** artifact
- **Overview:** Photography from Taipei, Taiwan during MBA exchange program
- **Description:** A collection of photographs captured during my exchange semester at National Chengchi University (NCCU) in Taipei, Taiwan.
- **Media:** 5 images (see Media Assets section)

####### Bangalore (bangalore-photo-1)
- **Type:** artifact
- **Overview:** Photography from Bangalore, India
- **Description:** Photographs from Bangalore, India, capturing the vibrant life and landscapes of the Garden City.
- **Media:** 3 images (see Media Assets section)

###### Graphic Design & Illustrations (graphicdesign-path)
- **Summary:** Visual Design Work
- **Description:** Design isn't decoration. It's communication with constraints. Every project here was about solving a problem visually.

####### NFT Collection (nft-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Digital Art Collection
- **Description:** Minted 9+ digital art pieces on OpenSea during the Web3 wave. The art was real; the market was speculative.
- **Extended:** The NFT work that sold wasn't my best work—it was my most marketable work. That's a useful distinction.
- **Metadata:** Pieces: 9+ minted
- **External Link:** OpenSea: https://opensea.io/rudrampiplad

####### E-Cell Magazine (ecell-1)
- **Type:** artifact
- **Summary:** Editorial Design
- **Description:** Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+, published the first entrepreneurship magazine at the institute.
- **Extended:** 30K+ copies printed and distributed. What I learned: design at scale is project management.
- **Metadata:**
  - Role: Chief Designer
  - Circulation: 30K+ copies
  - Team: 5+ designers

####### Behance Work (behance-1)
- **Type:** artifact
- **Summary:** Design Portfolio
- **Description:** Curated collection of graphic design, branding, and illustration work. 3 featured projects.
- **External Link:** Behance Profile: https://behance.net/roseate134

---

### 4. PRODUCT WORK BRANCH

#### Product Work (product-path)
- **Summary:** Professional Experience
- **Description:** I've been a PM at two companies—Policybazaar (15M monthly users, insurance) and ThoughtSpot (enterprise BI, AI-native search).
- **Extended:** The thing I keep returning to: most product failures aren't feature failures. They're trust failures.

##### ThoughtSpot (ts-path)
- **Summary:** AI-Powered Analytics
- **Dates:** January 2023 – Present
- **Description:** ThoughtSpot is an AI-native BI platform. Users ask questions in natural language, the system generates queries, returns answers.
- **Extended:** The interesting problem: AI in enterprise has different failure modes than consumer AI. Wrong answers don't just frustrate—they lead to bad business decisions.

###### Boundaryless / Enterprise Search (tsboundary-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** AI-Powered Enterprise Search
- **Description:** Enterprise data is scattered across warehouses, lakehouses, spreadsheets, third-party tools. Boundaryless is ThoughtSpot's answer: search across everything.
- **Extended:** I owned the agentic RAG implementation. Constraints: <$0.004/query cost, >0.7 nDCG@5, 0.9 Recall@10, p95 latency under 5s. Shipped via rethink policy and aggressive caching.
- **Metadata:**
  - Role: Product Manager
  - Constraints: <$0.004/query, >0.7 nDCG@5

###### Navigation & Discovery (tsnav-1)
- **Type:** artifact
- **Summary:** UX Redesign
- **Description:** How do users find what they're looking for in an enterprise tool with thousands of objects? The answer isn't just search. It's structure.
- **Extended:** Overhauled the frontend and backend of ThoughtSpot's navigation systems. Result: 20% faster time-to-discovery in user testing.
- **Metadata:** Impact: 20% faster time to discovery

###### Object Search (tsobjsearch-1)
- **Type:** artifact
- **Summary:** Semantic Object Discovery
- **Description:** Beyond answering questions, users need to find things—dashboards, reports, data sources. Object search is that problem.

###### Homepage (tshome-1)
- **Type:** artifact
- **Summary:** Personalized Landing Experience
- **Description:** The homepage is the first thing users see after login. At ThoughtSpot, the old homepage was a list of recent items. Functional, but not useful.
- **Extended:** Overhauled both frontend and backend. The new homepage surfaces relevant content based on user behavior, role, and what's trending.

##### Policybazaar (pb-path)
- **Summary:** InsurTech Platform
- **Dates:** January 2021 – 2023
- **Description:** Policybazaar is India's largest insurance aggregator. 15M monthly users. I was part of the CEO's office, leading 7 agile teams on a 3-year product strategy.
- **Extended:** The challenge: insurance is confusing. Users don't know what they need. The job was making complexity manageable without dumbing it down.

###### Your Orders (orders-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Policy Management Dashboard
- **Description:** Insurance customers have a problem: they buy a policy and then forget about it. When they need to make a claim, they call customer support.
- **Extended:** Built "Your Orders"—a self-service portal for managing insurance policies. Results: saved ₹10M+ in customer support costs. 170% increase in engagement.
- **Metadata:**
  - Impact: Saved ₹10M+ in support costs
  - Engagement: +170% policy management

###### Web Analytics (webanalytics-1)
- **Type:** artifact
- **Summary:** Data-Driven Optimization
- **Description:** When I joined Policybazaar, web analytics had a 60% discrepancy between reported and actual numbers. Marketing was making budget decisions on fiction.
- **Extended:** Formed a team of 15+, overhauled the entire analytics infrastructure. Cut discrepancies to under 10%. Saved ₹6.5M+ in wasted spend.
- **Metadata:**
  - Impact: Saved ₹6.5M+ in wasted spend
  - Team: 15+ members

###### Growth & Mobile App (growthmobile-1)
- **Type:** artifact
- **Summary:** Mobile-First Growth
- **Description:** Mobile deployment was broken. Streamlined the release process. Result: 50% increase in adoption within two weeks, attributed ₹25M+ revenue.
- **Extended:** Also ran A/B tests for upselling flows. 21% higher upsell conversion, ₹75M+ generated. Prototyped NLP analysis of customer support tickets.
- **Metadata:**
  - Revenue: ₹25M+ from mobile, ₹75M+ from upselling
  - Adoption: +50% in 2 weeks
- **Connection:** → rag-path

##### Consulting (consulting-path)
- **Summary:** Strategic Advisory
- **Description:** Consulting is a different muscle than product management. You don't own the roadmap. You give recommendations and hope they stick.
- **Extended:** I've done management consulting (Tata Group) and product consulting (Chisel Labs). Different contexts, same lesson: clarity of recommendation matters more than depth of analysis.

###### Tata Group (tata-path)
- **Summary:** Enterprise AI Strategy
- **Description:** Summer associate at TCS, CPG & Retail practice. Management consulting, not product management.

####### MLOps & LLM Intelligence (mlops-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Enterprise ML Infrastructure
- **Description:** Authored competitive intelligence reports on MLOps platforms and LLM capabilities for TCS's CPG & Retail practice.
- **Extended:** Proposed revisions to RFP templates. Targeted 12% cost savings. The analysis shaped how I think about vendor evaluation.
- **Metadata:** Target: 12% cost savings in RFPs

####### AI Maturity Model (aimaturity-1)
- **Type:** artifact
- **Summary:** Organizational Assessment
- **Description:** Built a three-part digital maturity model to assess enterprise AI readiness. The framework helped sales teams have AI conversations with CIOs.
- **Extended:** Result: 15% increase in AI adoption recommendations in proposals. The model became a standard tool for the practice.
- **Metadata:** Impact: +15% AI adoption in proposals

###### Chisel Labs (chisel-path)
- **Summary:** Product Strategy
- **Description:** Product consulting for a pre-Series A SaaS startup. Paid engagement, not advisory board—actual deliverables with deadlines.
- **Extended:** The ask: help them think through international expansion and post-trial conversion.

####### Global SaaS GTM (gtm-1)
- **Type:** artifact ★ (highlighted)
- **Summary:** Go-to-Market Strategy
- **Description:** Designed go-to-market strategy for Chisel's international expansion. Built a post-trial conversion playbook.
- **Extended:** Forecasted 20% ARR uplift from proposed changes. The playbook focused on activation metrics—getting trial users to the "aha moment" faster.
- **Metadata:** Forecast: 20% ARR uplift

---

### 5. BETS BRANCH

#### Bets (bets-path)
- **Summary:** Entrepreneurial Ventures
- **Description:** Bets are different from jobs. You don't have product-market fit handed to you. You have an idea and the willingness to be wrong publicly.
- **Extended:** I've made two bets. One worked (sort of). One didn't (but taught me more).

##### Caval (caval-1)
- **Type:** initiative ★ (highlighted)
- **Summary:** Vehicle Services Startup
- **Dates:** January 2019 – ?
- **Description:** Vehicle servicing is broken. You don't know if you're being overcharged. You trust mechanics because you have no choice.
- **Extended:** Co-founded Caval. Built a platform connecting vehicle owners with verified service providers. Results: ₹5L revenue, 4K+ users, 4.6 rating on Play Store. What didn't work: unit economics at scale.
- **Metadata:**
  - Revenue: ₹5 Lakhs
  - Users: 4K+, 4.6 Play Store rating
  - Role: Co-founder, Design Lead

##### EventHive (eventhive-1)
- **Type:** initiative ★ (highlighted)
- **Summary:** Event Tech Platform
- **Description:** Event hosting platforms are either too simple or too complex. EventHive was the middle ground—powerful enough for real events, simple enough for student organizers.
- **Extended:** Co-founded at IIT Madras. Built ticketing, attendee management, check-in systems. Raised ₹30L through the pre-incubation program. What didn't work: timing. Built this as the event market was still recovering post-COVID.
- **Metadata:**
  - Funding: ₹30 Lakhs Pre-Incubation
  - Incubator: IIT Madras Incubation Cell

---

## Cross-Node Connections

The graph includes 7 **cross-node connections** (dotted lines connecting non-parent-child nodes):

| Source Node | Target Node | Relationship |
|-------------|-------------|--------------|
| AI Ethics Framework (ethics-1) | Eval Framework (evalframework-1) | Ethics framework connects to practical evaluation |
| Eval Framework (evalframework-1) | Boundaryless (tsboundary-1) | Evals used for enterprise search product |
| Foveated Rendering (foveat-1) | XR Prototypes (xrproto-path) | Research connects to practical prototypes |
| Haptics Research (haptics-1) | XR Prototypes (xrproto-path) | Research connects to practical prototypes |
| Growth & Mobile App (growthmobile-1) | RAG Pipelines (rag-path) | NLP work at Policybazaar connects to RAG |
| Thesis (thesis-1) | Spatial & Perception (spatial-path) | Academic research connects to perception work |
| XR Prototypes (xrproto-path) | Foveated Rendering (foveat-1) | Prototypes connect back to research |

---

## Media Assets

All media is stored in Supabase Storage bucket: `portfolio-media`

### Photography - Taipei (5 images)
| File Path | Alt Text |
|-----------|----------|
| photography/taipei/PB020359.jpg | Taipei cityscape |
| photography/taipei/PB050292.jpg | Taipei street photography |
| photography/taipei/PB050294.jpg | Taipei urban landscape |
| photography/taipei/PB271469.jpg | Taipei architecture |
| photography/taipei/PB271470-2.jpg | Taipei night scene |

### Photography - Bangalore (3 images)
| File Path | Alt Text |
|-----------|----------|
| photography/bangalore/_C050177.jpg | Bangalore landscape |
| photography/bangalore/_C050179-2.jpg | Bangalore cityscape |
| photography/bangalore/_C050200.jpg | Bangalore urban scene |

### Other Media
| File | Location |
|------|----------|
| Resume PDF | resume/rudram-piplad-resume.pdf |

---

## External Links

### Social & Professional Links (from Contact/Information nodes)
| Platform | URL |
|----------|-----|
| LinkedIn | https://linkedin.com/in/rudram-piplad |
| GitHub | https://github.com/roseate8 |
| Behance | https://behance.net/rudrampiplad |
| Medium | https://roseate134.medium.com/ |
| OpenSea | https://opensea.io/rudrampiplad |

### GitHub Repositories
| Project | Repository |
|---------|------------|
| GraphRAG | https://github.com/roseate8/graph-rag-trials |
| Document Parser | https://github.com/roseate8/document-parser-for-rag |
| Doc Parsers | https://github.com/roseate8/doc-parsers |
| Chunking Experiments | https://github.com/roseate8/chunking-strategy-experiments |
| Butler Agent | https://github.com/roseate8/butler-travel-expense-agent |
| Expense Agent UI | https://github.com/roseate8/expense-agents-ui-lovable |
| AI Ethics | https://github.com/roseate8/applied-ai-ethics |
| Foveated Rendering | https://github.com/roseate8/foveated-rendering-virtual-reality |
| AED VR | https://github.com/roseate8/automated-external-defibrillator-in-vr |
| 3D Printing VR | https://github.com/roseate8/3d-printing-in-vr |

---

## Site Map Visualization

```
                              ┌─────────────────────┐
                              │   Rudram Piplad     │
                              │      (root)         │
                              └──────────┬──────────┘
                                         │
       ┌─────────────┬─────────────┬─────┴─────┬─────────────┬─────────────┐
       │             │             │           │             │             │
       ▼             ▼             ▼           ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Information│  │AI Systems│  │ Spatial  │ │ Product  │ │   Bets   │ │Trajectory│
│  (19)    │  │   (11)   │  │   (15)   │ │   (16)   │ │   (3)    │ │  (1) ⊘   │
└─────┬─────┘  └─────┬────┘  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────────┘
      │              │            │            │            │         (hidden)
      │              │            │            │            │
   ┌──┴───────┐  ┌───┴───┐   ┌────┴───┐   ┌────┴───┐   ┌────┴───┐
   │    │     │  │   │   │   │   │    │   │   │    │   │        │
   ▼    ▼     ▼  ▼   ▼   ▼   ▼   ▼    ▼   ▼   ▼    ▼   ▼        ▼
 Edu Contact  │ RAG Agents  XR  Visual  TS  PB  Consult Caval EventHive
 (8)   (1)    │ (4)  (3)   (4)   (8)  (5) (4)   (6)
         Footnotes Safety
           (4)    (3)
```

Numbers in parentheses indicate total nodes in that sub-branch.
⊘ indicates hidden (not featured) branches.

---

## Planning Notes

### Current State Summary
- **66 total nodes** in database
- **60 featured nodes** visible in graph (6 hidden)
- **17 highlighted nodes** with special visual emphasis
- **6 main branches** (5 featured + 1 hidden Trajectory)
- **Strong cross-linking** between AI/research and practical work
- **Media primarily in Photography** section (8 images total)
- **Rich metadata** on professional work (metrics, outcomes)

### Content Distribution by Branch
| Branch | Total Nodes | Featured | Depth |
|--------|-------------|----------|-------|
| Information | 19 | Yes | 4 levels |
| Product Work | 16 | Yes | 4 levels |
| Spatial & Perception | 15 | Yes | 5 levels |
| AI Systems | 11 | Yes | 3 levels |
| Bets | 3 | Yes | 2 levels |
| Trajectory | 1 | **No** | 1 level (empty) |

> **Total:** 65 nodes in branches + 1 root = 66 nodes

### Not Featured Nodes (Hidden from Graph)
These 6 nodes exist in the database but are not shown in the graph visualization:

| Node | UUID | Parent | Reason |
|------|------|--------|--------|
| Trajectory | trajectory-path | Root | Placeholder branch, content moved to Education |
| LinkedIn | linkedin-1 | Information | Accessible via Contact links |
| Email | email-1 | Information | Accessible via Contact links |
| Phone | phone-1 | Information | Accessible via Contact links |
| Behance | behance-info-1 | Information | Accessible via Contact links |
| Resume | resume-1 | Information | Accessible via Resume link |

### Highlighted Nodes (★) — 17 Total
These receive special visual emphasis (larger size, different styling) in the graph:

| # | Node | UUID | Type | Branch |
|---|------|------|------|--------|
| 1 | Thesis: Photoacoustic Spectroscopy | thesis-1 | research | Information/Education |
| 2 | NCCU Exchange Taipei | nccu-1 | artifact | Information/Education |
| 3 | HCL-CA TechJam | techjam-1 | recognition | Information/Footnotes |
| 4 | ITC Interrobang | interrobang-1 | recognition | Information/Footnotes |
| 5 | GraphRAG | graphrag-1 | artifact | AI Systems/RAG |
| 6 | Butler Expense Agent | butler-1 | artifact | AI Systems/Agents |
| 7 | Eval Framework | evalframework-1 | artifact | AI Systems/Safety |
| 8 | Foveated Rendering | foveat-1 | research | Spatial/Research |
| 9 | AED in VR | aedvr-1 | artifact | Spatial/XR Prototypes |
| 10 | Photography | photo-1 | artifact | Spatial/Visual |
| 11 | NFT Collection | nft-1 | artifact | Spatial/Graphic Design |
| 12 | Boundaryless / Enterprise Search | tsboundary-1 | artifact | Product/ThoughtSpot |
| 13 | Your Orders | orders-1 | artifact | Product/Policybazaar |
| 14 | MLOps & LLM Intelligence | mlops-1 | artifact | Product/Consulting/Tata |
| 15 | Global SaaS GTM | gtm-1 | artifact | Product/Consulting/Chisel |
| 16 | Caval | caval-1 | initiative | Bets |
| 17 | EventHive | eventhive-1 | initiative | Bets |

---

## Technical Notes

### Supabase Configuration

**Project Details:**
- Project ID: `eeuvtdgwdjerdsumowmx`
- Region: `ap-southeast-1` (Singapore)
- Database Version: PostgreSQL 17.6
- Status: ACTIVE_HEALTHY

**Storage:**
- Bucket: `portfolio-media`
- Contains: Photography images, resume PDF
- Base URL: `https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/`

**Row Level Security:**
All tables have RLS enabled with public read access policies. This means:
- Anyone can read data (for the public portfolio)
- Write operations require authentication (not exposed publicly)

### Empty/Unused Tables

| Table | Status | Notes |
|-------|--------|-------|
| `node_footnotes` | Empty (0 rows) | Schema exists, not currently used |

### Potential Data Inconsistencies

1. **URI/Parent Mismatch:** Some nodes have URIs that don't reflect their parent hierarchy (documented above)

2. **Trajectory Branch:** Exists as a Level 1 node but is empty and not featured—appears to be a placeholder or legacy structure

3. **Duplicate Education Links:** Education entries exist both as `node_education` records AND as `node_metadata` with `linked_node_uuid`—the Information node uses both to display education information

### Content Statistics

| Content Type | Count | Average per Node |
|--------------|-------|------------------|
| Nodes with description | 66 | 100% |
| Nodes with extended_description | ~45 | ~68% |
| Nodes with metadata | ~35 | ~53% |
| Nodes with external links | ~15 | ~23% |

---

*This document was generated by querying the Supabase database directly via MCP tools. For the most up-to-date content, always refer to the live database.*

*Last verified: January 23, 2026*
