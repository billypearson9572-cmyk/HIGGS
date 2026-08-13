# Social graphic generator

Renders brand-consistent social graphics from a JSON file. Write the words,
pick a layout, get a PNG — no design tool, no fiddling with the rendering code.

It is plain HTML and CSS rendered by headless Chromium, so anything CSS can do
(gradients, masks, blend modes) is available, and type is real type rather than
something an image model tried to draw.

## Setup

Once, from this folder:

```bash
cd scripts/social
npm install
```

This installs its own Chromium and the brand fonts. It is a separate
`package.json` from the site on purpose, so it never touches the Vercel build.

## Use

```bash
node scripts/social/generate.mjs scripts/social/posts/scope-creep.json
```

Override the size or output path per run:

```bash
node scripts/social/generate.mjs posts/scope-creep.json --size instagram-portrait
node scripts/social/generate.mjs posts/scope-creep.json --out ~/Desktop/post.png
```

## Sizes

| Key | Pixels | For |
| --- | --- | --- |
| `linkedin-square` | 1200 × 1200 | LinkedIn feed post (default) |
| `linkedin-landscape` | 1200 × 627 | LinkedIn link preview |
| `linkedin-banner` | 1584 × 396 | LinkedIn profile cover |
| `instagram-portrait` | 1080 × 1350 | Instagram / carousel slide |
| `instagram-square` | 1080 × 1080 | Instagram square |

Everything renders at 2× by default (`--scale 1` for smaller files).

## Layouts

Split a field into separate lines with `|` or by passing an array.

### `statement` — a claim, set big

```json
{
  "layout": "statement",
  "kicker": "Scope creep",
  "headline": "I walked away | from the biggest | contract we had.",
  "subline": "Not over money. Over a scope that quietly doubled."
}
```

### `quote` — someone else's words, with your punchline

```json
{
  "layout": "quote",
  "headline": "It'll only take | five minutes.",
  "subline": "The five most expensive words | in client work."
}
```

The last line of `subline` picks up the brand gradient.

### `compare` — two lists, the second visibly overrunning

```json
{
  "layout": "compare",
  "kicker": "Scope creep",
  "headline": "Same contract. | Two weeks apart.",
  "closer": "Agreed in writing, or we don't start.",
  "left":  { "title": "Week one · signed",    "items": ["..."] },
  "right": { "title": "Week three · expected", "items": ["..."] }
}
```

Items in `right` beyond the length of `left` are treated as the additions: they
get a `+` instead of a tick and fade out down the list, so it reads as still
going. Give `right` more items than fit on purpose.

### `stat` — one number doing the talking

```json
{
  "layout": "stat",
  "kicker": "Response time",
  "stat": "78%",
  "headline": "of leads go to whoever | replies first.",
  "subline": "Most businesses take hours. A system takes seconds."
}
```

## Common fields

| Field | Meaning |
| --- | --- |
| `layout` | `statement`, `quote`, `compare`, `stat` |
| `size` | any size key above |
| `kicker` | small uppercase label with a green dot |
| `headline` | the main lines |
| `accentLine` | which headline line takes the gradient (default: the last) |
| `headlineSize` | override the type size, in 1200px-canvas units |
| `subline` | supporting copy under the rule |
| `author`, `org`, `site` | the name plate; `"footer": false` removes it |

## Adding a layout

Add a function to `layouts.mjs` and export it in the `layouts` map. It receives
`(post, { u, w, h })` and returns the card's inner HTML. Multiply every fixed
pixel value by `u` so it scales across canvas sizes.
