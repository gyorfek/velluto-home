/**
 * English dictionary – also the reference shape (type `UI`) for every other language.
 * Copy is written per market, not translated line by line.
 */
const en = {
  meta: {
    home: {
      title: 'Luxury Hotel Towels 550 gsm | Velluto Home – KOBE Textil Honaz',
      description:
        'Snow-white 5-star hotel towels in 100% combed long-staple cotton, 550–800 gsm, OEKO-TEX Standard 100. Woven by KOBE Textil, Honaz. €30 sample pack, deductible.',
    },
    contact: {
      title: 'Trade Enquiries & €30 Sample Pack | Velluto Home',
      description:
        'Request a trade quote or order the €30 hotel towel sample pack – deductible from your first order. EU delivery from Gheorgheni, Romania.',
    },
    thanks: {
      title: 'Thank You | Velluto Home',
      description: 'Your request has reached Velluto Home. We will reply personally by e-mail.',
    },
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Menu',
    language: 'Choose language',
    home: 'Velluto Home – homepage',
  },
  nav: {
    towels: 'Towels',
    sample: 'Sample pack',
    trade: 'Hotels & homes',
    contact: 'Contact',
    headerCta: '€30 sample pack',
  },
  breadcrumb: { home: 'Home' },
  hero: {
    eyebrow: 'Velluto Home · White Collection',
    title: 'Luxury is in the details',
    lead: 'Hotel-grade towels in 550–570 gsm, woven by KOBE Textil in Honaz from 100% combed long-staple cotton. Supplied direct to hotels across Europe – and to homes that expect the same.',
    ctaPrimary: 'Request the €30 sample pack',
    ctaPrimaryNote: 'Deductible from your first order',
    ctaSecondary: 'View the collection',
    imageAlt: 'Velluto Home white hotel towels 550gsm folded on a made bed in a luxury hotel room',
    stats: [
      { value: '550–800', label: 'gsm' },
      { value: '100%', label: 'combed cotton' },
      { value: 'OEKO-TEX®', label: 'Standard 100' },
    ],
  },
  usp: {
    title: 'Why Velluto Home',
    items: [
      {
        title: 'Woven by KOBE Textil',
        text: 'Our manufacturing partner in Honaz, Denizli – the heart of Turkish towel weaving – makes every piece.',
      },
      {
        title: 'OEKO-TEX® Standard 100',
        text: 'Tested for harmful substances. Safe on skin, guest after guest.',
      },
      {
        title: '100% combed long-staple cotton',
        text: 'Long fibres, combed clean: softer loops, less lint, a longer life in the laundry.',
      },
      {
        title: 'EU delivery from Gheorgheni',
        text: 'Dispatched from Gheorgheni (Gyergyószentmiklós), Romania – inside the EU, no customs paperwork.',
      },
    ],
  },
  towels: {
    eyebrow: 'The towel collection',
    title: 'Four sizes. One standard.',
    intro:
      'Snow-white terry with a classic double border, built for commercial laundries and five-star housekeeping. It stays white, wash after wash.',
    weight: 'Weight',
    sizeLabel: 'Size',
    material: '100% cotton',
    optional: 'On request',
    inSample: 'In the sample pack',
    features: ['Double border', 'OEKO-TEX® Standard 100', 'Stays snow-white after washing'],
    items: {
      guest: { name: 'Guest Towel', use: 'A face cloth for the basin and the welcome tray.', alt: 'white guest towel' },
      hand: { name: 'Hand Towel', use: 'The everyday essential of every hotel bathroom.', alt: 'white hand towel' },
      bath: {
        name: 'Bath Towel',
        use: 'A generous 70 × 140 cm – one size up from the usual 70 × 130.',
        alt: 'white bath towel',
      },
      mat: { name: 'Bath Mat', use: 'Dense 800 gsm terry that lies flat and stays in place.', alt: 'white bath mat' },
      sheet: { name: 'Bath Sheet', use: 'Extra length for spa and suites.', alt: 'white bath sheet' },
    },
    optionalNote: 'Also available: 70 × 150 cm Bath Sheet, on request.',
  },
  sample: {
    eyebrow: 'Sample pack',
    title: 'Feel it before you order',
    price: 'Sample Pack for €30 – deductible from your first order',
    lead: 'Four pieces from the White Collection, sent to your door. Wash them, run them through your laundry, hand them to your housekeeping team. When you place your first order, we credit the €30 in full.',
    contentsTitle: 'In the box',
    cta: 'Order the sample pack for €30',
    trust: ['OEKO-TEX® Standard 100', 'EU delivery from Gheorgheni, Romania', 'Proper EU invoice – VAT ID welcome'],
    fine: 'Within 24 hours we e-mail you a pro forma invoice, shipping included.',
    imageAlt: 'Velluto Home sample pack: four white hotel towels 550–800gsm, tied with a ribbon',
  },
  trade: {
    eyebrow: 'Hotels & homes',
    title: 'Two ways to buy',
    hotel: {
      title: 'For hotels & hospitality',
      text: 'Manufacturer-direct pricing and quotes built around your room count, sizes and delivery schedule.',
      cta: 'Request a trade quote',
    },
    home: {
      title: 'For your home',
      text: 'The very towels our hotel clients buy – same weight, same white. Ask us for a home set.',
      cta: 'Ask about home orders',
    },
  },
  contact: {
    eyebrow: 'Trade enquiries & sample pack',
    title: 'Talk to Velluto Home',
    lead: 'Tell us about your property and what you need. Every request is answered personally.',
    typeLegend: "I'm enquiring as",
    typeBusiness: 'Hotel / business',
    typePrivate: 'Private customer',
    name: 'Full name',
    company: 'Hotel / company name',
    country: 'Country',
    countrySelect: 'Select a country',
    countryOther: 'Other country',
    vat: 'VAT ID',
    vatHint: 'EU VAT ID, e.g. DE123456789',
    vatInvalid: 'Please check the format, e.g. DE123456789.',
    email: 'E-mail',
    phone: 'Phone',
    message: 'Message',
    messagePlaceholder: 'Room count, sizes, quantities, preferred delivery date…',
    optional: 'optional',
    sampleLabel: 'Sample Pack €30',
    sampleText: 'Please send me the sample pack – the €30 is credited against my first order.',
    sampleSummary: 'Your sample pack contains',
    samplePrefill:
      'We would like to order the €30 Sample Pack (Hand Towel 50×90, Bath Towel 70×140, Bath Mat 50×80, Guest Towel 30×30).',
    consent:
      'I agree that Velluto Home uses my details to answer this request. They are never passed on to third parties.',
    submit: 'Send enquiry',
    submitSample: 'Request sample pack',
    sending: 'Sending…',
    error: 'Something went wrong and your request was not sent. Please try again, or e-mail us at',
    asideTitle: 'Prefer e-mail?',
    asideText: 'Write to us directly – please include your property name and country.',
    asideDispatch: 'Dispatch',
  },
  thanks: {
    title: 'Thank you – your request has arrived',
    lead: 'We\'ve received your message and will reply personally by e-mail.',
    /** Shown instead of title + lead after a sample pack request (?sample=1) */
    sampleTitle: 'Thank you!',
    sampleMessage:
      'We\'ve received your request for the sample pack (4 towels). I\'ll e-mail you a pro forma invoice within 24 hours, shipping included. As soon as it\'s paid, we\'ll dispatch your pack. The €30 will be credited against your first order.',
    signatureName: 'Enikő',
    signatureCompany: 'Velluto Home',
    back: 'Back to the homepage',
    collection: 'View the towel collection',
  },
  footer: {
    tagline: 'White hotel textiles, woven by KOBE Textil in Honaz and shipped across the EU from Gheorgheni.',
    contact: 'Contact',
    imprint: 'Imprint',
    company: 'Company',
    regNo: 'Reg. no.',
    vatNo: 'VAT ID',
    manufacturer: 'Manufacturing partner',
    languages: 'Languages',
    rights: 'All rights reserved.',
    country: 'Romania',
  },
};

export type UI = typeof en;
export default en;
