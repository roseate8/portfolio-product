# Sensitive Paths

Changes to the paths listed below require human review regardless of risk
classification. The Risk Analyzer treats any sensitive-path change as at
least medium risk. The Security Reviewer is triggered automatically when a
PR touches any sensitive path.

## GitHub and CI configuration

| Path pattern                       | Reason                                       |
| ---------------------------------- | -------------------------------------------- |
| `.github/workflows/**`             | CI/CD pipeline and agent trigger definitions |
| `.github/CODEOWNERS`               | Review ownership rules                       |
| `.github/dependabot.yml`           | Dependency update automation                 |
| `.github/pull_request_template.md` | PR review checklist                          |
| `.github/ISSUE_TEMPLATE/**`        | Issue intake forms                           |
| `.github/droid-ci.yml`             | CI Steward configuration                     |

## Factory agent configuration

| Path pattern         | Reason                                          |
| -------------------- | ----------------------------------------------- |
| `.factory/droids/**` | Agent identity, tool policy, and system prompts |
| `.factory/skills/**` | Agent skill definitions                         |
| `.factory/memory/**` | Agent memory and accepted guidance              |
| `AGENTS.md`          | Canonical repository instructions for agents    |
| `agent.md`           | Agent rules and guidelines                      |

## Dependencies and manifests

| Path pattern        | Reason                              |
| ------------------- | ----------------------------------- |
| `package.json`      | Dependency declarations and scripts |
| `package-lock.json` | Pinned dependency versions          |
| `skills-lock.json`  | Skill version pins                  |

## Database and backend

| Path pattern          | Reason                                           |
| --------------------- | ------------------------------------------------ |
| `backend/**/*.sql`    | Database migrations and DDL                      |
| `backend/supabase.js` | Supabase client configuration                    |
| `.mcp.json`           | MCP server configuration (includes Supabase MCP) |

## Deployment and environment

| Path pattern     | Reason                        |
| ---------------- | ----------------------------- |
| `vercel.json`    | Deployment configuration      |
| `.env.example`   | Environment variable template |
| `vite.config.js` | Build configuration           |

## Security and access

| Path pattern                                                                                            | Reason                   |
| ------------------------------------------------------------------------------------------------------- | ------------------------ |
| `.github/workflows/security.yml`                                                                        | Secret scanning workflow |
| Any file containing `SUPABASE_URL`, `SUPABASE_KEY`, `API_KEY`, `TOKEN`, or `SECRET` in its name or path | Credential handling      |

## Frontend data and rendering

| Path pattern                  | Reason                                           |
| ----------------------------- | ------------------------------------------------ |
| `assets/js/utils/Data.js`     | Data loading, Supabase reads, and fallback logic |
| `assets/js/components/Map.js` | Graph rendering and node visibility flags        |
| `assets/data/portfolio.json`  | Generated snapshot (must not be hand-edited)     |

## Policy documents

| Path pattern                | Reason                                                 |
| --------------------------- | ------------------------------------------------------ |
| `docs/agent-fleet/**`       | Fleet policy, risk taxonomy, and permission boundaries |
| `docs/DEPENDENCY_POLICY.md` | Dependency update policy                               |
| `docs/runbooks/**`          | Operational runbooks                                   |

## Handling sensitive-path changes

1. The PR Author agent does not create PRs that modify sensitive paths. If a
   task requires a sensitive-path change, the PR Author reports back and a
   human creates the PR.
2. The Deep Reviewer flags sensitive-path changes in its summary comment.
3. The Risk Analyzer classifies the PR as at least medium risk.
4. The Security Reviewer runs automatically on PRs that touch sensitive
   paths.
5. A human must review and approve before merge.
