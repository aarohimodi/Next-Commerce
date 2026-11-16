import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import "@/models/User";
import Link from "next/link";
import CategoryTable from "@/components/admin/category/CategoryTable";
export default async function CategoryPage() {
  await connectDB();
  console.log("before find");
  const categories = await Category.find()
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    })
    .lean();
  console.log(JSON.stringify(categories, null, 2));
  console.log("after find");

  return (
    <div className="p-2 rounded-lg shadow-2xl h-[90%]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link
          href="/admin/categories/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Category
        </Link>
      </div>
      {categories.length === 0 ? (
        <h3>Category is Empty</h3>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Created By
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => {
              return (
                <CategoryTable
                  key={cat._id}
                  name={cat.name}
                  description={cat.description}
                  image={cat.image}
                  createdBy={{
                    _id: cat.createdBy._id.toString(),
                    name: cat.createdBy.name,
                    email: cat.createdBy.email,
                  }}
                  id={cat._id.toString()}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
