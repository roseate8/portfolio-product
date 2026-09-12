# Risk Model — classification and sensitive paths

This is the versioned risk policy for the fleet. The Risk Analyzer classifies
every assessed PR into exactly one of three levels by applying the
precedence-ordered rules below top to bottom: the first matching rule decides.
Changing a rule, the ordering, or the sensitive-path list is a policy change
requiring human review.

## Precedence-ordered classification rules

### Rule 1 — HIGH (sensitive and high-impact work)

Classify **HIGH** when any of the following holds:

- Any changed path matches the sensitive-path list below.
- Semantic sensitive surfaces change, regardless of path:
  authentication or credential-handling code, analytics/privacy code
  (e.g. PostHog usage), deployment configuration, workflow helper code, and
  database-backed HTML-rendering or URL-handling code.
- Authentication, authorization, or security controls change.
- Production data behavior changes; any destructive operation appears.
- Broad dependency upgrades (major version bumps, or more than 3 manifest
  dependency lines changed).
- The change has substantial rollback or availability impact.

A HIGH result always requires human review and is never eligible for
autonomous approval. Semantic uncertainty fails closed into this rule.

### Rule 2 — MEDIUM (ordinary behavior work)

Classify **MEDIUM** when no Rule 1 condition holds and the change touches:

- Runtime or UI behavior (implementation code, with or without tests).
- Internal refactoring across more than one file.
- Anything cross-cutting or otherwise requiring human awareness that is not
  security/data-plane sensitive.

A MEDIUM result requires human review; no bot approval.

### Rule 3 — LOW (bounded, approvable candidates)

Classify **LOW** only when no earlier rule matched and the change is one of:

- A small typo-only documentation change (no semantic or structural edit).
- A small test-only correction that does not delete, skip, or weaken any
  assertion and does not change implementation behavior.

LOW is the only level eligible for Risk Analyzer approval, and only when every
policy-required check passes at the current head SHA and no unresolved Deep
Reviewer finding exists (see `docs/ai/AGENT_POLICY.md`).

## Sensitive-path list

Paths (gitignore-style globs):

- `.github/**`
- `.factory/**`
- `AGENTS.md`
- `docs/ai/**` (agent, risk, and security policy files)
- `package.json`
- `package-lock.json` (and any other lockfile)
- `backend/**/*.sql`
- `supabase/**`
- `.mcp.json`
- `vercel.json`

Semantic sensitive surfaces (any path):

- Analytics/privacy code.
- Authentication and credential-handling code.
- Deployment configuration.
- Database-backed HTML-rendering code and URL-handling code.

Sensitive paths are never eligible for autonomous low-risk approval, regardless
of diff size or check state. The fleet check-name exclusions that keep these
assessments from looping are listed in `docs/ai/AGENT_POLICY.md` Section 4.
