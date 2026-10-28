'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldAlert } from 'lucide-react';
import { sanitizeBrandParam } from '@/lib/security';

export function InteractiveContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Clinical Formula / Research Feedback');
  const [message, setMessage] = useState('');
  // Anti-bot Honeypot field (invisible to humans, filled by automated spam bots)
  const [honeypotWebsite, setHoneypotWebsite] = useState('');
  const [lastSubmitTs, setLastSubmitTs] = useState<number>(0);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError(null);

    // 1. Honeypot trap: silently absorb bot submissions without processing
    if (honeypotWebsite.trim().length > 0) {
      setSubmittedTicket('SMC-BOT-FILTERED');
      return;
    }

    // 2. Client-side rate limit (60s cooldown between submissions)
    const now = Date.now();
    if (now - lastSubmitTs < 60_000) {
      setRateLimitError('Please wait 60 seconds before submitting another inquiry.');
      return;
    }

    const safeName = sanitizeBrandParam(name, 60);
    if (!safeName || message.trim().length < 5) {
      setRateLimitError('Please provide a valid name and message (minimum 5 characters).');
      return;
    }

    setLastSubmitTs(now);
    const ticketId = `SMC-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketId);
  };

  if (submittedTicket) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-6 text-emerald-950">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          Inquiry Received • Reference Ticket #{submittedTicket}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-emerald-900">
          Thank you, <strong>{sanitizeBrandParam(name, 60) || 'Colleague'}</strong>. Your message regarding{' '}
          <strong>{category}</strong> has been logged for our Clinical Editorial &amp; Engineering Desk (
          <a href="mailto:gainsystemized@gmail.com" className="font-mono font-bold underline">
            gainsystemized@gmail.com
          </a>
          ). A response will be sent to{' '}
          <span className="font-mono underline">{email.slice(0, 80)}</span> within 24 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmittedTicket(null);
            setMessage('');
          }}
          className="mt-4 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
      {/* Hidden Honeypot Trap against automated spam bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url_hp">Website URL (Leave empty)</label>
        <input
          id="website_url_hp"
          name="website_url_hp"
          aria-label="Website URL honeypot - leave empty"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypotWebsite}
          onChange={(e) => setHoneypotWebsite(e.target.value)}
        />
      </div>

      {rateLimitError && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-900">
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <span>{rateLimitError}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700">Your Name</label>
          <input
            id="contact-name"
            aria-label="Your Name"
            type="text"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Jane Doe / Coach Alex"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700">Email Address</label>
          <input
            id="contact-email"
            aria-label="Email Address"
            type="email"
            required
            maxLength={80}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@clinic.com"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-category" className="block text-xs font-bold text-slate-700">Inquiry Category</label>
        <select
          id="contact-category"
          aria-label="Inquiry Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
        >
          <option>Clinical Formula / Research Feedback</option>
          <option>B2B White-Label Coach Partnership</option>
          <option>Advertising &amp; Sponsorship Inquiry</option>
          <option>General Support</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-700">Message (Max 1,500 chars)</label>
        <textarea
          rows={4}
          required
          maxLength={1500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can our clinical engineering team help?"
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-teal-700"
      >
        <Mail className="h-4 w-4" />
        Send Message to Editorial Desk
      </button>
    </form>
  );
}
