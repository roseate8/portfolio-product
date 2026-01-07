-- =============================================================================
-- COMPLETE DATA MIGRATION FOR RUDRAM PIPLAD PORTFOLIO
-- =============================================================================
-- 
-- This script contains ALL the real portfolio data that needs to be in Supabase.
-- Run this in the Supabase SQL Editor in this exact order:
-- 
-- 1. First run the CLEANUP section (deletes sample data)
-- 2. Then run ALL sections in order from ROOT to FOOTNOTES
-- 
-- ⚠️ IMPORTANT: Run this as ONE complete script, or section by section in order.
-- Do NOT skip sections or run out of order!
-- =============================================================================

-- =============================================================================
-- STEP 0: CLEANUP - Remove Sample Data
-- =============================================================================

DELETE FROM node_connections;
DELETE FROM node_footnotes;
DELETE FROM node_recognition;
DELETE FROM node_education;
DELETE FROM node_metadata;
DELETE FROM node_links;
DELETE FROM node_media;
DELETE FROM nodes;


-- =============================================================================
-- STEP 1: INSERT ROOT NODE
-- =============================================================================

INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, role, email,
    description, extended_description, origin_date, last_updated, is_featured, type, sort_order
) VALUES (
    NULL,
    'Rudram Piplad',
    '/',
    'root-0',
    'Product & AI Builder',
    'Product Manager & AI Engineer',
    'rudram@alumni.iitm.ac.in',
    '<p>I build products that involve AI, and I think a lot about why most AI products feel broken.</p><p>The short answer: they violate trust. They hallucinate confidently. They retrieve irrelevant context. They optimize for metrics that don''t align with user value. The systems work, technically. They just don''t feel trustworthy.</p><p>This problem isn''t new to me. Before AI, I worked on VR systems — specifically, how to render graphics in a way that respects human perception. Your eyes don''t see uniformly; why should rendering be uniform? Before that, I worked on haptics — how touch feedback needs to be fast, not strong, to feel real.</p>',
    '<p>The thread: systems that respect how humans actually experience them.</p><p>Right now, I''m a PM at ThoughtSpot, building AI-powered enterprise search. Before that, I led product at Policybazaar for 15M monthly users. I''ve also started two companies (one made money, one taught me more), done some consulting, and maintained a visual practice in photography and digital art.</p><p>I studied engineering design at IIT Madras and got an MBA at IIM Bangalore. The combination matters: I can go deep on technical problems and still connect them to business outcomes.</p><p>This portfolio is a graph. It''s meant to be explored, not read linearly. Start anywhere. Everything connects eventually.</p>',
    '2018-01-01',
    '2026-01-01',
    true,
    '',
    0
);


-- =============================================================================
-- STEP 2: INSERT LEVEL 1 PATHS (Main Categories)
-- =============================================================================

-- Information
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Information',
    'nodes/information',
    'info-path',
    'About & Contact',
    '<p>Personal information, contact details, and professional links.</p>',
    true, 'path', 0
);

-- AI Systems
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'AI Systems',
    'nodes/ai-systems',
    'ai-path',
    'Building Intelligent Systems',
    '<p>I''ve spent the last two years building AI systems that need to work in production — not demos, not prototypes, actual products where wrong answers cost money or trust. The thing I keep returning to: most AI failures aren''t capability failures, they''re trust failures.</p>',
    '<p>The model could answer correctly, but it didn''t know when to abstain. Or it hallucinated with confidence. Or it retrieved the right document but extracted the wrong fact. This section is about that problem — RAG systems that actually retrieve relevant context, agents that know their boundaries, and evaluation frameworks that catch regressions before users do.</p>',
    true, 'path', 1
);

-- Spatial & Perception
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Spatial & Perception',
    'nodes/spatial-perception',
    'spatial-path',
    'XR & Human Perception Research',
    '<p>Before I cared about AI trust, I cared about perceptual honesty. VR systems that make you sick are lying to your vestibular system. Haptic feedback that''s delayed breaks the illusion of touch. Interfaces that ignore where your eyes are looking waste compute on pixels you''ll never see.</p>',
    '<p>This was my research focus at IIT Madras. It shapes how I think about all interfaces — digital or physical.</p>',
    true, 'path', 2
);

-- Product Work
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Product Work',
    'nodes/product-work',
    'product-path',
    'Industry Product Experience',
    '<p>Product management at scale is about tradeoffs. Every feature has opportunity cost. Every metric has a dark pattern lurking. The job isn''t building what stakeholders ask for — it''s figuring out what users actually need and finding a way to make the business case.</p>',
    '<p>I''ve done this at two companies: Policybazaar (15M monthly users, insurance) and ThoughtSpot (enterprise BI, AI-native search).</p>',
    true, 'path', 3
);

-- Consulting
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Consulting',
    'nodes/consulting',
    'consulting-path',
    'Strategic Advisory',
    '<p>Consulting is about impact without authority. You don''t control the roadmap. You don''t own the team. You give recommendations and hope they stick.</p>',
    '<p>I''ve done two kinds: management consulting (Tata Group) and product consulting (Chisel Labs). Different contexts, same skill: pattern matching across companies and translating insights into actionable recommendations.</p>',
    true, 'path', 4
);

-- Bets
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Bets',
    'nodes/bets',
    'bets-path',
    'Entrepreneurial Ventures',
    '<p>Bets are different from jobs. You don''t have product-market fit handed to you. You don''t have a team waiting for direction. You have an idea and the willingness to be wrong publicly.</p>',
    '<p>I''ve made two bets. One worked (sort of). One didn''t (but taught me more).</p>',
    true, 'path', 5
);

