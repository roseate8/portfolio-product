# 📸 Photography Branches with Supabase Storage

## ✅ What Was Implemented

Successfully created two new photography branches under the Photography node, with images stored in Supabase Storage and displayed dynamically on the portfolio website.

---

## 🗂️ Database Structure

### New Nodes Created

Two new child nodes under **Photography**:

| Node | UUID | Type | URI | Photos |
|------|------|------|-----|--------|
| **Taipei** | `taipei-photo-1` | artifact | `nodes/photography/taipei` | 5 images |
| **Bangalore** | `bangalore-photo-1` | artifact | `nodes/photography/bangalore` | 3 images |

### Node Details

#### **1. Taipei Node**
```sql
uuid: taipei-photo-1
title: Taipei
type: artifact
parent: Photography (photo-1)
is_featured: true
origin_date: 2024-11-01
overview: Photography from Taipei, Taiwan during MBA exchange program
description: A collection of photographs captured during my exchange semester at 
              National Chengchi University (NCCU) College of Commerce in Taipei, Taiwan.
```

**Photos (5 images):**
- `photography/taipei/PB020359.jpg` - Taipei cityscape
- `photography/taipei/PB050292.jpg` - Taipei street photography
- `photography/taipei/PB050294.jpg` - Taipei urban landscape
- `photography/taipei/PB271469.jpg` - Taipei architecture
- `photography/taipei/PB271470-2.jpg` - Taipei night scene

---

#### **2. Bangalore Node**
```sql
uuid: bangalore-photo-1
title: Bangalore
type: artifact
parent: Photography (photo-1)
is_featured: true
origin_date: 2024-12-01
overview: Photography from Bangalore, India
description: Photographs from Bangalore, India, capturing the vibrant life and 
              landscapes of the Garden City.
```

**Photos (3 images):**
- `photography/bangalore/_C050177.jpg` - Bangalore landscape
- `photography/bangalore/_C050179-2.jpg` - Bangalore cityscape
- `photography/bangalore/_C050200.jpg` - Bangalore urban scene

---

## 🗄️ Supabase Storage Structure

### Bucket Configuration
- **Bucket Name:** `portfolio-media`
- **Public Access:** Yes
- **Max File Size:** 50 MB
- **Allowed Types:** JPEG, PNG, GIF, WebP, SVG, PDF

### Folder Structure
```
portfolio-media/
├── photography/
│   ├── taipei/
│   │   ├── PB020359.jpg      (10.1 MB)
│   │   ├── PB050292.jpg      (10.2 MB)
│   │   ├── PB050294.jpg      (12.4 MB)
│   │   ├── PB271469.jpg      (11.7 MB)
│   │   └── PB271470-2.jpg    (5.6 MB)
│   └── bangalore/
│       ├── _C050177.jpg      (8.7 MB)
│       ├── _C050179-2.jpg    (11.4 MB)
│       └── _C050200.jpg      (11.0 MB)
└── resume/
    └── rudram-piplad-resume.pdf
```

**Total Photos:** 8 images  
**Total Size:** ~81 MB

---

## 🔗 How Media Linking Works

### Database Schema

Each photo is stored as a record in the `node_media` table:

```sql
node_media table:
├── id (uuid)
├── node_id (uuid) → References nodes table
├── file_path (text) → Path in Supabase Storage
├── alt_text (text) → Accessibility description
├── media_type (text) → 'image' or 'photo'
├── thumbnail_url (text) → Optional thumbnail URL
├── small_url (text) → Optional small version URL
├── large_url (text) → Optional large version URL
├── original_url (text) → Optional full URL
├── external_link (text) → Optional external link
├── external_link_text (text)
├── caption (text)
└── sort_order (integer) → Display order
```

### Example Record

```sql
{
  "node_id": "d0582038-0914-4f5a-ba4d-bbd3788d8695",  // Taipei node
  "file_path": "photography/taipei/PB020359.jpg",
  "alt_text": "Taipei cityscape",
  "media_type": "image",
  "sort_order": 0
}
```

---

## 🔄 URL Generation

### Backend Logic

The backend (`backend/supabase.js`) automatically converts storage paths to public URLs:

```javascript
/**
 * Generates a public Supabase Storage URL for a file path.
 * If the path is already a full URL (starts with http), returns it as-is.
 */
function getStorageUrl(filePath, bucket = 'portfolio-media') {
    // If it's already a full URL, return as-is
    if (filePath && (filePath.startsWith('http://') || filePath.startsWith('https://'))) {
        return filePath;
    }
    
    // Generate Supabase Storage public URL
    // Format: https://PROJECT_REF.supabase.co/storage/v1/object/public/BUCKET/PATH
    if (supabaseUrl && filePath) {
        return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
    }
    
    // Fallback to original path if something is missing
    return filePath || '';
}
```

