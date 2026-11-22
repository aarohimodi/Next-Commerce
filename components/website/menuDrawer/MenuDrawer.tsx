"use client";

import { useDispatch, useSelector } from "react-redux";
import { MenuDrawerstate } from "@/store/uiSlice";
import { X } from "lucide-react";
import Link from "next/link";
import { NavigationCategory } from "@/types/category";
import CategoryDropdown from "../layout/navbar/CategoryDropdown";

interface Props {
  categories: NavigationCategory[];
}

function MenuDrawer({ categories }: Props) {
  const dispatch = useDispatch();
  const menuStatus = useSelector((state: any) => state.ui.menuDrawer);

  const closeDrawer = () => dispatch(MenuDrawerstate());

  if (!menuStatus) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white lg:hidden">
      <div className="flex justify-between items-center p-6 border-b">
        <Link href="/" onClick={closeDrawer} className="text-2xl font-bold">
          Logo
        </Link>

        <button onClick={closeDrawer}>
          <X size={28} />
        </button>
      </div>

      <nav className="flex flex-col gap-7 p-6 text-lg">
        <Link href="/" onClick={closeDrawer}>
          Home
        </Link>
        <Link href="/about" onClick={closeDrawer}>
          About
        </Link>

        <CategoryDropdown categories={categories} />

        <Link href="/contact" onClick={closeDrawer}>
          Contact
        </Link>
      </nav>
    </div>
  );
}

export default MenuDrawer;
