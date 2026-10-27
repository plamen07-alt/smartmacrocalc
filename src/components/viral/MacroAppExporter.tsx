'use client';

import React, { useState } from 'react';
import { Copy, Check, Smartphone, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MacroSplit, CalculatorTab } from '@/lib/formulas';

export interface MacroAppExporterProps {
  trainingMacros: MacroSplit;
  restMacros: MacroSplit;
  weeklyAverage: MacroSplit;
  activeTab?: CalculatorTab;
  glp1ProteinTarget?: number;
  perMealProtein?: number;
  breakfastProtein?: number;
  fiberGrams?: number;
}

export function MacroAppExporter({
  trainingMacros,
  restMacros,
  weeklyAverage,
  activeTab = 'recomp',
  glp1ProteinTarget,
  perMealProtein,
  breakfastProtein,
  fiberGrams,
}: MacroAppExporterProps) {
  const [copiedMode, setCopiedMode] = useState<'training' | 'rest' | 'avg' | null>(null);

  const copyPreset = (mode: 'training' | 'rest' | 'avg', split: MacroSplit) => {
    const text = `Calories: ${split.calories} kcal | Protein: ${split.proteinGrams}g (${split.proteinPct}%) | Carbs: ${split.carbsGrams}g (${split.carbsPct}%) | Fat: ${split.fatGrams}g (${split.fatPct}%) | Fiber: ${split.fiberGrams}g`;
    navigator.clipboard.writeText(text);
    setCopiedMode(mode);
    setTimeout(() => setCopiedMode(null), 2200);
  };

  const getSubtitles = () => {
    if (activeTab === 'perimenopause') {
      return {
        training: 'Resistance Training Days (Carbohydrate refeed to support thyroid T3 & lower evening cortisol)',
        rest: 'Recovery Days (Elevated healthy fats to provide steroid hormone precursors)',
        avg: '7-Day Static Target (For single-goal tracking apps)',
      };
    }
    if (activeTab === 'glp1') {
      return {
        training: 'Optimal Daily Target (2.2g/kg LBM to defend contractile tissue)',
        rest: 'Critical Anti-Sarcopenia Floor (1.8g/kg LBM absolute minimum)',
        avg: '7-Day Static Target (For single-goal tracking apps)',
      };
    }
    if (activeTab === 'fasting') {
      return {
        training: 'Eating Window Target (Paced across 2–3 feedings)',
        rest: 'Fasting Day Target (Lipolytic deficit balance)',
        avg: '7-Day Static Average (For single-goal tracking apps)',
      };
    }
    return {
      training: 'Use on resistance training days (Cronometer / MyFitnessPal Custom Goals)',
      rest: 'Use on non-lifting / cardio recovery days',
      avg: 'Use if your tracking app only allows a single daily calorie goal',
    };
  };

  const subtitles = getSubtitles();

  const rows: Array<{
    key: 'training' | 'rest' | 'avg';
    title: string;
    subtitle: string;
    split: MacroSplit;
    badge: string;
  }> = [
    {
      key: 'training',
      title: activeTab === 'glp1' ? 'Optimal Protein Target' : 'Training Day Settings',
      subtitle: subtitles.training,
      split: trainingMacros,
      badge: 'bg-emerald-100 text-emerald-800',
    },
    {
      key: 'rest',
      title: activeTab === 'glp1' ? 'Critical Protein Floor' : 'Rest & Recovery Day Settings',
      subtitle: subtitles.rest,
      split: restMacros,
      badge: 'bg-indigo-100 text-indigo-800',
    },
    {
      key: 'avg',
      title: '7-Day Static Average (Free App Tiers)',
      subtitle: subtitles.avg,
      split: weeklyAverage,
      badge: 'bg-slate-200 text-slate-800',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
            <Smartphone className="h-3.5 w-3.5" />
            Retention Strategy #6 • Direct Food Tracker Integration
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            1-Click Export to MyFitnessPal, Cronometer &amp; MacroFactor
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Exact Grams &amp; Ratio Percentages Included
        </span>
      </div>

      {/* CONTEXTUAL PROTOCOL CALLOUT BADGE */}
      {activeTab === 'perimenopause' && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1.5 text-xs font-semibold text-amber-900">
          <Sparkles className="h-3.5 w-3.5 text-amber-700" />
          35g+ Leucine Breakfast Anchor: {breakfastProtein || 35}g protein within 60 minutes of waking • Fiber: {fiberGrams || 32}g/day
        </div>
      )}

      {activeTab === 'glp1' && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-1.5 text-xs font-semibold text-rose-900">
          <Sparkles className="h-3.5 w-3.5 text-rose-700" />
          GLP-1 Pacing: {perMealProtein || 35}g protein per meal • Soluble Prebiotic Fiber: {fiberGrams || 32}g/day
        </div>
      )}

      {activeTab === 'fasting' && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-1.5 text-xs font-semibold text-sky-900">
          <Sparkles className="h-3.5 w-3.5 text-sky-700" />
          Fasting Pacing: Distribute protein into distinct boluses of &ge;35g across your eating window
        </div>
      )}

      <p className="mt-3 text-xs text-slate-600">
        Open <strong>Cronometer</strong> (<em>More → Targets → Macronutrient Settings → Fixed Values</em>) or{' '}
        <strong>MyFitnessPal</strong> (<em>More → Goals → Calorie, Carbs, Protein and Fat Goals</em>) and copy-paste the exact numbers below:
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {rows.map(({ key, title, subtitle, split, badge }) => (
          <div
            key={key}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4"
          >
            <div>
              <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${badge}`}>
                {title}
              </span>
              <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>

              <div className="mt-3 space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-3 font-mono text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Daily Energy:</span>
                  <span>{split.calories} kcal</span>
                </div>
                <div className="flex justify-between text-teal-700">
                  <span>Protein:</span>
                  <span>
                    {split.proteinGrams}g ({split.proteinPct}%)
                  </span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Carbohydrates:</span>
                  <span>
                    {split.carbsGrams}g ({split.carbsPct}%)
                  </span>
                </div>
                <div className="flex justify-between text-indigo-700">
                  <span>Dietary Fat:</span>
                  <span>
                    {split.fatGrams}g ({split.fatPct}%)
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Dietary Fiber:</span>
                  <span>{split.fiberGrams}g</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyPreset(key, split)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
            >
              {copiedMode === key ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy {title.split(' ')[0]} Macros
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
