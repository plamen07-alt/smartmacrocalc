'use client';

import React, { useState } from 'react';
import {
  Clock,
  Flame,
  ShieldAlert,
  Scale,
  TrendingDown,
  Info,
  Sparkles,
  Utensils,
  Zap,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  MacroSplit,
  UnitSystem,
  WeeklyProjectionPoint,
  FastingTimelineStage,
  FastingProtocol,
  kgToLbs,
} from '@/lib/formulas';

export interface VisualFastingClockProps {
  fastingProtocol: FastingProtocol;
  onProtocolChange?: (protocol: FastingProtocol) => void;
  windowStartHour: number; // 0 to 23 (e.g. 12 = 12:00 PM)
  onWindowStartHourChange?: (hour: number) => void;
  mealsInWindow?: number;
  onMealsInWindowChange?: (meals: number) => void;
  dailyCalories: number;
  macros: MacroSplit;
  unitSystem: UnitSystem;
  currentWeightKg: number;
  targetWeightKg?: number;
  bodyFatPct: number;
  tdee: number;
  timelineStages?: FastingTimelineStage[];
  twelveWeekTrajectory?: WeeklyProjectionPoint[];
  muscleRetentionRisk?: 'Optimal (Protected)' | 'Good' | 'Moderate' | 'High (Catabolic Alert)';
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const radians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeDonutArc(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startHour: number,
  durationHours: number
): string {
  const safeDuration = Math.max(0.1, Math.min(23.95, durationHours));
  const startAngle = (startHour / 24) * 360;
  const endAngle = startAngle + (safeDuration / 24) * 360;

  const startOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, startAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, endAngle);

