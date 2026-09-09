import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchPortfolioTree } from '../backend/supabase.js';
import { makeRows, makeClient } from './fixtures/rows.js';

const STORAGE_BASE = 'https://test.supabase.co';

const fetchTree = (options = {}, clientOptions = {}) =>
    fetchPortfolioTree(makeClient(makeRows(options), clientOptions), STORAGE_BASE);

describe('fetchPortfolioTree', () => {
    it('nests nodes under their parent and returns the root', async () => {
        const root = await fetchTree();

        expect(root.uuid).toBe('root-0');
        expect(root.children.map(child => child.uuid)).toEqual(['product-path', 'info-path']);
        expect(root.children[0].children.map(child => child.uuid)).toEqual(['ts-path', 'pb-path']);
    });

    it('drops nodes that are not featured', async () => {
        const root = await fetchTree();
        expect(root.children.some(child => child.uuid === 'hidden-1')).toBe(false);
    });

    it('maps the related tables onto their node', async () => {
        const node = (await fetchTree()).children[0].children[0];

        expect(node.externalLinks).toEqual([{ title: 'LinkedIn', link: 'https://linkedin.com/in/x' }]);
        expect(node.metadata).toEqual([{ title: 'Role', subtitle: 'PM' }]);
        expect(node.recognition).toEqual([{ title: 'Award', subtitle: 'Best', year: '2024' }]);
        expect(node.footnotes).toEqual([{ footnote: 'A note' }]);
        expect(node.connectedNodes).toEqual(['root-0']);
        expect(node.subsections).toEqual([
            { title: 'Context', content: '<p>c</p>', isCollapsedByDefault: true, footnotes: ['Sub note'] }
        ]);
    });

    it('builds storage URLs from the base it is given, passing absolute URLs through', async () => {
        const [media, external] = (await fetchTree()).children[0].children[0].media;

        expect(media.url).toBe(`${STORAGE_BASE}/storage/v1/object/public/portfolio-media/photography/taipei/1.jpg`);
        expect(external.url).toBe('https://cdn.example.com/a.jpg');
    });

    it('strips the internal tree-building fields', async () => {
        const root = await fetchTree();

        expect(root).not.toHaveProperty('_id');
        expect(root.children[0]).not.toHaveProperty('_parentId');
    });

    it('carries the graph visibility flags through when the columns exist', async () => {
        const root = await fetchTree({ homepageFlags: true });
        const thoughtspot = root.children[0].children[0];
        const iitm = root.children[1].children[0].children[0];

        expect(thoughtspot.showOnHomepage).toBe(true);
        expect(thoughtspot.showWithParent).toBe(false);
        expect(iitm.showWithParent).toBe(true);
    });

    it('leaves the flags undefined when the migration has not run', async () => {
        const thoughtspot = (await fetchTree()).children[0].children[0];

        expect(thoughtspot.showOnHomepage).toBeUndefined();
        expect(thoughtspot.showWithParent).toBeUndefined();
    });

    it('returns null when the nodes query errors', async () => {
        expect(await fetchTree({}, { errorOn: 'nodes' })).toBeNull();
    });

    it('returns null when there is no root node', async () => {
        const rows = makeRows();
        rows.nodes = rows.nodes.filter(node => node.parent_id !== null);

        expect(await fetchPortfolioTree(makeClient(rows), STORAGE_BASE)).toBeNull();
    });
});

describe('client construction', () => {
    const createClient = vi.hoisted(() => vi.fn(() => ({ from: () => ({ select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }) })));

    beforeEach(() => {
        vi.resetModules();
        createClient.mockClear();
        vi.doMock('@supabase/supabase-js', () => ({ createClient }));
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.doUnmock('@supabase/supabase-js');
        vi.unstubAllEnvs();
    });

    it('creates one client from the env credentials', async () => {
        vi.stubEnv('VITE_SUPABASE_URL', 'https://real.supabase.co');
        vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');

        const module = await import('../backend/supabase.js');

        expect(createClient).toHaveBeenCalledTimes(1);
        expect(createClient).toHaveBeenCalledWith('https://real.supabase.co', 'anon-key');
        expect(module.supabase).not.toBeNull();
    });

    /**
     * The real createClient throws "supabaseUrl is required" on an empty string.
     * That throw used to happen while app.js was still importing, so no listeners
     * were ever attached and the whole page rendered blank - taking the JSON
     * fallback down with it.
     */
    it('does not construct a client, or throw, without credentials', async () => {
        vi.stubEnv('VITE_SUPABASE_URL', '');
        vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

        const module = await import('../backend/supabase.js');

        expect(createClient).not.toHaveBeenCalled();
        expect(module.supabase).toBeNull();
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('VITE_SUPABASE_URL'));
    });

    it('resolves null from fetchPortfolioData so Data.js falls back to JSON', async () => {
        vi.stubEnv('VITE_SUPABASE_URL', '');
        vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

        const { fetchPortfolioData } = await import('../backend/supabase.js');

        await expect(fetchPortfolioData()).resolves.toBeNull();
    });
});
