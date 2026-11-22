"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { NavigationCategory } from "@/types/category";

interface CategoryDropdownProps {
  categories: NavigationCategory[];
}

export default function CategoryDropdown({
  categories,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative">
      <div className="flex items-center gap-1">
        <Link href="/shop" className="font-medium">
          Shop
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle categories"
        >
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`min-w-56 rounded-lg border bg-white shadow-lg
          lg:absolute lg:left-0 lg:top-full lg:hidden lg:group-hover:block
          ${isOpen ? "block" : "hidden"}`}
      >
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
