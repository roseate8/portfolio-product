// File: components/Map.js
import * as d3 from 'd3';
import rough from 'roughjs';
import Router from '../utils/Router.js';
import Data from '../utils/Data.js';
import Slider from './Slider.js';
import Page from './Page.js';

const mapContainer = document.querySelector('.map-container');

const Map = {
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
                
                const { data, uniqueDates } = result;
                
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
                        const sliderValue = document.querySelector('.date-slider').value;
                        Map.currentNode = clickedNode;
                        Router.navigate({ sliderValue }, clickedUri);
                        Page.openPage(clickedUri);
                    }
                    // New non-root node clicked - open its page and filter
                    else {
                        console.log('📄 Opening page for:', clickedNode.title);
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
                    const sliderValue = document.querySelector('.date-slider').value;
                    Map.currentNode = clickedNode;
                    this.filterAndRender(clickedNode);
                    Router.navigate({ sliderValue }, clickedUri);
                    Page.openPage(clickedUri);
                }

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
        // centerX: Horizontal center of the graph (in pixels from left edge)
        //   - 0.5 = center of screen
        //   - 0.55 = slightly right of center
        //   - 0.65 = far right
        // centerY: Vertical center (usually height / 2)
        const centerX = window.innerWidth > 768 ? window.innerWidth * 0.63 : width / 2;
        const centerY = height / 2;

        // -----------------------------------------------------------------------
        // LINK DISTANCES: How far apart connected nodes are
        // -----------------------------------------------------------------------
        // Larger values = nodes further apart, more spread out graph
        // Smaller values = nodes closer together, more compact graph
        const linkDistance = (d) => {
            if (d.source.depth === 0) {
                // Root to first-level branches - more spread
                return window.innerWidth > 768 ? 140 : 70;
            } else if (d.source.depth === 1) {
                // First to second level
                return window.innerWidth > 768 ? 100 : 50;
            }
            // Deeper levels
            return window.innerWidth > 768 ? 70 : 40;
        };

        // -----------------------------------------------------------------------
        // COLLISION: Prevents nodes from overlapping
        // -----------------------------------------------------------------------
        // nodeRadius: Minimum distance between node centers (in pixels)
        //   - Larger = more space between nodes
        //   - Should be at least half the node visual size
        const nodeRadius = window.innerWidth > 768 ? 55 : 35;
        
        // -----------------------------------------------------------------------
        // FORCE SIMULATION - The physics engine that positions nodes
        // -----------------------------------------------------------------------
        Map.simulation = d3.forceSimulation()
        
            // LINK FORCE: Pulls connected nodes toward each other
            // - distance: Target distance between linked nodes (see linkDistance above)
            // - strength: How strongly links pull (0-1)
            //   - 0.1 = weak pull, nodes can drift apart
            //   - 0.5 = moderate pull, balanced
            //   - 1.0 = strong pull, nodes stay close to target distance
            .force("link", d3.forceLink()
                .id(d => d.id)
                .distance(linkDistance)
                .strength(0.5))
            
            // CHARGE FORCE: Repulsion between ALL nodes (like magnets)
            // - strength: Negative = repel, Positive = attract
            //   - -100 = weak repulsion, tight clusters
            //   - -300 = moderate repulsion, balanced
            //   - -600 = strong repulsion, spread out
            // - distanceMax: Repulsion stops beyond this distance (pixels)
            // - distanceMin: Prevents extreme forces when nodes very close
            .force("charge", d3.forceManyBody()
                .strength(-400)
                .distanceMax(400)
                .distanceMin(20))
            
            // CENTER FORCE: Pulls the whole graph toward a point
            // - First param: x position, Second param: y position
            .force("center", d3.forceCenter(centerX, centerY))
            
            // COLLISION FORCE: Prevents nodes from overlapping
            // - radius: Minimum distance between node centers
            // - strength: How hard nodes push apart (0-1)
            // - iterations: More = more accurate but slower
            .force("collide", d3.forceCollide()
                .radius(nodeRadius)
                .strength(1.0)
                .iterations(4))

        

        const rootData = filteredNodes;

        const root = d3.hierarchy(filteredNodes || this.data);
        const nodes = root.descendants();
        const links = root.links();

        // Set initial positions for new nodes based on their connected nodes or the center of the canvas
        // nodes.forEach(d => {
        //     if (!d.x || !d.y) {
        //         const parent = d.parent;
        //         if (parent) {
        //             d.x = parent.x + (Math.random() - 0.5) * 20;
        //             d.y = parent.y + (Math.random() - 0.5) * 20;
        //         } else {
        //             d.x = width / 2;
        //             d.y = height / 2;
        //         }
        //     }
        // });

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
            const isAncestorLink = ancestorUris.has(d.source.data.uri) || 
                                   (Map.currentNode && d.target.data.uri === Map.currentNode.uri && ancestorUris.has(d.source.data.uri));
            if (isAncestorLink || d.source.depth === 0) classes += " ancestor-link";
            
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
                Map.createAngledPath(d.source, d.target, d.curveDirection);
            } else {
                Map.createStraightPath(d.source, d.target, d.curveDirection);
            }
            
        };

        // Animation timing - all elements appear together after a short delay
        // Using same delay for both links and nodes ensures synchronized appearance
        const animationDelay = 100; // Small uniform delay for all elements

        // Add new links
        const linkEnter = link.enter().append("path")
            .attr("class", d => getLinkClasses(d))
            .attr("d", getPath)
            .each(function(d, i) {
                const initialClasses = getLinkClasses(d);
                const visibilityClasses = getNewLinkVisibilityClasses(d);
                d3.select(this).attr("class", `${initialClasses}`);
                if (visibilityClasses.includes('newly-visible')) {
                    setTimeout(() => {
                        d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                    }, animationDelay);
                } else {
                    d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                }
            });

        // Merge new and existing links and update their attributes
        linkEnter.merge(link)
            .attr("class", d => getLinkClasses(d))
            .attr("d", getPath)
            .each(function(d, i) {
                const initialClasses = getLinkClasses(d);
                const visibilityClasses = getNewLinkVisibilityClasses(d);
                d3.select(this).attr("class", `${initialClasses}`);
                if (visibilityClasses.includes('newly-visible')) {
                    setTimeout(() => {
                        d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                    }, animationDelay);
                } else {
                    d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                }
            });


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
                    setTimeout(() => {
                        d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                    }, animationDelay);
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
                if (d.data.type === 'path') {
                    return `<span class="number">${pathCounter++}</span>`;
                }
            });

        // Add labels to the nodes
        nodeEnter.append('span')
            .attr('class', 'node-label')
            .html(d => `<h2>${d.data.title}</h2><br><h3>${d.data.summary}</h3>`);

        // Merge new and existing nodes and update classes and labels
        nodeEnter.merge(node)
            .attr('data-theme-id', d => d.data.themeId)
            .attr('data-uri', d => d.data.uri)
            .attr('data-url', d => d.data.isExternalLink === true || d.data.isExternalLink === "true" ? d.data.url : null)
            .each(function(d, i) {
                const initialClasses = getNodeClasses(d);
                const visibilityClasses = getNewNodeVisibilityClasses(d);
                d3.select(this).attr("class", `${initialClasses}`);
                if (visibilityClasses.includes('newly-visible')) {
                    setTimeout(() => {
                        d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                    }, animationDelay);
                } else {
                    d3.select(this).attr("class", `${initialClasses} ${visibilityClasses}`);
                }
            })
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
            clickedNodeCopy.children = clickedNode.children.map(child => ({ ...child, children: [] }));
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