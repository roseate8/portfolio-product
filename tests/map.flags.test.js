import { describe, it, expect, beforeEach, vi } from 'vitest';
import Map from '../assets/js/components/Map.js';
import { fetchPortfolioTree } from '../backend/supabase.js';
import { makeRows, makeClient } from './fixtures/rows.js';

const SELECTED_DATE = '2025-01-01';

async function loadTree(options) {
    const tree = await fetchPortfolioTree(makeClient(makeRows(options)), 'https://test.supabase.co');
    Map.data = tree;
    Map.graphFlagSource = null;
    return tree;
}

const uuidsIn = node => [node.uuid, ...(node.children || []).flatMap(uuidsIn)];

/** UUIDs the homepage graph would render at the given date. */
const homepageUuids = () => uuidsIn(Map.filterDataByDate(Map.data, SELECTED_DATE));

/** UUIDs rendered when a node is opened. */
const openedUuids = uuid => uuidsIn(Map.filterNodes(Map.findNodeByUUID(Map.data, uuid)));

const findNode = (tree, uuid) => Map.findNodeByUUID(tree, uuid);

describe('homepage visibility without the migration (legacy UUID lists)', () => {
    beforeEach(async () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        await loadTree();
    });

    it('reports the legacy source and says how to fix it', () => {
        expect(Map.resolveGraphFlagSource()).toBe('legacy');
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('add_homepage_flags.sql'));
    });

    it('keeps the whitelisted grandchild on the homepage and drops its sibling', () => {
        const visible = homepageUuids();

        expect(visible).toContain('ts-path');
        expect(visible).not.toContain('pb-path');
    });

    it('pins both education nodes when Information is opened', () => {
        const visible = openedUuids('info-path');

        expect(visible).toEqual(expect.arrayContaining(['iitm-path', 'iimb-path']));
        expect(visible).not.toContain('other-school');
    });

    it('collapses grandchildren for any other opened node', () => {
        expect(openedUuids('product-path')).not.toContain('ts-path-child');
        expect(openedUuids('product-path')).toEqual(expect.arrayContaining(['product-path', 'ts-path', 'pb-path']));
    });
});

describe('homepage visibility from the database flags', () => {
    beforeEach(async () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        await loadTree({ homepageFlags: true });
    });

    it('uses the database once any node carries a flag, without warning', () => {
        expect(Map.resolveGraphFlagSource()).toBe('database');
        expect(console.warn).not.toHaveBeenCalled();
    });

    it('produces the same graph as the legacy lists for the migrated data', () => {
        expect(homepageUuids()).toContain('ts-path');
        expect(homepageUuids()).not.toContain('pb-path');
        expect(openedUuids('info-path')).toEqual(expect.arrayContaining(['iitm-path', 'iimb-path']));
    });

    it('follows the data when the flags move, with no code change', async () => {
        const tree = await loadTree({ homepageFlags: true });
        findNode(tree, 'ts-path').showOnHomepage = false;
        findNode(tree, 'pb-path').showOnHomepage = true;
        Map.graphFlagSource = null;

        const visible = homepageUuids();

        expect(visible).toContain('pb-path');
        expect(visible).not.toContain('ts-path');
    });

    it('unpins an education node when its flag is cleared', async () => {
        const tree = await loadTree({ homepageFlags: true });
        findNode(tree, 'iimb-path').showWithParent = false;
        Map.graphFlagSource = null;

        const visible = openedUuids('info-path');

        expect(visible).toContain('iitm-path');
        expect(visible).not.toContain('iimb-path');
    });

    it('still respects dates and the featured flag on homepage nodes', async () => {
        const tree = await loadTree({ homepageFlags: true });
        findNode(tree, 'ts-path').originDate = '2030-01-01';
        Map.graphFlagSource = null;

        expect(homepageUuids()).not.toContain('ts-path');
    });
});
