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
import csv
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

# Likely contact-page paths to try when not linked from the homepage.
CONTACT_GUESSES = ("contact", "contact-us", "contact-us/", "contact/",
                   "about", "about-us", "get-in-touch")

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; lead-enrich/1.0)"}


def fetch(url, timeout=12, limit=400_000):
    """Return decoded page text, or '' on any failure."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            ctype = resp.headers.get("Content-Type", "")
            if "html" not in ctype and "text" not in ctype and ctype:
                return ""
            return resp.read(limit).decode("utf-8", "ignore")
    except (urllib.error.URLError, urllib.error.HTTPError, ValueError,
            ConnectionError, TimeoutError, OSError):
        return ""
    except Exception:
        return ""


def normalize(url):
    url = url.strip()
    if not url:
        return ""
    if not url.startswith(("http://", "https://")):
        url = "http://" + url
    return url


def clean_email(addr):
    # Undo URL-encoding (e.g. a leading "%20" space) then trim junk edges.
    addr = urllib.parse.unquote(addr).strip().strip(".").lower()
    # Drop any leading characters that aren't valid local-part starts.
    addr = re.sub(r"^[^a-z0-9]+", "", addr)
    if "@" not in addr or addr.count("@") != 1:
        return None
    if addr.endswith(JUNK_TAILS):
        return None
    if len(addr) > 100:
        return None
    local, domain = addr.split("@", 1)
    if not local or local in JUNK_LOCALPARTS:
        return None
    if domain in JUNK_DOMAINS:
        return None
    # Sub-resource hosts of the builders/foundries above.
    if any(domain.endswith("." + d) or domain == d for d in JUNK_DOMAINS):
        return None
    # Reject implausible TLDs (catches ROT13/Cloudflare-obfuscated blobs).
    if domain.rsplit(".", 1)[-1] not in VALID_TLDS:
        return None
    return addr


def extract_emails(text):
    found = []
    for m in EMAIL_RE.findall(text or ""):
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


def enrich_one(website):
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

    # Follow up to two contact-ish links found on the homepage.
    targets = list(find_contact_links(home, url))[:2]
    # Fall back to guessed paths if nothing was linked.
    if not targets:
        targets = [urllib.parse.urljoin(url, p) for p in CONTACT_GUESSES[:3]]

    for t in targets:
        if pick_best(all_emails, domain):
            break  # already have a domain-matched email; stop early
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
