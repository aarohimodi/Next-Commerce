const cartService = {
  async getCart() {
    const response = await fetch("/api/cart");
    return response.json();
  },
  async addToCart(productId: string, quantity: number) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },
  async updateCart(productId: string, quantity: number) {
    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    return response.json();
  },
  async deleteCartItem(productId: string) {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    return response.json();
  },
  async clearCart() {
    const response = await fetch("/api/cart/clear", {
      method: "DELETE",
    });
    return response.json();
  },
};
export default cartService;
