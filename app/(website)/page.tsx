import Hero from "@/components/website/home/banner/Hero";
import CategorySection from "@/components/website/home/category/CategorySection";
import ProductSection from "@/components/website/home/product/ProductSection";
import Testimonials from "@/components/website/home/testimonials/Testimonials";
import WhyChooseUs from "@/components/website/home/why-choose-us/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductSection />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
