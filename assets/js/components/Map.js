// File: components/Map.js
import * as d3 from 'd3';
import rough from 'roughjs';
import Router from '../utils/Router.js';
import Data from '../utils/Data.js';
import Slider from './Slider.js';
import Page from './Page.js';
import Analytics, { VIEW_SOURCES } from '../utils/Analytics.js';

const mapContainer = document.querySelector('.map-container');

const Map = {
    // =======================================================================
    // CONFIGURATION - Edit these values to customize the graph
    // =======================================================================
    config: {
        // Graph center position (0.5 = center, 0.66 = right of center)
        centerXMultiplier: 0.66,
        
        // Initial spawn positions by hierarchy depth
        // Positioned to create a natural, layered appearance with varying radii
        initialPositions: {
            // Root node at center
            root: { x: 0, y: 0 },

            // First level children: avoid top/bottom, focus on sides and diagonals
            depth1: [
                { x: 55, y: -95 },       // Top-right diagonal
                { x: 110, y: -40 },      // Right-upper
                { x: 130, y: -10 },      // Right-center
                { x: 140, y: 60 },       // Right-lower
                { x: 40, y: 115 },       // Bottom-right diagonal
                { x: -90, y: 105 },      // Bottom-left diagonal
                { x: -125, y: 70 },      // Left-lower
                { x: -140, y: 10 },      // Left-center
                { x: -135, y: -55 },     // Left-upper
                { x: -85, y: -95 }       // Top-left diagonal
            ],

            // Second level (grandchildren): inner layer, fill gaps between depth1
            depth2: [
                { x: 70, y: -70 },       // Top-right diagonal inner
                { x: 105, y: -15 },      // Right-upper inner
                { x: 110, y: 50 },       // Right-lower inner
                { x: 60, y: 90 },        // Bottom-right inner
                { x: 0, y: 95 },         // Bottom-center inner
                { x: -65, y: 85 },       // Bottom-left inner
                { x: -105, y: 45 },      // Left-lower inner
                { x: -110, y: -10 },     // Left-upper inner
                { x: -100, y: -65 },     // Left-upper inner
                { x: -55, y: -85 },      // Top-left inner
                { x: 0, y: -90 },        // Top-center inner
                { x: 110, y: 15 }        // Right-center inner (extra)
            ],

            // Per-node overrides: specific initial positions by UUID
            // Use to prevent overlap with badges or other nodes on first render
            uuidOverrides: {
                'agents-path':  { x: 206, y:   15 },  // AI Agents: south-east nudge
                'xrproto-path': { x: 190, y:   15 },  // XR Prototypes: right of S&P
                'visual-path':  { x: 185, y:   95 },  // Visual Practice: below XR Prototypes
                'ts-path':      { x: 155, y:   80 },  // ThoughtSpot: adjusted west
                'photo-1':      { x: 190, y:  160 },  // Photography: below Visual Practice
            },

            // Third level (great-grandchildren): outer ring, avoid extreme top/bottom
            depth3: [
                { x: 125, y: -165 },     // Top-right
                { x: 200, y: -130 },     // Upper-right
                { x: 245, y: -60 },      // Far right-upper
                { x: 255, y: 30 },       // Far right-center
                { x: 235, y: 110 },      // Far right-lower
                { x: 180, y: 170 },      // Right-bottom
                { x: 105, y: 205 },      // Bottom-right
                { x: -10, y: 215 },      // Bottom-center
                { x: -120, y: 200 },     // Bottom-left
                { x: -190, y: 160 },     // Left-bottom
                { x: -240, y: 95 },      // Far left-lower
                { x: -255, y: 15 },      // Far left-center
                { x: -245, y: -70 },     // Far left-upper
                { x: -195, y: -140 },    // Left-top
                { x: -115, y: -175 },    // Top-left
                { x: 5, y: -185 }        // Top-center
            ]
        },
        
        // Boundary constraints (keep nodes within visible area)
        bounds: {
            minXMultiplier: 0.42,     // Desktop: 42% from left (avoids content panel)
            minXMobile: 80,           // Mobile: 80px from left
            edgeBuffer: 80            // Distance from screen edges (top/right/bottom)
        },
        
        // Link distances between connected nodes
        linkDistances: {
            rootToFirstLevel: { desktop: 145, mobile: 70 },
            firstToSecondLevel: { desktop: 105, mobile: 50 },
            deeperLevels: { desktop: 70, mobile: 40 }
        },
        
        // Force simulation parameters
        forces: {
            chargeStrength: -400,     // Repulsion between nodes (more negative = more spread)
            chargeDistanceMax: 400,   // Maximum distance for repulsion
            chargeDistanceMin: 20,    // Minimum distance for repulsion
            collideRadius: { desktop: 55, mobile: 35 },  // Collision detection radius
            collideStrength: 1.0,     // How hard nodes push apart (0-1)
            linkStrength: 0.5         // How strongly links pull nodes together (0-1)
        }
    },
    
    data: {}, // Global data object to store the hierarchical data
    uniqueDates: [], // To store unique origin dates
    currentNode: null, // To track the currently clicked node
    simulation: null, // To store the simulation object
    // edgeBuffer: window.innerHeight * 0.2, // Buffer for the map container
    edgeBuffer: 0, // Buffer for the map container
    animationFrameId: null, // To store the animation frame ID for Map sizing
    isDataInitialized: false, // To track if the data has been initialized
    nodeSize: 36, // Default node size
    previousNodes: new Set(), // To store the previous nodes for comparison
    previousLinks: new Set(), // To store the previous links for comparison

    initialize(initialUri = null, sliderValue = null) {
        if (this.isDataInitialized) {
            this.setupMap(initialUri, sliderValue);
        } else {
            this.setUpListeners();
            Data.buildData().then((result) => {
                console.log('🎯 Map received data:', result);
                
                if (!result) {
                    console.error('❌ Data.buildData() returned undefined!');
                    return;
                }
                
                const { data, uniqueDates, dataSource } = result;
                
                if (!data) {
                    console.error('❌ No data in result!');
                    return;
                }
                
                console.log('✅ Map initializing with:', {
                    rootTitle: data.title,
                    childrenCount: data.children?.length || 0,
                    datesCount: uniqueDates?.length || 0
                });
                
                this.data = data;
                this.uniqueDates = uniqueDates;
                this.isDataInitialized = true;
                
                // Show JSON fallback indicator if not using Supabase
                this.showDataSourceIndicator(dataSource);
                
                // Populate homepage index with root node data
                Page.populateHomePageIndex();
                
                this.setupMap(initialUri, sliderValue);
            }).catch(error => {
                console.error('❌ Error in Map.initialize:', error);
            });
        }



        document.addEventListener('keydown', (event) => {
            if (event.key === 'e') {
                this.renderMap(this.data, true);
                document.body.classList.add('everything');
            }
        });

    },



    setupMap(initialUri, sliderValue) {
        Slider.initialize(this, sliderValue); // Initialize the slider with a reference to the Map object

        // set currentNode to null so nothing is highlighted, even going back
        Map.currentNode = null;

        if (sliderValue) {
            const stepToDateIndex = Slider.generateStepToDateIndexMap(parseInt(document.querySelector('.date-slider').max, 10));
            const dateIndex = stepToDateIndex[sliderValue];
            const selectedDate = this.uniqueDates[dateIndex];
            this.updateMap(selectedDate);
        } else {
            this.updateMap(this.uniqueDates[this.uniqueDates.length - 1]); // Initially render the map with the last date
        }
        // we're going directly to a node
        if (initialUri) {
            this.setCurrentNodeByUri(initialUri);
            Page.openPage(initialUri);
        } else {
            Page.closePage();
        }
    },

    showDataSourceIndicator(dataSource) {
        // Show a small black dot in the bottom-left corner of the viewport
        // when data is loaded from JSON fallback instead of Supabase
        if (dataSource !== 'supabase') {
            const indicator = document.createElement('div');
            indicator.className = 'data-source-indicator';
            indicator.title = `Data source: ${dataSource}`;
            
            // Append to body (viewport level, on grey background)
            document.body.appendChild(indicator);
            
            console.log('⚫ JSON fallback indicator shown (data source:', dataSource, ')');
        }
    },

    setUpListeners() {
        d3.select('.map-container').on('click', (event) => {

            const clickedElement = event.target.closest('.node');

            if (clickedElement) {
                const clickedUri = clickedElement.getAttribute('data-uri');
                const clickedNode = this.findNodeById(this.data, clickedUri);
                if (clickedNode) {
                    
                    const isRootNode = clickedNode.uri === '/' || clickedNode.uuid === 'root-0';
                    
                    // If clicking the same node again (to deselect it), reset the map
                    if (Map.currentNode && Map.currentNode.uri === clickedNode.uri) {
                        console.log('🔄 Same node clicked - resetting map');
                        Map.resetMap();
                        Page.closePage();
                    } 
                    // If clicking root node while another node is selected, reset to root view
                    else if (isRootNode && Map.currentNode) {
                        console.log('🏠 Root node clicked - resetting to root view');
                        Map.resetMap();
                        Page.closePage();
                    }
                    // If clicking root node with nothing selected, open root page
                    else if (isRootNode && !Map.currentNode) {
                        console.log('📄 Opening root node page');
                        // Track node view
                        Analytics.trackNodeViewed(clickedNode, VIEW_SOURCES.GRAPH_CLICK, Map.currentNode);
                        const sliderValue = document.querySelector('.date-slider').value;
                        Map.currentNode = clickedNode;
                        Router.navigate({ sliderValue }, clickedUri);
                        Page.openPage(clickedUri);
                    }
                    // New non-root node clicked - open its page and filter
                    else {
                        console.log('📄 Opening page for:', clickedNode.title);
                        // Track node view
                        Analytics.trackNodeViewed(clickedNode, VIEW_SOURCES.GRAPH_CLICK, Map.currentNode);
                        const sliderValue = document.querySelector('.date-slider').value;
                        Map.currentNode = clickedNode;
                        this.filterAndRender(clickedNode);
                        Router.navigate({ sliderValue }, clickedUri);
                        Page.openPage(clickedUri);
                    }
                }
            } 
        });

        document.addEventListener('click', (event) => {
			const target = event.target;

            if (target.closest('.index-link')) {
                const clickedUri = target.closest('.index-link').getAttribute('data-uri');
                const clickedNode = this.findNodeById(this.data, clickedUri);

                if (clickedNode) {
                    // Track node view from index link
                    Analytics.trackNodeViewed(clickedNode, VIEW_SOURCES.INDEX_LINK, Map.currentNode);
                    const sliderValue = document.querySelector('.date-slider').value;
                    Map.currentNode = clickedNode;
                    this.filterAndRender(clickedNode);
                    Router.navigate({ sliderValue }, clickedUri);
                    Page.openPage(clickedUri);
                }

                event.preventDefault();
            }

            // -----------------------------------------------------------------
            // BREADCRUMB NAVIGATION HANDLER
            // -----------------------------------------------------------------
            // Handles clicks on ancestor links in the breadcrumb trail.
            // Navigates to the clicked ancestor node, updating:
            // - Map visualization (recenters on clicked node)
            // - Page content (opens the ancestor's page)
            // - URL (pushes to browser history for back/forward navigation)
            // - Analytics (tracks navigation source as 'breadcrumb')
            // -----------------------------------------------------------------
            const clickedBreadcrumbLink = target.closest('.breadcrumb-link');
            if (clickedBreadcrumbLink) {
                const destinationUri = clickedBreadcrumbLink.getAttribute('data-uri');
                const destinationNode = this.findNodeById(this.data, destinationUri);

                if (destinationNode) {
                    // Track analytics before navigation
                    Analytics.trackNodeViewed(destinationNode, VIEW_SOURCES.BREADCRUMB, Map.currentNode);
                    
                    // Get current slider value to preserve timeline state
                    const sliderElement = document.querySelector('.date-slider');
                    const currentSliderValue = sliderElement ? sliderElement.value : 0;
                    
                    // Update application state
                    Map.currentNode = destinationNode;
                    this.filterAndRender(destinationNode);
                    
                    // Update URL and render the page
                    Router.navigate({ sliderValue: currentSliderValue }, destinationUri);
                    Page.openPage(destinationUri);
                } else {
                    console.warn(`[Breadcrumb] Node not found for URI: ${destinationUri}`);
                }

                // Prevent default anchor behavior (page reload)
                event.preventDefault();
            }

			
		});

        window.addEventListener('resize', Map.debounce(() => {
            const mapContainer = document.querySelector('.map-container');
            const mapWidthMultiplier = mapContainer.dataset.widthMultiplier || 1;
            Map.resizeMap(mapWidthMultiplier);
        }, 200));

    },

    resetMap() {
        // If the clicked node is the current node, reset the filters
        // Reset the filters to the slider's input value
        const sliderValue = document.querySelector('.date-slider').value;
        const stepCount = parseInt(document.querySelector('.date-slider').max, 10);
        const stepToDateIndex = Slider.generateStepToDateIndexMap(stepCount);
        const dateIndex = stepToDateIndex[sliderValue];
        const selectedDate = this.uniqueDates[dateIndex];
        Map.currentNode = null;
        Map.updateMap(selectedDate);
        Router.navigate({ sliderValue }, '');
    },

    renderMap(filteredNodes = null, everything = false) {
        console.log('🎨 renderMap called');
        console.log('🎨 filteredNodes:', filteredNodes);
        console.log('🎨 filteredNodes.children:', filteredNodes?.children);

        const svgElement = document.querySelector('svg');
        const svg = d3.select("svg.map-lines");

        // =======================================================================
        // GRAPH LAYOUT PARAMETERS - Edit these to adjust the graph appearance
        // =======================================================================
        
        // Full viewport dimensions for rendering area
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Set SVG to cover full viewport
        svgElement.setAttribute('width', width);
        svgElement.setAttribute('height', height);
        svgElement.style.width = '100vw';
        svgElement.style.height = '100vh';

        // -----------------------------------------------------------------------
        // POSITIONING: Where the graph center is located
        // -----------------------------------------------------------------------
        const centerX = window.innerWidth > 768 ? window.innerWidth * Map.config.centerXMultiplier : width / 2;
        const centerY = height / 2;

        // -----------------------------------------------------------------------
        // LINK DISTANCES: How far apart connected nodes are
        // -----------------------------------------------------------------------
        const linkDistance = (d) => {
            const isDesktop = window.innerWidth > 768;
            if (d.source.depth === 0) {
                return isDesktop ? Map.config.linkDistances.rootToFirstLevel.desktop : Map.config.linkDistances.rootToFirstLevel.mobile;
            } else if (d.source.depth === 1) {
                return isDesktop ? Map.config.linkDistances.firstToSecondLevel.desktop : Map.config.linkDistances.firstToSecondLevel.mobile;
            }
            return isDesktop ? Map.config.linkDistances.deeperLevels.desktop : Map.config.linkDistances.deeperLevels.mobile;
        };

        // -----------------------------------------------------------------------
        // COLLISION: Prevents nodes from overlapping
        // -----------------------------------------------------------------------
        const nodeRadius = window.innerWidth > 768 ? Map.config.forces.collideRadius.desktop : Map.config.forces.collideRadius.mobile;
        
        // -----------------------------------------------------------------------
        // FORCE SIMULATION - The physics engine that positions nodes
        // -----------------------------------------------------------------------
        Map.simulation = d3.forceSimulation()
            .force("link", d3.forceLink()
                .id(d => d.id)
                .distance(linkDistance)
                .strength(Map.config.forces.linkStrength))
            .force("charge", d3.forceManyBody()
                .strength(Map.config.forces.chargeStrength)
                .distanceMax(Map.config.forces.chargeDistanceMax)
                .distanceMin(Map.config.forces.chargeDistanceMin))
            .force("center", d3.forceCenter(centerX, centerY))
            .force("collide", d3.forceCollide()
                .radius(nodeRadius)
                .strength(Map.config.forces.collideStrength)
                .iterations(4))

        

        const rootData = filteredNodes;

        const root = d3.hierarchy(filteredNodes || this.data);
        const nodes = root.descendants();
        const links = root.links();

        // Set initial positions by hierarchy depth
        const depthCounters = { 1: 0, 2: 0, 3: 0 };

        nodes.forEach((d, i) => {
            if (!d.x || !d.y) {
                let offset;

                // Check for per-node UUID override first
                const uuidOverride = Map.config.initialPositions.uuidOverrides?.[d.data.uuid];
                if (uuidOverride) {
                    offset = uuidOverride;
                    if (d.depth === 1) depthCounters[1]++;
                    else if (d.depth === 2) depthCounters[2]++;
                    else if (d.depth >= 3) depthCounters[3]++;
                }
                // Position based on depth in hierarchy
                else if (d.depth === 0) {
                    // Root node at center
                    offset = Map.config.initialPositions.root;
                } else if (d.depth === 1) {
                    // First level children: rough circle
                    const positions = Map.config.initialPositions.depth1;
                    offset = positions[depthCounters[1] % positions.length];
                    depthCounters[1]++;
                } else if (d.depth === 2) {
                    // Second level: fill gaps
                    const positions = Map.config.initialPositions.depth2;
                    offset = positions[depthCounters[2] % positions.length];
                    depthCounters[2]++;
                } else {
                    // Third level and beyond: outer ring
                    const positions = Map.config.initialPositions.depth3;
                    offset = positions[depthCounters[3] % positions.length];
                    depthCounters[3]++;
                }

                d.x = centerX + offset.x;
                d.y = centerY + offset.y;

                // Apply boundary constraints from config
                const minX = window.innerWidth > 768
                    ? window.innerWidth * Map.config.bounds.minXMultiplier
                    : Map.config.bounds.minXMobile;
                const maxX = width - Map.config.bounds.edgeBuffer;
                const minY = Map.config.bounds.edgeBuffer;
                const maxY = height - Map.config.bounds.edgeBuffer;

                d.x = Math.max(minX, Math.min(maxX, d.x));
                d.y = Math.max(minY, Math.min(maxY, d.y));
            }
        });

        // Convert current nodes and links to sets
        const currentNodes = new Set(nodes.map(d => d.data.uri));
        const currentLinks = new Set(links.map(d => `${d.source.data.uri} > ${d.target.data.uri}`));

        // Log added and removed nodes and links
        const addedNodes = Array.from(currentNodes).filter(x => !Map.previousNodes.has(x));
        const removedNodes = Array.from(Map.previousNodes).filter(x => !currentNodes.has(x));
        const addedLinks = Array.from(currentLinks).filter(x => !Map.previousLinks.has(x));
        const removedLinks = Array.from(Map.previousLinks).filter(x => !currentLinks.has(x));

        // Define a unique key function
        const linkKey = d => `${d.source.data.uri}-${d.target.data.uri}`;

        // Select the links and bind the data with a unique key
        const link = svg.selectAll(".link")
            .data(links, linkKey);

        // Remove old links
        link.exit().remove();

        // Build set of ancestor URIs for the current node (path back to root)
        const ancestorUris = new Set();
        if (Map.currentNode) {
            let current = nodes.find(n => n.data.uri === Map.currentNode.uri);
            while (current && current.parent) {
                ancestorUris.add(current.parent.data.uri);
                current = current.parent;
            }
        }

        // Utility function to generate class names for links
        const getLinkClasses = (d) => {
            let classes = "link";
            const linkId = `${d.source.data.uri} > ${d.target.data.uri}`;
            if (Map.previousLinks.has(linkId)) classes += " link-visible previously-visible";
            if (d.target.depth === 0) classes += " root-link";
            if (d.target.data.uri === 'nodes/information') classes += " information-link";
            if (d.target.data.isExternalLink) classes += " external-node";
            if (d.target.data.isFeatured === true || d.target.data.isFeatured === "true") classes += " featured-link";
            if (d.target.data.isHighlighted === true || d.target.data.isHighlighted === "true") classes += " highlighted-link";
            if (d.target.data.isSecondary === true || d.target.data.isSecondary === "true") classes += " secondary-link";
            if (d.target.data.isConnected === true || d.target.data.isConnected === "true") classes += " connected-link";
            if (Page.visitedUris.includes(d.target.data.uri)) classes += " visited-link"; // Add visited class to links
            if(d.target.data.type) classes += ` node-type-${d.target.data.type}`;
            
            // Ancestor links: links from root toward the current node (always black)
            // BUT: Don't add ancestor-link on initial page load (when no node is selected)
            //      because it has opacity:1 !important which overrides the animation
            const isAncestorLink = ancestorUris.has(d.source.data.uri) ||
                                   (Map.currentNode && d.target.data.uri === Map.currentNode.uri && ancestorUris.has(d.source.data.uri));
            if (Map.currentNode && (isAncestorLink || d.source.depth === 0)) {
                classes += " ancestor-link";
            }
            
            return classes;
        };

        const getNewLinkVisibilityClasses = (d) => {
            let classes = "link-visible";
            const linkId = `${d.source.data.uri} > ${d.target.data.uri}`;
            if (!Map.previousLinks.has(linkId)) {
                classes += " newly-visible";
            }
            return classes;
        };

        // Utility function to create path based on curve direction and theme
        const getPath = (d) => {
            if (!d.curveDirection) {
                d.curveDirection = (d.source.y > d.target.y) ? -30 : 30;
            }

            if(d.target.data.type === 'path'){
                return Map.createAngledPath(d.source, d.target, d.curveDirection);
            } else {
                return Map.createStraightPath(d.source, d.target, d.curveDirection);
            }

        };

        // Animation timing
        // Root appears first, then children appear at random scattered intervals
        const getRootDelay = () => 100;
        const rootAppearanceDelay = 100;

        // Generate random delays for each node
        // Using object instead of Map() to avoid naming conflict with Map module
        const childDelays = {};
        nodes.forEach(d => {
            // If this node was already visible, don't animate it
            if (Map.previousNodes.has(d.data.uri)) {
                childDelays[d.data.uri] = 0; // No delay for existing nodes
            } else {
                // New node - assign animation delay
                if (d.depth === 0) {
                    // Root node
                    childDelays[d.data.uri] = getRootDelay();
                } else {
                    // Child node - random delay between 150-700ms
                    const randomDelay = rootAppearanceDelay + Math.random() * 550 + 50;
                    childDelays[d.data.uri] = randomDelay;
                }
            }
        });


        // Add new links
        const linkEnter = link.enter().append("path")
            .attr("class", d => getLinkClasses(d))
            .attr("d", getPath)
            .each(function(d, i) {
                const initialClasses = getLinkClasses(d);
                const visibilityClasses = getNewLinkVisibilityClasses(d);
                d3.select(this).attr("class", `${initialClasses}`);
                if (visibilityClasses.includes('newly-visible')) {
                    // Links appear with their target node at the same random delay
                    const targetUri = d.target.data.uri;
                    const delay = childDelays[targetUri] || getRootDelay();
                    setTimeout(() => {
                        d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                    }, delay);
                } else {
                    d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                }
            });

        // Update existing links - only update path, don't touch visibility classes
        link
            .attr("d", getPath);


        // Utility function to generate class names for nodes
        const getNodeClasses = (d) => {
            let classes = "node";
            if (Map.previousNodes.has(d.data.uri)) classes += " node-visible previously-visible";
            if (d.depth === 0) classes += " root-node";
            if (d.data.uri === '/') classes += " home-node";
            else if (d.data.uri === 'nodes/information') classes += " information-node";
            if (Page.visitedUris.includes(d.data.uri)) classes += " visited";
            if (d.data.isExternalLink) classes += " external-node";
            if (d.data.isFeatured === true || d.data.isFeatured === "true") classes += " featured-node";
            if (d.data.isHighlighted === true || d.data.isHighlighted === "true") classes += " highlighted-node";
            if (d.data.isSecondary === true || d.data.isSecondary === "true") classes += " secondary-node";
            if (d.data.isConnected === true || d.data.isConnected === "true") classes += " connected-node";
            if (Map.currentNode && d.data.uri === Map.currentNode.uri) classes += " current-node";
            if(d.data.type) classes += ` node-type-${d.data.type}`;
            return classes;
        };

        const getNewNodeVisibilityClasses = (d) => {
            let classes = "node-visible";
            if (!Map.previousNodes.has(d.data.uri)) {
                classes += " newly-visible";
            }
            return classes;
        };

        // Define a unique key function
        const nodeKey = d => d.data.uri;

        // Select the nodes and bind the data with a unique key
        const node = d3.select('.map-container')
            .selectAll('.node')
            .data(nodes, nodeKey);

        // Remove old nodes
        node.exit().remove();

        // Add new nodes - using same timing as links for synchronized appearance
        const nodeEnter = node.enter().append('div')
            .attr('data-theme-id', d => d.data.themeId)
            .attr('data-uri', d => d.data.uri)
            .attr('data-url', d => d.data.isExternalLink === true || d.data.isExternalLink === "true" ? d.data.url : null)
            .each(function(d, i) {
                const initialClasses = getNodeClasses(d);
                const visibilityClasses = getNewNodeVisibilityClasses(d);
                d3.select(this).attr("class", `${initialClasses}`);
                if (visibilityClasses.includes('newly-visible')) {
                    // Get the pre-generated random delay for this node
                    const delay = childDelays[d.data.uri] || getRootDelay();
                    setTimeout(() => {
                        d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                    }, delay);
                } else {
                    d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                }
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        let pathCounter = 1; // Initialize the counter

        nodeEnter.append('div')
            .attr('class', 'node-inner')
            .html(d => {
                // Check if the node type is 'path' and increment the counter
                if (d.data.type === 'path' && d.data.uri !== 'nodes/information') {
                    return `<span class="number">${pathCounter++}</span>`;
                }
            });

        // Add labels to the nodes
        nodeEnter.append('span')
            .attr('class', 'node-label')
            .html(d => `<h2>${d.data.title}</h2><br><h3>${d.data.summary}</h3>`);

        // Update existing nodes - only update attributes, don't touch visibility classes
        node
            .attr('data-theme-id', d => d.data.themeId)
            .attr('data-uri', d => d.data.uri)
            .attr('data-url', d => d.data.isExternalLink === true || d.data.isExternalLink === "true" ? d.data.url : null)
            .select('.node-label')
            .html(d => `<span><h2>${d.data.title}</h2><br><h3>${d.data.summary}</h3></span>`);
        
        Map.simulation
            .nodes(nodes)
            .on("tick", ticked);

        Map.simulation.force("link")
            .links(links);

        function ticked() {
            linkEnter.merge(link)
                .attr("d", d => {
                    if (!d.curveDirection) {
                        d.curveDirection = (d.source.y > d.target.y) ? -30 : 30;
                    }
                    // return Map.createStraightPath(d.source, d.target, d.curveDirection);
                    if(d.target.data.type === 'path'){
                        return Map.createAngledPath(d.source, d.target, d.curveDirection);
                    } else {
                        return Map.createStraightPath(d.source, d.target, d.curveDirection);
                    }
                });

            nodeEnter.merge(node)
                .style('left', d => `${d.x}px`)
                .style('top', d => `${d.y}px`);
        }

        function dragstarted(event, d) {
            if (!event.active) Map.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) Map.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Update previous nodes and links with current ones
        Map.previousNodes = currentNodes;
        Map.previousLinks = currentLinks;
    
        
    },

    createStraightPath(source, target) {
        return `M${source.x + (Map.nodeSize/2)},${source.y + (Map.nodeSize/2)} L${target.x + (Map.nodeSize/2)},${target.y + (Map.nodeSize/2)}`;
    },

    createCurvedPath(source, target, curveDirection) {
        const controlPointX = (source.x + target.x) / 2;
        const controlPointY = (source.y + target.y) / 2;
        return `M${source.x + (Map.nodeSize/2)},${source.y + (Map.nodeSize/2)} Q${controlPointX},${controlPointY + curveDirection} ${target.x + (Map.nodeSize/2)},${target.y + (Map.nodeSize/2)}`;
    },

    createAngledPath(source, target, curveDirection) {
        const controlPointX1 = source.x + (target.x - source.x) / 3;
        const controlPointY1 = source.y + (target.y - source.y) / 3 + curveDirection;
        const controlPointX2 = source.x + 2 * (target.x - source.x) / 3;
        const controlPointY2 = source.y + (target.y - source.y) / 3 + curveDirection;
        return `M${source.x + (Map.nodeSize/2)},${source.y + (Map.nodeSize/2)} L${controlPointX1},${controlPointY1} L${controlPointX2},${controlPointY2} L${target.x + (Map.nodeSize/2)},${target.y + (Map.nodeSize/2)}`;
    },

    createWavyPath(source, target, curveDirection) {
        const controlPointX1 = source.x + (target.x - source.x) / 3;
        const controlPointY1 = source.y + (target.y - source.y) / 3 + curveDirection;
        const controlPointX2 = source.x + 2 * (target.x - source.x) / 3;
        const controlPointY2 = source.y + 2 * (target.y - source.y) / 3 - curveDirection;
        return `M${source.x + (Map.nodeSize/2)},${source.y + (Map.nodeSize/2)} C${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${target.x + (Map.nodeSize/2)},${target.y + (Map.nodeSize/2)}`;
    },

    updateMap(selectedDate) {
        console.log('🗺️ updateMap called with date:', selectedDate);
        console.log('🗺️ Raw data:', this.data);
        const filteredData = this.filterDataByDate(this.data, selectedDate);
        console.log('🗺️ Filtered data:', filteredData);
        console.log('🗺️ Filtered children count:', filteredData.children?.length || 0);
        this.renderMap(filteredData);
    },
    
    filterDataByDate(data, selectedDate) {
        console.log('📅 Filtering by date - showing only first-level children');
        const filteredNodes = JSON.parse(JSON.stringify(data));
        this.filterNodesByDate(filteredNodes, selectedDate);
        console.log('📅 Result:', filteredNodes.title, 'with', filteredNodes.children?.length || 0, 'direct children');
        return filteredNodes;
    },
    
    filterNodesByDate(node, selectedDate) {
        const selectedDateObj = new Date(selectedDate);
    
        node.children = node.children.filter(child => {
            // Handle null/undefined dates gracefully
            const originDate = child.originDate ? new Date(child.originDate) : new Date('2018-01-01');
            const expirationDate = child.expirationDate ? new Date(child.expirationDate) : null;
    
            const isDateValid = originDate <= selectedDateObj && (!expirationDate || expirationDate > selectedDateObj);
            const isFeaturedValid = child.isFeatured === true || child.isFeatured === "true";
    
            console.log(`🔍 Filtering ${child.title}: originDate=${child.originDate}, isFeatured=${child.isFeatured}, passes=${isDateValid && isFeaturedValid}`);
    
            return isDateValid && isFeaturedValid;
        });
    
        // CHANGED: Only show first-level children from current node
        // When at root: show special featured second-level nodes (AI Agents, Photography)
        // When at any other node: show first-level children, but keep THEIR children intact
        const isRootNode = node.uri === '/' || node.uuid === 'root-0';
        
        node.children.forEach(child => {
            if (isRootNode && child.children && child.children.length > 0) {
                // Special case: Keep specific nodes visible on homepage
                // These appear as visible nodes connected to their parent branches
                const featuredHomepageUUIDs = [
                    'ts-path',         // ThoughtSpot (under Industry Work)
                    'photo-1',         // Photography (under Visual Practice -> Spatial)
                    'xrproto-path',    // XR Prototypes (under Spatial & Perception)
                    'visual-path',     // Visual Practice (to show Photography under it)
                    'agents-path',     // AI Agents (under AI Systems)
                    'trajectory-path', // Trajectory/Education (under Information)
                    'iitm-path'        // IIT Madras (under Trajectory -> Information)
                ];
                
                // Helper function to check if a node should be visible
                const shouldShowNode = (node) => {
                    const originDate = node.originDate ? new Date(node.originDate) : new Date('2018-01-01');
                    const expirationDate = node.expirationDate ? new Date(node.expirationDate) : null;
                    const isDateValid = originDate <= selectedDateObj && (!expirationDate || expirationDate > selectedDateObj);
                    const isFeaturedValid = node.isFeatured === true || node.isFeatured === "true";
                    return isDateValid && isFeaturedValid && featuredHomepageUUIDs.includes(node.uuid);
                };
                
                child.children = child.children.filter(grandchild => {
                    if (shouldShowNode(grandchild)) {
                        console.log(`✨ Keeping featured node: ${grandchild.title}`);
                        
                        // Check if this grandchild has any featured great-grandchildren
                        if (grandchild.children && grandchild.children.length > 0) {
                            grandchild.children = grandchild.children.filter(greatGrandchild => {
                                if (shouldShowNode(greatGrandchild)) {
                                    console.log(`✨ Keeping featured third-level node: ${greatGrandchild.title}`);
                                    
                                    // Check for fourth level (e.g., IIT Madras under Trajectory under Information)
                                    if (greatGrandchild.children && greatGrandchild.children.length > 0) {
                                        greatGrandchild.children = greatGrandchild.children.filter(level4Child => {
                                            if (shouldShowNode(level4Child)) {
                                                console.log(`✨ Keeping featured fourth-level node: ${level4Child.title}`);
                                                level4Child.children = [];
                                                return true;
                                            }
                                            return false;
                                        });
                                    }
                                    return true;
                                }
                                return false;
                            });
                        }
                        return true;
                    }
                    return false;
                });
            }
            // For non-root nodes, DON'T clear grandchildren - they should be visible
            // when you click into that child node
        });
    },

    filterAndRender(clickedNode) {
        const filteredData = this.filterNodes(clickedNode);
        this.renderMap(filteredData);
    },

    findNodeById(node, id) {
        if (node.uri === id) return node;
        if (node.children) {
            for (let child of node.children) {
                const result = this.findNodeById(child, id);
                if (result) return result;
            }
        }
        return null;
    },

    findNodeByUUID(node, uuid) {
        if (node.uuid === uuid) return node;
        if (node.children) {
            for (let child of node.children) {
                const result = this.findNodeByUUID(child, uuid);
                if (result) return result;
            }
        }
        return null;
    },

    // filterNodes(clickedNode) {
    // this gets all children and their grandchildren too

    //     let filteredData = {};
    
    //     // Function to find ancestors and ensure correct hierarchy
    //     function findAncestors(data, node, ancestors) {
    //         if (data.uri === node.uri) {
    //             return true;
    //         }
    
    //         if (data.children) {
    //             for (let child of data.children) {
    //                 if (findAncestors(child, node, ancestors)) {
    //                     const ancestorCopy = { ...data, children: [] };
    //                     ancestors.unshift(ancestorCopy);
    //                     return true;
    //                 }
    //             }
    //         }
    //         return false;
    //     }
    
    //     // Function to get all descendants recursively
    //     function getAllDescendants(node) {
    //         let descendants = [];
    //         if (node.children) {
    //             node.children.forEach(child => {
    //                 descendants.push({ ...child, children: getAllDescendants(child) });
    //             });
    //         }
    //         return descendants;
    //     }
    
    //     // Find ancestors of the clicked node
    //     let ancestors = [];
    //     findAncestors(this.data, clickedNode, ancestors);
    
    //     // Set up the clicked node and its descendants
    //     const clickedNodeCopy = { ...clickedNode, children: getAllDescendants(clickedNode) };
    
    //     // Add connected nodes
    //     if (clickedNode.connectedNodes && clickedNode.connectedNodes.length > 0) {
    //         clickedNode.connectedNodes.forEach(uuid => {
    //             const connectedNode = this.findNodeByUUID(this.data, uuid);
    //             if (connectedNode) {
    //                 const connectedNodeCopy = { ...connectedNode, children: [], isConnected: true }; // Add isConnected flag
    //                 clickedNodeCopy.children.push(connectedNodeCopy);
    //             }
    //         });
    //     }
    
    //     // If there are ancestors, build the nested structure
    //     if (ancestors.length > 0) {
    //         // The last ancestor in the list is the direct parent of the clicked node
    //         ancestors[ancestors.length - 1].children = [clickedNodeCopy];
    
    //         // Build the hierarchy from the ancestors array
    //         for (let i = ancestors.length - 2; i >= 0; i--) {
    //             ancestors[i].children = [ancestors[i + 1]];
    //         }
    
    //         // The top-most ancestor becomes the root of the filtered data
    //         filteredData = ancestors[0];
    //     } else {
    //         // If no ancestors, the clicked node is the root of the filtered data
    //         filteredData = clickedNodeCopy;
    //     }
    
    //     return filteredData;
    // },
    
    // this just gets one level of children

    filterNodes(clickedNode) {
        console.log('🎯 Node clicked:', clickedNode.title, '- building path to root + first-level children');
        console.log('🔍 Clicked node children count:', clickedNode.children?.length || 0);
        if (clickedNode.children && clickedNode.children.length > 0) {
            clickedNode.children.forEach(child => {
                console.log('  - Child:', child.title, 'has', child.children?.length || 0, 'grandchildren');
            });
        }
        let filteredData = {};
    
        // Function to find ancestors and ensure correct hierarchy
        function findAncestors(data, node, ancestors) {
            if (data.uri === node.uri) {
                return true;
            }
    
            if (data.children) {
                for (let child of data.children) {
                    if (findAncestors(child, node, ancestors)) {
                        const ancestorCopy = { ...data, children: [] };
                        ancestors.unshift(ancestorCopy);
                        return true;
                    }
                }
            }
            return false;
        }
    
        // Find ancestors of the clicked node
        let ancestors = [];
        findAncestors(this.data, clickedNode, ancestors);
        console.log('🎯 Path to root has', ancestors.length, 'ancestors');
    
        // Set up the clicked node and its direct children (but not grandchildren)
        const clickedNodeCopy = { ...clickedNode, children: [] };
        if (clickedNode.children) {
            // Special case: For Information node, preserve specific grandchildren (IIT Madras, IIM Bangalore)
            const isInformationNode = clickedNode.type === 'information' || clickedNode.uuid === 'info-path';

            clickedNodeCopy.children = clickedNode.children.map(child => {
                // If we're on Information node and this is the Education path, keep only IIT and IIM children
                if (isInformationNode && child.uuid === 'education-path') {
                    const educationChildren = child.children ? child.children.filter(grandchild =>
                        grandchild.uuid === 'iitm-path' || grandchild.uuid === 'iimb-path'
                    ).map(grandchild => ({ ...grandchild, children: [] })) : [];
                    return { ...child, children: educationChildren };
                }
                // Otherwise, just copy the child without grandchildren
                return { ...child, children: [] };
            });
        }
    
        // Add connected nodes
        if (clickedNode.connectedNodes && clickedNode.connectedNodes.length > 0) {
            clickedNode.connectedNodes.forEach(uuid => {
                const connectedNode = this.findNodeByUUID(this.data, uuid);
                if (connectedNode) {
                    const connectedNodeCopy = { ...connectedNode, children: [], isConnected: true }; // Add isConnected flag
                    clickedNodeCopy.children.push(connectedNodeCopy);
                }
            });
        }

        // Add external nodes
        // if (clickedNode.externalLinks && clickedNode.externalLinks.length > 0) {
        //     clickedNode.externalLinks.forEach(link => {
        //         const externalNode = {
        //             data: {
        //                 uri: link.url,
        //                 title: link.title,
        //                 summary: 'External Link', // Ensure summary is set
        //                 isExternalLink: true // Ensure isExternalLink is set
        //             },
        //             depth: clickedNode.depth + 1, // Set appropriate depth
        //             parent: clickedNode
        //         };
        //         console.log(externalNode);
        //         clickedNodeCopy.children.push(externalNode);
        //     });
        // }
    
        // If there are ancestors, build the nested structure
        if (ancestors.length > 0) {
            // The last ancestor in the list is the direct parent of the clicked node
            ancestors[ancestors.length - 1].children = [clickedNodeCopy];
    
            // Build the hierarchy from the ancestors array
            for (let i = ancestors.length - 2; i >= 0; i--) {
                ancestors[i].children = [ancestors[i + 1]];
            }
    
            // The top-most ancestor becomes the root of the filtered data
            filteredData = ancestors[0];
        } else {
            // If no ancestors, the clicked node is the root of the filtered data
            filteredData = clickedNodeCopy;
        }
    
        console.log('🎯 Result: Showing', clickedNode.title, 'with', clickedNodeCopy.children?.length || 0, 'direct children');
        return filteredData;
    },

    setCurrentNodeByUri(uri) {
        const node = this.findNodeById(this.data, uri);
        if (node) {
            // Track direct URL navigation
            Analytics.trackNodeViewed(node, VIEW_SOURCES.DIRECT_URL, null);
            Map.currentNode = node;
            this.filterAndRender(node);
        } else {
            console.error('Node with URI not found:', uri);
        }
    },

    easeOutExpo(t) {
		return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
	},

    resizeMap(widthMultiplier = 1, duration = 800) {

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        const mapContainer = document.querySelector('.map-container');
        const pageContainers = document.querySelectorAll('.page');
        mapContainer.dataset.widthMultiplier = widthMultiplier;
        const initialWidth = mapContainer.clientWidth;
		const targetWidth = window.innerWidth > 768 ? window.innerWidth * 0.6 * widthMultiplier : window.innerWidth * widthMultiplier;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = this.easeOutExpo(progress);

            const currentWidth = initialWidth + (targetWidth - initialWidth) * easedProgress;
            // Don't resize the container - keep it full viewport
            // mapContainer.style.width = `${currentWidth}px`;

            const svgElement = document.querySelector('svg.map-lines');
            // Keep SVG at full viewport size - branches can render anywhere
            svgElement.setAttribute('width', window.innerWidth);
            svgElement.setAttribute('height', window.innerHeight);

            // Keep center slightly right of center (63% of viewport)
            const centerX = window.innerWidth > 768 ? window.innerWidth * 0.63 : window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            Map.simulation.force("center", d3.forceCenter(centerX, centerY));
            Map.simulation.alpha(0.3).restart();

            // pageContainers.forEach(pageContainer => {
            //     pageContainer.style.left = `${currentWidth}px`;
            // });

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
                this.stopSimulationRefresh(Map.simulation); // Ensure the simulation stops refreshing after the resize
            }
        };

        this.animationFrameId = requestAnimationFrame(animate);
    },

    startSimulationRefresh(simulation) {
        if (simulation) {
            this.resizeMap();
        }
    },

    stopSimulationRefresh(simulation) {
        if (simulation) {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        }
    },

    debounce(callback, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }


    

};

export default Map;