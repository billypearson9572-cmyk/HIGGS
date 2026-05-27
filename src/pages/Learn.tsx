import { Link } from 'react-router-dom';
import { tiers } from '../content';
import { useProgress } from '../state/ProgressContext';
import {
  isLessonComplete,
  isMilestoneComplete,
  isMilestoneUnlocked,
  isTierUnlocked,
  tierProgress,
} from '../state/progress';
import { ProgressBar } from '../components/ProgressBar';

function Tick({ done }: { done: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
        done ? 'border-felt-300 bg-felt-500 text-white' : 'border-felt-600 text-felt-500'
      }`}
      aria-hidden
    >
      {done ? '✓' : ''}
    </span>
  );
}

export function Learn() {
  const { state } = useProgress();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="mt-1 text-felt-200">
          Work through the tiers in order. Each tier unlocks when you finish the one before it.
        </p>
      </header>

      {tiers.map((tier) => {
        const unlocked = isTierUnlocked(state, tier.id);
        const tp = tierProgress(state, tier.id);
        const milestoneUnlocked = isMilestoneUnlocked(state, tier.id);
        const milestoneDone = isMilestoneComplete(state, tier.id);

        return (
          <section key={tier.id} className={`surface p-5 ${unlocked ? '' : 'opacity-70'}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-felt-400">
                  Tier {tier.number} · {tier.tagline}
                </div>
                <h2 className="text-xl font-bold">{tier.title}</h2>
                <p className="mt-1 text-sm text-felt-200">{tier.description}</p>
              </div>
              {!unlocked && <span className="rounded bg-felt-800 px-2 py-1 text-xs text-felt-300">Locked</span>}
            </div>

            <div className="mt-4">
              <ProgressBar fraction={tp.fraction} />
            </div>

            {unlocked && (
              <ul className="mt-4 space-y-2">
                {tier.lessons.map((lesson) => {
                  const done = isLessonComplete(state, lesson.id);
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/learn/${tier.id}/${lesson.id}`}
                        className="flex items-center gap-3 rounded-lg border border-felt-700 bg-felt-800/50 px-3 py-3 hover:bg-felt-800"
                      >
                        <Tick done={done} />
                        <span className="flex-1">
                          <span className="font-semibold text-felt-50">{lesson.title}</span>
                          <span className="block text-xs text-felt-300">
                            {lesson.summary} · {lesson.minutes} min
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link
                    to={milestoneUnlocked ? `/learn/${tier.id}/milestone` : '#'}
                    aria-disabled={!milestoneUnlocked}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-3 ${
                      milestoneUnlocked
                        ? 'border-clay-600 bg-clay-900/30 hover:bg-clay-900/50'
                        : 'border-felt-700 bg-felt-800/30 opacity-60'
                    }`}
                  >
                    <Tick done={milestoneDone} />
                    <span className="flex-1">
                      <span className="font-semibold text-felt-50">
                        Milestone: {tier.milestone.title}
                      </span>
                      <span className="block text-xs text-felt-300">
                        {milestoneUnlocked
                          ? tier.milestone.description
                          : 'Finish all lessons above to unlock the milestone.'}
                      </span>
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
