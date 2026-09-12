# Agent Fleet

This directory defines the policy, risk taxonomy, review guidance, and
permission boundaries for the Factory AI agent fleet that operates on this
repository.

## Fleet roster

| Agent                   | Role                              | Trigger                                  |
| ----------------------- | --------------------------------- | ---------------------------------------- |
| PR Author               | Implements bounded work           | `@droid fix` or `droid` issue label      |
| Deep Reviewer           | Reviews PRs for concrete bugs     | Automatic on PR update                   |
| Security Reviewer       | Reviews sensitive-path PRs        | Automatic on matching PR update          |
| CI Steward              | Triages and fixes CI failures     | Failed CI run, within a three-run budget |
| Pair Reviewer           | Reviews architecture and design   | Manual Factory invocation                |
| Supabase Change Planner | Produces read-only database plans | Manual Factory invocation                |

## Safety model

1. **Human-only merge authority.** No agent can merge, enable auto-merge,
   force-push, or push to `main`.
2. **Role separation.** Author identities write code but cannot approve.
   Review identities are read-only.
3. **Least-privilege workflows.** Each GitHub Actions workflow requests only
   the permissions its role needs.
4. **Sensitive-path enforcement.** Changes to protected paths require human
   review regardless of risk classification.
5. **Bounded retries and fixes.** CI Steward and auto-fix experts operate
   within configurable budgets and stop when exhausted.
6. **Cost-aware triggers.** Routine CI runs focused review and failure triage.
   Architecture and database planning run on demand.
7. **No secrets in logs.** Agents never print credentials, tokens, or personal
   data.

## Documents

- [`RISK_TAXONOMY.md`](./RISK_TAXONOMY.md): Risk classification criteria.
- [`REVIEW_GUIDANCE.md`](./REVIEW_GUIDANCE.md): What to review, what to skip,
  how to report findings.
- [`SENSITIVE_PATHS.md`](./SENSITIVE_PATHS.md): Protected paths that require
  human review.
- [`AGENT_PERMISSIONS.md`](./AGENT_PERMISSIONS.md): Per-agent permission
  boundaries and prohibited operations.
- `.factory/skills/review-guidelines/SKILL.md`: Summary format and
  project-specific checks injected into every Droid review.

On top of the roster, any authorized commenter can run `@droid fill`,
`@droid review`, or `@droid security` on a pull request. `@droid fill`
writes the PR description from the minimal template.

## SDLC coverage

| Stage            | Automation                                                 | Notes                                                |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| Issue triage     | Manual                                                     | Deliberate non-goal for a solo repository            |
| Development      | Manual                                                     | CI runs the same checks as local `npm run validate`  |
| PR description   | `@droid fill` on demand                                    | Template stays minimal by design                     |
| CI               | Lint, format, tests, build, snapshot upload                | None                                                 |
| Code review      | Deep Reviewer on every PR, structured summary included     | None                                                 |
| Security         | Security Reviewer on sensitive paths, gitleaks on every PR | None                                                 |
| CI failure       | CI Steward retries and fixes within budget                 | None                                                 |
| Dependencies     | Dependabot weekly with grouped PRs                         | None                                                 |
| Merge            | Human-only                                                 | Enable branch protection in GitHub settings          |
| Deploy           | Vercel, plus HTTP smoke check on push to main              | Set the `SITE_URL` repository variable               |
| Stale management | None                                                       | Deliberate non-goal                                  |
| Release notes    | None                                                       | Deliberate non-goal; commit history is the changelog |

## Supabase boundary

The Supabase project (`eeuvtdgwdjerdsumowmx`) is read-only for the fleet. No
agent applies production schema writes, DDL, RLS changes, destructive
operations, or secret configuration. The Supabase Change Planner produces
approval-ready plans that a human must review and apply.
