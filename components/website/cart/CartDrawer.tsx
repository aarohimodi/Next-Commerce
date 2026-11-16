"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  closeCart,
  setCartItems,
  setSubTotal,
  setDeliveryCharges,
  setTotal,
} from "@/store/cartSlice";
import { useEffect } from "react";
import cartService from "@/services/cartService";
import Link from "next/link";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state: any) => state.cart.isCartOpen);
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const subtotal = useSelector((state: any) => state.cart.subTotal);

  const total = useSelector((state: any) => state.cart.total);

  const deliveryCharges = useSelector(
    (state: any) => state.cart.deliveryCharges,
  );
  async function fetchCart() {
    if (!isCartOpen) {
      return null;
    }

    const response = await cartService.getCart();
    if (response.success) {
      dispatch(setCartItems(response.items));
      dispatch(setDeliveryCharges(response.deliveryCharges));
      dispatch(setTotal(response.total));
      dispatch(setSubTotal(response.subtotal));
      // console.log("BACKEND SUBTOTALLL", response);
      // console.log(response.items[0].product);
    }
  }
  useEffect(() => {
    fetchCart();
  }, [isCartOpen]);

  const incQuantity = async (productId: string, quantity: number) => {
    const response = await cartService.updateCart(productId, quantity + 1);
    if (response.success) {
      await fetchCart();
    }
  };
  const decQuantity = async (productId: string, quantity: number) => {
    const response = await cartService.updateCart(productId, quantity - 1);
    if (response.success) {
      await fetchCart();
    }
  };
  const handleClearCart = async () => {
    const response = await cartService.clearCart();
    if (response.success) {
      await fetchCart();
    }
  };
  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => dispatch(closeCart())}
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
          <h2>MY CART</h2>

          <button onClick={() => dispatch(closeCart())}>X</button>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
            <p className="text-sm text-gray-500">
              Add products to continue shopping.
            </p>
            <button
              className="rounded-md bg-black px-5 py-3 text-white"
              onClick={() => dispatch(closeCart())}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-scroll">
              {cartItems.map((item: any) => (
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
                        <button className="text-sm text-red-500">Delete</button>
                      </div>
                      {/* quantity buttons */}
                      <div className="flex items-center rounded-md border">
                        <button
                          className="px-3 py-1"
                          onClick={() =>
                            decQuantity(item.product._id, item.quantity)
                          }
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-3"
                          onClick={() =>
                            incQuantity(item.product._id, item.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 border-t p-5 space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{subtotal}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charges</p>

                <p>{deliveryCharges === 0 ? "FREE" : `${deliveryCharges}`}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>

                <p>₹{total}</p>
              </div>

              <button
                className="w-full border rounded-md p-3"
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </button>
              <Link href="/checkout">
                <button className="w-full  bg-black text-white rounded-md p-3 ">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
