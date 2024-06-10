import { MenuItem } from "@/models/menuItem";
import mongoose from "mongoose";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);

  const data = await req.json();
  const menuItem = await MenuItem.create(data);
  return Response.json(menuItem);
}

// This function is called when a POST request is made to /api/menu-items
// It should save the menu item to the database and return the saved menu item
// The request body will contain the menu item data
// The menu item data will be an object with the following properties:
// - image: string
// - name: string
// - description: string
// - basePrice: string
// The function should return the saved menu item
