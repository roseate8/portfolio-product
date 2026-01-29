// File: components/Page.js
import * as d3 from 'd3';
import Map from './Map.js';
import Router from '../utils/Router.js';
import Data from '../utils/Data.js';
import Slider from './Slider.js';
import Analytics, { EXPANSION_TYPES, CLICK_TYPES } from '../utils/Analytics.js';

const Page = {

	pageOpen: false,
	firstLoad: true,
	visitedUris: [],

    initialize(path) {
		// only runs once
		this.setupListeners();
		this.populateHomePageIndex();
		this.setupBreadcrumbKeyboardNav();
	},

	populateHomePageIndex() {
		// Populate the homepage index tab with root node data from Supabase
		console.log('📝 Populating homepage index with root node data');
		
		if (!Map.data) {
			console.log('⚠️ Map data not yet loaded, will retry...');
			// Retry after a short delay if data isn't loaded yet
			setTimeout(() => this.populateHomePageIndex(), 100);
			return;
		}

		const rootNode = Map.data;
		
		// Populate Index tab
		this.populateIndexTab(rootNode);
		
		// Populate Initiatives tab (bets & side projects)
		this.populateInitiativesTab(rootNode);
		
		// Populate Work tab (positions held)
		this.populateWorkTab(rootNode);
		
		// Populate Paths tab (first-level branches)
		this.populatePathsTab(rootNode);
		
		console.log('✅ All homepage tabs populated');
	},

	populateIndexTab(rootNode) {
		const indexTabContent = document.querySelector('.page-index .tab-open .tab-content');
		
		if (!indexTabContent) {
			console.log('⚠️ Index tab content not found');
			return;
		}

		// Use description if available, otherwise use summary
		let content = '';
		if (rootNode.description) {
			// Use the full description HTML
			content = rootNode.description;
		} else if (rootNode.summary) {
			content = `<p>${rootNode.summary}</p>`;
		} else {
			content = '<p>Welcome to my portfolio.</p>';
		}

		// Add link to Information node if it exists
		const infoNode = rootNode.children?.find(child => child.type === 'information' || child.uuid === 'info-path');
		const infoLink = infoNode 
			? ` <a href="${infoNode.uri}" data-uri="${infoNode.uri}" class="index-link">more about me →</a>`
			: '';

		indexTabContent.innerHTML = `${content}<p>${infoLink}</p>`;
		
		console.log('✅ Index tab populated');
	},

	populateInitiativesTab(rootNode) {
		const initiativesList = document.getElementById('initiatives-list');
		
		if (!initiativesList) {
			console.log('⚠️ Initiatives list not found');
			return;
		}

		// Find the Bets path which contains initiatives
		const betsPath = rootNode.children?.find(child => child.uuid === 'bets-path');
		
		if (!betsPath || !betsPath.children || betsPath.children.length === 0) {
			console.log('⚠️ No bets/initiatives found');
			initiativesList.innerHTML = '<li>No initiatives found</li>';
			return;
		}

		// Build list of initiatives from bets
		let html = '';
		betsPath.children.forEach(initiative => {
			const dateRange = this.formatDateRange(initiative.originDate, initiative.endDate);
			html += `
				<li>
					<a href="${initiative.uri}" class="index-link" data-uri="${initiative.uri}">
						<span class="item-id"><span></span></span>
						<span class="item-title">
							<h2>${initiative.title}</h2>
							<h3>${initiative.summary || ''}</h3>
							${dateRange ? `<h4>${dateRange}</h4>` : ''}
						</span>
					</a>
				</li>
			`;
		});

		initiativesList.innerHTML = html;
		console.log('✅ Initiatives tab populated with', betsPath.children.length, 'items');
	},

	populateWorkTab(rootNode) {
		const workList = document.getElementById('work-list');
		
		if (!workList) {
			console.log('⚠️ Work list not found');
			return;
		}

		// Collect work positions from Industry Work (formerly Product Work)
		// Industry Work now contains: ThoughtSpot, Policybazaar, and Consulting branch
		const workPositions = [];
		
		// Industry Work path (uuid: product-path, renamed to Industry Work)
		const industryPath = rootNode.children?.find(child => child.uuid === 'product-path');
		if (industryPath && industryPath.children) {
			industryPath.children.forEach(company => {
				// Check if this is the Consulting sub-branch
				if (company.uuid === 'consulting-path') {
					// Add Consulting's children (Tata, Chisel)
					if (company.children) {
						company.children.forEach(consultingCompany => {
							workPositions.push({
								title: consultingCompany.title,
								summary: consultingCompany.summary || '',
								description: this.extractFirstSentence(consultingCompany.description),
								originDate: consultingCompany.originDate,
								endDate: consultingCompany.endDate,
								uri: consultingCompany.uri,
								type: 'Consulting'
							});
						});
					}
				} else {
					// Regular company under Industry Work (ThoughtSpot, Policybazaar)
					workPositions.push({
						title: company.title,
						summary: company.summary || '',
						description: this.extractFirstSentence(company.description),
						originDate: company.originDate,
						endDate: company.endDate,
						uri: company.uri,
						type: 'Product'
					});
				}
			});
		}

		// Sort by date (most recent first)
		workPositions.sort((a, b) => {
			const dateA = a.originDate ? new Date(a.originDate) : new Date(0);
			const dateB = b.originDate ? new Date(b.originDate) : new Date(0);
			return dateB - dateA;
		});

		if (workPositions.length === 0) {
			workList.innerHTML = '<li>No work positions found</li>';
			return;
		}

		// Build list
		let html = '';
		workPositions.forEach(position => {
			const dateRange = this.formatDateRange(position.originDate, position.endDate);
			html += `
				<li>
					<a href="${position.uri}" class="index-link" data-uri="${position.uri}">
						<span class="item-id"><span></span></span>
						<span class="item-title">
							<h2>${position.title}</h2>
							<h3>${position.summary}</h3>
							${dateRange ? `<h4>${dateRange}</h4>` : ''}
						</span>
					</a>
				</li>
			`;
		});

		workList.innerHTML = html;
		console.log('✅ Work tab populated with', workPositions.length, 'positions');
	},

	populatePathsTab(rootNode) {
		const pathsList = document.getElementById('paths-list');
		
		if (!pathsList) {
			console.log('⚠️ Paths list not found');
			return;
		}

		// Get first-level children (main branches)
		// Exclude: info-path (Information), and any that have been moved to sub-branches
		// Note: After restructuring, consulting-path, visual-path, and footnotes-path 
		// are now nested under other paths and won't appear as root children
		const mainPaths = rootNode.children?.filter(child => 
			child.type === 'path' && 
			child.uuid !== 'info-path' &&
			child.uuid !== 'footnotes-path' // In case migration hasn't run yet
		) || [];

		if (mainPaths.length === 0) {
			pathsList.innerHTML = '<li>No paths found</li>';
			return;
		}

		// Build list
		let html = '';
		mainPaths.forEach(path => {
			html += `
				<li>
					<a href="${path.uri}" class="index-link" data-uri="${path.uri}">
						<span class="item-id"><span></span></span>
						<span class="item-title">
							<h2>${path.title}</h2>
							<h3>${path.summary || ''}</h3>
						</span>
					</a>
				</li>
			`;
		});

		pathsList.innerHTML = html;
		console.log('✅ Paths tab populated with', mainPaths.length, 'paths');
	},

	formatDateRange(originDate, endDate) {
		if (!originDate) return '';
		
		const originYear = new Date(originDate).getFullYear();
		const endYear = endDate ? new Date(endDate).getFullYear() : 'Present';
		
		if (originYear === endYear) {
			return originYear.toString();
		}
		return `${originYear} – ${endYear}`;
	},

	extractFirstSentence(htmlContent) {
		if (!htmlContent) return '';
		
		// Create temp element to extract text
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlContent;
		const text = tempDiv.textContent || tempDiv.innerText || '';
		
		// Get first sentence (up to first period, question mark, or exclamation)
		const match = text.match(/^[^.!?]+[.!?]/);
		return match ? match[0] : text.substring(0, 150) + '...';
	},

	animateHomePage(path) {
		// if theres no path, its the home page, and the open page will run instead
		// if (!path) {
		// 	const page = document.querySelector('.page');
		// 	const pageContainer = document.querySelector('.page-container');
		// 	let actualHeight = 0;

		// 	// briefly show it to get the actual height
		// 	page.style.height = 'auto';
		// 	actualHeight = pageContainer.offsetHeight;
		// 	page.style.height = '0px';
			
		// 	setTimeout(() => {
		// 		page.style.height = `${actualHeight}px`;
		// 	}, 2000);
		// }
	},

	setupListeners() {
		document.addEventListener('click', (event) => {
			const target = event.target;
			if (target.classList.contains('a')) {
				event.preventDefault();
			}
			
			// Track external/outbound link clicks
			const externalLink = target.closest('.external-link') || target.closest('.contact-social-link');
			if (externalLink) {
				const href = externalLink.getAttribute('href') || '';
				const linkText = externalLink.textContent?.toLowerCase().trim() || '';
				const currentUri = window.location.pathname.replace(/^\//, '');
				const pageData = Page.findPageDataByUri(currentUri);
				
				// Determine click type and destination
				let clickType = CLICK_TYPES.SOCIAL;
				let destination = linkText.split('\n')[0].trim(); // Get first line (title)
				
				if (href.startsWith('mailto:')) {
					clickType = CLICK_TYPES.CONTACT;
					destination = 'email';
				} else if (href.startsWith('tel:')) {
					clickType = CLICK_TYPES.CONTACT;
					destination = 'phone';
				} else if (href.includes('linkedin')) {
					destination = 'linkedin';
				} else if (href.includes('github')) {
					destination = 'github';
				} else if (href.includes('behance')) {
					destination = 'behance';
				} else if (href.includes('medium')) {
					destination = 'medium';
				} else if (href.includes('resume') || href.includes('.pdf')) {
					clickType = CLICK_TYPES.RESUME;
					destination = 'resume_pdf';
				}
				
				Analytics.trackOutboundClicked(clickType, destination, href, pageData);
			}

			if (target.closest('.tab-titles')) {
				const container = target.closest('.tabs');
				const pageTab = target.closest('.page-tab');
				const wasOpen = pageTab.classList.contains('tab-open');
				
                if(wasOpen) {
                    pageTab.classList.remove('tab-open');
                } else {
                    container.querySelectorAll('.page-tab').forEach(tab => tab.classList.remove('tab-open'));
				    pageTab.classList.add('tab-open');
					
					// Track tab expansion
					const tabTitle = pageTab.querySelector('.tab-title')?.textContent || 'Unknown';
					const currentUri = window.location.pathname.replace(/^\//, '');
					const pageData = Page.findPageDataByUri(currentUri);
					Analytics.trackContentExpanded(pageData, EXPANSION_TYPES.TAB, tabTitle);
                }

				Page.animatePageHeight();

				event.preventDefault();
			}

			if (target.closest('.close-page') || target.closest('.header-content') || target.closest('.page-content .page-titles-type')) {
				Map.resetMap();
				Page.closePage();
				event.preventDefault();
			}

			if (target.closest('.back-page')) {
				window.history.back();
				event.preventDefault();
			}

			if(target.closest('.read-more')) {
				// Track read more expansion
				const currentUri = window.location.pathname.replace(/^\//, '');
				const pageData = Page.findPageDataByUri(currentUri);
				Analytics.trackContentExpanded(pageData, EXPANSION_TYPES.READ_MORE);
				
				target.closest('.page-content-inner').classList.add('extended-description-open');
				target.closest('.read-more').remove();
				Page.animatePageHeight();
				event.preventDefault();
			}

			if(target.closest('.contact-links-toggle')) {
				const contentInner = target.closest('.page-content-inner');
				const wasOpen = contentInner.classList.contains('contact-links-open');
				contentInner.classList.toggle('contact-links-open');
				
				// Track contact links expansion (only when opening)
				if (!wasOpen) {
					const currentUri = window.location.pathname.replace(/^\//, '');
					const pageData = Page.findPageDataByUri(currentUri);
					Analytics.trackContentExpanded(pageData, EXPANSION_TYPES.CONTACT_LINKS);
				}
				
				Page.animatePageHeight();
				event.preventDefault();
			}

		});

		document.addEventListener('mouseenter', (event) => {
			const target = event.target;
	
			// Ensure the event target is an Element and has classList
			if (target instanceof Element && (target.classList.contains('media-item') || target.classList.contains('page-container'))) {
				const hoverItems = document.querySelectorAll('.media-item, .page-container');
				let highestZIndex = 0;
	
				// Find the highest z-index among all hover items
				hoverItems.forEach((item) => {
					const zIndex = window.getComputedStyle(item).zIndex;
					if (!isNaN(zIndex) && zIndex !== 'auto') {
						highestZIndex = Math.max(highestZIndex, Number(zIndex));
					}
				});
	
				// Set the z-index of the hovered item to be one more than the highest
				target.style.zIndex = highestZIndex + 1;
			}
		}, true);
		
		window.addEventListener('resize', () => {
			if (Page.pageOpen) {
				Page.animatePageHeight();
			}
		});
		
		// Scroll milestone tracking
		const mainContent = document.querySelector('.main-content');
		if (mainContent) {
			let scrollTimeout;
			mainContent.addEventListener('scroll', () => {
				// Debounce scroll tracking
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => {
					if (!Page.pageOpen) return;
					
					const scrollTop = mainContent.scrollTop;
					const scrollHeight = mainContent.scrollHeight;
					const clientHeight = mainContent.clientHeight;
					const scrollableHeight = scrollHeight - clientHeight;
					
					if (scrollableHeight <= 0) return;
					
					const scrollPercent = Math.round((scrollTop / scrollableHeight) * 100);
					
					// Check milestones
					const milestones = [25, 50, 75, 100];
					const currentUri = window.location.pathname.replace(/^\//, '');
					const pageData = Page.findPageDataByUri(currentUri);
					
					for (const milestone of milestones) {
						if (scrollPercent >= milestone) {
							Analytics.trackScrollMilestone(pageData, milestone, scrollHeight, clientHeight);
						}
					}
				}, 100);
			});
		}
	},

	updateVisitedLinks(uri) {
		
		Page.visitedUris.push(uri);
		
		document.querySelectorAll('.index-link').forEach((link) => {
			const linkUri = link.getAttribute('data-uri');
			if(Page.visitedUris.includes(linkUri)){
				link.classList.add('visited');
			}
		});
		
		document.querySelectorAll('.node').forEach((node) => {
			const nodeUri = node.getAttribute('data-uri');
			if(Page.visitedUris.includes(nodeUri)){
				node.classList.add('visited');
			}
		});

	},



    openPage(uri) {
		if(uri === 'nodes/information'){
			Page.buildPage(uri, true);
			document.body.classList.add('page-open', 'information-open');
			Page.animatePageHeight();
		} else {
			Page.buildPage(uri);
			document.body.classList.add('page-open');
			Page.animatePageHeight();
		}

		Page.pageOpen = true;
		
		Page.updateVisitedLinks(uri);
		
        // Map.resizeMap(pageWidth);
    },

    closePage() {
		Page.pageOpen = false;

        document.body.classList.remove('page-open', 'information-open');

		const page = document.querySelector('.page');
		const existingMedia = page.querySelectorAll('.media-item');
		const delay = existingMedia.length > 0 ? 400 : 0;
	
		existingMedia.forEach((item, index) => {
			item.classList.remove('show-media-item');
		});
	
		setTimeout(() => {
			existingMedia.forEach((item) => {
				item.remove();
			});
		}, delay);

		Page.animatePageHeight();

        // Map.resizeMap(1);
    },

	buildMedia(pageData) {

		const page = document.querySelector('.page');
		const mainContentInner = document.querySelector('.main-content-inner .page-content');

		const media = pageData.media;
	
		const existingMedia = page.querySelectorAll('.media-item');
		let delay;
		
		if(Page.firstLoad){
			delay = window.innerWidth > 768 ? 1500 : 0;
		} else {
			delay = existingMedia.length > 0 && window.innerWidth > 768 ? 400 : 0;
		}
		
	
		existingMedia.forEach((item, index) => {
			item.classList.remove('show-media-item');
		});
	
		setTimeout(() => {
			// Clear the container first
			existingMedia.forEach((item) => {
				item.remove();
			});
	
			// Shuffle index classes
			const indexClasses = ['media-index-1', 'media-index-2', 'media-index-3', 'media-index-4', 'media-index-5', 'media-index-6', 'media-index-7', 'media-index-8', 'media-index-9', 'media-index-10'];
	
			// Loop through each media item and create HTML
			media.forEach((item, index) => {
				const mediaItem = document.createElement('div');
				mediaItem.classList.add('media-item');
				mediaItem.classList.add(indexClasses[index % 10]);
	
				// Check the type and create appropriate HTML
				if (item.type.startsWith('image')) {
					mediaItem.classList.add('media-image');
					const img = document.createElement('img');
					img.src = item.smallImage;
					img.alt = item.alt || '';
					img.classList.add('media-image');
	
					// Add event listener for image load
					img.addEventListener('load', () => {
						const width = img.naturalWidth;
						const height = img.naturalHeight;
						const ratio = width / height;
						if (ratio > 1) {
							mediaItem.classList.add('media-landscape');
						} else {
							mediaItem.classList.add('media-portrait');
						}
						setTimeout(() => {
							mediaItem.classList.add('show-media-item');
						}, 100);
					});
	
					mediaItem.appendChild(img);
				} else if (item.type.startsWith('video')) {
					mediaItem.classList.add('media-video');

					const video = document.createElement('video');
					
					video.setAttribute('autoplay', 'true');
					video.setAttribute('muted', 'true');
					video.setAttribute('playsinline', 'true');
					video.setAttribute('loop', 'true');
					video.setAttribute('preload', 'true');

					video.muted = true;

					video.classList.add('media-video');
					video.src = item.url;

					// Add event listener for video loadeddata
					video.addEventListener('canplay', () => {
						const width = video.videoWidth;
						const height = video.videoHeight;
						const ratio = width / height;
						if (ratio > 1) {
							mediaItem.classList.add('media-landscape');
						} else {
							mediaItem.classList.add('media-portrait');
						}
						setTimeout(() => {
							mediaItem.classList.add('show-media-item');
						}, 100);
						video.play();
					});
	
					video.addEventListener('error', (e) => {
						console.error('Video failed to load:', e);
					});
	
					mediaItem.appendChild(video);

					setTimeout(() => {
						video.play();
					}, 100);
				}

				// Add external link button if there is an externalLink
				if (item.externalLink) {
					const button = document.createElement('a');
					button.textContent = item.externalLinkText && item.externalLinkText.trim() !== '' ? item.externalLinkText : 'view link';
					button.target = '_blank';
					button.href = item.externalLink;
					mediaItem.appendChild(button);
				}
	
				// Append the media item to the container
				if(window.innerWidth > 768){



					page.appendChild(mediaItem);
					
					// on click of media item, extract the image url, add a niv to the page called 'gallery' and add the image to the gallery at the exact size and exact same position as the media item, then after 500ms scale it to fit within either the width or height of the page. also ensure that the appended image is centred in the viewport perfectly according to its new width and height

					mediaItem.addEventListener('click', (e) => {
						const image = mediaItem.querySelector('img');
						const video = mediaItem.querySelector('video');
						const media = image || video;
						const mediaRect = media.getBoundingClientRect(); // Get the media's original size and position
						
						// Track media view
						const mediaType = image ? 'image' : 'video';
						const mediaAlt = image?.alt || '';
						Analytics.trackMediaViewed(pageData, mediaType, index, mediaAlt);
					
						// Clone the media element
						const clonedMedia = media.cloneNode(true);
					
						// Create the gallery container
						const gallery = document.createElement('div');
						gallery.classList.add('gallery');
						gallery.appendChild(clonedMedia);
						document.body.appendChild(gallery);
					
						// Add the 'media-open' class to the clicked media item
						mediaItem.classList.add('media-open');
					
						// Set the cloned media's initial size and position to match the original
						clonedMedia.style.width = `${mediaRect.width}px`;
						clonedMedia.style.height = `${mediaRect.height}px`;
						clonedMedia.style.top = `${mediaRect.top}px`;
						clonedMedia.style.left = `${mediaRect.left}px`;
					
						// Animate the media to the full-screen gallery position
						setTimeout(() => {
							gallery.classList.add('gallery-in');
						}, 10);
					
						setTimeout(() => {
							const pageWidth = window.innerWidth - 100; // 50px buffer on left and right
							const pageHeight = window.innerHeight - 100; // 50px buffer on top and bottom
							const pageRatio = pageWidth / pageHeight;
							const mediaRatio = mediaRect.width / mediaRect.height;
					
							// Calculate the new size and position for the cloned media
							let newWidth, newHeight;
							if (mediaRatio > pageRatio) {
								newWidth = pageWidth;
								newHeight = pageWidth / mediaRatio;
							} else {
								newHeight = pageHeight;
								newWidth = pageHeight * mediaRatio;
							}
					
							// Center the cloned media within the viewport
							const top = (window.innerHeight - newHeight) / 2;
							const left = (window.innerWidth - newWidth) / 2;
					
							// Animate the cloned media to the new size and position
							clonedMedia.style.width = `${newWidth}px`;
							clonedMedia.style.height = `${newHeight}px`;
							clonedMedia.style.top = `${top}px`;
							clonedMedia.style.left = `${left}px`;
						}, 100); // 100ms delay before the animation starts
					
						// Function to close the gallery (used by both click and Escape key events)
						function closeGallery() {
							// Animate the cloned media back to its original position and size
							clonedMedia.style.width = `${mediaRect.width}px`;
							clonedMedia.style.height = `${mediaRect.height}px`;
							clonedMedia.style.top = `${mediaRect.top}px`;
							clonedMedia.style.left = `${mediaRect.left}px`;
					
							// Remove 'gallery-in' class to trigger reverse transition
							gallery.classList.remove('gallery-in');
					
							// Remove the gallery and 'media-open' class after the transition ends
							setTimeout(() => {
								mediaItem.classList.remove('media-open');
								gallery.remove();
								document.removeEventListener('keydown', handleEscapeKey); // Remove Escape key listener
							}, 500); // Match the transition duration in CSS
						}
					
						// Close the gallery when clicking on the gallery background
						gallery.addEventListener('click', (e) => {
							closeGallery();
						});
					
						// Handle Escape key to close the gallery
						function handleEscapeKey(e) {
							if (e.key === 'Escape') {
								closeGallery();
							}
						}
					
						// Add the keydown event listener for the Escape key
						document.addEventListener('keydown', handleEscapeKey);
					});
					



				} else {

					// Handle mobile view tab content
					let tabContainer = mainContentInner.querySelector('.tabs');
					
					if (!tabContainer) {
						tabContainer = document.createElement('div');
						tabContainer.classList.add('tabs');
						mainContentInner.appendChild(tabContainer);
					}
	
					let mediaTab = tabContainer.querySelector('.page-tab.tab-media');

					if (!mediaTab) {
						mediaTab = document.createElement('div');
						mediaTab.classList.add('page-tab', 'tab-media');
						mediaTab.innerHTML = `
							<div class="tab-titles">
								<span class="tab-icon icon-media"></span>
								<span class="tab-title">Media</span>
								<span class="tab-indicator"></span>
							</div>
							<div class="tab-content">
								<ul class="list"></ul>
							</div>
						`;
						tabContainer.prepend(mediaTab);
					}
	
					const list = mediaTab.querySelector('.tab-content .list');
					const listItem = document.createElement('li');
					listItem.appendChild(mediaItem);
					list.appendChild(listItem);

				}
			});
		}, delay);
	},
	
	// Function to shuffle an array
	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	},

	buildPage(uri, isInformation) {

		const pageData = this.findPageDataByUri(uri);
	
		if (pageData) {
			
			// Check if this node is Information or part of Information branch
			const isInformationBranch = this.isInformationNode(pageData);
			console.log(`📄 Building page for ${pageData.title}, isInformationBranch: ${isInformationBranch}`);

			// -----------------------------------------------------------------
			// BREADCRUMB GENERATION
			// -----------------------------------------------------------------
			// Build the ancestor path from root to current node, then generate
			// accessible HTML. Breadcrumbs are hidden for root-level pages.
			// Data source: Map.data (populated from Supabase via Data.js)
			// -----------------------------------------------------------------
			const breadcrumbPath = this.getBreadcrumbPath(uri);
			const breadcrumbHTML = this.buildBreadcrumbHTML(breadcrumbPath);
			
			// Debug logging (useful for development)
			if (breadcrumbPath.length > 0) {
				console.log(`🍞 Breadcrumb: ${breadcrumbPath.map(item => item.title).join(' → ')}`);
			}

			// Remove existing .page-content
			const mainContentInner = document.querySelector('.main-content-inner');
			const existingContent = mainContentInner.querySelector('.page-content');
			
			if (existingContent) {
				mainContentInner.removeChild(existingContent);
			}
	
			// Create new .page-content
			const pageContent = document.createElement('div');
			pageContent.className = 'page-content group';
	
			// Insert breadcrumb navigation at the top of page content
			// (Only rendered for non-root pages; root returns empty HTML)
			if (breadcrumbHTML) {
				pageContent.innerHTML += breadcrumbHTML;
			}

			// Add titles
			let titlesHTML = `
				<div class="page-titles">
					<div class="page-titles-type">
						<span class="tab-icon icon-${pageData.type}"></span>
						<span class="tab-title">${pageData.type || ''}</span>
						<button class="back-page"></button>
						<button class="close-page"></button>
					</div>
					<div class="page-main-title">
						${pageData.type === 'information' ? `<h2>Rudram Piplad</h2>` : `<h2>${pageData.title}</h2>`}
						${pageData.type === 'information' ? `<h3>${pageData.overview}</h3>` : `<h3>${pageData.summary}</h3>`}
						${pageData.role ? `<h4 class="role">${pageData.role}</h4>` : ``}
						${pageData.type === 'information' ? `<h4 class="email"><a href="mailto:${pageData.email}">${pageData.email}</a></h4>` : ''}
						${pageData.type === 'information' && pageData.telephone ? `<h4 class="telephone"><a href="tel:${pageData.telephone}">${pageData.telephone}</a></h4>` : ''}
						${pageData.type === 'information' && pageData.externalLinks && pageData.externalLinks.length > 0 ? pageData.externalLinks
							.filter(link => ['LinkedIn', 'GitHub', 'Behance', 'Medium'].includes(link.title))
							.map(link => `<h4 class="social-link" data-platform="${link.title}"><a href="${link.link}" target="_blank">${link.title}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrow-icon"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg></a></h4>`).join('') : ''}
						${pageData.type !== 'path' && pageData.type !== 'information' ? `<h4>${formatDateRange(pageData.originDate, pageData.endDate)}</h4>` : ''}
					</div>
				</div>
			`;

			function formatDateRange(originDate, endDate) {
				const originYear = originDate ? new Date(originDate).getFullYear() : '';
				const endYear = endDate ? new Date(endDate).getFullYear() : null;
				const writtenEndYear = endDate ? new Date(endDate).getFullYear() : 'Present';

				if (originYear === endYear) {
					return originYear;
				} else {
					return `${originYear} - ${writtenEndYear}`;
				}
			}
			
			pageContent.innerHTML += titlesHTML;
	
			// Add content inner
			// Function to add Read More button before the last punctuation or at the end
			function addReadMoreButton(description) {
				// Create a temporary container to parse the HTML
				const tempContainer = document.createElement('div');
				tempContainer.innerHTML = description;
				// Get the last child element
				const lastElement = tempContainer.lastElementChild;
				if (lastElement) {
					// Get the inner text of the last element
					let lastElementHTML = lastElement.innerHTML;
					// Regex to match the last punctuation character
					const regex = /([.,!?;:])\s*$/;
					// Check if there's a punctuation at the end
					if (regex.test(lastElementHTML)) {
						// If found, insert the button before the punctuation
						lastElementHTML = lastElementHTML.replace(regex, ' <button class="read-more"><span>read more</span></button>$1');
					} else {
						// If not found, append the button at the end
						lastElementHTML = `${lastElementHTML} <button class="read-more"><span>read more</span></button>`;
					}
					// Set the modified inner HTML back to the last element
					lastElement.innerHTML = lastElementHTML;
				}
				// Return the updated HTML
				return tempContainer.innerHTML;
			}

			// Function to add Contact Links button inline with description for Contact Me page
			function addContactLinksButton(description) {
				const tempContainer = document.createElement('div');
				tempContainer.innerHTML = description;
				const lastElement = tempContainer.lastElementChild;
				if (lastElement) {
					let lastElementHTML = lastElement.innerHTML;
					const regex = /([.,!?;:])\s*$/;
					if (regex.test(lastElementHTML)) {
						lastElementHTML = lastElementHTML.replace(regex, ' <button class="contact-links-toggle"><span>contact links</span></button>$1');
					} else {
						lastElementHTML = `${lastElementHTML} <button class="contact-links-toggle"><span>contact links</span></button>`;
					}
					lastElement.innerHTML = lastElementHTML;
				}
				return tempContainer.innerHTML;
			}

			// Generate expanded contact links HTML for Contact Me node
			const contactLinksExpandedHTML = pageData.uuid === 'contact-1' && pageData.externalLinks && pageData.externalLinks.length > 0 ? `
				<div class="contact-links-expanded">
					<ul class="list contact-links-list">
						${pageData.externalLinks
							.filter(link => !link.link.startsWith('mailto:') && !link.link.startsWith('tel:'))
							.map(link => {
								try {
									const url = new URL(link.link);
									const displayUrl = url.hostname.replace(/^www\./, '') + url.pathname.replace(/\/$/, '');
									return `
										<li>
											<a href="${link.link}" class="external-link contact-social-link" target="_blank">
												<span class="item-id"></span>
												<span class="item-title">
													<span class="link-title-arrow">${link.title}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrow-icon"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg></span>
													<span class="link-address">${displayUrl}</span>
												</span>
											</a>
										</li>
									`;
								} catch(e) {
									return '';
								}
							}).join('')}
					</ul>
				</div>
			` : '';

			// Generate inline list for Bets path (shows children directly, matches Education tab styling)
			const betsChildrenHTML = pageData.uuid === 'bets-path' && pageData.children && pageData.children.length > 0 ? `
				<div class="tabs">
					<div class="page-tab tab-links tab-open">
						<div class="tab-titles">
							<span class="tab-icon icon-initiative"></span>
							<span class="tab-title">Initiatives</span>
							<span class="tab-indicator"></span>
						</div>
						<div class="tab-content">
							<ul class="list">
								${pageData.children.map(child => {
									const dateRange = this.formatDateRange(child.originDate, child.endDate);
									return `
										<li>
											<a href="${child.uri}" class="index-link" data-uri="${child.uri}">
												<span class="item-id"></span>
												<span class="item-title">
													<h2>${child.title}</h2>
													<h3>${child.summary || ''}</h3>
													${dateRange ? `<h4>${dateRange}</h4>` : ''}
												</span>
											</a>
										</li>
									`;
								}).join('')}
							</ul>
						</div>
					</div>
				</div>
			` : '';

			let contentInnerHTML = `
				<div class="page-content-inner">
					${pageData.description ? `${pageData.uuid === 'contact-1' && pageData.externalLinks && pageData.externalLinks.length > 0 ? addContactLinksButton(pageData.description, pageData.externalLinks) : (pageData.extendedDescription && pageData.uuid !== 'bets-path' ? addReadMoreButton(pageData.description) : pageData.description)}` : ''}
					${pageData.extendedDescription && pageData.uuid !== 'bets-path' ? `<div class="extended-description">${pageData.extendedDescription}</div>` : ''}
					${contactLinksExpandedHTML}
					${pageData.footnotes && pageData.footnotes.length > 0 ? `
						<ul class="footnotes">
							${pageData.footnotes.map((footnote, index) => `
								<li class="footnote">
									<span class="footnote-id">${index + 1}.</span>
									<span class="footnote-content">${footnote.footnote}</span>
								</li>
							`).join('')}
						</ul>
					` : ''}
				</div>
			`;
			if(pageData.description || pageData.extendedDescription || (pageData.footnotes && pageData.footnotes.length > 0) || pageData.uuid === 'contact-1' || pageData.uuid === 'bets-path'){
				pageContent.innerHTML += contentInnerHTML;
			}
			
			// Add Bets initiatives list after content but before other tabs
			if(pageData.uuid === 'bets-path'){
				pageContent.innerHTML += betsChildrenHTML;
			}
	
			// Add tabs
			// Determine which tabs should be open by default
			// For Information branch: ALL tabs open
			// For other nodes: Only first relevant tab opens
			// Exception: Contact Me and Connections tabs on info-path should be collapsed
			const isInfoPath = pageData.uuid === 'info-path';
			const isBetsPath = pageData.uuid === 'bets-path';
			const openAllTabs = isInformationBranch;
			const shouldOpenFurtherReading = isInformationBranch && pageData.externalLinks && pageData.externalLinks.length > 0;
			const shouldOpenEducation = !isInformationBranch && pageData.education && pageData.education.length > 0;

			console.log(`📑 Tab settings: isInformationBranch=${isInformationBranch}, isInfoPath=${isInfoPath}, openAllTabs=${openAllTabs}`);
			
			let tabsHTML = `
				<div class="tabs">
					${pageData.subsections && pageData.subsections.length > 0 ? 
						pageData.subsections.map(sub => `
							<div class="page-tab tab-subsection ${openAllTabs && !sub.isCollapsedByDefault ? 'tab-open' : ''}">
								<div class="tab-titles">
									<span class="tab-icon icon-meta"></span>
									<span class="tab-title">${sub.title}</span>
									<span class="tab-indicator"></span>
								</div>
								<div class="tab-content">
									<div class="subsection-content">${sub.content}</div>
									${sub.footnotes && sub.footnotes.length > 0 ? `
										<ul class="footnotes subsection-footnotes">
											${sub.footnotes.map((fn, i) => `
												<li class="footnote">
													<span class="footnote-id">${i + 1}.</span>
													<span class="footnote-content">${fn}</span>
												</li>
											`).join('')}
										</ul>
									` : ''}
								</div>
							</div>
						`).join('') 
					: ''}
					${pageData.education && pageData.education.length > 0 ? `
						<div class="page-tab tab-links ${openAllTabs || shouldOpenEducation ? 'tab-open' : ''}">
							<div class="tab-titles">
								<span class="tab-icon icon-meta"></span>
								<span class="tab-title">Education</span>
								<span class="tab-indicator"></span>
							</div>
							<div class="tab-content">
								<ul class="list">
									${pageData.education.map(entry => {
										const hasLink = entry.linkUri && entry.linkUri.trim() !== '';
										if (hasLink) {
											return `
												<li>
													<a href="${entry.linkUri}" class="index-link" data-uri="${entry.linkUri}">
														<span class="item-id"></span>
														<span class="item-title education-item">
															<span class="edu-institute">${entry.institute}</span>
															<span class="edu-major">${entry.major}</span>
															<span class="edu-degree">${entry.degree}<br>${entry.dates}</span>
														</span>
													</a>
												</li>
											`;
										} else {
											return `
												<li>
													<span class="item-id"></span>
													<span class="item-title education-item">
														<span class="edu-institute">${entry.institute}</span>
														<span class="edu-major">${entry.major}</span>
														<span class="edu-degree">${entry.degree}<br>${entry.dates}</span>
													</span>
												</li>
											`;
										}
									}).join('')}
								</ul>
							</div>
						</div>
					` : ''}
					${pageData.uuid === 'info-path' && (pageData.telephone || pageData.email || (pageData.externalLinks && pageData.externalLinks.length > 0)) ? `
						<div class="page-tab tab-links ${openAllTabs && !isInfoPath ? 'tab-open' : ''}">
							<div class="tab-titles">
								<span class="tab-icon icon-links"></span>
								<span class="tab-title">Contact Me</span>
								<span class="tab-indicator"></span>
							</div>
							<div class="tab-content">
								<ul class="list">
									${pageData.telephone ? `
										<li>
											<a href="tel:${pageData.telephone}" class="external-link">
												<span class="item-id"></span>
												<span class="item-title">
													<span>phone</span>
													<span class="link-address">${pageData.telephone}</span>
												</span>
											</a>
										</li>
									` : ''}
									${pageData.email ? `
										<li>
											<a href="mailto:${pageData.email}" class="external-link">
												<span class="item-id"></span>
												<span class="item-title">
													<span>email</span>
													<span class="link-address">${pageData.email}</span>
												</span>
											</a>
										</li>
									` : ''}
									${pageData.externalLinks && pageData.externalLinks.length > 0 ? pageData.externalLinks.map(link => {
										const url = new URL(link.link);
										// Show domain + path for better context (e.g., "linkedin.com/in/rudram-piplad")
										const displayUrl = url.hostname.replace(/^www\./, '') + url.pathname;
										return `
											<li>
												<a href="${link.link}" class="external-link" target="_blank">
													<span class="item-id"></span>
													<span class="item-title">
														<span>${link.title}</span>
														<span class="link-address">${displayUrl}</span>
													</span>
												</a>
											</li>
										`;
									}).join('') : ''}
								</ul>
							</div>
						</div>
					` : ''}
					${pageData.recognition && pageData.recognition.length > 0 ? `
						<div class="page-tab tab-links ${openAllTabs ? 'tab-open' : ''}">
							<div class="tab-titles">
								<span class="tab-icon icon-recognition"></span>
								<span class="tab-title">Recognition</span>
								<span class="tab-indicator"></span>
							</div>
							<div class="tab-content">
								<ul class="list">
									${pageData.recognition.map(entry => {
										return `
											<li>
												<span class="item-id"></span>
												<span class="item-title">
													<h2>${entry.title}</h2>
													<h3>${entry.subtitle}</h3>
													<h3>${entry.year}</h3>
												</span>
											</li>
										`;
									}).join('')}
								</ul>
							</div>
						</div>
					` : ''}
					${pageData.externalLinks && pageData.externalLinks.length > 0 && pageData.uuid !== 'info-path' && pageData.uuid !== 'contact-1' ? `
						<div class="page-tab tab-links ${openAllTabs || shouldOpenFurtherReading ? 'tab-open' : ''}">
							<div class="tab-titles">
								<span class="tab-icon icon-links"></span>
								<span class="tab-title">Further Reading</span>
								<span class="tab-indicator"></span>
							</div>
							<div class="tab-content">
								<ul class="list">
									${pageData.externalLinks.map(link => {
										// Extract the main domain from the link
										const url = new URL(link.link);
										const mainDomain = url.hostname.replace(/^www\./, ''); // Remove 'www.' if present
										return `
											<li>
												<a href="${link.link}" class="external-link" target="_blank">
													<span class="item-id"></span>
													<span class="item-title">
														<span>${link.title}</span>
														<span class="link-address">${mainDomain}</span>
													</span>
												</a>
											</li>
										`;
									}).join('')}
								</ul>
							</div>
						</div>
					` : ''}
					
				</div>
			`;

			if(pageData.externalLinks.length > 0 || pageData.education.length > 0 || pageData.recognition.length > 0 || (pageData.subsections && pageData.subsections.length > 0)){
				pageContent.innerHTML += tabsHTML;
			}

			
	
			// Add new .page-content to .page-container
			mainContentInner.appendChild(pageContent);

			Page.buildMedia(pageData);
		} else {
			console.error('Page data not found for URI:', uri);
		}
	},

	// ${pageData.connectedNodes && pageData.connectedNodes.length > 0 ? `
	// 	<div class="page-tab tab-connections">
	// 		<div class="tab-titles">
	// 			<span class="tab-icon icon-connections"></span>
	// 			<span class="tab-title">Connections</span>
	// 			<span class="tab-indicator"></span>
	// 		</div>
	// 		<div class="tab-content">
	// 			<ul class="list">
	// 				${pageData.connectedNodes.map(uuid => {
	// 					const connectedNode = this.findNodeByUUID(Map.data, uuid);
	// 					return connectedNode ? `
	// 						<li>
	// 							<a href="${connectedNode.uri}" class="external-link">
	// 								<span class="item-id"></span>
	// 								<span class="item-title"><a href="${connectedNode.uri}">${connectedNode.title}</a></span>
	// 							</a>
	// 						</li>
	// 					` : '';
	// 				}).join('')}
	// 			</ul>
	// 		</div>
	// 	</div>
	// ` : ''}

	animatePageHeight() {
		const mainContent = document.querySelector('.main-content');
		const mainContentInner = document.querySelector('.main-content-inner');
		const heightFrom = mainContent.offsetHeight;
		let heightTo = mainContentInner.offsetHeight + 1;

		const maxHeight = window.innerWidth > 768 ? window.innerHeight * 0.8 : window.innerHeight * 0.95 - document.querySelector('.header-content').offsetHeight;

		const delay = Page.firstLoad && window.innerWidth > 768 ? 1500 : 10;
		Page.firstLoad = false;

		// Restrict heightTo to be at most 90% of the window height
		if (heightTo > maxHeight) {
			heightTo = maxHeight;
		}
		// mainContent.style.overflow = 'hidden';
		mainContent.style.height = `${heightFrom}px`;

		// Allow the DOM to process the initial height setting
		setTimeout(() => {
			mainContent.style.height = `${heightTo}px`;
			document.querySelector('.page').classList.add('show-gradient');
			setTimeout(() => {
				// mainContent.style.overflow = 'auto';
			}, 800)
		}, delay);
	},

	findPageDataByUri(uri) {
        // Function to recursively find the page data by URI
        const findData = (node, uri) => {
            if (node.uri === uri) return node;
            if (node.children) {
                for (const child of node.children) {
                    const result = findData(child, uri);
                    if (result) return result;
                }
            }
            return null;
        };

        if (!Map.data) return null;
        return findData(Map.data, uri);
    },

	isInformationNode(node) {
		// Check if this node is Information type or has Information as ancestor
		if (!node) return false;
		
		// Check if this is the Information node itself
		if (node.type === 'information' || node.uuid === 'info-path' || node.title === 'Information') {
			return true;
		}
		
		// Check if any ancestor is Information
		const checkAncestor = (currentNode, targetUri) => {
			if (!Map.data) return false;
			
			const findNodeWithParent = (node, uri, parent = null) => {
				if (node.uri === uri) return { node, parent };
				if (node.children) {
					for (const child of node.children) {
						const result = findNodeWithParent(child, uri, node);
						if (result) return result;
					}
				}
				return null;
			};
			
			let current = findNodeWithParent(Map.data, currentNode.uri);
			while (current && current.parent) {
				if (current.parent.type === 'information' || 
					current.parent.uuid === 'info-path' || 
					current.parent.title === 'Information') {
					return true;
				}
				current = findNodeWithParent(Map.data, current.parent.uri);
			}
			return false;
		};
		
		return checkAncestor(node, node.uri);
	},

	findNodeByUUID(node, uuid) {
		if (node.uuid === uuid) return node;
		if (node.children) {
			for (const child of node.children) {
				const result = this.findNodeByUUID(child, uuid);
				if (result) return result;
			}
		}
		return null;
	},

	// =========================================================================
	// BREADCRUMB NAVIGATION
	// =========================================================================
	
	// Cache for computed paths (using object since Map component shadows built-in Map)
	breadcrumbCache: {},

	// Clears the breadcrumb cache (call when Map.data updates)
	clearBreadcrumbCache() {
		this.breadcrumbCache = {};
	},

	// Escape HTML to prevent XSS
	escapeHtml(text) {
		if (!text) return '';
		return String(text)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	},

	// Get breadcrumb path with caching
	getBreadcrumbPath(targetUri) {
		if (!Map.data || !targetUri) return [];
		
		// Check cache first
		if (this.breadcrumbCache[targetUri]) {
			return this.breadcrumbCache[targetUri];
		}
		
		// Build path via DFS
		const path = [];
		const found = this.findPathToNode(Map.data, targetUri, path);
		
		if (!found) return [];
		
		// Transform to display format
		const result = path.map(node => ({
			title: node.uuid === 'root-0' ? 'Home' : (node.title || 'Untitled'),
			uri: node.uri || '',
			uuid: node.uuid || ''
		}));
		
		// Cache the result
		this.breadcrumbCache[targetUri] = result;
		return result;
	},

	// DFS to find path (uses push/pop for performance)
	findPathToNode(node, targetUri, path) {
		path.push(node);
		if (node.uri === targetUri) return true;
		
		if (node.children) {
			for (const child of node.children) {
				if (this.findPathToNode(child, targetUri, path)) return true;
			}
		}
		
		path.pop();
		return false;
	},

	// Truncate path for deep hierarchies: Home / ... / Parent / Current
	truncatePath(path, maxVisible = 4) {
		if (path.length <= maxVisible) return path;
		
		// Keep: first item, ellipsis marker, second-to-last, last
		return [
			path[0],
			{ title: '...', uri: '', uuid: '', isEllipsis: true },
			path[path.length - 2],
			path[path.length - 1]
		];
	},

	// Build breadcrumb HTML
	buildBreadcrumbHTML(path) {
		if (!path || path.length <= 1) return '';
		
		const isMobile = window.innerWidth <= 768;
		
		if (isMobile) {
			const parent = path[path.length - 2];
			return `
				<nav class="breadcrumb" aria-label="Breadcrumb">
					<a href="${this.escapeHtml(parent.uri)}" data-uri="${this.escapeHtml(parent.uri)}" class="breadcrumb-link">
						← ${this.escapeHtml(parent.title)}
					</a>
				</nav>
				${this.buildSchemaMarkup(path)}
			`;
		}
		
		// Truncate for deep paths
		const displayPath = this.truncatePath(path);
		
		const items = displayPath.map((item, i) => {
			const isLast = i === displayPath.length - 1;
			const escaped = this.escapeHtml(item.title);
			const escapedUri = this.escapeHtml(item.uri);
			
			if (item.isEllipsis) {
				return `<span class="breadcrumb-ellipsis">…</span>`;
			}
			if (isLast) {
				return `<span class="breadcrumb-current" aria-current="page">${escaped}</span>`;
			}
			return `<a href="${escapedUri}" data-uri="${escapedUri}" class="breadcrumb-link" tabindex="0">${escaped}</a>`;
		});
		
		return `
			<nav class="breadcrumb" aria-label="Breadcrumb" role="navigation">
				<ol class="breadcrumb-list">
					${items.map(html => `<li>${html}</li>`).join('')}
				</ol>
			</nav>
			${this.buildSchemaMarkup(path)}
		`;
	},

	// Schema.org JSON-LD for SEO
	buildSchemaMarkup(path) {
		if (!path || path.length < 2) return '';
		
		const baseUrl = window.location.origin;
		const items = path.map((item, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": item.title,
			"item": item.uri ? `${baseUrl}/${item.uri}` : baseUrl
		}));
		
		const schema = {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": items
		};
		
		return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
	},

	// Setup keyboard navigation for breadcrumbs
	setupBreadcrumbKeyboardNav() {
		document.addEventListener('keydown', (e) => {
			const activeEl = document.activeElement;
			if (!activeEl?.classList.contains('breadcrumb-link')) return;
			
			const links = Array.from(document.querySelectorAll('.breadcrumb-link'));
			const currentIndex = links.indexOf(activeEl);
			
			if (e.key === 'ArrowRight' && currentIndex < links.length - 1) {
				e.preventDefault();
				links[currentIndex + 1].focus();
			} else if (e.key === 'ArrowLeft' && currentIndex > 0) {
				e.preventDefault();
				links[currentIndex - 1].focus();
			}
		});
	}


    
};

export default Page;