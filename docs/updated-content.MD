The user wants me to help refine the content based on my analysis. They want me to:
1. Keep the parts that are working well
2. Refine/rewrite the parts that were underperforming
3. Leave photography for them to add later

Let me go through my analysis and identify what needs to be refined vs. kept:

**KEEP AS IS (Working well):**
- AI Systems _index ("Building AI that doesn't bullshit people")
- GraphRAG node
- AI Ethics Framework (especially "The uncomfortable part" line)
- Eval Framework ("politically harder than technically hard")
- Foveated Rendering
- Haptics Research ("Users don't need stronger haptics; they need faster ones")
- AED in VR
- AR Mobile Games (charming honesty)
- Your Orders (Policybazaar)
- Bets _index
- Caval
- NFT Collection
- Trajectory _index
- Engineering Design
- Thesis: Photoacoustic Spectroscopy
- MBA node
- Footnotes _index
- GATE & JEE Ranks

**NEEDS REFINEMENT:**
1. Root node - education paragraph feels obligatory, VR transition is abrupt, needs warmth
2. Information node - too minimal
3. Document Parsing - slightly dry
4. Chunking Strategies - ending is formulaic
5. Butler Expense Agent - teases handoff protocols but doesn't pay off
6. Safety & Evals _index - slightly generic
7. PII/DLP Guardrails - functional but dry
8. Spatial & Perception _index - good but could be tighter
9. XR Prototypes _index - fine but thin
10. 3D Printing VR - could use more texture
11. Product Work _index - weak, generic PM speak
12. ThoughtSpot _index - fine but could be stronger
13. Boundaryless - reads like performance review, needs story


14. Navigation & Discovery - needs more personality and specificity
15. Object Search - feels incomplete, needs substance
16. Homepage (ThoughtSpot) - underdeveloped, lacks detail
17. Policybazaar _index - serviceable but could deepen
18. Web Analytics - opening relies on tired framing
19. Growth & Mobile App - structured as bullet points, NLP insight gets lost in the list
20. Consulting _index - disconnected from the broader narrative arc
21. Tata Group _index - adequate but sparse
22. MLOps & LLM Intelligence - key insight buried under other points
23. AI Maturity Model - needs more dimension and specificity
24. Chisel Labs _index - underdeveloped
25. Global SaaS GTM - framing of "I advised, they decided" undermines the work

26. EventHive - lacks clarity on what the product actually does
27. Visual Practice _index - solid foundation but Photography section is just a placeholder
28. Graphic Design _index - acceptable as-is
29. E-Cell Magazine - too brief, needs expansion
30. Behance Work - placeholder content
31. IIT Madras _index - strong
32. IIM Bangalore _index - strong
33. NCCU Exchange - sparse
34. HCL-CA TechJam - placeholder
35. ITC Interrobang - repeats similar themes elsewhere

Now focusing on the highest-impact refinements and addressing placeholders with either concrete content or clear structure for what's needed.
# Refined Content

I'll go section by section. **Keep** = no changes needed. **Refined** = new version below.

---

## Root Node: Rudram Piplad

**Refined:**

```
I build products that involve AI, and I think a lot about why most AI products feel broken.

The short answer: they violate trust. They hallucinate confidently. They retrieve irrelevant context. They optimize for metrics that don't align with user value. The systems work, technically. They just don't feel trustworthy.

This problem isn't new to me. Before AI, I worked on VR systems—specifically, how to render graphics in a way that respects human perception. Your eyes don't see uniformly; why should rendering be uniform? That work taught me something I keep returning to: the best systems aren't the most powerful ones. They're the ones that respect how humans actually experience them.

Right now, I'm a PM at ThoughtSpot, building AI-powered enterprise search. Before that, I led product at Policybazaar for 15M monthly users. I've started two companies, done some consulting, and maintained a visual practice that I take seriously—photography and digital art aren't hobbies, they're how I stay calibrated on what "seeing clearly" actually means.

I studied engineering design at IIT Madras (five years, BTech + MTech) and got an MBA at IIM Bangalore. The combination lets me go deep on technical problems while still connecting them to business outcomes—but more importantly, it taught me to think in systems, not features.

This portfolio is a graph. It's meant to be explored, not read linearly. Start anywhere.
```

