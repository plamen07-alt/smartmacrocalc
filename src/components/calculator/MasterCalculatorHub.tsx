'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Flame,
  Dumbbell,
  ShieldAlert,
  TrendingUp,
  Droplets,
  Leaf,
  Scale,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  UserBiometrics,
  DEFAULT_BIOMETRICS,
  ACTIVITY_MULTIPLIERS,
  ActivityLevel,
  BmrFormula,
  Glp1Medication,
  CalculatorTab,
  FastingProtocol,
  PerimenopauseStage,
  calculateFullMetabolicReport,
  kgToLbs,
  lbsToKg,
  cmToFeetInches,
  feetInchesToCm,
} from '@/lib/formulas';
import {
  DynamicResultAdSlot,
  StickyFooterAdSlot,
  NativeAffiliateCallout,
  LabTestedAffiliateDirectory,
} from '@/components/monetization/StrategicAdSlots';
import { VisualFastingClock } from '@/components/calculator/VisualFastingClock';
import { SocialBlueprintCard } from '@/components/viral/SocialBlueprintCard';
import { ZeroLoginWeightTracker } from '@/components/viral/ZeroLoginWeightTracker';
import { MacroAppExporter } from '@/components/viral/MacroAppExporter';
import { sanitizeBiometricsInput } from '@/lib/security';

interface MasterCalculatorHubProps {
  initialBiometrics?: Partial<UserBiometrics>;
  initialTab?: CalculatorTab;
  presetTitle?: string;
}

const BIOMETRICS_STORAGE_KEY = 'metabolic_metrics_biometrics_v1';

