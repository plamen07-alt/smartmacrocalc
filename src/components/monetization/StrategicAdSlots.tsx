'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, ExternalLink, Sparkles, Award, TrendingUp, Info, X, DollarSign } from 'lucide-react';

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
      <div className="mb-1 text-[10px] tracking-widest text-slate-400 uppercase">Advertisement</div>
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
  showAdPreview: boolean;
  activeTab: string;
}

/**
 * ZONE #1 (PDF Page 5): Dynamic Result Slot
 * Placed directly between the biometric parameters and the calculated results section.
 * 100% of users' eyes pass through this exact viewport coordinate.
 */
export function DynamicResultAdSlot({ showAdPreview, activeTab }: DynamicResultAdSlotProps) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DYNAMIC_RESULT || '1111111111';

  if (IS_LIVE_ADSENSE) {
    return (
      <div className="my-5 rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs">
        <GoogleAdSenseUnit slotId={slotId} format="auto" className="min-h-[100px] w-full" />
      </div>
    );
  }

  if (!showAdPreview) return null;

  return (
    <div
      data-ad-zone="zone-1-dynamic-result-slot"
      className="my-5 min-h-[108px] rounded-xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-teal-50/40 p-4 shadow-xs transition-all"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
        <span className="flex items-center gap-1.5">
          <Info className="h-3 w-3 text-teal-600" />
          AdSense Zone #1 • Dynamic Result Slot (Between Inputs &amp; Results • 300% CTR Zone)
        </span>
        <span className="rounded bg-teal-100/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-teal-800">
          AdSense Responsive / 728×90 • Est. US CPC: $2.40–$5.80
        </span>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-teal-200/60 bg-white p-3.5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 uppercase">
                AdSense / Sponsored Clinical Slot
              </span>
              <span className="text-xs font-medium text-slate-500">
                {activeTab === 'glp1'
                  ? 'GLP-1 Lean Muscle & Peptide Support'
                  : activeTab === 'perimenopause'
                    ? 'Female Hormone & Thyroid Optimization Panel'
                    : 'At-Home Metabolic & Hormone Blood Panel'}
              </span>
            </div>
            <p className="mt-0.5 text-sm font-bold text-slate-900">
              {activeTab === 'glp1'
                ? 'Lose Fat, Not Muscle: Clinical EAA + Whey Isolate Formulated for GLP-1 Patients'
                : activeTab === 'perimenopause'
                  ? 'Check Estradiol, Free T3, Fasting Insulin & Cortisol from Home (CLIA Certified)'
                  : 'Test Your Free Testosterone, Fasting Insulin, Thyroid (TSH/Free T3) & ApoB at Home'}
            </p>
            <p className="text-xs text-slate-600">
              {activeTab === 'glp1'
                ? '3.2g L-Leucine per scoop • Zero bloating • Third-party NSF Certified for Sport.'
                : 'CLIA-certified US labs • Results in 48 hours • HSA/FSA Eligible across all 50 states.'}
            </p>
          </div>
        </div>
        <a
          href="#affiliate-lab-ranking"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
        >
          View Lab Protocol
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/**
 * ZONE #2 (PDF Page 5): Sticky Footer / Mobile Anchor Ad Slot
 * Stays anchored at the bottom of the screen while the user explores the 12-week charts and tables.
 */
export function StickyFooterAdSlot({ showAdPreview }: { showAdPreview: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_STICKY_FOOTER || '2222222222';

  if (dismissed) return null;

  if (IS_LIVE_ADSENSE) {
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

  if (!showAdPreview) return null;

  return (
    <div
      data-ad-zone="zone-2-sticky-footer-slot"
      className="fixed right-0 bottom-0 left-0 z-30 border-t border-teal-500/30 bg-slate-900/95 px-4 py-2.5 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="hidden rounded bg-teal-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-teal-300 uppercase ring-1 ring-teal-400/30 sm:inline-block">
            AdSense Zone #2 • Sticky Anchor Ad (320×50 / 728×90)
          </span>
          <p className="text-xs font-medium text-slate-200">
            <strong className="text-white"> High-Viewability Sticky Slot:</strong> Remains visible while users inspect the 12-week recomposition curve &amp; PubMed tables ($22–$35 RPM Mediavine/AdSense Anchor).
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#affiliate-lab-ranking"
            className="rounded-lg bg-teal-500 px-3 py-1 text-xs font-bold text-slate-950 transition hover:bg-teal-400"
          >
            See Lab Picks
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Dismiss Sticky Ad Preview"
            aria-label="Dismiss Sticky Ad Preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ZONE #3 (PDF Page 5): Native Contextual Affiliate Callout inside Results
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
      <div
        data-ad-zone="zone-3-native-affiliate-callout"
        className="mt-3 flex flex-col justify-between gap-2 rounded-lg border border-sky-200 bg-sky-50/70 px-3.5 py-2.5 text-xs sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles className="h-4 w-4 shrink-0 text-sky-600" />
          <span>
            Need <strong className="font-bold text-slate-900">{sodiumMg.toLocaleString()} mg sodium</strong> without sugary sports drinks?{' '}
            <span className="text-slate-600">
              See our 2026 lab comparison of zero-sugar 1,000mg sodium electrolyte packets.
            </span>
          </span>
        </div>
        <a
          href="#affiliate-lab-ranking"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-sky-700 underline decoration-sky-400 underline-offset-2 hover:text-sky-900"
        >
          Compare Electrolytes (Lab-Tested) →
        </a>
      </div>
    );
  }

  return (
    <div
      data-ad-zone="zone-3-native-affiliate-callout"
      className="mt-3 flex flex-col justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-xs sm:flex-row sm:items-center"
    >
      <div className="flex items-center gap-2 text-slate-700">
        <Award className="h-4 w-4 shrink-0 text-emerald-600" />
        <span>
          Hard to hit <strong className="font-bold text-slate-900">{proteinGrams}g protein</strong> daily with whole food alone?{' '}
          <span className="text-slate-600">
            See the 2026 heavy-metal-tested US Whey Isolate &amp; Plant Leucine rankings.
          </span>
        </span>
      </div>
      <a
        href="#affiliate-lab-ranking"
        className="inline-flex shrink-0 items-center gap-1 font-semibold text-emerald-800 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-950"
      >
        View Cleanest Isolates (Lab-Tested) →
      </a>
    </div>
  );
}

/**
 * ZONE #4: In-Article / Mid-Content AdSense Slot for Research Guides & pSEO Pages
 */
export function InArticleAdSenseSlot({ label = 'In-Article Research Ad Slot' }: { label?: string }) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '3333333333';

  if (IS_LIVE_ADSENSE) {
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

  return (
    <div
      data-ad-zone="zone-4-in-article-adsense-slot"
      className="my-8 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-teal-600" />
          AdSense Zone #4 • {label} (`data-ad-layout=&quot;in-article&quot;`)
        </span>
        <span className="rounded bg-slate-200/80 px-2 py-0.5 font-mono text-[10px] text-slate-700">
          Auto-activates when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set
        </span>
      </div>
    </div>
  );
}

export function LabTestedAffiliateDirectory({ proteinGrams }: { proteinGrams: number }) {
  const products = [
    {
      rank: '#1 Clinical Pick',
      category: 'Cold-Filtered Whey Protein Isolate',
      name: 'IsoPureClinical 100% Grass-Fed Micro-Filtered Isolate',
      metrics: '28g Protein • 3.3g Leucine • 0g Lactose • 110 kcal',
      commissionNote: '22% Affiliate CPA • High Conversion on >150g Protein Targets',
      highlight: `Covers ${Math.round(((28 * 2) / Math.max(100, proteinGrams)) * 100)}% of your ${proteinGrams}g target in 2 low-volume scoops.`,
      badgeColor: 'bg-teal-600 text-white',
    },
    {
      rank: '#1 GLP-1 & Gut Support',
      category: 'Peptide-Friendly Essential Amino + Soluble Fiber Protocol',
      name: 'MetaboGuard Leucine-Enriched EAA + Sunfiber Complex',
      metrics: '3.5g L-Leucine • 8g Prebiotic Soluble Fiber • Zero Gastric Heaviness',
      commissionNote: '30% Recurring Affiliate CPA • $32 RPM Tier-1 Segment',
      highlight: 'Specifically engineered for delayed gastric emptying on Semaglutide & Tirzepatide.',
      badgeColor: 'bg-indigo-600 text-white',
    },
    {
      rank: '#1 Electrolyte & Creatine',
      category: 'Creapure® Monohydrate + 1,000mg Sodium Hydration Salt',
      name: 'ElementalLab Creapure 5g + Keto Electrolyte Matrix',
      metrics: '5g German Creapure® • 1,000mg Sodium • 200mg Potassium • 60mg Magnesium',
      commissionNote: '20% Affiliate CPA • High Repeat Purchase Rate',
      highlight: 'Prevents intracellular dehydration, sauna cramping, and low-carb fatigue.',
      badgeColor: 'bg-slate-800 text-white',
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
            2026 Independent Third-Party Lab Rankings (US / UK Verified)
          </span>
          <h3 className="mt-1.5 text-lg font-bold text-slate-900">
            Clinical Supplementation to Hit Your Calculated Targets
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Native Affiliate Integration • ISO-17025 Heavy Metal Screened
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
              <div className="mb-2 text-[10px] font-medium text-teal-700">{item.commissionNote}</div>
              <button
                type="button"
                onClick={() =>
                  alert(
                    `Affiliate Link Slot: In production, this links to your Amazon Associates / PartnerStack / Thorne / Momentous affiliate URL with UTM tracking.`
                  )
                }
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
              >
                Check Price &amp; Lab Certificate
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
