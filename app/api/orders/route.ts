import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/order";
import { isAdmin } from "@/utils/auth";

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (admin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}
