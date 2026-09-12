# Agent instructions

## Project overview

This repository contains a Vite-powered portfolio website. The browser
application lives under `assets/`, uses Supabase for portfolio data, and falls
back to a generated JSON snapshot when Supabase is unavailable. SQL migrations
and the Supabase client are under `backend/`.

## Setup

```bash
npm ci
cp .env.example .env
```

Fill in the Supabase and optional PostHog values in `.env`. Never commit `.env`
or real credentials.

## Commands

```bash
npm run dev          # Start Vite on http://localhost:3000
npm test             # Run the Vitest suite
npm run lint         # Run ESLint syntax and quality checks
npm run format:check # Check tracked project documentation formatting
npm run check:file-size  # Check tracked file size and line-count limits
npm run check:tech-debt  # Require issue-linked TODO/FIXME/HACK markers
npm run validate      # Run all fast local checks
npm run build        # Generate the data snapshot and build dist/
```

`npm run snapshot` refreshes `assets/data/portfolio.json` from Supabase. The
snapshot is generated and ignored by Git. Builds continue without credentials
or network access, using the existing snapshot when one is available.

## Validation workflow

Before submitting a change:

1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run format:check`.
4. Run `npm run check:file-size` and `npm run check:tech-debt`.
5. Run `npm run build`.
6. For UI changes, run `npm run dev`, open `http://localhost:3000`, and
   exercise the graph, a node content page, and the mobile graph/content
   toggle.

When diagnosing data loading, inspect `window.__portfolio` in the browser
console. Do not render Supabase errors into the page.

## Conventions

- Keep the frontend modular: UI components belong in `assets/js/components/`;
  data, routing, analytics, and other cross-cutting utilities belong in
  `assets/js/utils/`.
- Match the existing JavaScript style and keep changes focused.
- Treat `backend/*.sql` as ordered migrations. Document a migration's purpose
  and backfill behavior in the SQL comments and README when needed.
- Keep Supabase reads resilient. Preserve the runtime JSON fallback and the
  build-time snapshot behavior.
- Use `VITE_` environment variables for browser-exposed configuration.
- Do not hardcode keys, tokens, or private URLs.
- Add or update Vitest coverage for data transformations, fallback behavior,
  feature visibility, and other deterministic logic.

## Scope and safety

- Do not edit generated `dist/` output or `assets/data/portfolio.json`.
- Do not modify `.mcp.json`, `.cursor/`, `.sarvam/`, or other local agent
  integration files unless the task explicitly requires it.
- Do not run destructive cleanup commands.
- Do not apply SQL migrations automatically as part of local development.
