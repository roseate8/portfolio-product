# Portfolio Content Specification

## Part 1: Node Type Definitions

| Type | Definition | Visual Treatment | Example |
|------|------------|------------------|---------|
| **path** | A navigational cluster that groups related work under a theme. Lightweight — exists to organize, not to showcase. | Numbered circle in graph | AI Systems, Product Work, RAG Pipelines |
| **artifact** | Something concrete I built or shipped. Has clear inputs, outputs, and (usually) impact. | Solid hexagon | GraphRAG, Your Orders, Boundaryless |
| **research** | Exploratory work without a predetermined outcome. Academic or experimental. | Research icon | Foveated Rendering, Thesis, AI Ethics Framework |
| **initiative** | A bet I made — ventures with uncertain outcomes where I had equity/founding stake. | Initiative icon | Caval, EventHive |
| **recognition** | External validation — awards, ranks, competitive achievements. | Recognition icon | HCL-CA TechJam, ITC Interrobang |
| **information** | Meta-content about me, not my work. Contact, links, credentials. | Info icon | Contact Me, Email, LinkedIn |

---

## Part 2: Subsection Schema by Type

### path
**Purpose:** Orient the visitor. Explain what this cluster contains and why it's grouped together.

| Subsection | Required | Field Mapping | Notes |
|------------|----------|---------------|-------|
| Overview | Yes | `description` | 2-4 sentences. What is this branch about? |
| What's Here | Optional | `extended_description` | Only if child nodes aren't self-explanatory |

**No metadata, no links.** Paths are lightweight.

---

### artifact
**Purpose:** Show what I built, why, and what happened.

| Subsection | Required | Field Mapping | Notes |
|------------|----------|---------------|-------|
| Context | Yes | First part of `description` | Why does this exist? What problem? |
| What I Built | Yes | Second part of `description` | The actual work, approach |
| Outcome | If available | `extended_description` or Metadata | Results, metrics, impact |
| Stack/Tech | If relevant | `node_metadata` | Technologies, tools |
| Links | If available | `node_links` | GitHub, demos, etc. |

**For thin artifacts** (small side projects): Context + Links only.
**For deep artifacts** (major work): All subsections.

---

### research
**Purpose:** Show exploratory thinking and what I learned from it.

| Subsection | Required | Field Mapping | Notes |
|------------|----------|---------------|-------|
| Context | Yes | First part of `description` | What question was I investigating? |
| Approach | Optional | Second part of `description` | Methodology, how I explored |
| Findings | Yes | `extended_description` | What I discovered or learned |
| Abstract | Only for thesis | Separate section in `description` | Formal academic abstract |
| Links | If available | `node_links` | Papers, code |

---

### initiative
**Purpose:** Show entrepreneurial judgment — what I bet on and what I learned.

| Subsection | Required | Field Mapping | Notes |
|------------|----------|---------------|-------|
| Problem | Yes | First part of `description` | What market/user problem? |
| What We Built | Yes | Second part of `description` | The solution, my role |
| Outcome | Yes | `extended_description` | Traction, revenue, users |
| Lessons | Yes | End of `extended_description` | What didn't work, what I'd do differently |
| Metrics | If available | `node_metadata` | Revenue, users, rating |

---

### recognition
**Purpose:** Acknowledge achievements without overselling.

| Subsection | Required | Field Mapping | Notes |
|------------|----------|---------------|-------|
| Overview | Yes | `description` | What was this, what did I do? |
| Result | Yes | `node_recognition` table | Position, prize |
| Context | Optional | `extended_description` | What I learned from it |

**Keep these simple.** The metadata does the heavy lifting.

---

### information
**Purpose:** Provide meta-content and contact details.

| Subsection | Required | Field Mapping | Notes |
|------------|----------|---------------|-------|
| Overview | Yes | `description` | Brief orienting text |
| Details | If applicable | `node_metadata` or `node_education` | Structured info |
| Links | Yes | `node_links` | Contact links, profiles |

---

## Part 3: Complete Node Inventory

### Root Node

