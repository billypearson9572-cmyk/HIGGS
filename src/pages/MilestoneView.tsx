import { Link, useParams } from 'react-router-dom';
import { getTier } from '../content';
import { useProgress } from '../state/ProgressContext';
import { isMilestoneComplete, isMilestoneUnlocked } from '../state/progress';
import { HandRankingGame } from '../tools/HandRankingGame';

export function MilestoneView() {
  const { tierId = '' } = useParams();
  const { state, completeMilestone } = useProgress();
  const tier = getTier(tierId);

  if (!tier || !isMilestoneUnlocked(state, tierId)) {
    return (
      <div className="surface p-6 text-center">
        <p>Finish all of the tier’s lessons to unlock its milestone.</p>
        <Link to="/learn" className="mt-3 inline-block text-felt-300 underline">
          Back to lessons
        </Link>
      </div>
    );
  }

  const { milestone } = tier;
  const done = isMilestoneComplete(state, tierId);

  function onComplete(correct: number, total: number) {
    if (correct / total >= milestone.passFraction) {
      completeMilestone(tierId, correct, total);
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-sm">
        <Link to="/learn" className="text-felt-300 underline">
          Learn
        </Link>
        <span className="text-felt-500"> / Tier {tier.number} milestone</span>
      </div>

      <header>
        <h1 className="text-2xl font-bold">{milestone.title}</h1>
        <p className="mt-1 text-felt-200">{milestone.description}</p>
        {done && (
          <p className="mt-2 rounded-lg bg-felt-800/60 px-3 py-2 text-sm text-felt-300">
            You have already passed this milestone. Feel free to play again for practice.
          </p>
        )}
      </header>

      {milestone.kind === 'hand-ranking' && (
        <HandRankingGame rounds={milestone.rounds} onComplete={onComplete} />
      )}
    </div>
  );
}
