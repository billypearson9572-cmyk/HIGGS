import type { Card } from '../lib';
import { rankLabel, suitSymbol, suitName, isRedSuit } from '../lib';

interface Props {
  card: Card;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: 'w-9 h-12 text-base',
  md: 'w-12 h-16 text-xl',
  lg: 'w-16 h-24 text-2xl',
} as const;

// A clean, high-contrast playing card. Red suits use a warm red that still
// passes contrast on the white face.
export function PlayingCard({ card, size = 'md' }: Props) {
  const red = isRedSuit(card.suit);
  return (
    <div
      className={`${SIZES[size]} relative flex flex-col items-center justify-center rounded-lg bg-white font-semibold shadow-md`}
      role="img"
      aria-label={`${rankLabel(card.rank)} of ${suitName(card.suit)}`}
    >
      <span className={red ? 'text-red-700' : 'text-slate-900'}>{rankLabel(card.rank)}</span>
      <span className={`${red ? 'text-red-700' : 'text-slate-900'} leading-none`} aria-hidden>
        {suitSymbol(card.suit)}
      </span>
    </div>
  );
}

export function CardRow({ cards, size = 'md' }: { cards: Card[]; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {cards.map((c, i) => (
        <PlayingCard key={`${c.rank}${c.suit}-${i}`} card={c} size={size} />
      ))}
    </div>
  );
}
