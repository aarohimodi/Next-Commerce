"use client";
import { Package, Folder, ShoppingCart, Users } from "lucide-react";
import StatCard from "@/components/admin/dashboard/StatCard";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const auth = useSelector((state: any) => state.auth);
  return (
    <>
      <div className="flex gap-10 grid grid-cols-4">
        <StatCard title="Products" value={120} icon={<Package size={40} />} />
        <StatCard title="Categories" value={15} icon={<Folder size={40} />} />

        <StatCard
          title="Orders"
          value={340}
          icon={<ShoppingCart size={40} />}
        />

        <StatCard title="Users" value={90} icon={<Users size={40} />} />
      </div>
    </>
  );
}
