/**
 * Renders one site.json into a complete, self-contained HTML page.
 *
 * Constraints that shaped this file:
 *  - No build step, no framework, no CDN JS. GitHub Pages serves it flat, and a
 *    demo that loads instantly on a mid-range Android over 4G is the whole pitch.
 *  - Everything inlined except Google Fonts, so a page is one request plus images.
 *  - Demo pages are noindex by default. Publishing a copy of a real business that
 *    competes with them in search would be a genuine harm, not a portfolio piece.
 */

const FONTS = {
  inter:     { head: 'Inter:wght@400;500;600;700', body: 'Inter', display: 'Inter', stack: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif" },
  manrope:   { head: 'Manrope:wght@400;600;800',   body: 'Manrope', display: 'Manrope', stack: "'Manrope', system-ui, sans-serif" },
  playfair:  { head: 'Playfair+Display:wght@600;700&family=Inter:wght@400;500;600', body: 'Inter', display: 'Playfair Display', stack: "'Inter', system-ui, sans-serif" },
  cormorant: { head: 'Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600', body: 'Inter', display: 'Cormorant Garamond', stack: "'Inter', system-ui, sans-serif" },
};

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const attr = (s = '') => esc(s);

function waLink(number, text) {
  const digits = String(number || '').replace(/\D/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}${text ? '?text=' + encodeURIComponent(text) : ''}`;
}

function telLink(phone) {
  const digits = String(phone || '').replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '';
}

/** Perceived-brightness pick so text on the brand colour is always readable. */
function readableOn(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
  if (!m) return '#ffffff';
  const [r, g, b] = m.slice(1).map((h) => parseInt(h, 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#111111' : '#ffffff';
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
}

// ---------------------------------------------------------------- sections

function navSection(s, ids) {
  const links = ids.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('');
  return `
  <header class="nav" id="top">
    <a class="brand" href="#top">
      <span class="brand-mark">${esc(initials(s.business.name))}</span>
      <span class="brand-name">${esc(s.business.name)}</span>
    </a>
    <nav class="nav-links">${links}</nav>
    ${s.contact.phone ? `<a class="btn btn-ghost nav-call" href="${attr(telLink(s.contact.phone))}">Call</a>` : ''}
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </header>`;
}

function heroSection(s) {
  const hero = s.gallery?.[0]?.src;
  const wa = waLink(s.whatsapp?.number, s.whatsapp?.prefill);
  const rating = Number(s.business.rating) || 0;
  return `
  <section class="hero${hero ? ' has-image' : ''}">
    ${hero ? `<img class="hero-bg" src="${attr(hero)}" alt="" loading="eager" fetchpriority="high">` : ''}
    <div class="hero-inner">
      ${s.business.category ? `<p class="eyebrow">${esc(s.business.category)}${s.contact.area ? ' · ' + esc(s.contact.area) : ''}</p>` : ''}
      <h1>${esc(s.business.name)}</h1>
      ${s.business.tagline ? `<p class="lede">${esc(s.business.tagline)}</p>` : ''}
      ${rating ? `<p class="rating"><span class="stars" aria-hidden="true">${'★'.repeat(Math.round(rating))}</span>
        <strong>${esc(s.business.rating)}</strong> from ${esc(s.business.review_count || '')} Google reviews</p>` : ''}
      <div class="hero-cta">
        ${wa ? `<a class="btn btn-wa" href="${attr(wa)}" target="_blank" rel="noopener">${waIcon()}${esc(s.whatsapp.label || 'WhatsApp us')}</a>` : ''}
        ${s.contact.phone ? `<a class="btn btn-solid" href="${attr(telLink(s.contact.phone))}">Call ${esc(s.contact.phone)}</a>` : ''}
        ${s.contact.maps_url ? `<a class="btn btn-ghost" href="${attr(s.contact.maps_url)}" target="_blank" rel="noopener">Directions</a>` : ''}
      </div>
    </div>
  </section>`;
}

function aboutSection(s) {
  if (!s.business.about) return '';
  return `
  <section class="section" id="about">
    <div class="section-head"><h2>About us</h2></div>
    <p class="prose">${esc(s.business.about)}</p>
  </section>`;
}

function servicesSection(s) {
  const items = (s.services || []).filter((x) => x.title);
  if (!items.length) return '';
  const cards = items.map((x) => `
      <article class="card">
        <h3>${esc(x.title)}</h3>
        ${x.description ? `<p>${esc(x.description)}</p>` : ''}
        ${x.price ? `<p class="price">${esc(x.price)}</p>` : ''}
      </article>`).join('');
  return `
  <section class="section" id="services">
    <div class="section-head"><h2>What we do</h2></div>
    <div class="grid">${cards}</div>
  </section>`;
}

function gallerySection(s) {
  const imgs = (s.gallery || []).slice(1);
  if (!imgs.length) return '';
  const tiles = imgs.map((g, i) => `
      <figure><img src="${attr(g.src)}" alt="${attr(g.alt || s.business.name + ' photo ' + (i + 2))}" loading="lazy" decoding="async"></figure>`).join('');
  return `
  <section class="section" id="gallery">
    <div class="section-head"><h2>Gallery</h2></div>
    <div class="gallery">${tiles}</div>
  </section>`;
}

function reviewsSection(s) {
  const items = (s.reviews || []).filter((r) => r.text);
  if (!items.length) return '';
  const cards = items.map((r) => `
      <blockquote class="review">
        <p class="stars" aria-label="${attr(r.rating + ' out of 5')}">${'★'.repeat(Math.round(r.rating || 5))}</p>
        <p>${esc(r.text)}</p>
        <footer>— ${esc(r.author)}${r.source ? `, ${esc(r.source)}` : ''}</footer>
      </blockquote>`).join('');
  return `
  <section class="section tinted" id="reviews">
    <div class="section-head"><h2>What customers say</h2></div>
    <div class="grid">${cards}</div>
  </section>`;
}

function contactSection(s) {
  const wa = waLink(s.whatsapp?.number, s.whatsapp?.prefill);
  const hours = (s.hours || []).map((h) => `<li>${esc(h)}</li>`).join('');
  const socials = Object.entries(s.socials || {})
    .map(([k, v]) => `<a href="${attr(v)}" target="_blank" rel="noopener">${esc(k[0].toUpperCase() + k.slice(1))}</a>`)
    .join('');
  return `
  <section class="section" id="contact">
    <div class="section-head"><h2>Visit or get in touch</h2></div>
    <div class="contact-grid">
      <div>
        ${s.contact.address ? `<p class="prose">${esc(s.contact.address)}</p>` : ''}
        <div class="contact-actions">
          ${wa ? `<a class="btn btn-wa" href="${attr(wa)}" target="_blank" rel="noopener">${waIcon()}${esc(s.whatsapp.label || 'WhatsApp us')}</a>` : ''}
          ${s.contact.phone ? `<a class="btn btn-solid" href="${attr(telLink(s.contact.phone))}">${esc(s.contact.phone)}</a>` : ''}
          ${s.contact.email ? `<a class="btn btn-ghost" href="mailto:${attr(s.contact.email)}">${esc(s.contact.email)}</a>` : ''}
          ${s.contact.maps_url ? `<a class="btn btn-ghost" href="${attr(s.contact.maps_url)}" target="_blank" rel="noopener">Open in Google Maps</a>` : ''}
        </div>
        ${socials ? `<div class="socials">${socials}</div>` : ''}
      </div>
      ${hours ? `<div class="hours"><h3>Opening hours</h3><ul>${hours}</ul></div>` : ''}
    </div>
  </section>`;
}

function waIcon() {
  return `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2s-.7 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7.2 3.9z"/></svg>`;
}

function floatButton(s) {
  const wa = waLink(s.whatsapp?.number, s.whatsapp?.prefill);
  if (!wa || s.whatsapp?.float === false) return '';
  return `
  <a class="wa-float" href="${attr(wa)}" target="_blank" rel="noopener" aria-label="${attr(s.whatsapp.label || 'Chat on WhatsApp')}">
    ${waIcon()}<span>${esc(s.whatsapp.label || 'WhatsApp')}</span>
  </a>`;
}

function jsonLd(s) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: s.business.name,
    description: s.business.about || undefined,
    telephone: s.contact.phone || undefined,
    email: s.contact.email || undefined,
    address: s.contact.address ? { '@type': 'PostalAddress', streetAddress: s.contact.address, addressLocality: s.contact.city || undefined } : undefined,
    geo: s.contact.lat && s.contact.lng ? { '@type': 'GeoCoordinates', latitude: s.contact.lat, longitude: s.contact.lng } : undefined,
    openingHours: (s.hours || []).length ? s.hours : undefined,
    aggregateRating: Number(s.business.rating) ? { '@type': 'AggregateRating', ratingValue: s.business.rating, reviewCount: s.business.review_count || '1' } : undefined,
    sameAs: Object.values(s.socials || {}),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

// ---------------------------------------------------------------- styles

function styles(s) {
  const font = FONTS[s.theme?.font] || FONTS.inter;
  const primary = s.theme?.primary || '#123a5c';
  const accent = s.theme?.accent || '#e08a3c';
  return `
:root{
  --primary:${primary}; --on-primary:${readableOn(primary)};
  --accent:${accent};   --on-accent:${readableOn(accent)};
  --bg:#ffffff; --surface:#f6f7f9; --text:#14181d; --muted:#5b6672; --line:#e3e7ec;
  --wa:#25d366; --radius:14px; --max:1080px;
  --font-body:${font.stack}; --font-display:'${font.display}', ${font.stack};
}
:root:not([data-theme="light"]){}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#0e1116; --surface:#171c23; --text:#e8ecf1; --muted:#9aa6b3; --line:#28303a;
  }
}
:root[data-theme="dark"]{
  --bg:#0e1116; --surface:#171c23; --text:#e8ecf1; --muted:#9aa6b3; --line:#28303a;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body);
  font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
h1,h2,h3{font-family:var(--font-display);line-height:1.15;margin:0 0 .4em;letter-spacing:-.01em}
h1{font-size:clamp(2rem,6vw,3.4rem)}
h2{font-size:clamp(1.5rem,3.6vw,2.1rem)}
a{color:inherit}

/* nav */
.nav{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:1rem;
  padding:.7rem clamp(1rem,4vw,2rem);background:color-mix(in srgb,var(--bg) 88%,transparent);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;font-weight:700;margin-right:auto}
.brand-mark{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;
  background:var(--primary);color:var(--on-primary);font-size:.85rem;letter-spacing:.02em}
.brand-name{font-family:var(--font-display);font-size:1.05rem}
.nav-links{display:flex;gap:1.3rem;font-size:.95rem}
.nav-links a{text-decoration:none;color:var(--muted)}
.nav-links a:hover{color:var(--text)}
.nav-toggle{display:none;background:none;border:0;padding:.4rem;cursor:pointer}
.nav-toggle span{display:block;width:22px;height:2px;background:var(--text);margin:4px 0;border-radius:2px}

/* hero */
.hero{position:relative;display:grid;place-items:center;text-align:center;
  padding:clamp(3.5rem,11vw,7rem) clamp(1rem,5vw,2rem);overflow:hidden}
.hero.has-image{color:#fff;min-height:min(78vh,640px)}
.hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.hero.has-image::after{content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 72%,transparent),
  color-mix(in srgb,#000 78%,transparent))}
.hero-inner{max-width:44rem;position:relative}
.eyebrow{text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;font-weight:600;
  margin:0 0 .8rem;opacity:.85}
.lede{font-size:clamp(1.05rem,2.2vw,1.25rem);opacity:.92;margin:.2rem 0 1.2rem}
.rating{font-size:.95rem;opacity:.9;margin:0 0 1.6rem}
.stars{color:var(--accent);letter-spacing:.08em}
.hero-cta{display:flex;flex-wrap:wrap;gap:.7rem;justify-content:center}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.25rem;border-radius:999px;
  text-decoration:none;font-weight:600;font-size:.95rem;border:1.5px solid transparent;
  transition:transform .15s ease,opacity .15s ease}
.btn:hover{transform:translateY(-1px)}
.btn-solid{background:var(--primary);color:var(--on-primary)}
.btn-ghost{border-color:currentColor;opacity:.9}
.btn-wa{background:var(--wa);color:#04240f}
.nav-call{padding:.45rem 1rem;font-size:.9rem}

/* sections */
.section{max-width:var(--max);margin:0 auto;padding:clamp(3rem,7vw,5rem) clamp(1rem,5vw,2rem)}
.section.tinted{max-width:none;background:var(--surface)}
.section.tinted>*{max-width:var(--max);margin-inline:auto}
.section-head{margin-bottom:1.8rem}
.prose{color:var(--muted);max-width:60ch;font-size:1.05rem}
.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.card{background:var(--bg);border:1px solid var(--line);border-radius:var(--radius);padding:1.4rem}
.card h3{font-size:1.1rem;margin-bottom:.3rem}
.card p{margin:0;color:var(--muted);font-size:.95rem}
.card .price{margin-top:.6rem;font-weight:700;color:var(--primary)}
.review{margin:0;background:var(--bg);border:1px solid var(--line);border-radius:var(--radius);padding:1.4rem}
.review p{margin:.2rem 0;font-size:.98rem}
.review footer{margin-top:.8rem;color:var(--muted);font-size:.88rem}

/* gallery */
.gallery{display:grid;gap:.7rem;grid-template-columns:repeat(auto-fill,minmax(190px,1fr))}
.gallery figure{margin:0;border-radius:var(--radius);overflow:hidden;aspect-ratio:4/3;background:var(--surface)}
.gallery img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
.gallery figure:hover img{transform:scale(1.05)}

/* contact */
.contact-grid{display:grid;gap:2rem;grid-template-columns:1.4fr 1fr}
.contact-actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.2rem}
.socials{display:flex;gap:1rem;margin-top:1.4rem;font-size:.92rem}
.hours ul{list-style:none;padding:0;margin:0;color:var(--muted);font-size:.95rem}
.hours li{padding:.35rem 0;border-bottom:1px dashed var(--line)}
.hours h3{font-size:1rem;margin-bottom:.6rem}

/* whatsapp float */
.wa-float{position:fixed;right:max(1rem,3vw);bottom:max(1rem,3vw);z-index:50;
  display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.1rem;border-radius:999px;
  background:var(--wa);color:#04240f;text-decoration:none;font-weight:700;font-size:.95rem;
  box-shadow:0 8px 26px rgba(0,0,0,.28)}
.wa-float:hover{filter:brightness(1.05)}

/* footer */
.site-footer{border-top:1px solid var(--line);padding:2rem clamp(1rem,5vw,2rem);
  color:var(--muted);font-size:.85rem;text-align:center}
.demo-banner{background:var(--accent);color:var(--on-accent);text-align:center;
  padding:.55rem 1rem;font-size:.83rem;font-weight:600}
.demo-banner a{color:inherit}

@media (max-width:760px){
  .nav-links{display:none}
  .nav-links.open{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;
    gap:0;background:var(--bg);border-bottom:1px solid var(--line);padding:.5rem 0}
  .nav-links.open a{padding:.75rem clamp(1rem,4vw,2rem)}
  .nav-toggle{display:block}
  .contact-grid{grid-template-columns:1fr}
  .wa-float span{display:none}
  .wa-float{padding:1rem;border-radius:50%}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto}}
`;
}

// ---------------------------------------------------------------- page

export function render(site, opts = {}) {
  const s = {
    business: {}, contact: {}, socials: {}, hours: [], services: [], gallery: [],
    reviews: [], whatsapp: {}, theme: {}, meta: {}, credits: {}, ...site,
  };
  const font = FONTS[s.theme?.font] || FONTS.inter;
  const noindex = s.meta?.noindex !== false;

  const navIds = [
    s.business.about && ['about', 'About'],
    (s.services || []).some((x) => x.title) && ['services', 'Services'],
    (s.gallery || []).length > 1 && ['gallery', 'Gallery'],
    (s.reviews || []).length && ['reviews', 'Reviews'],
    ['contact', 'Contact'],
  ].filter(Boolean);

  return `<!doctype html>
<html lang="${attr(s.meta.lang || 'en')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(s.meta.title || s.business.name)}</title>
<meta name="description" content="${attr(s.meta.description || '')}">
${noindex ? '<meta name="robots" content="noindex,nofollow">' : ''}
<meta name="theme-color" content="${attr(s.theme.primary || '#123a5c')}">
<meta property="og:type" content="website">
<meta property="og:title" content="${attr(s.meta.title || s.business.name)}">
<meta property="og:description" content="${attr(s.meta.description || '')}">
${s.gallery?.[0]?.src ? `<meta property="og:image" content="${attr(s.gallery[0].src)}">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${font.head}&display=swap">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${s.theme.primary || '#123a5c'}"/><text x="16" y="21" font-family="sans-serif" font-size="14" font-weight="700" fill="${readableOn(s.theme.primary)}" text-anchor="middle">${initials(s.business.name)}</text></svg>`
  )}">
<style>${styles(s)}</style>
${jsonLd(s)}
</head>
<body>
${opts.demoBanner ? `<div class="demo-banner">Sample site built for ${esc(s.business.name)} · not affiliated · <a href="${attr(opts.portfolioUrl || '../')}">who made this</a></div>` : ''}
${navSection(s, navIds)}
<main>
${heroSection(s)}
${aboutSection(s)}
${servicesSection(s)}
${gallerySection(s)}
${reviewsSection(s)}
${contactSection(s)}
</main>
<footer class="site-footer">
  <p>© ${new Date().getFullYear()} ${esc(s.business.name)}${s.contact.city ? ' · ' + esc(s.contact.city) : ''}</p>
  ${s.credits?.photos ? `<p>${esc(s.credits.photos)}</p>` : ''}
</footer>
${floatButton(s)}
<script>
(function(){
  var t=document.querySelector('.nav-toggle'),l=document.querySelector('.nav-links');
  if(t&&l){t.addEventListener('click',function(){
    var open=l.classList.toggle('open');t.setAttribute('aria-expanded',String(open));});
    l.addEventListener('click',function(e){if(e.target.tagName==='A')l.classList.remove('open');});}
})();
</script>
</body>
</html>
`;
}

export { FONTS };