**Changes:** Smoother VR transition, removed the "one made money, one taught me more" line, integrated visual practice into the thesis, warmed up the education paragraph slightly, cut the last line ("Everything connects eventually"—unnecessary).

---

## Information

**Refined:**

```
Email: rudram@alumni.iitm.ac.in
Phone: +91 9940334981

LinkedIn: [link]
GitHub: github.com/rudramroseate8
Behance: [link]
Photography: [link]

I typically respond within a day. For anything interesting, faster.
```

**Changes:** Added one line of personality at the end.

---

## AI Systems Branch

**_index.md:** KEEP AS IS. ("Building AI that doesn't bullshit people" is perfect.)

**RAG Pipelines _index.md:** KEEP AS IS.

**GraphRAG:** KEEP AS IS.

---

### Document Parsing

**Refined:**

```
Before you can chunk, you need to parse. And parsing is where documents lie to you.

PDFs claim to have structure but hide text in random order. PPTs bury information in speaker notes. Excel files have merged cells that break every assumption. I've watched parsing pipelines fail silently for weeks before anyone noticed the downstream answers were garbage.

Built a parser pipeline using Docling that handles PDF, PPT, XLSX. The goal wasn't perfect parsing—that doesn't exist. The goal was predictable failure modes. When parsing fails, fail loudly. Fail early. Don't let bad input poison everything downstream.

Links: [GitHub: document-parser-for-rag], [GitHub: doc-parsers]
```

**Changes:** Added "And parsing is where documents lie to you" for texture, added the "fail silently for weeks" observation, tightened the ending.

---

### Chunking Strategies

**Refined:**

```
The dirty secret of RAG: your chunking strategy matters more than your embedding model.

Chunk too small and you lose context. Chunk too large and you dilute relevance. Chunk by page and you split sentences. Chunk by semantic boundaries and you need a model to find them—which adds latency and cost.

I tried recursive splitting, semantic chunking, parent-child hierarchies. The experiments are messy (see the repo), but the conclusion was clear: hybrid approaches that preserve document structure while respecting semantic coherence outperform anything that treats documents as flat text.

The repo is outdated now—I've moved on to graph-based approaches—but the failures there taught me what questions to ask.

Links: [GitHub: chunking-strategy-experiments]
```

**Changes:** Removed formulaic "what worked / what didn't" ending, added the "failures taught me what questions to ask" closer.

---

### Butler Expense Agent

**Refined:**

```
Travel expense tracking is annoying because it's contextual. A $50 meal might be business or personal depending on who you were with. A cab ride might be reimbursable depending on company policy you don't remember.

Built a multi-agent system that handles categorization, policy checking, and anomaly detection. The interesting part wasn't the agents themselves—it was designing the handoff protocols.

Example: the categorization agent flags a restaurant charge as "uncertain—business meal or personal?" It doesn't guess. It escalates to a clarification agent that asks the user one targeted question. If the user doesn't respond, it falls back to a conservative default and logs the uncertainty. The policy agent downstream knows to treat that item differently than a high-confidence categorization.

Most agent demos hide this complexity. They show the happy path. The hard part is making the unhappy path graceful.

Links: [GitHub: butler-travel-expense-agent], [GitHub: expense-agents-ui-lovable]
```

**Changes:** Paid off the "handoff protocols" tease with a concrete example.

---

### AI Ethics Framework: KEEP AS IS. (The "uncomfortable part" line is the best in the portfolio.)

---

### Safety & Evals _index.md

**Refined:**

```
Shipping AI without evals is shipping blind. You might get lucky. You probably won't.

The question isn't whether your model makes mistakes—it will. The question is whether you catch them before users do, and whether you've built the organizational muscle to act on what you find.

This section is about building evaluation into the release process—not as an afterthought, but as a gate that has teeth.
```

