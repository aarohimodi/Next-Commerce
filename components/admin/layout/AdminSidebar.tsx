"use client";
interface AdminSidebarProps {
  isSidebarOpen: boolean;
}
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";
const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  // {
  //   name: "Users",
  //   href: "/admin/users",
  //   icon: Users,
  // },
  // {
  //   name: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  // },
];
export default function AdminSidebar({ isSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } min-h-[calc(100vh-60px)] bg-gradient-to-b
from-[#081028]
via-[#0F172A]
to-[#172554] text-white`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center ${
                    isSidebarOpen ? "gap-3 px-4" : "justify-center"
                  } py-3 rounded-lg  transition
                    ${
                      pathname === item.href
                        ? isSidebarOpen
                          ? "bg-white/10 border-l-4 border-cyan-400"
                          : "bg-white/10"
                        : "hover:bg-white/10"
                    }
                    
                    `}
                >
                  <Icon size={20} />
                  <span>{isSidebarOpen && <span> {item.name}</span>}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
