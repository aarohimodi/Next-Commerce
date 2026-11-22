import Products from "@/models/Product";
import { connectDB } from "./mongodb";
import Category from "@/models/Category";
import User from "@/models/User";
import Order from "@/models/Order";

export async function getproductCount() {
  await connectDB();

  return Products.countDocuments();
}

export async function getCategoryCount() {
  await connectDB();

  return Category.countDocuments();
}

export async function getUserCount() {
  await connectDB();

  return User.countDocuments();
}

export async function getOrderCount() {
  await connectDB();

  return Order.countDocuments();
}
