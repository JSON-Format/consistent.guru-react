export interface Level {
  level: number;
  title: string;
  emoji: string;
  minStreak: number;
  description: string;
  color: string;
  glow: string;
}

// 🔥 LEVEL DEFINITIONS
// export const LEVELS: Level[] = [
//   {
//     level: 1,
//     title: "Guru",
//     emoji: "🧘",
//     minStreak: 0,
//     description: "The journey begins. Show up every day.",
//   },
//   {
//     level: 2,
//     title: "Master",
//     emoji: "⚔️",
//     minStreak: 7,
//     description: "7-day streak. Discipline is forming.",
//   },
//   {
//     level: 3,
//     title: "Sage",
//     emoji: "📜",
//     minStreak: 21,
//     description: "21-day streak. Habits are taking root.",
//   },
//   {
//     level: 4,
//     title: "Enlightened",
//     emoji: "✨",
//     minStreak: 50,
//     description: "50-day streak. You've transcended.",
//   },
//   {
//     level: 5,
//     title: "Ascendant",
//     emoji: "🔱",
//     minStreak: 100,
//     description: "100-day streak. Legendary consistency.",
//   },
// ];



export const LEVELS: Level[] = [
  {
    level: 1,
    title: "Guru",
    emoji: "🧘",
    minStreak: 0,
    description: "The journey begins. Show up every day.",
    color: "from-emerald-400 to-emerald-600",
    glow: "shadow-emerald-500/30",
  },
  {
    level: 2,
    title: "Master",
    emoji: "⚔️",
    minStreak: 7,
    description: "7-day streak. Discipline is forming.",
    color: "from-orange-400 to-orange-600",
    glow: "shadow-orange-500/30",
  },
  {
    level: 3,
    title: "Sage",
    emoji: "📜",
    minStreak: 21,
    description: "21-day streak. Habits are taking root.",
    color: "from-purple-400 to-purple-600",
    glow: "shadow-purple-500/30",
  },
  {
    level: 4,
    title: "Enlightened",
    emoji: "✨",
    minStreak: 50,
    description: "50-day streak. You've transcended.",
    color: "from-yellow-400 to-amber-600",
    glow: "shadow-yellow-500/30",
  },
  {
    level: 5,
    title: "Ascendant",
    emoji: "🔱",
    minStreak: 100,
    description: "100-day streak. Legendary consistency.",
    color: "from-rose-400 to-red-600",
    glow: "shadow-rose-500/30",
  },
];


// 🔥 GET CURRENT LEVEL
export function getActivityLevel(streak: number): Level {
  let current = LEVELS[0];

  for (const l of LEVELS) {
    if (streak >= l.minStreak) {
      current = l;
    }
  }

  return current;
}

// 🔥 GET NEXT LEVEL
export function getNextLevel(streak: number): Level | null {
  for (const l of LEVELS) {
    if (streak < l.minStreak) {
      return l;
    }
  }
  return null;
}

// 🔥 PROGRESS % TO NEXT LEVEL
export function getLevelProgress(streak: number): number {
  const current = getActivityLevel(streak);
  const next = getNextLevel(streak);

  if (!next) return 100;

  const range = next.minStreak - current.minStreak;

  if (range === 0) return 100;

  const progress = streak - current.minStreak;

  return Math.min(100, Math.round((progress / range) * 100));
}