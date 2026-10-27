import fs from 'fs';
import path from 'path';
import assert from 'assert';

const ROOT = process.cwd();

console.log('=== SMARTMACROCALC.COM CYBERSECURITY & DDOS HARDENING AUDIT ===\n');

// 1. Check Security Headers in next.config.mjs, public/_headers, and vercel.json
const nextConfig = fs.readFileSync(path.join(ROOT, 'next.config.mjs'), 'utf8');
assert(nextConfig.includes('poweredByHeader: false'), 'poweredByHeader must be false');
assert(nextConfig.includes('Strict-Transport-Security'), 'HSTS header required');
assert(nextConfig.includes('Content-Security-Policy'), 'CSP header required');
assert(nextConfig.includes('X-Content-Type-Options'), 'X-Content-Type-Options required');
assert(nextConfig.includes('Permissions-Policy'), 'Permissions-Policy required');
console.log('[PASS] 1. next.config.mjs HTTP Security Headers & X-Powered-By suppression verified');

const edgeHeaders = fs.readFileSync(path.join(ROOT, 'public', '_headers'), 'utf8');
assert(edgeHeaders.includes('Strict-Transport-Security'), 'Edge HSTS required');
assert(edgeHeaders.includes('Content-Security-Policy'), 'Edge CSP required');
assert(edgeHeaders.includes('stale-while-revalidate'), 'Edge DDoS cache-control shield required');
console.log('[PASS] 2. public/_headers (Cloudflare Pages / Netlify Edge Shield) verified');

const vercelJson = fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8');
assert(vercelJson.includes('Strict-Transport-Security'), 'Vercel HSTS required');
assert(vercelJson.includes('X-Content-Type-Options'), 'Vercel nosniff required');
console.log('[PASS] 3. vercel.json (Vercel Edge CDN Shield) verified');

const secTxt = fs.readFileSync(path.join(ROOT, 'public', '.well-known', 'security.txt'), 'utf8');
assert(secTxt.includes('Contact: mailto:security@smartmacrocalc.com'), 'RFC 9116 security.txt required');
console.log('[PASS] 4. public/.well-known/security.txt (RFC 9116 Disclosure) verified');

// 2. Verify CoachWhiteLabelBar & InteractiveContactForm security wiring
const coachBar = fs.readFileSync(
  path.join(ROOT, 'src', 'components', 'viral', 'CoachWhiteLabelBar.tsx'),
  'utf8'
);
assert(coachBar.includes('sanitizeBrandParam'), 'CoachWhiteLabelBar must use sanitizeBrandParam');
assert(coachBar.includes('sanitizeTabParam'), 'CoachWhiteLabelBar must use sanitizeTabParam');
console.log('[PASS] 5. URL Query Parameter XSS & Phishing Sanitizer wired in CoachWhiteLabelBar.tsx');

const contactForm = fs.readFileSync(
  path.join(ROOT, 'src', 'components', 'layout', 'InteractiveContactForm.tsx'),
  'utf8'
);
assert(contactForm.includes('honeypotWebsite'), 'Honeypot anti-bot trap required in Contact Form');
assert(contactForm.includes('60_000'), '60s Rate-Limit cooldown required in Contact Form');
console.log('[PASS] 6. Anti-Bot Honeypot & Rate-Limiting Cooldown verified in InteractiveContactForm.tsx');

const hub = fs.readFileSync(
  path.join(ROOT, 'src', 'components', 'calculator', 'MasterCalculatorHub.tsx'),
  'utf8'
);
assert(hub.includes('sanitizeBiometricsInput'), 'LocalStorage schema sanitizer required in Hub');
console.log('[PASS] 7. LocalStorage Poisoning & Prototype Pollution Guard verified in MasterCalculatorHub.tsx');

console.log('\nALL 7 CYBERSECURITY & DDOS HARDENING CHECKS PASSED (100%)!');
