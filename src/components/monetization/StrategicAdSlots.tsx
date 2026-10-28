'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Award, TrendingUp, X, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
const IS_LIVE_ADSENSE =
  Boolean(ADSENSE_CLIENT_ID) &&
  ADSENSE_CLIENT_ID.startsWith('ca-pub-') &&
  !ADSENSE_CLIENT_ID.includes('0000000000');

interface GoogleAdUnitProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  layout?: string;
  className?: string;
}

export function GoogleAdSenseUnit({
  slotId,
  format = 'auto',
  layout,
  className = 'min-h-[90px] w-full',
}: GoogleAdUnitProps) {
  useEffect(() => {
    if (!IS_LIVE_ADSENSE) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore duplicate push in strict mode
    }
  }, []);

  if (!IS_LIVE_ADSENSE) return null;

  return (
    <div className={`overflow-hidden text-center ${className}`}>
      <div className="mb-1 text-[10px] font-medium tracking-widest text-slate-500 uppercase">Advertisement</div>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        data-full-width-responsive="true"
      />
    </div>
  );
}

interface DynamicResultAdSlotProps {
  showAdPreview?: boolean;
  activeTab: string;
}

/**
 * ZONE #1: Dynamic Result Slot
 * Renders live Google AdSense unit when NEXT_PUBLIC_ADSENSE_CLIENT_ID is configured.
 * Remains completely clean (no placeholder/debug boxes) during Google AdSense site review.
 */
export function DynamicResultAdSlot({ activeTab: _activeTab }: DynamicResultAdSlotProps) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DYNAMIC_RESULT || '1111111111';

  if (!IS_LIVE_ADSENSE) {
    return null;
  }

  return (
    <div className="my-5 rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
      <GoogleAdSenseUnit slotId={slotId} format="auto" className="min-h-[100px] w-full" />
    </div>
  );
}

/**
 * ZONE #2: Sticky Footer / Mobile Anchor Ad Slot
 * Renders only when live Google AdSense is active.
 */
