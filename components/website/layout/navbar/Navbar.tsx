import Navigation from "@/components/website/layout/navbar/Navigation";
import MainHeader from "./MainHeader";
import TopBar from "./TopBar";

function Navbar() {
  return (
    <header className="sticky top-0  z-50 bg-white shadow-sm">
      <TopBar />
      <MainHeader />
      <Navigation />
    </header>
  );
}

export default Navbar;
