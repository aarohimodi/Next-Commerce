import getAllCategories from "@/lib/queries/category";
import CategoryCard from "./CategoryCard";
export default async function CategorySection() {
  const categories = await getAllCategories();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category: any) => (
            <CategoryCard key={category._id.toString()} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
