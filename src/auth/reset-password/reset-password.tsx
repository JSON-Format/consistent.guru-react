import { supabase } from "../../lib/client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff } from "lucide-react";
import { showToast } from "../../components/appToast";

type Particle = {
  top: number;
  left: number;
  duration: number;
  delay: number;
};

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      showToast.error(error.message);
      return;
    }

    showToast.success("Password updated successfully!");
    navigate("/login");
  };

  // 🔐 session check (IMPORTANT)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        showToast.error("Reset link expired or invalid");
        navigate("/forget-password");
      }
    };

    checkSession();
  }, []);

  // 🌌 particles
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-4 w-full">

      {/* FLOAT */}
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
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 blur-[150px] rounded-full animate-pulse"></div>

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
      <div className="relative z-10 w-full max-w-md p-8 rounded-xl bg-card border border-border shadow-[0_0_60px_rgba(0,255,170,0.15)]">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-xl bg-muted border border-primary">
            <Lock className="w-6 h-6 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-foreground">
          Set New Password
        </h1>

        <p className="text-center text-muted-foreground mt-2 mb-6">
          Choose a strong password for your account.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-primary" />

            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="New Password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-input border border-primary text-white focus:ring-2 focus:ring-primary outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-primary"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-primary" />

            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-input border border-primary text-white focus:ring-2 focus:ring-primary outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-primary"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
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
            Update Password
          </button>

        </form>

        {/* BACK */}
        <div className="text-center mt-6">
          <span
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-primary cursor-pointer"
          >
            ← Back to Sign In
          </span>
        </div>

      </div>
    </div>
  );
}