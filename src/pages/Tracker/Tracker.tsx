import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "../../components/activityCard";
import DeleteModal from "../../components/deleteModal";
import { useEffect } from "react";
import { supabase } from "../../lib/client";
import Loader from "../../components/appLoader"
import { useNavigate } from "react-router-dom";

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



const getToday = (): string => {
  return new Date().toISOString().split("T")[0];
};



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
      .eq("user_id", user.id);

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
    const data = await reloadData();

    // 🔥 VERY IMPORTANT (fix your bug)
    setLoading(false);

    // 🔥 NO HABITS → REDIRECT
    if (!data || data.length === 0) {
      localStorage.removeItem("habits");
      navigate("/create-habit");
    }
  };

  load();
}, []);


const handleMark = async (habitId: string) => {
  const today = getToday();
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

const data = await reloadData(); // fetch

// 🔥 IMPORTANT CHECK
if (!data || data.length === 0) {
  navigate("/create-habit");
}
};


if (loading) {
  return (
   <>
   <Loader />
   </>
  );
}
  return (
  
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background px-4 py-14 sm:py-20"
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Component */}

         <div className="mb-12 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Stay Consistent
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground"
      >
        Track your daily habits. Every press counts.
      </motion.p>  
    </div>
    

        {/* Activity List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onMark={handleMark}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
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