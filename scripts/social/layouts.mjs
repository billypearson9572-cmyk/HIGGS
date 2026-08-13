// Layout templates for the social graphic generator.
//
// Each layout takes the post's content plus the canvas size and returns the
// inner HTML of the card. Scale is driven off the canvas height so the same
// layout holds up from a 396px banner to a 1350px portrait post.
import { colors, gradient, badgeDataUri } from './brand.mjs';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Turn "a | b" or ["a","b"] into separate lines. */
const lines = (v) =>
  (Array.isArray(v) ? v : String(v ?? '').split('|')).map((s) => s.trim()).filter(Boolean);

function kicker(text, u) {
  if (!text) return '';
  return `<div style="display:flex;align-items:center;gap:${13 * u}px;margin-bottom:${26 * u}px;">
    <span style="width:${9 * u}px;height:${9 * u}px;border-radius:50%;background:${colors.green};display:block;"></span>
    <span style="font-weight:600;font-size:${19 * u}px;letter-spacing:${4.6 * u}px;
                 color:rgba(255,255,255,.62);text-transform:uppercase;">${esc(text)}</span>
  </div>`;
}

/**
 * Name plate, bottom of the card. Omitted on short canvases (banners), where
 * there is no room for it under the message.
 */
function footer(post, u, w, h) {
  if (post.footer === false || h < 600) return '';
  const badge = badgeDataUri();
  const pad = 86 * u;
  return `
  <div style="position:absolute;left:${pad}px;right:${pad}px;bottom:${160 * u}px;
              height:1px;background:${colors.line};"></div>
  <div style="position:absolute;left:${pad}px;right:${pad}px;bottom:${74 * u}px;
              display:flex;align-items:center;justify-content:space-between;">
    <span style="font-weight:500;font-size:${19 * u}px;letter-spacing:${1 * u}px;color:rgba(255,255,255,.42);">
      ${esc(post.site ?? 'voltaradigital.com')}
    </span>
    <div style="display:flex;align-items:center;gap:${13 * u}px;">
      ${badge ? `<img src="${badge}" style="width:${44 * u}px;height:${44 * u}px;border-radius:50%;display:block;" />` : ''}
      <div style="display:flex;flex-direction:column;">
        <span style="font-weight:600;font-size:${17 * u}px;color:${colors.fg};">${esc(post.author ?? 'Billy Pearson')}</span>
        <span style="font-weight:500;font-size:${14 * u}px;letter-spacing:${1.6 * u}px;
                     color:rgba(255,255,255,.5);text-transform:uppercase;">${esc(post.org ?? 'Voltara Digital')}</span>
      </div>
    </div>
  </div>`;
}

const glow = (corner = 'left') =>
  `<div class="glow" style="background:radial-gradient(ellipse 75% 55% at ${corner === 'left' ? '8% 2%' : '92% 4%'},
    rgba(52,199,201,.20) 0%, rgba(30,143,230,.09) 45%, transparent 72%);"></div>`;