#### Rudram Piplad (root-0)
**Type:** (root — unique)
**Status:** ✅ KEEP
### Information Branch
#### Information (info-path)
**Type:** path
#### Education (education-path)
**Type:** path
**Status:** 🔄 REWRITE

| Subsection | Content |
|------------|---------|
| **Overview** | Dual degree from IIT Madras (Engineering Design, Biomedical). MBA from IIM Bangalore. The first taught me to build; the second taught me why building alone isn't enough. |

**Metadata:** Keep the existing structured education entries — they display well.

---

#### IIT Madras (iitm-path)
**Type:** path
**Status:** 🔄 MINOR EDIT

| Subsection | Content |
|------------|---------|
| **Overview** | 5 years. BTech + MTech in Engineering Design with a specialization in Biomedical Design. Why engineering design instead of CS? I wanted to understand *how* things are made, not just *that* they work. This is where I learned to build—physical and digital. |

**Change:** Merged the extended description into main. Remove separate extended_description.

---

#### Engineering Design (engdes-1)
**Type:** artifact
**Status:** ✅ KEEP (minor)

| Subsection | Content |
|------------|---------|
| **Context** | The department taught systems thinking. Products aren't features—they're systems of interactions. |
| **Education** | B.Tech Engineering Design, IIT Madras, 2016-21 |

**Note:** This is thin but appropriate — it's a credential node, not a project showcase.

---

#### Thesis: Photoacoustic Spectroscopy (thesis-1)
**Type:** research
**Status:** 🔄 ADD SUBSECTION

| Subsection | Content |
|------------|---------|
| **Context** | Feasibility Study on Broadband Photoacoustic Techniques for Human Breath Analysis. <br><br>Masters thesis under Dr. N.J. Vasa (Dean, IIT Madras) |
| **Abstract** | Exhaled breath gas has always been a matrix of interest for disease monitoring and diagnostics, owing to its inherently non-invasive access. A feasibility study was performed using photoacoustic spectroscopy, in conjunction with low power (1 nW) broadband supercontinuum laser, to analyse NH3 in human breath samples. Based on literature survey, the limit of detection for Ammonia was defined as up to 0.012 ppm in the 1500-1600 nm bandwidth. Similar computations were done for H2O vapour, CO, CH4, and CO2. A hypothesized Michelson Interferometer arrangement was proposed for measuring phase change and refractive index caused by photoacoustic and absorption effects. |
| **What I Learned** | The technical details matter less than what this taught me: how to work on a problem for 18 months without clear answers. Research taught me patience that product management often doesn't require. |

**Metadata:**
- Advisor: Dr. N.J. Vasa (Dean, IIT Madras)

**Connection:** → spatial-path

---

#### IIM Bangalore (iimb-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | MBA, QS World Rank #31. Why an MBA after working as a PM? Because I hit a tiny ceiling. I could ship products, but I couldn't shape strategy. |

---

#### MBA (mba-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Two years of case studies, group projects, and questioning whether this was worth it. Verdict: maybe or maybe not, but not for the reasons I expected. |
| **What I Learned** | The value wasn't the curriculum. It's mostly the people from different industries, different functions, different countries. But more often than not I also call it, in words of my own professor, just a glorified career fair. |

---

#### NCCU Exchange Taipei (nccu-1)  
**Type:** Artifact  
**Status:** ✅ KEEP  

