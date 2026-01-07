# GitHub Links Update

**Date:** January 7, 2026  
**Status:** ✅ Complete

---

## Issue

GitHub links were using incorrect username `rudramroseate8` instead of `roseate8`.

---

## Changes Made

Updated all GitHub repository links to use the correct username: `roseate8`

### Links Updated (4 fixes)

1. **Butler Expense Agent**
   - Old: `https://github.com/rudramroseate8/butler-travel-expense-agent`
   - New: `https://github.com/roseate8/butler-travel-expense-agent`

2. **Chunking Strategies**
   - Old: `https://github.com/rudramroseate8/chunking-strategy-experiments`
   - New: `https://github.com/roseate8/chunking-strategy-experiments`

3. **Document Parsing (document-parser-for-rag)**
   - Old: `https://github.com/rudramroseate8/document-parser-for-rag`
   - New: `https://github.com/roseate8/document-parser-for-rag`

4. **Document Parsing (doc-parsers)**
   - Old: `https://github.com/rudramroseate8/doc-parsers`
   - New: `https://github.com/roseate8/doc-parsers`

---

## All GitHub Links in Portfolio (Verified ✅)

| Node | Repository | URL | Status |
|------|------------|-----|--------|
| **Contact & Links** | Profile | https://github.com/roseate8 | ✅ |
| **GraphRAG** | graph-rag-trials | https://github.com/roseate8/graph-rag-trials | ✅ |
| **Document Parsing** | document-parser-for-rag | https://github.com/roseate8/document-parser-for-rag | ✅ |
| **Document Parsing** | doc-parsers | https://github.com/roseate8/doc-parsers | ✅ |
| **Chunking Strategies** | chunking-strategy-experiments | https://github.com/roseate8/chunking-strategy-experiments | ✅ |
| **Butler Expense Agent** | butler-travel-expense-agent | https://github.com/roseate8/butler-travel-expense-agent | ✅ |
| **Butler Expense Agent** | expense-agents-ui-lovable | https://github.com/roseate8/expense-agents-ui-lovable | ✅ |
| **AI Ethics Framework** | applied-ai-ethics | https://github.com/roseate8/applied-ai-ethics | ✅ |
| **Foveated Rendering** | foveated-rendering-virtual-reality | https://github.com/roseate8/foveated-rendering-virtual-reality | ✅ |
| **AED in VR** | automated-external-defibrillator-in-vr | https://github.com/roseate8/automated-external-defibrillator-in-vr | ✅ |
| **3D Printing VR** | 3d-printing-in-vr | https://github.com/roseate8/3d-printing-in-vr | ✅ |

**Total GitHub links:** 11 (all using correct username `roseate8`)

---

## Repository Visibility Reference

From your GitHub profile:

### Public Repositories (9)
- ✅ portfolio-product
- ✅ expense-agents-ui-lovable
- ✅ graph-rag-trials
- ✅ chunking-strategy-experiments
- ✅ document-parser-for-rag
- ✅ doc-parsers
- ✅ text_classification_capstone
- ✅ football-crunching
- ✅ intracranial-hemorrhage-detection-deep-learning
- ✅ automated-external-defibrillator-in-vr
- ✅ 3d-printing-in-vr
- ✅ foveated-rendering-virtual-reality
- ✅ battery-state-of-charge-prediction
- ✅ ar-mobile-games-unity

### Private Repositories (5)
- 🔒 butler-travel-expense-agent
- 🔒 applied-ai-ethics
- 🔒 interview-notes
- 🔒 desktop-tutorial
- 🔒 job-scraper

**Note:** Private repositories will require authentication to access. Portfolio links will work for you when logged into GitHub, but visitors will see a 404 page.

---

## Repositories Not Currently in Portfolio

These repositories from your list are not currently linked in the portfolio:

- interview-notes (Private)
- desktop-tutorial (Private)
- job-scraper (Private)
- text_classification_capstone (Public)
- football-crunching (Public)
- intracranial-hemorrhage-detection-deep-learning (Public)
- battery-state-of-charge-prediction (Public)
- ar-mobile-games-unity (Public) - Note: AR Mobile Games node exists but has no GitHub link

### AR Mobile Games Missing Link

The AR Mobile Games node (`argames-1`) exists but has no GitHub link. According to the graph notes, this was intentional:

> "First-timer mistakes, documented. Built and published AR games on mobile using Unity. Forgot to push code to GitHub. Used Git only locally. The games shipped. The codebase didn't survive."

If you want to add the link now that the repository exists:

```sql
INSERT INTO node_links (node_id, title, url, sort_order)
SELECT id, 'GitHub: ar-mobile-games-unity', 'https://github.com/roseate8/ar-mobile-games-unity', 0
FROM nodes WHERE uuid = 'argames-1';
```

---

## Migration Applied

**Migration:** `fix_github_urls`

```sql
-- Updated 4 GitHub links from rudramroseate8 to roseate8
UPDATE node_links SET url = 'https://github.com/roseate8/...' 
WHERE url LIKE '%rudramroseate8%';
```

---

## Verification

All GitHub links now use the correct username `roseate8` and point to valid repositories. ✅

**Status:** Ready for production

