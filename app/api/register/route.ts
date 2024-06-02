import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  mongoose.connect(process.env.MONGO_URL!);
  if (!email || !password) {
    return new NextResponse("Email and password are required", { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }
  // const hashedPassword = bcrypt.hashSync(password, 10);
  const createdUser = await User.create(body);
  return NextResponse.json(createdUser);
}

//what is happening here
//we are importing the User model from the User.ts file
//we are importing mongoose
//we are creating a new function called POST that takes in a request object as an argument (this is the request object that is passed to the route) and returns a promise that resolves to a response object (this is the response object that is sent back to the client)
//we are parsing the request body as JSON and storing it in a variable called body
//we are connecting to the database using the MONGO_URL environment variable (this is the URL of the MongoDB database)
//we are creating a new user in the database using the create method on the User model and passing in the body of the request as an argument (this is the data that we want to save in the database)
//we are returning a JSON response with the created user object (this is the data that we want to send back to the client)