-- Visual Practice
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Visual Practice',
    'nodes/visual-practice',
    'visual-path',
    'Photography & Design',
    '<p>I don''t separate "creative" from "technical." Photography taught me about attention — where eyes go, what they ignore. Illustration taught me about abstraction — what to keep, what to remove. Design taught me about systems — how parts relate to wholes.</p>',
    '<p>This isn''t a hobby section. It''s a different lens on the same questions.</p>',
    true, 'path', 6
);

-- Trajectory
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Trajectory',
    'nodes/trajectory',
    'trajectory-path',
    'Education & Journey',
    '<p>A timeline isn''t a story. This section is about choices — why I picked biomedical design at IIT, why I left a PM job for an MBA, why I came back to product after business school.</p>',
    true, 'path', 7
);

-- Footnotes (special - achievements/recognition)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, is_secondary, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'root-0'),
    'Footnotes',
    'nodes/footnotes',
    'footnotes-path',
    'Achievements & Recognition',
    '<p>These aren''t bragging rights. They''re markers — moments where external validation confirmed (or surprised) me. Listed here for completeness, not prominence.</p>',
    true, true, 'path', 8
);


-- =============================================================================
-- STEP 3: INSERT INFORMATION SECTION
-- =============================================================================

INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, role, email, telephone, overview,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'info-path'),
    'Contact & Links',
    'nodes/information/contact',
    'contact-1',
    'Get in Touch',
    'Product Manager & AI Engineer',
    'rudram@alumni.iitm.ac.in',
    '+91 9940334981',
    'Based in Bangalore, India',
    true, 'information', 0
);

-- Add external links for Contact
INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'LinkedIn', 'https://linkedin.com/in/rudrampiplad', 0
FROM nodes WHERE uuid = 'contact-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub', 'https://github.com/rudramroseate8', 1
FROM nodes WHERE uuid = 'contact-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Behance', 'https://behance.net/rudrampiplad', 2
FROM nodes WHERE uuid = 'contact-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Email', 'mailto:rudram@alumni.iitm.ac.in', 3
FROM nodes WHERE uuid = 'contact-1';


-- =============================================================================
-- STEP 4: INSERT AI SYSTEMS HIERARCHY
-- =============================================================================

-- RAG Pipelines (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ai-path'),
    'RAG Pipelines',
    'nodes/ai-systems/rag-pipelines',
    'rag-path',
    'Retrieval-Augmented Generation',
    '<p>RAG is deceptively simple in theory: retrieve relevant chunks, feed them to an LLM, get better answers. In practice, every decision compounds. How you chunk determines what gets retrieved. How you retrieve determines what the model sees. How the model sees context determines whether the answer is grounded or fabricated.</p>',
    '<p>I''ve built RAG systems at ThoughtSpot (enterprise scale, real SLAs) and in side projects (where I could break things freely). The lesson: naive RAG is easy to build and hard to trust. Good RAG requires obsessing over the retrieval layer.</p>',
    true, 'path', 0
);

-- AI Agents (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ai-path'),
    'AI Agents',
    'nodes/ai-systems/agents',
    'agents-path',
    'Autonomous AI Systems',
    '<p>Agents are having a moment. Most of what I see is demos — impressive loops that work on happy paths and fail silently on edge cases. The hard part isn''t making an agent that works; it''s making an agent that knows when it''s stuck.</p>',
    '<p>I''ve built two agent systems: one for a practical problem (expense tracking), one for a philosophical one (AI ethics evaluation). Both taught me the same lesson: agents need escape hatches and introspection.</p>',
    true, 'path', 1
);

-- Safety & Evals (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ai-path'),
    'Safety & Evals',
    'nodes/ai-systems/safety-evals',
    'safety-path',
    'AI Safety & Evaluation',
    '<p>Shipping AI without evals is shipping blind. You might get lucky. You probably won''t. The question isn''t whether your model makes mistakes — it will. The question is whether you catch them before users do.</p>',
    '<p>This section is about building evaluation into the release process, not as an afterthought but as a gate.</p>',
    true, 'path', 2
);

-- GraphRAG (artifact under RAG Pipelines)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'rag-path'),
    'GraphRAG',
    'nodes/ai-systems/rag-pipelines/graphrag',
    'graphrag-1',
    'Knowledge Graph + RAG',
    '<p>Standard RAG felt like searching with a blindfold — you get results, but you don''t know why they''re connected. Graph structures preserve relationships that chunking destroys.</p>',
    '<p>I started from scratch twice. The first attempt (chunking-experiments repo) was a graveyard of half-working ideas. The second attempt (graph-rag-trials) actually deployed. Key insight: the graph isn''t just for retrieval — it''s for explaining why an answer exists.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Technologies', 'Neo4j, LangChain, OpenAI', 0
FROM nodes WHERE uuid = 'graphrag-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub', 'https://github.com/rudramroseate8/graph-rag-trials', 0
FROM nodes WHERE uuid = 'graphrag-1';

-- Document Parsing (artifact under RAG Pipelines)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'rag-path'),
    'Document Parsing',
    'nodes/ai-systems/rag-pipelines/doc-parsing',
    'docparse-1',
    'Intelligent Document Processing',
    '<p>Before you can chunk, you need to parse. PDFs lie about their structure. PPTs hide information in speaker notes. Excel files have merged cells that break everything.</p>',
    '<p>Built a parser pipeline using Docling that handles PDF, PPT, XLSX. The goal wasn''t perfect parsing — it was predictable failure modes. When parsing fails, fail loudly and early.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Technologies', 'Docling, PyMuPDF, Unstructured, OCR', 0
