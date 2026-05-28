/**
 * Server-safe HTML sanitizer for WordPress `content.rendered`.
 *
 * Uses cheerio (already in this project's dependencies for the contact form
 * pipeline) instead of isomorphic-dompurify / jsdom, which fails to load
 * on Vercel's Node runtime due to ESM/CJS interop issues in jsdom's
 * dependency chain (html-encoding-sniffer requires an ESM module).
 *
 * Why we control output strictly:
 *   - Gutenberg loves to inject `style="..."` for colors and font-sizes
 *     that fight our brand styling. We strip `style` entirely.
 *   - We forbid <script>, <iframe>, <form>, <embed>, etc. Editorial blog
 *     content should never need them, and they're the primary XSS vectors.
 *   - data-* attributes (WP block markup pollution) are dropped wholesale.
 */

import * as cheerio from "cheerio";

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "blockquote", "pre", "code", "figure", "figcaption",
  "ul", "ol", "li",
  "a", "strong", "em", "b", "i", "u", "s", "mark", "sub", "sup", "br", "hr", "small",
  "img", "picture", "source",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "span", "div",
]);

const ALLOWED_ATTRS = new Set([
  "href", "title", "target", "rel",
  "src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding",
  "class", "id", "lang", "dir",
  "colspan", "rowspan",
]);

const FORBIDDEN_TAGS = new Set([
  "script", "style", "iframe", "object", "embed",
  "form", "input", "textarea", "select", "button",
  "link", "meta", "noscript",
]);

export function sanitizeWordpressHtml(html: string): string {
  if (!html) return "";

  const $ = cheerio.load(html, null, false);

  // 1. Remove forbidden tags wholesale (and their children).
  FORBIDDEN_TAGS.forEach((tag) => $(tag).remove());

  // 2. Walk every remaining element, strip disallowed attributes and tags.
  $("*").each((_, el) => {
    if (el.type !== "tag") return;
    const tagName = el.tagName.toLowerCase();

    // Unknown tag → unwrap (keep children, drop the wrapper).
    if (!ALLOWED_TAGS.has(tagName)) {
      $(el).replaceWith($(el).contents());
      return;
    }

    // Strip every attribute not in the allow-list, plus anything that looks
    // like an event handler (on*) or starts with data-/aria- that we didn't
    // explicitly bless.
    for (const attrName of Object.keys(el.attribs || {})) {
      const lower = attrName.toLowerCase();
      if (!ALLOWED_ATTRS.has(lower)) {
        $(el).removeAttr(attrName);
        continue;
      }
      // Block javascript: and data: URLs in href/src to prevent XSS via links.
      if (lower === "href" || lower === "src") {
        const value = (el.attribs[attrName] || "").trim().toLowerCase();
        if (value.startsWith("javascript:") || value.startsWith("vbscript:")) {
          $(el).removeAttr(attrName);
        }
      }
    }

    // Add rel="noopener noreferrer" to any external link with target=_blank.
    if (tagName === "a" && el.attribs?.target === "_blank") {
      const existingRel = el.attribs.rel || "";
      if (!/noopener/.test(existingRel)) {
        $(el).attr("rel", `${existingRel} noopener noreferrer`.trim());
      }
    }
  });

  return $.html();
}
