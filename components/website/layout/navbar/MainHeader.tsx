"use client";
import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import Logo from "../Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartDrawer from "../../cart/CartDrawer";
import WishlistDrawer from "../../wishlist/WishlistDrawer";
import { usePathname } from "next/navigation";
import UserProfile from "../../userProfile/UserProfile";
import Profile from "../../userProfile/Profile";
function MainHeader() {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const showSearch =
    pathname === "/" ||
    pathname === "/shop" ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/brands");
  return (
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
      <MobileMenu />
      <Logo />
      {showSearch && <SearchBar />}
      <UserMenu />
      <CartDrawer />
      <WishlistDrawer />

      <UserProfile />
      <Profile />
    </div>
  );
}

export default MainHeader;