FROM nodes WHERE uuid = 'docparse-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: document-parser-for-rag', 'https://github.com/rudramroseate8/document-parser-for-rag', 0
FROM nodes WHERE uuid = 'docparse-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: doc-parsers', 'https://github.com/rudramroseate8/doc-parsers', 1
FROM nodes WHERE uuid = 'docparse-1';

-- Chunking Strategies (artifact under RAG Pipelines)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'rag-path'),
    'Chunking Strategies',
    'nodes/ai-systems/rag-pipelines/chunking',
    'chunking-1',
    'Semantic Text Chunking',
    '<p>The dirty secret of RAG: your chunking strategy matters more than your embedding model. Chunk too small and you lose context. Chunk too large and you dilute relevance. Chunk by page and you split sentences. Chunk by semantic boundaries and you need a model to find them.</p>',
    '<p>I tried recursive splitting, semantic chunking, parent-child hierarchies. What worked: hybrid approaches that preserve document structure while respecting semantic coherence. What didn''t: anything that treated documents as flat text.</p>',
    true, 'artifact', 2
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: chunking-strategy-experiments', 'https://github.com/rudramroseate8/chunking-strategy-experiments', 0
FROM nodes WHERE uuid = 'chunking-1';

-- Butler Expense Agent (artifact under AI Agents)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'agents-path'),
    'Butler Expense Agent',
    'nodes/ai-systems/agents/butler',
    'butler-1',
    'Autonomous Expense Management',
    '<p>Travel expense tracking is annoying because it''s contextual. A $50 meal might be business or personal depending on who you were with. A cab ride might be reimbursable or not depending on company policy you don''t remember.</p>',
    '<p>Built a multi-agent system that handles categorization, policy checking, and anomaly detection. The interesting part wasn''t the agents — it was designing the handoff protocols. When does the categorization agent admit uncertainty and escalate? How does the policy agent handle ambiguous rules?</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Stack', 'LangGraph, GPT-4, Tool Calling', 0
FROM nodes WHERE uuid = 'butler-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: butler-travel-expense-agent', 'https://github.com/rudramroseate8/butler-travel-expense-agent', 0
FROM nodes WHERE uuid = 'butler-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: expense-agents-ui-lovable', 'https://github.com/rudramroseate8/expense-agents-ui-lovable', 1
FROM nodes WHERE uuid = 'butler-1';

-- AI Ethics Framework (research under AI Agents)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'agents-path'),
    'AI Ethics Framework',
    'nodes/ai-systems/agents/ethics',
    'ethics-1',
    'Responsible AI Guidelines',
    '<p>Most AI ethics frameworks are checklists. Check boxes, ship product, feel good. That''s not ethics — that''s compliance theater.</p>',
    '<p>Built a multi-agent evaluation system that asks the hard questions about AI products before users do. The agents are adversarial by design — they look for failure modes, edge cases, fairness violations, manipulation vectors. Philosophy-grounded, practically useful. The uncomfortable part: running this on my own projects and finding problems I didn''t want to see.</p>',
    true, 'research', 1
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: applied-ai-ethics', 'https://github.com/rudramroseate8/applied-ai-ethics', 0
FROM nodes WHERE uuid = 'ethics-1';

-- Cross-link: AI Ethics -> Eval Framework
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'evalframework-1'
FROM nodes WHERE uuid = 'ethics-1';

-- Eval Framework (artifact under Safety & Evals)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'safety-path'),
    'Eval Framework',
    'nodes/ai-systems/safety-evals/eval-framework',
    'evalframework-1',
    'LLM Evaluation System',
    '<p>At ThoughtSpot, I introduced groundedness and safety evals as release gates. The rule: if evals regress, the release doesn''t ship. No exceptions, no "we''ll fix it next sprint."</p>',
    '<p>This was politically harder than technically hard. Engineers don''t like gates. PMs don''t like delays. But the alternative — shipping regressions and fixing them in production — is worse for everyone. Metrics that mattered: nDCG@5 for retrieval quality, recall@10 for coverage, latency p95 under 5s. Metrics that didn''t matter: anything that couldn''t be tied to user trust.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Metrics', 'nDCG@5, Recall@10, Latency p95', 0
FROM nodes WHERE uuid = 'evalframework-1';

-- Cross-link: Eval Framework -> Boundaryless
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'tsboundary-1'
FROM nodes WHERE uuid = 'evalframework-1';

-- PII/DLP Guardrails (artifact under Safety & Evals)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'safety-path'),
    'PII/DLP Guardrails',
    'nodes/ai-systems/safety-evals/pii-dlp',
    'piidlp-1',
    'Data Protection in AI',
    '<p>Enterprise AI has a specific failure mode: leaking data that shouldn''t be leaked. User asks a question, RAG retrieves a document they shouldn''t see, answer includes confidential information.</p>',
    '<p>Built PII redaction and DLP (data loss prevention) guardrails at ThoughtSpot. Shipped moderation layers. Cleared SOC 2 Type II with zero major findings. The lesson: guardrails need to be invisible when working and loud when triggered. Users shouldn''t feel surveilled, but violations need to be caught and logged.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Compliance', 'SOC 2 Type II Certified', 0
FROM nodes WHERE uuid = 'piidlp-1';


-- =============================================================================
-- STEP 5: INSERT SPATIAL & PERCEPTION HIERARCHY
-- =============================================================================

