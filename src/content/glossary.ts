export interface GlossaryTerm {
  term: string;
  definition: string;
  // Tier where the term is first introduced, for filtering.
  tier: number;
}

// Searchable glossary. Terms introduced in lessons are collected here so they
// can be looked up at any time. More are added as later tiers are built.
export const glossary: GlossaryTerm[] = [
  { term: 'All-in', definition: 'Putting all of your remaining chips into the pot. You can never wager more than you have on the table.', tier: 1 },
  { term: 'Bet', definition: 'Putting chips in when nobody else has bet yet this round, forcing others to call, raise or fold.', tier: 1 },
  { term: 'Big blind', definition: 'The larger forced bet, posted two seats left of the button. It sets the basic bet size, and stakes are named after it (NL2 = 2p big blind).', tier: 1 },
  { term: 'Button', definition: 'A disc marking the nominal dealer for the hand. It moves one seat clockwise each hand. The button acts last after the first betting round, which is a big advantage.', tier: 1 },
  { term: 'Call', definition: 'Matching the current bet so you can carry on in the hand.', tier: 1 },
  { term: 'Check', definition: 'Passing the action to the next player without betting. Only possible if nobody has bet yet this round.', tier: 1 },
  { term: 'Community cards', definition: 'The shared face-up cards in the middle of the table. Everyone combines them with their hole cards.', tier: 1 },
  { term: 'Flop', definition: 'The first three community cards, dealt face up at once, followed by a round of betting.', tier: 1 },
  { term: 'Flush', definition: 'Any five cards of the same suit, not in a row. Beats a straight.', tier: 1 },
  { term: 'Fold', definition: 'Giving up your hand and any chips already committed. You cannot win the pot but you lose nothing more.', tier: 1 },
  { term: 'Full house', definition: 'Three of a kind plus a pair, for example three 8s and two 4s.', tier: 1 },
  { term: 'High card', definition: 'A hand with no pair or better. Your highest card plays.', tier: 1 },
  { term: 'Hole cards', definition: 'Your two private cards, dealt face down. Only you can see them.', tier: 1 },
  { term: 'Kicker', definition: 'A side card that breaks a tie when two hands are otherwise equal. A-A-K beats A-A-Q on the King kicker.', tier: 1 },
  { term: 'Multi-tabling', definition: 'Playing more than one online table at once. Best left until you are an experienced player.', tier: 1 },
  { term: 'Pot', definition: 'The total pile of chips everyone is competing for in the current hand.', tier: 1 },
  { term: 'Preflop', definition: 'The first betting round, before any community cards are dealt.', tier: 1 },
  { term: 'Raise', definition: 'Increasing the current bet so that others must match the larger amount to continue.', tier: 1 },
  { term: 'River', definition: 'The fifth and final community card, followed by the last round of betting.', tier: 1 },
  { term: 'Royal flush', definition: 'A, K, Q, J, 10 all of one suit. The best possible hand.', tier: 1 },
  { term: 'Showdown', definition: 'When remaining players reveal their hole cards after the final bet and the best five-card hand wins.', tier: 1 },
  { term: 'Small blind', definition: 'The smaller forced bet, posted by the player directly to the left of the button.', tier: 1 },
  { term: 'Straight', definition: 'Five cards in a row of mixed suits, for example 10-9-8-7-6.', tier: 1 },
  { term: 'Straight flush', definition: 'Five cards in a row, all of the same suit.', tier: 1 },
  { term: 'Suit', definition: 'One of the four families of cards: clubs, diamonds, hearts or spades. No suit outranks another.', tier: 1 },
  { term: 'Time bank', definition: 'A reserve of extra seconds online software gives you for difficult decisions.', tier: 1 },
];

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.trim().toLowerCase();
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  if (!q) return sorted;
  return sorted.filter(
    (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
  );
}
