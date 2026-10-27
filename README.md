# Velluto Home – luxus szállodai textil weboldal

Astro + Tailwind CSS v4, **statikus build** Cloudflare Pages-re. 5 nyelv (HU · EN · DE · IT · RO), lokalizált URL-ek, teljes SEO, €30-os mintacsomag-logika B2B/B2C kapcsolati formmal.

Gyártópartner: **KOBE Textil, Honaz (Denizli, TR)** · Szállítás: **Gyergyószentmiklós / Gheorgheni, RO → EU**

---

## 1. Gyors indulás

```bash
npm install
npm run dev        # http://localhost:4321  → átirányít a böngésző nyelvére
npm run build      # → ./dist  (ezt tölti fel a Cloudflare Pages)
npm run preview    # a buildelt oldal helyi megtekintése
```

Node 18.20.8+ szükséges (ajánlott: 22, lásd `.node-version`).

> A `npm run dev` / `preview` alatt a kapcsolati form **nem küld e-mailt**, mert az `/api/contact` egy Cloudflare Pages Function. A form teljes teszteléséhez: `npm run build && npm run pages:dev` (Wrangler, `.dev.vars` fájllal – lásd 4. pont).

---

## 2. URL-struktúra

| Oldal | HU | EN (x-default) | DE | IT | RO |
|---|---|---|---|---|---|
| Főoldal | `/hu/` | `/en/` | `/de/` | `/it/` | `/ro/` |
| Kapcsolat + minta | `/hu/kapcsolat/` | `/en/contact/` | `/de/kontakt/` | `/it/contatti/` | `/ro/contact/` |
| Köszönő (noindex) | `/hu/koszonjuk/` | `/en/thank-you/` | `/de/danke/` | `/it/grazie/` | `/ro/multumim/` |
| *Kollekció (következő lépés)* | `/hu/szallodai-textil/` | `/en/luxury-hotel-textiles/` | `/de/hotelwaesche-luxus/` | `/it/biancheria-alberghiera-lusso/` | `/ro/lenjerie-hotel-lux/` |

- A `/` a böngésző nyelve alapján irányít (hu/de/it/ro, különben `/en/`).
- **Nyelvváltó:** ugyanarra az oldalra visz a másik nyelven, a `?sample=1` paramétert és a `#hash`-t is megtartja.
- Minden útvonal **egyetlen táblából** jön: `src/i18n/config.ts → ROUTES`. Innen generálódik a nyelvváltó, a hreflang, a canonical és a sitemap is.

### Új oldal hozzáadása
1. `ROUTES`-ba új kulcs + 5 slug.
2. `src/i18n/ui/*.ts` → `meta.<kulcs>` (title/description) + tartalom. Az `en.ts` a típus-referencia, ha egy nyelvből hiányzik kulcs, a TypeScript jelez.
3. Render a `src/pages/[lang]/[slug].astro`-ban (vagy saját komponens).

---

## 3. Projektstruktúra

```
src/
  i18n/config.ts          nyelvek, lokalizált slugok, útvonal-helperek
  i18n/ui/{hu,en,de,it,ro}.ts   anyanyelvi szövegek (meta, hero, termékek, form…)
  data/products.ts        törölközők: méret, GSM, SKU, mintacsomag tartalma, €30 ár
  data/site.ts            cégadatok, cím, impresszum  ← [placeholder]-ek cserélendők
  data/schema.ts          JSON-LD: Product (méretenként, GSM-mel) + mintacsomag Offer
  data/images.ts          képek srcset-jei
  layouts/Base.astro      <head>: title, description, canonical, hreflang, OG, Twitter, JSON-LD
  components/             Header, LanguageSwitcher, Flag, Hero, UspBar, SamplePack,
                          TowelCards, TradeSplit, ContactForm, Footer, Icon
  pages/[lang]/index.astro     főoldal × 5
  pages/[lang]/[slug].astro    kapcsolat + köszönő × 5
  pages/sitemap.xml.ts    sitemap hreflang alternate-ekkel
  pages/robots.txt.ts
functions/api/contact.js  Cloudflare Pages Function – form → e-mail (Resend)
public/images/            előre optimalizált WebP képek (placeholder)
public/_headers           biztonsági + cache fejlécek
```

---

## 4. Kapcsolati form és €30-os mintacsomag

**Logika:**
- Minden „Mintacsomag 30 €” gomb ide visz: `/<lang>/<kapcsolat-slug>/?sample=1#form`
  → a „Sample Pack €30” checkbox be van pipálva, az üzenet előre kitöltve, a gomb felirata „Mintacsomag igénylése” (DE: „Anfrage senden”, EN: „Request sample pack”).
