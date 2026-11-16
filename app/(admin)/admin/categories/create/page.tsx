"use client";

import { useForm } from "react-hook-form";

import CategoryService from "@/services/categoryService";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

interface CategoryFormData {
  name: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
}
export default function CreateCategoryPage() {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>();
  const onSubmit = async (data: CategoryFormData) => {
    try {
      const response = await CategoryService.createCategory({
        name: data.name,
        description: data.description,
        image: data.image,
      });

      if (response.success) {
        router.push("/admin/categories");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Category</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Category Name is Required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Category Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <label>Category Image</label>
          <input
            type="hidden"
            {...register("image.url", {
              required: "Image is required",
            })}
          />

          <input
            type="hidden"
            {...register("image.public_id", {
              required: "Image is required",
            })}
          />
          <ImageUpload
            onUpload={(url, publicId) => {
              console.log(url);
              console.log(publicId, "sdfdsf");
              setValue("image.url", url);
              setValue("image.public_id", publicId);
            }}
          />
          {errors.image?.url && <p>{errors.image.url.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
