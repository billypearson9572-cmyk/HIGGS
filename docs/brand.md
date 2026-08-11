# Voltara Digital: Brand Assets, Colours and Type

Reference for the website redesign. Every value here is read from what is
actually in this repo and live on voltaradigital.com, not from memory. Where a
value is disputed, it says so.

Last updated 8 August 2026.

---

## 1. Logo assets

All in `public/`, all PNG, all with transparent backgrounds unless noted.

| File | Size | Notes |
|---|---|---|
| `voltara-mark.png` | 512 x 442 | The gradient V with the lightning bolt. Transparent. The primary mark. |
| `voltara-wordmark.png` | 680 x 174 | "VOLTARA DIGITAL", recoloured light for dark backgrounds. Transparent. |
| `voltara-logo-full.png` | 1254 x 1254 | Mark and wordmark locked up together. **Opaque, not transparent**, so it only sits cleanly on its own background. |

The mark is not square: 512 x 442, so roughly 1.16:1. Anything that assumes a
square logo needs padding rather than a stretch.

### Where they are used now
- `src/components/Logo.tsx` composes mark plus wordmark for the navbar and footer.
- `src/app/opengraph-image.tsx` inlines both as data URIs for the social share card.

### Icons (generated, do not hand-edit)
Built by `scripts/build-icons.py` from `voltara-mark.png`. Re-run it after any
logo change rather than editing these by hand.

| File | Size | Notes |
|---|---|---|
| `src/app/favicon.ico` | 16, 32, 48, 64 | The path browsers and crawlers probe directly. |
| `src/app/icon.png` | 512 x 512 | High-resolution icon. |
| `src/app/apple-icon.png` | 180 x 180 | iOS home screen. Opaque, because iOS ignores transparency and applies its own rounded mask. |

All three are the mark on a filled brand-gradient tile inside a white outline.
The outline is not decoration: a coloured mark on a coloured background loses
its edges without it, and a transparent mark disappears entirely against a tab
bar in similar colours.

---

## 2. Colour

### Brand colours
Sampled from the logo artwork and defined in `src/app/globals.css`.

| Token | Hex | Use |
|---|---|---|
| `--color-brand-green` | `#8ae04b` | Gradient start. Lime green. |
| `--color-brand-teal` | `#34c7c9` | Gradient middle. Also selection highlight and glow. |
| `--color-brand-blue` | `#1e8fe6` | Gradient end. Links in prose. |
| `--color-brand-blue-deep` | `#1565d8` | Deeper blue for pressed and hover states. |

### The gradient
```css
--brand-gradient: linear-gradient(120deg, #8ae04b 0%, #34c7c9 50%, #1e8fe6 100%);
```
Three helpers already exist in `globals.css`: `.text-gradient` for gradient
type, `.bg-brand-gradient` for fills, `.border-gradient` for a gradient border
that keeps a solid surface behind it.

### Surfaces and text
The site is dark by default. There is no light theme.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#070b16` | Page background. Near-black navy. |
| `--color-bg-soft` | `#0b1222` | Inset panels, form fields. |
| `--color-surface` | `#0e1626` | Cards. |
| `--color-surface-2` | `#131d31` | Raised cards, hover states. |
| `--color-line` | `#1e2a44` | Borders and dividers. |
| `--color-fg` | `#e9eef7` | Body text. Off-white, not pure white. |
| `--color-muted` | `#93a3c0` | Secondary text, captions. |

### Effects already defined
- **Selection**: `rgba(52, 199, 201, 0.3)`, the teal at 30%.
- **`.glow-radial`**: soft radial behind hero and CTA sections, teal at 22% fading through blue at 12% to transparent.
- **`.bg-grid`**: 56px grid, slate at 6%.
- **`.animate-fade-up`**: 14px rise over 0.7s, and it is already disabled under `prefers-reduced-motion`.

---

## 3. Type

