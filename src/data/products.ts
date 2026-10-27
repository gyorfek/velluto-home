/**
 * Velluto Home towel collection – technical data (language-independent).
 * Names, descriptions and alt texts live in src/i18n/ui/<lang>.ts under `towels.items`.
 */

export const MANUFACTURER = {
  name: 'KOBE Textil',
  location: 'Honaz, Denizli',
  country: 'TR',
} as const;

export const SAMPLE_PACK = {
  price: 30,
  currency: 'EUR',
  /** Towel ids included in the sample pack, in display order */
  items: ['hand', 'bath', 'mat', 'guest'] as const,
} as const;

export type TowelId = 'guest' | 'hand' | 'bath' | 'mat' | 'sheet';

export interface Towel {
  id: TowelId;
  sku: string;
  widthCm: number;
  lengthCm: number;
  gsm: number;
  /** Optional sizes are shown as "on request" */
  optional?: boolean;
  image: string;
}

export const TOWELS: Towel[] = [
  { id: 'guest', sku: 'VH-T-3030', widthCm: 30, lengthCm: 30, gsm: 550, image: 'towel-30x30' },
  { id: 'hand', sku: 'VH-T-5090', widthCm: 50, lengthCm: 90, gsm: 550, image: 'towel-50x90' },
  { id: 'bath', sku: 'VH-T-70140', widthCm: 70, lengthCm: 140, gsm: 550, image: 'towel-70x140' },
  { id: 'mat', sku: 'VH-M-5080', widthCm: 50, lengthCm: 80, gsm: 800, image: 'bathmat-50x80' },
  { id: 'sheet', sku: 'VH-T-70150', widthCm: 70, lengthCm: 150, gsm: 570, optional: true, image: 'towel-70x150' },
];

export const size = (t: Towel) => `${t.widthCm}×${t.lengthCm}`;
/** ASCII size for alt texts / SKUs, e.g. 50x90 */
export const sizeAscii = (t: Towel) => `${t.widthCm}x${t.lengthCm}`;
export const towelById = (id: TowelId) => TOWELS.find((t) => t.id === id)!;