-- Foveated Rendering & Gaze Tracking (research)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    'Foveated Rendering & Gaze Tracking',
    'nodes/spatial-perception/foveated-rendering',
    'foveat-1',
    'Eye-Tracking for VR Optimization',
    '<p>Human eyes have high resolution only at the fovea — the tiny central region of your vision. Peripheral vision is blurry by design. Traditional rendering ignores this, computing every pixel at full resolution. Wasteful.</p>',
    '<p>Built a saccadic foveated rendering pipeline for VR using the HTC Vive Pro Eye''s eye tracker. The idea: track where the user is looking, render that region at full resolution, degrade the periphery. Results: 57-70% compute reduction with no perceptible quality loss. The hard part wasn''t the rendering — it was predicting where eyes would move next. Saccades are fast. If you render based on where eyes *were*, you''re already late.</p>',
    true, true, 'research', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Lab', 'IIT Madras VR Lab', 0
FROM nodes WHERE uuid = 'foveat-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Result', '57-70% compute reduction', 1
FROM nodes WHERE uuid = 'foveat-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: foveated-rendering-virtual-reality', 'https://github.com/rudramroseate8/foveated-rendering-virtual-reality', 0
FROM nodes WHERE uuid = 'foveat-1';

-- Cross-link: Foveated Rendering -> XR Prototypes
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'xrproto-path'
FROM nodes WHERE uuid = 'foveat-1';

-- Haptics Research (research)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    'Haptics Research',
    'nodes/spatial-perception/haptics',
    'haptics-1',
    'Tactile Feedback Systems',
    '<p>Touch is the forgotten sense in computing. We''ve optimized visual fidelity for decades. Audio is good enough. But haptics? Still feels like vibration motors from 2010.</p>',
    '<p>Worked in the Haptics Lab at IIT Madras. Built an evaluation matrix for XR haptic feedback — latency, comfort, thermal characteristics. The finding: +23% perceived responsiveness from optimizing feedback timing, not feedback intensity. Users don''t need stronger haptics; they need faster ones.</p>',
    true, 'research', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Result', '+23% perceived responsiveness', 0
FROM nodes WHERE uuid = 'haptics-1';

-- Cross-link: Haptics -> XR Prototypes
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'xrproto-path'
FROM nodes WHERE uuid = 'haptics-1';

-- XR Prototypes (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'spatial-path'),
    'XR Prototypes',
    'nodes/spatial-perception/xr-prototypes',
    'xrproto-path',
    'Extended Reality Projects',
    '<p>The best way to understand perception is to build things that break it. XR prototypes are my lab — quick builds to test ideas about how humans experience virtual and augmented environments.</p>',
    true, 'path', 2
);

-- AED in VR (artifact under XR Prototypes)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'xrproto-path'),
    'AED in VR',
    'nodes/spatial-perception/xr-prototypes/aed-vr',
    'aedvr-1',
    'Emergency Training Simulator',
    '<p>Built a VR training simulation for automated external defibrillator (AED) use. The goal: train people to respond to cardiac emergencies without needing physical equipment.</p>',
    '<p>Learned more from failures than successes. Reverted all code at one point. What remained: understanding of how procedural memory works differently in VR vs. physical training.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Platform', 'Unity, Oculus Quest', 0
FROM nodes WHERE uuid = 'aedvr-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: automated-external-defibrillator-in-vr', 'https://github.com/rudramroseate8/automated-external-defibrillator-in-vr', 0
FROM nodes WHERE uuid = 'aedvr-1';

-- 3D Printing VR (artifact under XR Prototypes)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'xrproto-path'),
    '3D Printing VR',
    'nodes/spatial-perception/xr-prototypes/3d-print-vr',
    'print3d-1',
    'Spatial 3D Modeling',
    '<p>Can you design 3D-printable objects in VR more intuitively than in CAD software? Built a prototype to find out.</p>',
    '<p>Answer: for some tasks, yes. For precision work, no. Interesting middle ground: ideation in VR, refinement in CAD.</p>',
    true, 'artifact', 1
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: 3d-printing-in-vr', 'https://github.com/rudramroseate8/3d-printing-in-vr', 0
FROM nodes WHERE uuid = 'print3d-1';

-- AR Mobile Games (artifact under XR Prototypes)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'xrproto-path'),
    'AR Mobile Games',
    'nodes/spatial-perception/xr-prototypes/ar-games',
    'argames-1',
    'Location-Based AR',
    '<p>First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub. Used Git only locally.</p>',
    '<p>The games shipped. The codebase didn''t survive.</p>',
    true, 'artifact', 2
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Platform', 'ARCore, Unity', 0
FROM nodes WHERE uuid = 'argames-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Status', 'Code missing, lessons learned', 1
FROM nodes WHERE uuid = 'argames-1';


-- =============================================================================
-- STEP 6: INSERT PRODUCT WORK HIERARCHY
-- =============================================================================

-- ThoughtSpot (company sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'product-path'),
    'ThoughtSpot',
    'nodes/product-work/thoughtspot',
    'ts-path',
    'AI-Powered Analytics',
    '<p>ThoughtSpot is an AI-native BI platform. Users ask questions in natural language, the system generates SQL, returns answers. My scope: Boundaryless (enterprise search across data sources), Navigation & Discovery (how users find things), and the Homepage experience.</p>',
    '<p>The interesting problem: AI in enterprise has different failure modes than consumer AI. Wrong answers don''t just frustrate — they lead to bad business decisions. The bar for trust is higher.</p>',
    '2023-01-01',
    true, 'path', 0
);

