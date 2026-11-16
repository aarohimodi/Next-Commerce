"use client";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
interface ProductGridProps {
  products: any[];
}
function ProductGrid({ products }: ProductGridProps) {
  const search = useSelector((state: any) => state.ui.search);
  const filteredItem = products.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {filteredItem.map((product) => (
        <ProductCard key={String(product._id)} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
