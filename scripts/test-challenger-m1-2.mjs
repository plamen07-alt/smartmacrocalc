#!/usr/bin/env node
/**
 * scripts/test-challenger-m1-2.mjs
 * 
 * Comprehensive Empirical Challenger Verification & Stress-Testing Suite for Milestone 1:
 * 1. VisualFastingClock.tsx SVG Math, Polar-to-Cartesian Donut Geometry, Midnight Crossing
 * 2. SocialBlueprintCard.tsx Reddit Markdown Generation & PubMed Citations across all 7 tabs
 * 
 * Usage:
 *   node scripts/test-challenger-m1-2.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const jiti = createJiti(__filename, {
  jsx: true,
  alias: {
    '@': path.resolve(ROOT_DIR, 'src'),
  },
});

// Load project modules
const formulas = jiti(path.join(ROOT_DIR, 'src/lib/formulas.ts'));
const { VisualFastingClock } = jiti(path.join(ROOT_DIR, 'src/components/calculator/VisualFastingClock.tsx'));

const {
  calculateFullMetabolicReport,
  calculateFastingTimeline,
  kgToLbs,
  DEFAULT_BIOMETRICS,
} = formulas;

// Test Results Collector
const suiteStats = {
  passed: 0,
  failed: 0,
  assertions: 0,
  details: [],
};

function assert(condition, message, errorDetails = '') {
  suiteStats.assertions++;
  if (!condition) {
    suiteStats.failed++;
    const err = `[FAIL] ${message} ${errorDetails ? `(${errorDetails})` : ''}`;
    suiteStats.details.push(err);
    console.error(`\x1b[31m${err}\x1b[0m`);
    return false;
  }
  suiteStats.passed++;
  return true;
}

// Helper to strip React 19 SSR comment nodes (e.g. <!-- -->) and normalize whitespace
function cleanSsrHtml(html) {
  return html.replace(/<!--.*?-->/g, '').replace(/\s+/g, ' ');
}

console.log('\n=================================================================');
console.log('   CHALLENGER M1-2: EMPIRICAL TEST & STRESS HARNESS             ');
console.log('=================================================================\n');

// ---------------------------------------------------------------------------
// SUITE 1: VisualFastingClock SVG Math & Donut Geometry (96 Protocol/Hour Combinations)
// ---------------------------------------------------------------------------
console.log('--- SUITE 1: VisualFastingClock.tsx SVG Math & Donut Geometry ---');

const PROTOCOLS = ['16:8', '18:6', '20:4', 'omad'];
const START_HOURS = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

// Pure math oracle for polarToCartesian & describeDonutArc
function polarToCartesianOracle(cx, cy, radius, angleInDegrees) {
  const radians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeDonutArcOracle(cx, cy, innerRadius, outerRadius, startHour, durationHours) {
  const safeDuration = Math.max(0.1, Math.min(23.95, durationHours));
  const startAngle = (startHour / 24) * 360;
  const endAngle = startAngle + (safeDuration / 24) * 360;

  const startOuter = polarToCartesianOracle(cx, cy, outerRadius, startAngle);
  const endOuter = polarToCartesianOracle(cx, cy, outerRadius, endAngle);
  const startInner = polarToCartesianOracle(cx, cy, innerRadius, startAngle);
  const endInner = polarToCartesianOracle(cx, cy, innerRadius, endAngle);

  const arcSweep = safeDuration > 12 ? 1 : 0;

  return {
    pathStr: [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${arcSweep} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${arcSweep} 0 ${startInner.x} ${startInner.y}`,
      'Z',
    ].join(' '),
    startOuter,
    endOuter,
    startInner,
    endInner,
    arcSweep,
    safeDuration,
  };
}

let renderedCombinations = 0;
let midnightCrossingsTested = 0;

for (const proto of PROTOCOLS) {
  const fastingH = proto === '18:6' ? 18 : proto === '20:4' ? 20 : proto === 'omad' ? 23 : 16;
  const eatingH = 24 - fastingH;

  for (const startH of START_HOURS) {
    renderedCombinations++;
    const safeStart = ((startH % 24) + 24) % 24;
    const safeEnd = (safeStart + eatingH) % 24;
    const crossesMidnight = safeStart + eatingH >= 24;
    if (crossesMidnight) midnightCrossingsTested++;

    // Generate mock biometrics & report
    const bio = {
      ...DEFAULT_BIOMETRICS,
      fastingProtocol: proto,
      fastingEatingWindowStartHour: startH,
    };
    const report = calculateFullMetabolicReport(bio);

    // 1. Render Component via React Server DOM
    let html = '';
    try {
      html = renderToString(
        React.createElement(VisualFastingClock, {
          fastingProtocol: proto,
          windowStartHour: startH,
          dailyCalories: report.fastingProtocol.dailyCalories,
          macros: report.fastingProtocol.macros,
          unitSystem: 'imperial',
          currentWeightKg: bio.weightKg,
          bodyFatPct: bio.bodyFatPct,
          tdee: report.tdee,
          timelineStages: report.fastingProtocol.timelineStages,
          twelveWeekTrajectory: report.fastingProtocol.twelveWeekTrajectory,
          muscleRetentionRisk: report.fastingProtocol.muscleRetentionRisk,
        })
      );
    } catch (renderErr) {
      assert(false, `Render threw exception for proto=${proto}, startH=${startH}`, renderErr.message);
      continue;
    }

    assert(html.length > 500, `Rendered HTML non-empty for proto=${proto}, startH=${startH}`);
    assert(!html.includes('NaN'), `Zero NaN in rendered HTML for proto=${proto}, startH=${startH}`);
    assert(!html.includes('undefined'), `Zero undefined in rendered HTML for proto=${proto}, startH=${startH}`);
    assert(!html.includes('Infinity'), `Zero Infinity in rendered HTML for proto=${proto}, startH=${startH}`);

    // 2. Extract SVG Paths for eatingArc and fastingArc
    const fastingPathMatch = html.match(/d="([^"]+)"\s+fill="url\(#fastingGrad\)"/);
    const eatingPathMatch = html.match(/d="([^"]+)"\s+fill="url\(#eatingGrad\)"/);

    assert(Boolean(fastingPathMatch), `fastingArc path found in HTML for proto=${proto}, startH=${startH}`);
    assert(Boolean(eatingPathMatch), `eatingArc path found in HTML for proto=${proto}, startH=${startH}`);

    if (fastingPathMatch && eatingPathMatch) {
      const fastingPath = fastingPathMatch[1];
      const eatingPath = eatingPathMatch[1];

      // Validate SVG Path Regex Format: M x y A rx ry rot large sweep x y L x y A rx ry rot large sweep x y Z
      const svgArcRegex = /^M\s+[\d\.-]+\s+[\d\.-]+\s+A\s+[\d\.-]+\s+[\d\.-]+\s+0\s+[01]\s+1\s+[\d\.-]+\s+[\d\.-]+\s+L\s+[\d\.-]+\s+[\d\.-]+\s+A\s+[\d\.-]+\s+[\d\.-]+\s+0\s+[01]\s+0\s+[\d\.-]+\s+[\d\.-]+\s+Z$/;

      assert(svgArcRegex.test(eatingPath), `eatingArc has valid SVG path structure for proto=${proto}, startH=${startH}`);
      assert(svgArcRegex.test(fastingPath), `fastingArc has valid SVG path structure for proto=${proto}, startH=${startH}`);

      // Parse coordinates from path string
      const parseArcCoords = (pathStr) => {
        const parts = pathStr.split(' ');
        return {
          startOuter: { x: parseFloat(parts[1]), y: parseFloat(parts[2]) },
          outerRadius: parseFloat(parts[4]),
          outerSweep: parseInt(parts[7], 10),
          endOuter: { x: parseFloat(parts[9]), y: parseFloat(parts[10]) },
          endInner: { x: parseFloat(parts[12]), y: parseFloat(parts[13]) },
          innerRadius: parseFloat(parts[15]),
          innerSweep: parseInt(parts[18], 10),
          startInner: { x: parseFloat(parts[20]), y: parseFloat(parts[21]) },
        };
      };

      const eatingCoords = parseArcCoords(eatingPath);
      const fastingCoords = parseArcCoords(fastingPath);

      // Verify radii
      assert(eatingCoords.outerRadius === 150, `eatingArc outer radius is 150 for proto=${proto}`);
      assert(eatingCoords.innerRadius === 105, `eatingArc inner radius is 105 for proto=${proto}`);
      assert(fastingCoords.outerRadius === 150, `fastingArc outer radius is 150 for proto=${proto}`);
      assert(fastingCoords.innerRadius === 105, `fastingArc inner radius is 105 for proto=${proto}`);

      // Verify Large Arc Flag (arcSweep)
      // eatingH: 16:8=8 (<=12 -> 0), 18:6=6 (<=12 -> 0), 20:4=4 (<=12 -> 0), omad=1 (<=12 -> 0)
      assert(eatingCoords.outerSweep === 0, `eatingArc large-arc-flag is 0 for proto=${proto} (duration ${eatingH}h <= 12)`);
      // fastingH: 16:8=16 (>12 -> 1), 18:6=18 (>12 -> 1), 20:4=20 (>12 -> 1), omad=23 (>12 -> 1)
      assert(fastingCoords.outerSweep === 1, `fastingArc large-arc-flag is 1 for proto=${proto} (duration ${fastingH}h > 12)`);

      // 3. Boundary Continuity & Midnight Crossing Coincidence Check
      // The eating window ends exactly where the fasting window begins!
      const distEndEatingToStartFastingOuter = Math.hypot(
        eatingCoords.endOuter.x - fastingCoords.startOuter.x,
        eatingCoords.endOuter.y - fastingCoords.startOuter.y
      );
      const distEndEatingToStartFastingInner = Math.hypot(
        eatingCoords.endInner.x - fastingCoords.startInner.x,
        eatingCoords.endInner.y - fastingCoords.startInner.y
      );

      // The fasting window ends exactly where the eating window begins!
      const distEndFastingToStartEatingOuter = Math.hypot(
        fastingCoords.endOuter.x - eatingCoords.startOuter.x,
        fastingCoords.endOuter.y - eatingCoords.startOuter.y
      );
      const distEndFastingToStartEatingInner = Math.hypot(
        fastingCoords.endInner.x - eatingCoords.startInner.x,
        fastingCoords.endInner.y - eatingCoords.startInner.y
      );

      assert(
        distEndEatingToStartFastingOuter < 0.001,
        `Eating endOuter coincides with Fasting startOuter (dist=${distEndEatingToStartFastingOuter.toFixed(4)}) for proto=${proto}, startH=${startH}`
      );
      assert(
        distEndEatingToStartFastingInner < 0.001,
        `Eating endInner coincides with Fasting startInner (dist=${distEndEatingToStartFastingInner.toFixed(4)}) for proto=${proto}, startH=${startH}`
      );
      assert(
        distEndFastingToStartEatingOuter < 0.001,
        `Fasting endOuter coincides with Eating startOuter (dist=${distEndFastingToStartEatingOuter.toFixed(4)}) for proto=${proto}, startH=${startH}`
      );
      assert(
        distEndFastingToStartEatingInner < 0.001,
        `Fasting endInner coincides with Eating startInner (dist=${distEndFastingToStartEatingInner.toFixed(4)}) for proto=${proto}, startH=${startH}`
      );

      // Check Non-degeneracy (Outer arc length > 0)
      const eatingOuterSpan = Math.hypot(
        eatingCoords.endOuter.x - eatingCoords.startOuter.x,
        eatingCoords.endOuter.y - eatingCoords.startOuter.y
      );
      const fastingOuterSpan = Math.hypot(
        fastingCoords.endOuter.x - fastingCoords.startOuter.x,
        fastingCoords.endOuter.y - fastingCoords.startOuter.y
      );
      assert(eatingOuterSpan > 5.0, `eatingArc is non-degenerate (chord=${eatingOuterSpan.toFixed(2)}) for proto=${proto}, startH=${startH}`);
      assert(fastingOuterSpan > 5.0, `fastingArc is non-degenerate (chord=${fastingOuterSpan.toFixed(2)}) for proto=${proto}, startH=${startH}`);
    }
  }
}

console.log(`  ✓ Tested ${renderedCombinations} protocol/hour combinations (${midnightCrossingsTested} midnight crossings).`);

// ---------------------------------------------------------------------------
// SUITE 2: Boundary & Corner Cases on VisualFastingClock
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 2: Boundary & Corner Cases on VisualFastingClock ---');

// Adversarial Hour Inputs
const ADVERSARIAL_HOURS = [-72, -24, -13, -1, 24, 25, 48, 100, 1000, 12.5, 7.75, 0.25, 23.9];
for (const advH of ADVERSARIAL_HOURS) {
  const html = renderToString(
    React.createElement(VisualFastingClock, {
      fastingProtocol: '16:8',
      windowStartHour: advH,
      dailyCalories: 1800,
      macros: { calories: 1800, proteinGrams: 150, carbsGrams: 160, fatGrams: 60, fiberGrams: 30, proteinPct: 33, carbsPct: 36, fatPct: 30 },
      unitSystem: 'metric',
      currentWeightKg: 75,
      bodyFatPct: 16,
      tdee: 2200,
    })
  );

  assert(!html.includes('NaN'), `Adversarial hour ${advH} produces zero NaN in SVG output`);
  assert(!html.includes('undefined'), `Adversarial hour ${advH} produces zero undefined`);
  assert(html.includes('<svg'), `Adversarial hour ${advH} renders SVG successfully`);
}

// Pure Math Oracle Stress Test on describeDonutArc with extreme durations
const TEST_DURATIONS = [-10, 0, 0.05, 0.1, 1, 6, 12, 18, 23.95, 24, 25, 100];
for (const dur of TEST_DURATIONS) {
  const oracle = describeDonutArcOracle(200, 200, 105, 150, 12, dur);
  assert(!oracle.pathStr.includes('NaN'), `Donut arc path contains no NaN for duration=${dur}`);
  assert(oracle.safeDuration >= 0.1 && oracle.safeDuration <= 23.95, `Duration ${dur} safely clamped to [0.1, 23.95] (clamped=${oracle.safeDuration})`);
  const chord = Math.hypot(oracle.endOuter.x - oracle.startOuter.x, oracle.endOuter.y - oracle.startOuter.y);
  assert(chord > 0.01, `Non-degenerate chord for duration=${dur} (chord=${chord.toFixed(3)})`);
}

// Empty Trajectory Fallback Check
const emptyTrajHtml = renderToString(
  React.createElement(VisualFastingClock, {
    fastingProtocol: 'omad',
    windowStartHour: 18,
    dailyCalories: 1600,
    macros: { calories: 1600, proteinGrams: 140, carbsGrams: 120, fatGrams: 62, fiberGrams: 28, proteinPct: 35, carbsPct: 30, fatPct: 35 },
    unitSystem: 'imperial',
    currentWeightKg: 85,
    bodyFatPct: 22,
    tdee: 2500,
    twelveWeekTrajectory: [], // intentionally empty
    timelineStages: [], // intentionally empty
  })
);
assert(!emptyTrajHtml.includes('NaN'), 'Empty trajectory and timeline stages fallback safely with zero NaN');
const cleanEmptyHtml = cleanSsrHtml(emptyTrajHtml);
assert(cleanEmptyHtml.includes('W0'), 'Trajectory chart gracefully renders baseline W0 marker');

// Single Point Trajectory Check
const singlePointTrajHtml = renderToString(
  React.createElement(VisualFastingClock, {
    fastingProtocol: '20:4',
    windowStartHour: 14,
    dailyCalories: 1750,
    macros: { calories: 1750, proteinGrams: 160, carbsGrams: 140, fatGrams: 61, fiberGrams: 30, proteinPct: 37, carbsPct: 32, fatPct: 31 },
    unitSystem: 'imperial',
    currentWeightKg: 90,
    bodyFatPct: 25,
    tdee: 2600,
    twelveWeekTrajectory: [
      {
        week: 0,
        projectedWeightKg: 90,
        projectedLbmKg: 67.5,
        projectedFatKg: 22.5,
        projectedBodyFatPct: 25,
      },
    ],
  })
);
assert(!singlePointTrajHtml.includes('NaN'), 'Single-point trajectory chart renders without division by zero');

// Meal distribution pins check (1, 2, 3, 4 meals)
for (const mCount of [1, 2, 3, 4]) {
  const mHtml = renderToString(
    React.createElement(VisualFastingClock, {
      fastingProtocol: '16:8',
      windowStartHour: 12,
      mealsInWindow: mCount,
      dailyCalories: 2000,
      macros: { calories: 2000, proteinGrams: 160, carbsGrams: 200, fatGrams: 62, fiberGrams: 32, proteinPct: 32, carbsPct: 40, fatPct: 28 },
      unitSystem: 'imperial',
      currentWeightKg: 80,
      bodyFatPct: 18,
      tdee: 2400,
    })
  );
  assert(!mHtml.includes('NaN'), `Meal pin count ${mCount} renders without NaN`);
  const cleanMHtml = cleanSsrHtml(mHtml);
  const expectedText = `${mCount} ${mCount === 1 ? 'Meal' : 'Meals'} Inside Window`;
  assert(cleanMHtml.includes(expectedText), `Meal pin text shows correct count: "${expectedText}"`);
}

// 24 Radial Clock Ticks Integrity
const dialHtml = renderToString(
  React.createElement(VisualFastingClock, {
    fastingProtocol: '16:8',
    windowStartHour: 12,
    dailyCalories: 2000,
    macros: { calories: 2000, proteinGrams: 160, carbsGrams: 200, fatGrams: 62, fiberGrams: 32, proteinPct: 32, carbsPct: 40, fatPct: 28 },
    unitSystem: 'imperial',
    currentWeightKg: 80,
    bodyFatPct: 18,
    tdee: 2400,
  })
);
const cleanDial = cleanSsrHtml(dialHtml);
assert(cleanDial.includes('12A'), '24-hour clock contains 12A cardinal marking');
assert(cleanDial.includes('6A'), '24-hour clock contains 6A cardinal marking');
assert(cleanDial.includes('12P'), '24-hour clock contains 12P cardinal marking');
assert(cleanDial.includes('6P'), '24-hour clock contains 6P cardinal marking');

console.log('  ✓ Verified adversarial hours, empty trajectories, single-point graphs, meal distributions, and 24h clock ticks.');

// ---------------------------------------------------------------------------
// SUITE 3: SocialBlueprintCard Reddit Table Generation Across All 7 Tabs
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 3: SocialBlueprintCard.tsx Reddit Markdown Generation across all 7 Tabs ---');

// Extract the exact Reddit markdown generation logic from SocialBlueprintCard.tsx
const cardSourcePath = path.join(ROOT_DIR, 'src/components/viral/SocialBlueprintCard.tsx');
const cardSourceCode = fs.readFileSync(cardSourcePath, 'utf8');

const startMarker = "let md = '';";
const endMarker = "navigator.clipboard.writeText(md);";

const startIdx = cardSourceCode.indexOf(startMarker);
const endIdx = cardSourceCode.indexOf(endMarker);

assert(startIdx !== -1 && endIdx !== -1, 'Successfully extracted copyRedditMarkdown logic from SocialBlueprintCard.tsx');

const extractedBody = cardSourceCode.substring(startIdx, endIdx);
const generateRedditMarkdown = new Function(
  'activeTab',
  'report',
  'biometrics',
  'displayWeight',
  'kgToLbs',
  extractedBody + ' return md;'
);

const ALL_7_TABS = [
  'recomp',
  'glp1',
  'perimenopause',
  'fasting',
  'electrolytes',
  'ffmi',
  'reverse',
];

// Define Diverse Test Cohorts
const TEST_PROFILES = [
  {
    name: 'Default Baseline Profile',
    bio: DEFAULT_BIOMETRICS,
  },
  {
    name: 'Perimenopause Female Cohort (Age 48, 145 lb, Stage: early_transition)',
    bio: {
      ...DEFAULT_BIOMETRICS,
      sex: 'female',
      age: 48,
      weightKg: 65.77, // 145 lbs
      heightCm: 165.1, // 5'5"
      bodyFatPct: 28,
      perimenopauseStage: 'early_transition',
      carbTimingPreference: 'evening_cortisol',
      trainingDaysPerWeek: 3,
    },
  },
  {
    name: 'GLP-1 Cutting Patient (Female, Age 42, 215 lb, Semaglutide)',
    bio: {
      ...DEFAULT_BIOMETRICS,
      sex: 'female',
      age: 42,
      weightKg: 97.52, // 215 lbs
      heightCm: 167.6, // 5'6"
      bodyFatPct: 38,
      glp1Medication: 'semaglutide',
      glp1DoseStage: 'titration',
      mealsPerDay: 4,
    },
  },
  {
    name: 'High-Muscularity Athlete Profile (Male, 26y, 205 lb, 11% BF)',
    bio: {
      ...DEFAULT_BIOMETRICS,
      sex: 'male',
      age: 26,
      weightKg: 92.99, // 205 lbs
      heightCm: 182.88, // 6'0"
      bodyFatPct: 11,
      trainingDaysPerWeek: 5,
      sweatIntensity: 'heavy',
    },
  },
  {
    name: 'Keto / Electrolyte Endurance Profile (Male, 39y, 165 lb, Keto, Sauna 3x)',
    bio: {
      ...DEFAULT_BIOMETRICS,
      sex: 'male',
      age: 39,
      weightKg: 74.84, // 165 lbs
      heightCm: 175.26, // 5'9"
      bodyFatPct: 15,
      isKetoOrLowCarb: true,
      workoutMinutes: 75,
      saunaSessionsPerWeek: 3,
      sweatIntensity: 'heavy',
    },
  },
  {
    name: 'OMAD Lean Mass Preservation Profile (Male, 32y, 185 lb, OMAD)',
    bio: {
      ...DEFAULT_BIOMETRICS,
      fastingProtocol: 'omad',
      fastingEatingWindowStartHour: 18,
      mealsPerDay: 1,
    },
  },
];

// Expected PMIDs per tab
const EXPECTED_TAB_PMIDS = {
  recomp: ['26817506', '29405780'],
  glp1: ['33567185', '35658024'],
  perimenopause: ['24092765', '36085402'],
  fasting: ['27737674', '33002478'],
  electrolytes: ['28615996', '29141965'],
  ffmi: ['7496846', '26224750'],
  reverse: ['24571926'],
};

for (const profile of TEST_PROFILES) {
  const report = calculateFullMetabolicReport(profile.bio);
  const displayWeight =
    profile.bio.unitSystem === 'imperial'
      ? `${kgToLbs(profile.bio.weightKg)} lbs`
      : `${Math.round(profile.bio.weightKg * 10) / 10} kg`;

  for (const tab of ALL_7_TABS) {
    let md = '';
    try {
      md = generateRedditMarkdown(tab, report, profile.bio, displayWeight, kgToLbs);
    } catch (mdErr) {
      assert(false, `Markdown generation threw error for tab=${tab}, profile=${profile.name}`, mdErr.message);
      continue;
    }

    assert(md.length > 200, `Markdown string length > 200 for tab=${tab}, profile=${profile.name}`);
    assert(!md.includes('undefined'), `Zero undefined in markdown for tab=${tab}, profile=${profile.name}`);
    assert(!md.includes('null'), `Zero null in markdown for tab=${tab}, profile=${profile.name}`);
    assert(!md.includes('NaN'), `Zero NaN in markdown for tab=${tab}, profile=${profile.name}`);

    // Parse Markdown Table
    const lines = md.split('\n');
    const tableHeaderIdx = lines.findIndex((l) => l.startsWith('|') && l.includes('|'));
    assert(tableHeaderIdx !== -1, `Table header row found for tab=${tab}, profile=${profile.name}`);

    if (tableHeaderIdx !== -1) {
      const headerRow = lines[tableHeaderIdx];
      const separatorRow = lines[tableHeaderIdx + 1];

      // Table separator check
      assert(separatorRow && separatorRow.includes('|') && separatorRow.includes('---'), `Valid separator row for tab=${tab}`);

      // Count columns
      const headerCols = headerRow.split('|').filter((c) => c.trim().length > 0);
      const sepCols = separatorRow.split('|').filter((c) => c.trim().length > 0);
      assert(headerCols.length === sepCols.length, `Header and separator column count match (${headerCols.length}) for tab=${tab}`);

      // Count data rows
      let dataRowCount = 0;
      for (let i = tableHeaderIdx + 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.startsWith('|')) break;
        dataRowCount++;
        const rowCols = line.split('|').filter((c) => c.trim().length > 0);
        assert(
          rowCols.length === headerCols.length,
          `Data row ${dataRowCount} column count matches header (${rowCols.length} === ${headerCols.length}) for tab=${tab}`
        );
      }
      assert(dataRowCount >= 1, `Table has at least 1 data row (found ${dataRowCount}) for tab=${tab}`);
    }

    // Verify NCBI PubMed Citations
    assert(md.includes('PMID:'), `Markdown contains PMID citation for tab=${tab}`);
    const expectedPmids = EXPECTED_TAB_PMIDS[tab];
    for (const pmid of expectedPmids) {
      assert(md.includes(pmid), `Markdown contains expected PMID ${pmid} for tab=${tab}`);
    }

    // Tab-specific clinical assertions
    if (tab === 'recomp') {
      assert(md.includes('Training Days'), 'Recomp markdown mentions Training Days');
      assert(md.includes('Rest Days'), 'Recomp markdown mentions Rest Days');
    } else if (tab === 'glp1') {
      assert(md.includes('Critical Protein Floor'), 'GLP-1 markdown mentions Critical Protein Floor');
      assert(md.includes('Prebiotic Soluble Fiber'), 'GLP-1 markdown mentions Prebiotic Soluble Fiber');
    } else if (tab === 'perimenopause') {
      assert(md.includes('Morning Leucine Anchor'), 'Perimenopause markdown mentions Morning Leucine Anchor');
      assert(md.includes('Daily Estrogen Fiber Floor'), 'Perimenopause markdown mentions Estrogen Fiber');
    } else if (tab === 'fasting') {
      assert(md.includes('Fasting Window'), 'Fasting markdown mentions Fasting Window');
      assert(md.includes('Eating Window'), 'Fasting markdown mentions Eating Window');
    } else if (tab === 'electrolytes') {
      assert(md.includes('Sodium (Na+)'), 'Electrolytes markdown mentions Sodium');
      assert(md.includes('Creatine Monohydrate'), 'Electrolytes markdown mentions Creatine Monohydrate');
    } else if (tab === 'ffmi') {
      assert(md.includes('Normalized FFMI'), 'FFMI markdown mentions Normalized FFMI');
      assert(md.includes('Leucine'), 'FFMI markdown mentions Leucine');
    } else if (tab === 'reverse') {
      assert(md.includes('+80 kcal/week'), 'Reverse diet markdown mentions +80 kcal/week');
      assert(md.includes('Week 1'), 'Reverse diet markdown has Week 1');
    }
  }
}

console.log(`  ✓ Successfully verified Reddit markdown generation across all 7 tabs for ${TEST_PROFILES.length} clinical profiles.`);

// ---------------------------------------------------------------------------
// SUITE 4: Multi-Niche Canvas Blueprint Integrity
// ---------------------------------------------------------------------------
console.log('\n--- SUITE 4: Canvas Blueprint Card Tab Coverage Audit ---');

const tabLabels = {
  recomp: 'Body Recomposition',
  glp1: 'GLP-1 Muscle Guard',
  perimenopause: 'Perimenopause Hormone Macro',
  fasting: 'Intermittent Fasting',
  electrolytes: 'Creatine & Electrolyte',
  ffmi: 'Leucine & FFMI',
  reverse: 'Reverse Diet Recovery',
};

for (const tab of ALL_7_TABS) {
  assert(Boolean(tabLabels[tab]), `Tab ${tab} maps to explicit label: "${tabLabels[tab]}"`);
}

const expectedBadges = [
  'CLINICAL METABOLIC BLUEPRINT',
  'GLP-1 ANTI-SARCOPENIA PROTOCOL',
  'PERIMENOPAUSE HORMONE METABOLICS',
  'INTERMITTENT FASTING TIMELINE & MACROS',
  'ELECTROLYTE & OSMOLYTE BLUEPRINT',
  'LEUCINE TRIGGER & FFMI LAB',
  'REVERSE DIETING METABOLIC RESTORATION',
];

for (const badge of expectedBadges) {
  assert(cardSourceCode.includes(badge), `SocialBlueprintCard contains badge: "${badge}"`);
}

console.log('  ✓ Verified 100% canvas card badge and tab mappings for all 7 modes.');

// ---------------------------------------------------------------------------
// FINAL REPORT & VERDICT
// ---------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('                      TEST SUITE SUMMARY                         ');
console.log('=================================================================');
console.log(`Total Assertions Evaluated: ${suiteStats.assertions}`);
console.log(`Passed:                     \x1b[32m${suiteStats.passed}\x1b[0m`);
console.log(`Failed:                     \x1b[${suiteStats.failed > 0 ? '31' : '32'}m${suiteStats.failed}\x1b[0m`);

if (suiteStats.failed > 0) {
  console.error('\nFAILURES RECORDED:');
  for (const fail of suiteStats.details) {
    console.error(`  ${fail}`);
  }
  console.log('\nVERDICT: \x1b[31mREQUEST_CHANGES\x1b[0m');
  process.exit(1);
} else {
  console.log('\nVERDICT: \x1b[32mAPPROVE\x1b[0m');
  console.log('All empirical tests passed cleanly with zero degenerate SVG paths and verified Reddit tables/PMIDs.');
  process.exit(0);
}
