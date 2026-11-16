"use client";
import wishlistServices from "@/services/wishlistServices";
import { showNotification } from "@/store/uiSlice";
import { openWishlist } from "@/store/wishlistSlice";
import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AddToWishlist({ productId }: { productId: string }) {
  const dispatch = useDispatch();
  const handleWishlistButton = async () => {
    const response = await wishlistServices.addToWishlist(productId);
    if (response.success) {
      dispatch(showNotification(response.message));

      dispatch(openWishlist());
    } else if (response.message === "NOT AUTHENTICATED") {
      dispatch(showNotification("Please login to continue."));
    } else {
      dispatch(showNotification(response.message));
    }
  };
  return (
    <button
      onClick={() => handleWishlistButton()}
      className="rounded-lg border p-2"
    >
      <Heart size={18} />
    </button>
  );
}
