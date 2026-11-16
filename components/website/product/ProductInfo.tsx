"use client";
import QuantitySelector from "@/components/common/QuantitySelector";
import cartService from "@/services/cartService";
import wishlistServices from "@/services/wishlistServices";
import { openCart } from "@/store/cartSlice";
import { showNotification } from "@/store/uiSlice";
import { openWishlist } from "@/store/wishlistSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ProductInforProps {
  product: any;
}

export default function ProductInfo({ product }: ProductInforProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleWishlistButton = async () => {
    const response = await wishlistServices.addToWishlist(product._id);
    if (response.success) {
      // alert(response.message);
      dispatch(showNotification(response.message));
      dispatch(openWishlist());
    } else if (response.message === "NOT AUTHENTICATED") {
      // alert("Please login to continue.");
      dispatch(showNotification("Please login to continue."));
    } else {
      // alert(response.message);
      dispatch(showNotification(response.message));
    }
  };
  const handleAddToCart = async () => {
    const response = await cartService.addToCart(product._id, quantity);
    if (response.success) {
      // alert(response.message);
      dispatch(showNotification(response.message));
      dispatch(openCart());
    } else if (response.message === "NOT AUTHENTICATED") {
      // alert("Please login to continue.");
      dispatch(showNotification(response.message));
    } else {
      // alert(response.message);
      dispatch(showNotification(response.message));
    }
  };
  return (
    <div className="space-y-6">
      <p className="text-sm uppercase tracking-wider text-gray-500">
        {product.category.name}
      </p>
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <div className="flex items-center gap-4">
        <span>₹ {product.price}</span>
        <span className="text-xl text-gray-400 line-through">
          ₹ {product.oldPrice}
        </span>
      </div>
      <p className="text-green-600 font-medium">
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>
      <p className="leading-7 text-gray-600">{product.description}</p>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <div className="flex gap-4">
        <button
          onClick={() => handleAddToCart()}
          className="rounded-lg bg-black px-8 py-3 text-white hover:bg-gray-800"
        >
          Add to Cart
        </button>
        <button
          onClick={() => handleWishlistButton()}
          className="rounded-lg border px-8 py-3 hover:bg-gray-100"
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}
