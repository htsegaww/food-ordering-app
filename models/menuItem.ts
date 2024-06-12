import mongoose, { Schema, model, models } from "mongoose";

const ExtraPricesSchema = new Schema({
  name: { type: String },
  price: { type: String },
});
const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: String },
    sizes: [ExtraPricesSchema],
    extraGradientPrices: [ExtraPricesSchema],
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
