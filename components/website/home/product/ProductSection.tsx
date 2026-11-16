import { getLatestProducts } from "@/lib/queries/product";
import ProductGrid from "./ProductGrid";
async function ProductSection() {
  const products = await getLatestProducts();
  return (
    <section className="py-16" id="productSection">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-bold">Latest Products</h2>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export default ProductSection;
