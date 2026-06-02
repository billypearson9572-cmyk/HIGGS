"""Build a single consolidated answer sheet (ANSWERS.md) with compact
poker range notation (e.g. "22+, A8s+, KTo+") from strategies.json."""

import json
import os
import numpy as np
import equity as E
import solver as S

RANKS = "AKQJT98765432"
VAL = {r: 14 - i for i, r in enumerate(RANKS)}            # A=14 .. 2=2
ORD = sorted(RANKS, key=lambda r: -VAL[r])                # high -> low
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "output")


def _runs(values):
    """Group a set of integer card-values into descending consecutive runs."""
    vs = sorted(values, reverse=True)
    runs, cur = [], []
    for v in vs:
        if cur and cur[-1] - 1 == v:
            cur.append(v)
        else:
            if cur:
                runs.append(cur)
            cur = [v]
    if cur:
        runs.append(cur)
    return runs                                            # each hi..lo


def _r(v):
    for r, val in VAL.items():
        if val == v:
            return r
    return "?"


def compress(arr, thr=0.5):
    """Turn a 169-vector into compact notation grouped pairs/suited/offsuit."""
    present = {E.CLASSES[i].name for i in range(169) if arr[i] >= thr}
    parts = []

    # pairs -> "22+" / "TT-77"
    pv = [VAL[r] for r in RANKS if (r + r) in present]
    for run in _runs(pv):
        hi, lo = run[0], run[-1]
        if hi == 14:
            parts.append(f"{_r(lo)}{_r(lo)}+")
        elif hi == lo:
            parts.append(f"{_r(lo)}{_r(lo)}")
        else:
            parts.append(f"{_r(hi)}{_r(hi)}-{_r(lo)}{_r(lo)}")

    # suited then offsuit, keyed by high card
    for suit, tag in (("s", "s"), ("o", "o")):
        for x in ORD:
            vx = VAL[x]
            kick = [VAL[y] for y in RANKS
                    if VAL[y] < vx and (x + y + suit) in present]
            for run in _runs(kick):
                hi, lo = run[0], run[-1]
                if hi == vx - 1:                            # connects to high card
                    parts.append(f"{x}{_r(lo)}{tag}+")
                elif hi == lo:
                    parts.append(f"{x}{_r(lo)}{tag}")
                else:
                    parts.append(f"{x}{_r(hi)}-{x}{_r(lo)}{tag}")
    return ", ".join(parts) if parts else "(fold everything)"


def pct(arr, thr=0.5):
    return float(np.dot((np.asarray(arr) >= thr).astype(float), E.PRIOR)) * 100


def main():
    d = json.load(open(os.path.join(OUT, "strategies.json")))
    stacks = sorted((int(k) for k in d), key=int)
    POS = S.POS
    L = []
    L.append("# All-In Poker — complete answer sheet (6-max)\n")
    L.append("Shove-or-fold Nash equilibrium, chip-EV. Effective stack = the "
             "smaller stack in the pot. Notation: `+` means that hand and all "
             "stronger kickers (e.g. `A8s+` = A8s–AKs; `22+` = all pairs).\n")

    # ---- open-shoving ----
    L.append("## A. Open-shoving (folded to you)\n")
    for sval in stacks:
        L.append(f"### {sval}bb effective\n")
        L.append("| Pos | % | Shove range |")
        L.append("|---|---|---|")
        for seat in range(S.BB_SEAT):                       # UTG..SB
            arr = np.array(d[str(sval)][POS[seat]]["-"])
            L.append(f"| {POS[seat]} | {pct(arr):.1f}% | {compress(arr)} |")
        L.append("")

    # ---- calling one shove ----
    L.append("## B. Calling a single all-in (everyone between folded)\n")
    for sval in stacks:
        L.append(f"### {sval}bb effective\n")
        L.append("| Hero | vs shove from | % | Call range |")
        L.append("|---|---|---|---|")
        for shover in range(S.NSEAT):
            for hero in range(shover + 1, S.NSEAT):
                arr = np.array(d[str(sval)][POS[hero]][POS[shover]])
                L.append(f"| {POS[hero]} | {POS[shover]} | {pct(arr):.1f}% | "
                         f"{compress(arr)} |")
        L.append("")

    with open(os.path.join(OUT, "ANSWERS.md"), "w") as f:
        f.write("\n".join(L))
    print("wrote", os.path.join(OUT, "ANSWERS.md"))


if __name__ == "__main__":
    main()
