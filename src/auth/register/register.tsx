import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { showToast } from "../../components/appToast"; 

type Particle = {
  top: number;
  left: number;
  duration: number;
  delay: number;
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (loading) return;

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    });

    if (error) {
      showToast.error(error.message);
      setLoading(false);
      return;
    }

    showToast.success("Account created! Check your email 📩");
    setLoading(false);
    navigate("/login");
  };

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));

    setParticles(generated);
  }, []);

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${import.meta.env.VITE_SITE_URL}/callback`,
      },
    });

    if (error) {
      showToast.error(error.message);
      setLoading(false);
    }
  };

 

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden w-full">

      {/* FLOAT ANIMATION */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0); opacity:0 }
          10% { opacity:1 }
          90% { opacity:1 }
          100% { transform: translateY(-100vh); opacity:0 }
        }
      `}
      </style>

      {/* GLOW BACKGROUND */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/30 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/30 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute w-[700px] h-[700px] bg-green-500/10 blur-[200px] rounded-full"></div>

      {/* FLOAT PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CARD */}
      <div className="relative z-10 w-[420px] max-w-full p-8 rounded-[var(--radius)] bg-card border border-border shadow-[0_0_60px_rgba(0,255,170,0.15)]">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-xl bg-muted border-2 border-green-500">
            <User className="w-6 h-6 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white">
          Join Us
        </h1>

        <p className="text-center text-muted-foreground mt-2 mb-6">
          Stay Consistent. Become Unstoppable.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* NAME */}
          <div className="relative mb-4">
            <User className="absolute left-3 top-3 w-5 h-5 text-primary" />
            <input
              {...register("name", { required: "Name required" })}
              placeholder="Full Name"
              className=" placeholder-primary text-white
              border border-primary w-full pl-10 py-3 rounded-lg bg-input  focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-primary" />
            <input
              {...register("email", { required: "Email required" })}
              placeholder="Email"
               className="w-full pl-10 py-3 
              rounded-lg bg-input text-white
              focus:ring-2 
              focus:ring-primary outline-none
               placeholder-primary
              border border-primary"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password required" })}
              placeholder="Password"
                 className="
              w-full pl-10 pr-10 py-3 rounded-lg bg-input
               focus:ring-2 focus:ring-primary outline-none
                placeholder-primary
              border border-primary text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-primary"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
               className="
            w-full
            py-3
            rounded-lg
            font-semibold
            bg-primary
            text-primary-foreground
            shadow-[0_0_30px_rgba(0,255,170,0.4)]
            hover:scale-[1.02]
            transition
          "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

           <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-primary"></div>
          <span className="text-muted-foreground text-sm">
            OR JOIN WITH
          </span>
          <div className="flex-1 h-px bg-primary"></div>
        </div>

        {/* OAUTH */}
        <div className="flex gap-3 mt-6">
             <button 
            onClick={handleGoogleLogin} 
             disabled={loading}
          className="flex-1 border border-border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary transition  border-green-500 text-white">

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />

            Google

          </button>
        </div>

        {/* LOGIN LINK */}
        <p className="text-center mt-6 text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer"
          >
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
}