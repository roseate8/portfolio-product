---
name: readiness-report-sample
description: A user-visible sample specification for evaluating whether a repository is friendly to autonomous coding agents.
---

# Readiness Report Sample

> This is a teaching sample based on the built-in Agent Readiness evaluator. It
> is not the original internal implementation and is not wired into the
> project. It is intentionally readable so teams can use it as a preparation
> checklist.

## Evaluation procedure

1. Find the repository root by locating `.git`.
2. Detect the primary language from manifests and source files.
3. Ignore `.git`, `node_modules`, `dist`, `build`, and other generated trees.
4. Identify independently deployable applications. A single-application
   repository uses the root directory as one application.
5. Evaluate repository-wide criteria once, with denominator `1`.
6. Evaluate application criteria once per application, with denominator equal
   to the application count.
7. Use `null` only for criteria marked skippable when they do not apply.
8. Prefer concrete file, configuration, command, or service evidence. If
   evidence is ambiguous, fail the criterion.

Each result has this shape:

```json
{
  "numerator": 1,
  "denominator": 1,
  "rationale": "Short evidence-based explanation."
}
```

The score is the average of each non-skipped criterion's numerator divided by
its denominator. All criteria contribute equally.

## Repository-scope criteria

These are checked once for the repository.

### Build, delivery, and development workflow

- `large_file_detection` — Check for hooks, CI, Git LFS, linter limits, or a
  quality platform that detects overly large files.
- `tech_debt_tracking` — Check for TODO/FIXME scanning, ticket-linked TODO
  rules, SonarQube, or another debt-tracking system.
- `build_cmd_doc` — Check that README or agent documentation explains the
  build command.
- `deps_pinned` — Check for a committed lockfile or pinned dependency
  requirements.
- `vcs_cli_tools` — Check whether `gh`, `glab`, or an equivalent VCS CLI is
  installed and authenticated.
- `automated_pr_review` *(skippable)* — Check for bots or automation that
  generate review comments, not merely status checks.
- `agentic_development` — Check for agent co-authorship, agent CI/scripts,
  agent configuration, skills, hooks, or other evidence that agents actively
  participate in development.
- `fast_ci_feedback` *(skippable)* — Check recent PR status checks and verify
  typical CI completes in under ten minutes.
- `build_performance_tracking` *(skippable)* — Check for measured build
  durations, build caching, exported build metrics, or deliberate build
  optimization.
- `deployment_frequency` *(skippable)* — Check releases and deployment
  workflows for multiple successful deployments per week.
- `single_command_setup` — Check for a documented short command sequence that
  takes a fresh clone to a running development server.
- `feature_flag_infrastructure` — Check for LaunchDarkly, Statsig, Unleash,
  GrowthBook, PostHog flags, or an equivalent custom flag system.
- `release_notes_automation` — Check for semantic-release, Changesets,
  standard-version, changelog generation, or equivalent release-note tooling.
- `progressive_rollout` *(skippable)* — Check for canary, percentage, or ring
  deployments when relevant.
- `rollback_automation` *(skippable)* — Check for documented automated or
  one-click rollback capability when relevant.
- `monorepo_tooling` *(skippable)* — For monorepos, check workspaces, Nx,
  Turborepo, Lerna, Bazel, or equivalent package-boundary tooling.
- `version_drift_detection` *(skippable)* — For monorepos, check syncpack,
  Renovate grouping, dependency constraints, or equivalent drift detection.
- `release_automation` — Check for automated deployment, CD, GitOps, image
  publishing, semantic-release, or release-please.
- `dead_feature_flag_detection` *(skippable)* — If feature flags exist, check
  for stale-flag detection, flag age checks, or a documented cleanup process.

### Documentation and agent enablement

- `agents_md` — Require a non-empty root `AGENTS.md` covering setup, commands,
  tests, workflow, and project conventions.
- `readme` — Require a root README with setup and usage instructions.
- `automated_doc_generation` — Check for automated API docs, JSDoc/Sphinx
  generation, architecture diagrams, changelogs, or README updates.
