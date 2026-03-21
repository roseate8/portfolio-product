# Portfolio Graph Mapping (Comprehensive)

This document is a mapping of the graph, reflecting all data stored in Supabase.

## Shape & Line Taxonomy

### Node Shapes
| Shape | Type | Usage |
|---|---|---|
| ⬡ Hexagon | Path | Structural containers organizing child nodes |
| ◇ Diamond | Artifact | Tangible built/shipped/produced outputs |
| ⬠ Pentagon | Research | Intellectual explorations, academic work |
| △ Triangle | Initiative | Entrepreneurial ventures, bets |
| ● Dot | Information | Meta-content, contact, facts |

### Line Styles
| Style | Meaning | Usage |
|---|---|---|
| ────── Solid | Structural / Definitive | Parent → child where relationship is concrete, formal, shipped |
| ── ── ── Dashed | Emergent / Exploratory | Parent → child where relationship is research-driven, speculative, or organic |
| ·········· Dotted | Lateral / Thematic | Cross-branch connections, non-hierarchical |

## Full Node Map

| Title | Parent | Type | Line Style | Display State | Role | Technologies | Impact / Metrics | Connections (Dotted) | External Links | Footnotes | Content Preview (Context / What I Built) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rudram Piplad | None | | Solid | Normal | Product Manager | | | | | | |
| AI Systems | Rudram Piplad | path | Solid | Normal | | | | | | | |
| AI Agents | AI Systems | path | Solid | Normal | | | | | | | |
| Butler Expense Agent | AI Agents | artifact | Solid | Highlighted | | LangGraph, GPT-4, MCP | Time Saved: 45min → 2min | | GitHub: butler-travel-expense-agent | Agentic RAG / MCP Connectors | After every business trip, you spend 45 minutes matching receipts... I built a multi-agent system that pulls from corporate feeds. |
| AI Ethics Framework | AI Agents | artifact | Dashed | Normal | | | | Eval Framework | GitHub: applied-ai-ethics | | Most AI ethics frameworks are checklists... I wanted to build something for PMs and founders. |
| RAG Pipelines | AI Systems | path | Solid | Normal | | | | | | | |
| Chunking Strategies | RAG Pipelines | artifact | Solid | Normal | | | | | GitHub: chunking-strategy-experiments | | The dirty secret of RAG: your chunking strategy matters... Tried recursive splitting, semantic chunking. |
| Document Parsing | RAG Pipelines | artifact | Solid | Normal | | Docling, PyMuPDF, Unstructured | | | GitHub: document-parser-for-rag | | PDFs claim to have structure but hide text... Parser pipeline using Docling that handles PDF, PPT, XLSX. |
| GraphRAG | RAG Pipelines | artifact | Solid | Highlighted | | Neo4j, LangChain, OpenAI | | | GitHub: graph-rag-trials | | Standard RAG felt like searching with a blindfold... Entities and relationships extracted from docs. |
| Safety & Evals | AI Systems | path | Solid | Normal | | | | | | | |
| Eval Framework | Safety & Evals | artifact | Solid | Highlighted | | | Metrics: nDCG@5, Recall@10, Latency | Boundaryless / Enterprise Search | | | If evals regress, the release doesn't ship... Groundedness and safety evals as release gates. |
| PII/DLP Guardrails | Safety & Evals | artifact | Solid | Normal | | | SOC 2 Type II Certified | | | | Enterprise AI failure mode: leaking data... User asks a question, RAG retrieves a doc they shouldn't see. |
| Bets | Rudram Piplad | path | Solid | Normal | | | | | | | |
| Caval | Bets | initiative | Dashed | Highlighted | Co-founder, Design Lead | | Revenue: ₹5 Lakhs, Users: 4K+ | | | | |
| EventHive | Bets | initiative | Dashed | Highlighted | | | Funding: ₹30 Lakhs | | | | |
| Product Work | Rudram Piplad | path | Solid | Normal | | | | | | | |
| Consulting | Product Work | path | Solid | Normal | | | | | | | |
| Chisel Labs – Global SaaS GTM | Consulting | artifact | Solid | Highlighted | Product Advisor | | Forecast: 20% ARR uplift | | | | Designed GTM strategy for Chisel's international expansion. Post-trial conversion playbook. |
| Tata Group (TCS) | Consulting | path | Solid | Normal | Management Consultant | | | | | | |
| AI Maturity Model | Tata Group | artifact | Solid | Normal | | | Impact: +15% AI adoption | | | | Built a three-part digital maturity model to assess enterprise AI readiness. |
| MLOps & LLM Intelligence | Tata Group | artifact | Solid | Highlighted | | | Target: 12% cost savings | | | | Competitive intelligence reports on MLOps platforms and LLMs. |
| HCL Technologies | Product Work | path | Solid | Hidden | Software Developer | | | | | | |
| Smart Logistics | HCL Technologies | artifact | Solid | Hidden | | | | | | | Supply Chain Optimization |
| TechJam | HCL Technologies | artifact | Solid | Hidden | | | | | | | Internal Innovation Challenge |
| Policybazaar | Product Work | path | Solid | Normal | Product Manager | | | | | | |
| Web Analytics | Policybazaar | artifact | Solid | Normal | | | Impact: Saved ₹6.5M+ | | | | Web analytics had a 60% discrepancy... Overhauled entire analytics infrastructure. |
| Growth & Mobile App | Policybazaar | artifact | Solid | Normal | | | Revenue: ₹25M+ from mobile | RAG Pipelines | | | Mobile deployment was broken... Streamlined release process. |
| Your Orders | Policybazaar | artifact | Solid | Highlighted | | | Impact: Saved ₹10M+ | | | | Self-service portal for managing insurance policies. |
| Swiggy | Product Work | path | Solid | Hidden | | | | | | | |
| Last-Mile Optimization | Swiggy | artifact | Solid | Hidden | | | | | | | Delivery Route Optimization |
| ThoughtSpot | Product Work | path | Solid | Normal | Product Manager II | | | | | | |
| Boundaryless / Search | ThoughtSpot | artifact | Solid | Highlighted | Product Manager | | Constraints: <$0.004/query | | | | Search across warehouses, spreadsheets, third-party tools. |
| Homepage | ThoughtSpot | artifact | Solid | Normal | | | | | | | Old homepage was a list of recent items... New homepage surfaces relevant content based on user behavior. |
| Navigation & Discovery | ThoughtSpot | artifact | Solid | Normal | | | Impact: 20% faster discovery | | | | How do users find what they're looking for? Overhauled frontend and backend navigation. (Includes Object Search subsection) |
| Information | Rudram Piplad | information | Solid | Normal | Product Manager | | | | LinkedIn, GitHub, Behance | | |
| Education | Information | path | Solid | Normal | | | | | | NIRF 2025 #1 Engineering, QS #180... | BTech & MTech Engineering Design | MBA IIMB |
| Spatial & Perception | Rudram Piplad | path | Solid | Normal | | | | | | | |
| Foveated Rendering | Spatial & Perception | research | Dashed | Highlighted | | | Result: 57% GPU reduction | XR Prototypes | GitHub: foveated-rendering-virtual-reality | | You don't need to render everything at full quality... Human eyes have high resolution only at the fovea. |
| Haptics Research | Spatial & Perception | research | Dashed | Normal | | | Result: ~30% improvement | XR Prototypes, AED in VR | | | Simulation falls apart when physical feedback is wrong... Pad placement, shock delivery, compressions. |
| Visual Practice | Spatial & Perception | path | Solid | Normal | | | | | | | |
| Graphic Design | Visual Practice | path | Solid | Normal | | | | | | | |
| Behance Work | Graphic Design | artifact | Solid | Normal | | | | | Behance Profile | | Curated collection of graphic design, branding. |
| E-Cell Magazine | Graphic Design | artifact | Solid | Normal | Chief Designer | | Circulation: 30K+ copies | | | | Chief Designer for IIT Madras Entrepreneurship Cell. |
| NFT Collection | Graphic Design | artifact | Solid | Highlighted | | | Pieces: 9+ minted | | OpenSea | | Digital art pieces on OpenSea. |
| Photography | Visual Practice | path | Solid | Highlighted | | | | | | | |
| Taipei | Photography | artifact | Solid | Normal | | | | | | | Location-based photography from Taipei. |
| Bangalore | Photography | artifact | Solid | Normal | | | | | | | Location-based photography from Bangalore. |
| XR Prototypes | Spatial & Perception | path | Solid | Normal | | | | Foveated Rendering | | | |
| 3D Printing VR | XR Prototypes | artifact | Solid | Normal | | | | | GitHub: 3d-printing-in-vr | | Design 3D-printable objects in VR intuitively. |
| AED in VR | XR Prototypes | artifact | Solid | Highlighted | | | Platform: Unity, Oculus Quest | | GitHub: automated-external-defibrillator-in-vr | | VR training simulation for AED use. |
| AR Mobile Games | XR Prototypes | artifact | Solid | Normal | | | Platform: ARCore, Unity | | | | Built and published AR games on mobile using Unity. |
| Trajectory | Rudram Piplad | path | Solid | Hidden | | | | | | | |
| IIM Bangalore | Education | path | Solid | Normal | | | QS WORLD RANK: #31 | | | QS 2024 #31 globally | MBA (Post Graduate Programme). |
| NCCU Exchange | IIM Bangalore | artifact | Solid | Highlighted | | | Focus: East Asian tech | | | FT MiM Ranking #96 | Taipei, Taiwan. |
| IIT Madras | Education | path | Solid | Normal | | | | | | | Engineering Design (specialization: Biomedical). |
| Engineering Design | IIT Madras | artifact | Solid | Normal | | | | | | | |
| Thesis: Photoacoustic | IIT Madras | research | Dashed | Highlighted | | | Advisor: Dr. N.J. Vasa | Spatial & Perception | | | Feasibility Study on Broadband Photoacoustic Techniques. |
