"use client";
import cartService from "@/services/cartService";
import { openCart } from "@/store/cartSlice";
import { showNotification } from "@/store/uiSlice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AddToCartButton({ productId }: { productId: string }) {
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    const response = await cartService.addToCart(productId, 1);
    if (response.success) {
      dispatch(showNotification(response.message));
      dispatch(openCart());
    } else if (response.message === "NOT AUTHENTICATED") {
      dispatch(showNotification("Please login to continue."));
      // alert("Please login to continue.");
    } else {
      dispatch(showNotification(response.message));
    }
  };
  return (
    <button
      onClick={() => handleAddToCart()}
      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-2 text-white"
    >
      <ShoppingCart size={18} /> Add to Cart
    </button>
  );
}
