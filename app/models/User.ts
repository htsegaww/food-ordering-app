import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass: String) => {
        if (!pass?.length || pass.length < 5) {
          new Error("Password must be at least 5 characters long");
        }
      },
    },
  },
  { timestamps: true }
);

//hashing the password

UserSchema.post("validate", async (user) => {
  const notHashedPassword = user.password;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(notHashedPassword, salt);
});

export const User = models.User || model("User", UserSchema);

//note on what is happening here
// we are creating a new schema for the user
//we are validating the email and password fields to be required and unique for the email field and at least 5 characters long for the password field (this is a custom validation)
// we are exporting the User model
// we are checking if the model exists and if it does we are using it
// if it does not exist we are creating a new model with the name "User" and the schema we created above
// we are using the timestamps option to add createdAt and updatedAt fields to our model automatically when we create a new user in the database (this is a mongoose feature)
