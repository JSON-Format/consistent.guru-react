import { useNavigate } from "react-router-dom";


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import guru from "../../assets/guru-meditating.png";

export default function ConsistentGuruManifesto() {
    const navigate = useNavigate();
  const [breathPhase, setBreathPhase] = useState<
  "inhale" | "hold" | "exhale"
>("inhale");

  // Breathing cycle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === "inhale") return "hold";
        if (prev === "hold") return "exhale";
        return "inhale";
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const breathScale = {
    inhale: 1.08,
    hold: 1.12,
    exhale: 1,
  };

  return (
    <div className="min-h-screen  text-white overflow-x-hidden">
      {/* Glow Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-green-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-emerald-500/10 blur-[200px] rounded-full" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-16 py-6 md:py-10 tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[11px] uppercase text-white/60">
        <h1 className="text-xs md:text-sm">Consistent.Guru</h1>
        <p className="text-xs md:text-sm">Manifesto · 01</p>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6">
        {/* Image with Rings Container - Larger Size */}
        <div className="relative mb-8 md:mb-10 flex justify-center items-center">
          
          {/* Outer Ring 1 - Farthest */}
          <motion.div
            className="absolute rounded-full border border-green-400/20"
            style={{
              width: 200,
              height: 200,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0,
              ease: "easeInOut",
            }}
          />

          {/* Outer Ring 2 - Middle */}
          <motion.div
            className="absolute rounded-full border border-green-400/30"
            style={{
              width: 170,
              height: 170,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Outer Ring 3 - Inner */}
          <motion.div
            className="absolute rounded-full border border-green-400/40"
            style={{
              width: 140,
              height: 140,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.6,
              ease: "easeInOut",
            }}
          />

          {/* Rotating Ring */}
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              width: 180,
              height: 180,
              borderTopColor: "rgba(34,197,94,0.8)",
              borderRightColor: "rgba(34,197,94,0.2)",
              borderBottomColor: "rgba(34,197,94,0.1)",
              borderLeftColor: "rgba(34,197,94,0.2)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Opposite Rotating Ring */}
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              width: 150,
              height: 150,
              borderTopColor: "rgba(16,185,129,0.1)",
              borderRightColor: "rgba(16,185,129,0.6)",
              borderBottomColor: "rgba(16,185,129,0.2)",
              borderLeftColor: "rgba(16,185,129,0.1)",
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Pulsing Glow Behind Image */}
          <motion.div
            className="absolute rounded-full bg-green-400/20 blur-xl"
            style={{
              width: 120,
              height: 120,
            }}
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Image with Breathing */}
          <motion.div
            animate={{
              scale: breathScale[breathPhase],
            }}
            transition={{
              scale: { duration: 4, ease: "easeInOut" },
            }}
            className="relative z-10"
          >
            <motion.img
              src={guru}
              alt="meditation"
              className="relative w-28 md:w-36"
              animate={{
                y: breathPhase === "inhale" ? -5 : breathPhase === "exhale" ? 5 : 0,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              style={{
                filter: "drop-shadow(0 0 30px rgba(34,197,94,0.6))",
              }}
            />
          </motion.div>

          {/* Orbiting Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
              style={{
                borderRadius: "50%",
              }}
              animate={{
                x: [
                  Math.cos((i * 45) * Math.PI / 180) * 105,
                  Math.cos(((i * 45) + 10) * Math.PI / 180) * 120,
                  Math.cos((i * 45) * Math.PI / 180) * 105,
                ],
                y: [
                  Math.sin((i * 45) * Math.PI / 180) * 105,
                  Math.sin(((i * 45) + 10) * Math.PI / 180) * 120,
                  Math.sin((i * 45) * Math.PI / 180) * 105,
                ],
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <p className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-green-400 text-[10px] md:text-xs mb-6 md:mb-8 mt-12">
          The Intention
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-[120px] leading-[1.1] md:leading-none font-serif font-light max-w-5xl px-4">
          The quiet
          <br />
          <span className="italic text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.7)]">
            rebellion.
          </span>
        </h1>

        <p className="mt-6 md:mt-10 text-white/70 text-sm md:text-lg max-w-2xl px-4">
          A few words on why we made this — and who we made it for.
        </p>
      </section>

      {/* Section 1 */}
      <section className="py-20 md:py-36 px-4 md:px-20 border-t border-white/10">
        <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-10 max-w-7xl mx-auto">
          <div>
            <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/30 text-[10px] md:text-xs">
              01. The Fracture
            </p>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-7xl leading-tight font-serif font-light text-white/90">
              We live inside a digital era engineered to
              <span className="italic text-green-400"> fracture our attention.</span>
            </h2>

            <div className="mt-8 md:mt-14 space-y-6 md:space-y-10 text-white/70 text-base md:text-xl leading-[1.8rem] md:leading-[2.2rem]">
              <p>
                Every screen multitasks for us. Every notification interrupts a
                thought before it has the chance to finish. Our concentration —
                once the quiet engine of any meaningful pursuit — has been
                steadily depleted, traded away for an endless scroll of fleeting
                stimulation.
              </p>

              <p>
                In a world that rewards reaction, doing anything consistently
                has become genuinely difficult. Not because we lack the will,
                but because the environment itself is hostile to quiet, daily
                returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="md:py-20 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif italic text-2xl sm:text-3xl md:text-5xl leading-tight text-white/80">
            “We mistook frenetic motion for progress,
            <br />
            and constant stimulation for meaning.”
          </h2>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 md:py-36 px-4 md:px-20">
        <div className="grid md:grid-cols-[1fr_220px] gap-6 md:gap-10 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-7xl leading-tight font-serif font-light text-white/90">
              So we built a small, patient tool to
              <span className="italic text-green-400"> cultivate consistency</span>
              in your habits.
            </h2>

            <div className="mt-8 md:mt-14 space-y-6 md:space-y-10 text-white/70 text-base md:text-xl leading-[1.8rem] md:leading-[2.2rem]">
              <p>
                Habits are not forged in a frenzy. They take root in a spacious
                mind and an unhurried cadence — in the simple act of showing up
                for the same practice, again, the next day, and the day after
                that.
              </p>

              <p>
                Consistent is the sanctuary we wished existed. Streaks become
                gentle proof of how far you've come. Badges quietly mark
                meaningful milestones along the way. Each return is celebrated
                — never demanded — so progress feels earned, not extracted.
              </p>

              <p>
                We made it because we needed it. We share it in case you do too.
              </p>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/30 text-[10px] md:text-xs h-fit">
              02. The Return
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-36 px-4 md:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-center text-white/30 text-[10px] md:text-xs mb-12 md:mb-24">
            How We Built It
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <p className="italic text-white/50 mb-3 md:mb-5 text-lg md:text-base">i.</p>
              <h3 className="font-serif text-2xl md:text-4xl text-white/90 mb-4 md:mb-6">
                One thing, gently
              </h3>
              <p className="text-white/65 text-base md:text-xl leading-[1.6rem] md:leading-[2rem]">
                The interface recedes so you can see only what matters today.
                One habit. One return. One small, deliberate act.
              </p>
            </div>

            <div>
              <p className="italic text-white/50 mb-3 md:mb-5 text-lg md:text-base">ii.</p>
              <h3 className="font-serif text-2xl md:text-4xl text-white/90 mb-4 md:mb-6">
                Streaks that encourage
              </h3>
              <p className="text-white/65 text-base md:text-xl leading-[1.6rem] md:leading-[2rem]">
                Watch your consistency grow day by day. Streaks celebrate the
                rhythm you're building — and a missed day never erases the work
                behind you.
              </p>
            </div>

            <div>
              <p className="italic text-white/50 mb-3 md:mb-5 text-lg md:text-base">iii.</p>
              <h3 className="font-serif text-2xl md:text-4xl text-white/90 mb-4 md:mb-6">
                Badges worth earning
              </h3>
              <p className="text-white/65 text-base md:text-xl leading-[1.6rem] md:leading-[2rem]">
                Meaningful milestones marked with quiet pride. Earn badges that
                recognize real growth — not vanity metrics designed to keep you
                scrolling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 relative">
        <motion.div 
          className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-500/20 blur-[160px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* CTA Image with Ring - Larger */}
        <div className="relative mb-6 md:mb-8 flex justify-center items-center">
          <motion.div
            className="absolute rounded-full border border-green-400/30"
            style={{
              width: 100,
              height: 100,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute rounded-full border border-green-400/20"
            style={{
              width: 120,
              height: 120,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
          />

          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/20 blur-xl"
              style={{
                width: 85,
                height: 85,
                left: -28,
                top: -28,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <img
              src={guru}
              alt="meditation"
              className="w-20 md:w-28 relative z-10 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]"
            />
          </motion.div>
        </div>

        <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/40 text-[10px] md:text-xs mb-6 md:mb-8 relative z-10">
          Begin
        </p>

        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-8xl text-white/90 relative z-10 px-4">
          Cultivate your practice.
        </h2>

        <button onClick={() => navigate("/")}  className="mt-8 md:mt-14 px-8 md:px-12 py-3 md:py-5 rounded-full bg-green-400 text-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.6)] relative z-10">
          Start Your Journey
        </button>

        <p className="mt-6 md:mt-10 text-white/40 text-sm md:text-lg relative z-10 px-4">
          No urgency. No notifications. Just the practice.
        </p>

        <p className="absolute bottom-6 md:bottom-10 text-white/30 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-xs">
          Consistent.Guru
        </p>
      </section>
    </div>
  );
}