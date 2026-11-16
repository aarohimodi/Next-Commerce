const CategoryService = {
  async getCategories() {
    const response = await fetch("/api/categories");
    return response.json();
  },
  async getCategoryById(id: string) {
    const response = await fetch(`/api/categories/${id}`);
    const data = await response.json();

    console.log("DATA =>", data);

    return data;
  },
  async createCategory(data: Record<string, unknown>) {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  async updateCategory(id: string, data: Record<string, unknown>) {
    const response = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async deleteCategory(id: string) {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

export default CategoryService;