-- Policybazaar (company sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'product-path'),
    'Policybazaar',
    'nodes/product-work/policybazaar',
    'pb-path',
    'InsurTech Platform',
    '<p>Policybazaar is India''s largest insurance aggregator. 15M monthly users comparing and buying insurance. I was part of the CEO''s office, leading 7 agile teams on a 3-year product strategy.</p>',
    '<p>The challenge: insurance is confusing. Users don''t know what they need. The job was making complexity manageable without dumbing it down.</p>',
    '2021-01-01',
    true, 'path', 1
);

-- Boundaryless / Enterprise Search (artifact under ThoughtSpot)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Boundaryless / Enterprise Search',
    'nodes/product-work/thoughtspot/boundaryless',
    'tsboundary-1',
    'AI-Powered Enterprise Search',
    '<p>Enterprise data is scattered. Data warehouses, lakehouses, spreadsheets, third-party tools. Boundaryless is ThoughtSpot''s answer: search across everything, get answers regardless of where data lives.</p>',
    '<p>I owned the agentic RAG implementation for this. Key constraints: <$0.004/query cost (enterprise scale adds up), >0.7 nDCG@5 (answers must be relevant), 0.9 Recall@10 (don''t miss important results). Shipped via rethink policy and caching. Also evaluated vector DB vendors vs. building in-house. Negotiated SLAs and pricing. Estimated 25% cost savings from the right vendor choice.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Product Manager', 0
FROM nodes WHERE uuid = 'tsboundary-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Constraints', '<$0.004/query, >0.7 nDCG@5', 1
FROM nodes WHERE uuid = 'tsboundary-1';

-- Navigation & Discovery (artifact under ThoughtSpot)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Navigation & Discovery',
    'nodes/product-work/thoughtspot/navigation',
    'tsnav-1',
    'UX Redesign',
    '<p>How do users find what they''re looking for in an enterprise tool? The answer isn''t just search — it''s structure. Navigation, information architecture, SERP UX.</p>',
    '<p>Overhauled the frontend and backend of navigation systems. Standardized product list pages. Revamped search results UX. Result: 20% faster time to discovery.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', '20% faster time to discovery', 0
FROM nodes WHERE uuid = 'tsnav-1';

-- Object Search (artifact under ThoughtSpot)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Object Search',
    'nodes/product-work/thoughtspot/object-search',
    'tsobjsearch-1',
    'Semantic Object Discovery',
    '<p>Beyond answering questions, users need to find things — dashboards, reports, data sources. Object search is that problem.</p>',
    true, 'artifact', 2
);

-- Homepage (artifact under ThoughtSpot)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'ts-path'),
    'Homepage',
    'nodes/product-work/thoughtspot/homepage',
    'tshome-1',
    'Personalized Landing Experience',
    '<p>The homepage is the first thing users see. It sets expectations. At ThoughtSpot, the old homepage was a list of recent items. Functional, not useful.</p>',
    '<p>Overhauled the FE+BE to surface relevant content based on user behavior and role. Not personalization theater — actual signal-based recommendations.</p>',
    true, 'artifact', 3
);

-- Your Orders (artifact under Policybazaar)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'pb-path'),
    'Your Orders',
    'nodes/product-work/policybazaar/orders',
    'orders-1',
    'Policy Management Dashboard',
    '<p>Insurance customers have a problem: they buy a policy and then forget about it. When they need to make a claim or check details, they call customer support. Every call costs money.</p>',
    '<p>Built "Your Orders" — a self-service portal for managing insurance policies. Users could view policies, track claims, download documents. Results: saved ₹10M+ in customer support costs. 170% increase in engagement with policy management. Users actually *wanted* to self-serve; they just didn''t have the tools.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', 'Saved ₹10M+ in support costs', 0
FROM nodes WHERE uuid = 'orders-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Engagement', '+170% policy management', 1
FROM nodes WHERE uuid = 'orders-1';

-- Web Analytics (artifact under Policybazaar)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'pb-path'),
    'Web Analytics',
    'nodes/product-work/policybazaar/analytics',
    'webanalytics-1',
    'Data-Driven Optimization',
    '<p>You can''t improve what you can''t measure. When I joined, Policybazaar''s web analytics had 60% discrepancy between reported and actual numbers. Decisions were being made on bad data.</p>',
    '<p>Formed a team of 15+, overhauled the entire analytics infrastructure. Cut discrepancies by 60%. Saved ₹6.5M+ in wasted spend that was being attributed incorrectly. The lesson: analytics isn''t a technical problem. It''s an organizational problem. Everyone has to agree on definitions, tracking, and truth.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', 'Saved ₹6.5M+ in wasted spend', 0
FROM nodes WHERE uuid = 'webanalytics-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Team', '15+ members', 1
FROM nodes WHERE uuid = 'webanalytics-1';

-- Growth & Mobile App (artifact under Policybazaar)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'pb-path'),
    'Growth & Mobile App',
    'nodes/product-work/policybazaar/growth-mobile',
    'growthmobile-1',
    'Mobile-First Growth',
    '<p>Mobile app deployment was slow and unreliable. Streamlined the iOS and Android release process. Result: 50% increase in adoption within 2 weeks, attributed ₹25M+ revenue.</p>',
    '<p>Also ran A/B tests for upselling flows. Optimized through iteration, not intuition. 21% higher upselling, ₹75M+ generated. Prototyped NLP-driven analysis of customer support tickets. Found root causes of common issues. Cut turnaround time by 40%, saved ₹300K+.</p>',
    true, 'artifact', 2
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Revenue', '₹25M+ from mobile, ₹75M+ from upselling', 0
FROM nodes WHERE uuid = 'growthmobile-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Adoption', '+50% in 2 weeks', 1
FROM nodes WHERE uuid = 'growthmobile-1';

