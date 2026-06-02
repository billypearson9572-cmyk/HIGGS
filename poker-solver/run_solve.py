"""
Solve "All-In Poker" (6-max push/fold) across a range of effective stacks and
write the equilibrium strategies to output/ as JSON + readable markdown.

Usage:
    python3 run_solve.py                      # default stacks
    python3 run_solve.py 5 10 15 20 25        # custom stacks (in big blinds)
"""

import os
import sys
import json
import time
import numpy as np

import equity as E
import solver as S
import charts as C

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
os.makedirs(OUT, exist_ok=True)

DEFAULT_STACKS = [5, 8, 10, 12, 15, 20, 25]


def ctx_key(ctx):
    return ",".join(S.POS[s] for s in sorted(ctx)) if ctx else "-"


def solve_all(stacks, iters=24, warm_iters=14, mc_trials=900):
    results = {}
    warm = None
    for sval in stacks:
        t = time.time()
        # warm-start from the previous stack's solution for speed/stability
        start, st_t, niter = None, 0, iters
        if warm is not None:
            start = S.Strategy(0.0)
            for seat in range(S.NSEAT):
                for ctx in S.all_contexts(seat):
                    start.s[seat][ctx] = warm[seat][ctx].copy()
            st_t, niter = 4, warm_iters       # refine, don't reset
        strat = S.solve(sval, iters=niter, mc_trials=mc_trials,
                        strat=start, start_t=st_t)
        warm = strat.s
        results[sval] = {seat: {ctx: strat.get(seat, ctx).copy()
                                for ctx in S.all_contexts(seat)}
                         for seat in range(S.NSEAT)}
        E.save_cache()
        print(f"[stack {sval}bb] solved in {time.time()-t:.0f}s, "
              f"cache={len(E._SCEN)}")
    return results


def write_json(results):
    blob = {}
    for sval, seats in results.items():
        blob[str(sval)] = {
            S.POS[seat]: {ctx_key(ctx): [round(float(x), 4) for x in arr]
                          for ctx, arr in ctxs.items()}
            for seat, ctxs in seats.items()}
    with open(os.path.join(OUT, "strategies.json"), "w") as f:
        json.dump(blob, f)
    print("wrote output/strategies.json")


def open_summary_table(results, stacks):
    opos = S.POS[:S.BB_SEAT]              # BB has no open (folded-to-BB = a walk)
    lines = ["## Open-shove frequency (% of all hands) by position and stack",
             "",
             "_When everyone folds to the BB it is a walk, so the BB has no "
             "open-shoving decision; the BB only ever calls._",
             "",
             "| Stack | " + " | ".join(opos) + " |",
             "|" + "---|" * (len(opos) + 1)]
    for sval in stacks:
        row = [f"{sval}bb"]
        for seat in range(S.BB_SEAT):
            arr = results[sval][seat][frozenset()]
            row.append(f"{C.pct_of_hands(arr):.1f}%")
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def write_open_charts(results, stacks):
    for sval in stacks:
        md = [f"# Open-shove (first-in) ranges — {sval}bb effective, 6-max",
              "",
              "Cell = % of the time the hand is shoved. Rows = first card, "
              "columns = second card; upper-right triangle = suited, "
              "lower-left = offsuit, diagonal = pairs.", ""]
        for seat in range(S.BB_SEAT):     # UTG..SB; BB folded-to is a walk
            arr = results[sval][seat][frozenset()]
            p, su, o = C.range_list(arr)
            md.append(f"## {S.POS[seat]}  —  {C.pct_of_hands(arr):.1f}% of hands")
            md.append("")
            md.append(C.grid_markdown(arr))
            md.append("")
            md.append("```")
            md.append(C.grid_ascii(arr))
            md.append("```")
            md.append(f"**Pairs:** {' '.join(p) or '—'}  ")
            md.append(f"**Suited:** {' '.join(su) or '—'}  ")
            md.append(f"**Offsuit:** {' '.join(o) or '—'}")
            md.append("")
        with open(os.path.join(OUT, f"open_{sval}bb.md"), "w") as f:
            f.write("\n".join(md))


def write_call_charts(results, stacks):
    """Calling ranges facing exactly one prior shover (heads-up call)."""
    for sval in stacks:
        md = [f"# Calling ranges vs a single shove — {sval}bb effective, 6-max",
              "",
              "Each block: hero in the named seat, calling all-in after exactly "
              "one earlier player has shoved (everyone between folded).", ""]
        for shover in range(S.NSEAT):
            for hero in range(shover + 1, S.NSEAT):
                ctx = frozenset({shover})
                arr = results[sval][hero][ctx]
                pc = C.pct_of_hands(arr)
                md.append(f"## {S.POS[hero]} calls vs {S.POS[shover]} shove "
                          f"—  {pc:.1f}% of hands")
                md.append("")
                md.append(C.grid_markdown(arr))
                md.append("")
                p, su, o = C.range_list(arr)
                md.append(f"**Pairs:** {' '.join(p) or '—'}  ")
                md.append(f"**Suited:** {' '.join(su) or '—'}  ")
                md.append(f"**Offsuit:** {' '.join(o) or '—'}")
                md.append("")
        with open(os.path.join(OUT, f"calls_{sval}bb.md"), "w") as f:
            f.write("\n".join(md))


def main():
    stacks = [int(x) for x in sys.argv[1:]] or DEFAULT_STACKS
    print("solving stacks:", stacks)
    results = solve_all(stacks)
    write_json(results)
    write_open_charts(results, stacks)
    write_call_charts(results, stacks)
    with open(os.path.join(OUT, "summary.md"), "w") as f:
        f.write(open_summary_table(results, stacks) + "\n")
    print("done. outputs in", OUT)


if __name__ == "__main__":
    main()
