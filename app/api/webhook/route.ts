import { Order } from "@/models/order";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    const reqBuffer = await req.text();
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signingSecret);
  } catch (error) {
    console.error(error);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";

    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return Response.json("ok", { status: 200 });
}