export function StickyFooterAdSlot({ showAdPreview: _showAdPreview }: { showAdPreview?: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY_FOOTER || '2222222222';

  if (dismissed || !IS_LIVE_ADSENSE) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
        <GoogleAdSenseUnit slotId={slotId} format="horizontal" className="min-h-[60px] flex-1" />
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close advertisement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * ZONE #3: Contextual Clinical Nutrition Reference Callout inside Results
 */
interface NativeAffiliateCalloutProps {
  proteinGrams: number;
  sodiumMg?: number;
  mode: 'protein' | 'electrolyte' | 'glp1';
}

export function NativeAffiliateCallout({
  proteinGrams,
  sodiumMg = 3200,
  mode,
}: NativeAffiliateCalloutProps) {
  if (mode === 'electrolyte') {
    return (
      <div className="mt-3 flex flex-col justify-between gap-2 rounded-lg border border-sky-200 bg-sky-50/70 px-3.5 py-2.5 text-xs sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles className="h-4 w-4 shrink-0 text-sky-600" />
          <span>
            Targeting <strong className="font-bold text-slate-900">{sodiumMg.toLocaleString()} mg sodium</strong> without added sugars?{' '}
            <span className="text-slate-600">
              Review our clinical formulation standards for hypotonic electrolyte replacement.
            </span>
          </span>
        </div>
        <a
          href="#affiliate-lab-ranking"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-sky-700 underline decoration-sky-400 underline-offset-2 hover:text-sky-900"
        >
          View Formulation Standards →
        </a>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-xs sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-slate-700">
        <Award className="h-4 w-4 shrink-0 text-emerald-600" />
        <span>
          Planning meals to reach <strong className="font-bold text-slate-900">{proteinGrams}g protein</strong> daily?{' '}
          <span className="text-slate-600">
            See our clinical amino acid density &amp; third-party purity benchmarks below.
          </span>
        </span>
      </div>
      <a
        href="#affiliate-lab-ranking"
        className="inline-flex shrink-0 items-center gap-1 font-semibold text-emerald-800 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-950"
      >
        View Clinical Protein Standards →
      </a>
    </div>
  );
}

/**
 * ZONE #4: In-Article AdSense Slot for Research Guides & Preset Pages
 * Renders only when live Google AdSense is active.
 */
export function InArticleAdSenseSlot({ label: _label }: { label?: string }) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '3333333333';

  if (!IS_LIVE_ADSENSE) {
    return null;
  }

  return (
    <div className="my-8 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
      <GoogleAdSenseUnit
        slotId={slotId}
        format="fluid"
        layout="in-article"
        className="min-h-[120px] w-full"
      />
    </div>
  );
}

export function LabTestedAffiliateDirectory({ proteinGrams }: { proteinGrams: number }) {
  const products = [
    {
      rank: 'Protocol #1',
      category: 'Cold-Filtered Whey Protein Isolate',
      name: 'Micro-Filtered Grass-Fed Whey Isolate Standard',
      metrics: '28g Protein • 3.3g L-Leucine • <0.2g Lactose • 110 kcal',
      verificationNote: 'Benchmark: NSF Certified for Sport® or Informed Choice',
      highlight: `Delivers ${Math.round(((28 * 2) / Math.max(100, proteinGrams)) * 100)}% of your ${proteinGrams}g daily protein target in two low-volume servings while crossing the 3.0g leucine mTORC1 trigger.`,
      badgeColor: 'bg-teal-600 text-white',
      guideLink: '/guides/protein-distribution-per-meal-anabolic-ceiling-mTORC1',
      guideLabel: 'Read Leucine & MPS Clinical Guide',
    },
    {
      rank: 'Protocol #2',
      category: 'GLP-1 & Delayed Gastric Emptying Support',
      name: 'Free-Form Essential Amino Acids (EAA) + Soluble Prebiotic Fiber',
      metrics: '3.5g L-Leucine • 8g Partially Hydrolyzed Guar Gum • Zero Gastric Heaviness',
      verificationNote: 'Benchmark: Free-form EAA with third-party purity testing',
      highlight: 'Engineered for patients experiencing early satiety on Semaglutide or Tirzepatide who need maximal myofibrillar preservation without meal volume.',
      badgeColor: 'bg-indigo-600 text-white',
      guideLink: '/guides/glp1-semaglutide-tirzepatide-lean-muscle-preservation',
      guideLabel: 'Read GLP-1 Muscle Preservation Study',
    },
    {
      rank: 'Protocol #3',
      category: 'Cellular Hydration & Phosphocreatine Saturation',
      name: 'Micronized Creatine Monohydrate (5g) + Quantitative Electrolytes',
      metrics: '5g Pure Monohydrate • 1,000mg Sodium • 200mg Potassium • 60mg Magnesium',
      verificationNote: 'Benchmark: Creapure® or HPLC 99.9% analytical purity',
      highlight: 'Supports intracellular water retention, ATP resynthesis during resistance training, and electrolyte balance during fasting or sauna protocols.',
      badgeColor: 'bg-slate-800 text-white',
      guideLink: '/guides/creatine-monohydrate-intracellular-hydration-atp',
      guideLabel: 'Read Creatine & Hydration Evidence',
    },
  ];

  return (
    <section
      id="affiliate-lab-ranking"
      className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
    >
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
            <TrendingUp className="h-3.5 w-3.5" />
            Evidence-Based Formulation &amp; Purity Benchmarks
          </span>
          <h3 className="mt-1.5 text-lg font-bold text-slate-900">
            Clinical Nutrient Standards to Hit Your Calculated Targets
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          ISO-17025 Heavy-Metal &amp; Label-Claim Reference Standards
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {products.map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 transition hover:border-teal-300 hover:bg-white hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${item.badgeColor}`}>
                  {item.rank}
                </span>
                <span className="text-[11px] font-medium text-slate-500">{item.category}</span>
              </div>
              <h4 className="mt-2.5 text-sm font-bold text-slate-900">{item.name}</h4>
              <p className="mt-1 rounded bg-slate-100 px-2 py-1 font-mono text-[11px] font-semibold text-slate-700">
                {item.metrics}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.highlight}</p>
            </div>

            <div className="mt-4 border-t border-slate-200/70 pt-3">
              <div className="mb-2 flex items-center gap-1 text-[10px] font-medium text-teal-700">
                <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-600" />
                <span>{item.verificationNote}</span>
              </div>
              <Link
                href={item.guideLink}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
              >
                {item.guideLabel} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
