#!/usr/bin/env python3
"""Print personalised drafts (To / Subject / Body) for a row range, with
correct plural category labels. Usage: python gen_drafts.py START END
Rows are 0-based over mailable leads. Output is delimited for easy parsing.
"""
import csv, re, sys

SENDER_NAME="Billy"; SENDER_CO="Voltara Digital"

def cat_label(cat):
    cat=cat.strip().lower()
    fix={"driveway and paving":"driveway & paving companies",
         "personal trainers":"personal trainers","aesthetic clinics":"aesthetic clinics",
         "hair salons":"hair salons","beauty salons":"beauty salons"}
    return fix.get(cat, cat)   # categories are already plural/natural

def hook(b,city,cat,gap,hasweb):
    g=gap.lower(); noSite=("no website" in g) and hasweb!="yes"
    rev=0 if "no reviews" in g else (int(re.search(r"only (\d+) review",g).group(1)) if re.search(r"only (\d+) review",g) else None)
    lab=cat_label(cat); where=city or "your area"
    if noSite and rev==0:
        return f"I came across {b} while looking at {lab} in {where} and noticed you don't have a website yet and very little showing on Google — which usually means ready-to-buy customers are finding competitors first."
    if noSite:
        return f"I came across {b} while looking at {lab} in {where} — you've clearly got happy customers, but with no website and only a handful of Google reviews you're probably invisible to a lot of people searching right now."
    if rev==0:
        return f"I found {b} while looking at {lab} in {where}. You've got a website, but almost no Google reviews showing — often the one thing stopping a business outranking bigger competitors."
    return f"I found {b} while looking at {lab} in {where}. You're set up online, but only a handful of Google reviews showing — usually the main thing holding back where you rank in local search."

def body(b,city,cat,gap,hasweb):
    lab=cat_label(cat); where=city or "your area"
    return ("Hi,\n\n"+hook(b,city,cat,gap,hasweb)+"\n\n"
        f"I run {SENDER_CO} — we help {where} {lab} get found online and turn more of those Google searches into booked jobs: a clean website, a stronger Google profile, and a bit of AI automation to chase reviews and answer enquiries automatically.\n\n"
        "Worth a quick 10-minute call to show you exactly what I'd change? I'll put together a free audit either way.\n\n"
        f"Cheers,\n{SENDER_NAME}\n{SENDER_CO}\n\n"
        "P.S. If this isn't relevant just reply \"no thanks\" and I won't follow up.")

rows=[r for r in csv.DictReader(open("voltara_leads_priority_enriched.csv",newline='',encoding='utf-8')) if r['Email'].strip()]
a,bn=int(sys.argv[1]),int(sys.argv[2])
for r in rows[a:bn]:
    print("=====DRAFT=====")
    print("TO:"+r['Email'].strip())
    print("SUBJECT:Quick idea for "+r['Business name'].strip())
    print("BODY:")
    print(body(r['Business name'].strip(),r['City'].strip(),r['Category'].strip(),r['Biggest gap'].strip(),"yes" if r['Website'].strip() else "no"))
