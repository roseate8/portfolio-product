Additional checks and output rules for Droid code and security reviews of
this repository.

## Summary comment format

The summary comment shows only sections that have real content. Omit a
section entirely when it is empty. Never write filler such as "none
identified" or "no limitations". Keep the whole comment under 200 words.

Sections, in this order:

1. **Behavior**: what the change does, one or two sentences.
2. **Tests and evidence**: which tests cover the change. Mention this section
   only when changed logic lacks coverage, and say exactly what is missing.
3. **Risk**: low, medium, or high, with the single deciding factor from
   `docs/agent-fleet/RISK_TAXONOMY.md`.
4. **Rollback**: one sentence, only when rollback needs more than reverting
   the merge.

## Project-specific checks

- `innerHTML` or URL interpolation in `assets/js/**` that bypasses
  `assets/js/utils/sanitize.js`.
- Changes that weaken the Supabase to JSON snapshot fallback in
  `assets/js/utils/Data.js`.
- Secrets, service-role keys, or `.env` values anywhere in the diff.
- New agent automation that duplicates an existing workflow trigger.
