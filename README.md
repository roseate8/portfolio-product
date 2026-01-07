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
VITE_SUPABASE_URL=https://eeuvtdgwdjerdsumowmx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldXZ0ZGd3ZGplcmRzdW1vd214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzIyMDIsImV4cCI6MjA4MzIwODIwMn0.NIHXxWnHCR-GThu5zoRZyE3vIEVJSt6pfIiVTl3L2Mo
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

---

## 📊 Data Sources

The portfolio supports two data sources:

| Source | Description | When Used |
|--------|-------------|-----------|
| **Supabase** | Online database | Primary (default) |
| **portfolio.json** | Static JSON file | Fallback if Supabase fails |

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

### Manage Your Data

- **Dashboard:** https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx
- **Table Editor:** https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx/editor

---

## 🐛 Troubleshooting

### "Missing Supabase credentials" error
→ Create the `.env` file with the correct values (see Quick Start)

### Data not loading
→ Check browser console (F12 → Console) for detailed logs

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
