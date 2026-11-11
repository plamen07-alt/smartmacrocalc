/** Single source of truth for the canonical origin and site identity. */
export const SITE_URL = 'https://www.smartmacrocalc.com';
export const SITE_NAME = 'SmartMacroCalc.com';
export const SHORT_BRAND = 'SmartMacroCalc';
export const CONTACT_EMAIL = 'gainsystemized@gmail.com';
export const EDITORIAL_AUTHOR = 'SmartMacroCalc Editorial Team';

/** Date the calculators, presets and guides were last substantively reviewed. */
export const CONTENT_LAST_UPDATED = '2026-10-27';

/**
 * Formats an SEO <title> tag strictly within the 70-character SERP / Semrush limit
 * while keeping full descriptive <h1> headings intact on the page.
 */
export function formatSeoTitle(rawTitle: string, maxLength = 68): string {
  const clean = rawTitle
    .replace(/\s*\|\s*SmartMacroCalc(\.com)?$/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const withBrand = `${clean} | ${SHORT_BRAND}`;
  if (withBrand.length <= maxLength) {
    return withBrand;
  }

  // Prefer the concise primary clause before a colon when appending the brand
  const colonIdx = clean.indexOf(':');
  if (colonIdx > 18) {
    const primaryClause = clean.slice(0, colonIdx).trim();
    const clauseWithBrand = `${primaryClause} | ${SHORT_BRAND}`;
    if (clauseWithBrand.length <= maxLength) {
      return clauseWithBrand;
    }
  }

  if (clean.length <= maxLength) {
    return clean;
  }

  const sliced = clean.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = (lastSpace > 24 ? sliced.slice(0, lastSpace) : sliced).replace(
    /[\s,:\-–—&(/]+$/,
    ''
  );
  return trimmed;
}
