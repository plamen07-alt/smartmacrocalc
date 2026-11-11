import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, ShieldCheck, ArrowLeft, Calculator } from 'lucide-react';
import { SCIENTIFIC_ARTICLES } from '@/lib/articles';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/guides`;

export const metadata: Metadata = {
  title: 'Clinical Nutrition & Bioenergetics Guides | SmartMacroCalc',
  description:
    'Explore 12 peer-reviewed research guides on body recomposition calorie cycling, GLP-1 muscle preservation, perimenopause macros, 16:8 fasting, and FFMI.',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Clinical Nutrition & Bioenergetics Guides | SmartMacroCalc',
    description:
      'Peer-reviewed clinical nutrition guides backed by NCBI PubMed citations covering GLP-1 sarcopenia prevention, calorie cycling, and reverse dieting.',
    url: CANONICAL_URL,
    type: 'website',
    siteName: SITE_NAME,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SmartMacroCalc Clinical Nutrition & Bioenergetics Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Nutrition & Bioenergetics Guides | SmartMacroCalc',
    description:
      'Peer-reviewed clinical guides on body recomposition, GLP-1 lean mass preservation, and metabolic equations.',
    images: ['/opengraph-image'],
  },
};

export default function GuidesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Clinical Research Guides',
        item: CANONICAL_URL,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SmartMacroCalc Clinical Research Library',
    description:
      'Comprehensive library of peer-reviewed guides explaining human bioenergetics, BMR predictive equations, GLP-1 lean muscle retention, and micronutrient kinetics.',
    url: CANONICAL_URL,
    hasPart: SCIENTIFIC_ARTICLES.map((art) => ({
      '@type': 'MedicalWebPage',
      name: art.title,
      url: `${SITE_URL}/guides/${art.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Main Calculator Hub
        </Link>
      </div>

      <div className="border-b border-slate-200 pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">
          <BookOpen className="h-3.5 w-3.5" />
          Peer-Reviewed Clinical Research Library ({SCIENTIFIC_ARTICLES.length} Guides)
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Human Bioenergetics, GLP-1 Preservation &amp; Body Recomposition Guides
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Every article in our clinical research library is curated by the SmartMacroCalc Editorial Team and benchmarked against primary literature indexed in the National Library of Medicine (PubMed / NCBI). Use these evidence summaries to calibrate your Resting Metabolic Rate equation, protein bolus timing, hormonal phase targets, and electrolyte replacement protocols.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {SCIENTIFIC_ARTICLES.map((art) => (
          <Link
            key={art.slug}
            href={`/guides/${art.slug}`}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-teal-500 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-teal-700">
                <span>{art.category}</span>
                <span className="text-slate-500">{art.readTime}</span>
              </div>
              <h2 className="mt-2.5 text-lg font-bold text-slate-900">{art.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{art.excerpt}</p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <div className="font-semibold text-slate-800">{art.author}</div>
              <div className="text-[11px]">{art.authorCredentials}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-teal-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                {art.pmidCitations.length} Verified PubMed Citations →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Editorial Methodology & AI/Search Overview Section */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Evidence Verification Standards &amp; How Our Calculators Use These Studies
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
          <p>
            Unlike generic calorie calculators that rely on uncalibrated population averages, SmartMacroCalc translates peer-reviewed clinical nutrition trials directly into client-side bioenergetic algorithms. Each guide above documents the exact physiological coefficients, leucine thresholds, fat-free mass ratios, and endocrine boundary conditions implemented across our calculator suite.
          </p>
          <p>
            All BMR comparisons evaluate Mifflin-St Jeor (predictive general population), Katch-McArdle (Lean Body Mass baseline for recreational lifters), and Cunningham (1980 &amp; 1991 lean-tissue calibration for strength and endurance athletes). For pharmacotherapy cohorts utilizing GLP-1 or dual GIP/GLP-1 receptor agonists, protein floors are anchored to grams per kilogram of Lean Body Mass rather than total body weight to mitigate sarcopenic muscle loss during steep caloric deficits.
          </p>
          <p>
            Every publication is reviewed periodically for updated consensus statements from organizations such as the International Society of Sports Nutrition (ISSN) and major endocrine journals. Educational guides are strictly informational and should be paired with physician or Registered Dietitian supervision when managing clinical conditions or prescription therapies.
          </p>
          <p>
            To put any research guide into immediate practice, select a matching pre-calculated blueprint from our 64-profile directory or open the interactive calculator hub directly. Each tool reconciles energy balance with Lean Body Mass preservation, meal-by-meal leucine thresholds (typically 2.5g to 3.0g per feeding), hydration electrolyte balance, and gradual post-diet caloric restoration so your weekly intake remains sustainable without triggering adaptive thermogenesis or rebound fat gain.
          </p>
          <p>
            Each research summary below links directly to its underlying PubMed identifiers (PMIDs), peer-reviewed dose-response tables, and frequently asked clinical questions. Whether you are calibrating a +5% training / -20% rest-day recomposition schedule, protecting skeletal muscle during GLP-1 receptor agonist therapy, optimizing perimenopausal protein timing, or planning a methodical +80 kcal/week reverse diet, these guides provide transparent physiological context behind every coefficient in our software.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-900 p-5 text-white">
          <div>
            <h3 className="text-sm font-bold">Explore All 64 Pre-Calculated Clinical Profiles</h3>
            <p className="text-xs text-slate-300">
              Launch pre-configured body recomposition, GLP-1, perimenopause, and fasting presets immediately.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/presets"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
            >
              Browse 64 Presets
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
            >
              <Calculator className="h-4 w-4" />
              Open Calculator Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
