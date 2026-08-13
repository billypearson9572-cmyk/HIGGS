// Voltara brand tokens and asset loading for the social graphic generator.
// Everything is inlined as data URIs at render time so a graphic can be
// produced offline and looks identical on any machine.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '..', '..');

export const colors = {
  bg: '#070b16',
  surface: '#0e1626',
  line: 'rgba(148,163,184,.16)',
  fg: '#e9eef7',
  muted: '#93a3c0',
  green: '#8ae04b',
  teal: '#34c7c9',
  blue: '#1e8fe6',
  blueDeep: '#1565d8',
};

export const gradient = `linear-gradient(100deg,${colors.green} 0%,${colors.teal} 46%,${colors.blue} 100%)`;

/**
 * Canvas sizes, by the platform slot they are for.
 *
 * `u` is the type scale. It defaults to height/1200, which keeps a layout
 * balanced across the tall formats. Short, wide canvases need an override:
 * scaling purely by height would shrink the text to nothing on a banner.
 */
export const sizes = {
  'linkedin-square': { w: 1200, h: 1200 },
  'linkedin-landscape': { w: 1200, h: 627, u: 0.62 },
  'linkedin-banner': { w: 1584, h: 396, u: 0.52 },
  'instagram-portrait': { w: 1080, h: 1350 },
  'instagram-square': { w: 1080, h: 1080 },
};

const b64 = (f) => fs.readFileSync(f).toString('base64');

function fontFace(family, weight, file) {
  if (!fs.existsSync(file)) return '';
  return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;` +
    `src:url(data:font/woff2;base64,${b64(file)}) format('woff2');font-display:block;}`;
}

/**
 * The site loads these through next/font; here they come from @fontsource so
 * rendering never depends on the network. Missing files degrade to the system
 * sans rather than failing the render.
 */
export function fontCss() {
  const sg = path.join(here, 'node_modules/@fontsource/space-grotesk/files');
  const ge = path.join(here, 'node_modules/@fontsource/geist-sans/files');
  return [
    fontFace('Space Grotesk', 700, path.join(sg, 'space-grotesk-latin-700-normal.woff2')),
    fontFace('Geist', 400, path.join(ge, 'geist-sans-latin-400-normal.woff2')),
    fontFace('Geist', 500, path.join(ge, 'geist-sans-latin-500-normal.woff2')),
    fontFace('Geist', 600, path.join(ge, 'geist-sans-latin-600-normal.woff2')),
  ].filter(Boolean).join('\n');
}

/** The circular gradient badge, shared with the email signature. */
export function badgeDataUri() {
  const file = path.join(repoRoot, 'public', 'voltara-badge.png');
  return fs.existsSync(file) ? 'data:image/png;base64,' + b64(file) : '';
}

export const baseCss = () => `
${fontCss()}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:${colors.bg};}
.card{position:relative;overflow:hidden;background:${colors.bg};
      font-family:'Geist',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
.grid{position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(to right,rgba(148,163,184,.05) 1px,transparent 1px),
                   linear-gradient(to bottom,rgba(148,163,184,.05) 1px,transparent 1px);
  background-size:60px 60px;}
.glow{position:absolute;inset:0;pointer-events:none;}
.grad-text{background:${gradient};-webkit-background-clip:text;background-clip:text;color:transparent;}
.rule{border-radius:4px;background:linear-gradient(90deg,${colors.green},${colors.teal});}
`;
