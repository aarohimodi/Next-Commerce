import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

interface ProductDetailsProps {
  product: any;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
    </section>
  );
}