-- Cross-link: Growth & Mobile App (NLP work) -> RAG Pipelines
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'rag-path'
FROM nodes WHERE uuid = 'growthmobile-1';


-- =============================================================================
-- STEP 7: INSERT CONSULTING HIERARCHY
-- =============================================================================

-- Tata Group (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'consulting-path'),
    'Tata Group',
    'nodes/consulting/tata',
    'tata-path',
    'Enterprise AI Strategy',
    '<p>Summer associate at TCS, CPG & Retail practice. Management consulting, not product management. The job: research, synthesize, recommend.</p>',
    true, 'path', 0
);

-- Chisel Labs (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'consulting-path'),
    'Chisel Labs',
    'nodes/consulting/chisel',
    'chisel-path',
    'Product Strategy',
    '<p>Product consulting for a pre-Series A SaaS startup. Paid engagement, not full-time.</p>',
    true, 'path', 1
);

-- MLOps & LLM Intelligence (artifact under Tata)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'tata-path'),
    'MLOps & LLM Intelligence',
    'nodes/consulting/tata/mlops',
    'mlops-1',
    'Enterprise ML Infrastructure',
    '<p>Authored competitive intelligence reports on MLOps platforms and LLM capabilities. The output wasn''t a product — it was a recommendation for how Tata should position in RFPs.</p>',
    '<p>Proposed revisions to RFP templates based on competitive analysis. Targeted 12% cost savings by avoiding over-specifying requirements that only certain vendors could meet.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Target', '12% cost savings in RFPs', 0
FROM nodes WHERE uuid = 'mlops-1';

-- AI Maturity Model (artifact under Tata)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'tata-path'),
    'AI Maturity Model',
    'nodes/consulting/tata/ai-maturity',
    'aimaturity-1',
    'Organizational Assessment',
    '<p>Built a three-part digital maturity model to assess enterprise AI readiness. Used in CIO proposals.</p>',
    '<p>Result: 15% increase in AI adoption recommendations in proposals. The model gave sales teams a framework for having AI conversations with clients who weren''t sure where to start.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Impact', '+15% AI adoption in proposals', 0
FROM nodes WHERE uuid = 'aimaturity-1';

-- Global SaaS GTM (artifact under Chisel Labs)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'chisel-path'),
    'Global SaaS GTM',
    'nodes/consulting/chisel/gtm',
    'gtm-1',
    'Go-to-Market Strategy',
    '<p>Designed go-to-market strategy for international expansion. Built post-trial conversion playbook.</p>',
    '<p>Forecasted 20% ARR uplift from proposed changes. Whether it materialized depends on execution — I advised, they decided.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Forecast', '20% ARR uplift', 0
FROM nodes WHERE uuid = 'gtm-1';


-- =============================================================================
-- STEP 8: INSERT BETS (VENTURES) HIERARCHY
-- =============================================================================

-- Caval (initiative)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    origin_date, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'bets-path'),
    'Caval',
    'nodes/bets/caval',
    'caval-1',
    'Vehicle Services Startup',
    '<p>Vehicle servicing is broken. You don''t know if you''re being overcharged. You don''t know if the work was actually done. You trust mechanics because you have no choice.</p>',
    '<p>Co-founded Caval to fix this. Built a platform connecting vehicle owners with verified service providers. Transparent pricing, tracked service history, user ratings. Results: ₹5L revenue, 4K+ users, 4.6 rating on Play Store. I led design — the app, the UX, the visual identity. What worked: the user need was real. What didn''t: unit economics at scale. Customer acquisition cost was too high for the transaction value. We couldn''t make the math work without raising more than we wanted to. Lesson: Good products can be bad businesses. And that''s okay to learn.</p>',
    '2019-01-01',
    true, true, 'initiative', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Revenue', '₹5 Lakhs', 0
FROM nodes WHERE uuid = 'caval-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Users', '4K+, 4.6 Play Store rating', 1
FROM nodes WHERE uuid = 'caval-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Co-founder, Design Lead', 2
FROM nodes WHERE uuid = 'caval-1';

-- EventHive (initiative)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    origin_date, is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'bets-path'),
    'EventHive',
    'nodes/bets/eventhive',
    'eventhive-1',
    'Event Tech Platform',
    '<p>Event hosting platforms are either too simple (Google Forms) or too complex (enterprise event software). EventHive was the middle ground — powerful enough for real events, simple enough for student organizers.</p>',
    '<p>Co-founded at IIT Madras, raised ₹30L through the pre-incubation program. What worked: product-founder fit. We were the users we were building for. What didn''t: timing. Built this before the event market recovered post-COVID. Demand wasn''t there when we needed it. Lesson: Timing isn''t everything, but it''s a lot.</p>',
    '2018-01-01',
    true, true, 'initiative', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Funding', '₹30 Lakhs Pre-Incubation', 0
FROM nodes WHERE uuid = 'eventhive-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Incubator', 'IIT Madras Incubation Cell', 1
FROM nodes WHERE uuid = 'eventhive-1';


-- =============================================================================
-- STEP 9: INSERT VISUAL PRACTICE HIERARCHY
-- =============================================================================

-- Photography (artifact)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'visual-path'),
    'Photography',
    'nodes/visual-practice/photography',
    'photo-1',
    'Visual Storytelling',
    '<p>Street photography, portraits, and travel documentation capturing moments and stories. What draws me to certain subjects connects to my work on perception — where eyes go, what they ignore, what makes a moment worth preserving.</p>',
    true, true, 'artifact', 0
);

