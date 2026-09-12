# Branch Protection — required settings for roseate8/portfolio-product

The fleet's safety depends on GitHub branch protection, which agents cannot
administer (the automation token lacks that scope, by design). A human
repository admin must apply and maintain the settings below on the default
branch `main`. This file is the source-controlled specification; enforcement
is verified by the user.

## Required settings (branch: `main`)

1. **Require a pull request before merging.**
   - No direct pushes to `main` — every change arrives via PR.
   - **Require approvals: at least 1**, from a human (see `.github/CODEOWNERS`).
   - **Dismiss stale pull request approvals when new commits are pushed**: ON.
   - **Require review from Code Owners**: ON.
2. **Require status checks to pass before merging.**
   - **Require branches to be up to date before merging**: ON, so checks are
     always evaluated against the current head SHA.
   - Required checks: `build` (the CI workflow job) plus each fleet check that
     has landed, per the fleet-owned check-name list in
     `docs/ai/AGENT_POLICY.md` Section 4.
3. **Do not allow bypassing the above settings.**
   - No user, app, or bot (including the Factory GitHub App and any
     `github-actions` identity) is added to the bypass/allow list.
   - "Allow specified actors to bypass required pull requests": empty.
4. **Block force pushes**: ON. **Block deletions**: ON.
5. **Do not enable auto-merge for fleet PRs.** If repository auto-merge is
   enabled at all, no fleet identity may set it; a human alone decides and
   clicks merge.
6. **Require conversation resolution before merging**: ON (recommended, so
   review findings must be dispositioned).

## Why

These settings make the invariants in `AGENTS.md` and
`docs/ai/AGENT_POLICY.md` enforceable by GitHub rather than by prompt: no agent
can push to `main`, self-approve, skip current-SHA checks, or merge. The Risk
Analyzer's `APPROVED` review may satisfy the approval requirement only for
eligible LOW-risk PRs; a human still performs every merge.
