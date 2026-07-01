
import {
  Routes,
  Route,
} from "react-router-dom";



// Pages import
import Home from "../pages/Home";
import Login from "../auth/login";
import Register from "../auth/register";
import ForgetPassword from "../auth/forget-password";
import CallBack from "../auth/callback";
import ResetPassword from "../auth/reset-password";
import HabitCreate from "../pages/HabitCreate";
import HabitComplete from "../pages/HabitComplete";
import Tracker from "../pages/Tracker";
import WhyWeBuiltThis from "../pages/WhyWeBuiltThis"
import Levels from "../pages/level";


export default function AppRoutes() {


  return (
    <Routes>

      {/* 🏠 Home */}
<Route
  path="/"
  element={<Home />}
/>

<Route
  path="level"
  element={<Levels />}
/>



      {/* 🔐 Auth */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forget-password"
        element={<ForgetPassword />}
      />

      <Route
        path="/callback"
        element={<CallBack />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* 📋 Habit Flow */}
      <Route
        path="/create-habit"
        element={<HabitCreate />}
      />

      <Route
        path="/complete-habit"
        element={<HabitComplete />}
      />

      <Route
        path="/tracker"
        element={<Tracker />}
      />
       <Route
        path="/why-we-build-this"
        element={<WhyWeBuiltThis />}
      />

      {/* ❌ Fallback */}
      <Route
        path="*"
        element={
          <h1>
            404 - Page Not Found
          </h1>
        }
      />

    </Routes>
  );
}