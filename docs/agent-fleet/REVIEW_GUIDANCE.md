# Review Guidance

This document defines what the fleet's review agents look for, what they
skip, and how they report findings.

## Deep Reviewer

The Deep Reviewer performs objective, line-specific bug review. It comments
only; it never approves.

### What to flag

- Dead or unreachable code.
- Broken control flow (missing `break`, fallthrough bugs).
- Async/await mistakes (missing `await`, unhandled rejections).
- Null or undefined dereferences.
- Resource leaks (unclosed connections, unremoved listeners).
- SQL or XSS injection vulnerabilities.
- Missing error handling for operations that can fail.
- Off-by-one errors.
- Race conditions.
- Incorrect data transformations that produce wrong output.
- Broken fallback behavior (the JSON snapshot path must still work).

### What to skip

- Stylistic preferences or formatting.
- Minor performance optimizations without a measurable impact.
- Architectural opinions or design suggestions (Pair Reviewer handles these).
- Naming convention debates.
- Import ordering.

### Finding format

Each finding includes:

1. **File and line number** (or line range).
2. **Severity**: `critical`, `serious`, `moderate`, `minor`.
3. **Category**: correctness, security, data-integrity, or test-gap.
4. **Description**: what is wrong and why it matters.
5. **Suggested fix**: a concrete code suggestion when the fix is high
   confidence.

Post findings as inline review comments on the specific lines. Post a summary
comment on the PR if there are five or more findings.

## Security Reviewer

The Security Reviewer runs STRIDE, OWASP Top 10, and supply-chain analysis on
PRs that touch sensitive paths. It comments only; it never approves.

### What to flag

- Injection flaws (SQL, XSS, command, template).
- Authentication or authorization weaknesses.
- Sensitive data exposure (credentials, tokens, PII in logs or commits).
- Security misconfiguration (CORS, CSP, permissions).
- Vulnerable dependencies (known CVEs in added or updated packages).
- Insecure deserialization or unsafe `eval`.
- Missing access controls on new endpoints or data flows.
- Supply-chain risks (typosquatting, unfamiliar maintainers, suspicious
  install scripts).

### Severity threshold

Report findings at `medium` severity and above by default. Use the workflow
input `security_severity_threshold` to adjust.

### Block on critical

When `security_block_on_critical` is enabled (default), the Security Reviewer
submits a `REQUEST_CHANGES` review for critical findings.

## Pair Reviewer

The Pair Reviewer produces design and architecture reports. It does not post
inline code comments.

### What to cover

- Whether the change fits the existing architecture.
- Whether new abstractions are justified or over-engineered.
- Whether the change introduces coupling that will be hard to reverse.
- Whether error handling and fallback strategies are consistent with the
  project conventions.
- Whether the test strategy covers the important behavior paths.

### Interaction

The Pair Reviewer supports resumable Q&A through a Factory parent session.
A human can ask follow-up questions and the reviewer continues with its
context preserved.

## CI Steward

The CI Steward classifies CI failures and retries within a budget.

### Failure classification

| Class          | Example                                     | Retry?     | Auto-fix?         |
| -------------- | ------------------------------------------- | ---------- | ----------------- |
| Infrastructure | Runner offline, network timeout, rate limit | Yes        | No                |
| Flaky          | Intermittent test failure, race in CI       | Yes (once) | No                |
| Code           | Test failure, lint error, build error       | No         | Yes (if bounded)  |
| Configuration  | Missing secret, wrong permissions           | No         | No (notify human) |

### Budgets

- `max_retries`: 1 per failed job per commit.
- `max_fix_attempts`: 2 consecutive fix commits per PR.
- `max_runs_per_pr`: 10 lifetime invocations per PR.

When the budget is exhausted, the CI Steward posts a summary comment and
stops.

## Auto-fix experts

Auto-fix experts apply one bounded fix at a time. Each fix targets a single
failed check or a single accepted review finding.

### Rules

- Push only to the PR branch or a `factory/*` branch.
- Never push to `main`.
- Never force-push.
- Never merge or enable auto-merge.
- Commit messages must start with `fix:` and reference the check or finding.
- Each fix is a single commit. No squashing or rewriting history.
- If the fix would touch a sensitive path, stop and report instead.
