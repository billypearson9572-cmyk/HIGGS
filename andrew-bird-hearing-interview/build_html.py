import markdown, pathlib, html as _html

CSS = """
@page { size: A4; margin: 18mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color:#1A2B2E; line-height:1.6; max-width: 820px; margin: 0 auto; padding: 28px 22px 60px; background:#fff; }
h1 { color:#0E5A66; font-size:1.9rem; line-height:1.2; border-bottom:4px solid #F2A65A; padding-bottom:.35em; margin-top:.2em; }
h2 { color:#0E5A66; font-size:1.3rem; margin-top:1.8em; border-bottom:1px solid #d9e3e4; padding-bottom:.2em; }
h3 { color:#2E8B9B; font-size:1.08rem; margin-top:1.3em; }
a { color:#2E8B9B; }
blockquote { border-left:4px solid #F2A65A; margin:1em 0; padding:.4em 1em; background:#F7F4EF; color:#3A4A4D; border-radius:4px; }
code { background:#F7F4EF; padding:.1em .35em; border-radius:4px; font-size:.9em; }
table { border-collapse:collapse; width:100%; margin:1.2em 0; font-size:.95rem; }
th { background:#0E5A66; color:#fff; text-align:left; padding:.55em .7em; }
td { border:1px solid #dde6e7; padding:.5em .7em; vertical-align:top; }
tr:nth-child(even) td { background:#F7F4EF; }
hr { border:none; border-top:1px solid #d9e3e4; margin:2em 0; }
ul,ol { padding-left:1.3em; }
li { margin:.25em 0; }
strong { color:#13414a; }
.brandbar { display:flex; align-items:center; gap:12px; margin-bottom:8px; }
.brandbar .dot { width:34px;height:34px;border-radius:50%;background:#0E5A66;flex:0 0 34px;
  position:relative; }
.brandbar .dot:after{content:"";position:absolute;left:9px;top:15px;width:5px;height:5px;border-radius:50%;background:#F2A65A;}
.brandbar span{font-weight:700;color:#0E5A66;letter-spacing:.3px;font-size:.95rem;}
@media print { body{padding:0;} a{color:#13414a;text-decoration:none;} }
"""

BRAND = '<div class="brandbar"><div class="dot"></div><span>ANDREW BIRD HEARING &middot; Interview Prep Pack</span></div>'

files = ["README","01-digital-presence-audit","02-30-60-90-day-plan",
         "03-brand-refresh-guide","talking-points"]
md = markdown.Markdown(extensions=["tables","fenced_code","sane_lists"])
out = pathlib.Path("html"); out.mkdir(exist_ok=True)
for stem in files:
    src = pathlib.Path(f"{stem}.md").read_text(encoding="utf-8")
    body = md.reset().convert(src)
    title = _html.escape(stem.replace("-"," "))
    doc = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Andrew Bird Hearing</title><style>{CSS}</style></head>
<body>{BRAND}{body}</body></html>"""
    (out/f"{stem}.html").write_text(doc, encoding="utf-8")
    print("wrote", out/f"{stem}.html")
