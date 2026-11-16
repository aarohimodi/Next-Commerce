"use client";
interface CategoryTableType {
  name: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  id: string;
}

import Link from "next/link";
import { useRouter } from "next/navigation";
import CategoryService from "@/services/categoryService";
function CategoryTable({
  name,
  description,
  image,
  createdBy,
  id,
}: CategoryTableType) {
  const router = useRouter();
  const deleteButton = async () => {
    const confirmed = confirm("Are you sure you want to delete this category?");

    if (!confirmed) return;
    const response = await CategoryService.deleteCategory(id);
    if (response.success) {
      router.refresh();
    }
  };
  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">{name}</td>
      <td className="border border-gray-300 px-4 py-2">{description}</td>
      <td className="border border-gray-300 px-4 py-2">
        <img src={image.url} className="w-20" />
      </td>
      <td className="border border-gray-300 px-4 py-2">{createdBy.name}</td>
      <td className="border border-gray-300 px-4 py-2">
        <Link href={`/admin/categories/edit/${id}`}>Edit</Link> <span> | </span>
        <button onClick={() => deleteButton()}>Delete</button>
      </td>
    </tr>
  );
}

export default CategoryTable;
