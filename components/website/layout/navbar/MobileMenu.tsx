"use client";
import { Menu } from "lucide-react";

function MobileMenu() {
  return (
    <button className="lg:hidden">
      <Menu size={28} />
    </button>
  );
}

export default MobileMenu;
