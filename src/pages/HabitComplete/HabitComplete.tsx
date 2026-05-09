import { useState } from "react";
import { FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import guru from "../../assets/guru-meditating.png"
import { useEffect } from "react";
import { supabase } from "../../lib/client";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getSmartStreak } from "../../lib/streak";
import { getActivityLevel } from "../../lib/level";
import { useMemo } from "react";
import { getLocalDate } from "../../lib/date";


function isWithinTimeRange(taskTime: string, range = 1) {
  if (!taskTime) return false;

  const now = new Date();
  const [h, m] = taskTime.split(":").map(Number);

  const task = new Date();
  task.setHours(h, m, 0, 0);

  const before = new Date(task.getTime() - range * 60 * 60 * 1000);
  const after = new Date(task.getTime() + range * 60 * 60 * 1000);

  return now >= before && now <= after;
}

export default function HabitCompletePage() {
  const [now, setNow] = useState(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const navigate = useNavigate();
const [habit, setHabit] = useState<any>(null);
const [loading, setLoading] = useState(true);
  const [breathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const breathScale = {
  inhale: 1.05,
  hold: 1.08,
  exhale: 1,
};

function formatTime12h(time: string) {
  return dayjs(`2000-01-01 ${time}`).format("hh:mm A");
}

useEffect(() => {
  const interval = setInterval(() => {
    setNow(new Date()); // 🔥 update every minute
  }, 1000); // 1 min

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const init = async () => {
    // 🔥 CACHE READ
try {
  const cachedHabit = localStorage.getItem("habit");
  const cachedLogs = localStorage.getItem("habit_logs");

  if (cachedHabit && cachedLogs) {
    setHabit(JSON.parse(cachedHabit));
    setLogs(JSON.parse(cachedLogs));
  }
} catch (e) {
  console.error("Cache error", e);
}

    // 🔐 get user
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      navigate("/login");
      return;
    }

    // 🔥 fetch habit (no name filter)
    const { data } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    console.log("DB DATA:", data);
    console.log("TIME:", data?.scheduled_time);

    // ❌ no habit → tracker
    if (!data) {
      navigate("/tracker");
      return;
    }

    setHabit(data);

// 💾 CACHE SAVE
localStorage.setItem("habit", JSON.stringify(data));

    // 🔥 GET ALL LOGS
const { data: allLogs } = await supabase
  .from("habit_logs")
  .select("*")
  .eq("habit_id", data.id);

setLogs(allLogs || []);

// 💾 CACHE SAVE
localStorage.setItem("habit_logs", JSON.stringify(allLogs || []));
setLoading(false);
    const today = getLocalDate();

    // 🔥 check today's log
    let { data: log } = await supabase
      .from("habit_logs")
      .select("*")
      .eq("habit_id", data.id)
      .eq("date", today)
      .maybeSingle();

    // 🔥 if no log → create one
    if (!log) {
      const { data: newLog } = await supabase
        .from("habit_logs")
        .insert([
          {
            habit_id: data.id,
            date: today,
            is_complete: false,
          },
        ])
        .select()
        .maybeSingle();

      log = newLog;
    }

    // 🔥 already completed → tracker
    if (log && log.is_complete) {
      navigate("/tracker");
      return;
    }

    // 🔥 time check
    if (!isWithinTimeRange(data.scheduled_time)) {
      navigate("/tracker");
      return;
    }

    // ✅ allow page (nothing to do)
  };

  init();
}, []);


const handleClick = async () => {
  if (!habit) return;
  if (loading) return;
  setLoading(true);

  const today = getLocalDate();

  // 🔥 safety check
if (!isWithinTimeRange(habit.scheduled_time)) {
  setLoading(false);
  navigate("/tracker");
  return;
}

  const { data: log } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habit.id)
    .eq("date", today)
    .maybeSingle();

  if (!log) return;

  await supabase
    .from("habit_logs")
    .update({
      is_complete: true,
      completed_time: new Date().toISOString(),
    })
    .eq("id", log.id);


    // 🧹 CLEAR CACHE
localStorage.removeItem("habit");
localStorage.removeItem("habit_logs");

  navigate("/tracker");
};




const activity = useMemo(() => {
  if (!habit) return null;
  return {
    ...habit,
    habit_logs: logs,
  };
}, [habit, logs]);

const streak = useMemo(() => {
  if (!activity) return 0;
  return getSmartStreak(activity);
}, [activity]);

const level = useMemo(() => {
  return getActivityLevel(streak);
}, [streak]);
const totalCompleted = logs.filter(l => l.is_complete).length;


const getTimeStatus = (scheduled_time?: string) => {
  if (!scheduled_time) return "";

  const [h, m] = scheduled_time.split(":").map(Number);

  const scheduled = new Date();
  scheduled.setHours(h, m, 0, 0);

  const diffMs = now.getTime() - scheduled.getTime(); // 🔥 use state
  const diffMin = Math.floor(diffMs / 60000);

  if (Math.abs(diffMin) <= 1) return "On Time";

  if (diffMin < 0) return `${Math.abs(diffMin)} min before`;

  return `${diffMin} min late`;
};




  return (
   <div className=" flex items-center justify-center bg-[#061319] text-white px-4">
      {/* 🔥 CARD */}
      <div
        className="
        w-full  sm:w-[400px] p-6 sm:p-8 rounded-3xl text-center space-y-6
        bg-gradient-to-b from-white/5 to-white/0
        backdrop-blur-xl border border-white/10
        shadow-[0_0_40px_rgba(34,197,94,0.15)]
        hover:shadow-[0_0_80px_rgba(34,197,94,0.35)]
        transition-all duration-500
      "
      >
        {/* 🔥 IMAGE WITH BREATHING + GLOW */}
        <div className="flex justify-center relative">
          <motion.div
            className="
              relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center rounded-full
              bg-gradient-to-r from-green-500/20 to-emerald-500/20
              border border-green-400/30
              shadow-[0_0_60px_rgba(34,197,94,0.3)]
            "
            animate={{
              scale: breathScale[breathPhase],
              boxShadow: [
                "0 0 40px rgba(34,197,94,0.2)",
                "0 0 100px rgba(34,197,94,0.6)",
                "0 0 40px rgba(34,197,94,0.2)",
              ],
            }}
            transition={{
              scale: { duration: 4, ease: "easeInOut" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* 🌊 RINGS */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-green-400/30"
                style={{ width: 120 + i * 30, height: 120 + i * 30 }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* 🧘 IMAGE */}
            <motion.img
              src={guru}
             className="w-24 sm:w-32 relative z-10"
              animate={{
                y:
                  breathPhase === "inhale"
                    ? -5
                    : breathPhase === "exhale"
                      ? 5
                      : 0,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* TITLE */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-green-400">Meditating</h1>
          <p className="text-sm text-gray-400">Finding inner peace</p>
        </div>

        {/* ⏰ TIME PICKER (SINGLE ICON) */}
        <div className="space-y-2 text-left">
          
          <p className="text-sm text-green-400 flex items-center gap-2">
            <FiClock /> Shedule Your Meditating Time
          </p>

          <div className="relative flex-1 justify-center">
                <div className="space-y-6">

    {/* 🔹 STATS */}
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white/5 border border-green-400/20 rounded-xl py-4 text-center">
        <p className="text-2xl font-bold text-green-400">{totalCompleted}</p>
        <p className="text-xs text-gray-400">Total days</p>
      </div>

      <div className="bg-white/5 border border-green-400/20 rounded-xl py-4 text-center">
        <p className="text-2xl font-bold text-green-400">{streak}</p>
        <p className="text-xs text-gray-400">Streak</p>
      </div>

      <div className="bg-white/5 border border-green-400/20 rounded-xl py-5 text-center px-4">
  
 <p className="text-green-400 font-semibold text-sm truncate max-w-[90px] mx-auto">
  {level.title}
</p>

  <p className="text-xs text-gray-400 mt-1">Level</p>

</div>
    </div>

    {/* 🔹 TASK TIME CARD */}
    <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-5 flex items-center justify-between">

      <div>
        <p className="text-xs text-gray-400">Your Consistent Time </p>
        <p className="text-xl font-semibold text-white">
             {habit?.scheduled_time
  ? formatTime12h(habit.scheduled_time)
  : "Loading..."}
        </p>
      </div>

      <div className="px-3 py-1 rounded-full text-sm font-medium text-green-400">
  {getTimeStatus(habit?.scheduled_time)}
</div>

    </div>

  </div>
          </div>
        </div>
       
        {/* 🚀 BUTTON */}
      <button
        type="button"
  onClick={handleClick}
  disabled={loading}
  className="
  w-full py-3 sm:py-4 text-base sm:text-lg rounded-full font-medium flex items-center justify-center gap-2
  bg-green-400 text-black 
  shadow-[0_0_25px_rgba(34,197,94,0.4)]
  hover:shadow-[0_0_60px_rgba(34,197,94,0.8)]
  hover:scale-105
  active:scale-95 active:shadow-none
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-300
"
>
       {loading ? "Loading..." : "Complete Habit"}
</button>
      </div>
    </div>
  );
}