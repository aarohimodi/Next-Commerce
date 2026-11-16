import { searchItem } from "@/store/uiSlice";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";

function SearchBar() {
  const handleScroll = () => {
    const section = document.getElementById("productSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="hidden lg:flex items-center w-full max-w-md">
      <div className="relative w-full">
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          onFocus={handleScroll}
          placeholder="Search Products"
          onChange={(e) => dispatch(searchItem(e.target.value))}
          className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}

export default SearchBar;
