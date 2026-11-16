import { CategoryResponse } from "@/types/category";
import Link from "next/link";
import { NavigationCategory } from "@/types/category";
import CategoryDropdown from "./CategoryDropdown";
interface DesktopNavigationProps {
  categories: NavigationCategory[];
}

function DesktopNavigation({ categories }: DesktopNavigationProps) {
  return (
    <div className="flex items-center gap-8 h-14">
      <Link
        href="/"
        className="font-medium hover:text-blue-600 transition-colors"
      >
        Home
      </Link>
      <Link
        href="/about"
        className="font-medium hover:text-blue-600 transition-colors"
      >
        About
      </Link>
      <CategoryDropdown categories={categories} />
      <Link
        href="/contact"
        className="font-medium hover:text-blue-600 transition-colors"
      >
        Contact
      </Link>
    </div>
  );
}

export default DesktopNavigation;
