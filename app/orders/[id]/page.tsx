"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrdersPage() {
  const cartContext = useContext(CartContext);
  const [order, setOrder] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        cartContext?.clearCart();
      }
    }

    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  const taxTotal = parseFloat((subtotal * 0.1).toFixed(1));
  const total = subtotal + taxTotal + 5;
  return (
    <section className="max-w-2xl mx-auto  mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" subHeader="" />
        <div className="my-4 mb-8">
          <p>Thank you for your order</p>
          <p>We will call you when your order is on the way!</p>
        </div>
      </div>

      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts.map((product: any) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500 ">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                {" "}
                {subtotal}
              </span>{" "}
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">
                {" "}
                $5
              </span>{" "}
              <br />
              Tax:
              <span className="text-black font-bold inline-block w-8">
                {" "}
                {taxTotal}
              </span>{" "}
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                {" "}
                {total}
              </span>{" "}
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                disabled={true}
                addressProps={order}
                setAddressProp={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
