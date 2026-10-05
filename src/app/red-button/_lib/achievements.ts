import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'red-button:v1';

export type Stats = {
  totalPresses: number;
  points: number;
  bestCombo: number;
  unlocked: Record<string, string>;
};

export type AchievementContext = {
  stats: Stats;
  // True when this check was triggered by your own press.
  pressed: boolean;
  combo: number;
  othersOnline: number;
  remoteHeat: number;
  sawRemotePress: boolean;
  witnessedMilestone: boolean;
  // The global count your press landed on, when known.
  hitCount: number | null;
};

export type Achievement = {
  id: string;
  name: string;
  desc: string;
  icon: string;
  group: 'Solo' | 'Together' | 'Milestones';
  check: (ctx: AchievementContext) => boolean;
};

const pressAchievement = (n: number, name: string, icon: string): Achievement => ({
  id: `presses-${n}`,
  name,
  desc: `Press the button ${n.toLocaleString()} times`,
  icon,
  group: 'Solo',
  check: ({ stats }) => stats.totalPresses >= n,
});

const comboAchievement = (n: number, name: string, icon: string): Achievement => ({
  id: `combo-${n}`,
  name,
  desc: `Reach a ${n}x combo`,
  icon,
  group: 'Solo',
  check: ({ stats }) => stats.bestCombo >= n,
});

const crowdAchievement = (n: number, name: string, icon: string): Achievement => ({
  id: `crowd-${n}`,
  name,
  desc: `Press while ${n === 1 ? 'someone else is' : `${n}+ others are`} here`,
  icon,
  group: 'Together',
  check: ({ pressed, othersOnline }) => pressed && othersOnline >= n,
});

const hitAchievement = (n: number, name: string, icon: string): Achievement => ({
  id: `hit-${n}`,
  name,
  desc: `Be the one whose press lands on a multiple of ${n.toLocaleString()}`,
  icon,
  group: 'Milestones',
  check: ({ hitCount }) => hitCount !== null && hitCount % n === 0,
});

export const ACHIEVEMENTS: Achievement[] = [
  pressAchievement(1, 'Curiosity', '👆'),
  pressAchievement(100, 'Warming Up', '🔥'),
  pressAchievement(1000, 'Committed', '💪'),
  pressAchievement(10000, 'Button Whisperer', '🧙'),
  comboAchievement(20, 'Combo Starter', '⚡'),
  comboAchievement(50, 'On Fire', '🌶️'),
  comboAchievement(100, 'Centurion', '💯'),
  comboAchievement(250, 'Unstoppable', '🚀'),
  comboAchievement(1000, 'Transcendent', '🌈'),
  {
    id: 'points-10000',
    name: 'High Roller',
    desc: 'Earn 10,000 personal points',
    icon: '💎',
    group: 'Solo',
    check: ({ stats }) => stats.points >= 10000,
  },
  crowdAchievement(1, 'Company', '👋'),
  crowdAchievement(4, 'Party', '🎉'),
  crowdAchievement(9, 'Crowd Surfer', '🏄'),
  {
    id: 'not-alone',
    name: 'Not Alone',
    desc: "See someone else's press come in live",
    icon: '👀',
    group: 'Together',
    check: ({ sawRemotePress }) => sawRemotePress,
  },
  {
    id: 'mosh-pit',
    name: 'Mosh Pit',
    desc: 'Hold a 20x combo while others are mashing too',
    icon: '🤘',
    group: 'Together',
    check: ({ pressed, combo, remoteHeat }) => pressed && combo >= 20 && remoteHeat >= 10,
  },
  {
    id: 'witness',
    name: 'Witness',
    desc: 'Be here when the global count crosses a multiple of 1,000',
    icon: '📸',
    group: 'Milestones',
    check: ({ witnessedMilestone }) => witnessedMilestone,
  },
  hitAchievement(1000, 'Round Number', '🎯'),
  hitAchievement(10000, 'History Maker', '📜'),
  hitAchievement(100000, 'Legend', '🏆'),
  hitAchievement(1000000, 'The Millionth', '👑'),
];

const EMPTY_STATS: Stats = { totalPresses: 0, points: 0, bestCombo: 0, unlocked: {} };

const BASE_CONTEXT: Omit<AchievementContext, 'stats'> = {
  pressed: false,
  combo: 0,
  othersOnline: 0,
  remoteHeat: 0,
  sawRemotePress: false,
  witnessedMilestone: false,
  hitCount: null,
};

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATS;
    return { ...EMPTY_STATS, ...(JSON.parse(raw) as Partial<Stats>) };
  } catch {
    return EMPTY_STATS;
  }
}

function saveStats(stats: Stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); progress just won't persist.
  }
}

// localStorage-backed store so the stats load on the client without a hydration mismatch.
let cachedStats: Stats | null = null;
const listeners = new Set<() => void>();

function getStats(): Stats {
  cachedStats ??= loadStats();
  return cachedStats;
}

function setStoredStats(next: Stats) {
  cachedStats = next;
  saveStats(next);
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  // Another tab saved progress; reload so this tab doesn't overwrite it with stale stats.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    cachedStats = loadStats();
    listener();
  };
  listeners.add(listener);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function useAchievements() {
  const stats = useSyncExternalStore(subscribe, getStats, () => EMPTY_STATS);

  // Applies an optional press to the stats, then returns any achievements this unlocked.
  const evaluate = useCallback(
    (
      context: Partial<Omit<AchievementContext, 'stats'>>,
      press?: { points: number; combo: number }
    ): Achievement[] => {
      const current = getStats();
      let next = current;
      if (press) {
        next = {
          ...next,
          totalPresses: next.totalPresses + 1,
          points: next.points + press.points,
          bestCombo: Math.max(next.bestCombo, press.combo),
        };
      }

      const ctx: AchievementContext = { ...BASE_CONTEXT, ...context, stats: next };
      const unlocked = ACHIEVEMENTS.filter(a => !next.unlocked[a.id] && a.check(ctx));
      if (unlocked.length) {
        const now = new Date().toISOString();
        next = {
          ...next,
          unlocked: { ...next.unlocked, ...Object.fromEntries(unlocked.map(a => [a.id, now])) },
        };
      }

      if (next !== current) setStoredStats(next);
      return unlocked;
    },
    []
  );

  return { stats, evaluate };
}
