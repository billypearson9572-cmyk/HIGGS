#!/usr/bin/env python3
"""Enrich a leads CSV with contact emails scraped from each lead's website.

Usage:
    python enrich_emails.py voltara_leads_priority.csv [-o output.csv] [-w workers]

For every row that has a Website but a blank Email, the script fetches the
homepage plus any obvious "contact" pages, extracts published email addresses,
filters out website-builder / analytics boilerplate, and writes the best match
back into the Email column. Rows without a website (or where nothing usable is
found) are left untouched. A new `*_enriched.csv` file is written by default so
the original stays intact.
"""

import argparse
import codecs
import csv
import html as htmllib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")

# Domains that belong to site builders, CDNs, analytics, font/theme foundries,
# etc. — never the lead itself.
JUNK_DOMAINS = {
    "webador.com", "godaddysites.com", "godaddy.com", "wixpress.com", "wix.com",
    "squarespace.com", "sentry.io", "sentry-next.wixpress.com", "example.com",
    "example.org", "domain.com", "email.com", "yourdomain.com", "wordpress.com",
    "schema.org", "w3.org", "sentry.wixpress.com", "freeindex.co.uk",
    "googlemail.com.png", "weebly.com", "jimdo.com", "site123.com",
    "cloudflare.com", "googleapis.com", "gstatic.com", "atom.com",
    # Font / theme foundries whose addresses appear in CSS & licence comments.
    "latofonts.com", "latinotype.com", "sudtipos.com", "astigmatic.com",
    "micahrich.com", "fontfabric.com", "fontspring.com", "myfonts.com",
    "typekit.com", "adobe.com", "fonts.com",
}

# Common email TLD endings — anything else is almost certainly an obfuscated
# (ROT13/Cloudflare) blob or a parsing artifact, not a real address.
VALID_TLDS = {
    "com", "net", "org", "uk", "co", "io", "me", "info", "biz", "us", "email",
    "eu", "ac", "gov", "scot", "wales", "cymru", "london", "online", "agency",
    "ltd", "llp", "digital", "design", "club", "shop", "store", "tech", "cloud",
}

# Demo / placeholder local-parts shipped with website themes.
JUNK_LOCALPARTS = {
    "sample", "alexsmith", "johndoe", "janedoe", "john", "jane", "demo", "test",
    "example", "youremail", "yourname", "name", "winter.email", "email",
    "typesetit",
}

# Local-part / address tails that signal a false positive (e.g. asset filenames).
JUNK_TAILS = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp",
              ".ico", ".css", ".js", ".json", ".webp")

# Contact-page paths always worth trying — most published emails live here,
# not on the homepage.
CONTACT_GUESSES = ("contact", "contact-us", "contact/", "contact-us/",
                   "about", "about-us", "get-in-touch", "enquiries")

# Browser-like headers; some hosts 403 a bare/custom User-Agent.
HEADERS = {
    "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                   "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}


