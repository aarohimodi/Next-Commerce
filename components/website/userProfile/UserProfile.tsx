"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { closeDrawer, openProfile } from "@/store/uiSlice";
import { openCart } from "@/store/cartSlice";
import { openWishlist } from "@/store/wishlistSlice";
import Link from "next/link";
import { logoutSuccess } from "@/store/authSlice";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
export default function UserProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isUserOpen = useSelector((state: any) => state.ui.userDrawer);
  const user = useSelector((state: any) => state.auth.user);
  const handleLogout = async () => {
    const response = await AuthService.logout();

    if (response.success) {
      dispatch(logoutSuccess());
      dispatch(closeDrawer());
      router.push("/login");
    }
  };
  if (!isUserOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => dispatch(closeDrawer())}
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

          <button onClick={() => dispatch(closeDrawer())}>X</button>
        </div>
        <div className="p-5">
          {user ? (
            <>
              {/* <div className="mb-5">
        <p className="text-lg font-semibold">Welcome, {user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div> */}

              <div className="">
                <button
                  onClick={() => {
                    dispatch(closeDrawer());
                    dispatch(openProfile());
                  }}
                  className="flex w-full items-center justify-between cursor-pointer border-b px-2 py-4 text-left hover:bg-gray-50"
                >
                  <span>Profile</span>
                  <span>→</span>
                </button>

                <Link href="/orders">
                  {" "}
                  <button className="flex w-full items-center justify-between cursor-pointer border-b px-2 py-4 text-left hover:bg-gray-50">
                    <span>Orders</span>
                    <span>→</span>
                  </button>
                </Link>

                <button
                  onClick={() => {
                    dispatch(closeDrawer());
                    dispatch(openCart());
                  }}
                  className="flex w-full items-center justify-between cursor-pointer border-b px-2 py-4 text-left hover:bg-gray-50"
                >
                  <span>Cart</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => {
                    dispatch(closeDrawer());
                    dispatch(openWishlist());
                  }}
                  className="flex w-full items-center justify-between cursor-pointer border-b px-2 py-4 text-left hover:bg-gray-50"
                >
                  <span>Wishlist</span>
                  <span>→</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="mt-5 flex w-full items-center px-2 py-4 text-left cursor-pointer text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="flex w-full items-center justify-between px-2 cursor-pointer border-b py-4 text-left hover:bg-gray-50">
                  <span>Login</span>
                  <span>→</span>
                </button>
              </Link>
              <Link href="/register">
                <button className="flex w-full items-center justify-between px-2 cursor-pointer border-b py-4 text-left hover:bg-gray-50">
                  <span>Signup</span>
                  <span>→</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
