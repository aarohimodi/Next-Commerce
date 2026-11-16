"use client";

import ProductForm from "@/components/admin/product/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Category</h2>
      <ProductForm />
    </div>
  );
}
