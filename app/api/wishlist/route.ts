import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { NextRequest, NextResponse } from "next/server";
import Products from "@/models/Product";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "NOT AUTHENTICATED",
        },
        {
          status: 401,
        },
      );
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "Product is required",
      });
    }
    if (typeof productId !== "string") {
      return NextResponse.json({
        success: false,
        message: "Product Should be String",
      });
    }
    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product Not Found",
        },
        {
          status: 404,
        },
      );
    }
    const wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
      await Wishlist.create({
        user: user._id,
        items: [
          {
            product: productId,
          },
        ],
      });
      return NextResponse.json({
        success: true,
        message: "Wishlist Added Successfully.",
      });
    } else {
      const isProduct = wishlist.items.find(
        (p: any) => p.product.toString() === productId,
      );
      if (!isProduct) {
        wishlist.items.push({
          product: productId,
        });
        await wishlist.save();
        return NextResponse.json({
          success: true,
          message: "Product added to Wishlist ",
        });
      } else {
        // wishlist.items = wishlist.items.filter((p: any) => p !== productId);
        // await wishlist.save();
        return NextResponse.json({
          success: false,
          message: "Product Already Added",
        });
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "NOT AUTHENTICATED",
        },
        {
          status: 401,
        },
      );
    }
    const wishlist = await Wishlist.findOne({ user: user._id }).populate(
      "items.product",
      "title images price stock",
    );
    if (!wishlist) {
      return NextResponse.json(
        {
          success: true,
          items: [],
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Wishlist Fetched Successfully.",
        items: wishlist.items,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User is NOT AUTHENTICATED.",
        },
        {
          status: 401,
        },
      );
    }
    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product is required",
        },
        {
          status: 404,
        },
      );
    }
    const wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: "Wishlist Not Found",
        },
        {
          status: 404,
        },
      );
    }
    const isProduct = wishlist.items.find(
      (p: any) => p.product.toString() === productId,
    );
    if (!isProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product Not Found",
        },
        {
          status: 404,
        },
      );
    }
    wishlist.items = wishlist.items.filter(
      (p: any) => p.product.toString() !== productId,
    );
    await wishlist.save();
    return NextResponse.json({
      success: true,
      message: "Wishlist Product Removed Successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
