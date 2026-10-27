import type { MetadataRoute } from 'next';
import { SEO_PRESETS } from '@/lib/presets';
import { SCIENTIFIC_ARTICLES } from '@/lib/articles';

const BASE_URL = 'https://smartmacrocalc.com';

const LEGAL_PAGES = ['about', 'privacy', 'terms', 'disclaimer', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1. Core Hub Page
  const homeRoute: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 1.0,
  };

  // 2. Programmatic Presets Hub
  const presetsHubRoute: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/presets`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  };

  // 3. 64 Programmatic Preset Pages
  const presetRoutes: MetadataRoute.Sitemap = SEO_PRESETS.map((preset) => ({
    url: `${BASE_URL}/presets/${preset.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. Clinical Research Guides Hub
  const guidesHubRoute: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/guides`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  };

  // 5. 12 Peer-Reviewed Clinical Research Guides
  const guideRoutes: MetadataRoute.Sitemap = SCIENTIFIC_ARTICLES.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 6. 5 Legal Compliance Pages
  const legalRoutes: MetadataRoute.Sitemap = LEGAL_PAGES.map((slug) => ({
    url: `${BASE_URL}/legal/${slug}`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [
    homeRoute,
    presetsHubRoute,
    ...presetRoutes,
    guidesHubRoute,
    ...guideRoutes,
    ...legalRoutes,
  ];
}
