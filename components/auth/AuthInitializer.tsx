"use client";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import AuthService from "@/services/authService";
import { useEffect, useState } from "react";
import { logoutSuccess } from "@/store/authSlice";
export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await AuthService.getProfile();
        if (response.success) {
          dispatch(loginSuccess(response.user));
        }
      } catch (error) {
        dispatch(logoutSuccess());
      } finally {
        setIsLoading(false);
      }
    };
    restoreUser();
  }, []);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
}
