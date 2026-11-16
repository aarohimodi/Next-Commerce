"use client";

import AuthService from "@/services/authService";
import { logoutSuccess } from "@/store/authSlice";
import { Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useDispatch } from "react-redux";

interface AdminHeaderProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
}
export default function AdminHeader({
  setIsSidebarOpen,
  isSidebarOpen,
}: AdminHeaderProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    const response = await AuthService.logout();
    if (response.success) {
      dispatch(logoutSuccess());
      router.push("/login");
    }
  };

  return (
    <header className="h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 border-b shadow-sm flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">CoreShop Admin</h1>
      </div>

      {/* Right Side */}
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="w-10 h-10 rounded-full bg-slate-100 flex flex items-center justify-center hover:bg-slate-200 transition"
      >
        <User className="text-blue-950" />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 top-5 mt-3 w-64 bg-white rounded-xl shadow-lg border p-4 z-50">
          <div className="font-semibold text-slate-800">
            <h3 className="font-semibold text-slate-800">Aarohi Modi</h3>
            <p className="text-sm text-slate-500">aarohi@gmail.com</p>
          </div>
          <hr className="my-3" />
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-500 hover:bg-red-50 p-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
