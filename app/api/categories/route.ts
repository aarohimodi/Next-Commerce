import { connectDB } from "@/lib/mongodb";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Category from "@/models/Category";
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser(request);
    if (user.role !== "admin") {
      return Response.json({
        success: false,
        message: "UnAuthorized",
      });
    }
    const body = await request.json();

    const { name, description, image } = body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return Response.json({
        success: false,
        message: "Category already exist",
      });
    }
    const category = await Category.create({
      name,
      description,
      image,
      createdBy: user._id,
    });
    return Response.json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("CATEGORY ERROR =>", error);
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function GET() {
  await connectDB();
  try {
    const categories = await Category.find();

    return Response.json({
      success: true,
      message: "All Category Fatched successfully",
      categories,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
