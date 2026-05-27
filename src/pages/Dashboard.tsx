import { Link } from 'react-router-dom';
import { tiers } from '../content';
import { useProgress } from '../state/ProgressContext';
import { isLessonComplete, isTierUnlocked, tierProgress } from '../state/progress';
import { ProgressBar } from '../components/ProgressBar';

export function Dashboard() {
  const { state } = useProgress();

  // Find the next lesson the user has not yet completed in an unlocked tier.
  let nextLink = '/learn';
  let nextLabel = 'Browse lessons';
  outer: for (const tier of tiers) {
    if (!isTierUnlocked(state, tier.id)) continue;
    for (const lesson of tier.lessons) {
      if (!isLessonComplete(state, lesson.id)) {
        nextLink = `/learn/${tier.id}/${lesson.id}`;
        nextLabel = lesson.title;
        break outer;
      }
    }
  }

  const overall = tiers.reduce((acc, t) => acc + tierProgress(state, t.id).fraction, 0) / tiers.length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Welcome to PokerPath</h1>
        <p className="mt-1 text-felt-200">
          Learn No-Limit Texas Hold’em from your very first hand to a confident low-stakes regular.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Day streak" value={`${state.streak.current}`} hint={`Best: ${state.streak.longest}`} />
        <StatCard
          label="Lessons done"
          value={`${Object.keys(state.completedLessons).length}`}
          hint={`of ${tiers.reduce((n, t) => n + t.lessons.length, 0)}`}
        />
        <StatCard label="Overall" value={`${Math.round(overall * 100)}%`} hint="across all tiers" />
      </div>

      <section className="surface p-5">
        <div className="text-sm font-semibold text-felt-300">Carry on learning</div>
        <h2 className="mt-1 text-xl font-bold">{nextLabel}</h2>
        <Link
          to={nextLink}
          className="mt-3 inline-block rounded-lg bg-felt-500 px-5 py-2 font-semibold text-white hover:bg-felt-400"
        >
          {nextLabel === 'Browse lessons' ? 'Open lessons' : 'Continue'}
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">Your path</h2>
        {tiers.map((tier) => {
          const tp = tierProgress(state, tier.id);
          const unlocked = isTierUnlocked(state, tier.id);
          return (
            <Link
              key={tier.id}
              to={unlocked ? '/learn' : '#'}
              className={`surface block p-4 ${unlocked ? 'hover:bg-felt-800' : 'opacity-60'}`}
              aria-disabled={!unlocked}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-felt-400">
                    Tier {tier.number}
                  </div>
                  <div className="text-lg font-bold">{tier.title}</div>
                </div>
                {!unlocked && <span className="text-sm text-felt-400">Locked</span>}
              </div>
              <p className="mt-1 text-sm text-felt-200">{tier.description}</p>
              <div className="mt-3">
                <ProgressBar
                  fraction={tp.fraction}
                  label={`${tp.lessonsDone}/${tp.lessonsTotal} lessons${tp.milestoneDone ? ' + milestone' : ''}`}
                />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="surface p-4">
      <div className="text-sm text-felt-300">{label}</div>
      <div className="mt-1 text-2xl font-bold text-felt-50">{value}</div>
      <div className="text-xs text-felt-400">{hint}</div>
    </div>
  );
}
