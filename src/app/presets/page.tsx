import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { SEO_PRESETS } from '@/lib/presets';
import { PresetDirectoryExplorer } from '@/components/presets/PresetDirectoryExplorer';

export const metadata: Metadata = {
  title: 'Biometric Macro & Calorie Cycling Preset Directory (64 Clinical Profiles) | SmartMacroCalc.com',
  description:
    'Browse 64 pre-calculated clinical macro presets spanning 120 lb to 240 lb. Precision calorie cycling (+5%/-20%), GLP-1 protein floors, perimenopause, fasting, and electrolyte protocols.',
  alternates: {
    canonical: 'https://smartmacrocalc.com/presets',
  },
  openGraph: {
    title: 'Biometric Macro & Calorie Cycling Preset Directory | SmartMacroCalc.com',
    description:
      'Browse 64 pre-calculated clinical macro presets spanning 120 lb to 240 lb. Precision calorie cycling, GLP-1 protein floors, perimenopause, fasting, and electrolyte protocols.',
    url: 'https://smartmacrocalc.com/presets',
    type: 'website',
    siteName: 'SmartMacroCalc.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biometric Macro & Calorie Cycling Preset Directory | SmartMacroCalc.com',
    description:
      'Browse 64 pre-calculated clinical macro presets spanning 120 lb to 240 lb. Precision calorie cycling and GLP-1 protein floors.',
  },
};

export default function PresetsDirectoryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://smartmacrocalc.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Presets Directory',
        item: 'https://smartmacrocalc.com/presets',
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SmartMacroCalc Clinical Preset Profiles Directory',
    description:
      'Comprehensive index of 64 pre-calculated clinical nutrition and calorie cycling profiles across 8 clinical domains.',
    url: 'https://smartmacrocalc.com/presets',
    hasPart: SEO_PRESETS.map((p) => ({
      '@type': 'MedicalWebPage',
      name: p.title,
      url: `https://smartmacrocalc.com/presets/${p.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Back to Home Link */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Main Calculator Hub
        </Link>
      </div>

      {/* Hero Directory Header */}
      <div className="mb-8 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-bold text-teal-300 ring-1 ring-teal-400/30">
            <Layers className="h-3.5 w-3.5" />
            Clinical Biometric Directory • 64 Pre-Computed Profiles
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            100% Thermodynamic Consistency Enforced
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Biometric Macro &amp; Calorie Cycling Preset Directory
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-teal-100/90 sm:text-base">
          Instant 2-click access to precision training-day surpluses (+5%), rest-day deficits (-20%), GLP-1 anti-sarcopenia protein floors, and hormone-calibrated macro targets across 120 lb to 240 lb physiques.
        </p>
      </div>

      {/* Interactive Explorer with Category Tabs, Search & Preset Cards */}
      <PresetDirectoryExplorer presets={SEO_PRESETS} />
    </div>
  );
}
