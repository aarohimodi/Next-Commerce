"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import { closeDrawer } from "@/store/uiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function RegisterPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeDrawer());
  }, []);

  return (
    <div className=" flex py-20 justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
}
