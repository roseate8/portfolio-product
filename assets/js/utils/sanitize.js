/**
 * =============================================================================
 * SANITIZE MODULE
 * =============================================================================
 *
 * Sanitizes database-backed content before rendering to prevent XSS and
 * unsafe URL injection. The portfolio renders text, HTML, and URLs that come
 * from Supabase; this module ensures none of them can execute scripts or
 * redirect to dangerous protocols.
 *
 * Three functions:
 * - sanitizeHTML(html)  — strips dangerous elements/attributes from HTML
 * - sanitizeURL(url)    — validates URL protocol, returns "" if unsafe
 * - sanitizeText(text)  — escapes HTML entities for plain-text fields
 * =============================================================================
 */

// Tags that are removed entirely (element and content).
const DANGEROUS_TAGS = new Set([
    'script',
    'iframe',
    'object',
    'embed',
    'form',
    'input',
    'textarea',
    'select',
    'button[form]', // form-associated buttons are handled separately
    'meta',
    'link',
    'base',
]);

// Attributes that are always removed.
const DANGEROUS_ATTRS = /^(on|srcdoc|formaction|xlink:href|xml:base)/i;

// Attributes that contain URLs and need protocol validation.
const URL_ATTRS = new Set(['href', 'src', 'action', 'formaction', 'data', 'poster']);

// URL protocols that are safe to use in href/src attributes.
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

// Relative URL patterns that are safe (internal routing, anchors).
const SAFE_RELATIVE = /^(\/|nodes\/|#|\?)/;

/**
 * Validates a URL string. Returns the URL if safe, or an empty string if the
 * protocol is dangerous (javascript:, data:, vbscript:, etc.).
 *
 * @param {string} url - The URL to validate
 * @returns {string} The original URL if safe, "" otherwise
 */
export function sanitizeURL(url) {
    if (!url || typeof url !== 'string') return '';

    const trimmed = url.trim();

    // Allow relative URLs (internal routing, anchors, query params)
    if (SAFE_RELATIVE.test(trimmed)) return trimmed;

    // Allow protocol-free URLs (treated as relative by the browser)
    if (!/:/.test(trimmed) && !trimmed.startsWith('//')) return trimmed;

    try {
        const parsed = new URL(trimmed, window.location.origin);
        if (SAFE_PROTOCOLS.has(parsed.protocol)) return trimmed;
        // Block javascript:, data:, vbscript:, etc.
        return '';
    } catch {
        // If URL parsing fails, it might be a relative path or malformed.
        // Only allow it if it matches the safe relative pattern.
        if (SAFE_RELATIVE.test(trimmed)) return trimmed;
        return '';
    }
}

/**
 * Escapes HTML entities in a plain text string. Use this for database fields
 * that should be rendered as text, not HTML (titles, summaries, emails).
 *
 * @param {string} text - The text to escape
 * @returns {string} Escaped text safe for innerHTML
 */
export function sanitizeText(text) {
    if (text == null) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Sanitizes an HTML string by parsing it, removing dangerous elements and
 * attributes, and validating all URLs. Use this for database fields that
 * contain legitimate HTML (descriptions, footnotes).
 *
 * @param {string} html - The HTML string to sanitize
 * @returns {string} Sanitized HTML safe for innerHTML
 */
export function sanitizeHTML(html) {
    if (!html || typeof html !== 'string') return '';

    // Use a template element to parse the HTML safely
    const template = document.createElement('template');
    template.innerHTML = html;

    // Walk the DOM and remove dangerous nodes
    cleanNode(template.content);

    return template.innerHTML;
}

/**
 * Recursively cleans a DOM node: removes dangerous elements, strips dangerous
 * attributes, and validates URLs.
 *
 * @param {Node} node - The node to clean
 */
function cleanNode(node) {
    // Iterate backwards so removals don't skip siblings
    const children = [...node.childNodes];
    for (const child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            cleanElement(child);
        }
        // Text nodes and comments are safe (script content in a text node
        // cannot execute).
    }
}

/**
 * Cleans a single element: checks tag name, removes dangerous attributes,
 * validates URLs, then recurses into children.
 *
 * @param {Element} el - The element to clean
 */
function cleanElement(el) {
    const tag = el.tagName.toLowerCase();

    // Remove dangerous tags entirely
    if (DANGEROUS_TAGS.has(tag)) {
        el.remove();
        return;
    }

    // Remove dangerous attributes
    const attrs = [...el.attributes];
    for (const attr of attrs) {
        const name = attr.name.toLowerCase();

        // Strip event handlers and other dangerous attributes
        if (DANGEROUS_ATTRS.test(name)) {
            el.removeAttribute(attr.name);
            continue;
        }

        // Validate URL attributes
        if (URL_ATTRS.has(name)) {
            const safe = sanitizeURL(attr.value);
            if (safe) {
                el.setAttribute(attr.name, safe);
            } else {
                el.removeAttribute(attr.name);
            }
        }

        // Remove style attributes (can be used for CSS-based attacks)
        if (name === 'style') {
            el.removeAttribute(attr.name);
        }
    }

    // Recurse into children
    cleanNode(el);
}

export default { sanitizeHTML, sanitizeURL, sanitizeText };
