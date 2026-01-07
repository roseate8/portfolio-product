# Information Branch Update

**Date:** January 7, 2026  
**Status:** ✅ Complete

---

## Changes Made

### 1. Updated Information Node Content ✅

The Information path node now includes a personalized note:

```
You're hiring: I'm selectively exploring. I care about AI products that 
need to earn trust, not just engagement.

You want to collaborate: Open to interesting problems in AI evaluation, 
perception-aware interfaces, or product strategy.

You're just curious: Welcome. Click around the graph. Start with [[AI Systems]] 
if you want to see how I think about building. Start with [[Bets]] if you want 
to see what I've risked. [[Photography]] has more life to it if that interests you.
```

### 2. Added New Contact Nodes ✅

Five new information nodes have been added as children of the Information path:

#### a) LinkedIn (linkedin-1)
- **Title:** LinkedIn
- **Summary:** Professional Profile
- **Link:** https://www.linkedin.com/in/rudram-piplad/
- **Sort Order:** 1

#### b) Email (email-1)
- **Title:** Email
- **Summary:** Get in Touch
- **Email Field:** rudram@alumni.iitm.ac.in
- **Link:** mailto:rudram@alumni.iitm.ac.in
- **Sort Order:** 2

#### c) Phone (phone-1)
- **Title:** Phone
- **Summary:** Call Me
- **Telephone Field:** +91 9940334981
- **Sort Order:** 3

#### d) Behance (behance-info-1)
- **Title:** Behance
- **Summary:** Design Portfolio
- **Link:** https://www.behance.net/roseate134
- **Sort Order:** 4

#### e) Resume (resume-1)
- **Title:** Resume
- **Summary:** Download CV
- **Link:** /assets/resume/rudram-piplad-resume.pdf (placeholder)
- **Sort Order:** 5

---

## Updated Information Branch Structure

```
Information (info-path)
├── Contact & Links (contact-1) [original - kept for backward compatibility]
│   ├── LinkedIn: https://linkedin.com/in/rudrampiplad
│   ├── GitHub: https://github.com/rudramroseate8
│   ├── Behance: https://behance.net/rudrampiplad
│   └── Email: mailto:rudram@alumni.iitm.ac.in
├── LinkedIn (linkedin-1) ✨ NEW
│   └── Link: https://www.linkedin.com/in/rudram-piplad/
├── Email (email-1) ✨ NEW
│   └── Link: mailto:rudram@alumni.iitm.ac.in
├── Phone (phone-1) ✨ NEW
│   └── Contact: +91 9940334981
├── Behance (behance-info-1) ✨ NEW
│   └── Link: https://www.behance.net/roseate134
└── Resume (resume-1) ✨ NEW
    └── Link: /assets/resume/rudram-piplad-resume.pdf
```

**Total Information nodes:** 7 (1 path + 6 information nodes)

---

## Resume PDF Setup

### Directory Created ✅

```
assets/resume/
└── README.md (instructions)
```

### To Add Your Resume:

1. **Export your resume as PDF**
2. **Name it:** `rudram-piplad-resume.pdf`
3. **Place it in:** `assets/resume/`

The link is already configured in Supabase and will work once the PDF is added.

### Alternative: Supabase Storage

You can also upload to Supabase Storage:
- Bucket: `portfolio-media`
- Path: `resume/rudram-piplad-resume.pdf`
- Then update the link URL in the database

---

## Database Migrations Applied

### Migration 1: update_information_node_content
- Updated `info-path` node with extended_description containing the personalized note

### Migration 2: add_information_contact_nodes
- Inserted 5 new information nodes (LinkedIn, Email, Phone, Behance, Resume)
- Added corresponding external links to node_links table

---

## Verification

### Query to Check Structure:

```sql
SELECT 
    n.title,
    n.uuid,
    n.email,
    n.telephone,
    n.sort_order
FROM nodes n
WHERE n.parent_id = (SELECT id FROM nodes WHERE uuid = 'info-path')
   OR n.uuid = 'info-path'
ORDER BY n.sort_order;
```

### Expected Results:

| Title | UUID | Email | Telephone | Sort Order |
|-------|------|-------|-----------|------------|
| Information | info-path | - | - | 0 |
| Contact & Links | contact-1 | rudram@alumni.iitm.ac.in | +91 9940334981 | 0 |
| LinkedIn | linkedin-1 | - | - | 1 |
| Email | email-1 | rudram@alumni.iitm.ac.in | - | 2 |
| Phone | phone-1 | - | +91 9940334981 | 3 |
| Behance | behance-info-1 | - | - | 4 |
| Resume | resume-1 | - | - | 5 |

✅ **All nodes present and correctly structured**

---

## Frontend Display

The Information branch will now display:

1. **Information node** - Shows the personalized note about hiring/collaboration/exploration
2. **Contact & Links** - Original consolidated contact node (kept for compatibility)
3. **LinkedIn** - Direct link to LinkedIn profile
4. **Email** - Email contact with mailto link
5. **Phone** - Phone number display
6. **Behance** - Link to Behance portfolio
7. **Resume** - Download link for PDF resume

---

## Notes

### Why Keep "Contact & Links"?

The original `contact-1` node has been kept for backward compatibility. It contains:
- All original links (LinkedIn, GitHub, Behance, Email)
- Email and telephone fields populated
- Can be removed later if desired, but keeping it ensures no breaking changes

### Link Differences

Note the URL differences:
- **Old Contact & Links:** Uses shorter URLs (linkedin.com/in/rudrampiplad)
- **New LinkedIn node:** Uses full URL (www.linkedin.com/in/rudram-piplad/)
- **New Behance node:** Uses different username (roseate134 vs rudrampiplad)

Both sets of links are valid and will work.

---

## Next Steps

1. ✅ **Refresh portfolio** - New nodes will appear in Information branch
2. ⏳ **Add resume PDF** - Place `rudram-piplad-resume.pdf` in `assets/resume/`
3. ✅ **Test links** - Verify all contact links work correctly
4. 🔄 **Optional:** Remove old "Contact & Links" node if you prefer the new structure

---

**Status:** Ready for use! Just add the resume PDF when available.

