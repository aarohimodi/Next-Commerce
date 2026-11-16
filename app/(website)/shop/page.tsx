import ProductGrid from "@/components/website/home/product/ProductGrid";
import Pagination from "@/components/website/shop/Pagination";
import ShopSidebar from "@/components/website/shop/ShopSidebar";
import ShopToolbar from "@/components/website/shop/ShopToolbar";
import { getProducts } from "@/lib/queries/product";
import getAllCategories from "@/lib/queries/category";
interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
    inStock?: string;
    onSale?: string;
    newArrival?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}
export default async function page({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const sort = params.sort || "";
  const inStock = params.inStock === "true";
  const onSale = params.onSale === "true";
  const newArrival = params.newArrival === "true";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const page = Number(params.page) || 1;

  const data = await getProducts({
    search,
    category,
    sort,
    page,
    inStock,
    onSale,
    newArrival,
    minPrice,
    maxPrice,
    limit: 8,
  });
  const categories = await getAllCategories();
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Heading */}

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Shop</h1>
        <p className="mt-2 text-gray-500">Explore our latest collection.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside>
          <ShopSidebar categories={categories} />
        </aside>

        <div className="space-y-6 lg:col-span-3">
          <ShopToolbar
            currentPage={data.pagination.currentPage}
            totalProducts={data.pagination.totalProducts}
            limit={data.pagination.limit}
          />

          <ProductGrid products={data.products} />

          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
          />
        </div>
      </div>
    </section>
  );
}
