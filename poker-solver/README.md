# All-In Poker solver (6-max push/fold Nash equilibrium)

A solver for the variant described as **"All-In Poker"**:

* 6 players.
* The only legal actions are **shove (all-in)** or **fold** — no limping, no
  sizing choices.
* Buy-in is **5 big blinds**; a stack is capped at **25 big blinds** (chips
  above 25bb are not put at risk, so the most anyone can wager is 25bb).
* Blinds are 0.5bb (small) and 1bb (big).

Because the wager is always "your whole stack," the strategic problem is a
classic **jam-or-fold** game. This tool computes an approximate **Nash
equilibrium** (a strategy no player can deviate from profitably) and prints
the result as the familiar 13×13 starting-hand grids, separately for pairs,
suited hands and offsuit hands.

## How the game is modelled

* **Action order:** UTG → HJ → CO → BTN → SB → BB.
* **Equal effective stacks.** Every chart is computed for one common
  effective stack `S` (in big blinds). Since the only bet is all-in, when two
  players are all-in for the same amount there are no side pots — the whole
  thing is one pot. For an unequal-stack table, use the chart for the
  *smaller* of the two relevant stacks (the effective stack), which is exactly
  how push/fold charts are used in practice. Charts are produced across the
  whole legal band, `S = 5 … 25bb`.
* **Chip-EV (cash game).** Pay-offs are measured directly in chips, with **no
  rake** and **no ICM/tournament** adjustment — appropriate for a cash-style
  game where 5bb is the buy-in and you reload. (ICM would only matter in a
  winner-take-all tournament context.)
* A player who folds loses only their posted blind (0 for non-blinds, 0.5bb
  for the SB, 1bb for the BB). A player who commits puts their whole stack `S`
  in; if they end up `k`-way all-in the pot is `k·S` plus any dead blinds, and
  their chip EV is `equity · pot − S`.

This is the standard "Nash push/fold" model used by tools such as
HoldemResources / ICMIZER; the charts are directly comparable to published
heads-up-and-blinds Nash ranges in the spots that overlap.

## Method

1. **Equities** (`equity.py`)
   * 169 strategically-distinct hands; combos are tracked exactly (pairs 6,
     suited 4, offsuit 12) and card removal is respected.
   * Heads-up equities: a 169×169 table built once with the `eval7` C
     evaluator (Monte-Carlo, ~40k boards/matchup) and cached on disk.
   * Multi-way equities: a custom Monte-Carlo that returns the equity of all
     169 hero classes against a fixed set of opponent ranges in one pass, with
     correct per-hero board removal. A scenario's equity depends only on the
     opponents' *ranges* (never on the stack), so results are cached globally
     and reused across every iteration and every stack size.

2. **Equilibrium** (`solver.py`)
   * A strategy assigns, to every `(seat, set-of-earlier-shovers, hand-class)`,
     a probability of committing.
   * We iterate **damped best response** (fictitious-play step
     `α = 2/(t+2)`). Each best-response pass, for every decision node, builds
     the distribution over how the remaining players react (including
     over-calls / multi-way all-ins, pruning branches below 3·10⁻⁴
     probability) and commits a hand iff `EV(shove) > EV(fold)`.
   * Solving is warm-started from the previous (smaller) stack for speed and
     stability.

### Approximations (so the results are honest)

* Equilibrium is found by iterated best response, not an exact LP, so ranges
  are accurate to ~a combo or two near the indifference threshold.
* Card removal between *opponents* (and between opponents and the board beyond
  the hero) is treated independently; the effect is sub-1-combo.
* Multi-way equities are Monte-Carlo (≈1–2% noise) and their range-keys are
  lightly bucketed for caching. Heads-up equities — which dominate most
  decisions — are exact from the table.

## Running

```bash
pip install eval7 numpy
python3 equity.py                 # builds + validates the HU equity table
python3 run_solve.py              # solves S = 5,8,10,12,15,20,25 bb
python3 run_solve.py 10 20        # or pick your own stacks
```

Outputs land in `output/`:

* `summary.md` — open-shove frequency by position × stack.
* `open_<S>bb.md` — the six open-shoving grids for each stack.
* `calls_<S>bb.md` — calling ranges facing a single prior shove.
* `strategies.json` — the full equilibrium (every seat, every history,
  169-vector of commit probabilities) for downstream use.

## Reading a grid

Rows are the first card, columns the second, ranks ordered A→2. The
upper-right triangle is **suited**, the lower-left is **offsuit**, the diagonal
is **pairs**. A cell value is the % of the time that hand commits (100 = always
shove/call, · = always fold, a number = a mixed/threshold hand).
