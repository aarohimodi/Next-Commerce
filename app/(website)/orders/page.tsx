"use client";

import EmptyOrder from "@/components/website/orders/EmptyOrder";
import OrderCard from "@/components/website/orders/OrderCard";
import OrderService from "@/services/orderService";
import { closeDrawer } from "@/store/uiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function OrderPage() {
  const [orders, setOrders] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getOrder();
      if (response.success) {
        setOrders(response.orders);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(closeDrawer());
    fetchOrders();
  }, []);
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <p>Loading...</p>
      </section>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {orders?.map((order: any) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </section>
  );
}
