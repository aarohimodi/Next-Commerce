const OrderService = {
  async placeOrder(data: {
    shippingAddress: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: "COD" | "ONLINE";
  }) {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  async getOrder() {
    const response = await fetch("/api/orders");
    return response.json();
  },
  async getAllOrders() {
    const response = await fetch("/api/orders/admin");
    return response.json();
  },
  async updateOrderStatus(id: string, orderStatus: string) {
    try {
      const response = await fetch(`/api/orders/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus }),
      });
      return await response.json();
    } catch (error) {
      console.error("UPDATE ORDER STATUS ERROR =>", error);

      return {
        success: false,
        message: "Something went wrong",
      };
    }
  },
};
export default OrderService;
