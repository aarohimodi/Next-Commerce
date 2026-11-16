import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import "@/models/Product";
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const CurrentUser = await getCurrentUser(request);
    if (!CurrentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const user = await User.findById(CurrentUser._id);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 },
      );
    }
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        orders,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get Admin Orders Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
