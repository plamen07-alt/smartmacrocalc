import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import { InteractiveContactForm } from '@/components/layout/InteractiveContactForm';

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
      'Mission, Clinical Review Board, and Mathematical Transparency (Google E-E-A-T Standards)',
    sections: [
      {
        heading: '1. Our Mission: Engineering Clinical Precision into Consumer Nutrition',
        paragraphs: [
          'SmartMacroCalc.com was founded to bridge the gap between hospital-grade indirect calorimetry research and everyday nutritional planning. Most online calorie calculators rely on a single outdated equation and fail to account for Lean Body Mass (LBM), GLP-1 medication protocols, or training-day nutrient partitioning.',
          'Our platform runs 100% client-side in your browser, combining three peer-reviewed Basal Metabolic Rate equations (Mifflin-St Jeor, Katch-McArdle, and Cunningham) with dynamic macro cycling.',
        ],
      },
      {
        heading: '2. Editorial & Scientific Review Process',
        paragraphs: [
          'Every mathematical model on SmartMacroCalc.com is benchmarked against primary literature indexed in the National Library of Medicine (PubMed / NCBI), including the American Journal of Clinical Nutrition (PMID: 2305711, PMID: 26817506) and the New England Journal of Medicine (PMID: 33567185).',
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
        ],
      },
      {
        heading: '2. Google AdSense & DoubleClick DART Cookie Disclosure',
        paragraphs: [
          'Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites. Google’s use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.',
          'Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or by visiting www.aboutads.info.',
        ],
      },
      {
        heading: '3. California Consumer Privacy Act (CCPA) & GDPR Rights',
        paragraphs: [
          'Residents of California (under CCPA/CPRA) and the European Economic Area / UK (under GDPR) have the right to request disclosure of data collection practices, opt out of the sale or sharing of personal information, and manage cookie consent preferences at any time.',
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
        ],
      },
      {
        heading: '2. Limitation of Liability',
        paragraphs: [
          'All calculations are mathematical estimates based on published physiological equations. Individual metabolic rates vary due to genetics, thyroid function, gut microbiome, and medical history.',
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
        ],
      },
      {
        heading: '2. Affiliate & Sponsorship Disclosure (FTC Compliance)',
        paragraphs: [
          'In accordance with Federal Trade Commission (FTC) guidelines, SmartMacroCalc.com discloses that certain product links (such as lab-tested whey isolates, electrolytes, or biomarker panels) are affiliate links that may earn our laboratory a referral commission at zero additional cost to you.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact Our Clinical Editorial & Engineering Team',
    subtitle: 'Inquiries for Research Citations, B2B Coach Partnerships & Media',
    sections: [
      {
        heading: 'Direct Support & Partnership Channels',
        paragraphs: [
          'Have a question about one of our BMR equations, want to report a clinical study, or need help configuring your White-Label Coach link? Use the form below or email editorial@smartmacrocalc.com. Our team responds within 24 business hours.',
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
    return { title: 'Legal | SmartMacroCalc.com' };
  }
  const canonicalUrl = `https://smartmacrocalc.com/legal/${slug}`;
  return {
    title: `${page.title} | SmartMacroCalc.com`,
    description: page.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${page.title} | SmartMacroCalc.com`,
      description: page.subtitle,
      url: canonicalUrl,
      type: 'website',
      siteName: 'SmartMacroCalc.com',
    },
    twitter: {
      card: 'summary',
      title: `${page.title} | SmartMacroCalc.com`,
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

  const canonicalUrl = `https://smartmacrocalc.com/legal/${slug}`;
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
      '@id': 'https://smartmacrocalc.com/#website',
      name: 'SmartMacroCalc.com',
      url: 'https://smartmacrocalc.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://smartmacrocalc.com/#organization',
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
        item: 'https://smartmacrocalc.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Legal & Compliance',
        item: 'https://smartmacrocalc.com/legal/about',
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
    '@id': 'https://smartmacrocalc.com/#organization',
    name: 'SmartMacroCalc.com',
    url: 'https://smartmacrocalc.com',
    logo: 'https://smartmacrocalc.com/icon.svg',
    description:
      'Clinical Health & Nutrition Calculator Platform engineering hospital-grade indirect calorimetry equations into client-side tools.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'editorial@smartmacrocalc.com',
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
      {/* Schema.org Structured Data: Both Multi-Entity Graph & Individual Entity Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
      </div>
    </div>
  );
}