-- Graphic Design & Illustrations (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'visual-path'),
    'Graphic Design & Illustrations',
    'nodes/visual-practice/graphic-design',
    'graphicdesign-path',
    'Visual Design Work',
    '<p>Design isn''t decoration. It''s communication with constraints. Every project here was about solving a problem visually — whether for money, for community, or for the challenge.</p>',
    true, 'path', 1
);

-- NFT Collection (artifact under Graphic Design)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'graphicdesign-path'),
    'NFT Collection',
    'nodes/visual-practice/graphic-design/nft',
    'nft-1',
    'Digital Art Collection',
    '<p>Minted 9+ digital art pieces on OpenSea during the Web3 wave. The art was real; the market was speculative.</p>',
    '<p>What I learned: creating for a market is different from creating for yourself. The NFT work that sold wasn''t my best work — it was my most marketable work. That''s a useful distinction.</p>',
    true, true, 'artifact', 0
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Pieces', '9+ minted', 0
FROM nodes WHERE uuid = 'nft-1';

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'OpenSea', 'https://opensea.io/rudrampiplad', 0
FROM nodes WHERE uuid = 'nft-1';

-- E-Cell Magazine (artifact under Graphic Design)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'graphicdesign-path'),
    'E-Cell Magazine',
    'nodes/visual-practice/graphic-design/ecell-magazine',
    'ecell-1',
    'Editorial Design',
    '<p>Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+, published the first entrepreneurship magazine at the institute.</p>',
    '<p>30K+ copies printed and distributed. Learned more about print production, deadlines, and team management than any class taught.</p>',
    true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Role', 'Chief Designer', 0
FROM nodes WHERE uuid = 'ecell-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Circulation', '30K+ copies', 1
FROM nodes WHERE uuid = 'ecell-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Team', '5+ designers', 2
FROM nodes WHERE uuid = 'ecell-1';

-- Behance Work (artifact under Graphic Design)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'graphicdesign-path'),
    'Behance Work',
    'nodes/visual-practice/graphic-design/behance',
    'behance-1',
    'Design Portfolio',
    '<p>Curated collection of graphic design, branding, and illustration work. 3 featured projects showcasing different aspects of visual design practice.</p>',
    true, 'artifact', 2
);

INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'Behance Profile', 'https://behance.net/rudrampiplad', 0
FROM nodes WHERE uuid = 'behance-1';


-- =============================================================================
-- STEP 10: INSERT TRAJECTORY (EDUCATION) HIERARCHY
-- =============================================================================

-- IIT Madras (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, end_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'trajectory-path'),
    'IIT Madras',
    'nodes/trajectory/iitm',
    'iitm-path',
    'B.Tech & Research',
    '<p>5 years. BTech + MTech in Engineering Design with a specialization in Biomedical Design. This is where I learned to build things — physical and digital.</p>',
    '<p>Why engineering design instead of CS? Because I wanted to understand *how* things are made, not just *that* they work. Design is about intent. Engineering is about constraints. Engineering design is about navigating both.</p>',
    '2015-07-01',
    '2019-05-01',
    true, 'path', 0
);

-- IIM Bangalore (sub-path)
INSERT INTO nodes (parent_id, title, uri, uuid, summary, description, extended_description, origin_date, end_date, is_featured, type, sort_order)
VALUES (
    (SELECT id FROM nodes WHERE uuid = 'trajectory-path'),
    'IIM Bangalore',
    'nodes/trajectory/iimb',
    'iimb-path',
    'MBA',
    '<p>MBA, QS World Rank #31. Why an MBA after working as a PM? Because I hit a ceiling. I could ship products, but I couldn''t shape strategy. I understood users, but I didn''t understand businesses.</p>',
    '<p>The MBA filled gaps — finance, operations, organizational behavior. But more importantly, it gave me time to think about what kind of PM I wanted to be.</p>',
    '2023-06-01',
    '2025-04-01',
    true, 'path', 1
);

-- Engineering Design (artifact under IIT Madras)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iitm-path'),
    'Engineering Design',
    'nodes/trajectory/iitm/engineering-design',
    'engdes-1',
    'B.Tech Program',
    '<p>The department taught systems thinking. Products aren''t features — they''re systems of interactions. Users aren''t users — they''re people with contexts and constraints.</p>',
    '<p>This framing shapes how I approach product management. I don''t think in features. I think in systems.</p>',
    true, 'artifact', 0
);

INSERT INTO node_education (node_id, title, subtitle, year, sort_order)
SELECT id, 'B.Tech Engineering Design', 'IIT Madras', '2019', 0
FROM nodes WHERE uuid = 'engdes-1';

-- Thesis: Photoacoustic Spectroscopy (research under IIT Madras)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iitm-path'),
    'Thesis: Photoacoustic Spectroscopy',
    'nodes/trajectory/iitm/thesis',
    'thesis-1',
    'Masters Research',
    '<p>Masters thesis under Dr. N.J. Vasa (Dean, IIT Madras). Laser photoacoustic spectroscopy for biomedical sensing.</p>',
    '<p>The technical details matter less than what I learned: how to work on a problem for 18 months without clear answers. How to design experiments. How to be wrong repeatedly and keep going.</p>',
    true, true, 'research', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Advisor', 'Dr. N.J. Vasa (Dean, IIT Madras)', 0
FROM nodes WHERE uuid = 'thesis-1';

