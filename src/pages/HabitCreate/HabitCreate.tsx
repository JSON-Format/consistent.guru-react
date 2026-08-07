import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/client";
import { useNavigate } from "react-router-dom";
import Meditating from "../../assets/guru-meditating.png"
import Running from "../../assets/guru-running-new.png"
import WakingUp from "../../assets/guru-waking-up.png"
import EatingonTime from "../../assets/guru-eating.png"
import Studying from "../../assets/guru-studying-new.png"
import Planning from "../../assets/guru-planning-new.png"
import Cleaning from "../../assets/guru-cleaning-new.png"
import DrinkingWater from "../../assets/guru-drinking-water.png"
import Sleeping from "../../assets/guru-sleeping.png"
import Journaling from "../../assets/guru-journaling.png"
import ScreenLimit from "../../assets/guru-screen-limit.png"
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


import Swal from "sweetalert2";
interface Habit {
   id?: string;
  label: string;
  description: string;
  image: string;
  gradient: string;
  color: string;
  isCustom?: boolean;
}


const defaultHabits: Habit[] = [
  {
    label: "Meditating",
    description: "Find inner peace through mindful breathing and presence",
    image: "meditating",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    color: "#8B5CF6",
  },
  {
    label: "Running",
    description: "Build endurance and release endorphins with every stride",
    image: "running",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    color: "#06B6D4",
  },
  {
    label: "Waking Up",
    description: "Rise with the sun and embrace the morning energy",
   image: "waking_up",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    color: "#F59E0B",
  },
  {
    label: "Eating on Time",
    description: "Nourish your body with mindful, timely meals",
    image: "eating_on_time",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    color: "#10B981",
  },
  {
    label: "Studying",
    description: "Expanding knowledge",
    image: "studying",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    color: "#6366F1",
  },
  {
    label: "Planning",
    description: "Organizing the day",
    image: "planning",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    color: "#F59E0B",
  },
  {
    label: "Cleaning",
    description: "Tidying the space",
    image:"cleaning",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    color: "#10B981",
  },
  {
    label: "Drinking Water",
    description: "Stay hydrated",
    image: "drinking_water",
    gradient: "from-sky-500 via-cyan-500 to-blue-500",
    color: "#0EA5E9",
  },
  {
    label: "Sleeping",
    description: "Rest and recover",
    image: "sleeping",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    color: "#8B5CF6",
  },
  {
    label: "Journaling",
    description: "Reflect and write",
    image:"journaling",
    gradient: "from-rose-500 via-pink-500 to-red-500",
    color: "#F43F5E",
  },
  {
    label: "Screen Limit",
    description: "Mindful tech usage",
    image: "screen_limit",
    gradient: "from-gray-500 via-slate-500 to-gray-700",
    color: "#6B7280",
  },
];


const IMAGE_MAP: Record<string, string> = {
  meditating: Meditating,
  running: Running,
  waking_up: WakingUp,
  eating_on_time: EatingonTime,
  studying: Studying,
  planning: Planning,
  cleaning: Cleaning,
  drinking_water: DrinkingWater,
  sleeping: Sleeping,
  journaling: Journaling,
  screen_limit: ScreenLimit,
};