export function MasterCalculatorHub({
  initialBiometrics,
  initialTab = 'recomp',
  presetTitle,
}: MasterCalculatorHubProps) {
  const [bio, setBio] = useState<UserBiometrics>(() => ({
    ...DEFAULT_BIOMETRICS,
    ...initialBiometrics,
  }));
  const [activeTab, setActiveTab] = useState<CalculatorTab>(initialTab);
  const [showAdPreview, setShowAdPreview] = useState<boolean>(true);

  // Load saved biometrics from LocalStorage only if not on a specific preset page
  useEffect(() => {
    if (initialBiometrics) {
      setBio({ ...DEFAULT_BIOMETRICS, ...initialBiometrics });
      setActiveTab(initialTab);
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab') as CalculatorTab | null;
        const validTabs: CalculatorTab[] = [
          'recomp',
          'glp1',
          'perimenopause',
          'fasting',
          'electrolytes',
          'ffmi',
          'reverse',
        ];
        if (tabParam && validTabs.includes(tabParam)) {
          setActiveTab(tabParam);
        }

        const saved = window.localStorage.getItem(BIOMETRICS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setBio((prev) => sanitizeBiometricsInput(parsed, prev));
        }
      } catch {
        // ignore storage error
      }
    }
  }, [initialBiometrics, initialTab]);

  const updateBio = (patch: Partial<UserBiometrics>) => {
    setBio((prev) => {
      const next = { ...prev, ...patch };
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(BIOMETRICS_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const resetDefaults = () => {
    setBio({ ...DEFAULT_BIOMETRICS, ...initialBiometrics });
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(BIOMETRICS_STORAGE_KEY);
    }
  };

  const report = useMemo(() => calculateFullMetabolicReport(bio), [bio]);

  const { feet, inches } = cmToFeetInches(bio.heightCm);
  const weightLbs = kgToLbs(bio.weightKg);

  const tabs: Array<{
    id: CalculatorTab;
    label: string;
    badge: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'recomp',
      label: 'Body Recomp & Calorie Cycling',
      badge: 'Flagship • +5% / -20%',
      icon: <Dumbbell className="h-4 w-4" />,
    },
    {
      id: 'glp1',
      label: 'GLP-1 & Ozempic Muscle Guard',
      badge: 'Anti-Sarcopenia • 1.0g/lb LBM',
      icon: <ShieldAlert className="h-4 w-4" />,
    },
    {
      id: 'perimenopause',
      label: 'Perimenopause Hormone Macro',
      badge: '35g+ Leucine • Ages 38–55',
      icon: <Flame className="h-4 w-4" />,
    },
    {
      id: 'fasting',
      label: 'Visual Fasting Clock & Timeline',
      badge: '16:8 / OMAD Clock',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 'electrolytes',
      label: 'Creatine & Sweat Electrolytes',
      badge: 'Sauna & Keto Lab',
      icon: <Droplets className="h-4 w-4" />,
    },
    {
      id: 'ffmi',
      label: 'Leucine Trigger & FFMI Lab',
      badge: '3.0g Leucine / Meal',
      icon: <Leaf className="h-4 w-4" />,
    },
    {
      id: 'reverse',
      label: 'Reverse Diet Planner',
      badge: '+80 kcal/wk Step-Up',
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Module Navigation Tabs ("Swiss Army Knife" Hub Architecture) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xs">
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start justify-between rounded-xl p-3 text-left transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                    : 'bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className={isActive ? 'text-teal-400' : 'text-teal-600'}>{tab.icon}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </div>
                <span className="mt-2 text-xs font-bold leading-snug">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Interface: Left Inputs / Right Real-Time Clinical Output */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: BIOMETRIC INPUT ENGINE (5 Cols) */}
        <div className="space-y-5 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            {/* Unit Toggle Header (Default Imperial for US Tier-1 Market) */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {presetTitle ? presetTitle : '1. Personal Biometric Parameters'}
                </h2>
                <p className="text-xs text-slate-500">
                  Shared automatically across all 7 clinical calculators
                </p>
              </div>

              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => updateBio({ unitSystem: 'imperial' })}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
                    bio.unitSystem === 'imperial'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  US Imperial (lbs / ft)
                </button>
                <button
                  type="button"
                  onClick={() => updateBio({ unitSystem: 'metric' })}
                  className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
                    bio.unitSystem === 'metric'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Metric (kg / cm)
                </button>
              </div>
            </div>

            {/* Biological Sex & Age */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Biological Sex</label>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateBio({ sex: 'male' })}
                    className={`rounded-lg border py-2 text-xs font-bold transition ${
                      bio.sex === 'male'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBio({ sex: 'female' })}
                    className={`rounded-lg border py-2 text-xs font-bold transition ${
                      bio.sex === 'female'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Age</span>
                  <span className="font-mono font-bold text-teal-700">{bio.age} yrs</span>
                </label>
                <input
                  type="range"
                  min={18}
                  max={80}
                  value={bio.age}
                  onChange={(e) => updateBio({ age: Number(e.target.value) })}
                  className="mt-3 w-full accent-teal-600"
                />
              </div>
            </div>

            {/* Weight Input (Imperial lbs vs Metric kg) */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Current Scale Weight</span>
                <span className="rounded bg-teal-50 px-2 py-0.5 font-mono text-sm font-bold text-teal-800">
                  {bio.unitSystem === 'imperial'
                    ? `${weightLbs} lbs (${Math.round(bio.weightKg * 10) / 10} kg)`
                    : `${Math.round(bio.weightKg * 10) / 10} kg (${weightLbs} lbs)`}
                </span>
              </div>
              {bio.unitSystem === 'imperial' ? (
                <input
                  type="range"
                  min={90}
                  max={360}
                  step={1}
                  value={Math.round(weightLbs)}
                  onChange={(e) => updateBio({ weightKg: lbsToKg(Number(e.target.value)) })}
                  className="mt-2 w-full accent-teal-600"
                />
              ) : (
                <input
                  type="range"
                  min={40}
                  max={165}
                  step={0.5}
                  value={Math.round(bio.weightKg * 2) / 2}
                  onChange={(e) => updateBio({ weightKg: Number(e.target.value) })}
                  className="mt-2 w-full accent-teal-600"
                />
              )}
            </div>

            {/* Height Input (Imperial ft/in vs Metric cm) */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Height / Stature</span>
                <span className="font-mono text-xs font-bold text-slate-800">
                  {feet}&apos;{inches}&quot; ({Math.round(bio.heightCm)} cm)
                </span>
              </div>
              {bio.unitSystem === 'imperial' ? (
                <div className="mt-1.5 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500">Feet</label>
                    <select
                      value={feet}
                      onChange={(e) =>
                        updateBio({ heightCm: feetInchesToCm(Number(e.target.value), inches) })
                      }
                      className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                    >
                      {[4, 5, 6, 7].map((f) => (
                        <option key={f} value={f}>
                          {f} ft
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500">Inches</label>
                    <select
                      value={inches}
                      onChange={(e) =>
                        updateBio({ heightCm: feetInchesToCm(feet, Number(e.target.value)) })
                      }
                      className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inch) => (
                        <option key={inch} value={inch}>
                          {inch} in
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <input
                  type="range"
                  min={140}
                  max={215}
                  value={Math.round(bio.heightCm)}
                  onChange={(e) => updateBio({ heightCm: Number(e.target.value) })}
                  className="mt-2 w-full accent-teal-600"
                />
              )}
            </div>

            {/* Body Fat % Slider (Powers Katch-McArdle, Cunningham & FFMI) */}
            <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Estimated Body Fat %</span>
                <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-teal-300">
                  {bio.bodyFatPct}% BF • LBM: {report.leanBodyMassLbs} lbs ({report.leanBodyMassKg} kg)
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={48}
                step={1}
                value={bio.bodyFatPct}
                onChange={(e) => updateBio({ bodyFatPct: Number(e.target.value) })}
                className="mt-2 w-full accent-teal-600"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>Athletic (8–14%)</span>
                <span>Recomp Zone (15–24%)</span>
                <span>High Adiposity (25%+)</span>
              </div>
            </div>

            {/* 3 Scientific BMR Formulas Comparison Selector */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-slate-800">
                2. Clinical BMR Equation (3-Formula Engine)
              </label>
              <p className="text-[11px] text-slate-500">
                Compare all 3 peer-reviewed equations in real time:
              </p>

              <div className="mt-2 space-y-2">
                {(
                  [
                    {
                      id: 'mifflin',
                      name: 'Mifflin-St Jeor (General Population)',
                      val: report.bmrMifflin,
                      pmid: 'PMID: 2305711',
                      desc: 'Best if you are unsure of your exact body fat %',
                    },
                    {
                      id: 'katch',
                      name: 'Katch-McArdle (Lean Mass Anchored)',
                      val: report.bmrKatch,
                      pmid: 'LBM Formula',
                      desc: 'Accounts for metabolically active Lean Body Mass',
                    },
                    {
                      id: 'cunningham',
                      name: 'Cunningham Equation (Strength Athletes)',
                      val: report.bmrCunningham,
                      pmid: 'PMID: 6741850',
                      desc: 'Calibrated for resistance-trained & high-FFMI athletes',
                    },
                  ] as Array<{
                    id: BmrFormula;
                    name: string;
                    val: number;
                    pmid: string;
                    desc: string;
                  }>
                ).map((f) => {
                  const selected = bio.formula === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => updateBio({ formula: f.id })}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                        selected
                          ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{f.name}</span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                            {f.pmid}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500">{f.desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-teal-800">
                          {f.val} kcal
                        </div>
                        <div className="text-[10px] text-slate-400">BMR / day</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activity Multiplier */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-800">
                3. Daily Lifestyle & Activity Multiplier
              </label>
              <select
                value={bio.activityLevel}
                onChange={(e) => updateBio({ activityLevel: e.target.value as ActivityLevel })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:outline-none"
              >
                {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {ACTIVITY_MULTIPLIERS[lvl].label} (×{ACTIVITY_MULTIPLIERS[lvl].multiplier})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                {ACTIVITY_MULTIPLIERS[bio.activityLevel].description}
              </p>
            </div>

            {/* Module-Specific Sliders */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="text-xs font-bold text-teal-800 uppercase">
                Module Fine-Tuning ({activeTab.toUpperCase()})
              </div>

              {activeTab === 'recomp' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Lifting / Training Days per Week</span>
                      <span className="font-mono font-bold text-teal-700">
                        {bio.trainingDaysPerWeek} days ({7 - bio.trainingDaysPerWeek} rest days)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={bio.trainingDaysPerWeek}
                      onChange={(e) => updateBio({ trainingDaysPerWeek: Number(e.target.value) })}
                      className="mt-1 w-full accent-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>Training Surplus</span>
                        <span className="font-mono font-bold text-emerald-700">
                          +{bio.trainingDaySurplusPct}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={15}
                        value={bio.trainingDaySurplusPct}
                        onChange={(e) =>
                          updateBio({ trainingDaySurplusPct: Number(e.target.value) })
                        }
                        className="mt-1 w-full accent-emerald-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>Rest Day Deficit</span>
                        <span className="font-mono font-bold text-indigo-700">
                          {bio.restDayDeficitPct}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-30}
                        max={-5}
                        value={bio.restDayDeficitPct}
                        onChange={(e) => updateBio({ restDayDeficitPct: Number(e.target.value) })}
                        className="mt-1 w-full accent-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'glp1' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      GLP-1 / GIP Medication Type
                    </label>
                    <select
                      value={bio.glp1Medication}
                      onChange={(e) =>
                        updateBio({ glp1Medication: e.target.value as Glp1Medication })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900"
                    >
                      <option value="semaglutide">Semaglutide (Ozempic® / Wegovy®)</option>
                      <option value="tirzepatide">Tirzepatide (Mounjaro® / Zepbound®)</option>
                      <option value="retatrutide">Retatrutide (Triple Agonist Protocol)</option>
                      <option value="liraglutide">Liraglutide (Saxenda®)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Titration / Dose Stage
                    </label>
                    <select
                      value={bio.glp1DoseStage}
                      onChange={(e) =>
                        updateBio({
                          glp1DoseStage: e.target.value as 'initiation' | 'titration' | 'maintenance',
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold"
                    >
                      <option value="initiation">Initiation Stage (0.25mg–0.5mg)</option>
                      <option value="titration">Titration Stage (1.0mg–1.7mg)</option>
                      <option value="maintenance">Maintenance Stage (2.0mg–2.4mg+)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Appetite Suppression
                      </label>
                      <select
                        value={bio.appetiteSuppressionLevel}
                        onChange={(e) =>
                          updateBio({
                            appetiteSuppressionLevel: e.target.value as
                              | 'mild'
                              | 'moderate'
                              | 'severe',
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe (Early Fullness)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Meals / Shakes per Day
                      </label>
                      <select
                        value={bio.mealsPerDay}
                        onChange={(e) => updateBio({ mealsPerDay: Number(e.target.value) })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold"
                      >
                        {[3, 4, 5].map((m) => (
                          <option key={m} value={m}>
                            {m} Feedings / day
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'perimenopause' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Menopausal Transition Stage
                    </label>
                    <select
                      value={bio.perimenopauseStage || 'early_transition'}
                      onChange={(e) =>
                        updateBio({
                          perimenopauseStage: e.target.value as PerimenopauseStage,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900"
                    >
                      <option value="early_transition">Early Transition (Irregular cycles, estrogen fluctuations)</option>
                      <option value="late_transition">Late Transition (Skipped cycles, 60+ days amenorrhea)</option>
                      <option value="postmenopause">Postmenopause (12+ months amenorrhea, baseline estrogen decline)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Resistance Lifting Days / Week</span>
                      <span className="font-mono font-bold text-teal-700">
                        {bio.trainingDaysPerWeek} days/wk
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={5}
                      value={bio.trainingDaysPerWeek}
                      onChange={(e) => updateBio({ trainingDaysPerWeek: Number(e.target.value) })}
                      className="mt-1 w-full accent-teal-600"
                    />
                    <div className="mt-0.5 text-[10px] text-slate-500">
                      Heavy resistance training maintains bone mineral density and reverses anabolic resistance.
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Carbohydrate Timing Strategy
                    </label>
                    <select
                      value={bio.carbTimingPreference || 'evening_cortisol'}
                      onChange={(e) =>
                        updateBio({
                          carbTimingPreference: e.target.value as 'evening_cortisol' | 'peri_workout',
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900"
                    >
                      <option value="evening_cortisol">Evening Wind-Down Carbs (Sleep &amp; Cortisol Support)</option>
                      <option value="peri_workout">Peri-Workout Carbs (Intense Glycogen Replenishment)</option>
                    </select>
                  </div>

                  {(bio.age < 38 || bio.age > 55) && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[11px] text-amber-900">
                      <strong>Cohort Notice:</strong> This clinical model is bio-calibrated specifically for women ages 38–55. For other demographics, see the standard Recomp protocol.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'fasting' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Intermittent Fasting Protocol
                    </label>
                    <select
                      value={bio.fastingProtocol || '16:8'}
                      onChange={(e) =>
                        updateBio({
                          fastingProtocol: e.target.value as FastingProtocol,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900"
                    >
                      <option value="16:8">16:8 Time-Restricted Eating (16h Fast / 8h Window - Optimal)</option>
                      <option value="18:6">18:6 Accelerated Fat Oxidation (18h Fast / 6h Window)</option>
                      <option value="20:4">20:4 The Warrior Diet (20h Fast / 4h Window)</option>
                      <option value="omad">OMAD (23h Fast / 1h Window - Single Feeding)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Eating Window Start Time</span>
                      <span className="font-mono font-bold text-teal-700">
                        {(bio.fastingEatingWindowStartHour ?? 12) === 12
                          ? '12:00 PM (Noon)'
                          : (bio.fastingEatingWindowStartHour ?? 12) > 12
                            ? `${(bio.fastingEatingWindowStartHour ?? 12) - 12}:00 PM`
                            : `${bio.fastingEatingWindowStartHour ?? 12}:00 AM`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={18}
                      step={1}
                      value={bio.fastingEatingWindowStartHour ?? 12}
                      onChange={(e) =>
                        updateBio({
                          fastingEatingWindowStartHour: Number(e.target.value),
                          fastingWindowStartHour: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>8:00 AM (Early)</span>
                      <span>12:00 PM (Standard)</span>
                      <span>6:00 PM (Late)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Meals Planned Inside Window
                    </label>
                    <select
                      value={bio.mealsPerDay || 3}
                      onChange={(e) => updateBio({ mealsPerDay: Number(e.target.value) })}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold"
                    >
                      <option value={1}>1 Meal (OMAD)</option>
                      <option value={2}>2 Meals (Paced)</option>
                      <option value={3}>3 Meals (Break-Fast, Mid, Dinner - Optimal MPS)</option>
                      <option value={4}>4 Meals / Shakes</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'reverse' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Current Restricted Diet Calories</span>
                      <span className="font-mono font-bold text-amber-700">
                        {bio.currentDietCalories} kcal/day
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1100}
                      max={Math.max(1500, report.tdee - 100)}
                      step={25}
                      value={bio.currentDietCalories}
                      onChange={(e) => updateBio({ currentDietCalories: Number(e.target.value) })}
                      className="mt-1 w-full accent-teal-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Weekly Step-Up Pace</span>
                      <span className="font-mono font-bold text-teal-700">
                        +{bio.reverseStepKcal} kcal / week
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={150}
                      step={10}
                      value={bio.reverseStepKcal}
                      onChange={(e) => updateBio({ reverseStepKcal: Number(e.target.value) })}
                      className="mt-1 w-full accent-teal-600"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'electrolytes' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Workout Duration</span>
                      <span className="font-mono font-bold text-teal-700">
                        {bio.workoutMinutes} min/session
                      </span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={120}
                      step={5}
                      value={bio.workoutMinutes}
                      onChange={(e) => updateBio({ workoutMinutes: Number(e.target.value) })}
                      className="mt-1 w-full accent-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Sweat Rate
                      </label>
                      <select
                        value={bio.sweatIntensity}
                        onChange={(e) =>
                          updateBio({
                            sweatIntensity: e.target.value as 'low' | 'moderate' | 'heavy',
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold"
                      >
                        <option value="low">Low / Cool Gym</option>
                        <option value="moderate">Moderate Sweat</option>
                        <option value="heavy">Heavy / Salty Sweater</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700">
                        Sauna Sessions / Wk
                      </label>
                      <select
                        value={bio.saunaSessionsPerWeek}
                        onChange={(e) =>
                          updateBio({ saunaSessionsPerWeek: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold"
                      >
                        {[0, 1, 2, 3, 4, 5].map((s) => (
                          <option key={s} value={s}>
                            {s}x Sauna / week
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={bio.isKetoOrLowCarb}
                      onChange={(e) => updateBio({ isKetoOrLowCarb: e.target.checked })}
                      className="h-4 w-4 rounded accent-teal-600"
                    />
                    Following Keto, Carnivore, or Intermittent Fasting (&lt;75g carbs/day)
                  </label>
                </div>
              )}

              {activeTab === 'ffmi' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Dietary Amino Preference
                    </label>
                    <select
                      value={bio.dietPreference || 'omnivore'}
                      onChange={(e) =>
                        updateBio({
                          dietPreference: e.target.value as 'omnivore' | 'plant_based',
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900"
                    >
                      <option value="omnivore">Omnivore (Dairy Whey / Egg / Poultry)</option>
                      <option value="plant_based">Plant-Based (Pea / Rice / Soy Isolates)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Protein Target per lb of Lean Body Mass</span>
                      <span className="font-mono font-bold text-teal-700">
                        {bio.proteinPerLbLbm}g / lb LBM
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.9}
                      max={1.4}
                      step={0.05}
                      value={bio.proteinPerLbLbm}
                      onChange={(e) => updateBio({ proteinPerLbLbm: Number(e.target.value) })}
                      className="mt-1 w-full accent-teal-600"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset to Default Profile
              </button>
              <span className="text-[11px] font-medium text-slate-400">
                100% Client-Side • Zero Data Uploaded
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME CLINICAL RESULTS & MONETIZATION SLOTS (7 Cols) */}
        <div className="space-y-5 lg:col-span-7">
          {/* Top Summary Metrics Banner */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">
                Selected BMR ({bio.formula})
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900">
                {report.selectedBmr.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500">kcal / day at rest</div>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 shadow-xs">
              <div className="text-[11px] font-bold text-teal-800 uppercase">
                Maintenance TDEE
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-teal-950">
                {report.tdee.toLocaleString()}
              </div>
              <div className="text-[11px] text-teal-700">kcal / day maintenance</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">
                Lean Body Mass
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900">
                {bio.unitSystem === 'imperial'
                  ? `${report.leanBodyMassLbs} lb`
                  : `${report.leanBodyMassKg} kg`}
              </div>
              <div className="text-[11px] text-slate-500">
                FFMI: {report.ffmiResult.normalizedFfmi}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">
                Daily Protein Anchor
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-emerald-700">
                {report.trainingDayMacros.proteinGrams}g
              </div>
              <div className="text-[11px] text-slate-500">
                ~{report.ffmiResult.perMealProteinTargetGrams}g per meal
              </div>
            </div>
          </div>

          {/* STRATEGIC AD ZONE #1: DYNAMIC RESULT SLOT (Right between inputs & results per PDF Page 5) */}
          <DynamicResultAdSlot showAdPreview={showAdPreview} activeTab={activeTab} />

          {/* ACTIVE TAB CONTENT */}
          {activeTab === 'recomp' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    Body Recomposition & Calorie Cycling Protocol
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                    Training Day Surplus (+{bio.trainingDaySurplusPct}%) vs. Rest Day Deficit (
                    {bio.restDayDeficitPct}%)
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-500">
                  7-Day Net Delta: {report.weeklyNetCalorieDelta >= 0 ? '+' : ''}
                  {report.weeklyNetCalorieDelta} kcal/wk
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* Training Day Card */}
                <div className="rounded-xl border-2 border-emerald-500/80 bg-emerald-50/30 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white uppercase">
                      Training Days ({bio.trainingDaysPerWeek} days/wk)
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      +{bio.trainingDaySurplusPct}% Anabolic Refeed
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-extrabold text-slate-900">
                      {report.trainingDayMacros.calories.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">kcal / day</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Protein</div>
                      <div className="font-mono text-lg font-extrabold text-teal-700">
                        {report.trainingDayMacros.proteinGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.trainingDayMacros.proteinPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Carbs</div>
                      <div className="font-mono text-lg font-extrabold text-amber-600">
                        {report.trainingDayMacros.carbsGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.trainingDayMacros.carbsPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Fats</div>
                      <div className="font-mono text-lg font-extrabold text-indigo-600">
                        {report.trainingDayMacros.fatGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.trainingDayMacros.fatPct}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest Day Card */}
                <div className="rounded-xl border-2 border-indigo-500/70 bg-indigo-50/30 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white uppercase">
                      Rest Days ({7 - bio.trainingDaysPerWeek} days/wk)
                    </span>
                    <span className="font-mono text-xs font-bold text-indigo-800">
                      {bio.restDayDeficitPct}% Fat Oxidation
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-extrabold text-slate-900">
                      {report.restDayMacros.calories.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">kcal / day</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Protein</div>
                      <div className="font-mono text-lg font-extrabold text-teal-700">
                        {report.restDayMacros.proteinGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.restDayMacros.proteinPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Carbs</div>
                      <div className="font-mono text-lg font-extrabold text-amber-600">
                        {report.restDayMacros.carbsGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.restDayMacros.carbsPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Fats</div>
                      <div className="font-mono text-lg font-extrabold text-indigo-600">
                        {report.restDayMacros.fatGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.restDayMacros.fatPct}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STRATEGIC AD ZONE #3: NATIVE CONTEXTUAL AFFILIATE CALLOUT IN RESULT */}
              <NativeAffiliateCallout
                proteinGrams={report.trainingDayMacros.proteinGrams}
                mode="protein"
              />

              {/* Cross-Module Pageview Multiplier Links (3.5+ Pageviews / Session Strategy) */}
              <div className="mt-5 grid gap-2.5 border-t border-slate-100 pt-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('ffmi')}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-xs font-semibold text-slate-800 transition hover:border-teal-500 hover:bg-teal-50/40"
                >
                  <span>
                    See exact grams of protein per meal needed for 3.0g Leucine synthesis & FFMI →
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-teal-600" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reverse')}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-xs font-semibold text-slate-800 transition hover:border-teal-500 hover:bg-teal-50/40"
                >
                  <span>
                    Finished a cut? Calculate your +80 kcal/wk Reverse Diet Recovery Plan →
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-teal-600" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'glp1' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                    GLP-1 & GIP Anti-Sarcopenia Protocol ({bio.glp1Medication.toUpperCase()})
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                    Lean Muscle Mass & Fiber Preservation Blueprint
                  </h3>
                </div>
                <span
                  className={`rounded-lg px-3 py-1 text-xs font-bold ${
                    report.glp1Protocol.muscleLossRiskScore.includes('High')
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  Risk Status: {report.glp1Protocol.muscleLossRiskScore}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-[11px] font-semibold text-slate-500">GLP-1 Daily Calories</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900">
                    {report.glp1Protocol.targetCalories}
                  </div>
                  <div className="text-[10px] text-slate-500">Safe metabolic floor</div>
                </div>

                <div className="rounded-xl border border-teal-300 bg-teal-50/60 p-3.5">
                  <div className="text-[11px] font-bold text-teal-900">Optimal Daily Protein</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-teal-800">
                    {report.glp1Protocol.optimalProteinGrams}g
                  </div>
                  <div className="text-[10px] text-teal-700">
                    Min floor: {report.glp1Protocol.criticalProteinFloorGrams}g/day
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-[11px] font-semibold text-slate-500">
                    Per-Meal Protein ({bio.mealsPerDay}x)
                  </div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-indigo-700">
                    {report.glp1Protocol.proteinPerMealGrams}g
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ~{report.glp1Protocol.leucinePerMealGrams}g Leucine/meal
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-[11px] font-semibold text-slate-500">Fiber & Fluid Target</div>
                  <div className="mt-1 font-mono text-xl font-extrabold text-slate-900">
                    {report.glp1Protocol.solubleFiberGrams}g / {report.glp1Protocol.hydrationOz}oz
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {report.glp1Protocol.hydrationLiters}L electrolyte water
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="text-xs font-bold text-slate-800 uppercase">
                  Clinical Action Plan for {bio.glp1Medication} Patients:
                </div>
                {report.glp1Protocol.clinicalNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <NativeAffiliateCallout
                proteinGrams={report.glp1Protocol.optimalProteinGrams}
                mode="glp1"
              />
            </div>
          )}

          {activeTab === 'reverse' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                  Metabolic Recovery &amp; Reverse Diet Planner
                </span>
                <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                  Step-by-Step +{bio.reverseStepKcal} kcal/Week Bridge to True Maintenance ({report.tdee}{' '}
                  kcal)
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Eliminate post-diet fat rebound by gradually restoring circulating leptin, thyroid T3 conversion, and Non-Exercise Activity Thermogenesis (NEAT).
                </p>
              </div>

              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase">
                    <tr>
                      <th className="px-3.5 py-2.5">Week</th>
                      <th className="px-3.5 py-2.5">Daily Target</th>
                      <th className="px-3.5 py-2.5">Protein</th>
                      <th className="px-3.5 py-2.5">Carbs</th>
                      <th className="px-3.5 py-2.5">Fats</th>
                      <th className="px-3.5 py-2.5">Physiological Phase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.reverseDietSchedule.map((row) => (
                      <tr key={row.week} className="hover:bg-slate-50">
                        <td className="px-3.5 py-2.5 font-bold text-slate-900">Week {row.week}</td>
                        <td className="px-3.5 py-2.5 font-mono font-bold text-teal-700">
                          {row.dailyCalories} kcal
                        </td>
                        <td className="px-3.5 py-2.5 font-mono">{row.proteinGrams}g</td>
                        <td className="px-3.5 py-2.5 font-mono">{row.carbsGrams}g</td>
                        <td className="px-3.5 py-2.5 font-mono">{row.fatGrams}g</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{row.metabolicStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ffmi' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-900">
                  Fat-Free Mass Index (FFMI) &amp; 3.0g Leucine Meal Trigger
                </span>
                <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                  Muscular Potential Assessment & Complete Amino Matrix
                </h3>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-500">Raw FFMI Score</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900">
                    {report.ffmiResult.rawFfmi} kg/m²
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Lean Mass: {report.ffmiResult.leanBodyMassLbs} lbs
                  </div>
                </div>
                <div className="rounded-xl border border-teal-300 bg-teal-50/60 p-4">
                  <div className="text-xs font-bold text-teal-900">Normalized FFMI (1.80m)</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-teal-800">
                    {report.ffmiResult.normalizedFfmi}
                  </div>
                  <div className="text-[11px] font-semibold text-teal-700">
                    {report.ffmiResult.naturalPotentialPct}% of Natural Genetic Ceiling
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-500">Classification</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">
                    {report.ffmiResult.ffmiCategory}
                  </div>
                </div>
              </div>

              <h4 className="mt-5 text-sm font-bold text-slate-900">
                How to Hit the 3.0g L-Leucine Anabolic Trigger per Meal (Plant vs. Animal Sources)
              </h4>
              <div className="mt-2.5 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase">
                    <tr>
                      <th className="px-3 py-2">Protein Source</th>
                      <th className="px-3 py-2">Category</th>
                      <th className="px-3 py-2">Protein Needed for 3g Leucine</th>
                      <th className="px-3 py-2">Caloric Cost</th>
                      <th className="px-3 py-2">Practical Serving</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.ffmiResult.plantSourcesComparison.map((row) => (
                      <tr key={row.food} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-bold text-slate-900">{row.food}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              row.category === 'Plant-Based'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-sky-100 text-sky-800'
                            }`}
                          >
                            {row.category}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-mono font-bold text-teal-700">
                          {row.proteinFor3gLeucine}g protein ({row.leucinePct}% leu)
                        </td>
                        <td className="px-3 py-2 font-mono">{row.caloriesFor3gLeucine} kcal</td>
                        <td className="px-3 py-2 text-slate-600">{row.servingDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'electrolytes' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-900">
                  Creatine Saturation, Hydration &amp; Sauna/Keto Electrolytes
                </span>
                <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                  Daily Intracellular Fluid & Mineral Replacement Targets
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5">
                  <div className="text-[11px] font-bold text-sky-900">Total Daily Water</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-sky-950">
                    {report.electrolyteResult.totalDailyWaterOz} oz
                  </div>
                  <div className="text-[11px] text-sky-700">
                    {report.electrolyteResult.totalDailyWaterLiters} Liters / day
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-[11px] font-semibold text-slate-500">Daily Sodium (Na+)</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900">
                    {report.electrolyteResult.sodiumMg.toLocaleString()} mg
                  </div>
                  <div className="text-[11px] text-slate-500">Plasma & pump volume</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-[11px] font-semibold text-slate-500">Potassium & Mg</div>
                  <div className="mt-1 font-mono text-xl font-extrabold text-slate-900">
                    {report.electrolyteResult.potassiumMg} / {report.electrolyteResult.magnesiumMg}mg
                  </div>
                  <div className="text-[11px] text-slate-500">Intracellular K+ / Mg2+</div>
                </div>

                <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-3.5">
                  <div className="text-[11px] font-bold text-teal-900">Creatine Monohydrate</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-teal-900">
                    {report.electrolyteResult.creatineDailyGrams}g / day
                  </div>
                  <div className="text-[11px] text-teal-700">
                    Optional load: {report.electrolyteResult.creatineLoadingGrams}g/d (5d)
                  </div>
                </div>
              </div>

              <NativeAffiliateCallout
                proteinGrams={report.trainingDayMacros.proteinGrams}
                sodiumMg={report.electrolyteResult.sodiumMg}
                mode="electrolyte"
              />
            </div>
          )}

          {activeTab === 'perimenopause' && (
            <div className="rounded-2xl border border-purple-200 bg-white p-6 shadow-xs">
              <div className="border-b border-purple-100 pb-4">
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-900 ring-1 ring-purple-300">
                  Perimenopause &amp; Hormone Macro / TDEE Protocol
                </span>
                <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                  Anabolic Resistance Overcoming &amp; Cortisol-Friendly Carbohydrate Cycling
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Calibrated for female neuroendocrine transitions (ages 38–55). Declining ovarian estradiol diminishes skeletal muscle leucine sensitivity, while progesterone fluctuations impair insulin signaling. Caloric intake is strictly anchored above 1,350 kcal to protect thyroid T4→T3 conversion.
                </p>
              </div>

              {/* TOP 4-METRIC GRID */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-3.5">
                  <div className="text-[11px] font-bold text-purple-900">Calorie Target (Avg)</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-purple-950">
                    {report.perimenopauseProtocol.dailyCalories.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-purple-700">
                    Floor: ≥{report.perimenopauseProtocol.cortisolSafetyCalorieFloor} kcal
                  </div>
                </div>

                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3.5">
                  <div className="text-[11px] font-bold text-teal-900">Optimal Daily Protein</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-teal-950">
                    {report.perimenopauseProtocol.optimalDailyProteinGrams}g
                  </div>
                  <div className="text-[11px] text-teal-700">
                    Floor: ≥{report.perimenopauseProtocol.dailyProteinFloorGrams}g (2.0g/kg LBM)
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5">
                  <div className="text-[11px] font-bold text-amber-900">Breakfast Anchor</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-amber-950">
                    {report.perimenopauseProtocol.breakfastProteinAnchorGrams}g
                  </div>
                  <div className="text-[11px] text-amber-700">
                    ~{report.perimenopauseProtocol.breakfastLeucineGrams}g L-Leucine
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="text-[11px] font-bold text-slate-700">Estrogen Fiber Floor</div>
                  <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900">
                    {report.perimenopauseProtocol.estrogenSupportFiberGrams}g
                  </div>
                  <div className="text-[11px] text-slate-500">Gut beta-glucuronidase clearance</div>
                </div>
              </div>

              {/* 35G+ LEUCINE BREAKFAST ANCHOR SPOTLIGHT */}
              <div className="mt-5 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 p-5 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
                      <Flame className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-amber-950">
                        The 35g+ Leucine Breakfast Anchor (Non-Negotiable)
                      </h4>
                      <p className="text-[11px] text-amber-800">
                        Crosses the 3.0g intra-myocellular leucine threshold within 60 minutes of waking.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-200/80 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-900">
                    {report.perimenopauseProtocol.breakfastProteinAnchorGrams}g Protein • {report.perimenopauseProtocol.breakfastLeucineGrams}g Leucine
                  </span>
                </div>

                <div className="mt-3 grid gap-3 text-xs leading-relaxed text-slate-700 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <strong className="text-amber-900">Overcoming Anabolic Resistance:</strong>
                    <p className="text-[11px] text-slate-600">
                      Declining estrogen downregulates satellite cell mTORC1 signaling. Standard breakfasts (15g–20g protein) fail to trigger muscle protein synthesis, leaving muscle tissue in net catabolism despite adequate calories.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <strong className="text-amber-900">Cortisol Awakening Response (CAR) Blunting:</strong>
                    <p className="text-[11px] text-slate-600">
                      Progesterone loss elevates morning adrenocortical output. Hitting 35g+ protein halts overnight gluconeogenesis, prevents visceral fat deposition, and stabilizes GLP-1/PYY satiety hormones through midday.
                    </p>
                  </div>
                </div>

                {/* 3 PRACTICAL BREAKFAST FORMULATIONS */}
                <div className="mt-4 border-t border-amber-200/60 pt-3">
                  <span className="text-[11px] font-bold text-amber-950 uppercase">
                    3 Practical High-Leucine Breakfast Options:
                  </span>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3 text-xs">
                    <div className="rounded-lg border border-amber-200 bg-white p-2.5 shadow-2xs">
                      <div className="font-bold text-slate-900">Egg &amp; White Omelet</div>
                      <div className="text-[11px] text-slate-600">
                        3 whole eggs + 3/4 cup liquid egg whites + spinach + 1 slice sourdough
                      </div>
                      <div className="mt-1 font-mono text-[10px] font-bold text-emerald-700">
                        36g Protein • 3.2g Leucine
                      </div>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-white p-2.5 shadow-2xs">
                      <div className="font-bold text-slate-900">Greek Yogurt &amp; Whey</div>
                      <div className="text-[11px] text-slate-600">
                        1 cup 0% Greek yogurt + 1 scoop Whey isolate + blueberries + 1 tbsp chia
                      </div>
                      <div className="mt-1 font-mono text-[10px] font-bold text-emerald-700">
                        42g Protein • 3.7g Leucine
                      </div>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-white p-2.5 shadow-2xs">
                      <div className="font-bold text-slate-900">Plant-Based Scramble</div>
                      <div className="text-[11px] text-slate-600">
                        200g firm organic tofu + 1 scoop Pea/Rice isolate shake + nutritional yeast
                      </div>
                      <div className="mt-1 font-mono text-[10px] font-bold text-emerald-700">
                        37g Protein • 3.0g Leucine
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TRAINING DAY VS REST DAY CARDS */}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* Training Day */}
                <div className="rounded-xl border-2 border-purple-500 bg-purple-50/30 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-purple-700 px-2.5 py-1 text-xs font-bold text-white uppercase">
                      Lifting Days ({bio.trainingDaysPerWeek} days/wk)
                    </span>
                    <span className="font-mono text-xs font-bold text-purple-800">
                      GLUT4 &amp; Glycogen Refeed
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-extrabold text-slate-900">
                      {report.perimenopauseProtocol.trainingDayMacros.calories.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">kcal / day</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Protein</div>
                      <div className="font-mono text-lg font-extrabold text-teal-700">
                        {report.perimenopauseProtocol.trainingDayMacros.proteinGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.perimenopauseProtocol.trainingDayMacros.proteinPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Carbs</div>
                      <div className="font-mono text-lg font-extrabold text-amber-600">
                        {report.perimenopauseProtocol.trainingDayMacros.carbsGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.perimenopauseProtocol.trainingDayMacros.carbsPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Fats</div>
                      <div className="font-mono text-lg font-extrabold text-indigo-600">
                        {report.perimenopauseProtocol.trainingDayMacros.fatGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.perimenopauseProtocol.trainingDayMacros.fatPct}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest Day */}
                <div className="rounded-xl border-2 border-indigo-400 bg-indigo-50/30 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-indigo-700 px-2.5 py-1 text-xs font-bold text-white uppercase">
                      Rest &amp; Recovery ({7 - bio.trainingDaysPerWeek} days/wk)
                    </span>
                    <span className="font-mono text-xs font-bold text-indigo-800">
                      Steroidogenesis &amp; Hormone Shield
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-extrabold text-slate-900">
                      {report.perimenopauseProtocol.restDayMacros.calories.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">kcal / day</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Protein</div>
                      <div className="font-mono text-lg font-extrabold text-teal-700">
                        {report.perimenopauseProtocol.restDayMacros.proteinGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.perimenopauseProtocol.restDayMacros.proteinPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Carbs</div>
                      <div className="font-mono text-lg font-extrabold text-amber-600">
                        {report.perimenopauseProtocol.restDayMacros.carbsGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.perimenopauseProtocol.restDayMacros.carbsPct}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 shadow-2xs ring-1 ring-slate-200">
                      <div className="text-[11px] font-semibold text-slate-500">Fats (38%)</div>
                      <div className="font-mono text-lg font-extrabold text-indigo-600">
                        {report.perimenopauseProtocol.restDayMacros.fatGrams}g
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {report.perimenopauseProtocol.restDayMacros.fatPct}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CORTISOL-FRIENDLY EVENING CARB TIMING ADVICE */}
              <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  Evening Carbohydrate Allocation Protocol ({report.perimenopauseProtocol.cortisolWindowCarbsGrams}g Wind-Down Carbs)
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-indigo-900">
                  Allocate 40–50% of your rest-day carbohydrates ({report.perimenopauseProtocol.cortisolWindowCarbsGrams}g) to dinner. Strict zero-carb diets spike nighttime ACTH and cortisol, triggering 2:00 AM–4:00 AM insomnia and vasomotor hot flashes. Evening complex carbohydrates stimulate mild insulin secretion, facilitating blood-brain barrier transport of L-tryptophan for pineal melatonin synthesis.
                </p>
              </div>

              {/* CLINICAL CITATIONS */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <BookOpen className="h-3.5 w-3.5 text-purple-700" />
                  Peer-Reviewed Clinical Foundation:
                </div>
                <ul className="mt-1.5 space-y-1 list-disc pl-4">
                  <li>
                    <strong>Bauer J, et al. (PROT-AGE Study Group, 2013, PMID: 24092765):</strong> Evidence-based recommendations for optimal dietary protein intake in aging to overcome anabolic resistance.
                  </li>
                  <li>
                    <strong>Gould LM, et al. (Menopause 2022, PMID: 36085402):</strong> Physiological impact of menopausal transitions on skeletal muscle protein metabolism and appendicular mass loss.
                  </li>
                  <li>
                    <strong>Paddon-Jones D, Leidy H (Curr Opin Clin Nutr Metab Care 2014, PMID: 24800641):</strong> Per-meal protein pacing and leucine threshold saturation for whole-body nitrogen retention.
                  </li>
                </ul>
              </div>

              <NativeAffiliateCallout
                proteinGrams={report.perimenopauseProtocol.optimalDailyProteinGrams}
                sodiumMg={report.electrolyteResult.sodiumMg}
                mode="protein"
              />
            </div>
          )}

          {activeTab === 'fasting' && (
            <VisualFastingClock
              fastingProtocol={bio.fastingProtocol || '16:8'}
              onProtocolChange={(p) => updateBio({ fastingProtocol: p })}
              windowStartHour={
                bio.fastingEatingWindowStartHour ??
                bio.fastingWindowStartHour ??
                12
              }
              onWindowStartHourChange={(h) =>
                updateBio({
                  fastingEatingWindowStartHour: h,
                  fastingWindowStartHour: h,
                })
              }
              mealsInWindow={bio.mealsPerDay || 3}
              onMealsInWindowChange={(m) => updateBio({ mealsPerDay: m })}
              dailyCalories={report.fastingProtocol.dailyCalories}
              macros={report.fastingProtocol.macros}
              unitSystem={bio.unitSystem}
              currentWeightKg={bio.weightKg}
              bodyFatPct={bio.bodyFatPct}
              tdee={report.tdee}
              timelineStages={report.fastingProtocol.timelineStages}
              twelveWeekTrajectory={report.fastingProtocol.twelveWeekTrajectory}
              muscleRetentionRisk={report.fastingProtocol.muscleRetentionRisk}
            />
          )}

          {/* VIRAL GROWTH LOOP #1: DOWNLOADABLE METABOLIC BLUEPRINT PNG CARD & REDDIT TABLE */}
          <SocialBlueprintCard biometrics={bio} report={report} activeTab={activeTab} />
        </div>
      </div>

      {/* VIRAL GROWTH LOOP #2 & #5: 12-WEEK PROJECTION CURVE & ZERO-LOGIN WEIGHT TRACKER */}
      <ZeroLoginWeightTracker
        unitSystem={bio.unitSystem}
        currentWeightKg={bio.weightKg}
        projection={
          activeTab === 'fasting'
            ? report.fastingProtocol.twelveWeekTrajectory
            : report.twelveWeekProjection
        }
        activeTab={activeTab}
        onUpdateWeight={(newW) => updateBio({ weightKg: newW })}
      />

      {/* VIRAL GROWTH LOOP #6: MYFITNESSPAL & CRONOMETER MACRO EXPORT */}
      <MacroAppExporter
        trainingMacros={
          activeTab === 'perimenopause'
            ? report.perimenopauseProtocol.trainingDayMacros
            : report.trainingDayMacros
        }
        restMacros={
          activeTab === 'perimenopause'
            ? report.perimenopauseProtocol.restDayMacros
            : report.restDayMacros
        }
        weeklyAverage={
          activeTab === 'fasting'
            ? report.fastingProtocol.macros
            : report.weeklyAverageMacros
        }
        activeTab={activeTab}
        glp1ProteinTarget={report.glp1Protocol?.optimalProteinGrams}
        perMealProtein={
          activeTab === 'perimenopause'
            ? report.perimenopauseProtocol.perMealProteinFloorGrams
            : report.glp1Protocol?.proteinPerMealGrams || report.ffmiResult.perMealProteinTargetGrams
        }
        breakfastProtein={report.perimenopauseProtocol?.breakfastProteinAnchorGrams || 35}
        fiberGrams={
          report.perimenopauseProtocol?.estrogenSupportFiberGrams ||
          report.glp1Protocol?.solubleFiberGrams ||
          32
        }
      />

      {/* MONETIZATION DIRECTORY: LAB-TESTED AFFILIATE RECOMMENDATIONS */}
      <LabTestedAffiliateDirectory proteinGrams={report.trainingDayMacros.proteinGrams} />

      {/* STRATEGIC AD ZONE #2: STICKY FOOTER / MOBILE ANCHOR SLOT (PDF Page 5) */}
      <StickyFooterAdSlot showAdPreview={showAdPreview} />
    </div>
  );
}
