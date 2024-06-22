import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/order";
import { MenuItem } from "@/models/menuItem";
const stripe = require("stripe")(process.env.STRIPE_SK);
export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URL!);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo?.basePrice;

    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size: any) => size._id.ToString() === cartProduct.size._id.toString()
      );

      productPrice = size.price;
    }

    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraGradientPrices;
        const extraThingInfo: any = productExtras.find(
          (extra: { _id: string }) =>
            extra._id.toString() === extraThingInfo._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  // console.log(stripeLineItems);
  return Response.json(null);

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + "cart?success=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery Fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
