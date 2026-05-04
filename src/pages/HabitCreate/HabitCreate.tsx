import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import guru from "../../assets/guru-meditating.png"
import { supabase } from "../../lib/client";
import { useNavigate } from "react-router-dom";


function isWithinTimeRange(taskTime: string, range = 1) {
  if (!taskTime) return false;

  const now = new Date();

  const [hours, minutes] = taskTime.split(":").map(Number);

  const task = new Date();
  task.setHours(hours, minutes, 0, 0);

  const before = new Date(task.getTime() - range * 60 * 60 * 1000);
  const after = new Date(task.getTime() + range * 60 * 60 * 1000);

  return now >= before && now <= after;
}

export default function HabitCreatePage() {
  const navigate = useNavigate();
  const [breathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [timeValue, setTimeValue] = useState<Dayjs | null>(dayjs());


const handleCreateHabit = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    alert("Login to access");
    return;
  }

  const now = new Date().toISOString();
  const today = new Date().toISOString().split("T")[0];

  const { data: existingHabit } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user.id)
    .eq("name", "Meditating")
    .maybeSingle();

  let finalTime;

  // 🔥 decide correct time
  if (!existingHabit) {
    const selectedTime = timeValue
  ? dayjs(timeValue.toDate()).format("HH:mm")
  : "00:00";

  console.log("UI:", timeValue?.format("hh:mm A"));
console.log("DB:", selectedTime);

    const { data: newHabit } = await supabase
      .from("habits")
      .insert([
        {
          user_id: user.id,
          name: "Meditating",
          scheduled_time: selectedTime,
          created_at: now,
        },
      ])
      .select()
      .single();

    finalTime = selectedTime;

    await supabase.from("habit_logs").insert([
      {
        habit_id: newHabit.id,
        date: today,
        is_complete: false,
      },
    ]);
  } else {
    // 🔥 already habit irundha DB time use pannu
    finalTime = existingHabit.scheduled_time;
  }

  // 🔥 FINAL ROUTING LOGIC
  if (isWithinTimeRange(finalTime)) {
     navigate("/complete-habit");
  } else {
      navigate("/tracker");
  }
};


  const breathScale = {
  inhale: 1.05,
  hold: 1.08,
  exhale: 1,
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
            {/*==============  */}
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
  value={timeValue}
  onChange={(newValue) => setTimeValue(newValue ?? dayjs())}
  disabled={false}
  timeSteps={{ minutes: 1 }}
  slotProps={{
    textField: {
      fullWidth: true,

      sx: {
           "& .MuiSvgIcon-root": {
        color: "#4ade80",
      },
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "14px",

        "& .MuiInputBase-root": {
          height: "55px",
          padding: "0 16px",
        },

        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(74, 222, 128, 0.2)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(74, 222, 128, 0.4)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4ade80 !important",
            boxShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
          },
        },

        "& .MuiPickersSectionList-root": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          textAlign: "center",
        },

        "& .MuiPickersSectionList-root span": {
          fontSize: "18px",
          letterSpacing: "1px",
          fontWeight: 500,
          color: "#fff !important",
        },
      },
    },

    // 🔥 MOBILE ONLY
    dialog: {
      sx: {
        "@media (pointer: coarse)": {
          "& .MuiClockNumber-root": {
            color: "#4ade80 !important",
          },

          "& .Mui-selected": {
            backgroundColor: "#4ade80 !important",
            color: "#000 !important",
          },

          "& .MuiClockPointer-root": {
            backgroundColor: "#4ade80 !important",
          },

          "& .MuiClockPointer-thumb": {
            borderColor: "#4ade80 !important",
            backgroundColor: "#4ade80 !important",
          },

          // AM/PM text
          "& .MuiTypography-root": {
            color: "#4ade80 !important",
          },
        },
      },
    },
  }}
/>
            </LocalizationProvider>
          </div>
        </div>
       
        {/* 🚀 BUTTON */}
      <button
      type="button"
      onClick={handleCreateHabit}
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
      Create Habit
</button>
      </div>
    </div>
  );
}