import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { SCIENTIFIC_ARTICLES, getArticleBySlug } from '@/lib/articles';
import { InArticleAdSenseSlot } from '@/components/monetization/StrategicAdSlots';

export function generateStaticParams() {
  return SCIENTIFIC_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Guide Not Found | SmartMacroCalc.com' };
  }
  const canonicalUrl = `https://smartmacrocalc.com/guides/${slug}`;
  return {
    title: `${article.title} | SmartMacroCalc.com`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | SmartMacroCalc.com`,
      description: article.excerpt,
      url: canonicalUrl,
      type: 'article',
      siteName: 'SmartMacroCalc.com',
      publishedTime: '2026-10-01T00:00:00.000Z',
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | SmartMacroCalc.com`,
      description: article.excerpt,
    },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const canonicalUrl = `https://smartmacrocalc.com/guides/${slug}`;

  // Structured FAQ Data
  const articleFaqs = (article as any).faq ||
    (article as any).faqs || [
      {
        question: `What is the primary clinical finding in "${article.title}"?`,
        answer: (article as any).directClinicalAnswer || article.excerpt,
      },
      {
        question: `Who authored and medically reviewed this clinical research guide?`,
        answer: `This guide was authored by ${article.author} (${article.authorCredentials}) and medically reviewed by ${article.reviewer}.`,
      },
      {
        question: `Where can I verify the primary scientific citations for this guide?`,
        answer: `All physiological benchmarks are verified via NCBI PubMed literature, including PMIDs: ${article.pmidCitations.map((c) => c.pmid).join(', ')}.`,
      },
    ];

  // Entity 1: MedicalWebPage Schema
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${canonicalUrl}#medicalwebpage`,
    url: canonicalUrl,
    headline: article.title,
    description: article.excerpt,
    aspect: 'DietaryGuidance',
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorCredentials,
    },
    reviewedBy: {
      '@type': 'Person',
      name: article.reviewer,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartMacroCalc.com',
      url: 'https://smartmacrocalc.com',
    },
    citation: article.pmidCitations.map((c) => c.url || `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`),
  };

  // Entity 2: BreadcrumbList Schema
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
        name: 'Clinical Research Library',
        item: 'https://smartmacrocalc.com/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  // Entity 3: FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: articleFaqs.map((f: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  // Entity 4: Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://smartmacrocalc.com/#organization',
    name: 'SmartMacroCalc.com',
    url: 'https://smartmacrocalc.com',
    logo: 'https://smartmacrocalc.com/icon.svg',
  };

  // Unified Multi-Entity Schema Graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      medicalWebPageSchema,
      breadcrumbSchema,
      faqSchema,
      organizationSchema,
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Clinical Research Library
      </Link>

      <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-teal-700">
          <span className="rounded bg-teal-50 px-2.5 py-1">{article.category}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{article.readTime}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Updated {article.publishedDate}</span>
        </div>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {article.title}
        </h1>

        {/* E-E-A-T Author & Medical Reviewer Box */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
          <div>
            <div className="font-bold text-slate-900">Author: {article.author}</div>
            <div className="text-slate-500">{article.authorCredentials}</div>
          </div>
          <div className="flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              Medically Reviewed by <strong>{article.reviewer}</strong>
            </span>
          </div>
        </div>

        {/* AEO Direct Clinical Answer Callout Block (40-65 Words) */}
        <div
          data-aeo-answer="true"
          className="mt-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-6 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Direct Clinical Answer
            </span>
            <span className="text-xs font-semibold text-emerald-800">
              Evidence-Based Physiological Takeaway
            </span>
          </div>
          <p className="mt-3 text-base leading-relaxed font-medium text-slate-900">
            {(article as any).directClinicalAnswer || article.excerpt}
          </p>
        </div>

        {/* GEO Structured Data Table (Top-Level article.tableData) */}
        {(article as any).tableData && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h2 className="text-base font-bold text-slate-900">
                Clinical Reference &amp; Evidence Benchmark Table
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Structured clinical metrics and physiological data optimized for algorithmic analysis and AI engine extraction.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-100/70 text-slate-700">
                  <tr>
                    {(article as any).tableData.headers.map((h: string, i: number) => (
                      <th key={i} className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {(article as any).tableData.rows.map((row: (string | number)[], rIdx: number) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      {row.map((cell: string | number, cIdx: number) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-3 font-medium ${
                            cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-600'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
          {article.sections.map((sec, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-bold text-slate-900">{sec.heading}</h2>
              {sec.body.map((p, pIdx) => (
                <p key={pIdx} className="mt-3">
                  {p}
                </p>
              ))}

              {sec.table && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-700">
                      <tr>
                        {sec.table.headers.map((h) => (
                          <th key={h} className="px-3.5 py-2.5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sec.table.rows.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          {r.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-3.5 py-2.5 ${
                                cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-600'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Profile-Specific FAQ Section */}
        {articleFaqs && articleFaqs.length > 0 && (
          <div className="mt-10 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Frequently Asked Clinical Questions
              </h3>
            </div>
            <div className="mt-4 space-y-3">
              {articleFaqs.map((q: { question: string; answer: string }, i: number) => (
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
        )}

        {/* In-Article AdSense Unit between clinical sections and PubMed references */}
        <InArticleAdSenseSlot label="In-Article Clinical Research Ad Unit" />

        {/* PubMed Citations Box */}
        <div className="mt-10 rounded-xl border border-teal-200 bg-teal-50/50 p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-teal-800" />
            <h3 className="text-xs font-bold tracking-wider text-teal-900 uppercase">
              Primary Literature &amp; PubMed (NCBI) Citations
            </h3>
          </div>
          <ul className="mt-3 space-y-2.5 text-xs text-slate-700">
            {article.pmidCitations.map((c) => {
              const pmidUrl = c.url || `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`;
              return (
                <li
                  key={c.pmid}
                  className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-white/80 p-3 sm:flex-row sm:items-center sm:justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">PMID: {c.pmid}</span> —{' '}
                    <span className="text-slate-700">{c.citation}</span>
                  </div>
                  <a
                    href={pmidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                  >
                    View on PubMed <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-900 p-5 text-white">
          <div>
            <h4 className="text-sm font-bold">Ready to apply these equations to your own body?</h4>
            <p className="text-xs text-slate-300">
              Run our free 3-Formula Body Recomposition &amp; GLP-1 Calculator now.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-teal-400"
          >
            <Calculator className="h-4 w-4" />
            Open Calculator
          </Link>
        </div>
      </article>
    </div>
  );
}
