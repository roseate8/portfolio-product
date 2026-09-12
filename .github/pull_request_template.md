## Summary

<!-- What changed and why? -->

## Risk self-assessment

- [ ] Low: no sensitive paths, no dependencies, no migrations, diff < 300 lines
- [ ] Medium: additive sensitive-path change, minor dep update, or runtime behavior change
- [ ] High: migrations, workflow/permission changes, major dep bump, auth changes, diff > 800 lines

See [docs/agent-fleet/RISK_TAXONOMY.md](../docs/agent-fleet/RISK_TAXONOMY.md) for the full criteria.

## Sensitive paths

- [ ] This PR does not touch any [sensitive path](../docs/agent-fleet/SENSITIVE_PATHS.md)
- [ ] This PR touches sensitive paths (human review required)

## Validation

- [ ] `npm test`
- [ ] `npm run lint`
- [ ] `npm run format:check`
- [ ] `npm run build`
- [ ] Interactive QA completed for UI changes

## Data and security

- [ ] No secrets or generated files were committed
- [ ] Supabase migrations are documented and safe to apply
- [ ] Fallback behavior remains intact, or the change explains why it changed

## Agent involvement

<!-- Note any agent involvement and the checks a human performed afterward. -->

## Notes for reviewers

<!-- Screenshots, migration steps, rollout notes, or known limitations. -->
