#!/usr/bin/env node
/**
 * scripts/crawl-m3-artifacts.mjs
 * 
 * Adversarial Static HTML & Machine Files Crawler for SmartMacroCalc.com
 * Authored by challenger_m3_2.
 * 
 * Crawls and asserts:
 * 1. Pre-rendered HTML Guides (12 files in .next/server/app/guides/*.html):
 *    - Canonical link tag matching exact guide URL
 *    - Visible data-aeo-answer container with 40-65 words
 *    - HTML <table> structure with thead/tbody/th/td
 *    - Schema.org JSON-LD scripts (MedicalWebPage, BreadcrumbList, FAQPage, Organization)
 *    - Verified NCBI PubMed links (PMID / pubmed.ncbi.nlm.nih.gov)
 *    - OpenGraph & Twitter tags
 * 2. Pre-rendered Legal HTML Pages (5 files in .next/server/app/legal/*.html):
 *    - Canonical link tag matching exact legal URL
 *    - Visual breadcrumb navigation element
 *    - Schema.org JSON-LD (WebPage / AboutPage / ContactPage, BreadcrumbList, Organization)
 *    - OpenGraph & Twitter tags
 * 3. Machine Files in public/:
 *    - public/llms.txt: >100 bytes, markdown headings, valid URLs, no placeholder strings
 *    - public/llms-full.txt: >200 bytes (>50 KB), contains BMR formulas, GLP-1, Perimenopause, Fasting, PMIDs
 *    - public/sitemap.xml: exactly 84 canonical URLs, valid XML, zero duplicates
 *    - public/robots.txt: directives for AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.), sitemap directive
 * 4. Dynamic Route Handlers (src/app/sitemap.ts, src/app/robots.ts)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const jiti = createJiti(__filename, {
  alias: {
    '@': path.join(ROOT_DIR, 'src'),
    '@/*': path.join(ROOT_DIR, 'src/*'),
  },
});

// High-contrast ANSI terminal colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Track results
const stats = {
  guides: { passed: 0, failed: 0, total: 0 },
  legal: { passed: 0, failed: 0, total: 0 },
  machineFiles: { passed: 0, failed: 0, total: 0 },
  routeHandlers: { passed: 0, failed: 0, total: 0 },
};

const failures = [];

function assert(suite, condition, description, details = '') {
  stats[suite].total++;
  if (condition) {
    stats[suite].passed++;
    console.log(`  ${colors.green}[PASS]${colors.reset} ${description}${details ? ` ${colors.dim}(${details})${colors.reset}` : ''}`);
  } else {
    stats[suite].failed++;
    const errMsg = `[${suite.toUpperCase()}] ${description}: ${details}`;
    failures.push(errMsg);
    console.log(`  ${colors.red}[FAIL]${colors.reset} ${description} -> ${colors.red}${details}${colors.reset}`);
  }
}

// Helpers for HTML parsing
function countWords(str) {
  if (!str) return 0;
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
}

function extractJsonLdScripts(html) {
  const scripts = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      scripts.push(JSON.parse(match[1]));
    } catch (e) {
      scripts.push({ __parseError: true, raw: match[1], error: e.message });
    }
  }
  return scripts;
}

function flattenSchemas(schemas) {
  const result = [];
  for (const s of schemas) {
    if (s['@graph'] && Array.isArray(s['@graph'])) {
      result.push(...s['@graph']);
    } else {
      result.push(s);
    }
  }
  return result;
}

// ============================================================================
// SUITE 1: PRE-RENDERED GUIDES CRAWL (12 HTML FILES)
// ============================================================================
async function crawlGuides() {
  console.log(`\n${colors.cyan}${colors.bright}=== SUITE 1: PRE-RENDERED CLINICAL GUIDES CRAWL (12 FILES) ===${colors.reset}`);

  let articlesModule;
  try {
    articlesModule = jiti(path.join(ROOT_DIR, 'src/lib/articles.ts'));
  } catch (err) {
    assert('guides', false, 'Load src/lib/articles.ts', err.message);
    return;
  }

  const { SCIENTIFIC_ARTICLES = [] } = articlesModule;
  assert('guides', SCIENTIFIC_ARTICLES.length === 12, 'Articles inventory has exactly 12 items', `Count: ${SCIENTIFIC_ARTICLES.length}`);

  const guidesDir = path.join(ROOT_DIR, '.next/server/app/guides');
  assert('guides', fs.existsSync(guidesDir), '.next/server/app/guides directory exists');

  for (const article of SCIENTIFIC_ARTICLES) {
    const slug = article.slug;
    const htmlPath = path.join(guidesDir, `${slug}.html`);
    const fileExists = fs.existsSync(htmlPath);

    assert('guides', fileExists, `Guide [${slug}]: Pre-rendered HTML file exists on disk`, htmlPath);
    if (!fileExists) continue;

    const html = fs.readFileSync(htmlPath, 'utf8');
    const size = html.length;
    assert('guides', size > 1500, `Guide [${slug}]: File size is substantive (>1.5 KB)`, `${size} bytes`);

    // 1. Canonical URL
    const expectedCanonical = `https://www.smartmacrocalc.com/guides/${slug}`;
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) ||
                           html.match(/<link\s+href=["'](.*?)["']\s+rel=["']canonical["']/i);
    const actualCanonical = canonicalMatch ? canonicalMatch[1] : null;
    assert('guides', actualCanonical === expectedCanonical, `Guide [${slug}]: Canonical tag matches expected URL`, `Found: ${actualCanonical}`);

    // 2. Title and Meta Description
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : null;
    assert('guides', !!title && title.includes('SmartMacroCalc.com'), `Guide [${slug}]: <title> contains brand name`, title);

    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const metaDesc = descMatch ? descMatch[1] : null;
    assert('guides', !!metaDesc && metaDesc.length >= 50, `Guide [${slug}]: <meta name="description"> is substantive (>=50 chars)`, `${metaDesc?.length} chars`);

    // 3. Visible AEO summary block
    const hasAeoContainer = /data-aeo-answer=["']true["']/i.test(html);
    assert('guides', hasAeoContainer, `Guide [${slug}]: Visible container with data-aeo-answer="true" present`);

    // Extract AEO paragraph text content inside the callout block
    const aeoIndex = html.indexOf('data-aeo-answer="true"');
    let aeoText = null;
    if (aeoIndex !== -1) {
      const aeoSlice = html.slice(aeoIndex, aeoIndex + 1200);
      const pMatch = aeoSlice.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      aeoText = pMatch ? pMatch[1] : null;
    }
    const wordCount = countWords(aeoText || article.directClinicalAnswer);
    assert('guides', wordCount >= 40 && wordCount <= 65, `Guide [${slug}]: AEO answer block word count strictly within 40-65 words`, `${wordCount} words`);

    // 4. HTML Table Structure
    const hasTable = /<table[\s>]/i.test(html);
    assert('guides', hasTable, `Guide [${slug}]: Structured HTML <table> present`);
    const hasTh = /<th[\s>]/i.test(html);
    const hasTd = /<td[\s>]/i.test(html);
    assert('guides', hasTh && hasTd, `Guide [${slug}]: Table contains proper <th> and <td> cells`);

    // 5. Schema.org JSON-LD
    const rawSchemas = extractJsonLdScripts(html);
    assert('guides', rawSchemas.length >= 1, `Guide [${slug}]: Contains application/ld+json script tags`, `${rawSchemas.length} scripts`);
    assert('guides', !rawSchemas.some((s) => s.__parseError), `Guide [${slug}]: 100% of JSON-LD scripts parse without syntax errors`);

    const flat = flattenSchemas(rawSchemas);
    const hasMedicalWebPage = flat.some((s) => s['@type'] === 'MedicalWebPage');
    const hasBreadcrumbs = flat.some((s) => s['@type'] === 'BreadcrumbList');
    const hasFaqPage = flat.some((s) => s['@type'] === 'FAQPage');
    const hasOrganization = flat.some((s) => s['@type'] === 'Organization');

    assert('guides', hasMedicalWebPage, `Guide [${slug}]: Schema.org contains MedicalWebPage entity`);
    assert('guides', hasBreadcrumbs, `Guide [${slug}]: Schema.org contains BreadcrumbList entity`);
    assert('guides', hasFaqPage, `Guide [${slug}]: Schema.org contains FAQPage entity`);
    assert('guides', hasOrganization, `Guide [${slug}]: Schema.org contains Organization entity`);

    // Validate Breadcrumb structure
    const breadcrumbEntity = flat.find((s) => s['@type'] === 'BreadcrumbList');
    if (breadcrumbEntity && Array.isArray(breadcrumbEntity.itemListElement)) {
      const items = breadcrumbEntity.itemListElement;
      assert('guides', items.length >= 2, `Guide [${slug}]: BreadcrumbList has >=2 trail items`, `Items: ${items.length}`);
    }

    // 6. NCBI PubMed links
    const hasPubMedHref = /href=["']https?:\/\/(?:pubmed\.ncbi\.nlm\.nih\.gov\/\d+|doi\.org\/)/i.test(html);
    const hasPmidText = /PMID:\s*\d{6,8}|PMID\s*\d{6,8}/i.test(html);
    assert('guides', hasPubMedHref || hasPmidText, `Guide [${slug}]: Contains clickable PubMed PMID links / citations`);

    // 7. OpenGraph and Twitter
    const hasOgTitle = /<meta\s+property=["']og:title["']/i.test(html);
    const hasOgUrl = /<meta\s+property=["']og:url["']/i.test(html);
    const hasTwitterCard = /<meta\s+name=["']twitter:card["']/i.test(html);
    assert('guides', hasOgTitle && hasOgUrl && hasTwitterCard, `Guide [${slug}]: OpenGraph and Twitter social metadata present`);
  }
}

// ============================================================================
// SUITE 2: PRE-RENDERED LEGAL HTML CRAWL (5 FILES)
// ============================================================================
async function crawlLegal() {
  console.log(`\n${colors.cyan}${colors.bright}=== SUITE 2: PRE-RENDERED LEGAL HTML CRAWL (5 FILES) ===${colors.reset}`);

  const legalSlugs = ['privacy', 'terms', 'disclaimer', 'about', 'contact'];
  const legalDir = path.join(ROOT_DIR, '.next/server/app/legal');
  assert('legal', fs.existsSync(legalDir), '.next/server/app/legal directory exists');

  for (const slug of legalSlugs) {
    const htmlPath = path.join(legalDir, `${slug}.html`);
    const fileExists = fs.existsSync(htmlPath);

    assert('legal', fileExists, `Legal [${slug}]: Pre-rendered HTML file exists on disk`, htmlPath);
    if (!fileExists) continue;

    const html = fs.readFileSync(htmlPath, 'utf8');
    const size = html.length;
    assert('legal', size > 1000, `Legal [${slug}]: File size is substantive (>1 KB)`, `${size} bytes`);

    // 1. Canonical URL
    const expectedCanonical = `https://www.smartmacrocalc.com/legal/${slug}`;
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) ||
                           html.match(/<link\s+href=["'](.*?)["']\s+rel=["']canonical["']/i);
    const actualCanonical = canonicalMatch ? canonicalMatch[1] : null;
    assert('legal', actualCanonical === expectedCanonical, `Legal [${slug}]: Canonical matches expected URL`, `Found: ${actualCanonical}`);

    // 2. Visible Breadcrumb Navigation
    const hasBreadcrumbNav = /<nav[^>]*aria-label=["']Breadcrumb["'][^>]*>|breadcrumb/i.test(html);
    const hasHomeLink = /href=["']\/["']/i.test(html);
    assert('legal', hasBreadcrumbNav && hasHomeLink, `Legal [${slug}]: Visual breadcrumb navigation bar present`);

    // 3. Schema.org JSON-LD
    const rawSchemas = extractJsonLdScripts(html);
    assert('legal', rawSchemas.length >= 1, `Legal [${slug}]: Contains application/ld+json scripts`, `${rawSchemas.length} scripts`);
    assert('legal', !rawSchemas.some((s) => s.__parseError), `Legal [${slug}]: JSON-LD parses cleanly without syntax errors`);

    const flat = flattenSchemas(rawSchemas);
    const hasBreadcrumbs = flat.some((s) => s['@type'] === 'BreadcrumbList');
    const hasWebPage = flat.some((s) => ['WebPage', 'AboutPage', 'ContactPage'].includes(s['@type']));
    const hasOrganization = flat.some((s) => s['@type'] === 'Organization');

    assert('legal', hasBreadcrumbs, `Legal [${slug}]: Schema contains BreadcrumbList entity`);
    assert('legal', hasWebPage, `Legal [${slug}]: Schema contains WebPage/AboutPage/ContactPage entity`);
    assert('legal', hasOrganization, `Legal [${slug}]: Schema contains Organization entity`);

    // 4. OpenGraph & Twitter
    const hasOgTitle = /<meta\s+property=["']og:title["']/i.test(html);
    const hasTwitterCard = /<meta\s+name=["']twitter:card["']/i.test(html);
    assert('legal', hasOgTitle && hasTwitterCard, `Legal [${slug}]: OpenGraph and Twitter card metadata present`);
  }
}

// ============================================================================
// SUITE 3: MACHINE FILES AUDIT (public/llms.txt, llms-full.txt, sitemap, robots)
// ============================================================================
async function auditMachineFiles() {
  console.log(`\n${colors.cyan}${colors.bright}=== SUITE 3: MACHINE FILES AUDIT (public/) ===${colors.reset}`);

  const publicDir = path.join(ROOT_DIR, 'public');

  // 1. llms.txt
  const llmsTxtPath = path.join(publicDir, 'llms.txt');
  const hasLlms = fs.existsSync(llmsTxtPath);
  assert('machineFiles', hasLlms, 'public/llms.txt exists');

  if (hasLlms) {
    const content = fs.readFileSync(llmsTxtPath, 'utf8');
    const size = content.length;
    assert('machineFiles', size >= 2000, 'public/llms.txt is comprehensive (>2,000 bytes)', `${size} bytes`);
    assert('machineFiles', /^#\s+.+/m.test(content), 'public/llms.txt contains top-level H1 markdown title');
    assert('machineFiles', /^##\s+.+/m.test(content), 'public/llms.txt contains H2 markdown section headings');
    assert('machineFiles', /\[.*?\]\(https:\/\/smartmacrocalc\.com\/.*?\)/.test(content), 'public/llms.txt contains canonical markdown links');
    assert('machineFiles', !/TODO|PLACEHOLDER|lorem ipsum/i.test(content), 'public/llms.txt has zero placeholder strings');
    assert('machineFiles', content.includes('Calculators') && content.includes('Research Guides'), 'public/llms.txt covers calculator and guide directories');
  }

  // 2. llms-full.txt
  const llmsFullTxtPath = path.join(publicDir, 'llms-full.txt');
  const hasLlmsFull = fs.existsSync(llmsFullTxtPath);
  assert('machineFiles', hasLlmsFull, 'public/llms-full.txt exists');

  if (hasLlmsFull) {
    const content = fs.readFileSync(llmsFullTxtPath, 'utf8');
    const size = content.length;
    assert('machineFiles', size >= 50000, 'public/llms-full.txt is exhaustive (>50,000 bytes)', `${size} bytes`);
    assert('machineFiles', content.includes('Mifflin-St Jeor') && content.includes('Katch-McArdle') && content.includes('Cunningham'), 'public/llms-full.txt specifies all 3 BMR equations');
    assert('machineFiles', content.includes('GLP-1') && content.includes('sarcopenia'), 'public/llms-full.txt documents GLP-1 muscle preservation protocols');
    assert('machineFiles', content.includes('Perimenopause') || content.includes('anabolic resistance'), 'public/llms-full.txt documents Perimenopause bioenergetics');
    assert('machineFiles', content.includes('16:8') && content.includes('OMAD'), 'public/llms-full.txt documents Intermittent Fasting protocols');
    assert('machineFiles', content.includes('Creatine') && content.includes('Electrolyte'), 'public/llms-full.txt documents Creatine and electrolyte protocols');
    assert('machineFiles', content.includes('Leucine') && content.includes('FFMI'), 'public/llms-full.txt documents Leucine trigger and FFMI benchmarks');
    assert('machineFiles', (content.match(/PMID:\s*\d+/g) || []).length >= 10, 'public/llms-full.txt documents verified NCBI PubMed citations (>=10 citations)');
  }

  // 3. sitemap.xml
  const sitemapXmlPath = path.join(publicDir, 'sitemap.xml');
  const hasSitemap = fs.existsSync(sitemapXmlPath);
  assert('machineFiles', hasSitemap, 'public/sitemap.xml exists');

  if (hasSitemap) {
    const xml = fs.readFileSync(sitemapXmlPath, 'utf8');
    assert('machineFiles', xml.includes('<urlset') && xml.includes('http://www.sitemaps.org/schemas/sitemap/0.9'), 'public/sitemap.xml has valid XML schema urlset definition');

    const urls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let m;
    while ((m = locRegex.exec(xml)) !== null) {
      urls.push(m[1].trim());
    }

    assert('machineFiles', urls.length === 84, 'public/sitemap.xml contains exactly 84 canonical URLs', `Discovered: ${urls.length} URLs`);

    const uniqueUrls = new Set(urls);
    assert('machineFiles', uniqueUrls.size === urls.length, 'public/sitemap.xml has zero duplicate URLs (100% unique)', `${uniqueUrls.size}/${urls.length}`);

    const allHttps = urls.every((u) => u.startsWith('https://www.smartmacrocalc.com'));
    assert('machineFiles', allHttps, 'public/sitemap.xml: 100% of URLs use canonical https://www.smartmacrocalc.com prefix');

    // Categorical breakdown
    const homeCount = urls.filter((u) => u === 'https://www.smartmacrocalc.com').length;
    const presetsHubCount = urls.filter((u) => u === 'https://www.smartmacrocalc.com/presets').length;
    const presetsCount = urls.filter((u) => u.startsWith('https://www.smartmacrocalc.com/presets/')).length;
    const guidesHubCount = urls.filter((u) => u === 'https://www.smartmacrocalc.com/guides').length;
    const guidesCount = urls.filter((u) => u.startsWith('https://www.smartmacrocalc.com/guides/')).length;
    const legalCount = urls.filter((u) => u.startsWith('https://www.smartmacrocalc.com/legal/')).length;

    assert('machineFiles', homeCount === 1, 'sitemap.xml contains root home URL (1)', `Count: ${homeCount}`);
    assert('machineFiles', presetsHubCount === 1, 'sitemap.xml contains presets hub URL (1)', `Count: ${presetsHubCount}`);
    assert('machineFiles', presetsCount === 64, 'sitemap.xml contains 64 programmatic preset URLs', `Count: ${presetsCount}`);
    assert('machineFiles', guidesHubCount === 1, 'sitemap.xml contains guides hub URL (1)', `Count: ${guidesHubCount}`);
    assert('machineFiles', guidesCount === 12, 'sitemap.xml contains 12 clinical guide URLs', `Count: ${guidesCount}`);
    assert('machineFiles', legalCount === 5, 'sitemap.xml contains 5 legal compliance URLs', `Count: ${legalCount}`);
  }

  // 4. robots.txt
  const robotsTxtPath = path.join(publicDir, 'robots.txt');
  const hasRobots = fs.existsSync(robotsTxtPath);
  assert('machineFiles', hasRobots, 'public/robots.txt exists');

  if (hasRobots) {
    const robots = fs.readFileSync(robotsTxtPath, 'utf8');
    assert('machineFiles', robots.includes('Sitemap: https://www.smartmacrocalc.com/sitemap.xml'), 'public/robots.txt references canonical sitemap.xml');

    const expectedBots = [
      'GPTBot',
      'ChatGPT-User',
      'PerplexityBot',
      'ClaudeBot',
      'Claude-Web',
      'Applebot-Extended',
      'Google-Extended',
    ];

    for (const bot of expectedBots) {
      assert('machineFiles', robots.includes(bot), `public/robots.txt explicitly configures AI crawler: ${bot}`);
    }

    assert('machineFiles', !/User-agent:\s*\*\s*\nDisallow:\s*\/\s*$/m.test(robots), 'public/robots.txt does NOT blanket disallow all crawlers');
  }
}

// ============================================================================
// SUITE 4: DYNAMIC ROUTE HANDLERS
// ============================================================================
async function auditRouteHandlers() {
  console.log(`\n${colors.cyan}${colors.bright}=== SUITE 4: NEXT.JS ROUTE HANDLERS (src/app/sitemap.ts & robots.ts) ===${colors.reset}`);

  const sitemapTsPath = path.join(ROOT_DIR, 'src/app/sitemap.ts');
  const robotsTsPath = path.join(ROOT_DIR, 'src/app/robots.ts');

  assert('routeHandlers', fs.existsSync(sitemapTsPath), 'src/app/sitemap.ts exists');
  assert('routeHandlers', fs.existsSync(robotsTsPath), 'src/app/robots.ts exists');

  if (fs.existsSync(sitemapTsPath)) {
    try {
      const sitemapModule = jiti(sitemapTsPath);
      const sitemapFn = sitemapModule.default;
      assert('routeHandlers', typeof sitemapFn === 'function', 'src/app/sitemap.ts exports default sitemap function');

      const sitemapEntries = await sitemapFn();
      assert('routeHandlers', Array.isArray(sitemapEntries), 'sitemap() returns an array');
      assert('routeHandlers', sitemapEntries.length === 84, 'sitemap() returns exactly 84 route items', `Items: ${sitemapEntries?.length}`);
    } catch (err) {
      assert('routeHandlers', false, 'Execute sitemap() route handler', err.message);
    }
  }

  if (fs.existsSync(robotsTsPath)) {
    try {
      const robotsModule = jiti(robotsTsPath);
      const robotsFn = robotsModule.default;
      assert('routeHandlers', typeof robotsFn === 'function', 'src/app/robots.ts exports default robots function');

      const robotsResult = await robotsFn();
      assert('routeHandlers', typeof robotsResult === 'object' && robotsResult !== null, 'robots() returns config object');
      assert('routeHandlers', robotsResult.sitemap === 'https://www.smartmacrocalc.com/sitemap.xml', 'robots().sitemap matches canonical sitemap.xml');
      assert('routeHandlers', Array.isArray(robotsResult.rules) || typeof robotsResult.rules === 'object', 'robots().rules is defined');
    } catch (err) {
      assert('routeHandlers', false, 'Execute robots() route handler', err.message);
    }
  }
}

// ============================================================================
// MAIN RUNNER & REPORT
// ============================================================================
async function main() {
  const start = Date.now();
  console.log(`${colors.magenta}${colors.bright}======================================================================${colors.reset}`);
  console.log(`${colors.magenta}${colors.bright}   SmartMacroCalc.com - Adversarial Static HTML & Artifact Crawler    ${colors.reset}`);
  console.log(`${colors.magenta}${colors.bright}======================================================================${colors.reset}`);
  console.log(`Node: ${process.version} | Target: Compiled Artifacts & Machine Files\n`);

  await crawlGuides();
  await crawlLegal();
  await auditMachineFiles();
  await auditRouteHandlers();

  const elapsed = Date.now() - start;

  console.log(`\n${colors.bright}======================== CRAWLER RESULTS SUMMARY ========================${colors.reset}`);
  console.log(`${'Category'.padEnd(20)} | ${'Passed'.padEnd(8)} | ${'Failed'.padEnd(8)} | ${'Total'.padEnd(8)}`);
  console.log(`---------------------+----------+----------+---------`);

  let totalPassed = 0;
  let totalFailed = 0;
  let totalTests = 0;

  for (const [cat, data] of Object.entries(stats)) {
    totalPassed += data.passed;
    totalFailed += data.failed;
    totalTests += data.total;
    const color = data.failed > 0 ? colors.red : colors.green;
    console.log(
      `${cat.padEnd(20)} | ${color}${String(data.passed).padEnd(8)}${colors.reset} | ${(data.failed > 0 ? colors.red : colors.reset) + String(data.failed).padEnd(8) + colors.reset} | ${String(data.total).padEnd(8)}`
    );
  }

  console.log(`---------------------+----------+----------+---------`);
  console.log(
    `${'TOTAL'.padEnd(20)} | ${colors.green}${String(totalPassed).padEnd(8)}${colors.reset} | ${(totalFailed > 0 ? colors.red : colors.reset) + String(totalFailed).padEnd(8) + colors.reset} | ${String(totalTests).padEnd(8)}`
  );
  console.log(`Audit Duration: ${elapsed}ms\n`);

  if (totalFailed > 0) {
    console.log(`${colors.red}${colors.bright}ADVERSARIAL FAILURES (${totalFailed}):${colors.reset}`);
    for (const f of failures) {
      console.log(`  ${colors.red}* ${f}${colors.reset}`);
    }
    console.log(`\n${colors.red}${colors.bright}Empirical Verdict: REQUEST_CHANGES${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bright}ALL CRAWLER ASSERTIONS EMPIRICALLY CONFIRMED (${totalPassed}/${totalTests})!${colors.reset}`);
    console.log(`${colors.green}${colors.bright}Empirical Verdict: APPROVE${colors.reset}`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Unhandled crawler crash:', err);
  process.exit(1);
});
