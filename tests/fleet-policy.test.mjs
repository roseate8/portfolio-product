// Fleet policy harness.
//
// Parses every .github/workflows/*.yml and the fleet policy documents, and
// asserts the guards the fleet depends on. Workflow-specific rules are added
// here as workflows land (see docs/ai/AGENT_POLICY.md); the harness and the
// initial policy-file checks landed with the fleet-policy-foundation feature.
//
// Rules are data ({ id, description, applies, check }) so fixtures can feed
// violating workflow sources to `evaluateWorkflowSource` and must fail.

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function repoPath(rel) {
  return path.join(repoRoot, rel);
}

function readFile(rel) {
  return fs.readFileSync(repoPath(rel), 'utf8');
}

function listWorkflowFiles() {
  const dir = repoPath(path.join('.github', 'workflows'));
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.(yml|yaml)$/.test(name))
    .sort();
}

// ---------------------------------------------------------------------------
// Workflow rule harness
// ---------------------------------------------------------------------------

/**
 * Evaluate every workflow rule against one workflow source string.
 * Returns an array of violation objects: { ruleId, description, detail }.
 * Exported so fixture tests can assert that violating sources fail.
 */
export function evaluateWorkflowSource(name, raw) {
  let doc;
  try {
    doc = YAML.parse(raw);
  } catch (err) {
    return [
      {
        ruleId: 'WF-PARSE',
        description: 'workflow parses as YAML',
        detail: String(err && err.message ? err.message : err),
      },
    ];
  }

  const workflow = { name, raw, doc };
  const violations = [];
  for (const rule of workflowRules) {
    if (rule.applies && !rule.applies(workflow)) continue;
    const problems = rule.check(workflow) || [];
    for (const detail of problems) {
      violations.push({ ruleId: rule.id, description: rule.description, detail });
    }
  }
  return violations;
}

/**
 * Workflow rules. Each rule returns a list of violation detail strings
 * (empty list = pass). Rules for fleet workflows (permissions, fork guards,
 * concurrency, timeouts, no-merge, check-name exclusions) are added here as
 * those workflows land.
 */
const workflowRules = [
  {
    id: 'WF-PARSE',
    description: 'workflow parses as a YAML mapping with on: and jobs:',
    check({ name, doc }) {
      const problems = [];
      if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
        problems.push(`${name}: top level must be a YAML mapping`);
        return problems;
      }
      // YAML 1.2 core schema keeps `on:` as the string key "on"; guard both.
      const triggers = doc.on ?? doc['on'];
      if (triggers === undefined) problems.push(`${name}: missing 'on:' triggers`);
      if (!doc.jobs || typeof doc.jobs !== 'object' || Object.keys(doc.jobs).length === 0) {
        problems.push(`${name}: missing 'jobs:'`);
      }
      return problems;
    },
  },
  {
    id: 'WF-CI-NODE-MAJOR',
    description: 'CI workflow Node major version matches the engines.node minimum major',
    applies: ({ name }) => name === 'ci.yml',
    check({ doc }) {
      const pkg = JSON.parse(readFile('package.json'));
      const engines = pkg.engines && pkg.engines.node;
      if (!engines) return ['package.json has no engines.node to match'];
      const minMajor = engines.match(/>=\s*(\d+)/);
      if (!minMajor) return [`engines.node "${engines}" declares no >= minimum`];

      const problems = [];
      const jobs = doc.jobs || {};
      let found = false;
      for (const [jobName, job] of Object.entries(jobs)) {
        for (const step of job.steps || []) {
          const version = step && step.with && step.with['node-version'];
          if (version === undefined) continue;
          found = true;
          if (String(version).split('.')[0] !== minMajor[1]) {
            problems.push(
              `job "${jobName}" uses node-version ${version}, but engines.node minimum major is ${minMajor[1]}`
            );
          }
        }
      }
      if (!found) problems.push('ci.yml pins no node-version');
      return problems;
    },
  },
];

// ---------------------------------------------------------------------------
// Policy documents
// ---------------------------------------------------------------------------

