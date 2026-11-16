"use client";
interface CategoryFormData {
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  description: string;
}
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryService from "@/services/categoryService";
import { useForm } from "react-hook-form";
import ImageUpload from "@/components/ImageUpload";

export default function EditCategoryPage() {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>();
  const params = useParams<{ id: string }>();
  const [imagePreview, setImagePreview] = useState("");
  const id = params.id;
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await CategoryService.getCategoryById(id);
      console.log("RESPONSE => ", response);
      console.log(response.message);

      if (response.success) {
        reset({
          name: response.category.name,
          description: response.category.description,
          image: {
            url: response.category.image.url,
            public_id: response.category.image.public_id,
          },
        });
        setImagePreview(response.category.image.url);
      }
    };
    fetchCategory();
  }, [id]);
  const onSubmit = async (data: any) => {
    try {
      const response = await CategoryService.updateCategory(id, data);
      if (response.success) {
        router.push("/admin/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Update Category</h2>
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
          <input
            type="hidden"
            {...register("image.url", {
              required: "Image is required",
            })}
            className="w-full border p-2 rounded"
          />
          <input
            type="hidden"
            {...register("image.public_id", {
              required: "Image is required",
            })}
            className="w-full border p-2 rounded"
          />
          <ImageUpload
            initialImage={imagePreview}
            onUpload={(url, publicId) => {
              console.log(url);
              console.log(publicId);
              setValue("image", { url, public_id: publicId });
            }}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
