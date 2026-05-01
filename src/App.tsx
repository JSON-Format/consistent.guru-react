import AppNavbar from "./components/appNavbar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppToaster } from "./components/appToast";
function App() {

    const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register","/forget-password","/callback","/reset-password","/create-habit",
    "/complete-habit",
  ];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    // 🔥 recovery link detect
    if (hash.includes("type=recovery")) {
      navigate("/reset-password", { replace: true });
    }
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navbar */}
       {!hideNavbar && <AppNavbar />}

      {/* Page content */}
      <div className="flex-1 flex items-center justify-center lg:overflow-hidden">
        <AppRoutes />
        <AppToaster />
      </div>

    </div>
  );
}

export default App;