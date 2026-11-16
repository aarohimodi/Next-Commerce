"use client";
import { useDispatch } from "react-redux";
import { openCart } from "@/store/cartSlice";
import { Heart, ShoppingCart, User } from "lucide-react";
import { openWishlist } from "@/store/wishlistSlice";
import { openDrawer } from "@/store/uiSlice";

function UserMenu() {
  const dispatch = useDispatch();
  return (
    <div className="hidden lg:flex items-center gap-5">
      <button className="hover:text-primary transition-colors">
        <Heart
          size={22}
          onClick={() => {
            dispatch(openWishlist());
          }}
        />
      </button>
      <button className="hover:text-primary transition-colors">
        <ShoppingCart
          size={22}
          onClick={() => {
            console.log("CLICKED");
            dispatch(openCart());
          }}
        />
      </button>
      <button className="hover:text-primary transition-colors">
        <User size={22} onClick={() => dispatch(openDrawer())} />
      </button>
    </div>
  );
}

export default UserMenu;