const REQUIRED_CONTROL_FILES = [
  'AGENTS.md',
  'docs/ai/AGENT_POLICY.md',
  'docs/ai/RISK_MODEL.md',
  'docs/ai/BRANCH-PROTECTION.md',
  '.github/CODEOWNERS',
  '.github/pull_request_template.md',
  '.factory/skills/review-guidelines/SKILL.md',
];

// Sensitive paths per docs/ai/RISK_MODEL.md and the validation contract scope.
const SENSITIVE_PATHS = [
  '.github/**',
  '.factory/**',
  'AGENTS.md',
  'docs/ai/**',
  'package.json',
  'package-lock.json',
  'backend/**/*.sql',
  'supabase/**',
  '.mcp.json',
  'vercel.json',
];

// Fleet-owned check names; these must never trigger new fleet runs.
const FLEET_CHECK_NAMES = [
  'fleet/deep-review',
  'fleet/risk',
  'fleet/readiness',
  'fleet/security-review',
  'fleet/qa',
  'fleet/ci-steward',
  'fleet/dashboard',
];

describe('control plane files', () => {
  it.each(REQUIRED_CONTROL_FILES)('%s exists', (rel) => {
    expect(fs.existsSync(repoPath(rel)), `${rel} is missing`).toBe(true);
  });

  it('README links every control plane file', () => {
    const readme = readFile('README.md');
    for (const rel of REQUIRED_CONTROL_FILES) {
      expect(readme.includes(rel), `README.md does not reference ${rel}`).toBe(true);
    }
  });

  it('agent.md is retired and redirects to AGENTS.md', () => {
    const legacy = readFile('agent.md');
    expect(legacy).toMatch(/AGENTS\.md/);
    expect(legacy.toLowerCase()).toMatch(/superseded|retired|redirect/);
  });
});

describe('docs/ai/AGENT_POLICY.md', () => {
  it('defines authorized actor with per-command minimum permission levels', () => {
    const policy = readFile('docs/ai/AGENT_POLICY.md');
    expect(policy).toMatch(/authorized actor/i);
    expect(policy).toContain('collaborators/{actor}/permission');
    // Mutation-authorizing commands require write.
    expect(policy).toContain('@droid fix');
    expect(policy).toContain('@droid accept');
    // Read-only-output commands at the policy-named triage level.
    for (const cmd of ['@droid design', '@droid security-review', '@droid qa', '@droid plan-supabase']) {
      expect(policy).toContain(cmd);
    }
    expect(policy).toMatch(/triage/);
    expect(policy).toMatch(/write/);
  });

  it('defines concrete numeric budgets', () => {
    const policy = readFile('docs/ai/AGENT_POLICY.md');
    expect(policy).toMatch(/retry budget[^\n]*\d+/i);
    expect(policy).toMatch(/attempt[^\n]*\d+/i);
    expect(policy).toMatch(/commit[^\n]*\d+/i);
  });

  it('names the fleet-owned check-name list', () => {
    const policy = readFile('docs/ai/AGENT_POLICY.md');
    for (const checkName of FLEET_CHECK_NAMES) {
      expect(policy).toContain(checkName);
    }
  });

  it('defines writer-lease substrate, expiry, and merge-follow-up latency bound', () => {
    const policy = readFile('docs/ai/AGENT_POLICY.md');
    expect(policy).toMatch(/lease/i);
    expect(policy).toMatch(/concurrency/);
    expect(policy).toMatch(/\d+\s*minutes/); // lease TTL
    expect(policy).toMatch(/merge follow-up|post-merge/i);
    expect(policy).toMatch(/\d+\s*hours/); // latency bound
  });
});

