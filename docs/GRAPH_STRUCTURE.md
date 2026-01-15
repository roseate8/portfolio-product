# Portfolio Graph Structure

This document provides a comprehensive overview of the portfolio graph structure, including all nodes, their relationships, cross-connections, and external links.

**Last Updated:** January 15, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Node Types](#node-types)
3. [Graph Statistics](#graph-statistics)
4. [Tree Structure](#tree-structure)
5. [Cross-Connections](#cross-connections)
6. [External Links by Node](#external-links-by-node)
7. [Node Inventory](#node-inventory)

---

## Overview

The portfolio is structured as a **directed graph** with two types of relationships:

1. **Hierarchical (Parent-Child):** Forms the primary tree structure. Each node has exactly one parent (except the root).
2. **Cross-Connections:** Non-hierarchical links between nodes that represent thematic or conceptual relationships.

The graph is rendered as an interactive visualization where users can explore nodes and their connections.

---

## Node Types

| Type | Icon | Description | Count |
|------|------|-------------|-------|
| `(root)` | Home | The root node (Rudram Piplad) | 1 |
| `path` | Branch | Category/section nodes that contain other nodes | 20 |
| `artifact` | Diamond | Concrete work products, projects, or deliverables | 27 |
| `research` | Circle | Research projects and academic work | 4 |
| `initiative` | Star | Entrepreneurial ventures and startups | 2 |
| `recognition` | Badge | Awards, achievements, and recognition | 3 |
| `information` | Info | Contact and informational nodes | 6 |

### Node Flags

- **`is_featured`:** Shown in the main graph visualization (50 nodes)
- **`is_highlighted`:** Emphasized/starred nodes representing key work (17 nodes)
- **`is_secondary`:** De-emphasized nodes (1 node: Footnotes)

---

## Graph Statistics

| Metric | Count |
|--------|-------|
| Total Nodes | 65 |
| Featured Nodes (visible in graph) | 50 |
| Highlighted Nodes | 17 |
| Cross-Connections | 7 |
| External Links | 25 |
| Maximum Depth | 5 levels |

---

## Tree Structure

```
Rudram Piplad (root-0)
├── Information (info-path) [path]
│   ├── Education (education-path) [path]
│   │   ├── IIT Madras (iitm-path) [path]
│   │   │   ├── Engineering Design (engdes-1) [artifact]
│   │   │   └── Thesis: Photoacoustic Spectroscopy (thesis-1) [research] ★
│   │   └── IIM Bangalore (iimb-path) [path]
│   │       ├── MBA (mba-1) [artifact]
│   │       └── NCCU Exchange Taipei (nccu-1) [artifact] ★
│   ├── Contact Me (contact-1) [information]
│   ├── Footnotes (footnotes-path) [path]
│   │   ├── HCL-CA TechJam (techjam-1) [recognition] ★
│   │   ├── ITC Interrobang (interrobang-1) [recognition] ★
│   │   └── GATE & JEE Ranks (gatejee-1) [recognition]
│   ├── LinkedIn (linkedin-1) [information] (not featured)
│   ├── Email (email-1) [information] (not featured)
│   ├── Phone (phone-1) [information] (not featured)
│   ├── Behance (behance-info-1) [information] (not featured)
│   └── Resume (resume-1) [information] (not featured)
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
│           ├── E-Cell Magazine (ecell-1) [artifact]
│           ├── NFT Collection (nft-1) [artifact] ★
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
└── Trajectory (trajectory-path) [path] (not featured)
```

**Legend:**
- ★ = Highlighted node
- `(not featured)` = Node exists but not shown in main graph

---

## Cross-Connections

Cross-connections are non-hierarchical links that connect related nodes across different branches of the tree. They represent thematic or conceptual relationships.

### Connection Map

| Source Node | → | Target Node | Relationship |
|-------------|---|-------------|--------------|
| AI Ethics Framework | → | Eval Framework | Ethics evaluation connects to practical eval framework |
| Eval Framework | → | Boundaryless / Enterprise Search | Eval metrics used in enterprise search |
| Growth & Mobile App | → | RAG Pipelines | NLP work led to RAG exploration |
| Foveated Rendering | ↔ | XR Prototypes | Research informs prototypes (bidirectional) |
| Haptics Research | → | XR Prototypes | Research informs prototypes |
| Thesis: Photoacoustic Spectroscopy | → | Spatial & Perception | Academic work connects to perception research |

### Visual Diagram

```
                                    ┌─────────────────┐
                                    │  AI Ethics      │
                                    │  Framework      │
                                    └────────┬────────┘
                                             │
                                             ▼
┌─────────────────┐              ┌─────────────────┐
│  Boundaryless   │◄─────────────│  Eval Framework │
│  Enterprise     │              │                 │
└─────────────────┘              └─────────────────┘

┌─────────────────┐              ┌─────────────────┐
│  Growth &       │─────────────►│  RAG Pipelines  │
│  Mobile App     │              │                 │
└─────────────────┘              └─────────────────┘

┌─────────────────┐              ┌─────────────────┐
│  Foveated       │◄────────────►│  XR Prototypes  │
│  Rendering      │              │                 │
└─────────────────┘              └─────────────────┘
         ▲
         │
┌────────┴────────┐
│  Haptics        │
│  Research       │
└─────────────────┘

┌─────────────────┐              ┌─────────────────┐
│  Thesis:        │─────────────►│  Spatial &      │
│  Photoacoustic  │              │  Perception     │
└─────────────────┘              └─────────────────┘
```

---

## External Links by Node

### AI Systems Branch

| Node | Links |
|------|-------|
| **GraphRAG** | [GitHub: graph-rag-trials](https://github.com/roseate8/graph-rag-trials) |
| **Document Parsing** | [GitHub: document-parser-for-rag](https://github.com/roseate8/document-parser-for-rag), [GitHub: doc-parsers](https://github.com/roseate8/doc-parsers) |
| **Chunking Strategies** | [GitHub: chunking-strategy-experiments](https://github.com/roseate8/chunking-strategy-experiments) |
| **Butler Expense Agent** | [GitHub: butler-travel-expense-agent](https://github.com/roseate8/butler-travel-expense-agent), [GitHub: expense-agents-ui-lovable](https://github.com/roseate8/expense-agents-ui-lovable) |
| **AI Ethics Framework** | [GitHub: applied-ai-ethics](https://github.com/roseate8/applied-ai-ethics) |

### Spatial & Perception Branch

| Node | Links |
|------|-------|
| **Foveated Rendering** | [GitHub: foveated-rendering-virtual-reality](https://github.com/roseate8/foveated-rendering-virtual-reality) |
| **AED in VR** | [GitHub: automated-external-defibrillator-in-vr](https://github.com/roseate8/automated-external-defibrillator-in-vr) |
| **3D Printing VR** | [GitHub: 3d-printing-in-vr](https://github.com/roseate8/3d-printing-in-vr) |
| **NFT Collection** | [OpenSea](https://opensea.io/rudrampiplad) |
| **Behance Work** | [Behance Profile](https://behance.net/roseate134) |

### Information Branch

| Node | Links |
|------|-------|
| **Information** | [LinkedIn](https://linkedin.com/in/rudram-piplad), [GitHub](https://github.com/roseate8), [Behance](https://behance.net/rudrampiplad), [Medium](https://roseate134.medium.com/) |
| **Contact Me** | [LinkedIn](https://linkedin.com/in/rudram-piplad), [GitHub](https://github.com/roseate8), [Behance](https://behance.net/rudrampiplad), [Medium](https://roseate134.medium.com/), [Email](mailto:rudram@alumni.iitm.ac.in) |
| **Resume** | [Download Resume (PDF)](https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/resume/rudram-piplad-resume.pdf) |
| **LinkedIn** | [LinkedIn Profile](https://www.linkedin.com/in/rudram-piplad/) |
| **Email** | [Send Email](mailto:rudram@alumni.iitm.ac.in) |
| **Behance** | [Behance Portfolio](https://www.behance.net/roseate134) |

---

## Node Inventory

### Complete Node List (Alphabetical)

| Node Title | URI | UUID | Type | Summary | Featured | Highlighted |
|------------|-----|------|------|---------|----------|-------------|
| 3D Printing VR | nodes/spatial-perception/xr-prototypes/3d-print-vr | print3d-1 | artifact | Spatial 3D Modeling | ✓ | |
| AED in VR | nodes/spatial-perception/xr-prototypes/aed-vr | aedvr-1 | artifact | Emergency Training Simulator | ✓ | ★ |
| AI Agents | nodes/ai-systems/agents | agents-path | path | Autonomous AI Systems | ✓ | |
| AI Ethics Framework | nodes/ai-systems/agents/ethics | ethics-1 | research | Responsible AI Guidelines | ✓ | |
| AI Maturity Model | nodes/industry-work/consulting/tata/ai-maturity | aimaturity-1 | artifact | Organizational Assessment | ✓ | |
| AI Systems | nodes/ai-systems | ai-path | path | Building Intelligent Systems | ✓ | |
| AR Mobile Games | nodes/spatial-perception/xr-prototypes/ar-games | argames-1 | artifact | Location-Based AR | ✓ | |
| Bangalore | nodes/photography/bangalore | bangalore-photo-1 | artifact | (Photography) | ✓ | |
| Behance | nodes/information/behance | behance-info-1 | information | Design Portfolio | | |
| Behance Work | nodes/spatial-perception/visual-practice/graphic-design/behance | behance-1 | artifact | Design Portfolio | ✓ | |
| Bets | nodes/bets | bets-path | path | Entrepreneurial Ventures | ✓ | |
| Boundaryless / Enterprise Search | nodes/industry-work/thoughtspot/boundaryless | tsboundary-1 | artifact | AI-Powered Enterprise Search | ✓ | ★ |
| Butler Expense Agent | nodes/ai-systems/agents/butler | butler-1 | artifact | Autonomous Expense Management | ✓ | ★ |
| Caval | nodes/bets/caval | caval-1 | initiative | Vehicle Services Startup | ✓ | ★ |
| Chisel Labs | nodes/industry-work/consulting/chisel | chisel-path | path | Product Strategy | ✓ | |
| Chunking Strategies | nodes/ai-systems/rag-pipelines/chunking | chunking-1 | artifact | Semantic Text Chunking | ✓ | |
| Consulting | nodes/industry-work/consulting | consulting-path | path | Strategic Advisory | ✓ | |
| Contact Me | nodes/information/contact | contact-1 | information | Get in Touch | ✓ | |
| Document Parsing | nodes/ai-systems/rag-pipelines/doc-parsing | docparse-1 | artifact | Intelligent Document Processing | ✓ | |
| E-Cell Magazine | nodes/spatial-perception/visual-practice/graphic-design/ecell-magazine | ecell-1 | artifact | Editorial Design | ✓ | |
| Education | nodes/information/education | education-path | path | (Academic background) | ✓ | |
| Email | nodes/information/email | email-1 | information | Get in Touch | | |
| Engineering Design | nodes/trajectory/iitm/engineering-design | engdes-1 | artifact | B.Tech Program | ✓ | |
| Eval Framework | nodes/ai-systems/safety-evals/eval-framework | evalframework-1 | artifact | LLM Evaluation System | ✓ | ★ |
| EventHive | nodes/bets/eventhive | eventhive-1 | initiative | Event Tech Platform | ✓ | ★ |
| Footnotes | nodes/information/footnotes | footnotes-path | path | Achievements & Recognition | ✓ | |
| Foveated Rendering & Gaze Tracking | nodes/spatial-perception/foveated-rendering | foveat-1 | research | Eye-Tracking for VR Optimization | ✓ | ★ |
| GATE & JEE Ranks | nodes/information/footnotes/ranks | gatejee-1 | recognition | Academic Achievements | ✓ | |
| Global SaaS GTM | nodes/industry-work/consulting/chisel/gtm | gtm-1 | artifact | Go-to-Market Strategy | ✓ | ★ |
| Graphic Design & Illustrations | nodes/spatial-perception/visual-practice/graphic-design | graphicdesign-path | path | Visual Design Work | ✓ | |
| GraphRAG | nodes/ai-systems/rag-pipelines/graphrag | graphrag-1 | artifact | Knowledge Graph + RAG | ✓ | ★ |
| Growth & Mobile App | nodes/industry-work/policybazaar/growth-mobile | growthmobile-1 | artifact | Mobile-First Growth | ✓ | |
| Haptics Research | nodes/spatial-perception/haptics | haptics-1 | research | Tactile Feedback Systems | ✓ | |
| HCL-CA TechJam | nodes/information/footnotes/techjam | techjam-1 | recognition | National Tech Competition | ✓ | ★ |
| Homepage | nodes/industry-work/thoughtspot/homepage | tshome-1 | artifact | Personalized Landing Experience | ✓ | |
| IIM Bangalore | nodes/trajectory/iimb | iimb-path | path | MBA | ✓ | |
| IIT Madras | nodes/trajectory/iitm | iitm-path | path | B.Tech & Research | ✓ | |
| ITC Interrobang | nodes/information/footnotes/interrobang | interrobang-1 | recognition | Case Competition | ✓ | ★ |
| Information | nodes/information | info-path | path | About & Contact | ✓ | |
| LinkedIn | nodes/information/linkedin | linkedin-1 | information | Professional Profile | | |
| MBA | nodes/trajectory/iimb/mba | mba-1 | artifact | Business Administration | ✓ | |
| MLOps & LLM Intelligence | nodes/industry-work/consulting/tata/mlops | mlops-1 | artifact | Enterprise ML Infrastructure | ✓ | ★ |
| Navigation & Discovery | nodes/industry-work/thoughtspot/navigation | tsnav-1 | artifact | UX Redesign | ✓ | |
| NCCU Exchange Taipei | nodes/trajectory/iimb/nccu-exchange | nccu-1 | artifact | International Exchange | ✓ | ★ |
| NFT Collection | nodes/spatial-perception/visual-practice/graphic-design/nft | nft-1 | artifact | Digital Art Collection | ✓ | ★ |
| Object Search | nodes/industry-work/thoughtspot/object-search | tsobjsearch-1 | artifact | Semantic Object Discovery | ✓ | |
| PII/DLP Guardrails | nodes/ai-systems/safety-evals/pii-dlp | piidlp-1 | artifact | Data Protection in AI | ✓ | |
| Phone | nodes/information/phone | phone-1 | information | Call Me | | |
| Photography | nodes/spatial-perception/visual-practice/photography | photo-1 | artifact | Visual Storytelling | ✓ | ★ |
| Policybazaar | nodes/industry-work/policybazaar | pb-path | path | InsurTech Platform | ✓ | |
| Product Work | nodes/industry-work | product-path | path | Professional Experience | ✓ | |
| RAG Pipelines | nodes/ai-systems/rag-pipelines | rag-path | path | Retrieval-Augmented Generation | ✓ | |
| Resume | nodes/information/resume | resume-1 | information | Download CV | | |
| Rudram Piplad | / | root-0 | (root) | Product & AI Builder | ✓ | |
| Safety & Evals | nodes/ai-systems/safety-evals | safety-path | path | AI Safety & Evaluation | ✓ | |
| Spatial & Perception | nodes/spatial-perception | spatial-path | path | XR & Human Perception Research | ✓ | |
| Taipei | nodes/photography/taipei | taipei-photo-1 | artifact | (Photography) | ✓ | |
| Tata Group | nodes/industry-work/consulting/tata | tata-path | path | Enterprise AI Strategy | ✓ | |
| Thesis: Photoacoustic Spectroscopy | nodes/trajectory/iitm/thesis | thesis-1 | research | Masters Research | ✓ | ★ |
| ThoughtSpot | nodes/industry-work/thoughtspot | ts-path | path | AI-Powered Analytics | ✓ | |
| Trajectory | nodes/trajectory | trajectory-path | path | Education & Journey | | |
| Visual Practice | nodes/spatial-perception/visual-practice | visual-path | path | Photography & Design | ✓ | |
| Web Analytics | nodes/industry-work/policybazaar/analytics | webanalytics-1 | artifact | Data-Driven Optimization | ✓ | |
| XR Prototypes | nodes/spatial-perception/xr-prototypes | xrproto-path | path | Extended Reality Projects | ✓ | |
| Your Orders | nodes/industry-work/policybazaar/orders | orders-1 | artifact | Policy Management Dashboard | ✓ | ★ |

---

## Branch Summary

### Main Branches (Children of Root)

| Branch | Description | Child Nodes |
|--------|-------------|-------------|
| **Information** | Contact, education, achievements | 15 nodes |
| **AI Systems** | RAG, agents, safety/evals | 10 nodes |
| **Spatial & Perception** | VR/AR research, visual practice | 15 nodes |
| **Product Work** | ThoughtSpot, Policybazaar, consulting | 14 nodes |
| **Bets** | Startups (Caval, EventHive) | 3 nodes |
| **Trajectory** | Education timeline (hidden) | 7 nodes |

---

## Data Sources

This graph structure is stored in Supabase with the following tables:

- `nodes` - All 65 nodes with content and metadata
- `node_links` - 25 external links (GitHub, LinkedIn, etc.)
- `node_metadata` - 38 metadata items (impact metrics, technologies, etc.)
- `node_media` - 8 photography images
- `node_education` - 4 education entries
- `node_recognition` - 4 recognition/award entries
- `node_connections` - 7 cross-connections between nodes

A fallback JSON file (`assets/data/portfolio.json`) mirrors this structure for offline availability.
