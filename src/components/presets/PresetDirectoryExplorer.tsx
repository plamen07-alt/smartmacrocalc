'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowRight,
  Flame,
  Activity,
  HeartPulse,
  Clock,
  Scissors,
  TrendingUp,
  Leaf,
  Droplets,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { SeoPreset, PresetCategory } from '@/lib/presets';

interface PresetDirectoryExplorerProps {
  presets: SeoPreset[];
}

const CATEGORIES: Array<{
  id: PresetCategory | 'all';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}> = [
  { id: 'all', label: 'All Profiles', icon: Layers, count: 64 },
  { id: 'recomp', label: 'Body Recomposition (+5%/-20%)', icon: Flame, count: 8 },
  { id: 'glp1', label: 'GLP-1 & Ozempic Muscle Guard', icon: Activity, count: 8 },
  { id: 'perimenopause', label: 'Perimenopause & Hormones', icon: HeartPulse, count: 8 },
  { id: 'fasting', label: 'Intermittent Fasting (16:8/OMAD)', icon: Clock, count: 8 },
  { id: 'cutting', label: 'Cutting & Refeed Cycling', icon: Scissors, count: 8 },
  { id: 'reverse', label: 'Reverse Dieting (+80 kcal/wk)', icon: TrendingUp, count: 8 },
  { id: 'vegan', label: 'Plant-Based Leucine Trigger', icon: Leaf, count: 8 },
  { id: 'electrolytes', label: 'Creatine & Sauna Electrolytes', icon: Droplets, count: 8 },
];

export function PresetDirectoryExplorer({ presets }: PresetDirectoryExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory | 'all'>('all');
  const [selectedSex, setSelectedSex] = useState<'all' | 'female' | 'male'>('all');
  const [selectedWeightRange, setSelectedWeightRange] = useState<'all' | '120-150' | '151-180' | '181-210' | '211-240'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPresets = useMemo(() => {
    return presets.filter((preset) => {
      // 1. Category
      if (selectedCategory !== 'all' && preset.category !== selectedCategory) {
        return false;
      }

      // 2. Sex
      const sex = preset.biometrics.sex;
      if (selectedSex !== 'all' && sex !== selectedSex) {
        return false;
      }

      // 3. Weight Range
      const weightLbs = preset.biometrics.weightKg ? Math.round(preset.biometrics.weightKg * 2.20462) : 0;
      if (selectedWeightRange === '120-150' && (weightLbs < 120 || weightLbs > 150)) return false;
      if (selectedWeightRange === '151-180' && (weightLbs < 151 || weightLbs > 180)) return false;
      if (selectedWeightRange === '181-210' && (weightLbs < 181 || weightLbs > 210)) return false;
      if (selectedWeightRange === '211-240' && (weightLbs < 211 || weightLbs > 245)) return false;

      // 4. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = preset.title.toLowerCase().includes(query);
        const matchH1 = preset.h1.toLowerCase().includes(query);
        const matchBadge = preset.badge.toLowerCase().includes(query);
        const matchSlug = preset.slug.toLowerCase().includes(query);
        const matchAnswer = preset.directClinicalAnswer.toLowerCase().includes(query);
        if (!matchTitle && !matchH1 && !matchBadge && !matchSlug && !matchAnswer) {
          return false;
        }
      }

      return true;
    });
  }, [presets, selectedCategory, selectedSex, selectedWeightRange, searchQuery]);

  return (
    <div>
      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-teal-200' : 'text-teal-600'}`} />
              <span>{cat.label}</span>
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                  isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Bar: Search, Sex, Weight */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by weight (e.g. 180 lb), sex, hormone, fasting, formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Biometric Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sex Filter */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <span className="px-2 text-[11px] font-bold text-slate-500">Sex:</span>
              {(['all', 'female', 'male'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSex(s)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold capitalize transition-all ${
                    selectedSex === s
                      ? 'bg-white text-teal-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>

            {/* Weight Range Filter */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <span className="px-2 text-[11px] font-bold text-slate-500">Weight:</span>
              {(['all', '120-150', '151-180', '181-210', '211-240'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedWeightRange(r)}
                  className={`rounded-lg px-2 py-1 text-[11px] font-bold transition-all ${
                    selectedWeightRange === r
                      ? 'bg-white text-teal-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r === 'all' ? 'All' : `${r} lb`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>
            Showing <strong className="font-bold text-slate-900">{filteredPresets.length}</strong> of{' '}
            {presets.length} pre-calculated clinical profiles
          </span>
          {(selectedCategory !== 'all' || selectedSex !== 'all' || selectedWeightRange !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSex('all');
                setSelectedWeightRange('all');
                setSearchQuery('');
              }}
              className="font-semibold text-teal-700 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPresets.map((preset) => {
          const weightLbs = preset.biometrics.weightKg
            ? Math.round(preset.biometrics.weightKg * 2.20462)
            : 0;

          return (
            <div
              key={preset.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
            >
              <div>
                {/* Category Badge & Weight Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold text-teal-800">
                    {preset.badge}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                    {weightLbs} lb
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900 hover:text-teal-700">
                  <Link href={`/presets/${preset.slug}`}>{preset.h1}</Link>
                </h3>

                {/* Biometric Snapshot */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                  <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 font-medium capitalize">
                    {preset.biometrics.sex}
                  </span>
                  <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 font-medium">
                    Age {preset.biometrics.age}
                  </span>
                  <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 font-medium">
                    {preset.biometrics.bodyFatPct}% Body Fat
                  </span>
                  <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 font-medium uppercase">
                    {preset.biometrics.formula} Equation
                  </span>
                </div>

                {/* Direct Clinical Answer Excerpt */}
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600">
                  {preset.directClinicalAnswer}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <Link
                  href={`/presets/${preset.slug}`}
                  className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-bold text-teal-800 transition-colors hover:bg-teal-700 hover:text-white"
                >
                  <span>Load Interactive Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPresets.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">No preset profiles match your selected filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSex('all');
              setSelectedWeightRange('all');
              setSearchQuery('');
            }}
            className="mt-3 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
