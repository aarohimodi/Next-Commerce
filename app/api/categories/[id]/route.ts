import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    // const id = params.id;

    const category = await Category.findById(id);
    if (!category) {
      return Response.json({
        success: false,
        message: "Category not available",
      });
    }
    return Response.json({
      success: true,
      message: "Category Fatched successfully",
      category,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
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
    const updateData: {
      name?: string;
      description?: string;
      image?: {
        url: string;
        public_id: string;
      };
    } = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (image) updateData.image = image;

    const category = await Category.findById(id);
    if (!category) {
      return Response.json({
        success: false,
        message: "Category is not exist",
      });
    }

    if (name) {
      const isDuplicate = await Category.findOne({ name });
      if (isDuplicate && isDuplicate._id.toString() !== id) {
        return Response.json({
          success: false,
          message: "Category already exists",
        });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (image && category.image.public_id !== image.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    return Response.json({
      success: true,
      message: "Category Updated successfully",
      updatedCategory,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectDB();
    const user = await getCurrentUser(request);
    if (user.role !== "admin") {
      return Response.json({
        success: false,
        message: "UnAuthorized",
      });
    }
    const category = await Category.findById(id);
    if (!category) {
      return Response.json({
        success: false,
        message: "Category Not Found",
      });
    }
    const cloudinaryResponse = await cloudinary.uploader.destroy(
      category.image.public_id,
    );
    if (
      cloudinaryResponse.result !== "ok" &&
      cloudinaryResponse.result !== "not found"
    ) {
      return Response.json({
        success: false,
        message: "Image deletion failed",
      });
    }
    await Category.findByIdAndDelete(id);
    return Response.json({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CATEGORY ERROR =>", error);
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