Three families, all loaded through `next/font/google` in `src/app/layout.tsx`,
so they self-host and there is no external font request.

| Token | Family | Actually used? |
|---|---|---|
| `--font-sans` / `--font-geist-sans` | **Geist** | Yes. The default on `body`. |
| `--font-display` / `--font-space-grotesk` | **Space Grotesk** | Yes. Every heading, via the `font-display` class. Weights 400, 500, 600, 700. |
| `--font-mono` / `--font-geist-mono` | **Geist Mono** | **No.** Loaded and preloaded, but the `font-mono` class appears nowhere in the source or the rendered page. |

Verified against the live site, not just the config: three woff2 files are
preloaded on every page, totalling about 75 KB.

**Geist Mono is dead weight.** It is preloaded on every page load and never
rendered: `font-mono` appears 0 times in `src/` and 0 times in the served HTML,
and blog `code` elements fall through to Tailwind's default mono stack rather
than to Geist Mono. Either use it deliberately in the redesign or drop it from
`layout.tsx` and save roughly 22 KB and a preload on every page.

Geist and Geist Mono load with the `latin` subset and default weights. Only
Space Grotesk declares explicit weights, so if the redesign needs a specific
Geist weight, add it to the `Geist({...})` call rather than assuming it is there.

### Prose
Blog content uses `@tailwindcss/typography` with a `.prose-volt` override:
body `#c3cee0`, headings `#f3f6fb`, bold `#ffffff`, links the brand blue, quote
borders the brand teal.

---

## 4. Usage rules carried over from the marketing playbook

From section 8 of `07-marketing-playbook.md`, worth keeping on the site too:

- One idea per piece of art, big type, high contrast.
- No stock-photo handshakes. No robot imagery.
- Every image gets alt text describing what it shows.

---

## 5. One conflict to resolve

**The marketing playbook lists different brand colours from the ones the site
actually uses**, and different type.

| | Playbook section 8 | Live site |
|---|---|---|
| Green | `#52B331` | `#8ae04b` |
| Cyan / teal | `#2FB4E0` | `#34c7c9` |
| Blue | `#2563EB` | `#1e8fe6` |
| Navy | `#0A1B33` | `#070b16` |
| Type | Poppins | Geist + Space Grotesk |

I sampled the actual logo artwork to see which palette is truer to it. Measured
as straight RGB distance from the nearest colour present in `voltara-mark.png`:

| Colour | Playbook distance | Site distance |
|---|---|---|
| Green | 15 | **10** |
| Cyan / teal | 14 | **12** |
| Blue | **30** | **12** |

The site palette is a near-exact sample of the logo. The playbook values are
close approximations, and its blue `#2563EB` is visibly off: it is a flatter,
more indigo blue than anything in the artwork.

**Recommendation: keep the site palette and correct the playbook**, because the
site values came from the artwork and the playbook values did not. The exception
is if the redesign is deliberately moving the brand somewhere new, in which case
say so and both documents get updated together.

Poppins versus Geist is a genuine choice rather than an accuracy question.
Poppins is a geometric sans and would read friendlier and rounder; Geist and
Space Grotesk read more technical. Worth deciding before the redesign starts,
because it changes the feel of every page.

---

## 6. Quick copy-paste

```css
/* Brand */
--brand-green:      #8ae04b;
--brand-teal:       #34c7c9;
--brand-blue:       #1e8fe6;
--brand-blue-deep:  #1565d8;
--brand-gradient:   linear-gradient(120deg, #8ae04b 0%, #34c7c9 50%, #1e8fe6 100%);

/* Surfaces */
--bg:         #070b16;
--bg-soft:    #0b1222;
--surface:    #0e1626;
--surface-2:  #131d31;
--line:       #1e2a44;

/* Text */
--fg:         #e9eef7;
--muted:      #93a3c0;
```

Fonts: Geist (body), Space Grotesk (headings), Geist Mono (code).
