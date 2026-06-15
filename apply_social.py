#!/usr/bin/env python3
"""Apply verified social/website findings to the leads CSV.

Reads a JSON list of {"i": <row index>, "fb": ..., "ig": ..., "web": ...}
(any field optional) and writes them into the matching row, only filling
empty cells. Socials go in the 'Instagram / Facebook' column; a newly found
website fills 'Website' only if it was blank.

    python apply_social.py findings.json
"""
import csv
import json
import sys

CSV = "voltara_leads_priority_enriched.csv"


def main():
    findings = json.load(open(sys.argv[1]))
    with open(CSV, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fn = reader.fieldnames
        rows = list(reader)

    soc = web = eml = 0
    for rec in findings:
        r = rows[rec["i"]]
        socials = [s for s in (rec.get("fb"), rec.get("ig")) if s]
        if socials and not r["Instagram / Facebook"].strip():
            r["Instagram / Facebook"] = " | ".join(socials)
            soc += 1
        if rec.get("web") and not r["Website"].strip():
            r["Website"] = rec["web"]
            web += 1
        if rec.get("email") and not r["Email"].strip():
            r["Email"] = rec["email"]
            eml += 1

    with open(CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fn)
        w.writeheader()
        w.writerows(rows)
    print(f"applied: {soc} socials, {web} new websites, {eml} emails")


if __name__ == "__main__":
    main()
