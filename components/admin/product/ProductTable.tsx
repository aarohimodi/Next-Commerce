"use client";
interface ProductTableProps {
  id: string;
  title: string;
  price: number;
  stock: number;
  images: {
    url: string;
    public_id: string;
  }[];
  category: {
    _id: string;
    name: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductService from "@/services/productService";

export default function ProductTable({
  id,
  title,
  price,
  stock,
  images,
  category,
  createdBy,
}: ProductTableProps) {
  const router = useRouter();

  const deleteButton = async () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const response = await ProductService.deleteProduct(id);
    if (response.success) {
      router.refresh();
    } else {
      alert(response.message);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">{title}</td>
      <td>
        <img src={images[0]?.url} className="w-20 h-20 object-cover rounded" />
      </td>
      <td className="border border-gray-300 px-4 py-2">₹{price}</td>
      <td className="border border-gray-300 px-4 py-2">{stock}</td>
      <td className="border border-gray-300 px-4 py-2">{category.name}</td>
      <td className="border border-gray-300 px-4 py-2">{createdBy.name}</td>
      <td className="border border-gray-300 px-4 py-2">
        <Link href={`/admin/products/edit/${id}`}>Edit</Link>
        <span>|</span> <button onClick={deleteButton}>Delete</button>
      </td>
    </tr>
  );
}
