# 🚀 Supabase Quick Start

## ⚡ 3 Steps to Get Running

### Step 1: Create `.env` File

Create a file named `.env` in your project root (same folder as `package.json`):

```env
VITE_SUPABASE_URL=https://eeuvtdgwdjerdsumowmx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldXZ0ZGd3ZGplcmRzdW1vd214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzIyMDIsImV4cCI6MjA4MzIwODIwMn0.NIHXxWnHCR-GThu5zoRZyE3vIEVJSt6pfIiVTl3L2Mo
```

### Step 2: Run Dev Server

```bash
npm run dev
```

### Step 3: Check Browser

Open http://localhost:3000 and check the browser console.  
You should see: `✅ Portfolio data loaded from Supabase`

---

## 📁 Where's the Code?

```
backend/
  └── supabase.js    ← All Supabase code is here (well-commented!)
```

---

## 🔗 Useful Links

| What | Link |
|------|------|
| Dashboard | https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx |
| Table Editor | https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx/editor |
| SQL Editor | https://supabase.com/dashboard/project/eeuvtdgwdjerdsumowmx/sql |

---

## 💡 Quick Tips

**Switch to static JSON:**
```javascript
// In assets/js/utils/Data.js
useSupabase: false,   // Will use portfolio.json instead
```

**Add content:**  
Go to Table Editor → nodes → Insert row

---

**Need more details?** See `README_SUPABASE.md`
