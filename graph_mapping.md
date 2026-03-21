# Portfolio Graph Mapping

This document maps every node in the graph, reflecting the **actual implementation** in the Supabase database and the website's frontend logic.

| Title | Parent | Type (Icon) | Line Style | Display State | URI | Role | Technologies | Footnotes | Other Metadata |
|---|---|---|---|---|---|---|---|---|---|
| Rudram Piplad | None (Root) | (root-icon) | Solid | Normal | `/` | Product Manager | | | |
| AI Systems | Rudram Piplad | path (icon-path) | Solid | Normal | `nodes/ai-systems` | | | | |
| AI Agents | AI Systems | path (icon-path) | Solid | Normal | `nodes/ai-systems/agents` | | | | |
| Butler Expense Agent | AI Agents | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/ai-systems/agents/butler` | | | | Stack: LangGraph, GPT-4, MCP Connectors, Tool Calling |
| AI Ethics Framework | AI Agents | research (icon-research) | Dashed (Auto) | Normal | `nodes/ai-systems/agents/ethics` | | | | Architecture: Multi-agent (Interpreter → Cartographer → Dialectician → Pragmatist) |
| RAG Pipelines | AI Systems | path (icon-path) | Solid | Normal | `nodes/ai-systems/rag-pipelines` | | | | |
| Chunking Strategies | RAG Pipelines | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/rag-pipelines/chunking` | | | | |
| Document Parsing | RAG Pipelines | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/rag-pipelines/doc-parsing` | | Docling, PyMuPDF, Unstructured, OCR | | |
| GraphRAG | RAG Pipelines | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/ai-systems/rag-pipelines/graphrag` | | Neo4j, LangChain, OpenAI | | |
| Safety & Evals | AI Systems | path (icon-path) | Solid | Normal | `nodes/ai-systems/safety-evals` | | | | |
| Eval Framework | Safety & Evals | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/ai-systems/safety-evals/eval-framework` | | | | Metrics: nDCG@5, Recall@10, Latency p95, hallucinations |
| PII/DLP Guardrails | Safety & Evals | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/safety-evals/pii-dlp` | | | | Compliance: SOC 2 Type II Certified |
| Bets | Rudram Piplad | path (icon-path) | Solid | Normal | `nodes/bets` | | | | |
| Caval | Bets | initiative (icon-initiative) | Dashed (Auto) | Highlighted (Blinking Dot) | `nodes/bets/caval` | | | | Revenue: ₹5 Lakhs | Users: 4K+, 4.6 Play Store rating |
| EventHive | Bets | initiative (icon-initiative) | Dashed (Auto) | Highlighted (Blinking Dot) | `nodes/bets/eventhive` | | | | Funding: ₹30 Lakhs Pre-Incubation | Incubator: IIT Madras Incubation Cell |
| Product Work | Rudram Piplad | path (icon-path) | Dashed (Manual) | Normal | `nodes/industry-work` | | | | |
| Consulting | Product Work | path (icon-path) | Solid | Normal | `nodes/industry-work/consulting` | | | | |
| Chisel Labs | Consulting | path (icon-path) | Solid | Normal | `nodes/industry-work/consulting/chisel` | Product Advisor | | | |
| Global SaaS GTM | Chisel Labs | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/consulting/chisel/gtm` | | | | Forecast: 20% ARR uplift |
| Tata Group (TCS – CPG & Retail) | Consulting | path (icon-path) | Solid | Normal | `nodes/industry-work/consulting/tata` | Management Consultant – Summer Associate | | | |
| AI Maturity Model | Tata Group (TCS – CPG & Retail) | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/consulting/tata/ai-maturity` | | | | Impact: +15% AI adoption in proposals |
| MLOps & LLM Intelligence | Tata Group (TCS – CPG & Retail) | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/consulting/tata/mlops` | | | | Target: 12% cost savings in RFPs |
| HCL Technologies | Product Work | path (icon-path) | Solid | Hidden | `nodes/industry-work/hcl` | Software Developer – Digital Transformation & Industry 4.0 | | | |
| Policybazaar | Product Work | path (icon-path) | Solid | Normal | `nodes/industry-work/policybazaar` | Product Manager – Assistant Manager | | | |
| Web Analytics | Policybazaar | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/policybazaar/analytics` | | | | Impact: Saved ₹6.5M+ in wasted spend | Team: 15+ members |
| Growth & Mobile App | Policybazaar | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/policybazaar/growth-mobile` | | | | Revenue: ₹25M+ from mobile, ₹75M+ from upselling |
| Your Orders | Policybazaar | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/policybazaar/orders` | | | | Impact: Saved ₹10M+ in support costs | Engagement: +170% |
| Swiggy | Product Work | path (icon-path) | Solid | Hidden | `nodes/industry-work/swiggy` | | | | |
| ThoughtSpot | Product Work | path (icon-path) | Solid | Normal | `nodes/industry-work/thoughtspot` | Product Manager II | | | |
| Boundaryless / Enterprise Search | ThoughtSpot | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/thoughtspot/boundaryless` | | | | Role: Product Manager | Constraints: <$0.004/query, >0.7 nDCG@5 |
| Homepage | ThoughtSpot | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/thoughtspot/homepage` | | | | |
| Navigation & Discovery | ThoughtSpot | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/thoughtspot/navigation` | | | | Impact: 20% faster time to discovery |
| Object Search | ThoughtSpot | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/thoughtspot/object-search` | | | | |
| Information | Rudram Piplad | information (icon-information) | Solid | Normal | `nodes/information` | Product Manager | | | |
| Behance | Information | information (icon-information) | Solid | Hidden | `nodes/information/behance` | | | | |
| Education | Information | path (icon-path) | Solid | Normal | `nodes/information/education` | | | IIT Madras has secured the #1 position in the NIRF 2025... | Exchange Programme: NCCU College of Commerce, Taipei |
| Email | Information | information (icon-information) | Solid | Hidden | `nodes/information/email` | | | | |
| Footnotes | Information | information (icon-information) | Solid | Secondary (Dimmed) | `nodes/information/footnotes` | | | | |
| LinkedIn | Information | information (icon-information) | Solid | Hidden | `nodes/information/linkedin` | | | | |
| Phone | Information | information (icon-information) | Solid | Hidden | `nodes/information/phone` | | | | |
| Resume | Information | information (icon-information) | Solid | Hidden | `nodes/information/resume` | | | | |
| Bangalore | Photography | artifact (icon-artifact) | Solid | Normal | `nodes/photography/bangalore` | | | | |
| Taipei | Photography | artifact (icon-artifact) | Solid | Normal | `nodes/photography/taipei` | | | | |
| Spatial & Perception | Rudram Piplad | path (icon-path) | Solid | Normal | `nodes/spatial-perception` | | | | |
| Foveated Rendering & Gaze Tracking | Spatial & Perception | research (icon-research) | Dashed (Auto) | Highlighted (Blinking Dot) | `nodes/spatial-perception/foveated-rendering` | | | | Lab: IIT Madras Haptics Lab | Result: 57% GPU reduction |
| Haptics Research | Spatial & Perception | research (icon-research) | Dashed (Auto) | Normal | `nodes/spatial-perception/haptics` | | | | Focus: AED pad placement, shock delivery, CPR feedback |
| Visual Practice | Spatial & Perception | path (icon-path) | Solid | Normal | `nodes/spatial-perception/visual-practice` | | | | |
| Graphic Design & Illustrations | Visual Practice | path (icon-path) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design` | | | | |
| Behance Work | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design/behance` | | | | |
| E-Cell Magazine | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design/ecell-magazine` | | | | Role: Chief Designer | Circulation: 30K+ copies |
| NFT Collection | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/spatial-perception/visual-practice/graphic-design/nft` | | | | Pieces: 9+ minted |
| Photography | Visual Practice | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/spatial-perception/visual-practice/photography` | | | | |
| XR Prototypes | Spatial & Perception | path (icon-path) | Solid | Normal | `nodes/spatial-perception/xr-prototypes` | | | | |
| 3D Printing VR | XR Prototypes | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/xr-prototypes/3d-print-vr` | | | | |
| AED in VR | XR Prototypes | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/spatial-perception/xr-prototypes/aed-vr` | | | | Platform: Unity, Oculus Quest |
| AR Mobile Games | XR Prototypes | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/xr-prototypes/ar-games` | | | | Platform: ARCore, Unity | Status: Code missing |
| Trajectory | Rudram Piplad | path (icon-path) | Solid | Hidden | `nodes/trajectory` | | | | |
| IIM Bangalore | Education | path (icon-path) | Solid | Normal | `nodes/trajectory/iimb` | | | QS World University Rankings 2024. IIM Bangalore ranked #31... | MBA (Post Graduate Programme) | QS WORLD RANK: #31 |
| NCCU Exchange Taipei | IIM Bangalore | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/trajectory/iimb/nccu-exchange` | | | Financial Times Masters in Management (MiM) Global Ranking 2023... | Location: Taipei, Taiwan | Focus: East Asian tech ecosystems |
| IIT Madras | Education | path (icon-path) | Solid | Normal | `nodes/trajectory/iitm` | | | | Engineering Design (specialization: Biomedical) |
| Engineering Design | IIT Madras | artifact (icon-artifact) | Solid | Normal | `nodes/trajectory/iitm/engineering-design` | | | | |
| Thesis: Photoacoustic Spectroscopy | IIT Madras | research (icon-research) | Solid | Highlighted (Blinking Dot) | `nodes/trajectory/iitm/thesis` | | | | Advisor: Dr. N.J. Vasa (Dean, IIT Madras) |
| Chunking Strategies | RAG Pipelines | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/rag-pipelines/chunking` | | | | |
| Behance Work | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design/behance` | | | | |
