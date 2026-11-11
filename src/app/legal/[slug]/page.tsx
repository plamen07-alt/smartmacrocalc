import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import { InteractiveContactForm } from '@/components/layout/InteractiveContactForm';
import { formatSeoTitle } from '@/lib/site';

const LEGAL_PAGES: Record<
  string,
  {
    title: string;
    subtitle: string;
    sections: Array<{ heading: string; paragraphs: string[] }>;
  }
> = {
  about: {
    title: 'About SmartMacroCalc.com & Our Scientific Methodology',
    subtitle:
      'Mission, Editorial Standards, and Mathematical Transparency (Evidence-Based Architecture)',
    sections: [
      {
        heading: '1. Our Mission: Evidence-Based Computational Nutrition',
        paragraphs: [
          'SmartMacroCalc.com is an independent health engineering project designed to translate peer-reviewed indirect calorimetry research into intuitive, privacy-first consumer nutrition tools. Most online calorie calculators rely on a single scale-weight equation and fail to account for Lean Body Mass (LBM), GLP-1 peptide therapy lean-mass preservation, or training-day nutrient partitioning.',
          'Our platform runs 100% client-side in your browser, combining three gold-standard Basal Metabolic Rate equations (Mifflin-St Jeor, Katch-McArdle, and Cunningham) with dynamic macro cycling.',
        ],
      },
      {
        heading: '2. Editorial Standards & Literature Citations',
        paragraphs: [
          'Every mathematical model on SmartMacroCalc.com is benchmarked against primary literature indexed in the National Library of Medicine (PubMed / NCBI), including the American Journal of Clinical Nutrition (PMID: 2305711, PMID: 26817506) and the New England Journal of Medicine (PMID: 33567185). Content is curated by the SmartMacroCalc Editorial Team with full citation transparency.',
        ],
      },
      {
        heading: '3. Client-Side Engineering & Privacy Architecture',
        paragraphs: [
          'Unlike traditional web calculators that transmit user body weight, age, medical therapy status, or dietary history to remote application databases for processing, SmartMacroCalc.com executes 100% of thermodynamic calculations inside your local browser JavaScript runtime. Zero personal biometric inputs ever leave your device.',
          'Our platform supports both US Imperial (pounds, feet/inches) and Metric (kilograms, centimeters) measurements natively with zero server round-trips, instant recalculation, and static pre-rendered clinical preset blueprints covering 120 lb to 240 lb profiles.',
        ],
      },
      {
        heading: '4. Periodic Literature Review & Update Policy',
        paragraphs: [
          'Clinical guides and bioenergetics presets are audited periodically against updated consensus statements from the International Society of Sports Nutrition (ISSN), sports endocrinology societies, and peer-reviewed randomized controlled trials. When physiological coefficients or protein-sparing thresholds evolve in the published literature, equations and citation references are updated promptly.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy (Google DART Cookie, GDPR & California CCPA Compliance)',
    subtitle: 'Last Updated: October 2026 • Full AdSense & Programmatic Advertising Disclosure',
    sections: [
      {
        heading: '1. Zero-Server Biometric Privacy (LocalStorage Architecture)',
        paragraphs: [
          'All biometric parameters (weight, height, age, body fat percentage, and daily weight logs) entered into SmartMacroCalc.com are computed locally inside your browser and stored only in your device’s localStorage. We do not transmit or sell your personal health measurements to external servers.',
          'You may clear your locally persisted calculator settings and weigh-in history at any time using your browser site-data controls without requiring account deletion requests or identity verification.',
        ],
      },
      {
        heading: '2. Google AdSense & DoubleClick DART Cookie Disclosure',
        paragraphs: [
          'Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites. Google’s use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.',
          'Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or by visiting www.aboutads.info.',
          'SmartMacroCalc.com also utilizes Google Analytics (GA4) with anonymized telemetry solely to understand aggregate traffic trends, improve page load speed, and refine educational guide usability across desktop and mobile viewports.',
        ],
      },
      {
        heading: '3. California Consumer Privacy Act (CCPA) & GDPR Rights',
        paragraphs: [
          'Residents of California (under CCPA/CPRA) and the European Economic Area / UK (under GDPR) have the right to request disclosure of data collection practices, opt out of the sale or sharing of personal information, and manage cookie consent preferences at any time.',
          'Because SmartMacroCalc.com does not operate user accounts, collect names, or store biometric logs on remote servers, there is no remote personal database containing your health metrics. For inquiries regarding privacy or ad-technology compliance, contact gainsystemized@gmail.com.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service & Acceptable Use Policy',
    subtitle: 'Governing Use of SmartMacroCalc.com Calculators, White-Label Links & Widgets',
    sections: [
      {
        heading: '1. License to Use Calculators & Embeddable Widgets',
        paragraphs: [
          'SmartMacroCalc.com grants users, fitness coaches, and health publishers a revocable, non-exclusive license to use our interactive calculators, downloadable PNG blueprint cards, and embeddable iframe widgets, provided that attribution links back to SmartMacroCalc.com remain intact.',
          'Automated scraping of proprietary bulk source layouts, deceptive framing that obscures origin attribution, or redistribution of calculators as paid standalone software without prior written authorization is prohibited.',
        ],
      },
      {
        heading: '2. Limitation of Liability',
        paragraphs: [
          'All calculations are mathematical estimates based on published physiological equations. Individual metabolic rates vary due to genetics, thyroid function, gut microbiome, and medical history.',
          'To the maximum extent permitted by applicable law, SmartMacroCalc.com and its contributors disclaim liability for any dietary, training, or medical outcomes resulting from independent interpretation of calculated caloric or macronutrient estimates.',
        ],
      },
      {
        heading: '3. Intellectual Property & Research Attribution',
        paragraphs: [
          'All interface components, pre-computed clinical comparison tables, and editorial summaries are copyright SmartMacroCalc.com. Primary indirect calorimetry formulas and cited randomized clinical trials remain the intellectual contributions of their respective peer-reviewed authors referenced via NCBI PubMed identifiers.',
        ],
      },
    ],
  },
  disclaimer: {
    title: 'Full Medical & Clinical Nutrition Disclaimer',
    subtitle: 'Important Information Regarding GLP-1 Agonists, Caloric Deficits & Exercise',
    sections: [
      {
        heading: '1. Not a Substitute for Professional Medical Advice',
        paragraphs: [
          'The content, calculators, and protocols on SmartMacroCalc.com are provided strictly for informational and educational purposes. Nothing on this website should be construed as medical diagnosis, treatment, or prescription advice.',
          'Patients prescribed Semaglutide (Ozempic®, Wegovy®), Tirzepatide (Mounjaro®, Zepbound®), or other GLP-1/GIP receptor agonists must consult their prescribing endocrinologist or physician before modifying dietary intake or physical activity.',
          'If you have a history of eating disorders, renal insufficiency, hepatic impairment, pregnancy, lactation, or unstable endocrine disease, do not initiate aggressive caloric deficits, intermittent fasting protocols, or high-protein supplementation without direct supervision from a licensed clinician or Registered Dietitian (RD).',
        ],
      },
      {
        heading: '2. Affiliate & Sponsorship Disclosure (FTC Compliance)',
        paragraphs: [
          'In accordance with Federal Trade Commission (FTC) guidelines, SmartMacroCalc.com discloses that certain product links (such as lab-tested whey isolates, electrolytes, or biomarker panels) are affiliate links that may earn our laboratory a referral commission at zero additional cost to you.',
          'Display advertising on this website may also be served automatically by Google AdSense. Automated ad placements do not constitute clinical endorsement of any advertised third-party product or service.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact Our Clinical Editorial & Engineering Team',
    subtitle: 'Inquiries for Research Citations, B2B Coach Partnerships & Media',
    sections: [
      {
        heading: '1. Direct Support & Partnership Channels',
        paragraphs: [
          'Have a question about one of our BMR equations, want to report a clinical study, or need help configuring your White-Label Coach link? Use the form below or email gainsystemized@gmail.com. Our team responds within 24 business hours.',
        ],
      },
      {
        heading: '2. Editorial Corrections, Literature Submissions & Privacy Inquiries',
        paragraphs: [
          'Researchers, Registered Dietitians, exercise physiologists, and readers who identify a newly published clinical trial, formula refinement, or citation correction are encouraged to reach out via email with the corresponding PubMed PMID or DOI reference.',
          'For GDPR, CCPA, AdSense advertising compliance, or technical bug reports across desktop and mobile browsers, please include the specific page URL and browser environment so our engineering team can investigate promptly.',
          'Coaches, registered dietitians, and nutrition clinics seeking white-label embed integration guidelines or API-free client workflow documentation can also request institutional setup notes via the message form below. Every inquiry is reviewed directly by our editorial engineering team without automated chatbot gatekeeping.',
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(LEGAL_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = LEGAL_PAGES[slug];
  if (!page) {
    return { title: 'Legal | SmartMacroCalc' };
  }
  const seoTitle = formatSeoTitle(page.title);
  const canonicalUrl = `https://www.smartmacrocalc.com/legal/${slug}`;
  return {
    title: seoTitle,
    description: page.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: page.subtitle,
      url: canonicalUrl,
      type: 'website',
      siteName: 'SmartMacroCalc.com',
    },
    twitter: {
      card: 'summary',
      title: seoTitle,
      description: page.subtitle,
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = LEGAL_PAGES[slug];
  if (!page) {
    notFound();
  }

  const canonicalUrl = `https://www.smartmacrocalc.com/legal/${slug}`;
  const pageType = slug === 'about' ? 'AboutPage' : slug === 'contact' ? 'ContactPage' : 'WebPage';

  // Schema Entity 1: WebPage / AboutPage / ContactPage
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    headline: page.title,
    description: page.subtitle,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://www.smartmacrocalc.com/#website',
      name: 'SmartMacroCalc.com',
      url: 'https://www.smartmacrocalc.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.smartmacrocalc.com/#organization',
      name: 'SmartMacroCalc.com',
    },
  };

  // Schema Entity 2: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumbs`,
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
        name: 'Legal & Compliance',
        item: 'https://www.smartmacrocalc.com/legal/about',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: canonicalUrl,
      },
    ],
  };

  // Schema Entity 3: Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.smartmacrocalc.com/#organization',
    name: 'SmartMacroCalc.com',
    url: 'https://www.smartmacrocalc.com',
    logo: 'https://www.smartmacrocalc.com/icon.svg',
    description:
      'Clinical Health & Nutrition Calculator Platform engineering hospital-grade indirect calorimetry equations into client-side tools.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'gainsystemized@gmail.com',
      contactType: 'Customer Support and Editorial Inquiries',
    },
  };

  // Unified Multi-Entity Schema Graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [webPageSchema, breadcrumbSchema, organizationSchema],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Schema.org Structured Data: Unified Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-teal-700 hover:underline">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="text-slate-500">Legal &amp; Compliance</span>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-800 capitalize">{slug}</span>
      </nav>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase">
          <ShieldCheck className="h-4 w-4" />
          Clinical Editorial, Privacy &amp; Regulatory Documentation
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">{page.title}</h1>
        <p className="mt-1 text-xs font-medium text-slate-500">{page.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-100 pb-5 text-xs font-semibold">
          {Object.keys(LEGAL_PAGES).map((key) => (
            <Link
              key={key}
              href={`/legal/${key}`}
              className={`rounded-lg px-3 py-1.5 capitalize transition ${
                key === slug
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {key}
            </Link>
          ))}
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-700">
          {page.sections.map((s, idx) => (
            <section key={idx}>
              <h2 className="text-base font-bold text-slate-900">{s.heading}</h2>
              {s.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mt-2">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {slug === 'contact' && <InteractiveContactForm />}

        {/* Shared Platform Transparency, Privacy & Editorial Assurance */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 p-5 text-xs leading-relaxed text-slate-700">
          <h2 className="text-sm font-bold text-slate-900">
            Platform Governance, Data Minimization &amp; Clinical Transparency Standards
          </h2>
          <p className="mt-2">
            SmartMacroCalc.com operates on a strict client-side computational architecture designed to protect user privacy in sensitive health and metabolic planning workflows. Biometric values such as body weight, height, age, estimated body fat percentage, GLP-1 therapy status, and daily weigh-in records are evaluated strictly inside your local browser session and are never transmitted to or stored on remote application servers.
          </p>
          <p className="mt-2">
            Every formula implemented across our body recomposition, calorie cycling (+5% training days and -20% rest days), reverse dieting (+80 kcal/week), intermittent fasting, and electrolyte replacement calculators is cross-referenced against peer-reviewed literature indexed in the National Library of Medicine (NCBI PubMed). All editorial protocols and preset profiles undergo periodic accuracy checks by the SmartMacroCalc Editorial Team to ensure thermodynamic consistency, metric and US imperial unit parity, and transparent medical disclaimers.
          </p>
          <p className="mt-2">
            Public trust in health and metabolic information requires both algorithmic transparency and clear boundaries between educational calculation models and clinical medical care. Our calculators provide standardized starting targets derived from indirect calorimetry equations, protein synthesis dose-response trials, and sports nutrition consensus guidelines, while encouraging ongoing empirical adjustment based on 7-day rolling weight trends, training performance, and licensed clinician feedback.
          </p>
          <p className="mt-2">
            Users accessing SmartMacroCalc.com from the United States, United Kingdom, Canada, Australia, or European Economic Area receive identical client-side privacy guarantees without mandatory registration, paywalls, or external biometric databases. Questions regarding mathematical assumptions, citation provenance, or regional privacy rights are handled directly through our editorial contact channels listed in this legal center.
          </p>
          <p className="mt-2">
            You can inspect our full library of{' '}
            <Link href="/guides" className="font-semibold text-teal-800 underline hover:text-teal-950">
              peer-reviewed clinical nutrition guides
            </Link>{' '}
            or browse all{' '}
            <Link href="/presets" className="font-semibold text-teal-800 underline hover:text-teal-950">
              64 biometric macro presets
            </Link>{' '}
            at any time, or return to the{' '}
            <Link href="/" className="font-semibold text-teal-800 underline hover:text-teal-950">
              main calculator hub
            </Link>{' '}
            to run custom calculations privately.
          </p>
        </section>
      </div>
    </div>
  );
}
