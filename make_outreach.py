#!/usr/bin/env python3
"""Generate personalised cold-email drafts from the enriched leads CSV.

Writes outreach_drafts.csv (Email, Business, Subject, Body) — one row per
mailable lead. Pain point comes from 'Biggest gap' but the "no website" claim
is validated against the live Website column so we never tell a business it
lacks a site it actually has. No paid AI: rule-based personalisation.
"""
import csv, re

SENDER_NAME = "Billy"
SENDER_CO   = "Voltara Digital"

def cat_label(cat):
    cat = cat.strip().lower()
    fix = {
        "driveway and paving": "driveway & paving company",
        "personal trainers": "personal training business",
        "cleaning companies": "cleaning company",
        "aesthetic clinics": "aesthetic clinic",
        "driving schools": "driving school",
        "mortgage brokers": "mortgage broker",
        "kitchen fitters": "kitchen-fitting business",
        "bathroom fitters": "bathroom-fitting business",
    }
    if cat in fix: return fix[cat]
    return cat[:-1] if cat.endswith("s") else cat

def parse_gap(gap, has_website):
    g = gap.lower()
    no_site = ("no website" in g) and not has_website
    if "no reviews" in g:
        rev = 0
    else:
        m = re.search(r"only (\d+) review", g)
        rev = int(m.group(1)) if m else None
    return no_site, rev

def hook(business, city, category, gap, has_website):
    no_site, rev = parse_gap(gap, has_website)
    lab = cat_label(category)
    where = city or "your area"
    if no_site and rev == 0:
        return (f"I came across {business} while looking at {lab}s in {where} and noticed "
                f"you don't have a website yet and very little showing on Google — which "
                f"usually means ready-to-buy customers are finding competitors first.")
    if no_site:
        return (f"I came across {business} while looking at {lab}s in {where} — you've clearly "
                f"got happy customers, but with no website and only a handful of Google reviews "
                f"you're probably invisible to a lot of people searching right now.")
    if rev == 0:
        return (f"I found {business} while looking at {lab}s in {where}. You've got a website, but "
                f"almost no Google reviews showing — often the one thing stopping a business "
                f"outranking bigger competitors.")
    return (f"I found {business} while looking at {lab}s in {where}. You're set up online, but only "
            f"a handful of Google reviews showing — usually the main thing holding back where you "
            f"rank in local search.")

def body(business, city, category, gap, has_website):
    lab = cat_label(category); where = city or "your area"
    h = hook(business, city, category, gap, has_website)
    return (
f"""Hi,

{h}

I run {SENDER_CO} — we help {where} {lab}s get found online and turn more of those Google searches into booked jobs: a clean website, a stronger Google profile, and a bit of AI automation to chase reviews and answer enquiries automatically.

Worth a quick 10-minute call to show you exactly what I'd change? I'll put together a free audit either way.

Cheers,
{SENDER_NAME}
{SENDER_CO}

P.S. If this isn't relevant just reply "no thanks" and I won't follow up.""")

def main():
    rows = list(csv.DictReader(open("voltara_leads_priority_enriched.csv", newline="", encoding="utf-8")))
    out = []
    for r in rows:
        email = r["Email"].strip()
        if not email:
            continue
        b, c, cat = r["Business name"].strip(), r["City"].strip(), r["Category"].strip()
        gap, has_web = r["Biggest gap"].strip(), bool(r["Website"].strip())
        out.append({"Email": email, "Business": b,
                    "Subject": f"Quick idea for {b}",
                    "Body": body(b, c, cat, gap, has_web)})
    with open("outreach_drafts.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["Email", "Business", "Subject", "Body"])
        w.writeheader(); w.writerows(out)
    print(f"wrote outreach_drafts.csv with {len(out)} personalised drafts")

if __name__ == "__main__":
    main()
