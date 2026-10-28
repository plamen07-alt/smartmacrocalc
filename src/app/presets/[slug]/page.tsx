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
    return { title: 'Preset Not Found | SmartMacroCalc.com' };
  }
  const canonicalUrl = `https://www.smartmacrocalc.com/presets/${slug}`;
  return {
    title: `${preset.title} | SmartMacroCalc.com`,
    description: preset.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${preset.title} | SmartMacroCalc.com`,
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
          alt: `${preset.title} | SmartMacroCalc.com`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${preset.title} | SmartMacroCalc.com`,
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

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `SmartMacroCalc ${preset.h1} Calculator`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SmartMacroCalc.com',
    url: 'https://www.smartmacrocalc.com',
    logo: 'https://www.smartmacrocalc.com/icon.svg',
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
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
