import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  TrendingUp, 
  Award,
  Zap,
  Star,
  Crown,
  Flame,
  CheckCircle2,
  ChevronRight
} from "lucide-react";


import { useState } from "react";
import { getSmartStreak } from "../../lib/streak";
import {
  LEVELS,
  getActivityLevel,
  getNextLevel,
  getLevelProgress,
} from "../../lib/level";


export default function Levels() {

  interface HabitLog {
  id: string;
  date: string;
  is_complete: boolean;
  completed_time?: string;
}

interface Activity {
  id: string;
  name: string;
  icon?: string;
  scheduled_time?: string;
  created_at?: string;
  habit_logs: HabitLog[];
}

interface LevelLocationState {
  activities: Activity[];
}
  
const location = useLocation();

const state = location.state as LevelLocationState | null;

const activities: Activity[] = state?.activities ?? [];

const formattedActivities = activities.map((a: Activity) => {
  const streak = getSmartStreak(a);

  return {
    ...a,
    streak,
    level: getActivityLevel(streak),
    next: getNextLevel(streak),
    progress: getLevelProgress(streak),
  };
});

const [selectedActivity, setSelectedActivity] =
useState<string | null>(null);
  



const highestLevel = Math.max(
  ...formattedActivities.map((a) => a.level.level),
  1
);

const highestLevelData = LEVELS.find(
  (l) => l.level === highestLevel
);


const longestStreak = Math.max(
  ...formattedActivities.map((a) => a.streak),
  0
);





  return (
    <div className="min-h-screen  px-4 sm:px-6 py-4 sm:py-8">
      <div className="w-full max-w-7xl mx-auto">

        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <Link
              to="/tracker"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 transition-all hover:text-white"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Tracker
            </Link>
            
          
          </div>

          <div className="mt-4 sm:mt-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <Crown size={24} className="text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Achievement Levels
                </h1>
                <p className="mt-0.5 sm:mt-2 text-xs sm:text-sm text-slate-400">
                  Build streaks to unlock higher levels of mastery
                </p>
              </div>
            </div>
          </div>
        </motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="mb-10 grid grid-cols-2 lg:grid-cols-4 gap-5"
>
  {[
    {
      title: "Longest Streak",
      value: `${longestStreak} Days`,
      icon: "🔥",
      gradient: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/20",
      glow: "shadow-orange-500/10",
    },
    {
      title: "Active Habits",
      value: formattedActivities.length,
      icon: "🎯",
      gradient: "from-emerald-500/20 to-green-500/20",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/10",
    },
    {
      title: "Highest Level",
      value: `${highestLevelData?.emoji} ${highestLevelData?.title}`,
      icon: "👑",
      gradient: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/20",
      glow: "shadow-yellow-500/10",
    },
    {
      title: "Levels",
      value: `${LEVELS.length}`,
      icon: "⭐",
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/20",
      glow: "shadow-purple-500/10",
    },
  ].map((card, index) => (
    <motion.div
      key={card.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      className={`
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br ${card.gradient}
        border ${card.border}
        backdrop-blur-xl
        p-[1px]
        ${card.glow}
        shadow-2xl
      `}
    >
      <div className="relative h-full rounded-3xl bg-slate-900/90 p-6">

        {/* Glow */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex items-start justify-between">

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {card.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              {card.value}
            </h2>
          </div>

          <div
            className={`
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br ${card.gradient}
              border border-white/10
              text-3xl
            `}
          >
            {card.icon}
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-6 h-1 w-full rounded-full bg-slate-800">
          <div
            className={`
              h-full rounded-full
              bg-gradient-to-r ${card.gradient}
            `}
          />
        </div>

      </div>
    </motion.div>
  ))}
</motion.div>

        {/* Premium Level Cards - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3"
        >
          {LEVELS.map((l, index) => (
            <motion.div
              key={l.level}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${l.color} p-0.5 shadow-lg sm:shadow-2xl ${l.glow}`}
            >
              <div className="relative h-full rounded-xl sm:rounded-2xl bg-slate-900/90 backdrop-blur-sm p-2 sm:p-3 md:p-4 text-center transition-all hover:bg-slate-900/70">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{l.emoji}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white">
                    {l.title}
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] text-slate-400">
                    {l.minStreak}+ days
                  </div>
                  {(index === 0 || index === 4) && (
                    <div className={`mt-1 sm:mt-2 inline-block rounded-full px-1.5 sm:px-2 py-0.5 text-[6px] sm:text-[8px] font-semibold ${
                      index === 0 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-rose-500/20 text-rose-400"
                    }`}>
                      {index === 0 ? "START" : "LEGEND"}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activities - Single Column Full Width */}
        {formattedActivities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 sm:py-20 text-center"
          >
            <div className="relative inline-block">
              <div className="text-5xl sm:text-7xl mb-4 animate-pulse">🎯</div>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Star size={20} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">No activities yet</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400">Start tracking your habits to unlock achievements!</p>
            <Link
              to="/tracker"
              className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
            >
              <Zap size={16} />
              Add Your First Activity
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="w-full space-y-3 sm:space-y-4">
           {formattedActivities.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedActivity(selectedActivity === a.id ? null : a.id)}
                className="group relative w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 border border-slate-700/50 hover:border-slate-600/50 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Activity Header */}
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-2xl sm:text-3xl">{a.icon || '📌'}</div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                        {a.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
                        <span className="text-xs sm:text-sm text-slate-400">
                          {a.streak} day streak
                        </span>

                        <span
  className={`rounded-full px-2 py-1 text-[10px]
  ${
    a.habit_logs.some(
      (log) =>
        log.date === new Date().toLocaleDateString("en-CA") &&
        log.is_complete
    )
      ? "bg-green-500/20 text-green-400"
      : "bg-yellow-500/20 text-yellow-400"
  }`}
>
  {a.habit_logs.some(
    (log) =>
      log.date === new Date().toLocaleDateString("en-CA") &&
      log.is_complete
  )
    ? "Completed Today"
    : "Pending Today"}
</span>
                        {a.streak >= 7 && (
                          <span className="flex items-center gap-1 rounded-full bg-orange-500/20 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-semibold text-orange-400">
                            <Flame size={8} className="sm:w-2.5 sm:h-2.5" />
                            Streak
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {a.streak >= 100 && (
                    <div className="rounded-full bg-rose-500/20 p-1 sm:p-1.5">
                      <Crown size={14} className="text-rose-400" />
                    </div>
                  )}
                </div>

                {/* Level Badges - Responsive Grid */}
                <div className="relative grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2 mb-3 sm:mb-4">
                  {LEVELS.map((l) => {
                    const unlocked = a.streak >= l.minStreak;
                    const isCurrent = l.level === a.level.level;
                    
                    

                    return (
                      <motion.div
                        key={l.level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-0.5 sm:gap-1"
                      >
                        <div
                          // className={`relative flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          //   unlocked
                          //     ? isCurrent
                          //       ? `border-${l.color.split('-')[1]}-500 bg-gradient-to-br ${l.color} shadow-lg`
                          //       : `border-${l.color.split('-')[1]}-500/50 bg-gradient-to-br ${l.color} opacity-70`
                          //     : "border-slate-700 bg-slate-800/50 opacity-40"
                          // }`}
                          className={`
relative flex h-10 w-10
sm:h-12 sm:w-12
md:h-14 md:w-14
items-center
justify-center
rounded-full
border-2
border-white/20
${isCurrent ? "ring-2 ring-yellow-400" : ""}
transition-all
duration-300
${unlocked
? `bg-gradient-to-br ${l.color}`
: "bg-slate-800 opacity-40"}
`}
                        >
                          {unlocked ? (
                            <span className="text-base sm:text-xl md:text-2xl">{l.emoji}</span>
                          ) : (
                            <Lock size={12} className="text-slate-500" />
                          )}
                          {isCurrent && unlocked && (
                            <div className="absolute -top-1 -right-1 animate-pulse">
                              <Sparkles size={10} className="text-yellow-400" />
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[6px] sm:text-[7px] md:text-[8px] font-bold uppercase tracking-wider ${
                            unlocked ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {l.title}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress Section */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 mb-1.5">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">
                        {a.level.emoji} {a.level.title}
                      </span>
                      {a.next && (
                        <span className="text-[8px] sm:text-[10px] text-slate-400">
                          → {a.next.title}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-300">
                    {a.next
 ? `${a.streak}/${a.next.minStreak} Days`
 : "🏆 MAX"}
                    </span>
                  </div>

                  <div className="relative h-1.5 sm:h-2 md:h-2.5 w-full overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(a.progress, 100)}%` }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${a.level.color}`}
                    />
                  </div>

                  {/* Description - Expandable */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: selectedActivity === a.id ? 'auto' : 0,
                      opacity: selectedActivity === a.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700/50">
                      <p className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-slate-400">
                        <TrendingUp size={12} className="text-purple-400" />
                        {a.level.description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">

  <div>
    <p className="text-slate-500 text-xs">
      Current Level
    </p>

    <p className="font-bold text-white">
      {a.level.emoji} {a.level.title}
    </p>
  </div>

  <div>
    <p className="text-slate-500 text-xs">
      Current Streak
    </p>

    <p className="font-bold text-white">
      {a.streak} Days
    </p>
  </div>

</div>
                      {a.next && (
                        <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] text-slate-500">
                          <Zap size={10} className="text-yellow-400" />
                          <span>{a.next.minStreak - a.streak} more days to reach {a.next.title}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Expand Indicator */}
                  <div className="mt-1.5 sm:mt-2 flex justify-center">
                    <div className={`text-slate-600 transition-transform duration-300 ${selectedActivity === a.id ? 'rotate-180' : ''}`}>
                      <ChevronRight size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Why We Built This Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 border border-purple-500/20 p-4 sm:p-6 md:p-8 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-xl bg-purple-500/20">
              <Award size={20} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Why We Built This</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                We believe in the power of consistency. Our achievement system is designed to 
                celebrate your progress, keep you motivated, and turn your daily habits into 
                meaningful milestones. Every streak is a step towards becoming your best self.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-[10px] sm:text-xs text-slate-400">Track progress</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-[10px] sm:text-xs text-slate-400">Stay motivated</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-[10px] sm:text-xs text-slate-400">Celebrate wins</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

   
      </div>
    </div>
  );
}
