# Portfolio

A responsive, node-based portfolio website built with vanilla JavaScript, D3.js, and Supabase.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Open in Browser

Go to: **http://localhost:3000**

---

## 📁 Project Structure

```
portfolio-product/
│
├── assets/                   # Frontend assets
│   ├── js/                   # JavaScript files
│   │   ├── app.js            # Main entry point
│   │   ├── components/       # UI components (Map, Page, Slider)
│   │   └── utils/            # Utilities (Data, Router)
│   ├── css/                  # Stylesheets (SCSS)
│   ├── data/                 # Static data (portfolio.json)
│   ├── fonts/                # Web fonts
│   └── img/                  # Images and icons
│
├── backend/                  # Backend code
│   └── supabase.js           # Supabase database integration
│
├── docs/                     # Documentation
│   ├── SUPABASE_SETUP_GUIDE.md
│   └── SUPABASE_IMPLEMENTATION_SUMMARY.md
│
├── index.html                # Main HTML file
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
└── .env                      # Environment variables (create this!)
```

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run snapshot` | Refresh `assets/data/portfolio.json` from Supabase (runs automatically before every build) |
| `npm test` | Run the test suite |
| `npm run test:watch` | Re-run tests on change |

---

## 📊 Data Sources

The portfolio supports two data sources:

| Source | Description | When Used |
|--------|-------------|-----------|
| **Supabase** | Online database | Primary (default) |
| **portfolio.json** | Static JSON file | Fallback if Supabase fails |

### The fallback snapshot

`assets/data/portfolio.json` is generated, not hand-written, and is gitignored.
`npm run snapshot` writes it from live Supabase data, and it runs automatically
before every build (`prebuild`), so each deploy ships a snapshot taken at build
time. If Supabase is down when a visitor arrives, they get slightly stale content
instead of an empty graph.

The script never fails a build: with no credentials, no network, or a suspiciously
empty database, it warns, leaves any existing snapshot in place, and exits 0.
On Vercel and in CI it picks up `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
from the environment.

### Diagnosing a stale or empty graph

Nothing about data problems is shown to visitors. Check the console, or:

```javascript
window.__portfolio
// { ok: true, dataSource: 'json-fallback', error: '...', nodeCount: 42, ... }
```

### To switch data sources:

Edit `assets/js/utils/Data.js`:

```javascript
const CONFIG = {
    useSupabase: true,  // true = Supabase, false = JSON only
    ...
}
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

These are safe to use in frontend code - they only allow reading public data.

---

## 🗄️ Database (Supabase)

The portfolio data is stored in Supabase with these tables:

- **nodes** - Main portfolio items (projects, paths, info)
- **node_links** - External URLs
- **node_metadata** - Key-value metadata
- **node_media** - Images and photos
- **node_education** - Education history
- **node_recognition** - Awards
- **node_footnotes** - Notes and citations
- **node_connections** - Cross-references between nodes

### Which nodes stay visible in the graph

Two columns on `nodes` control the condensed views, so content edits do not need
a code change:

| Column | Effect |
|--------|--------|
| `show_on_homepage` | Node stays visible on the homepage graph even though it sits below the first level (e.g. ThoughtSpot under Industry Work) |
| `show_with_parent` | Node stays visible when an ancestor is opened, instead of collapsing away (e.g. IIT Madras and IIM Bangalore under Information) |

Run `backend/add_homepage_flags.sql` once to add and backfill them. Until then
`Map.js` falls back to its legacy hardcoded UUID lists and warns in the console,
so the migration and a deploy can happen in either order.

### Manage Your Data

- **Dashboard:** https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx
- **Table Editor:** https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx/editor

---

## 🐛 Troubleshooting

### "Missing Supabase credentials" error
→ Create the `.env` file with the correct values (see Quick Start)

### Data not loading
→ Check browser console (F12 → Console) for detailed logs, and `window.__portfolio`
for the source, error and node count. Data failures are never rendered into the page.

### Changes not appearing
→ Hard refresh: `Ctrl + Shift + R`

---

## 📚 Documentation

- **Quick Start:** This file
- **✅ Migration Completed:** `backend/MIGRATION_COMPLETED.md` ← Data migration summary
- **Data Status:** `DATA_SITUATION.md` ← Current status (all real data loaded)
- **Backend Integration:** `backend/supabase.js`
- **Migration Script:** `backend/migrate_real_data.sql`
- **Database Setup:** `docs/SUPABASE_SETUP_GUIDE.md`
- **Implementation:** `docs/SUPABASE_IMPLEMENTATION_SUMMARY.md`
- **Photography with Storage:** `docs/PHOTOGRAPHY_SUPABASE_STORAGE.md`
- **Information Node Reorganization:** `docs/INFORMATION_NODE_REORGANIZATION.md`

---

## ✨ Features

### 📸 Photography Collections
- **Taipei:** 5 photos from MBA exchange in Taiwan
- **Bangalore:** 3 photos from Garden City
- Images stored in Supabase Storage (CDN-optimized)
- Automatic URL generation and lazy loading
- Easy to add new locations

### 🗺️ Interactive Node Graph
- D3.js-powered visualization
- First-level hierarchy rendering
- Click any node to explore its content
- Path back to root always visible

### 📝 Dynamic Content Management
- All content managed through Supabase
- 8-table database architecture
- Real-time updates without code changes
- Fallback to static JSON if needed

---

## 🔧 Tech Stack

- **Frontend:** Vanilla JavaScript, D3.js, Rough.js
- **Styling:** SCSS
- **Build Tool:** Vite
- **Database:** Supabase (PostgreSQL)
- **Fonts:** Space Grotesk

---

## 📝 License

See `LICENSE` file.
