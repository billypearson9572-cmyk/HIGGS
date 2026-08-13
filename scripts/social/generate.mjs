#!/usr/bin/env node
// Voltara social graphic generator.
//
//   node scripts/social/generate.mjs posts/scope-creep.json
//   node scripts/social/generate.mjs posts/scope-creep.json --size instagram-portrait
//
// Renders a brand-consistent PNG from a JSON post description. See README.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseCss, sizes } from './brand.mjs';
import { layouts, layoutNames } from './layouts.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

function loadPuppeteer() {
  // puppeteer-core needs a browser path; full puppeteer brings its own.
  for (const name of ['puppeteer', 'puppeteer-core']) {
    try {
      return { mod: require(path.join(here, 'node_modules', name)), name };
    } catch {
      /* try the next one */
    }
  }
  throw new Error(
    'Puppeteer is not installed. Run:  cd scripts/social && npm install',
  );
}

// CommonJS interop for the puppeteer require above.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

function findChromium() {
  const candidates = [
    process.env.CHROME_PATH,
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p));
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) args[a.slice(2)] = argv[++i];
    else args._.push(a);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const input = args._[0];
  if (!input) {
    console.error(
      'Usage: node scripts/social/generate.mjs <post.json> [--size linkedin-square] [--out file.png]\n' +
      `Layouts: ${layoutNames.join(', ')}\n` +
      `Sizes:   ${Object.keys(sizes).join(', ')}`,
    );
    process.exit(1);
  }

  const postPath = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
  if (!fs.existsSync(postPath)) throw new Error(`No such post file: ${postPath}`);
  const post = JSON.parse(fs.readFileSync(postPath, 'utf8'));

  const sizeKey = args.size ?? post.size ?? 'linkedin-square';
  const size = sizes[sizeKey];
  if (!size) throw new Error(`Unknown size "${sizeKey}". Try: ${Object.keys(sizes).join(', ')}`);

  const layoutName = args.layout ?? post.layout ?? 'statement';
  const layout = layouts[layoutName];
  if (!layout) throw new Error(`Unknown layout "${layoutName}". Try: ${layoutNames.join(', ')}`);

  // One scale factor derived from the canvas, so a layout tuned at 1200px
  // stays balanced on every other size rather than needing its own numbers.
  // Short, wide canvases carry an override (see sizes) because scaling by
  // height alone would leave their text unreadably small.
  const u = Number(args.u ?? size.u ?? size.h / 1200);
  const inner = layout(post, { u, w: size.w, h: size.h });

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss()}
    .card{width:${size.w}px;height:${size.h}px;}</style></head>
    <body><div class="card">${inner}</div></body></html>`;

  const { mod: puppeteer, name } = loadPuppeteer();
  const exec = findChromium();
  if (name === 'puppeteer-core' && !exec) {
    throw new Error('puppeteer-core found but no Chromium. Set CHROME_PATH, or npm install puppeteer.');
  }

  const browser = await puppeteer.launch({
    ...(exec ? { executablePath: exec } : {}),
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb', '--font-render-hinting=none'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: Number(args.scale ?? 2) });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await new Promise((r) => setTimeout(r, 250));

    const out = path.resolve(
      process.cwd(),
      args.out ?? post.out ?? `${path.basename(postPath, '.json')}-${sizeKey}.png`,
    );
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await (await page.$('.card')).screenshot({ path: out });
    console.log(`✓ ${layoutName} · ${sizeKey} · ${out}`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error('✗', e.message);
  process.exit(1);
});
