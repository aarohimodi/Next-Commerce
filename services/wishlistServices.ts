const wishlistServices = {
  async getWishlist() {
    const response = await fetch("/api/wishlist");
    return response.json();
  },
  async addToWishlist(productId: string) {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },
  async deleteWishlist(productId: string) {
    const response = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },
};

export default wishlistServices;
