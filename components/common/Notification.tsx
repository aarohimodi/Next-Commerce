"use client";

import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "@/store/uiSlice";
import { useEffect } from "react";

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => state.ui.notification);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="rounded-lg bg-black px-6 py-4 text-white shadow-lg">
        {notification}
      </div>
    </div>
  );
}
