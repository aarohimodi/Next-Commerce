import { CategoryResponse } from "@/types/category";
import Link from "next/link";
import React from "react";
import Image from "next/image";
interface CategoryCardProps {
  category: CategoryResponse;
}
function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative h-60">
        <Image
          src={category.image.url}
          alt={category.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{category.name}</h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
