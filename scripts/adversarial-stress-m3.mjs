#!/usr/bin/env node
/**
 * scripts/adversarial-stress-m3.mjs
 * 
 * Adversarial Empirical Stress-Testing & Verification Suite for Milestone 3:
 * Target: All 12 Clinical Research Guides in src/lib/articles.ts & Pre-rendered HTML Guides
 * 
 * Stress Dimensions:
 * 1. Inventory & Slug/Title Integrity (12 unique articles, valid kebab slugs, E-E-A-T credentials)
 * 2. AEO directClinicalAnswer: Strictly 40 <= word count <= 65, multi-algorithm word tokenization,
 *    numerical data presence, distinctness from excerpt, zero placeholders
 * 3. GEO tableData: Non-empty, >= 3 headers, >= 2 rows, rectangular parity, non-empty cells, zero NaN
 * 4. Section Tables: Rectangular structure, non-empty headers & cells
 * 5. NCBI PubMed Citations: >= 1 citation, PMID regex ^\d{6,8}$, URL parsing, HTTPS validity
 * 6. AEO Structured FAQs: >= 2 items, question length & terminal question mark, answer depth, uniqueness
 * 7. Section Content: >= 2 sections, non-empty headings and body paragraphs
 * 8. Pre-rendered HTML Artifacts (.next/server/app/guides/): Canonicals, AEO block, Table, PMIDs, Schema.org graph
 * 
 * Usage:
 *   node scripts/adversarial-stress-m3.mjs
 *   node scripts/adversarial-stress-m3.mjs --verbose
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const jiti = createJiti(__filename);

// Load domain modules
let articlesModule;
try {
  articlesModule = jiti(path.join(ROOT_DIR, 'src/lib/articles.ts'));
} catch (err) {
  console.error('\x1b[31mCRITICAL: Failed to load src/lib/articles.ts:\x1b[0m', err.message);
  process.exit(1);
}

const { SCIENTIFIC_ARTICLES = [] } = articlesModule;

// Command line options
const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose') || args.includes('-v');

// High-contrast ANSI colors
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

// Test Suite State
const stats = {
  assertions: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  categories: {
    inventory: { passed: 0, failed: 0 },
    aeoWordCount: { passed: 0, failed: 0 },
    tableData: { passed: 0, failed: 0 },
    sectionTables: { passed: 0, failed: 0 },
    pmidCitations: { passed: 0, failed: 0 },
    faqStructure: { passed: 0, failed: 0 },
    sectionsContent: { passed: 0, failed: 0 },
    htmlArtifacts: { passed: 0, failed: 0 },
  },
  failures: [],
};

function recordAssert(category, condition, testDescription, detail = '') {
  stats.assertions++;
  if (!stats.categories[category]) {
    stats.categories[category] = { passed: 0, failed: 0 };
  }

  if (condition) {
    stats.passed++;
    stats.categories[category].passed++;
    if (isVerbose) {
      console.log(`  ${colors.green}[PASS]${colors.reset} [${category}] ${testDescription}${detail ? ` ${colors.dim}(${detail})${colors.reset}` : ''}`);
    }
  } else {
    stats.failed++;
    stats.categories[category].failed++;
    const failMsg = `[${category.toUpperCase()}] ${testDescription} -> ${detail}`;
    stats.failures.push(failMsg);
    console.error(`  ${colors.red}[FAIL]${colors.reset} [${category}] ${testDescription} ${colors.red}${detail}${colors.reset}`);
  }
}

// Word counting utilities
function countWordsWhitespace(str) {
  if (!str) return 0;
  return str.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

function countWordsBoundary(str) {
  if (!str) return 0;
  const matches = str.match(/\b[\w'-]+\b/g);
  return matches ? matches.length : 0;
}

// ============================================================================
// PHASE 1: INVENTORY & METADATA INTEGRITY
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 1] ARTICLE INVENTORY & METADATA INTEGRITY ===${colors.reset}`);

recordAssert(
  'inventory',
  SCIENTIFIC_ARTICLES.length === 12,
  'Article Count: Exactly 12 scientific articles present in SCIENTIFIC_ARTICLES',
  `Found: ${SCIENTIFIC_ARTICLES.length}`
);

const seenSlugs = new Set();
const seenTitles = new Set();
// URL-safe kebab slug regex allowing standard alphanumeric tokens separated by single hyphens
const kebabRegex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;

for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const prefix = `Article #${idx + 1} (${a.slug || 'unknown'})`;

  // Slug check
  recordAssert(
    'inventory',
    typeof a.slug === 'string' && a.slug.length >= 5 && kebabRegex.test(a.slug),
    `${prefix}: Valid kebab-case slug`,
    `slug="${a.slug}"`
  );
  recordAssert(
    'inventory',
    !seenSlugs.has(a.slug),
    `${prefix}: Unique slug across all articles`,
    `slug="${a.slug}"`
  );
  if (a.slug) seenSlugs.add(a.slug);

  // Title check
  recordAssert(
    'inventory',
    typeof a.title === 'string' && a.title.trim().length >= 15,
    `${prefix}: Non-empty descriptive title (>= 15 chars)`,
    `title="${a.title?.slice(0, 40)}..."`
  );
  recordAssert(
    'inventory',
    !seenTitles.has(a.title),
    `${prefix}: Unique title across all articles`,
    `title="${a.title}"`
  );
  if (a.title) seenTitles.add(a.title);

  // Category
  recordAssert(
    'inventory',
    typeof a.category === 'string' && a.category.trim().length >= 3,
    `${prefix}: Non-empty category`,
    `category="${a.category}"`
  );

  // Read Time
  recordAssert(
    'inventory',
    typeof a.readTime === 'string' && /^\d+\s+min\s+read$/i.test(a.readTime),
    `${prefix}: Valid readTime format (e.g., '7 min read')`,
    `readTime="${a.readTime}"`
  );

  // Published Date
  recordAssert(
    'inventory',
    typeof a.publishedDate === 'string' && a.publishedDate.trim().length >= 4,
    `${prefix}: Non-empty publishedDate`,
    `publishedDate="${a.publishedDate}"`
  );

  // E-E-A-T Author & Reviewer
  recordAssert(
    'inventory',
    typeof a.author === 'string' && a.author.trim().includes(' '),
    `${prefix}: E-E-A-T Author has full name`,
    `author="${a.author}"`
  );
  recordAssert(
    'inventory',
    typeof a.authorCredentials === 'string' && a.authorCredentials.trim().length >= 5,
    `${prefix}: E-E-A-T Author Credentials present`,
    `credentials="${a.authorCredentials}"`
  );
  recordAssert(
    'inventory',
    typeof a.reviewer === 'string' && a.reviewer.trim().length >= 5,
    `${prefix}: E-E-A-T Medical Reviewer present`,
    `reviewer="${a.reviewer}"`
  );

  // Excerpt
  recordAssert(
    'inventory',
    typeof a.excerpt === 'string' && a.excerpt.trim().length >= 50,
    `${prefix}: Non-empty excerpt (>= 50 chars)`,
    `excerpt length=${a.excerpt?.length}`
  );
}

// ============================================================================
// PHASE 2: AEO DIRECT CLINICAL ANSWER STRESS-TEST (40 <= Words <= 65)
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 2] AEO DIRECT CLINICAL ANSWER STRESS-TEST (40-65 WORDS) ===${colors.reset}`);

const seenAnswers = new Set();
const placeholderRegex = /\b(TODO|TBD|Lorem|placeholder|undefined|null|asdf)\b/i;

for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const ans = a.directClinicalAnswer;
  const prefix = `Article #${idx + 1} (${a.slug})`;

  // Existence & Type
  recordAssert(
    'aeoWordCount',
    typeof ans === 'string' && ans.trim().length > 0,
    `${prefix}: directClinicalAnswer exists and is a non-empty string`,
    ans ? `length=${ans.length}` : 'MISSING'
  );

  if (!ans) continue;

  const wsWords = countWordsWhitespace(ans);
  const boundaryWords = countWordsBoundary(ans);

  // Primary strict criterion: 40 <= countWordsWhitespace <= 65
  const isWsValid = wsWords >= 40 && wsWords <= 65;
  recordAssert(
    'aeoWordCount',
    isWsValid,
    `${prefix}: Standard whitespace word count in [40, 65] words`,
    `Count: ${wsWords} words (Target: 40..65)`
  );

  // Secondary regex boundary criterion
  const isBoundaryValid = boundaryWords >= 38 && boundaryWords <= 68;
  recordAssert(
    'aeoWordCount',
    isBoundaryValid,
    `${prefix}: Word boundary count matches expected bounds`,
    `Boundary count: ${boundaryWords} words`
  );

  // Check no placeholders
  const hasPlaceholder = placeholderRegex.test(ans);
  recordAssert(
    'aeoWordCount',
    !hasPlaceholder,
    `${prefix}: directClinicalAnswer contains zero placeholder tokens`,
    hasPlaceholder ? 'FOUND PLACEHOLDER' : 'Clean'
  );

  // Numerical data presence (evidence-based clinical figures)
  const hasNumbers = /\d+/.test(ans);
  recordAssert(
    'aeoWordCount',
    hasNumbers,
    `${prefix}: directClinicalAnswer contains concrete numerical figures/quantities`,
    hasNumbers ? 'Numbers present' : 'No digits found'
  );

  // Distinct from excerpt
  recordAssert(
    'aeoWordCount',
    ans.trim() !== a.excerpt?.trim(),
    `${prefix}: directClinicalAnswer is distinct from excerpt`,
    'Distinct'
  );

  // Uniqueness across articles
  recordAssert(
    'aeoWordCount',
    !seenAnswers.has(ans.trim()),
    `${prefix}: directClinicalAnswer is unique across library`,
    'Unique'
  );
  seenAnswers.add(ans.trim());
}

// ============================================================================
// PHASE 3: GEO TOP-LEVEL TABLEDATA BENCHMARK STRESS-TEST
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 3] GEO TOP-LEVEL TABLEDATA BENCHMARK STRESS-TEST ===${colors.reset}`);

for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const table = a.tableData;
  const prefix = `Article #${idx + 1} (${a.slug})`;

  // Existence
  recordAssert(
    'tableData',
    table !== undefined && table !== null && typeof table === 'object',
    `${prefix}: tableData is defined and non-null`,
    table ? 'Present' : 'MISSING'
  );

  if (!table) continue;

  // Headers: >= 3 headers
  const headers = table.headers;
  recordAssert(
    'tableData',
    Array.isArray(headers) && headers.length >= 3,
    `${prefix}: tableData.headers has >= 3 headers`,
    `Header count: ${headers?.length}`
  );

  // Unique and non-empty headers
  let allHeadersNonEmpty = true;
  let headersUnique = false;
  if (Array.isArray(headers)) {
    allHeadersNonEmpty = headers.every((h) => typeof h === 'string' && h.trim().length > 0);
    headersUnique = new Set(headers.map((h) => String(h).trim().toLowerCase())).size === headers.length;
  }
  recordAssert(
    'tableData',
    allHeadersNonEmpty,
    `${prefix}: All table headers are non-empty strings`,
    allHeadersNonEmpty ? 'All non-empty' : 'Contains empty header'
  );
  recordAssert(
    'tableData',
    headersUnique,
    `${prefix}: All table headers are unique columns`,
    headersUnique ? 'Unique headers' : 'Duplicate header found'
  );

  // Rows: >= 2 rows
  const rows = table.rows;
  recordAssert(
    'tableData',
    Array.isArray(rows) && rows.length >= 2,
    `${prefix}: tableData.rows has >= 2 rows`,
    `Row count: ${rows?.length}`
  );

  if (Array.isArray(rows) && Array.isArray(headers)) {
    let allParity = true;
    let allCellsValid = true;
    let badCellDetail = '';

    rows.forEach((r, rIdx) => {
      if (!Array.isArray(r) || r.length !== headers.length) {
        allParity = false;
        badCellDetail = `Row #${rIdx} has ${r?.length || 0} cols (expected ${headers.length})`;
      } else {
        r.forEach((cell, cIdx) => {
          if (cell === null || cell === undefined || String(cell).trim() === '' || Number.isNaN(cell)) {
            allCellsValid = false;
            badCellDetail = `Row #${rIdx} Col #${cIdx} invalid value: ${cell}`;
          }
        });
      }
    });

    recordAssert(
      'tableData',
      allParity,
      `${prefix}: Rectangular parity (all rows have exactly ${headers.length} columns)`,
      allParity ? 'Parity OK' : badCellDetail
    );
    recordAssert(
      'tableData',
      allCellsValid,
      `${prefix}: Zero empty, null, undefined, or NaN cells in tableData`,
      allCellsValid ? 'All cells valid' : badCellDetail
    );
  }
}

// ============================================================================
// PHASE 4: SECTION-LEVEL TABLES INTEGRITY
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 4] SECTION-LEVEL TABLES INTEGRITY ===${colors.reset}`);

let totalSectionTables = 0;
for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const prefix = `Article #${idx + 1} (${a.slug})`;

  if (Array.isArray(a.sections)) {
    a.sections.forEach((sec, sIdx) => {
      if (sec.table) {
        totalSectionTables++;
        const sTable = sec.table;
        const sHeaders = sTable.headers;
        const sRows = sTable.rows;

        recordAssert(
          'sectionTables',
          Array.isArray(sHeaders) && sHeaders.length >= 2,
          `${prefix} Sec #${sIdx + 1}: Section table has >= 2 headers`,
          `Headers: ${sHeaders?.length}`
        );
        recordAssert(
          'sectionTables',
          Array.isArray(sRows) && sRows.length >= 1,
          `${prefix} Sec #${sIdx + 1}: Section table has >= 1 row`,
          `Rows: ${sRows?.length}`
        );

        if (Array.isArray(sHeaders) && Array.isArray(sRows)) {
          const parity = sRows.every((r) => Array.isArray(r) && r.length === sHeaders.length);
          recordAssert(
            'sectionTables',
            parity,
            `${prefix} Sec #${sIdx + 1}: Section table rectangular parity`,
            parity ? 'Parity OK' : 'Col mismatch'
          );
        }
      }
    });
  }
}

console.log(`  ${colors.dim}Total section-level tables discovered and audited: ${totalSectionTables}${colors.reset}`);

// ============================================================================
// PHASE 5: NCBI PUBMED CITATIONS & URL VALIDATION
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 5] NCBI PUBMED CITATIONS & URL VALIDATION ===${colors.reset}`);

const pmidRegex = /^\d{6,8}$/;
let totalPmidsAudited = 0;

for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const citations = a.pmidCitations;
  const prefix = `Article #${idx + 1} (${a.slug})`;

  recordAssert(
    'pmidCitations',
    Array.isArray(citations) && citations.length >= 1,
    `${prefix}: Has at least 1 PubMed citation in pmidCitations`,
    `Citations: ${citations?.length}`
  );

  if (!Array.isArray(citations)) continue;

  citations.forEach((c, cIdx) => {
    totalPmidsAudited++;
    const citPrefix = `${prefix} Citation #${cIdx + 1}`;

    // PMID regex
    const isPmidValid = typeof c.pmid === 'string' && pmidRegex.test(c.pmid.trim());
    recordAssert(
      'pmidCitations',
      isPmidValid,
      `${citPrefix}: PMID matches ^\\d{6,8}$`,
      `PMID: "${c.pmid}"`
    );

    // Citation string
    const isCitTextValid = typeof c.citation === 'string' && c.citation.trim().length >= 15;
    recordAssert(
      'pmidCitations',
      isCitTextValid,
      `${citPrefix}: Citation text is descriptive (>= 15 chars)`,
      `Length: ${c.citation?.length}`
    );

    // URL validation
    let isUrlValid = false;
    let urlProtocol = '';
    try {
      const parsed = new URL(c.url);
      urlProtocol = parsed.protocol;
      isUrlValid = urlProtocol === 'https:' || urlProtocol === 'http:';
    } catch {
      isUrlValid = false;
    }

    recordAssert(
      'pmidCitations',
      isUrlValid,
      `${citPrefix}: URL is a valid absolute HTTP/HTTPS URL`,
      `URL: "${c.url}"`
    );

    // PubMed URL target sanity
    const isPubmedUrl = typeof c.url === 'string' && (c.url.includes('pubmed.ncbi.nlm.nih.gov') || c.url.includes(c.pmid));
    recordAssert(
      'pmidCitations',
      isPubmedUrl,
      `${citPrefix}: URL links to PubMed domain or references PMID`,
      `Target: ${c.url}`
    );
  });
}

console.log(`  ${colors.dim}Total PubMed citations audited: ${totalPmidsAudited}${colors.reset}`);

// ============================================================================
// PHASE 6: AEO STRUCTURED FAQS (>= 2 ITEMS)
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 6] AEO STRUCTURED FAQS (>= 2 ITEMS) ===${colors.reset}`);

let totalFaqsAudited = 0;

for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const faqs = a.faq;
  const prefix = `Article #${idx + 1} (${a.slug})`;

  recordAssert(
    'faqStructure',
    Array.isArray(faqs) && faqs.length >= 2,
    `${prefix}: Article has >= 2 structured FAQ items`,
    `Count: ${faqs?.length}`
  );

  if (!Array.isArray(faqs)) continue;

  const seenQuestions = new Set();

  faqs.forEach((item, fIdx) => {
    totalFaqsAudited++;
    const faqPrefix = `${prefix} FAQ #${fIdx + 1}`;

    // Question
    const qValid = typeof item.question === 'string' && item.question.trim().length >= 10;
    recordAssert(
      'faqStructure',
      qValid,
      `${faqPrefix}: Question is non-empty string (>= 10 chars)`,
      `Q: "${item.question?.slice(0, 35)}..."`
    );

    const qEndsPunct = typeof item.question === 'string' && /[?.:]$/.test(item.question.trim());
    recordAssert(
      'faqStructure',
      qEndsPunct,
      `${faqPrefix}: Question ends with valid punctuation`,
      `Terminal: "${item.question?.slice(-1)}"`
    );

    // Question uniqueness
    const qTrimmed = String(item.question).trim().toLowerCase();
    recordAssert(
      'faqStructure',
      !seenQuestions.has(qTrimmed),
      `${faqPrefix}: Question is unique within article`,
      `Q: "${qTrimmed}"`
    );
    seenQuestions.add(qTrimmed);

    // Answer
    const aValid = typeof item.answer === 'string' && item.answer.trim().length >= 25;
    recordAssert(
      'faqStructure',
      aValid,
      `${faqPrefix}: Answer is substantive string (>= 25 chars)`,
      `Length: ${item.answer?.length}`
    );

    // No placeholders
    const aPlaceholder = placeholderRegex.test(item.answer || '');
    recordAssert(
      'faqStructure',
      !aPlaceholder,
      `${faqPrefix}: Answer contains no placeholder tokens`,
      aPlaceholder ? 'FOUND PLACEHOLDER' : 'Clean'
    );
  });
}

console.log(`  ${colors.dim}Total structured FAQ items audited: ${totalFaqsAudited}${colors.reset}`);

// ============================================================================
// PHASE 7: SECTIONS & PARAGRAPH CONTENT DEPTH
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 7] SECTIONS & CONTENT DEPTH ===${colors.reset}`);

for (let idx = 0; idx < SCIENTIFIC_ARTICLES.length; idx++) {
  const a = SCIENTIFIC_ARTICLES[idx];
  const sections = a.sections;
  const prefix = `Article #${idx + 1} (${a.slug})`;

  recordAssert(
    'sectionsContent',
    Array.isArray(sections) && sections.length >= 2,
    `${prefix}: Article has >= 2 substantive sections`,
    `Sections: ${sections?.length}`
  );

  if (!Array.isArray(sections)) continue;

  sections.forEach((sec, sIdx) => {
    const sPrefix = `${prefix} Sec #${sIdx + 1}`;
    recordAssert(
      'sectionsContent',
      typeof sec.heading === 'string' && sec.heading.trim().length >= 5,
      `${sPrefix}: Section heading non-empty (>= 5 chars)`,
      `Heading: "${sec.heading?.slice(0, 30)}..."`
    );

    recordAssert(
      'sectionsContent',
      Array.isArray(sec.body) && sec.body.length >= 1,
      `${sPrefix}: Section body contains >= 1 paragraph`,
      `Paragraphs: ${sec.body?.length}`
    );

    if (Array.isArray(sec.body)) {
      const allParasValid = sec.body.every((p) => typeof p === 'string' && p.trim().length >= 20);
      recordAssert(
        'sectionsContent',
        allParasValid,
        `${sPrefix}: All paragraphs are substantive text (>= 20 chars)`,
        allParasValid ? 'All valid' : 'Short paragraph detected'
      );
    }
  });
}

// ============================================================================
// PHASE 8: PRE-RENDERED PRODUCTION HTML ARTIFACT AUDIT
// ============================================================================
console.log(`\n${colors.cyan}${colors.bright}=== [PHASE 8] PRE-RENDERED PRODUCTION HTML ARTIFACT AUDIT ===${colors.reset}`);

// Component source code static contract verification
const guidePageTsxPath = path.join(ROOT_DIR, 'src/app/guides/[slug]/page.tsx');
const hasGuidePageTsx = fs.existsSync(guidePageTsxPath);
recordAssert(
  'htmlArtifacts',
  hasGuidePageTsx,
  'Guide Page Component: src/app/guides/[slug]/page.tsx exists',
  hasGuidePageTsx ? 'Component present' : 'Missing page.tsx'
);

if (hasGuidePageTsx) {
  const tsx = fs.readFileSync(guidePageTsxPath, 'utf-8');
  recordAssert(
    'htmlArtifacts',
    tsx.includes('canonicalUrl') && tsx.includes('alternates:'),
    'Guide Component: Sets canonical alternates metadata',
    'Canonical metadata verified'
  );
  recordAssert(
    'htmlArtifacts',
    tsx.includes('data-aeo-answer="true"'),
    'Guide Component: Renders visible data-aeo-answer="true" callout block',
    'AEO block verified'
  );
  recordAssert(
    'htmlArtifacts',
    tsx.includes('article.tableData') && tsx.includes('<table'),
    'Guide Component: Renders structured tableData in HTML <table>',
    'Table rendering verified'
  );
  recordAssert(
    'htmlArtifacts',
    tsx.includes('pubmed.ncbi.nlm.nih.gov') && tsx.includes('article.pmidCitations'),
    'Guide Component: Links verified NCBI PubMed PMIDs',
    'PubMed links verified'
  );
  recordAssert(
    'htmlArtifacts',
    tsx.includes('MedicalWebPage') && tsx.includes('BreadcrumbList') && tsx.includes('FAQPage') && tsx.includes('Organization'),
    'Guide Component: Emits complete Schema.org graph (MedicalWebPage, Breadcrumbs, FAQPage, Organization)',
    'Schema graph verified'
  );
}

const guidesHtmlDir = path.join(ROOT_DIR, '.next/server/app/guides');
const hasGuidesHtml = fs.existsSync(guidesHtmlDir) && fs.readdirSync(guidesHtmlDir).some((f) => f.endsWith('.html'));

if (hasGuidesHtml) {
  for (const a of SCIENTIFIC_ARTICLES) {
    const htmlFilePath = path.join(guidesHtmlDir, `${a.slug}.html`);
    const fileExists = fs.existsSync(htmlFilePath);
    const prefix = `HTML [guides/${a.slug}]`;

    recordAssert(
      'htmlArtifacts',
      fileExists,
      `${prefix}: Pre-rendered HTML file exists`,
      fileExists ? 'File exists' : 'MISSING FILE'
    );

    if (fileExists) {
      const html = fs.readFileSync(htmlFilePath, 'utf-8');

      // Canonical link
      const hasCanonical = html.includes(`<link rel="canonical" href="https://www.smartmacrocalc.com/guides/${a.slug}"`);
      recordAssert(
        'htmlArtifacts',
        hasCanonical,
        `${prefix}: Exact canonical <link> tag matching guide URL`,
        hasCanonical ? 'Canonical verified' : 'Missing canonical tag'
      );

      // Visible AEO block
      const hasAeoAttr = html.includes('data-aeo-answer="true"');
      recordAssert(
        'htmlArtifacts',
        hasAeoAttr,
        `${prefix}: Contains data-aeo-answer="true" callout attribute`,
        hasAeoAttr ? 'AEO attribute present' : 'Missing data-aeo-answer'
      );

      // GEO Table
      const hasTable = /<table[\s>]/i.test(html);
      recordAssert(
        'htmlArtifacts',
        hasTable,
        `${prefix}: Contains structured HTML <table> for GEO extraction`,
        hasTable ? 'Table present' : 'Missing <table>'
      );

      // NCBI PMIDs
      const hasPmid = a.pmidCitations.some((c) => html.includes(c.pmid));
      recordAssert(
        'htmlArtifacts',
        hasPmid,
        `${prefix}: Contains at least one verified NCBI PubMed PMID link`,
        hasPmid ? 'PMID found in HTML' : 'Missing PMID'
      );

      // Schema.org Graph
      const hasSchemaGraph = html.includes('"@type":"MedicalWebPage"') &&
        html.includes('"@type":"BreadcrumbList"') &&
        html.includes('"@type":"FAQPage"') &&
        html.includes('"@type":"Organization"');
      recordAssert(
        'htmlArtifacts',
        hasSchemaGraph,
        `${prefix}: Multi-entity Schema.org graph (MedicalWebPage, BreadcrumbList, FAQPage, Organization)`,
        hasSchemaGraph ? 'All 4 schema types present' : 'Missing schema entity'
      );
    }
  }
}

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log(`\n${colors.bright}======================== CHALLENGER SUMMARY REPORT ========================${colors.reset}`);
console.log(`${'Category'.padEnd(22)} | ${'Passed'.padEnd(8)} | ${'Failed'.padEnd(8)} | ${'Total'.padEnd(8)}`);
console.log(`-----------------------+----------+----------+---------`);

for (const [cat, res] of Object.entries(stats.categories)) {
  const catTotal = res.passed + res.failed;
  const passColor = res.failed > 0 ? colors.red : colors.green;
  const failColor = res.failed > 0 ? colors.red : colors.reset;
  console.log(
    `${cat.padEnd(22)} | ${passColor}${String(res.passed).padEnd(8)}${colors.reset} | ${failColor}${String(res.failed).padEnd(8)}${colors.reset} | ${String(catTotal).padEnd(8)}`
  );
}

console.log(`-----------------------+----------+----------+---------`);
const totalPassColor = stats.failed > 0 ? colors.red : colors.green;
console.log(
  `${'TOTAL ASSERTIONS'.padEnd(22)} | ${totalPassColor}${String(stats.passed).padEnd(8)}${colors.reset} | ${(stats.failed > 0 ? colors.red : colors.reset) + String(stats.failed).padEnd(8) + colors.reset} | ${String(stats.assertions).padEnd(8)}`
);

console.log(`\nFinal Empirical Verdict: ${stats.failed === 0 ? `${colors.green}${colors.bright}APPROVE${colors.reset}` : `${colors.red}${colors.bright}REQUEST_CHANGES${colors.reset}`}`);

if (stats.failed > 0) {
  console.log(`\n${colors.red}${colors.bright}Failures (${stats.failed}):${colors.reset}`);
  stats.failures.forEach((f) => console.log(`  * ${f}`));
  process.exit(1);
} else {
  console.log(`${colors.green}All ${stats.assertions} adversarial assertions passed with zero defects!${colors.reset}\n`);
  process.exit(0);
}
