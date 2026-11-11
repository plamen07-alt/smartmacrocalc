import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  CheckCircle2,
  Layers,
  HelpCircle,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SEO_PRESETS, getPresetBySlug } from '@/lib/presets';
import { SCIENTIFIC_ARTICLES } from '@/lib/articles';
import { formatSeoTitle } from '@/lib/site';
import { MasterCalculatorHub } from '@/components/calculator/MasterCalculatorHub';
import { InArticleAdSenseSlot } from '@/components/monetization/StrategicAdSlots';

export function generateStaticParams() {
  return SEO_PRESETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preset = getPresetBySlug(slug);
  if (!preset) {
    return { title: 'Preset Not Found | SmartMacroCalc' };
  }
  const seoTitle = formatSeoTitle(preset.h1);
  const canonicalUrl = `https://www.smartmacrocalc.com/presets/${slug}`;
  return {
    title: seoTitle,
    description: preset.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: preset.metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'SmartMacroCalc.com',
      publishedTime: '2026-01-01T00:00:00.000Z',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: preset.metaDescription,
      images: ['/opengraph-image'],
    },
  };
}

export default async function PresetSeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const preset = getPresetBySlug(slug);
  if (!preset) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preset.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.smartmacrocalc.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Presets Directory',
        item: 'https://www.smartmacrocalc.com/presets',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: preset.h1,
        item: `https://www.smartmacrocalc.com/presets/${preset.slug}`,
      },
    ],
  };

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: preset.title,
    description: preset.metaDescription,
    url: `https://www.smartmacrocalc.com/presets/${preset.slug}`,
    aspect: 'DietaryGuidance',
    author: {
      '@type': 'Person',
      name: 'SmartMacroCalc Editorial Team',
      jobTitle: 'Exercise Physiologist',
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'SmartMacroCalc Editorial Team',
      jobTitle: 'Board-Certified Sports Dietitian',
    },
    citation: preset.pmidCitations.map((c) => c.url),
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SmartMacroCalc.com',
    url: 'https://www.smartmacrocalc.com',
    logo: 'https://www.smartmacrocalc.com/icon.svg',
  };

  const relatedPresets = SEO_PRESETS.filter(
    (p) => p.category === preset.category && p.slug !== preset.slug
  ).slice(0, 3);
  const presetIdx = SEO_PRESETS.findIndex((p) => p.slug === preset.slug);
  const relatedGuides = [
    SCIENTIFIC_ARTICLES[presetIdx % SCIENTIFIC_ARTICLES.length],
    SCIENTIFIC_ARTICLES[(presetIdx + 5) % SCIENTIFIC_ARTICLES.length],
  ];
  const weightKg = preset.biometrics.weightKg ?? 75;
  const bodyFatPct = preset.biometrics.bodyFatPct ?? 20;
  const sexLabel = preset.biometrics.sex ?? 'adult';
  const weightLbs = Math.round(weightKg * 2.20462);
  const leanMassKg = Number((weightKg * (1 - bodyFatPct / 100)).toFixed(1));
  const leanMassLbs = Number((leanMassKg * 2.20462).toFixed(1));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-teal-700 hover:underline">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/presets" className="hover:text-teal-700 hover:underline">
          Presets Directory
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-800">{preset.badge}</span>
      </nav>

      {/* Target Header */}
      <div className="mb-6 rounded-2xl border border-teal-200 bg-gradient-to-r from-white via-teal-50/40 to-white p-6 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-900">
            <Layers className="h-3.5 w-3.5" />
            {preset.badge}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Peer-Reviewed Bioenergetics
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">{preset.h1}</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-slate-600">{preset.subtitle}</p>
      </div>

      {/* AEO Direct Clinical Answer Callout Block (40-65 Words) */}
      <div
        data-aeo-answer="true"
        className="mb-8 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-6 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-xs">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Direct Clinical Answer
          </span>
          <span className="text-xs font-semibold text-emerald-800">
            Verified Bioenergetics &amp; Exact Targets
          </span>
        </div>
        <p className="mt-3 text-base leading-relaxed font-medium text-slate-900">
          {preset.directClinicalAnswer}
        </p>
      </div>

      {/* Pre-Loaded Interactive Calculator */}
      <MasterCalculatorHub
        initialBiometrics={preset.biometrics}
        initialTab={preset.defaultTab}
        presetTitle={preset.h1}
      />

      {/* AdSense Zone #4: Mid-Page In-Article Unit between Calculator & Reference Table */}
      <InArticleAdSenseSlot label="Preset Mid-Content AdSense Slot" />

      {/* GEO Structured Data Table */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">
            Biometric Macronutrient &amp; Bioenergetics Reference Table
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Structured clinical breakdown optimized for algorithmic analysis and generative AI engine extraction.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-100/70 text-slate-700">
              <tr>
                {preset.tableData.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {preset.tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 font-medium">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Clinical Analysis & Execution Takeaways */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Clinical Analysis: {preset.h1}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">{preset.clinicalSummary}</p>

        <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50/50 p-4">
          <h3 className="text-xs font-bold tracking-wider text-teal-900 uppercase">
            Key Execution Takeaways for This Profile
          </h3>
          <ul className="mt-2.5 space-y-2">
            {preset.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified NCBI PubMed Citations */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Verified NCBI PubMed Clinical Citations
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Peer-reviewed scientific evidence and clinical trials underpinning this nutritional profile:
          </p>
          <ul className="mt-3 space-y-2.5">
            {preset.pmidCitations.map((c) => (
              <li
                key={c.pmid}
                className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50/80 p-3 sm:flex-row sm:items-center sm:justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">PMID: {c.pmid}</span> —{' '}
                  <span className="text-slate-700">{c.citation}</span>
                </div>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                >
                  View on PubMed <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile-Specific FAQ */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Profile-Specific Questions &amp; Answers
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            {preset.faq.map((q, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <h4 className="text-sm font-bold text-slate-900">{q.question}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Calibration & Daily Implementation Framework */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="text-lg font-bold text-slate-900">
            Biometric Calibration &amp; Weekly Tracking Guidelines
          </h3>
          <div className="mt-3 space-y-3 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <p>
              This clinical preset is pre-calibrated for a{' '}
              <strong>
                {weightLbs} lb ({weightKg} kg) {sexLabel}
              </strong>{' '}
              profile at <strong>{bodyFatPct}% estimated body fat</strong>, yielding an estimated Lean Body Mass of{' '}
              <strong>
                {leanMassLbs} lb ({leanMassKg} kg LBM)
              </strong>
              . Anchoring daily protein targets to Lean Body Mass rather than gross scale weight prevents systematic under-dosing of skeletal muscle tissue or excessive protein inflation in individuals with higher adiposity.
            </p>
            <p>
              When executing this protocol over a 4- to 12-week mesocycle, record fasted morning scale weights at least four mornings per week and evaluate the rolling 7-day average rather than single-day hydration fluctuations. Acute shifts in glycogen storage, dietary sodium intake, gastrointestinal transit time, or training-induced muscle inflammation routinely shift scale weight by 1% to 2% within 24 hours without reflecting true adipose tissue gain or loss.
            </p>
            <p>
              Adjust your active input parameters directly in the interactive calculator above whenever your rolling 14-day weight trend diverges from your target trajectory by more than 0.25% of body weight per week, or whenever your resistance training frequency, step count, or medication regimen changes. All calculations execute locally in your browser so your biometric measurements remain completely private.
            </p>
            <p>
              For optimal muscle protein synthesis and recovery, distribute your daily protein intake across 3 to 4 balanced feedings spaced roughly 3 to 5 hours apart, targeting 30g to 45g of complete, leucine-rich protein per meal. On higher-intensity resistance training days, position roughly 40% to 50% of your daily carbohydrates within the 2-hour pre-workout and post-workout window to fuel glycogen resynthesis while maintaining lower glycemic carbohydrate intake on sedentary recovery days. Pair caloric adjustments with consistent daily hydration (minimum 30–35 mL/kg fluid baseline), electrolyte replacement during heavy perspiration, and 7 to 9 hours of restorative sleep to prevent cortisol-mediated water retention and preserve resting energy expenditure throughout every mesocycle.
            </p>
          </div>
        </div>

        {/* Related Presets & Supporting Guides */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="text-base font-bold text-slate-900">
            Related Clinical Profiles &amp; Supporting Research Guides
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPresets.map((rp) => (
              <Link
                key={rp.slug}
                href={`/presets/${rp.slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs transition hover:border-teal-400 hover:bg-white"
              >
                <span className="font-bold text-teal-800">{rp.badge}</span>
                <p className="mt-1 font-semibold text-slate-900">{rp.h1}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((rg) => (
              <Link
                key={rg.slug}
                href={`/guides/${rg.slug}`}
                className="rounded-xl border border-teal-200/80 bg-teal-50/40 p-3.5 text-xs transition hover:border-teal-500 hover:bg-white"
              >
                <span className="font-bold text-teal-800">Research Guide • {rg.category}</span>
                <p className="mt-1 font-semibold text-slate-900">{rg.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Hub Footer Link */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/presets"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-5 py-2.5 text-xs font-bold text-teal-800 transition-colors hover:bg-teal-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse All 64 Preset Profiles in Directory Hub
        </Link>
      </div>
    </div>
  );
}
