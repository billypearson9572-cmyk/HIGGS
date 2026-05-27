import { Link } from 'react-router-dom';

export function Practice() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Practice</h1>
        <p className="mt-1 text-felt-200">
          Apply what you learn in a safe, no-money environment.
        </p>
      </header>

      <section className="surface p-5">
        <h2 className="text-lg font-bold">Available now</h2>
        <p className="mt-1 text-sm text-felt-200">
          The Hand Ranking Trainer lets you drill which hand wins. You will find it under Tools.
        </p>
        <Link
          to="/tools"
          className="mt-3 inline-block rounded-lg bg-felt-500 px-5 py-2 font-semibold text-white hover:bg-felt-400"
        >
          Open the trainer
        </Link>
      </section>

      <section className="surface p-5">
        <h2 className="text-lg font-bold">The Practice Table</h2>
        <p className="mt-1 text-sm text-felt-200">
          A simplified single table against rule-based bots is coming in Tier 2, once you have the
          fundamentals to apply. It will give you a short coaching note after each hand.
        </p>
      </section>
    </div>
  );
}
