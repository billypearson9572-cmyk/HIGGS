"""Rendering helpers: turn a length-169 commit-probability vector into a
13x13 hand grid (the standard poker matrix) and into compact range lists."""

import numpy as np
import equity as E

RANKS = E.RANKS


def cell_name(i, j):
    """Class name for grid row i, col j (i,j index into RANKS, A=0..2=12)."""
    if i < j:
        return RANKS[i] + RANKS[j] + "s"
    if i > j:
        return RANKS[j] + RANKS[i] + "o"
    return RANKS[i] + RANKS[i]


def pct_of_hands(arr, thr=0.5):
    """Combo-weighted percentage of hands with commit prob >= thr."""
    return float(np.dot((arr >= thr).astype(float), E.PRIOR)) * 100.0


def grid_markdown(arr):
    """13x13 markdown table of commit percentages (rows/cols = card ranks)."""
    head = "| |" + "|".join(RANKS) + "|"
    sep = "|" + "---|" * 14
    lines = [head, sep]
    for i in range(13):
        row = [RANKS[i]]
        for j in range(13):
            p = arr[E.NAME2IDX[cell_name(i, j)]] * 100
            if p >= 99.5:
                row.append("100")
            elif p <= 0.5:
                row.append("·")
            else:
                row.append(str(int(round(p))))
        lines.append("|" + "|".join(row) + "|")
    return "\n".join(lines)


def grid_ascii(arr):
    """Compact monospaced grid; X=shove, .=fold, digit=mixed (tens of %)."""
    out = ["    " + " ".join(f"{r}" for r in RANKS)]
    for i in range(13):
        cells = []
        for j in range(13):
            p = arr[E.NAME2IDX[cell_name(i, j)]]
            if p >= 0.95:
                cells.append("X")
            elif p <= 0.05:
                cells.append(".")
            else:
                cells.append(str(min(9, max(1, int(round(p * 10))))))  # 1..9
        out.append(f"{RANKS[i]}   " + " ".join(cells))
    return "\n".join(out)


def range_list(arr, thr=0.5):
    """Readable list of the hands in the range (pairs, suited, offsuit)."""
    pairs, suited, offsuit = [], [], []
    for c in E.CLASSES:
        if arr[c.idx] >= thr:
            (pairs if c.kind == "pair"
             else suited if c.kind == "suited" else offsuit).append(c.name)
    return pairs, suited, offsuit
