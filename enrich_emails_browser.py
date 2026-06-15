#!/usr/bin/env python3
"""Second-pass email enrichment using a headless browser.

Renders each still-empty lead's website with Chromium so JavaScript-built
pages (Wix, React, etc.) expose their contact email, then reuses the filters
and de-obfuscation from enrich_emails.py. Updates the Email column in place.

    python enrich_emails_browser.py voltara_leads_priority_enriched.csv
"""

import argparse
import csv
import re
import threading
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

from playwright.sync_api import sync_playwright

import enrich_emails as E

# Playwright's sync API is not thread-safe across a shared browser, so each
# worker thread gets its own Playwright instance + browser via thread-local
# storage.
_tl = threading.local()


def _thread_browser():
    if not hasattr(_tl, "browser"):
        _tl.pw = sync_playwright().start()
        _tl.browser = _tl.pw.chromium.launch(headless=True)
    return _tl.browser

# Paths to visit per site (rendered). Homepage first, then contact-ish pages.
PAGES = ("", "contact", "contact-us", "about", "about-us")


def render(page, url, timeout=20000):
    """Load a URL in the browser; return rendered HTML + mailto hrefs, or ''."""
    try:
        page.goto(url, timeout=timeout, wait_until="commit")
        try:
            page.wait_for_load_state("domcontentloaded", timeout=timeout)
        except Exception:
            pass
        page.wait_for_timeout(1800)  # let client JS paint contact details
        html = page.content()
        # mailto links the regex might miss once rendered
        hrefs = page.eval_on_selector_all(
            "a[href^='mailto:']", "els => els.map(e => e.getAttribute('href'))")
        return html + "\n" + "\n".join(hrefs or [])
    except Exception:
        return ""


def scrape_site(browser, website):
    url = E.normalize(website)
    if not url:
        return ""
    domain = E.site_domain(url)
    base = url if url.endswith("/") else url + "/"
    context = browser.new_context(
        user_agent=E.HEADERS["User-Agent"], viewport={"width": 1280, "height": 900},
        ignore_https_errors=True)
    page = context.new_page()
    # Block heavy assets to speed rendering.
    page.route(re.compile(r"\.(png|jpg|jpeg|gif|svg|webp|woff2?|ttf|mp4|css)$"),
               lambda r: r.abort())
    found = []
    try:
        for i, path in enumerate(PAGES):
            target = url if path == "" else urllib.parse.urljoin(base, path)
            html = render(page, target)
            for e in E.extract_emails(html):
                if e not in found:
                    found.append(e)
            if E.pick_best(found, domain):
                break  # got a domain-matched address; stop
    finally:
        context.close()
    return E.pick_best(found, domain)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("csv_path")
    ap.add_argument("-w", "--workers", type=int, default=6)
    args = ap.parse_args()

    with open(args.csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    todo = [i for i, r in enumerate(rows)
            if r.get("Website", "").strip() and not r.get("Email", "").strip()]
    print(f"{len(todo)} leads still missing an email — rendering with Chromium...")

    filled = 0
    done = 0

    def work(i):
        return i, scrape_site(_thread_browser(), rows[i]["Website"])

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        for fut in as_completed([pool.submit(work, i) for i in todo]):
            try:
                i, email = fut.result()
            except Exception:
                i, email = None, ""
            if email and i is not None:
                rows[i]["Email"] = email
                filled += 1
            done += 1
            if done % 20 == 0 or done == len(todo):
                print(f"  {done}/{len(todo)} rendered, {filled} new emails")

    with open(args.csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"\nDone. {filled} additional emails added (browser pass).")


if __name__ == "__main__":
    main()
