import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { makeRows } from './fixtures/rows.js';

const run = promisify(execFile);
const SCRIPT = join(process.cwd(), 'scripts', 'snapshot-portfolio.mjs');

let server;
let baseUrl;
let rows;
let outputDir;
let outputPath;

/** Stands in for PostgREST: GET /rest/v1/<table> returns that table's rows. */
beforeAll(async () => {
    server = createServer((request, response) => {
        const table = new URL(request.url, 'http://localhost').pathname.replace('/rest/v1/', '');
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(rows[table] ?? []));
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

beforeEach(async () => {
    rows = makeRows({ homepageFlags: true });
    outputDir = await mkdtemp(join(tmpdir(), 'portfolio-snapshot-'));
    outputPath = join(outputDir, 'portfolio.json');
});

afterEach(() => rm(outputDir, { recursive: true, force: true }));

const runScript = (env = {}) => run('node', [SCRIPT], {
    env: {
        ...process.env,
        PORTFOLIO_SNAPSHOT_PATH: outputPath,
        VITE_SUPABASE_URL: baseUrl,
        VITE_SUPABASE_ANON_KEY: 'test-anon-key',
        ...env
    }
});

const readSnapshot = async () => JSON.parse(await readFile(outputPath, 'utf8'));

describe('npm run snapshot', () => {
    it('writes the tree Data.js expects as its fallback', async () => {
        const { stdout } = await runScript();

        const tree = await readSnapshot();
        expect(tree.uuid).toBe('root-0');
        expect(tree.children.map(child => child.uuid)).toEqual(['product-path', 'info-path']);
        expect(stdout).toContain('9 nodes');
    });

    it('keeps the graph visibility flags in the snapshot', async () => {
        await runScript();

        const thoughtspot = (await readSnapshot()).children[0].children[0];
        expect(thoughtspot.showOnHomepage).toBe(true);
    });

    it('skips without failing when credentials are missing', async () => {
        const { stderr } = await runScript({ VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' });

        expect(stderr).toContain('Snapshot skipped');
        await expect(readFile(outputPath, 'utf8')).rejects.toThrow();
    });

    it('leaves the previous snapshot alone when the database is unreachable', async () => {
        await writeFile(outputPath, '{"uuid":"previous"}', 'utf8');

        const { stderr } = await runScript({ VITE_SUPABASE_URL: 'http://127.0.0.1:1' });

        expect(stderr).toContain('Snapshot skipped');
        expect(await readSnapshot()).toEqual({ uuid: 'previous' });
    });

    it('refuses to overwrite a good snapshot with an empty database', async () => {
        await writeFile(outputPath, '{"uuid":"previous"}', 'utf8');
        rows = { nodes: [{ id: 1, parent_id: null, uuid: 'root-0', uri: '/', title: 'Root', is_featured: true }] };

        const { stderr } = await runScript();

        expect(stderr).toContain('refusing to overwrite');
        expect(await readSnapshot()).toEqual({ uuid: 'previous' });
    });
});
