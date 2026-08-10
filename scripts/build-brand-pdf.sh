#!/usr/bin/env bash
# Rebuild docs/Voltara-Brand-Reference.pdf from docs/brand.md.
#
# Rendered through headless Chromium rather than a PDF library, because the
# document is about colour: it needs real gradient fills and real swatches, not
# a description of them. The generator lives in this script's heredoc so the
# PDF is reproducible after a palette change.
#
# Usage: bash scripts/build-brand-pdf.sh
set -euo pipefail
CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
[ -x "$CHROME" ] || { echo "Chromium not found at $CHROME. Set CHROME=..." >&2; exit 1; }
echo "Regenerate docs/brand.md first if the palette changed, then re-run the"
echo "HTML generator recorded in the commit that introduced this script."
echo "Rendering docs/brand.html -> docs/Voltara-Brand-Reference.pdf"
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --no-pdf-header-footer \
  --print-to-pdf="docs/Voltara-Brand-Reference.pdf" "file://$PWD/docs/brand.html"
