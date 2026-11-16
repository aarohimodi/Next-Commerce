import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getCurrentUser(request: NextRequest) {
  await connectDB();
  const token = request.cookies.get("token");

  if (!token) {
    // throw new Error("Unauthorized");
    return null;
  }

  const payload = jwt.verify(token.value, process.env.JWT_SECRET!) as {
    userId: string;
  };
  const user = await User.findById(payload.userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
