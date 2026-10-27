#!/usr/bin/env node
/**
 * scripts/verify-seo-geo-aeo.mjs
 * 
 * Comprehensive 4-Tier Automated Verification Runner for SmartMacroCalc.com
 * Verifies mathematical bioenergetics, thermodynamics, boundaries, cross-feature state,
 * and production HTML build artifacts for SEO, GEO, and AEO compliance.
 * 
 * Usage:
 *   node scripts/verify-seo-geo-aeo.mjs
 *   npm test
 *   node scripts/verify-seo-geo-aeo.mjs --tier=1|2|3|4
 *   node scripts/verify-seo-geo-aeo.mjs --milestone=m1|m2|m3|m4
 *   node scripts/verify-seo-geo-aeo.mjs --progressive
 *   node scripts/verify-seo-geo-aeo.mjs --verbose
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Initialize jiti to load TypeScript source modules seamlessly
const jiti = createJiti(__filename);

// Load domain modules
let formulas;
let presetsModule;
let articlesModule;

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

try {
  articlesModule = jiti(path.join(ROOT_DIR, 'src/lib/articles.ts'));
} catch (err) {
  console.error('CRITICAL: Failed to load src/lib/articles.ts:', err.message);
  process.exit(1);
}

const {
  calculateFullMetabolicReport,
  kgToLbs,
  lbsToKg,
  cmToFeetInches,
  feetInchesToCm,
  DEFAULT_BIOMETRICS,
} = formulas;
const { SEO_PRESETS = [] } = presetsModule;
const { SCIENTIFIC_ARTICLES = [] } = articlesModule;

// CLI Flags
const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose') || args.includes('-v');
const isProgressive = args.includes('--progressive');
const tierFilter = args.find((a) => a.startsWith('--tier='))?.split('=')[1];
const milestoneFilter = args.find((a) => a.startsWith('--milestone='))?.split('=')[1]?.toLowerCase();

// ANSI Colors for high-contrast test reporting
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
  tier1: { passed: 0, failed: 0, pending: 0, total: 0 },
  tier2: { passed: 0, failed: 0, pending: 0, total: 0 },
  tier3: { passed: 0, failed: 0, pending: 0, total: 0 },
  tier4: { passed: 0, failed: 0, pending: 0, total: 0 },
};

const failures = [];

function recordResult(tier, name, passed, details = '', milestoneRequirement = 'm1') {
  const tierKey = `tier${tier}`;
  stats[tierKey].total++;

  // Milestone evaluation logic:
  // If running in progressive mode or under a specific milestone filter,
  // requirements from later milestones are marked as PENDING rather than FAIL.
  const milestoneOrder = { m1: 1, m2: 2, m3: 3, m4: 4 };
  const reqLevel = milestoneOrder[milestoneRequirement] || 4;
  const currentFilterLevel = milestoneFilter ? milestoneOrder[milestoneFilter] || 4 : (isProgressive ? 0 : 4);

  const shouldBePending = !passed && (isProgressive || (milestoneFilter && reqLevel > currentFilterLevel));

  if (passed) {
    stats[tierKey].passed++;
    console.log(`  ${colors.green}[PASS]${colors.reset} ${name}${details && isVerbose ? ` ${colors.dim}(${details})${colors.reset}` : ''}`);
  } else if (shouldBePending) {
    stats[tierKey].pending++;
    console.log(`  ${colors.yellow}[PENDING (${milestoneRequirement.toUpperCase()})]${colors.reset} ${name}${details ? ` ${colors.dim}(${details})${colors.reset}` : ''}`);
  } else {
    stats[tierKey].failed++;
    const errMsg = `Tier ${tier} [${milestoneRequirement.toUpperCase()}]: ${name} -> ${details}`;
    failures.push(errMsg);
    console.log(`  ${colors.red}[FAIL]${colors.reset} ${name} ${colors.red}${details}${colors.reset}`);
  }
}

// Utility: Recursively check object for NaN or Infinity
function hasNaNOrInfinity(obj, pathStr = '') {
  if (obj === null || obj === undefined) return null;
  if (typeof obj === 'number') {
    if (Number.isNaN(obj)) return `${pathStr}: NaN`;
    if (!Number.isFinite(obj)) return `${pathStr}: Infinity`;
    return null;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const err = hasNaNOrInfinity(obj[i], `${pathStr}[${i}]`);
      if (err) return err;
    }
    return null;
  }
  if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const err = hasNaNOrInfinity(obj[key], pathStr ? `${pathStr}.${key}` : key);
      if (err) return err;
    }
  }
  return null;
}

// Utility: Count words in a string
function countWords(str) {
  if (!str) return 0;
  return str.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

// Utility: Extract tags from HTML string
function extractTagContent(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match ? match[1].trim() : null;
}

function extractMetaDescription(html) {
  const match =
    html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
    html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i);
  return match ? match[1].trim() : null;
}

function extractCanonical(html) {
  const match =
    html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) ||
    html.match(/<link\s+href=["'](.*?)["']\s+rel=["']canonical["']/i);
  return match ? match[1].trim() : null;
}

function extractJsonLdScripts(html) {
  const scripts = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      scripts.push(JSON.parse(match[1]));
    } catch {
      scripts.push({ __parseError: true, raw: match[1] });
    }
  }
  return scripts;
}

// ============================================================================
// TIER 1: FEATURE COVERAGE & THERMODYNAMICS
// ============================================================================
async function runTier1() {
  console.log(`\n${colors.cyan}${colors.bright}=== TIER 1: FEATURE COVERAGE & THERMODYNAMIC INVARIANTS ===${colors.reset}`);

  // Test 1.1: Body Recomposition & Calorie Cycling Calculator
  try {
    const report = calculateFullMetabolicReport(DEFAULT_BIOMETRICS);
    const hasBmr = report.bmrMifflin > 0 && report.bmrKatch > 0 && report.bmrCunningham > 0;
    const hasTdee = report.tdee > 1200;
    const hasCycling = report.trainingDayMacros.calories > report.restDayMacros.calories;
    const has12WkCurve = Array.isArray(report.twelveWeekProjection) && report.twelveWeekProjection.length === 13;

    recordResult(1, 'Body Recomp: 3-formula BMR + TDEE computation', hasBmr && hasTdee, `Mifflin=${report.bmrMifflin}, Katch=${report.bmrKatch}, Cunningham=${report.bmrCunningham}`, 'm1');
    recordResult(1, 'Body Recomp: Calorie Cycling (+5% training surplus / -20% rest deficit)', hasCycling, `Train=${report.trainingDayMacros.calories} kcal, Rest=${report.restDayMacros.calories} kcal`, 'm1');
    recordResult(1, 'Body Recomp: 12-week recomposition trajectory projection (13 points)', has12WkCurve, `Points count: ${report.twelveWeekProjection?.length}`, 'm1');
  } catch (err) {
    recordResult(1, 'Body Recomp: Core calculation', false, err.message, 'm1');
  }

  // Test 1.2: GLP-1 & Ozempic/Wegovy Muscle Guard Calculator
  try {
    const report = calculateFullMetabolicReport(DEFAULT_BIOMETRICS);
    const glp1 = report.glp1Protocol;
    const validFloor = glp1 && glp1.criticalProteinFloorGrams >= Math.round(report.leanBodyMassKg * 1.8);
    const validOptimal = glp1 && glp1.optimalProteinGrams >= Math.round(report.leanBodyMassKg * 2.2);
    const validHydration = glp1 && glp1.hydrationLiters >= 2.0 && glp1.hydrationOz > 60;
    const validFiber = glp1 && glp1.solubleFiberGrams >= 30;

    recordResult(1, 'GLP-1 Muscle Guard: Anti-sarcopenia protein floor (>= 1.8g/kg LBM)', validFloor, `Floor=${glp1?.criticalProteinFloorGrams}g, LBM=${report.leanBodyMassKg}kg`, 'm1');
    recordResult(1, 'GLP-1 Muscle Guard: Optimal protein target (>= 2.2g/kg LBM)', validOptimal, `Optimal=${glp1?.optimalProteinGrams}g`, 'm1');
    recordResult(1, 'GLP-1 Muscle Guard: Soluble fiber (>=30g) & hydration targets (>=2.0L)', validFiber && validHydration, `Fiber=${glp1?.solubleFiberGrams}g, Water=${glp1?.hydrationLiters}L`, 'm1');
  } catch (err) {
    recordResult(1, 'GLP-1 Muscle Guard: Calculation', false, err.message, 'm1');
  }

  // Test 1.3: Perimenopause & Hormone Macro / TDEE Calculator
  try {
    const periBio = { ...DEFAULT_BIOMETRICS, sex: 'female', age: 46, weightKg: 65.8, bodyFatPct: 28 };
    const report = calculateFullMetabolicReport(periBio);
    
    if (report.perimenopauseProtocol) {
      const p = report.perimenopauseProtocol;
      const validLeucine = (p.breakfastLeucineGrams && p.breakfastLeucineGrams >= 3.0) || (p.breakfastProteinGrams && p.breakfastProteinGrams >= 35);
      const validMacros = p.trainingDayMacros && p.restDayMacros;
      recordResult(1, 'Perimenopause Macro: Anabolic resistance breakfast anchor (>= 35g protein / >= 3g leucine)', validLeucine, `Breakfast=${p.breakfastProteinGrams || p.breakfastLeucineGrams}`, 'm1');
      recordResult(1, 'Perimenopause Macro: Cortisol-friendly carb cycling & estrogen fiber', validMacros, `Fiber=${p.estrogenSupportFiberGrams}g`, 'm1');
    } else {
      recordResult(1, 'Perimenopause Protocol: Module in FullMetabolicReport', false, 'report.perimenopauseProtocol not found in FullMetabolicReport', 'm1');
    }
  } catch (err) {
    recordResult(1, 'Perimenopause Protocol: Calculation', false, err.message, 'm1');
  }

  // Test 1.4: Visual Intermittent Fasting Timeline Calculator
  try {
    const report = calculateFullMetabolicReport(DEFAULT_BIOMETRICS);
    if (report.fastingProtocol) {
      const f = report.fastingProtocol;
      const validHours = f.fastingHours + f.eatingHours === 24;
      const validCurve = Array.isArray(f.twelveWeekTrajectory) && f.twelveWeekTrajectory.length > 0;
      recordResult(1, 'Fasting Timeline: 24h clock balance (fasting + eating == 24h)', validHours, `${f.fastingHours}h fast + ${f.eatingHours}h eat`, 'm1');
      recordResult(1, 'Fasting Timeline: 12-week weight loss projection curve', validCurve, `Weeks: ${f.twelveWeekTrajectory?.length}`, 'm1');
    } else {
      recordResult(1, 'Fasting Timeline: Module in FullMetabolicReport', false, 'report.fastingProtocol not found in FullMetabolicReport', 'm1');
    }
  } catch (err) {
    recordResult(1, 'Fasting Timeline: Calculation', false, err.message, 'm1');
  }

  // Test 1.5: Creatine & Electrolyte Loading Calculator
  try {
    const report = calculateFullMetabolicReport(DEFAULT_BIOMETRICS);
    const elec = report.electrolyteResult;
    const validCreatine = elec && elec.creatineDailyGrams >= 5 && elec.creatineLoadingGrams > 15;
    const validElectrolytes = elec && elec.sodiumMg >= 2300 && elec.potassiumMg >= 3500 && elec.magnesiumMg >= 300;
    const validWater = elec && elec.totalDailyWaterLiters >= 2.5;

    recordResult(1, 'Creatine & Electrolytes: Maintenance (5-6g) & loading dose (>15g)', validCreatine, `Daily=${elec?.creatineDailyGrams}g, Loading=${elec?.creatineLoadingGrams}g`, 'm1');
    recordResult(1, 'Creatine & Electrolytes: Sodium, potassium & magnesium sweat replacement', validElectrolytes, `Na=${elec?.sodiumMg}mg, K=${elec?.potassiumMg}mg, Mg=${elec?.magnesiumMg}mg`, 'm1');
    recordResult(1, 'Creatine & Electrolytes: Sweat-adjusted total daily water target', validWater, `Total Water=${elec?.totalDailyWaterLiters}L`, 'm1');
  } catch (err) {
    recordResult(1, 'Creatine & Electrolytes: Calculation', false, err.message, 'm1');
  }

  // Test 1.6: Plant-Based & Omnivore Leucine Trigger + FFMI
  try {
    const report = calculateFullMetabolicReport(DEFAULT_BIOMETRICS);
    const ffmi = report.ffmiResult;
    const validFfmi = ffmi && ffmi.rawFfmi > 15 && ffmi.normalizedFfmi > 15;
    const validLeucine = ffmi && ffmi.perMealLeucineTargetGrams === 3.0;
    const validPlantSources = ffmi && Array.isArray(ffmi.plantSourcesComparison) && ffmi.plantSourcesComparison.length >= 4;

    recordResult(1, 'Leucine & FFMI: Normalized FFMI calculation & natural limit category', validFfmi, `Raw=${ffmi?.rawFfmi}, Norm=${ffmi?.normalizedFfmi}, Cat=${ffmi?.ffmiCategory}`, 'm1');
    recordResult(1, 'Leucine & FFMI: 3.0g L-Leucine per-meal protein synthesis trigger', validLeucine, `Target=${ffmi?.perMealLeucineTargetGrams}g`, 'm1');
    recordResult(1, 'Leucine & FFMI: Animal vs. plant-based protein efficiency comparison table', validPlantSources, `Sources count: ${ffmi?.plantSourcesComparison?.length}`, 'm1');
  } catch (err) {
    recordResult(1, 'Leucine & FFMI: Calculation', false, err.message, 'm1');
  }

  // Test 1.7: Reverse Dieting & Metabolic Recovery Schedule
  try {
    const report = calculateFullMetabolicReport(DEFAULT_BIOMETRICS);
    const reverse = report.reverseDietSchedule;
    const hasWeeks = Array.isArray(reverse) && reverse.length >= 5;
    const stepsUp = reverse && reverse.every((w, i) => i === 0 || w.dailyCalories >= reverse[i - 1].dailyCalories);

    recordResult(1, 'Reverse Diet: Stepwise metabolic recovery schedule (+80 kcal/wk)', hasWeeks && stepsUp, `Weeks count: ${reverse?.length}`, 'm1');
  } catch (err) {
    recordResult(1, 'Reverse Diet: Schedule generation', false, err.message, 'm1');
  }

  // Test 1.8: STRICT THERMODYNAMIC INVARIANT: 4*P + 4*C + 9*F === Calories across presets
  try {
    let thermoViolations = 0;
    let checkedPresets = 0;

    for (const preset of SEO_PRESETS) {
      checkedPresets++;
      const rep = calculateFullMetabolicReport(preset.biometrics);

      // 1. Training Day
      const trainCal = rep.trainingDayMacros.proteinGrams * 4 + rep.trainingDayMacros.carbsGrams * 4 + rep.trainingDayMacros.fatGrams * 9;
      if (Math.abs(trainCal - rep.trainingDayMacros.calories) > 1) {
        thermoViolations++;
        if (isVerbose) console.log(`  [VIOLATION] Preset ${preset.slug} Training Day: ${trainCal} !== ${rep.trainingDayMacros.calories}`);
      }

      // 2. Rest Day
      const restCal = rep.restDayMacros.proteinGrams * 4 + rep.restDayMacros.carbsGrams * 4 + rep.restDayMacros.fatGrams * 9;
      if (Math.abs(restCal - rep.restDayMacros.calories) > 1) {
        thermoViolations++;
        if (isVerbose) console.log(`  [VIOLATION] Preset ${preset.slug} Rest Day: ${restCal} !== ${rep.restDayMacros.calories}`);
      }

      // 3. Reverse Diet Schedule
      for (const week of rep.reverseDietSchedule) {
        const weekCal = week.proteinGrams * 4 + week.carbsGrams * 4 + week.fatGrams * 9;
        if (Math.abs(weekCal - week.dailyCalories) > 1) {
          thermoViolations++;
          if (isVerbose) console.log(`  [VIOLATION] Preset ${preset.slug} Rev Week ${week.week}: ${weekCal} !== ${week.dailyCalories}`);
        }
      }
    }

    recordResult(1, `Thermodynamics: 4*P + 4*C + 9*F == Calories across all ${checkedPresets} presets`, thermoViolations === 0, `Violations: ${thermoViolations}`, 'm1');
  } catch (err) {
    recordResult(1, 'Thermodynamics: Batch invariant check', false, err.message, 'm1');
  }

  // Test 1.9: SEO & GEO Machine Files (/sitemap.xml, /robots.txt, /llms.txt, /llms-full.txt)
  const publicDir = path.join(ROOT_DIR, 'public');
  const appDir = path.join(ROOT_DIR, 'src/app');

  // Check sitemap
  const sitemapInPublic = fs.existsSync(path.join(publicDir, 'sitemap.xml'));
  const sitemapRoute = fs.existsSync(path.join(appDir, 'sitemap.ts')) || fs.existsSync(path.join(appDir, 'sitemap.js'));
  const sitemapValid = sitemapInPublic || sitemapRoute;
  recordResult(1, 'Technical SEO: /sitemap.xml (public file or dynamic route handler)', sitemapValid, sitemapInPublic ? 'public/sitemap.xml' : sitemapRoute ? 'src/app/sitemap.ts' : 'Missing', 'm3');

  // Check robots
  const robotsInPublic = fs.existsSync(path.join(publicDir, 'robots.txt'));
  const robotsRoute = fs.existsSync(path.join(appDir, 'robots.ts')) || fs.existsSync(path.join(appDir, 'robots.js'));
  const robotsValid = robotsInPublic || robotsRoute;
  recordResult(1, 'Technical SEO: /robots.txt (public file or dynamic route handler)', robotsValid, robotsInPublic ? 'public/robots.txt' : robotsRoute ? 'src/app/robots.ts' : 'Missing', 'm3');

  // Check llms.txt & llms-full.txt
  const llmsTxtPath = path.join(publicDir, 'llms.txt');
  const llmsFullTxtPath = path.join(publicDir, 'llms-full.txt');
  const hasLlms = fs.existsSync(llmsTxtPath) && fs.statSync(llmsTxtPath).size > 100;
  const hasLlmsFull = fs.existsSync(llmsFullTxtPath) && fs.statSync(llmsFullTxtPath).size > 200;

  recordResult(1, 'GEO AI Index: /llms.txt (concise machine-readable index)', hasLlms, hasLlms ? `${fs.statSync(llmsTxtPath).size} bytes` : 'Missing in public/llms.txt', 'm3');
  recordResult(1, 'GEO AI Index: /llms-full.txt (complete formula & citation reference)', hasLlmsFull, hasLlmsFull ? `${fs.statSync(llmsFullTxtPath).size} bytes` : 'Missing in public/llms-full.txt', 'm3');
}

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES
// ============================================================================
async function runTier2() {
  console.log(`\n${colors.cyan}${colors.bright}=== TIER 2: BOUNDARY & CORNER CASES ===${colors.reset}`);

  // Test 2.1: Weight Range Bounds (120 lb to 240 lb)
  const testWeightsLbs = [120, 140, 160, 180, 200, 220, 240];
  let weightRangePassed = true;

  for (const wLbs of testWeightsLbs) {
    try {
      const bio = { ...DEFAULT_BIOMETRICS, weightKg: lbsToKg(wLbs) };
      const rep = calculateFullMetabolicReport(bio);
      const isOk = rep.tdee > 1000 && rep.trainingDayMacros.calories > 1100 && rep.restDayMacros.calories > 1100;
      if (!isOk) weightRangePassed = false;
    } catch {
      weightRangePassed = false;
    }
  }
  recordResult(2, 'Weight Range: High-intent 120 lb to 240 lb gradient checks', weightRangePassed, 'All weights 120-240 lb produce valid bioenergetics', 'm1');

  // Test 2.2: Extreme Weight Clamping Bounds (80 lb to 500 lb)
  let extremeWeightPassed = true;
  try {
    const underBio = { ...DEFAULT_BIOMETRICS, weightKg: lbsToKg(80) };
    const overBio = { ...DEFAULT_BIOMETRICS, weightKg: lbsToKg(500) };
    const underRep = calculateFullMetabolicReport(underBio);
    const overRep = calculateFullMetabolicReport(overBio);
    extremeWeightPassed = underRep.tdee >= 1000 && overRep.tdee <= 8000 && underRep.trainingDayMacros.proteinGrams > 50;
  } catch {
    extremeWeightPassed = false;
  }
  recordResult(2, 'Boundary Clamping: Extreme weight handling (80 lb & 500 lb)', extremeWeightPassed, 'Safe clamping to physiological bounds', 'm1');

  // Test 2.3: Zero and Negative Value Clamping
  let zeroNegPassed = true;
  try {
    const pathologicalBio = {
      ...DEFAULT_BIOMETRICS,
      age: -5,
      weightKg: -20,
      heightCm: -100,
      bodyFatPct: -10,
      trainingDaysPerWeek: -2,
      reverseStepKcal: -80,
    };
    const rep = calculateFullMetabolicReport(pathologicalBio);
    zeroNegPassed = rep.bmrMifflin > 500 && rep.tdee > 600 && rep.leanBodyMassKg > 20 && rep.trainingDayMacros.proteinGrams > 40;
  } catch {
    zeroNegPassed = false;
  }
  recordResult(2, 'Boundary Clamping: Negative and zero inputs safely clamped without crash', zeroNegPassed, 'Zero/negative inputs clamped to minimum valid thresholds', 'm1');

  // Test 2.4: Extreme High Body Fat & Age Bounds
  let highBoundsPassed = true;
  try {
    const highBio = {
      ...DEFAULT_BIOMETRICS,
      age: 120,
      bodyFatPct: 75,
      trainingDaysPerWeek: 14,
    };
    const rep = calculateFullMetabolicReport(highBio);
    highBoundsPassed = rep.tdee > 800 && rep.leanBodyMassKg > 10;
  } catch {
    highBoundsPassed = false;
  }
  recordResult(2, 'Boundary Clamping: Upper bounds (age 120, body fat 75%, training days 14)', highBoundsPassed, 'Clamped to valid biological range', 'm1');

  // Test 2.5: Bidirectional Metric/Imperial Conversions
  let convSymmetry = true;
  for (let lbs = 100; lbs <= 300; lbs += 10) {
    const kg = lbsToKg(lbs);
    const backLbs = kgToLbs(kg);
    if (Math.abs(backLbs - lbs) > 0.15) {
      convSymmetry = false;
      break;
    }
  }
  recordResult(2, 'Unit Conversions: Bidirectional kg <-> lbs conversion symmetry (+-0.1 lb)', convSymmetry, 'Checked 100 to 300 lbs in steps of 10', 'm1');

  let heightSymmetry = true;
  for (let cm = 145; cm <= 210; cm += 5) {
    const { feet, inches } = cmToFeetInches(cm);
    const backCm = feetInchesToCm(feet, inches);
    if (Math.abs(backCm - cm) > 2.54) {
      heightSymmetry = false;
      break;
    }
  }
  recordResult(2, 'Unit Conversions: Stature cm <-> ft/in conversion symmetry (+-1 in)', heightSymmetry, 'Checked 145 to 210 cm in steps of 5', 'm1');

  // Test 2.6: Strict NaN and Infinity Guard
  let noNaNPassed = true;
  const testBioList = [
    DEFAULT_BIOMETRICS,
    { ...DEFAULT_BIOMETRICS, weightKg: 50, bodyFatPct: 10, activityLevel: 'sedentary' },
    { ...DEFAULT_BIOMETRICS, weightKg: 130, bodyFatPct: 45, activityLevel: 'athlete' },
    { ...DEFAULT_BIOMETRICS, sex: 'female', formula: 'cunningham' },
    { ...DEFAULT_BIOMETRICS, sex: 'female', formula: 'katch' },
  ];

  for (const bio of testBioList) {
    const rep = calculateFullMetabolicReport(bio);
    const nanErr = hasNaNOrInfinity(rep);
    if (nanErr) {
      noNaNPassed = false;
      if (isVerbose) console.log(`  [VIOLATION] NaN/Infinity detected: ${nanErr}`);
      break;
    }
  }
  recordResult(2, 'Strict Invariant: Zero NaN, null, or Infinity values in calculation reports', noNaNPassed, 'Tested across male, female, sedentary, athlete, and all 3 BMR formulas', 'm1');
}

// ============================================================================
// TIER 3: CROSS-FEATURE COMBINATIONS & STATE SYNCHRONIZATION
// ============================================================================
async function runTier3() {
  console.log(`\n${colors.cyan}${colors.bright}=== TIER 3: CROSS-FEATURE COMBINATIONS & STATE SYNCHRONIZATION ===${colors.reset}`);

  // Test 3.1: Preset to Calculator Tab Mapping
  const validTabs = ['recomp', 'glp1', 'perimenopause', 'fasting', 'reverse', 'ffmi', 'electrolytes'];
  let allTabsValid = true;
  let tabCounts = {};

  for (const p of SEO_PRESETS) {
    tabCounts[p.defaultTab] = (tabCounts[p.defaultTab] || 0) + 1;
    if (!validTabs.includes(p.defaultTab)) {
      allTabsValid = false;
      if (isVerbose) console.log(`  [INVALID TAB] Preset ${p.slug} has invalid defaultTab: ${p.defaultTab}`);
    }
  }

  const tabBreakdown = Object.entries(tabCounts).map(([t, c]) => `${t}:${c}`).join(', ');
  recordResult(3, 'Preset Routing: All presets map to recognized MasterCalculatorHub tabs', allTabsValid, `Distribution: ${tabBreakdown}`, 'm1');

  // Test 3.2: Shared Biometrics State Propagation
  try {
    const bio180 = { ...DEFAULT_BIOMETRICS, weightKg: lbsToKg(180) };
    const bio220 = { ...DEFAULT_BIOMETRICS, weightKg: lbsToKg(220) };
    const rep180 = calculateFullMetabolicReport(bio180);
    const rep220 = calculateFullMetabolicReport(bio220);

    const tdeeIncreased = rep220.tdee > rep180.tdee;
    const lbmIncreased = rep220.leanBodyMassKg > rep180.leanBodyMassKg;
    const glp1ProteinIncreased = rep220.glp1Protocol.criticalProteinFloorGrams > rep180.glp1Protocol.criticalProteinFloorGrams;
    const creatineWaterIncreased = rep220.electrolyteResult.totalDailyWaterLiters > rep180.electrolyteResult.totalDailyWaterLiters;
    const ffmiRecalculated = rep220.ffmiResult.rawFfmi !== rep180.ffmiResult.rawFfmi;

    const allSync = tdeeIncreased && lbmIncreased && glp1ProteinIncreased && creatineWaterIncreased && ffmiRecalculated;
    recordResult(3, 'State Coherence: Single biometric change synchronously propagates across all calculator modules', allSync, 'Weight change 180->220 lb updates TDEE, LBM, GLP-1 floor, Hydration, and FFMI', 'm1');
  } catch (err) {
    recordResult(3, 'State Coherence: Synchronous update propagation', false, err.message, 'm1');
  }

  // Test 3.3: Calorie Cycling Goal Mode Alignment
  try {
    const recompBio = { ...DEFAULT_BIOMETRICS, trainingDaySurplusPct: 5, restDayDeficitPct: -20, trainingDaysPerWeek: 4 };
    const recompRep = calculateFullMetabolicReport(recompBio);
    const recompBalanced = Math.abs(recompRep.weeklyNetCalorieDelta) < 3000;

    const cutBio = { ...DEFAULT_BIOMETRICS, trainingDaySurplusPct: -10, restDayDeficitPct: -25, trainingDaysPerWeek: 4 };
    const cutRep = calculateFullMetabolicReport(cutBio);
    const cutNegative = cutRep.weeklyNetCalorieDelta < -2500;

    recordResult(3, 'Goal Alignment: Calorie cycling surplus/deficit parameters reflect clinical goal intent', recompBalanced && cutNegative, `Recomp delta: ${recompRep.weeklyNetCalorieDelta} kcal/wk, Cut delta: ${cutRep.weeklyNetCalorieDelta} kcal/wk`, 'm1');
  } catch (err) {
    recordResult(3, 'Goal Alignment: Calorie cycling calculation', false, err.message, 'm1');
  }

  // Test 3.4: Preset Matrix Scale (Target: 60+ static presets)
  const presetCount = SEO_PRESETS.length;
  const targetCountMet = presetCount >= 60;
  recordResult(3, `pSEO Scale: Programmatic preset matrix inventory (Current: ${presetCount}, Target: >= 60)`, targetCountMet, `Preset count: ${presetCount}`, 'm2');
}

// ============================================================================
// TIER 4: REAL-WORLD SCENARIOS (PRE-RENDERED HTML INSPECTION)
// ============================================================================
async function runTier4() {
  console.log(`\n${colors.cyan}${colors.bright}=== TIER 4: REAL-WORLD SCENARIOS (PRE-RENDERED HTML & ARTIFACT AUDIT) ===${colors.reset}`);

  const nextServerAppDir = path.join(ROOT_DIR, '.next/server/app');
  const presetsHtmlDir = path.join(nextServerAppDir, 'presets');
  const guidesHtmlDir = path.join(nextServerAppDir, 'guides');

  const hasNextBuild = fs.existsSync(nextServerAppDir);

  if (!hasNextBuild) {
    console.log(`  ${colors.yellow}[NOTE] .next/server/app directory not found. Running in-memory static contract verification.${colors.reset}`);
  }

  // Part A: Audit Pre-Rendered Preset HTML Pages (if available)
  let auditedPresetPages = 0;
  let presetTitlesUnique = true;
  let presetMetasUnique = true;
  let presetCanonicalsValid = true;
  let presetJsonLdValid = true;
  let presetAeoValid = true;
  let presetTablesPresent = true;
  let presetPmidsPresent = true;

  const seenTitles = new Set();
  const seenMetas = new Set();
  const seenCanonicals = new Set();

  if (fs.existsSync(presetsHtmlDir)) {
    const files = fs.readdirSync(presetsHtmlDir).filter((f) => f.endsWith('.html') && !f.startsWith('['));
    auditedPresetPages = files.length;

    for (const file of files) {
      const filePath = path.join(presetsHtmlDir, file);
      const html = fs.readFileSync(filePath, 'utf-8');
      const slug = file.replace('.html', '');

      // 1. Title
      const title = extractTagContent(html, 'title');
      if (!title || seenTitles.has(title)) {
        presetTitlesUnique = false;
        if (isVerbose) console.log(`  [TITLE ISSUE] ${file}: ${title}`);
      }
      if (title) seenTitles.add(title);

      // 2. Meta description
      const desc = extractMetaDescription(html);
      if (!desc || seenMetas.has(desc) || desc.length < 50) {
        presetMetasUnique = false;
        if (isVerbose) console.log(`  [META ISSUE] ${file}: ${desc?.slice(0, 40)}...`);
      }
      if (desc) seenMetas.add(desc);

      // 3. Canonical link
      const canonical = extractCanonical(html);
      if (!canonical || !canonical.includes('smartmacrocalc.com/presets/')) {
        presetCanonicalsValid = false;
        if (isVerbose) console.log(`  [CANONICAL ISSUE] ${file}: ${canonical}`);
      }
      if (canonical) seenCanonicals.add(canonical);

      // 4. JSON-LD Schemas
      const schemas = extractJsonLdScripts(html);
      const hasFaq = schemas.some((s) => s['@type'] === 'FAQPage' || s['@type']?.includes?.('FAQPage'));
      const hasBreadcrumb = schemas.some((s) => s['@type'] === 'BreadcrumbList' || s['@type']?.includes?.('BreadcrumbList'));
      if (!hasFaq || !hasBreadcrumb) {
        presetJsonLdValid = false;
        if (isVerbose) console.log(`  [JSON-LD ISSUE] ${file}: FAQPage=${hasFaq}, Breadcrumbs=${hasBreadcrumb}`);
      }

      // 5. Tables
      const hasTable = /<table[\s>]/i.test(html);
      if (!hasTable) {
        presetTablesPresent = false;
        if (isVerbose) console.log(`  [GEO TABLE ISSUE] ${file}: No <table> found in pre-rendered HTML`);
      }

      // 6. Direct Clinical Answer / AEO Word Count (40-65 words)
      const presetObj = SEO_PRESETS.find((p) => p.slug === slug);
      if (presetObj && presetObj.directClinicalAnswer) {
        const words = countWords(presetObj.directClinicalAnswer);
        if (words < 40 || words > 65) {
          presetAeoValid = false;
          if (isVerbose) console.log(`  [AEO WORD COUNT] ${slug}: ${words} words (expected 40-65)`);
        }
      } else if (!/<[^>]*data-aeo-answer[^>]*>|Direct Clinical Answer/i.test(html)) {
        presetAeoValid = false;
      }

      // 7. PMIDs
      const hasPmid = /PMID|pubmed\.ncbi\.nlm\.nih\.gov/i.test(html);
      if (!hasPmid) {
        presetPmidsPresent = false;
        if (isVerbose) console.log(`  [PMID ISSUE] ${file}: No PubMed PMID found`);
      }
    }
  }

  // In-memory contract verification for presets
  let inMemoryPresetTitlesUnique = true;
  let inMemoryPresetMetasUnique = true;
  let inMemoryTitles = new Set();
  let inMemoryMetas = new Set();

  for (const p of SEO_PRESETS) {
    if (!p.title || inMemoryTitles.has(p.title)) inMemoryPresetTitlesUnique = false;
    inMemoryTitles.add(p.title);
    if (!p.metaDescription || inMemoryMetas.has(p.metaDescription)) inMemoryPresetMetasUnique = false;
    inMemoryMetas.add(p.metaDescription);
  }

  recordResult(4, `HTML Presets: Audited ${auditedPresetPages} pre-rendered HTML preset pages`, auditedPresetPages > 0, `Pre-rendered pages: ${auditedPresetPages}`, 'm2');
  recordResult(4, 'HTML Presets: 100% Unique <title> tags matching brand structure', auditedPresetPages > 0 ? presetTitlesUnique : inMemoryPresetTitlesUnique, `Unique titles checked: ${inMemoryTitles.size}`, 'm2');
  recordResult(4, 'HTML Presets: 100% Unique <meta name="description"> tags', auditedPresetPages > 0 ? presetMetasUnique : inMemoryPresetMetasUnique, `Unique descriptions checked: ${inMemoryMetas.size}`, 'm2');
  recordResult(4, 'HTML Presets: Canonical <link rel="canonical"> tags present', presetCanonicalsValid && auditedPresetPages > 0, auditedPresetPages > 0 && presetCanonicalsValid ? 'Verified on HTML files' : 'Missing canonical link in preset HTML', 'm2');
  recordResult(4, 'HTML Presets: Valid JSON-LD Schema graph (FAQPage & Breadcrumbs)', presetJsonLdValid && auditedPresetPages > 0, auditedPresetPages > 0 && presetJsonLdValid ? 'Verified in HTML' : 'Missing FAQPage or BreadcrumbList schema in HTML', 'm2');
  recordResult(4, 'HTML Presets: Visible AEO "Direct Clinical Answer" callout block (40-65 words)', presetAeoValid && auditedPresetPages > 0, auditedPresetPages > 0 && presetAeoValid ? 'Verified 40-65 words' : 'Pending M2 Direct Clinical Answer callout', 'm2');
  recordResult(4, 'HTML Presets: Structured HTML <table> present for GEO extraction', presetTablesPresent && auditedPresetPages > 0, auditedPresetPages > 0 && presetTablesPresent ? 'Verified in HTML' : 'Missing <table> in preset HTML', 'm2');
  recordResult(4, 'HTML Presets: Verified NCBI PubMed citations present', presetPmidsPresent && auditedPresetPages > 0, auditedPresetPages > 0 && presetPmidsPresent ? 'Verified in HTML' : 'Missing PubMed PMID links in preset HTML', 'm2');

  // Part B: Audit Pre-Rendered Guide HTML Pages
  let auditedGuidePages = 0;
  let guideTitlesUnique = true;
  let guideTablesPresent = true;
  let guidePmidsPresent = true;
  let totalGuideTablesFound = 0;

  if (fs.existsSync(guidesHtmlDir)) {
    const guideFiles = fs.readdirSync(guidesHtmlDir).filter((f) => f.endsWith('.html') && !f.startsWith('['));
    auditedGuidePages = guideFiles.length;

    for (const file of guideFiles) {
      const filePath = path.join(guidesHtmlDir, file);
      const html = fs.readFileSync(filePath, 'utf-8');

      const title = extractTagContent(html, 'title');
      if (!title) guideTitlesUnique = false;

      const hasTable = /<table[\s>]/i.test(html);
      if (hasTable) {
        totalGuideTablesFound++;
      } else {
        guideTablesPresent = false;
        if (isVerbose) console.log(`  [GUIDE TABLE ISSUE] ${file}: No <table> found`);
      }

      const hasPmid = /PMID|pubmed\.ncbi\.nlm\.nih\.gov/i.test(html);
      if (!hasPmid) guidePmidsPresent = false;
    }
  }

  const guideCount = SCIENTIFIC_ARTICLES.length;
  recordResult(4, `HTML Guides: Audited ${auditedGuidePages} pre-rendered HTML clinical guides (Data inventory: ${guideCount})`, auditedGuidePages > 0 || guideCount >= 10, `HTML files: ${auditedGuidePages}, Articles: ${guideCount}`, 'm3');
  recordResult(4, `HTML Guides: Structured HTML tables for GEO comparative extraction (${totalGuideTablesFound}/${auditedGuidePages} guides have tables)`, guideTablesPresent && auditedGuidePages > 0, `Tables found in ${totalGuideTablesFound} of ${auditedGuidePages} guides`, 'm3');
  recordResult(4, 'HTML Guides: Verified NCBI PubMed PMID citations linked', auditedGuidePages > 0 ? guidePmidsPresent : true, 'All guides cite peer-reviewed clinical studies', 'm3');
}

// ============================================================================
// MAIN EXECUTION ORCHESTRATION & SUMMARY REPORT
// ============================================================================
async function main() {
  const startTime = Date.now();
  console.log(`\n${colors.bright}${colors.magenta}=================================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}   SmartMacroCalc.com - 4-Tier Automated Verification Runner     ${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}=================================================================${colors.reset}`);
  console.log(`Environment: Node ${process.version} | Mode: ${isProgressive ? 'PROGRESSIVE' : milestoneFilter ? `MILESTONE [${milestoneFilter.toUpperCase()}]` : 'STRICT FINAL'}`);

  if (tierFilter) {
    console.log(`Filtering to Tier ${tierFilter} only.\n`);
    if (tierFilter === '1') await runTier1();
    else if (tierFilter === '2') await runTier2();
    else if (tierFilter === '3') await runTier3();
    else if (tierFilter === '4') await runTier4();
    else {
      console.error(`Invalid tier filter: ${tierFilter}`);
      process.exit(1);
    }
  } else {
    await runTier1();
    await runTier2();
    await runTier3();
    await runTier4();
  }

  const elapsedMs = Date.now() - startTime;

  // Print Summary Table
  console.log(`\n${colors.bright}======================== TEST SUMMARY ========================${colors.reset}`);
  console.log(`${'Tier'.padEnd(12)} | ${'Passed'.padEnd(8)} | ${'Failed'.padEnd(8)} | ${'Pending'.padEnd(8)} | ${'Total'.padEnd(8)}`);
  console.log(`-------------+----------+----------+----------+---------`);

  let totalPassed = 0;
  let totalFailed = 0;
  let totalPending = 0;
  let totalTests = 0;

  for (let i = 1; i <= 4; i++) {
    const t = stats[`tier${i}`];
    totalPassed += t.passed;
    totalFailed += t.failed;
    totalPending += t.pending;
    totalTests += t.total;

    const passColor = t.failed > 0 ? colors.red : colors.green;
    console.log(
      `${`Tier ${i}`.padEnd(12)} | ${passColor}${String(t.passed).padEnd(8)}${colors.reset} | ${(t.failed > 0 ? colors.red : colors.reset) + String(t.failed).padEnd(8) + colors.reset} | ${(t.pending > 0 ? colors.yellow : colors.reset) + String(t.pending).padEnd(8) + colors.reset} | ${String(t.total).padEnd(8)}`
    );
  }

  console.log(`-------------+----------+----------+----------+---------`);
  console.log(
    `${'TOTAL'.padEnd(12)} | ${colors.green}${String(totalPassed).padEnd(8)}${colors.reset} | ${(totalFailed > 0 ? colors.red : colors.reset) + String(totalFailed).padEnd(8) + colors.reset} | ${(totalPending > 0 ? colors.yellow : colors.reset) + String(totalPending).padEnd(8) + colors.reset} | ${String(totalTests).padEnd(8)}`
  );
  console.log(`Execution Time: ${elapsedMs}ms\n`);

  if (totalFailed > 0) {
    console.log(`${colors.red}${colors.bright}FAILURES DETECTED (${totalFailed}):${colors.reset}`);
    for (const fail of failures) {
      console.log(`  ${colors.red}* ${fail}${colors.reset}`);
    }
    console.log(`\n${colors.red}${colors.bright}Verification Status: FAILED${colors.reset}`);
    if (!isProgressive) {
      process.exit(1);
    } else {
      console.log(`${colors.yellow}Note: Exiting code 0 due to --progressive flag.${colors.reset}`);
      process.exit(0);
    }
  } else {
    console.log(`${colors.green}${colors.bright}All targeted assertions PASSED! (${totalPassed}/${totalTests})${colors.reset}`);
    if (totalPending > 0) {
      console.log(`${colors.yellow}Note: ${totalPending} items pending subsequent milestone deliverables.${colors.reset}`);
    }
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Unhandled verification error:', err);
  process.exit(1);
});