| Subsection | Content |  
|------------|---------|  
| **Context** | Exchange semester at National Chengchi University, Taiwan (FT MiM Rank #96). I chose Taiwan to explore how tech ecosystems evolve outside Silicon Valley and Bangalore. East Asian culture had always fascinated me, and the semester turned out to be a deeply rewarding experience. |  
| **What I Learned** | Beyond academics, I immersed myself in photography—the city and landscapes were stunning. I also discovered a new perspective on the link between manufacturing and innovation. |  
| **Courses** |  
- **Media and Entertainment Laws**: Examined Asian perspectives on media regulation and their interaction with Western frameworks. The professor, a Taiwanese scholar trained in the US, made the subject engaging—even unexpected topics like adult content (porn) laws were surprisingly insightful from a legal standpoint.  
- **IIoT Applications**: Offered a deep dive into Taiwan’s industrial backbone. The course highlighted how IIoT drives the nation’s economy. I attended several conferences, though fluency in Chinese would have made the experience richer.  
- **Human-Computer Interaction Design**: A fundamentals-driven course in product design. The professor had previously led design at HTC during its peak Android era, making the sessions especially inspiring. |  

**Metadata:**  
- Location: Taipei, Taiwan  
- Focus: East Asian tech ecosystems, Hardware startups  

---

#### Footnotes (footnotes-path)
**Type:** information (changed from path)
**Status:** 🔄 RESTRUCTURE — collapse children into parent

| Subsection | Content |
|------------|---------|
| **Summary** | Achievements & Recognition |
| **Overview** | These aren't bragging rights. They're markers—moments where external validation confirmed (or surprised) me. |

**Achievements** (rendered as structured list with category headers):

**International**
- **HCL-CA TechJam** — Winner, 1/8300. Sydney. USD 3,000. Cricket Australia & Microsoft. (2021)
- **Science Olympiad** — Global Rank 159 NSO. Global Rank 584 NCO. A2 Math Talent Search. (2013)

**Competitions**
- **ITC Interrobang S10** — 1st Runner-up, 2/600+. Led team of 4. ₹74,000 + PPI. (2020)
- **Prodylitics, IIM Indore** — National Winner, 1/600+. ₹5,000. Ed-Tech retention strategy. (2023)
- **Finvent, IIT Madras** — Winner, 1/30K+. Financial literacy GTM strategy. (2017)
- **CuriousJr Teardown** — Finalist, The Product Folks. PPI offer. Consulted founders. (2023)

**Academic**Q
- **GATE Biomedical** — All India Rank 113. (2020)
- **JEE Main Paper 2** — Category All India Rank 77. (2016)

**Speaking & Leadership**
- **AR/VR Keynote** — 4 seminars, 6 hours total. 300+ attendees. Unity development. ONGC. (2019)
- **Emerging Leader** — 1/250+ at Policybazaar. Cross-functional collaboration. ₹7,000. (2023)
- **Creativity for a Cause** — Donated 25+ artworks. Raised ₹1.2 Lakh for Vikansana. (2024)

**Nodes to Delete** (content absorbed into parent):
- `techjam-1` (HCL-CA TechJam)
- `interrobang-1` (ITC Interrobang)
- `gatejee-1` (GATE & JEE Ranks)

---

### AI Systems Branch

#### AI Systems (ai-path)
**Type:** path
**Status:** 🔄 REWRITE

**Current (wrong):**
> "I've spent the last two years building AI systems that need to work in production—not demos, not prototypes, actual products where wrong answers cost money or trust."

**Problem:** This describes your ThoughtSpot work, not this branch. This branch is side projects where you test ideas *before* they go to production.

**Rewrite:**

| Subsection | Content |
|------------|---------|
| **Overview** | Before I ship AI features at work, I build them here first. This is my testing ground—side projects where I figure out what actually works versus what sounds good in a design doc. |
| **What's Here** | RAG architectures, agent systems, evaluation frameworks. The production versions live in Product Work. These are the messy prototypes that taught me why the production versions work. |
---

#### RAG Pipelines (rag-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | RAG is deceptively simple in theory: retrieve relevant chunks, feed them to an LLM, get better answers. In practice, every decision compounds. |
| **What's Here** | I've built RAG systems at ThoughtSpot (enterprise scale, real SLAs) and in side projects. The lesson: naive RAG is easy to build and hard to trust. |

---

#### GraphRAG (graphrag-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Standard RAG felt like searching with a blindfold—you get results, but you don't know why they're connected. |
| **What I Built** | Knowledge graph-augmented retrieval. Entities and relationships extracted from documents, stored in a graph database, queried alongside vector search. |
| **Outcome** | I started from scratch twice. The first attempt was a graveyard of half-working ideas. The second attempt (graph-rag-trials) actually deployed. |

**Metadata:**
- Technologies: Neo4j, LangChain, OpenAI

**Links:**
- GitHub: https://github.com/roseate8/graph-rag-trials

---

#### Document Parsing (docparse-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Before you can chunk, you need to parse. And parsing is where documents lie to you. PDFs claim to have structure but hide text in random order. |
| **What I Built** | Parser pipeline using Docling that handles PDF, PPT, XLSX. The goal wasn't perfect parsing—it was predictable failure modes. |

**Metadata:**
- Technologies: Docling, PyMuPDF, Unstructured, OCR

**Links:**
- GitHub: document-parser-for-rag: https://github.com/roseate8/document-parser-for-rag
- GitHub: doc-parsers: https://github.com/roseate8/doc-parsers

---

#### Chunking Strategies (chunking-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | The dirty secret of RAG: your chunking strategy matters more than your embedding model. Chunk too small and you lose context. |
| **What I Built** | Tried recursive splitting, semantic chunking, parent-child hierarchies. Hybrid approaches that preserve document structure outperform anything that treats documents as flat text. |

**Links:**
- GitHub: https://github.com/roseate8/chunking-strategy-experiments

---

#### AI Agents (agents-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Agents are having a moment. Most of what I see is demos—impressive loops that work on happy paths and fail silently on edge cases. |
| **What's Here** | I've built two agent systems: one for expense tracking, one for AI ethics evaluation. Both taught me the same lesson: agents need escape hatches. |

---


### Butler Expense Agent (butler-1)
**Type:** artifact
**Status:** 🔄 REWRITE (significant expansion)

**Current:**
> "Travel expense tracking is annoying because it's contextual. A $50 meal might be business or personal depending on who you were with."

**Problem:** Too thin. You have a great LinkedIn post with much richer detail about the problem, solution, and design thinking.

**Rewrite:**

| Subsection | Content |
|------------|---------|
| **Context** | After every business trip, you spend 45 minutes matching receipts to transactions, guessing categories, and hoping you didn't violate some policy buried in a PDF. It's administrative tax on your time. I wanted to test what happens when the agent creates the expense report and humans just review it. |
| **What I Built** | Multi-agent system that pulls from corporate card feeds, matches email receipts, checks calendar context (MCP connectors), and validates against actual policy rules (agentic RAG). When you open the app after a trip, the report is already drafted. You review in 2 minutes instead of 45, clarify ambiguous items through conversation, and submit. Separate agents handle transaction processing, policy validation, and report generation. |
| **Design Challenge** | The core problem is trust. The agent needs to show its work—which transactions it found, why it categorized them a certain way, where it's confident vs. where it needs your input. That transparency is what separates useful automation from black-box risk. |
| **Competitive Landscape** | Looked at how Brex, Ramp, Coupa, and Navan approach this. They're doing smart things with real-time spend visibility and policy enforcement. But they're still built around the assumption that humans create expense reports. Different trust model, different architecture. |

**Metadata:**
- Stack: LangGraph, GPT-4, MCP Connectors, Tool Calling
- Time saved: 45min → 2min review

**Links:**
- GitHub: butler-travel-expense-agent: https://github.com/roseate8/butler-travel-expense-agent
- GitHub: expense-agents-ui-lovable: https://github.com/roseate8/expense-agents-ui-lovable


---


### AI Ethics Framework (ethics-1)
**Type:** research
**Status:** 🔄 REWRITE (significant expansion)

**Current:**
> "Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That's not ethics—that's compliance theater."

**Problem:** The hook is good, but you have much richer detail about the architecture and purpose. This is actually one of your most sophisticated side projects — the multi-agent design with philosophy RAG deserves more space.

**Rewrite:**

| Subsection | Content |
|------------|---------|
| **Context** | Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That's not ethics—that's compliance theater. I wanted to build something for PMs and founders who care about ethics but don't have philosophy degrees—something that surfaces blind spots before users find them. |
| **Who It's For** | The PM who's read a few books and wants to practice what they preach but doesn't know *how*. The founder who thinks ethics is mostly PR theater but has seen enough blowups to want a sanity check. The builder who just realized their recommendation algorithm might have a bias problem and needs to think through it *now*. |
| **Architecture** | Multi-agent system with four specialized agents: **Interpreter** (parses the philosophical problem from your product description), **Cartographer** (maps to relevant philosophical territory via Stanford Encyclopedia of Philosophy RAG), **Dialectician** (runs multi-perspective analysis—Kantian, consequentialist, virtue ethics), and **Pragmatist** (grounds analysis in actionable product decisions). The agents are adversarial by design. |
| **Design Philosophy** | The goal isn't verdicts. Ethics isn't a checkbox. The agent should provoke thinking, not replace it. North star metric: "blind spots surfaced"—did we shift the user's perspective? Avoiding at all costs: moralizing tone. The moment it feels like a lecture, we've lost. |

**Metadata:**
- Architecture: Multi-agent (Interpreter → Cartographer → Dialectician → Pragmatist)
- Knowledge Source: Stanford Encyclopedia of Philosophy (RAG)
- Goal: Surface blind spots, not give verdicts

**Links:**
- GitHub: https://github.com/roseate8/applied-ai-ethics

**Connection:** → evalframework-1


---

#### Safety & Evals (safety-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Shipping AI without evals is shipping blind. The question isn't whether your model makes mistakes—it will. The question is whether you catch them before users do. |

---

#### Eval Framework (evalframework-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Lately, I am working on setting up the evals to introduce groundedness and safety evals as potential release gates. The rule: if evals regress, the release doesn't ship. |
| **Outcome** | While seemingly obvious that one would build such a thing, this is turning out to be politically harder than technically hard. Engineers don't like gates. PMs don't like delays. Metrics that mattered: nDCG@5 for retrieval quality, recall@10 for coverage. |

**Metadata:**
- Metrics: nDCG@5, Recall@10, Latency p95, hallucinations, groundedness, tone

**Connection:** → tsboundary-1

---

#### PII/DLP Guardrails (piidlp-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Enterprise AI has a specific failure mode: leaking data that shouldn't be leaked. User asks a question, RAG retrieves a document they shouldn't see. |
| **What I am building** | PII redaction and DLP guardrails before augmenting data with the LLM. Shipped moderation layers. |
| **Outcome** | Hoping to reach SOC 2 Type II with zero major findings. |

---

### Spatial & Perception Branch

#### Spatial & Perception (spatial-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Before I cared about AI trust, I cared about perceptual honesty. VR systems that make you sick are lying to your vestibular system. |
| **What's Here** | This was my research focus at IIT Madras. It shapes how I think about all interfaces—digital or physical. |

---

#### Saccadic Foveated Rendering for VR (foveat-1)

**Type:** research
**Summary:** Saccadic Foveated Rendering for VR (using HTC Vive Pro Eye VR headset)

| Subsection | Content |
|------------|---------|
| **Context** | VR has a compute problem. Rendering high-fidelity graphics to a headset at 90fps requires GPU resources most hardware can't spare. But here's the thing: you don't need to render everything at full quality. Human eyes have high resolution only at the fovea—the tiny central region of your vision. Peripheral vision is blurry by design. So why render what you can't see? |
| **Approach** | Built a rendering pipeline in Unity for the HTC Vive Pro Eye that dynamically adjusts detail based on where you're looking. The pipeline integrates Tobii eye-tracking to capture gaze position, then shifts rendering quality in real-time—high detail at fixation, lower detail in the periphery. The "saccadic" part matters: the system anticipates rapid eye movements between fixation points and adjusts accordingly. |
| **Findings** | 57% reduction in GPU load. Average shading rate of just 16%. No perceptible quality loss—users couldn't tell the difference. The insight I keep returning to: the most efficient systems aren't the ones that do more. They're the ones that respect how humans actually perceive. |

**Metadata:**
- Lab: IIT Madras Haptics Lab
- Platform: HTC Vive Pro Eye, Tobii Eye-Tracking, Unity, Shader Models, Computer Graphics
- Result: 57% GPU reduction at 16% shading rate

**Links:**
- GitHub: https://github.com/roseate8/foveated-rendering-virtual-reality

**Connection:** → xrproto-path
---
#### Haptics Research (haptics-1)
**Type:** research
**Status:** 🔄 REWRITE

| Subsection | Content |
|------------|---------|
| **Context** | How do you teach someone to use a defibrillator without a real emergency? The answer is simulation—but VR training falls apart when the physical feedback is wrong. Placing electrode pads on a chest, feeling the "clear" moment before shock delivery, the resistance during CPR compressions—these aren't visual cues. They're haptic. |
| **What I Built** | Designed and implemented the haptic feedback system for an AED training simulator in Unity. The focus: making pad placement and shock delivery feel consequential, not abstract. Extended the simulation to include CPR chest compressions with resistance feedback calibrated to realistic depth targets. |
| **Findings** | The insight wasn't about hardware—it was timing. Haptic feedback delayed by even 50ms breaks the illusion. Optimizing feedback synchronization improved trainee confidence scores by ~30% compared to visual-only cues. The body knows when something feels wrong before the mind does. |

**Metadata:**
- Platform: Unity, HTC Vive
- Focus: AED pad placement, shock delivery, CPR feedback
- Result: ~30% improvement in trainee confidence with synchronized haptics

**Connection:** → aedvr-1, xrproto-path

---

#### XR Prototypes (xrproto-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | The best way to understand perception is to build things that break it. These prototypes were my lab at IIT Madras—quick builds to test ideas. |

**Connection:** → foveat-1

---

#### AED in VR (aedvr-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Built a VR training simulation for automated external defibrillator (AED) use. The goal: train people to respond to cardiac emergencies without needing actual emergencies. |
| **What I Built** | Full training flow in Unity for Oculus Quest. |
| **Outcome** | Learned more from failures than successes. Reverted all code at one point. What remained: understanding of how procedural memory works differently in VR vs. reading instructions. |

**Metadata:**
- Platform: Unity, Oculus Quest

**Links:**
- GitHub: https://github.com/roseate8/automated-external-defibrillator-in-vr

---

#### 3D Printing VR (print3d-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Can you design 3D-printable objects in VR more intuitively than in CAD software? |
| **Findings** | For ideation and rough shaping—yes, dramatically better. For precision work—no, CAD still wins. The interesting middle ground: start in VR, export to CAD for refinement. |

**Links:**
- GitHub: https://github.com/roseate8/3d-printing-in-vr

---

#### AR Mobile Games (argames-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub. |
| **Outcome** | The games shipped. The codebase didn't survive. |

**Metadata:**
- Platform: ARCore, Unity
- Status: Code missing, lessons learned

---

#### Visual Practice (visual-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | I don't separate "creative" from "technical." Photography taught me about attention—where eyes go, what they ignore. |
| **What's Here** | This isn't a hobby section. It's a different lens on the same questions. |

---

#### Photography (photo-1)
**Type:** artifact
**Status:** 🔄 REWRITE

| Subsection | Content |
|------------|---------|
| **Context** | I photograph what holds attention. Street scenes, portraits, places. The camera forces a question I carry into product work: what earns a second look? |

**Current (remove):** "Street photography, portraits, and travel documentation capturing moments and stories. What draws me to certain subjects connects to my work on perception."

---

#### Taipei (taipei-photo-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Photography from Taipei, Taiwan during MBA exchange program |
| **Context** | A collection of photographs captured during my exchange semester at National Chengchi University (NCCU) in Taipei, Taiwan. |

**Media:** 5 images

---

#### Bangalore (bangalore-photo-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Photography from Bangalore, India |
| **Context** | Photographs from Bangalore, capturing the vibrant life and landscapes of the Garden City. |

**Media:** 3 images

---

#### Graphic Design & Illustrations (graphicdesign-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Design isn't decoration. It's communication with constraints. Every project here was about solving a problem visually. |

---

#### NFT Collection (nft-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Minted 9+ digital art pieces on OpenSea during the Web3 wave. The art was real; the market was speculative. |
| **What I Learned** | The NFT work that sold wasn't my best work—it was my most marketable work. That's a useful distinction. |

**Metadata:**
- Pieces: 9+ minted

**Links:**
- OpenSea: https://opensea.io/rudrampiplad

---

#### E-Cell Magazine (ecell-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+, published the first entrepreneurship magazine at the institute. |
| **Outcome** | 30K+ copies printed and distributed. What I learned: design at scale is project management. |

**Metadata:**
- Role: Chief Designer
- Circulation: 30K+ copies
- Team: 5+ designers

---

#### Behance Work (behance-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Curated collection of graphic design, branding, and illustration work. 3 featured projects. |

**Links:**
- Behance Profile: https://behance.net/roseate134

---

### Product Work Branch

#### Product Work (product-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | I've been a PM at two companies—Policybazaar (15M monthly users, insurance) and ThoughtSpot (enterprise BI, AI-native search). |
| **What's Here** | The thing I keep returning to: most product failures aren't feature failures. They're trust failures. |

---

#### ThoughtSpot (ts-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | ThoughtSpot is an AI-native BI platform. Users ask questions in natural language, the system generates queries, returns answers. |
| **What's Here** | The interesting problem: AI in enterprise has different failure modes than consumer AI. Wrong answers don't just frustrate—they lead to bad business decisions. |

---

#### Boundaryless / Enterprise Search (tsboundary-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Enterprise data is scattered across warehouses, lakehouses, spreadsheets, third-party tools. Boundaryless is ThoughtSpot's answer: search across everything. |
| **What I Owned** | The agentic RAG implementation. |
| **Constraints & Results** | <$0.004/query cost, >0.7 nDCG@5, 0.9 Recall@10, p95 latency under 5s. Shipped via rethink policy and aggressive caching. |

**Metadata:**
- Role: Product Manager
- Constraints: <$0.004/query, >0.7 nDCG@5

---

#### Navigation & Discovery (tsnav-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | How do users find what they're looking for in an enterprise tool with thousands of objects? The answer isn't just search. It's structure. |
| **What I Built** | Overhauled the frontend and backend of ThoughtSpot's navigation systems. |
| **Outcome** | 20% faster time-to-discovery in user testing. |

**Metadata:**
- Impact: 20% faster time to discovery

---

#### Object Search (tsobjsearch-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Beyond answering questions, users need to find things—dashboards, reports, data sources. Object search is that problem. |

---

#### Homepage (tshome-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | The homepage is the first thing users see after login. At ThoughtSpot, the old homepage was a list of recent items. Functional, but not useful. |
| **What I Built** | Overhauled both frontend and backend. The new homepage surfaces relevant content based on user behavior, role, and what's trending. |

---

#### Policybazaar (pb-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Policybazaar is India's largest insurance aggregator. 15M monthly users. I was part of the CEO's office, leading 7 agile teams on a 3-year product strategy. |
| **What's Here** | The challenge: insurance is confusing. Users don't know what they need. The job was making complexity manageable without dumbing it down. |

---

#### Your Orders (orders-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Insurance customers have a problem: they buy a policy and then forget about it. When they need to make a claim, they call customer support. |
| **What I Built** | "Your Orders"—a self-service portal for managing insurance policies. |
| **Outcome** | Saved ₹10M+ in customer support costs. 170% increase in engagement. |

**Metadata:**
- Impact: Saved ₹10M+ in support costs
- Engagement: +170% policy management

---

#### Web Analytics (webanalytics-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | When I joined Policybazaar, web analytics had a 60% discrepancy between reported and actual numbers. Marketing was making budget decisions on fiction. |
| **What I Built** | Formed a team of 15+, overhauled the entire analytics infrastructure. |
| **Outcome** | Cut discrepancies to under 10%. Saved ₹6.5M+ in wasted spend. |

**Metadata:**
- Impact: Saved ₹6.5M+ in wasted spend
- Team: 15+ members

---

#### Growth & Mobile App (growthmobile-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Mobile deployment was broken. |
| **What I Built** | Streamlined the release process. Also ran A/B tests for upselling flows. Prototyped NLP analysis of customer support tickets. |
| **Outcome** | 50% increase in adoption within two weeks, attributed ₹25M+ revenue. 21% higher upsell conversion, ₹75M+ generated. |

**Metadata:**
- Revenue: ₹25M+ from mobile, ₹75M+ from upselling
- Adoption: +50% in 2 weeks

**Connection:** → rag-path

---

#### Consulting (consulting-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Consulting is a different muscle than product management. You don't own the roadmap. You give recommendations and hope they stick. |
| **What's Here** | I've done management consulting (Tata Group) and product consulting (Chisel Labs). Different contexts, same lesson: clarity of recommendation matters more than depth of analysis. |

---

#### Tata Group (tata-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Summer associate at TCS, CPG & Retail practice. Management consulting, not product management. |

---

#### MLOps & LLM Intelligence (mlops-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Authored competitive intelligence reports on MLOps platforms and LLM capabilities for TCS's CPG & Retail practice. |
| **Outcome** | Proposed revisions to RFP templates. Targeted 12% cost savings. The analysis shaped how I think about vendor evaluation. |

**Metadata:**
- Target: 12% cost savings in RFPs

---

#### AI Maturity Model (aimaturity-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Built a three-part digital maturity model to assess enterprise AI readiness. The framework helped sales teams have AI conversations with CIOs. |
| **Outcome** | 15% increase in AI adoption recommendations in proposals. The model became a standard tool for the practice. |

**Metadata:**
- Impact: +15% AI adoption in proposals

---

#### Chisel Labs (chisel-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Product consulting for a pre-Series A SaaS startup. Paid engagement, not advisory board—actual deliverables with deadlines. |
| **What's Here** | The ask: help them think through international expansion and post-trial conversion. |

---

#### Global SaaS GTM (gtm-1)
**Type:** artifact
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Context** | Designed go-to-market strategy for Chisel's international expansion. |
| **What I Built** | Post-trial conversion playbook focused on activation metrics—getting trial users to the "aha moment" faster. |
| **Outcome** | Forecasted 20% ARR uplift from proposed changes. |

**Metadata:**
- Forecast: 20% ARR uplift

---

### Bets Branch

#### Bets (bets-path)
**Type:** path
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Overview** | Bets are different from jobs. You don't have product-market fit handed to you. You have an idea and the willingness to be wrong publicly. |
| **What's Here** | I've made two bets. One worked (sort of). One didn't (but taught me more). |

---

#### Caval (caval-1)
**Type:** initiative
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Problem** | Vehicle servicing is broken. You don't know if you're being overcharged. You trust mechanics because you have no choice. |
| **What We Built** | Platform connecting vehicle owners with verified service providers. |
| **Outcome** | ₹5L revenue, 4K+ users, 4.6 rating on Play Store. |
| **Lessons** | What didn't work: unit economics at scale. |

**Metadata:**
- Revenue: ₹5 Lakhs
- Users: 4K+, 4.6 Play Store rating
- Role: Co-founder, Design Lead

---

#### EventHive (eventhive-1)
**Type:** initiative
**Status:** ✅ KEEP

| Subsection | Content |
|------------|---------|
| **Problem** | Event hosting platforms are either too simple or too complex. EventHive was the middle ground—powerful enough for real events, simple enough for student organizers. |
| **What We Built** | Ticketing, attendee management, check-in systems. |
| **Outcome** | Raised ₹30L through the pre-incubation program at IIT Madras. |
| **Lessons** | What didn't work: timing. Built this as the event market was still recovering post-COVID. |

**Metadata:**
- Funding: ₹30 Lakhs Pre-Incubation
- Incubator: IIT Madras Incubation Cell

---

## Part 4: Summary of Changes

### Nodes to Rewrite

| Node | UUID | Change Type | Summary |
|------|------|-------------|---------|
| Information | info-path | Full rewrite | Remove self-deprecation, own the credentials |
| Education | education-path | Full rewrite | More confident framing |
| IIT Madras | iitm-path | Merge | Combine main + extended description |
| Thesis | thesis-1 | Add section | Include the Abstract as a subsection |
| Photography | photo-1 | Full rewrite | Connect to perception theme |
| Root | root-0 | Minor | Remove or change "more about me" CTA |

### Nodes to Keep As-Is (47 nodes)

Everything else. The content is solid—voice, honesty, and technical depth are working.

### Node Type Icons
Keep the current visual treatment for now.