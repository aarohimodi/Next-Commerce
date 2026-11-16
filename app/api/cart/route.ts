import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Products from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";

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

    const { productId, quantity } = await request.json();
    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "ProductId is required",
      });
    }
    if (typeof quantity !== "number" || !Number.isInteger(quantity)) {
      return NextResponse.json({
        success: false,
        message: "Quantity should be Number",
      });
    }
    if (typeof productId !== "string") {
      return NextResponse.json({
        success: false,
        message: "ProductId should be string",
      });
    }
    if (quantity < 1) {
      return NextResponse.json({
        success: false,
        message: "Quantity should be greater than zero",
      });
    }

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product not Found",
      });
    }
    if (product.stock === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product is Out of stock",
        },
        {
          status: 400,
        },
      );
    }

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      if (quantity > product.stock) {
        return NextResponse.json(
          {
            success: false,
            message: `Only ${product.stock} Quantity can add`,
          },
          {
            status: 400,
          },
        );
      }
      await Cart.create({
        user: user._id,
        items: [
          {
            product: productId,
            quantity: quantity,
          },
        ],
      });
      return NextResponse.json({
        success: true,
        message: "Cart Added Successfully.",
      });
    } else {
      const isProduct = cart.items.find(
        (p: any) => p.product.toString() === productId,
      );
      if (!isProduct) {
        if (quantity > product.stock) {
          return NextResponse.json({
            success: false,
            message: `only ${product.stock} Quantity can be added`,
          });
        }
        cart.items.push({
          product: productId,
          quantity: quantity,
        });
        await cart.save();
        return NextResponse.json({
          success: true,
          message: "Product Added To Cart Successfully.",
        });
      } else {
        const totalQuantity = isProduct.quantity + quantity;
        if (totalQuantity > product.stock) {
          return NextResponse.json({
            success: true,
            message: `only ${product.stock} Quantity can be added`,
          });
        }
        isProduct.quantity += quantity;
        await cart.save();
        return NextResponse.json({
          success: true,
          message: "Cart Updated Successfully.",
        });
      }
    }
  } catch (error) {
    console.log("POST API ERROR =>", error);
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

    const cart = await Cart.findOne({ user: user._id }).populate(
      "items.product",
      "title price images stock",
    );

    if (!cart) {
      return NextResponse.json(
        {
          success: true,
          items: [],
          total: 0,
          subtotal: 0,
          deliveryCharges: 0,
        },
        {
          status: 200,
        },
      );
    } else {
      let finalTotal = 0;
      let deliveryCharges = 0;
      const subTotal = cart.items.reduce((total: number, item: any) => {
        return (total += item.product.price * item.quantity);
      }, 0);

      if (subTotal < 499) {
        deliveryCharges = 50;
      }
      finalTotal = subTotal + deliveryCharges;
      return NextResponse.json({
        success: true,
        message: "Cart Fetched Successfully.",
        items: cart.items,
        subtotal: subTotal,
        deliveryCharges: deliveryCharges,
        total: finalTotal,
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

export async function PATCH(request: NextRequest) {
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
    const { productId, quantity } = await request.json();
    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "ProductId is Required",
      });
    }
    if (typeof quantity !== "number" || !Number.isInteger(quantity)) {
      return NextResponse.json({
        success: false,
        message: "Quantity should be Number",
      });
    }
    if (typeof productId !== "string") {
      return NextResponse.json({
        success: false,
        message: "ProductId should be string",
      });
    }
    if (quantity < 0) {
      return NextResponse.json({
        success: false,
        message: "Quantity should be greater than zero",
      });
    }
    const product = await Products.findById(productId);

    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product Not Found",
      });
    }
    if (product.stock === 0) {
      return NextResponse.json({
        success: false,
        message: "Out of stock",
      });
    }
    const cart = await Cart.findOne({ user: user._id });
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
    } else {
      const isProduct = cart.items.find(
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
      } else {
        if (quantity === 0) {
          cart.items = cart.items.filter(
            (i: any) => i.product.toString() !== productId,
          );
          await cart.save();
          return NextResponse.json({
            success: true,
            message: "Product Removed Successfully.",
          });
        } else if (quantity > product.stock) {
          return NextResponse.json(
            {
              success: false,
              message: `Only ${product.stock} Quantity can add`,
            },
            {
              status: 400,
            },
          );
        }
        isProduct.quantity = quantity;
        await cart.save();
        return NextResponse.json({
          success: true,
          message: "Cart Updated Successfully.",
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
    const cart = await Cart.findOne({ user: user._id });
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
    const isProduct = cart.items.find(
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
    cart.items = cart.items.filter(
      (p: any) => p.product.toString() !== productId,
    );
    await cart.save();
    return NextResponse.json({
      success: true,
      message: "Product Removed Successfully.",
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
