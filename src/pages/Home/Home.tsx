import { motion } from "framer-motion";
import logo from "../../assets/guru-consistency.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";
import {  
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";

function HomePage() {
  const navigate = useNavigate();


  return (
    <div className="h-[calc(100vh-72px)]  w-full bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content - Full Width */}
<div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">        
        {/* Hero Section - Full Width */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-16 xl:gap-16 w-full max-w-7xl mx-auto">
          
          {/* Guru Circle - Mobile: Top, Desktop: Right */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-primary/20 border-t-primary/60"
              />
              
              {/* Inner glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 30px hsl(152 60% 52% / 0.15), 0 0 60px hsl(152 60% 52% / 0.05)",
                    "0 0 50px hsl(152 60% 52% / 0.3), 0 0 100px hsl(152 60% 52% / 0.1)",
                    "0 0 30px hsl(152 60% 52% / 0.15), 0 0 60px hsl(152 60% 52% / 0.05)",
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-1 sm:-inset-2 rounded-full"
              />
              
              <motion.button
                
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-gradient-to-br from-card to-primary/5 transition-all duration-300 hover:border-primary/60 hover:shadow-2xl"
                style={{ boxShadow: "var(--glow-primary)" }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center p-3 sm:p-4"
                >
                  <img
                    src={logo}
                    alt="Meditating Guru"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                
                {/* Pulse ring animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-primary/20"
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Content - Mobile: Below image, Desktop: Left side */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full flex flex-col items-center lg:items-start"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="hidden md:inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4 md:mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-primary whitespace-nowrap">Show Up Today. Win Tomorrow 👋</span>
            </motion.div>
            
            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 md:mb-0" style={{ fontFamily: "var(--font-display)" }}>
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Stay Consistent
              </span>
              <br />
              <span className="text-foreground ">
                Become <br /> Unstoppable
              </span>
            </h1>
            
            {/* Description - Hidden on mobile, visible on tablet+ */}
            <p className="hidden sm:block text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground mt-2 md:mt-3 lg:mt-4 mb-4 md:mb-6 lg:mb-8 max-w-md md:max-w-lg lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Small actions repeated daily create powerful results.
              <br />
              <span className="text-primary/80 text-xs md:text-sm lg:text-base">Show up every day — no excuses.</span>
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <motion.button
                onClick={async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      navigate("/login");
    } else {
      navigate("/create-habit");
    }
  }}
              
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl sm:rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg hover:shadow-2xl"
                style={{ boxShadow: "var(--glow-primary)" }}
              >
                Create Habit
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
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
                className="w-full sm:w-auto px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-4 bg-card/80 backdrop-blur-sm text-foreground rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                View Tracker
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;