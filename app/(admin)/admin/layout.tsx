"use client";

import AdminFooter from "@/components/admin/layout/AdminFooter";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { useState } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <>
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex">
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <AdminFooter />
    </>
  );
}
