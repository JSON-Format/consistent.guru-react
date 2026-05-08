
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/client";

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
import AppLoader from "../components/appLoader";
import WhyWeBuiltThis from "../pages/WhyWeBuiltThis"

export default function AppRoutes() {

  const [redirectPath, setRedirectPath] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkUserFlow();
  }, []);

  const checkUserFlow = async () => {

    const { data } =
      await supabase.auth.getUser();

    const user = data.user;

    // ❌ NOT LOGIN
    if (!user) {
      setLoading(false);
      return;
    }

    let habits;

    // ⚡ cache
    const cached =
      localStorage.getItem("habits");

    if (cached) {
      habits = JSON.parse(cached);
    }

    // 🔥 latest fetch
    const { data: habitsData } =
      await supabase
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
    }

    // 🆕 NO HABIT
    if (!habits || habits.length === 0) {

      setRedirectPath("/create-habit");

      setLoading(false);

      return;
    }

    const habit = habits[0];

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const todayLog =
      habit.habit_logs?.find(
        (log: any) =>
          log.date === today
      );

    const alreadyCompleted =
      todayLog?.is_complete;

    // ✅ already complete
    if (alreadyCompleted) {

      setRedirectPath("/tracker");

      setLoading(false);

      return;
    }

    const now = new Date();

    const [h, m] =
      habit.scheduled_time
        .split(":")
        .map(Number);

    const scheduled = new Date();

    scheduled.setHours(h, m, 0, 0);

    const before = new Date(
      scheduled.getTime() -
        60 * 60 * 1000
    );

    const after = new Date(
      scheduled.getTime() +
        60 * 60 * 1000
    );

    const isValidTime =
      now >= before &&
      now <= after;

    // ⏰ VALID TIME
    if (isValidTime) {

      setRedirectPath(
        "/complete-habit"
      );

    } else {

      setRedirectPath("/tracker");

    }

    setLoading(false);
  };

  return (
    <Routes>

      {/* 🏠 Home */}
      <Route
        path="/"
        element={
          loading ? <AppLoader />  : redirectPath ? (
            <Navigate
              to={redirectPath}
              replace
            />
          ) : (
            <Home />
          )
        }
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