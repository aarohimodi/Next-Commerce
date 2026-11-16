import Products from "@/models/Product";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import ProductTable from "@/components/admin/product/ProductTable";
import "@/models/Category";
import "@/models/User";
export default async function ProductPage() {
  await connectDB();
  const products = await Products.find()
    .populate("category", "name")
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    })
    .lean();

  return (
    <div className="p-2 rounded-lg shadow-2xl h-[90%]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          href="/admin/products/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>
      {products.length === 0 ? (
        <h3>No Products Found</h3>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>

              <th className="border border-gray-300 px-4 py-2 text-left">
                Image
              </th>

              <th className="border border-gray-300 px-4 py-2 text-left">
                Price
              </th>

              <th className="border border-gray-300 px-4 py-2 text-left">
                Stock
              </th>

              <th className="border border-gray-300 px-4 py-2 text-left">
                Category
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
            {products.map((product) => (
              <ProductTable
                key={product._id.toString()}
                id={product._id.toString()}
                title={product.title}
                price={product.price}
                stock={product.stock}
                images={product.images.map(
                  (image: { url: string; public_id: string }) => ({
                    url: image.url,
                    public_id: image.public_id,
                  }),
                )}
                category={{
                  _id: product.category._id.toString(),
                  name: product.category.name,
                }}
                createdBy={{
                  _id: product.createdBy._id.toString(),
                  name: product.createdBy.name,
                  email: product.createdBy.email,
                }}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
