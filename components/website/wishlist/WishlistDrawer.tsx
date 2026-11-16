"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { closeWishlist, setWishlistItems } from "@/store/wishlistSlice";
import { useEffect } from "react";
import wishlistServices from "@/services/wishlistServices";
import cartService from "@/services/cartService";
import { openCart } from "@/store/cartSlice";
export default function WishlistDrawer() {
  const dispatch = useDispatch();

  const isWishlistOpen = useSelector(
    (state: any) => state.wishlist.isWishlistOpen,
  );
  const wishlistItems = useSelector(
    (state: any) => state.wishlist.wishlistItems,
  );
  console.log(isWishlistOpen);
  const handleDelete = async (productId: string) => {
    const response = await wishlistServices.deleteWishlist(productId);
    if (response.success) {
      fetchWishlist();
    } else {
      alert(response.message);
    }
  };
  const handleMoveToCart = async (productId: string) => {
    // add to cart

    const cartResponse = await cartService.addToCart(productId, 1);
    if (!cartResponse.success) {
      alert(cartResponse.message);
      return;
    }
    //remove from wishlist

    const wishlistResponse = await wishlistServices.deleteWishlist(productId);
    if (!wishlistResponse.success) {
      alert(wishlistResponse.message);
      return;
    }
    fetchWishlist();
    dispatch(openCart());
    alert("Product moved to cart successfully");
  };
  async function fetchWishlist() {
    if (!isWishlistOpen) {
      return null;
    }
    const response = await wishlistServices.getWishlist();
    if (response.success) {
      dispatch(setWishlistItems(response.items));
    }
  }
  useEffect(() => {
    fetchWishlist();
  }, [isWishlistOpen]);
  if (!isWishlistOpen) {
    return null;
  }
  return (
    <>
      <div
        onClick={() => dispatch(closeWishlist())}
        className="fixed inset-0 bg-black/50 z-40"
      />
      <div
        className="
      fixed
      top-0
      right-0
      h-screen
      w-[400px]
      bg-white
      z-50
      shadow-lg
      flex flex-col
      "
      >
        <div className="border-b flex items-center justify-between p-5">
          <h2>MY Wishlist</h2>

          <button onClick={() => dispatch(closeWishlist())}>X</button>
        </div>
        {wishlistItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold">Your Wishlist is Empty</h2>
            <p className="text-sm text-gray-500">
              Add products to continue shopping.
            </p>
            <button
              className="rounded-md bg-black px-5 py-3 text-white"
              onClick={() => dispatch(closeWishlist())}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-scroll">
              {wishlistItems.map((item: any) => (
                <div className="border-b p-5" key={item._id}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between ">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <Image
                          src={item.product.images[0].url}
                          // alt={item.product.name}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.product.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          ₹{item.product.price}
                        </p>
                        <button
                          onClick={() => handleDelete(item.product._id)}
                          className="text-sm text-red-500 mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleMoveToCart(item.product._id)}
                          className="text-sm text-red-500"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
