import { UserBiometrics, DEFAULT_BIOMETRICS, ActivityLevel, BmrFormula, Glp1Medication, Sex, UnitSystem } from './formulas';

const ALLOWED_TABS = new Set([
  'all',
  'recomp',
  'glp1',
  'perimenopause',
  'fasting',
  'electrolytes',
  'ffmi',
  'reverse',
]);

const ALLOWED_SEX = new Set<Sex>(['male', 'female']);
const ALLOWED_UNITS = new Set<UnitSystem>(['imperial', 'metric']);
const ALLOWED_FORMULAS = new Set<BmrFormula>(['mifflin', 'katch', 'cunningham']);
const ALLOWED_ACTIVITY = new Set<ActivityLevel>(['sedentary', 'light', 'moderate', 'active', 'athlete']);
const ALLOWED_GLP1 = new Set<Glp1Medication>(['semaglutide', 'tirzepatide', 'liraglutide', 'retatrutide']);

/**
 * Sanitizes URL query parameters (?coach= and ?clinic=) against XSS, HTML injection,
 * control characters, and phishing URL/domain social engineering.
 */
export function sanitizeBrandParam(raw: string | null | undefined, maxLength = 42): string {
  if (!raw || typeof raw !== 'string') return '';

  // Strip HTML tags, angle brackets, quotes, and script/protocol patterns
  let cleaned = raw
    .replace(/[<>"'`\\;{}[\]()]/g, '')
    .replace(/(?:javascript|data|vbscript|file|http|https|ftp)\s*:/gi, '')
    // Block domain/URL injection in coach banner to prevent phishing (e.g. ?coach=Visit+Evil.com)
    .replace(/\b[a-z0-9-]+\.(?:com|net|org|io|ru|cn|xyz|info|biz|co|uk|de|app|dev|gg|me|link|click)\b/gi, '')
    // Allow only safe alphanumeric, spaces, hyphens, ampersands, periods, and commas
    .replace(/[^a-zA-Z0-9\s\-.,&+#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Strictly validates the ?tab= query parameter against the allowlist of calculator tabs.
 */
export function sanitizeTabParam(raw: string | null | undefined): string {
  if (!raw || typeof raw !== 'string') return 'recomp';
  const normalized = raw.trim().toLowerCase();
  return ALLOWED_TABS.has(normalized) ? normalized : 'recomp';
}

function clampNumber(val: unknown, min: number, max: number, fallback: number): number {
  const num = typeof val === 'number' ? val : Number(val);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

/**
 * Protects against LocalStorage poisoning, prototype pollution, and NaN/Infinity crashes.
 */
export function sanitizeBiometricsInput(
  raw: unknown,
  fallback: UserBiometrics = DEFAULT_BIOMETRICS
): UserBiometrics {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ...fallback };
  }

  const obj = raw as Record<string, unknown>;

  return {
    ...fallback,
    unitSystem: ALLOWED_UNITS.has(obj.unitSystem as UnitSystem)
      ? (obj.unitSystem as UnitSystem)
      : fallback.unitSystem,
    sex: ALLOWED_SEX.has(obj.sex as Sex) ? (obj.sex as Sex) : fallback.sex,
    age: Math.round(clampNumber(obj.age, 18, 90, fallback.age)),
    weightKg: clampNumber(obj.weightKg, 35, 250, fallback.weightKg),
    heightCm: clampNumber(obj.heightCm, 120, 230, fallback.heightCm),
    bodyFatPct: clampNumber(obj.bodyFatPct, 4, 60, fallback.bodyFatPct),
    formula: ALLOWED_FORMULAS.has(obj.formula as BmrFormula)
      ? (obj.formula as BmrFormula)
      : fallback.formula,
    activityLevel: ALLOWED_ACTIVITY.has(obj.activityLevel as ActivityLevel)
      ? (obj.activityLevel as ActivityLevel)
      : fallback.activityLevel,
    trainingDaysPerWeek: Math.round(
      clampNumber(obj.trainingDaysPerWeek, 0, 7, fallback.trainingDaysPerWeek)
    ),
    trainingDaySurplusPct: clampNumber(
      obj.trainingDaySurplusPct,
      -20,
      30,
      fallback.trainingDaySurplusPct
    ),
    restDayDeficitPct: clampNumber(
      obj.restDayDeficitPct,
      -40,
      10,
      fallback.restDayDeficitPct
    ),
    proteinPerLbLbm: clampNumber(obj.proteinPerLbLbm, 0.7, 1.6, fallback.proteinPerLbLbm),
    currentDietCalories: Math.round(
      clampNumber(obj.currentDietCalories, 900, 4500, fallback.currentDietCalories)
    ),
    reverseStepKcal: Math.round(
      clampNumber(obj.reverseStepKcal, 30, 250, fallback.reverseStepKcal)
    ),
    glp1Medication: ALLOWED_GLP1.has(obj.glp1Medication as Glp1Medication)
      ? (obj.glp1Medication as Glp1Medication)
      : fallback.glp1Medication,
    workoutMinutes: Math.round(clampNumber(obj.workoutMinutes, 0, 240, fallback.workoutMinutes)),
    saunaSessionsPerWeek: Math.round(
      clampNumber(obj.saunaSessionsPerWeek, 0, 14, fallback.saunaSessionsPerWeek)
    ),
    isKetoOrLowCarb:
      typeof obj.isKetoOrLowCarb === 'boolean' ? obj.isKetoOrLowCarb : fallback.isKetoOrLowCarb,
    mealsPerDay: Math.round(clampNumber(obj.mealsPerDay, 1, 6, fallback.mealsPerDay)),
  };
}

/**
 * OWASP-compliant JSON-LD serializer that escapes <, >, &, and line terminators
 * to prevent </script> breakout XSS attacks.
 */
export function safeJsonLdStringify(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
