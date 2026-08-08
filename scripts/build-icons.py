#!/usr/bin/env python3
"""Regenerate the site's app icons from the brand mark.

Run from the repo root:  python3 scripts/build-icons.py

Produces the three files Next.js's metadata conventions pick up automatically
from src/app/ (see node_modules/next/dist/docs/01-app/03-api-reference/
03-file-conventions/01-metadata/app-icons.md):

  favicon.ico     16/32/48/64 - the path browsers, link previews and crawlers
                  probe directly. Its absence was why no icon showed at all.
  icon.png        512 - the high-resolution icon.
  apple-icon.png  180 - iOS home screen.

The design is the brand gradient as a filled tile, with the full logo mark on
top of it inside a white outline. The filled tile matters: the mark on
transparency vanished against a tab bar that happened to match its colours,
which is half of why no icon appeared. The white outline is what separates a
coloured mark from a coloured background — without it the V dissolves into the
gradient behind it.
"""
import math
from pathlib import Path

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"
MARK = ROOT / "public" / "voltara-mark.png"

# Mirrors --brand-gradient in src/app/globals.css:
#   linear-gradient(120deg, #8ae04b 0%, #34c7c9 50%, #1e8fe6 100%)
STOPS = [(0.0, (0x8A, 0xE0, 0x4B)), (0.5, (0x34, 0xC7, 0xC9)), (1.0, (0x1E, 0x8F, 0xE6))]
ANGLE_DEG = 120


def _lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def _sample(t):
    t = min(1.0, max(0.0, t))
    for (p0, c0), (p1, c1) in zip(STOPS, STOPS[1:]):
        if t <= p1:
            return _lerp(c0, c1, (t - p0) / (p1 - p0))
    return STOPS[-1][1]


def _gradient(size):
    """A CSS-equivalent linear gradient across a square, angle measured
    clockwise from 'to top' the way CSS does it.

    Rendered small and scaled up: a linear gradient interpolates exactly under
    resampling, and the per-pixel loop is far too slow at icon master sizes.
    """
    src = 96
    rad = math.radians(ANGLE_DEG)
    dx, dy = math.sin(rad), -math.cos(rad)
    half = (abs(dx) + abs(dy)) / 2
    img = Image.new("RGB", (src, src))
    px = img.load()
    for y in range(src):
        for x in range(src):
            u = ((x + 0.5) / src - 0.5) * dx + ((y + 0.5) / src - 0.5) * dy
            px[x, y] = _sample(u / (2 * half) + 0.5)
    return img.resize((size, size), Image.BICUBIC).convert("RGBA")


def _outline(alpha, radius):
    """Grow an alpha channel outwards by `radius` px.

    Done by compositing the shape against itself at offsets around a circle.
    A max-filter of this radius would be correct too, but its cost grows with
    the square of the kernel and is unusable at master sizes.
    """
    grown = alpha
    steps = 32
    for i in range(steps):
        angle = 2 * math.pi * i / steps
        grown = ImageChops.lighter(grown, ImageChops.offset(
            alpha, round(radius * math.cos(angle)), round(radius * math.sin(angle))))
    return grown


def tile(size, margin=0.17, stroke=0.020, supersample=3):
    """The gradient tile with the full logo mark on top, inside a white
    outline. Built oversized and scaled down so the outline and the mark's
    internal edges stay clean at small sizes."""
    src = Image.open(MARK).convert("RGBA")
    mark = src.crop(src.getchannel("A").getbbox())

    big = size * supersample
    inner = int(big * (1 - margin * 2))
    scale = inner / max(mark.size)
    w = max(1, round(mark.width * scale))
    h = max(1, round(mark.height * scale))
    mark = mark.resize((w, h), Image.LANCZOS)

    # Pad so the outline has somewhere to grow into (offset wraps around).
    radius = max(1, round(big * stroke))
    pad = radius * 3
    layer = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    layer.paste(mark, (pad, pad))

    white = Image.new("RGBA", layer.size, (255, 255, 255, 255))
    white.putalpha(_outline(layer.getchannel("A"), radius))
    white.alpha_composite(layer)          # mark sits inside its own outline

    out = _gradient(big)
    out.alpha_composite(white, ((big - white.width) // 2, (big - white.height) // 2))
    return out.resize((size, size), Image.LANCZOS)


def main():
    # Tighter margin and a heavier outline on the small sizes — at 16px every
    # pixel of padding is one fewer pixel of V, and a hairline stroke would
    # disappear entirely.
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    tile(256, margin=0.12, stroke=0.028).save(
        APP / "favicon.ico", format="ICO", sizes=ico_sizes)
    tile(512).save(APP / "icon.png", format="PNG")
    # iOS applies its own rounded-rect mask, so keep the mark clear of the
    # corners and leave the tile fully opaque (iOS ignores transparency).
    tile(180, margin=0.19).convert("RGB").save(APP / "apple-icon.png", format="PNG")
    for name in ("favicon.ico", "icon.png", "apple-icon.png"):
        path = APP / name
        print(f"wrote {path.relative_to(ROOT)}  ({path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
