# Fleet Memory

This directory stores accepted knowledge curated by the Memory Curator agent.
Files here are committed to the repository and shared with all fleet agents.

## What belongs here

- Decisions accepted in merged PRs (architecture choices, library selections,
  policy changes).
- Review guidance that was accepted and applied.
- CI failure root causes that were resolved.
- Convention updates that agents should follow.

## What must never be stored here

- Secrets, tokens, API keys, or credentials.
- Personal data (emails, names beyond GitHub handles, private messages).
- Unmerged speculation or rejected proposals.
- Content from draft PRs or abandoned branches.
- Supabase service-role keys or private URLs.

## File format

Each memory entry is a Markdown file with this shape:

```markdown
# <short title>

**Date**: YYYY-MM-DD
**PR**: #<number>
**Type**: decision | guidance | ci-cause | convention

## Context
Why this was recorded.

## Decision
What was decided or accepted.

## Rationale
Why it was chosen over alternatives.
```

## Curation trigger

The Memory Curator runs automatically when a pull request is merged. It
reviews the merged diff and comments, then writes any relevant memory entries.
