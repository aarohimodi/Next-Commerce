"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
interface ShopToolbarProps {
  currentPage: number;
  totalProducts: number;
  limit: number;
}
export default function ShopToolbar({
  currentPage,
  totalProducts,
  limit,
}: ShopToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    const url = `${pathname}?${params.toString()}`;

    console.log("URL:", url);

    router.push(url);
  };
  const start = totalProducts === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalProducts);
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border bg-white p-5 shadow-sm md:flex-row">
      <p className="text-sm text-gray-500">
        Showing {start} - {end} of {totalProducts} Products
      </p>

      <select
        value={searchParams.get("sort") || ""}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        <option value="">Default Sorting</option>

        <option value="newest">Newest</option>

        <option value="priceLowToHigh">Price: Low to High</option>

        <option value="priceHighToLow">Price: High to Low</option>

        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
