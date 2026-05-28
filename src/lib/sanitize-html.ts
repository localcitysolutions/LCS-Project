/**
 * Server-safe HTML sanitizer for WordPress `content.rendered`.
 *
 * Why we control this strictly:
 *   - Gutenberg loves to inject `style="..."` on paragraphs/headings for colors
 *     and font-sizes that would fight our brand. We strip `style` entirely.
 *   - We forbid <script>, <iframe>, <form>, <embed>, etc. Editorial blog
 *     content should never need them.
 *   - data-* attributes are dropped — WP block markup pollutes output with
 *     `data-block-*` attributes that we don't read.
 */

import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "blockquote", "pre", "code", "figure", "figcaption",
  "ul", "ol", "li",
  "a", "strong", "em", "b", "i", "u", "s", "mark", "sub", "sup", "br", "hr", "small",
  "img", "picture", "source",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "span", "div",
];

const ALLOWED_ATTR = [
  "href", "title", "target", "rel",
  "src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding",
  "class", "id", "lang", "dir",
  "colspan", "rowspan",
];

export function sanitizeWordpressHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: [
      "script", "style", "iframe", "object", "embed",
      "form", "input", "textarea", "select", "button",
    ],
    FORBID_ATTR: [
      "onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur",
      "style",
    ],
  });
}
