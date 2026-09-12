#!/usr/bin/env node
/**
 * Checks backend/*.sql migration files for proper guard comments and
 * documented destructive operations.
 *
 * Rules:
 * - Every .sql file must have a header block with migration order info.
 * - DELETE FROM, TRUNCATE, DROP TABLE, ALTER TABLE ... DROP must be
 *   preceded by a DESTRUCTIVE or DATA-MODIFYING warning in the header.
 * - No migration should be applied automatically.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SQL_DIR = join(process.cwd(), 'backend');
const DESTRUCTIVE_PATTERNS = [
    /\bDELETE\s+FROM\b/i,
    /\bTRUNCATE\b/i,
    /\bDROP\s+TABLE\b/i,
    /\bALTER\s+TABLE.*DROP\b/i,
];

let hasErrors = false;
let checkedCount = 0;

const files = readdirSync(SQL_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

for (const file of files) {
    const path = join(SQL_DIR, file);
    const lines = readFileSync(path, 'utf8').split('\n');
    const header = lines.slice(0, 15).join('\n');
    checkedCount++;

    // Strip SQL comments before checking for destructive operations,
    // so rollback instructions in comments don't trigger false positives.
    const sqlOnly = lines
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n');

    const hasDestructive = DESTRUCTIVE_PATTERNS.some((p) => p.test(sqlOnly));
    const headerWarning = /⚠️|DESTRUCTIVE|DATA-MODIFYING/i.test(header);

    if (hasDestructive && !headerWarning) {
        console.error(
            `✗ ${file}: contains destructive SQL but no guard warning in the header`
        );
        hasErrors = true;
        continue;
    }

    if (!/migration order|run (first|after|before)|order:/i.test(header)) {
        console.warn(`⚠ ${file}: missing migration order comment in the header`);
    }

    if (!/rollback/i.test(lines.slice(0, 20).join('\n'))) {
        console.warn(`⚠ ${file}: missing rollback information in the header`);
    }

    console.log(
        hasDestructive
            ? `✓ ${file}: destructive operations properly guarded`
            : `✓ ${file}: no destructive operations`
    );
}

console.log(`\nChecked ${checkedCount} migration file(s).`);

if (hasErrors) {
    console.error('\n✗ Migration guard check failed.');
    process.exit(1);
} else {
    console.log('\n✓ All migration guard checks passed.');
    process.exit(0);
}
