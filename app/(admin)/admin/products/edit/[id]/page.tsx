"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/product/ProductForm";
import ProductService from "@/services/productService";
import { IProducts } from "@/types/product";

export default function EditProductPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProducts | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await ProductService.getProductById(id as string);
      if (response.success) {
        setProduct(response.product);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      {product && <ProductForm initialData={product} isEdit={true} />}
    </div>
  );
}
