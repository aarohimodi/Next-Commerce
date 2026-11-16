import Image from "next/image";
import Link from "next/link";
import { HeroSlide as HeroSlideType } from "@/types/hero";
interface HeroSlideProps {
  slide: HeroSlideType;
}
function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-gray-100 ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-16">
        <div className="max-w-xl space-y-6">
          <p className="text-lg font-medium text-blue-600">{slide.subtitle}</p>
          <h1 className="text-5xl font-bold leading-tight">{slide.title}</h1>
          <p className="text-gray-600">{slide.description}</p>
          <Link
            href={slide.buttonLink}
            className="inline-block rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            {slide.buttonText}
          </Link>
        </div>
        <div className="relative hidden h-[400px] w-[450px] lg:block">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-contain "
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
