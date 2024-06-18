import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraGradientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
