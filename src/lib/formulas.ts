export type UnitSystem = 'imperial' | 'metric';
export type Sex = 'male' | 'female';
export type BmrFormula = 'mifflin' | 'katch' | 'cunningham';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
export type GoalMode = 'recomp' | 'cut' | 'lean_bulk' | 'glp1';
export type Glp1Medication = 'semaglutide' | 'tirzepatide' | 'liraglutide' | 'retatrutide';

export type CalculatorTab =
  | 'recomp'
  | 'glp1'
  | 'perimenopause'
  | 'fasting'
  | 'electrolytes'
  | 'ffmi'
  | 'reverse';

export type PerimenopauseStage = 'early_transition' | 'late_transition' | 'postmenopause';
export type FastingProtocol = '16:8' | '18:6' | '20:4' | 'omad';

export interface UserBiometrics {
  unitSystem: UnitSystem;
  sex: Sex;
  age: number;
  weightKg: number; // stored canonically in kg, converted seamlessly in UI
  heightCm: number; // stored canonically in cm
  bodyFatPct: number;
  formula: BmrFormula;
  activityLevel: ActivityLevel;
  trainingDaysPerWeek: number;
  trainingDaySurplusPct: number; // e.g., +5%
  restDayDeficitPct: number; // e.g., -20%
  proteinPerLbLbm: number; // e.g., 1.15 g per lb of LBM
  // Reverse diet inputs
  currentDietCalories: number;
  reverseStepKcal: number; // e.g. +80 kcal/week
  // GLP-1 inputs
  glp1Medication: Glp1Medication;
  glp1DoseStage: 'initiation' | 'titration' | 'maintenance';
  appetiteSuppressionLevel: 'mild' | 'moderate' | 'severe';
  // Hydration & Creatine inputs
  sweatIntensity: 'low' | 'moderate' | 'heavy';
  workoutMinutes: number;
  saunaSessionsPerWeek: number;
  isKetoOrLowCarb: boolean;
  mealsPerDay: number;

  // Perimenopause inputs
  perimenopauseStage: PerimenopauseStage;
  carbTimingPreference?: 'evening_cortisol' | 'peri_workout';

  // Fasting inputs
  fastingProtocol: FastingProtocol;
  fastingEatingWindowStartHour: number; // 0-23 (e.g. 12 for 12:00 PM)
  fastingWindowStartHour?: number; // alias for fastingEatingWindowStartHour

  // Dietary preference input
  dietPreference?: 'omnivore' | 'plant_based';
}

export const DEFAULT_BIOMETRICS: UserBiometrics = {
  unitSystem: 'imperial', // Default to Imperial for US Tier-1 Market per PDF plan
  sex: 'male',
  age: 34,
  weightKg: 81.65, // ~180 lbs
  heightCm: 177.8, // ~5'10"
  bodyFatPct: 18,
  formula: 'mifflin',
  activityLevel: 'moderate',
  trainingDaysPerWeek: 4,
  trainingDaySurplusPct: 5,
  restDayDeficitPct: -20,
  proteinPerLbLbm: 1.15,
  currentDietCalories: 1750,
  reverseStepKcal: 80,
  glp1Medication: 'semaglutide',
  glp1DoseStage: 'titration',
  appetiteSuppressionLevel: 'moderate',
  sweatIntensity: 'moderate',
  workoutMinutes: 60,
  saunaSessionsPerWeek: 2,
  isKetoOrLowCarb: false,
  mealsPerDay: 4,

  // New micro-niche defaults
  perimenopauseStage: 'early_transition',
  carbTimingPreference: 'evening_cortisol',
  fastingProtocol: '16:8',
  fastingEatingWindowStartHour: 12, // 12:00 PM noon default
  fastingWindowStartHour: 12,
  dietPreference: 'omnivore',
};

export const ACTIVITY_MULTIPLIERS: Record<
  ActivityLevel,
  { multiplier: number; label: string; description: string }
> = {
  sedentary: {
    multiplier: 1.2,
    label: 'Sedentary (Desk Job)',
    description: 'Under 4,500 steps/day, minimal structured exercise',
  },
  light: {
    multiplier: 1.375,
    label: 'Lightly Active',
    description: '6,000–7,500 steps/day or 1–2 resistance sessions/week',
  },
  moderate: {
    multiplier: 1.55,
    label: 'Moderately Active (Recomp Sweet Spot)',
    description: '8,000–10,000 steps/day + 3–4 structured lifting sessions/week',
  },
  active: {
    multiplier: 1.725,
    label: 'Very Active / High Volume',
    description: '10,000+ steps/day + 5–6 intense training sessions/week',
  },
  athlete: {
    multiplier: 1.9,
    label: 'Competitive Athlete / Double Days',
    description: 'High-output metabolic demand, manual labor, or 2-a-day training',
  },
};

// Unit Conversion Helpers
export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462262 * 10) / 10;
}

