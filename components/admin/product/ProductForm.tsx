"use client";
interface ProductFormProps {
  initialData?: IProducts;
  isEdit?: boolean;
}
interface Category {
  _id: string;
  name: string;
}
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ProductService from "@/services/productService";
import CategoryService from "@/services/categoryService";
import MultipleImageUpload from "@/components/MultipleImageUpload";

import { IProducts } from "@/types/product";
export default function ProductForm({
  initialData,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IProducts>();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        if (response.success) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!initialData) return;

    reset({
      title: initialData.title,
      description: initialData.description,
      price: initialData.price,
      oldPrice: initialData.oldPrice,
      stock: initialData.stock,
      images: initialData.images,
      onSale: initialData.onSale,
      newArrival: initialData.newArrival,
      category:
        typeof initialData.category === "string"
          ? initialData.category
          : initialData.category._id,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: IProducts) => {
    try {
      let response;
      if (isEdit && initialData?._id) {
        response = await ProductService.updateProduct(initialData._id, data);
      } else {
        response = await ProductService.createProduct(data);
      }

      if (response.success) {
        router.push("/admin/products");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Product Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Product title is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Description</label>

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border p-2 rounded"
          />

          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <label>Price</label>

          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="w-full border p-2 rounded"
          />

          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label>Old Price</label>

          <input
            type="number"
            {...register("oldPrice", {
              valueAsNumber: true,
            })}
            className="w-full border p-2 rounded"
          />
        </div>
        <input
          type="hidden"
          {...register("images", {
            required: "Product images are required",
          })}
        />
        <MultipleImageUpload
          initialImages={initialData?.images}
          onUpload={(images) => {
            setValue("images", images, { shouldValidate: true });
          }}
        />
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}
        <div>
          <label>Stock</label>

          <input
            type="number"
            {...register("stock", {
              required: "Stock is required",
              valueAsNumber: true,
            })}
            className="w-full border p-2 rounded"
          />

          {errors.stock && <p>{errors.stock.message}</p>}
        </div>
        <div>
          <label>Category</label>
          <select
            {...register("category", {
              required: "Category is required",
            })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <label>On Sale</label>
          <input type="checkbox" {...register("onSale")} />
        </div>
        <div className="flex items-center gap-2">
          <label>New Arrival</label>
          <input type="checkbox" {...register("newArrival")} />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </>
  );
}
