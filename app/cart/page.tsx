"use client";
import {
  CartContext,
  cartProductPrice,
  CartContextType,
} from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { Button } from "@/components/ui/button";
import useProfile from "@/components/useProfile";

import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const cartContext = useContext(CartContext);
  const { cartProducts, removeCartProduct } = cartContext as CartContextType;

  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  // console.log(profileData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed. Please try again.😔  ");
      }
    }
  }, []);
  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postalCode, city, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  if (!cartContext) {
    // Handle the case where the context is not available
    return <div>Error: Cart context is not available.</div>;
  }

  function handleAddressChange(propName: string, value: string) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  //calculate the total amount of the cart
  const subtotal = cartProducts.reduce(
    (acc: any, product: any) => acc + cartProductPrice(product),
    0
  );
  const taxTotal = parseFloat((subtotal * 0.1).toFixed(1));

  const total = subtotal + taxTotal + 5;

  async function proceedToCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //address and shopping cart products
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, cartProducts }),
      }).then(async (response) => {
        if (response.ok) {
          resolve(response);
          //redirect to stripe

          window.location = await response.json();
        } else {
          reject(response);
        }
      });
    });

    await toast.promise(promise, {
      loading: "Processing order...",
      success: "Order processed successfully",
      error: "Error processing order",
    });
  }

  if (cartProducts.length === 0) {
    return (
      <section className="max-w-2xl mx-auto text-center mt-8">
        <SectionHeaders mainHeader="Your Cart" subHeader="" />
        <div className="my-4">
          <p>No products in your cart</p>
        </div>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" subHeader="" />
      </div>

      <div className="grid gap-8 grid-cols-2 mt-8">
        <div>
          {cartProducts.length === 0 && <div>No Products in shopping cart</div>}

          {cartProducts.length > 0 &&
            cartProducts.map((product: any, index: any) => (
              <CartProduct
                key={index}
                product={product}
                index={index}
                onRemove={removeCartProduct}
              />
            ))}

          <div className="py-2 flex justify-end pr-16 items-center text-md gap-4">
            <div className="text-gray-500">
              subtotal: <br />
              Delivery: <br />
              Tax: <br />
              Total:
            </div>
            <div className="font-semibold text-md pl-2 text-right">
              ${subtotal} <br />
              $5 <br />${taxTotal} <br />${total}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <Button className="bg-primary text-white w-full mt-4" type="submit">
              Pay ${total}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
