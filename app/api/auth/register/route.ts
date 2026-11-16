import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password } = body;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return Response.json({
        success: false,
        message: "User already exists. Please use another email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return Response.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
