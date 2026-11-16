import getAllCategories from "@/lib/queries/category";
import DesktopNavigation from "./DesktopNavigation";

async function Navigation() {
  const categories = await getAllCategories();
  return (
    <nav className="hidden border-t lg:block">
      <div className="mx-auto max-w-7xl px-4">
        <DesktopNavigation categories={categories} />
      </div>
    </nav>
  );
}

export default Navigation;
