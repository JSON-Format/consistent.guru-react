import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Clock, Flame, Trophy, ChevronLeft, ChevronRight, Target } from "lucide-react";
import { getSmartStreak } from "../../lib/streak";
import { getActivityLevel } from "../../lib/level";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
} from "date-fns";

import { formatInTimeZone } from "date-fns-tz";


interface HabitLog {
  id: string;
  date: string;
  is_complete: boolean;
  completed_time?: string;
}

interface Activity {
  id: string;
  name: string;
  scheduled_time?: string;
  created_at?: string;
  habit_logs: HabitLog[];
}

interface ActivityCardProps {
  activity: Activity;
  onMark: (id: string) => void;
  onDelete: (id: string) => void;
}

// Helper Functions
const getLocalDate = (date: Date = new Date()): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return formatInTimeZone(date, timezone, "yyyy-MM-dd");
};

const isTimeValid = (
  scheduled_time?: string,
  now: Date = new Date()
): boolean => {
  if (!scheduled_time) return true;

  const [h, m] = scheduled_time.split(":").map(Number);

  const scheduled = new Date();
  scheduled.setHours(h, m, 0, 0);

  const before = new Date(scheduled.getTime() - 60 * 60 * 1000); // 1 hr before
  const after = new Date(scheduled.getTime() + 60 * 60 * 1000);  // 1 hr after

  return now >= before && now <= after;
};

const getToday = (): string => getLocalDate();


const getMonthGrid = (date: Date): (string | null)[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days: (string | null)[] = [];

  const firstDayIndex = getDay(start);

  // Empty boxes
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }

  // Month dates
  const allDays = eachDayOfInterval({
    start,
    end,
  });

  allDays.forEach((d) => {
    days.push(format(d, "yyyy-MM-dd"));
  });

  return days;
};



