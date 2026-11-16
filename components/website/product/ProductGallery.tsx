import Image from "next/image";

interface ProductGalleryPorps {
  images: {
    url: string;
    public_id: string;
  }[];
}

export default function ProductGallery({ images }: ProductGalleryPorps) {
  return (
    <div className="relative h-[600px] overflow-hidden rounded-xl border">
      <Image
        src={images[0].url}
        alt="Product Image"
        fill
        sizes="50vw"
        className="object-cover"
      />
    </div>
  );
}
