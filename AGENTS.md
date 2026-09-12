# Agent instructions

## Project

This is a Vite portfolio app. Browser code lives in `assets/`. Supabase reads
live in `backend/supabase.js`, with a generated JSON fallback for outages.

## Setup and checks

```bash
npm ci
cp .env.example .env
npm run dev       # http://localhost:3000
npm run validate  # lint, policy checks, and tests
npm run build     # snapshot and production build
```

Add Supabase and optional PostHog values to `.env`. Never commit credentials.
`npm run snapshot` refreshes the ignored
`public/assets/data/portfolio.json`. A build without credentials uses an
existing snapshot when available.

For UI changes, exercise the graph, one content page, and the mobile view
toggle. Inspect `window.__portfolio` for data diagnostics. Keep raw Supabase
errors out of the page.

## Conventions

- Put UI components in `assets/js/components/` and shared logic in
  `assets/js/utils/`.
- Preserve Supabase resilience and snapshot fallback behavior.
- Use `VITE_` variables for browser configuration.
- Add Vitest coverage for deterministic data, fallback, and visibility logic.
- Treat `backend/*.sql` as ordered migrations. Follow
  `docs/MIGRATION_DISCIPLINE.md` and run `npm run check:sql-migrations`.
- Keep changes focused and match surrounding JavaScript style.

## Safety

- Do not edit `dist/` or `public/assets/data/portfolio.json`.
- Do not modify `.mcp.json` or local agent integrations unless requested.
- Do not apply SQL migrations or run destructive cleanup.
