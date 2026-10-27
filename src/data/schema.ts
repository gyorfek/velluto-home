/** JSON-LD builders (Organization + BreadcrumbList live in layouts/Base.astro). */
import { pathFor, type Lang } from '../i18n/config';
import { useTranslations, gsmUnit } from '../i18n';
import { TOWELS, SAMPLE_PACK, MANUFACTURER, towelById, size } from './products';

type Abs = (path: string) => string;

const brand = { '@type': 'Brand', name: 'Velluto Home' };
const manufacturer = {
  '@type': 'Organization',
  name: MANUFACTURER.name,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Honaz',
    addressRegion: 'Denizli',
    addressCountry: MANUFACTURER.country,
  },
};

/** One Product per towel size, with GSM + dimensions as structured properties. */
export function towelProductsLd(lang: Lang, abs: Abs) {
  const t = useTranslations(lang);
  return TOWELS.map((towel) => {
    const copy = t.towels.items[towel.id];
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': abs(`${pathFor('home', lang)}#${towel.sku}`),
      name: `Velluto Home ${copy.name} ${size(towel)} cm ${towel.gsm} ${gsmUnit(lang)}`,
      description: `${copy.use} ${t.towels.material}, OEKO-TEX® Standard 100.`,
      sku: towel.sku,
      image: abs(`/images/${towel.image}-800.webp`),
      url: abs(`${pathFor('home', lang)}#towels`),
      brand,
      manufacturer,
      color: 'White',
      material: '100% combed long-staple cotton',
      width: { '@type': 'QuantitativeValue', value: towel.widthCm, unitCode: 'CMT' },
      depth: { '@type': 'QuantitativeValue', value: towel.lengthCm, unitCode: 'CMT' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Fabric weight', value: towel.gsm, unitText: 'g/m²' },
        { '@type': 'PropertyValue', name: 'Certification', value: 'OEKO-TEX Standard 100' },
        { '@type': 'PropertyValue', name: 'Border', value: 'Double border' },
      ],
    };
  });
}

/** The €30 sample pack – the only item with a public price. */
export function samplePackLd(lang: Lang, abs: Abs) {
  const t = useTranslations(lang);
  const parts = SAMPLE_PACK.items.map(towelById);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': abs(`${pathFor('home', lang)}#sample-pack`),
    name: `Velluto Home – ${t.sample.eyebrow}`,
    description: `${t.sample.price}. ${parts.map((p) => `${t.towels.items[p.id].name} ${size(p)} cm ${p.gsm} ${gsmUnit(lang)}`).join(', ')}.`,
    sku: 'VH-SAMPLE-30',
    image: abs('/images/sample-pack-1400.webp'),
    brand,
    manufacturer,
    isRelatedTo: parts.map((p) => ({ '@id': abs(`${pathFor('home', lang)}#${p.sku}`) })),
    offers: {
      '@type': 'Offer',
      price: SAMPLE_PACK.price.toFixed(2),
      priceCurrency: SAMPLE_PACK.currency,
      availability: 'https://schema.org/InStock',
      url: abs(`${pathFor('contact', lang)}?sample=1`),
      seller: { '@id': abs('/#organization') },
      eligibleRegion: { '@type': 'Place', name: 'European Union' },
    },
  };
}