- `skills` — Check for at least one valid `SKILL.md` with `name`,
  `description`, and useful prompt content.
- `documentation_freshness` — Check whether README, AGENTS.md, or
  CONTRIBUTING.md changed within the last 180 days.
- `service_flow_documented` — Check for architecture diagrams or documentation
  of databases, external services, APIs, and data flow.
- `agents_md_validation` — If AGENTS.md exists, check whether CI, hooks,
  documentation tests, link checks, or generators validate it.

### Development environment and operations

- `devcontainer` — Check for a suitable `.devcontainer/devcontainer.json`.
- `env_template` — Check for `.env.example` or complete environment-variable
  documentation.
- `local_services_setup` *(skippable)* — Check for Docker Compose or clear
  instructions for required local dependencies.
- `devcontainer_runnable` *(skippable)* — If the CLI is available, verify the
  devcontainer can actually build and run.
- `runbooks_documented` — Check for runbooks, playbooks, or links to incident
  response procedures.

### Security and repository process

- `branch_protection` *(skippable)* — With sufficient repository access, check
  rulesets or branch protection for review and direct-push controls.
- `secret_scanning` *(skippable)* — Check GitHub/GitLab secret scanning,
  Gitleaks, TruffleHog, detect-secrets, or equivalent.
- `codeowners` — Check for a valid root or `.github/` CODEOWNERS file.
- `automated_security_review` *(skippable)* — Check for readable SAST,
  dependency, container, or automated security review reports.
- `dependency_update_automation` — Check for Dependabot, Renovate, or
  equivalent automated dependency update PRs.
- `gitignore_comprehensive` — Check that `.env` files, dependencies, build
  output, IDE files, and OS files are ignored without ignoring `.env.example`.
- `privacy_compliance` *(skippable)* — Check consent management, retention
  policy, GDPR/CCPA handling, minimization, or tracking consent.
- `secrets_management` — Check environment variables, cloud secret managers,
  CI secret references, encrypted secrets, and absence of hardcoded secrets.
- `min_release_age` — Check for an explicit dependency-release waiting period,
  such as Renovate `minimumReleaseAge`.
- `issue_templates` — Check for structured bug and feature issue templates.
- `issue_labeling_system` — Check for consistent priority, type, and area
  labels.
- `backlog_health` *(skippable)* — Check open issue titles, labels, age, and
  recent activity.
- `pr_templates` — Check for a PR template covering description, context, and
  testing.

## Application-scope criteria

These are checked independently for every discovered application.

### Code quality

- `lint_config` — Check for ESLint, Biome, Ruff, Flake8, Sonar, or equivalent.
- `type_check` — Check for strict TypeScript, `checkJs`, mypy, or equivalent.
- `formatter` — Check for Prettier, Biome, Black, or equivalent.
- `pre_commit_hooks` — Check for Husky/lint-staged or pre-commit configuration.
- `strict_typing` *(skippable)* — Check for strict type-checking mode where
  applicable.
- `naming_consistency` — Check for enforced or documented naming conventions.
- `cyclomatic_complexity` — Check for complexity rules or complexity-analysis
  tooling.
- `dead_code_detection` — Check for Knip, depcheck-style source analysis,
  unused-module rules, Vulture, staticcheck, or equivalent.
- `duplicate_code_detection` — Check for jscpd, Sonar CPD, PMD, or equivalent.
- `code_modularization` *(skippable)* — Check for dependency boundaries,
  restricted imports, architecture tests, or compiler-enforced modules.
- `n_plus_one_detection` *(skippable)* — For database-backed apps, check for
  DataLoader, ORM query analysis, APM slow-query detection, or similar.
- `heavy_dependency_detection` *(skippable)* — For bundled apps, check for
  bundle analyzers, size limits, Lighthouse budgets, or bundle-size CI.
- `unused_dependencies_detection` — Check for depcheck, Knip, deptry,
  `go mod tidy` in CI, cargo-udeps, or equivalent.

