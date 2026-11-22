import getAllCategories from "@/lib/queries/category";
import DesktopNavigation from "./DesktopNavigation";
import Menudrawer from "../../menuDrawer/MenuDrawer";
async function Navigation() {
  const categories = await getAllCategories();
  return (
    <>
      <Menudrawer categories={categories} />
      <nav className="hidden border-t lg:block">
        <div className="mx-auto max-w-7xl px-4">
          <DesktopNavigation categories={categories} />
        </div>
      </nav>
    </>
  );
}

export default Navigation;
