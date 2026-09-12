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
    /\bDELETE\s+FROM\b/gi,
    /\bTRUNCATE\b/gi,
    /\bDROP\s+TABLE\b/gi,
    /\bALTER\s+TABLE.*DROP\b/gi,
];

let hasErrors = false;
let checkedCount = 0;

const files = readdirSync(SQL_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

for (const file of files) {
    const path = join(SQL_DIR, file);
    const content = readFileSync(path, 'utf8');
    checkedCount++;

    // Strip SQL comments before checking for destructive operations,
    // so rollback instructions in comments don't trigger false positives.
    const sqlOnly = content
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n');

    // Check for destructive operations in actual SQL (not comments)
    const hasDestructive = DESTRUCTIVE_PATTERNS.some((p) => p.test(sqlOnly));
    // Also check if the header mentions destructive operations
    const headerMentionsDestructive = /DESTRUCTIVE|DATA-MODIFYING/i.test(
        content.split('\n').slice(0, 15).join('\n')
    );
    const headerWarning = /⚠️|DESTRUCTIVE|DATA-MODIFYING/i.test(
        content.split('\n').slice(0, 15).join('\n')
    );

    if (hasDestructive && !headerWarning) {
        console.error(
            `✗ ${file}: contains destructive SQL but no guard warning in the header`
        );
        hasErrors = true;
    }

    // Check for migration order
    const hasOrder = /migration order|run (first|after|before)|order:/i.test(
        content.split('\n').slice(0, 15).join('\n')
    );

    if (!hasOrder) {
        console.warn(
            `⚠ ${file}: missing migration order comment in the header`
        );
    }

    // Check for rollback info
    const hasRollback = /rollback/i.test(
        content.split('\n').slice(0, 20).join('\n')
    );

    if (!hasRollback) {
        console.warn(
            `⚠ ${file}: missing rollback information in the header`
        );
    }

    if (hasDestructive && headerWarning) {
        console.log(`✓ ${file}: destructive operations properly guarded`);
    } else if (headerMentionsDestructive && !hasDestructive) {
        console.log(`✓ ${file}: header warns of destructive ops (in rollback only)`);
    } else if (!hasDestructive) {
        console.log(`✓ ${file}: no destructive operations`);
    }
}

console.log(`\nChecked ${checkedCount} migration file(s).`);

if (hasErrors) {
    console.error('\n✗ Migration guard check failed.');
    process.exit(1);
} else {
    console.log('\n✓ All migration guard checks passed.');
    process.exit(0);
}
