import { describe, it, expect } from 'vitest';
import { sanitizeHTML, sanitizeURL, sanitizeText } from '../assets/js/utils/sanitize.js';

describe('sanitizeURL', () => {
    it('allows http and https URLs', () => {
        expect(sanitizeURL('https://example.com/path')).toBe('https://example.com/path');
        expect(sanitizeURL('http://example.com')).toBe('http://example.com');
    });

    it('allows mailto and tel protocols', () => {
        expect(sanitizeURL('mailto:test@example.com')).toBe('mailto:test@example.com');
        expect(sanitizeURL('tel:+1234567890')).toBe('tel:+1234567890');
    });

    it('allows relative URLs used for internal routing', () => {
        expect(sanitizeURL('nodes/information')).toBe('nodes/information');
        expect(sanitizeURL('/assets/data/portfolio.json')).toBe('/assets/data/portfolio.json');
        expect(sanitizeURL('#section-1')).toBe('#section-1');
        expect(sanitizeURL('?query=1')).toBe('?query=1');
    });

    it('blocks javascript: protocol', () => {
        expect(sanitizeURL('javascript:alert(1)')).toBe('');
        expect(sanitizeURL('JavaScript:alert(1)')).toBe('');
        expect(sanitizeURL('  javascript:alert(1)  ')).toBe('');
    });

    it('blocks data: protocol', () => {
        expect(sanitizeURL('data:text/html,<script>alert(1)</script>')).toBe('');
        expect(sanitizeURL('data:image/png;base64,abc')).toBe('');
    });

    it('blocks vbscript: protocol', () => {
        expect(sanitizeURL('vbscript:msgbox(1)')).toBe('');
    });

    it('blocks characters that can escape an HTML attribute', () => {
        expect(sanitizeURL('https://example.com/" autofocus onfocus="alert(1)')).toBe('');
        expect(sanitizeURL("https://example.com/' onclick='alert(1)")).toBe('');
        expect(sanitizeURL('https://example.com/<script>')).toBe('');
    });

    it('returns empty string for null, undefined, or non-strings', () => {
        expect(sanitizeURL(null)).toBe('');
        expect(sanitizeURL(undefined)).toBe('');
        expect(sanitizeURL(123)).toBe('');
        expect(sanitizeURL('')).toBe('');
    });
});

describe('sanitizeText', () => {
    it('escapes HTML entities', () => {
        expect(sanitizeText('<script>alert(1)</script>')).toBe(
            '&lt;script&gt;alert(1)&lt;/script&gt;'
        );
    });

    it('escapes quotes', () => {
        expect(sanitizeText('"hello" & \'world\'')).toBe(
            '&quot;hello&quot; &amp; &#39;world&#39;'
        );
    });

    it('handles null and undefined', () => {
        expect(sanitizeText(null)).toBe('');
        expect(sanitizeText(undefined)).toBe('');
    });

    it('converts non-strings to strings', () => {
        expect(sanitizeText(42)).toBe('42');
    });
});

describe('sanitizeHTML', () => {
    it('preserves safe HTML tags', () => {
        const result = sanitizeHTML('<p>Hello <strong>world</strong></p>');
        expect(result).toContain('<p>');
        expect(result).toContain('<strong>');
        expect(result).toContain('Hello');
        expect(result).toContain('world');
    });

    it('removes script tags and their content', () => {
        const result = sanitizeHTML('<p>safe</p><script>alert(1)</script>');
        expect(result).not.toContain('<script');
        expect(result).not.toContain('alert');
        expect(result).toContain('safe');
    });

    it('removes iframe tags', () => {
        const result = sanitizeHTML('<iframe src="https://evil.com"></iframe><p>ok</p>');
        expect(result).not.toContain('iframe');
        expect(result).toContain('ok');
    });

    it('removes event handler attributes', () => {
        const result = sanitizeHTML('<p onclick="alert(1)">text</p>');
        expect(result).not.toContain('onclick');
        expect(result).toContain('text');
    });

    it('removes onmouseover, onload, and other on* attributes', () => {
        const result = sanitizeHTML('<img src="x" onmouseover="alert(1)" onload="alert(2)">');
        expect(result).not.toContain('onmouseover');
        expect(result).not.toContain('onload');
    });

    it('removes style attributes', () => {
        const result = sanitizeHTML('<p style="background:url(javascript:alert(1))">text</p>');
        expect(result).not.toContain('style');
        expect(result).toContain('text');
    });

    it('validates href attributes and blocks javascript: URLs', () => {
        const result = sanitizeHTML('<a href="javascript:alert(1)">click</a>');
        expect(result).not.toContain('javascript:');
        expect(result).toContain('click');
    });

    it('preserves safe href attributes', () => {
        const result = sanitizeHTML('<a href="https://example.com">link</a>');
        expect(result).toContain('href="https://example.com"');
    });

    it('preserves relative href attributes', () => {
        const result = sanitizeHTML('<a href="nodes/information">info</a>');
        expect(result).toContain('href="nodes/information"');
    });

    it('validates src attributes and blocks data: URLs', () => {
        const result = sanitizeHTML('<img src="data:text/html,<script>alert(1)</script>">');
        expect(result).not.toContain('data:');
    });

    it('removes object and embed tags', () => {
        const result = sanitizeHTML('<object data="evil.swf"></object><embed src="evil.swf">');
        expect(result).not.toContain('object');
        expect(result).not.toContain('embed');
    });

    it('removes form and input tags', () => {
        const result = sanitizeHTML('<form action="evil.com"><input name="x"></form>');
        expect(result).not.toContain('form');
        expect(result).not.toContain('input');
    });

    it('handles empty or null input', () => {
        expect(sanitizeHTML('')).toBe('');
        expect(sanitizeHTML(null)).toBe('');
        expect(sanitizeHTML(undefined)).toBe('');
    });

    it('preserves nested safe HTML', () => {
        const result = sanitizeHTML('<div><p>line 1</p><p>line 2</p></div>');
        expect(result).toContain('<div>');
        expect(result).toContain('<p>line 1</p>');
        expect(result).toContain('<p>line 2</p>');
    });

    it('removes script from nested content', () => {
        const result = sanitizeHTML('<div><p>safe</p><script>bad()</script></div>');
        expect(result).toContain('safe');
        expect(result).not.toContain('bad()');
    });
});
