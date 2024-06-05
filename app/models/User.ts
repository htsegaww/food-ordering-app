import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);

//note on what is happening here
// we are creating a new schema for the user
//we are validating the email and password fields to be required and unique for the email field and at least 5 characters long for the password field (this is a custom validation)
// we are exporting the User model
// we are checking if the model exists and if it does we are using it
// if it does not exist we are creating a new model with the name "User" and the schema we created above
// we are using the timestamps option to add createdAt and updatedAt fields to our model automatically when we create a new user in the database (this is a mongoose feature)
