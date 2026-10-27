import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly allow AI Search Engines & Retrieval Agents for Generative Engine Optimization (GEO)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'Omgilibot',
          'Diffbot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://smartmacrocalc.com/sitemap.xml',
    host: 'https://smartmacrocalc.com',
  };
}
