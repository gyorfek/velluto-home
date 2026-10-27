/**
 * Cloudflare Pages Function – POST /api/contact
 *
 * Receives the enquiry / €30 sample pack form and e-mails it to the sales inbox
 * via the Resend API (https://resend.com – free tier is plenty for a contact form).
 *
 * Environment variables (Cloudflare dashboard → Pages project → Settings → Variables and Secrets):
 *   RESEND_API_KEY  (secret, required)  – Resend API key
 *   MAIL_TO         (optional)          – default: info@vellutohome.eu
 *   MAIL_FROM       (optional)          – default: "Velluto Home Website <web@vellutohome.eu>"
 *                                         (the domain must be verified in Resend)
 *
 * The static site stays 100 % static – only this one endpoint runs as a Function.
 */

const LANGS = ['hu', 'en', 'de', 'it', 'ro'];
const THANKS_RE = /^\/(hu|en|de|it|ro)\/[a-z-]+\/$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VAT_RE = /^[A-Z]{2}[0-9A-Z+*]{2,13}$/;

const clean = (v, max = 500) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim()
    .slice(0, max);

const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function reply(request, { ok, error, redirect, status = 200 }) {
  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify({ ok, error, redirect }), {
      status: ok ? 200 : status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  if (ok && redirect) return Response.redirect(new URL(redirect, request.url).href, 303);
  return new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Velluto Home</title><body style="font-family:system-ui;background:#f5f1eb;padding:3rem;max-width:40rem;margin:auto">
<h1 style="font-family:Georgia,serif;font-weight:400">Velluto Home</h1>
<p>${esc(error || 'Error')}</p><p><a href="mailto:info@vellutohome.eu">info@vellutohome.eu</a> · <a href="javascript:history.back()">←</a></p>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return reply(request, { ok: false, error: 'Invalid form data.', status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing
  if (clean(form.get('website'))) {
    return reply(request, { ok: true, redirect: '/en/thank-you/' });
  }

  const lang = LANGS.includes(form.get('lang')) ? form.get('lang') : 'en';
  const customerType = form.get('customer_type') === 'private' ? 'private' : 'business';
  const data = {
    name: clean(form.get('name'), 120),
    company: customerType === 'business' ? clean(form.get('company'), 160) : '',
    country: clean(form.get('country'), 10).toUpperCase(),
    vat: customerType === 'business' ? clean(form.get('vat'), 20).toUpperCase().replace(/[\s.\-]/g, '') : '',
    email: clean(form.get('email'), 160),
    phone: clean(form.get('phone'), 40),
    message: clean(form.get('message'), 4000),
    samplePack: form.get('sample_pack') === 'Sample Pack €30',
    consent: form.get('consent') === 'yes',
  };

  // Validation (mirrors the client-side rules)
  const missing = [];
  if (!data.name) missing.push('name');
  if (customerType === 'business' && !data.company) missing.push('company');
  if (!data.country) missing.push('country');
  if (!EMAIL_RE.test(data.email)) missing.push('email');
  if (data.vat && !VAT_RE.test(data.vat)) missing.push('vat');
  if (!data.consent) missing.push('consent');
  if (missing.length) {
    return reply(request, { ok: false, error: `Please check: ${missing.join(', ')}`, status: 422 });
  }

  const thanksRaw = clean(form.get('thanks'), 80);
  const thanks = (THANKS_RE.test(thanksRaw) ? thanksRaw : `/${lang}/`) + (data.samplePack ? '?sample=1' : '');

  if (!env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set – enquiry NOT delivered', data);
    return reply(request, { ok: false, error: 'Mail service not configured.', status: 503 });
  }

  const tag = data.samplePack ? '[SAMPLE PACK €30]' : '[Enquiry]';
  const who = data.company || data.name;
  const subject = `${tag} ${who} – ${data.country} (${lang.toUpperCase()}, ${customerType})`;

  const rows = [
    ['Sample Pack €30', data.samplePack ? 'YES – send pro forma invoice within 24 h (€30 + shipping, credited on first order)' : 'no'],
    ['Customer type', customerType],
    ['Name', data.name],
    ['Hotel / company', data.company],
    ['Country', data.country],
    ['VAT ID', data.vat],
    ['E-mail', data.email],
    ['Phone', data.phone],
    ['Language', lang.toUpperCase()],
    ['Message', data.message],
  ].filter(([, v]) => v);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="8" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><th align="left" valign="top" style="border-bottom:1px solid #eee;color:#8a7a64">${esc(k)}</th><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join('\n')}
</table>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM || 'Velluto Home Website <web@vellutohome.eu>',
      to: [env.MAIL_TO || 'info@vellutohome.eu'],
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Resend error', res.status, await res.text());
    return reply(request, { ok: false, error: 'Mail delivery failed.', status: 502 });
  }

  return reply(request, { ok: true, redirect: thanks });
}
