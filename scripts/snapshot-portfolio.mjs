/**
 * =============================================================================
 * PORTFOLIO SNAPSHOT
 * =============================================================================
 *
 * Writes assets/data/portfolio.json from the live Supabase data.
 *
 * Data.js falls back to that file whenever Supabase is unreachable at runtime,
 * so keeping it fresh turns "database down" into "slightly stale site" instead
 * of an empty graph. It runs automatically before every build (npm run build →
 * prebuild), which means each deploy ships a snapshot taken at build time.
 *
 * This script never fails a build. No credentials, no network, bad data: it
 * warns, leaves any existing snapshot alone, and exits 0.
 *
 * Usage:
 *   npm run snapshot
 * =============================================================================
 */

import { createClient } from '@supabase/supabase-js';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { fetchPortfolioTree } from '../backend/supabase.js';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
// PORTFOLIO_SNAPSHOT_PATH lets the tests write somewhere disposable
const OUTPUT_PATH = process.env.PORTFOLIO_SNAPSHOT_PATH
    || join(projectRoot, 'assets', 'data', 'portfolio.json');

/** Exits 0 so a missing snapshot never breaks the build. */
function skip(reason) {
    console.warn(`⚠️  Snapshot skipped: ${reason}`);
    console.warn('   The site will still build; portfolio.json just stays as it is.');
    process.exit(0);
}

async function main() {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
        skip('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set');
    }

    console.log('📡 Fetching portfolio data from Supabase...');

    let tree;
    try {
        tree = await fetchPortfolioTree(createClient(url, key), url);
    } catch (error) {
        skip(`Supabase request failed - ${error.message}`);
    }

    if (!tree) {
        skip('Supabase returned no root node');
    }

    const nodeCount = countNodes(tree);
    if (nodeCount < 2) {
        skip(`only ${nodeCount} node(s) returned, refusing to overwrite the snapshot`);
    }

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(tree, null, 2)}\n`, 'utf8');

    console.log(`✅ Wrote ${OUTPUT_PATH} (${nodeCount} nodes)`);
}

function countNodes(node) {
    return 1 + (node.children || []).reduce((total, child) => total + countNodes(child), 0);
}

main().catch(error => {
    // Unexpected failures are still not worth breaking a deploy over
    skip(`unexpected error - ${error.message}`);
});
