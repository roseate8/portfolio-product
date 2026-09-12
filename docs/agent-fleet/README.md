# Agent Fleet

This directory defines the policy, risk taxonomy, review guidance, and
permission boundaries for the Factory AI agent fleet that operates on this
repository.

## Fleet roster

| Agent                   | Role                                                 | Can write                                  | Can approve                      | Trigger                                        |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------- | ---------------------------------------------- |
| PR Author               | Creates PRs and applies bounded fixes                | factory/* branches, authorized PR branches | No                               | `@droid` comment, issue label, manual dispatch |
| Deep Reviewer           | Objective bug review with line-specific findings     | No                                         | No                               | Automatic on PR update                         |
| Risk Analyzer           | Machine-readable risk assessment                     | No                                         | Low-risk only, after checks pass | Automatic on PR update                         |
| Pair Reviewer           | Design and architecture reports, Q&A                 | No                                         | No                               | `@droid pair` comment or label                 |
| CI Steward              | Classifies and retries CI failures, dispatches fixes | PR branches (auto-fix budget)              | No                               | `workflow_run` event                           |
| Security Reviewer       | STRIDE/OWASP security review                         | No                                         | No                               | Automatic on sensitive-path PRs                |
| QA Validator            | Browser smoke and accessibility checks               | No                                         | No                               | `@droid qa` or label                           |
| Memory Curator          | Records merged decisions and accepted guidance       | `.factory/memory/` only                    | No                               | On PR merge                                    |
| Dashboard Observer      | Read-only fleet status summaries                     | No                                         | No                               | Scheduled                                      |
| Supabase Change Planner | Produces approval-ready change plans                 | No                                         | No                               | `@droid supabase-plan`                         |

## Safety model

1. **Human-only merge authority.** No agent can merge, enable auto-merge,
   force-push, or push to `main`.
2. **Role separation.** Author identities write code but cannot approve.
   Review identities are read-only. The Risk Analyzer can approve but cannot
   write code.
3. **Least-privilege workflows.** Each GitHub Actions workflow requests only
   the permissions its role needs.
4. **Sensitive-path enforcement.** Changes to protected paths require human
   review regardless of risk classification.
5. **Bounded retries and fixes.** CI Steward and auto-fix experts operate
   within configurable budgets and stop when exhausted.
6. **No secrets in logs or memory.** Agents never print credentials, tokens,
   or personal data. Memory stores only merged decisions and accepted guidance.

## Documents

- [`RISK_TAXONOMY.md`](./RISK_TAXONOMY.md) — Risk classification criteria.
- [`REVIEW_GUIDANCE.md`](./REVIEW_GUIDANCE.md) — What to review, what to skip,
  how to report findings.
- [`SENSITIVE_PATHS.md`](./SENSITIVE_PATHS.md) — Protected paths that require
  human review.
- [`AGENT_PERMISSIONS.md`](./AGENT_PERMISSIONS.md) — Per-agent permission
  boundaries and prohibited operations.

## Supabase boundary

The Supabase project (`eeuvtdgwdjerdsumowmx`) is read-only for the fleet. No
agent applies production schema writes, DDL, RLS changes, destructive
operations, or secret configuration. The Supabase Change Planner produces
approval-ready plans that a human must review and apply.
