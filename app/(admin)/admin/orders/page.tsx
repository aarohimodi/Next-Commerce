import OrdersTable from "@/components/admin/orders/OrdersTable";

export default function OrderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <OrdersTable />
    </div>
  );
}
