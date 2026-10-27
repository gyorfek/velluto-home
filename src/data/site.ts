/** Company data – replace the [placeholders] before go-live. */
export const SITE = {
  brand: 'Velluto Home',
  email: 'info@vellutohome.eu',
  phone: '+40 000 000 000', // [placeholder]
  legalName: 'Velluto Home S.R.L.', // [placeholder – exact legal entity]
  regNo: 'J19/0000/2026', // [placeholder]
  vatId: 'RO00000000', // [placeholder]
  address: {
    street: '[Street name, No.]', // [placeholder]
    postalCode: '535500',
    locality: 'Gheorgheni',
    localityHu: 'Gyergyószentmiklós',
    region: 'Harghita',
    countryCode: 'RO',
  },
  ogImage: '/images/og-default.jpg',
  twitter: '', // e.g. '@vellutohome' – leave empty if there is no account
} as const;

/** Display name of the dispatch town per language */
export const TOWN: Record<'hu' | 'en' | 'de' | 'it' | 'ro', string> = {
  hu: 'Gyergyószentmiklós',
  en: 'Gheorgheni (Gyergyószentmiklós)',
  de: 'Gheorgheni (Gyergyószentmiklós)',
  it: 'Gheorgheni (Gyergyószentmiklós)',
  ro: 'Gheorgheni',
};
