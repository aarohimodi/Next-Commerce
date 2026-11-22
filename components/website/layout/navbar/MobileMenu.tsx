"use client";
import { Menu } from "lucide-react";
import { MenuDrawerstate } from "@/store/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function MobileMenu() {
  const dispatch = useDispatch();
  const menuStatus = useSelector((state: any) => state.ui.menuDrawer);
  return (
    <button className="lg:hidden" onClick={() => dispatch(MenuDrawerstate())}>
      {menuStatus ? "close" : <Menu size={28} />}
    </button>
  );
}

export default MobileMenu;
