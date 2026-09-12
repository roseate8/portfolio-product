# Risk Taxonomy

Use this taxonomy for PR self-assessment and human review. It grants no approval
authority.

## Low

All conditions must hold:

- No sensitive paths, dependencies, migrations, workflows, secrets, or auth
  changes.
- Fewer than 300 changed lines.
- Required checks pass.
- Tests remain intact.

## Medium

Any condition sets at least medium risk:

- An additive sensitive-path change.
- A minor or patch dependency update.
- Between 300 and 800 changed lines.
- A runtime behavior change.
- A new environment variable.

## High

Any condition sets high risk:

- SQL, workflows, permissions, auth, secrets, deployment, or production data
  changes.
- A major dependency update.
- More than 800 changed lines.
- A failed required check.
- An agent attempts a merge, force-push, or protected branch write.

A sensitive-path behavior change is high risk. Every sensitive-path change
requires human approval.
