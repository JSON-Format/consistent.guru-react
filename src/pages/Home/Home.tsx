import { motion } from "framer-motion";
import logo from "../../assets/guru-meditating.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";
import {  
  Zap,
} from "lucide-react";

 function HomePage (){
  const navigate = useNavigate();


  const handleStart = async () => {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // ❌ NOT LOGGED IN
  if (!user) {
    navigate("/login");
    return;
  }


let habits;
// ⚡ 1. cache read
const cached = localStorage.getItem("habits");
if (cached) {
  habits = JSON.parse(cached);
}


// 🔥 2. ALWAYS fetch latest
const { data: habitsData } = await supabase
  .from("habits")
  .select(`
    *,
    habit_logs (
      date,
      is_complete
    )
  `)
  .eq("user_id", user.id);

if (habitsData) {
  habits = habitsData;
  localStorage.setItem("habits", JSON.stringify(habitsData));
}
  

  // 🆕 FIRST TIME USER
  if (!habits || habits.length === 0) {
    navigate("/create-habit");
    return;
  }

  // 🔥 CHECK TIME
  const habit = habits[0]; // first habit
  const today = new Date().toISOString().split("T")[0];

const todayLog = habit.habit_logs?.find(
  (log: any) => log.date === today
);

const alreadyCompleted = todayLog?.is_complete;

  const now = new Date();
  const [h, m] = habit.scheduled_time.split(":").map(Number);

  const scheduled = new Date();
  scheduled.setHours(h, m, 0, 0);

  const before = new Date(scheduled.getTime() - 60 * 60 * 1000);
  const after = new Date(scheduled.getTime() + 60 * 60 * 1000);

  const isValidTime = now >= before && now <= after;

  // 🎯 ROUTE
// 🔥 already complete
if (alreadyCompleted) {
  navigate("/tracker");
  return;
}

// ⏰ time check
if (isValidTime) {
  navigate("/complete-habit");
} else {
  navigate("/tracker");
}
};
  return (
    <div className="w-full bg-background ">
      {/* Animated Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

        {/* Hero Section - Improved responsive layout */}
<div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 w-full">
          
          {/* Guru Circle Button - Moved to top on mobile, right side on desktop */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex-1 flex justify-center order-first lg:order-last"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px hsl(152 60% 52% / 0.15), 0 0 60px hsl(152 60% 52% / 0.05)",
                  "0 0 45px hsl(152 60% 52% / 0.3), 0 0 90px hsl(152 60% 52% / 0.1)",
                  "0 0 30px hsl(152 60% 52% / 0.15), 0 0 60px hsl(152 60% 52% / 0.05)",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-full"
            >
              <motion.button
              onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-card transition-all duration-300 hover:border-primary/60"
                style={{ boxShadow: "var(--glow-primary)" }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt="Meditating Guru"
                    className="w-4/5 h-4/5 object-contain"
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Left Content */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Show Up Today. Win Tomorrow 👋</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
               Stay Consistent
              </span>
              <br />
              <span className="text-foreground">Become Unstoppable</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              Small actions repeated daily create powerful results.  
Show up every day — no excuses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.button
              onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                style={{ boxShadow: "var(--glow-primary)" }}
              >
               Start Journey
              </motion.button>
              
              <motion.button
              onClick={async () => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    navigate("/login");
  } else {
    navigate("/tracker");
  }
}} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-card text-foreground rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-border text-sm sm:text-base"
              >
                Go To Tracker
              </motion.button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;