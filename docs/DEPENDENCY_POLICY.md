# Dependency policy

Dependencies should be updated through Dependabot pull requests. Prefer
updates that have been available for at least seven days before merging them.
This waiting period gives maintainers time to catch newly reported
vulnerabilities, broken releases, and ecosystem regressions.

Every dependency update must pass:

```bash
npm ci
npm run lint
npm run format:check
npm test
npm run build
```
