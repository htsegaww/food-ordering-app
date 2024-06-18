import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise) as any, // Temporary fix to bypass the type error
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await mongoose.connect(process.env.MONGO_URL!);

        const user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return null;
        }

        return user;
      },
    }),
  ],
};

export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
