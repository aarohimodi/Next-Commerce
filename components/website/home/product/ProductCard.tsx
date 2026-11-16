import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import AddToWishlist from "./AddToWishlist";

interface ProductCardProps {
  product: any;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg p-5">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.images[0].url}
            alt={product.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          {product.onSale && (
            <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs text-white">
              SALE
            </span>
          )}
          {product.newArrival && (
            <span className=" absolute right-3 top-3 rounded bg-green-600 px-2 py-1 text-xs text-white">
              NEW
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <p className="text-sm text-gray-500">{product.category.name}</p>
      </div>
      <h3 className="line-clamp-2 font-semibold">{product.title}</h3>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold"> ₹{product.price}</span>
        <span className="text-sm text-gray-400 line-through">
          ₹{product.oldPrice}
        </span>
      </div>
      <div className="flex gap-2">
        <AddToCartButton productId={product._id.toString()} />
        <AddToWishlist productId={product._id.toString()} />
      </div>
    </div>
  );
}

export default ProductCard;
