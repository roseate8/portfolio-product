# Agent Permission Boundaries

This document defines what each fleet agent can and cannot do. GitHub Actions
workflows enforce these boundaries independently of the agent prompts.

## Universal prohibitions

No agent may:

1. **Merge** a pull request or enable auto-merge.
2. **Force-push** to any branch.
3. **Push to `main`** or any protected branch.
4. **Operate on fork branches.** All work targets same-repository branches
   only.
5. **Expose credentials** in logs, comments, commits, or memory.
6. **Apply production Supabase writes** (DDL, RLS, grants, destructive
   operations, Storage policy changes, auth/secret configuration).
7. **Bypass branch protection** or modify repository settings.
8. **Run destructive cleanup commands** (`rm -rf`, `git clean -fd`, etc.).
9. **Edit generated output** (`dist/`, `assets/data/portfolio.json`).
10. **Modify `.mcp.json`, `.cursor/`, `.sarvam/`** or other local agent
    integration files.

## Per-agent permissions

### PR Author

| Permission                                                        | Granted                  |
| ----------------------------------------------------------------- | ------------------------ |
| Read repository                                                   | Yes                      |
| Write to `factory/*` branches                                     | Yes                      |
| Write to same-repo PR branches (after `@droid fix` authorization) | Yes                      |
| Approve PRs                                                       | No                       |
| Merge PRs                                                         | No                       |
| Push to `main`                                                    | No                       |
| Operate on forks                                                  | No                       |
| Modify sensitive paths                                            | No (report back instead) |

**Authorization for PR-branch fixes:** The PR Author may push fixes to a
same-repository human PR branch only after:

1. An authorized user posts `@droid fix` on the PR.
2. The agent rechecks the current SHA (fixes are applied on top of the latest
   commit, never on a stale HEAD).
3. The fix scope is validated (one check or one accepted finding per commit).
4. The fix does not touch a sensitive path.

### Deep Reviewer

| Permission           | Granted |
| -------------------- | ------- |
| Read repository      | Yes     |
| Post review comments | Yes     |
| Approve PRs          | No      |
| Request changes      | No      |
| Write to any branch  | No      |
| Merge PRs            | No      |

### Risk Analyzer

| Permission                               | Granted |
| ---------------------------------------- | ------- |
| Read repository                          | Yes     |
| Read CI check status                     | Yes     |
| Post comments                            | Yes     |
| Approve low-risk PRs (after checks pass) | Yes     |
| Approve medium/high-risk PRs             | No      |
| Request changes                          | No      |
| Write to any branch                      | No      |
| Merge PRs                                | No      |

### Pair Reviewer

| Permission              | Granted |
| ----------------------- | ------- |
| Read repository         | Yes     |
| Post comments           | Yes     |
| Resume sessions for Q&A | Yes     |
| Approve PRs             | No      |
| Write to any branch     | No      |
| Merge PRs               | No      |

### CI Steward

| Permission                                | Granted |
| ----------------------------------------- | ------- |
| Read repository                           | Yes     |
| Read CI check status and logs             | Yes     |
| Re-run failed jobs (within budget)        | Yes     |
| Push fixes to PR branches (within budget) | Yes     |
| Approve PRs                               | No      |
| Merge PRs                                 | No      |
| Push to `main`                            | No      |

### Security Reviewer

| Permission                             | Granted |
| -------------------------------------- | ------- |
| Read repository                        | Yes     |
| Post review comments                   | Yes     |
| Request changes (on critical findings) | Yes     |
| Approve PRs                            | No      |
| Write to any branch                    | No      |
| Merge PRs                              | No      |

### QA Validator

| Permission                            | Granted |
| ------------------------------------- | ------- |
| Read repository                       | Yes     |
| Run dev server and browser automation | Yes     |
| Post comments with test results       | Yes     |
| Approve PRs                           | No      |
| Write to any branch                   | No      |
| Merge PRs                             | No      |

### Memory Curator

| Permission                  | Granted |
| --------------------------- | ------- |
| Read repository             | Yes     |
| Read merged PR history      | Yes     |
| Write to `.factory/memory/` | Yes     |
| Write to any other path     | No      |
| Approve PRs                 | No      |
| Merge PRs                   | No      |

### Dashboard Observer

| Permission                                        | Granted |
| ------------------------------------------------- | ------- |
| Read repository                                   | Yes     |
| Read GitHub checks, comments, and Actions history | Yes     |
| Post summary comments or issues                   | Yes     |
| Write to any branch                               | No      |
| Approve PRs                                       | No      |
| Merge PRs                                         | No      |

### Supabase Change Planner

| Permission                                      | Granted |
| ----------------------------------------------- | ------- |
| Read repository                                 | Yes     |
| Read Supabase schema (public metadata, advisor) | Yes     |
| Post change plan comments                       | Yes     |
| Apply any Supabase write                        | No      |
| Write to any branch                             | No      |
| Approve PRs                                     | No      |
| Merge PRs                                       | No      |

## Enforcement

GitHub Actions workflows enforce these boundaries through:

1. **`permissions:` blocks** — each workflow requests only the GitHub
   permissions its role needs.
2. **`if:` conditions** — event filters, branch allowlists, fork exclusion,
   and SHA checks.
3. **Droid Exec tool restrictions** — `--restrict-tools` limits the tools
   available to each agent.
4. **Budget limits** — `max_retries`, `max_fix_attempts`, `max_runs_per_pr`.
5. **Sensitive-path checks** — workflow steps that detect sensitive-path
   changes and route to human review.
