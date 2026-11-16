import { IProducts } from "@/types/product";
type GetProductsParams = {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
};
const ProductService = {
  async getProducts({
    search = "",
    category = "",
    sort = "",
    page = 1,
    limit = 8,
  }: GetProductsParams) {
    const params = new URLSearchParams();
    if (search) {
      params.set("search", search);
    }
    if (category) {
      params.set("category", category);
    }
    if (sort) {
      params.set("sort", sort);
    }
    params.set("page", String(page));
    params.set("limit", String(limit));
    const response = await fetch(`/api/products?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },
  async getProductById(id: string) {
    const response = await fetch(`/api/products/${id}`);
    return response.json();
  },
  async createProduct(data: IProducts) {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  async updateProduct(id: string, data: IProducts) {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  async deleteProduct(id: string) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

export default ProductService;