const HabitSelector: React.FC = () => {
  const creatingRef = useRef(false);
  const [creating, setCreating] = useState(false);
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [index, setIndex] = useState<number>(2);
  const [selectedHabits, setSelectedHabits] = useState<number[]>([]);
  const [habitTimes, setHabitTimes] = useState<
  Record<number, Dayjs | null>
>({});
  const [direction, setDirection] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({
    label: "",
    description: "",
    image: "",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    color: "#8B5CF6",
  });
const navigate = useNavigate();
  const colorOptions = [
    { gradient: "from-purple-500 via-pink-500 to-red-500", color: "#8B5CF6" },
    { gradient: "from-blue-500 via-cyan-500 to-teal-500", color: "#06B6D4" },
    { gradient: "from-orange-500 via-amber-500 to-yellow-500", color: "#F59E0B" },
    { gradient: "from-green-500 via-emerald-500 to-teal-500", color: "#10B981" },
    { gradient: "from-red-500 via-pink-500 to-rose-500", color: "#EF4444" },
    { gradient: "from-indigo-500 via-purple-500 to-pink-500", color: "#6366F1" },
  ];

const customHabitImages = [
  { key: "meditating", image: Meditating },
  { key: "running", image: Running },
  { key: "waking_up", image: WakingUp },
  { key: "eating_on_time", image: EatingonTime },
  { key: "studying", image: Studying },
  { key: "planning", image: Planning },
  { key: "cleaning", image: Cleaning },
  { key: "drinking_water", image: DrinkingWater },
  { key: "sleeping", image: Sleeping },
  { key: "journaling", image: Journaling },
  { key: "screen_limit", image: ScreenLimit },
];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
  loadCustomHabits();
}, []);

  const loadCustomHabits = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("user_habits")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return;
  }

const customHabits: Habit[] = data.map((habit) => ({
  id: habit.id,
  label: habit.label,
  description: habit.description,
  image: habit.image,
  gradient: habit.gradient,
  color: habit.color,
  isCustom: true,
}));

  setHabits([...defaultHabits, ...customHabits]);
};

 const isCustomHabitCard = index === habits.length;

const active: Habit = isCustomHabitCard
  ? habits[0]
  : habits[index];

  const handleNext = (): void => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % (habits.length + 1));
  };

  const handlePrev = (): void => {
    setDirection(-1);
  setIndex(
  (prev) => (prev - 1 + habits.length + 1) % (habits.length + 1)
);
  };

const toggleHabit = (habitIndex: number): void => {
  if (selectedHabits.includes(habitIndex)) {
    setSelectedHabits(
      selectedHabits.filter((i) => i !== habitIndex)
    );
  } else {
    setSelectedHabits([...selectedHabits, habitIndex]);

    setHabitTimes((prev) => ({
      ...prev,
      [habitIndex]: dayjs(),
    }));
  }
};

