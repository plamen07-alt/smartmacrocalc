'use client';

import React, { useState, useEffect } from 'react';
import { Users, Code2, Copy, Check, Sparkles, X, Link2, ShieldCheck } from 'lucide-react';
import { sanitizeBrandParam, sanitizeTabParam } from '@/lib/security';

export function CoachWhiteLabelBar() {
  const [coachName, setCoachName] = useState<string>('');
  const [clinicName, setClinicName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputCoach, setInputCoach] = useState<string>('JohnFitness');
  const [inputClinic, setInputClinic] = useState<string>('Apex Performance Lab');
  const [selectedTab, setSelectedTab] = useState<string>('recomp');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedIframe, setCopiedIframe] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = sanitizeBrandParam(params.get('coach'), 42);
      const cl = sanitizeBrandParam(params.get('clinic'), 50);
      const t = sanitizeTabParam(params.get('tab'));
      if (c) setCoachName(c);
      if (cl) setClinicName(cl);
      if (t) setSelectedTab(t);
    }
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.smartmacrocalc.com';
  const safeInputCoach = sanitizeBrandParam(inputCoach, 42) || 'Coach';
  const safeInputClinic = sanitizeBrandParam(inputClinic, 50) || 'Performance Clinic';
  const tabParam = selectedTab !== 'all' ? `&tab=${sanitizeTabParam(selectedTab)}` : '';
  const generatedCoachUrl = `${origin}/?coach=${encodeURIComponent(safeInputCoach)}&clinic=${encodeURIComponent(safeInputClinic)}${tabParam}`;
  const generatedIframeCode = `<iframe src="${origin}/?coach=${encodeURIComponent(safeInputCoach)}${tabParam}&embed=true" width="100%" height="820" style="border:1px solid #e2e8f0; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.05);" title="SmartMacroCalc Clinical Macro & Bioenergetics Calculator" loading="lazy"></iframe>\n<p style="font-size:12px;text-align:right;margin-top:4px;">Powered by <a href="${origin}" target="_blank" rel="noopener">SmartMacroCalc.com Clinical Lab</a></p>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedCoachUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(generatedIframeCode);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2500);
  };

  const applyPreviewCoach = () => {
    const c = sanitizeBrandParam(inputCoach, 42) || 'JohnFitness';
    const cl = sanitizeBrandParam(inputClinic, 50) || 'Apex Performance Lab';
    setCoachName(c);
    setClinicName(cl);
    setIsModalOpen(false);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('coach', c);
      url.searchParams.set('clinic', cl);
      if (selectedTab !== 'all') {
        url.searchParams.set('tab', selectedTab);
      } else {
        url.searchParams.delete('tab');
      }
      window.history.pushState({}, '', url.toString());
      // Trigger a popstate or custom event so MasterCalculatorHub updates activeTab if needed
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <>
      {/* Active White-Label Banner when ?coach= parameter is present or previewed */}
      {coachName && (
        <div className="border-b border-teal-800 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 px-4 py-2.5 text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/20 px-2.5 py-0.5 font-semibold text-teal-300 ring-1 ring-teal-400/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Coach Protocol
              </span>
              <span className="font-medium text-slate-200">
                Custom Biometric Portal for Clients of{' '}
                <strong className="font-bold text-white">{coachName}</strong>
                {clinicName ? ` (${clinicName})` : ''}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-teal-300 underline decoration-teal-500/60 underline-offset-2 hover:text-white"
              >
                Customize Coach Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setCoachName('');
                  setClinicName('');
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href);
                    url.searchParams.delete('coach');
                    url.searchParams.delete('clinic');
                    window.history.pushState({}, '', url.toString());
                  }
                }}
                className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-white/20"
              >
                Exit Coach View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Utility Bar Trigger for Coaches & Bloggers */}
      <div className="border-b border-slate-200/80 bg-slate-900 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-slate-200">
              Clinical Precision Engine v2.6 • Mifflin-St Jeor, Katch-McArdle &amp; Cunningham Validated
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 font-semibold text-teal-300 transition hover:text-teal-200"
            >
              <Users className="h-3.5 w-3.5" />
              For Coaches &amp; Bloggers: Free White-Label Link &amp; Embed Widget
            </button>
          </div>
        </div>
      </div>

      {/* Modal for B2B White-Label Coach Generator & SEO Backlink Iframe Widget */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-teal-700 uppercase">
              <Sparkles className="h-4 w-4" />
              Clinical Coach &amp; Health Publisher Portal
            </div>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              Free White-Label Coach Link &amp; Blogger Iframe Widget
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Generate a personalized link with your coaching brand at the top for your clients, or embed this calculator on your fitness blog with 1 click.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="coach-name-input" className="block text-xs font-semibold text-slate-700">
                  Coach or Trainer Name
                </label>
                <input
                  id="coach-name-input"
                  aria-label="Coach or trainer name"
                  type="text"
                  value={inputCoach}
                  onChange={(e) => setInputCoach(e.target.value)}
                  placeholder="e.g. Coach John"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="clinic-name-input" className="block text-xs font-semibold text-slate-700">
                  Gym / Clinic / Brand Name
                </label>
                <input
                  id="clinic-name-input"
                  aria-label="Gym, clinic, or brand name"
                  type="text"
                  value={inputClinic}
                  onChange={(e) => setInputClinic(e.target.value)}
                  placeholder="e.g. Apex Performance Lab"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Target Calculator Niche Selector */}
            <div className="mt-4">
              <label htmlFor="target-calculator-focus" className="block text-xs font-semibold text-slate-700">
                Target Calculator Focus Mode (?tab= parameter)
              </label>
              <select
                id="target-calculator-focus"
                aria-label="Target calculator focus mode"
                value={selectedTab}
                onChange={(e) => setSelectedTab(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:outline-none"
              >
                <option value="all">All-in-One Multi-Calculator Hub</option>
                <option value="recomp">Body Recomposition (+5% / -20% Cycling)</option>
                <option value="glp1">GLP-1 &amp; Ozempic Anti-Sarcopenia Guard</option>
                <option value="perimenopause">Perimenopause Hormone &amp; TDEE Protocol</option>
                <option value="fasting">Intermittent Fasting Timeline (16:8 / OMAD)</option>
                <option value="electrolytes">Creatine Loading &amp; Sweat Electrolytes</option>
                <option value="ffmi">Leucine Trigger (3.0g) &amp; FFMI Lab</option>
                <option value="reverse">Reverse Dieting (+80 kcal/wk Recovery)</option>
              </select>
            </div>

            {/* White-label URL output */}
            <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                  <Link2 className="h-4 w-4 text-teal-700" />
                  1. Your Client White-Label URL
                </span>
                <button
                  type="button"
                  onClick={applyPreviewCoach}
                  className="text-xs font-semibold text-teal-700 underline hover:text-teal-950"
                >
                  Test Live on This Page →
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="generated-coach-url"
                  aria-label="Generated client white-label URL"
                  type="text"
                  readOnly
                  value={generatedCoachUrl}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-700"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedLink ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>

            {/* Embeddable Iframe Widget for SEO Backlinks */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Code2 className="h-4 w-4 text-slate-700" />
                  2. Embeddable Iframe Widget (For Fitness Blogs &amp; Clinics)
                </span>
                <span className="text-[11px] text-slate-500">Includes automatic attribution link</span>
              </div>
              <textarea
                readOnly
                rows={4}
                value={generatedIframeCode}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-mono text-[11px] text-slate-700"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleCopyIframe}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  {copiedIframe ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedIframe ? 'Embed Code Copied!' : 'Copy Iframe HTML'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
