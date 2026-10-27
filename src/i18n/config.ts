/**
 * Language + route configuration.
 *
 * Every page has a stable internal key (`home`, `collection`, `contact`, …)
 * and a localized slug per language. The language switcher, hreflang tags,
 * canonical URLs and sitemap are all generated from this one table, so a new
 * page only needs to be added here (plus its content in the dictionaries).
 */

export const LANGS = ['hu', 'en', 'de', 'it', 'ro'] as const;
export type Lang = (typeof LANGS)[number];

/** x-default + fallback language */
export const DEFAULT_LANG: Lang = 'en';

export const LANG_META: Record<Lang, { label: string; name: string; locale: string; ogLocale: string }> = {
  hu: { label: 'HU', name: 'Magyar', locale: 'hu-HU', ogLocale: 'hu_HU' },
  en: { label: 'EN', name: 'English', locale: 'en-GB', ogLocale: 'en_GB' },
  de: { label: 'DE', name: 'Deutsch', locale: 'de-DE', ogLocale: 'de_DE' },
  it: { label: 'IT', name: 'Italiano', locale: 'it-IT', ogLocale: 'it_IT' },
  ro: { label: 'RO', name: 'Română', locale: 'ro-RO', ogLocale: 'ro_RO' },
};

/**
 * Localized slugs. `''` = language root (/de/).
 * `indexable: false` pages get noindex and are left out of the sitemap.
 */
export const ROUTES = {
  home: {
    indexable: true,
    slugs: { hu: '', en: '', de: '', it: '', ro: '' },
  },
  contact: {
    indexable: true,
    slugs: { hu: 'kapcsolat', en: 'contact', de: 'kontakt', it: 'contatti', ro: 'contact' },
  },
  thanks: {
    indexable: false,
    slugs: { hu: 'koszonjuk', en: 'thank-you', de: 'danke', it: 'grazie', ro: 'multumim' },
  },
  // Next step – collection landing pages (slugs reserved, page not built yet):
  // collection: { hu: 'szallodai-textil', en: 'luxury-hotel-textiles', de: 'hotelwaesche-luxus',
  //               it: 'biancheria-alberghiera-lusso', ro: 'lenjerie-hotel-lux' }
} as const satisfies Record<string, { indexable: boolean; slugs: Record<Lang, string> }>;

export type RouteKey = keyof typeof ROUTES;

/** Relative path with trailing slash, e.g. /de/kontakt/ */
export function pathFor(route: RouteKey, lang: Lang): string {
  const slug = ROUTES[route].slugs[lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

/** All language versions of one page: { hu: '/hu/kapcsolat/', … } */
export function alternatesFor(route: RouteKey): Record<Lang, string> {
  return Object.fromEntries(LANGS.map((l) => [l, pathFor(route, l)])) as Record<Lang, string>;
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

/** Non-home routes as static paths for src/pages/[lang]/[slug].astro */
export function slugPaths() {
  return LANGS.flatMap((lang) =>
    (Object.keys(ROUTES) as RouteKey[])
      .filter((key) => key !== 'home')
      .map((key) => ({ params: { lang, slug: ROUTES[key].slugs[lang] }, props: { route: key } })),
  );
}
