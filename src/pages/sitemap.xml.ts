/**
 * sitemap.xml – every indexable page in all 5 languages, each <url> with
 * xhtml:link alternates (hreflang) incl. x-default. Built at compile time.
 */
import type { APIRoute } from 'astro';
import { LANGS, ROUTES, DEFAULT_LANG, alternatesFor, type RouteKey } from '../i18n/config';

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = (Object.keys(ROUTES) as RouteKey[])
    .filter((key) => ROUTES[key].indexable)
    .flatMap((key) => {
      const alt = alternatesFor(key);
      const links = [
        ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(alt[l])}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(alt[DEFAULT_LANG])}"/>`,
      ].join('\n');
      return LANGS.map(
        (l) => `  <url>
    <loc>${abs(alt[l])}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${key === 'home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${key === 'home' ? '1.0' : '0.8'}</priority>
${links}
  </url>`,
      );
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
