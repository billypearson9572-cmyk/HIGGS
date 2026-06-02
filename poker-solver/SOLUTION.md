# All-In Poker — solved (6-max, push/fold Nash equilibrium)

This is the game-theory-optimal (Nash equilibrium) solution to **All-In
Poker** for a **6-handed** table:

* every player may only **shove all-in** or **fold**;
* the buy-in is **5 big blinds** and a stack is capped at **25bb**, so the
  effective stack always sits in the **5–25bb** band;
* blinds are 0.5bb / 1bb; pay-offs are in chips (cash game, no rake, no ICM).

The strategy depends on the **effective stack** (the smaller of the two stacks
in a confrontation), so the solution is given as a set of charts, one per stack
depth. Full 13×13 grids — pairs, suited and offsuit — are in
[`output/`](output/); see [`README.md`](README.md) for the model, the method
(`eval7` equities + damped iterated best-response), and how to reproduce.

---

## 1. How often to open-shove (first one in)

Percentage of all 169 starting hands shoved when the action folds to you.
(When everyone folds to the BB it is a walk — the BB has no open.)

| Effective stack | UTG | HJ | CO | BTN | SB |
|---|---|---|---|---|---|
| **5bb**  | 21.9% | 27.9% | 33.3% | 41.5% | 72.9% |
| **8bb**  | 18.3% | 23.4% | 29.1% | 37.0% | 67.1% |
| **10bb** | 16.4% | 19.2% | 24.6% | 33.0% | 59.9% |
| **12bb** | 13.1% | 16.7% | 22.2% | 30.3% | 54.4% |
| **15bb** | 10.9% | 13.1% | 18.6% | 27.9% | 49.6% |
| **20bb** |  8.4% | 10.3% | 14.9% | 22.8% | 45.1% |
| **25bb** |  5.6% |  5.7% | 10.3% | 17.6% | 39.7% |

The shape is exactly what theory predicts: ranges get **wider the later your
position** and **wider the shorter the stack**. At 5bb almost everything is a
shove from the button or small blind; by 25bb early position is down to roughly
"big pairs and big-suited aces / AK" because risking 25bb to win 1.5bb demands a
big edge.

## 2. Example open-shoving ranges at 10bb

```
UTG  (38): 22+, A8s+ A5s, ATo+, KTs+ K9s, KQo, QTs+ Q9s, J8s+, JTo, T8s+, 98s
HJ   (45): 22+, A7s+ A4s, A9o+, K8s+, KQo, Q8s+, J8s+, ATo+, JTo, T8s+, 97s+, 87s, 76s+...
CO   (57): 22+, A2s+, A9o+, K6s+, KQo–KJo, Q8s+, QJo, J8s+, JTo, T7s+, 86s+, 76s, 65s
BTN  (69): 22+, A2s+, A9o+, K5s+, A4o+, Q8s+, KJo–QTo–JTo, J8s+, T7s+, 96s+, 86s+, 75s+, 65s, 54s
SB  (116): roughly the top ~70% of hands — almost any ace/king, any pair,
           most suited hands and a broad offsuit range
```

## 3. Example calling ranges (facing one shove)

| Spot | Call % | Range |
|---|---|---|
| **BB vs SB shove, 8bb**  | 42% | any pair, any ace, K2s+/K5o+, Q5s+/Q9o+, J7s+, plus broadway offsuit |
| **BB vs SB shove, 12bb** | 34% | 22+, A2s+, A6o+, K5s+/K9o+, Q8s+, J9s+, broadway offsuit |
| **BB vs SB shove, 20bb** | 21% | 33+, A3s+, A6o+, KTs+/KTo+, QJs, etc. |
| **BB vs BTN shove, 10bb**| 23% | 22+, A2s+, A7o+, K9s+, QJs/QTs, JTs, broadway offsuit |
| **BTN vs UTG shove, 10bb** | 6% | 77+, AJs+, AQo+ — UTG shoves tight, so you call very tight |

Calling ranges tighten as the stack deepens (you risk more to win the same
blinds) and as the shover's position gets earlier (their range is stronger).

---

## Notes on accuracy

* The 5–15bb charts are crisp. The exact borderline hands at **20–25bb** are
  genuinely **near-indifferent** (shoving 25bb to win 1.5bb is a marginal,
  high-variance spot), so the precise marginal combos there are sensitive and
  should be read as "this whole band is roughly break-even" — the **frequency**
  is the robust number, not the identity of the last few hands.
* Heads-up equities are exact (cached `eval7` table); multi-way equities are
  Monte-Carlo (~1% noise) and dominate far fewer decisions.
* This is a chip-EV (cash) solution. In a winner-take-all tournament you would
  layer ICM on top, which tightens calling ranges.