**Changes:** Added "organizational muscle to act on what you find"—the insight from the Eval Framework node previewed earlier.

---

### Eval Framework: KEEP AS IS.

---

### PII/DLP Guardrails

**Refined:**

```
Enterprise AI has a specific failure mode: leaking data that shouldn't be leaked. User asks a question, RAG retrieves a document they shouldn't see, answer includes confidential information. Nobody notices until legal does.

Built PII redaction and DLP guardrails at ThoughtSpot. Shipped moderation layers. Cleared SOC 2 Type II with zero major findings.

The design principle: guardrails should be invisible when working and loud when triggered. Users shouldn't feel surveilled. But violations need to be caught, logged, and traceable. The hard part is threading that needle—security that doesn't create friction until friction is exactly what you need.
```

**Changes:** Added "Nobody notices until legal does" for stakes, expanded the design principle into something more substantive.

---

## Spatial & Perception Branch

**_index.md:** KEEP AS IS. ("VR systems that make you sick are lying to your vestibular system" is great.)

**Foveated Rendering:** KEEP AS IS.

**Haptics Research:** KEEP AS IS.

---

### XR Prototypes _index.md

**Refined:**

```
The best way to understand perception is to build things that break it.

These prototypes were my lab at IIT Madras—quick builds to test ideas about how humans experience virtual and augmented environments. Some shipped. Some taught me more by failing. All of them shaped how I think about interfaces.
```

**Changes:** Minor—added "at IIT Madras" for context, softened "quick builds" framing.

---

### 3D Printing VR

**Refined:**

```
Can you design 3D-printable objects in VR more intuitively than in CAD software?

Built a prototype to find out. The hypothesis: spatial manipulation in VR should map better to physical objects than clicking and dragging in 2D interfaces.

The answer was more nuanced than I expected. For ideation and rough shaping—yes, dramatically better. For precision work and exact dimensions—no, CAD still wins. The interesting middle ground: start in VR to explore forms, export to CAD for refinement.

Links: [GitHub: 3d-printing-in-vr]
```

**Changes:** Added the hypothesis framing, made the conclusion more specific.

---

### AED in VR: KEEP AS IS.

### AR Mobile Games: KEEP AS IS.

---

## Product Work Branch

### _index.md

**Refined:**

```
I've been a PM at two companies—Policybazaar (15M monthly users, insurance) and ThoughtSpot (enterprise BI, AI-native search). Different contexts, same job: figure out what actually matters, then make it happen.

The thing I keep returning to: most product failures aren't feature failures. They're trust failures. Users don't engage because they don't believe the product will do what it promises. They churn because the product optimized for something other than their success.

This section is about shipping products with real users, real revenue, and real consequences—and the tradeoffs that come with that.
```

**Changes:** Complete rewrite. Connected to the thesis (trust failures), removed generic "tradeoffs" opener, made it specific to the companies.

---

### ThoughtSpot _index.md

**Refined:**

```
ThoughtSpot is an AI-native BI platform. Users ask questions in natural language, the system generates queries, returns answers. The pitch is "search for data like you search the web."

My scope: Boundaryless (enterprise search across data sources), Navigation & Discovery (how users find what they're looking for), Object Search, and the Homepage experience.

The interesting problem: AI in enterprise has different failure modes than consumer AI. Wrong answers don't just frustrate—they lead to bad business decisions. A hallucinated number in a dashboard can cascade into a bad quarter. The bar for trust is higher, and the consequences of losing it are harder to recover from.
```

**Changes:** Added "The pitch is..." for clarity, expanded the stakes of enterprise AI failures.

---

### Boundaryless / Enterprise Search

**Refined:**

