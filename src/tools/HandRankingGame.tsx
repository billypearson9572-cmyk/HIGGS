import { useCallback, useState } from 'react';
import { dealRankingMatchup, describeHand, type RankingMatchup } from '../lib';
import { CardRow } from '../components/PlayingCard';

type Choice = 'A' | 'B' | 'tie';

interface Props {
  // Fixed number of rounds (milestone) or null for endless practice.
  rounds?: number | null;
  // Called when a fixed-round run finishes.
  onComplete?: (correct: number, total: number) => void;
  // Persist running accuracy back to global stats (practice mode).
  onAnswer?: (correct: boolean) => void;
}

// Core hand-ranking challenge: two five-card hands, pick the winner.
export function HandRankingGame({ rounds = null, onComplete, onAnswer }: Props) {
  const [matchup, setMatchup] = useState<RankingMatchup>(() => dealRankingMatchup());
  const [answered, setAnswered] = useState<Choice | null>(null);
  const [correct, setCorrect] = useState(0);
  const [played, setPlayed] = useState(0);
  const [finished, setFinished] = useState(false);

  const deal = useCallback(() => {
    setMatchup(dealRankingMatchup());
    setAnswered(null);
  }, []);

  function answer(choice: Choice) {
    if (answered) return;
    const isRight = choice === matchup.winner;
    setAnswered(choice);
    const newPlayed = played + 1;
    const newCorrect = correct + (isRight ? 1 : 0);
    setPlayed(newPlayed);
    setCorrect(newCorrect);
    onAnswer?.(isRight);
    if (rounds != null && newPlayed >= rounds) {
      // Defer finish until the player sees the feedback and clicks on.
    }
  }

  function next() {
    if (rounds != null && played >= rounds) {
      setFinished(true);
      onComplete?.(correct, played);
      return;
    }
    deal();
  }

  const accuracy = played > 0 ? Math.round((correct / played) * 100) : 0;
  const isLastRound = rounds != null && played >= rounds;

  if (finished) {
    return (
      <div className="surface p-5 text-center">
        <h3 className="text-xl font-bold">Challenge complete</h3>
        <p className="mt-2 text-felt-200">
          You scored {correct} out of {played} ({accuracy}%).
        </p>
      </div>
    );
  }

  const winner = matchup.winner;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-felt-300">
        <span>
          {rounds != null ? `Round ${Math.min(played + (answered ? 0 : 1), rounds)} of ${rounds}` : 'Practice'}
        </span>
        <span>
          Accuracy: {correct}/{played} ({accuracy}%)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <HandPanel
          title="Hand A"
          matchup={matchup}
          which="A"
          answered={answered}
          winner={winner}
        />
        <HandPanel
          title="Hand B"
          matchup={matchup}
          which="B"
          answered={answered}
          winner={winner}
        />
      </div>

      {!answered ? (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => answer('A')}
            className="flex-1 rounded-lg bg-felt-600 px-4 py-3 font-semibold text-white hover:bg-felt-500"
          >
            Hand A wins
          </button>
          <button
            onClick={() => answer('tie')}
            className="rounded-lg bg-felt-800 px-4 py-3 font-semibold text-felt-100 hover:bg-felt-700"
          >
            Split pot
          </button>
          <button
            onClick={() => answer('B')}
            className="flex-1 rounded-lg bg-felt-600 px-4 py-3 font-semibold text-white hover:bg-felt-500"
          >
            Hand B wins
          </button>
        </div>
      ) : (
        <div className="surface p-4">
          <p className="font-semibold">
            {answered === winner ? 'Correct.' : 'Not this time.'}{' '}
            {winner === 'tie'
              ? 'It is a split pot, both hands are equal.'
              : `Hand ${winner} wins with ${describeHand(winner === 'A' ? matchup.resultA : matchup.resultB)}.`}
          </p>
          <p className="mt-1 text-sm text-felt-300">
            Hand A: {describeHand(matchup.resultA)}. Hand B: {describeHand(matchup.resultB)}.
          </p>
          <button
            onClick={next}
            className="mt-3 rounded-lg bg-felt-500 px-5 py-2 font-semibold text-white hover:bg-felt-400"
          >
            {isLastRound ? 'See results' : 'Next hand'}
          </button>
        </div>
      )}
    </div>
  );
}

function HandPanel({
  title,
  matchup,
  which,
  answered,
  winner,
}: {
  title: string;
  matchup: RankingMatchup;
  which: 'A' | 'B';
  answered: Choice | null;
  winner: Choice;
}) {
  const cards = which === 'A' ? matchup.handA : matchup.handB;
  const isWinner = answered && (winner === which || winner === 'tie');
  return (
    <div className={`surface p-4 ${isWinner ? 'ring-2 ring-felt-300' : ''}`}>
      <div className="mb-2 text-sm font-semibold text-felt-300">{title}</div>
      <CardRow cards={cards} size="md" />
    </div>
  );
}