  const arcSweep = safeDuration > 12 ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${arcSweep} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${arcSweep} 0 ${startInner.x} ${startInner.y}`,
    'Z',
  ].join(' ');
}

export function VisualFastingClock({
  fastingProtocol,
  onProtocolChange,
  windowStartHour,
  onWindowStartHourChange,
  mealsInWindow = 3,
  onMealsInWindowChange,
  dailyCalories,
  macros,
  unitSystem,
  currentWeightKg,
  bodyFatPct,
  tdee,
  timelineStages = [],
  twelveWeekTrajectory = [],
  muscleRetentionRisk,
}: VisualFastingClockProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const fastingHours =
    fastingProtocol === '18:6'
      ? 18
      : fastingProtocol === '20:4'
        ? 20
        : fastingProtocol === 'omad'
          ? 23
          : 16;
  const eatingHours = 24 - fastingHours;

  const safeStart = ((windowStartHour % 24) + 24) % 24;
  const safeEnd = (safeStart + eatingHours) % 24;

  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:00 ${period}`;
  };

  const formattedWindow = `${formatHour(safeStart)} – ${formatHour(safeEnd)}`;

  // SVG Geometry for 24h Clock
  const cx = 200;
  const cy = 200;
  const outerR = 150;
  const innerR = 105;
  const midR = (outerR + innerR) / 2;

  // Eating arc & Fasting arc paths
  const eatingArc = describeDonutArc(cx, cy, innerR, outerR, safeStart, eatingHours);
  const fastingArc = describeDonutArc(cx, cy, innerR, outerR, safeEnd, fastingHours);

  // Meal pin positions on the eating arc
  const mealPins: Array<{ label: string; hour: number }> = [];
  if (mealsInWindow === 1 || fastingProtocol === 'omad') {
    mealPins.push({ label: 'OMAD Meal', hour: safeStart });
  } else if (mealsInWindow === 2) {
    mealPins.push({ label: 'Break-Fast', hour: safeStart });
    mealPins.push({ label: 'Last Meal', hour: (safeStart + eatingHours - 0.5) % 24 });
  } else {
    mealPins.push({ label: 'Break-Fast', hour: safeStart });
    mealPins.push({ label: 'Mid-Meal', hour: (safeStart + eatingHours / 2) % 24 });
    mealPins.push({ label: 'Last Meal', hour: (safeStart + eatingHours - 0.5) % 24 });
  }

  // Risk Rating Fallback
  const riskBadge =
    muscleRetentionRisk ||
    (fastingProtocol === '16:8'
      ? 'Optimal (Protected)'
      : fastingProtocol === '18:6'
        ? 'Good'
        : fastingProtocol === '20:4'
          ? 'Moderate'
          : 'High (Catabolic Alert)');

  // 12-Week Trajectory Chart Dimensions
  const chartWidth = 720;
  const chartHeight = 220;
  const padLeft = 52;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 34;

  const trajectory =
    twelveWeekTrajectory.length > 0
      ? twelveWeekTrajectory
      : [
          {
            week: 0,
            projectedWeightKg: currentWeightKg,
            projectedLbmKg: currentWeightKg * (1 - bodyFatPct / 100),
            projectedFatKg: currentWeightKg * (bodyFatPct / 100),
            projectedBodyFatPct: bodyFatPct,
          },
        ];

  const weightVals = trajectory.map((p) =>
    unitSystem === 'imperial' ? kgToLbs(p.projectedWeightKg) : p.projectedWeightKg
  );
  const bfVals = trajectory.map((p) => p.projectedBodyFatPct);

  const minW = Math.min(...weightVals) - 1;
  const maxW = Math.max(...weightVals) + 1;
  const minBf = Math.max(3, Math.min(...bfVals) - 1);
  const maxBf = Math.max(...bfVals) + 1;

  const getX = (idx: number) =>
    padLeft + (idx / Math.max(1, trajectory.length - 1)) * (chartWidth - padLeft - padRight);
  const getYWeight = (w: number) =>
    chartHeight - padBottom - ((w - minW) / Math.max(1, maxW - minW)) * (chartHeight - padTop - padBottom);
  const getYBf = (bf: number) =>
    chartHeight - padBottom - ((bf - minBf) / Math.max(1, maxBf - minBf)) * (chartHeight - padTop - padBottom);

  const weightPath = trajectory
    .map((p, i) => {
      const val = unitSystem === 'imperial' ? kgToLbs(p.projectedWeightKg) : p.projectedWeightKg;
      return `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getYWeight(val).toFixed(1)}`;
    })
    .join(' ');

  const weightArea = `${weightPath} L ${getX(trajectory.length - 1)} ${chartHeight - padBottom} L ${getX(
    0
  )} ${chartHeight - padBottom} Z`;

  const bfPath = trajectory
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getYBf(p.projectedBodyFatPct).toFixed(1)}`)
    .join(' ');

  const initialW = weightVals[0] || 0;
  const finalW = weightVals[weightVals.length - 1] || initialW;
  const totalLost = Math.max(0, Math.round((initialW - finalW) * 10) / 10);
  const weightUnit = unitSystem === 'imperial' ? 'lbs' : 'kg';

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-500/10 via-white to-sky-50 p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-900 ring-1 ring-sky-300">
              <Clock className="h-3.5 w-3.5 text-sky-700" />
              Circadian Fasting Timeline &amp; Sarcopenia Shield
            </div>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Visual Intermittent Fasting Clock &amp; Loss Curve
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Interactive 24-hour chronobiological dial mapping insulin nadir, fat oxidation, and autophagy milestones
              while safeguarding skeletal muscle mass.
            </p>
          </div>

          {/* PROTOCOL SELECTOR PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs">
            {(['16:8', '18:6', '20:4', 'omad'] as FastingProtocol[]).map((proto) => {
              const active = fastingProtocol === proto;
              return (
                <button
                  key={proto}
                  type="button"
                  onClick={() => onProtocolChange?.(proto)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition ${
                    active
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {proto}
                </button>
              );
            })}
          </div>
        </div>

        {/* TOP SUMMARY STATS */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-sky-200 bg-white p-3.5 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-500">Feeding Window</div>
            <div className="mt-1 font-mono text-xl font-extrabold text-sky-950">{formattedWindow}</div>
            <div className="text-[11px] font-semibold text-sky-700">{eatingHours} Hours Feeding</div>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-white p-3.5 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-500">Fasting Duration</div>
            <div className="mt-1 font-mono text-xl font-extrabold text-indigo-950">{fastingHours} Hours</div>
            <div className="text-[11px] font-semibold text-indigo-700">Daily Fasted State</div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white p-3.5 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-500">Daily Energy Budget</div>
            <div className="mt-1 font-mono text-xl font-extrabold text-emerald-950">
              {dailyCalories.toLocaleString()} kcal
            </div>
            <div className="text-[11px] font-semibold text-emerald-700">
              {tdee - dailyCalories > 0 ? `-${tdee - dailyCalories} kcal Deficit` : 'Maintenance'}
            </div>
          </div>

          <div
            className={`rounded-xl border p-3.5 shadow-2xs ${
              riskBadge.includes('Alert')
                ? 'border-rose-300 bg-rose-50/70 text-rose-950'
                : riskBadge.includes('Moderate')
                  ? 'border-amber-300 bg-amber-50/70 text-amber-950'
                  : 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
            }`}
          >
            <div className="text-[11px] font-bold">Muscle Retention Risk</div>
            <div className="mt-1 font-mono text-sm font-extrabold">{riskBadge}</div>
            <div className="text-[10px] opacity-80">
              {fastingProtocol === 'omad'
                ? 'High catabolic risk (TREAT trial)'
                : `${mealsInWindow} protein boluses`}
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE 24-HOUR CIRCULAR SVG CLOCK & CONTROLS */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* SVG CLOCK DIAL (7 Cols) */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex w-full items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900">24-Hour Circadian Fasting Clock</h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Eating Window ({eatingHours}h)
              </span>
              <span className="flex items-center gap-1.5 text-indigo-700">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                Fasting ({fastingHours}h)
              </span>
            </div>
          </div>

          <div className="relative mt-4 flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="h-[320px] w-[320px] max-w-full drop-shadow-md sm:h-[360px] sm:w-[360px]"
            >
              <defs>
                {/* Eating Gradient */}
                <linearGradient id="eatingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>

                {/* Fasting Gradient */}
                <linearGradient id="fastingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#312e81" />
                </linearGradient>

                {/* Dial Center Glow */}
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </radialGradient>
              </defs>

              {/* Background Outer Ring */}
              <circle cx={cx} cy={cy} r={outerR + 10} fill="#f1f5f9" />
              <circle cx={cx} cy={cy} r={innerR - 10} fill="#ffffff" />

              {/* Fasting Arc (Deep Indigo) */}
              <path d={fastingArc} fill="url(#fastingGrad)" stroke="#4338ca" strokeWidth="2" />

              {/* Eating Arc (Vibrant Emerald) */}
              <path d={eatingArc} fill="url(#eatingGrad)" stroke="#14b8a6" strokeWidth="2" />

              {/* 24-Hour Radial Ticks & Markings */}
              {Array.from({ length: 24 }).map((_, h) => {
                const angle = (h / 24) * 360;
                const isMajor = h % 6 === 0;
                const tickStart = polarToCartesian(cx, cy, outerR + 2, angle);
                const tickEnd = polarToCartesian(cx, cy, outerR + (isMajor ? 9 : 5), angle);
                const labelPos = polarToCartesian(cx, cy, outerR + 22, angle);

                let labelText = '';
                if (h === 0) labelText = '12A';
                else if (h === 6) labelText = '6A';
                else if (h === 12) labelText = '12P';
                else if (h === 18) labelText = '6P';

                return (
                  <g key={h}>
                    <line
                      x1={tickStart.x}
                      y1={tickStart.y}
                      x2={tickEnd.x}
                      y2={tickEnd.y}
                      stroke={isMajor ? '#334155' : '#94a3b8'}
                      strokeWidth={isMajor ? 2.5 : 1}
                    />
                    {labelText && (
                      <text
                        x={labelPos.x}
                        y={labelPos.y + 4}
                        textAnchor="middle"
                        className="fill-slate-600 font-mono text-[11px] font-bold"
                      >
                        {labelText}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Meal Pins on Eating Window Arc */}
              {mealPins.map((pin, i) => {
                const pinAngle = (pin.hour / 24) * 360;
                const pos = polarToCartesian(cx, cy, midR, pinAngle);
                return (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r="9" fill="#ffffff" stroke="#0f766e" strokeWidth="2.5" />
                    <circle cx={pos.x} cy={pos.y} r="4" fill="#0d9488" />
                  </g>
                );
              })}

              {/* Center Dial Hub */}
              <circle cx={cx} cy={cy} r={innerR - 12} fill="url(#centerGlow)" stroke="#cbd5e1" strokeWidth="2" />

              {/* Center Text Information */}
              <text x={cx} y={cy - 28} textAnchor="middle" className="fill-slate-500 font-mono text-[10px] font-bold tracking-wider uppercase">
                {fastingProtocol.toUpperCase()} PROTOCOL
              </text>
              <text x={cx} y={cy} textAnchor="middle" className="fill-slate-900 font-mono text-xl font-black">
                {eatingHours}h : {fastingHours}h
              </text>
              <text x={cx} y={cy + 22} textAnchor="middle" className="fill-teal-700 font-semibold text-[11px]">
                {formattedWindow}
              </text>
              <text x={cx} y={cy + 40} textAnchor="middle" className="fill-slate-500 text-[10px]">
                {mealsInWindow} {mealsInWindow === 1 ? 'Meal' : 'Meals'} Inside Window
              </text>
            </svg>
          </div>

          <div className="mt-3 text-center text-xs text-slate-500">
            Window opens at <strong className="font-mono text-slate-900">{formatHour(safeStart)}</strong> and closes at{' '}
            <strong className="font-mono text-slate-900">{formatHour(safeEnd)}</strong>
          </div>
        </div>

        {/* RIGHT COLUMN: SLIDERS & CONTROLS (5 Cols) */}
        <div className="space-y-4 lg:col-span-5">
          {/* WINDOW START HOUR SLIDER */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Feeding Window Start Time</span>
              <span className="rounded bg-sky-50 px-2.5 py-1 font-mono text-sm font-extrabold text-sky-800">
                {formatHour(safeStart)}
              </span>
            </div>
            <input
              id="fasting-clock-start-hour"
              aria-label="Feeding window start time"
              type="range"
              min={6}
              max={18}
              step={1}
              value={safeStart}
              onChange={(e) => onWindowStartHourChange?.(Number(e.target.value))}
              className="mt-3 w-full accent-sky-600"
            />
            <div className="mt-1 flex justify-between text-[10px] font-semibold text-slate-600">
              <span>6:00 AM (Early)</span>
              <span>12:00 PM (Noon)</span>
              <span>6:00 PM (Evening)</span>
            </div>

            {/* QUICK PRESETS */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <label className="text-[11px] font-bold text-slate-600">Quick Circadian Presets:</label>
              <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
                <button
                  type="button"
                  onClick={() => onWindowStartHourChange?.(8)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                    safeStart === 8
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  8 AM – 4 PM
                </button>
                <button
                  type="button"
                  onClick={() => onWindowStartHourChange?.(12)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                    safeStart === 12
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  12 PM – 8 PM
                </button>
                <button
                  type="button"
                  onClick={() => onWindowStartHourChange?.(14)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                    safeStart === 14
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  2 PM – 10 PM
                </button>
              </div>
            </div>
          </div>

          {/* MEAL DISTRIBUTION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Meals Planned in Window</span>
              <span className="font-mono text-xs font-bold text-teal-700">
                {mealsInWindow} {mealsInWindow === 1 ? 'Meal (OMAD)' : 'Meals'}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onMealsInWindowChange?.(m)}
                  className={`rounded-lg border py-2 text-xs font-bold transition ${
                    mealsInWindow === m
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {m} {m === 1 ? 'Meal' : 'Meals'}
                </button>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              {mealsInWindow >= 3
                ? 'Optimal muscle protein synthesis (MPS): stimulates mTOR multiple times with distinct leucine peaks.'
                : mealsInWindow === 2
                  ? 'Good: Break-fast meal plus window-close meal crossing the 3.0g leucine threshold.'
                  : 'Caution: Single meal exceeds acute protein synthesis saturation (~40g), risking lean mass.'}
            </div>
          </div>

          {/* FASTING HYDRATION & ELECTROLYTES CALLOUT */}
          <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-950">
              <Zap className="h-4 w-4 text-sky-700" />
              Non-Caloric Fasting Window Hydration Protocol
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-sky-900">
              Drink at least <strong>2.5–3.0 Liters</strong> of water with <strong>1,000–1,500mg sodium</strong> during the fasting hours. Low insulin drives rapid renal natriuresis (salt dumping); without electrolytes, fasters experience headaches, orthostatic fatigue, and false hunger cravings.
            </p>
          </div>
        </div>
      </div>

      {/* 4 CHRONOBIOLOGICAL METABOLIC STAGES */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="border-b border-slate-100 pb-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800">
            Chronobiology &amp; Substrate Oxidation
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            The 4 Circadian Stages of Intermittent Fasting
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            What physiological mechanisms occur inside your cells as fasting duration advances across 24 hours:
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(timelineStages.length > 0
            ? timelineStages
            : [
                {
                  phaseIndex: 1,
                  phaseName: 'Digestion & Storage',
                  hourRange: '0 – 4 Hours Post-Meal',
                  metabolicProcess: 'Nutrient absorption, insulin secretion, muscle glycogen & triglyceride storage.',
                  primaryEnergySubstrate: 'Exogenous Glucose & Amino Acids',
                  insulinState: 'High',
                  autophagyLevel: 'Suppressed',
                  biomarkerSummary: 'Anti-lipolytic threshold active; fat oxidation low.',
                },
                {
                  phaseIndex: 2,
                  phaseName: 'Glycogen Transition',
                  hourRange: '4 – 12 Hours Post-Meal',
                  metabolicProcess: 'Blood glucose normalizes; liver glycogen sustains 75% of cerebral glucose needs.',
                  primaryEnergySubstrate: 'Hepatic Glycogen & Peripheral FFAs',
                  insulinState: 'Declining',
                  autophagyLevel: 'Baseline',
                  biomarkerSummary: 'Glucagon:insulin ratio rises; HSL activates.',
                },
                {
                  phaseIndex: 3,
                  phaseName: 'Lipolysis & Ketones',
                  hourRange: '12 – 16 Hours Post-Meal',
                  metabolicProcess: 'Liver glycogen depleted; adipose triacylglycerol hydrolysis accelerates.',
                  primaryEnergySubstrate: 'Adipose Free Fatty Acids & Early Ketones',
                  insulinState: 'Basal Nadir',
                  autophagyLevel: 'Accelerated',
                  biomarkerSummary: 'AMPK phosphorylation activated; peak fat burn.',
                },
                {
                  phaseIndex: 4,
                  phaseName: 'Autophagy & Recycling',
                  hourRange: '16 – 24 Hours Post-Meal',
                  metabolicProcess: 'mTORC1 suppressed; lysosomal autophagosome degradation of damaged organelles.',
                  primaryEnergySubstrate: 'Beta-Hydroxybutyrate & Free Fatty Acids',
                  insulinState: 'Basal Nadir',
                  autophagyLevel: 'Peak',
                  biomarkerSummary: 'Pulsed growth hormone; cellular renewal active.',
                },
              ]
          ).map((stg) => (
            <div
              key={stg.phaseIndex}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-sky-300 hover:bg-sky-50/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-sky-800">Stage {stg.phaseIndex}</span>
                  <span className="rounded bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                    {stg.hourRange}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-slate-900">{stg.phaseName}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{stg.metabolicProcess}</p>
              </div>

              <div className="mt-3 space-y-1 border-t border-slate-200/80 pt-2 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Fuel:</span>
                  <span className="font-semibold text-slate-800">{stg.primaryEnergySubstrate.slice(0, 24)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Insulin Status:</span>
                  <span className="font-bold text-indigo-700">{stg.insulinState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Autophagy:</span>
                  <span className="font-bold text-emerald-700">{stg.autophagyLevel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12-WEEK WEIGHT & BODY FAT TRAJECTORY SVG CHART */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-900">
              12-Week Fasting Projection
            </span>
            <h3 className="mt-1 text-lg font-bold text-slate-900">
              Projected Weight &amp; Body Fat Loss Curve
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Incorporates adaptive metabolic thermogenesis (-10 kcal/kg lost) and protocol-specific lean mass partitioning.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-teal-700">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
              Scale Weight ({weightUnit})
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
              Body Fat %
            </span>
          </div>
        </div>

        {/* CHART SVG */}
        <div className="relative mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[580px]">
            <defs>
              <linearGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = chartHeight - padBottom - pct * (chartHeight - padTop - padBottom);
              return (
                <line
                  key={i}
                  x1={padLeft}
                  y1={y}
                  x2={chartWidth - padRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              );
            })}

            {/* Area Fill */}
            <path d={weightArea} fill="url(#weightAreaGrad)" />

            {/* Weight Line */}
            <path d={weightPath} fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />

            {/* Body Fat Line */}
            <path d={bfPath} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />

            {/* Points & Interactive Nodes */}
            {trajectory.map((p, idx) => {
              const wVal = unitSystem === 'imperial' ? kgToLbs(p.projectedWeightKg) : p.projectedWeightKg;
              const x = getX(idx);
              const yW = getYWeight(wVal);
              const yBf = getYBf(p.projectedBodyFatPct);
              const isHovered = hoveredWeek === idx;

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredWeek(idx)}
                  onMouseLeave={() => setHoveredWeek(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={x}
                    cy={yW}
                    r={isHovered ? 6 : 4}
                    fill="#0d9488"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={x}
                    cy={yBf}
                    r={isHovered ? 5 : 3}
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* X-axis week label */}
                  {(idx % 2 === 0 || idx === trajectory.length - 1) && (
                    <text
                      x={x}
                      y={chartHeight - 10}
                      textAnchor="middle"
                      className="fill-slate-500 font-mono text-[10px] font-semibold"
                    >
                      W{idx}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* SUMMARY STATS UNDER TRAJECTORY */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">
              12-Week Expected Loss:{' '}
              <strong className="font-bold text-emerald-700">
                -{totalLost} {weightUnit}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-sky-600" />
            <span className="font-semibold text-slate-700">
              Starting:{' '}
              <strong className="font-bold text-slate-900">
                {initialW} {weightUnit}
              </strong>{' '}
              → Week 12:{' '}
              <strong className="font-bold text-slate-900">
                {finalW} {weightUnit}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            <span className="font-semibold text-slate-700">
              Estimated Lean Mass Protected:{' '}
              <strong className="font-bold text-teal-800">
                {fastingProtocol === 'omad' ? '~80%' : fastingProtocol === '20:4' ? '~88%' : '≥95%'}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