### URL Format

**Input (Database):**
```
photography/taipei/PB020359.jpg
```

**Output (Frontend):**
```
https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/photography/taipei/PB020359.jpg
```

---

## 🎨 Frontend Display

### How Photos Appear

When you click on **Taipei** or **Bangalore** in the portfolio:

1. **Page Content Area** shows the description
2. **Media Tab** displays all photos in a grid layout
3. Images are lazy-loaded and optimized for performance
4. Photos maintain aspect ratio (landscape/portrait detection)

### Media Transformation

```javascript
// backend/supabase.js (lines ~327-334)
media: (mediaMap[nodeId] || []).map(m => ({
    url: getStorageUrl(m.original_url || m.file_path),
    alt: m.alt_text || '',
    type: m.media_type || 'image',
    smallImage: getStorageUrl(m.small_url || m.file_path),
    largeImage: getStorageUrl(m.large_url || m.file_path),
    externalLink: m.external_link || '',
    externalLinkText: m.external_link_text || ''
}))
```

---

## 🏗️ Graph Hierarchy

### Updated Structure

```
Rudram Piplad (Root)
├── AI Systems
├── Product Work
├── Trajectory
├── Photography ← PARENT
│   ├── Taipei ← NEW! (5 photos)
│   └── Bangalore ← NEW! (3 photos)
└── Information
```

### Homepage Display

Since **Photography** is a first-level branch, clicking on it will show:
- Photography description in the page content area
- Two child nodes: **Taipei** and **Bangalore**
- Clicking either child opens the photo gallery

---

## 📝 Migrations Applied

### Migration 1: Create Nodes
**Name:** `add_photography_location_nodes`

```sql
INSERT INTO nodes (uuid, title, type, uri, parent_id, is_featured, sort_order, origin_date, overview, description)
VALUES
  ('taipei-photo-1', 'Taipei', 'artifact', 'nodes/photography/taipei', 
   (SELECT id FROM nodes WHERE uuid = 'photo-1'), true, 0, '2024-11-01', 
   'Photography from Taipei, Taiwan during MBA exchange program', 
   '<p>A collection of photographs...</p>'),
  
  ('bangalore-photo-1', 'Bangalore', 'artifact', 'nodes/photography/bangalore',
   (SELECT id FROM nodes WHERE uuid = 'photo-1'), true, 1, '2024-12-01',
   'Photography from Bangalore, India',
   '<p>Photographs from Bangalore...</p>');
```

### Migration 2: Link Media
**Name:** `link_taipei_bangalore_photos_v2`

```sql
INSERT INTO node_media (node_id, file_path, alt_text, media_type, sort_order)
VALUES
  -- 5 Taipei photos
  ((SELECT id FROM nodes WHERE uuid = 'taipei-photo-1'), 
   'photography/taipei/PB020359.jpg', 'Taipei cityscape', 'image', 0),
  ...
  
  -- 3 Bangalore photos
  ((SELECT id FROM nodes WHERE uuid = 'bangalore-photo-1'),
   'photography/bangalore/_C050177.jpg', 'Bangalore landscape', 'image', 0),
  ...
```

---

## ✅ Verification Queries

### Check Nodes
```sql
SELECT uuid, title, type, uri, is_featured, 
       COUNT(nm.id) as media_count
FROM nodes n
LEFT JOIN node_media nm ON n.id = nm.node_id
WHERE n.uuid IN ('taipei-photo-1', 'bangalore-photo-1')
GROUP BY n.id, n.uuid, n.title, n.type, n.uri, n.is_featured;
```

**Result:**
| UUID | Title | Type | URI | Featured | Media Count |
|------|-------|------|-----|----------|-------------|
| taipei-photo-1 | Taipei | artifact | nodes/photography/taipei | true | 5 |
| bangalore-photo-1 | Bangalore | artifact | nodes/photography/bangalore | true | 3 |

### Check Media Files
```sql
SELECT n.title, nm.file_path, nm.alt_text, nm.sort_order
FROM node_media nm
JOIN nodes n ON nm.node_id = n.id
WHERE n.uuid IN ('taipei-photo-1', 'bangalore-photo-1')
ORDER BY n.title, nm.sort_order;
```

