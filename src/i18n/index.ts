import type { Lang } from './config';
import type { UI } from './ui/en';
import en from './ui/en';
import hu from './ui/hu';
import de from './ui/de';
import it from './ui/it';
import ro from './ui/ro';
import { sizeAscii, type Towel } from '../data/products';

const DICTS: Record<Lang, UI> = { hu, en, de, it, ro };

export function useTranslations(lang: Lang): UI {
  return DICTS[lang];
}

/** Locale-aware number, e.g. 550 → "550" / "1.000" */
export function fmtNumber(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang).format(n);
}

/** Localized price, e.g. "30 €" (de) / "€30" (en) */
export function priceLabel(amount: number, lang: Lang) {
  return new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(amount);
}

export * from './config';
export type { UI };

/** Weight unit as buyers write it in each market */
export function gsmUnit(lang: Lang) {
  return lang === 'en' ? 'gsm' : 'g/m²';
}

/** SEO alt text, e.g. "Velluto Home white hand towel 50x90 550gsm" / "Velluto Home weißes Handtuch 50x90 550gsm" */
export function towelAlt(lang: Lang, towel: Towel) {
  const t = useTranslations(lang);
  return `Velluto Home ${t.towels.items[towel.id].alt} ${sizeAscii(towel)} ${towel.gsm}gsm`;
}
