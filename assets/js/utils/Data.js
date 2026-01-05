export const Data = {
    basePath: document.body.dataset.basepath,
    useStaticData: true, // Set to false when you have a backend API

    // Recursive function to build the query for nested levels
    buildQuery(level) {
        if (level === 0) return {};

        return {
            title: true,
            uri: true,
            uuid: true,
            summary: true,
            role: true,
            email: true,
            telephone: true,
            overview: true,
            description: "page.description.kirbytext",
            extendedDescription: "page.extendedDescription.kirbytext",
            originDate: true,
            endDate: true,
            expirationDate: true,
            lastUpdated: true,
            isFeatured: true,
            isHighlighted: true,
            isSecondary: true,
            media: {
                query: "page.media.toFiles",
                select: {
                    url: true,
                    alt: true,
                    type: true,
                    smallImage: "file.resize(1200, null, 95).url",
                    largeImage: "file.resize(1600, null, 95).url",
                    externalLink: true,
                    externalLinkText: true
                }
            },
            type: true,
            externalLinks: {
                query: "page.externalLinks.toStructure",
                select: {
                    title: true,
                    link: true
                }
            },
            metadata: {
                query: "page.metadata.toStructure",
                select: {
                    title: true,
                    subtitle: true
                }
            },
            education: {
                query: "page.education.toStructure",
                select: {
                    title: true,
                    subtitle: true,
                    year: true,
                }
            },
            recognition: {
                query: "page.recognition.toStructure",
                select: {
                    title: true,
                    subtitle: true,
                    year: true,
                }
            },
            footnotes: {
                query: "page.footnotes.toStructure",
                select: {
                    footnote: true
                }
            },
            connectedNodes: {
                query: "page.connectedNodes.toStructure",
                select: {
                    foreignkey: true
                }
            },
            children: {
                query: "page.children",
                select: this.buildQuery(level - 1)
            }
        };
    },

    async fetchPageData(uri, levels = 20) {
        const query = {
            query: `page('${uri}')`,
            select: this.buildQuery(levels)
        };

        const api = `${this.basePath}/api/query`;
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(query)
            });

            const data = await response.json();
            if (data.error) {
                console.error('Error:', data.error);
                return null;
            } else {
                return data.result;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    },

    async fetchAllPages(uri) {
        const pageData = await this.fetchPageData(uri, 20); // Fetch up to 20 levels deep
        if (!pageData) return [];

        // Process the data to add theme IDs and connected nodes
        const processPageData = (page) => ({
            title: page.title,
            uri: page.uri,
            uuid: page.uuid,
            summary: page.summary,
            role: page.role,
            email: page.email,
            telephone: page.telephone,
            overview: page.overview,
            description: page.description,
            extendedDescription: page.extendedDescription,
            originDate: page.originDate,
            endDate: page.endDate,
            expirationDate: page.expirationDate,
            lastUpdated: page.lastUpdated,
            isFeatured: page.isFeatured,
            isHighlighted: page.isHighlighted,
            isSecondary: page.isSecondary,
            media: (page.media || []).map(media => ({
                url: media.url,
                alt: media.alt,
                type: media.type,
                smallImage: media.smallImage,
                largeImage: media.largeImage,
                externalLink: media.externalLink,
                externalLinkText: media.externalLinkText
            })),
            type: page.type,
            externalLinks: (page.externalLinks || []).map(link => ({
                title: link.title,
                link: link.link
            })),
            metadata: (page.metadata || []).map(meta => ({
                title: meta.title,
                subtitle: meta.subtitle
            })),
            education: (page.education || []).map(edu => ({
                title: edu.title,
                subtitle: edu.subtitle,
                year: edu.year
            })),
            recognition: (page.recognition || []).map(rec => ({
                title: rec.title,
                subtitle: rec.subtitle,
                year: rec.year
            })),
            footnotes: (page.footnotes || []).map(footnote => ({
                footnote: footnote.footnote
            })),
            connectedNodes: (page.connectedNodes || []).map(node => node.foreignkey),
            children: (page.children || []).map(child => processPageData(child))
        });

        return (pageData.children || []).map(child => processPageData(child));
    },

    async fetchStaticData() {
        try {
            const response = await fetch('/assets/data/portfolio.json');
            if (!response.ok) throw new Error('Failed to load static data');
            return await response.json();
        } catch (error) {
            console.error('Static data fetch error:', error);
            return null;
        }
    },

    async buildData() {
        let data;

        if (this.useStaticData) {
            // Load from static JSON file
            data = await this.fetchStaticData();
            if (!data) return;
        } else {
            // Load from Kirby CMS API
            const nodesPage = await this.fetchAllPages('nodes');
            if (!nodesPage) return;

            // Build root node structure for API data
            data = {
                title: "Your Name",
                uri: '/',
                uuid: '0',
                summary: "Designer & Researcher",
                role: '',
                email: '',
                telephone: '',
                overview: '',
                description: '',
                extendedDescription: '',
                originDate: '',
                endDate: '',
                expirationDate: '',
                lastUpdated: '',
                isFeatured: false,
                isHighlighted: false,
                isSecondary: false,
                media: '',
                type: '',
                externalLinks: [],
                metadata: [],
                education: [],
                recognition: [],
                footnotes: [],
                connectedNodes: [],
                children: nodesPage
            };
        }

        // Extract all unique dates from the data tree
        const allNodes = this.flattenNodes(data);
        const uniqueDates = [...new Set(
            allNodes.map(node => node.originDate).filter(date => date)
        )].sort((a, b) => new Date(a) - new Date(b));

        return { data, uniqueDates };
    },

    flattenNodes(node, result = []) {
        result.push(node);
        if (node.children) {
            node.children.forEach(child => this.flattenNodes(child, result));
        }
        return result;
    },

    extractDates(node) {
        const dates = [node.originDate];
        if (node.children) {
            node.children.forEach(child => dates.push(...this.extractDates(child)));
        }
        return dates;
    }
};

export default Data;