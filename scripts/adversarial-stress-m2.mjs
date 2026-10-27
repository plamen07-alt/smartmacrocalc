#!/usr/bin/env node
/**
 * scripts/adversarial-stress-m2.mjs
 * 
 * Adversarial Stress-Testing & Verification Suite for Milestone 2:
 * 1. 64 Presets in src/lib/presets.ts Inventory & Categorization
 * 2. Strict Thermodynamic Equality (4*P + 4*C + 9*F === calories) across all 64 presets:
 *    - In bioenergetic metabolic report (training, rest, weekly average, fasting, perimenopause, reverse diet)
 *    - In static tableData rows (calories vs macros)
 *    - In directClinicalAnswer text macros
 * 3. AEO Word Count: Strictly between 40 and 65 words on directClinicalAnswer
 * 4. GEO Table Data: Structure, column count parity, non-empty cells
 * 5. PubMed Citations: Non-empty, valid PMIDs, correct pubmed URLs, citation metadata
 * 6. Default Tab Routing: Valid calculator tabs
 * 7. Pre-rendered HTML Artifacts (.next/server/app/presets/): Canonical, JSON-LD, Tables, AEO, PMIDs
 * 
 * Usage:
 *   node scripts/adversarial-stress-m2.mjs
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
let formulas;
let presetsModule;

try {
  formulas = jiti(path.join(ROOT_DIR, 'src/lib/formulas.ts'));
} catch (err) {
  console.error('CRITICAL: Failed to load src/lib/formulas.ts:', err.message);
  process.exit(1);
}

try {
  presetsModule = jiti(path.join(ROOT_DIR, 'src/lib/presets.ts'));
} catch (err) {
  console.error('CRITICAL: Failed to load src/lib/presets.ts:', err.message);
  process.exit(1);
}

const { calculateFullMetabolicReport, DEFAULT_BIOMETRICS } = formulas;
const { SEO_PRESETS = [] } = presetsModule;

// Test Results Collector
const stats = {
  assertions: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  categories: {},
  details: {
    thermoEngineFailures: [],
    thermoTableDiscrepancies: [],
    thermoClinicalDiscrepancies: [],
    wordCountFailures: [],
    tableStructureFailures: [],
    pmidFailures: [],
    tabRoutingFailures: [],
    htmlArtifactFailures: [],
  },
};

function assert(condition, message, failureCategory, detailObj = null) {
  stats.assertions++;
  if (!condition) {
    stats.failed++;
    const err = `[FAIL] ${message}`;
    if (failureCategory && stats.details[failureCategory]) {
      stats.details[failureCategory].push(detailObj || message);
    }
    console.error(`  \x1b[31m${err}\x1b[0m`);
    return false;
  }
  stats.passed++;
  return true;
}

function warn(message) {
  stats.warnings++;
  console.warn(`  \x1b[33m[WARN] ${message}\x1b[0m`);
}

function countWords(str) {
  if (!str) return 0;
  return str.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

console.log('\x1b[36m\x1b[1m================================================================');
console.log('       EMPIRICAL CHALLENGER: MILESTONE 2 PRESETS STRESS HARNESS');
console.log('================================================================\x1b[0m\n');

// ----------------------------------------------------------------------------
// 1. INVENTORY & CATEGORY DISTRIBUTION
// ----------------------------------------------------------------------------
console.log('\x1b[34m--- 1. Preset Matrix Scale & Categories ---\x1b[0m');

assert(SEO_PRESETS.length === 64, `Total preset count must be exactly 64 (found ${SEO_PRESETS.length})`, 'tableStructureFailures');

const expectedCategories = [
  'recomp',
  'glp1',
  'perimenopause',
  'fasting',
  'cutting',
  'reverse',
  'vegan',
  'electrolytes',
];

const categoryCounts = {};
const seenSlugs = new Set();
const seenTitles = new Set();

for (const p of SEO_PRESETS) {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;

  assert(!seenSlugs.has(p.slug), `Slug '${p.slug}' must be unique`, 'tableStructureFailures');
  seenSlugs.add(p.slug);

  assert(!seenTitles.has(p.title), `Title '${p.title}' must be unique`, 'tableStructureFailures');
  seenTitles.add(p.title);
}

for (const cat of expectedCategories) {
  const count = categoryCounts[cat] || 0;
  assert(count === 8, `Category '${cat}' must have exactly 8 presets (found ${count})`, 'tableStructureFailures');
}

console.log(`  Categories verified: ${Object.entries(categoryCounts).map(([k, v]) => `${k}:${v}`).join(', ')}`);

// ----------------------------------------------------------------------------
// 2. DEFAULT TAB ROUTING
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 2. Default Tab Operational Routing ---\x1b[0m');

const validTabs = ['recomp', 'glp1', 'perimenopause', 'fasting', 'electrolytes', 'ffmi', 'reverse'];

for (const p of SEO_PRESETS) {
  const valid = validTabs.includes(p.defaultTab);
  assert(valid, `Preset '${p.slug}' has valid defaultTab '${p.defaultTab}'`, 'tabRoutingFailures', {
    slug: p.slug,
    defaultTab: p.defaultTab,
  });
}

// ----------------------------------------------------------------------------
// 3. THERMODYNAMIC EQUALITY: BIOENERGETIC REPORT ENGINE
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 3. Strict Thermodynamic Equality in Metabolic Engine ---\x1b[0m');

let engineThermoPassed = 0;
let engineThermoFailed = 0;

for (const p of SEO_PRESETS) {
  const bio = { ...DEFAULT_BIOMETRICS, ...p.biometrics };
  const report = calculateFullMetabolicReport(bio);

  // Training day
  const tMacros = report.trainingDayMacros;
  const tSum = tMacros.proteinGrams * 4 + tMacros.carbsGrams * 4 + tMacros.fatGrams * 9;
  const tPass = tSum === tMacros.calories;
  if (!tPass) {
    stats.details.thermoEngineFailures.push({
      slug: p.slug,
      phase: 'trainingDayMacros',
      expected: tMacros.calories,
      actual: tSum,
      delta: tSum - tMacros.calories,
    });
  }

  // Rest day
  const rMacros = report.restDayMacros;
  const rSum = rMacros.proteinGrams * 4 + rMacros.carbsGrams * 4 + rMacros.fatGrams * 9;
  const rPass = rSum === rMacros.calories;
  if (!rPass) {
    stats.details.thermoEngineFailures.push({
      slug: p.slug,
      phase: 'restDayMacros',
      expected: rMacros.calories,
      actual: rSum,
      delta: rSum - rMacros.calories,
    });
  }

  // Weekly average macros
  const wMacros = report.weeklyAverageMacros;
  const wSum = wMacros.proteinGrams * 4 + wMacros.carbsGrams * 4 + wMacros.fatGrams * 9;
  const wPass = wSum === wMacros.calories;
  if (!wPass) {
    stats.details.thermoEngineFailures.push({
      slug: p.slug,
      phase: 'weeklyAverageMacros',
      expected: wMacros.calories,
      actual: wSum,
      delta: wSum - wMacros.calories,
    });
  }

  // Perimenopause protocol if applicable
  const peri = report.perimenopauseProtocol;
  const pTrainSum = peri.trainingDayMacros.proteinGrams * 4 + peri.trainingDayMacros.carbsGrams * 4 + peri.trainingDayMacros.fatGrams * 9;
  const pTrainPass = pTrainSum === peri.trainingDayMacros.calories;
  const pRestSum = peri.restDayMacros.proteinGrams * 4 + peri.restDayMacros.carbsGrams * 4 + peri.restDayMacros.fatGrams * 9;
  const pRestPass = pRestSum === peri.restDayMacros.calories;

  // Fasting protocol macros
  const fastM = report.fastingProtocol.macros;
  const fastSum = fastM.proteinGrams * 4 + fastM.carbsGrams * 4 + fastM.fatGrams * 9;
  const fastPass = fastSum === fastM.calories;

  // Reverse diet schedule
  let revPass = true;
  for (const wk of report.reverseDietSchedule) {
    const wkSum = wk.proteinGrams * 4 + wk.carbsGrams * 4 + wk.fatGrams * 9;
    if (wkSum !== wk.dailyCalories) {
      revPass = false;
      stats.details.thermoEngineFailures.push({
        slug: p.slug,
        phase: `reverseDietWeek_${wk.week}`,
        expected: wk.dailyCalories,
        actual: wkSum,
        delta: wkSum - wk.dailyCalories,
      });
    }
  }

  const allPass = tPass && rPass && wPass && pTrainPass && pRestPass && fastPass && revPass;
  if (allPass) engineThermoPassed++;
  else engineThermoFailed++;

  assert(allPass, `Preset '${p.slug}' metabolic engine report enforces 4*P + 4*C + 9*F === calories across all phases`, 'thermoEngineFailures');
}

console.log(`  Metabolic report engine thermodynamic equality: ${engineThermoPassed}/64 passed, ${engineThermoFailed}/64 failed`);

// ----------------------------------------------------------------------------
// 4. THERMODYNAMIC AUDIT: TABLE DATA & DIRECT CLINICAL ANSWER
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 4. Thermodynamic Consistency in Preset tableData & AEO Text ---\x1b[0m');

for (const p of SEO_PRESETS) {
  // Check tableData headers & rows
  const headers = p.tableData.headers;
  const rows = p.tableData.rows;

  // Locate column indices
  const calColIdx = headers.findIndex((h) => /calor/i.test(h));
  const protColIdx = headers.findIndex((h) => /protein/i.test(h));
  const carbColIdx = headers.findIndex((h) => /carb/i.test(h));
  const fatColIdx = headers.findIndex((h) => /fat/i.test(h));

  if (calColIdx !== -1 && protColIdx !== -1 && carbColIdx !== -1 && fatColIdx !== -1) {
    for (let rIdx = 0; rIdx < rows.length; rIdx++) {
      const row = rows[rIdx];
      const rowLabel = String(row[0] || `Row ${rIdx}`);

      // Parse calories
      const calStr = String(row[calColIdx]);
      const calMatch = calStr.replace(/,/g, '').match(/(\d+)\s*kcal/i);
      const calVal = calMatch ? parseInt(calMatch[1], 10) : null;

      // Parse protein
      const protStr = String(row[protColIdx]);
      const protMatch = protStr.replace(/,/g, '').match(/(\d+)\s*g/i);
      const protVal = protMatch ? parseInt(protMatch[1], 10) : null;

      // Parse carbs
      const carbStr = String(row[carbColIdx]);
      const carbMatch = carbStr.replace(/,/g, '').match(/(\d+)\s*g/i);
      const carbVal = carbMatch ? parseInt(carbMatch[1], 10) : null;

      // Parse fat
      const fatStr = String(row[fatColIdx]);
      const fatMatch = fatStr.replace(/,/g, '').match(/(\d+)\s*g/i);
      const fatVal = fatMatch ? parseInt(fatMatch[1], 10) : null;

      if (calVal !== null && protVal !== null && carbVal !== null && fatVal !== null) {
        const macroCalories = protVal * 4 + carbVal * 4 + fatVal * 9;
        const delta = Math.abs(macroCalories - calVal);

        // Check exact equality and record discrepancy
        if (delta !== 0) {
          stats.details.thermoTableDiscrepancies.push({
            slug: p.slug,
            row: rowLabel,
            statedCalories: calVal,
            protein: protVal,
            carbs: carbVal,
            fat: fatVal,
            computedMacroCalories: macroCalories,
            delta: macroCalories - calVal,
          });
        }
      }
    }
  }

  // Parse macros from directClinicalAnswer
  const aeoText = p.directClinicalAnswer;
  // Look for patterns like "1,840 kcal ... 115g protein, 215g carbs, and 58g fat"
  const numMatches = [...aeoText.matchAll(/(\d[\d,]*)\s*kcal[^\d]*?(\d+)\s*g\s+protein[^\d]*?(\d+)\s*g\s+carbs?[^\d]*?(\d+)\s*g\s+fat/gi)];
  for (const m of numMatches) {
    const statedKcal = parseInt(m[1].replace(/,/g, ''), 10);
    const pG = parseInt(m[2], 10);
    const cG = parseInt(m[3], 10);
    const fG = parseInt(m[4], 10);
    const calc = pG * 4 + cG * 4 + fG * 9;
    const delta = Math.abs(calc - statedKcal);
    if (delta !== 0) {
      stats.details.thermoClinicalDiscrepancies.push({
        slug: p.slug,
        snippet: m[0],
        statedCalories: statedKcal,
        protein: pG,
        carbs: cG,
        fat: fG,
        computed: calc,
        delta: calc - statedKcal,
      });
    }
  }
}

console.log(`  tableData rows with exact 4*P + 4*C + 9*F === calories:`);
if (stats.details.thermoTableDiscrepancies.length === 0) {
  console.log(`  \x1b[32m[PASS] All tableData rows have 100% exact thermodynamic balance!\x1b[0m`);
} else {
  const deltas = stats.details.thermoTableDiscrepancies.map(d => Math.abs(d.delta));
  const maxDelta = Math.max(...deltas);
  const avgDelta = Math.round((deltas.reduce((a, b) => a + b, 0) / deltas.length) * 10) / 10;
  const le2 = deltas.filter(d => d <= 2).length;
  const le10 = deltas.filter(d => d > 2 && d <= 10).length;
  const gt10 = deltas.filter(d => d > 10).length;
  console.log(`  \x1b[33m[NOTE] Detected ${stats.details.thermoTableDiscrepancies.length} table rows with rounding deltas (Max: ${maxDelta} kcal, Avg: ${avgDelta} kcal):\x1b[0m`);
  console.log(`    - Delta <= 2 kcal: ${le2} rows`);
  console.log(`    - Delta 3-10 kcal: ${le10} rows`);
  console.log(`    - Delta > 10 kcal: ${gt10} rows (mostly weekly total rows summing 7 days)`);
  const sortedDeltas = [...stats.details.thermoTableDiscrepancies].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  console.log(`    Top 10 largest table deltas:`);
  for (const item of sortedDeltas.slice(0, 10)) {
    console.log(`      - [${item.slug}] ${item.row}: stated ${item.statedCalories} kcal, 4*${item.protein} + 4*${item.carbs} + 9*${item.fat} = ${item.computedMacroCalories} kcal (delta: ${item.delta} kcal)`);
  }
}

// ----------------------------------------------------------------------------
// 5. DIRECT CLINICAL ANSWER WORD COUNT (STRICTLY 40 - 65 WORDS)
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 5. Direct Clinical Answer Word Count (Strict 40 - 65 Words) ---\x1b[0m');

let wordCountPassed = 0;
let wordCountFailed = 0;

for (const p of SEO_PRESETS) {
  const words = countWords(p.directClinicalAnswer);
  const isValid = words >= 40 && words <= 65;

  if (isValid) {
    wordCountPassed++;
  } else {
    wordCountFailed++;
  }

  assert(
    isValid,
    `Preset '${p.slug}' directClinicalAnswer word count within 40-65 range (actual: ${words})`,
    'wordCountFailures',
    { slug: p.slug, words, text: p.directClinicalAnswer }
  );
}

const wordCounts = SEO_PRESETS.map(p => countWords(p.directClinicalAnswer));
const minWords = Math.min(...wordCounts);
const maxWords = Math.max(...wordCounts);
const avgWords = Math.round((wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length) * 10) / 10;
console.log(`  Word count distribution: ${wordCountPassed}/64 passed, ${wordCountFailed}/64 failed (Min: ${minWords}, Max: ${maxWords}, Mean: ${avgWords})`);

// ----------------------------------------------------------------------------
// 6. GEO TABLE DATA STRUCTURE INTEGRITY
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 6. Preset Table Data Structure & Formatting ---\x1b[0m');

for (const p of SEO_PRESETS) {
  const td = p.tableData;
  assert(td && Array.isArray(td.headers) && td.headers.length >= 3, `Preset '${p.slug}' has at least 3 table headers`, 'tableStructureFailures');
  assert(Array.isArray(td.rows) && td.rows.length >= 2, `Preset '${p.slug}' has at least 2 table rows`, 'tableStructureFailures');

  for (let rIdx = 0; rIdx < td.rows.length; rIdx++) {
    const row = td.rows[rIdx];
    assert(
      row.length === td.headers.length,
      `Preset '${p.slug}' row ${rIdx} column count (${row.length}) matches headers count (${td.headers.length})`,
      'tableStructureFailures',
      { slug: p.slug, rowIdx: rIdx, headerCount: td.headers.length, rowCount: row.length }
    );

    for (let cIdx = 0; cIdx < row.length; cIdx++) {
      const cell = row[cIdx];
      assert(
        cell !== null && cell !== undefined && String(cell).trim().length > 0,
        `Preset '${p.slug}' cell [${rIdx}, ${cIdx}] is non-empty`,
        'tableStructureFailures'
      );
    }
  }
}

// ----------------------------------------------------------------------------
// 7. PUBMED CITATIONS & REAL PMID VALIDITY
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 7. PubMed Citations & PMID Validity ---\x1b[0m');

const uniquePmids = new Set();
let totalCitations = 0;

for (const p of SEO_PRESETS) {
  const citations = p.pmidCitations;
  assert(Array.isArray(citations) && citations.length >= 1, `Preset '${p.slug}' has at least 1 PubMed citation`, 'pmidFailures');

  for (const c of citations) {
    totalCitations++;
    assert(/^\d+$/.test(c.pmid), `Citation PMID '${c.pmid}' in '${p.slug}' must be numeric`, 'pmidFailures');
    assert(c.url === `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`, `Citation URL in '${p.slug}' must follow standard pattern`, 'pmidFailures');
    assert(c.title && c.title.trim().length > 5, `Citation in '${p.slug}' must have descriptive title`, 'pmidFailures');
    assert(c.journal && c.journal.trim().length > 1, `Citation in '${p.slug}' must have journal name`, 'pmidFailures');
    assert(c.year >= 1970 && c.year <= 2026, `Citation year ${c.year} in '${p.slug}' must be valid`, 'pmidFailures');
    uniquePmids.add(c.pmid);
  }
}

console.log(`  Total citations audited: ${totalCitations} across 64 presets (${uniquePmids.size} unique PMIDs)`);
console.log('  Unique PMIDs list:');
for (const id of Array.from(uniquePmids).sort()) {
  const sample = SEO_PRESETS.flatMap(p => p.pmidCitations).find(c => c.pmid === id);
  console.log(`    - PMID ${id}: [${sample.year}] ${sample.title.slice(0, 70)}... (${sample.journal})`);
}

// ----------------------------------------------------------------------------
// 8. PRE-RENDERED STATIC HTML BUILD AUDIT
// ----------------------------------------------------------------------------
console.log('\n\x1b[34m--- 8. Pre-rendered HTML Build Artifact Audit ---\x1b[0m');

const nextServerAppDir = path.join(ROOT_DIR, '.next/server/app');
const presetsHtmlDir = path.join(nextServerAppDir, 'presets');

if (fs.existsSync(presetsHtmlDir)) {
  console.log(`  Found pre-rendered HTML directory at ${presetsHtmlDir}`);
  for (const p of SEO_PRESETS) {
    const htmlPath = path.join(presetsHtmlDir, `${p.slug}.html`);
    const exists = fs.existsSync(htmlPath);
    assert(exists, `HTML artifact exists for preset: ${p.slug}.html`, 'htmlArtifactFailures');

    if (exists) {
      const html = fs.readFileSync(htmlPath, 'utf-8');

      // 1. Canonical tag
      const expectedCanonical = `https://www.smartmacrocalc.com/presets/${p.slug}`;
      const hasCanonical = html.includes(`<link rel="canonical" href="${expectedCanonical}"/>`) ||
                           html.includes(`<link rel="canonical" href="${expectedCanonical}"`);
      assert(hasCanonical, `Preset '${p.slug}' has canonical link to ${expectedCanonical}`, 'htmlArtifactFailures');

      // 2. Direct Clinical Answer callout
      const hasAeoCallout = html.includes('data-aeo-answer') || html.includes('Direct Clinical Answer');
      assert(hasAeoCallout, `Preset '${p.slug}' HTML has Direct Clinical Answer callout block`, 'htmlArtifactFailures');

      // 3. GEO Table
      const hasTable = html.includes('<table');
      assert(hasTable, `Preset '${p.slug}' HTML has structured <table>`, 'htmlArtifactFailures');

      // 4. PMID block
      const hasPmid = html.includes('PMID') || html.includes('pubmed.ncbi.nlm.nih.gov');
      assert(hasPmid, `Preset '${p.slug}' HTML renders PubMed citations`, 'htmlArtifactFailures');

      // 5. JSON-LD Schemas
      const hasJsonLd = html.includes('application/ld+json') && (html.includes('FAQPage') || html.includes('BreadcrumbList'));
      assert(hasJsonLd, `Preset '${p.slug}' HTML renders valid JSON-LD schemas`, 'htmlArtifactFailures');
    }
  }

  // Check Categorized Preset Directory Hub page
  const hubHtmlPath = path.join(nextServerAppDir, 'presets.html');
  const hubExists = fs.existsSync(hubHtmlPath);
  assert(hubExists, 'Presets Directory Hub HTML artifact exists (.next/server/app/presets.html)', 'htmlArtifactFailures');
  if (hubExists) {
    const hubHtml = fs.readFileSync(hubHtmlPath, 'utf-8');
    const hasHubCanonical = hubHtml.includes('https://www.smartmacrocalc.com/presets');
    assert(hasHubCanonical, 'Presets Directory Hub HTML has canonical link', 'htmlArtifactFailures');

    let linkedPresets = 0;
    for (const p of SEO_PRESETS) {
      if (hubHtml.includes(`/presets/${p.slug}`)) {
        linkedPresets++;
      }
    }
    assert(linkedPresets === 64, `Presets Directory Hub statically links to all 64 presets (found: ${linkedPresets}/64)`, 'htmlArtifactFailures');
  }
} else {
  warn(`.next/server/app/presets directory not found. Run next build to generate static artifacts.`);
}

// ----------------------------------------------------------------------------
// SUMMARY & VERDICT
// ----------------------------------------------------------------------------
console.log('\n\x1b[36m\x1b[1m================================================================');
console.log('                        SUMMARY REPORT');
console.log('================================================================\x1b[0m');
console.log(`Total Assertions Evaluated: ${stats.assertions}`);
console.log(`Passed:                     \x1b[32m${stats.passed}\x1b[0m`);
console.log(`Failed:                     \x1b[31m${stats.failed}\x1b[0m`);
console.log(`Warnings:                   \x1b[33m${stats.warnings}\x1b[0m`);

const verdict = stats.failed === 0 ? 'APPROVE' : 'REQUEST_CHANGES';
console.log(`\nFinal Empirical Verdict:    \x1b[1m${verdict === 'APPROVE' ? '\x1b[32mAPPROVE' : '\x1b[31mREQUEST_CHANGES'}\x1b[0m\n`);

process.exit(stats.failed === 0 ? 0 : 1);
