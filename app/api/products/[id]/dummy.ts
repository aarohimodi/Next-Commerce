import cloudinary from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import Products from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const user = await getCurrentUser(request);
    if (user.role !== "admin") {
      //err
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
      description?: string;
      slug?: string;
      price?: number;
      oldPrice?: number;
      image?: string[];
      onSale?: boolean;
      newArrival?: boolean;
      stock?: number;
      category?: string;
    } = {};

    if (title) {
      const slug = title.trim().toLowerCase().replace(/\s+/g, "-");
      const isDuplicateSlug = await Products.findOne({ slug });
      if (isDuplicateSlug && isDuplicateSlug._id !== id) {
        // err
      }
      updateData.title = title;
      updateData.slug = slug;
    }
    if (category) {
      const IsCategory = await Products.findOne({ category });
      if (!IsCategory) {
        //err
      }
      updateData.category = category;
    }
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (oldPrice !== undefined) updateData.oldPrice = oldPrice;
    if (onSale !== undefined) updateData.onSale = onSale;
    if (newArrival !== undefined) updateData.newArrival = newArrival;
    if (stock !== undefined) updateData.stock = stock;

    const product = await Products.findById(id);
    if (!product) {
      //err
    }

    const update = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {}
}
