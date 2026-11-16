"use client";

type OrderCardProps = {
  order: any;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border">
      {/* Header */}

      <div className="flex justify-between items-center border-b pb-4 mb-5">
        <div>
          <p className="text-sm text-gray-500">
            Order #{order._id.slice(-6).toUpperCase()}
          </p>

          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
          {order.orderStatus}
        </span>
      </div>

      {/* Products */}

      <div className="space-y-5">
        {order.items.map((item: any) => (
          <div key={item._id} className="flex justify-between items-center">
            <div className="flex gap-4">
              <img
                src={item.product.images[0].url}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-lg border"
              />

              <div>
                <h3 className="font-semibold">{item.product.title}</h3>

                <p className="text-gray-500 text-sm">Qty : {item.quantity}</p>

                <p className="font-medium mt-1">₹{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="border-t mt-6 pt-5 flex justify-between items-center">
        <div>
          <p className="font-medium">{order.shippingAddress.fullName}</p>

          <p className="text-gray-500 text-sm">
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>

          <p className="text-sm mt-1">Payment : {order.paymentMethod}</p>
        </div>

        <div className="text-right">
          <p className="text-gray-500 text-sm">Total</p>

          <p className="text-2xl font-bold">₹{order.total}</p>
        </div>
      </div>
    </div>
  );
}
