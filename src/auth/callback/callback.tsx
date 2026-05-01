import { useEffect } from "react";
import { supabase } from "../../lib/client";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/appLoader";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);

      const code = params.get("code");
      const flow = params.get("flow");
      const type = params.get("type"); // 🔥 ADD THIS
      const errorCode = params.get("error_code");

      // ❌ expired reset link
      if (errorCode === "otp_expired") {
        navigate("/reset-password?expired=true", { replace: true });
        return;
      }

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);

        // 🔥 FIX HERE
        if (flow === "reset" || type === "recovery") {
          navigate("/reset-password", { replace: true });
          return;
        }

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
          navigate("/login", { replace: true });
          return;
        }

        const { data: habits } = await supabase
          .from("habits")
          .select("id")
          .eq("user_id", user.id);

        if (!habits || habits.length === 0) {
          navigate("/habit", { replace: true });
          return;
        }

        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleAuth();
  }, []);

  return <AppLoader />;
}