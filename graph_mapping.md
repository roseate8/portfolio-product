# Portfolio Graph Mapping

This document maps every node in the graph, reflecting the **actual implementation** in the Supabase database and the website's frontend logic.

| Title | Parent | Type (Icon) | Line Style | Display State | URI | Content Preview |
|---|---|---|---|---|---|---|
| Rudram Piplad | None (Root) | (root-icon) | Solid | Normal | `/` | |
| AI Systems | Rudram Piplad | path (icon-path) | Solid | Normal | `nodes/ai-systems` | |
| AI Agents | AI Systems | path (icon-path) | Solid | Normal | `nodes/ai-systems/agents` | |
| Butler Expense Agent | AI Agents | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/ai-systems/agents/butler` | After every business trip, you spend 45 minutes matching receipts to transactions, guessing categories, and hoping you d… |
| AI Ethics Framework | AI Agents | research (icon-research) | Dashed (Auto) | Normal | `nodes/ai-systems/agents/ethics` | Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That's not ethics—that's compliance thea… |
| RAG Pipelines | AI Systems | path (icon-path) | Solid | Normal | `nodes/ai-systems/rag-pipelines` | |
| Chunking Strategies | RAG Pipelines | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/rag-pipelines/chunking` | The dirty secret of RAG: your chunking strategy matters more than your embedding model. Chunk too small and you lose con… |
| Document Parsing | RAG Pipelines | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/rag-pipelines/doc-parsing` | Before you can chunk, you need to parse. And parsing is where documents lie to you. PDFs claim to have structure but hid… |
| GraphRAG | RAG Pipelines | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/ai-systems/rag-pipelines/graphrag` | Standard RAG felt like searching with a blindfold—you get results, but you don't know why they're connected. |
| Safety & Evals | AI Systems | path (icon-path) | Solid | Normal | `nodes/ai-systems/safety-evals` | |
| Eval Framework | Safety & Evals | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/ai-systems/safety-evals/eval-framework` | Lately, I am working on setting up the evals to introduce groundedness and safety evals as potential release gates. The… |
| PII/DLP Guardrails | Safety & Evals | artifact (icon-artifact) | Solid | Normal | `nodes/ai-systems/safety-evals/pii-dlp` | Enterprise AI has a specific failure mode: leaking data that shouldn't be leaked. User asks a question, RAG retrieves a… |
| Bets | Rudram Piplad | path (icon-path) | Solid | Normal | `nodes/bets` | |
| Caval | Bets | initiative (icon-initiative) | Dashed (Auto) | Highlighted (Blinking Dot) | `nodes/bets/caval` | |
| EventHive | Bets | initiative (icon-initiative) | Dashed (Auto) | Highlighted (Blinking Dot) | `nodes/bets/eventhive` | |
| Product Work | Rudram Piplad | path (icon-path) | Dashed (Manual) | Normal | `nodes/industry-work` | |
| Consulting | Product Work | path (icon-path) | Solid | Normal | `nodes/industry-work/consulting` | |
| Chisel Labs | Consulting | path (icon-path) | Solid | Normal | `nodes/industry-work/consulting/chisel` | |
| Global SaaS GTM | Chisel Labs | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/consulting/chisel/gtm` | Designed go-to-market strategy for Chisel's international expansion. |
| Tata Group (TCS – CPG & Retail) | Consulting | path (icon-path) | Solid | Normal | `nodes/industry-work/consulting/tata` | |
| AI Maturity Model | Tata Group (TCS – CPG & Retail) | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/consulting/tata/ai-maturity` | Built a three-part digital maturity model to assess enterprise AI readiness. The framework helped sales teams have AI co… |
| MLOps & LLM Intelligence | Tata Group (TCS – CPG & Retail) | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/consulting/tata/mlops` | Authored competitive intelligence reports on MLOps platforms and LLM capabilities for TCS's CPG & Retail practice. |
| HCL Technologies | Product Work | path (icon-path) | Solid | Hidden | `nodes/industry-work/hcl` | |
| Policybazaar | Product Work | path (icon-path) | Solid | Normal | `nodes/industry-work/policybazaar` | |
| Web Analytics | Policybazaar | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/policybazaar/analytics` | When I joined Policybazaar, web analytics had a 60% discrepancy between reported and actual numbers. Marketing was makin… |
| Growth & Mobile App | Policybazaar | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/policybazaar/growth-mobile` | Mobile deployment was broken. |
| Your Orders | Policybazaar | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/policybazaar/orders` | Insurance customers have a problem: they buy a policy and then forget about it. When they need to make a claim, they cal… |
| Swiggy | Product Work | path (icon-path) | Solid | Hidden | `nodes/industry-work/swiggy` | |
| ThoughtSpot | Product Work | path (icon-path) | Solid | Normal | `nodes/industry-work/thoughtspot` | |
| Boundaryless / Enterprise Search | ThoughtSpot | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/industry-work/thoughtspot/boundaryless` | Enterprise data is scattered across warehouses, lakehouses, spreadsheets, third-party tools. Boundaryless is ThoughtSpot… |
| Homepage | ThoughtSpot | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/thoughtspot/homepage` | The homepage is the first thing users see after login. At ThoughtSpot, the old homepage was a list of recent items. Func… |
| Navigation & Discovery | ThoughtSpot | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/thoughtspot/navigation` | How do users find what they're looking for in an enterprise tool with thousands of objects? The answer isn't just search… |
| Object Search | ThoughtSpot | artifact (icon-artifact) | Solid | Normal | `nodes/industry-work/thoughtspot/object-search` | Beyond answering questions, users need to find things—dashboards, reports, data sources. Object search is that problem. |
| Information | Rudram Piplad | information (icon-information) | Solid | Normal | `nodes/information` | |
| Behance | Information | information (icon-information) | Solid | Hidden | `nodes/information/behance` | |
| Education | Information | path (icon-path) | Solid | Normal | `nodes/information/education` | |
| Email | Information | information (icon-information) | Solid | Hidden | `nodes/information/email` | |
| Footnotes | Information | information (icon-information) | Solid | Secondary (Dimmed) | `nodes/information/footnotes` | |
| LinkedIn | Information | information (icon-information) | Solid | Hidden | `nodes/information/linkedin` | |
| Phone | Information | information (icon-information) | Solid | Hidden | `nodes/information/phone` | |
| Resume | Information | information (icon-information) | Solid | Hidden | `nodes/information/resume` | |
| Bangalore | Photography | artifact (icon-artifact) | Solid | Normal | `nodes/photography/bangalore` | |
| Taipei | Photography | artifact (icon-artifact) | Solid | Normal | `nodes/photography/taipei` | |
| Spatial & Perception | Rudram Piplad | path (icon-path) | Solid | Normal | `nodes/spatial-perception` | |
| Foveated Rendering & Gaze Tracking | Spatial & Perception | research (icon-research) | Dashed (Auto) | Highlighted (Blinking Dot) | `nodes/spatial-perception/foveated-rendering` | VR has a compute problem. Rendering high-fidelity graphics to a headset at 90fps requires GPU resources most hardware ca… |
| Haptics Research | Spatial & Perception | research (icon-research) | Dashed (Auto) | Normal | `nodes/spatial-perception/haptics` | How do you teach someone to use a defibrillator without a real emergency? The answer is simulation—but VR training falls… |
| Visual Practice | Spatial & Perception | path (icon-path) | Solid | Normal | `nodes/spatial-perception/visual-practice` | |
| Graphic Design & Illustrations | Visual Practice | path (icon-path) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design` | |
| Behance Work | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design/behance` | Curated collection of graphic design, branding, and illustration work. 3 featured projects. |
| E-Cell Magazine | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/visual-practice/graphic-design/ecell-magazine` | Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+, published the first entrepreneurship magazine at… |
| NFT Collection | Graphic Design & Illustrations | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/spatial-perception/visual-practice/graphic-design/nft` | Minted 9+ digital art pieces on OpenSea during the Web3 wave. The art was real; the market was speculative. |
| Photography | Visual Practice | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/spatial-perception/visual-practice/photography` | |
| XR Prototypes | Spatial & Perception | path (icon-path) | Solid | Normal | `nodes/spatial-perception/xr-prototypes` | |
| 3D Printing VR | XR Prototypes | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/xr-prototypes/3d-print-vr` | Can you design 3D-printable objects in VR more intuitively than in CAD software? |
| AED in VR | XR Prototypes | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/spatial-perception/xr-prototypes/aed-vr` | Built a VR training simulation for automated external defibrillator (AED) use. The goal: train people to respond to card… |
| AR Mobile Games | XR Prototypes | artifact (icon-artifact) | Solid | Normal | `nodes/spatial-perception/xr-prototypes/ar-games` | First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub. |
| Trajectory | Rudram Piplad | path (icon-path) | Solid | Hidden | `nodes/trajectory` | |
| IIM Bangalore | Education | path (icon-path) | Solid | Normal | `nodes/trajectory/iimb` | |
| NCCU Exchange Taipei | IIM Bangalore | artifact (icon-artifact) | Solid | Highlighted (Blinking Dot) | `nodes/trajectory/iimb/nccu-exchange` | |
| IIT Madras | Education | path (icon-path) | Solid | Normal | `nodes/trajectory/iitm` | |
| Engineering Design | IIT Madras | artifact (icon-artifact) | Solid | Normal | `nodes/trajectory/iitm/engineering-design` | |
| Thesis: Photoacoustic Spectroscopy | IIT Madras | research (icon-research) | Solid | Highlighted (Blinking Dot) | `nodes/trajectory/iitm/thesis` | Feasibility Study on Broadband Photoacoustic Techniques for Human Breath Analysis. Masters thesis under Dr. N.J. Vasa (D… |
