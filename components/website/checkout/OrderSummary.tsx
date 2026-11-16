"use client";
import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cartService from "@/services/cartService";
import { useEffect } from "react";
import {
  setCartItems,
  setSubTotal,
  setDeliveryCharges,
  setTotal,
} from "@/store/cartSlice";

type CheckoutFormData = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};
type OrderSummaryProps = {
  methods: UseFormReturn<CheckoutFormData>;
  onSubmit: SubmitHandler<CheckoutFormData>;
};

export default function OrderSummary({ methods, onSubmit }: OrderSummaryProps) {
  const { cartItems, subtotal, deliveryCharges, total } = useSelector(
    (state: any) => state.cart,
  );
  const dispatch = useDispatch();

  const fetchCart = async () => {
    const response = await cartService.getCart();

    if (response.success) {
      dispatch(setCartItems(response.items));
      dispatch(setSubTotal(response.subTotal));
      dispatch(setDeliveryCharges(response.deliveryCharges));
      dispatch(setTotal(response.total));
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const { handleSubmit } = methods;
  return (
    <div className="bg-white rounded-xl shadow p-6 sticky top-24">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

      {/* Products */}

      <div className="space-y-4">
        {cartItems.map((item: any) => (
          <div key={item.product._id} className="flex justify-between">
            <div>
              <h3 className="font-medium"> {item.product.title}</h3>
              <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
            </div>

            <p className="font-medium">₹{item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* Price */}

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{deliveryCharges}</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <hr className="my-6" />

      {/* Payment */}

      <div>
        <h3 className="font-semibold mb-3">Payment Method</h3>

        <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
          <input type="radio" value="COD" defaultChecked />
          <span>Cash On Delivery</span>
        </label>
      </div>

      <button
        className=" bg-black text-white rounded-lg w-full mt-8 h-12"
        onClick={handleSubmit(onSubmit)}
      >
        Place Order
      </button>
    </div>
  );
}
