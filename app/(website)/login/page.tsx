"use client";

import LoginForm from "@/components/auth/LoginForm";
import { closeDrawer } from "@/store/uiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function LoginPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeDrawer());
  }, []);

  return (
    <div className=" py-25 flex flex-col items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
