# Risk Taxonomy

Every pull request receives a risk classification from the Risk Analyzer.
The classification determines whether bot approval is permitted or whether
human review is required.

## Risk levels

### Low risk

A PR is **low risk** when **all** of the following are true:

- No files under [sensitive paths](./SENSITIVE_PATHS.md) are changed.
- No new dependencies are added or existing dependencies are removed.
- No database migrations, RLS policies, or SQL files are modified.
- No GitHub Actions workflows, permissions, or repository settings change.
- No environment variables, secrets, or authentication flows are touched.
- The diff is under 300 lines of net change.
- All required CI checks pass.
- No `console.log` debug statements or hardcoded credentials are introduced.
- Existing tests pass and no test coverage is removed.

**Bot approval permitted.** The Risk Analyzer may approve the PR. A human
still clicks merge.

### Medium risk

A PR is **medium risk** when **any** of the following are true:

- A sensitive path is changed but the change is additive (new file, new
  export, new test) and does not alter existing behavior.
- Dependencies are updated (minor or patch) but no major version bumps.
- The diff is between 300 and 800 lines of net change.
- CI checks pass but the change touches runtime behavior (routing, data
  loading, rendering).
- New environment variables are added but no existing ones change.

**Human review required.** The Risk Analyzer posts the assessment but does
not approve.

### High risk

A PR is **high risk** when **any** of the following are true:

- Database migrations, RLS policies, or SQL files are modified.
- GitHub Actions workflows, permissions, or repository settings change.
- Dependencies have a major version bump.
- Authentication, authorization, or secret handling changes.
- The diff exceeds 800 lines of net change.
- Production Supabase writes, Storage policies, or deployment configuration
  are touched.
- Any CI check fails.
- Force-push, merge, or auto-merge is attempted by an agent.

**Human review required.** The Risk Analyzer posts the assessment with a
recommendation to review carefully. The PR is labeled `risk:high`.

## Sensitive-path override

Any change to a [sensitive path](./SENSITIVE_PATHS.md) is at least medium
risk, regardless of diff size or check status. Sensitive-path changes that
alter existing behavior (not purely additive) are high risk.

## Check-failure override

If any required CI check fails, the PR is automatically high risk regardless
of other factors. The Risk Analyzer does not approve.

## Output format

The Risk Analyzer posts a comment in this format:

```json
{
  "risk_level": "low|medium|high",
  "factors": ["factor 1", "factor 2"],
  "sensitive_paths_changed": ["path/to/file"],
  "diff_lines": 42,
  "checks_passing": true,
  "bot_approval": true,
  "recommendation": "Approve | Human review required | Review carefully"
}
```

The comment includes a human-readable summary below the JSON block.
