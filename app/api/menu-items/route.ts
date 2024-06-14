import { MenuItem } from "@/models/menuItem";
import mongoose from "mongoose";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);
  const data = await req.json();
  const menuItem = await MenuItem.create(data);
  return Response.json(menuItem);
}
export async function PUT(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);
  const { _id, ...data } = await req.json();
  return Response.json(await MenuItem.findByIdAndUpdate(_id, data));
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  return Response.json(await MenuItem.find());
}

export async function DELETE(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await MenuItem.deleteOne({ _id });
  return Response.json(true);
}
