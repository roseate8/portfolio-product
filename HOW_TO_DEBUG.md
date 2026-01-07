# How To Debug The Portfolio

## Step 1: Open the Site

Go to: **http://localhost:3000**

## Step 2: Open Browser Console

Press **F12** → Click **Console** tab

## Step 3: Look for These Logs (in order)

### ✅ Data Loading:
```
[Data.js] 🚀 Starting data fetch...
[Data.js] 📡 Attempting to fetch from Supabase...
```

Then either:
- `✅ SUCCESS: Data loaded from Supabase`
- OR `⚠️ Falling back to portfolio.json...`

### ✅ Map Initialization:
```
🎯 Map received data: {data: {...}, uniqueDates: [...]}
✅ Map initializing with: {rootTitle: "Your Name", childrenCount: 4, ...}
```

### ✅ Map Rendering:
```
🗺️ updateMap called with date: 2024-01-01
🗺️ Raw data: {title: "Your Name", children: Array(4), ...}
🗺️ Filtered data: {title: "Your Name", children: Array(X), ...}
🗺️ Filtered children count: X
🎨 renderMap called
🎨 filteredNodes: {title: "Your Name", children: Array(X), ...}
```

## What To Check:

1. **Does data load?**
   - Look for "SUCCESS" or "fallback" message

2. **Does Map receive data?**
   - Look for "Map received data" with actual data object

3. **Are children being filtered out?**
   - Look at "Filtered children count" - should be > 0
   - If it's 0, nodes are being filtered out by the date/featured filter

4. **Are nodes actually rendering?**
   - Type in console: `document.querySelectorAll('.node').length`
   - Should return a number > 0

## Common Issues:

### Issue 1: "Filtered children count: 0"
**Problem:** All nodes are being filtered out
**Reason:** Date filter or `isFeatured` check failing
**Check:** Are the children marked as `isFeatured: true` in the data?

### Issue 2: Nodes exist but invisible
**Type in console:** `document.querySelectorAll('.node').length`
**If > 0:** Nodes exist but CSS issue
**If 0:** Nodes not being created

### Issue 3: Wrong data showing
**Check:** What does the "Raw data" log show?
- Does it match portfolio.json?
- Does it match Supabase data?

## Next Steps:

Based on the console logs, tell me:
1. What is the "Filtered children count"?
2. What does `document.querySelectorAll('.node').length` return?
3. Any red errors in console?

