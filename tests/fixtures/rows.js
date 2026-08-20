/**
 * Database rows shaped like the Supabase tables, for tests that exercise
 * backend/supabase.js without a database.
 */

export function makeRows({ homepageFlags = false } = {}) {
    const flag = (onHomepage, withParent) => homepageFlags
        ? { show_on_homepage: onHomepage, show_with_parent: withParent }
        : {};

    return {
        nodes: [
            { id: 1, parent_id: null, uuid: 'root-0', uri: '/', title: 'Root', type: '', is_featured: true },
            {
                id: 2, parent_id: 1, uuid: 'product-path', uri: 'nodes/industry', title: 'Industry Work',
                type: 'path', is_featured: true, origin_date: '2018-01-01', ...flag(false, false)
            },
            {
                id: 3, parent_id: 2, uuid: 'ts-path', uri: 'nodes/industry/thoughtspot', title: 'ThoughtSpot',
                type: 'artifact', is_featured: true, origin_date: '2023-01-01', ...flag(true, false)
            },
            {
                id: 4, parent_id: 2, uuid: 'pb-path', uri: 'nodes/industry/policybazaar', title: 'Policybazaar',
                type: 'artifact', is_featured: true, origin_date: '2019-06-01', ...flag(false, false)
            },
            {
                id: 5, parent_id: 1, uuid: 'info-path', uri: 'nodes/information', title: 'Information',
                type: 'information', is_featured: true, origin_date: '2018-01-01', ...flag(false, false)
            },
            {
                id: 6, parent_id: 5, uuid: 'education-path', uri: 'nodes/information/education', title: 'Education',
                type: 'path', is_featured: true, origin_date: '2015-01-01', ...flag(false, false)
            },
            {
                id: 7, parent_id: 6, uuid: 'iitm-path', uri: 'nodes/information/education/iitm', title: 'IIT Madras',
                type: 'artifact', is_featured: true, origin_date: '2015-01-01', ...flag(true, true)
            },
            {
                id: 8, parent_id: 6, uuid: 'iimb-path', uri: 'nodes/information/education/iimb', title: 'IIM Bangalore',
                type: 'artifact', is_featured: true, origin_date: '2021-01-01', ...flag(false, true)
            },
            {
                id: 9, parent_id: 6, uuid: 'other-school', uri: 'nodes/information/education/other', title: 'Other School',
                type: 'artifact', is_featured: true, origin_date: '2011-01-01', ...flag(false, false)
            },
            { id: 10, parent_id: 1, uuid: 'hidden-1', uri: 'nodes/hidden', title: 'Hidden', is_featured: false }
        ],
        node_links: [{ id: 1, node_id: 3, title: 'LinkedIn', url: 'https://linkedin.com/in/x', sort_order: 1 }],
        node_metadata: [{ id: 1, node_id: 3, title: 'Role', subtitle: 'PM', sort_order: 1 }],
        node_media: [
            { id: 1, node_id: 3, file_path: 'photography/taipei/1.jpg', alt_text: 'Taipei', media_type: 'image', sort_order: 1 },
            { id: 2, node_id: 3, original_url: 'https://cdn.example.com/a.jpg', sort_order: 2 }
        ],
        node_education: [
            { id: 1, node_id: 5, title: 'IIT Madras', subtitle: 'Engineering Design', degree: 'BTech', year: '2015-2019', sort_order: 1 }
        ],
        node_recognition: [{ id: 1, node_id: 3, title: 'Award', subtitle: 'Best', year: '2024', sort_order: 1 }],
        node_footnotes: [{ id: 1, node_id: 3, footnote: 'A note', sort_order: 1 }],
        node_connections: [{ id: 1, source_node_id: 3, target_node_uuid: 'root-0' }],
        node_subsections: [
            { id: 11, node_id: 3, title: 'Context', content: '<p>c</p>', is_collapsed_by_default: true, sort_order: 1 }
        ],
        subsection_footnotes: [{ id: 1, subsection_id: 11, footnote: 'Sub note', sort_order: 1 }]
    };
}

/** Minimal stand-in for a Supabase client over a rows object. */
export function makeClient(rows, { errorOn = null } = {}) {
    return {
        from(table) {
            const result = Promise.resolve({
                data: rows[table] ?? [],
                error: table === errorOn ? { message: 'permission denied' } : null
            });
            result.order = () => result;
            return { select: () => result };
        }
    };
}