- `?type=private` / `?type=business` → előre kiválasztja az ügyféltípust. Magánszemélynél a szállodanév és az adószám mező eltűnik.
- Mezők: Név, Szálloda/cég neve, Ország, Közösségi adószám (formátum-ellenőrzéssel), E-mail, Telefon, Üzenet, Sample Pack €30, adatkezelési hozzájárulás. Spam elleni honeypot mező.
- Sikeres küldés után: `/<lang>/<köszönő-slug>/?sample=1` → mintacsomagnál Enikő személyes üzenete jelenik meg (proforma számla 24 órán belül, szállítással; fizetés után feladás; a 30 € jóváírása az első rendelésnél).
- JavaScript nélkül is működik (sima POST → 303 átirányítás).

**E-mail beállítása (egyszer):**
1. Regisztráció: [resend.com](https://resend.com) → domain (`vellutohome.eu`) hitelesítése → API key.
2. Cloudflare Pages → projekt → **Settings → Variables and Secrets**:
   - `RESEND_API_KEY` (Secret) – kötelező
   - `MAIL_TO` – alapértelmezés: `info@vellutohome.eu`
   - `MAIL_FROM` – alapértelmezés: `Velluto Home Website <web@vellutohome.eu>`
3. Redeploy.

Az e-mail tárgya: `[SAMPLE PACK €30] Hotel Adler – DE (DE, business)`, a válaszcím a megrendelő e-mail-címe.

Helyi teszt: `cp .dev.vars.example .dev.vars` → kulcs beírása → `npm run build && npm run pages:dev`.

---

## 5. Feltöltés Cloudflare Pages-re

### A) Git-integráció (ajánlott)
1. Töltsd fel a projektet egy GitHub/GitLab repóba.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build beállítások:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION = 22`
4. Add meg a 4. pontban leírt változókat → **Save and Deploy**.
5. **Custom domains** → `vellutohome.eu` hozzáadása.

A `functions/` mappát a Cloudflare automatikusan felismeri, így az `/api/contact` külön beállítás nélkül élesedik. Minden más statikus fájl.

### B) Közvetlen feltöltés (Wrangler CLI)
```bash
npx wrangler login
npm run pages:deploy        # build + wrangler pages deploy dist --project-name velluto-home
```

> A Cloudflare dashboardon a drag & drop feltöltés a `functions/` mappát **nem** viszi fel. Ha a formnak is működnie kell, az A) vagy a B) módszert használd.

---

## 6. SEO – mi van benne

- Egyedi `<title>` és `meta description` minden oldalon, minden nyelven (`src/i18n/ui/*.ts → meta`)
- `hreflang` hu/en/de/it/ro + `x-default` (→ `/en/`), `canonical`
- `sitemap.xml` (5 nyelv × indexelhető oldalak, `xhtml:link` alternate-ekkel), `robots.txt`
- Open Graph (+ `og:locale:alternate`) és Twitter Card, `og-default.jpg` (1200×630)
- JSON-LD: `Organization` (Gheorgheni/Gyergyószentmiklós), `Product` minden törölközőméretre (méret, GSM, anyag, OEKO-TEX, gyártó: KOBE Textil), mintacsomag `Product` + `Offer` (30.00 EUR), `BreadcrumbList`
- Oldalanként egy `H1`, logikus `H2`/`H3` hierarchia
- Alt textek minden nyelven, egységes mintával: `Velluto Home weißes Handtuch 50x90 550gsm`
- A köszönőoldal `noindex` (meta + `X-Robots-Tag`), és kimarad a sitemapből

**Élesítés előtt:** a valódi domaint az `astro.config.mjs → site` mezőben kell megadni. Ebből készülnek a canonical, a hreflang, az OG és a sitemap URL-jei.

---

## 7. Élesítés előtti teendők (placeholderek)

- [ ] `src/data/site.ts`: cégnév, cégjegyzékszám, adószám, utca/házszám, telefon
- [ ] `astro.config.mjs → site`: végleges domain
- [ ] `public/images/`: valódi fotók **ugyanazokkal a fájlnevekkel** (`hero-1200/1800/2400.webp`, `towel-50x90-400/800.webp` …, `sample-pack-700/1400.webp`, `og-default.jpg` 1200×630)
- [ ] 70×150-es fürdőlepedő GSM-értéke (most 570 g/m² szerepel – ellenőrizendő)
- [ ] OEKO-TEX tanúsítványszám (ha szerepelnie kell az oldalon)
- [ ] Adatkezelési tájékoztató és ÁSZF oldal (a form hozzájárulási szövege ezekre hivatkozhat)
- [ ] Resend API key a Cloudflare-ben

## 8. Következő lépések

- Kollekcióoldalak (slugok már lefoglalva): törölköző · satin stripe ágynemű · szállodai drapéria/függöny
- Rólunk / Gyártás (KOBE Textil Honaz)
- Opcionálisan Cloudflare Turnstile a formra
