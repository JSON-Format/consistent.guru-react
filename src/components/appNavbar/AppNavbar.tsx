import { useEffect, useState } from "react";
import { LogIn, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";
import logo from "../../assets/guru-meditate.png";
export default function AppNavbar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const handleClickOutside = () => {
    setOpen(false);
  };

  if (open) {
    window.addEventListener("click", handleClickOutside);
  }

  return () => {
    window.removeEventListener("click", handleClickOutside);
  };
}, [open]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
const logout = async () => {
  setUser(null);
  setOpen(false);

  navigate("/login");

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
  }
};

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card backdrop-blur-md px-4">
      <div className="h-14 flex items-center justify-between">

        {/* 🔥 Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-lg font-semibold cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
                src={logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="font-display">
            <span className="text-primary">Stay</span>{" "}
            <span className="text-white">Consistent</span>
          </span>
        </div>

        {/* 👤 Account */}
       
          {/* Icon */}
          <div 
            onClick={(e) => {
    e.stopPropagation(); // 🔥 IMPORTANT
    setOpen(!open);
  }}
            className="p-1 rounded-full hover:bg-muted transition cursor-pointer border border-primary">
            {user ? (
              <img
                src={
                  user?.user_metadata?.avatar_url ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`
                }
                className="w-9 h-9 rounded-full object-cover border border-primary"
              />
            ) : (
              <User className="w-7 h-7 text-primary "  />
            )}
          </div>

          {/* Dropdown */}
<div
  onClick={(e) => e.stopPropagation()}
  className={`
    absolute right-0 top-full mt-2 min-w-[200px]
    bg-card border border-border rounded-xl shadow-lg
    transition-all duration-200
    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
>

            {user ? (
              <>
                {/* Account Info */}
                <div className="px-4 py-3 border-b border-border  ">
                  <p className="text-xs text-muted-foreground">Account</p>
                  <p className="text-sm font-medium text-primary truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Logout */}
               <button
  onClick={logout}
  className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-muted active:scale-95 transition text-red-500"
>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-muted text-primary "
              >
                <LogIn className="w-4 h-4" />
                Login / Sign Up
              </button>
            )}

          </div>
        </div>
    </nav>
  );
}