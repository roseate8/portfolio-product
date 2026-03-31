# Portfolio Graph Mapping (Comprehensive)

This document is a mapping of the graph, reflecting all data stored in Supabase.

## Shape & Line Taxonomy

### Node Types & Shapes
| Shape | Type | DB Type | Usage |
|---|---|---|---|
| ★ Star | Center | `''` | Root node (Rudram Piplad) |
| ⬡ Hexagon | Branch | `path` | Structural containers organizing child nodes |
| ◇ Diamond | Entity | `entity` | Companies, institutions, ventures |
| △ Triangle | Artifact | `artifact` | Tangible built/shipped/produced outputs |
| ● Circle | Research | `research` | Intellectual explorations, academic work |

### Line Styles
| Style | Meaning | Usage |
|---|---|---|
| ────── Solid | Structural / Definitive | Parent → child where relationship is concrete, formal, shipped |
| ── ── ── Dashed | Emergent / Exploratory | Parent → child where relationship is research-driven, speculative, or organic |
| ·········· Dotted | Lateral / Thematic | Cross-branch connections, non-hierarchical |

## Complete Verified Table

| Node | Parent | Type | Shape | Line to Parent | Cross-Connections (Dotted) |
|---|---|---|---|---|---|
| **Rudram Piplad** | — | center | Star | — | — |
| **AI Systems** | Center | branch | Hexagon | Solid | — |
| **AI Agents** | AI Systems | branch | Hexagon | Solid | — |
| **Butler Expense Agent** | AI Agents | artifact | Triangle | Solid | — |
| **AI Ethics Framework** | AI Agents | artifact | Triangle | Dashed | — |
| **RAG Pipelines** | AI Systems | branch | Hexagon | Solid | — |
| **Chunking Strategies** | RAG Pipelines | research | Circle | Dashed | — |
| **Document Parsing** | RAG Pipelines | research | Circle | Dashed | — |
| **GraphRAG** | RAG Pipelines | artifact | Triangle | Solid | — |
| **Safety & Evals** | AI Systems | branch | Hexagon | Solid | — |
| **Eval Framework** | Safety & Evals | artifact | Triangle | Solid | → Boundaryless / Search |
| **PII/DLP Guardrails** | Safety & Evals | artifact | Triangle | Dashed | — |
| **Bets** | Center | branch | Hexagon | Solid | — |
| **Caval** | Bets | entity | Diamond | Solid | — |
| **EventHive** | Bets | entity | Diamond | Dashed | — |
| **Product Work** | Center | branch | Hexagon | Solid | — |
| **Consulting** | Product Work | branch | Hexagon | Dashed | — |
| **Chisel Labs** | Consulting | entity | Diamond | Solid | — |
| **Global SaaS GTM** | Chisel Labs | artifact | Triangle | Solid | — |
| **Tata Group (TCS)** | Consulting | entity | Diamond | Solid | — |
| **AI Maturity Model** | Tata Group | artifact | Triangle | Dashed | — |
| **MLOps & LLM Intelligence** | Tata Group | artifact | Triangle | Solid | — |
| **HCL Technologies** | Product Work | entity | Diamond | Dashed | — |
| **Policybazaar** | Product Work | entity | Diamond | Solid | — |
| **Web Analytics** | Policybazaar | artifact | Triangle | Dashed | — |
| **Growth & Mobile App** | Policybazaar | artifact | Triangle | Dashed | → RAG Pipelines *(flagged)* |
| **Your Orders** | Policybazaar | artifact | Triangle | Solid | — |
| **Swiggy** | Product Work | entity | Diamond | Dashed | — |
| **ThoughtSpot** | Product Work | entity | Diamond | Solid | — |
| **Boundaryless / Search** | ThoughtSpot | artifact | Triangle | Solid | ← Eval Framework |
| **Homepage** | ThoughtSpot | artifact | Triangle | Dashed | — |
| **Navigation & Discovery** | ThoughtSpot | artifact | Triangle | Dashed | — |
| **Object Search** | ThoughtSpot | artifact | Triangle | Dashed | — |
| **Education** | Information | branch | Hexagon | Solid | — |
| **Spatial & Perception** | Center | branch | Hexagon | Solid | ← Thesis: Photoacoustic |
| **Foveated Rendering** | Spatial & Perception | research | Circle | Solid | → XR Prototypes |
| **Haptics Research** | Spatial & Perception | research | Circle | Dashed | → XR Prototypes, → AED in VR |
| **Visual Practice** | Spatial & Perception | branch | Hexagon | Solid | — |
| **Graphic Design** | Visual Practice | branch | Hexagon | Dashed | — |
| **Behance Work** | Graphic Design | artifact | Triangle | Dashed | — |
| **E-Cell Magazine** | Graphic Design | artifact | Triangle | Dashed | — |
| **NFT Collection** | Graphic Design | artifact | Triangle | Solid | — |
| **Photography** | Visual Practice | artifact | Triangle | Solid | — |
| **XR Prototypes** | Spatial & Perception | branch | Hexagon | Dashed | ← Foveated Rendering, ← Haptics Research |
| **3D Printing VR** | XR Prototypes | artifact | Triangle | Dashed | — |
| **AED in VR** | XR Prototypes | research | Circle | Solid | ← Haptics Research |
| **AR Mobile Games** | XR Prototypes | artifact | Triangle | Dashed | — |
| **IIT Madras** | Education | entity | Diamond | Solid | — |
| **Engineering Design** | IIT Madras | artifact | Triangle | Dashed | — |
| **Thesis: Photoacoustic** | IIT Madras | research | Circle | Solid | → Spatial & Perception |
| **IIM Bangalore** | Education | entity | Diamond | Solid | — |
| **NCCU Exchange** | IIM Bangalore | artifact | Triangle | Solid | — |
