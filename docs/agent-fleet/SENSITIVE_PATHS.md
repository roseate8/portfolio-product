# Sensitive Paths

Changes to these paths require human review and trigger the Security Reviewer:

| Pattern                                                                | Scope                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------- |
| `.github/**`                                                           | Workflows, permissions, ownership, and automation |
| `.factory/**`, `AGENTS.md`, `agent.md`                                 | Agent behavior and tool policy                    |
| `package.json`, `package-lock.json`, `skills-lock.json`                | Dependencies and executable scripts               |
| `backend/**`, `.mcp.json`                                              | Database access, SQL, and MCP configuration       |
| `.env.example`, `vite.config.js`, `vercel.json`                        | Environment and deployment                        |
| `assets/js/**`                                                         | Browser data handling and rendering               |
| `public/assets/data/portfolio.json`                                    | Generated fallback data                           |
| `docs/agent-fleet/**`, `docs/DEPENDENCY_POLICY.md`, `docs/runbooks/**` | Operational policy                                |

The PR Author reports tasks that require these paths instead of changing them.
The Deep Reviewer flags them. A human reviews and approves every matching PR.
