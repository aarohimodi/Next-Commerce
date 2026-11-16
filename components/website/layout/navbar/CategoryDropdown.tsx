import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { CategoryResponse } from "@/types/category";

interface CategoryDropdownProps {
  categories: CategoryResponse[];
}

export default function CategoryDropdown({
  categories,
}: CategoryDropdownProps) {
  return (
    <div className="group relative">
      <a href="/shop" className="cursor-pointer">
        {" "}
        <button className="flex items-center gap-1 font-medium cursor-pointer">
          Shop{" "}
          <ChevronDown
            size={18}
            className="transition-transform duration-200 group-hover:rotate-180"
          />
        </button>
      </a>
      <div className="absolute left-0 top-full  hidden min-w-56 rounded-lg border bg-white shadow-lg group-hover:block">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
