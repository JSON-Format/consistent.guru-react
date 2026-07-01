import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "../../components/activityCard";
import DeleteModal from "../../components/deleteModal";
import { useEffect } from "react";
import { supabase } from "../../lib/client";
import { useNavigate } from "react-router-dom";
import { getLocalDate } from "../../lib/date";
import { isTimeValid } from "../../lib/time";
import { Target } from "lucide-react";
import { Clock3 } from "lucide-react";
import SkeletonLoader from "../../components/skeletonLoader";
import {
  House,
  CirclePlus,
  Trophy,
} from "lucide-react";

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


const TrackerPage: React.FC = () => {
  const navigate = useNavigate();
const [activities, setActivities] = useState<Activity[]>([]);
const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);


const reloadData = async (): Promise<Activity[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return [];

  const { data, error } = await supabase
  .from("habits")
  .select(`
    id,
    name,
    scheduled_time,
    created_at,
    habit_logs (
      id,
      date,
      is_complete,
      completed_time
    )
  `)
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });

    if (error) throw error;

    setActivities(data || []);

    localStorage.setItem("habits", JSON.stringify(data || []));

    return data || [];
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

useEffect(() => {
  const load = async () => {
    // 🔥 1. READ CACHE FIRST
    const cached = localStorage.getItem("habits");

    if (cached) {
      setActivities(JSON.parse(cached));
      setLoading(false); // ⚡ instant UI
    }

    // 🔄 2. FETCH LATEST DATA
    await reloadData();

    // 🔥 VERY IMPORTANT (fix your bug)
    setLoading(false);

    // 🔥 NO HABITS → REDIRECT
    // if (!data || data.length === 0) {
    //   localStorage.removeItem("habits");
    //   navigate("/create-habit");
    // }
  };

  load();
}, []);


const pendingHabits = activities.filter((activity) => {
  const today = getLocalDate();

  const todayLog = activity.habit_logs.find(
    (log) => log.date === today
  );

  return (
    !todayLog?.is_complete &&
    isTimeValid(activity.scheduled_time)
  );
});

const handleMark = async (habitId: string) => {
const today = getLocalDate();
  const now = new Date().toISOString();

  // 🔍 check existing log
  const { data: existing } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habitId)
    .eq("date", today)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("habit_logs")
      .update({
        is_complete: true,
        completed_time: now,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("habit_logs").insert([
      {
        habit_id: habitId,
        date: today,
        is_complete: true,
        completed_time: now,
      },
    ]);
  }

 localStorage.removeItem("habits");
await reloadData();


};

  const handleDelete = (id: string): void => {
    setDeleteId(id);
  };

const confirmDelete = async () => {
  if (!deleteId) return;

  setDeleteLoading(true);

  await supabase
    .from("habits")
    .delete()
    .eq("id", deleteId);

  setDeleteId(null);
  setDeleteLoading(false);

localStorage.removeItem("habits"); // first clear

await reloadData(); // fetch

// 🔥 IMPORTANT CHECK
// if (!data || data.length === 0) {
//   navigate("/create-habit");
// }
};


if (loading) {
  return (
   <>
   <SkeletonLoader />
   </>
  );
}
  return (
  
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    className="min-h-screen bg-background px-3 sm:px-4 py-10 sm:py-20"
    >
      <div className="mx-auto w-full max-w-4xl">

        
        {/* Header Component */}

         <div className="mb-12 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Stay Consistent
      </motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground mb-7"
      >
        Track your daily habits. Every press counts.
      </motion.p>  

      <div className="mb-8 flex flex-col sm:flex-row justify-center gap-3">

  <button
    onClick={() => navigate("/")}
    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 hover:border-primary hover:bg-primary/10 transition"
  >
    <House size={18}/>
    Home
  </button>

  <button
    onClick={() => navigate("/create-habit")}
    className="w-full sm:w-auto flex items-center justify-center  gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground hover:scale-105 transition"
  >
    <CirclePlus size={18}/>
    Create Habit
  </button>

  <button
    onClick={() =>
    navigate("/level", {
      state: {
        activities,
      },
    })
  }
    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 hover:border-yellow-500 hover:bg-yellow-500/10 transition"
  >
    <Trophy size={18}/>
    Level
  </button>

</div>


{pendingHabits.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-xl"
  >
    {/* Header */}
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between border-b border-border/50 p-5">
   <div className="flex items-center gap-3">
  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15">
    <Target className="h-6 w-6 text-emerald-500" />
  </div>

  <div>
    <h2 className="text-2xl font-bold text-foreground text-left">
      Today's Focus
    </h2>

    <p className="text-sm text-muted-foreground">
      Complete these habits now
    </p>
  </div>
</div>

      <div className="flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-2">
    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

    <span className="font-semibold text-emerald-500">
        {pendingHabits.length} Pending
    </span>
</div>
    </div>

    {/* Habit List */}
    <div className="space-y-4 p-5">
      {pendingHabits.map((habit) => (
        <motion.div
          key={habit.id}
          whileHover={{
            scale: 1.01,
            y: -2,
          }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-background/60 backdrop-blur-xl p-4 transition-all"
        >
          {/* Left */}
         <div className="flex items-start gap-4 w-full">

            {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
    <Target className="h-7 w-7 text-emerald-500"/>
</div> 

            {/* Text */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg break-words text-foreground text-left">
                {habit.name}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="w-4 h-4 text-emerald-500"/>

                {new Date(
                  `2000-01-01T${habit.scheduled_time}`
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}

              
                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
    Ready Now
</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => handleMark(habit.id)}
          className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-black shadow-lg shadow-green-500/30 transition-all"
          >
            ✓ Mark Complete
          </motion.button>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
    </div>



    {activities.length === 0 ? (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
   className="rounded-3xl border border-dashed border-border bg-card p-8 sm:p-12 md:p-16 text-center"
  >
    {/* Icon */}
    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
      <Target className="h-12 w-12 text-primary" />
    </div>

    {/* Title */}
    <h2 className="text-2xl sm:text-3xl font-bold  text-foreground">
      No Habits Found
    </h2>

    {/* Description */}
    <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
      You haven't created any habits yet. Start building consistency by creating your first habit.
    </p>

    {/* Button */}
    <button
      onClick={() => navigate("/create-habit")}
      className="mt-8 w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold transition hover:scale-105"
    >
      <CirclePlus size={20} />
      Create Habit
    </button>
  </motion.div>
) : (
  <div className="space-y-6">
    <AnimatePresence mode="popLayout">
      {activities.map((activity) => (
        <div key={activity.id} id={`habit-${activity.id}`}>
          <ActivityCard
            activity={activity}
            onMark={handleMark}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </AnimatePresence>
  </div>
)}
    

   
      </div>

      {/* Delete Modal Component */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isLoading={deleteLoading}
      />
    </motion.div>
  );
};

export default TrackerPage;