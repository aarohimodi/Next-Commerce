import { connectDB } from "../mongodb";
import Products from "@/models/Product";
import Category from "@/models/Category";

export async function getLatestProducts(limit = 8) {
  try {
    await connectDB();

    const products = await Products.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),

      category: product.category
        ? {
            _id: product.category._id.toString(),
            name: product.category.name,
          }
        : null,

      images: product.images.map((image: any) => ({
        url: image.url,
        public_id: image.public_id,
      })),

      createdBy: product.createdBy?.toString(),

      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));
    // return products;
  } catch (error) {
    console.error("GET LATEST PRODUCTS ERROR =>", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    await connectDB();
    const product = await Products.findOne({ slug })
      .populate("category", "name")
      .populate("createdBy", "name email")
      .lean();

    return product;
  } catch (error) {
    console.error("GET PRODUCT ERROR =>", error);
    return null;
  }
}

interface GetProductsParams {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  inStock?: boolean;
  onSale?: boolean;
  newArrival?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export async function getProducts({
  search = "",
  category = "",
  sort = "",
  page = 1,
  inStock = false,
  onSale = false,
  newArrival = false,
  limit = 8,
  minPrice = 0,
  maxPrice = 0,
}: GetProductsParams) {
  try {
    await connectDB();

    const query: Record<string, any> = {};

    let sortOption: Record<string, 1 | -1> = {
      createdAt: -1,
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = minPrice;
      }
      if (maxPrice) {
        query.price.$lte = maxPrice;
      }
    }

    if (inStock) {
      query.stock = { $gt: 0 };
    }
    if (onSale) {
      query.onSale = true;
    }
    if (newArrival) {
      query.newArrival = true;
    }

    // if (category) {
    //   query.category = category;
    // }
    if (category) {
      const categoryData = await Category.findOne({ name: category }).lean();

      if (!categoryData) {
        return {
          products: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalProducts: 0,
            limit,
          },
        };
      }

      query.category = categoryData._id;
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

    const totalProducts = await Products.countDocuments(query);

    const skip = (page - 1) * limit;

    const products = await Products.find(query)
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    };
  } catch (error) {
    console.error("GET PRODUCTS ERROR =>", error);

    return {
      products: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        limit,
      },
    };
  }
}
