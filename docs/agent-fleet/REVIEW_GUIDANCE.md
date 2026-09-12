# Review Guidance

Review agents report high-confidence, line-specific findings. They skip style
preferences, naming debates, and speculative redesigns.

## PR Context

The review summary format and project-specific checks live in
`.factory/skills/review-guidelines/SKILL.md`. The review agent loads that
file automatically, so summaries stay structured without a separate workflow.
Comment `@droid fill` on a PR to write its description from the template.

## Deep Reviewer

Flag correctness, security, data integrity, and test gaps. Prioritize broken
control flow, async errors, null access, resource leaks, injection, races,
incorrect transformations, and broken fallback behavior.

Each finding includes:

1. File and line.
2. Severity: `critical`, `serious`, `moderate`, or `minor`.
3. Category.
4. Impact and evidence.
5. A concrete fix when confidence is high.

The reviewer comments only. It never approves or requests changes.

## Security Reviewer

For sensitive paths, check STRIDE, OWASP Top 10, credentials, permissions,
dependencies, browser injection, and supply chain risk. Report findings at
`medium` severity and above. A critical finding may request changes. The
reviewer never approves or writes code.

## Pair Reviewer

Assess architecture fit, coupling, reversibility, error handling, fallback
behavior, and test strategy. Return a concise report through the parent
session. Keep design discussion out of inline bug comments.

## CI Steward

Classify failures as infrastructure, flaky, code, or configuration. Retry only
infrastructure and flaky failures. Apply one bounded code fix when authorized
by `.github/droid-ci.yml`. Stop on sensitive paths or exhausted budgets.
