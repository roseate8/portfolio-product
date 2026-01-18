# Portfolio Graph Structure

This document provides a comprehensive overview of the portfolio graph structure, including all nodes, their relationships, cross-connections, and external links.

**Last Updated:** January 18, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Node Types](#node-types)
3. [Graph Statistics](#graph-statistics)
4. [Tree Structure](#tree-structure)
5. [Cross-Connections](#cross-connections)
6. [External Links by Node](#external-links-by-node)
7. [Node Inventory](#node-inventory)
8. [Branch Summary](#branch-summary)
9. [Data Sources](#data-sources)
10. [Node Content Details](#node-content-details)

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
| `path` | Branch | Category/section nodes that contain other nodes | 19 |
| `artifact` | Diamond | Concrete work products, projects, or deliverables | 27 |
| `research` | Circle | Research projects and academic work | 4 |
| `initiative` | Star | Entrepreneurial ventures and startups | 2 |
| `recognition` | Badge | Awards, achievements, and recognition | 3 |
| `information` | Info | Contact and informational nodes | 1 |

### Node Flags

- **`is_featured`:** Shown in the main graph visualization (all 59 nodes)
- **`is_highlighted`:** Emphasized/starred nodes representing key work (17 nodes)
- **`is_secondary`:** De-emphasized nodes (1 node: Footnotes)

---

## Graph Statistics

| Metric | Count |
|--------|-------|
| Total Nodes | 59 |
| Featured Nodes (visible in graph) | 59 |
| Highlighted Nodes | 17 |
| Cross-Connections | 7 |
| External Links | 25 |
| Maximum Depth | 5 levels |

> **Note:** 6 hidden nodes were removed from the database on Jan 18, 2026 (LinkedIn, Email, Phone, Behance, Resume contact links and the Trajectory path). All remaining nodes are now visible in the graph.

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
│   └── Footnotes (footnotes-path) [path]
│       ├── HCL-CA TechJam (techjam-1) [recognition] ★
│       ├── ITC Interrobang (interrobang-1) [recognition] ★
│       └── GATE & JEE Ranks (gatejee-1) [recognition]
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
└── Bets (bets-path) [path]
    ├── Caval (caval-1) [initiative] ★
    └── EventHive (eventhive-1) [initiative] ★
```

**Legend:**
- ★ = Highlighted node

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
| MBA | nodes/trajectory/iimb/mba | mba-1 | artifact | Business Administration | ✓ | |
| MLOps & LLM Intelligence | nodes/industry-work/consulting/tata/mlops | mlops-1 | artifact | Enterprise ML Infrastructure | ✓ | ★ |
| Navigation & Discovery | nodes/industry-work/thoughtspot/navigation | tsnav-1 | artifact | UX Redesign | ✓ | |
| NCCU Exchange Taipei | nodes/trajectory/iimb/nccu-exchange | nccu-1 | artifact | International Exchange | ✓ | ★ |
| NFT Collection | nodes/spatial-perception/visual-practice/graphic-design/nft | nft-1 | artifact | Digital Art Collection | ✓ | ★ |
| Object Search | nodes/industry-work/thoughtspot/object-search | tsobjsearch-1 | artifact | Semantic Object Discovery | ✓ | |
| PII/DLP Guardrails | nodes/ai-systems/safety-evals/pii-dlp | piidlp-1 | artifact | Data Protection in AI | ✓ | |
| Photography | nodes/spatial-perception/visual-practice/photography | photo-1 | artifact | Visual Storytelling | ✓ | ★ |
| Policybazaar | nodes/industry-work/policybazaar | pb-path | path | InsurTech Platform | ✓ | |
| Product Work | nodes/industry-work | product-path | path | Professional Experience | ✓ | |
| RAG Pipelines | nodes/ai-systems/rag-pipelines | rag-path | path | Retrieval-Augmented Generation | ✓ | |
| Rudram Piplad | / | root-0 | (root) | Product & AI Builder | ✓ | |
| Safety & Evals | nodes/ai-systems/safety-evals | safety-path | path | AI Safety & Evaluation | ✓ | |
| Spatial & Perception | nodes/spatial-perception | spatial-path | path | XR & Human Perception Research | ✓ | |
| Taipei | nodes/photography/taipei | taipei-photo-1 | artifact | (Photography) | ✓ | |
| Tata Group | nodes/industry-work/consulting/tata | tata-path | path | Enterprise AI Strategy | ✓ | |
| Thesis: Photoacoustic Spectroscopy | nodes/trajectory/iitm/thesis | thesis-1 | research | Masters Research | ✓ | ★ |
| ThoughtSpot | nodes/industry-work/thoughtspot | ts-path | path | AI-Powered Analytics | ✓ | |
| Visual Practice | nodes/spatial-perception/visual-practice | visual-path | path | Photography & Design | ✓ | |
| Web Analytics | nodes/industry-work/policybazaar/analytics | webanalytics-1 | artifact | Data-Driven Optimization | ✓ | |
| XR Prototypes | nodes/spatial-perception/xr-prototypes | xrproto-path | path | Extended Reality Projects | ✓ | |
| Your Orders | nodes/industry-work/policybazaar/orders | orders-1 | artifact | Policy Management Dashboard | ✓ | ★ |

---

## Branch Summary

### Main Branches (Children of Root)

| Branch | Description | Child Nodes |
|--------|-------------|-------------|
| **Information** | Contact, education, achievements | 14 nodes |
| **AI Systems** | RAG, agents, safety/evals | 10 nodes |
| **Spatial & Perception** | VR/AR research, visual practice | 15 nodes |
| **Product Work** | ThoughtSpot, Policybazaar, consulting | 14 nodes |
| **Bets** | Startups (Caval, EventHive) | 3 nodes |

---

## Data Sources

This graph structure is stored in Supabase with the following tables:

- `nodes` - All 59 nodes with content and metadata
- `node_links` - 25 external links (GitHub, LinkedIn, etc.)
- `node_metadata` - 38 metadata items (impact metrics, technologies, etc.)
- `node_media` - 8 photography images
- `node_education` - 4 education entries
- `node_recognition` - 4 recognition/award entries
- `node_connections` - 7 cross-connections between nodes

### Fallback System

A fallback JSON file (`assets/data/portfolio.json`) mirrors this structure for offline availability.

---

## Node Content Details

### Root

#### Rudram Piplad (root-0)
- **Summary:** Product & AI Builder
- **Description:** I build products that involve AI, and I think a lot about why most AI products feel broken. The short answer: they violate trust. They hallucinate confidently. They retrieve irrelevant context. They optimize for metrics that don't align with user value.
- **Extended:** Currently PM at ThoughtSpot (AI-powered enterprise search), previously Policybazaar (15M monthly users). Started two companies. Engineering Design from IIT Madras (5 years, BTech + MTech), MBA from IIM Bangalore.

---

### Information Branch

#### Information (info-path)
- **Summary:** About & Contact
- **Description:** Personal information, contact details, and professional links.
- **Links:** LinkedIn, GitHub, Behance, Medium
- **Education:** IIM Bangalore (MBA, QS #31), IIT Madras (BTech+MTech Engineering Design)

#### Education (education-path)
- **Summary:** Academic background
- **Description:** My academic journey spanning engineering and management.

#### IIT Madras (iitm-path)
- **Summary:** B.Tech & Research
- **Description:** 5 years. BTech + MTech in Engineering Design with a specialization in Biomedical Design. This is where I learned to build things — physical and digital.
- **Extended:** Why engineering design instead of CS? Because I wanted to understand *how* things are made, not just *that* they work.

#### Engineering Design (engdes-1) `artifact`
- **Summary:** B.Tech Program
- **Description:** The department taught systems thinking. Products aren't features — they're systems of interactions. Users aren't users — they're people with contexts and constraints.

#### Thesis: Photoacoustic Spectroscopy (thesis-1) `research` ★
- **Summary:** Masters Research
- **Description:** Masters thesis under Dr. N.J. Vasa (Dean, IIT Madras). Using laser-induced photoacoustic signals for biomedical sensing—shining light at tissue and listening to the sound it makes.
- **Extended:** Learned how to work on a problem for 18 months without clear answers. How to design experiments that fail informatively. Research taught me patience and rigor.
- **Cross-connection:** → Spatial & Perception

#### IIM Bangalore (iimb-path)
- **Summary:** MBA
- **Description:** MBA, QS World Rank #31. Why an MBA after working as a PM? Because I hit a ceiling. I could ship products, but I couldn't shape strategy.

#### MBA (mba-1) `artifact`
- **Summary:** Business Administration
- **Description:** Two years of case studies, group projects, and questioning whether this was worth it. Verdict: yes, but not for the reasons I expected.
- **Extended:** The value wasn't the curriculum. It was the cohort — 400 people from different industries, different functions, different countries.

#### NCCU Exchange Taipei (nccu-1) `artifact` ★
- **Summary:** International Exchange
- **Description:** Exchange semester at National Chengchi University, Taiwan. FT MiM Rank #96. Curiosity about how tech ecosystems work outside Silicon Valley and Bangalore.
- **Extended:** Taiwan builds hardware that the rest of the world's software runs on. Key takeaway: "what if the constraint is the opportunity?"
- **Metadata:** Location: Taipei, Taiwan | Focus: East Asian tech ecosystems, Hardware startups

#### Contact Me (contact-1) `information`
- **Summary:** Get in Touch
- **Description:** Get in touch with me through any of these channels.
- **Links:** LinkedIn, GitHub, Behance, Medium, Email

#### Footnotes (footnotes-path)
- **Summary:** Achievements & Recognition
- **Description:** These aren't bragging rights. They're markers — moments where external validation confirmed (or surprised) me. Listed here for completeness, not prominence.
- **Note:** `is_secondary = true` (de-emphasized in UI)

#### HCL-CA TechJam (techjam-1) `recognition` ★
- **Summary:** National Tech Competition
- **Description:** Winner, 1 of 8,300 participants. Sydney. USD 3,000 prize. Funded by Cricket Australia and Microsoft.
- **Extended:** The lesson: hackathon wins are about scope management as much as technical skill.

#### ITC Interrobang (interrobang-1) `recognition` ★
- **Summary:** Case Competition
- **Description:** Runner-up, 2 of 600+ teams. Season 10. Pre-placement interview offer, ₹74,000 prize.
- **Extended:** An ideation challenge that taught me how to pitch. The winning idea wasn't my best idea — it was my most communicable idea.

#### GATE & JEE Ranks (gatejee-1) `recognition`
- **Summary:** Academic Achievements
- **Description:** All India Rank 113, GATE Biomedical Engineering 2020. All India Rank 77 (category), JEE Main Paper 2, 2016.
- **Extended:** Test scores. They opened doors. They don't define capability.

---

### AI Systems Branch

#### AI Systems (ai-path)
- **Summary:** Building Intelligent Systems
- **Description:** I've spent the last two years building AI systems that need to work in production — not demos, not prototypes, actual products where wrong answers cost money or trust.
- **Extended:** Most AI failures aren't capability failures, they're trust failures. This section is about RAG systems that actually retrieve relevant context, agents that know their boundaries, and evaluation frameworks that catch regressions before users do.

#### RAG Pipelines (rag-path)
- **Summary:** Retrieval-Augmented Generation
- **Description:** RAG is deceptively simple in theory: retrieve relevant chunks, feed them to an LLM, get better answers. In practice, every decision compounds.
- **Extended:** Built RAG systems at ThoughtSpot (enterprise scale) and in side projects. Lesson: naive RAG is easy to build and hard to trust.

#### GraphRAG (graphrag-1) `artifact` ★
- **Summary:** Knowledge Graph + RAG
- **Description:** Standard RAG felt like searching with a blindfold. Graph structures preserve relationships that chunking destroys.
- **Extended:** Started from scratch twice. Key insight: the graph isn't just for retrieval — it's for explaining why an answer exists.
- **Links:** [GitHub: graph-rag-trials](https://github.com/roseate8/graph-rag-trials)
- **Tech:** Neo4j, LangChain, OpenAI

#### Document Parsing (docparse-1) `artifact`
- **Summary:** Intelligent Document Processing
- **Description:** Before you can chunk, you need to parse. And parsing is where documents lie to you. PDFs claim to have structure but hide text in random order.
- **Extended:** Built a parser pipeline using Docling that handles PDF, PPT, XLSX. Goal: predictable failure modes. When parsing fails, fail loudly.
- **Links:** [GitHub: document-parser-for-rag](https://github.com/roseate8/document-parser-for-rag), [GitHub: doc-parsers](https://github.com/roseate8/doc-parsers)
- **Tech:** Docling, PyMuPDF, Unstructured, OCR

#### Chunking Strategies (chunking-1) `artifact`
- **Summary:** Semantic Text Chunking
- **Description:** The dirty secret of RAG: your chunking strategy matters more than your embedding model. Chunk too small and you lose context. Chunk too large and you dilute relevance.
- **Extended:** Tried recursive splitting, semantic chunking, parent-child hierarchies. Conclusion: hybrid approaches that preserve document structure outperform flat text processing.
- **Links:** [GitHub: chunking-strategy-experiments](https://github.com/roseate8/chunking-strategy-experiments)

#### AI Agents (agents-path)
- **Summary:** Autonomous AI Systems
- **Description:** Agents are having a moment. Most of what I see is demos — impressive loops that work on happy paths and fail silently on edge cases.
- **Extended:** Built two agent systems. Both taught the same lesson: agents need escape hatches and introspection.

#### Butler Expense Agent (butler-1) `artifact` ★
- **Summary:** Autonomous Expense Management
- **Description:** Travel expense tracking is annoying because it's contextual. A $50 meal might be business or personal depending on who you were with.
- **Extended:** Built a multi-agent system for categorization, policy checking, and anomaly detection. The interesting part: designing handoff protocols. Most agent demos show the happy path. The hard part is making the unhappy path graceful.
- **Links:** [GitHub: butler-travel-expense-agent](https://github.com/roseate8/butler-travel-expense-agent), [GitHub: expense-agents-ui-lovable](https://github.com/roseate8/expense-agents-ui-lovable)
- **Tech:** LangGraph, GPT-4, Tool Calling

#### AI Ethics Framework (ethics-1) `research`
- **Summary:** Responsible AI Guidelines
- **Description:** Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That's not ethics — that's compliance theater.
- **Extended:** Built a multi-agent evaluation system that asks hard questions about AI products. The uncomfortable part: running this on my own projects and finding problems I didn't want to see.
- **Links:** [GitHub: applied-ai-ethics](https://github.com/roseate8/applied-ai-ethics)
- **Cross-connection:** → Eval Framework

#### Safety & Evals (safety-path)
- **Summary:** AI Safety & Evaluation
- **Description:** Shipping AI without evals is shipping blind. The question isn't whether your model makes mistakes—it will. The question is whether you catch them before users do.

#### Eval Framework (evalframework-1) `artifact` ★
- **Summary:** LLM Evaluation System
- **Description:** At ThoughtSpot, I introduced groundedness and safety evals as release gates. The rule: if evals regress, the release doesn't ship.
- **Extended:** This was politically harder than technically hard. Engineers don't like gates. PMs don't like delays. But shipping regressions in production is worse.
- **Metrics:** nDCG@5, Recall@10, Latency p95
- **Cross-connection:** → Boundaryless / Enterprise Search

#### PII/DLP Guardrails (piidlp-1) `artifact`
- **Summary:** Data Protection in AI
- **Description:** Enterprise AI has a specific failure mode: leaking data that shouldn't be leaked. User asks a question, RAG retrieves a document they shouldn't see.
- **Extended:** Built PII redaction and DLP guardrails at ThoughtSpot. Cleared SOC 2 Type II with zero major findings. Design principle: guardrails should be invisible when working and loud when triggered.
- **Compliance:** SOC 2 Type II Certified

---

### Spatial & Perception Branch

#### Spatial & Perception (spatial-path)
- **Summary:** XR & Human Perception Research
- **Description:** Before I cared about AI trust, I cared about perceptual honesty. VR systems that make you sick are lying to your vestibular system.
- **Extended:** This was my research focus at IIT Madras. It shapes how I think about all interfaces.

#### Foveated Rendering & Gaze Tracking (foveat-1) `research` ★
- **Summary:** Eye-Tracking for VR Optimization
- **Description:** Human eyes have high resolution only at the fovea. Traditional rendering ignores this, computing every pixel at full resolution. Wasteful.
- **Extended:** Built a saccadic foveated rendering pipeline for VR using HTC Vive Pro Eye. Results: 57-70% compute reduction with no perceptible quality loss. Hard part: predicting where eyes would move next.
- **Links:** [GitHub: foveated-rendering-virtual-reality](https://github.com/roseate8/foveated-rendering-virtual-reality)
- **Lab:** IIT Madras VR Lab
- **Cross-connection:** ↔ XR Prototypes

#### Haptics Research (haptics-1) `research`
- **Summary:** Tactile Feedback Systems
- **Description:** Touch is the forgotten sense in computing. We've optimized visual fidelity for decades. Audio is good enough. But haptics? Still feels like vibration motors from 2010.
- **Extended:** Built an evaluation matrix for XR haptic feedback. Finding: +23% perceived responsiveness from optimizing feedback timing, not intensity.
- **Cross-connection:** → XR Prototypes

#### XR Prototypes (xrproto-path)
- **Summary:** Extended Reality Projects
- **Description:** The best way to understand perception is to build things that break it. These prototypes were my lab at IIT Madras.
- **Cross-connection:** ↔ Foveated Rendering

#### AED in VR (aedvr-1) `artifact` ★
- **Summary:** Emergency Training Simulator
- **Description:** Built a VR training simulation for automated external defibrillator (AED) use. Goal: train people to respond to cardiac emergencies without physical equipment.
- **Extended:** Learned more from failures than successes. Reverted all code at one point. What remained: understanding of how procedural memory works differently in VR.
- **Links:** [GitHub: automated-external-defibrillator-in-vr](https://github.com/roseate8/automated-external-defibrillator-in-vr)
- **Platform:** Unity, Oculus Quest

#### 3D Printing VR (print3d-1) `artifact`
- **Summary:** Spatial 3D Modeling
- **Description:** Can you design 3D-printable objects in VR more intuitively than in CAD software?
- **Extended:** Answer was nuanced. For ideation and rough shaping—yes, dramatically better. For precision work—no, CAD still wins. Interesting middle ground: start in VR to explore forms, export to CAD for refinement.
- **Links:** [GitHub: 3d-printing-in-vr](https://github.com/roseate8/3d-printing-in-vr)

#### AR Mobile Games (argames-1) `artifact`
- **Summary:** Location-Based AR
- **Description:** First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub. Used Git only locally.
- **Extended:** The games shipped. The codebase didn't survive.
- **Platform:** ARCore, Unity

#### Visual Practice (visual-path)
- **Summary:** Photography & Design
- **Description:** I don't separate "creative" from "technical." Photography taught me about attention. Illustration taught me about abstraction. Design taught me about systems.
- **Extended:** This isn't a hobby section. It's a different lens on the same questions.

#### Photography (photo-1) `artifact` ★
- **Summary:** Visual Storytelling
- **Description:** Street photography, portraits, and travel documentation. What draws me to certain subjects connects to my work on perception — where eyes go, what they ignore, what makes a moment worth preserving.

#### Taipei (taipei-photo-1) `artifact`
- **Description:** Photographs from exchange semester at NCCU in Taipei, Taiwan. Documents the blend of traditional and modern culture.
- **Media:** 5 photographs from Taipei

#### Bangalore (bangalore-photo-1) `artifact`
- **Description:** Photographs from Bangalore, India, capturing the vibrant life and landscapes of the Garden City.
- **Media:** 3 photographs from Bangalore

#### Graphic Design & Illustrations (graphicdesign-path)
- **Summary:** Visual Design Work
- **Description:** Design isn't decoration. It's communication with constraints. Every project here was about solving a problem visually.

#### E-Cell Magazine (ecell-1) `artifact`
- **Summary:** Editorial Design
- **Description:** Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+ designers, published the first entrepreneurship magazine at the institute.
- **Extended:** 30K+ copies printed. Design at scale is project management. The creative decisions were the easy part.
- **Role:** Chief Designer | **Team:** 5+ designers | **Circulation:** 30K+ copies

#### NFT Collection (nft-1) `artifact` ★
- **Summary:** Digital Art Collection
- **Description:** Minted 9+ digital art pieces on OpenSea during the Web3 wave. The art was real; the market was speculative.
- **Extended:** Creating for a market is different from creating for yourself. The NFT work that sold wasn't my best work — it was my most marketable work.
- **Links:** [OpenSea](https://opensea.io/rudrampiplad)

#### Behance Work (behance-1) `artifact`
- **Summary:** Design Portfolio
- **Description:** Curated collection of graphic design, branding, and illustration work. 3 featured projects.
- **Links:** [Behance](https://behance.net/roseate134)

---

### Product Work Branch

#### Product Work (product-path)
- **Summary:** Professional Experience
- **Description:** I've been a PM at two companies—Policybazaar (15M monthly users) and ThoughtSpot (enterprise BI). Different contexts, same job: figure out what actually matters, then make it happen.
- **Extended:** Most product failures aren't feature failures. They're trust failures. Users don't engage because they don't believe the product will do what it promises.

#### ThoughtSpot (ts-path)
- **Summary:** AI-Powered Analytics
- **Description:** ThoughtSpot is an AI-native BI platform. Users ask questions in natural language, the system generates queries, returns answers.
- **Scope:** Boundaryless, Navigation & Discovery, Object Search, Homepage
- **Extended:** AI in enterprise has different failure modes. Wrong answers lead to bad business decisions. A hallucinated number can cascade into a bad quarter.

#### Boundaryless / Enterprise Search (tsboundary-1) `artifact` ★
- **Summary:** AI-Powered Enterprise Search
- **Description:** Enterprise data is scattered. Boundaryless is ThoughtSpot's answer: search across everything, get answers regardless of where data lives.
- **Constraints:** <$0.004/query cost, >0.7 nDCG@5, 0.9 Recall@10, p95 latency <5s
- **Extended:** Shipped via rethink policy and aggressive caching. Evaluated vector DB vendors, negotiated SLAs, landed on hybrid approach saving ~25% on projected costs.

#### Navigation & Discovery (tsnav-1) `artifact`
- **Summary:** UX Redesign
- **Description:** How do users find what they're looking for in an enterprise tool with thousands of objects?
- **Extended:** Overhauled frontend and backend navigation. Standardized product list pages. Result: 20% faster time-to-discovery.
- **Impact:** 20% faster time to discovery

#### Object Search (tsobjsearch-1) `artifact`
- **Summary:** Semantic Object Discovery
- **Description:** Beyond answering questions, users need to find things — dashboards, reports, data sources.

#### Homepage (tshome-1) `artifact`
- **Summary:** Personalized Landing Experience
- **Description:** The old homepage showed what you'd already seen, not what you needed next.
- **Extended:** New homepage surfaces relevant content based on behavior, role, and what's trending. Not personalization theater—actual signal-based recommendations with explainable logic.

#### Policybazaar (pb-path)
- **Summary:** InsurTech Platform
- **Description:** India's largest insurance aggregator. 15M monthly users. Part of CEO's office, leading 7 agile teams on 3-year product strategy.
- **Extended:** Insurance is confusing. Users don't know what they need. The job was making complexity manageable without dumbing it down.

#### Your Orders (orders-1) `artifact` ★
- **Summary:** Policy Management Dashboard
- **Description:** Insurance customers buy a policy and forget about it. Every support call costs money.
- **Extended:** Built "Your Orders" self-service portal. Saved ₹10M+ in support costs. 170% increase in engagement.
- **Impact:** Saved ₹10M+ in support costs, +170% engagement

#### Web Analytics (webanalytics-1) `artifact`
- **Summary:** Data-Driven Optimization
- **Description:** When I joined, web analytics had 60% discrepancy between reported and actual numbers. Marketing was making decisions on fiction.
- **Extended:** Formed team of 15+, overhauled analytics infrastructure. Cut discrepancies to <10%. Saved ₹6.5M+ in wasted spend.
- **Impact:** Saved ₹6.5M+, team of 15+

#### Growth & Mobile App (growthmobile-1) `artifact`
- **Summary:** Mobile-First Growth
- **Description:** Mobile deployment was broken. Streamlined release process—50% adoption increase, ₹25M+ revenue attributed.
- **Extended:** Ran A/B tests on upselling—21% higher conversion, ₹75M+ generated. Prototyped NLP analysis of support tickets, cut turnaround by 40%.
- **Impact:** ₹25M+ mobile, ₹75M+ upselling, +50% adoption
- **Cross-connection:** → RAG Pipelines

#### Consulting (consulting-path)
- **Summary:** Strategic Advisory
- **Description:** Consulting is a different muscle. You don't own the roadmap. You give recommendations and hope they stick.
- **Extended:** The value: pattern matching across companies. The limit: influence without authority.

#### Tata Group (tata-path)
- **Summary:** Enterprise AI Strategy
- **Description:** Summer associate at TCS, CPG & Retail practice. Management consulting, not product management.

#### MLOps & LLM Intelligence (mlops-1) `artifact` ★
- **Summary:** Enterprise ML Infrastructure
- **Description:** Authored competitive intelligence reports on MLOps platforms and LLM capabilities.
- **Extended:** Proposed RFP template revisions targeting 12% cost savings. Finding: most RFPs over-specified requirements creating artificial vendor lock-in.
- **Target:** 12% cost savings in RFPs

#### AI Maturity Model (aimaturity-1) `artifact`
- **Summary:** Organizational Assessment
- **Description:** Built a three-part digital maturity model to assess enterprise AI readiness. Helped sales have AI conversations with CIOs.
- **Extended:** Most enterprises want to "do AI" but can't articulate what that means. The model gave them vocabulary.
- **Impact:** +15% AI adoption in proposals

#### Chisel Labs (chisel-path)
- **Summary:** Product Strategy
- **Description:** Product consulting for a pre-Series A SaaS startup. Paid engagement with actual deliverables.

#### Global SaaS GTM (gtm-1) `artifact` ★
- **Summary:** Go-to-Market Strategy
- **Description:** Designed go-to-market strategy for international expansion. Built post-trial conversion playbook.
- **Extended:** Focused on activation metrics—getting trial users to the "aha moment" faster. Forecasted 20% ARR uplift.
- **Forecast:** 20% ARR uplift

---

### Bets Branch

#### Bets (bets-path)
- **Summary:** Entrepreneurial Ventures
- **Description:** Bets are different from jobs. You don't have product-market fit handed to you. You have an idea and the willingness to be wrong publicly.
- **Extended:** I've made two bets. One worked (sort of). One didn't (but taught me more).

#### Caval (caval-1) `initiative` ★
- **Summary:** Vehicle Services Startup
- **Description:** Vehicle servicing is broken. You don't know if you're being overcharged. You trust mechanics because you have no choice.
- **Extended:** Co-founded Caval. Transparent pricing, tracked service history, user ratings. ₹5L revenue, 4K+ users, 4.6 Play Store rating. I led design. What didn't work: unit economics at scale. CAC too high for transaction value.
- **Revenue:** ₹5 Lakhs | **Users:** 4K+, 4.6 rating | **Role:** Co-founder, Design Lead

#### EventHive (eventhive-1) `initiative` ★
- **Summary:** Event Tech Platform
- **Description:** Event hosting platforms are either too simple (Google Forms) or too complex (6-month enterprise implementations). EventHive was the middle ground.
- **Extended:** Co-founded at IIT Madras. Built ticketing, attendee management, check-in systems. Raised ₹30L. What didn't work: timing. Built as event market was recovering post-COVID.
- **Funding:** ₹30 Lakhs Pre-Incubation | **Incubator:** IIT Madras Incubation Cell