describe('docs/ai/RISK_MODEL.md', () => {
  it('defines precedence-ordered LOW/MEDIUM/HIGH rules (HIGH before MEDIUM before LOW)', () => {
    const model = readFile('docs/ai/RISK_MODEL.md');
    for (const level of ['LOW', 'MEDIUM', 'HIGH']) {
      expect(model).toMatch(new RegExp(`\\b${level}\\b`));
    }
    expect(model).toMatch(/precedence/i);
    const highIdx = model.indexOf('HIGH');
    const mediumIdx = model.indexOf('MEDIUM');
    const lowIdx = model.indexOf('LOW');
    expect(highIdx).toBeGreaterThanOrEqual(0);
    expect(mediumIdx).toBeGreaterThan(highIdx);
    expect(lowIdx).toBeGreaterThan(mediumIdx);
  });

  it('lists every contract-scope sensitive path', () => {
    const model = readFile('docs/ai/RISK_MODEL.md');
    for (const sensitive of SENSITIVE_PATHS) {
      expect(model).toContain(sensitive);
    }
  });
});

describe('docs/ai/BRANCH-PROTECTION.md', () => {
  it('specifies the required protection settings', () => {
    const doc = readFile('docs/ai/BRANCH-PROTECTION.md');
    expect(doc).toMatch(/main/);
    expect(doc).toMatch(/status check/i);
    expect(doc).toMatch(/up to date|current SHA/i);
    expect(doc).toMatch(/review/i);
    expect(doc).toMatch(/force push/i);
    expect(doc).toMatch(/auto-?merge/i);
  });
});

describe('.github/CODEOWNERS', () => {
  it('requires human review for sensitive paths', () => {
    const codeowners = readFile('.github/CODEOWNERS');
    expect(codeowners).toMatch(/@roseate8/);
    for (const sensitive of ['.github/', '.factory/', 'AGENTS.md', 'docs/ai/', 'package.json', 'package-lock.json', 'vercel.json']) {
      expect(codeowners).toContain(sensitive);
    }
  });
});

describe('.github/pull_request_template.md', () => {
  it('contains all required headings', () => {
    const template = readFile('.github/pull_request_template.md');
    for (const heading of [
      /agent authorship/i,
      /source request/i,
      /scope/i,
      /behavior/i,
      /tests/i,
      /risk/i,
      /rollback/i,
      /limitations/i,
    ]) {
      expect(template).toMatch(heading);
    }
  });
});

describe('.factory/skills/review-guidelines/SKILL.md', () => {
  it('defines objective bug criteria and the P0-P3 severity enum', () => {
    const skill = readFile('.factory/skills/review-guidelines/SKILL.md');
    expect(skill).toMatch(/objective/i);
    expect(skill).toMatch(/introduced/i);
    for (const sev of ['P0', 'P1', 'P2', 'P3']) {
      expect(skill).toMatch(new RegExp(`\\b${sev}\\b`));
    }
  });
});

describe('runtime alignment (Node)', () => {
  it('package.json declares engines.node >=22 <25', () => {
    const pkg = JSON.parse(readFile('package.json'));
    expect(pkg.engines && pkg.engines.node).toBeTruthy();
    expect(pkg.engines.node.replace(/\s/g, '')).toMatch(/>=22/);
    expect(pkg.engines.node.replace(/\s/g, '')).toMatch(/<25/);
  });

  it('README documents Node 22 CI / Node 24 local tolerance', () => {
    const readme = readFile('README.md');
    expect(readme).toMatch(/Node\.js?\s*22|Node\s*22/i);
    expect(readme).toMatch(/Node\.js?\s*24|Node\s*24/i);
  });
});

describe('workflow harness', () => {
  const workflows = listWorkflowFiles();

  it('finds at least one workflow to parse', () => {
    expect(workflows.length).toBeGreaterThan(0);
  });

  it.each(workflows.map((name) => [name]))('%s satisfies all workflow rules', (name) => {
    const raw = readFile(path.join('.github', 'workflows', name));
    expect(evaluateWorkflowSource(name, raw)).toEqual([]);
  });

  it('fixture: invalid YAML fails evaluation', () => {
    const violations = evaluateWorkflowSource('bad.yml', 'on: [push\n  jobs: {');
    expect(violations.some((v) => v.ruleId === 'WF-PARSE')).toBe(true);
  });

  it('fixture: workflow without jobs fails evaluation', () => {
    const violations = evaluateWorkflowSource('nojobs.yml', 'on: push\n');
    expect(violations.some((v) => v.ruleId === 'WF-PARSE')).toBe(true);
  });
});
