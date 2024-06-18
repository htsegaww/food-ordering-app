import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User, UserType } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);

  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter: Partial<UserType> = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email: email ?? "" };
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, { name: data.name, image: data.image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });

  return Response.json(true);
}

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser: Partial<UserType> = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  const user: UserType | null = await User.findOne(filterUser).lean();
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }
  const userInfo = await UserInfo.findOne({ email: user.email! }).lean();

  return Response.json({ ...user, ...userInfo });
}
