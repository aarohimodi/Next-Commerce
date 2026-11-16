import Category from "@/models/Category";
import { connectDB } from "../mongodb";

async function getAllCategories() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 }).lean();
    // return categories;
    return categories.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      image: category.image,
    }));
  } catch (error) {
    console.error("GET ALL CATEGORIES ERROR =>", error);
    return [];
  }
}

export default getAllCategories;
