'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Plus,
  Trash2,
  Calendar,
  TrendingDown,
  CheckCircle2,
  Database,
  Scale,
} from 'lucide-react';
import {
  WeeklyProjectionPoint,
  UnitSystem,
  CalculatorTab,
  kgToLbs,
  lbsToKg,
} from '@/lib/formulas';

interface WeightLogEntry {
  id: string;
  date: string;
  weightKg: number;
  note?: string;
}

interface ZeroLoginWeightTrackerProps {
  unitSystem: UnitSystem;
  currentWeightKg: number;
  projection: WeeklyProjectionPoint[];
  activeTab?: CalculatorTab;
  onUpdateWeight?: (newWeightKg: number) => void;
}

const STORAGE_KEY = 'metabolic_metrics_weight_log_v1';

export function ZeroLoginWeightTracker({
  unitSystem,
  currentWeightKg,
  projection,
  activeTab = 'recomp',
  onUpdateWeight,
}: ZeroLoginWeightTrackerProps) {
  const [logs, setLogs] = useState<WeightLogEntry[]>([]);
  const [inputWeight, setInputWeight] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setInputDate(today);
    const defaultVal =
      unitSystem === 'imperial'
        ? String(kgToLbs(currentWeightKg))
        : String(Math.round(currentWeightKg * 10) / 10);
    setInputWeight(defaultVal);
  }, [unitSystem, currentWeightKg]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setLogs(parsed);
        }
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  const saveLogs = (nextLogs: WeightLogEntry[]) => {
    setLogs(nextLogs);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLogs));
      } catch {
        // ignore
      }
    }
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = parseFloat(inputWeight);
    if (isNaN(numeric) || numeric <= 20) return;

    const weightKg = unitSystem === 'imperial' ? lbsToKg(numeric) : numeric;
    const newEntry: WeightLogEntry = {
      id: `${Date.now()}`,
      date: inputDate || new Date().toISOString().split('T')[0],
      weightKg: Math.round(weightKg * 100) / 100,
    };

    const updated = [newEntry, ...logs].slice(0, 30);
    saveLogs(updated);
  };

  const handleDeleteLog = (id: string) => {
    saveLogs(logs.filter((l) => l.id !== id));
  };

  const formatWeight = (kg: number) =>
    unitSystem === 'imperial' ? `${kgToLbs(kg)} lbs` : `${Math.round(kg * 10) / 10} kg`;

  // Compute SVG chart coordinates for the 12-week trajectory
  const svgWidth = 720;
  const svgHeight = 230;
  const padLeft = 48;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 34;

  const values = projection.map((p) =>
    unitSystem === 'imperial' ? kgToLbs(p.projectedWeightKg) : p.projectedWeightKg
  );
  const lbmValues = projection.map((p) =>
    unitSystem === 'imperial' ? kgToLbs(p.projectedLbmKg) : p.projectedLbmKg
  );

  const minVal = Math.min(...values, ...lbmValues) * 0.97;
  const maxVal = Math.max(...values, ...lbmValues) * 1.02;
  const range = Math.max(1, maxVal - minVal);

  const getX = (index: number) =>
    padLeft + (index / Math.max(1, projection.length - 1)) * (svgWidth - padLeft - padRight);
  const getY = (val: number) =>
    padTop + ((maxVal - val) / range) * (svgHeight - padTop - padBottom);

  const weightPoints = values.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
  const lbmPoints = lbmValues.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');

  const startPoint = projection[0];
  const endPoint = projection[projection.length - 1];

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'glp1':
        return {
          badge: 'GLP-1 Lean Muscle Protection Trajectory & Check-In',
          title: '12-Week GLP-1 Muscle Preservation Curve & Browser Weigh-In',
          desc: 'Monitors muscle mass retention vs. adipose oxidation during Semaglutide/Tirzepatide therapy.',
        };
      case 'perimenopause':
        return {
          badge: 'Perimenopause Body Composition Curve & Check-In',
          title: '12-Week Hormone-Balanced Recomposition & Private Weigh-In',
          desc: 'Monitors hormonal fat loss and visceral adiposity reduction across the 38–55 age transition.',
        };
      case 'fasting':
        return {
          badge: 'Intermittent Fasting Timeline & Curve',
          title: '12-Week Fasting Timeline & Weight Loss Check-In',
          desc: 'Visualizes fat mass reduction while monitoring lean tissue retention across 16:8 or OMAD schedules.',
        };
      case 'reverse':
        return {
          badge: 'Reverse Dieting Metabolic Recovery Curve',
          title: '12-Week Reverse Diet Weight Stabilization & Check-In',
          desc: 'Monitors scale weight stability while stepping up caloric intake +80 kcal/week to restore TDEE.',
        };
      default:
        return {
          badge: 'Zero-Login LocalStorage Tracker & 12-Week Trajectory',
          title: '12-Week Recomposition Curve & Browser Weight Check-In',
          desc: 'Simultaneous fat reduction and lean muscle hypertrophy curve.',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
            <Database className="h-3.5 w-3.5" />
            {headerInfo.badge}
          </span>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {headerInfo.title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">{headerInfo.desc}</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-teal-700">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal-600" />
            Scale Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-indigo-600">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
            Lean Muscle Mass (LBM)
          </span>
        </div>
      </div>

      {/* 12-Week Interactive SVG Curve */}
      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="h-56 w-full min-w-[540px] rounded-xl bg-slate-50/70 p-2"
        >
          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = padTop + t * (svgHeight - padTop - padBottom);
            const labelVal = Math.round((maxVal - t * range) * 10) / 10;
            return (
              <g key={t}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />
                <text x={8} y={y + 4} className="fill-slate-400 text-[10px] font-medium">
                  {labelVal}
                </text>
              </g>
            );
          })}

          {/* Total Weight Line */}
          <polyline
            fill="none"
            stroke="#0d9488"
            strokeWidth="3"
            points={weightPoints}
          />

          {/* Lean Body Mass Line */}
          <polyline
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            points={lbmPoints}
          />

          {/* Data Nodes */}
          {values.map((v, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(v)}
                r={4}
                className="fill-teal-600 stroke-white stroke-2"
              />
              <text
                x={getX(i)}
                y={svgHeight - 10}
                textAnchor="middle"
                className="fill-slate-500 text-[10px] font-semibold"
              >
                W{i}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 12-Week Summary Pill Row */}
      {startPoint && endPoint && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Week 0 → Week 12 Scale Weight
            </div>
            <div className="mt-1 text-base font-bold text-slate-900">
              {formatWeight(startPoint.projectedWeightKg)} → {formatWeight(endPoint.projectedWeightKg)}
            </div>
            <div className="text-xs text-teal-700">
              Net Change:{' '}
              {formatWeight(
                Math.abs(endPoint.projectedWeightKg - startPoint.projectedWeightKg)
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Week 0 → Week 12 Body Fat %
            </div>
            <div className="mt-1 text-base font-bold text-slate-900">
              {startPoint.projectedBodyFatPct}% → {endPoint.projectedBodyFatPct}%
            </div>
            <div className="text-xs text-emerald-700">
              Pure Adipose Reduction:{' '}
              {formatWeight(Math.max(0, startPoint.projectedFatKg - endPoint.projectedFatKg))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Lean Muscle Mass (LBM) Gain
            </div>
            <div className="mt-1 text-base font-bold text-indigo-900">
              {formatWeight(startPoint.projectedLbmKg)} → {formatWeight(endPoint.projectedLbmKg)}
            </div>
            <div className="text-xs text-indigo-700">
              +{formatWeight(Math.max(0, endPoint.projectedLbmKg - startPoint.projectedLbmKg))} Contractile Tissue
            </div>
          </div>
        </div>
      )}

      {/* Zero-Login LocalStorage Check-in Form */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Daily Morning Weight Log (100% Private in Your Browser)
            </h4>
            <p className="text-xs text-slate-500">
              No account or email required. Saved automatically to your device via LocalStorage so you can check in daily.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {logs.length} Check-ins Saved Locally
          </span>
        </div>

        <form onSubmit={handleAddLog} className="mt-3 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600">Date</label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600">
              Morning Scale Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
            </label>
            <input
              type="number"
              step="0.1"
              value={inputWeight}
              onChange={(e) => setInputWeight(e.target.value)}
              className="mt-1 w-32 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Save Daily Weigh-In
          </button>
        </form>

        {logs.length > 0 && (
          <div className="mt-4 max-h-44 overflow-y-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Logged Weight</th>
                  <th className="px-3 py-2">vs. Starting Baseline</th>
                  <th className="px-3 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((entry) => {
                  const diffKg = entry.weightKg - currentWeightKg;
                  const sign = diffKg > 0 ? '+' : '';
                  const diffFormatted =
                    unitSystem === 'imperial'
                      ? `${sign}${kgToLbs(diffKg)} lbs`
                      : `${sign}${Math.round(diffKg * 10) / 10} kg`;
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/80">
                      <td className="px-3 py-2 font-medium text-slate-700">{entry.date}</td>
                      <td className="px-3 py-2 font-bold text-slate-900">
                        {formatWeight(entry.weightKg)}
                      </td>
                      <td
                        className={`px-3 py-2 font-semibold ${
                          diffKg <= 0 ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {diffFormatted}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <div className="inline-flex items-center gap-2">
                          {onUpdateWeight && (
                            <button
                              type="button"
                              onClick={() => onUpdateWeight(entry.weightKg)}
                              className="inline-flex items-center gap-1 rounded bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700 hover:bg-teal-100"
                              title="Set as current weight in calculator"
                            >
                              <Scale className="h-3 w-3" />
                              <span>Apply</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteLog(entry.id)}
                            className="text-slate-400 hover:text-rose-600"
                            title="Delete entry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