---

## 🧪 Testing

### How to Test

1. **Hard Refresh:**
   ```
   Ctrl + Shift + R (Windows)
   Cmd + Shift + R (Mac)
   ```

2. **Check Console Logs:**
   - Open browser console (F12)
   - Look for: `📊 Data received from Supabase`
   - Should show: `media: 8` (or more if you have other media)

3. **Navigate the Portfolio:**
   - Click on **Photography** node
   - Should see two child nodes: **Taipei** and **Bangalore**
   - Click **Taipei** → Should see 5 photos
   - Click **Bangalore** → Should see 3 photos

4. **Check Image URLs:**
   - Right-click on any photo → Inspect
   - `src` attribute should show:
     ```
     https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/photography/taipei/PB020359.jpg
     ```

---

## 📂 Files Modified

### Backend
**File:** `backend/supabase.js`

**Changes:**
1. Added `getStorageUrl()` helper function (lines ~81-99)
2. Updated media transformation to use `getStorageUrl()` (lines ~327-334)

**Before:**
```javascript
media: (mediaMap[nodeId] || []).map(m => ({
    url: m.original_url || m.file_path,
    smallImage: m.small_url || '',
    largeImage: m.large_url || '',
}))
```

**After:**
```javascript
media: (mediaMap[nodeId] || []).map(m => ({
    url: getStorageUrl(m.original_url || m.file_path),
    smallImage: getStorageUrl(m.small_url || m.file_path),
    largeImage: getStorageUrl(m.large_url || m.file_path),
}))
```

---

## 🎯 Key Features

✅ **Supabase Storage Integration**
- Photos stored in Supabase Storage (not in database)
- Public bucket allows direct browser access
- Automatic URL generation in backend

✅ **Scalable Architecture**
- Easy to add more photo locations
- Just create new node + link media files
- No frontend code changes needed

✅ **Performance Optimized**
- Large images (5-12 MB each) served from Supabase CDN
- Lazy loading implemented in frontend
- Aspect ratio detection for proper layout

✅ **Hierarchical Organization**
- Photography → Taipei (5 photos)
- Photography → Bangalore (3 photos)
- Easy to add more cities/locations

✅ **Database-Driven**
- All content managed through Supabase
- No hardcoded data
- Easy to update via SQL queries

---

## 🔮 Future Enhancements

### Adding More Locations

To add a new photography location (e.g., "Mumbai"):

1. **Upload photos to Storage:**
   ```
   portfolio-media/photography/mumbai/photo1.jpg
   portfolio-media/photography/mumbai/photo2.jpg
   ```

2. **Create node:**
   ```sql
   INSERT INTO nodes (uuid, title, type, uri, parent_id, is_featured, sort_order, origin_date)
   VALUES ('mumbai-photo-1', 'Mumbai', 'artifact', 'nodes/photography/mumbai',
           (SELECT id FROM nodes WHERE uuid = 'photo-1'), true, 2, '2025-01-01');
   ```

3. **Link media:**
   ```sql
   INSERT INTO node_media (node_id, file_path, alt_text, media_type, sort_order)
   VALUES ((SELECT id FROM nodes WHERE uuid = 'mumbai-photo-1'),
           'photography/mumbai/photo1.jpg', 'Mumbai scene', 'image', 0);
   ```

### Image Optimization

Consider generating thumbnails for faster loading:

```sql
UPDATE node_media 
SET thumbnail_url = 'photography/taipei/thumbs/PB020359_thumb.jpg',
    small_url = 'photography/taipei/small/PB020359_small.jpg'
WHERE file_path = 'photography/taipei/PB020359.jpg';
```

Then use a tool like Sharp.js or Supabase Edge Functions to auto-generate resized versions.

---

## 📊 Summary

| Metric | Value |
|--------|-------|
| **Nodes Created** | 2 (Taipei, Bangalore) |
| **Photos Linked** | 8 (5 Taipei + 3 Bangalore) |
| **Storage Used** | ~81 MB |
| **Backend Changes** | 1 helper function + media transformation |
| **Migrations Applied** | 2 |
| **Frontend Changes** | None (automatic) |

---

## 🎉 Result

You can now:
- ✅ View Taipei photography collection (5 photos)
- ✅ View Bangalore photography collection (3 photos)
- ✅ All photos load from Supabase Storage
- ✅ Easy to add more photography locations
- ✅ Scalable and maintainable architecture

**The photography branches are live and fully integrated with your portfolio!** 📸

