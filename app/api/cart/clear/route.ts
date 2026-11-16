import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Cart from "@/models/Cart";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
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
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart Not Found",
        },
        {
          status: 404,
        },
      );
    }
    cart.items = [];
    await cart.save();
    return NextResponse.json({
      success: true,
      message: "Cart Cleared",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
