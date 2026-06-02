"""
Hand-class definitions and preflop all-in equity engine for the
"All-In Poker" solver.

There are 169 strategically-distinct starting hands (13 pairs, 78 suited,
78 offsuit).  Equities are computed with the `eval7` C evaluator:

  * Heads-up (hero vs. one class) equities are pre-computed into a 169x169
    table via eval7's fast Monte-Carlo and cached on disk.
  * Multi-way (hero vs. 2+ classes) equities are computed lazily with a
    custom Monte-Carlo sampler and cached (they are constants, so the cache
    is valid across the whole solve and is persisted to disk).
"""

import os
import random
import eval7
import numpy as np

RANKS = "AKQJT98765432"
RANK_VAL = {r: 14 - i for i, r in enumerate(RANKS)}
SUITS = "shdc"
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(HERE, "cache")
os.makedirs(CACHE_DIR, exist_ok=True)

# --- 52 card singletons -------------------------------------------------------
_ALL_CARDS = eval7.Deck().cards            # 52 eval7.Card objects
_CARD_BY_STR = {str(c): c for c in _ALL_CARDS}
_BIT = {str(c): i for i, c in enumerate(_ALL_CARDS)}   # card -> 0..51 bit index


def _card(rank, suit):
    return _CARD_BY_STR[rank + suit]


# --- 169 hand classes ---------------------------------------------------------
class HandClass:
    __slots__ = ("idx", "name", "kind", "combos", "combo_masks", "rep")

    def __init__(self, idx, name, kind, combos):
        self.idx = idx
        self.name = name              # e.g. "AKs", "T9o", "QQ"
        self.kind = kind             # 'pair' | 'suited' | 'offsuit'
        self.combos = combos         # list of (Card, Card)
        # bitmask of the two cards, for fast card-removal checks
        self.combo_masks = [(1 << _BIT[str(a)]) | (1 << _BIT[str(b)])
                            for a, b in combos]
        self.rep = combos[0]         # representative combo


def _build_classes():
    classes = []
    idx = 0
    for i, r1 in enumerate(RANKS):
        for j, r2 in enumerate(RANKS):
            if i < j:                                  # suited (high+low)
                combos = [(_card(r1, s), _card(r2, s)) for s in SUITS]
                classes.append(HandClass(idx, r1 + r2 + "s", "suited", combos))
            elif i > j:                                # offsuit
                hi, lo = r2, r1
                combos = [(_card(hi, s1), _card(lo, s2))
                          for s1 in SUITS for s2 in SUITS if s1 != s2]
                classes.append(HandClass(idx, hi + lo + "o", "offsuit", combos))
            else:                                      # pair
                combos = [(_card(r1, SUITS[a]), _card(r1, SUITS[b]))
                          for a in range(4) for b in range(a + 1, 4)]
                classes.append(HandClass(idx, r1 + r1, "pair", combos))
            idx += 1
    return classes


CLASSES = _build_classes()                 # length 169, order = grid order
NAME2IDX = {c.name: c.idx for c in CLASSES}
N = len(CLASSES)                           # 169
COMBOS = np.array([len(c.combos) for c in CLASSES], dtype=float)   # 6/4/12
PRIOR = COMBOS / COMBOS.sum()              # P(class) over a fresh deck (sums 1)

_EVAL = eval7.evaluate


# --- Heads-up equity table ----------------------------------------------------
def _hu_table(iters=40000):
    """169x169 table; eq2[i][j] = equity of class i vs class j heads-up."""
    path = os.path.join(CACHE_DIR, f"hu_{iters}.npy")
    if os.path.exists(path):
        return np.load(path)
    ranges = [eval7.HandRange(c.name) for c in CLASSES]
    eq = np.zeros((N, N), dtype=float)
    for i, c in enumerate(CLASSES):
        hero = list(c.rep)
        for j in range(N):
            eq[i, j] = eval7.py_hand_vs_range_monte_carlo(
                hero, ranges[j], [], iters)
        if i % 20 == 0:
            print(f"  HU table row {i}/{N}")
    np.save(path, eq)
    return eq


EQ2 = _hu_table()


# Precomputed combo lists keyed by class index, for the vectorized sampler.
_COMBO_OBJS = [[list(c) for c in cl.combos] for cl in CLASSES]   # card objects
_COMBO_MASKS = [list(cl.combo_masks) for cl in CLASSES]          # int bitmasks