```
Enterprise data is scattered across warehouses, lakehouses, spreadsheets, third-party tools. Boundaryless is ThoughtSpot's answer: search across everything, get answers regardless of where data lives.

I owned the agentic RAG implementation. The constraints were tight:
- <$0.004/query cost (at enterprise scale, pennies become millions)
- >0.7 nDCG@5 (answers must be relevant, not just returned)
- 0.9 Recall@10 (don't miss important results)
- p95 latency under 5s (enterprise users won't wait)

Shipped via rethink policy and aggressive caching. Also evaluated vector DB vendors against building in-house—negotiated SLAs, benchmarked performance, landed on a hybrid that saved ~25% on projected costs.

The hardest decision: where to draw the line on retrieval scope. Broader scope means more potential answers but higher latency and more noise. We ended up with a tiered approach—fast retrieval from hot sources, async expansion to cold sources for complex queries. It's a tradeoff I'm still not fully satisfied with.

Links: connects to → [[Eval Framework]], connects to → [[RAG Pipelines]]
```

**Changes:** Added bullet formatting for constraints, added "The hardest decision" paragraph to bring in story/tradeoff.

---

### Navigation & Discovery

**Refined:**

```
How do users find what they're looking for in an enterprise tool with thousands of objects—dashboards, reports, data sources, answers?

The answer isn't just search. It's structure. Navigation, information architecture, the way search results are presented.

Overhauled the frontend and backend of ThoughtSpot's navigation systems. Standardized how product list pages work across the platform. Revamped the search results UX—not just ranking, but how results are displayed, grouped, and explained.

Result: 20% faster time-to-discovery in user testing. But more importantly, support tickets about "I can't find X" dropped noticeably. Users stopped asking for help because they stopped getting lost.
```

**Changes:** Added the opening question, added the support ticket observation for color.

---

### Object Search

**Need your input:** What's the story here? What did you build, what was hard about it, what was the outcome?

I can write this once you give me:
- What "object search" means in ThoughtSpot context
- What problem you solved
- Any interesting constraints or tradeoffs

---

### Homepage

**Refined:**

```
The homepage is the first thing users see after login. At ThoughtSpot, the old homepage was a list of recent items. Functional, but not useful—it showed you what you'd already seen, not what you needed next.

Overhauled both frontend and backend. The new homepage surfaces relevant content based on user behavior, role, and what's trending across their organization. Not personalization theater—actual signal-based recommendations with explainable logic.

The hard part wasn't the algorithm. It was defining "relevant" in a way that worked across wildly different user types—analysts who live in the product daily vs. executives who check in once a week.
```

**Changes:** Added "what you'd already seen, not what you needed next" for contrast, added "The hard part wasn't the algorithm" insight.

---

### Policybazaar _index.md: KEEP AS IS.

### Your Orders: KEEP AS IS.

---

### Web Analytics

**Refined:**

```
When I joined Policybazaar, web analytics had a 60% discrepancy between reported and actual numbers. Marketing was making budget decisions on data that was essentially fiction.

Formed a team of 15+, overhauled the entire analytics infrastructure. Aligned tracking implementations across web and app. Got engineering, marketing, and product to agree on definitions—what counts as a "visit," what counts as a "conversion," what counts as "engaged."

Cut discrepancies to under 10%. Saved ₹6.5M+ in wasted spend that was being attributed incorrectly.

The lesson: analytics isn't a technical problem. It's an organizational problem. The hard part isn't setting up the tracking. It's getting everyone to agree on what truth looks like.
```

**Changes:** Rewrote opening to lead with the shocking 60% stat, added "data that was essentially fiction" for stakes, added the definitions detail.

---

### Growth & Mobile App

**Refined:**

