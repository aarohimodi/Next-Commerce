"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CategoryResponse {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
interface CategoriesProps {
  categories: CategoryResponse[];
}
export default function ShopSidebar({ categories }: CategoriesProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleCategoryChange = (e: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e) {
      params.set("category", e);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };
  const handleAvailabilityChange = (key: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set(key, "true");
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  //price range url set

  const handlePriceChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Filters</h2>

      <div className="space-y-8">
        {/* Category */}

        <div>
          <h3 className="mb-3 font-medium">Categories</h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value=""
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              All
            </label>
            {categories.map((item) => (
              <label className="flex items-center gap-2" key={item.name}>
                <input
                  type="radio"
                  name="category"
                  value={item.name}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        {/* Price */}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Price Range</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs text-gray-500">
                Min Price
              </label>

              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3 focus-within:border-blue-500">
                <span className="text-sm text-gray-400">₹</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="500"
                  className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-gray-500">
                Max Price
              </label>

              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3 focus-within:border-blue-500">
                <span className="text-sm text-gray-400">₹</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="2000"
                  className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlePriceChange}
            type="button"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Apply Price
          </button>
        </div>

        {/* Availability */}

        <div>
          <h3 className="mb-3 font-medium">Availability</h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.get("inStock") === "true"}
                onChange={(e) =>
                  handleAvailabilityChange("inStock", e.target.checked)
                }
              />
              In Stock
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.get("onSale") === "true"}
                onChange={(e) =>
                  handleAvailabilityChange("onSale", e.target.checked)
                }
              />
              On Sale
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchParams.get("newArrival") === "true"}
                onChange={(e) =>
                  handleAvailabilityChange("newArrival", e.target.checked)
                }
              />
              New Arrival
            </label>
          </div>
        </div>

        <button className="w-full rounded-lg bg-black py-2 text-white">
          Clear Filters
        </button>
      </div>
    </div>
  );
}
