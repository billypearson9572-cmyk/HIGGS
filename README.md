# PokerPath

Learn No-Limit Texas Hold'em from your very first hand to a confident,
GTO-aware low-stakes regular. PokerPath is a browser app with structured
lessons, quizzes, interactive trainers and a focus on solid low-stakes
fundamentals (NL2 to NL25, low buy-in tournaments and home games).

Everything runs locally in your browser. There is no backend and no login;
your progress is saved to `localStorage` and can be exported or imported as
JSON.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Vitest for the poker-maths test suite

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (prints a local URL)
```

Then open the URL Vite prints (usually http://localhost:5173).

## Commands

| Command              | What it does                                            |
| -------------------- | ------------------------------------------------------- |
| `npm run dev`        | Start the development server with hot reload            |
| `npm run build`      | Type-check and build the production bundle into `dist/` |
| `npm run preview`    | Preview the production build locally                    |
| `npm test`           | Run the test suite once                                 |
| `npm run test:watch` | Run tests in watch mode                                 |
| `npm run lint`       | Type-check without emitting                             |

## How the project is organised

```
src/
  lib/         Pure poker maths (cards, hand evaluator, dealing). Fully tested.
  content/     All lesson text, quizzes and the glossary live here as data.
  state/       Progress + settings persistence and React context.
  components/  Reusable UI (nav, layout, cards, quiz, progress bar).
  pages/       One file per screen (Dashboard, Learn, Lesson, Tools, etc.).
  tools/       Interactive trainers (Hand Ranking Trainer).
```

### Where the lesson content lives

All teaching content is plain data, kept separate from the UI so you can edit
it without touching React code:

- **Lessons and quizzes:** `src/content/tier1.ts` (and `tier2.ts`, `tier3.ts`
  as later tiers are added). Each lesson is a list of content blocks
  (paragraphs, lists, definitions, callouts) followed by quiz questions.
- **Glossary:** `src/content/glossary.ts`.
- **Tier registry:** `src/content/index.ts` lists the tiers in order. Add a new
  tier object to `tiers` and the navigation, locking and progress tracking pick
  it up automatically.

To edit a lesson, open the relevant tier file and change the `blocks` or `quiz`
arrays. The format is documented by the types in `src/content/types.ts`.

## Poker maths and tests

The strategy content depends on correct poker maths, so the `/lib` layer is
pure (no UI) and covered by tests in `src/lib/*.test.ts`:

- A correct 5-from-7 hand evaluator (exact, not approximated): it checks every
  five-card combination and keeps the strongest.
- Known-spot tests: hand-ranking ladder, tiebreakers, the wheel straight
  (A-2-3-4-5), seven-card best-hand selection, and split pots.

Run `npm test` after editing any maths to make sure the strategy content cannot
silently break.

## Accessibility

Open **Progress** in the app to toggle:

- High-contrast mode
- A dyslexia-friendly font (Atkinson Hyperlegible / Lexend)
- Generous line spacing
- Reduced motion (also respects your operating system setting)

Settings are saved per device.

## Backing up your progress

On the **Progress** screen you can export your progress to a JSON file and
import it again later or on another device.

## Roadmap

- **Tier 1: Foundations** - built. The deck and hand rankings, the table and
  blinds, betting actions, the flow of a hand, etiquette and online play, plus
  the Hand Ranking Trainer and a milestone challenge.
- **Tier 2: Fundamentals** - position, starting hands, pot odds and outs, value
  vs bluff, bet sizing, bankroll management, common leaks, the Equity & Pot Odds
  Calculator, the Outs & Odds Drill and the Practice Table.
- **Tier 3: Advanced** - thinking in ranges, interactive preflop range grids,
  c-betting and board texture, blockers and combinatorics, GTO vs exploitative
  play, and tournament basics including ICM and push/fold.
