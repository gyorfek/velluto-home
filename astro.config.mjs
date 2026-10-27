// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Production domain – change once the real domain is live.
// Used for canonical, hreflang, Open Graph and sitemap URLs.
export const SITE_URL = 'https://vellutohome.eu';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // Cloudflare Pages serves /de/kontakt/ as /de/kontakt/index.html.
  // Every internal link ends with a slash, so there is no redirect hop.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Routing per language is handled in src/i18n/config.ts and
  // src/pages/[lang]/ (localized slugs per language, see README).
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