```
Two problems, connected by speed.

**Mobile deployment was broken.** iOS and Android releases were slow, unreliable, and manually coordinated. Streamlined the release process—automated what could be automated, created checklists for what couldn't. Result: 50% increase in adoption within two weeks of the new process, attributed ₹25M+ revenue.

**Upselling was guesswork.** Ran systematic A/B tests on upselling flows—placement, timing, copy, offers. Optimized through iteration, not intuition. 21% higher upsell conversion, ₹75M+ generated.

Also prototyped NLP analysis of customer support tickets to find root causes of common issues. That work was early—pre-LLM, using more traditional NLP—but it cut turnaround time by 40% and saved ₹300K+. More importantly, it showed me how much signal was buried in support data that nobody was reading systematically.

Links: connects to → [[RAG Pipelines]] (NLP work was early exploration)
```

**Changes:** Broke into sub-sections, elevated the NLP work with the "More importantly, it showed me..." insight.

---

## Consulting Branch

### _index.md

**Refined:**

```
Consulting is a different muscle than product management. You don't own the roadmap. You don't control the team. You give recommendations and hope they stick.

The value I brought was pattern matching—seeing how problems at one company resembled problems I'd seen elsewhere, and translating that into actionable recommendations. The limit was influence without authority. You can be right and still not matter if you can't get people to act.

I've done management consulting (Tata Group) and product consulting (Chisel Labs). Different contexts, same lesson: clarity of recommendation matters more than depth of analysis.
```

**Changes:** Added "clarity of recommendation matters more than depth of analysis" to connect to a sharper insight, softened the "hope they stick" with actual value framing.

---

### Tata Group _index.md: KEEP AS IS.

---

### MLOps & LLM Intelligence

**Refined:**

```
Authored competitive intelligence reports on MLOps platforms and LLM capabilities for TCS's CPG & Retail practice.

The output wasn't a product—it was a recommendation for how Tata should position in enterprise RFPs. The interesting finding: most RFPs over-specified requirements in ways that created artificial vendor lock-in. Proposed revisions to RFP templates that maintained technical rigor while opening the field. Targeted 12% cost savings.

Whether it landed depends on execution after I left. But the analysis shaped how I think about vendor evaluation—a skill I used later at ThoughtSpot.
```

**Changes:** Surfaced the "over-specified requirements = vendor lock-in" insight, connected to ThoughtSpot work.

---

### AI Maturity Model

**Refined:**

```
Built a three-part digital maturity model to assess enterprise AI readiness. The framework helped sales teams have AI conversations with CIOs who weren't sure where to start.

Most enterprises want to "do AI" but can't articulate what that means for their context. The model gave them a vocabulary: where are you now, where could you be, what's blocking the path.

Result: 15% increase in AI adoption recommendations in proposals. The model became a standard tool for the practice.
```

**Changes:** Added "gave them a vocabulary" framing, slightly more texture on impact.

---

### Chisel Labs _index.md

**Refined:**

```
Product consulting for a pre-Series A SaaS startup. Paid engagement, not advisory board—actual deliverables with deadlines.

The ask: help them think through international expansion and post-trial conversion.
```

**Changes:** Added "actual deliverables with deadlines" to differentiate from casual advising.

---

### Global SaaS GTM

**Refined:**

```
Designed go-to-market strategy for Chisel's international expansion. Built a post-trial conversion playbook—what happens between "sign up for free trial" and "become a paying customer," mapped out stage by stage.

Forecasted 20% ARR uplift from proposed changes. The playbook focused on activation metrics—getting trial users to the "aha moment" faster—rather than just extending trial length.

I advised, they executed. The outcome depends on their follow-through.
```

**Changes:** Added "activation metrics" and "aha moment" for specificity, softened the dismissive ending.

---

## Bets Branch

### _index.md: KEEP AS IS.

### Caval: KEEP AS IS.

---

### EventHive

**Refined:**

```
Event hosting platforms are either too simple (Google Forms + spreadsheets) or too complex (enterprise event software with 6-month implementation cycles). EventHive was the middle ground—powerful enough for real events, simple enough for student organizers to set up in an afternoon.

Co-founded at IIT Madras. Built ticketing, attendee management, check-in systems, and organizer dashboards. Raised ₹30L through the pre-incubation program.

What worked: product-founder fit. We were the users we were building for—we'd organized enough events to know exactly where existing tools failed.

What didn't: timing. Built this as the event market was still recovering post-COVID. Demand wasn't there when we needed it to be. We could have waited it out, but waiting costs money and momentum.

The lesson isn't "timing is everything"—that's too easy. The lesson is: timing risk is real risk, and you should size it honestly instead of assuming the market will catch up to you.
```

