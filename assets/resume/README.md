# Resume Directory

## Instructions for Adding Your Resume

**Place your resume PDF here with the filename:**
```
rudram-piplad-resume.pdf
```

### Steps:

1. **Export your resume as PDF** from your preferred format (Word, Google Docs, LaTeX, etc.)

2. **Name the file exactly:** `rudram-piplad-resume.pdf`

3. **Copy it to this directory:** `assets/resume/`

4. **The link is already configured** in Supabase under the Information → Resume node

### Current Configuration

- **Node:** Information → Resume
- **UUID:** `resume-1`
- **Link URL:** `/assets/resume/rudram-piplad-resume.pdf`
- **Link Title:** "Download Resume (PDF)"

### Alternative: Use Supabase Storage

If you prefer to host the resume on Supabase Storage instead:

1. Upload the PDF to Supabase Storage bucket: `portfolio-media/resume/`
2. Get the public URL
3. Update the link in Supabase:

```sql
UPDATE node_links 
SET url = 'https://eeuvtdgwdjerdsumowmx.supabase.co/storage/v1/object/public/portfolio-media/resume/rudram-piplad-resume.pdf'
WHERE node_id = (SELECT id FROM nodes WHERE uuid = 'resume-1');
```

### File Size Recommendation

- **Recommended:** 500 KB - 2 MB
- **Maximum:** 5 MB (for fast loading)

Keep your resume concise and optimized for web viewing.

---

**Status:** ⏳ Waiting for PDF upload

