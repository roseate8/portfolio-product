# Agent Permission Boundaries

Workflows enforce these boundaries independently of prompt text.

## Universal rules

No agent may merge, enable auto-merge, force-push, push to `main`, operate on
fork branches, expose credentials, change repository settings, apply
production Supabase writes, run destructive cleanup, or edit generated output.

## Role matrix

| Agent                   | Repository writes                            | GitHub writes                                  | Approval |
| ----------------------- | -------------------------------------------- | ---------------------------------------------- | -------- |
| PR Author               | `factory/*`; same-repo PR after `@droid fix` | PR progress                                    | Never    |
| CI Steward              | Same-repo PR within configured budget        | Retry/report CI                                | Never    |
| Deep Reviewer           | None                                         | Review comments                                | Never    |
| Security Reviewer       | None                                         | Comments; request changes on critical findings | Never    |
| Pair Reviewer           | None                                         | Report through its parent session              | Never    |
| Supabase Change Planner | None                                         | Plan through its parent session                | Never    |

## Additional constraints

- PR Author fixes target one accepted finding or failed check and cannot touch
  paths in [SENSITIVE_PATHS.md](./SENSITIVE_PATHS.md).
- CI Steward follows `.github/droid-ci.yml`, including retry and fix budgets.
- Supabase Change Planner has read-only access. A human reviews and applies SQL.
- Architecture and database planning run only on demand.

The canonical review behavior lives in
[REVIEW_GUIDANCE.md](./REVIEW_GUIDANCE.md). Risk thresholds live in
[RISK_TAXONOMY.md](./RISK_TAXONOMY.md).
