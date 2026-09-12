# Supabase MCP + Skill Setup

This project is configured so **any AI coding agent** working in this folder can
connect to the Supabase MCP server and use the Supabase Postgres best-practices
skill.

## What's configured

| Agent | Config file | Transport |
|-------|-------------|-----------|
| Claude Code | `.mcp.json` (project root) | SSE (direct URL) |
| Cursor | `.cursor/mcp.json` (project level) | SSE (direct URL) |
| Sarvam Code | `.sarvam/config.toml` (project level) | stdio via `mcp-remote` bridge |
| Codex | `~/.codex/config.toml` (user level) | SSE (direct URL) — **requires manual setup** |
| Factory / others | `.mcp.json` (project root) | SSE (direct URL) |

The Supabase MCP URL includes:
- `project_ref=eeuvtdgwdjerdsumowmx` — this project's Supabase instance
- `read_only=true` — server rejects all write operations
- `features=docs,account,database,debugging,development,functions,branching` — all feature areas

## Supabase skill

The `supabase-postgres-best-practices` skill is installed at
`.agents/skills/supabase-postgres-best-practices/` and symlinked into
`.sarvam/skills/` so sarvam-code discovers it. It provides Postgres performance
optimization rules across 8 categories (query performance, connection
management, security/RLS, schema design, concurrency, data access, monitoring,
advanced features).

## Authentication (one-time per agent)

The Supabase MCP server uses OAuth. On first connection, each agent will open a
browser window for you to authorize access to your Supabase account. The token
is then cached for subsequent sessions.

### Claude Code
No manual auth needed — Claude reads `.mcp.json` automatically. On first use of
a Supabase tool, the OAuth flow triggers in the browser.

### Cursor
Cursor reads `.cursor/mcp.json` at project level. Open Cursor in this project,
and the Supabase server appears in Settings > MCP. Authorize on first use.

### Sarvam Code
Sarvam Code reads `.sarvam/config.toml` (project-scoped, loaded after trust).
On first use of a Supabase tool, `mcp-remote` opens a browser for OAuth.
Verify with `/config` in the TUI — the `supabase` server should show as connected.

### Codex (manual — requires running one command)

Codex stores MCP config at `~/.codex/config.toml` (user level, not project
level). Run these commands in a terminal:

```bash
# 1. Add the Supabase MCP server
codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=eeuvtdgwdjerdsumowmx&read_only=true&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching"

# 2. Authenticate (opens browser for OAuth)
codex mcp login supabase

# 3. Verify authentication
codex mcp list
```

Inside Codex, run `/mcp` to confirm the server is authenticated.

### Factory / PiCode / Devin / others

These agents read `.mcp.json` from the project root (the de facto standard).
The Supabase entry is already there. On first tool use, OAuth triggers in the
browser. If an agent needs a different config format, copy the URL from
`.mcp.json` and adapt.

## The Supabase URL

```
https://mcp.supabase.com/mcp?project_ref=eeuvtdgwdjerdsumowmx&read_only=true&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching
```

If you need to change the project, access token, or feature set, update this URL
in:
1. `.mcp.json` (Claude Code, Factory, and any agent reading project-root MCP config)
2. `.cursor/mcp.json` (Cursor)
3. `.sarvam/config.toml` (Sarvam Code)
4. `~/.codex/config.toml` (Codex — run `codex mcp remove supabase` then re-add)

## Read-only safety

The `read_only=true` parameter makes the Supabase MCP server reject all write
operations server-side. This is enforced by Supabase, not by the agent config.
To enable writes, remove `&read_only=true` from the URL in all config files.
