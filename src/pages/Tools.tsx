import { useProgress } from '../state/ProgressContext';
import { HandRankingGame } from '../tools/HandRankingGame';

const UPCOMING = [
  'Equity & Pot Odds Calculator (Tier 2)',
  'Outs & Odds Drill (Tier 2)',
  'Preflop Range Grids (Tier 3)',
  'Practice Table vs bots (Tier 2)',
];

export function Tools() {
  const { state, recordTrainer } = useProgress();
  const stats = state.trainers['handRanking'];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Tools</h1>
        <p className="mt-1 text-felt-200">
          Hands-on trainers to drill what you have learned. More unlock as you progress.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold">Hand Ranking Trainer</h2>
          {stats && stats.total > 0 && (
            <span className="text-sm text-felt-300">
              All-time: {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
            </span>
          )}
        </div>
        <p className="text-sm text-felt-200">
          Two hands are dealt. Pick the winner, or a split pot if they are equal. Practice for as
          long as you like.
        </p>
        <HandRankingGame rounds={null} onAnswer={(ok) => recordTrainer('handRanking', ok ? 1 : 0, 1)} />
      </section>

      <section className="surface p-5">
        <h2 className="text-lg font-bold">Coming soon</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-felt-300">
          {UPCOMING.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