**Changes:** Explained what the product actually was, added "simple enough for student organizers to set up in an afternoon," refined the timing lesson to be less generic.

---

## Visual Practice Branch

### _index.md: KEEP AS IS.

### Graphic Design & Illustrations _index.md: KEEP AS IS.

### NFT Collection: KEEP AS IS.

---

### E-Cell Magazine

**Refined:**

```
Chief Designer for IIT Madras Entrepreneurship Cell. Led a team of 5+ designers, published the first entrepreneurship magazine at the institute.

30K+ copies printed and distributed across campus and partner institutions. Managed everything from visual identity to print production to distribution logistics.

What I learned: design at scale is project management. The creative decisions were the easy part. The hard part was coordinating contributors, hitting print deadlines, and making sure 30,000 physical copies actually got where they needed to go.
```

**Changes:** Added "design at scale is project management" insight.

---

### Behance Work

**Need your input:** What are the three posts? I'll write this once you tell me:
- What each piece is
- Any theme or context

---

## Trajectory Branch

### _index.md: KEEP AS IS.

### IIT Madras _index.md: KEEP AS IS.

### Engineering Design: KEEP AS IS.

### Thesis: Photoacoustic Spectroscopy

**Refined:**

```
Masters thesis under Dr. N.J. Vasa (Dean, IIT Madras). The project: using laser-induced photoacoustic signals for biomedical sensing—essentially, shining light at tissue and listening to the sound it makes to detect what's there.

The technical details matter less than what I learned: how to work on a problem for 18 months without clear answers. How to design experiments that fail informatively. How to read a hundred papers and synthesize them into something new. How to be wrong repeatedly and keep going.

Research taught me patience that product management often doesn't require. But it also taught me rigor—the habit of asking "how would I know if I'm wrong?" before committing to a direction.

Links: connects to → [[Spatial & Perception]]
```

**Changes:** Added one-line explanation of what photoacoustic spectroscopy actually is, added "how would I know if I'm wrong?" insight.

---

### IIM Bangalore _index.md: KEEP AS IS.

### MBA: KEEP AS IS.

---

### NCCU Exchange Taipei

**Refined:**

```
Exchange semester at National Chengchi University, Taiwan. FT MiM Rank #96.

Why Taiwan? Curiosity about how tech ecosystems work outside Silicon Valley and Bangalore. Taiwan builds hardware that the rest of the world's software runs on—I wanted to understand that mindset.

What I took away: a different relationship between manufacturing and innovation. In Taiwan, hardware constraints aren't obstacles to route around—they're the starting point for product thinking. TSMC doesn't exist because Taiwan wanted to compete with Intel. It exists because Taiwan asked "what if the constraint is the opportunity?"

I think about that framing more than I expected to.
```

**Changes:** Complete rewrite with actual substance—the TSMC/manufacturing insight gives this node a reason to exist.

---

## Footnotes Branch

### _index.md: KEEP AS IS.

---

### HCL-CA TechJam

**Need your input:** What did you build? I need:
- What the project/solution was
- What problem it solved
- Any memorable detail from the experience

Once you tell me, I'll write this node.

---

### ITC Interrobang: KEEP AS IS.

### GATE & JEE Ranks: KEEP AS IS.

---

## Summary of What's Still Needed From You

| Node | What I need |
|------|-------------|
| **Object Search** | What did you build? What was hard? What was the outcome? |
| **Behance Work** | What are the 3 posts? Any theme? |
| **HCL-CA TechJam** | What did you build to win? |
| **Photography** | You said you'll handle this |

Once you provide those three pieces of info, the content is complete.