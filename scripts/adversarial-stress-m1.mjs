#!/usr/bin/env node
/**
 * scripts/adversarial-stress-m1.mjs
 * 
 * Adversarial Empirical Stress-Testing Suite for Milestone 1 (formulas.ts)
 * 
 * Generates 2,500+ random physiological profiles covering the entire parameter space:
 * - Weights: 80 - 450 lbs (and metric equivalent)
 * - Ages: 15 - 95 years
 * - Body Fat: 4% - 65%
 * - Sexes: male, female
 * - Unit systems: imperial, metric
 * - BMR Formulas: mifflin, katch, cunningham
 * - Activity Levels: sedentary, light, moderate, active, athlete
 * - Fasting Protocols: 16:8, 18:6, 20:4, omad
 * - Perimenopause Stages: early_transition, late_transition, postmenopause
 * - Clinical goals, appetite levels, workout/sweat conditions
 * 
 * Invariants Verified:
 * 1. Thermodynamic Equality: 4*P + 4*C + 9*F === Calories for ALL macro splits
 * 2. Leucine Breakfast Anchor: breakfastProteinAnchorGrams >= 35g, breakfastLeucineGrams >= 3.0g
 * 3. Zero NaN / Infinity / undefined across all calculated fields
 * 4. Zero Negative Values across physiological metrics (macros, calories, water, fiber, electrolytes)
 * 5. Fasting 24-Hour Circular Balance: fastingHours + eatingHours === 24
 * 6. Boundary & Degenerate Input Resistance: zero, negative, extreme values clamped safely
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const jiti = createJiti(__filename);
const {
  calculateFullMetabolicReport,
  calculatePerimenopauseProtocol,
  calculateFastingTimeline,
  buildMacroSplit,
  kgToLbs,
  lbsToKg,
  cmToFeetInches,
  feetInchesToCm,
  DEFAULT_BIOMETRICS,
  ACTIVITY_MULTIPLIERS,
} = jiti(path.join(ROOT_DIR, 'src/lib/formulas.ts'));

console.log('='.repeat(70));
console.log('  CHALLENGER ADVERSARIAL STRESS TEST SUITE — MILESTONE 1 (formulas.ts)');
console.log('='.repeat(70));

const NUM_RANDOM_PROFILES = 2500;
const results = {
  totalProfilesTested: 0,
  thermodynamics: {
    trainingDayPassed: 0,
    trainingDayFailed: 0,
    restDayPassed: 0,
    restDayFailed: 0,
    weeklyAvgPassed: 0,
    weeklyAvgFailed: 0,
    weeklyAvgDiscrepancies: [],
    periTrainingPassed: 0,
    periTrainingFailed: 0,
    periRestPassed: 0,
    periRestFailed: 0,
    fastingMacrosPassed: 0,
    fastingMacrosFailed: 0,
    reverseDietPassed: 0,
    reverseDietFailed: 0,
  },
  leucineAnchor: {
    proteinAnchorPassed: 0,
    proteinAnchorFailed: 0,
    leucineThresholdPassed: 0,
    leucineThresholdFailed: 0,
    minObservedProteinAnchor: Infinity,
    minObservedLeucine: Infinity,
  },
  numericalIntegrity: {
    nanCount: 0,
    infinityCount: 0,
    nanOccurrences: [],
    negativeCount: 0,
    negativeOccurrences: [],
  },
  fastingChronobiology: {
    clock24hPassed: 0,
    clock24hFailed: 0,
    trajectoryPointsPassed: 0,
    trajectoryPointsFailed: 0,
  },
  boundaryTests: {
    passed: 0,
    failed: 0,
    failures: [],
  },
};

const sexes = ['male', 'female'];
const formulas = ['mifflin', 'katch', 'cunningham'];
const activities = ['sedentary', 'light', 'moderate', 'active', 'athlete'];
const units = ['imperial', 'metric'];
const glpMeds = ['semaglutide', 'tirzepatide', 'liraglutide', 'retatrutide'];
const glpDoses = ['initiation', 'titration', 'maintenance'];
const appetiteLevels = ['mild', 'moderate', 'severe'];
const sweatLevels = ['low', 'moderate', 'heavy'];
const periStages = ['early_transition', 'late_transition', 'postmenopause'];
const fastProtos = ['16:8', '18:6', '20:4', 'omad'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomUniform(min, max) {
  return min + Math.random() * (max - min);
}

function checkDeepNumericalIntegrity(val, pathStr) {
  if (typeof val === 'number') {
    if (Number.isNaN(val)) {
      results.numericalIntegrity.nanCount++;
      if (results.numericalIntegrity.nanOccurrences.length < 10) {
        results.numericalIntegrity.nanOccurrences.push({ path: pathStr, val: 'NaN' });
      }
    } else if (!Number.isFinite(val)) {
      results.numericalIntegrity.infinityCount++;
      if (results.numericalIntegrity.nanOccurrences.length < 10) {
        results.numericalIntegrity.nanOccurrences.push({ path: pathStr, val: 'Infinity' });
      }
    } else if (val < 0) {
      // Allowed negative numbers: deficit delta in kcal/week, input deficit pct
      if (
        pathStr.endsWith('weeklyNetCalorieDelta') ||
        pathStr.endsWith('restDayDeficitPct')
      ) {
        return;
      }
      results.numericalIntegrity.negativeCount++;
      if (results.numericalIntegrity.negativeOccurrences.length < 10) {
        results.numericalIntegrity.negativeOccurrences.push({ path: pathStr, val });
      }
    }
  } else if (val && typeof val === 'object') {
    if (Array.isArray(val)) {
      val.forEach((item, idx) => checkDeepNumericalIntegrity(item, `${pathStr}[${idx}]`));
    } else {
      for (const [k, v] of Object.entries(val)) {
        checkDeepNumericalIntegrity(v, `${pathStr}.${k}`);
      }
    }
  }
}

// --------------------------------------------------------------------------
// TEST 1: 2,500 Random Physiological Profiles
// --------------------------------------------------------------------------
console.log(`\n[PHASE 1] Executing ${NUM_RANDOM_PROFILES} Random Physiological Profiles...`);

for (let i = 0; i < NUM_RANDOM_PROFILES; i++) {
  const weightLbs = randomUniform(80, 450);
  const weightKg = lbsToKg(weightLbs);
  const heightCm = randomUniform(120, 225);
  const age = Math.floor(randomUniform(15, 95));
  const bodyFatPct = randomUniform(4, 65);
  const unitSystem = randomChoice(units);
  const sex = randomChoice(sexes);
  const formula = randomChoice(formulas);
  const activityLevel = randomChoice(activities);
  const trainingDaysPerWeek = Math.floor(randomUniform(0, 8));
  const trainingDaySurplusPct = Math.floor(randomUniform(0, 30));
  const restDayDeficitPct = -Math.floor(randomUniform(0, 40));
  const proteinPerLbLbm = randomUniform(0.6, 1.6);
  const currentDietCalories = randomUniform(800, 4500);
  const reverseStepKcal = randomUniform(40, 180);
  const glp1Medication = randomChoice(glpMeds);
  const glp1DoseStage = randomChoice(glpDoses);
  const appetiteSuppressionLevel = randomChoice(appetiteLevels);
  const sweatIntensity = randomChoice(sweatLevels);
  const workoutMinutes = Math.floor(randomUniform(0, 150));
  const saunaSessionsPerWeek = Math.floor(randomUniform(0, 7));
  const isKetoOrLowCarb = Math.random() > 0.5;
  const mealsPerDay = Math.floor(randomUniform(1, 7));
  const perimenopauseStage = randomChoice(periStages);
  const fastingProtocol = randomChoice(fastProtos);
  const fastingEatingWindowStartHour = Math.floor(randomUniform(0, 24));

  const bio = {
    unitSystem,
    sex,
    age,
    weightKg,
    heightCm,
    bodyFatPct,
    formula,
    activityLevel,
    trainingDaysPerWeek,
    trainingDaySurplusPct,
    restDayDeficitPct,
    proteinPerLbLbm,
    currentDietCalories,
    reverseStepKcal,
    glp1Medication,
    glp1DoseStage,
    appetiteSuppressionLevel,
    sweatIntensity,
    workoutMinutes,
    saunaSessionsPerWeek,
    isKetoOrLowCarb,
    mealsPerDay,
    perimenopauseStage,
    fastingProtocol,
    fastingEatingWindowStartHour,
    fastingWindowStartHour: fastingEatingWindowStartHour,
  };

  const report = calculateFullMetabolicReport(bio);
  results.totalProfilesTested++;

  // 1. Thermodynamic Equality: 4*P + 4*C + 9*F === Calories
  // Training Day
  const tExpected = 4 * report.trainingDayMacros.proteinGrams + 4 * report.trainingDayMacros.carbsGrams + 9 * report.trainingDayMacros.fatGrams;
  if (tExpected === report.trainingDayMacros.calories) {
    results.thermodynamics.trainingDayPassed++;
  } else {
    results.thermodynamics.trainingDayFailed++;
  }

  // Rest Day
  const rExpected = 4 * report.restDayMacros.proteinGrams + 4 * report.restDayMacros.carbsGrams + 9 * report.restDayMacros.fatGrams;
  if (rExpected === report.restDayMacros.calories) {
    results.thermodynamics.restDayPassed++;
  } else {
    results.thermodynamics.restDayFailed++;
  }

  // Weekly Average
  const wAvg = report.weeklyAverageMacros;
  const wExpected = 4 * wAvg.proteinGrams + 4 * wAvg.carbsGrams + 9 * wAvg.fatGrams;
  if (wExpected === wAvg.calories) {
    results.thermodynamics.weeklyAvgPassed++;
  } else {
    results.thermodynamics.weeklyAvgFailed++;
    if (results.thermodynamics.weeklyAvgDiscrepancies.length < 5) {
      results.thermodynamics.weeklyAvgDiscrepancies.push({
        profile: i + 1,
        reportedCalories: wAvg.calories,
        calculatedCalories: wExpected,
        delta: wExpected - wAvg.calories,
        macros: { P: wAvg.proteinGrams, C: wAvg.carbsGrams, F: wAvg.fatGrams },
      });
    }
  }

  // Perimenopause Training Day
  const ptExpected = 4 * report.perimenopauseProtocol.trainingDayMacros.proteinGrams + 4 * report.perimenopauseProtocol.trainingDayMacros.carbsGrams + 9 * report.perimenopauseProtocol.trainingDayMacros.fatGrams;
  if (ptExpected === report.perimenopauseProtocol.trainingDayMacros.calories) {
    results.thermodynamics.periTrainingPassed++;
  } else {
    results.thermodynamics.periTrainingFailed++;
  }

  // Perimenopause Rest Day
  const prExpected = 4 * report.perimenopauseProtocol.restDayMacros.proteinGrams + 4 * report.perimenopauseProtocol.restDayMacros.carbsGrams + 9 * report.perimenopauseProtocol.restDayMacros.fatGrams;
  if (prExpected === report.perimenopauseProtocol.restDayMacros.calories) {
    results.thermodynamics.periRestPassed++;
  } else {
    results.thermodynamics.periRestFailed++;
  }

  // Fasting Macros
  const fmExpected = 4 * report.fastingProtocol.macros.proteinGrams + 4 * report.fastingProtocol.macros.carbsGrams + 9 * report.fastingProtocol.macros.fatGrams;
  if (fmExpected === report.fastingProtocol.macros.calories) {
    results.thermodynamics.fastingMacrosPassed++;
  } else {
    results.thermodynamics.fastingMacrosFailed++;
  }

  // Reverse Diet Schedule
  for (const week of report.reverseDietSchedule) {
    const revExpected = 4 * week.proteinGrams + 4 * week.carbsGrams + 9 * week.fatGrams;
    if (revExpected === week.dailyCalories) {
      results.thermodynamics.reverseDietPassed++;
    } else {
      results.thermodynamics.reverseDietFailed++;
    }
  }

  // 2. Leucine Breakfast Anchor: protein anchor >= 35g & leucine >= 3.0g
  const proteinAnchor = report.perimenopauseProtocol.breakfastProteinAnchorGrams;
  const leucineGrams = report.perimenopauseProtocol.breakfastLeucineGrams;

  if (proteinAnchor < results.leucineAnchor.minObservedProteinAnchor) {
    results.leucineAnchor.minObservedProteinAnchor = proteinAnchor;
  }
  if (leucineGrams < results.leucineAnchor.minObservedLeucine) {
    results.leucineAnchor.minObservedLeucine = leucineGrams;
  }

  if (proteinAnchor >= 35) {
    results.leucineAnchor.proteinAnchorPassed++;
  } else {
    results.leucineAnchor.proteinAnchorFailed++;
  }

  if (leucineGrams >= 3.0) {
    results.leucineAnchor.leucineThresholdPassed++;
  } else {
    results.leucineAnchor.leucineThresholdFailed++;
  }

  // 3. Fasting 24-Hour Circular Balance & Trajectory
  if (report.fastingProtocol.fastingHours + report.fastingProtocol.eatingHours === 24) {
    results.fastingChronobiology.clock24hPassed++;
  } else {
    results.fastingChronobiology.clock24hFailed++;
  }

  if (report.fastingProtocol.twelveWeekTrajectory.length === 13) {
    results.fastingChronobiology.trajectoryPointsPassed++;
  } else {
    results.fastingChronobiology.trajectoryPointsFailed++;
  }

  // 4. Numerical Integrity (zero NaN, zero negative values)
  checkDeepNumericalIntegrity(report, 'FullMetabolicReport');
}

// --------------------------------------------------------------------------
// TEST 2: Boundary & Corner Case Stress-Testing
// --------------------------------------------------------------------------
console.log('\n[PHASE 2] Executing Adversarial Boundary & Corner Cases...');

const boundaryCases = [
  { name: 'Ultra-light Weight (50 lbs / 22.7 kg)', patch: { weightKg: 22.68 } },
  { name: 'Super-heavyweight (600 lbs / 272 kg)', patch: { weightKg: 272.15 } },
  { name: 'Adolescent Age (12 yrs)', patch: { age: 12 } },
  { name: 'Centenarian Age (110 yrs)', patch: { age: 110 } },
  { name: 'Extreme Low Body Fat (3%)', patch: { bodyFatPct: 3 } },
  { name: 'Extreme High Body Fat (70%)', patch: { bodyFatPct: 70 } },
  { name: 'Dwarfism Stature (90 cm)', patch: { heightCm: 90 } },
  { name: 'Giant Stature (250 cm)', patch: { heightCm: 250 } },
  { name: 'Zero Training Days (0 days/wk)', patch: { trainingDaysPerWeek: 0 } },
  { name: 'Max Training Days (7 days/wk)', patch: { trainingDaysPerWeek: 7 } },
  { name: 'Extreme Low Calorie Diet (500 kcal)', patch: { currentDietCalories: 500 } },
  { name: 'Massive Surplus (+50%)', patch: { trainingDaySurplusPct: 50 } },
  { name: 'Deep Crash Deficit (-60%)', patch: { restDayDeficitPct: -60 } },
  { name: 'OMAD Fasting Protocol', patch: { fastingProtocol: 'omad' } },
  { name: 'High Protein Ratio (2.5 g/lb LBM)', patch: { proteinPerLbLbm: 2.5 } },
  { name: 'Zero Sweat Workout (0 min)', patch: { workoutMinutes: 0, sweatIntensity: 'low' } },
  { name: 'Marathon Session (300 min, heavy sweat)', patch: { workoutMinutes: 300, sweatIntensity: 'heavy', saunaSessionsPerWeek: 7 } },
];

for (const bCase of boundaryCases) {
  try {
    const bio = { ...DEFAULT_BIOMETRICS, ...bCase.patch };
    const rep = calculateFullMetabolicReport(bio);
    
    // Check no crash, no NaN
    let hasNaN = false;
    let hasNeg = false;
    
    const checkB = (val, pathStr) => {
      if (typeof val === 'number') {
        if (Number.isNaN(val) || !Number.isFinite(val)) hasNaN = true;
        if (val < 0 && !pathStr.endsWith('weeklyNetCalorieDelta') && !pathStr.endsWith('restDayDeficitPct')) {
          hasNeg = true;
        }
      } else if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
          val.forEach((item, idx) => checkB(item, `${pathStr}[${idx}]`));
        } else {
          for (const [k, v] of Object.entries(val)) {
            checkB(v, `${pathStr}.${k}`);
          }
        }
      }
    };
    checkB(rep, bCase.name);

    if (!hasNaN && !hasNeg) {
      results.boundaryTests.passed++;
    } else {
      results.boundaryTests.failed++;
      results.boundaryTests.failures.push({ name: bCase.name, hasNaN, hasNeg });
    }
  } catch (err) {
    results.boundaryTests.failed++;
    results.boundaryTests.failures.push({ name: bCase.name, error: err.message });
  }
}

// --------------------------------------------------------------------------
// TEST RESULTS SUMMARY & VERDICT
// --------------------------------------------------------------------------
console.log('\n' + '='.repeat(70));
console.log('                        EMPIRICAL RESULTS SUMMARY');
console.log('='.repeat(70));
console.log(`Total Random Profiles Evaluated: ${results.totalProfilesTested}`);

console.log('\n--- 1. THERMODYNAMIC EQUALITY (4*P + 4*C + 9*F === Calories) ---');
console.log(`  Training Day Macros:        ${results.thermodynamics.trainingDayPassed} passed, ${results.thermodynamics.trainingDayFailed} failed`);
console.log(`  Rest Day Macros:            ${results.thermodynamics.restDayPassed} passed, ${results.thermodynamics.restDayFailed} failed`);
console.log(`  Perimenopause Training:     ${results.thermodynamics.periTrainingPassed} passed, ${results.thermodynamics.periTrainingFailed} failed`);
console.log(`  Perimenopause Rest:         ${results.thermodynamics.periRestPassed} passed, ${results.thermodynamics.periRestFailed} failed`);
console.log(`  Fasting Protocol Macros:    ${results.thermodynamics.fastingMacrosPassed} passed, ${results.thermodynamics.fastingMacrosFailed} failed`);
console.log(`  Reverse Diet Schedule:      ${results.thermodynamics.reverseDietPassed} passed, ${results.thermodynamics.reverseDietFailed} failed`);
console.log(`  Weekly Average Macros:      ${results.thermodynamics.weeklyAvgPassed} passed, ${results.thermodynamics.weeklyAvgFailed} failed`);

if (results.thermodynamics.weeklyAvgFailed > 0) {
  console.log(`  [CRITICAL FINDING] Weekly Average Macros violated thermodynamic equality in ${results.thermodynamics.weeklyAvgFailed} / ${results.totalProfilesTested} profiles!`);
  console.log('  Discrepancy samples:');
  for (const s of results.thermodynamics.weeklyAvgDiscrepancies) {
    console.log(`    - Profile #${s.profile}: reported=${s.reportedCalories} kcal, 4*P+4*C+9*F=${s.calculatedCalories} kcal (delta: ${s.delta} kcal) [P:${s.macros.P} C:${s.macros.C} F:${s.macros.F}]`);
  }
}

console.log('\n--- 2. LEUCINE BREAKFAST ANCHOR (>= 35g Protein & >= 3.0g Leucine) ---');
console.log(`  Breakfast Protein Anchor (>= 35g): ${results.leucineAnchor.proteinAnchorPassed} passed, ${results.leucineAnchor.proteinAnchorFailed} failed (min: ${results.leucineAnchor.minObservedProteinAnchor}g)`);
console.log(`  Breakfast Leucine Grams (>= 3.0g): ${results.leucineAnchor.leucineThresholdPassed} passed, ${results.leucineAnchor.leucineThresholdFailed} failed (min: ${results.leucineAnchor.minObservedLeucine}g)`);

console.log('\n--- 3. FASTING 24-HOUR CHRONOBIOLOGY ---');
console.log(`  Fasting + Eating Hours === 24:     ${results.fastingChronobiology.clock24hPassed} passed, ${results.fastingChronobiology.clock24hFailed} failed`);
console.log(`  12-Week Trajectory Length === 13:  ${results.fastingChronobiology.trajectoryPointsPassed} passed, ${results.fastingChronobiology.trajectoryPointsFailed} failed`);

console.log('\n--- 4. NUMERICAL INTEGRITY (Zero NaN, Zero Negatives) ---');
console.log(`  NaN count:      ${results.numericalIntegrity.nanCount}`);
console.log(`  Infinity count: ${results.numericalIntegrity.infinityCount}`);
console.log(`  Negative count: ${results.numericalIntegrity.negativeCount}`);

if (results.numericalIntegrity.nanOccurrences.length > 0) {
  console.log('  NaN occurrences:', results.numericalIntegrity.nanOccurrences);
}
if (results.numericalIntegrity.negativeOccurrences.length > 0) {
  console.log('  Negative occurrences:', results.numericalIntegrity.negativeOccurrences);
}

console.log('\n--- 5. ADVERSARIAL BOUNDARY & CORNER CASES ---');
console.log(`  Boundary tests: ${results.boundaryTests.passed} passed, ${results.boundaryTests.failed} failed`);
if (results.boundaryTests.failures.length > 0) {
  console.log('  Failures:', results.boundaryTests.failures);
}

console.log('\n' + '='.repeat(70));
const hasThermodynamicFailure = results.thermodynamics.weeklyAvgFailed > 0;
const hasAnchorFailure = results.leucineAnchor.proteinAnchorFailed > 0 || results.leucineAnchor.leucineThresholdFailed > 0;
const hasNumericalFailure = results.numericalIntegrity.nanCount > 0 || results.numericalIntegrity.negativeCount > 0;
const hasBoundaryFailure = results.boundaryTests.failed > 0;

if (hasThermodynamicFailure || hasAnchorFailure || hasNumericalFailure || hasBoundaryFailure) {
  console.log('VERDICT: REQUEST_CHANGES');
  if (hasThermodynamicFailure) {
    console.log(`- Blocker 1: weeklyAverageMacros violates thermodynamic equality in ${results.thermodynamics.weeklyAvgFailed} of ${results.totalProfilesTested} profiles.`);
  }
  if (results.numericalIntegrity.negativeCount > 0) {
    console.log(`- Blocker 2: negative values found in ${results.numericalIntegrity.negativeCount} occurrences (e.g. weeklyExpectedLossLbs < 0 when TDEE < fastingMinCalFloor).`);
  }
  console.log('='.repeat(70));
  process.exit(1);
} else {
  console.log('VERDICT: APPROVE');
  console.log('='.repeat(70));
  process.exit(0);
}

