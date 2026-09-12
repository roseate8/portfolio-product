const MOBILE_QUERY = '(max-width: 768px)';

let toggle;
let onGraphShown;

export function setMobileView(view) {
  if (!window.matchMedia(MOBILE_QUERY).matches) return;

  const graphView = view === 'graph';
  document.body.classList.toggle('mobile-graph-view', graphView);
  document.body.classList.toggle('mobile-content-view', !graphView);
  toggle?.setAttribute('aria-label', graphView ? 'Show content view' : 'Show graph view');
  toggle?.setAttribute('aria-pressed', String(graphView));

  if (graphView) onGraphShown?.();
}

export function showMobileContent() {
  setMobileView('content');
}

export function initializeMobileView(options = {}) {
  onGraphShown = options.onGraphShown;
  toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'mobile-view-toggle';
  toggle.innerHTML = [
    '<span class="mobile-view-toggle__graph" aria-hidden="true">◌</span>',
    '<span class="mobile-view-toggle__list" aria-hidden="true">≡</span>',
  ].join('');
  document.body.appendChild(toggle);

  toggle.addEventListener('click', () => {
    const nextView = document.body.classList.contains('mobile-graph-view')
      ? 'content'
      : 'graph';
    setMobileView(nextView);
  });

  const media = window.matchMedia(MOBILE_QUERY);
  const handleViewportChange = ({ matches }) => {
    if (matches) {
      setMobileView('content');
    } else {
      document.body.classList.remove('mobile-graph-view', 'mobile-content-view');
    }
  };

  handleViewportChange(media);
  media.addEventListener('change', handleViewportChange);
}
