import { connectDB } from "@/lib/mongodb";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Product from "@/models/Product";
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
    const slug = title.toLowerCase().trim().replace(/\s+/g, "-");
    const IsCategory = await Category.findById(category);
    if (!IsCategory) {
      return Response.json({
        success: false,
        message: "Category Not exist",
      });
    }

    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return Response.json({
        success: false,
        message: "Product already exists",
      });
    }
    const product = await Product.create({
      title,
      slug,
      description,
      price,
      oldPrice,
      images,
      onSale,
      newArrival,

      stock,
      category,
      createdBy: user._id,
    });
    return Response.json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  try {
    const query: Record<string, unknown> = {};
    let sortOption: Record<string, 1 | -1> = {
      createdAt: -1,
    };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (sort === "priceLowToHigh") {
      sortOption = { price: 1 };
    } else if (sort === "priceHighToLow") {
      sortOption = { price: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }
    const totalProducts = await Product.countDocuments(query);
    const skip = (page - 1) * limit; // 10
    console.log("DATABASE NAME:", Product.db.name);
    console.log("COLLECTION NAME:", Product.collection.name);
    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalProducts / limit);
    return Response.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
