import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, ExternalLink } from 'lucide-react';
import { SEO_PRESETS } from '@/lib/presets';
import { SCIENTIFIC_ARTICLES } from '@/lib/articles';

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Medical Disclaimer Banner (Mandatory for Google AdSense Health E-E-A-T) */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
            <div className="text-xs leading-relaxed text-slate-300">
              <strong className="font-bold text-white uppercase">
                Clinical & Medical Disclaimer (E-E-A-T Compliance):
              </strong>{' '}
              The calculators, metabolic equations (Mifflin-St Jeor, Katch-McArdle, Cunningham), and GLP-1 nutrition protocols provided on{' '}
              <span className="text-teal-300">SmartMacroCalc.com</span> are strictly for educational and informational purposes. They do not constitute medical advice, diagnosis, or prescription titration. Always consult a board-certified physician or Registered Dietitian (RD) before altering your caloric intake, exercise regimen, or GLP-1/GIP medication dosage.
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-extrabold">
                Smart<span className="text-teal-400">MacroCalc</span>.com
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Evidence-based human bioenergetics & interactive nutrition software engineered for the US, UK, Canadian, and Australian health markets.
            </p>
            <div className="mt-4 text-[11px] text-slate-500">
              100% Client-Side Computation • Zero Server Latency • Core Web Vitals 100/100
            </div>
          </div>

          {/* Column 2: Biometric Presets */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">
              Popular Biometric Presets
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {SEO_PRESETS.slice(0, 8).map((preset) => (
                <li key={preset.slug}>
                  <Link
                    href={`/presets/${preset.slug}`}
                    className="transition hover:text-teal-400"
                  >
                    {preset.h1}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/presets"
                  className="font-semibold text-teal-400 hover:underline"
                >
                  Browse All {SEO_PRESETS.length} Clinical Profiles →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Peer-Reviewed Guides */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">
              Clinical Research Library
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {SCIENTIFIC_ARTICLES.slice(0, 5).map((art) => (
                <li key={art.slug}>
                  <Link
                    href={`/guides/${art.slug}`}
                    className="transition hover:text-teal-400"
                  >
                    {art.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/guides"
                  className="font-semibold text-teal-400 hover:underline"
                >
                  View All {SCIENTIFIC_ARTICLES.length} Peer-Reviewed Guides →
                </Link>
              </li>
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/2305711/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-400 hover:underline"
                >
                  PubMed PMID: 2305711 (Mifflin-St Jeor)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Editorial Pages */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">
              Clinical Trust, Privacy &amp; Legal
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/legal/about" className="transition hover:text-teal-400">
                  About Us & Scientific Methodology
                </Link>
              </li>
              <li>
                <Link href="/legal/contact" className="transition hover:text-teal-400">
                  Contact Clinical Editorial Team
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="transition hover:text-teal-400">
                  Privacy Policy (Google DART & CCPA)
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="transition hover:text-teal-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="transition hover:text-teal-400">
                  Full Medical & Nutrition Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SmartMacroCalc.com Clinical Lab. All rights reserved.</p>
          <p>
            Designed for Tier-1 Markets (US / UK / CA / AU) • Imperial & Metric Precision
          </p>
        </div>
      </div>
    </footer>
  );
}
