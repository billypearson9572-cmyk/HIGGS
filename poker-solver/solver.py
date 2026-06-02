"""
Nash-equilibrium solver for "All-In Poker" (6-handed push/fold).

Game model
----------
  * 6 seats act in order:  UTG, HJ, CO, BTN, SB, BB.
  * Blinds: SB posts 0.5bb, BB posts 1bb.
  * Each seat starts the hand with an equal effective stack of S big blinds.
  * The ONLY legal actions are SHOVE (commit the whole stack) or FOLD.
    Because stacks are equal, a "call" of a prior shove is also all-in, and
    several players can be all-in for the same amount (one single pot, no
    side pots).
  * Pay-offs are measured in chips (chip-EV / cash game, no rake, no ICM).

A strategy assigns, to every (seat, history-of-prior-shovers, hand-class),
a probability of committing.  We find an approximate Nash equilibrium by
damped iterated best response.

This is the standard "Nash push/fold" model; see README.md for the exact
assumptions and approximations.
"""

import numpy as np
from itertools import combinations
import equity as E

N = E.N
PRIOR = E.PRIOR                         # P(class) in a fresh deck
POS = ["UTG", "HJ", "CO", "BTN", "SB", "BB"]
NSEAT = 6
SB_SEAT, BB_SEAT = 4, 5
POSTED = {SB_SEAT: 0.5, BB_SEAT: 1.0}   # dead blind a seat loses by folding


def all_contexts(seat):
    """Every subset of earlier seats that could already be committed."""
    earlier = list(range(seat))
    ctxs = []
    for r in range(len(earlier) + 1):
        for c in combinations(earlier, r):
            ctxs.append(frozenset(c))
    return ctxs


class Strategy:
    """strat[seat][context] -> np.array(169) of commit probabilities."""

    def __init__(self, init=0.0):
        self.s = {}
        for seat in range(NSEAT):
            self.s[seat] = {ctx: np.full(N, init) for ctx in all_contexts(seat)}

    def get(self, seat, ctx):
        return self.s[seat][ctx]


def commit_prob(strat, seat, ctx):
    """Marginal P(seat commits | ctx), averaged over a fresh-deck hand."""
    return float(np.dot(strat.get(seat, ctx), PRIOR))


def commit_dist(strat, seat, ctx):
    """Class distribution of `seat` conditional on committing in `ctx`."""
    w = strat.get(seat, ctx) * PRIOR
    tot = w.sum()
    if tot <= 0:
        return None
    return w / tot


ONES = np.ones(N)
PRUNE = 1.2e-3       # drop scenarios rarer than this (negligible EV weight)


def scenario_equity_vec(opp_dists, mc_trials):
    """Length-169 vector of hero equities vs a set of opponents."""
    n = len(opp_dists)
    if n == 0:
        return ONES
    if n == 1:
        return E.EQ2 @ opp_dists[0]          # exact, from the HU table
    return E.mw_cached(opp_dists, trials=mc_trials)


def build_scenarios(strat, seat, ctx, S):
    """
    Forward pass over seats acting AFTER `seat` (who has just committed),
    given the already-committed set `ctx`.  Returns a list of scenarios:
        (list_of_opponent_class_dists, pot_size, probability)
    """
    before_dists = []
    for j in sorted(ctx):                    # opponents already all-in
        d = commit_dist(strat, j, frozenset(x for x in ctx if x < j))
        if d is not None:
            before_dists.append(d)

    # each state: (committed_full_set, prob, later_committer_dists)
    states = [(frozenset(ctx) | {seat}, 1.0, [])]
    for m in range(seat + 1, NSEAT):
        nxt = []
        for cs, p, lcs in states:
            ctxm = frozenset(s for s in cs if s < m)
            pc = commit_prob(strat, m, ctxm)
            if p * (1 - pc) > PRUNE:
                nxt.append((cs, p * (1 - pc), lcs))
            if p * pc > PRUNE:
                d = commit_dist(strat, m, ctxm)
                nxt.append((cs | {m}, p * pc, lcs + [d]))
        states = nxt

    scenarios = []
    for cs, p, lcs in states:
        if p <= PRUNE:
            continue
        dead = (0.5 if SB_SEAT not in cs else 0.0) + \
               (1.0 if BB_SEAT not in cs else 0.0)
        pot = S * len(cs) + dead             # len(cs) includes hero `seat`
        scenarios.append((before_dists + lcs, pot, p))
    return scenarios


def best_response(strat, S, mc_trials=900, procs=4):
    """Best-response commit probability for every (seat, ctx, class)."""
    # Pass 1: enumerate every decision node's scenarios and collect the set of
    # multi-way range-keys we will need, then compute the missing ones in
    # parallel so the EV pass hits a warm cache.
    nodes = []
    keys = set()
    for seat in range(NSEAT):
        for ctx in all_contexts(seat):
            scen = build_scenarios(strat, seat, ctx, S)
            nodes.append((seat, ctx, scen))
            for opp_dists, _pot, _p in scen:
                if len(opp_dists) >= 2:
                    keys.add(E.sig_of(opp_dists))
    E.precompute(keys, trials=mc_trials, procs=procs)

    # Pass 2: EV and best response (all multi-way equities now cached).
    br = Strategy(0.0)
    for seat, ctx, scen in nodes:
        ev_fold = -POSTED.get(seat, 0.0)
        ev_commit = np.full(N, -float(S))
        for opp_dists, pot, p in scen:
            ev_commit += (p * pot) * scenario_equity_vec(opp_dists, mc_trials)
        br.s[seat][ctx] = (ev_commit > ev_fold).astype(float)
    return br


def solve(S, iters=40, mc_trials=900, strat=None, tol=0.015,
          start_t=0, verbose=True):
    """Damped iterated best response -> approximate Nash equilibrium.

    `start_t` offsets the fictitious-play step schedule; pass a positive value
    when warm-starting from an already-good strategy so the first pass refines
    it instead of overwriting it (alpha=1 at t=0).
    """
    if strat is None:
        strat = Strategy(0.5)
    for t in range(iters):
        br = best_response(strat, S, mc_trials=mc_trials)
        alpha = 2.0 / (t + start_t + 2.0)  # diminishing step (fictitious-play)
        max_delta = 0.0
        for seat in range(NSEAT):
            for ctx in all_contexts(seat):
                old = strat.get(seat, ctx)
                new = (1 - alpha) * old + alpha * br.get(seat, ctx)
                max_delta = max(max_delta, float(np.abs(new - old).max()))
                strat.s[seat][ctx] = new
        if verbose and (t % 2 == 0 or t == iters - 1):
            print(f"  S={S:>4}bb  iter {t:2d}  alpha={alpha:.3f}  "
                  f"max_delta={max_delta:.4f}  cache={len(E._SCEN)}", flush=True)
        if t >= 6 and max_delta < tol:
            break
    E.save_cache()
    return strat