/** Big claim. The default: a headline with an optional supporting line. */
function statement(post, { u, w, h }) {
  const head = lines(post.headline);
  const accent = Number.isInteger(post.accentLine) ? post.accentLine : head.length - 1;
  const size = (post.headlineSize ?? 96) * u;
  return `
  <div class="grid"></div>${glow('left')}
  <div style="position:absolute;left:${86 * u}px;right:${86 * u}px;top:0;bottom:${h < 600 ? 0 : 200 * u}px;
              display:flex;flex-direction:column;justify-content:center;">
    ${kicker(post.kicker, u)}
    ${head.map((l, i) => `<div class="${i === accent ? 'grad-text' : ''}"
        style="font-family:'Space Grotesk';font-weight:700;font-size:${size}px;line-height:1.02;
               letter-spacing:${-0.025 * size}px;${i === accent ? '' : `color:${colors.fg};`}
               margin-top:${i ? 2 * u : 0}px;">${esc(l)}</div>`).join('')}
    ${post.subline ? `
      <div class="rule" style="width:${96 * u}px;height:${4 * u}px;margin:${44 * u}px 0 ${30 * u}px;"></div>
      <div style="font-weight:400;font-size:${31 * u}px;line-height:1.5;color:rgba(233,238,247,.80);max-width:${840 * u}px;">
        ${lines(post.subline).map(esc).join('<br/>')}
      </div>` : ''}
  </div>
  ${footer(post, u, w, h)}`;
}

/** Someone else's words as the hook, with your punchline under them. */
function quote(post, { u, w, h }) {
  const head = lines(post.headline);
  const size = (post.headlineSize ?? 88) * u;
  return `
  <div class="grid"></div>${glow('right')}
  <div style="position:absolute;left:${86 * u}px;right:${86 * u}px;top:0;bottom:${h < 600 ? 0 : 200 * u}px;
              display:flex;flex-direction:column;justify-content:center;">
    <div style="font-family:'Space Grotesk';font-weight:700;font-size:${150 * u}px;line-height:.7;
                color:rgba(138,224,75,.30);">&ldquo;</div>
    ${head.map((l, i) => `<div style="font-family:'Space Grotesk';font-weight:700;font-size:${size}px;
        line-height:1.06;letter-spacing:${-0.023 * size}px;color:${colors.fg};margin-top:${i ? 2 * u : 12 * u}px;">${esc(l)}</div>`).join('')}
    ${post.subline ? `
      <div class="rule" style="width:${96 * u}px;height:${4 * u}px;margin:${48 * u}px 0 ${30 * u}px;"></div>
      <div style="font-weight:500;font-size:${33 * u}px;line-height:1.45;color:rgba(233,238,247,.86);max-width:${880 * u}px;">
        ${lines(post.subline).map((l, i, arr) =>
          i === arr.length - 1
            ? `<span class="grad-text" style="font-weight:600;">${esc(l)}</span>`
            : esc(l)).join('<br/>')}
      </div>` : ''}
  </div>
  ${footer(post, u, w, h)}`;
}

/**
 * Two lists side by side. The right-hand one is meant to be longer: it fades
 * out at the bottom so it reads as still going, which is the whole point when
 * the story is something growing out of hand.
 */
function compare(post, { u, w, h }) {
  const left = post.left ?? {};
  const right = post.right ?? {};
  const tick = `<svg width="${18 * u}" height="${18 * u}" viewBox="0 0 20 20" fill="none" style="flex:none;margin-top:${5 * u}px;">
    <path d="M4 10.5 L8.2 14.5 L16 5.5" stroke="${colors.green}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const plus = `<svg width="${18 * u}" height="${18 * u}" viewBox="0 0 20 20" fill="none" style="flex:none;margin-top:${5 * u}px;">
    <path d="M10 4.5 V15.5 M4.5 10 H15.5" stroke="${colors.muted}" stroke-width="2.4" stroke-linecap="round"/></svg>`;

  const row = (mark, text, opacity) => `
    <div style="display:flex;gap:${14 * u}px;align-items:flex-start;opacity:${opacity};">
      ${mark}<span style="font-weight:500;font-size:${29 * u}px;line-height:1.32;color:${colors.fg};">${esc(text)}</span>
    </div>`;

  const col = (data, isRight) => {
    const items = data.items ?? [];
    const shared = isRight ? (left.items ?? []).length : items.length;
    return `
    <div style="flex:1;">
      <div style="font-weight:600;font-size:${19 * u}px;letter-spacing:${3.4 * u}px;text-transform:uppercase;
                  color:${isRight ? colors.muted : colors.green};">${esc(data.title ?? '')}</div>
      <div style="height:${3 * u}px;margin:${16 * u}px 0 ${26 * u}px;
                  background:linear-gradient(90deg,${isRight ? 'rgba(147,163,192,.7)' : colors.green},transparent);"></div>
      <div style="display:flex;flex-direction:column;gap:${17 * u}px;">
        ${items.map((t, i) => {
          const isNew = isRight && i >= shared;
          // New entries dim as they run on, so the overflow reads as deliberate.
          return row(isNew ? plus : tick, t, isNew ? Math.max(0.24, 1 - (i - shared + 1) * 0.11) : 1);
        }).join('')}
      </div>
    </div>`;
  };

  const head = lines(post.headline);
  const accent = Number.isInteger(post.accentLine) ? post.accentLine : head.length - 1;
  return `
  <div class="grid"></div>${glow('left')}
  <div style="position:absolute;left:${86 * u}px;top:${80 * u}px;right:${86 * u}px;">
    ${kicker(post.kicker, u)}
    ${head.map((l, i) => `<div class="${i === accent ? 'grad-text' : ''}"
        style="font-family:'Space Grotesk';font-weight:700;font-size:${74 * u}px;line-height:1.02;
               letter-spacing:${-1.6 * u}px;${i === accent ? '' : `color:${colors.fg};`}
               margin-top:${i ? 4 * u : 0}px;">${esc(l)}</div>`).join('')}
  </div>
  <div style="position:absolute;left:${86 * u}px;right:${86 * u}px;top:${330 * u}px;display:flex;gap:${56 * u}px;">
    ${col(left, false)}
    <div style="width:1px;background:linear-gradient(180deg,rgba(148,163,184,.30),transparent);"></div>
    ${col(right, true)}
  </div>
  <div style="position:absolute;left:0;right:0;bottom:${196 * u}px;height:${150 * u}px;pointer-events:none;
              background:linear-gradient(180deg,rgba(7,11,22,0),${colors.bg} 82%);"></div>
  ${post.closer ? `<div style="position:absolute;left:${86 * u}px;bottom:${196 * u}px;
      font-family:'Space Grotesk';font-weight:700;font-size:${34 * u}px;letter-spacing:${-0.6 * u}px;color:${colors.fg};">
      ${esc(post.closer)}</div>` : ''}
  ${footer(post, u, w, h)}`;
}

/** One number doing the talking. */
function stat(post, { u, w, h }) {
  return `
  <div class="grid"></div>${glow('left')}
  <div style="position:absolute;left:${86 * u}px;right:${86 * u}px;top:0;bottom:${h < 600 ? 0 : 200 * u}px;
              display:flex;flex-direction:column;justify-content:center;">
    ${kicker(post.kicker, u)}
    <div class="grad-text" style="font-family:'Space Grotesk';font-weight:700;font-size:${(post.statSize ?? 260) * u}px;
                line-height:.92;letter-spacing:${-6 * u}px;">${esc(post.stat ?? '')}</div>
    ${post.headline ? `<div style="font-family:'Space Grotesk';font-weight:700;font-size:${52 * u}px;line-height:1.1;
        letter-spacing:${-1.2 * u}px;color:${colors.fg};margin-top:${28 * u}px;">
        ${lines(post.headline).map(esc).join('<br/>')}</div>` : ''}
    ${post.subline ? `
      <div class="rule" style="width:${96 * u}px;height:${4 * u}px;margin:${36 * u}px 0 ${28 * u}px;"></div>
      <div style="font-weight:400;font-size:${29 * u}px;line-height:1.5;color:rgba(233,238,247,.80);max-width:${820 * u}px;">
        ${lines(post.subline).map(esc).join('<br/>')}
      </div>` : ''}
  </div>
  ${footer(post, u, w, h)}`;
}

export const layouts = { statement, quote, compare, stat };
export const layoutNames = Object.keys(layouts);