### Testing and interactive QA

- `unit_tests_exist` — Check for unit-test files or test directories.
- `integration_tests_exist` — Check for Playwright, Cypress, integration
  directories, or equivalent integration suites.
- `unit_tests_runnable` — Find the documented local test command and run a
  safe collection/listing or test command to verify it works.
- `test_performance_tracking` — Check for test timings, reports, artifacts,
  or test analytics.
- `flaky_test_detection` *(skippable)* — Check for retries, quarantine,
  flake tracking, or test stability metrics.
- `test_coverage_thresholds` — Check that minimum coverage is enforced.
- `test_naming_conventions` — Check explicit test-match patterns or documented
  test naming rules.
- `test_isolation` — Check parallelism, test databases, transactions,
  factories, randomization, or other isolation controls.
- `interactive_qa_exists` — Require complete documentation for installing,
  starting dependencies, handling auth, launching the app, and performing a
  meaningful interaction.
- `interactive_qa_runnable` — Follow the documented path, or validate the
  complete fallback path, and reach an interactive application state.

### APIs, data, and observability

- `api_schema_docs` *(skippable)* — Check for OpenAPI, Swagger, GraphQL, or
  equivalent API schema files.
- `database_schema` *(skippable)* — Check for migrations, Prisma, TypeORM,
  SQLAlchemy, SQL schemas, or equivalent data-model definitions.
- `structured_logging` — Check for a structured logging library or dedicated
  logger module.
- `distributed_tracing` — Check for OpenTelemetry, request IDs, trace IDs, or
  propagation through service calls.
- `metrics_collection` — Check for Datadog, Prometheus, New Relic, Axiom,
  CloudWatch, or equivalent metrics instrumentation.
- `code_quality_metrics` *(skippable)* — Check for tracked coverage,
  complexity, maintainability, or code-scanning metrics.
- `error_tracking_contextualized` — Check for Sentry, Bugsnag, Rollbar, or
  equivalent error tracking with source maps and context.
- `alerting_configured` — Check for PagerDuty, OpsGenie, or custom alert rules.
- `deployment_observability` — Check for monitoring dashboards, deployment
  annotations, or documented ways to inspect deployment impact.
- `health_checks` *(skippable)* — Check for health endpoints, probes,
  Docker HEALTHCHECK, or load-balancer health checks.
- `circuit_breakers` *(skippable)* — Check for circuit breakers, fallbacks,
  retry/backoff, or resilience libraries around external calls.
- `profiling_instrumentation` *(skippable)* — Check for APM, continuous
  profiling, Node profiling, memory profiling, or flamegraph tooling.

### Security, privacy, and product insight

- `dast_scanning` *(skippable)* — For deployed web services, check for ZAP,
  Burp, Nuclei, StackHawk, or equivalent scans against a running target.
- `pii_handling` *(skippable)* — Check for PII detection, masking, data
  classification, privacy documentation, or privacy-aware test data.
- `log_scrubbing` — Check for logger redaction, sanitization, masking, or
  documented sensitive-data filtering.
- `product_analytics_instrumentation` — Check for PostHog, Mixpanel, Amplitude,
  Heap, GA4, or equivalent product analytics.
- `error_to_insight_pipeline` — Check for Sentry/GitHub integration,
  error-to-issue automation, or incident tools that create actionable issues.

## Preparation checklist

For a practical agent-friendly baseline, add:

1. `AGENTS.md` with setup, test, build, QA, environment, and conventions.
2. `.env.example` listing every required variable without real secrets.
3. One command for setup and one command for validation.
4. Linting, formatting, type checking, and pre-commit hooks.
5. Unit tests, integration or interactive QA, coverage thresholds, and CI.
6. Dependency update automation, secret scanning, CODEOWNERS, issue templates,
   and PR templates.
7. Architecture/data-flow documentation and a documented fallback path.
8. Error tracking, structured logs, privacy controls, and deployment
   observability appropriate to the application.
