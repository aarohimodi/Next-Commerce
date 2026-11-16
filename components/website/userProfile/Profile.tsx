"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { closeProfile } from "@/store/uiSlice";

import Link from "next/link";

export default function Profile() {
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state: any) => state.ui.profile);
  const user = useSelector((state: any) => state.auth.user);
  if (!isProfileOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => dispatch(closeProfile())}
        className="fixed inset-0 bg-black/50 z-40"
      />
      <div
        className="
      fixed
      top-0
      right-0
      h-screen
      w-[400px]
      bg-white
      z-50
      shadow-lg
      flex flex-col
      "
      >
        <div className="border-b flex  items-center justify-between p-5">
          <h2>{user ? `Welcome ${user.name}` : "Guest"}</h2>

          <button onClick={() => dispatch(closeProfile())}>X</button>
        </div>
        <div className="p-5">
          <div className="p-5">
            <h1 className="text-xl font-semibold">{user?.name}</h1>
            <h2 className="mt-1 text-xl text-gray-500">{user?.email}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
