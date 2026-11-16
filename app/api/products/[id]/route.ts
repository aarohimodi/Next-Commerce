import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest } from "next/server";
import Category from "@/models/Category";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return Response.json({
        success: false,
        message: "Product not available",
      });
    }
    return Response.json({
      success: true,
      message: "Product Fatched successfully",
      product,
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
    const {
      title,
      description,
      price,
      oldPrice,
      images,
      onSale,
      newArrival,
      stock,
      category,
    } = body;
    const updateData: {
      title?: string;
      slug?: string;
      description?: string;
      price?: number;
      oldPrice?: number;
      images?: {
        url: string;
        public_id: string;
      }[];
      onSale?: boolean;
      newArrival?: boolean;
      stock?: number;
      category?: string;
    } = {};
    if (title) {
      const slug = title.toLowerCase().trim().replace(/\s+/g, "-");
      const isDuplicateSlug = await Product.findOne({ slug });
      if (isDuplicateSlug && isDuplicateSlug._id.toString() !== id) {
        return Response.json({
          success: false,
          message: "Slug already exists",
        });
      }
      updateData.title = title;
      updateData.slug = slug;
    }
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (oldPrice !== undefined) updateData.oldPrice = oldPrice;
    if (images) updateData.images = images;
    if (onSale !== undefined) updateData.onSale = onSale;
    if (newArrival !== undefined) updateData.newArrival = newArrival;
    if (stock !== undefined) updateData.stock = stock;
    if (category) {
      const IsCategory = await Category.findById(category);
      if (!IsCategory) {
        return Response.json({
          success: false,
          message: "Category Not exist",
        });
      }
      updateData.category = category;
    }
    const product = await Product.findById(id);

    if (!product) {
      return Response.json({
        success: false,
        message: "Product not found",
      });
    }
    const updateProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return Response.json({
      success: true,
      message: "Product Updated successfully",
      updateProduct,
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
    await connectDB();
    const { id } = await context.params;
    const user = await getCurrentUser(request);
    if (user.role !== "admin") {
      return Response.json({
        success: false,
        message: "UnAuthorized",
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return Response.json({
        success: false,
        message: "Product Not Found",
      });
    }
    for (const image of product.images) {
      const cloudinaryResponse = await cloudinary.uploader.destroy(
        image.public_id,
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
    }
    await Product.findByIdAndDelete(id);
    return Response.json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
