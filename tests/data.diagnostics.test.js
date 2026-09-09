import { describe, it, expect, beforeEach, vi } from 'vitest';

const supabase = vi.hoisted(() => ({ fetchPortfolioData: vi.fn() }));

vi.mock('../backend/supabase.js', () => supabase);

const { default: Data } = await import('../assets/js/utils/Data.js');
const { default: Map } = await import('../assets/js/components/Map.js');

const TREE = {
    title: 'Root',
    uuid: 'root-0',
    uri: '/',
    originDate: '2018-01-01',
    children: [{ title: 'Child', uuid: 'c-1', uri: 'nodes/c', originDate: '2020-01-01', children: [] }]
};

beforeEach(() => {
    document.body.innerHTML = '';
    delete window.__portfolio;
    supabase.fetchPortfolioData.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('Data.buildData diagnostics', () => {
    it('publishes source and counts on a successful load', async () => {
        supabase.fetchPortfolioData.mockResolvedValue(TREE);

        const { dataSource } = await Data.buildData();

        expect(dataSource).toBe('supabase');
        expect(window.__portfolio).toMatchObject({
            ok: true,
            dataSource: 'supabase',
            rootTitle: 'Root',
            nodeCount: 2,
            uniqueDates: 2
        });
        expect(window.__portfolio.updatedAt).toEqual(expect.any(String));
    });

    it('records the Supabase error when it falls back to the JSON snapshot', async () => {
        supabase.fetchPortfolioData.mockRejectedValue(new Error('network down'));
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => TREE }));

        const { dataSource } = await Data.buildData();

        expect(dataSource).toBe('json-fallback');
        expect(window.__portfolio).toMatchObject({ ok: true, dataSource: 'json-fallback', error: 'network down' });
    });

    it('returns an empty tree and reports the failure when no source works', async () => {
        supabase.fetchPortfolioData.mockResolvedValue(null);
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' }));

        const result = await Data.buildData();

        expect(result.data.children).toEqual([]);
        expect(result.dataSource).toBe('none');
        expect(window.__portfolio).toMatchObject({ ok: false, dataSource: 'none', nodeCount: 0 });
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Could not load portfolio data'));
    });

    it('renders nothing into the page when loading fails', async () => {
        supabase.fetchPortfolioData.mockResolvedValue(null);
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        await Data.buildData();

        expect(document.body.innerHTML).toBe('');
    });
});

describe('Map.reportDataSource', () => {
    it('warns in the console for a degraded source', () => {
        Map.reportDataSource('json-fallback');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('json-fallback'));
    });

    it('adds nothing to the page, including the old fallback dot', () => {
        Map.reportDataSource('json-fallback');
        Map.reportDataSource('none');

        expect(document.body.innerHTML).toBe('');
        expect(document.querySelector('.data-source-indicator')).toBeNull();
    });

    it('stays quiet when the data came from Supabase', () => {
        Map.reportDataSource('supabase');

        expect(console.warn).not.toHaveBeenCalled();
    });
});