const formatTime12 = (time?: string): string => {
  if (!time) return "Not set";

  const [hour, minute] = time.split(":").map(Number);

  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const isMissedDate = (day: string, activity: Activity) => {
  const today = getToday();

  if (day > today) return false;

  if (activity.created_at) {
    const created = activity.created_at.split("T")[0];
    if (day < created) return false;
  }

  return day < today;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onMark, onDelete }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const calendarDays = useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const [now, setNow] = useState(new Date());
const [hovered, setHovered] = useState<string | null>(null);
 const streak = getSmartStreak(activity);
 const level = getActivityLevel(streak);
  const totalCompleted = activity.habit_logs.filter((log) => log.is_complete).length;
  const todayLog = activity.habit_logs.find((log) => log.date === getToday());
  const done = todayLog?.is_complete || false;
 const isValidTime = isTimeValid(activity.scheduled_time, now);
  

  // Calendar functions
  const currentYear = new Date().getFullYear();
 const years = Array.from(
  { length: 10 },
  (_, i) => currentYear - 5 + i
);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const handleMonthChange = (monthIndex: string): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), parseInt(monthIndex), 1));
  };

  const handleYearChange = (year: string): void => {
    setCurrentDate(new Date(parseInt(year), currentDate.getMonth(), 1));
  };

  const goPrevMonth = (): void => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const goNextMonth = (): void => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };


  useEffect(() => {
  const interval = setInterval(() => {
    setNow(new Date()); // ⏰ update time
  }, 1000); // every second

  return () => clearInterval(interval);
}, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
     
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              {activity.name}
            </h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/30">
              {level.emoji} {level.title}
            </span>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock size={12} className="text-primary" />
             {formatTime12(activity.scheduled_time)}
          </p>
        </div>

        <button
          onClick={() => onDelete(activity.id)}
          className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-destructive/10 hover:text-destructive hover:scale-110"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Mark as Complete Button */}
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: done ? 1 : 1.02 }}
          whileTap={{ scale: done ? 1 : 0.98 }}
         onClick={() => {
  if (!isValidTime) {
    alert("⏰ Please come back at your scheduled time!");
    return;
  }

  if (!done) {
    onMark(activity.id);
  }
}}
disabled={done || !isValidTime}
         
        className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
  done
    ? "bg-primary/20 text-primary border border-primary/30 cursor-default"
    : !isValidTime
    ? "bg-muted text-muted-foreground border border-border cursor-not-allowed"
    : "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
}`}
          style={!done ? { boxShadow: "var(--glow-primary)" } : {}}
        >
       {done ? (
  <span>Completed Today ✓</span>
) : !isValidTime ? (
  <span className="flex items-center justify-center gap-2">
    🔒 Locked (Wait for Your Schedule Time)
  </span>
) : (
  <span className="flex items-center justify-center gap-2">
    <Target size={18} />
    Mark as Complete
  </span>
)}
        </motion.button>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-xl bg-secondary/50 p-4 text-center border border-border">
          <div className="flex items-center justify-center gap-2 text-primary mb-1">
            <Flame size={16} />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Current Streak</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground mt-1">days</p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-secondary/50 p-4 text-center border border-border">
          <div className="flex items-center justify-center gap-2 text-primary mb-1">
            <Trophy size={16} />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Days</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalCompleted}</p>
          <p className="text-xs text-muted-foreground mt-1">completed</p>
        </div>
      </div>


<div>
  <div className="flex justify-between">
            <button onClick={goPrevMonth} className="rounded-lg bg-secondary p-2 text-muted-foreground transition-all hover:bg-secondary/80 hover:text-primary hover:scale-110">
              <ChevronLeft size={18} />
            </button>
            <button onClick={goNextMonth} className="rounded-lg bg-secondary p-2 text-muted-foreground transition-all hover:bg-secondary/80 hover:text-primary hover:scale-110">
              <ChevronRight size={18} />
            </button>
          </div>
</div>
     

      {/* Calendar Section */}
      <div className="mt-6">
        {/* Month/Year Dropdown Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <select
              value={currentDate.getMonth()}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="bg-secondary text-foreground text-sm rounded-lg px-4 py-2 border border-border focus:border-primary focus:outline-none cursor-pointer hover:bg-secondary/80 transition-all"
            >
              {months.map((month, idx) => (
                <option key={idx} value={idx}>{month}</option>
              ))}
            </select>

            <select
              value={currentDate.getFullYear()}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-secondary text-foreground text-sm rounded-lg px-4 py-2 border border-border focus:border-primary focus:outline-none cursor-pointer hover:bg-secondary/80 transition-all"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Weekday Headers */}
        <div className="mb-2 grid grid-cols-7 gap-2">
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDate.toISOString()}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-7 gap-2"
          >
            {calendarDays.map((day, index) => {
              if (!day) return <div key={index} className="h-10" />;

              const log = activity.habit_logs.find(
  (l) => getLocalDate(new Date(l.date)) === day
);




const formatHoverText = () => {
  const [year, month, date] =
  day.split("-").map(Number);

const dateObj = new Date(
  year,
  month - 1,
  date
);

  const formattedDate = dateObj.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  // ✅ completed (green)
  if (log?.is_complete && log?.completed_time) {
    const timeObj = new Date(log.completed_time);

    const formattedTime = timeObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} • ${formattedTime}`;
  }

  // 🔴 missed / ⚪ empty
  return formattedDate;
};

              const isToday = day === getToday();
            

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHovered(day)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-default
                    ${log?.is_complete === true
  ? "bg-primary text-primary-foreground shadow-sm"
  : log?.is_complete === false || isMissedDate(day, activity)
  ? "bg-destructive/20 text-destructive border border-destructive/30"
  : "bg-secondary/50 text-muted-foreground border border-border hover:border-primary/50"
}
                    ${log?.is_complete ? "cursor-pointer" : "cursor-default"}
                    ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                  `}
                >
                  {hovered === day && (
  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 shadow-lg z-50">
    {formatHoverText()}
  </div>
)}
                  {log?.is_complete === true ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : log?.is_complete === false || isMissedDate(day, activity) ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                   Number(day.split("-")[2])
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/20 border border-destructive/30"></div>
            <span className="text-xs text-muted-foreground">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary/50 border border-border"></div>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background"></div>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;