import React from 'react';
import Link from 'next/link';
import { Activity, BookOpen, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { CoachWhiteLabelBar } from '@/components/viral/CoachWhiteLabelBar';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-2xs backdrop-blur-md">
      <CoachWhiteLabelBar />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Smart<span className="text-teal-600">MacroCalc</span>.com
              </span>
              <span className="hidden rounded bg-teal-50 px-1.5 py-0.5 text-[10px] font-bold text-teal-700 ring-1 ring-teal-600/20 sm:inline-block">
                CLINICAL LAB
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              Precision Body Recomposition, GLP-1 & Macro Cycling Engine
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-semibold text-slate-700 md:flex">
          <Link href="/" className="transition hover:text-teal-600">
            Calculator Hub
          </Link>
          <Link href="/#programmatic-presets" className="flex items-center gap-1 transition hover:text-teal-600">
            <Layers className="h-3.5 w-3.5 text-teal-600" />
            Preset Profiles (pSEO)
          </Link>
          <Link href="/#scientific-methodology" className="flex items-center gap-1 transition hover:text-teal-600">
            <BookOpen className="h-3.5 w-3.5 text-teal-600" />
            PubMed Methodology
          </Link>
          <Link href="/guides" className="transition hover:text-teal-600">
            Research Guides
          </Link>
          <Link href="/legal/about" className="flex items-center gap-1 transition hover:text-teal-600">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            E-E-A-T & Editorial
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/presets/160-lb-female-glp1-protein-macros"
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-teal-700"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            GLP-1 Protocol
          </Link>
        </div>
      </div>
    </header>
  );
}
