import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

/* =========================
   Toast Functions
========================= */

export const showToast = {
  success: (msg: string) =>
    toast.success(msg, {
      style: {
        background: "#0F3A2A",
        color: "#D4F1E6",
        border: "1px solid rgba(82, 202, 125, 0.3)",
      },
    }),

  error: (msg: string) =>
    toast.error(msg, {
      style: {
        background: "#3A1F1F",
        color: "#FFD4D4",
        border: "1px solid rgba(239, 68, 68, 0.3)",
      },
    }),

  info: (msg: string) =>
    toast(msg, {
      style: {
        background: "#1F3548",
        color: "#B8E1FC",
      },
    }),

  loading: (msg: string) =>
    toast.loading(msg),

  dismiss: (id?: string) => toast.dismiss(id),
};

/* =========================
   Toaster Component
========================= */

export const AppToaster = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#121C20",
          color: "#E8F0F2",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
        },
      }}
    />
  );
};

/* =========================
   Notification Hook
========================= */

type Notification = {
  id: string;
  message: string;
  read: boolean;
};

export const useNotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const id = Math.random().toString(36);

    setNotifications((prev) => [
      { id, message, read: false },
      ...prev,
    ]);

    showToast.success(message);
  };

  return { notifications, addNotification };
};