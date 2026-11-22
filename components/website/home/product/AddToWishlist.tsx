"use client";
import wishlistServices from "@/services/wishlistServices";
import { showNotification } from "@/store/uiSlice";
import { openWishlist } from "@/store/wishlistSlice";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AddToWishlist({ productId }: { productId: string }) {
  const [isWislisted, setIsWislisted] = useState(false);
  useEffect(() => {
    async function checkWishlist() {
      const response = await wishlistServices.getWishlist();
      if (response.success) {
        const items = response.items;
        if (items) {
          const isProduct = items.some((i: any) => i.product._id === productId);
          console.log(isProduct);
          if (isProduct) {
            setIsWislisted(true);
          } else {
            setIsWislisted(false);
          }
        }
      }
    }
    checkWishlist();
  }, [productId]);
  const dispatch = useDispatch();
  const handleWishlistButton = async () => {
    let response;
    if (isWislisted) {
      response = await wishlistServices.deleteWishlist(productId);
    } else {
      response = await wishlistServices.addToWishlist(productId);
    }

    if (response.success) {
      setIsWislisted(!isWislisted);
      dispatch(showNotification(response.message));

      dispatch(openWishlist());
    } else if (response.message === "NOT AUTHENTICATED") {
      dispatch(showNotification("Please login to continue."));
    } else {
      dispatch(showNotification(response.message));
    }
  };
  return (
    <button onClick={handleWishlistButton}>
      <Heart
        size={18}
        fill={isWislisted ? "red" : "none"}
        color={isWislisted ? "red" : "currentColor"}
      />
    </button>
  );
}
