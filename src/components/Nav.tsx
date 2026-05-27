import { NavLink } from 'react-router-dom';

interface Item {
  to: string;
  label: string;
  icon: string; // SVG path data
}

// Simple line icons (Heroicons-style paths) to avoid an icon dependency.
const ITEMS: Item[] = [
  { to: '/', label: 'Home', icon: 'M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5' },
  { to: '/learn', label: 'Learn', icon: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 5.5v15' },
  { to: '/practice', label: 'Practice', icon: 'M5 12h14M12 5l7 7-7 7' },
  { to: '/tools', label: 'Tools', icon: 'M11 5a3 3 0 1 0 4 4l-7 7-3 1 1-3z' },
  { to: '/glossary', label: 'Glossary', icon: 'M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2zM6 4v16M9 8h7M9 12h7' },
  { to: '/progress', label: 'Progress', icon: 'M4 19V5m0 14h16M8 16V9m4 7V6m4 10v-4' },
];

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export function Nav() {
  return (
    <>
      {/* Desktop / tablet: left sidebar */}
      <nav
        className="surface fixed inset-y-0 left-0 hidden w-56 flex-col gap-1 border-r p-4 md:flex"
        aria-label="Main navigation"
      >
        <div className="mb-4 px-2">
          <span className="text-lg font-bold tracking-tight text-felt-50">Poker</span>
          <span className="text-lg font-bold tracking-tight text-felt-300">Path</span>
        </div>
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-felt-700 text-white' : 'text-felt-200 hover:bg-felt-800'
              }`
            }
          >
            <Icon d={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile: bottom bar */}
      <nav
        className="surface fixed inset-x-0 bottom-0 z-20 flex justify-around border-t px-1 py-1.5 md:hidden"
        aria-label="Main navigation"
      >
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1 text-[10px] font-medium ${
                isActive ? 'text-felt-300' : 'text-felt-200'
              }`
            }
          >
            <Icon d={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