-- Cross-link: Thesis -> Spatial & Perception
INSERT INTO node_connections (source_node_id, target_node_uuid)
SELECT id, 'spatial-path'
FROM nodes WHERE uuid = 'thesis-1';

-- MBA (artifact under IIM Bangalore)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iimb-path'),
    'MBA',
    'nodes/trajectory/iimb/mba',
    'mba-1',
    'Business Administration',
    '<p>Two years of case studies, group projects, and questioning whether this was worth it. Verdict: yes, but not for the reasons I expected.</p>',
    '<p>The value wasn''t the curriculum. It was the cohort — 400 people from different industries, different functions, different countries. Pattern matching across their experiences taught me more than any case study.</p>',
    true, 'artifact', 0
);

INSERT INTO node_education (node_id, title, subtitle, year, sort_order)
SELECT id, 'MBA', 'IIM Bangalore (QS #31)', '2025', 0
FROM nodes WHERE uuid = 'mba-1';

-- NCCU Exchange Taipei (artifact under IIM Bangalore)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'iimb-path'),
    'NCCU Exchange Taipei',
    'nodes/trajectory/iimb/nccu-exchange',
    'nccu-1',
    'International Exchange',
    '<p>Exchange semester at National Chengchi University, FT MiM Rank #96.</p>',
    '<p>Why Taiwan? Curiosity about East Asian tech ecosystems. How TSMC thinks about manufacturing. How Taiwanese startups approach hardware. A different perspective on building.</p>',
    true, true, 'artifact', 1
);

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Location', 'Taipei, Taiwan', 0
FROM nodes WHERE uuid = 'nccu-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Focus', 'East Asian tech ecosystems, Hardware startups', 1
FROM nodes WHERE uuid = 'nccu-1';


-- =============================================================================
-- STEP 11: INSERT FOOTNOTES (ACHIEVEMENTS) HIERARCHY
-- =============================================================================

-- HCL-CA TechJam (recognition)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'footnotes-path'),
    'HCL-CA TechJam',
    'nodes/footnotes/techjam',
    'techjam-1',
    'National Tech Competition',
    '<p>Winner, 1 of 8,300 participants. Sydney. USD 3,000 prize. Funded by Cricket Australia and Microsoft.</p>',
    '<p>The lesson: hackathon wins are about scope management as much as technical skill.</p>',
    true, true, 'recognition', 0
);

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'HCL-CA TechJam', 'Winner (1 of 8,300)', '2018', 0
FROM nodes WHERE uuid = 'techjam-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Prize', 'USD 3,000', 0
FROM nodes WHERE uuid = 'techjam-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Location', 'Sydney, Australia', 1
FROM nodes WHERE uuid = 'techjam-1';

-- ITC Interrobang (recognition)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, is_highlighted, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'footnotes-path'),
    'ITC Interrobang',
    'nodes/footnotes/interrobang',
    'interrobang-1',
    'Case Competition',
    '<p>Runner-up, 2 of 600+ teams. Season 10. Pre-placement interview offer, ₹74,000 prize.</p>',
    '<p>An ideation challenge that taught me how to pitch. The winning idea wasn''t my best idea — it was my most communicable idea.</p>',
    true, true, 'recognition', 1
);

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'ITC Interrobang', 'Runner-up (2 of 600+)', '2024', 0
FROM nodes WHERE uuid = 'interrobang-1';

INSERT INTO node_metadata (node_id, title, subtitle, sort_order)
SELECT id, 'Prize', '₹74,000 + PPI offer', 0
FROM nodes WHERE uuid = 'interrobang-1';

-- GATE & JEE Ranks (recognition)
INSERT INTO nodes (
    parent_id, title, uri, uuid, summary, description, extended_description,
    is_featured, type, sort_order
) VALUES (
    (SELECT id FROM nodes WHERE uuid = 'footnotes-path'),
    'GATE & JEE Ranks',
    'nodes/footnotes/ranks',
    'gatejee-1',
    'Academic Achievements',
    '<p>All India Rank 113, GATE Biomedical Engineering 2020. All India Rank 77 (category), JEE Main Paper 2, 2016.</p>',
    '<p>Test scores. They opened doors. They don''t define capability.</p>',
    true, 'recognition', 2
);

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'GATE Biomedical', 'AIR 113', '2020', 0
FROM nodes WHERE uuid = 'gatejee-1';

INSERT INTO node_recognition (node_id, title, subtitle, year, sort_order)
SELECT id, 'JEE Main Paper 2', 'AIR 77 (category)', '2016', 1
FROM nodes WHERE uuid = 'gatejee-1';


-- =============================================================================
-- MIGRATION COMPLETE! 
-- =============================================================================
-- 
-- Now verify your data by running these queries:
-- 

-- Count nodes by type
SELECT type, COUNT(*) as count
FROM nodes 
GROUP BY type
ORDER BY count DESC;

-- View all titles in tree order
SELECT 
    REPEAT('  ', CASE 
        WHEN p3.id IS NOT NULL THEN 3
        WHEN p2.id IS NOT NULL THEN 2
        WHEN p1.id IS NOT NULL THEN 1
        ELSE 0
    END) || n.title as hierarchy,
    n.type,
    n.uuid
FROM nodes n
LEFT JOIN nodes p1 ON n.parent_id = p1.id
LEFT JOIN nodes p2 ON p1.parent_id = p2.id
LEFT JOIN nodes p3 ON p2.parent_id = p3.id
ORDER BY n.sort_order, n.title;

-- View all cross-links
SELECT 
    s.title as source,
    nc.target_node_uuid as links_to
FROM node_connections nc
JOIN nodes s ON nc.source_node_id = s.id;

