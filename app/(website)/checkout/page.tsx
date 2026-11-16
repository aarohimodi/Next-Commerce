"use client";
import OrderSummary from "@/components/website/checkout/OrderSummary";
import ShippingAddressForm from "@/components/website/checkout/ShippingAddressForm";
import { IProducts } from "@/types/product";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutFormData } from "@/types/checkout";
import OrderService from "@/services/orderService";
import {
  setSubTotal,
  setDeliveryCharges,
  setTotal,
  closeCart,
  setCartItems,
} from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { showNotification } from "@/store/uiSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const methods = useForm<CheckoutFormData>();
  const onSubmit = async (data: CheckoutFormData) => {
    const response = await OrderService.placeOrder({
      shippingAddress: data,
      paymentMethod: "COD",
    });
    if (response.success) {
      dispatch(setCartItems([]));
      dispatch(setSubTotal(0));
      dispatch(setDeliveryCharges(0));
      dispatch(setTotal(0));
      dispatch(showNotification(response.message));
      router.push("/");
    } else {
      dispatch(showNotification(response.message));
    }
  };
  useEffect(() => {
    dispatch(closeCart());
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ShippingAddressForm methods={methods} />
        </div>

        <OrderSummary methods={methods} onSubmit={onSubmit} />
      </div>
    </section>
  );
}
