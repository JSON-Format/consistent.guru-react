import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff} from "lucide-react";
import { showToast } from "../../components/appToast"; 

type Particle = {
  top: number;
  left: number;
  duration: number;
  delay: number;
};

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // 🔐 LOGIN
  const onSubmit = async (data: FormData) => {
    if (loginLoading) return;
    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      showToast.error(error.message);
      setLoginLoading(false);
      return;
    }

    showToast.success("Login successful 🎉");

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { data: habits } = await supabase
      .from("habits")
      .select("id")
      .eq("user_id", user.id);

    setLoginLoading(false);

    if (habits && habits.length > 0) {
      navigate("/tracker");
    } else {
      navigate("/create-habit");
    }
  };

  // 🌟 PARTICLES
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 5,
    }));

    setParticles(generated);
  }, []);

  // 🌐 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);

  const siteUrl = window.location.origin;

const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${siteUrl}/callback`,
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

      {/* GLOW */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/30 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/30 blur-[150px] rounded-full animate-pulse"></div>

      {/* PARTICLES */}
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
      <div className="relative z-10 w-[420px] max-w-full p-8 rounded-xl bg-card border border-border shadow-[0_0_60px_rgba(0,255,170,0.15)]">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-xl bg-muted border-2 border-green-500">
            <Lock className="w-6 h-6 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-muted-foreground mt-2 mb-6">
          Stay Consistent. Stay Powerful ⚡
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* EMAIL */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-primary" />
            <input
              type="email"
              {...register("email", { required: "Email required" })}
              placeholder="Email"
                className="
              w-full
              pl-10
              py-3
              rounded-lg
              bg-input
               placeholder-primary
              border border-primary
              focus:ring-2
              focus:ring-primary
              outline-none
              transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password required" })}
              placeholder="Password"
               className="
              w-full
              placeholder-primary
              pl-10
              pr-10
              py-3
              rounded-lg
              bg-input
              border border-primary
              focus:ring-2
              focus:ring-primary
              outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-primary"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* FORGOT */}
          <div
            onClick={() => navigate("/forget-password")}
           className="text-right text-sm text-muted-foreground mb-6 hover:text-primary cursor-pointer"
          >
            Forgot Password?
          </div>

          {/* SUBMIT */}
             <button
             type="submit"
  disabled={loginLoading}
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
            {loginLoading ? "Signing in..." : "Sign In"}
          </button>

        </form>


    {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-primary"></div>

          <span className="text-muted-foreground text-sm">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 h-px bg-primary"></div>
        </div>

        {/* OAUTH */}
        <div className="flex gap-3 mt-6">
             <button
            onClick={handleGoogleLogin} 
             disabled={loading}
          className="flex-1 border border-border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary transition  border-green-500">

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />

            Google

          </button>
          
        </div>

        {/* REGISTER */}
        <p className="text-center mt-6 text-muted-foreground">
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-primary cursor-pointer"
          >
            Create account
          </span>
        </p>

      </div>
    </div>
  );
}