const createHabitsInBackground = async (): Promise<number> => {
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const usedTimes = new Set<string>();
  
  let createdCount = 0;

  const { data: existingHabits } = await supabase
  .from("habits")
  .select("id, name, scheduled_time")
  .eq("user_id", user.id);

if (!existingHabits) return 0;

  for (const habitIndex of selectedHabits) {
    const habit = habits[habitIndex];

    const selectedTime =
      (habitTimes[habitIndex] || dayjs()).format("HH:mm");

      const displayTime =
  (habitTimes[habitIndex] || dayjs()).format("hh:mm A");

if (usedTimes.has(selectedTime)) {
  await Swal.fire({
    icon: "warning",
    title: "Time Already Selected",
    text: `${displayTime} is already selected for another habit.`,
    confirmButtonColor: "#22c55e",
  });

  return 0;
}



const sameHabit = existingHabits.find(
  (h) => h.name.toLowerCase() === habit.label.toLowerCase()
);

if (sameHabit) {
  await Swal.fire({
    icon: "warning",
    title: "Habit Already Exists",
    text: `${habit.label} habit already exists.`,
    confirmButtonColor: "#22c55e",
  });

  return 0;
}


const sameTime = existingHabits.find(
  (h) => h.scheduled_time === selectedTime
);

if (sameTime) {
  await Swal.fire({
    icon: "warning",
    title: "Time Already Reserved",
    text: `${displayTime} already has another habit.`,
    confirmButtonColor: "#22c55e",
  });

  return 0;
}


usedTimes.add(selectedTime);




    const { data: newHabit, error } = await supabase
      .from("habits")
      .insert({
        user_id: user.id,
        name: habit.label,
        scheduled_time: selectedTime,
        image: habit.image,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      continue;
    }
    console.log("Inserted Habit:", newHabit);
    createdCount++;

  

   
  }

   const { data } = await supabase
  .from("habits")
  .select(`
    id,
    name,
     image,
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

localStorage.setItem("habits", JSON.stringify(data || []));
return createdCount;
};

const handleCreateHabits = async () => {
  if (creatingRef.current) return;

  creatingRef.current = true;
  setCreating(true);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const createdCount = await createHabitsInBackground();

    if (createdCount > 0) {
      await Swal.fire({
        icon: "success",
        title: "🎉 Habits Created!",
        text: "Your habits are ready to track.",
        width: 550,
        padding: "2rem",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/tracker");
    }
  } finally {
    creatingRef.current = false;
    setCreating(false);
  }
};

const addCustomHabit = async (): Promise<void> => {
  const label = newHabit.label?.trim();
const description = newHabit.description?.trim();

if (!label || !description) {
  return;
}
  if (newHabit.label && newHabit.description && newHabit.image) {
    const label = newHabit.label.trim();

const exists = habits.some(
  (h) => h.label.toLowerCase() === label.toLowerCase()
);

if (exists) {
  await Swal.fire({
    icon: "warning",
    title: "Habit Already Exists",
    text: "Choose another habit name.",
    confirmButtonColor: "#22c55e",
  });

  return;
}
    const customHabit: Habit = {
      label: newHabit.label,
      description: newHabit.description,
      image: newHabit.image,
      gradient:
        newHabit.gradient || "from-purple-500 via-pink-500 to-red-500",
      color: newHabit.color || "#8B5CF6",
      isCustom: true,
    };

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

 const { data, error } = await supabase
  .from("user_habits")
  .insert({
    user_id: user.id,
    label: customHabit.label.trim(),
description: customHabit.description.trim(),
    image: customHabit.image,
    gradient: customHabit.gradient,
    color: customHabit.color,
  })
  .select()
  .single();

    if (error) {
      console.error("Insert Error:", error);
      alert(error.message);
      return;
    }

    setHabits([
  ...habits,
  {
    ...customHabit,
    id: data.id,
  },
]);

    setIndex(habits.length);
    setShowAddModal(false);

    setNewHabit({
      label: "",
      description: "",
      image: "",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      color: "#8B5CF6",
    });
  }
};




const removeCustomHabit = async (habitIndex: number) => {
  const result = await Swal.fire({
  title: "Delete Habit?",
  text: "This cannot be undone.",
  icon: "warning",
  showCancelButton: true,
});

if (!result.isConfirmed) return;

  const habit = habits[habitIndex];

  if (!habit.isCustom) return;

  if (habit.id) {
    const { error } = await supabase
      .from("user_habits")
      .delete()
      .eq("id", habit.id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }
  }

  const updatedHabits = habits.filter((_, i) => i !== habitIndex);
  setHabits(updatedHabits);

  if (index >= updatedHabits.length) {
    setIndex(Math.max(updatedHabits.length - 1, 0));
  }

  setSelectedHabits(
    selectedHabits.filter((i) => i !== habitIndex)
  );
};
  

 const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -20 : 20,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.4,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 20 : -20,
      transition: {
        duration: 0.3,
      },
    }),
  };

  const orbitRadius = isMobile ? 105 : 150;
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Premium Background with Animated Gradients */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 60, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center px-4 sm:px-6 py-4 sm:py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full flex-shrink-0 pt-2"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-0.5"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Choose Habits
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xs sm:text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Transform your life • One habit at a time
          </motion.p>
        </motion.div>

  
       {/* Circle Container */}
<div className="relative flex items-center justify-center flex-1 w-full max-w-md mx-auto mt-12 mb-10">
          {/* Premium Dark Glow */}
          <motion.div
            className={`absolute rounded-full bg-gradient-to-r ${active.gradient} opacity-10 blur-2xl`}
            style={{
              width: isMobile ? "min(280px, 70vw)" : "min(320px, 55vw)",
              height: isMobile ? "min(280px, 70vw)" : "min(320px, 55vw)",
              maxWidth: "320px",
              maxHeight: "320px",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {/* Outer Elegant Ring */}
          <motion.div
            className="absolute rounded-full border border-white/10"
            style={{
              width: isMobile ? "min(240px, 60vw)" : "min(280px, 50vw)",
              height: isMobile ? "min(240px, 60vw)" : "min(280px, 50vw)",
              maxWidth: "280px",
              maxHeight: "280px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.05), transparent, rgba(255,255,255,0.05))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Main Glass Circle */}
          <div
            className={`relative rounded-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden`}
            style={{
              width: isMobile ? "min(200px, 50vw)" : "min(250px, 45vw)",
              height: isMobile ? "min(200px, 50vw)" : "min(250px, 45vw)",
              maxWidth: "250px",
              maxHeight: "250px",
            }}
          >
            {/* Inner Glow */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${active.gradient} opacity-15`}
            />

            {/* Rotating Light */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${active.color}15, transparent 70%)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity }}
            />


            {isCustomHabitCard ? (
  <div
    className="absolute inset-0 flex items-center justify-center cursor-pointer"
    onClick={() => setShowAddModal(true)}
  >
    <div className="flex flex-col items-center">
      <div className="w-28 h-28 rounded-full border-2 border-dashed border-purple-400 bg-purple-500/10 flex items-center justify-center">
        <span className="text-6xl text-purple-400">+</span>
      </div>
    </div>
  </div>
) : (
  <AnimatePresence mode="wait" custom={direction}>
     <motion.div
              
                // key={active.image}
                 key={`${index}-${active.label}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
       <motion.div
  whileHover="hover"
  initial="rest"
  animate="rest"
  onClick={() => toggleHabit(index)}
  className="group relative w-full h-full cursor-pointer overflow-hidden"
>
  {/* Image */}
  <motion.img
     src={IMAGE_MAP[active.image ?? ""] || Meditating}
    alt={active.label}
    variants={{
      rest: {
        scale: 1,
        filter: "blur(0px)",
      },
      hover: {
        scale: 1.08,
        filter: "blur(6px)",
      },
    }}
    transition={{ duration: 0.3 }}
    className={`object-contain drop-shadow-2xl w-full h-full ${
      isMobile ? "p-4" : "p-6"
    }`}
  />

  {/* Overlay */}
  <motion.div
    variants={{
      rest: {
        opacity: 0,
      },
      hover: {
        opacity: 1,
      },
    }}
    transition={{ duration: 0.25 }}
    className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex flex-col items-center justify-center"
  >
    <motion.div
      variants={{
        rest: {
          scale: 0.8,
          y: 10,
          opacity: 0,
        },
        hover: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
        <span className="text-3xl text-white"> {selectedHabits.includes(index) ? "−" : "+"}</span>
      </div>

      <span className="text-white font-semibold text-lg tracking-wide">
          {selectedHabits.includes(index)
    ? "Click to Remove"
    : "Click to Add"}
      </span>
    </motion.div>
  </motion.div>
</motion.div>


              </motion.div>
  </AnimatePresence>
)}

            {/* Image */}
            {/* <AnimatePresence mode="wait" custom={direction}>
              <motion.div
              
                key={active.image}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div  className="relative w-full h-full cursor-pointer z-50"
                   onClick={() => {
    console.log("image clicked");
    toggleHabit(index);
  }}

                >

                  <Image
                    src={active.image}
                    alt={active.label}
                    className={`object-contain drop-shadow-2xl w-full h-full ${
                      isMobile ? "p-4" : "p-6"
                    }`}
                  />
                </div>
              </motion.div>
            </AnimatePresence> */}

            {/* Subtle Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
              animate={{ x: ["-100%", "100%"], y: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5 }}
            />

            {/* Border Accent */}
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
          </div>

          

          {/* Subtle Orbiting Dots */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: isMobile ? "min(280px, 70vw)" : "min(320px, 58vw)",
              height: isMobile ? "min(280px, 70vw)" : "min(320px, 58vw)",
              maxWidth: "320px",
              maxHeight: "320px",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
         
{[...Array(isMobile ? 6 : 8)].map((_, i) => (
  <div
    key={i}
    className="absolute w-2 h-2 rounded-full bg-white/20"
    style={{
      top: "50%",
      left: "50%",
      transform: `
        translate(-50%, -50%)
        rotate(${i * (isMobile ? 60 : 45)}deg)
        translateX(${orbitRadius}px)
      `,
    }}
  />
))}
          </motion.div>

          {/* Outer Thin Rings */}
          <div
            className="absolute rounded-full border border-white/20 pointer-events-none"
            style={{
              width: isMobile ? "min(300px, 75vw)" : "min(340px, 62vw)",
              height: isMobile ? "min(300px, 75vw)" : "min(340px, 62vw)",
              maxWidth: "320px",
              maxHeight: "320px",
            }}
          />
        </div>

        {/* Content Section */}
        <div className="text-center w-full max-w-sm mx-auto flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => toggleHabit(index)}
            >
             {isCustomHabitCard ? "Custom Habit" : active.label}
            </motion.h2>

            <motion.button
  onClick={() => {
    if (isCustomHabitCard) {
      setShowAddModal(true);
    } else {
      toggleHabit(index);
    }
  }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                selectedHabits.includes(index)
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50"
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              {selectedHabits.includes(index) ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                  
                </motion.svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </motion.button>

            {/* Delete Custom Habit Button */}
            {active.isCustom && (
              <motion.button
                onClick={() => removeCustomHabit(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 flex items-center justify-center transition-all duration-300 flex-shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </motion.button>
            )}
          </div>

          <motion.p
            className="text-gray-300 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
           {isCustomHabitCard
  ? "Create your own personalized habit"
  : active.description}
          </motion.p>

          {active.isCustom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-500/20 rounded-full mt-1"
            >
              <span className="text-purple-400 text-[10px] sm:text-xs font-medium">
                Custom
              </span>
            </motion.div>
          )}

          {selectedHabits.includes(index) && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-500/20 rounded-full mt-1"
            >
              <motion.div
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-green-400 text-[10px] sm:text-xs font-medium">
                Added
              </span>
            </motion.div>
          )}

          {selectedHabits.includes(index) && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-3 w-full max-w-[260px] mx-auto"
  >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <TimePicker
    value={habitTimes[index] || dayjs()}
    onChange={(newValue) =>
      setHabitTimes((prev) => ({
        ...prev,
        [index]: newValue,
      }))
    }
    timeSteps={{ minutes: 1 }}
    slotProps={{
      textField: {
        fullWidth: true,
        sx: {
          "& .MuiSvgIcon-root": {
            color: "#4ade80",
          },

          backgroundColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "14px",

          "& .MuiInputBase-root": {
            height: "55px",
            color: "#fff",
          },

          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.08)",

            "& fieldset": {
              borderColor: "rgba(74,222,128,0.3)",
            },

            "&:hover fieldset": {
              borderColor: "#4ade80",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#4ade80",
              boxShadow:
                "0 0 12px rgba(74,222,128,0.4)",
            },
          },

          // 🔥 Time Text Color
          "& input": {
            color: "#ffffff !important",
            WebkitTextFillColor:
              "#ffffff !important",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "16px",
          },

          "& .MuiInputBase-input": {
            color: "#ffffff !important",
            WebkitTextFillColor:
              "#ffffff !important",
          },

          "& .MuiPickersSectionList-root": {
            color: "#ffffff !important",
          },

          "& .MuiPickersSectionList-root span": {
            color: "#ffffff !important",
          },

          "& .MuiPickersInputBase-sectionsContainer": {
            color: "#ffffff !important",
          },
        },
      },

      // Mobile Clock Dialog
      dialog: {
        sx: {
          "& .MuiClockNumber-root": {
            color: "#4ade80 !important",
          },

          "& .Mui-selected": {
            backgroundColor:
              "#4ade80 !important",
            color: "#000 !important",
          },

          "& .MuiClockPointer-root": {
            backgroundColor:
              "#4ade80 !important",
          },

          "& .MuiClockPointer-thumb": {
            borderColor:
              "#4ade80 !important",
            backgroundColor:
              "#4ade80 !important",
          },

          "& .MuiTypography-root": {
            color: "#4ade80 !important",
          },
        },
      },
    }}
  />
</LocalizationProvider>
  </motion.div>
)}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 my-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>

            
          </motion.button>

          {/* Indicator Dots */}
          {/* <div className="flex gap-1.5"> */}
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-2 no-scrollbar max-w-[280px] sm:max-w-[420px]">
            {habits.map((habit: Habit, i: number) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                whileHover={{ scale: 1.2 }}
                // className="relative"
                className="relative flex-shrink-0"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? `w-4 sm:w-5 bg-gradient-to-r ${habit.gradient}`
                       : habit.isCustom
      ? "w-1.5 bg-purple-500"
      : "w-1.5 bg-white/50"
                    
                  }`}
                />
              
                {/* {habit.isCustom && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
                )} */}
                
              </motion.button>
            ))}
            {/* Add Custom Habit Button - Add to navigation */}
            <motion.button
              onClick={() => setShowAddModal(true)}
              whileHover={{ scale: 1.2 }}
              className="relative w-5 h-5 rounded-full border-2 border-dashed border-white/30 hover:border-white/60 flex items-center justify-center transition-all duration-300"
            >
              <svg
                className="w-3 h-3 text-white/50 hover:text-white/80 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Progress Section with Continue Button */}
        <div className="w-full max-w-xs sm:max-w-sm mx-auto flex-shrink-0 mt-1">
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-gray-400">Habits</span>
              <span className="text-xs font-semibold text-white">
                {selectedHabits.length}{" "}
                <span className="text-gray-400">/ {habits.length}</span>
              </span>
            </div>

            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden mb-2.5">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(selectedHabits.length / habits.length) * 100}%`,
                }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  animate={{ x: ["-100%", "0%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* set time Button - Below Progress Bar */}
            <AnimatePresence mode="wait">
              {selectedHabits.length > 0 ? (
                <motion.button
disabled={
  creating ||
  creatingRef.current ||
  selectedHabits.length === 0 ||
  selectedHabits.some((i) => !habitTimes[i])
}
                 onClick={handleCreateHabits}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-semibold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>
  {creating ? "Creating Habits..." : "Create Habits"}
</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full py-2 text-center text-gray-500 text-xs"
                >
                  Select habits to begin your journey
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Add Custom Habit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Add Custom Habit</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {/* Habit Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Habit Name</label>
                  <input
                    type="text"
                    value={newHabit.label}
                    onChange={(e) => setNewHabit({ ...newHabit, label: e.target.value })}
                    placeholder="e.g., Reading"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <input
                    type="text"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    placeholder="e.g., Read for 30 minutes daily"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Image Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Choose Image</label>
                  <div className="grid grid-cols-4 gap-2">
                  {customHabitImages.slice(0, 8).map((item) => (
  <button
    key={item.key}
    onClick={() =>
      setNewHabit({
        ...newHabit,
        image: item.key,
      })
    }
    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
      newHabit.image === item.key
        ? "border-purple-500 shadow-lg shadow-purple-500/30"
        : "border-white/10 hover:border-white/30"
    }`}
  >
    <img
      src={item.image}
      alt="Habit"
      className="w-full h-full object-cover"
    />
  </button>
))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Choose Color</label>
                  <div className="flex gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.color}
                        onClick={() =>
                          setNewHabit({
                            ...newHabit,
                            gradient: color.gradient,
                            color: color.color,
                          })
                        }
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${color.gradient} transition-all ${
                          newHabit.color === color.color
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                            : "hover:scale-110"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Add Button */}
                <button
                  onClick={addCustomHabit}
                  disabled={!newHabit.label || !newHabit.description || !newHabit.image}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Add Habit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HabitSelector;