def _get(url, timeout=12, limit=500_000):
    """Single GET; return decoded text or None on failure."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            ctype = resp.headers.get("Content-Type", "")
            if ctype and "html" not in ctype and "text" not in ctype:
                return None
            return resp.read(limit).decode("utf-8", "ignore")
    except Exception:
        return None


def fetch(url, timeout=12):
    """Fetch a URL, retrying across https/http and www/non-www variants."""
    p = urllib.parse.urlparse(url if "://" in url else "http://" + url)
    host = p.netloc
    alt = host[4:] if host.startswith("www.") else "www." + host
    path = p.path or "/"
    seen = []
    # Prefer https; fall back to http and the other www variant.
    for scheme in ("https", "http"):
        for h in (host, alt):
            u = urllib.parse.urlunparse((scheme, h, path, "", p.query, ""))
            if u in seen:
                continue
            seen.append(u)
            text = _get(u, timeout=timeout)
            if text is not None:
                return text
    return ""


def normalize(url):
    url = url.strip()
    if not url:
        return ""
    if not url.startswith(("http://", "https://")):
        url = "http://" + url
    return url


def _cf_decode(hexstr):
    """Decode a Cloudflare email-protection hex string."""
    try:
        key = int(hexstr[:2], 16)
        return "".join(chr(int(hexstr[i:i + 2], 16) ^ key)
                       for i in range(2, len(hexstr), 2))
    except (ValueError, IndexError):
        return ""


def deobfuscate(text):
    """Expand common email-hiding tricks into plain addresses appended to text.

    Handles Cloudflare data-cfemail blobs, HTML entities, and
    'name [at] domain [dot] com' style text obfuscation.
    """
    if not text:
        return ""
    extra = []
    # Cloudflare email protection (data-cfemail="..." / #<hex>).
    for h in re.findall(r'data-cfemail="([0-9a-fA-F]+)"', text):
        d = _cf_decode(h)
        if d:
            extra.append(d)
    for h in re.findall(r'/cdn-cgi/l/email-protection#([0-9a-fA-F]+)', text):
        d = _cf_decode(h)
        if d:
            extra.append(d)
    # Decode HTML entities (&#64; -> @, &commat;, &period;, etc.).
    decoded = htmllib.unescape(text)
    # Textual "at"/"dot" obfuscation.
    for m in re.finditer(
            r'([A-Za-z0-9._%+\-]+)\s*(?:\[at\]|\(at\)|\{at\}|\s+at\s+|&#64;)\s*'
            r'([A-Za-z0-9.\-]+)\s*(?:\[dot\]|\(dot\)|\s+dot\s+)\s*([A-Za-z]{2,})',
            decoded, re.I):
        extra.append(f"{m.group(1)}@{m.group(2)}.{m.group(3)}")
    return decoded + "\n" + "\n".join(extra)


def _validate(addr):
    """Apply all sanity/junk filters; return the address or None."""
    if "@" not in addr or addr.count("@") != 1:
        return None
    if addr.endswith(JUNK_TAILS) or len(addr) > 100:
        return None
    local, domain = addr.split("@", 1)
    if not local or local in JUNK_LOCALPARTS:
        return None
    if domain in JUNK_DOMAINS:
        return None
    if any(domain.endswith("." + d) or domain == d for d in JUNK_DOMAINS):
        return None
    if domain.rsplit(".", 1)[-1] not in VALID_TLDS:
        return None
    return addr


def clean_email(addr):
    # Undo URL-encoding (e.g. a leading "%20" space) then trim junk edges.
    addr = urllib.parse.unquote(addr).strip().strip(".").lower()
    # Drop any leading characters that aren't valid local-part starts.
    addr = re.sub(r"^[^a-z0-9]+", "", addr)
    ok = _validate(addr)
    if ok:
        return ok
    # ROT13-obfuscated address? (e.g. freivprf@znvq2pyrna.pb.hx). Only letters
    # are rotated, so digits/punctuation are preserved — decode and re-check.
    if "@" in addr and addr.rsplit(".", 1)[-1] not in VALID_TLDS:
        return _validate(codecs.encode(addr, "rot_13"))
    return None


def extract_emails(text):
    found = []
    for m in EMAIL_RE.findall(deobfuscate(text)):
        c = clean_email(m)
        if c and c not in found:
            found.append(c)
    return found


def find_contact_links(html, base):
    """Return absolute URLs of links whose text/href mention 'contact'."""
    links = set()
    for href in re.findall(r'href=["\']([^"\']+)["\']', html or "", re.I):
        low = href.lower()
        if any(k in low for k in ("contact", "about", "get-in-touch")):
            links.add(urllib.parse.urljoin(base, href))
    return links


def site_domain(url):
    try:
        host = urllib.parse.urlparse(url).netloc.lower()
        return host[4:] if host.startswith("www.") else host
    except Exception:
        return ""


def pick_best(emails, domain):
    """Prefer an address on the site's own domain, else the first candidate."""
    if not emails:
        return ""
    if domain:
        for e in emails:
            if e.rsplit("@", 1)[-1] == domain:
                return e
    return emails[0]


def enrich_one(website, max_pages=6):
    """Scrape one website; return (email, pages_checked)."""
    url = normalize(website)
    if not url:
        return "", 0
    domain = site_domain(url)
    seen_pages = 0
    all_emails = []

    home = fetch(url)
    seen_pages += 1
    all_emails += extract_emails(home)

    # Build the crawl list: contact-ish links found on the homepage, plus the
    # standard guessed paths (deduped). We always probe contact pages because
    # most sites only publish the address there, not on the homepage.
    targets = []
    for link in find_contact_links(home, url):
        if link not in targets:
            targets.append(link)
    for p in CONTACT_GUESSES:
        g = urllib.parse.urljoin(url if url.endswith("/") else url + "/", p)
        if g not in targets:
            targets.append(g)

    for t in targets:
        if seen_pages >= max_pages:
            break
        if pick_best(all_emails, domain):
            break  # already have a domain-matched address; stop early
        page = fetch(t)
        if page:
            seen_pages += 1
            for e in extract_emails(page):
                if e not in all_emails:
                    all_emails.append(e)

    return pick_best(all_emails, domain), seen_pages


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("csv_path")
    ap.add_argument("-o", "--output", help="output CSV path")
    ap.add_argument("-w", "--workers", type=int, default=16)
    args = ap.parse_args()

    out_path = args.output or re.sub(r"\.csv$", "", args.csv_path) + "_enriched.csv"

    with open(args.csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    if "Website" not in fieldnames or "Email" not in fieldnames:
        sys.exit("CSV must contain 'Website' and 'Email' columns.")

    todo = [i for i, r in enumerate(rows)
            if r.get("Website", "").strip() and not r.get("Email", "").strip()]
    print(f"{len(rows)} rows total; {len(todo)} have a website and no email — scraping...")

    filled = 0
    done = 0
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(enrich_one, rows[i]["Website"]): i for i in todo}
        for fut in as_completed(futures):
            i = futures[fut]
            try:
                email, _ = fut.result()
            except Exception:
                email = ""
            if email:
                rows[i]["Email"] = email
                filled += 1
            done += 1
            if done % 25 == 0 or done == len(todo):
                print(f"  {done}/{len(todo)} sites checked, {filled} emails found")

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"\nDone. {filled} new emails added.")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
