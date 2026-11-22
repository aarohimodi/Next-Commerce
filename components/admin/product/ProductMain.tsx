"use client";
import { Package, Folder, ShoppingCart, Users } from "lucide-react";
import StatCard from "@/components/admin/dashboard/StatCard";
import { useSelector } from "react-redux";
import ProductCount from "@/components/admin/product/ProductMain";
interface count {
  pcount: number;
  ccount: number;
  ocount: number;
  ucount: number;
}
export default function ProductMain({ pcount, ccount, ocount, ucount }: count) {
  const auth = useSelector((state: any) => state.auth);

  return (
    <>
      <div className="flex gap-10 grid grid-cols-4">
        <StatCard
          title="Products"
          value={pcount}
          icon={<Package size={40} />}
        />
        <StatCard
          title="Categories"
          value={ccount}
          icon={<Folder size={40} />}
        />

        <StatCard
          title="Orders"
          value={ocount}
          icon={<ShoppingCart size={40} />}
        />

        <StatCard title="Users" value={ucount} icon={<Users size={40} />} />
      </div>
    </>
  );
}
