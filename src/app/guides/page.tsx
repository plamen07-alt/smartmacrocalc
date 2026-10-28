import React from 'react';
import Link from 'next/link';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { SCIENTIFIC_ARTICLES } from '@/lib/articles';

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="border-b border-slate-200 pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">
          <BookOpen className="h-3.5 w-3.5" />
          Peer-Reviewed Clinical Research Library
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Human Bioenergetics, GLP-1 Preservation &amp; Body Recomposition Guides
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Every article is authored and reviewed by exercise physiologists and sports dietitians with direct citations to the National Library of Medicine (PubMed / NCBI).
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
    </div>
  );
}
