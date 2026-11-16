"use client";

import OrderService from "@/services/orderService";
import { useEffect, useState } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleStatusChange = async (orderId: string, orderStatus: string) => {
    const response = await OrderService.updateOrderStatus(orderId, orderStatus);
    if (response.success) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus } : order,
        ),
      );
    } else {
      alert(response.message);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAllOrders();
      if (response.success) {
        setOrders(response.orders);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Order ID</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Products</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Payment</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id} className="border-t">
              <td className="px-4 py-3">
                #{order._id.slice(-6).toUpperCase()}
              </td>

              <td className="px-4 py-3">
                <p>{order.user.name}</p>
                <p className="text-sm text-gray-500">{order.user.email}</p>
              </td>

              <td className="px-4 py-3">{order.items.length} Item(s)</td>

              <td className="px-4 py-3">₹{order.total}</td>

              <td className="px-4 py-3">{order.paymentMethod}</td>

              <td className="px-4 py-3">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>

              <td className="px-4 py-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