def multiway_equity_vector(opp_dists, trials=1200, seed=20240601):
    """
    Monte-Carlo the equity of ALL 169 hero classes against a fixed set of
    opponents.

    `opp_dists` is a list (one per committed opponent) of length-169 numpy
    arrays giving that opponent's class distribution.  Returns a length-169
    numpy array: hero[i] = expected pot share of class i in the resulting
    (len(opp_dists)+1)-way all-in.

    Correctness: for every hero class the board is dealt from a deck that
    EXCLUDES both the opponents' cards and the hero's two cards (proper card
    removal).  Opponent samples are shared across hero classes for speed.
    """
    rng = random.Random(seed)
    # nonzero support for each opponent
    opp_support = []
    for d in opp_dists:
        idxs = [i for i in range(N) if d[i] > 0]
        ws = [d[i] for i in idxs]
        s = sum(ws)
        opp_support.append((idxs, [w / s for w in ws]))

    # pre-sample `trials` opponent configurations (cards + combined mask)
    samples = []
    for _ in range(trials):
        used = 0
        cards = []
        ok = True
        for idxs, ws in opp_support:
            cls = rng.choices(idxs, ws)[0]
            masks = _COMBO_MASKS[cls]
            objs = _COMBO_OBJS[cls]
            k = rng.randrange(len(masks))
            if masks[k] & used:                  # rare overlap, just retry once
                k = next((kk for kk in range(len(masks))
                          if not (masks[kk] & used)), -1)
                if k < 0:
                    ok = False
                    break
            used |= masks[k]
            cards.append(objs[k])
        if ok:
            samples.append((used, cards))

    accum = np.zeros(N)
    cnt = np.zeros(N)
    for hi in range(N):
        hmasks = _COMBO_MASKS[hi]
        hobjs = _COMBO_OBJS[hi]
        nh = len(hmasks)
        for used, opp_cards in samples:
            # pick a hero combo disjoint from the opponents
            hk = rng.randrange(nh)
            if hmasks[hk] & used:
                hk = next((k for k in range(nh) if not (hmasks[k] & used)), -1)
                if hk < 0:
                    continue
            hmask = hmasks[hk]
            block = used | hmask
            # deal 5 board cards excluding opponents AND hero
            bmask = block
            board = []
            while len(board) < 5:
                b = rng.randrange(52)
                bit = 1 << b
                if not (bmask & bit):
                    bmask |= bit
                    board.append(_ALL_CARDS[b])
            hs = _EVAL(hobjs[hk] + board)
            opp_scores = [_EVAL(o + board) for o in opp_cards]
            opp_max = max(opp_scores)
            cnt[hi] += 1
            if hs > opp_max:
                accum[hi] += 1.0
            elif hs == opp_max:
                accum[hi] += 1.0 / (1 + sum(1 for s in opp_scores
                                            if s == opp_max))
    cnt[cnt == 0] = 1.0
    return accum / cnt


# --- Global cache for multiway scenario equities -----------------------------
# A scenario's equity depends only on the opponents' RANGES, never on the
# stack size, so one cache is valid across every iteration and every stack.
import pickle
_SCEN_PATH = os.path.join(CACHE_DIR, "scenarios.pkl")
_SCEN = {}
if os.path.exists(_SCEN_PATH):
    with open(_SCEN_PATH, "rb") as f:
        _SCEN = {k: np.asarray(v, dtype=float)
                 for k, v in pickle.load(f).items()}
_SCEN_DIRTY = 0


def save_cache():
    if _SCEN_DIRTY:
        with open(_SCEN_PATH, "wb") as f:
            pickle.dump(_SCEN, f)


def _signature(opp_dists, bucket=0.04, cover=0.93):
    """Hashable, order-independent key from opponents' (rounded) ranges.

    Keeps the strongest classes covering `cover` of each opponent's range mass
    and rounds their probabilities to `bucket`; this bounds the number of
    distinct keys so the cache stays effective.
    """
    sigs = []
    for d in opp_dists:
        order = np.argsort(d)[::-1]
        acc = 0.0
        items = []
        for i in order:
            if d[i] <= 0:
                break
            items.append((int(i), max(1, int(round(d[i] / bucket)))))
            acc += d[i]
            if acc >= cover:
                break
        sigs.append(tuple(sorted(items)))
    return tuple(sorted(sigs))


def _dists_from_sig(sig):
    dists = []
    for items in sig:
        d = np.zeros(N)
        for i, q in items:
            d[i] = q
        s = d.sum()
        dists.append(d / s if s > 0 else d)
    return dists


def sig_of(opp_dists):
    return _signature(opp_dists)


def in_cache(key):
    return key in _SCEN


def mw_cached(opp_dists, trials=900):
    """Cached length-169 multiway equity vector for >=2 opponents."""
    global _SCEN_DIRTY
    key = _signature(opp_dists)
    v = _SCEN.get(key)
    if v is None:
        v = multiway_equity_vector(_dists_from_sig(key), trials=trials)
        _SCEN[key] = v
        _SCEN_DIRTY += 1
    return v


def _compute_key(args):
    key, trials = args
    return key, multiway_equity_vector(_dists_from_sig(key), trials=trials)


_POOL = None


def precompute(keys, trials=900, procs=4):
    """Fill the cache for all missing `keys`, in parallel across processes."""
    global _POOL, _SCEN_DIRTY
    missing = [k for k in keys if k not in _SCEN]
    if not missing:
        return
    if len(missing) < 4 or procs <= 1:
        for k in missing:
            _SCEN[k] = multiway_equity_vector(_dists_from_sig(k), trials=trials)
    else:
        import multiprocessing as mp
        if _POOL is None:
            _POOL = mp.Pool(procs)
        for k, v in _POOL.imap_unordered(
                _compute_key, [(k, trials) for k in missing], chunksize=4):
            _SCEN[k] = v
    _SCEN_DIRTY += len(missing)


def equity(hero_idx, opp_idxs, trials=12000, seed=12345):
    """Scalar hero pot-share vs specific opponent classes (used for tests)."""
    if len(opp_idxs) == 0:
        return 1.0
    if len(opp_idxs) == 1:
        return float(EQ2[hero_idx, opp_idxs[0]])
    dists = []
    for o in opp_idxs:
        d = np.zeros(N)
        d[o] = 1.0
        dists.append(d)
    return float(multiway_equity_vector(dists, trials=trials)[hero_idx])


if __name__ == "__main__":
    # sanity checks
    print("AA vs KK   :", round(EQ2[NAME2IDX['AA'], NAME2IDX['KK']], 4))
    print("AKs vs QQ  :", round(EQ2[NAME2IDX['AKs'], NAME2IDX['QQ']], 4))
    print("72o vs AA  :", round(EQ2[NAME2IDX['72o'], NAME2IDX['AA']], 4))
    print("AA vs KK,QQ:", round(equity(NAME2IDX['AA'],
                                       [NAME2IDX['KK'], NAME2IDX['QQ']]), 4))
