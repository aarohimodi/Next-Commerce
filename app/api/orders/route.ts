import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Products from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

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
    const { shippingAddress, paymentMethod } = await request.json();
    if (!shippingAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipping Address is required",
        },
        {
          status: 400,
        },
      );
    }
    const { fullName, phone, address, city, state, pincode } = shippingAddress;
    if (!fullName || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json(
        {
          success: false,
          message: "All shipping fields are required",
        },
        {
          status: 400,
        },
      );
    }
    const cart = await Cart.findOne({ user: user._id }).populate(
      "items.product",
    );
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "cart is empty",
        },
        {
          status: 400,
        },
      );
    }
    let subTotal = 0;
    const orderItems = cart.items.map((item: any) => {
      const totalPrice = item.product.price * item.quantity;
      subTotal += totalPrice;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });
    let deliveryCharges = 0;

    if (subTotal < 499) {
      deliveryCharges = 50;
    }

    const total = subTotal + deliveryCharges;
    const order = await Order.create({
      user: user._id,
      items: orderItems,
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },
      subTotal,
      deliveryCharges,
      total,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "PENDING",
      orderStatus: "PENDING",
    });
    cart.items = [];
    await cart.save();
    return NextResponse.json(
      {
        success: true,
        message: "Order Placed Successfully.",
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("POST ORDER API ERROR =>", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error,
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
    const orders = await Order.find({ user: user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      message: "Orders fetched successfully.",
      orders,
    });
  } catch (error) {
    console.log("GET ORDERS ERROR =>", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
