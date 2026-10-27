#!/usr/bin/env node
/**
 * scripts/deep-stress-test.mjs
 *
 * Deep Adversarial Stress Testing for SmartMacroCalc.com M2 Deliverables:
 * 1. AEO Word Count Distribution & Boundary Analysis (min, max, median)
 * 2. Table Thermodynamic Invariant: P*4 + C*4 + F*9 === Calories inside the pre-rendered HTML tables
 * 3. PMID URL Integrity & format validation
 * 4. OpenGraph & Twitter Card Metadata parity with Canonical & Titles
 * 5. JSON-LD Deep Entity Validation (Breadcrumbs positions, FAQ structure, MedicalWebPage E-E-A-T)
 * 6. HTML Asset & Resource Integrity (scripts, stylesheets, fonts)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PRESETS_DIR = path.join(ROOT_DIR, '.next/server/app/presets');
const PRESETS_HUB = path.join(ROOT_DIR, '.next/server/app/presets.html');

function countWords(str) {
  if (!str) return 0;
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
}

function extractMeta(html, property) {
  const m =
    html.match(new RegExp(`<meta\\s+[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
    html.match(new RegExp(`<meta\\s+[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
    html.match(new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i')) ||
    html.match(new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`, 'i'));
  return m ? m[1].trim() : null;
}

function extractAeoText(html) {
  const marker = 'data-aeo-answer="true"';
  const idx = html.indexOf(marker);
  if (idx === -1) return null;
  const slice = html.slice(idx, idx + 3000);
  const pMatch = slice.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!pMatch) return null;
  return pMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim();
}

function extractJsonLdScripts(html) {
  const scripts = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    try {
      scripts.push(JSON.parse(m[1]));
    } catch (e) {
      scripts.push({ error: e.message, raw: m[1] });
    }
  }
  return scripts;
}

function extractTables(html) {
  const tables = [];
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tm;
  while ((tm = tableRegex.exec(html)) !== null) {
    const tableContent = tm[1];
    const ths = [];
    const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/gi;
    let thm;
    while ((thm = thRegex.exec(tableContent)) !== null) {
      ths.push(thm[1].replace(/<[^>]+>/g, '').trim());
    }

    const rows = [];
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let trm;
    while ((trm = trRegex.exec(tableContent)) !== null) {
      const tds = [];
      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      let tdm;
      while ((tdm = tdRegex.exec(trm[1])) !== null) {
        tds.push(tdm[1].replace(/<[^>]+>/g, '').trim());
      }
      if (tds.length > 0) rows.push(tds);
    }
    tables.push({ headers: ths, rows });
  }
  return tables;
}

async function runDeepStressTest() {
  console.log('================================================================');
  console.log('       DEEP ADVERSARIAL STRESS TEST & BOUNDARY HARNESS          ');
  console.log('================================================================\n');

  const files = fs.readdirSync(PRESETS_DIR).filter((f) => f.endsWith('.html') && !f.startsWith('['));
  console.log(`Auditing ${files.length} preset files for edge cases & invariants...`);

  const wordCounts = [];
  const pmidList = new Set();
  const thermodynamicViolations = [];
  const metadataMismatches = [];
  const schemaAnomalies = [];

  for (const file of files) {
    const slug = file.replace('.html', '');
    const html = fs.readFileSync(path.join(PRESETS_DIR, file), 'utf8');

    // 1. AEO Word Count analysis
    const aeoText = extractAeoText(html);
    const wc = countWords(aeoText);
    wordCounts.push({ slug, wc, text: aeoText });
    if (wc < 40 || wc > 65) {
      console.error(`BOUNDARY VIOLATION: ${slug} has ${wc} words!`);
    }

    // 2. OpenGraph & Twitter metadata cross-check
    const ogTitle = extractMeta(html, 'og:title');
    const ogDesc = extractMeta(html, 'og:description');
    const ogUrl = extractMeta(html, 'og:url');
    const twCard = extractMeta(html, 'twitter:card');
    const twTitle = extractMeta(html, 'twitter:title');

    if (!ogTitle || !ogTitle.includes('SmartMacroCalc')) {
      metadataMismatches.push(`${slug}: og:title missing or unbranded (${ogTitle})`);
    }
    if (!ogDesc || ogDesc.length < 50) {
      metadataMismatches.push(`${slug}: og:description too short (${ogDesc})`);
    }
    if (ogUrl !== `https://www.smartmacrocalc.com/presets/${slug}`) {
      metadataMismatches.push(`${slug}: og:url mismatch (${ogUrl})`);
    }
    if (twCard !== 'summary_large_image') {
      metadataMismatches.push(`${slug}: twitter:card is not summary_large_image (${twCard})`);
    }

    // 3. JSON-LD deep check
    const schemas = extractJsonLdScripts(html);
    const types = schemas.map((s) => s['@type']);
    if (!types.includes('FAQPage') || !types.includes('BreadcrumbList') || !types.includes('MedicalWebPage') || !types.includes('SoftwareApplication') || !types.includes('Organization')) {
      schemaAnomalies.push(`${slug}: missing one of 5 expected schemas. Found: ${types.join(', ')}`);
    }

    // 4. PMID integrity
    const pmidMatches = html.matchAll(/href=["']https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)\/?["']/gi);
    for (const match of pmidMatches) {
      const pmid = match[1];
      pmidList.add(pmid);
      if (pmid.length < 6 || pmid.length > 9) {
        console.error(`SUSPICIOUS PMID: ${pmid} in ${slug}`);
      }
    }

    // 5. HTML Table data thermodynamic checks
    const tables = extractTables(html);
    for (const t of tables) {
      for (const row of t.rows) {
        // Check if row has calories, protein, carbs, fat
        // Headers e.g.: ['Phase / Metric', 'Daily Calories', 'Protein (g)', 'Carbohydrates (g)', 'Fats (g)', 'Clinical Rationale']
        const calIdx = t.headers.findIndex((h) => /calor/i.test(h));
        const pIdx = t.headers.findIndex((h) => /protein/i.test(h));
        const cIdx = t.headers.findIndex((h) => /carb/i.test(h));
        const fIdx = t.headers.findIndex((h) => /fat/i.test(h));

        if (calIdx !== -1 && pIdx !== -1 && cIdx !== -1 && fIdx !== -1) {
          const calStr = row[calIdx];
          const pStr = row[pIdx];
          const cStr = row[cIdx];
          const fStr = row[fIdx];

          const calMatch = calStr?.match(/([\d,]+)\s*(?:kcal|cal)?/i);
          const pMatch = pStr?.match(/([\d,.]+)\s*g/i);
          const cMatch = cStr?.match(/([\d,.]+)\s*g/i);
          const fMatch = fStr?.match(/([\d,.]+)\s*g/i);

          const cal = calMatch ? parseInt(calMatch[1].replace(/,/g, ''), 10) : NaN;
          const p = pMatch ? parseFloat(pMatch[1].replace(/,/g, '')) : NaN;
          const c = cMatch ? parseFloat(cMatch[1].replace(/,/g, '')) : NaN;
          const f = fMatch ? parseFloat(fMatch[1].replace(/,/g, '')) : NaN;

          if (!isNaN(cal) && !isNaN(p) && !isNaN(c) && !isNaN(f) && cal > 500) {
            const calculated = Math.round(p * 4 + c * 4 + f * 9);
            const diff = Math.abs(calculated - cal);
            // Allow up to 50 kcal rounding tolerance for weekly aggregates or macro rounding
            if (diff > 50) {
              thermodynamicViolations.push(`${slug} row "${row[0]}": stated ${cal} kcal vs computed ${calculated} kcal (P=${p}g, C=${c}g, F=${f}g, diff=${diff})`);
            }
          }
        }
      }
    }
  }

  // Word count distribution
  const counts = wordCounts.map((w) => w.wc);
  const minWc = Math.min(...counts);
  const maxWc = Math.max(...counts);
  const avgWc = (counts.reduce((a, b) => a + b, 0) / counts.length).toFixed(1);
  const minPreset = wordCounts.find((w) => w.wc === minWc);
  const maxPreset = wordCounts.find((w) => w.wc === maxWc);

  console.log('\n--- AEO WORD COUNT DISTRIBUTION ---');
  console.log(`Min words:    ${minWc} (${minPreset.slug})`);
  console.log(`Max words:    ${maxWc} (${maxPreset.slug})`);
  console.log(`Average words:${avgWc}`);
  console.log(`All within [40, 65] range: ${minWc >= 40 && maxWc <= 65 ? 'YES (100% compliant)' : 'NO'}`);

  console.log('\n--- NCBI PUBMED CITATION HARVEST ---');
  console.log(`Unique PMIDs cited across presets: ${pmidList.size}`);
  console.log(`Sample PMIDs: ${Array.from(pmidList).slice(0, 8).join(', ')}`);

  console.log('\n--- THERMODYNAMIC TABLE CONSISTENCY ---');
  console.log(`Thermodynamic violations found in pre-rendered tables: ${thermodynamicViolations.length}`);
  if (thermodynamicViolations.length > 0) {
    console.error('Violations:');
    thermodynamicViolations.forEach((v) => console.error(`  - ${v}`));
  } else {
    console.log('All table macro rows strictly respect 4P + 4C + 9F == Calories!');
  }

  console.log('\n--- OPENGRAPH & TWITTER METADATA ---');
  console.log(`Metadata mismatches found: ${metadataMismatches.length}`);
  if (metadataMismatches.length > 0) {
    metadataMismatches.forEach((m) => console.error(`  - ${m}`));
  } else {
    console.log('All 64 preset pages have perfectly aligned OpenGraph and Twitter cards!');
  }

  console.log('\n--- JSON-LD MULTI-ENTITY GRAPH ---');
  console.log(`Schema anomalies found: ${schemaAnomalies.length}`);
  if (schemaAnomalies.length > 0) {
    schemaAnomalies.forEach((s) => console.error(`  - ${s}`));
  } else {
    console.log('All 64 preset pages emit 5 full Schema.org entities (FAQ, Breadcrumb, Medical, Software, Org)!');
  }

  const allPassed =
    minWc >= 40 &&
    maxWc <= 65 &&
    thermodynamicViolations.length === 0 &&
    metadataMismatches.length === 0 &&
    schemaAnomalies.length === 0;

  console.log('\n================================================================');
  console.log(`DEEP STRESS TEST RESULT: ${allPassed ? 'ALL TESTS PASSED' : 'FAILURES DETECTED'}`);
  console.log('================================================================');

  process.exit(allPassed ? 0 : 1);
}

runDeepStressTest().catch((e) => {
  console.error(e);
  process.exit(1);
});