export function lbsToKg(lbs: number): number {
  return lbs / 2.20462262;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export interface MacroSplit {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

export interface WeeklyProjectionPoint {
  week: number;
  projectedWeightKg: number;
  projectedLbmKg: number;
  projectedFatKg: number;
  projectedBodyFatPct: number;
}

export interface ReverseDietWeek {
  week: number;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  metabolicStatus: string;
}

export interface Glp1ProtocolResult {
  targetCalories: number;
  criticalProteinFloorGrams: number;
  optimalProteinGrams: number;
  proteinPerMealGrams: number;
  solubleFiberGrams: number;
  hydrationLiters: number;
  hydrationOz: number;
  muscleLossRiskScore: 'Low (Protected)' | 'Moderate' | 'High (Sarcopenia Alert)';
  leucinePerMealGrams: number;
  clinicalNotes: string[];
}

export interface ElectrolyteCreatineResult {
  creatineDailyGrams: number;
  creatineLoadingGrams: number;
  baselineWaterLiters: number;
  sweatReplacementLiters: number;
  totalDailyWaterLiters: number;
  totalDailyWaterOz: number;
  sodiumMg: number;
  potassiumMg: number;
  magnesiumMg: number;
}

export interface FfmiAndLeucineResult {
  leanBodyMassKg: number;
  leanBodyMassLbs: number;
  fatMassKg: number;
  fatMassLbs: number;
  rawFfmi: number;
  normalizedFfmi: number;
  ffmiCategory: string;
  naturalPotentialPct: number;
  perMealProteinTargetGrams: number;
  perMealLeucineTargetGrams: number;
  plantSourcesComparison: Array<{
    food: string;
    category: 'Animal / Whey' | 'Plant-Based';
    proteinFor3gLeucine: number;
    caloriesFor3gLeucine: number;
    leucinePct: number;
    servingDescription: string;
  }>;
}

export interface PerimenopauseProtocolResult {
  dailyCalories: number;
  trainingDayMacros: MacroSplit;
  restDayMacros: MacroSplit;
  dailyProteinFloorGrams: number;
  optimalDailyProteinGrams: number;
  dailyProteinTargetGrams?: number; // alias
  perMealProteinFloorGrams: number;
  breakfastProteinAnchorGrams: number;
  breakfastLeucineGrams: number;
  leucineThresholdGrams?: number; // alias
  cortisolSafetyCalorieFloor: number;
  estrogenSupportFiberGrams: number;
  phytoestrogenFiberGrams?: number; // alias
  cortisolWindowCarbsGrams: number;
  eveningCarbTargetGrams?: number; // alias
  isAgeCohortCompliant: boolean;
  clinicalRationale: string;
  clinicalNotes: string[];
}

export interface FastingTimelineStage {
  phaseIndex: number;
  phaseName: string;
  hourRange: string;
  startHourRelative: number;
  endHourRelative: number;
  metabolicProcess: string;
  primaryEnergySubstrate: string;
  insulinState: 'High' | 'Declining' | 'Basal Nadir';
  autophagyLevel: 'Suppressed' | 'Baseline' | 'Accelerated' | 'Peak';
  biomarkerSummary: string;
}

export interface FastingTimelineResult {
  protocol: FastingProtocol;
  protocolType?: FastingProtocol; // alias
  fastingHours: number;
  eatingHours: number;
  feedingHours?: number; // alias
  windowStartHour: number;
  windowEndHour: number;
  formattedWindow: string;
  defaultWindow?: string; // alias
  mealsInWindow: number;
  dailyCalories: number;
  macros: MacroSplit;
  weeklyExpectedLossLbs: number;
  muscleRetentionRisk: 'Optimal (Protected)' | 'Good' | 'Moderate' | 'High (Catabolic Alert)';
  timelineStages: FastingTimelineStage[];
  twelveWeekTrajectory: WeeklyProjectionPoint[];
  twelveWeekProjection?: WeeklyProjectionPoint[]; // alias
  clinicalRationale: string;
  clinicalNotes: string[];
}

export interface FullMetabolicReport {
  bmrMifflin: number;
  bmrKatch: number;
  bmrCunningham: number;
  selectedBmr: number;
  tdee: number;
  leanBodyMassKg: number;
  leanBodyMassLbs: number;
  trainingDayMacros: MacroSplit;
  restDayMacros: MacroSplit;
  weeklyAverageMacros: MacroSplit;
  weeklyNetCalorieDelta: number;
  twelveWeekProjection: WeeklyProjectionPoint[];
  reverseDietSchedule: ReverseDietWeek[];
  glp1Protocol: Glp1ProtocolResult;
  electrolyteResult: ElectrolyteCreatineResult;
  ffmiResult: FfmiAndLeucineResult;

  // Milestone 1 Micro-Niches
  perimenopauseProtocol: PerimenopauseProtocolResult;
  fastingProtocol: FastingTimelineResult;
}

export function buildMacroSplit(calories: number, proteinGrams: number, fatRatioOfCalories: number): MacroSplit {
  const targetCalories = Math.max(1100, Math.round(calories));
  // Cap protein at 50% of total calories on extreme low-calorie days so fat & carbs remain physiologically viable
  const maxProteinGrams = Math.floor((targetCalories * 0.5) / 4);
  const safeProtein = Math.min(Math.round(proteinGrams), maxProteinGrams);
  const proteinCalories = safeProtein * 4;

  // Ensure essential dietary fat (at least 40g, capped so protein + fat <= 88% of calories)
  const rawFatCalories = Math.max(targetCalories * fatRatioOfCalories, 40 * 9);
  const maxFatCalories = Math.max(35 * 9, targetCalories * 0.88 - proteinCalories);
  const fatGrams = Math.round(Math.min(rawFatCalories, maxFatCalories) / 9);
  const fatCalories = fatGrams * 9;

  const remainingCarbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbsGrams = Math.round(remainingCarbCalories / 4);

  // Exact thermodynamic total (4 kcal/g Protein + 4 kcal/g Carbs + 9 kcal/g Fat)
  const exactTotalCalories = proteinCalories + fatCalories + carbsGrams * 4;
  const proteinPct = Math.round((proteinCalories / exactTotalCalories) * 100);
  const fatPct = Math.round((fatCalories / exactTotalCalories) * 100);
  const carbsPct = Math.max(0, 100 - proteinPct - fatPct);
  const fiberGrams = Math.max(25, Math.min(45, Math.round((exactTotalCalories / 1000) * 14)));

  return {
    calories: exactTotalCalories,
    proteinGrams: safeProtein,
    carbsGrams,
    fatGrams,
    fiberGrams,
    proteinPct,
    carbsPct,
    fatPct,
  };
}

export function calculateFullMetabolicReport(bio: UserBiometrics): FullMetabolicReport {
  const weightKg = Math.max(35, Math.min(250, bio.weightKg));
  const heightCm = Math.max(120, Math.min(230, bio.heightCm));
  const age = Math.max(18, Math.min(90, bio.age));
  const bodyFatPct = Math.max(4, Math.min(60, bio.bodyFatPct));

  const leanBodyMassKg = weightKg * (1 - bodyFatPct / 100);
  const leanBodyMassLbs = kgToLbs(leanBodyMassKg);
  const fatMassKg = weightKg - leanBodyMassKg;
  const fatMassLbs = kgToLbs(fatMassKg);

  // 1. Mifflin-St Jeor (PMID: 2305711)
  const sexConstant = bio.sex === 'male' ? 5 : -161;
  const bmrMifflin = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + sexConstant);

  // 2. Katch-McArdle (BMR = 370 + 21.6 * LBM_kg)
  const bmrKatch = Math.round(370 + 21.6 * leanBodyMassKg);

  // 3. Cunningham Equation (BMR = 500 + 22 * LBM_kg)
  const bmrCunningham = Math.round(500 + 22 * leanBodyMassKg);

  const selectedBmr =
    bio.formula === 'katch'
      ? bmrKatch
      : bio.formula === 'cunningham'
        ? bmrCunningham
        : bmrMifflin;

  const activityMultiplier = ACTIVITY_MULTIPLIERS[bio.activityLevel].multiplier;
  const tdee = Math.round(selectedBmr * activityMultiplier);

  // Protein calculation anchored to Lean Body Mass
  const baseProteinGrams = Math.round(leanBodyMassLbs * bio.proteinPerLbLbm);

  // Calorie Cycling (Training Days vs Rest Days)
  const trainingCalories = Math.round(tdee * (1 + bio.trainingDaySurplusPct / 100));
  const restCalories = Math.round(tdee * (1 + bio.restDayDeficitPct / 100));

  // Training day: lower fat (22%), higher carbs for glycogen & mTOR signaling
  const trainingDayMacros = buildMacroSplit(trainingCalories, baseProteinGrams, 0.22);
  // Rest day: slightly higher protein (+5g) & essential fats (30%), lower carbs for insulin sensitivity
  const restDayMacros = buildMacroSplit(restCalories, baseProteinGrams + 5, 0.3);

  const trainingDays = Math.max(0, Math.min(7, bio.trainingDaysPerWeek));
  const restDays = 7 - trainingDays;

  const rawAvgCalories = Math.round(
    (trainingDayMacros.calories * trainingDays + restDayMacros.calories * restDays) / 7
  );
  const avgProtein = Math.round(
    (trainingDayMacros.proteinGrams * trainingDays + restDayMacros.proteinGrams * restDays) / 7
  );
  const avgFat = Math.round(
    (trainingDayMacros.fatGrams * trainingDays + restDayMacros.fatGrams * restDays) / 7
  );
  const avgCarbs = Math.max(
    0,
    Math.round((rawAvgCalories - (avgProtein * 4 + avgFat * 9)) / 4)
  );
  const avgCalories = avgProtein * 4 + avgCarbs * 4 + avgFat * 9;
  const avgFiber = Math.round(
    (trainingDayMacros.fiberGrams * trainingDays + restDayMacros.fiberGrams * restDays) / 7
  );

  const weeklyAverageMacros: MacroSplit = {
    calories: avgCalories,
    proteinGrams: avgProtein,
    carbsGrams: avgCarbs,
    fatGrams: avgFat,
    fiberGrams: avgFiber,
    proteinPct: Math.round(((avgProtein * 4) / avgCalories) * 100),
    carbsPct: Math.round(((avgCarbs * 4) / avgCalories) * 100),
    fatPct: Math.round(((avgFat * 9) / avgCalories) * 100),
  };

  const weeklyNetCalorieDelta = (avgCalories - tdee) * 7;

  // 12-Week Body Recomposition Projection (supports Deficit, Recomp, and Lean Surplus)
  const twelveWeekProjection: WeeklyProjectionPoint[] = [];
  let currentFatKg = fatMassKg;
  let currentLbmKg = leanBodyMassKg;

  const baseWeeklyLbmGainKg =
    trainingDays >= 3 && bio.proteinPerLbLbm >= 1.0
      ? bio.sex === 'male'
        ? 0.095
        : 0.055
      : 0.02;

  const weeklyLbmGainKg =
    weeklyNetCalorieDelta > 300 ? baseWeeklyLbmGainKg * 1.3 : baseWeeklyLbmGainKg;

  for (let week = 0; week <= 12; week++) {
    const totalWeight = currentFatKg + currentLbmKg;
    const bfPct = (currentFatKg / totalWeight) * 100;
    twelveWeekProjection.push({
      week,
      projectedWeightKg: Math.round(totalWeight * 100) / 100,
      projectedLbmKg: Math.round(currentLbmKg * 100) / 100,
      projectedFatKg: Math.round(currentFatKg * 100) / 100,
      projectedBodyFatPct: Math.round(bfPct * 10) / 10,
    });

    // Weekly fat delta: accounts for net energy balance minus energy partitioned into muscle protein synthesis
    const fatDeltaKg =
      weeklyNetCalorieDelta <= 0
        ? weeklyNetCalorieDelta / 7700 - weeklyLbmGainKg * 0.35
        : Math.max(-0.02, (weeklyNetCalorieDelta - weeklyLbmGainKg * 3200) / 7700);

    currentFatKg = Math.max(weightKg * 0.05, currentFatKg + fatDeltaKg);
    currentLbmKg = currentLbmKg + weeklyLbmGainKg;
  }

  // Reverse Dieting Schedule (Metabolic Recovery Planner)
  const reverseDietSchedule: ReverseDietWeek[] = [];
  const startCals = Math.min(tdee - 100, Math.max(1000, bio.currentDietCalories));
  const step = Math.max(30, Math.min(200, bio.reverseStepKcal));
  let calsCursor = startCals;
  let weekIdx = 1;

  while (calsCursor < tdee && weekIdx <= 10) {
    calsCursor = Math.min(tdee, startCals + step * weekIdx);
    const split = buildMacroSplit(calsCursor, baseProteinGrams, 0.26);
    const pctOfTdee = calsCursor / tdee;
    let status = 'Adaptation Phase (Leptin & T3 Upregulation)';
    if (pctOfTdee >= 0.98) {
      status = 'Full Metabolic Maintenance Achieved';
    } else if (pctOfTdee >= 0.9) {
      status = 'NEAT Recovery & Glycogen Restoration';
    }
    reverseDietSchedule.push({
      week: weekIdx,
      dailyCalories: split.calories,
      proteinGrams: split.proteinGrams,
      carbsGrams: split.carbsGrams,
      fatGrams: split.fatGrams,
      metabolicStatus: status,
    });
    if (calsCursor >= tdee) break;
    weekIdx++;
  }

  // GLP-1 & Tirzepatide/Semaglutide Muscle Preservation Protocol
  const glp1DeficitFactor =
    bio.appetiteSuppressionLevel === 'severe'
      ? 0.68
      : bio.appetiteSuppressionLevel === 'moderate'
        ? 0.75
        : 0.82;
  const glp1TargetCalories = Math.max(1250, Math.round(tdee * glp1DeficitFactor));
  const criticalProteinFloorGrams = Math.round(leanBodyMassKg * 1.8);
  const optimalProteinGrams = Math.round(leanBodyMassKg * 2.2);
  const meals = Math.max(3, Math.min(6, bio.mealsPerDay));
  const proteinPerMealGrams = Math.round(optimalProteinGrams / meals);
  const glp1HydrationLiters = Math.round((weightKg * 0.042 + 0.5) * 10) / 10;

  const muscleLossRiskScore =
    trainingDays < 2 || bio.appetiteSuppressionLevel === 'severe'
      ? 'High (Sarcopenia Alert)'
      : trainingDays >= 3 && bio.proteinPerLbLbm >= 1.05
        ? 'Low (Protected)'
        : 'Moderate';

  const glp1Protocol: Glp1ProtocolResult = {
    targetCalories: glp1TargetCalories,
    criticalProteinFloorGrams,
    optimalProteinGrams,
    proteinPerMealGrams,
    solubleFiberGrams: bio.sex === 'male' ? 36 : 30,
    hydrationLiters: glp1HydrationLiters,
    hydrationOz: Math.round(glp1HydrationLiters * 33.814),
    muscleLossRiskScore,
    leucinePerMealGrams: Math.round(proteinPerMealGrams * 0.095 * 10) / 10,
    clinicalNotes: [
      `Prioritize ${proteinPerMealGrams}g of fast-digesting protein first in every meal before gastric fullness signals trigger.`,
      `In clinical STEP-1 & SURMOUNT-1 cohorts, up to 25–39% of weight lost without resistance training came from lean mass. Lifting ${Math.max(3, trainingDays)}x/week + ${optimalProteinGrams}g protein reduces lean mass loss below 8%.`,
      `Delayed gastric emptying on ${bio.glp1Medication} increases dehydration & constipation risk—target ${glp1HydrationLiters}L water + ${bio.sex === 'male' ? 36 : 30}g prebiotic soluble fiber daily.`,
    ],
  };

  // Creatine, Hydration & Electrolyte Calculator
  const creatineDailyGrams = weightKg >= 105 ? 7 : weightKg >= 85 ? 6 : 5;
  const creatineLoadingGrams = Math.round(weightKg * 0.3);
  const baselineWaterLiters = weightKg * 0.035;
  const sweatRatePerHour =
    bio.sweatIntensity === 'heavy' ? 1.35 : bio.sweatIntensity === 'moderate' ? 0.9 : 0.55;
  const sweatReplacementLiters =
    (bio.workoutMinutes / 60) * sweatRatePerHour + (bio.saunaSessionsPerWeek * 0.65) / 7;
  const totalDailyWaterLiters = Math.round((baselineWaterLiters + sweatReplacementLiters + 0.35) * 10) / 10;

  const ketoSodiumBonus = bio.isKetoOrLowCarb ? 1200 : 0;
  const sodiumMg = Math.round(
    2300 + sweatReplacementLiters * 950 + ketoSodiumBonus
  );
  const potassiumMg = Math.round(3500 + sweatReplacementLiters * 350 + (bio.isKetoOrLowCarb ? 600 : 0));
  const magnesiumMg = Math.round(bio.sex === 'male' ? 450 : 360) + (bio.saunaSessionsPerWeek >= 2 ? 75 : 0);

  const electrolyteResult: ElectrolyteCreatineResult = {
    creatineDailyGrams,
    creatineLoadingGrams,
    baselineWaterLiters: Math.round(baselineWaterLiters * 10) / 10,
    sweatReplacementLiters: Math.round(sweatReplacementLiters * 10) / 10,
    totalDailyWaterLiters,
    totalDailyWaterOz: Math.round(totalDailyWaterLiters * 33.814),
    sodiumMg,
    potassiumMg,
    magnesiumMg,
  };

  // FFMI & Plant/Omnivore Leucine Trigger Result
  const heightMeters = heightCm / 100;
  const rawFfmi = Math.round((leanBodyMassKg / (heightMeters * heightMeters)) * 10) / 10;
  const normalizedFfmi =
    Math.round((rawFfmi + 6.1 * (1.8 - heightMeters)) * 10) / 10;

  const maxNaturalFfmi = bio.sex === 'male' ? 25.0 : 21.0;
  const naturalPotentialPct = Math.min(100, Math.max(30, Math.round((normalizedFfmi / maxNaturalFfmi) * 100)));

  let ffmiCategory = 'Average / Recreational Baseline';
  if (bio.sex === 'male') {
    if (normalizedFfmi >= 24) ffmiCategory = 'Elite Natural Limit (Top 1% Muscularity)';
    else if (normalizedFfmi >= 22) ffmiCategory = 'Advanced Strength Athlete';
    else if (normalizedFfmi >= 20) ffmiCategory = 'Athletic / Well-Developed Lean Mass';
    else if (normalizedFfmi < 18) ffmiCategory = 'High Hypertrophy Upside (Under-muscled)';
  } else {
    if (normalizedFfmi >= 19.5) ffmiCategory = 'Elite Natural Limit (Top 1% Female Muscularity)';
    else if (normalizedFfmi >= 17.5) ffmiCategory = 'Advanced Strength Athlete';
    else if (normalizedFfmi >= 15.8) ffmiCategory = 'Athletic / Toned Lean Mass';
    else if (normalizedFfmi < 14.5) ffmiCategory = 'High Recomp Upside (Sarcopenia Prevention Focus)';
  }

  const ffmiResult: FfmiAndLeucineResult = {
    leanBodyMassKg: Math.round(leanBodyMassKg * 10) / 10,
    leanBodyMassLbs,
    fatMassKg: Math.round(fatMassKg * 10) / 10,
    fatMassLbs,
    rawFfmi,
    normalizedFfmi,
    ffmiCategory,
    naturalPotentialPct,
    perMealProteinTargetGrams: Math.round(baseProteinGrams / meals),
    perMealLeucineTargetGrams: 3.0,
    plantSourcesComparison: [
      {
        food: 'Cold-Filtered Whey Isolate',
        category: 'Animal / Whey',
        proteinFor3gLeucine: 27,
        caloriesFor3gLeucine: 115,
        leucinePct: 11.1,
        servingDescription: '1.1 scoops (30g powder)',
      },
      {
        food: 'Chicken Breast / Lean Turkey',
        category: 'Animal / Whey',
        proteinFor3gLeucine: 36,
        caloriesFor3gLeucine: 190,
        leucinePct: 8.2,
        servingDescription: '4.1 oz (115g cooked)',
      },
      {
        food: 'Pea + Brown Rice Protein Blend (70:30)',
        category: 'Plant-Based',
        proteinFor3gLeucine: 35,
        caloriesFor3gLeucine: 150,
        leucinePct: 8.5,
        servingDescription: '1.4 scoops (complete amino profile)',
      },
      {
        food: 'Extra-Firm Organic Tofu / Edamame',
        category: 'Plant-Based',
        proteinFor3gLeucine: 39,
        caloriesFor3gLeucine: 340,
        leucinePct: 7.6,
        servingDescription: '12 oz (340g tofu block)',
      },
      {
        food: 'Cooked Lentils + Hemp Seeds Combo',
        category: 'Plant-Based',
        proteinFor3gLeucine: 42,
        caloriesFor3gLeucine: 510,
        leucinePct: 7.1,
        servingDescription: '1.5 cups lentils + 3 tbsp hemp hearts',
      },
    ],
  };

  const perimenopauseProtocol = calculatePerimenopauseProtocol(
    bio,
    tdee,
    leanBodyMassKg,
    leanBodyMassLbs
  );

  const fastingProtocol = calculateFastingTimeline(
    bio,
    tdee,
    weightKg,
    leanBodyMassKg,
    fatMassKg,
    leanBodyMassLbs
  );

  return {
    bmrMifflin,
    bmrKatch,
    bmrCunningham,
    selectedBmr,
    tdee,
    leanBodyMassKg: Math.round(leanBodyMassKg * 10) / 10,
    leanBodyMassLbs,
    trainingDayMacros,
    restDayMacros,
    weeklyAverageMacros,
    weeklyNetCalorieDelta,
    twelveWeekProjection,
    reverseDietSchedule,
    glp1Protocol,
    electrolyteResult,
    ffmiResult,
    perimenopauseProtocol,
    fastingProtocol,
  };
}

export function calculatePerimenopauseProtocol(
  bio: UserBiometrics,
  tdee: number,
  leanBodyMassKg: number,
  leanBodyMassLbs: number
): PerimenopauseProtocolResult {
  const isPerimenopauseAge = bio.age >= 38 && bio.age <= 55;
  const periCortisolFloor = Math.max(1350, Math.round(tdee * 0.82));
  const periDailyProteinFloor = Math.round(leanBodyMassKg * 2.0);
  const periOptimalProtein = Math.max(
    periDailyProteinFloor,
    Math.round(leanBodyMassLbs * Math.max(1.0, bio.proteinPerLbLbm))
  );

  const periMeals = Math.max(3, Math.min(5, bio.mealsPerDay || 3));
  const periPerMealProtein = Math.max(32, Math.round(periOptimalProtein / periMeals));
  const periBreakfastProtein = Math.max(35, Math.round(periOptimalProtein * 0.35));
  const periBreakfastLeucine = Math.round(periBreakfastProtein * 0.095 * 10) / 10;

  const trainingDays = Math.max(0, Math.min(7, bio.trainingDaysPerWeek));
  const restDays = 7 - trainingDays;

  // Training day: high carbohydrate to utilize insulin-independent GLUT4 translocation, lower fat (25%)
  const periTrainingCals = Math.max(periCortisolFloor, Math.round(tdee * (1 + bio.trainingDaySurplusPct / 100)));
  const periTrainingMacros = buildMacroSplit(periTrainingCals, periOptimalProtein, 0.25);

  // Rest day: moderate deficit, elevated dietary fat (38%) for steroidogenesis & low GI carbs
  const periRestCals = Math.max(periCortisolFloor, Math.round(tdee * (1 + bio.restDayDeficitPct / 100)));
  const periRestMacros = buildMacroSplit(periRestCals, periOptimalProtein + 4, 0.38);

  const periDailyCals = Math.round(
    (periTrainingMacros.calories * trainingDays + periRestMacros.calories * restDays) / 7
  );

  // Evening carb cycling ("cortisol window"): 35-45g of complex carbs allocated to evening meal
  const cortisolWindowCarbs = Math.max(30, Math.min(55, Math.round(periRestMacros.carbsGrams * 0.45)));
  const estrogenSupportFiber = Math.max(32, Math.min(45, Math.round((periDailyCals / 1000) * 16)));

  const stageDisplay = (bio.perimenopauseStage || 'early_transition').replace('_', ' ');

  return {
    dailyCalories: periDailyCals,
    trainingDayMacros: periTrainingMacros,
    restDayMacros: periRestMacros,
    dailyProteinFloorGrams: periDailyProteinFloor,
    optimalDailyProteinGrams: periOptimalProtein,
    dailyProteinTargetGrams: periOptimalProtein,
    perMealProteinFloorGrams: periPerMealProtein,
    breakfastProteinAnchorGrams: periBreakfastProtein,
    breakfastLeucineGrams: periBreakfastLeucine,
    leucineThresholdGrams: periBreakfastLeucine,
    cortisolSafetyCalorieFloor: periCortisolFloor,
    estrogenSupportFiberGrams: estrogenSupportFiber,
    phytoestrogenFiberGrams: estrogenSupportFiber,
    cortisolWindowCarbsGrams: cortisolWindowCarbs,
    eveningCarbTargetGrams: cortisolWindowCarbs,
    isAgeCohortCompliant: isPerimenopauseAge,
    clinicalRationale:
      `Calibrated for female neuroendocrine transitions (${stageDisplay}). ` +
      `Overcomes age-related anabolic resistance with a ${periDailyProteinFloor}g daily protein floor and a ${periBreakfastProtein}g (${periBreakfastLeucine}g leucine) breakfast anchor. ` +
      `Rest-day fat is set to ${periRestMacros.fatGrams}g (38% of kcal) to supply steroidogenic cholesterol precursors, while reserving ${cortisolWindowCarbs}g of evening carbohydrates to blunt nocturnal cortisol spikes and support serotonin/melatonin synthesis.`,
    clinicalNotes: [
      `Anchor breakfast with ${periBreakfastProtein}g of protein (${periBreakfastLeucine}g leucine) within 60 minutes of waking to suppress the Cortisol Awakening Response (CAR) and reverse nocturnal proteolysis.`,
      `Maintain a strict caloric floor of ${periCortisolFloor} kcal/day. Caloric restriction below 1,350 kcal downregulates deiodinase conversion of T4 to active T3, elevating reverse T3 and driving visceral fat storage.`,
      `Consume ${estrogenSupportFiber}g of soluble and prebiotic fiber daily to bind 16α-hydroxyestrone metabolites in the gut and prevent bacterial beta-glucuronidase reabsorption.`,
      `Cycle ${cortisolWindowCarbs}g of low-glycemic carbohydrates to dinner to increase the blood-brain barrier tryptophan-to-LNAA ratio, facilitating nocturnal melatonin production and mitigating night sweats.`,
    ],
  };
}

export function calculateFastingTimeline(
  bio: UserBiometrics,
  tdee: number,
  weightKg: number,
  leanBodyMassKg: number,
  fatMassKg: number,
  leanBodyMassLbs: number
): FastingTimelineResult {
  const fastingProto = bio.fastingProtocol || '16:8';
  let fastingHours = 16;
  let eatingHours = 8;
  let fastingDeficitFactor = 0.82;
  let mealsInWindow = 3;
  let muscleRisk: 'Optimal (Protected)' | 'Good' | 'Moderate' | 'High (Catabolic Alert)' = 'Optimal (Protected)';

  if (fastingProto === '18:6') {
    fastingHours = 18;
    eatingHours = 6;
    fastingDeficitFactor = 0.77;
    mealsInWindow = 2;
    muscleRisk = 'Good';
  } else if (fastingProto === '20:4') {
    fastingHours = 20;
    eatingHours = 4;
    fastingDeficitFactor = 0.73;
    mealsInWindow = 2;
    muscleRisk = 'Moderate';
  } else if (fastingProto === 'omad') {
    fastingHours = 23;
    eatingHours = 1;
    fastingDeficitFactor = 0.68;
    mealsInWindow = 1;
    muscleRisk = 'High (Catabolic Alert)';
  }

  const startHourInput =
    bio.fastingEatingWindowStartHour ??
    (bio as unknown as { fastingWindowStartHour?: number }).fastingWindowStartHour ??
    12;
  const windowStart = ((startHourInput % 24) + 24) % 24;
  const windowEnd = (windowStart + eatingHours) % 24;
  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:00 ${period}`;
  };
  const formattedWindow = `${formatHour(windowStart)} – ${formatHour(windowEnd)}`;

  const fastingMinCalFloor = bio.sex === 'male' ? 1500 : 1250;
  const fastingDailyCals = Math.max(fastingMinCalFloor, Math.round(tdee * fastingDeficitFactor));
  const fastingProteinTarget = Math.max(
    Math.round(leanBodyMassKg * 2.0),
    Math.round(leanBodyMassLbs * Math.max(1.0, bio.proteinPerLbLbm))
  );
  const fastingMacros = buildMacroSplit(fastingDailyCals, fastingProteinTarget, 0.28);

  const weeklyDeficitKcal = (tdee - fastingDailyCals) * 7;
  const expectedWeeklyLossLbs = Math.max(0, Math.round((weeklyDeficitKcal / 3500) * 10) / 10);

  // 4 Metabolic Chronobiological Stages
  const timelineStages: FastingTimelineStage[] = [
    {
      phaseIndex: 1,
      phaseName: 'Digestion & Postprandial Storage',
      hourRange: '0 – 4 Hours Post-Meal',
      startHourRelative: 0,
      endHourRelative: 4,
      metabolicProcess: 'Nutrient absorption, insulin secretion, muscle glycogen & triglyceride synthesis.',
      primaryEnergySubstrate: 'Exogenous Glucose & Amino Acids',
      insulinState: 'High',
      autophagyLevel: 'Suppressed',
      biomarkerSummary: 'Anti-lipolytic threshold exceeded; fat oxidation suppressed; cellular storage active.',
    },
    {
      phaseIndex: 2,
      phaseName: 'Postabsorptive Glycogen Transition',
      hourRange: '4 – 12 Hours Post-Meal',
      startHourRelative: 4,
      endHourRelative: 12,
      metabolicProcess: 'Blood glucose normalizes; hepatic glycogenolysis sustains 75% of cerebral glucose requirement.',
      primaryEnergySubstrate: 'Hepatic Glycogen & Peripheral Fatty Acids',
      insulinState: 'Declining',
      autophagyLevel: 'Baseline',
      biomarkerSummary: 'Glucagon:insulin ratio rises; early hormone-sensitive lipase (HSL) dephosphorylation.',
    },
    {
      phaseIndex: 3,
      phaseName: 'Accelerated Lipolysis & Ketosis Onset',
      hourRange: '12 – 16 Hours Post-Meal',
      startHourRelative: 12,
      endHourRelative: 16,
      metabolicProcess: 'Hepatic glycogen stores depleted; adipose triacylglycerol hydrolysis accelerates.',
      primaryEnergySubstrate: 'Adipose Free Fatty Acids & Early Ketones (0.2–0.5 mmol/L)',
      insulinState: 'Basal Nadir',
      autophagyLevel: 'Accelerated',
      biomarkerSummary: 'AMPK phosphorylation activated; GLUT4 translocation increases; fat burning enters peak rate.',
    },
    {
      phaseIndex: 4,
      phaseName: 'Autophagy & Cellular Recycling',
      hourRange: '16 – 24 Hours Post-Meal',
      startHourRelative: 16,
      endHourRelative: 24,
      metabolicProcess: 'mTORC1 suppressed; lysosomal autophagosome degradation of damaged organelles and senescent proteins.',
      primaryEnergySubstrate: 'Beta-Hydroxybutyrate (0.5–1.5 mmol/L) & Free Fatty Acids',
      insulinState: 'Basal Nadir',
      autophagyLevel: 'Peak',
      biomarkerSummary: 'Growth hormone secretion pulses; appendicular muscle catabolism risk increases without leucine pacing.',
    },
  ];

  // 12-Week Trajectory Curve with Sarcopenic Loss Partitioning
  const twelveWeekTrajectory: WeeklyProjectionPoint[] = [];
  let currentFastWeightKg = weightKg;
  let currentFastLbmKg = leanBodyMassKg;
  let currentFastFatKg = fatMassKg;

  const trainingDays = Math.max(0, Math.min(7, bio.trainingDaysPerWeek));
  const baseLeanLossPct =
    fastingProto === '16:8' ? 0.08 : fastingProto === '18:6' ? 0.12 : fastingProto === '20:4' ? 0.18 : 0.28;
  const trainingMitigation = trainingDays >= 3 ? 0.65 : 1.25;
  const leanLossRatio = baseLeanLossPct * trainingMitigation;

  for (let week = 0; week <= 12; week++) {
    const totalW = currentFastFatKg + currentFastLbmKg;
    const bfPct = (currentFastFatKg / totalW) * 100;
    twelveWeekTrajectory.push({
      week,
      projectedWeightKg: Math.round(totalW * 100) / 100,
      projectedLbmKg: Math.round(currentFastLbmKg * 100) / 100,
      projectedFatKg: Math.round(currentFastFatKg * 100) / 100,
      projectedBodyFatPct: Math.round(bfPct * 10) / 10,
    });

    // Adaptive thermogenesis: ~10 kcal per kg of weight lost
    const adaptiveDrop = (weightKg - totalW) * 10;
    const weekNetKcal = Math.max(700, weeklyDeficitKcal - adaptiveDrop * 7);
    const weightLossKg = weekNetKcal / 7700;

    const leanLossKg = weightLossKg * leanLossRatio;
    const fatLossKg = weightLossKg * (1 - leanLossRatio);

    currentFastLbmKg = Math.max(leanBodyMassKg * 0.75, currentFastLbmKg - leanLossKg);
    currentFastFatKg = Math.max(weightKg * 0.05, currentFastFatKg - fatLossKg);
  }

  const mealsCount = bio.mealsPerDay || mealsInWindow;

  return {
    protocol: fastingProto,
    protocolType: fastingProto,
    fastingHours,
    eatingHours,
    feedingHours: eatingHours,
    windowStartHour: windowStart,
    windowEndHour: windowEnd,
    formattedWindow,
    defaultWindow: formattedWindow,
    mealsInWindow: mealsCount,
    dailyCalories: fastingDailyCals,
    macros: fastingMacros,
    weeklyExpectedLossLbs: expectedWeeklyLossLbs,
    muscleRetentionRisk: muscleRisk,
    timelineStages,
    twelveWeekTrajectory,
    twelveWeekProjection: twelveWeekTrajectory,
    clinicalRationale:
      `The ${fastingProto} protocol establishes a ${eatingHours}-hour feeding window (${formattedWindow}) and a ${fastingHours}-hour fasting duration. ` +
      `Generates an estimated daily caloric deficit of ${tdee - fastingDailyCals} kcal (~${expectedWeeklyLossLbs} lbs/week fat loss). ` +
      `Muscle retention risk is rated "${muscleRisk}". Pacing ${fastingProteinTarget}g protein across ${mealsCount} feeding(s) prevents excessive negative nitrogen balance.`,
    clinicalNotes: [
      `Feeding window set to ${formattedWindow} (${eatingHours} hours). Drink at least 2.5L of water and non-caloric electrolytes during the fasting window to avoid hypovolemic fatigue.`,
      `During the 16–24 hour fasting window, mTOR is suppressed and autophagy increases, but consuming a high-protein post-fast meal (>=35g) is essential to stimulate muscle protein synthesis.`,
      fastingProto === 'omad'
        ? `CLINICAL ALERT: In the 2020 TREAT randomized trial (Lowe et al., JAMA Intern Med), single-meal TRE without protein distribution produced significant loss of appendicular lean mass. Ensure daily resistance training and consider supplemental essential amino acids (EAAs).`
        : `Consuming ${mealsCount} structured meals within the window delivers ${Math.round(fastingProteinTarget / mealsCount)}g protein per feeding, crossing the 3.0g leucine threshold.`,
    ],
  };
}
