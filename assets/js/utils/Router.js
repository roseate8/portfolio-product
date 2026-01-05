import Map from '../components/Map.js';
import Page from '../components/Page.js';

const Router = {
    basePath: document.body.dataset.basepath || window.location.origin,

    getBasePath() {
        // Handle empty basepath for local development
        if (!this.basePath || this.basePath === '') {
            return '/';
        }
        try {
            const url = new URL(this.basePath);
            return url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
        } catch (e) {
            // If basePath is not a valid URL, treat it as a path
            return this.basePath.endsWith('/') ? this.basePath : this.basePath + '/';
        }
    },

    initialize() {
        const normalizedBasePath = this.getBasePath();
        let path = window.location.pathname.replace(normalizedBasePath, '');
        // Remove leading slash if present
        path = path.replace(/^\//, '');

        window.addEventListener('popstate', Router.routeBack.bind(this));
        history.replaceState({ sliderValue: 0 }, '', window.location.href);
        Router.route();
        Page.initialize(path);
    },

    navigate(state = {}, path) {
        const sliderValue = document.querySelector('.date-slider') ? document.querySelector('.date-slider').value : 0;
        state.sliderValue = sliderValue;
        const basePath = this.getBasePath();
        history.pushState(state, '', basePath + path);
    },

    route() {
        const normalizedBasePath = this.getBasePath();
        let path = window.location.pathname.replace(normalizedBasePath, '');
        path = path.replace(/^\//, '');

        const state = history.state || {};
        const sliderValue = parseInt(state.sliderValue, 10) || null;

        Router.determineView(path, sliderValue);
    },

    routeBack(event) {
        const normalizedBasePath = this.getBasePath();
        let path = window.location.pathname.replace(normalizedBasePath, '');
        path = path.replace(/^\//, '');

        const state = event.state || {};
        const sliderValue = parseInt(state.sliderValue, 10) || null;

        Router.determineView(path, sliderValue);
        
    },

    determineView(path, sliderValue) {
        if (!path) {
            Map.initialize(null, sliderValue);
        } 
        else {
            Map.initialize(path, sliderValue);
        }
    },

    updateSliderState(sliderValue) {
        const state = history.state || {};
        state.sliderValue = sliderValue;
        history.replaceState(state, '', window.location.href);
    }
};

export default Router;